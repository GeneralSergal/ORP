// assets/js/orp-init.js
import { SyncEngine } from './orp-sync-engine.js';

export const ORP_BOOT = {
  run: (uiUpdateCallback) => {
    console.log("[ORP] Booting...");

    // 1. Enforce Registry Defaults (Bootstrap Spec)
    const defaults = {
      orp_ness_pressure: '0',
      orp_coordinator_mode: 'NOMINAL'
    };
    
    Object.entries(defaults).forEach(([k, v]) => {
      if (!localStorage.getItem(k)) localStorage.setItem(k, v);
    });

    // 2. Initialize Sync
    SyncEngine.init(uiUpdateCallback);

    // 3. Expose to Window for console debugging
    window.ORP = {
      sync: SyncEngine,
      state: () => ({ ...localStorage })
    };
    
    console.log("[ORP] Kernel Online.");
  }
};
