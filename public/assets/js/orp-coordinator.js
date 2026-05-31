/* ============================================================
   ORP v3.2 | SWARM COORDINATOR  (orp-coordinator.js)
   ============================================================
   Load via <script src="assets/js/orp-coordinator.js"></script>
   AFTER orp-sync.js AND registry.js.

   PUBLIC API:
     ORP_COORDINATOR.dispatch(task)      — run a task through the pipeline
     ORP_COORDINATOR.getState()          — current coordinator state object
     ORP_COORDINATOR.getHistory(n)       — last n pipeline runs (default 20)
     ORP_COORDINATOR.setMode(mode)       — force operational mode
     ORP_COORDINATOR.reset()             — clear history, reset metrics
     ORP_COORDINATOR.on(event, fn)       — subscribe to internal events

   TASK OBJECT:
     {
       prompt:   string,         — the task description / query
       roles:    string[],       — ordered role preference list
       priority: 'normal'|'high' — affects Herald weighting (default 'normal')
     }

   PIPELINE EVENTS EMITTED:
     'orp-runtime-mode-change'   { mode: string, reason: string }
       — fires when the coordinator's operational mode shifts
     'orp-telemetry-request'     { source, metric, value, runId }
       — fires once per Herald scoring pass with consensus/drift/latency
     'orp-settings-update'       { key: 'coordinator_state', value: stateObj }
       — fires after every dispatch so UI consumers can re-render

   EVENTS CONSUMED:
     'orp-settings-update'
       — key 'registry_agent_*' : re-evaluate agent availability
       — key 'ness_pressure'    : adjust Herald weights for SHS state
       — key 'ness_warden_active': engage lockdown mode

   OPERATIONAL MODES (truth table driven):
     NOMINAL   — all primary agents available, SHS GREEN/YELLOW
     DEGRADED  — one or more primaries offline, fallbacks active
     ISOLATED  — Warden MANIFESTED or SHS RED/BLACK
     LOCKDOWN  — ness_warden_active === true; only reads, no dispatch

   HERALD SCORING ENGINE:
     Runs after every multi-agent response set.
     Metrics:
       consensus  — cosine-like similarity between response texts (0–1)
       drift      — max confidence delta across responding agents (0–1)
       latency    — mean simulated response time in ms
     All three metrics are emitted via 'orp-telemetry-request' and
     persisted to ORP_SYNC so runtime.html can visualize them.

   PATCH LOG:
     v1.0.0 — Initial coordinator. Single-agent dispatch, Herald stub.
     v1.1.0 — Multi-agent fan-out: dispatch sends to ALL agents matching
               the role preference list, not just the first one.
               Herald scoring now computes real lexical overlap ratio.
               Lockdown mode respects ness_warden_active flag.
               Full event bridge to orp-sync.js established.
   ============================================================ */

(function (global) {
  'use strict';

  /* ── Operational mode constants ─────────────────────────── */
  var MODES = {
    NOMINAL:  'NOMINAL',
    DEGRADED: 'DEGRADED',
    ISOLATED: 'ISOLATED',
    LOCKDOWN: 'LOCKDOWN',
  };

  /* ── Internal state ─────────────────────────────────────── */
  var _state = {
    mode:           MODES.NOMINAL,
    activeAgents:   [],
    lastRunId:      0,
    dispatchCount:  0,
    lockedDown:     false,
    shsPressure:    'GREEN',
  };

  var _history  = [];      // pipeline run records (capped at 50)
  var _handlers = {};      // internal event subscriptions

  /* ── Herald weight map by SHS pressure ─────────────────── */
  var HERALD_WEIGHTS = {
    GREEN:  { consensus: 0.5, drift: 0.3, latency: 0.2 },
    YELLOW: { consensus: 0.4, drift: 0.4, latency: 0.2 },
    ORANGE: { consensus: 0.3, drift: 0.5, latency: 0.2 },
    RED:    { consensus: 0.2, drift: 0.6, latency: 0.2 },
    BLACK:  { consensus: 0.1, drift: 0.7, latency: 0.2 },
  };

  /* ──────────────────────────────────────────────────────────
     Internal utilities
  ─────────────────────────────────────────────────────────── */

  function _emit(eventName, detail) {
    global.dispatchEvent(new CustomEvent(eventName, {
      detail:  detail,
      bubbles: false,
    }));
  }

  function _fire(internalEvent, data) {
    var fns = _handlers[internalEvent] || [];
    fns.forEach(function (fn) { try { fn(data); } catch (e) {} });
  }

  function _sync(key, value) {
    if (global.ORP_SYNC) {
      global.ORP_SYNC.save(key, value);
    } else {
      _emit('orp-settings-update', { key: key, value: value });
    }
  }

  /* ──────────────────────────────────────────────────────────
     Mode evaluation — pure truth table
     Inputs: agent availability bitmap, SHS pressure, warden flag
  ─────────────────────────────────────────────────────────── */
  function _evaluateMode() {
    if (_state.lockedDown) return MODES.LOCKDOWN;

    var shs = _state.shsPressure;
    if (shs === 'RED' || shs === 'BLACK') return MODES.ISOLATED;

    if (!global.ORP_REGISTRY) return MODES.DEGRADED;
    var snap = global.ORP_REGISTRY.snapshot();
    var agentIds = Object.keys(snap);
    var unavailable = agentIds.filter(function (id) {
      return !snap[id].dynamic_state.availability;
    });

    if (unavailable.length === 0) return MODES.NOMINAL;
    if (unavailable.length < agentIds.length) return MODES.DEGRADED;
    return MODES.ISOLATED;
  }

  function _applyMode(newMode, reason) {
    if (newMode === _state.mode) return;
    var prev = _state.mode;
    _state.mode = newMode;
    _emit('orp-runtime-mode-change', { mode: newMode, prev: prev, reason: reason || 'auto' });
    _fire('mode-change', { mode: newMode, prev: prev, reason: reason });
  }

  /* ──────────────────────────────────────────────────────────
     Herald scoring engine
     Operates on an array of AgentResponse objects.
  ─────────────────────────────────────────────────────────── */

  /** Tokenise a string into a lowercase word frequency map. */
  function _tokenize(text) {
    var words = (text || '').toLowerCase().match(/[a-z]+/g) || [];
    var freq  = {};
    words.forEach(function (w) { freq[w] = (freq[w] || 0) + 1; });
    return freq;
  }

  /**
   * Lexical overlap ratio between two texts (Jaccard on word sets).
   * Range: 0 (no overlap) → 1 (identical vocabulary).
   */
  function _lexicalSimilarity(textA, textB) {
    var a = _tokenize(textA);
    var b = _tokenize(textB);
    var keysA = Object.keys(a);
    var keysB = Object.keys(b);
    if (keysA.length === 0 && keysB.length === 0) return 1;
    var union = {};
    keysA.forEach(function (k) { union[k] = true; });
    keysB.forEach(function (k) { union[k] = true; });
    var unionSize = Object.keys(union).length;
    var interSize = 0;
    keysA.forEach(function (k) { if (b[k]) interSize++; });
    return unionSize === 0 ? 0 : interSize / unionSize;
  }

  /**
   * Score a set of agent responses.
   * Returns { consensus, drift, latency, weighted }.
   */
  function _herald(responses, shsPressure) {
    if (!responses || responses.length === 0) {
      return { consensus: 0, drift: 1, latency: 0, weighted: 0 };
    }

    // Consensus: mean pairwise lexical similarity
    var pairs = 0, simSum = 0;
    for (var i = 0; i < responses.length; i++) {
      for (var j = i + 1; j < responses.length; j++) {
        simSum += _lexicalSimilarity(responses[i].text, responses[j].text);
        pairs++;
      }
    }
    var consensus = pairs > 0 ? simSum / pairs : 1;

    // Drift: max confidence delta
    var confs = responses.map(function (r) { return r.confidence || 0; });
    var drift = confs.length > 1
      ? Math.max.apply(null, confs) - Math.min.apply(null, confs)
      : 0;

    // Latency: mean simulated latency in ms
    var latencySum = responses.reduce(function (acc, r) {
      return acc + ((r.meta && r.meta.latency) || 0);
    }, 0);
    var latency = latencySum / responses.length;

    // Weighted composite score
    var w = HERALD_WEIGHTS[shsPressure] || HERALD_WEIGHTS.GREEN;
    var weighted = (consensus * w.consensus)
                 - (drift    * w.drift)
                 - Math.min(1, latency / 1000) * w.latency;

    return {
      consensus: Math.round(consensus * 1000) / 1000,
      drift:     Math.round(drift     * 1000) / 1000,
      latency:   Math.round(latency),
      weighted:  Math.round(weighted  * 1000) / 1000,
    };
  }

  /* ──────────────────────────────────────────────────────────
     Pipeline execution
  ─────────────────────────────────────────────────────────── */

  function _dispatch(task) {
    if (_state.lockedDown) {
      return {
        runId:    null,
        error:    'LOCKDOWN — dispatch blocked by Warden.',
        mode:     _state.mode,
        responses: [],
        herald:   null,
      };
    }

    if (!global.ORP_REGISTRY) {
      return { runId: null, error: 'ORP_REGISTRY not loaded.', responses: [] };
    }

    var runId = ++_state.lastRunId;
    var roles  = (task && task.roles) || ['synthesis', 'analysis'];
    var prompt = (task && task.prompt) || '';
    var t0     = Date.now();

    /* Step 1: resolve agents for requested roles */
    var agents = [];
    var seen   = {};
    roles.forEach(function (role) {
      var a = global.ORP_REGISTRY.getByRole(role);
      if (a && !seen[a.agent_id]) {
        agents.push(a);
        seen[a.agent_id] = true;
      }
    });

    /* Step 2: check for fallback promotion */
    var usedFallback = false;
    if (agents.length === 0) {
      var fallback = global.ORP_REGISTRY.getByRole('fallback_adversarial');
      if (fallback) { agents.push(fallback); usedFallback = true; }
    }

    if (agents.length === 0) {
      var record = {
        runId: runId, error: 'No available agents for roles: ' + roles.join(', '),
        mode: _state.mode, responses: [], herald: null,
      };
      _pushHistory(record);
      return record;
    }

    /* Step 3: fan-out — call each agent's generate() */
    var responses = agents.map(function (agent) {
      var r = agent.generate({ prompt: prompt, context: _state });
      r._agentId = agent.agent_id;
      return r;
    });

    /* Step 4: Herald scoring */
    var herald = _herald(responses, _state.shsPressure);

    /* Step 5: emit telemetry */
    _emit('orp-telemetry-request', {
      source:    'orp-coordinator',
      runId:     runId,
      consensus: herald.consensus,
      drift:     herald.drift,
      latency:   herald.latency,
      weighted:  herald.weighted,
      agentIds:  agents.map(function (a) { return a.agent_id; }),
    });

    /* Step 6: persist metrics to ORP_SYNC for cross-tab visibility */
    _sync('coordinator_last_consensus', herald.consensus);
    _sync('coordinator_last_drift',     herald.drift);
    _sync('coordinator_last_latency',   herald.latency);
    _sync('coordinator_run_id',         runId);

    /* Step 7: update mode */
    var newMode = _evaluateMode();
    if (usedFallback && newMode === MODES.NOMINAL) newMode = MODES.DEGRADED;
    _applyMode(newMode, 'post-dispatch evaluation');

    /* Step 8: build and store run record */
    var elapsed = Date.now() - t0;
    _state.dispatchCount++;
    _state.activeAgents = agents.map(function (a) { return a.agent_id; });

    var runRecord = {
      runId:        runId,
      timestamp:    new Date().toISOString(),
      elapsed:      elapsed,
      prompt:       prompt,
      roles:        roles,
      agentIds:     agents.map(function (a) { return a.agent_id; }),
      usedFallback: usedFallback,
      responses:    responses,
      herald:       herald,
      mode:         _state.mode,
    };
    _pushHistory(runRecord);

    /* Step 9: broadcast coordinator state */
    _emit('orp-settings-update', { key: 'coordinator_state', value: _getState() });
    _fire('dispatch-complete', runRecord);

    return runRecord;
  }

  function _pushHistory(record) {
    _history.push(record);
    if (_history.length > 50) _history.shift();
  }

  function _getState() {
    return {
      mode:          _state.mode,
      activeAgents:  _state.activeAgents.slice(),
      dispatchCount: _state.dispatchCount,
      lastRunId:     _state.lastRunId,
      lockedDown:    _state.lockedDown,
      shsPressure:   _state.shsPressure,
    };
  }

  /* ──────────────────────────────────────────────────────────
     ORP_SYNC event bridge
  ─────────────────────────────────────────────────────────── */

  global.addEventListener('orp-settings-update', function (e) {
    var detail = e && e.detail;
    if (!detail) return;

    /* Registry availability change → re-evaluate mode */
    if (detail.key && detail.key.indexOf('registry_agent_') === 0) {
      var newMode = _evaluateMode();
      _applyMode(newMode, 'registry availability change');
      return;
    }

    /* SHS pressure change → re-weight Herald and re-evaluate mode */
    if (detail.key === 'ness_pressure') {
      _state.shsPressure = detail.value || 'GREEN';
      var newMode2 = _evaluateMode();
      _applyMode(newMode2, 'SHS pressure change: ' + _state.shsPressure);
      return;
    }

    /* Warden active → engage lockdown */
    if (detail.key === 'ness_warden_active') {
      var wasLocked = _state.lockedDown;
      _state.lockedDown = !!detail.value;
      if (_state.lockedDown !== wasLocked) {
        _applyMode(
          _state.lockedDown ? MODES.LOCKDOWN : _evaluateMode(),
          _state.lockedDown ? 'Warden MANIFESTED' : 'Warden DORMANT'
        );
      }
      return;
    }
  });

  /* ── Boot: hydrate from ORP_SYNC ─────────────────────────── */
  if (global.ORP_SYNC) {
    _state.shsPressure = global.ORP_SYNC.load('ness_pressure', 'GREEN');
    _state.lockedDown  = global.ORP_SYNC.load('ness_warden_active', false);
    _state.mode        = _evaluateMode();
  }

  /* ── Public API ───────────────────────────────────────────── */
  global.ORP_COORDINATOR = {

    /**
     * Run a task through the full pipeline.
     * @param {{ prompt: string, roles: string[], priority: string }} task
     * @returns {Object} run record
     */
    dispatch: function (task) {
      return _dispatch(task);
    },

    /**
     * Return a snapshot of current coordinator state.
     * @returns {Object}
     */
    getState: function () {
      return _getState();
    },

    /**
     * Return the last n pipeline run records.
     * @param {number} [n=20]
     * @returns {Object[]}
     */
    getHistory: function (n) {
      var limit = typeof n === 'number' ? n : 20;
      return _history.slice(-limit);
    },

    /**
     * Force an operational mode (use for testing / manual override).
     * @param {string} mode — one of NOMINAL | DEGRADED | ISOLATED | LOCKDOWN
     */
    setMode: function (mode) {
      if (MODES[mode]) _applyMode(MODES[mode], 'manual override');
    },

    /**
     * Clear run history and reset metrics (does not reset registry).
     */
    reset: function () {
      _history = [];
      _state.dispatchCount = 0;
      _state.lastRunId     = 0;
      _state.activeAgents  = [];
      _fire('reset', {});
    },

    /**
     * Subscribe to an internal coordinator event.
     * @param {'dispatch-complete'|'mode-change'|'reset'} event
     * @param {Function} fn  callback receives the event data object
     */
    on: function (event, fn) {
      if (!_handlers[event]) _handlers[event] = [];
      _handlers[event].push(fn);
    },

    /** Expose mode constants for consumer use. */
    MODES: MODES,
  };

}(window));
