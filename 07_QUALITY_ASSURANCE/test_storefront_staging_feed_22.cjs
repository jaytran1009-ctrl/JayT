const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const FEED_PATH = path.join(ROOT, '05_DEAL_AND_AFFILIATE/deals_feed.json');
const INTERFACE_PATHS = [
  '03_SOURCE_OF_TRUTH/jayt_apex_interface.js',
  'deploy/jayt_apex_interface.js',
  'deploy/public/jayt_apex_interface.js'
];
const FORBIDDEN_PARTNER_IDS = ['17372870594', '262501305', 'VNVNLCB6LYL3'];

const feed = JSON.parse(fs.readFileSync(FEED_PATH, 'utf8'));
const interfaces = INTERFACE_PATHS.map(relativePath => ({
  relativePath,
  source: fs.readFileSync(path.join(ROOT, relativePath), 'utf8')
}));

assert.equal(feed.length, 22, 'staging feed must contain exactly 22 records');
assert.equal(feed.filter(item => item.provider === 'SHOPEE_PORTAL_EXPORT').length, 20, 'must contain 20 Shopee records');
assert.equal(feed.filter(item => item.provider === 'ACCESSTRADE_DATAFEED_API').length, 2, 'must contain 2 AccessTrade records');

for (const item of feed) {
  const canonical = new URL(item.canonical_url);
  assert.equal(canonical.search, '', `${item.offer_id} canonical URL must not have query parameters`);
  assert.equal(canonical.hash, '', `${item.offer_id} canonical URL must not have a hash`);
  assert.equal(item.canonical_url, canonical.origin + canonical.pathname, `${item.offer_id} canonical URL must be normalized`);
  for (const { relativePath, source } of interfaces) {
    assert.ok(source.includes(item.canonical_url), `${relativePath} must represent ${item.offer_id} canonical URL`);
  }
}

assert.equal(interfaces[0].source, interfaces[1].source, 'SSOT and deploy interface must be byte-identical');
assert.equal(interfaces[0].source, interfaces[2].source, 'SSOT and deploy/public interface must be byte-identical');

for (const { relativePath, source } of interfaces) {
  assert.equal((source.match(/"sku_id": "DORM_SKU_FEED_/g) || []).length, 20, `${relativePath} must embed 20 Shopee SKU records`);
  assert.ok(source.includes("record_count: 22"), `${relativePath} must expose the 22-record policy`);
  assert.ok(source.includes("affiliate_enabled: false"), `${relativePath} must keep affiliate disabled`);
  assert.ok(source.includes("dispatchPerformed: false"), `${relativePath} must keep dispatchSmartAffiliate non-dispatching`);
  assert.ok(source.includes("destinationUrl: null"), `${relativePath} must not configure an affiliate destination`);
  assert.ok(source.includes('calculateDynamicStack'), `${relativePath} must retain the user-input calculator`);
  assert.ok(source.includes('chỉ từ số bạn tự nhập'), `${relativePath} must label calculator output as user-entered simulation`);
  assert.ok(source.includes('không tìm hay tuyên bố voucher ẩn'), `${relativePath} must reject hidden-voucher claims`);
  assert.ok(source.includes('Giá quan sát có thể thay đổi'), `${relativePath} must disclose price drift`);
  assert.ok(!source.includes('Test Live'), `${relativePath} must not imply a live browser health check`);
  for (const partnerId of FORBIDDEN_PARTNER_IDS) {
    assert.ok(!source.includes(partnerId), `${relativePath} must not contain Partner ID ${partnerId}`);
  }
}

console.log('PASS storefront staging feed: 22/22 records represented (20 Shopee + 2 AccessTrade)');
console.log('PASS canonical URL, affiliate-off, user-input simulation, no-Partner-ID, and 3-copy parity gates');
