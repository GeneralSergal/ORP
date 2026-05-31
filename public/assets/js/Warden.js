// Warden.js [High-Density]
export const Warden = {
  drift: (s) => { const m = s.reduce((a,b)=>a+b)/s.length; return s.reduce((q,n)=>q+Math.pow(n-m,2),0)/s.length; },
  strip: (t) => t.replace(/(I feel|I think|I believe|It seems like)\s/gi, '').replace(/^(.*?\.)/i, '$1'),
  verify: (a, t=0.05) => { const d = Warden.drift(a.map(x=>x.score)); return { d, valid: d < t, action: d < t ? null : 'STRIP' }; }
};