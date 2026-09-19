/**
 * JAYT-425 / JAYT-424H QA AUTOMATED VERIFICATION SUITE
 * Directive: CHAIRMAN_DIRECTIVE_20260918_FIX_PDP_RESOLVER_AND_ELIMINATE_404
 * Focus:
 *  1. TikTok Shop raw PDP parsing (ID: 1734961837103548126 -> Gối Ngủ Công Thái Học)
 *  2. Serverless resolver endpoint response
 *  3. Client-side headless resolver & Triplet 11 match
 *  4. Cross-platform radar query alignment (Shopee, Lazada, TikTok all search for "Gối Công Thái Học")
 *  5. Elimination of 404 (TikTok search URL is https://www.tiktok.com/search?q=...)
 *  6. Partner ID attribution lock (Shopee: 17372870594, Lazada: 262501305, TikTok: VNVNLCB6LYL3)
 *  7. Complete purging of 'Vật Dụng Sinh Viên Đà Nẵng' from query fallbacks
 *  8. Strict fail-closed affiliate_enabled: false
 */

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

const ROOT_DIR = path.resolve(__dirname, '..');
const TEST_URL = 'https://shop.tiktok.com/vn/pdp/1734961837103548126';

console.log('================================================================');
console.log('JAYT-425: TIKTOK SHOP PDP RESOLVER & 404 ELIMINATION TEST SUITE');
console.log('Target URL: ' + TEST_URL);
console.log('================================================================\n');

let passCount = 0;
let totalGates = 10;

function pass(gate, desc) {
  passCount++;
  console.log(`[PASS] Gate ${gate}/${totalGates}: ${desc}`);
}

function fail(gate, desc, err) {
  console.error(`[FAIL] Gate ${gate}/${totalGates}: ${desc}`);
  if (err) console.error(err);
  process.exit(1);
}

// -------------------------------------------------------------
// GATE 1: Serverless Resolver API (/api/resolve-link)
// -------------------------------------------------------------
try {
  const resolveHandler = require(path.join(ROOT_DIR, 'api/resolve-link.js'));
  let responseData = null;
  const mockReq = {
    method: 'GET',
    url: 'http://localhost/api/resolve-link?url=' + encodeURIComponent(TEST_URL)
  };
  const mockRes = {
    statusCode: 200,
    setHeader: () => {},
    end: (body) => {
      responseData = JSON.parse(body);
    }
  };

  resolveHandler(mockReq, mockRes);

  assert.strictEqual(mockRes.statusCode, 200, 'Status code must be 200');
  assert.strictEqual(responseData.success, true, 'success must be true');
  assert.strictEqual(responseData.cleanTitle, 'Gối Ngủ Công Thái Học', 'cleanTitle must be Gối Ngủ Công Thái Học');
  assert.strictEqual(responseData.searchQuery, 'Gối Công Thái Học', 'searchQuery must be Gối Công Thái Học');
  assert.strictEqual(responseData.categoryCode, 'HOME', 'categoryCode must be HOME');
  assert.ok(!JSON.stringify(responseData).includes('Vật Dụng Sinh Viên Đà Nẵng'), 'Must not contain banned fallback');
  pass(1, 'Serverless API resolves PDP 1734961837103548126 -> Gối Ngủ Công Thái Học (0ms O(1))');
} catch (e) {
  fail(1, 'Serverless API resolution failed', e);
}

// -------------------------------------------------------------
// SETUP VM FOR APEX INTERFACE
// -------------------------------------------------------------
const apexCode = fs.readFileSync(path.join(ROOT_DIR, '03_SOURCE_OF_TRUTH/jayt_apex_interface.js'), 'utf8');
const sandbox = {
  console,
  setTimeout,
  clearTimeout,
  performance: { now: () => Date.now() },
  localStorage: { getItem: () => null, setItem: () => {} },
  window: {
    addEventListener: () => {},
    location: { href: '', hostname: 'jayt-production-v3420.vercel.app' }
  },
  URL,
  document: {
    getElementById: () => null,
    createElement: () => ({ classList: { add: () => {} }, style: {}, setAttribute: () => {} }),
    body: { appendChild: () => {}, style: {} },
    addEventListener: () => {}
  },
  navigator: { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
};
sandbox.window.localStorage = sandbox.localStorage;
sandbox.window.document = sandbox.document;
sandbox.window.navigator = sandbox.navigator;
vm.createContext(sandbox);
vm.runInContext(apexCode, sandbox);

// -------------------------------------------------------------
// GATE 2: Client-side Headless Resolver (resolveHeadlessProductLink)
// -------------------------------------------------------------
let parsedProduct = null;
try {
  parsedProduct = sandbox.window.resolveHeadlessProductLink(TEST_URL);
  assert.ok(parsedProduct, 'Parsed result must not be null');
  assert.strictEqual(parsedProduct.platform, 'tiktok', 'Platform must be tiktok');
  assert.strictEqual(parsedProduct.itemId, '1734961837103548126', 'itemId must be 1734961837103548126');
  assert.strictEqual(parsedProduct.cleanTitle, 'Gối Ngủ Công Thái Học', 'cleanTitle must be Gối Ngủ Công Thái Học');
  assert.strictEqual(parsedProduct.searchQuery, 'Gối Công Thái Học', 'searchQuery must be Gối Công Thái Học');
  assert.strictEqual(parsedProduct.categoryCode, 'HOME', 'categoryCode must be HOME');
  assert.strictEqual(parsedProduct.needsUserInput, false, 'Zero typing: needsUserInput must be false');
  pass(2, 'resolveHeadlessProductLink extracts PDP ID 1734961837103548126 with cleanTitle & searchQuery');
} catch (e) {
  fail(2, 'Client-side headless resolver failed', e);
}

// -------------------------------------------------------------
// GATE 3: Triplet 11 Mapping in Radar
// -------------------------------------------------------------
let radar = null;
try {
  radar = sandbox.window.computeCrossPlatformRadar(parsedProduct);
  assert.ok(radar, 'Radar must not be null');
  assert.ok(radar.matchedTriplet, 'Must match Triplet 11');
  assert.strictEqual(radar.matchedTriplet.id, 'SKU_TRIPLET_11_GOI_CONG_THAI_HOC', 'Triplet ID must be SKU_TRIPLET_11_GOI_CONG_THAI_HOC');
  pass(3, 'computeCrossPlatformRadar matches SKU_TRIPLET_11_GOI_CONG_THAI_HOC');
} catch (e) {
  fail(3, 'Triplet 11 mapping failed', e);
}

// -------------------------------------------------------------
// GATE 4: Shopee Search Query & Action Label
// -------------------------------------------------------------
try {
  const shopeePlatform = radar.platforms.find(p => p.id === 'shopee');
  assert.ok(shopeePlatform, 'Shopee platform must exist in radar');
  assert.strictEqual(shopeePlatform.payload.searchQuery, 'Gối Công Thái Học', 'Shopee searchQuery must be Gối Công Thái Học');
  assert.strictEqual(shopeePlatform.actionLabel, '🔍 Tìm Sản Phẩm Tương Đương ↗', 'Action label must be search');
  pass(4, 'Shopee comparison card searches for "Gối Công Thái Học"');
} catch (e) {
  fail(4, 'Shopee comparison card validation failed', e);
}

// -------------------------------------------------------------
// GATE 5: Lazada Search Query & Action Label
// -------------------------------------------------------------
try {
  const lazadaPlatform = radar.platforms.find(p => p.id === 'lazada');
  assert.ok(lazadaPlatform, 'Lazada platform must exist in radar');
  assert.strictEqual(lazadaPlatform.payload.searchQuery, 'Gối Công Thái Học', 'Lazada searchQuery must be Gối Công Thái Học');
  assert.strictEqual(lazadaPlatform.actionLabel, '🔍 Tìm Sản Phẩm Tương Đương ↗', 'Action label must be search');
  pass(5, 'Lazada comparison card searches for "Gối Công Thái Học"');
} catch (e) {
  fail(5, 'Lazada comparison card validation failed', e);
}

// -------------------------------------------------------------
// GATE 6: TikTok Shop Search Query & Elimination of 404
// -------------------------------------------------------------
try {
  const tiktokPlatform = radar.platforms.find(p => p.id === 'tiktok');
  assert.ok(tiktokPlatform, 'TikTok platform must exist in radar');
  assert.strictEqual(tiktokPlatform.payload.searchQuery, 'Gối Công Thái Học', 'TikTok searchQuery must be Gối Công Thái Học');
  assert.strictEqual(tiktokPlatform.actionLabel, '🔍 Tìm Sản Phẩm Tương Đương ↗', 'Action label must be search');

  const dispatchResult = sandbox.window.dispatchSmartAffiliate('tiktok', tiktokPlatform.payload, '');
  assert.strictEqual(dispatchResult.partnerId, 'VNVNLCB6LYL3', 'TikTok partnerId must be VNVNLCB6LYL3');
  assert.ok(dispatchResult.destinationUrl.startsWith('https://www.tiktok.com/search?q='), 'Destination URL must be www.tiktok.com/search (not shop.tiktok.com/search 404)');
  assert.ok(dispatchResult.deepLinkUrl.startsWith('snssdk1180://ec/search?keyword='), 'App scheme must be snssdk1180://ec/search');
  assert.ok(!dispatchResult.destinationUrl.includes('shop.tiktok.com/search'), 'Strictly ZERO shop.tiktok.com/search');
  pass(6, 'TikTok Shop search destination is https://www.tiktok.com/search?q=... (0% 404)');
} catch (e) {
  fail(6, 'TikTok Shop 404 elimination validation failed', e);
}

// -------------------------------------------------------------
// GATE 7: 100% Affiliate Cash-Flow Lock & Fail-Closed State
// -------------------------------------------------------------
try {
  const shopeeDispatch = sandbox.window.dispatchSmartAffiliate('shopee', { isSearchFallback: true, searchQuery: 'Gối Công Thái Học' }, '');
  const lazadaDispatch = sandbox.window.dispatchSmartAffiliate('lazada', { isSearchFallback: true, searchQuery: 'Gối Công Thái Học' }, '');
  const tiktokDispatch = sandbox.window.dispatchSmartAffiliate('tiktok', { isSearchFallback: true, searchQuery: 'Gối Công Thái Học' }, '');

  assert.strictEqual(shopeeDispatch.partnerId, '17372870594', 'Shopee partnerId must be 17372870594');
  assert.strictEqual(lazadaDispatch.partnerId, '262501305', 'Lazada partnerId must be 262501305');
  assert.strictEqual(tiktokDispatch.partnerId, 'VNVNLCB6LYL3', 'TikTok partnerId must be VNVNLCB6LYL3');

  assert.strictEqual(shopeeDispatch.affiliate_enabled, false, 'Shopee affiliate_enabled must be false');
  assert.strictEqual(lazadaDispatch.affiliate_enabled, false, 'Lazada affiliate_enabled must be false');
  assert.strictEqual(tiktokDispatch.affiliate_enabled, false, 'TikTok affiliate_enabled must be false');

  pass(7, 'Partner IDs preserved (Shopee: 17372870594, Lazada: 262501305, TikTok: VNVNLCB6LYL3), fail-closed');
} catch (e) {
  fail(7, 'Affiliate lock validation failed', e);
}

// -------------------------------------------------------------
// GATE 8: Tier 2 Trusted Shops Query Alignment
// -------------------------------------------------------------
try {
  assert.ok(radar.tierTrusted && radar.tierTrusted.length === 3, 'Must have 3 trusted shops');
  for (const shop of radar.tierTrusted) {
    assert.strictEqual(shop.payload.searchQuery, 'Gối Công Thái Học', `${shop.name} must search for Gối Công Thái Học`);
  }
  pass(8, 'Tier 2 Trusted Shops all search for "Gối Công Thái Học"');
} catch (e) {
  fail(8, 'Tier 2 Trusted Shops validation failed', e);
}

// -------------------------------------------------------------
// GATE 9: Total Purge of Banned Fallback String
// -------------------------------------------------------------
try {
  const hasBannedInApex = apexCode.includes('Vật Dụng Sinh Viên Đà Nẵng');
  const apiCode = fs.readFileSync(path.join(ROOT_DIR, 'api/resolve-link.js'), 'utf8');
  const hasBannedInApi = apiCode.includes('Vật Dụng Sinh Viên Đà Nẵng');

  assert.strictEqual(hasBannedInApex, false, 'jayt_apex_interface.js must not contain Vật Dụng Sinh Viên Đà Nẵng');
  assert.strictEqual(hasBannedInApi, false, 'api/resolve-link.js must not contain Vật Dụng Sinh Viên Đà Nẵng');

  // Verify that isGarbageQuery rejects it
  assert.strictEqual(sandbox.window.isGarbageQuery('Vật Dụng Sinh Viên Đà Nẵng'), true, 'isGarbageQuery must reject banned fallback');
  pass(9, 'Total purge: "Vật Dụng Sinh Viên Đà Nẵng" is eradicated and banned');
} catch (e) {
  fail(9, 'Banned fallback purge validation failed', e);
}

// -------------------------------------------------------------
// GATE 10: Codebase Hygiene & Zero shop.tiktok.com/search
// -------------------------------------------------------------
try {
  const has404InApex = apexCode.includes('shop.tiktok.com/search');
  assert.strictEqual(has404InApex, false, 'jayt_apex_interface.js must not contain shop.tiktok.com/search');
  pass(10, 'Codebase hygiene: zero occurrences of 404 URL shop.tiktok.com/search');
} catch (e) {
  fail(10, 'Codebase hygiene validation failed', e);
}

console.log('\n================================================================');
console.log(`ALL ${passCount}/${totalGates} JAYT-425 QUALITY GATES PASSED TUYỆT ĐỐI!`);
console.log('================================================================\n');
process.exit(0);
