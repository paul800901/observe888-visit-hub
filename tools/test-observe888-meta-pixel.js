const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const appendedScripts = [];
const storage = () => {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) || null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: (key) => values.delete(key)
  };
};

const document = {
  body: { dataset: {} },
  head: { appendChild: (element) => appendedScripts.push(element) },
  title: 'Tracking test',
  readyState: 'complete',
  addEventListener() {},
  createElement: () => ({
    setAttribute(name, value) {
      this[name] = value;
    }
  }),
  querySelector: () => null,
  querySelectorAll: () => []
};

const window = {
  document,
  location: {
    href: 'https://www.observe888.com/south/?utm_source=meta&utm_medium=paid_social&utm_campaign=test',
    pathname: '/south/',
    search: '?utm_source=meta&utm_medium=paid_social&utm_campaign=test'
  },
  innerWidth: 390,
  innerHeight: 844,
  localStorage: storage(),
  sessionStorage: storage(),
  crypto: globalThis.crypto,
  setTimeout,
  URL,
  URLSearchParams
};

const context = vm.createContext({
  Blob,
  console,
  document,
  fetch: async () => true,
  navigator: { sendBeacon: () => true },
  setTimeout,
  URL,
  URLSearchParams,
  window
});

vm.runInContext(fs.readFileSync(path.join(root, 'observe888-tracking-config.js'), 'utf8'), context);
vm.runInContext(fs.readFileSync(path.join(root, 'observe888-tracking.js'), 'utf8'), context);

assert.equal(window.OBSERVE888_TRACKING_CONFIG.metaPixel.pixelId, '1757114428809371');
assert.equal(typeof window.fbq, 'function');
assert.equal(appendedScripts.some((script) => script.src === 'https://connect.facebook.net/en_US/fbevents.js'), true);

window.Observe888Tracker.track('click_line_south', { cta_type: 'line', store: 'south' });
window.Observe888Tracker.track('click_booking_south', { cta_type: 'booking', store: 'south' });
window.Observe888Tracker.track('click_map_south', { cta_type: 'map', store: 'south' });

const queuedEvents = window.fbq.queue.map((args) => Array.from(args));
assert.deepEqual(queuedEvents[0], ['init', '1757114428809371']);
assert.deepEqual(queuedEvents[1], ['track', 'PageView']);
assert.equal(queuedEvents.some((args) => args[1] === 'Contact'), true);
assert.equal(queuedEvents.some((args) => args[1] === 'Schedule'), true);
assert.equal(queuedEvents.some((args) => args[1] === 'FindLocation'), true);

console.log('Meta Pixel tracking test passed.');
