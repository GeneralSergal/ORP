/* ============================================================
   ORP v3.0 — Shared JS
   GPU-optimized: all scroll-driven DOM writes batched into a
   single requestAnimationFrame callback per frame. The scroll
   event only captures the latest scroll position (a cheap
   read); the rAF callback does all writes, running at most
   once per display refresh cycle regardless of scroll speed.

   PATCH LOG (v3.0.1):
     MEDIUM-1— resize listener now carries { passive: true } flag.
     MEDIUM-2— document.documentElement.scrollHeight read moved out
               of _flushScrollWrites() into a ResizeObserver cache
               (_scrollMax). Zero layout reads inside the rAF callback.
     LOW-1   — display:none/block panel toggles replaced with the
               hidden attribute. Avoids full paint+layout recalc on
               toggle; semantically equivalent; aria-expanded still set.
     LOW-2   — IntersectionObserver: added rootMargin:"0px 0px -80px 0px"
               (trigger 80px early, eliminates flash-of-invisible on fast
               scroll); added observer.unobserve() after first reveal to
               free observer bookkeeping for elements that won't re-hide.

   PATCH LOG (v3.1.0 — Logo-mark Stability + SHS Coupling):
     LOGO-1  — initLogoMark(): static SVG injection into .logo-mark
               elements. Fetches icons.svg ONCE; appends the full
               document (including root <defs>) into a hidden host div
               at the top of <body> so url(#orp-*) filter IDs resolve
               correctly in all browsers (Firefox/Safari shadow-DOM
               scoping fix). Then injects <svg><use href="#orp-logo-mark">
               into each .logo-mark container. No Math.random() ID
               rewriting — static IDs are globally unique via orp- prefix.
     LOGO-2  — _logoHoverBind(): hover + click class toggles on .logo
               anchor trigger .logo-mark--active and .logo-mark--pulse
               on the SVG wrapper for CSS-driven interaction sequences.
               Click fires a one-shot .logo-mark--clicked class that
               self-removes after the animation duration.
     LOGO-3  — _logoSHSBridge(): listens to the same orp-settings-update
               event bus as entropia-sigil.js. Applies shs-* classes to
               .logo-mark[data-shs-live] elements so the logo reflects
               the current System Health State without polling.
               Falls back to MutationObserver on #cc-tab-shs pill for
               pages where ORP_SYNC is absent.
     LOGO-4  — initLogoMark() is idempotent: skips containers that
               already contain an <svg> child (hot-reload / PJAX safe).
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ── Cache DOM references once ───────────────────────── */
  const progressEl  = document.querySelector(".scroll-progress");
  const topBtn      = document.getElementById("scroll-top-btn");
  const navElement  = document.getElementById("main-nav");

  /* ── Shared scroll state (read on event, write on rAF) ── */
  let _scrollY        = window.scrollY;
  let _rafPending     = false;
  let _lastNavScrollY = window.scrollY;
  const SCROLL_THRESHOLD = 8;

  /* PATCH MEDIUM-2: cache scrollMax via ResizeObserver */
  let _scrollMax = document.documentElement.scrollHeight - window.innerHeight;
  const _scrollMaxObs = new ResizeObserver(() => {
    _scrollMax = document.documentElement.scrollHeight - window.innerHeight;
  });
  _scrollMaxObs.observe(document.documentElement);

  /* ── Single scroll listener — passive, zero DOM writes ── */
  window.addEventListener("scroll", () => {
    _scrollY = window.scrollY;
    if (!_rafPending) {
      _rafPending = true;
      requestAnimationFrame(_flushScrollWrites);
    }
  }, { passive: true });

  /* ── rAF: all DOM writes happen here, once per frame ─── */
  function _flushScrollWrites() {
    _rafPending = false;

    if (progressEl && _scrollMax > 0) {
      progressEl.style.transform = `scaleX(${_scrollY / _scrollMax})`;
    }

    if (topBtn) {
      topBtn.classList.toggle("visible", _scrollY > 400);
    }

    if (navElement) {
      if (window.innerWidth <= 640) {
        const delta = _scrollY - _lastNavScrollY;
        if (_scrollY <= 0) {
          navElement.classList.remove("nav-hidden");
          _lastNavScrollY = _scrollY;
        } else if (Math.abs(delta) > SCROLL_THRESHOLD) {
          navElement.classList.toggle("nav-hidden", delta > 0);
          _lastNavScrollY = _scrollY;
        }
      } else {
        navElement.classList.remove("nav-hidden");
      }
    }
  }

  /* ── Scroll to top ───────────────────────────────────── */
  if (topBtn) {
    topBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ── Active nav link helper ─────────────────────────────── */
  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  function _markActiveLink(link) {
    const href = link.getAttribute("href").split("/").pop();
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    }
  }

  document.querySelectorAll(".nav-links a").forEach(_markActiveLink);

  /* ── Mobile hamburger navigation ─────────────────────── */
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mobileNav    = document.getElementById("mobile-nav");

  if (hamburgerBtn && mobileNav) {

    const toggleMenu = () => {
      const isActive = mobileNav.classList.toggle("active");
      hamburgerBtn.classList.toggle("active", isActive);
      hamburgerBtn.setAttribute("aria-expanded", isActive ? "true" : "false");
      document.body.style.overflow = isActive ? "hidden" : "";
      navElement?.classList.toggle("menu-open", isActive);
    };

    hamburgerBtn.addEventListener("click", toggleMenu);

    mobileNav.querySelectorAll("a").forEach(link => {
      _markActiveLink(link);
      link.addEventListener("click", () => {
        mobileNav.classList.remove("active");
        navElement?.classList.remove("menu-open");
        hamburgerBtn.classList.remove("active");
        hamburgerBtn.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });

    let _resizeRaf = false;
    const _onResize = () => {
      if (!_resizeRaf) {
        _resizeRaf = true;
        requestAnimationFrame(() => {
          _resizeRaf = false;
          if (window.innerWidth > 640) {
            mobileNav.classList.remove("active");
            navElement?.classList.remove("menu-open");
            hamburgerBtn.classList.remove("active");
            document.body.style.overflow = "";
          }
        });
      }
    };
    window.addEventListener("resize", _onResize, { passive: true });
  }

  /* ── Author image fallback ───────────────────────────── */
  const authorImg       = document.getElementById("author-img");
  const avatarContainer = document.getElementById("avatar-container");

  if (authorImg && avatarContainer) {
    authorImg.addEventListener("error", () => {
      avatarContainer.classList.add("img-error");
    });
    if (authorImg.naturalWidth === 0) {
      avatarContainer.classList.add("img-error");
    }
  }

  /* ── Telemetry console toggle ────────────────────────── */
  const consoleToggleBtn = document.getElementById("console-toggle-btn");

  if (consoleToggleBtn) {
    const extendedContainer = document.getElementById("extended-telemetry-container");
    const btnText           = document.getElementById("telemetry-btn-text");

    consoleToggleBtn.addEventListener("click", () => {
      if (!extendedContainer || !btnText) return;

      const isHidden = extendedContainer.hasAttribute("hidden");
      if (isHidden) {
        extendedContainer.removeAttribute("hidden");
      } else {
        extendedContainer.setAttribute("hidden", "");
      }
      consoleToggleBtn.setAttribute("aria-expanded", isHidden ? "true" : "false");
      btnText.textContent = isHidden
        ? "[ COLLAPSE SYSTEM ARTIFACTS - ]"
        : "[ EXPAND SYSTEM ARTIFACTS + ]";
      btnText.style.color = isHidden ? "var(--accent-orange)" : "var(--muted)";
    });
  }

  /* ── Variant matrix toggle ───────────────────────────── */
  const variantToggleBtn = document.getElementById("variant-toggle-btn");

  if (variantToggleBtn) {
    const panel   = document.getElementById("variant-matrix-panel");
    const btnSpan = variantToggleBtn.querySelector("span");

    variantToggleBtn.addEventListener("click", () => {
      if (!panel || !btnSpan) return;

      const isHidden = panel.hasAttribute("hidden");
      if (isHidden) {
        panel.removeAttribute("hidden");
      } else {
        panel.setAttribute("hidden", "");
      }
      variantToggleBtn.setAttribute("aria-expanded", isHidden ? "true" : "false");
      btnSpan.textContent = isHidden
        ? "[SYSTEM // CLOSE VARIANT MATRIX]"
        : "[SYSTEM // EXECUTE VARIANT MATRIX]";
    });
  }

  /* ── Intersection Observer reveal ───────────────────── */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: "0px 0px -80px 0px" });

  document.querySelectorAll(
    "section, header, .pipeline-card, .doc-card, .principle, .quick-access-card, .release-card, .cfg-card, .cfg-danger"
  ).forEach(el => {
    el.classList.add("reveal");
    observer.observe(el);
  });


  /* ════════════════════════════════════════════════════════════
     PATCH LOGO-1 / LOGO-2 / LOGO-3 / LOGO-4
     initLogoMark — Static SVG injection + interactivity + SHS
     ════════════════════════════════════════════════════════════

     HOW IT WORKS:
       1. Fetch assets/icons.svg once (plain text).
       2. Parse it into a DocumentFragment via DOMParser.
       3. Append the parsed <svg> (which contains the root <defs>
          with all orp-* filter IDs) into a hidden host div at the
          top of <body>. This puts orp-* IDs into the main document
          scope so url(#orp-*) lookups resolve in all browsers.
       4. For each .logo-mark container, inject a sized <svg>
          with a <use href="#orp-logo-mark"> — no ID rewriting,
          no Math.random(), no innerHTML string surgery.
       5. Bind hover/click on the parent .logo anchor.
       6. Wire SHS state to logo shs-* classes.

     WHY THIS IS STABLE:
       • Shadow-DOM filter scoping bug: filters inside a <symbol>
         are processed in the symbol's scope. By hoisting defs to
         the root document svg (step 3) we guarantee the filter IDs
         are always in document scope, not shadow scope.
       • No per-frame DOM writes — the SVG is injected once and
         then CSS drives all animation.
       • Idempotent: containers that already have an <svg> child
         are skipped so hot-reload / PJAX won't double-inject.
  ──────────────────────────────────────────────────────────── */

  /* ── LOGO-1: Static SVG injection ──────────────────────── */
  async function initLogoMark() {
    const containers = document.querySelectorAll(".logo-mark");
    if (containers.length === 0) return;

    let svgSprite;
    try {
      const res = await fetch("assets/icons.svg");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();

      /* Parse into a live DOM tree */
      const parser = new DOMParser();
      const doc    = parser.parseFromString(text, "image/svg+xml");
      svgSprite    = doc.querySelector("svg");
      if (!svgSprite) throw new Error("No <svg> root found in icons.svg");

    } catch (err) {
      console.warn("ORP_LOGO: Failed to load icons.svg —", err.message);
      return;
    }

    /* LOGO-1 Step 3: Hoist the sprite (with its root <defs>) into
       document body so filter IDs resolve in document scope.
       The sprite itself is display:none — it's a def container, not visible. */
    if (!document.getElementById("orp-icon-host")) {
      const host = document.createElement("div");
      host.id           = "orp-icon-host";
      host.style.cssText = "position:absolute;width:0;height:0;overflow:hidden;pointer-events:none;";
      host.setAttribute("aria-hidden", "true");
      host.appendChild(svgSprite.cloneNode(true));
      document.body.insertBefore(host, document.body.firstChild);
    }

    /* LOGO-1 Step 4: Inject <use> references into each container */
    containers.forEach(container => {
      /* Idempotency guard — LOGO-4 */
      if (container.querySelector("svg")) return;

      /* Determine render size from container's computed dimensions
         or fall back to 32×32. Reading offsetWidth/Height here is
         safe: we're in DOMContentLoaded, layout has already run for
         static elements. Not called on every frame. */
      const w = container.offsetWidth  || 32;
      const h = container.offsetHeight || 32;

      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox",  "0 0 100 100");
      svg.setAttribute("width",    w);
      svg.setAttribute("height",   h);
      svg.setAttribute("overflow", "visible");
      svg.setAttribute("aria-hidden", "true");
      svg.style.cssText = "display:block;width:100%;height:100%;";

      /* GPU layer promotion — container will be animated by CSS */
      svg.style.willChange      = "transform, opacity";
      svg.style.backfaceVisibility = "hidden";

      const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
      use.setAttribute("href", "#orp-logo-mark");

      svg.appendChild(use);
      container.appendChild(svg);

      /* Mark container as live for SHS bridge — LOGO-3 */
      container.dataset.shsLive = "true";
    });

    /* Wire interactivity once injection is done */
    _logoHoverBind();
    _logoSHSBridge();
  }


  /* ── LOGO-2: Hover + click interactivity ────────────────── */
  /* Targets the .logo anchor (parent of .logo-mark).
     Applies class sequences to .logo-mark children for CSS-driven
     animation sequences without any style.* writes in JS.

     Classes applied:
       .logo-mark--active   — hover state (orbit faster, wing shimmer up)
       .logo-mark--pulse    — brief glow pulse on mouseenter
       .logo-mark--clicked  — one-shot activation flash on click
                              (self-removes after CSS animation ends)
  */
  function _logoHoverBind() {
    document.querySelectorAll(".logo").forEach(logoAnchor => {
      const mark = logoAnchor.querySelector(".logo-mark");
      if (!mark) return;

      /* Hover: active state */
      logoAnchor.addEventListener("mouseenter", () => {
        mark.classList.add("logo-mark--active", "logo-mark--pulse");
      });
      logoAnchor.addEventListener("mouseleave", () => {
        mark.classList.remove("logo-mark--active", "logo-mark--pulse");
      });

      /* Focus (keyboard nav): same as hover */
      logoAnchor.addEventListener("focusin", () => {
        mark.classList.add("logo-mark--active");
      });
      logoAnchor.addEventListener("focusout", () => {
        mark.classList.remove("logo-mark--active");
      });

      /* Click: one-shot flash — class removes itself when animationend fires */
      logoAnchor.addEventListener("click", (e) => {
        /* Don't hijack navigation — just add the class */
        mark.classList.add("logo-mark--clicked");

        /* Self-cleaning: remove after the CSS animation completes.
           animationend fires on the SVG child if the animation is on
           a child element; listening on the container is safer. */
        const onEnd = () => {
          mark.classList.remove("logo-mark--clicked");
          mark.removeEventListener("animationend", onEnd);
        };
        mark.addEventListener("animationend", onEnd);

        /* Fallback cleanup: if animationend never fires (e.g. reduced-motion)
           remove the class after a generous timeout */
        setTimeout(() => mark.classList.remove("logo-mark--clicked"), 1200);
      });
    });
  }


  /* ── LOGO-3: SHS state bridge ───────────────────────────────
     Maps SHS state strings to shs-* classes on .logo-mark elements
     that carry data-shs-live="true" (set in LOGO-1 step 4).

     Priority order:
       1. ORP_SYNC 'orp-settings-update' event (cross-tab sync)
       2. MutationObserver on #cc-tab-shs pill (local page)
       3. Fallback: poll once from ORP_SYNC.load('ness_pressure')
  ────────────────────────────────────────────────────────────── */
  function _logoSHSBridge() {
    const SHS_CLASSES = ["shs-green", "shs-yellow", "shs-orange", "shs-red", "shs-black"];

    /* Apply a SHS state string to all live logo marks */
    function _applyLogoSHS(shs) {
      const state = (shs || "GREEN").trim().toUpperCase();
      const cls   = state === "BLACK" || state === "DEAD" ? "shs-black"
                  : state === "RED"                       ? "shs-red"
                  : state === "ORANGE" || state === "AMBER" ? "shs-orange"
                  : state === "YELLOW"                    ? "shs-yellow"
                  :                                         "shs-green";

      document.querySelectorAll('.logo-mark[data-shs-live="true"]').forEach(mark => {
        mark.classList.remove(...SHS_CLASSES);
        mark.classList.add(cls);
      });
    }

    /* 1. ORP_SYNC event bus (fires on every save/remove call) */
    window.addEventListener("orp-settings-update", (e) => {
      if (!e.detail) return;
      if (e.detail.key === "ness_pressure" && e.detail.value) {
        _applyLogoSHS(e.detail.value);
      }
      if (e.detail.key === "shs_override" && e.detail.value) {
        _applyLogoSHS(e.detail.value);
      }
    });

    /* 2. MutationObserver on #cc-tab-shs pill */
    function _watchPill(pill) {
      _applyLogoSHS(pill.textContent.trim());
      new MutationObserver(() => {
        _applyLogoSHS(pill.textContent.trim());
      }).observe(pill, { childList: true, characterData: true, subtree: true });
    }

    const pill = document.getElementById("cc-tab-shs");
    if (pill) {
      _watchPill(pill);
    } else {
      /* Wait for pill to appear (runtime-overlay.js may boot later) */
      const _waitObs = new MutationObserver((_, obs) => {
        const p = document.getElementById("cc-tab-shs");
        if (p) { obs.disconnect(); _watchPill(p); }
      });
      _waitObs.observe(document.body, { childList: true, subtree: true });
    }

    /* 3. Restore persisted SHS state at boot if ORP_SYNC is present */
    if (typeof window.ORP_SYNC !== "undefined") {
      const persisted = ORP_SYNC.load("ness_pressure", ORP_SYNC.default("ness_pressure"));
      if (persisted) _applyLogoSHS(persisted);

      /* Also apply any override */
      const override = ORP_SYNC.load("shs_override", null);
      if (override) _applyLogoSHS(override);
    }
  }


  /* ── Boot: run logo injection ───────────────────────────── */
  /* initLogoMark is async (fetch). Runs after DOMContentLoaded
     (we're already inside the DOMContentLoaded handler). */
  initLogoMark();

});
