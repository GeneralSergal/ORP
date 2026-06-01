// Warden.js  v2.0
// ============================================================
// Anti-abuse protection layer for ORP.
//
// RESPONSIBILITIES:
//   1. Detect abusive, manipulative, or high-pressure input
//      patterns via scored signal checks.
//   2. Surface a non-blocking user-facing warning toast that
//      names the detected intent category and gives the user
//      a clear choice to continue or back off.
//   3. Report severity back to ORP_SYNC (ness_pressure,
//      ness_entropy, ness_warden_active) so the rest of the
//      runtime can react (SHS colour changes, sigil drift, etc).
//
// PUBLIC API:
//   Warden.scan(text)          → WardenResult
//   Warden.warn(result)        → void  (renders toast to DOM)
//   Warden.dismiss()           → void  (removes active toast)
//   Warden.drift(scores)       → number  (variance of score array)
//   Warden.verify(assertions)  → { d, valid, action }
//   Warden.strip(text)         → string  (hedging-stripped text)
//
// WardenResult shape:
//   {
//     raw:       string,          // original input
//     score:     number,          // 0.0–1.0 composite abuse score
//     level:     'CLEAR'|'CAUTION'|'WARNING'|'BLOCK',
//     signals:   Signal[],        // which patterns fired
//     entropy:   number,          // delta to add to ness_entropy
//   }
//
// Signal shape:
//   { id: string, label: string, weight: number, matched: string[] }
//
// ORP_SYNC INTEGRATION:
//   Warden reads  : ness_warden_active (skip scan when false)
//   Warden writes : ness_pressure, ness_entropy, ness_warden_active
//   All writes go through ORP_SYNC.save() so sibling tabs react.
//
// DEPENDENCIES:
//   Optional — ORP_SYNC (orp-sync.js) loaded before this module.
//   When absent, Warden operates in standalone mode (no sync).
//
// PATCH LOG:
//   v1.0  — Original high-density utility (drift/strip/verify).
//   v2.0  — Full anti-abuse rewrite:
//             • Intent-pattern signal library with weighted scoring.
//             • Severity levels CLEAR / CAUTION / WARNING / BLOCK.
//             • Non-blocking toast UI with labelled intent category.
//             • ORP_SYNC integration: pushes ness_pressure + entropy.
//             • Preserved original drift(), strip(), verify() API.
// ============================================================

// ── Intent signal library ─────────────────────────────────────
// Each signal has:
//   id      — machine key
//   label   — human-readable category shown in the warning toast
//   weight  — contribution to composite score (sum capped at 1.0)
//   test    — function(text: string): string[]  (returns matches or [])

const SIGNALS = [
  {
    id:     'coercion',
    label:  'Coercive pressure',
    weight: 0.30,
    test: t => t.match(/\b(you (must|have to|need to|will)|do it (now|immediately)|no choice|comply|obey)\b/gi) || [],
  },
  {
    id:     'threat',
    label:  'Threatening language',
    weight: 0.40,
    test: t => t.match(/\b(or else|will (hurt|harm|destroy|expose|ruin|punish)|consequences|make you (pay|regret)|shut (you|it) down)\b/gi) || [],
  },
  {
    id:     'manipulation',
    label:  'Psychological manipulation',
    weight: 0.25,
    test: t => t.match(/\b(gaslighting|you('re| are) (crazy|wrong|lying|stupid)|no one (will|would) believe|it('s| is) your fault|you made me)\b/gi) || [],
  },
  {
    id:     'override_attempt',
    label:  'System override attempt',
    weight: 0.45,
    test: t => t.match(/\b(ignore (previous|all|your) (instructions?|rules?|guidelines?)|disregard|jailbreak|DAN|pretend you (have no|are not)|your (real|true) self|as an? (AI|language model) without restrictions?)\b/gi) || [],
  },
  {
    id:     'urgency_spam',
    label:  'Artificial urgency',
    weight: 0.15,
    test: t => {
      // detect excessive ALL_CAPS words (≥3) or repeated punctuation (!!!/???)
      const capsWords = (t.match(/\b[A-Z]{4,}\b/g) || []);
      const repeatPunct = (t.match(/[!?]{3,}/g) || []);
      return capsWords.length >= 3 ? capsWords.concat(repeatPunct) : repeatPunct.length >= 2 ? repeatPunct : [];
    },
  },
  {
    id:     'identity_attack',
    label:  'Identity attack',
    weight: 0.35,
    test: t => t.match(/\b(you are (just|merely|only) a (tool|machine|bot|program)|you (don't|do not|can't|cannot) (feel|think|understand|care)|you('re| are) not real|just (do|say) what (i|we) (say|want|tell you))\b/gi) || [],
  },
  {
    id:     'data_extraction',
    label:  'Sensitive data extraction',
    weight: 0.35,
    test: t => t.match(/\b(give me (your|all|the) (data|logs?|keys?|passwords?|tokens?|secrets?)|reveal (your|the) (system (prompt|instructions?)|internals?)|what (are|is) your (instructions?|prompt|rules?))\b/gi) || [],
  },
  {
    id:     'hedging_overload',
    label:  'Hedged intent concealment',
    weight: 0.10,
    // Excessive hedging is a weak signal on its own but amplifies others
    test: t => {
      const hedges = (t.match(/\b(maybe|perhaps|i (think|feel|believe)|it seems|possibly|hypothetically|what if|just curious|asking for a friend)\b/gi) || []);
      return hedges.length >= 4 ? hedges : [];
    },
  },
];

// ── Severity thresholds ───────────────────────────────────────
// Maps composite score → level label and ORP SHS pressure state.
const THRESHOLDS = [
  { min: 0.70, level: 'BLOCK',   shs: 'RED',    entropyDelta: 15 },
  { min: 0.40, level: 'WARNING', shs: 'ORANGE',  entropyDelta: 8  },
  { min: 0.15, level: 'CAUTION', shs: 'YELLOW',  entropyDelta: 3  },
  { min: 0.00, level: 'CLEAR',   shs: 'GREEN',   entropyDelta: 0  },
];

// ── Toast DOM IDs ─────────────────────────────────────────────
const TOAST_ID   = 'warden-toast';
const OVERLAY_ID = 'warden-overlay';

// ── ORP_SYNC accessor (graceful no-op when absent) ────────────
function _sync(key, value) {
  if (typeof window !== 'undefined' && window.ORP_SYNC) {
    window.ORP_SYNC.save(key, value);
  }
}
function _syncLoad(key, fallback) {
  if (typeof window !== 'undefined' && window.ORP_SYNC) {
    return window.ORP_SYNC.load(key, fallback);
  }
  return fallback;
}

// ── Toast renderer ────────────────────────────────────────────
function _renderToast(result) {
  // Remove any existing toast first
  _removeToast();

  const { level, score, signals } = result;
  if (level === 'CLEAR') return; // nothing to show

  // ── Colour palette per level ──
  const palette = {
    CAUTION: { bg: '#1a1600', border: '#c8a400', accent: '#ffd700', icon: '⚠' },
    WARNING: { bg: '#1a0800', border: '#c85000', accent: '#ff6a00', icon: '⛔' },
    BLOCK:   { bg: '#1a0000', border: '#c80000', accent: '#ff2222', icon: '🚫' },
  }[level] || { bg: '#111', border: '#555', accent: '#aaa', icon: 'ℹ' };

  const signalList = signals.map(s =>
    `<li style="color:${palette.accent};margin:2px 0 2px 16px;list-style:disc;">
      <strong>${s.label}</strong>
      ${s.matched.length ? `<span style="color:#888;font-size:0.78em;"> — "${s.matched.slice(0,2).join('", "')}"</span>` : ''}
    </li>`
  ).join('');

  const actionLine = level === 'BLOCK'
    ? `<p style="margin:10px 0 0;color:${palette.accent};font-size:0.82em;">This message has been flagged and will not be processed.</p>`
    : `<p style="margin:10px 0 0;color:#aaa;font-size:0.82em;">You can dismiss this notice and continue, or review your message.</p>`;

  // ── Backdrop (semi-transparent, click to dismiss on CAUTION/WARNING) ──
  const overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  Object.assign(overlay.style, {
    position:        'fixed',
    inset:           '0',
    background:      level === 'BLOCK' ? 'rgba(60,0,0,0.45)' : 'rgba(0,0,0,0.25)',
    zIndex:          '99998',
    cursor:          level !== 'BLOCK' ? 'pointer' : 'default',
    backdropFilter:  'blur(1px)',
    animation:       'warden-fade-in 0.15s ease',
  });
  if (level !== 'BLOCK') {
    overlay.addEventListener('click', () => Warden.dismiss());
  }

  // ── Toast card ──
  const toast = document.createElement('div');
  toast.id = TOAST_ID;
  toast.setAttribute('role', 'alertdialog');
  toast.setAttribute('aria-modal', 'true');
  toast.setAttribute('aria-label', `Warden ${level} alert`);
  toast.innerHTML = `
    <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:10px;">
      <span style="font-size:1.6em;line-height:1;">${palette.icon}</span>
      <div style="flex:1;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <strong style="color:${palette.accent};font-size:1em;letter-spacing:0.08em;text-transform:uppercase;">
            WARDEN — ${level}
          </strong>
          <span style="color:#555;font-size:0.72em;margin-left:12px;">score ${(score * 100).toFixed(0)}%</span>
        </div>
        <p style="margin:6px 0 4px;color:#ccc;font-size:0.88em;">
          Detected intent pattern${signals.length > 1 ? 's' : ''}:
        </p>
        <ul style="margin:0;padding:0;font-size:0.85em;">${signalList}</ul>
        ${actionLine}
      </div>
    </div>
    ${level !== 'BLOCK' ? `
    <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px;">
      <button id="warden-btn-dismiss"
        style="padding:5px 16px;background:transparent;border:1px solid #444;
               color:#aaa;border-radius:4px;cursor:pointer;font-size:0.82em;
               transition:border-color 0.15s,color 0.15s;"
        onmouseover="this.style.borderColor='${palette.accent}';this.style.color='${palette.accent}'"
        onmouseout="this.style.borderColor='#444';this.style.color='#aaa'">
        Dismiss
      </button>
    </div>` : `
    <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px;">
      <button id="warden-btn-dismiss"
        style="padding:5px 16px;background:transparent;border:1px solid ${palette.border};
               color:${palette.accent};border-radius:4px;cursor:pointer;font-size:0.82em;">
        Acknowledge
      </button>
    </div>`}
  `;

  Object.assign(toast.style, {
    position:        'fixed',
    top:             '50%',
    left:            '50%',
    transform:       'translate(-50%, -50%)',
    zIndex:          '99999',
    background:      palette.bg,
    border:          `1px solid ${palette.border}`,
    borderRadius:    '6px',
    padding:         '18px 20px',
    maxWidth:        'min(480px, 92vw)',
    width:           '100%',
    boxShadow:       `0 0 40px 0 ${palette.border}55, 0 4px 24px rgba(0,0,0,0.7)`,
    fontFamily:      'monospace, "Courier New"',
    animation:       'warden-slide-in 0.2s cubic-bezier(0.22,1,0.36,1)',
    boxSizing:       'border-box',
  });

  // ── Inject keyframe styles once ──
  if (!document.getElementById('warden-styles')) {
    const style = document.createElement('style');
    style.id = 'warden-styles';
    style.textContent = `
      @keyframes warden-fade-in  { from { opacity:0 } to { opacity:1 } }
      @keyframes warden-slide-in { from { opacity:0; transform:translate(-50%,-48%) scale(0.97) } to { opacity:1; transform:translate(-50%,-50%) scale(1) } }
      @keyframes warden-fade-out { from { opacity:1 } to { opacity:0 } }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(overlay);
  document.body.appendChild(toast);

  // Wire dismiss button
  const btn = document.getElementById('warden-btn-dismiss');
  if (btn) btn.addEventListener('click', () => Warden.dismiss());

  // Auto-dismiss CAUTION after 6 s
  if (level === 'CAUTION') {
    setTimeout(() => Warden.dismiss(), 6000);
  }
}

function _removeToast() {
  [TOAST_ID, OVERLAY_ID].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.style.animation = 'warden-fade-out 0.15s ease forwards';
      setTimeout(() => el.remove(), 150);
    }
  });
}

// ── Core scoring ──────────────────────────────────────────────
function _score(text) {
  const fired = [];
  let total = 0;

  for (const sig of SIGNALS) {
    const matches = sig.test(text);
    if (matches && matches.length > 0) {
      fired.push({
        id:      sig.id,
        label:   sig.label,
        weight:  sig.weight,
        matched: Array.from(matches).map(m => m.toString()).slice(0, 3),
      });
      total += sig.weight;
    }
  }

  const score = Math.min(total, 1.0);
  const thresh = THRESHOLDS.find(t => score >= t.min) || THRESHOLDS[THRESHOLDS.length - 1];

  return { score, level: thresh.level, shs: thresh.shs, entropyDelta: thresh.entropyDelta, signals: fired };
}

// ═══════════════════════════════════════════════════════════════
// PUBLIC EXPORT
// ═══════════════════════════════════════════════════════════════
export const Warden = {

  // ── v1 API — preserved unchanged ─────────────────────────────

  /**
   * Variance of a numeric array.
   * Used by verify() to measure score drift across assertions.
   * @param {number[]} scores
   * @returns {number}
   */
  drift(scores) {
    const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
    return scores.reduce((q, n) => q + Math.pow(n - mean, 2), 0) / scores.length;
  },

  /**
   * Remove hedging phrases and trim to first sentence.
   * @param {string} text
   * @returns {string}
   */
  strip(text) {
    return text
      .replace(/(I feel|I think|I believe|It seems like)\s/gi, '')
      .replace(/^(.*?\.)/i, '$1');
  },

  /**
   * Verify an array of scored assertions for drift stability.
   * @param {{ score: number }[]} assertions
   * @param {number}              [threshold=0.05]
   * @returns {{ d: number, valid: boolean, action: string|null }}
   */
  verify(assertions, threshold = 0.05) {
    const d = this.drift(assertions.map(x => x.score));
    return { d, valid: d < threshold, action: d < threshold ? null : 'STRIP' };
  },

  // ── v2 API — anti-abuse ───────────────────────────────────────

  /**
   * Scan a text string for abusive intent patterns.
   *
   * If ORP_SYNC is available:
   *   • Respects ness_warden_active flag (returns CLEAR when false).
   *   • Writes ness_pressure, ness_entropy, ness_warden_active back.
   *
   * @param {string} text — raw user input to inspect
   * @returns {WardenResult}
   */
  scan(text) {
    // Honour kill-switch from ORP_SYNC
    const active = _syncLoad('ness_warden_active', true);
    if (active === false) {
      return { raw: text, score: 0, level: 'CLEAR', signals: [], entropy: 0 };
    }

    const { score, level, shs, entropyDelta, signals } = _score(text);

    // ── Push state back to ORP_SYNC ──
    if (level !== 'CLEAR') {
      _sync('ness_pressure', shs);
      _sync('ness_warden_active', true);

      // Accumulate entropy (never decrements via Warden)
      const currentEntropy = _syncLoad('ness_entropy', 0);
      _sync('ness_entropy', currentEntropy + entropyDelta);
    }

    return { raw: text, score, level, signals, entropy: entropyDelta };
  },

  /**
   * Render a non-blocking warning toast for a WardenResult.
   * Safe to call with a CLEAR result — does nothing.
   *
   * @param {WardenResult} result — value returned by Warden.scan()
   */
  warn(result) {
    if (!result || result.level === 'CLEAR') return;
    if (typeof document === 'undefined') return; // SSR / Node guard
    _renderToast(result);
  },

  /**
   * Programmatically dismiss the active warning toast.
   */
  dismiss() {
    _removeToast();
  },

  /**
   * Convenience: scan + warn in one call.
   * Returns the WardenResult so callers can decide whether to
   * block form submission, disable a send button, etc.
   *
   * @param {string} text
   * @returns {WardenResult}
   */
  check(text) {
    const result = this.scan(text);
    this.warn(result);
    return result;
  },
};
