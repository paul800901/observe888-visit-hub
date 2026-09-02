const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const pages = [
  {
    store: 'south',
    html: fs.readFileSync(path.join(root, 'south', 'line', 'index.html'), 'utf8')
  },
  {
    store: 'east',
    html: fs.readFileSync(path.join(root, 'east', 'line', 'index.html'), 'utf8')
  }
];

pages.forEach(({ store, html }) => {
  assert.equal(/tel:/i.test(html), false, `${store} LINE-only landing page must not contain tel links.`);
  assert.equal(/0973[\s-]*728[\s-]*670/.test(html), false, `${store} LINE-only landing page must not expose the phone number.`);
  assert.equal(/https:\/\/line\.me\/R\/oaMessage\/%40483yvmiw\//.test(html), true);
  assert.equal(/data-page-role="meta_line_landing"/.test(html), true);
  assert.equal(new RegExp(`data-store="${store}"`).test(html), true);
  assert.equal(new RegExp(`page_view_meta_line_${store}`).test(html), true);
  assert.equal(new RegExp(`click_line_meta_${store}`).test(html), true);
  assert.equal(/cta_type:\s*'line'/.test(html), true);
  assert.equal(/<meta name="robots" content="noindex,follow">/.test(html), true);
  assert.equal(new RegExp(`https://www\\.observe888\\.com/${store}/line/`).test(html), true);
});

assert.equal(
  /%E5%8F%B0%E5%8D%97%E6%9D%B1%E5%8D%80%E5%B7%A5%E4%BD%9C%E5%AE%A4%E8%BF%91%E6%9C%9F%E5%8F%AF%E4%BB%A5%E9%A0%90%E7%B4%84%E7%9A%84%E6%99%82%E6%AE%B5/.test(pages[1].html),
  true
);

console.log('South and East Meta LINE-only landing page tests passed.');
