import { useState, useRef, useCallback, useEffect } from "react";

const AGENTS = [
  { id: "claude", label: "Claude", color: "#e07b54", accent: "rgba(224,123,84,0.15)", border: "rgba(224,123,84,0.35)" },
  { id: "gpt",    label: "GPT",   color: "#10a37f", accent: "rgba(16,163,127,0.12)", border: "rgba(16,163,127,0.30)" },
  { id: "grok",   label: "Grok",  color: "#7b8cde", accent: "rgba(123,140,222,0.12)", border: "rgba(123,140,222,0.30)" },
];

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
  const drift = Math.min(Math.max(1 - consensus, 0), 1);
  const avgLat = valid.length > 0 ? valid.reduce((a,r) => a + r.latency, 0) / valid.length : 1500;
  const latScore = Math.max(0, 1 - avgLat / 6000);
  const weighted = consensus * HERALD_WEIGHTS.consensus + (1 - drift) * HERALD_WEIGHTS.drift + latScore * HERALD_WEIGHTS.latency;
  return {
    consensus: parseFloat(consensus.toFixed(3)),
    drift:     parseFloat(drift.toFixed(3)),
    latency:   Math.round(avgLat),
    weighted:  parseFloat(weighted.toFixed(3)),
  };
}

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

function OrbPulse({ color, size = 8 }) {
  return (
    <span style={{
      display: "inline-block", width: size, height: size, borderRadius: "50%",
      background: color, flexShrink: 0,
      boxShadow: `0 0 0 0 ${color}44`,
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
  const colors = { OK: "#39ff14", WARN: "#ffab00", ERR: "#ff3333", INF: "#00d4ff" };
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

export default function ORPCoordinator() {
  const [prompt, setPrompt] = useState("");
  const [running, setRunning] = useState(false);
  const [responses, setResponses] = useState(null);
  const [herald, setHerald] = useState(null);
  const [log, setLog] = useState([
    { ts: "00:00:00", tag: "INF", msg: "Coordinator boot — awaiting first dispatch." }
  ]);
  const [dispatchCount, setDispatchCount] = useState(0);
  const [streamingAgents, setStreamingAgents] = useState([]);
  const [mode, setMode] = useState("NOMINAL");
  const [runId, setRunId] = useState(0);
  const logRef = useRef(null);
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
    setRunning(true);
    setResponses(null);
    setHerald(null);
    setStreamingAgents(["claude", "gpt", "grok"]);
    const thisRun = runId + 1;
    setRunId(thisRun);
    setDispatchCount(c => c + 1);
    addLog("INF", `Dispatch #${thisRun} → swarm [claude, gpt, grok] — "${task.substring(0, 55)}${task.length > 55 ? "…" : ""}"`);

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

      const newMode = h.consensus < 0.2 ? "ISOLATED" : h.consensus < 0.5 ? "DEGRADED" : "NOMINAL";
      setMode(newMode);

      results.forEach(r => {
        const status = r.ok ? "RESOLVED" : "TRANSPORT_FAULT";
        addLog(r.ok ? "OK" : "ERR",
          `[${r.agentId.toUpperCase()}] ${status} · ${r.latency}ms · "${r.text.substring(0, 45)}…"`
        );
      });

      addLog("OK",
        `Run #${thisRun} complete — consensus: ${h.consensus} · drift: ${h.drift} · herald: ${h.weighted}`
      );
      if (newMode !== "NOMINAL") addLog("WARN", `Mode transition: NOMINAL → ${newMode}`);
    } catch (e) {
      addLog("ERR", `PIPELINE FAULT: ${e.message}`);
      setStreamingAgents([]);
    } finally {
      setRunning(false);
    }
  }, [prompt, runId, addLog]);

  const handleKey = useCallback((e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); handleDispatch(); }
  }, [handleDispatch]);

  const handleReset = useCallback(() => {
    setResponses(null); setHerald(null);
    setRunId(0); setDispatchCount(0); setMode("NOMINAL");
    setLog([{ ts: new Date().toLocaleTimeString("en-US", { hour12: false }), tag: "WARN", msg: "Coordinator reset — history cleared." }]);
    addLog("INF", "Ready for next dispatch.");
  }, [addLog]);

  const modeColors = { NOMINAL: "#39ff14", DEGRADED: "#ffab00", ISOLATED: "#ff3333", LOCKDOWN: "#880000" };
  const modeColor = modeColors[mode] || "#39ff14";

  const heraldsBarVal = herald ? {
    consensus: herald.consensus,
    drift: herald.drift,
    latency: Math.max(0, 1 - herald.latency / 6000),
    weighted: herald.weighted,
  } : {};

  return (
    <div style={{ background: "#080809", minHeight: "100vh", color: "#d1d1d6", fontFamily: "'Space Grotesk', 'Segoe UI', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Oxanium:wght@400;700;800&display=swap');
        @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 currentColor} 50%{box-shadow:0 0 0 5px transparent} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes slideIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scanline { 0%{transform:translateY(-100%)} 100%{transform:translateY(400%)} }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #0d0d10; } ::-webkit-scrollbar-thumb { background: #1e1e28; border-radius: 2px; }
        textarea:focus, button:focus { outline: none; }
      `}</style>

      {/* Top mode bar */}
      <div style={{
        height: 3, background: modeColor,
        opacity: 0.8,
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
              Coordinator v3.5
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <OrbPulse color={modeColor} size={8} />
            <span style={{ fontFamily: "Oxanium, monospace", fontSize: 11, fontWeight: 700, color: modeColor, letterSpacing: "0.1em" }}>
              {mode}
            </span>
          </div>
          <span style={{ fontFamily: "monospace", fontSize: 11, color: "#444" }}>
            RUN <span style={{ color: "#888" }}>#{dispatchCount}</span>
          </span>
          <button
            onClick={handleReset}
            style={{ background: "transparent", border: "1px solid #1e1e28", color: "#555", fontFamily: "Oxanium, monospace", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "5px 12px", borderRadius: 4, cursor: "pointer" }}
          >
            ✕ Reset
          </button>
        </div>
      </div>

      {/* Hero */}
      <div style={{ padding: "28px 28px 0" }}>
        <div style={{ fontSize: 10, color: "#dd1111", fontFamily: "Oxanium, monospace", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8 }}>
          L2 ORCHESTRATION · HERALD ENGINE ACTIVE
        </div>
        <h1 style={{ fontFamily: "Oxanium, monospace", fontWeight: 800, fontSize: 32, color: "#fff", margin: "0 0 8px", letterSpacing: "-0.02em" }}>
          Swarm <span style={{ color: "#ff6600" }}>Coordinator</span>
        </h1>
        <p style={{ fontSize: 13, color: "#666", margin: 0, lineHeight: 1.6, maxWidth: 580 }}>
          Dispatch tasks to the live multi-agent pipeline, score consensus with the Herald engine, and monitor operational mode in real time.
        </p>
      </div>

      {/* Metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, padding: "20px 28px 0" }}>
        <MetricCard label="Consensus" value={herald ? herald.consensus.toFixed(3) : "—"} sub="Jaccard overlap ratio" color="#dd1111" barVal={heraldsBarVal.consensus ?? 0} />
        <MetricCard label="Drift" value={herald ? herald.drift.toFixed(3) : "—"} sub="Max confidence delta" color="#ff6600" barVal={heraldsBarVal.drift ?? 0} />
        <MetricCard label="Latency" value={herald ? `${herald.latency}ms` : "—"} sub="Mean agent latency" color="#00d4ff" barVal={heraldsBarVal.latency ?? 0} />
        <MetricCard label="Herald Score" value={herald ? herald.weighted.toFixed(3) : "—"} sub="Weighted composite" color="#7b8cde" barVal={heraldsBarVal.weighted ?? 0} />
      </div>

      {/* Main grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20, padding: "20px 28px 32px" }}>

        {/* Left: dispatch + agents + herald + log */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Dispatch */}
          <div style={{ background: "#0d0d10", border: "1px solid #1a1a22", borderRadius: 6, padding: "20px 22px" }}>
            <div style={{ fontFamily: "Oxanium, monospace", fontSize: 12, fontWeight: 700, color: "#fff", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "#dd1111" }}>▶</span> Dispatch Task
            </div>
            <textarea
              ref={promptRef}
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Enter task prompt — e.g. 'Evaluate the epistemic grounding of this claim: all consensus is evidence of truth.'"
              style={{
                width: "100%", minHeight: 100, background: "#080809", border: "1px solid #1e1e28",
                borderRadius: 4, color: "#c8c8d0", fontFamily: "monospace", fontSize: 12, lineHeight: 1.7,
                padding: "12px 14px", resize: "vertical",
                transition: "border-color 0.2s",
              }}
              onFocus={e => e.target.style.borderColor = "rgba(221,17,17,0.4)"}
              onBlur={e => e.target.style.borderColor = "#1e1e28"}
            />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
              <button
                onClick={handleDispatch}
                disabled={running || !prompt.trim()}
                style={{
                  background: running ? "#330a0a" : "#dd1111",
                  border: "none", color: "#fff",
                  fontFamily: "Oxanium, monospace", fontWeight: 700,
                  fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase",
                  padding: "9px 22px", borderRadius: 4, cursor: running ? "not-allowed" : "pointer",
                  opacity: !prompt.trim() ? 0.4 : 1,
                  transition: "all 0.2s",
                }}
              >
                {running ? "DISPATCHING…" : "▶ RUN PIPELINE"}
              </button>
              <span style={{ fontSize: 10, fontFamily: "monospace", color: "#444" }}>Ctrl+Enter to dispatch</span>
            </div>
          </div>

          {/* Agent response cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {AGENTS.map(a => {
              const resp = responses?.find(r => r.agentId === a.id);
              const isStreaming = streamingAgents.includes(a.id);
              return <AgentCard key={a.id} agent={a} response={resp} streaming={isStreaming} />;
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
                  <span style={{ fontSize: 12, fontFamily: "monospace", color: color, fontWeight: 700, width: 40, textAlign: "right" }}>{val.toFixed(3)}</span>
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

        {/* Right: registry + mode info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

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
                <div style={{
                  width: 32, height: 18, borderRadius: 9,
                  background: a.border, border: `1px solid ${a.border}`,
                  position: "relative", cursor: "pointer",
                }}>
                  <div style={{
                    width: 12, height: 12, borderRadius: "50%",
                    background: a.color, position: "absolute",
                    top: 2, right: 2, transition: "right 0.2s",
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* Mode panel */}
          <div style={{ background: "#0d0d10", border: "1px solid #1a1a22", borderRadius: 6, padding: "16px 18px" }}>
            <div style={{ fontSize: 9, fontFamily: "Oxanium, monospace", fontWeight: 700, color: "#555", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 14 }}>
              Operational Mode
            </div>
            {["NOMINAL", "DEGRADED", "ISOLATED"].map(m => (
              <div key={m} style={{
                padding: "10px 12px", borderRadius: 4, marginBottom: 6, cursor: "pointer",
                background: mode === m ? "rgba(255,255,255,0.04)" : "transparent",
                border: `1px solid ${mode === m ? modeColors[m] + "44" : "#111116"}`,
                transition: "all 0.2s",
              }} onClick={() => { setMode(m); addLog("WARN", `Manual mode override → ${m}`); }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <OrbPulse color={modeColors[m]} size={6} />
                  <span style={{ fontFamily: "Oxanium, monospace", fontSize: 11, fontWeight: 700, color: mode === m ? modeColors[m] : "#555", letterSpacing: "0.08em" }}>
                    {m}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div style={{ background: "#0d0d10", border: "1px solid #1a1a22", borderRadius: 6, padding: "16px 18px" }}>
            <div style={{ fontSize: 9, fontFamily: "Oxanium, monospace", fontWeight: 700, color: "#555", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 14 }}>
              Session Stats
            </div>
            {[
              { label: "Total Dispatches", val: dispatchCount },
              { label: "Active Agents", val: 3 },
              { label: "Last Run ID", val: runId > 0 ? `#${runId}` : "—" },
              { label: "Last Consensus", val: herald ? herald.consensus.toFixed(3) : "—" },
            ].map(({ label, val }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: "1px solid #0e0e12" }}>
                <span style={{ fontSize: 11, color: "#444", fontFamily: "monospace" }}>{label}</span>
                <span style={{ fontSize: 12, color: "#888", fontFamily: "Oxanium, monospace", fontWeight: 700 }}>{val}</span>
              </div>
            ))}
          </div>

          {/* Warning banner */}
          <div style={{
            background: "rgba(221,17,17,0.04)", border: "1px dashed rgba(221,17,17,0.2)",
            borderRadius: 4, padding: "12px 14px",
          }}>
            <div style={{ fontSize: 9, fontFamily: "Oxanium, monospace", fontWeight: 700, color: "#dd1111", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>
              ⚠ Sovereign Notice
            </div>
            <div style={{ fontSize: 10, color: "#444", fontFamily: "monospace", lineHeight: 1.6 }}>
              Open substrate system. All agent calls route through the Anthropic API. GPT and Grok channels are simulated via Claude personas for cross-agent consensus scoring.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
