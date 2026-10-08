// Google Analytics 4 helpers (plan §17). Everything is a no-op until
// NEXT_PUBLIC_GA_MEASUREMENT_ID is set in .env.local (local) / the hosting
// provider's environment variables (production), so the site works unchanged
// without it.
export const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";
export const isGaEnabled = /^G-[A-Z0-9]{4,}$/.test(GA_ID);

// gtag.js replays whatever is queued on window.dataLayer, so a stub that just
// pushes the call's `arguments` is safe even if an event fires before the
// library has finished loading.
function gtagStub() {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(arguments);
}

export function trackEvent(name, params = {}) {
  if (!isGaEnabled || typeof window === "undefined") return;
  if (typeof window.gtag !== "function") window.gtag = gtagStub;
  window.gtag("event", name, params);
}
