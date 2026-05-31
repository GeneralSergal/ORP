// orp-sync-engine.js
// High-performance state synchronization across ORP runtime instances

const ORP_CHANNEL = new BroadcastChannel('orp_sync_bus');

export const SyncEngine = {
  // Broadcast a state change to all other tabs/windows
  emit: (key, value) => {
    localStorage.setItem(key, value);
    ORP_CHANNEL.postMessage({ type: 'SYNC', key, value });
  },

  // Initialize listeners for cross-instance reactivity
  init: () => {
    // 1. Listen for cross-tab updates
    ORP_CHANNEL.onmessage = (event) => {
      if (event.data.type === 'SYNC') {
        localStorage.setItem(event.data.key, event.data.value);
        window.dispatchEvent(new Event('orp-storage-updated')); // Notify local UI
      }
    };

    // 2. Listen for local storage changes within the same tab
    window.addEventListener('storage', (e) => {
      if (e.key?.startsWith('orp_')) {
        window.dispatchEvent(new Event('orp-storage-updated'));
      }
    });
  }
};
