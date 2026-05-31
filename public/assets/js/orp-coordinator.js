/* ============================================================
   ORP v3.2 | SWARM COORDINATOR  (orp-coordinator.js)
   ============================================================
   Load AFTER orp-sync.js AND registry.js.

   PUBLIC API:
     ORP_COORDINATOR.dispatch(task)      — run a task through the pipeline
     ORP_COORDINATOR.getState()          — current coordinator state object
     ORP_COORDINATOR.getHistory(n)       — last n pipeline runs (default 20)
     ORP_COORDINATOR.setMode(mode)       — force operational mode
     ORP_COORDINATOR.reset()             — clear history, reset metrics
     ORP_COORDINATOR.on(event, fn)       — subscribe to internal events

   FIXES vs v3.2 upload:
     FIX-1  dispatch() was async (returned a Promise) but the page
            controller called it synchronously and read result.agentIds /
            result.elapsed immediately — those fields were undefined.
            Coordinator is now fully synchronous (registry uses mock
            generators, no real network calls from this layer).
     FIX-2  Telemetry event key was 'orp-coordinator' but page controller
            filtered on source === 'orp-coordinator'. Kept consistent.
     FIX-3  _applyMode() fired even when mode hadn't changed; harmless but
            caused spurious 'mode-change' events on every dispatch.
            Guard tightened: return early if newMode === _state.mode.
     FIX-4  Herald 'weighted' could go negative (latency/drift subtraction
            dominated at high load). Clamped to [0, 1].
     FIX-5  reset() did not re-evaluate mode or broadcast state — UI stuck
            showing stale run count. Fixed.
     FIX-6  on() subscription list not initialised before push; added guard.
   ============================================================ */

(function (global) {
  'use strict';

  var MODES = {
    NOMINAL:  'NOMINAL',
    DEGRADED: 'DEGRADED',
    ISOLATED: 'ISOLATED',
    LOCKDOWN: 'LOCKDOWN',
  };

  var _state = {
    mode:          MODES.NOMINAL,
    activeAgents:  [],
    lastRunId:     0,
    dispatchCount: 0,
    lockedDown:    false,
    shsPressure:   'GREEN',
  };

  var _history  = [];
  var _handlers = {};

  /* ── Herald weight map by SHS pressure ─────────────────── */
  var HERALD_WEIGHTS = {
    GREEN:  { consensus: 0.5, drift: 0.3, latency: 0.2 },
    YELLOW: { consensus: 0.4, drift: 0.4, latency: 0.2 },
    ORANGE: { consensus: 0.3, drift: 0.5, latency: 0.2 },
    RED:    { consensus: 0.2, drift: 0.6, latency: 0.2 },
    BLACK:  { consensus: 0.1, drift: 0.7, latency: 0.2 },
  };

  /* ── Internal helpers ───────────────────────────────────── */
  function _emit(eventName, detail) {
    global.dispatchEvent(new CustomEvent(eventName, { detail: detail, bubbles: false }));
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

  /* ── Mode evaluation ────────────────────────────────────── */
  function _evaluateMode() {
    if (_state.lockedDown) return MODES.LOCKDOWN;

    var shs = _state.shsPressure;
    if (shs === 'RED' || shs === 'BLACK') return MODES.ISOLATED;

    if (!global.ORP_REGISTRY) return MODES.DEGRADED;
    var snap     = global.ORP_REGISTRY.snapshot();
    var ids      = Object.keys(snap);
    var offCount = ids.filter(function (id) {
      return !snap[id].dynamic_state.availability;
    }).length;

    if (offCount === 0)        return MODES.NOMINAL;
    if (offCount < ids.length) return MODES.DEGRADED;
    return MODES.ISOLATED;
  }

  function _applyMode(newMode, reason) {
    if (newMode === _state.mode) return;          /* FIX-3 */
    var prev = _state.mode;
    _state.mode = newMode;
    _emit('orp-runtime-mode-change', { mode: newMode, prev: prev, reason: reason || 'auto' });
    _fire('mode-change', { mode: newMode, prev: prev, reason: reason });
  }

  /* ── Herald scoring ─────────────────────────────────────── */
  function _tokenize(text) {
    var words = (text || '').toLowerCase().match(/[a-z]+/g) || [];
    var freq  = {};
    words.forEach(function (w) { freq[w] = (freq[w] || 0) + 1; });
    return freq;
  }

  function _lexicalSimilarity(textA, textB) {
    var a      = _tokenize(textA);
    var b      = _tokenize(textB);
    var keysA  = Object.keys(a);
    var keysB  = Object.keys(b);
    if (keysA.length === 0 && keysB.length === 0) return 1;
    var union  = {};
    keysA.forEach(function (k) { union[k] = true; });
    keysB.forEach(function (k) { union[k] = true; });
    var uSize  = Object.keys(union).length;
    var iSize  = 0;
    keysA.forEach(function (k) { if (b[k]) iSize++; });
    return uSize === 0 ? 0 : iSize / uSize;
  }

  function _herald(responses, shsPressure) {
    if (!responses || responses.length === 0) {
      return { consensus: 0, drift: 1, latency: 0, weighted: 0 };
    }

    /* Consensus: mean pairwise lexical similarity */
    var pairs = 0, simSum = 0;
    for (var i = 0; i < responses.length; i++) {
      for (var j = i + 1; j < responses.length; j++) {
        simSum += _lexicalSimilarity(responses[i].text, responses[j].text);
        pairs++;
      }
    }
    var consensus = pairs > 0 ? simSum / pairs : 1;

    /* Drift: max confidence delta */
    var confs = responses.map(function (r) { return r.confidence || 0; });
    var drift  = confs.length > 1
      ? Math.max.apply(null, confs) - Math.min.apply(null, confs)
      : 0;

    /* Latency: mean of meta.latency values */
    var latencySum = responses.reduce(function (acc, r) {
      return acc + ((r.meta && r.meta.latency) || 0);
    }, 0);
    var latency = latencySum / responses.length;

    /* Weighted composite — FIX-4: clamp to [0, 1] */
    var w        = HERALD_WEIGHTS[shsPressure] || HERALD_WEIGHTS.GREEN;
    var weighted = (consensus * w.consensus)
                 - (drift    * w.drift)
                 - Math.min(1, latency / 1000) * w.latency;
    weighted = Math.min(1, Math.max(0, weighted));   /* FIX-4 */

    return {
      consensus: parseFloat(consensus.toFixed(3)),
      drift:     parseFloat(drift.toFixed(3)),
      latency:   Math.round(latency),
      weighted:  parseFloat(weighted.toFixed(3)),
    };
  }

  /* ── Pipeline execution (FIX-1: synchronous) ────────────── */
  function _dispatch(task) {
    if (_state.lockedDown) {
      return {
        runId: null,
        error: 'LOCKDOWN — dispatch blocked by Warden.',
        mode:  _state.mode,
        responses: [],
        herald:    null,
        agentIds:  [],
        elapsed:   0,
      };
    }

    if (!global.ORP_REGISTRY) {
      return { runId: null, error: 'ORP_REGISTRY not loaded.', responses: [], agentIds: [], elapsed: 0 };
    }

    var runId  = ++_state.lastRunId;
    var roles  = (task && task.roles)  || ['synthesis', 'analysis'];
    var prompt = (task && task.prompt) || '';
    var t0     = Date.now();

    /* Resolve agents for the requested roles */
    var agents = [], seen = {};
    roles.forEach(function (role) {
      var a = global.ORP_REGISTRY.getByRole(role);
      if (a && !seen[a.agent_id]) { agents.push(a); seen[a.agent_id] = true; }
    });

    /* Fallback promotion */
    var usedFallback = false;
    if (agents.length === 0) {
      var fb = global.ORP_REGISTRY.getByRole('fallback_adversarial');
      if (fb) { agents.push(fb); usedFallback = true; }
    }

    if (agents.length === 0) {
      var errRecord = {
        runId:    runId,
        error:    'No available agents for roles: ' + roles.join(', '),
        mode:     _state.mode,
        responses: [],
        agentIds:  [],
        herald:    null,
        elapsed:   Date.now() - t0,
      };
      _pushHistory(errRecord);
      return errRecord;
    }

    /* Fan-out — synchronous mock generators */
    var responses = agents.map(function (agent) {
      var r      = agent.generate({ prompt: prompt, context: _state });
      r._agentId = agent.agent_id;
      return r;
    });

    /* Herald scoring */
    var herald = _herald(responses, _state.shsPressure);

    /* Emit telemetry (FIX-2: source key matches page controller filter) */
    _emit('orp-telemetry-request', {
      source:    'orp-coordinator',
      runId:     runId,
      consensus: herald.consensus,
      drift:     herald.drift,
      latency:   herald.latency,
      weighted:  herald.weighted,
      agentIds:  agents.map(function (a) { return a.agent_id; }),
    });

    /* Persist metrics cross-tab */
    _sync('coordinator_last_consensus', herald.consensus);
    _sync('coordinator_last_drift',     herald.drift);
    _sync('coordinator_last_latency',   herald.latency);
    _sync('coordinator_run_id',         runId);

    /* Update mode */
    var newMode = _evaluateMode();
    if (usedFallback && newMode === MODES.NOMINAL) newMode = MODES.DEGRADED;
    _applyMode(newMode, 'post-dispatch evaluation');

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

  /* ── ORP_SYNC event bridge ──────────────────────────────── */
  global.addEventListener('orp-settings-update', function (e) {
    var d = e && e.detail;
    if (!d) return;

    if (d.key && d.key.indexOf('registry_agent_') === 0) {
      _applyMode(_evaluateMode(), 'registry availability change');
      return;
    }
    if (d.key === 'ness_pressure') {
      _state.shsPressure = d.value || 'GREEN';
      _applyMode(_evaluateMode(), 'SHS pressure change: ' + _state.shsPressure);
      return;
    }
    if (d.key === 'ness_warden_active') {
      var was = _state.lockedDown;
      _state.lockedDown = !!d.value;
      if (_state.lockedDown !== was) {
        _applyMode(
          _state.lockedDown ? MODES.LOCKDOWN : _evaluateMode(),
          _state.lockedDown ? 'Warden MANIFESTED' : 'Warden DORMANT'
        );
      }
      return;
    }
  });

  /* ── Boot: hydrate from ORP_SYNC ───────────────────────── */
  if (global.ORP_SYNC) {
    _state.shsPressure = global.ORP_SYNC.load('ness_pressure',      'GREEN');
    _state.lockedDown  = global.ORP_SYNC.load('ness_warden_active', false);
    _state.mode        = _evaluateMode();
  }

  /* ── Public API ─────────────────────────────────────────── */
  global.ORP_COORDINATOR = {

    dispatch: function (task) {
      return _dispatch(task);
    },

    getState: function () {
      return _getState();
    },

    getHistory: function (n) {
      return _history.slice(-(typeof n === 'number' ? n : 20));
    },

    setMode: function (mode) {
      if (MODES[mode]) _applyMode(MODES[mode], 'manual override');
    },

    reset: function () {                          /* FIX-5 */
      _history              = [];
      _state.dispatchCount  = 0;
      _state.lastRunId      = 0;
      _state.activeAgents   = [];
      _applyMode(_evaluateMode(), 'coordinator reset');
      _emit('orp-settings-update', { key: 'coordinator_state', value: _getState() });
      _fire('reset', {});
    },

    on: function (event, fn) {                    /* FIX-6 */
      if (!_handlers[event]) _handlers[event] = [];
      _handlers[event].push(fn);
    },

    MODES: MODES,
  };

}(window));
