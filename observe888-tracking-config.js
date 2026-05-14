// Set this to your deployed GAS Web App URL when ready.
window.OBSERVE888_TRACKING_CONFIG = Object.assign(
  {
    endpoint: 'https://script.google.com/macros/s/AKfycbz_vjwC709vxLuRe2SZtaWgytUyxHYJRwuF7MtIaqSeKaKyOlZZ8ciQYwQc2iTWGn12SA/exec',
    sourceName: 'observe888_public',
    siteName: 'observe888-visit-hub',
    attributionMaxAgeDays: 30,
    googleAdsConversion: {
      conversionId: 'AW-17875250530',
      sendTo: {
        line_click: 'AW-17875250530/QwVXCKOYxIccEOLaystC',
        phone_click: 'AW-17875250530/G5IPCJXLu4ccEOLaystC'
      }
    },
    debug: false
  },
  window.OBSERVE888_TRACKING_CONFIG || {}
);
