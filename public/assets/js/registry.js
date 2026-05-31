/* ============================================================
   ORP v3.2 | SWARM CAPABILITY REGISTRY  (registry.js)
   ============================================================
   Load via <script src="assets/js/registry.js"></script>
   AFTER orp-sync.js, BEFORE orp-coordinator.js.

   PUBLIC API:
     ORP_REGISTRY.get(agentId)           — full agent record or undefined
     ORP_REGISTRY.getByRole(role)        — first available agent for role
     ORP_REGISTRY.getAllByRole(role)     — all agents supporting role
     ORP_REGISTRY.setAvailable(id, bool) — toggle + emit orp-settings-update
     ORP_REGISTRY.listRoles()            — deduplicated role catalogue
     ORP_REGISTRY.snapshot()            — serializable state of all agents

   EVENTS EMITTED:
     'orp-settings-update'  { key: 'registry_agent_<id>', value: agentRecord }
       — fires on every setAvailable() call so the Coordinator re-evaluates

   EVENTS CONSUMED: none (registry is read-only at runtime except availability)

   BEHAVIORAL PROFILES:
     Each agent carries a mock response generator — a deterministic function
     that returns a structured payload matching that agent's epistemic posture.
     This lets orp-coordinator.js run the full Herald scoring pipeline against
     realistic output shapes without touching any external network.

   PATCH LOG:
     v1.0.0 — Initial registry. Four agents: grok, claude, gpt, copilot.
               Behavioral profiles seeded with role-authentic response shapes.
     v1.1.0 — Added ORP_REGISTRY.snapshot() for Coordinator hydration on boot.
               setAvailable() now persists via ORP_SYNC when present.
               Fallback chain documented per agent.
   ============================================================ */

(function (global) {
  'use strict';

  /* ── Behavioral mock generators ────────────────────────────
     Each generator receives a { prompt, context } object and
     returns a structured AgentResponse:
       { text: string, confidence: number (0–1), meta: object }

     These are deterministic sandboxed simulators — no network
     calls, no API keys. Real transport can replace the generator
     property when the backend is available.
  ─────────────────────────────────────────────────────────── */

  function _mockGrok(task) {
    var prompt = (task && task.prompt) || '';
    var angle  = prompt.length % 4;
    var critiques = [
      'The consensus framing here suppresses the more interesting variance. Consider: what does the minority interpretation reveal that agreement conceals?',
      'Epistemic comfort is not evidence. The claim rests on inductive scaffolding that collapses under adversarial pressure. Reconstruct from first principles.',
      'The synthesis is coherent — but coherence is not truth. Three internal contradictions visible on second read. Flag them or own them.',
      'Agreement among similar-architecture models is not independent confirmation. This is correlation dressed as convergence. Challenge the prior.',
    ];
    return {
      text:       critiques[angle],
      confidence: 0.55 + (prompt.length % 30) / 100,
      meta: {
        role:     'adversarial',
        posture:  'challenge',
        tokens:   critiques[angle].split(' ').length,
        latency:  180 + (prompt.length % 120),
      },
    };
  }

  function _mockClaude(task) {
    var prompt = (task && task.prompt) || '';
    var angle  = prompt.length % 4;
    var analyses = [
      'Multi-axis evaluation complete. Primary claim holds under deductive scrutiny; however, two empirical premises carry unverified load. Recommend flagging uncertainty bounds before propagation.',
      'Structural analysis: the argument is valid but not sound. The first premise requires independent verification. Confidence on logical form: 0.91. Confidence on factual grounding: 0.63.',
      'Cross-referenced against internal consistency. No logical contradictions detected. Caveats: scope is narrower than framing implies — external generalization should be hedged.',
      'Fallback adversarial check engaged. The strongest counter-argument targets the assumed causal direction. Reversing the arrow produces an equally consistent model — this is underspecified.',
    ];
    return {
      text:       analyses[angle],
      confidence: 0.72 + (prompt.length % 20) / 100,
      meta: {
        role:     'analysis',
        posture:  'systematic',
        tokens:   analyses[angle].split(' ').length,
        latency:  210 + (prompt.length % 90),
      },
    };
  }

  function _mockGPT(task) {
    var prompt = (task && task.prompt) || '';
    var angle  = prompt.length % 4;
    var syntheses = [
      'Synthesizing inputs: core thesis is well-supported. Integrating adversarial signals yields a refined claim with tighter scope. Recommended formulation: [qualifier] + [core assertion] + [boundary condition].',
      'Cross-agent synthesis complete. Points of convergence: 3. Points of divergence: 2. Divergence cluster around causal attribution and temporal scope. Propose: hold both framings as provisional until more data.',
      'General integration pass: logical backbone is intact. Weaker nodes are the two empirical anchors flagged in analysis. Suggest routing those to verification before consensus lock.',
      'Synthesis output: the aggregate claim is more defensible than any single input. Recommend publishing with explicit epistemic hedges on the two unresolved branches.',
    ];
    return {
      text:       syntheses[angle],
      confidence: 0.78 + (prompt.length % 15) / 100,
      meta: {
        role:     'synthesis',
        posture:  'integrative',
        tokens:   syntheses[angle].split(' ').length,
        latency:  155 + (prompt.length % 100),
      },
    };
  }

  function _mockCopilot(task) {
    var prompt = (task && task.prompt) || '';
    var angle  = prompt.length % 4;
    var impls  = [
      '// Implementation pattern: event-driven state machine\nconst state = ORP_SYNC.load("ness_pressure", "GREEN");\nconst handler = ROLE_MAP[state] ?? ROLE_MAP.GREEN;\nhandler.execute(payload);',
      '// Runtime binding: coordinator → registry lookup\nconst agent = ORP_REGISTRY.getByRole("synthesis");\nif (!agent) return fallbackHandler(task);\nconst result = agent.generate(task);',
      '// Telemetry emission pattern\nwindow.dispatchEvent(new CustomEvent("orp-telemetry-request", {\n  detail: { source: "copilot", metric: "latency", value: result.meta.latency }\n}));',
      '// Availability guard with fallback chain\nconst primary = ORP_REGISTRY.get("grok");\nconst active  = primary?.dynamic_state.availability\n  ? primary\n  : ORP_REGISTRY.getByRole("fallback_adversarial");',
    ];
    return {
      text:       impls[angle],
      confidence: 0.88,
      meta: {
        role:     'implementation',
        posture:  'concrete',
        tokens:   impls[angle].split('\n').length,
        latency:  95 + (prompt.length % 60),
        language: 'javascript',
      },
    };
  }

  /* ── Core registry ───────────────────────────────────────── */
  var _agents = {
    grok: {
      agent_id:        'grok',
      display_name:    'Grok',
      supported_roles: ['adversarial', 'truth'],
      fallback_for:    [],
      dynamic_state:   { availability: true },
      generate:        _mockGrok,
    },
    claude: {
      agent_id:        'claude',
      display_name:    'Claude',
      supported_roles: ['analysis', 'critic', 'fallback_adversarial'],
      fallback_for:    ['grok'],
      dynamic_state:   { availability: true },
      generate:        _mockClaude,
    },
    gpt: {
      agent_id:        'gpt',
      display_name:    'GPT',
      supported_roles: ['synthesis', 'general'],
      fallback_for:    [],
      dynamic_state:   { availability: true },
      generate:        _mockGPT,
    },
    copilot: {
      agent_id:        'copilot',
      display_name:    'Copilot',
      supported_roles: ['implementation', 'runtime'],
      fallback_for:    [],
      dynamic_state:   { availability: true },
      generate:        _mockCopilot,
    },
  };

  /* ── Availability persistence helper ─────────────────────── */
  function _persistAvailability(agentId, value) {
    var key = 'registry_agent_' + agentId;
    if (global.ORP_SYNC) {
      global.ORP_SYNC.save(key, value);
    } else {
      global.dispatchEvent(new CustomEvent('orp-settings-update', {
        detail: { key: key, value: value },
        bubbles: false,
      }));
    }
  }

  /* ── Restore persisted availability on boot ───────────────── */
  Object.keys(_agents).forEach(function (id) {
    if (global.ORP_SYNC) {
      var stored = global.ORP_SYNC.load('registry_agent_' + id, null);
      if (stored !== null && typeof stored.availability === 'boolean') {
        _agents[id].dynamic_state.availability = stored.availability;
      }
    }
  });

  /* ── Public API ───────────────────────────────────────────── */
  global.ORP_REGISTRY = {

    /**
     * Return the full agent record or undefined.
     * @param {string} agentId
     * @returns {Object|undefined}
     */
    get: function (agentId) {
      return _agents[agentId];
    },

    /**
     * Return the first AVAILABLE agent that supports the given role.
     * Respects the fallback chain: if the primary agent for a role is
     * unavailable, walks all agents for fallback_adversarial, etc.
     * @param {string} role
     * @returns {Object|null}
     */
    getByRole: function (role) {
      var ids = Object.keys(_agents);
      for (var i = 0; i < ids.length; i++) {
        var a = _agents[ids[i]];
        if (a.supported_roles.indexOf(role) !== -1 && a.dynamic_state.availability) {
          return a;
        }
      }
      return null;
    },

    /**
     * Return ALL available agents that support a role.
     * @param {string} role
     * @returns {Object[]}
     */
    getAllByRole: function (role) {
      return Object.keys(_agents)
        .map(function (id) { return _agents[id]; })
        .filter(function (a) {
          return a.supported_roles.indexOf(role) !== -1 && a.dynamic_state.availability;
        });
    },

    /**
     * Toggle agent availability and emit orp-settings-update.
     * @param {string}  agentId
     * @param {boolean} available
     */
    setAvailable: function (agentId, available) {
      if (!_agents[agentId]) return;
      _agents[agentId].dynamic_state.availability = !!available;
      _persistAvailability(agentId, { availability: !!available });
    },

    /**
     * Return a deduplicated list of all declared roles.
     * @returns {string[]}
     */
    listRoles: function () {
      var seen = {};
      Object.keys(_agents).forEach(function (id) {
        _agents[id].supported_roles.forEach(function (r) { seen[r] = true; });
      });
      return Object.keys(seen).sort();
    },

    /**
     * Return a serializable snapshot of all agent records
     * (without the generate function — safe for JSON).
     * @returns {Object}
     */
    snapshot: function () {
      var out = {};
      Object.keys(_agents).forEach(function (id) {
        var a = _agents[id];
        out[id] = {
          agent_id:        a.agent_id,
          display_name:    a.display_name,
          supported_roles: a.supported_roles.slice(),
          fallback_for:    a.fallback_for.slice(),
          dynamic_state:   { availability: a.dynamic_state.availability },
        };
      });
      return out;
    },
  };

}(window));
