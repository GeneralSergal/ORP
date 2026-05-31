/**
 * ORP Δ Coordinator v3.6
 *
 * SPEC ALIGNMENT: ORP_STATE_TRANSITION_MODEL.md
 *
 * What changed vs v3.5 (the uploaded JSX):
 *
 *   OLD (wrong):
 *     const newMode = h.consensus < 0.2 ? "ISOLATED" : h.consensus < 0.5 ? "DEGRADED" : "NOMINAL";
 *     — single-step threshold on one metric, instant snap-back on recovery
 *
 *   NEW (spec-aligned):
 *     1. σ² is variance over a rolling window of runs, not a single reading.
 *     2. SHS (GREEN→BLACK) is computed separately from operational mode.
 *        SHS is the health signal. NOMINAL/DEGRADED/ISOLATED is the L3 response to SHS.
 *     3. Escalation requires a sustained trend (WINDOW_ESCALATE consecutive readings above threshold).
 *     4. Recovery requires sustained stability (WINDOW_RECOVER consecutive readings below threshold).
 *     5. L3 override: governance can hold a state regardless of σ² via a lockReason flag.
 *
 * Unchanged from v3.5:
 *   - All UI layout, colors, fonts, component structure
 *   - API call logic (callClaude, simulateAgent)
 *   - Herald scoring (Jaccard consensus, drift, latency weighting)
 *   - Log, reset, keyboard shortcut
 */

import { useState, useRef, useCallback, useEffect, useReducer } from "react";

// ─── ORP_STATE_TRANSITION_MODEL ────────────────────────────────────────────────
//
// σ² thresholds (from ORP_SIGMA_SQUARED_DRIFT.md — FROZEN, do not alter)
const SIGMA = {
  NONE:     0.01,   // < 0.01  → fully stable
  LOW:      0.05,   // 0.01–0.05 → early smoothing
  MODERATE: 0.15,   // 0.05–0.15 → notable instability
  // HIGH: ≥ 0.15  → critical
};

// Evaluation window sizes (how many consecutive readings before a transition commits)
const WINDOW_ESCALATE = 2;  // need N above-threshold readings to escalate
const WINDOW_RECOVER  = 3;  // need N below-threshold readings to recover

// SHS state ordering (index = severity)
const SHS_STATES = ["GREEN", "YELLOW", "ORANGE", "RED", "BLACK"];

// Operational mode derived from SHS (L3 mapping)
function shsToMode(shs) {
  if (shs === "BLACK" || shs === "RED") return "ISOLATED";
  if (shs === "ORANGE" || shs === "YELLOW") return "DEGRADED";
  return "NOMINAL";
}

// σ² computation — variance of a numeric array
function computeSigmaSquared(window) {
  if (window.length < 2) return 0;
  const mean = window.reduce((a, b) => a + b, 0) / window.length;
  const variance = window.reduce((sq, v) => sq + Math.pow(v - mean, 2), 0) / window.length;
  return parseFloat(variance.toFixed(6));
}

// Classify σ² into drift level
function classifyDrift(sigma2) {
  if (sigma2 < SIGMA.NONE)     return "NONE";
  if (sigma2 < SIGMA.LOW)      return "LOW";
  if (sigma2 < SIGMA.MODERATE) return "MODERATE";
  return "HIGH";
}

// Initial SHS state machine state
const initialSHSState = {
  shs:            "GREEN",       // current SHS state
  sigma2:         0,             // current variance
  driftLevel:     "NONE",        // NONE | LOW | MODERATE | HIGH
  driftWindow:    [],            // rolling signal window (last N drift values)
  escalateCount:  0,             // consecutive readings above threshold
  recoverCount:   0,             // consecutive readings below threshold
  lockReason:     null,          // if set, L3 is holding state (string label)
  transitionLog:  [],            // audit trail of SHS transitions
};

// L3 Governance: compute next SHS state
// This is the deterministic transition function from ORP_STATE_TRANSITION_MODEL.md
function computeNextSHS(current, sigma2, lockReason) {
  // L3 override: if governance holds the state, no transition
  if (lockReason) return current;

  // BLACK is a hard lock — only manual L3 intervention clears it
  if (current === "BLACK") return "BLACK";

  const drift = classifyDrift(sigma2);
  const idx   = SHS_STATES.indexOf(current);

  // Escalation rules
  if (drift === "HIGH"     && idx < 4) return SHS_STATES[Math.min(idx + 2, 4)]; // RED/BLACK fast path
  if (drift === "MODERATE" && idx < 3) return SHS_STATES[idx + 1];              // one step up
  if (drift === "LOW"      && idx < 2) return "YELLOW";                          // early warning

  // Recovery rules — only allowed when drift is LOW or NONE
  if ((drift === "NONE" || drift === "LOW") && idx > 0) {
    return SHS_STATES[Math.max(idx - 1, 0)]; // one step down
  }

  return current; // no change
}

// SHS reducer — all state machine transitions go through here
function shsReducer(state, action) {
  switch (action.type) {

    case "OBSERVE_SIGNAL": {
      // action.payload: { driftSignal: number (0–1 from Herald) }
      const signal = action.payload.driftSignal;

      // Append to rolling window, cap at 8 readings
      const newWindow = [...state.driftWindow, signal].slice(-8);
      const sigma2    = computeSigmaSquared(newWindow);
      const drift     = classifyDrift(sigma2);

      // Count sustained trend for escalation / recovery
      const isAbove = drift === "HIGH" || drift === "MODERATE";
      const isBelow = drift === "NONE" || drift === "LOW";

      const newEscalateCount = isAbove ? state.escalateCount + 1 : 0;
      const newRecoverCount  = isBelow ? state.recoverCount  + 1 : 0;

      // Only commit a transition if trend is sustained
      const shouldEscalate = isAbove && newEscalateCount >= WINDOW_ESCALATE;
      const shouldRecover  = isBelow && newRecoverCount  >= WINDOW_RECOVER;

      let nextSHS = state.shs;
      let logEntry = null;

      if (shouldEscalate || shouldRecover) {
        const candidate = computeNextSHS(state.shs, sigma2, state.lockReason);
        if (candidate !== state.shs) {
          nextSHS  = candidate;
          logEntry = {
            ts:      new Date().toLocaleTimeString("en-US", { hour12: false }),
            from:    state.shs,
            to:      candidate,
            sigma2:  sigma2.toFixed(4),
            drift,
            trigger: shouldEscalate ? "ESCALATION" : "RECOVERY",
          };
        }
      }

      return {
        ...state,
        sigma2,
        driftLevel:    drift,
        driftWindow:   newWindow,
        escalateCount: newEscalateCount,
        recoverCount:  newRecoverCount,
        shs:           nextSHS,
        transitionLog: logEntry
          ? [...state.transitionLog.slice(-19), logEntry]
          : state.transitionLog,
      };
    }

    case "L3_OVERRIDE": {
      // action.payload: { shs: string, reason: string }
      const { shs, reason } = action.payload;
      return {
        ...state,
        shs,
        lockReason:    reason || "L3_MANUAL",
        escalateCount: 0,
        recoverCount:  0,
        transitionLog: [...state.transitionLog.slice(-19), {
          ts:      new Date().toLocaleTimeString("en-US", { hour12: false }),
          from:    state.shs,
          to:      shs,
          sigma2:  state.sigma2.toFixed(4),
          drift:   state.driftLevel,
          trigger: "L3_OVERRIDE",
          reason,
        }],
      };
    }

    case "L3_RELEASE": {
      // Remove governance hold — allow σ² to drive state again
      return { ...state, lockReason: null };
    }

    case "RESET": {
      return { ...initialSHSState };
    }

    default:
      return state;
  }
}

// ─── Herald scoring (unchanged from v3.5) ─────────────────────────────────────

const HERALD_WEIGHTS = { consensus: 0.50, drift: 0.30, latency: 0.20 };

function computeJaccard(a, b) {
  const w1 = (a.toLowerCase().match(/\b\w+\b/g) || []);
  const w2 = (b.toLowerCase().match(/\b\w+\b/g) || []);
  if (!w1.length && !w2.length) return 1;
  const s1 = new Set(w1), s2 = new Set(w2);
  const union = new Set([...s1, ...s2]);
  let inter = 0;
  for (const w of union) if (s1.has(w) && s2.has(w)) inter++;
  return inter / union.size;
}

function scoreHerald(responses) {
  const valid = responses.filter(r => r.ok);
  let consensus = 1.0;
  if (valid.length > 1) {
    let total = 0, pairs = 0;
    for (let i = 0; i < valid.length; i++)
      for (let j = i + 1; j < valid.length; j++) {
        total += computeJaccard(valid[i].text, valid[j].text);
        pairs++;
      }
    consensus = pairs > 0 ? total / pairs : 1.0;
  }
  const drift    = Math.min(Math.max(1 - consensus, 0), 1);
  const avgLat   = valid.length > 0 ? valid.reduce((a, r) => a + r.latency, 0) / valid.length : 1500;
  const latScore = Math.max(0, 1 - avgLat / 6000);
  const weighted = consensus * HERALD_WEIGHTS.consensus
                 + (1 - drift) * HERALD_WEIGHTS.drift
                 + latScore * HERALD_WEIGHTS.latency;
  return {
    consensus: parseFloat(consensus.toFixed(3)),
    drift:     parseFloat(drift.toFixed(3)),
    latency:   Math.round(avgLat),
    weighted:  parseFloat(weighted.toFixed(3)),
  };
}

// ─── API calls (unchanged from v3.5) ──────────────────────────────────────────

async function callClaude(prompt, systemPrompt) {
  const t0 = Date.now();
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    const data = await res.json();
    const text = (data.content || []).map(b => b.text || "").join("");
    return { ok: true, text: text.trim(), latency: Date.now() - t0, agentId: "claude" };
  } catch (e) {
    return { ok: false, text: `[FAULT] ${e.message}`, latency: Date.now() - t0, agentId: "claude" };
  }
}

function simulateAgent(agentId, prompt, latencyBase) {
  return new Promise(resolve => {
    const delay = latencyBase + Math.random() * 600;
    setTimeout(async () => {
      const t0 = Date.now();
      const systemPrompt = agentId === "gpt"
        ? "You are GPT-4o. Provide a precise, structured answer. Be analytical and well-organized."
        : "You are Grok. Provide a direct, slightly unconventional answer with sharp observations.";
      try {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 1000,
            system: systemPrompt + " Keep your response under 200 words.",
            messages: [{ role: "user", content: prompt }],
          }),
        });
        const data = await res.json();
        const text = (data.content || []).map(b => b.text || "").join("");
        resolve({ ok: true, text: text.trim(), latency: Math.round(delay + Date.now() - t0), agentId });
      } catch (e) {
        resolve({ ok: false, text: `[TRANSPORT FAULT] ${e.message}`, latency: Math.round(delay), agentId });
      }
    }, delay);
  });
}

// ─── UI Components ─────────────────────────────────────────────────────────────

const AGENTS = [
  { id: "claude", label: "Claude", color: "#e07b54", accent: "rgba(224,123,84,0.15)", border: "rgba(224,123,84,0.35)" },
  { id: "gpt",    label: "GPT",   color: "#10a37f", accent: "rgba(16,163,127,0.12)",  border: "rgba(16,163,127,0.30)" },
  { id: "grok",   label: "Grok",  color: "#7b8cde", accent: "rgba(123,140,222,0.12)", border: "rgba(123,140,222,0.30)" },
];

const SHS_COLORS = {
  GREEN:  "#39ff14",
  YELLOW: "#ffdb00",
  ORANGE: "#ff6600",
  RED:    "#ff3333",
  BLACK:  "#880000",
};

const MODE_COLORS = {
  NOMINAL:  "#39ff14",
  DEGRADED: "#ffab00",
  ISOLATED: "#ff3333",
  LOCKDOWN: "#880000",
};

function OrbPulse({ color, size = 8 }) {
  return (
    <span style={{
      display: "inline-block", width: size, height: size, borderRadius: "50%",
      background: color, flexShrink: 0,
      animation: "pulse 2s ease infinite",
    }} />
  );
}

function MetricCard({ label, value, sub, color, barVal }) {
  return (
    <div style={{
      background: "#111115", border: "1px solid #1e1e28",
      borderRadius: 6, padding: "16px 18px", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: color, opacity: barVal > 0 ? 0.85 : 0,
        transition: "opacity 0.5s",
      }} />
      <div style={{ fontSize: 10, fontFamily: "monospace", color: "#555", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
        {label}
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "monospace", color: color || "#fff", letterSpacing: "-0.03em", lineHeight: 1 }}>
        {value ?? "—"}
      </div>
      <div style={{ fontSize: 11, color: "#444", marginTop: 4, fontFamily: "monospace" }}>{sub}</div>
      <div style={{ height: 2, background: "rgba(255,255,255,0.04)", borderRadius: 1, marginTop: 10, overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 1, background: color,
          transform: `scaleX(${barVal ?? 0})`, transformOrigin: "left",
          transition: "transform 0.6s cubic-bezier(0.2,0,0,1)",
        }} />
      </div>
    </div>
  );
}

function LogLine({ entry }) {
  const colors = { OK: "#39ff14", WARN: "#ffab00", ERR: "#ff3333", INF: "#00d4ff", SHS: "#ffdb00" };
  return (
    <div style={{ display: "flex", gap: 8, fontSize: 11, fontFamily: "monospace", padding: "2px 0", lineHeight: 1.5 }}>
      <span style={{ color: "#444", flexShrink: 0 }}>{entry.ts}</span>
      <span style={{ color: colors[entry.tag] || "#888", flexShrink: 0, fontWeight: 700 }}>[{entry.tag}]</span>
      <span style={{ color: "#888" }}>{entry.msg}</span>
    </div>
  );
}

function AgentCard({ agent, response, streaming }) {
  const cfg = AGENTS.find(a => a.id === agent.id);
  return (
    <div style={{
      background: "#0d0d10", border: `1px solid ${response ? cfg.border : "#1e1e28"}`,
      borderRadius: 6, padding: "14px 16px",
      transition: "border-color 0.4s ease",
      animation: response ? "slideIn 0.3s ease both" : "none",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: response ? 10 : 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <OrbPulse color={streaming && !response ? "#ffab00" : (response?.ok ? cfg.color : "#333")} size={7} />
          <span style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 700, color: cfg.color, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            {cfg.label}
          </span>
        </div>
        {response && (
          <span style={{ fontSize: 10, fontFamily: "monospace", color: "#444" }}>
            {response.latency}ms · {response.ok ? "RESOLVED" : "FAULT"}
          </span>
        )}
      </div>
      {streaming && !response && (
        <div style={{ fontSize: 11, fontFamily: "monospace", color: "#ffab00", marginTop: 8, animation: "blink 1s step-end infinite" }}>
          PROCESSING...
        </div>
      )}
      {response && (
        <div style={{ fontSize: 12, fontFamily: "monospace", color: response.ok ? "#b0b0bc" : "#ff3333", lineHeight: 1.7, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
          {response.text}
        </div>
      )}
    </div>
  );
}

// SHS state panel — new component, no equivalent in v3.5
function SHSPanel({ shsState, onL3Override, onL3Release }) {
  const { shs, sigma2, driftLevel, driftWindow, escalateCount, recoverCount, lockReason, transitionLog } = shsState;
  const color = SHS_COLORS[shs] || "#39ff14";

  return (
    <div style={{ background: "#0d0d10", border: `1px solid ${color}22`, borderRadius: 6, padding: "16px 18px" }}>
      <div style={{ fontSize: 9, fontFamily: "Oxanium, monospace", fontWeight: 700, color: "#555", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span>System Health State</span>
        {lockReason && (
          <span style={{ color: "#ffab00", fontSize: 9 }}>⚠ L3 HOLD</span>
        )}
      </div>

      {/* SHS badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div style={{
          fontFamily: "Oxanium, monospace", fontWeight: 800, fontSize: 22,
          color, letterSpacing: "0.06em",
          textShadow: `0 0 12px ${color}66`,
          transition: "color 0.4s ease, text-shadow 0.4s ease",
        }}>
          {shs}
        </div>
        <div style={{ fontSize: 10, fontFamily: "monospace", color: "#444" }}>
          σ²={sigma2.toFixed(4)}<br/>
          drift={driftLevel}
        </div>
      </div>

      {/* Drift window visualization */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 9, color: "#444", fontFamily: "monospace", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>
          Signal Window ({driftWindow.length}/8)
        </div>
        <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 28 }}>
          {Array.from({ length: 8 }, (_, i) => {
            const val = driftWindow[i] ?? 0;
            const barColor = val > 0.8 ? SHS_COLORS.RED : val > 0.5 ? SHS_COLORS.ORANGE : val > 0.2 ? SHS_COLORS.YELLOW : SHS_COLORS.GREEN;
            return (
              <div key={i} style={{
                flex: 1, background: i < driftWindow.length ? barColor : "#1a1a22",
                borderRadius: 2, height: `${Math.max(4, val * 28)}px`,
                opacity: i < driftWindow.length ? 0.85 : 0.2,
                transition: "height 0.3s ease",
              }} />
            );
          })}
        </div>
      </div>

      {/* Trend counters */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
        {[
          { label: "Escalate count", val: `${escalateCount}/${WINDOW_ESCALATE}`, color: escalateCount > 0 ? "#ff6600" : "#444" },
          { label: "Recover count",  val: `${recoverCount}/${WINDOW_RECOVER}`,   color: recoverCount  > 0 ? "#39ff14" : "#444" },
        ].map(({ label, val, color: c }) => (
          <div key={label} style={{ background: "#080809", border: "1px solid #111116", borderRadius: 4, padding: "8px 10px" }}>
            <div style={{ fontSize: 9, color: "#444", fontFamily: "monospace", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 3 }}>{label}</div>
            <div style={{ fontSize: 13, fontFamily: "monospace", fontWeight: 700, color: c }}>{val}</div>
          </div>
        ))}
      </div>

      {/* L3 controls */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 9, color: "#555", fontFamily: "monospace", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
          L3 Governance Override
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {SHS_STATES.map(s => (
            <button key={s} onClick={() => onL3Override(s)} style={{
              background: shs === s ? `${SHS_COLORS[s]}18` : "transparent",
              border: `1px solid ${shs === s ? SHS_COLORS[s] + "55" : "#1e1e28"}`,
              color: shs === s ? SHS_COLORS[s] : "#555",
              fontFamily: "Oxanium, monospace", fontSize: 9, fontWeight: 700,
              letterSpacing: "0.1em", padding: "4px 9px", borderRadius: 3,
              cursor: "pointer", transition: "all 0.2s",
            }}>
              {s}
            </button>
          ))}
          {lockReason && (
            <button onClick={onL3Release} style={{
              background: "rgba(255,171,0,0.08)", border: "1px solid rgba(255,171,0,0.3)",
              color: "#ffab00", fontFamily: "Oxanium, monospace", fontSize: 9, fontWeight: 700,
              letterSpacing: "0.1em", padding: "4px 9px", borderRadius: 3,
              cursor: "pointer", transition: "all 0.2s",
            }}>
              RELEASE HOLD
            </button>
          )}
        </div>
      </div>

      {/* Transition log */}
      {transitionLog.length > 0 && (
        <div>
          <div style={{ fontSize: 9, color: "#444", fontFamily: "monospace", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>
            Transition Audit
          </div>
          <div style={{ maxHeight: 100, overflowY: "auto", display: "flex", flexDirection: "column", gap: 2 }}>
            {[...transitionLog].reverse().map((t, i) => (
              <div key={i} style={{ fontSize: 10, fontFamily: "monospace", color: "#555", display: "flex", gap: 6 }}>
                <span style={{ color: "#333" }}>{t.ts}</span>
                <span style={{ color: SHS_COLORS[t.from] || "#888" }}>{t.from}</span>
                <span style={{ color: "#333" }}>→</span>
                <span style={{ color: SHS_COLORS[t.to] || "#888" }}>{t.to}</span>
                <span style={{ color: "#333" }}>σ²={t.sigma2}</span>
                <span style={{ color: t.trigger === "L3_OVERRIDE" ? "#ffab00" : "#444" }}>{t.trigger}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function ORPCoordinator() {
  const [prompt,         setPrompt]         = useState("");
  const [running,        setRunning]         = useState(false);
  const [responses,      setResponses]       = useState(null);
  const [herald,         setHerald]          = useState(null);
  const [log,            setLog]             = useState([
    { ts: "00:00:00", tag: "INF", msg: "Coordinator boot — awaiting first dispatch." },
    { ts: "00:00:00", tag: "INF", msg: "SHS initialised GREEN · σ²=0 · drift=NONE" },
  ]);
  const [dispatchCount,  setDispatchCount]   = useState(0);
  const [streamingAgents,setStreamingAgents] = useState([]);
  const [runId,          setRunId]           = useState(0);

  // SHS state machine — replaces the single `mode` useState from v3.5
  const [shsState, shsDispatch] = useReducer(shsReducer, initialSHSState);

  // Derive operational mode from SHS (L3 mapping)
  const mode = shsState.lockReason === "LOCKDOWN"
    ? "LOCKDOWN"
    : shsToMode(shsState.shs);

  const logRef    = useRef(null);
  const promptRef = useRef(null);

  const addLog = useCallback((tag, msg) => {
    const ts = new Date().toLocaleTimeString("en-US", { hour12: false });
    setLog(prev => [...prev.slice(-80), { ts, tag, msg }]);
  }, []);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [log]);

  const handleDispatch = useCallback(async () => {
    const task = prompt.trim();
    if (!task) return;

    // ISOLATED and LOCKDOWN block dispatch — per spec
    if (mode === "ISOLATED" || mode === "LOCKDOWN") {
      addLog("ERR", `Dispatch blocked — mode: ${mode}`);
      return;
    }

    setRunning(true);
    setResponses(null);
    setHerald(null);
    setStreamingAgents(["claude", "gpt", "grok"]);
    const thisRun = runId + 1;
    setRunId(thisRun);
    setDispatchCount(c => c + 1);
    addLog("INF", `Dispatch #${thisRun} → [claude, gpt, grok] — "${task.substring(0, 55)}${task.length > 55 ? "…" : ""}"`);

    const claudeSystem = "You are Claude, a thoughtful AI assistant. Respond with care and precision. Keep your response under 200 words.";

    try {
      const [c, g, gk] = await Promise.all([
        callClaude(task, claudeSystem),
        simulateAgent("gpt",  task, 400),
        simulateAgent("grok", task, 600),
      ]);

      const results = [c, g, gk];
      setResponses(results);
      setStreamingAgents([]);

      const h = scoreHerald(results);
      setHerald(h);

      // ── SPEC ALIGNMENT: feed drift signal into SHS state machine ──
      // Herald drift (0–1) is our L1 signal proxy.
      // σ² is computed over the rolling window inside shsReducer.
      shsDispatch({ type: "OBSERVE_SIGNAL", payload: { driftSignal: h.drift } });

      // Log any pending SHS transitions (checked after state settles via useEffect below)

      results.forEach(r => {
        addLog(r.ok ? "OK" : "ERR",
          `[${r.agentId.toUpperCase()}] ${r.ok ? "RESOLVED" : "FAULT"} · ${r.latency}ms`
        );
      });

      addLog("OK",
        `Run #${thisRun} — consensus:${h.consensus} drift:${h.drift} σ²-window:${shsState.driftWindow.length + 1} herald:${h.weighted}`
      );

    } catch (e) {
      addLog("ERR", `PIPELINE FAULT: ${e.message}`);
      setStreamingAgents([]);
    } finally {
      setRunning(false);
    }
  }, [prompt, runId, addLog, mode, shsState.driftWindow.length]);

  // Log SHS transitions whenever transitionLog grows
  const prevTransitionCount = useRef(0);
  useEffect(() => {
    const { transitionLog, shs, sigma2, driftLevel } = shsState;
    if (transitionLog.length > prevTransitionCount.current) {
      const t = transitionLog[transitionLog.length - 1];
      addLog("SHS", `${t.from} → ${t.to} · ${t.trigger} · σ²=${t.sigma2} · drift=${t.drift}`);
      prevTransitionCount.current = transitionLog.length;
    }
  }, [shsState, addLog]);

  const handleKey = useCallback((e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); handleDispatch(); }
  }, [handleDispatch]);

  const handleReset = useCallback(() => {
    setResponses(null); setHerald(null);
    setRunId(0); setDispatchCount(0);
    shsDispatch({ type: "RESET" });
    prevTransitionCount.current = 0;
    setLog([
      { ts: new Date().toLocaleTimeString("en-US", { hour12: false }), tag: "WARN", msg: "Coordinator reset — history cleared." },
      { ts: new Date().toLocaleTimeString("en-US", { hour12: false }), tag: "INF",  msg: "SHS reset → GREEN · σ²=0" },
    ]);
  }, []);

  const handleL3Override = useCallback((targetSHS) => {
    const reason = targetSHS === shsState.shs ? null : `MANUAL_SET_${targetSHS}`;
    shsDispatch({ type: "L3_OVERRIDE", payload: { shs: targetSHS, reason } });
    addLog("WARN", `L3 override → SHS: ${targetSHS}`);
  }, [shsState.shs, addLog]);

  const handleL3Release = useCallback(() => {
    shsDispatch({ type: "L3_RELEASE" });
    addLog("INF", "L3 governance hold released — σ² resuming control");
  }, [addLog]);

  const modeColor = MODE_COLORS[mode] || "#39ff14";
  const shsColor  = SHS_COLORS[shsState.shs] || "#39ff14";

  const heraldBarVal = herald ? {
    consensus: herald.consensus,
    drift:     herald.drift,
    latency:   Math.max(0, 1 - herald.latency / 6000),
    weighted:  herald.weighted,
  } : {};

  return (
    <div style={{ background: "#080809", minHeight: "100vh", color: "#d1d1d6", fontFamily: "'Space Grotesk', 'Segoe UI', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Oxanium:wght@400;700;800&display=swap');
        @keyframes pulse  { 0%,100%{box-shadow:0 0 0 0 currentColor} 50%{box-shadow:0 0 0 5px transparent} }
        @keyframes blink  { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes slideIn{ from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar       { width: 4px; }
        ::-webkit-scrollbar-track { background: #0d0d10; }
        ::-webkit-scrollbar-thumb { background: #1e1e28; border-radius: 2px; }
        textarea:focus, button:focus { outline: none; }
      `}</style>

      {/* Mode bar — color reflects operational mode, not SHS directly */}
      <div style={{
        height: 3, background: modeColor, opacity: 0.8,
        transition: "background 0.4s ease",
        ...(mode === "LOCKDOWN" ? { animation: "blink 1.2s ease infinite" } : {}),
      }} />

      {/* Header */}
      <div style={{ borderBottom: "1px solid #111116", padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="32" height="32" viewBox="0 0 100 100" fill="none">
            <polygon points="50,22 74,64 26,64" stroke="#dd1111" strokeWidth="2.5" fill="rgba(221,17,17,0.08)" strokeLinejoin="round" />
            <polygon points="50,34 64,58 36,58" stroke="#ff6600" strokeWidth="1.8" fill="none" strokeLinejoin="round" />
            <polygon points="50,44 55,50 50,56 45,50" fill="#ff4400" fillOpacity="0.9" />
            <circle cx="50" cy="50" r="2.5" fill="white" fillOpacity="0.9" />
          </svg>
          <div>
            <div style={{ fontFamily: "Oxanium, monospace", fontWeight: 800, fontSize: 18, color: "#fff", letterSpacing: "0.05em", lineHeight: 1 }}>
              ORP Δ
            </div>
            <div style={{ fontSize: 10, color: "#444", fontFamily: "monospace", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              Coordinator v3.6
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* Show both SHS and operational mode */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 9, fontFamily: "monospace", color: "#444", letterSpacing: "0.1em" }}>SHS</span>
            <OrbPulse color={shsColor} size={7} />
            <span style={{ fontFamily: "Oxanium, monospace", fontSize: 11, fontWeight: 700, color: shsColor, letterSpacing: "0.1em" }}>
              {shsState.shs}
            </span>
          </div>
          <div style={{ width: 1, height: 16, background: "#1e1e28" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <OrbPulse color={modeColor} size={8} />
            <span style={{ fontFamily: "Oxanium, monospace", fontSize: 11, fontWeight: 700, color: modeColor, letterSpacing: "0.1em" }}>
              {mode}
            </span>
          </div>
          <span style={{ fontFamily: "monospace", fontSize: 11, color: "#444" }}>
            RUN <span style={{ color: "#888" }}>#{dispatchCount}</span>
          </span>
          <button onClick={handleReset} style={{
            background: "transparent", border: "1px solid #1e1e28", color: "#555",
            fontFamily: "Oxanium, monospace", fontSize: 10, fontWeight: 700,
            letterSpacing: "0.12em", textTransform: "uppercase", padding: "5px 12px",
            borderRadius: 4, cursor: "pointer",
          }}>
            ✕ Reset
          </button>
        </div>
      </div>

      {/* Hero */}
      <div style={{ padding: "28px 28px 0" }}>
        <div style={{ fontSize: 10, color: "#dd1111", fontFamily: "Oxanium, monospace", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8 }}>
          L2 ORCHESTRATION · HERALD ENGINE · SHS STATE MACHINE
        </div>
        <h1 style={{ fontFamily: "Oxanium, monospace", fontWeight: 800, fontSize: 32, color: "#fff", margin: "0 0 8px", letterSpacing: "-0.02em" }}>
          Swarm <span style={{ color: "#ff6600" }}>Coordinator</span>
        </h1>
        <p style={{ fontSize: 13, color: "#666", margin: 0, lineHeight: 1.6, maxWidth: 580 }}>
          Dispatch tasks to the live multi-agent pipeline. Herald scores feed the σ²-driven SHS state machine.
          Escalation requires sustained drift across {WINDOW_ESCALATE} readings; recovery requires {WINDOW_RECOVER}.
        </p>
      </div>

      {/* Metrics row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, padding: "20px 28px 0" }}>
        <MetricCard label="Consensus"    value={herald ? herald.consensus.toFixed(3) : "—"} sub="Jaccard overlap"     color="#dd1111"  barVal={heraldBarVal.consensus ?? 0} />
        <MetricCard label="Drift"        value={herald ? herald.drift.toFixed(3)     : "—"} sub="Confidence delta"   color="#ff6600"  barVal={heraldBarVal.drift     ?? 0} />
        <MetricCard label="σ² Variance"  value={shsState.sigma2.toFixed(4)}                 sub={`Window: ${shsState.driftWindow.length}/8`} color={shsColor} barVal={Math.min(1, shsState.sigma2 / SIGMA.MODERATE)} />
        <MetricCard label="Herald Score" value={herald ? herald.weighted.toFixed(3)  : "—"} sub="Weighted composite" color="#7b8cde"  barVal={heraldBarVal.weighted  ?? 0} />
      </div>

      {/* Main grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20, padding: "20px 28px 32px" }}>

        {/* Left: dispatch + agents + herald + log */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Dispatch */}
          <div style={{ background: "#0d0d10", border: "1px solid #1a1a22", borderRadius: 6, padding: "20px 22px" }}>
            <div style={{ fontFamily: "Oxanium, monospace", fontSize: 12, fontWeight: 700, color: "#fff", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "#dd1111" }}>▶</span> Dispatch Task
              {(mode === "ISOLATED" || mode === "LOCKDOWN") && (
                <span style={{ fontSize: 9, color: "#ff3333", marginLeft: "auto", border: "1px solid rgba(255,51,51,0.3)", borderRadius: 3, padding: "2px 7px" }}>
                  BLOCKED · {mode}
                </span>
              )}
            </div>
            <textarea
              ref={promptRef}
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              onKeyDown={handleKey}
              disabled={mode === "ISOLATED" || mode === "LOCKDOWN"}
              placeholder="Enter task prompt…"
              style={{
                width: "100%", minHeight: 100, background: "#080809",
                border: `1px solid ${(mode === "ISOLATED" || mode === "LOCKDOWN") ? "rgba(255,51,51,0.2)" : "#1e1e28"}`,
                borderRadius: 4, color: "#c8c8d0", fontFamily: "monospace", fontSize: 12,
                lineHeight: 1.7, padding: "12px 14px", resize: "vertical",
                transition: "border-color 0.2s", opacity: (mode === "ISOLATED" || mode === "LOCKDOWN") ? 0.4 : 1,
              }}
              onFocus={e => e.target.style.borderColor = "rgba(221,17,17,0.4)"}
              onBlur={e  => e.target.style.borderColor = "#1e1e28"}
            />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
              <button onClick={handleDispatch} disabled={running || !prompt.trim() || mode === "ISOLATED" || mode === "LOCKDOWN"} style={{
                background: running ? "#330a0a" : "#dd1111",
                border: "none", color: "#fff",
                fontFamily: "Oxanium, monospace", fontWeight: 700,
                fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase",
                padding: "9px 22px", borderRadius: 4,
                cursor: (running || mode === "ISOLATED" || mode === "LOCKDOWN") ? "not-allowed" : "pointer",
                opacity: (!prompt.trim() || mode === "ISOLATED" || mode === "LOCKDOWN") ? 0.4 : 1,
                transition: "all 0.2s",
              }}>
                {running ? "DISPATCHING…" : "▶ RUN PIPELINE"}
              </button>
              <span style={{ fontSize: 10, fontFamily: "monospace", color: "#444" }}>Ctrl+Enter to dispatch</span>
            </div>
          </div>

          {/* Agent response cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {AGENTS.map(a => {
              const resp = responses?.find(r => r.agentId === a.id);
              return <AgentCard key={a.id} agent={a} response={resp} streaming={streamingAgents.includes(a.id)} />;
            })}
          </div>

          {/* Herald breakdown */}
          {herald && (
            <div style={{ background: "#0d0d10", border: "1px solid #1a1a22", borderRadius: 6, padding: "16px 20px", animation: "slideIn 0.3s ease both" }}>
              <div style={{ fontSize: 9, fontFamily: "Oxanium, monospace", fontWeight: 700, color: "#dd1111", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 14 }}>
                Herald Engine
              </div>
              {[
                { label: "Consensus", val: herald.consensus, color: "#dd1111" },
                { label: "Drift",     val: herald.drift,     color: "#ff6600" },
                { label: "Weighted",  val: herald.weighted,  color: "#7b8cde", bold: true },
              ].map(({ label, val, color, bold }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <span style={{ fontSize: 11, fontFamily: "monospace", color: bold ? "#888" : "#555", width: 70, flexShrink: 0, fontWeight: bold ? 700 : 400 }}>{label}</span>
                  <div style={{ flex: 1, height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", background: color, width: `${val * 100}%`, borderRadius: 2, transition: "width 0.5s cubic-bezier(0.2,0,0,1)" }} />
                  </div>
                  <span style={{ fontSize: 12, fontFamily: "monospace", color, fontWeight: 700, width: 40, textAlign: "right" }}>{val.toFixed(3)}</span>
                </div>
              ))}
            </div>
          )}

          {/* Log */}
          <div>
            <div style={{ fontSize: 9, fontFamily: "Oxanium, monospace", fontWeight: 700, color: "#555", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
              <OrbPulse color="#39ff14" size={6} /> Pipeline Log
            </div>
            <div ref={logRef} style={{
              background: "#000", border: "1px solid #111116",
              borderRadius: 4, padding: "12px 14px",
              height: 180, overflowY: "auto",
              display: "flex", flexDirection: "column", gap: 2,
            }}>
              {log.map((e, i) => <LogLine key={i} entry={e} />)}
            </div>
          </div>
        </div>

        {/* Right: SHS panel + registry + mode */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* SHS state machine panel — new in v3.6 */}
          <SHSPanel
            shsState={shsState}
            onL3Override={handleL3Override}
            onL3Release={handleL3Release}
          />

          {/* Agent registry */}
          <div style={{ background: "#0d0d10", border: "1px solid #1a1a22", borderRadius: 6, padding: "16px 18px" }}>
            <div style={{ fontSize: 9, fontFamily: "Oxanium, monospace", fontWeight: 700, color: "#dd1111", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 14 }}>
              Agent Registry
            </div>
            {AGENTS.map(a => (
              <div key={a.id} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 0", borderBottom: "1px solid #111116",
              }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 3 }}>
                    <OrbPulse color={a.color} size={6} />
                    <span style={{ fontFamily: "Oxanium, monospace", fontSize: 12, fontWeight: 700, color: a.color }}>{a.label}</span>
                  </div>
                  <div style={{ fontSize: 10, color: "#444", fontFamily: "monospace", paddingLeft: 13 }}>
                    {a.id === "claude" ? "ANALYSIS · SYNTHESIS" : a.id === "gpt" ? "ADVERSARIAL · SYNTHESIS" : "ANALYSIS · GROUNDING"}
                  </div>
                </div>
                <div style={{ width: 32, height: 18, borderRadius: 9, background: a.border, border: `1px solid ${a.border}`, position: "relative" }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: a.color, position: "absolute", top: 2, right: 2 }} />
                </div>
              </div>
            ))}
          </div>

          {/* Mode description */}
          <div style={{ background: "#0d0d10", border: `1px solid ${modeColor}22`, borderRadius: 6, padding: "16px 18px" }}>
            <div style={{ fontSize: 9, fontFamily: "Oxanium, monospace", fontWeight: 700, color: "#555", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>
              Operational Mode
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <OrbPulse color={modeColor} size={7} />
              <span style={{ fontFamily: "Oxanium, monospace", fontSize: 14, fontWeight: 700, color: modeColor }}>{mode}</span>
            </div>
            <div style={{ fontSize: 11, fontFamily: "monospace", color: "#444", lineHeight: 1.7 }}>
              {{
                NOMINAL:  "SHS GREEN/stable. Full pipeline capacity.",
                DEGRADED: "SHS YELLOW/ORANGE. Herald scoring may be impacted. Dispatch continues.",
                ISOLATED: "SHS RED/BLACK. Dispatch blocked by L3 governance until recovery.",
                LOCKDOWN: "L3 hard lock active. All dispatch operations suspended.",
              }[mode]}
            </div>
            <div style={{ marginTop: 10, fontSize: 10, fontFamily: "monospace", color: "#333" }}>
              Derived from SHS · not set directly
            </div>
          </div>

          {/* Stats */}
          <div style={{ background: "#0d0d10", border: "1px solid #1a1a22", borderRadius: 6, padding: "16px 18px" }}>
            <div style={{ fontSize: 9, fontFamily: "Oxanium, monospace", fontWeight: 700, color: "#555", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 14 }}>
              Session Stats
            </div>
            {[
              { label: "Total Dispatches", val: dispatchCount },
              { label: "SHS State",        val: shsState.shs },
              { label: "Drift Level",      val: shsState.driftLevel },
              { label: "σ² Value",         val: shsState.sigma2.toFixed(4) },
              { label: "Window Readings",  val: `${shsState.driftWindow.length}/8` },
              { label: "Last Herald",      val: herald ? herald.weighted.toFixed(3) : "—" },
            ].map(({ label, val }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid #0e0e12" }}>
                <span style={{ fontSize: 11, color: "#444", fontFamily: "monospace" }}>{label}</span>
                <span style={{ fontSize: 12, color: "#888", fontFamily: "Oxanium, monospace", fontWeight: 700 }}>{val}</span>
              </div>
            ))}
          </div>

          {/* Spec notice */}
          <div style={{ background: "rgba(221,17,17,0.04)", border: "1px dashed rgba(221,17,17,0.2)", borderRadius: 4, padding: "12px 14px" }}>
            <div style={{ fontSize: 9, fontFamily: "Oxanium, monospace", fontWeight: 700, color: "#dd1111", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>
              Spec Alignment
            </div>
            <div style={{ fontSize: 10, color: "#444", fontFamily: "monospace", lineHeight: 1.7 }}>
              State transitions governed by ORP_STATE_TRANSITION_MODEL.md.
              σ² = variance(drift_window). Escalation: {WINDOW_ESCALATE} readings.
              Recovery: {WINDOW_RECOVER}. L3 override available above.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
