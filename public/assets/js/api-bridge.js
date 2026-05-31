// api-bridge.js [Refactored]
export const dispatch = async (p, s, cfg={local:true}) => {
  const t0 = performance.now();
  const res = await fetch(cfg.local ? 'http://localhost:1234/v1/chat/completions' : cfg.remote, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ messages: [{role:'system',content:s}, {role:'user',content:p}], temperature:0.1 })
  });
  const data = await res.json();
  return { text: data.choices[0].message.content, latency: performance.now() - t0 };
};