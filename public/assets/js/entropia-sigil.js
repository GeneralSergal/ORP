/* ============================================================
   ENTROPIA SIGIL — JavaScript Module
   ORP Δ v3.0 | entropia-sigil.js

   DROP-IN: Add <script src="assets/js/entropia-sigil.js"></script>
   to your page's <body> end, AFTER main.js and runtime-overlay.js.

   PUBLIC API:
     updateSigilDrift(0.0–1.0)   — set by numeric drift score
     updateSigilFromSHS('GREEN')  — set by SHS state string
   ============================================================ */

(function (global) {
  'use strict';

  /* ── SHS → numeric drift map ─────────────────────────────── */
  const SHS_DRIFT_MAP = {
    'GREEN':  0.00,   // Nominal — idle breath only
    'YELLOW': 0.25,   // Watch   — slight fracture appearance
    'ORANGE': 0.55,   // Elevated — visible shards + jitter begins
    'RED':    0.78,   // Critical — aggressive glitch + scan bleed
    'BLACK':  1.00,   // Fracture — full entropic collapse
  };


  /* ──────────────────────────────────────────────────────────
     updateSigilDrift(driftValue)
     ─────────────────────────────
     The primary telemetry bridge function.
     Sets --drift-intensity on every .entropia-sigil element
     on the page. Clamps input to [0, 1].

     USAGE:
       updateSigilDrift(0.0);   // stable
       updateSigilDrift(0.55);  // elevated drift
       updateSigilDrift(1.0);   // full fracture

     WIRE INTO YOUR TELEMETRY:
       Call this wherever your runtime-overlay.js or main.js
       reads/updates DRIFT or SHS metrics. Example:

         // Inside your telemetry refresh loop:
         updateSigilDrift(parseFloat(driftMetric));
  ─────────────────────────────────────────────────────────── */
  function updateSigilDrift(driftValue) {
    const intensity = Math.min(Math.max(parseFloat(driftValue) || 0, 0), 1);

    const sigils = document.querySelectorAll('.entropia-sigil');
    sigils.forEach(sigil => {
      sigil.style.setProperty('--drift-intensity', intensity);
      sigil.style.setProperty('--es-shs-glow', _driftToGlow(intensity));
    });

    console.log(
      `[ORP_TELEMETRY] Sigil drift intensity set to: ${(intensity * 100).toFixed(2)}%`
    );

    return intensity;
  }


  /* ──────────────────────────────────────────────────────────
     updateSigilFromSHS(shsState)
     ─────────────────────────────
     Convenience wrapper — pass SHS string directly.
     Maps: 'GREEN' | 'YELLOW' | 'ORANGE' | 'RED' | 'BLACK'

     USAGE:
       updateSigilFromSHS('RED');

     WIRE INTO YOUR TELEMETRY:
       Wherever you set SHS state (e.g. on a dashboard metric
       card or runtime warden), also call:
         updateSigilFromSHS(newShsState);
  ─────────────────────────────────────────────────────────── */
  function updateSigilFromSHS(shsState) {
    const key       = (shsState || 'GREEN').trim().toUpperCase();
    const intensity = SHS_DRIFT_MAP[key] ?? 0;
    return updateSigilDrift(intensity);
  }


  /* ── Internal: compute SHS-aware glow colour ─────────────── */
  function _driftToGlow(intensity) {
    // Cross-fade: green (stable) → red (fractured)
    const hue = 120 - intensity * 120;
    const [r, g, b] = _hslToRgb(hue / 360, 0.85, 0.5);
    const alpha = 0.15 + intensity * 0.30;
    return `rgba(${r},${g},${b},${alpha.toFixed(3)})`;
  }


  /* ──────────────────────────────────────────────────────────
     initEntropiaSigils()
     ─────────────────────
     Stamps the SVG from <template id="entropiaSigilTemplate">
     into every empty .entropia-sigil wrapper.
     Automatically de-duplicates SVG filter IDs so multiple
     sigils on one page don't share/conflict filters.

     Call once on DOMContentLoaded (done automatically below).
  ─────────────────────────────────────────────────────────── */
  function initEntropiaSigils() {
    const template = document.getElementById('entropiaSigilTemplate');

    if (!template) {
      console.warn('[ORP_SIGIL] <template id="entropiaSigilTemplate"> not found. ' +
                   'Sigils must be pre-rendered in HTML or template must be added.');
      return;
    }

    let injected = 0;

    document.querySelectorAll('.entropia-sigil').forEach(wrapper => {
      // Skip wrappers that already contain an SVG
      if (wrapper.querySelector('svg')) return;

      const clone = template.content.cloneNode(true);
      const uid   = Math.random().toString(36).slice(2, 7);
      const svgEl = clone.querySelector('svg');

      if (svgEl) {
        // Rewrite all filter/gradient/clip IDs to be unique
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
      }

      wrapper.appendChild(clone);
      injected++;
    });

    console.log(`[ORP_SIGIL] Initialized ${injected} sigil(s).`);
  }


  /* ──────────────────────────────────────────────────────────
     bindSigilHover()
     ─────────────────
     Adds 'es-hover-active' class on mouse enter/leave.
     CSS handles the visual response — no JS animation needed.
     Called automatically on init.
  ─────────────────────────────────────────────────────────── */
  function bindSigilHover() {
    document.querySelectorAll('.entropia-sigil').forEach(sigil => {
      // Never bind hover on background/decorative sigils
      if (sigil.classList.contains('entropia-sigil--hero-bg')) return;
      sigil.addEventListener('mouseenter', () => sigil.classList.add('es-hover-active'));
      sigil.addEventListener('mouseleave', () => sigil.classList.remove('es-hover-active'));
    });
  }


  /* ── Utility: HSL → RGB ─────────────────────────────────── */
  function _hslToRgb(h, s, l) {
    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }


  /* ──────────────────────────────────────────────────────────
     initSigilFloat()
     ─────────────────
     Drives a smooth, boundary-aware float on every .entropia-sigil
     with the --hero-bg modifier on desktop (≥ 701px).

     HOW IT WORKS
     ─────────────
     Two independent sine waves run at different periods
     (slow horizontal ~28s, slower vertical ~22s) to produce
     an organic Lissajous path. The resulting offset is clamped
     to keep the sigil fully inside the visible viewport at all
     times, accounting for:
       • Nav bar height (read from #main-nav.getBoundingClientRect)
       • Current sigil size (getBoundingClientRect on the element)
       • A configurable inset margin from each viewport edge

     The position is applied as translate3d() which composites on
     the GPU without triggering layout. The rAF loop pauses
     automatically when the tab is backgrounded (Page Visibility API)
     and stops entirely on mobile (< 701px) to save battery.

     DRIFT COUPLING
     ───────────────
     Amplitude and speed both scale with --drift-intensity so the
     sigil floats more erratically at high entropy — the float
     becomes 30% wider and 40% faster at drift = 1.0.
  ─────────────────────────────────────────────────────────── */
  function initSigilFloat() {
    const DESKTOP_BP  = 701;    // px — mirrors CSS breakpoint
    const EDGE_INSET  = 16;     // px — minimum clearance from every viewport edge
    const BASE_AMP_X  = 38;     // px — horizontal float radius at drift=0
    const BASE_AMP_Y  = 52;     // px — vertical float radius at drift=0
    const PERIOD_X    = 28000;  // ms — horizontal wave period
    const PERIOD_Y    = 22000;  // ms — vertical wave period

    let _rafHandle  = null;
    let _paused     = false;

    // Pause when tab is hidden to save CPU/GPU
    document.addEventListener('visibilitychange', () => {
      _paused = document.hidden;
      if (!_paused && !_rafHandle) _schedule();
    });

    function _schedule() {
      _rafHandle = requestAnimationFrame(_tick);
    }

    function _tick(ts) {
      _rafHandle = null;

      // Stop entirely on mobile
      if (window.innerWidth < DESKTOP_BP) {
        return; // will restart if window resizes above bp (see resize observer below)
      }

      const sigils = document.querySelectorAll('.entropia-sigil.entropia-sigil--hero-bg');
      if (!sigils.length) return _schedule();

      sigils.forEach(sigil => {
        // ── Read drift intensity ──────────────────────────────
        const drift = parseFloat(
          sigil.style.getPropertyValue('--drift-intensity') || '0'
        );

        // ── Amplitude and speed scale with drift ──────────────
        const ampX  = BASE_AMP_X * (1 + drift * 0.30);
        const ampY  = BASE_AMP_Y * (1 + drift * 0.30);
        const spdMul = 1 + drift * 0.40;   // faster at high entropy

        // ── Lissajous path (two offset sines) ─────────────────
        const tx = Math.sin((ts * spdMul) / PERIOD_X * Math.PI * 2) * ampX;
        const ty = Math.sin((ts * spdMul) / PERIOD_Y * Math.PI * 2 + 0.9) * ampY;

        // ── Boundary clamping ─────────────────────────────────
        // Read the element's current bounding rect (CSS positions it
        // at a fixed anchor; we just need its size + anchor coords)
        const rect    = sigil.getBoundingClientRect();
        const navEl   = document.getElementById('main-nav');
        const navH    = navEl ? navEl.getBoundingClientRect().height : 0;

        const halfW   = rect.width  / 2;
        const halfH   = rect.height / 2;

        // Center of element in viewport (based on CSS anchor, no JS transform yet)
        // We reconstruct it by removing any existing JS translate from the rect center
        const cx = rect.left + halfW;
        const cy = rect.top  + halfH;

        // Allowed translate range so the sigil stays inside viewport
        const minTx = EDGE_INSET + halfW - cx;
        const maxTx = window.innerWidth  - EDGE_INSET - halfW - cx;
        const minTy = navH + EDGE_INSET + halfH - cy;
        const maxTy = window.innerHeight - EDGE_INSET - halfH - cy;

        const clampedTx = Math.min(maxTx, Math.max(minTx, tx));
        const clampedTy = Math.min(maxTy, Math.max(minTy, ty));

        // ── Apply — GPU compositor only, no layout ────────────
        sigil.style.transform =
          `translateY(-50%) translate3d(${clampedTx.toFixed(2)}px, ${clampedTy.toFixed(2)}px, 0)`;
      });

      if (!_paused) _schedule();
    }

    // ── Start / restart on resize ─────────────────────────────
    // Use ResizeObserver on <body> so we catch orientation changes too.
    // Debounced to avoid firing every pixel during a drag-resize.
    let _resizeTimer = null;
    const _resizeObs = new ResizeObserver(() => {
      clearTimeout(_resizeTimer);
      _resizeTimer = setTimeout(() => {
        // Reset transforms on mobile so CSS takes over cleanly
        if (window.innerWidth < DESKTOP_BP) {
          document.querySelectorAll('.entropia-sigil.entropia-sigil--hero-bg')
            .forEach(s => { s.style.transform = ''; });
          if (_rafHandle) { cancelAnimationFrame(_rafHandle); _rafHandle = null; }
        } else if (!_rafHandle && !_paused) {
          _schedule();
        }
      }, 120);
    });
    _resizeObs.observe(document.body);

    // Boot
    if (window.innerWidth >= DESKTOP_BP) _schedule();
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
    initSigilFloat();   // boundary-aware float — desktop only, rAF-driven

    // Read initial drift from a data attribute if present:
    //   <div class="entropia-sigil" data-initial-drift="0.25">
    const firstSigil = document.querySelector('.entropia-sigil');
    if (firstSigil) {
      const initial = parseFloat(firstSigil.dataset.initialDrift || '0');
      updateSigilDrift(initial);
    }

    // ── Wire to runtime-overlay SHS changes ──────────────────
    // The runtime-overlay updates state.shs but has no native
    // event. We poll the tab-pill element (already updated by
    // the overlay's update() function) at low frequency.
    // This adds zero coupling to runtime-overlay internals.
    let _lastSHS = '';
    setInterval(() => {
      const pill = document.getElementById('cc-tab-shs');
      if (!pill) return;
      const shs = pill.textContent.trim().toUpperCase();
      if (shs && shs !== _lastSHS) {
        _lastSHS = shs;
        // Map overlay's AMBER label to the sigil's YELLOW key
        const mapped = shs === 'AMBER' ? 'YELLOW' : shs;
        updateSigilFromSHS(mapped);
      }
    }, 800); // 800ms — imperceptible lag, very low CPU cost
  }


  /* ── Expose to global scope ──────────────────────────────── */
  global.updateSigilDrift    = updateSigilDrift;
  global.updateSigilFromSHS  = updateSigilFromSHS;
  global.initEntropiaSigils  = initEntropiaSigils;
  global.initSigilFloat      = initSigilFloat;

}(window));
