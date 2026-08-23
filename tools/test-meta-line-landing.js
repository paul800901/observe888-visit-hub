const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'south', 'line', 'index.html'), 'utf8');

assert.equal(/tel:/i.test(html), false, 'LINE-only landing page must not contain tel links.');
assert.equal(/0973[\s-]*728[\s-]*670/.test(html), false, 'LINE-only landing page must not expose the phone number.');
assert.equal(/https:\/\/line\.me\/ti\/p\/~@483yvmiw/.test(html), true);
assert.equal(/data-page-role="meta_line_landing"/.test(html), true);
assert.equal(/click_line_meta_south/.test(html), true);
assert.equal(/cta_type:\s*'line'/.test(html), true);
assert.equal(/<meta name="robots" content="noindex,follow">/.test(html), true);
assert.equal(/https:\/\/www\.observe888\.com\/south\/line\//.test(html), true);

console.log('Meta LINE-only landing page test passed.');
