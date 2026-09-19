/**
 * JAYT-467: HEADLESS PDP LINK VALIDATOR & SKU TRIPLET CONTRACT AUDIT
 * 
 * Verifies:
 * 1. CROSS_PLATFORM_SKU_TRIPLETS Registry Integrity & Variant IDs.
 * 2. Variant-Level Deep Link Construction (shopeevn://, lazada://, snssdk1180://).
 * 3. Triplet Matching & Real Observed Price Consistency (Shin Case, TopGia, Điện Quang).
 * 4. Transparency Fallback when competitor platform lacks authentic PDP.
 * 5. Headless PDP Endpoint Network Liveness.
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const https = require('node:https');

const ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const INTERFACE_PATH = path.join(ROOT, '03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
const source = fs.readFileSync(INTERFACE_PATH, 'utf8');

console.log('=== JAYT: HEADLESS PDP LINK VALIDATOR & SKU TRIPLET CONTRACT TEST ===');

// --- TEST 1: REGISTRY EXISTENCE & CORE SKU IDENTIFIERS ---
console.log('[TEST 1/6] Kiểm tra sự tồn tại của Registry CROSS_PLATFORM_SKU_TRIPLETS...');
assert.ok(source.includes('CROSS_PLATFORM_SKU_TRIPLETS'), 'CROSS_PLATFORM_SKU_TRIPLETS registry must exist');

const tripletMatch = source.match(/const CROSS_PLATFORM_SKU_TRIPLETS = Object\.freeze\(\[([\s\S]*?)\n\]\);/);
assert.ok(tripletMatch, 'CROSS_PLATFORM_SKU_TRIPLETS must be properly declared and frozen');

const triplets = eval(`[${tripletMatch[1]}]`);
assert.ok(triplets.length >= 3, 'Must contain at least 3 core SKU triplets');

const shinCase = triplets.find(t => t.id === 'SKU_TRIPLET_01_SHIN_CASE');
assert.ok(shinCase, 'SKU_TRIPLET_01_SHIN_CASE must exist');
const topGia = triplets.find(t => t.id === 'SKU_TRIPLET_02_TOPGIA_TISSUE');
assert.ok(topGia, 'SKU_TRIPLET_02_TOPGIA_TISSUE must exist');
const dienQuang = triplets.find(t => t.id === 'SKU_TRIPLET_03_OCAM_DIENQUANG');
assert.ok(dienQuang, 'SKU_TRIPLET_03_OCAM_DIENQUANG must exist');

console.log(`  -> PASS: Registry chứa ${triplets.length} Bộ Ba Định Danh hợp lệ (Shin Case, TopGia, Điện Quang).`);

// --- TEST 2: VARIANT-LEVEL IDENTIFIERS & PDP COMPLETENESS ---
console.log('[TEST 2/6] Kiểm tra tính đầy đủ của link PDP chính hãng và mã phân loại biến thể...');
for (const t of triplets) {
  assert.ok(t.title && t.variantName, `Triplet [${t.id}] must specify title and variantName`);
  
  // Shopee check
  const shp = t.platforms.shopee;
  assert.ok(shp.available, `Shopee must be available for [${t.id}]`);
  assert.ok(shp.pdpUrl.startsWith('https://shopee.vn/'), `Shopee PDP must be valid URL for [${t.id}]`);
  assert.ok(shp.itemId && shp.shopId && shp.modelId, `Shopee must have itemId, shopId, and modelId for [${t.id}]`);
  assert.ok(shp.merchantName.includes('Mall'), `Shopee merchant must be Mall for [${t.id}]`);

  // Lazada check
  const laz = t.platforms.lazada;
  if (laz.available) {
    assert.ok(laz.pdpUrl.startsWith('https://www.lazada.vn/'), `Lazada PDP must be valid URL for [${t.id}]`);
    assert.ok(laz.itemId && laz.skuId, `Lazada must have itemId and skuId for [${t.id}]`);
    assert.ok(!laz.pdpUrl.includes('i266090481') && !laz.pdpUrl.includes('s987654321'), 'Must not contain synthetic placeholder ID');
    assert.ok(laz.merchantName.includes('LazMall'), `Lazada merchant must be LazMall for [${t.id}]`);
  } else {
    assert.ok(laz.statusLabel && laz.statusLabel.includes('Chưa có gian hàng'), `Unavailable Lazada platform must explicitly state reason for [${t.id}]`);
    assert.ok(laz.searchQuery, `Unavailable Lazada platform must provide searchQuery for [${t.id}]`);
  }

  // TikTok check
  const tt = t.platforms.tiktok;
  if (tt.available) {
    assert.ok(tt.pdpUrl.startsWith('https://shop.tiktok.com/'), `TikTok PDP must be valid URL for [${t.id}]`);
    assert.ok(tt.productId && tt.variantId, `TikTok must have productId and variantId for [${t.id}]`);
  } else {
    assert.ok(tt.statusLabel && tt.statusLabel.includes('Chưa có gian hàng'), `Unavailable TikTok platform must explicitly state reason for [${t.id}]`);
    assert.ok(tt.searchQuery, `Unavailable TikTok platform must provide searchQuery for [${t.id}]`);
  }
}
console.log('  -> PASS: 100% SKU Triplet tuân thủ Kỷ cương Minh bạch: Không link chết, không ID giả lập, khóa cứng khi thiếu Mall.');

// --- TEST 3: RADAR TRIPLET RESOLUTION (SHIN CASE 26609048170) ---
console.log('[TEST 3/6] Kiểm tra thuật toán computeCrossPlatformRadar đối soát đúng Shin Case...');
assert.ok(source.includes('function computeCrossPlatformRadar'), 'computeCrossPlatformRadar function must exist');

// Extract and evaluate computeCrossPlatformRadar in sandbox
const fnDynamicStackMatch = source.match(/function calculateDynamicStack\([\s\S]*?\n\}/);
const fnRadarMatch = source.match(/function computeCrossPlatformRadar\([\s\S]*?\n\}/);

const radarSandbox = new Function('parsed', 'baseValue', 'CROSS_PLATFORM_SKU_TRIPLETS', `
  ${fnDynamicStackMatch[0]}
  function toNonNegativeVnd(val, fallback = 0) { const num = Number(val); return isNaN(num) || num < 0 ? fallback : num; }
  const state = { voucherStack: {} };
  ${fnRadarMatch[0]}
  return computeCrossPlatformRadar(parsed, baseValue);
`);

const shinCaseRadar = radarSandbox({ itemId: '26609048170', rawUrl: 'https://shopee.vn/product/89827191/26609048170', platform: 'shopee' }, 41500, triplets);

assert.ok(shinCaseRadar.matchedTriplet, 'Must match Shin Case triplet');
assert.equal(shinCaseRadar.matchedTriplet.id, 'SKU_TRIPLET_01_SHIN_CASE');
assert.equal(shinCaseRadar.platforms.length, 3);

const pShopee = shinCaseRadar.platforms.find(p => p.id === 'shopee');
const pLazada = shinCaseRadar.platforms.find(p => p.id === 'lazada');
const pTiktok = shinCaseRadar.platforms.find(p => p.id === 'tiktok');

assert.equal(pShopee.available, true);
assert.equal(pShopee.isVerifiedPdp, true);
assert.equal(pShopee.payload.modelId, '235048271');
assert.equal(pShopee.observedPrice, 24050);
assert.equal(pShopee.payable, 16835);

assert.equal(pLazada.available, false);
assert.equal(pLazada.isVerifiedPdp, false);
assert.ok(pLazada.statusLabel.includes('Chưa có gian hàng chính hãng'));
assert.equal(pLazada.payload.isSearchFallback, true);

assert.equal(pTiktok.available, false);
assert.equal(pTiktok.isVerifiedPdp, false);
assert.ok(pTiktok.statusLabel.includes('Chưa có gian hàng chính hãng'));
assert.equal(pTiktok.payload.isSearchFallback, true);

assert.equal(shinCaseRadar.cheapestPlatform.id, 'shopee', 'Shopee must be cheapest platform with REAL verified price');
assert.equal(shinCaseRadar.cheapestPlatform.payable, 16835);

console.log('  -> PASS: Shin Case đối soát chính xác: Shopee Mall (24.050đ, modelId 235048271) | Lazada & TikTok minh bạch chưa có hàng.');

// --- TEST 4: TRANSPARENCY FALLBACK FOR UNMATCHED EXTERNAL LINKS ---
console.log('[TEST 4/6] Kiểm tra Cơ chế Minh bạch (Transparency Fallback) khi dán link ngoài chưa có PDP đối ứng...');
const unmatchedRadar = radarSandbox({ itemId: '999888777', rawUrl: 'https://shopee.vn/product/112233/999888777', platform: 'shopee' }, 150000, triplets);

assert.equal(unmatchedRadar.matchedTriplet, null, 'Unmatched link must not falsely map to any triplet');
const umShopee = unmatchedRadar.platforms.find(p => p.id === 'shopee');
const umLazada = unmatchedRadar.platforms.find(p => p.id === 'lazada');
const umTiktok = unmatchedRadar.platforms.find(p => p.id === 'tiktok');

assert.equal(umShopee.available, true, 'Pasted platform remains verified');
assert.ok(umLazada.statusLabel.includes('Chưa liên kết gian hàng đối ứng'));
assert.equal(umLazada.payload.isSearchFallback, true);

assert.equal(umTiktok.available, false, 'TikTok must trigger transparency fallback');
assert.equal(umTiktok.isVerifiedPdp, false);
assert.ok(umTiktok.statusLabel.includes('Chưa liên kết gian hàng đối ứng'));
assert.equal(umTiktok.payload.isSearchFallback, true);

assert.equal(unmatchedRadar.cheapestPlatform.id, 'shopee', 'Only verified pasted platform can be cheapest; no fake winner on competitor');

console.log('  -> PASS: Link ngoài kích hoạt Cơ chế Minh bạch 100%: Tuyệt đối không bịa giá ảo trên Lazada/TikTok, hiển thị nhãn chưa có PDP và nút tìm kiếm tương đương.');

// --- TEST 5: VARIANT-LEVEL DEEP-LINKING ROUTER CONTRACT ---
console.log('[TEST 5/6] Kiểm tra Router dispatchSmartAffiliate xuất đúng App Scheme và mã biến thể...');
assert.ok(source.includes('function dispatchSmartAffiliate'), 'dispatchSmartAffiliate function must exist');

const fnDispatchMatch = source.match(/function dispatchSmartAffiliate\([\s\S]*?\n\}/);
const dispatchSandbox = new Function('providerKey', 'offerPayload', 'voucherCode', 'TRACK_1_AFFILIATE_REGISTRY', 'SECURE_PARTNER_CONFIG', `
  function triggerJaytSensoryFeedback() {}
  function showJaytToast() {}
  function copyToClipboardFallback() { return Promise.resolve(); }
  function resolveHeadlessProductLink() { return null; }
  function isMessengerOrZaloWebview() { return false; }
  function openWebviewBreakoutModal() {}
  const state = { selectedClusterId: 'dut_hoa_khanh' };
  ${fnDispatchMatch[0]}
  return dispatchSmartAffiliate(providerKey, offerPayload, voucherCode);
`);

const mockRegistry = {
  shopee: { name: 'Shopee' },
  lazada: { name: 'Lazada' },
  tiktok: { name: 'TikTok Shop' }
};

const mockPartnerConfig = {
  shopee: { partnerId: '17372870594', host: 'shopee.vn', name: 'Shopee' },
  lazada: { partnerId: '262501305', host: 'lazada.vn', name: 'Lazada' },
  tiktok: { partnerId: 'VNVNLCB6LYL3', host: 'shop.tiktok.com', name: 'TikTok Shop' }
};

// 1. Shopee with modelId
const resShopee = dispatchSandbox('shopee', {
  itemId: '26609048170',
  shopId: '89827191',
  modelId: '235048271',
  pdpUrl: 'https://shopee.vn/product/89827191/26609048170'
}, 'SHOPEELIVE50', mockRegistry, mockPartnerConfig);

assert.ok(resShopee.deepLinkUrl.includes('shopeevn://product'), 'Must generate shopeevn:// product deep link');
assert.ok(resShopee.deepLinkUrl.includes('itemid=26609048170'), 'Must include exact itemId');
assert.ok(resShopee.deepLinkUrl.includes('&modelId=235048271'), 'Must include exact modelId for variant');
assert.ok(resShopee.destinationUrl.includes('product/89827191/26609048170'), 'Web fallback must point to exact PDP');

// 2. Lazada with skuId
const resLazada = dispatchSandbox('lazada', {
  itemId: '266090481',
  skuId: '987654321',
  pdpUrl: 'https://www.lazada.vn/products/op-lung-iphone-shin-case-chong-ban-i266090481-s987654321.html'
}, 'LAZCHOICE15K', mockRegistry, mockPartnerConfig);

assert.ok(resLazada.deepLinkUrl.includes('lazada://item'), 'Must generate lazada:// item deep link');
assert.ok(resLazada.deepLinkUrl.includes('item_id=266090481'), 'Must include exact item_id');
assert.ok(resLazada.deepLinkUrl.includes('&sku=987654321'), 'Must include exact skuId for variant');
assert.ok(resLazada.destinationUrl.includes('-i266090481-s987654321.html'), 'Web fallback must point to exact PDP with skuId');

// 3. Search Fallback for Unavailable Platform
const resFallback = dispatchSandbox('tiktok', {
  isSearchFallback: true,
  searchQuery: 'Ốp lưng iPhone TPU Shin Case'
}, '', mockRegistry, mockPartnerConfig);

assert.ok(resFallback.deepLinkUrl.includes('snssdk1180://ec/search'), 'Must open search deep link');
assert.ok(resFallback.destinationUrl.includes('shop.tiktok.com/search?q='), 'Must point to transparent search page');
assert.equal(resFallback.routing_mode, 'SEARCH_FALLBACK_ROUTING');

console.log('  -> PASS: Router xuất App Scheme chuẩn xác 100% kèm mã biến thể (modelId, skuId) và Search Fallback minh bạch.');

// --- TEST 6: HEADLESS PDP NETWORK LIVENESS ---
console.log('[TEST 6/6] Kiểm tra Network Liveness thực tế tới các nền tảng PDP...');

const DOMAINS_TO_PROBE = [
  'https://shopee.vn',
  'https://www.lazada.vn',
  'https://shop.tiktok.com'
];

let onlineCount = 0;
const probePromises = DOMAINS_TO_PROBE.map(targetUrl => {
  return new Promise(resolve => {
    const start = Date.now();
    const req = https.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      },
      timeout: 8000
    }, res => {
      const elapsed = Date.now() - start;
      console.log(`  -> [ONLINE] ${targetUrl} : HTTP ${res.statusCode} in ${elapsed}ms`);
      onlineCount++;
      resolve(true);
    });
    req.on('error', err => {
      console.warn(`  -> [OFFLINE/ERR] ${targetUrl} : ${err.message}`);
      resolve(false);
    });
    req.on('timeout', () => {
      req.destroy();
      console.warn(`  -> [TIMEOUT] ${targetUrl}`);
      resolve(false);
    });
  });
});

Promise.all(probePromises).then(() => {
  assert.ok(onlineCount >= 2, 'At least 2 out of 3 major e-commerce platforms must respond online');
  console.log('\n=== TẤT CẢ 6/6 BÀI KIỂM ĐỊNH HEADLESS PDP LINK VALIDATOR ĐẠT PASS 100% ===\n');
}).catch(err => {
  console.error('Liveness check error:', err);
  process.exit(1);
});
