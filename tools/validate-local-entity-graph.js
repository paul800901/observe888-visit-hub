const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const entityFiles = [
  'index.html',
  'about/index.html',
  'contact/index.html',
  'south/index.html',
  'east/index.html',
  'visit/index.html',
  'services/tainan-tuina/index.html',
  'south/pricing/index.html',
  'shorts/index.html',
  'comics/index.html'
];

function listHtmlFiles(directory, relativeDirectory = '') {
  const skippedDirectories = new Set(['.git', '_local', 'archive', 'drafts', 'history', 'node_modules', '備份']);
  const output = [];

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && skippedDirectories.has(entry.name)) continue;
    const relativePath = path.join(relativeDirectory, entry.name);
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      output.push(...listHtmlFiles(absolutePath, relativePath));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      output.push(relativePath.split(path.sep).join('/'));
    }
  }

  return output;
}

const schemaFiles = listHtmlFiles(root).filter((relativePath) =>
  fs.readFileSync(path.join(root, relativePath), 'utf8').includes('application/ld+json')
);
const textFiles = [...new Set([...schemaFiles, 'llms.txt'])];

const ids = {
  organization: 'https://www.observe888.com/#organization',
  south: 'https://www.observe888.com/#south-location',
  east: 'https://www.observe888.com/#east-location'
};
const eastMapsUrl = 'https://www.google.com/maps/search/?api=1&query=%E8%A6%8B%E8%A7%80%E7%B5%90%E6%A7%8B-%E6%9D%B1%E5%8D%80%E5%B7%A5%E4%BD%9C%E5%AE%A4&query_place_id=ChIJ8wyQnwl3bjQRso6Wcs4NP1g';

const documents = new Map();
let jsonLdBlockCount = 0;

function read(relativePath) {
  const value = fs.readFileSync(path.join(root, relativePath), 'utf8');
  documents.set(relativePath, value);
  return value;
}

function parseJsonLd(relativePath) {
  const html = documents.get(relativePath) || read(relativePath);
  const blocks = [];
  const pattern = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;

  while ((match = pattern.exec(html)) !== null) {
    const source = match[1].trim();
    try {
      blocks.push(JSON.parse(source));
    } catch (error) {
      throw new Error(`${relativePath}: invalid JSON-LD block ${blocks.length + 1}: ${error.message}`);
    }
  }

  assert.ok(blocks.length > 0, `${relativePath}: expected at least one JSON-LD block`);
  jsonLdBlockCount += blocks.length;
  return blocks;
}

function walk(value, output = []) {
  if (!value || typeof value !== 'object') return output;
  output.push(value);
  if (Array.isArray(value)) {
    value.forEach((item) => walk(item, output));
  } else {
    Object.values(value).forEach((item) => walk(item, output));
  }
  return output;
}

function hasType(node, expected) {
  const types = Array.isArray(node['@type']) ? node['@type'] : [node['@type']];
  return types.includes(expected);
}

function fullNode(nodes, id, type) {
  return nodes.find((node) => node['@id'] === id && hasType(node, type));
}

function refs(value) {
  return (Array.isArray(value) ? value : [value])
    .filter(Boolean)
    .map((item) => (typeof item === 'string' ? item : item['@id']))
    .filter(Boolean);
}

for (const relativePath of textFiles) {
  const source = read(relativePath);
  assert.ok(
    !source.includes('https://www.observe888.com/#local-business'),
    `${relativePath}: retired #local-business entity ID remains`
  );
  assert.ok(
    !source.includes('https://www.threads.net/@sl800901'),
    `${relativePath}: retired Threads redirect URL remains`
  );
}

const parsedByFile = new Map(
  schemaFiles.map((relativePath) => [relativePath, parseJsonLd(relativePath)])
);
const nodesByFile = new Map(
  [...parsedByFile].map(([relativePath, blocks]) => [relativePath, walk(blocks)])
);

const homeNodes = nodesByFile.get('index.html');
const organization = fullNode(homeNodes, ids.organization, 'Organization');
const south = fullNode(homeNodes, ids.south, 'LocalBusiness');
const east = fullNode(homeNodes, ids.east, 'LocalBusiness');

assert.ok(organization, 'index.html: canonical Organization node is missing');
assert.ok(south, 'index.html: canonical South LocalBusiness node is missing');
assert.ok(east, 'index.html: canonical East LocalBusiness node is missing');
assert.equal(organization.name, '見觀結構');
assert.deepEqual(new Set(refs(organization.subOrganization)), new Set([ids.south, ids.east]));
assert.ok(organization.sameAs.includes('https://www.facebook.com/observe888/'));
assert.ok(organization.sameAs.includes('https://www.facebook.com/profile.php?id=61589375001647'));
assert.ok(organization.sameAs.includes('https://www.threads.com/@sl800901'));

assert.equal(south.name, '見觀結構調理整復所-南區店');
assert.equal(south.url, 'https://www.observe888.com/south/');
assert.equal(south.telephone, '+886-973-728-670');
assert.equal(south.parentOrganization['@id'], ids.organization);
assert.equal(south.address.addressLocality, '南區');
assert.equal(south.address.streetAddress.replace(/\s/g, ''), '明興路673號');

assert.equal(east.name, '見觀結構-東區工作室');
assert.equal(east.alternateName, '見觀結構東區工作室（純預約）');
assert.equal(east.url, 'https://www.observe888.com/east/');
assert.equal(east.telephone, '+886-973-728-670');
assert.equal(east.parentOrganization['@id'], ids.organization);
assert.equal(east.address.addressLocality, '東區');
assert.equal(east.address.postalCode, '70144');
assert.equal(east.address.streetAddress.replace(/\s/g, ''), '新樓街65號');
assert.equal(east.geo.latitude, 23.0357778);
assert.equal(east.geo.longitude, 120.193024);
assert.equal(east.hasMap, eastMapsUrl);
assert.ok(east.sameAs.includes(eastMapsUrl));

for (const [relativePath, entityId, type] of [
  ['contact/index.html', ids.south, 'LocalBusiness'],
  ['south/index.html', ids.south, 'LocalBusiness'],
  ['east/index.html', ids.east, 'LocalBusiness']
]) {
  const node = fullNode(nodesByFile.get(relativePath), entityId, type);
  assert.ok(node, `${relativePath}: canonical ${type} definition is missing`);
  assert.equal(node.parentOrganization['@id'], ids.organization, `${relativePath}: parentOrganization mismatch`);
}

const visitNodes = nodesByFile.get('visit/index.html');
assert.ok(fullNode(visitNodes, ids.organization, 'Organization'), 'visit/index.html: Organization is missing');
assert.ok(fullNode(visitNodes, ids.south, 'LocalBusiness'), 'visit/index.html: South location is missing');
assert.ok(fullNode(visitNodes, ids.east, 'LocalBusiness'), 'visit/index.html: East location is missing');
for (const relativePath of ['east/index.html', 'visit/index.html']) {
  const eastNode = fullNode(nodesByFile.get(relativePath), ids.east, 'LocalBusiness');
  assert.equal(eastNode.name, '見觀結構-東區工作室', `${relativePath}: East public name mismatch`);
  assert.equal(eastNode.alternateName, '見觀結構東區工作室（純預約）', `${relativePath}: East alternate name mismatch`);
  assert.equal(eastNode.address.postalCode, '70144', `${relativePath}: East postal code mismatch`);
  assert.equal(eastNode.geo.latitude, 23.0357778, `${relativePath}: East latitude mismatch`);
  assert.equal(eastNode.geo.longitude, 120.193024, `${relativePath}: East longitude mismatch`);
  assert.equal(eastNode.hasMap, eastMapsUrl, `${relativePath}: East Maps URL mismatch`);
  assert.ok(eastNode.sameAs.includes(eastMapsUrl), `${relativePath}: East sameAs mismatch`);
}
const visitSource = documents.get('visit/index.html');
for (const requiredValue of [
  "north: 'north-retired'",
  "'north-retired': {",
  '這個舊店點已永久歇業，請不要再前往原址。',
  "tracker.trackPageView('page_view_north_retired'"
]) {
  assert.ok(visitSource.includes(requiredValue), `visit/index.html: retired-location routing is missing ${requiredValue}`);
}

const locationWidget = read('observe888-location-widget-snippet.html');
for (const requiredValue of [
  "name: '見觀結構-東區工作室'",
  "placeId: 'ChIJ8wyQnwl3bjQRso6Wcs4NP1g'",
  'query_place_id=ChIJ8wyQnwl3bjQRso6Wcs4NP1g',
  'destination_place_id=ChIJ8wyQnwl3bjQRso6Wcs4NP1g',
  "params.set('destination_place_id', destinationStore.placeId)"
]) {
  assert.ok(locationWidget.includes(requiredValue), `location widget: missing ${requiredValue}`);
}

for (const relativePath of ['about/index.html', 'shorts/index.html']) {
  const page = nodesByFile
    .get(relativePath)
    .find((node) => hasType(node, relativePath.startsWith('about') ? 'AboutPage' : 'CollectionPage'));
  assert.equal(page.about['@id'], ids.organization, `${relativePath}: about must reference the Organization`);
  assert.equal(page.publisher['@id'], ids.organization, `${relativePath}: publisher must reference the Organization`);
}

const serviceNodes = nodesByFile.get('services/tainan-tuina/index.html');
const service = serviceNodes.find((node) => node['@id'] === 'https://www.observe888.com/services/tainan-tuina/#service');
assert.equal(service.provider['@id'], ids.organization, 'service page: provider must be the Organization');

const pricingNodes = nodesByFile.get('south/pricing/index.html');
const pricedServices = pricingNodes.filter((node) => hasType(node, 'Service') && node.provider);
assert.equal(pricedServices.length, 3, 'pricing page: expected three priced services');
pricedServices.forEach((node) => {
  assert.equal(node.provider['@id'], ids.organization, `pricing page: provider mismatch for ${node.name}`);
});

const llms = documents.get('llms.txt');
for (const requiredValue of [
  ids.organization,
  ids.south,
  ids.east,
  'https://www.threads.com/@sl800901',
  'https://www.facebook.com/observe888/',
  'https://www.facebook.com/profile.php?id=61589375001647'
]) {
  assert.ok(llms.includes(requiredValue), `llms.txt: missing ${requiredValue}`);
}

console.log(
  `LOCAL_ENTITY_GRAPH_OK schema_files=${schemaFiles.length} entity_pages=${entityFiles.length} jsonld_blocks=${jsonLdBlockCount} canonical_entities=3`
);
