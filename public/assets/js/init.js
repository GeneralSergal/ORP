// init.js
export const initORP = () => {
  console.log("ORP Kernel initializing...");
  
  // 1. Sync local storage state to cookies for cross-site accessibility
  const syncToCookie = (key) => {
    const value = localStorage.getItem(key);
    if (value) {
      // Set cookie to expire in 30 days
      document.cookie = `${key}=${encodeURIComponent(value)}; path=/; SameSite=Lax; Max-Age=2592000`;
    }
  };

  // List of critical keys from your image_60a319.png
  const criticalKeys = ['orp_coordinator_run_id', 'orp_ness_pressure'];
  criticalKeys.forEach(syncToCookie);
};

// Hook into the window load or app entry point
window.addEventListener('DOMContentLoaded', initORP);
