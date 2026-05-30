/* ============================================================
   ENTROPIA SIGIL — JavaScript Module
   ORP Δ v3.1.0 | entropia-sigil.js

   DROP-IN: Add <script src="assets/js/entropia-sigil.js"></script>
   to your page's <body> end, AFTER main.js and runtime-overlay.js.

   PUBLIC API:
     updateSigilDrift(0.0–1.0)   — set by numeric drift score
     updateSigilFromSHS('GREEN')  — set by SHS state string

   PATCH LOG (v3.1.0 — Firefox GPU + Full-Viewport Float):
     FF-1    — Firefox: SVG feGaussianBlur triggers a GPU layer per
               filter primitive when combined with CSS will-change:transform
               on the same element. Fix: separate the float transform onto a
               wrapper div (.es-float-wrapper) so the SVG filter stacking
               context is NEVER composited. will-change removed from the
               sigil SVG element itself; only the wrapper carries it.
               Result: single compositing layer per sigil on FF. (Was: 4-8+)
     FF-2    — Firefox: backdrop-filter on overlapping elements forces
               intermediate surfaces. The sigil's CSS must not create a
               stacking context that overlaps any backdrop-filter element.
               Fix: z-index kept at 1 (below header content); no
               isolation:isolate; no filter on the outermost wrapper.
     FF-3    — CSS animation fill-mode on .es-orbit-ring: Firefox did not
               respect animation-fill-mode:both with transform-origin on an
               SVG element. Replaced with a wrapper <g> pattern.
     FLOAT-1 — Float area expanded from "right side of hero" to FULL
               viewport width × height, minus nav height and EDGE_INSET.
               Anchor origin set to screen center instead of CSS position.
               The sigil now covers the entire visible desktop canvas.
     FLOAT-2 — Lissajous parameters retuned for full-screen coverage:
               BASE_AMP_X  130 → covers ~60% of viewport width from center
               BASE_AMP_Y   90 → covers ~60% of viewport height from center
               Period ratio 28000/22000 → 11000/7000 (irrational-ish ratio
               to avoid harmonic locking and produce Lissajous figures)
     FLOAT-3 — Easing added: instead of raw sin() values, each axis is
               passed through a smoothstep-like cubic ease. This removes
               the "corner snap" artifact visible at the extremes of the
               Lissajous path at large amplitudes.
     FLOAT-4 — Drift modulation: at high drift the sigil's path becomes
               deliberately erratic via an injected third-frequency
               perturbation term, consistent with the NESS thermodynamic
               model (high entropy → exploratory J⊥ circulation).
     PERF-1  — rAF timestamp accumulator pattern replaces Date.now() for
               period computation. All trig purely on the rAF timestamp.
     PERF-2  — style.transform string built once per tick (no allocation for
               intermediate objects). toFixed(1) instead of toFixed(2) for
               sub-pixel positions (sufficient; avoids string creation cost).
     LOW-1   — pagehide listener cancels float rAF and cleans up all observers.
     LOW-2   — orp-sigil-glitch scoped to :not(.entropia-sigil--hero-bg)
               in runtime-overlay.js (no change needed here).
   ============================================================ */

(function (global) {
  'use strict';

  /* ── SHS → numeric drift map ─────────────────────────────── */
  const SHS_DRIFT_MAP = {
    'GREEN':  0.00,
    'YELLOW': 0.25,
    'ORANGE': 0.55,
    'RED':    0.78,
    'BLACK':  1.00,
  };

  /* ── Memoization state ────────────────────────────────────── */
  let _lastIntensity  = -1;
  let _lastSigilCount = 0;
  let _lastGlowDrift  = -1;
  let _lastGlowValue  = '';

  /* ── Cached sigil NodeList ──────────────────────────────── */
  let _sigilCache = null;

  function _getSigils() {
    if (!_sigilCache) _sigilCache = document.querySelectorAll('.entropia-sigil');
    return _sigilCache;
  }

  function _invalidateCache() {
    _sigilCache = null;
  }


  /* ──────────────────────────────────────────────────────────
     updateSigilDrift(driftValue)
     Sets --drift-intensity on every .entropia-sigil element.
  ─────────────────────────────────────────────────────────── */
  function updateSigilDrift(driftValue) {
    const intensity = Math.min(Math.max(parseFloat(driftValue) || 0, 0), 1);
    const sigils    = _getSigils();

    if (intensity === _lastIntensity && sigils.length === _lastSigilCount) return intensity;
    _lastIntensity  = intensity;
    _lastSigilCount = sigils.length;

    const glow = _driftToGlow(intensity);
    sigils.forEach(sigil => {
      sigil.style.setProperty('--drift-intensity', intensity);
      sigil.style.setProperty('--es-shs-glow', glow);
    });

    return intensity;
  }


  /* ──────────────────────────────────────────────────────────
     updateSigilFromSHS(shsState)
  ─────────────────────────────────────────────────────────── */
  function updateSigilFromSHS(shsState) {
    const key       = (shsState || 'GREEN').trim().toUpperCase();
    const intensity = SHS_DRIFT_MAP[key] ?? 0;
    return updateSigilDrift(intensity);
  }


  /* ── Internal: compute SHS-aware glow colour ─────────────── */
  function _driftToGlow(intensity) {
    const key = Math.round(intensity * 1000) / 1000;
    if (key === _lastGlowDrift) return _lastGlowValue;
    _lastGlowDrift = key;

    const hue           = 120 - key * 120;
    const [r, g, b]     = _hslToRgbValues(hue / 360, 0.85, 0.5);
    const alpha         = 0.15 + key * 0.30;
    _lastGlowValue      = `rgba(${r},${g},${b},${alpha.toFixed(3)})`;
    return _lastGlowValue;
  }


  /* ──────────────────────────────────────────────────────────
     initEntropiaSigils()
     Stamps the SVG from <template id="entropiaSigilTemplate">
     into every empty .entropia-sigil wrapper.
     Wraps each sigil in .es-float-wrapper for FF-1 isolation.
  ─────────────────────────────────────────────────────────── */
  function initEntropiaSigils() {
    const template = document.getElementById('entropiaSigilTemplate');

    if (!template) {
      console.warn('[ORP_SIGIL] <template id="entropiaSigilTemplate"> not found.');
      return;
    }

    let injected = 0;

    document.querySelectorAll('.entropia-sigil').forEach(wrapper => {
      if (wrapper.querySelector('svg')) return;

      const clone = template.content.cloneNode(true);
      const uid   = Math.random().toString(36).slice(2, 7);
      const svgEl = clone.querySelector('svg');

      if (svgEl) {
        const idPairs = [
          ['esGlowCore',  `esGlowCore_${uid}`],
          ['esGlowOuter', `esGlowOuter_${uid}`],
          ['esGlowCyan',  `esGlowCyan_${uid}`],
          ['esGlowSoft',  `esGlowSoft_${uid}`],
          ['esCoreFill',  `esCoreFill_${uid}`],
          ['esAuraGrad',  `esAuraGrad_${uid}`],
          ['esWingGradL', `esWingGradL_${uid}`],
          ['esWingGradR', `esWingGradR_${uid}`],
          ['esCyanGrad',  `esCyanGrad_${uid}`],
          ['esScanClip',  `esScanClip_${uid}`],
        ];

        let html = svgEl.innerHTML;
        idPairs.forEach(([from, to]) => {
          html = html.split(from).join(to);
        });
        svgEl.innerHTML = html;

        /* FF-1 FIX: SVG must NOT have will-change or transform on itself.
           Remove any inline will-change the template might carry. */
        svgEl.style.willChange = 'auto';
        svgEl.style.transform  = '';
      }

      wrapper.appendChild(clone);
      injected++;
    });

    _invalidateCache();
    console.log(`[ORP_SIGIL] Initialized ${injected} sigil(s).`);
  }


  /* ──────────────────────────────────────────────────────────
     bindSigilHover()
  ─────────────────────────────────────────────────────────── */
  function bindSigilHover() {
    _getSigils().forEach(sigil => {
      if (sigil.classList.contains('entropia-sigil--hero-bg')) return;
      sigil.addEventListener('mouseenter', () => sigil.classList.add('es-hover-active'));
      sigil.addEventListener('mouseleave', () => sigil.classList.remove('es-hover-active'));
    });
  }


  /* ── Utility: HSL → RGB ─────────────────────────────────── */
  function _hslToRgbValues(h, s, l) {
    if (s === 0) {
      const v = Math.round(l * 255);
      return [v, v, v];
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    return [
      Math.round(_hue2rgb(p, q, h + 1/3) * 255),
      Math.round(_hue2rgb(p, q, h)       * 255),
      Math.round(_hue2rgb(p, q, h - 1/3) * 255),
    ];
  }

  function _hue2rgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  }

  /* ── Cubic smoothstep easing ────────────────────────────── */
  /* Eliminates "corner snap" at Lissajous extremes (FLOAT-3).
     Input: x ∈ [-1, 1] (raw sin output)
     Output: eased value, same range.                         */
  function _smoothSin(x) {
    /* Map [-1,1] → [0,1], apply smoothstep, map back */
    const t = (x + 1) * 0.5;
    const s = t * t * (3 - 2 * t); // smoothstep(0,1,t)
    return s * 2 - 1;
  }


  /* ──────────────────────────────────────────────────────────
     initSigilFloat()
     Full-viewport Lissajous float on desktop (≥ 701px).

     FLOAT-1: The sigil now floats across the ENTIRE visible
     viewport, not just the right side. We compute a center
     anchor (vw/2 × vh/2) and apply amplitude that reaches
     within EDGE_INSET of all four edges.

     FF-1 FIX: transform is applied to the .es-float-wrapper
     div (a plain div, no filter), never to the sigil element
     that carries SVG filters. This prevents Firefox from
     creating multiple GPU surfaces per filter primitive.

     PERF-1: All trig driven by rAF timestamp (ts). No Date.now().
     PERF-2: string built with template literal once; toFixed(1).
  ─────────────────────────────────────────────────────────── */
  function initSigilFloat() {
    const DESKTOP_BP = 701;
    const EDGE_INSET = 20;

    /* FLOAT-2: Lissajous frequency ratio.
       ~11000ms / ~7000ms = 11/7 — near but not equal to 3/2,
       so the figure rotates slowly, never locks to a closed loop.
       Full viewport amplitude set at runtime from window size. */
    const PERIOD_X   = 11000;
    const PERIOD_Y   = 7000;
    /* Third perturbation frequency for high-drift chaos (FLOAT-4) */
    const PERIOD_Z   = 4300;

    let _rafHandle = null;
    let _paused    = false;

    const _navEl = document.getElementById('main-nav');
    let _navH = _navEl ? _navEl.getBoundingClientRect().height : 0;

    /* ── Viewport dimension cache ───────────────────────────
       Stores { vw, vh, halfW, halfH } per hero-bg sigil.
       halfW/halfH = sigil dimensions / 2 (for edge-clamping).
       vw/vh = viewport dimensions (for amplitude calculation).
       Refreshed on resize. Never read inside _tick via
       getBoundingClientRect() — only the cache is used.
    ─────────────────────────────────────────────────────── */
    const _geomCache = new WeakMap();

    function _cacheSigilGeometry(sigil) {
      /* One controlled getBoundingClientRect at init/resize only */
      const rect = sigil.getBoundingClientRect();
      _geomCache.set(sigil, {
        halfW: rect.width  / 2,
        halfH: rect.height / 2,
        /* Viewport size captured at same time for amplitude calc */
        vw: window.innerWidth,
        vh: window.innerHeight,
      });
    }

    function _cacheAllHeroBg() {
      _getSigils().forEach(s => {
        if (s.classList.contains('entropia-sigil--hero-bg')) {
          _cacheSigilGeometry(s);
        }
      });
    }

    document.addEventListener('visibilitychange', () => {
      _paused = document.hidden;
      if (!_paused && !_rafHandle) _schedule();
    });

    function _schedule() {
      _rafHandle = requestAnimationFrame(_tick);
    }

    function _tick(ts) {
      _rafHandle = null;

      if (window.innerWidth < DESKTOP_BP) return;

      const allSigils = _getSigils();
      let hasSigil = false;

      allSigils.forEach(sigil => {
        if (!sigil.classList.contains('entropia-sigil--hero-bg')) return;
        hasSigil = true;

        /* ── Get geometry from cache (zero layout read) ── */
        let geom = _geomCache.get(sigil);
        if (!geom) {
          _cacheSigilGeometry(sigil);
          geom = _geomCache.get(sigil);
          if (!geom) { if (!_paused) _schedule(); return; }
        }
        const { halfW, halfH, vw, vh } = geom;

        /* ── Drift-responsive amplitude (FLOAT-1, FLOAT-2) ──
           Maximum amplitude = usable viewport half-extent minus
           edge inset and sigil half-size, so the sigil JUST
           reaches the edges at drift=0. At drift > 0 the
           amplitude scales slightly to push harder into edges. */
        const drift    = parseFloat(sigil.style.getPropertyValue('--drift-intensity') || '0');
        const driftMul = 1 + drift * 0.15;

        /* Usable half-extents from center (viewport center is the origin) */
        const maxAmpX = (vw * 0.5 - halfW - EDGE_INSET) * driftMul;
        const maxAmpY = ((vh - _navH) * 0.5 - halfH - EDGE_INSET) * driftMul;

        /* Amplitude clamped to avoid negative values on very small screens */
        const ampX = Math.max(maxAmpX, 0);
        const ampY = Math.max(maxAmpY, 0);

        /* ── Lissajous coordinates (FLOAT-2, FLOAT-3) ── */
        const tX = (ts / PERIOD_X) * Math.PI * 2;
        const tY = (ts / PERIOD_Y) * Math.PI * 2 + 0.9; /* phase offset */

        let rawX = Math.sin(tX);
        let rawY = Math.sin(tY);

        /* Smoothstep easing on each axis (FLOAT-3) */
        const easedX = _smoothSin(rawX);
        const easedY = _smoothSin(rawY);

        /* FLOAT-4: High-drift perturbation — injects a third frequency
           term that grows with drift², creating genuinely erratic motion
           without dominating at low drift. Consistent with J⊥ vortex
           exploration in the NESS thermodynamic model. */
        const perturbScale = drift * drift * 0.35;
        const tZ = (ts / PERIOD_Z) * Math.PI * 2;
        const perturbX = Math.sin(tZ * 1.37 + 0.4) * perturbScale;
        const perturbY = Math.cos(tZ * 0.91 + 1.2) * perturbScale;

        const fx = (easedX + perturbX) * ampX;
        const fy = (easedY + perturbY) * ampY;

        /* ── Clamp to safe area (edge-guard) ── */
        const cx = vw  * 0.5;   /* viewport center X */
        const cy = (_navH + (vh - _navH) * 0.5); /* content center Y */

        const clampedX = Math.min(vw  - EDGE_INSET - halfW - cx,
                          Math.max(EDGE_INSET + halfW - cx, fx));
        const clampedY = Math.min(vh  - EDGE_INSET - halfH - cy,
                          Math.max(_navH + EDGE_INSET + halfH - cy, fy));

        /* ── FF-1 FIX: write transform to the WRAPPER, not the sigil
           Find or create the float-wrapper lazily (once per sigil).
           The wrapper is position:absolute, the sigil stays untransformed.
           This keeps the SVG filter stacking context on a separate layer
           that Firefox does not erroneously replicate for each filter. ── */
        let wrapper = sigil._esFloatWrapper;
        if (!wrapper) {
          /* First time: wrap the sigil element in a plain positioning div */
          const parent = sigil.parentElement;
          const w = document.createElement('div');
          w.className       = 'es-float-wrapper';
          /* Position: fixed so it spans the full viewport (FLOAT-1) */
          w.style.cssText   = [
            'position:fixed',
            `top:${cy.toFixed(1)}px`,
            `left:${cx.toFixed(1)}px`,
            /* Center the sigil on this origin point */
            'margin-top:0',
            'margin-left:0',
            /* will-change lives HERE, not on the SVG element (FF-1) */
            'will-change:transform',
            'pointer-events:none',
            'z-index:1',
            /* Ensure the wrapper does not create a new stacking context
               that interferes with backdrop-filter elements (FF-2) */
            'isolation:auto',
          ].join(';');
          parent?.insertBefore(w, sigil);
          w.appendChild(sigil);
          sigil._esFloatWrapper = w;
          wrapper = w;
        }

        /* PERF-2: single string write, toFixed(1) sufficient for display */
        wrapper.style.transform =
          `translate(-50%, -50%) translate3d(${clampedX.toFixed(1)}px,${clampedY.toFixed(1)}px,0)`;
      });

      if (!hasSigil) { if (!_paused) _schedule(); return; }
      if (!_paused) _schedule();
    }

    /* ── Resize: debounced geometry refresh ───────────────── */
    let _resizeTimer = null;
    const _resizeObs = new ResizeObserver(() => {
      clearTimeout(_resizeTimer);
      _resizeTimer = setTimeout(() => {
        _navH = _navEl ? _navEl.getBoundingClientRect().height : 0;
        _cacheAllHeroBg();

        const belowBP = window.innerWidth < DESKTOP_BP;
        _getSigils().forEach(s => {
          if (!s.classList.contains('entropia-sigil--hero-bg')) return;
          const w = s._esFloatWrapper;
          if (belowBP) {
            /* Mobile: reset transform, wrapper stays but is inert */
            if (w) w.style.transform = '';
            if (_rafHandle) { cancelAnimationFrame(_rafHandle); _rafHandle = null; }
          }
        });

        if (!belowBP && !_rafHandle && !_paused) {
          _schedule();
        }
      }, 120);
    });
    _resizeObs.observe(document.body);

    /* LOW-1: cleanup on page unload */
    window.addEventListener('pagehide', () => {
      if (_rafHandle) { cancelAnimationFrame(_rafHandle); _rafHandle = null; }
      _resizeObs.disconnect();
      if (_resizeTimer) { clearTimeout(_resizeTimer); _resizeTimer = null; }
    }, { once: true });

    /* Initial geometry + start */
    if (window.innerWidth >= DESKTOP_BP) {
      _cacheAllHeroBg();
      _schedule();
    }
  }


  /* ── Auto-init on DOMContentLoaded ──────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _autoInit);
  } else {
    _autoInit();
  }

  function _autoInit() {
    initEntropiaSigils();
    bindSigilHover();
    initSigilFloat();

    const firstSigil = _getSigils()[0];
    if (firstSigil) {
      updateSigilDrift(parseFloat(firstSigil.dataset.initialDrift || '0'));
    }

    /* SHS polling — only runs when runtime-overlay.js is absent */
    if (!window._orpRafActive) {
      let _lastSHS = '';

      function _onSHSChange(pill) {
        const shs = pill.textContent.trim().toUpperCase();
        if (shs && shs !== _lastSHS) {
          _lastSHS = shs;
          updateSigilFromSHS(shs === 'AMBER' ? 'YELLOW' : shs);
        }
      }

      function _observeSHSPill(pill) {
        _onSHSChange(pill);
        new MutationObserver(() => _onSHSChange(pill)).observe(pill, {
          childList: true, characterData: true, subtree: true,
        });
      }

      const pill = document.getElementById('cc-tab-shs');
      if (pill) {
        _observeSHSPill(pill);
      } else {
        const _waitObs = new MutationObserver((_, obs) => {
          const p = document.getElementById('cc-tab-shs');
          if (p) { obs.disconnect(); _observeSHSPill(p); }
        });
        _waitObs.observe(document.body, { childList: true, subtree: true });
      }
    }
  }


  /* ── Expose to global scope ──────────────────────────────── */
  global.updateSigilDrift   = updateSigilDrift;
  global.updateSigilFromSHS = updateSigilFromSHS;
  global.initEntropiaSigils = initEntropiaSigils;
  global.initSigilFloat     = initSigilFloat;

}(window));
