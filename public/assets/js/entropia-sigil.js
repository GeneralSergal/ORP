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
     Full-viewport waypoint-dwell float on desktop (≥ 701px).

     v3.2.0 CHANGES (DWELL-1 through DWELL-4):
     DWELL-1 — Replaced continuous Lissajous loop with a
               waypoint-dwell system. The sigil picks a random
               point within the usable viewport, glides to it
               smoothly, dwells for ~10 s, then picks the next.
     DWELL-2 — CSS transition on the wrapper drives the glide.
               Duration = TRAVEL_MS (2 400 ms cubic-bezier ease-
               in-out). No rAF math needed during travel — GPU
               handles interpolation for buttery smoothness.
               FF-1 isolation preserved: transition on wrapper div,
               not on the SVG/filter element.
     DWELL-3 — Dwell duration jittered ± 20 % so motion never
               feels mechanical: base 10 000 ms ± 2 000 ms.
     DWELL-4 — At high drift the dwell shortens (÷ (1 + drift*1.5))
               and travel gets a subtle perturbation, consistent
               with J⊥ vortex exploration (FLOAT-4).

     FF-1 FIX preserved: transform written to .es-float-wrapper,
     never to the sigil SVG element carrying filters.
  ─────────────────────────────────────────────────────────── */
  function initSigilFloat() {
    const DESKTOP_BP   = 701;
    const EDGE_INSET   = 20;

    /* DWELL-1: timing constants */
    const TRAVEL_MS    = 2400;   /* glide duration (ms) */
    const DWELL_BASE   = 10000;  /* nominal dwell at drift=0 (ms) */
    const DWELL_JITTER = 2000;   /* ± random variation (ms) */

    let _paused = false;

    const _navEl = document.getElementById('main-nav');
    let _navH = _navEl ? _navEl.getBoundingClientRect().height : 0;

    /* ── Viewport dimension cache ───────────────────────────
       Stores { vw, vh, halfW, halfH } per hero-bg sigil.
       Refreshed on resize. Never calls getBoundingClientRect
       inside the animation loop.
    ─────────────────────────────────────────────────────── */
    const _geomCache = new WeakMap();

    function _cacheSigilGeometry(sigil) {
      const rect = sigil.getBoundingClientRect();
      _geomCache.set(sigil, {
        halfW: rect.width  / 2,
        halfH: rect.height / 2,
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

    /* ── Waypoint picker ────────────────────────────────────
       Returns a random {x, y} offset from viewport center
       that keeps the sigil within the safe area.
    ─────────────────────────────────────────────────────── */
    function _pickWaypoint(geom, drift) {
      const { halfW, halfH, vw, vh } = geom;
      const driftMul = 1 + drift * 0.15;

      const maxX = Math.max((vw * 0.5 - halfW - EDGE_INSET) * driftMul, 0);
      const maxY = Math.max(((vh - _navH) * 0.5 - halfH - EDGE_INSET) * driftMul, 0);

      /* Random point uniformly distributed in the usable rectangle */
      const x = (Math.random() * 2 - 1) * maxX;
      const y = (Math.random() * 2 - 1) * maxY;

      return { x, y };
    }

    /* ── Per-sigil timer state ────────────────────────────── */
    const _sigilState = new WeakMap();

    /* ── Ensure float-wrapper exists (FF-1 FIX) ──────────── */
    function _ensureWrapper(sigil, cx, cy) {
      if (sigil._esFloatWrapper) return sigil._esFloatWrapper;

      const parent = sigil.parentElement;
      const w = document.createElement('div');
      w.className = 'es-float-wrapper';
      w.style.cssText = [
        'position:fixed',
        'top:'  + cy.toFixed(1) + 'px',
        'left:' + cx.toFixed(1) + 'px',
        'margin-top:0',
        'margin-left:0',
        /* will-change on wrapper only — never on the SVG (FF-1) */
        'will-change:transform',
        'pointer-events:none',
        'z-index:1',
        'isolation:auto',
        /* DWELL-2: CSS transition drives the smooth glide */
        'transition:transform ' + TRAVEL_MS + 'ms cubic-bezier(0.45,0.05,0.55,0.95)',
      ].join(';');
      parent && parent.insertBefore(w, sigil);
      w.appendChild(sigil);
      sigil._esFloatWrapper = w;
      return w;
    }

    /* ── Core: pick next waypoint and schedule dwell ──────── */
    function _scheduleNext(sigil) {
      if (_paused || window.innerWidth < DESKTOP_BP) return;

      let geom = _geomCache.get(sigil);
      if (!geom) {
        _cacheSigilGeometry(sigil);
        geom = _geomCache.get(sigil);
        if (!geom) return;
      }

      const { vw, vh } = geom;
      const cx = vw * 0.5;
      const cy = _navH + (vh - _navH) * 0.5;

      const wrapper = _ensureWrapper(sigil, cx, cy);
      const drift   = parseFloat(sigil.style.getPropertyValue('--drift-intensity') || '0');
      const wp      = _pickWaypoint(geom, drift);

      /* Commit the new transform — CSS transition animates it smoothly */
      wrapper.style.transform =
        'translate(-50%,-50%) translate3d(' + wp.x.toFixed(1) + 'px,' + wp.y.toFixed(1) + 'px,0)';

      /* DWELL-3/4: jittered dwell, shortened at high drift */
      const rawDwell  = DWELL_BASE + (Math.random() * 2 - 1) * DWELL_JITTER;
      const dwell     = rawDwell / (1 + drift * 1.5);
      const totalWait = TRAVEL_MS + dwell;

      const state = _sigilState.get(sigil) || {};
      if (state.timer) clearTimeout(state.timer);
      state.timer = setTimeout(function () { _scheduleNext(sigil); }, totalWait);
      _sigilState.set(sigil, state);
    }

    /* ── Start all hero-bg sigils ─────────────────────────── */
    function _startAllHeroBg() {
      _getSigils().forEach(function (sigil) {
        if (!sigil.classList.contains('entropia-sigil--hero-bg')) return;
        /* Small random stagger so multiple sigils (if any) don't sync */
        const delay = Math.random() * 800;
        setTimeout(function () { _scheduleNext(sigil); }, delay);
      });
    }

    /* ── Stop / reset all hero-bg sigils ──────────────────── */
    function _stopAllHeroBg() {
      _getSigils().forEach(function (sigil) {
        if (!sigil.classList.contains('entropia-sigil--hero-bg')) return;
        const state = _sigilState.get(sigil);
        if (state && state.timer) { clearTimeout(state.timer); state.timer = null; }
        const w = sigil._esFloatWrapper;
        if (w) w.style.transform = '';
      });
    }

    document.addEventListener('visibilitychange', function () {
      _paused = document.hidden;
      if (!_paused && window.innerWidth >= DESKTOP_BP) _startAllHeroBg();
    });

    /* ── Resize: debounced geometry refresh ───────────────── */
    let _resizeTimer = null;
    var _resizeObs = new ResizeObserver(function () {
      clearTimeout(_resizeTimer);
      _resizeTimer = setTimeout(function () {
        _navH = _navEl ? _navEl.getBoundingClientRect().height : 0;
        _cacheAllHeroBg();

        var belowBP = window.innerWidth < DESKTOP_BP;
        if (belowBP) {
          _stopAllHeroBg();
        } else {
          /* Re-anchor wrapper origin points after resize */
          _getSigils().forEach(function (sigil) {
            if (!sigil.classList.contains('entropia-sigil--hero-bg')) return;
            var w = sigil._esFloatWrapper;
            if (!w) return;
            var geom = _geomCache.get(sigil);
            if (!geom) return;
            var cx = geom.vw * 0.5;
            var cy = _navH + (geom.vh - _navH) * 0.5;
            w.style.top  = cy.toFixed(1) + 'px';
            w.style.left = cx.toFixed(1) + 'px';
          });
        }
      }, 120);
    });
    _resizeObs.observe(document.body);

    /* LOW-1: cleanup on page unload */
    window.addEventListener('pagehide', function () {
      _stopAllHeroBg();
      _resizeObs.disconnect();
      if (_resizeTimer) { clearTimeout(_resizeTimer); _resizeTimer = null; }
    }, { once: true });

    /* Initial geometry + start */
    if (window.innerWidth >= DESKTOP_BP) {
      _cacheAllHeroBg();
      _startAllHeroBg();
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
