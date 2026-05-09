// Set this to your deployed GAS Web App URL when ready.
window.OBSERVE888_TRACKING_CONFIG = Object.assign(
  {
    endpoint: 'https://script.google.com/macros/s/AKfycbz_vjwC709vxLuRe2SZtaWgytUyxHYJRwuF7MtIaqSeKaKyOlZZ8ciQYwQc2iTWGn12SA/exec',
    sourceName: 'observe888_public',
    siteName: 'observe888-visit-hub',
    attributionMaxAgeDays: 30,
    debug: false
  },
  window.OBSERVE888_TRACKING_CONFIG || {}
);
