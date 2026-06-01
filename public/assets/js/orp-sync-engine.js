// orp-sync-engine.js  v2.1
// ============================================================
// Mirrors ORP_SYNC state into sessionStorage and synchronises
// across tabs via BroadcastChannel.
//
// CHANGES vs v2.0:
//   v2.1  — Removed ES module `export const SyncEngine` syntax.
//           Now assigned to window.SyncEngine so the file loads
//           as a plain <script> tag (no type="module" required).
//           All logic identical to v2.0.
//
// DEPENDS ON: orp-sync.js loaded first (window.ORP_SYNC must exist).
//
// LOAD ORDER:
//   <script src="assets/js/orp-sync.js"></script>        ← first (head)
//   <script src="assets/js/orp-sync-engine.js"></script> ← any time after
//
// USAGE:
//   SyncEngine.init();                     // call once after page load
//   SyncEngine.emit('sigil_drift', 0.7);   // persist + broadcast
//   SyncEngine.session.get('sigil_drift'); // read session state
// ============================================================

(function (global) {
  'use strict';

  var ORP_CHANNEL = new BroadcastChannel('orp_sync_bus');

  // ── Internal helpers ────────────────────────────────────────

  /** Prefixed key used in both localStorage and sessionStorage. */
  function _sKey(key) { return 'orp_' + key; }

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
      var raw = sessionStorage.getItem(_sKey(key));
      return raw !== null ? JSON.parse(raw) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  }

  // ── Public API ───────────────────────────────────────────────

  global.SyncEngine = {

    /**
     * Broadcast a state change to all other tabs/windows AND
     * persist it through ORP_SYNC (localStorage + event bus).
     * sessionStorage is updated automatically via the
     * 'orp-settings-update' listener set up in init().
     *
     * @param {string} key   — ORP_SYNC key (no orp_ prefix needed)
     * @param {*}      value — must be JSON-serialisable
     */
    emit: function (key, value) {
      // Let ORP_SYNC own persistence + local event dispatch.
      if (global.ORP_SYNC) {
        global.ORP_SYNC.save(key, value);
      }
      // Also broadcast to other tabs so they don't have to wait
      // for the 'storage' event round-trip.
      ORP_CHANNEL.postMessage({ type: 'SYNC', key: key, value: value });
    },

    /**
     * Initialise cross-tab reactivity and seed sessionStorage.
     * Call once, as early as possible after orp-sync.js is loaded.
     */
    init: function () {
      // ── 1. Seed sessionStorage from current ORP_SYNC snapshot ──
      if (global.ORP_SYNC) {
        var snapshot = global.ORP_SYNC.snapshot();
        var keys = Object.keys(snapshot);
        for (var i = 0; i < keys.length; i++) {
          _writeSession(keys[i], snapshot[keys[i]]);
        }
      }

      // ── 2. Mirror every ORP_SYNC save/remove into sessionStorage ──
      global.addEventListener('orp-settings-update', function (e) {
        if (!e || !e.detail) return;
        _writeSession(e.detail.key, e.detail.value);
      });

      // ── 3. Handle incoming cross-tab messages ───────────────
      ORP_CHANNEL.onmessage = function (event) {
        if (!event || !event.data || event.data.type !== 'SYNC') return;
        var key   = event.data.key;
        var value = event.data.value;

        // Update sessionStorage for this tab.
        _writeSession(key, value);

        // Also push through ORP_SYNC so local listeners and
        // localStorage stay consistent.
        if (global.ORP_SYNC) {
          global.ORP_SYNC.save(key, value);
        }
      };

      // ── 4. Keep sessionStorage in sync with direct localStorage ──
      // Catches any external writes that bypass ORP_SYNC entirely.
      global.addEventListener('storage', function (e) {
        if (!e.key || e.key.indexOf('orp_') !== 0) return;
        var bareKey = e.key.slice(4); // strip 'orp_' prefix
        try {
          var value = e.newValue !== null ? JSON.parse(e.newValue) : null;
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
       * @param {*}      [fallback]
       * @returns {*}
       */
      get: function (key, fallback) {
        var def = (fallback !== undefined)
          ? fallback
          : (global.ORP_SYNC ? global.ORP_SYNC.default(key) : undefined);
        return _readSession(key, def);
      },

      /**
       * Write directly to sessionStorage.
       * Does NOT persist to localStorage or broadcast.
       * Use SyncEngine.emit() for full cross-tab persistence.
       *
       * @param {string} key
       * @param {*}      value
       */
      set: function (key, value) {
        _writeSession(key, value);
      },

      /**
       * Remove a key from sessionStorage only.
       *
       * @param {string} key
       */
      clear: function (key) {
        _writeSession(key, null);
      },
    },
  };

}(window));
