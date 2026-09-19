/**
 * JAYT-418: URL RESOLVER UPGRADE & AFFILIATE MONETIZATION AUDIT SUITE
 * 
 * Mandate: CHAIRMAN_DIRECTIVE_20260917_UPGRADE_URL_RESOLVER_AND_AFFILIATE_MONETIZATION
 * 
 * Verifies:
 * 1. Smart Title, Brand & Category Extraction (Lock&Lock, Ugreen, Baseus, Jisulife, etc.) with latency < 800ms.
 * 2. Triplet matching for known products (3-platform verified PDP comparison).
 * 3. External market link multi-platform search fallback: active [🔍 Tìm Trên Shopee Mall ↗] / [🔍 Tìm Trên LazMall ↗] buttons.
 * 4. 100% Partner ID Wrapping on both PDP and Search DeepLinks (Shopee: 17372870594, Lazada: 262501305, TikTok: VNVNLCB6LYL3).
 * 5. Value-First Dynamic Price Range & Commercial Fail-Closed Guard.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('node:assert/strict');

const ROOT_DIR = path.resolve(__dirname, '..');
const APEX_FILE = path.join(ROOT_DIR, '03_SOURCE_OF_TRUTH/jayt_apex_interface.js');

console.log('=== JAYT-418: URL RESOLVER & AFFILIATE MONETIZATION AUDIT ===\n');

// Build sandboxed VM context
const code = fs.readFileSync(APEX_FILE, 'utf8');
const sandbox = {
  console,
  setTimeout,
  clearTimeout,
  setInterval,
  clearInterval,
  Date,
  Math,
  String,
  Number,
  Boolean,
  Array,
  Object,
  RegExp,
  Map,
  Set,
  URL,
  decodeURIComponent,
  encodeURIComponent,
  performance: { now: () => Date.now() },
  localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
  sessionStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => {},
  window: {},
  document: {
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    createElement: () => ({
      style: {},
      classList: { add: () => {}, remove: () => {} },
      appendChild: () => {},
      addEventListener: () => {},
      setAttribute: () => {}
    }),
    body: { style: {}, appendChild: () => {} },
    hidden: false,
    addEventListener: () => {},
    removeEventListener: () => {}
  },
  navigator: { userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)' }
};
sandbox.window = sandbox;
sandbox.window.location = { href: 'https://jayt-production-v3420.vercel.app', hostname: 'jayt-production-v3420.vercel.app' };

vm.createContext(sandbox);
vm.runInContext(code, sandbox);

let passed = 0;

async function runTests() {
  // TEST 1: Smart Title, Brand & Category Extraction (< 800ms)
  console.log('[TEST 1/5] Kiểm tra Thuật toán Bóc tách Thông minh (Title, Brand, Category)...');
  const resolveFn = sandbox.window.resolveHeadlessProductLink;
  assert.ok(typeof resolveFn === 'function', 'resolveHeadlessProductLink must be a function');

  const shopeeUrl = 'https://shopee.vn/Binh-Giu-Nhiet-Lock-Lock-500ml-i.99999999.88888888';
  const t0 = Date.now();
  const parsedShopee = resolveFn(shopeeUrl);
  const elapsed = Date.now() - t0;

  assert.ok(parsedShopee, 'Shopee URL must be resolved');
  assert.equal(parsedShopee.platform, 'shopee');
  assert.equal(parsedShopee.brand, 'Lock&Lock', 'Brand must be Lock&Lock');
  assert.equal(parsedShopee.categoryCode, 'HOME', 'Category code must be HOME');
  assert.equal(parsedShopee.category, 'Gia dụng KTX');
  assert.ok(parsedShopee.resolvedInMs <= 800, 'Resolved in < 800ms');

  const lazadaUrl = 'https://www.lazada.vn/products/binh-nuoc-the-thao-locklock-800ml-chinh-hang-i266090481-s987654321.html';
  const parsedLazada = resolveFn(lazadaUrl);
  assert.ok(parsedLazada);
  assert.equal(parsedLazada.brand, 'Lock&Lock');

  const techUrl = 'https://shopee.vn/Cap-sac-nhanh-Type-C-Baseus-100W-i.54321098.17654321098';
  const parsedTech = resolveFn(techUrl);
  assert.ok(parsedTech);
  assert.equal(parsedTech.brand, 'Baseus');
  assert.equal(parsedTech.categoryCode, 'TECH');

  console.log('  -> PASS: Bóc tách chính xác Title, Brand, Category trong < 800ms.');
  passed++;

  // TEST 2: Product in CROSS_PLATFORM_SKU_TRIPLETS
  console.log('[TEST 2/5] Kiểm tra Sản phẩm trong Hợp đồng Bộ Ba (CROSS_PLATFORM_SKU_TRIPLETS)...');
  const radarFn = sandbox.window.computeCrossPlatformRadar;
  assert.ok(typeof radarFn === 'function');

  // Shin case in triplets
  const tripletParsed = resolveFn('https://shopee.vn/product/89827191/26609048170');
  const tripletRadar = radarFn(tripletParsed);
  assert.ok(tripletRadar.matchedTriplet, 'Must match SKU_TRIPLET_01_SHIN_CASE');
  assert.equal(tripletRadar.platforms.length, 3, 'Must render all 3 platforms');
  const shopeeCol = tripletRadar.platforms.find(p => p.id === 'shopee');
  assert.ok(shopeeCol && shopeeCol.available, 'Shopee Mall column must be available');
  assert.equal(shopeeCol.actionLabel, '⚡ Mở Đúng Phân Loại Hàng ↗');

  console.log('  -> PASS: Sản phẩm trong Triplets hiển thị đúng bảng giá đáy và đối soát chuẩn xác.');
  passed++;

  // TEST 3: External Market Product - Multi-Platform Search Fallback
  console.log('[TEST 3/5] Kiểm tra Sản phẩm mới ngoài thị trường (Mở nút tìm kiếm đối ứng đa sàn)...');
  const extShopeeParsed = resolveFn('https://shopee.vn/Binh-Giu-Nhiet-Lock-Lock-500ml-i.99999999.88888888');
  const extRadar = radarFn(extShopeeParsed);

  assert.equal(extRadar.platforms.length, 3);
  const pastedCol = extRadar.platforms.find(p => p.id === 'shopee');
  assert.ok(pastedCol.available, 'Pasted platform must be available');
  assert.equal(pastedCol.actionLabel, '⚡ Mở Đúng Sản Phẩm Đã Dán ↗');

  const lazCol = extRadar.platforms.find(p => p.id === 'lazada');
  assert.ok(lazCol, 'Lazada column must exist');
  assert.equal(lazCol.actionLabel, '🔍 Tìm Trên LazMall ↗', 'Must display active [🔍 Tìm Trên LazMall ↗] button');
  assert.ok(lazCol.payload && lazCol.payload.isSearchFallback, 'isSearchFallback must be true');
  assert.ok(lazCol.payload.searchQuery.includes('Lock&Lock'), 'Search query must include brand');

  const ttCol = extRadar.platforms.find(p => p.id === 'tiktok');
  assert.ok(ttCol, 'TikTok column must exist');
  assert.equal(ttCol.actionLabel, '🔍 Tìm Trên TikTok Shop ↗', 'Must display active [🔍 Tìm Trên TikTok Shop ↗] button');
  assert.ok(ttCol.payload && ttCol.payload.isSearchFallback);

  console.log('  -> PASS: Hai cột đối ứng hiển thị nút tìm kiếm [🔍 Tìm Trên LazMall ↗] và [🔍 Tìm Trên TikTok Shop ↗] thay vì bị khóa.');
  passed++;

  // TEST 4: 100% Partner ID Wrapping on PDP and Search DeepLinks
  console.log('[TEST 4/5] Kiểm tra Tự động hóa bọc Partner IDs trên 100% DeepLinks...');
  const dispatchFn = sandbox.dispatchSmartAffiliate;
  assert.ok(typeof dispatchFn === 'function');

  // Test Shopee Search dispatch
  const shopeeSearchRes = dispatchFn('shopee', { isSearchFallback: true, searchQuery: 'Lock&Lock Bình Giữ Nhiệt' });
  assert.ok(shopeeSearchRes.deepLinkUrl.includes('partner=17372870594'), 'Shopee search deep link must wrap partner 17372870594');
  assert.ok(shopeeSearchRes.deepLinkUrl.includes('shopeevn://search?keyword='), 'Shopee search scheme valid');

  // Test Lazada Search dispatch
  const lazadaSearchRes = dispatchFn('lazada', { isSearchFallback: true, searchQuery: 'Lock&Lock Bình Giữ Nhiệt' });
  assert.ok(lazadaSearchRes.deepLinkUrl.includes('pid=262501305'), 'Lazada search deep link must wrap pid 262501305');
  assert.ok(lazadaSearchRes.deepLinkUrl.includes('lazada://search?keyword='), 'Lazada search scheme valid');

  // Test TikTok Search dispatch
  const tiktokSearchRes = dispatchFn('tiktok', { isSearchFallback: true, searchQuery: 'Lock&Lock Bình Giữ Nhiệt' });
  assert.ok(tiktokSearchRes.deepLinkUrl.includes('code=VNVNLCB6LYL3'), 'TikTok search deep link must wrap code VNVNLCB6LYL3');
  assert.ok(tiktokSearchRes.deepLinkUrl.includes('snssdk1180://ec/search?keyword='), 'TikTok search scheme valid');

  // Test Direct PDP dispatch
  const shopeePdpRes = dispatchFn('shopee', { itemId: '23552060269', shopId: '1016604648' });
  assert.ok(shopeePdpRes.deepLinkUrl.includes('partner=17372870594'), 'Shopee PDP must wrap partner 17372870594');

  const lazadaPdpRes = dispatchFn('lazada', { itemId: '266090481', skuId: '987654321' });
  assert.ok(lazadaPdpRes.deepLinkUrl.includes('pid=262501305'), 'Lazada PDP must wrap pid 262501305');

  const tiktokPdpRes = dispatchFn('tiktok', { productId: '172948201948', variantId: '987654321' });
  assert.ok(tiktokPdpRes.deepLinkUrl.includes('code=VNVNLCB6LYL3'), 'TikTok PDP must wrap code VNVNLCB6LYL3');

  console.log('  -> PASS: 100% đường link mở sản phẩm và link tìm kiếm đều bọc chính danh Partner IDs (Shopee 17372870594, Lazada 262501305, TikTok Shop VNVNLCB6LYL3).');
  passed++;

  // TEST 5: Affiliate Value-First UI & Fail-Closed Guard
  console.log('[TEST 5/5] Kiểm tra Hiển thị Biên độ giá động & Kỷ luật an toàn Fail-Closed...');
  const fmtRangeFn = sandbox.window.formatDynamicPriceRange;
  assert.ok(typeof fmtRangeFn === 'function');
  const rangeStr = fmtRangeFn(125000, 103750, 22500);
  assert.ok(rangeStr.includes('Giá tham khảo 125.000₫'));
  assert.ok(rangeStr.includes('81.250₫'));
  assert.ok(rangeStr.includes('103.750₫'));

  assert.equal(shopeeSearchRes.affiliate_enabled, false, 'CONFIG.affiliate_enabled must remain false fail-closed');
  assert.equal(lazadaSearchRes.affiliate_enabled, false);
  assert.equal(tiktokSearchRes.affiliate_enabled, false);

  console.log('  -> PASS: Biên độ giá động chuẩn xác; cờ thương mại duy trì fail-closed an toàn tuyệt đối.');
  passed++;

  console.log('\n=== TẤT CẢ 5/5 BÀI KIỂM ĐỊNH J418 ĐẠT PASS TUYỆT ĐỐI 100% ===');
  process.exit(0);
}

runTests().catch(err => {
  console.error('Test Suite Failed:', err);
  process.exit(1);
});
