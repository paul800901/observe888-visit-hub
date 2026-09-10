const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const east = fs.readFileSync(path.join(root, 'east', 'index.html'), 'utf8');
const visit = fs.readFileSync(path.join(root, 'visit', 'index.html'), 'utf8');
const widget = fs.readFileSync(path.join(root, 'observe888-location-widget-snippet.html'), 'utf8');
const pricing = fs.readFileSync(path.join(root, 'south', 'pricing', 'index.html'), 'utf8');
const trackerConfig = fs.readFileSync(path.join(root, 'observe888-tracking-config.js'), 'utf8');
const trackerSource = fs.readFileSync(path.join(root, 'observe888-tracking.js'), 'utf8');

const eastLineUrl = 'https://line.me/R/oaMessage/%40483yvmiw/?%E4%BD%A0%E5%A5%BD%EF%BC%8C%E6%88%91%E6%83%B3%E8%A9%A2%E5%95%8F%E5%8F%B0%E5%8D%97%E6%9D%B1%E5%8D%80%E5%B7%A5%E4%BD%9C%E5%AE%A4%E8%BF%91%E6%9C%9F%E5%8F%AF%E4%BB%A5%E9%A0%90%E7%B4%84%E7%9A%84%E6%99%82%E6%AE%B5%E3%80%82';
const officialLineUrl = 'https://line.me/ti/p/~@483yvmiw';

function parseEastAnchors(source, pageUrl) {
  const anchors = [];
  const anchorPattern = /<a\b[^>]*\bhref="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g;
  let match;
  while ((match = anchorPattern.exec(source))) {
    const textContent = match[2].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim();
    anchors.push({
      rawHref: match[1],
      href: new URL(match[1], pageUrl).toString(),
      textContent,
      target: '',
      id: '',
      className: 'cta',
      dataset: {},
      listeners: new Map(),
      getAttribute(name) {
        return name === 'href' ? this.rawHref : null;
      },
      addEventListener(type, callback) {
        const callbacks = this.listeners.get(type) || [];
        callbacks.push(callback);
        this.listeners.set(type, callbacks);
      },
      closest(selector) {
        return selector === '[data-store]' ? document.body : null;
      },
      dispatchClick() {
        const event = {
          defaultPrevented: false,
          preventDefault() {
            this.defaultPrevented = true;
          }
        };
        for (const callback of this.listeners.get('click') || []) {
          callback(event);
        }
        return event;
      }
    });
  }
  return anchors;
}

const beacons = [];
const appendedScripts = [];
const readyCallbacks = [];
const storage = () => {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) || null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: (key) => values.delete(key)
  };
};

const document = {
  body: { dataset: { store: east.match(/<body\b[^>]*data-store="([^"]+)"/)?.[1] || '' } },
  head: { appendChild: (element) => appendedScripts.push(element) },
  title: 'East booking routing test',
  readyState: 'loading',
  addEventListener(type, callback) {
    if (type === 'DOMContentLoaded') readyCallbacks.push(callback);
  },
  createElement: () => ({
    setAttribute(name, value) {
      this[name] = value;
    }
  }),
  querySelector: () => null,
  querySelectorAll: () => []
};
const anchors = parseEastAnchors(east, 'https://www.observe888.com/east/');
document.querySelectorAll = (selector) => selector === 'a[href]' ? anchors : [];
document.querySelector = (selector) => selector === 'a[href*="store=east"]'
  ? anchors.find((anchor) => anchor.rawHref.includes('store=east'))
  : null;

const window = {
  document,
  location: {
    href: 'https://www.observe888.com/east/',
    pathname: '/east/',
    search: ''
  },
  innerWidth: 390,
  innerHeight: 844,
  localStorage: storage(),
  sessionStorage: storage(),
  crypto: globalThis.crypto,
  setTimeout: (callback) => {
    callback();
    return 1;
  },
  URL,
  URLSearchParams,
  OBSERVE888_TRACKING_CONFIG: { endpoint: 'https://example.test/observe' }
};

const context = vm.createContext({
  Blob,
  console,
  document,
  fetch: async () => true,
  navigator: {
    sendBeacon: (endpoint, body) => {
      beacons.push({ endpoint, body });
      return true;
    }
  },
  setTimeout: window.setTimeout,
  URL,
  URLSearchParams,
  window
});

vm.runInContext(trackerConfig, context);
vm.runInContext(trackerSource, context);

const eastInlineMatch = east.match(/<script>\s*const eastLocationTracker[\s\S]*?<\/script>/);
assert.ok(eastInlineMatch, 'East inline tracker script should exist');
vm.runInContext(eastInlineMatch[0].replace(/^<script>|<\/script>$/g, ''), context);
document.readyState = 'complete';
for (const callback of readyCallbacks) callback();

const lineAnchors = anchors.filter((anchor) => new URL(anchor.href).hostname === 'line.me');
const phoneAnchor = anchors.find((anchor) => anchor.href.startsWith('tel:'));
const navigationAnchor = anchors.find((anchor) => new URL(anchor.href).pathname === '/visit/');
assert.equal(lineAnchors.length, 3, 'East page should expose three LINE CTAs');
assert.ok(phoneAnchor, 'East page should retain phone fallback');
assert.ok(navigationAnchor, 'East page should retain visit navigation');

for (const anchor of lineAnchors) anchor.dispatchClick();
phoneAnchor.dispatchClick();
const navigationEvent = navigationAnchor.dispatchClick();
assert.equal(navigationEvent.defaultPrevented, false);

async function readPayloads() {
  return Promise.all(beacons.map(async ({ endpoint, body }) => ({
    endpoint,
    payload: JSON.parse(await body.text())
  })));
}

(async () => {
  const sent = await readPayloads();
  const payloads = sent.map(({ payload }) => payload);
  const lineEvents = payloads.filter((payload) => payload.event_name === 'click_line_east');
  const phoneEvents = payloads.filter((payload) => payload.event_name === 'click_call_east');
  const navigationEvents = payloads.filter((payload) => payload.event_name === 'click_visit_east');

  assert.equal(payloads.filter((payload) => payload.event_name === 'page_view_east_location').length, 1);
  assert.equal(lineEvents.length, 3, 'each East LINE anchor should emit once');
  assert.ok(lineEvents.every((payload) => payload.cta_type === 'line' && payload.store === 'east'));
  assert.ok(lineEvents.every((payload) => payload.href === eastLineUrl));
  assert.equal(phoneEvents.length, 1);
  assert.equal(phoneEvents[0].cta_type, 'call');
  assert.equal(phoneEvents[0].store, 'east');
  assert.equal(navigationEvents.length, 1);
  assert.equal(navigationEvents[0].cta_type, 'visit');
  assert.equal(navigationEvents[0].store, 'east');
  assert.equal(payloads.filter((payload) => payload.event_name === 'click_line_east' && payload.cta_type === 'visit').length, 0);
  assert.ok(lineAnchors.every((anchor) => anchor.dataset.observeBound === '1'));
  assert.equal(navigationAnchor.dataset.observeBound, '1');

  const helperMatch = visit.match(/function buildStoreLineUrl\(storeKey\) \{[\s\S]*?\n    \}/);
  assert.ok(helperMatch, 'visit store LINE helper should exist');
  const buildStoreLineUrl = vm.runInNewContext(`(${helperMatch[0]})`, { eastLineUrl, officialLineUrl });
  assert.equal(buildStoreLineUrl('east'), eastLineUrl);
  assert.equal(buildStoreLineUrl('south'), officialLineUrl);
  assert.equal(buildStoreLineUrl('unknown'), officialLineUrl);

  assert.ok(widget.includes("id: 'south',"));
  assert.ok(widget.includes(`lineHref: '${officialLineUrl}'`));
  assert.ok(widget.includes(`lineHref: '${eastLineUrl}'`));
  assert.ok(widget.includes('lineLink.href = store.lineHref'));
  assert.ok(widget.includes("lineLink.textContent = store.id === 'east' ? '用 LINE 問東區時段' : '先進官方 LINE'"));

  assert.match(pricing, /"about": \[[\s\S]+?#south-location[\s\S]+?#east-location[\s\S]+?\]/);
  assert.match(pricing, /"target": "https:\/\/www\.observe888\.com\/visit\/"/);
  assert.match(pricing, /id="pricing"/);
  assert.match(pricing, /東區工作室位於台南市東區新樓街 65 號二樓/);
  assert.equal((pricing.match(/store: ''/g) || []).length, 5);
  assert.equal((pricing.match(/page_role: 'shared_pricing'/g) || []).length, 5);
  assert.equal((pricing.match(/page_view_shared_pricing/g) || []).length, 1);
  assert.equal((pricing.match(/click_line_shared_pricing/g) || []).length, 2);
  assert.equal((pricing.match(/click_call_shared_pricing/g) || []).length, 2);
  assert.doesNotMatch(pricing, /page_view_south_pricing|click_line_south|click_call_south/);
  assert.doesNotMatch(pricing, /store: 'south'/);

  console.log('East booking routing behavior and shared pricing regression test passed.');
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
