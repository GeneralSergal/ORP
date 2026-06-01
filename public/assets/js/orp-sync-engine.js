// orp-sync-engine.js  v2.0
// Mirrors ORP_SYNC state into sessionStorage and synchronises
// across tabs via BroadcastChannel.
//
// DEPENDS ON: orp-sync.js loaded first (window.ORP_SYNC must exist).
//
// CHANGES FROM v1:
//   • Writes to sessionStorage (tab-local, cleared on tab close)
//     in addition to the cross-tab BroadcastChannel.
//   • Applies the orp_ prefix and JSON serialisation that
//     ORP_SYNC.save() uses, so session keys are consistent with
//     the localStorage entries ORP_SYNC manages.
//   • emit() now delegates to ORP_SYNC.save() instead of writing
//     to localStorage directly — ORP_SYNC remains the single
//     authority for persistence and event dispatch.
//   • init() seeds sessionStorage from the current ORP_SYNC
//     snapshot on first load, so a freshly-opened tab is
//     immediately hydrated.
//   • Listens to 'orp-settings-update' (ORP_SYNC's event bus)
//     instead of the raw 'storage' event, giving consistent
//     coverage for same-tab writes too.
//   • Exposes SyncEngine.session.get/set/clear helpers for any
//     module that needs to read session state directly.

const ORP_CHANNEL = new BroadcastChannel('orp_sync_bus');

// ── Internal helpers ──────────────────────────────────────────

/** Prefixed key used in both localStorage and sessionStorage. */
const _sKey = key => `orp_${key}`;

/** Write one key/value into sessionStorage (JSON-serialised). */
function _writeSession(key, value) {
  try {
    if (value === null || value === undefined) {
      sessionStorage.removeItem(_sKey(key));
    } else {
      sessionStorage.setItem(_sKey(key), JSON.stringify(value));
    }
  } catch (e) {
    // sessionStorage unavailable (private browsing edge-case) — silent.
  }
}

/** Read one value back out of sessionStorage. */
function _readSession(key, defaultValue) {
  try {
    const raw = sessionStorage.getItem(_sKey(key));
    return raw !== null ? JSON.parse(raw) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
}

// ── Public API ────────────────────────────────────────────────

export const SyncEngine = {

  /**
   * Broadcast a state change to all other tabs/windows AND
   * persist it through ORP_SYNC (localStorage + event bus).
   * sessionStorage is updated automatically via the
   * 'orp-settings-update' listener set up in init().
   *
   * @param {string} key   — ORP_SYNC key (no orp_ prefix needed)
   * @param {*}      value — must be JSON-serialisable
   */
  emit(key, value) {
    // Let ORP_SYNC own persistence + local event dispatch.
    if (typeof window.ORP_SYNC !== 'undefined') {
      window.ORP_SYNC.save(key, value);
    }
    // Also broadcast to other tabs directly so they don't have
    // to wait for the 'storage' event round-trip.
    ORP_CHANNEL.postMessage({ type: 'SYNC', key, value });
  },

  /**
   * Initialise cross-tab reactivity and seed sessionStorage.
   * Call once, as early as possible (e.g. right after the
   * <script> tags for orp-sync.js and orp-sync-engine.js).
   */
  init() {
    // ── 1. Seed sessionStorage from current ORP_SYNC snapshot ──
    // Hydrates a freshly-opened tab without requiring a save event.
    if (typeof window.ORP_SYNC !== 'undefined') {
      const snapshot = window.ORP_SYNC.snapshot();
      Object.entries(snapshot).forEach(([k, v]) => _writeSession(k, v));
    }

    // ── 2. Mirror every ORP_SYNC save/remove into sessionStorage ──
    // 'orp-settings-update' fires for both ORP_SYNC.save() and
    // ORP_SYNC.remove(), so this covers all local writes.
    window.addEventListener('orp-settings-update', (e) => {
      if (!e.detail) return;
      _writeSession(e.detail.key, e.detail.value);
    });

    // ── 3. Handle incoming cross-tab messages ──────────────────
    ORP_CHANNEL.onmessage = (event) => {
      if (event.data?.type !== 'SYNC') return;
      const { key, value } = event.data;

      // Update sessionStorage for this tab.
      _writeSession(key, value);

      // Also push through ORP_SYNC so local listeners and
      // localStorage stay consistent.
      if (typeof window.ORP_SYNC !== 'undefined') {
        window.ORP_SYNC.save(key, value);
      }
    };

    // ── 4. Keep sessionStorage in sync with direct localStorage ──
    // Catches any external writes that bypass ORP_SYNC entirely
    // (legacy code, browser extensions, etc.).
    window.addEventListener('storage', (e) => {
      if (!e.key?.startsWith('orp_')) return;
      const bareKey = e.key.slice(4); // strip 'orp_' prefix
      try {
        const value = e.newValue !== null ? JSON.parse(e.newValue) : null;
        _writeSession(bareKey, value);
      } catch (_) {
        // Malformed value in localStorage — skip.
      }
    });
  },

  /**
   * Low-level sessionStorage accessors for modules that need to
   * read session state without going through ORP_SYNC.
   */
  session: {
    /**
     * Read a value from sessionStorage.
     * Falls back to ORP_SYNC.default() when the key is absent.
     *
     * @param {string} key
     * @param {*}      [fallback]  — explicit fallback (overrides default)
     * @returns {*}
     */
    get(key, fallback) {
      const def = (fallback !== undefined)
        ? fallback
        : (typeof window.ORP_SYNC !== 'undefined'
            ? window.ORP_SYNC.default(key)
            : undefined);
      return _readSession(key, def);
    },

    /**
     * Write directly to sessionStorage (does NOT persist to
     * localStorage or broadcast — use SyncEngine.emit() for that).
     *
     * @param {string} key
     * @param {*}      value
     */
    set(key, value) {
      _writeSession(key, value);
    },

    /**
     * Remove a key from sessionStorage only.
     *
     * @param {string} key
     */
    clear(key) {
      _writeSession(key, null);
    },
  },
};
