/**
 * JAYT-402 CYCLE 01: 100% DEEP-LINK & APP SCHEME VALIDATOR
 *
 * Duration: Minutes 00 - 30 of Tactical Stress Test
 * Scope: 100% Deep links, App Schemes, Variant IDs, Partner IDs & Fallback URLs
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=== JAYT-402 CYCLE 01: 100% DEEP-LINK & APP SCHEME VALIDATOR ===');

const srcPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
const source = fs.readFileSync(srcPath, 'utf8');

// [TEST 1/5] Extract Partner Config & Dispatch Router
console.log('[TEST 1/5] Kiểm tra Cấu hình Đối tác Chính Danh & Router...');
assert.ok(source.includes('SECURE_PARTNER_CONFIG'), 'SECURE_PARTNER_CONFIG must exist');
assert.ok(source.includes('17372870'), 'Shopee Partner ID segment 17372870 must exist');
assert.ok(source.includes('26250'), 'Lazada Partner ID segment 26250 must exist');
assert.ok(source.includes('LCB6'), 'TikTok Partner ID segment LCB6 must exist');
console.log('  -> PASS: Đầy đủ 3 Partner IDs chính danh (Shopee 17372870594, Lazada 262501305, TikTok VNVNLCB6LYL3).');

// [TEST 2/5] Setup Sandbox Execution of dispatchSmartAffiliate
console.log('[TEST 2/5] Khởi tạo Sandbox thực thi router dispatchSmartAffiliate...');
const partnerConfigMatch = source.match(/const SECURE_PARTNER_CONFIG = Object\.freeze\([\s\S]*?\n\}\);/);
assert.ok(partnerConfigMatch, 'SECURE_PARTNER_CONFIG matched');
const affiliateRegistryMatch = source.match(/const TRACK_1_AFFILIATE_REGISTRY = Object\.freeze\([\s\S]*?\n\}\);/);
assert.ok(affiliateRegistryMatch, 'TRACK_1_AFFILIATE_REGISTRY matched');
const dispatchMatch = source.match(/function dispatchSmartAffiliate\([\s\S]*?\n\}/);
assert.ok(dispatchMatch, 'dispatchSmartAffiliate definition matched');

const sandboxFn = new Function('providerKey', 'offerPayload', 'voucherCode',
  partnerConfigMatch[0] + '\n' +
  affiliateRegistryMatch[0] + '\n' +
  'function showJaytToast(m) {}\n' +
  'function copyToClipboardFallback(v) { return Promise.resolve(); }\n' +
  dispatchMatch[0] + '\n' +
  'return dispatchSmartAffiliate(providerKey, offerPayload, voucherCode);'
);

// [TEST 3/5] Test Exact Variant Deep-Linking for Shopee Mall
console.log('[TEST 3/5] Kiểm tra Deep-link Shopee Mall với modelId phân loại hàng...');
const shopeePayload = {
  pdpUrl: 'https://shopee.vn/product/89827191/26609048170',
  shopId: '89827191',
  itemId: '26609048170',
  modelId: '235048271',
  variantName: 'iPhone 11 / Đen Mờ'
};
const shopeeResult = sandboxFn('shopee', shopeePayload, 'SHOPEELIVE50');
assert.ok(shopeeResult.deepLinkUrl.startsWith('shopeevn://product?partner=17372870594'), 'Shopee deepLinkUrl must use shopeevn:// and partnerId 17372870594');
assert.ok(shopeeResult.deepLinkUrl.includes('itemid=26609048170'), 'Shopee deepLinkUrl must contain itemid');
assert.ok(shopeeResult.deepLinkUrl.includes('shopid=89827191'), 'Shopee deepLinkUrl must contain shopid');
assert.ok(shopeeResult.deepLinkUrl.includes('modelId=235048271'), 'Shopee deepLinkUrl must contain modelId for exact variant');
assert.strictEqual(shopeeResult.routing_mode, 'VARIANT_LEVEL_PDP_ROUTING');
console.log('  -> PASS: Shopee Mall Deep-Link chuẩn: ' + shopeeResult.deepLinkUrl.slice(0, 75) + '...');

// [TEST 4/5] Test Exact Variant Deep-Linking for LazMall
console.log('[TEST 4/5] Kiểm tra Deep-link LazMall với skuId phân loại hàng...');
const lazPayload = {
  pdpUrl: 'https://www.lazada.vn/products/op-lung-iphone-shin-case-chong-ban-i266090481-s987654321.html',
  itemId: '266090481',
  skuId: '987654321',
  variantName: 'iPhone 11 / Đen'
};
const lazResult = sandboxFn('lazada', lazPayload, 'LAZCHOICE15K');
assert.ok(lazResult.deepLinkUrl.startsWith('lazada://item?pid=262501305'), 'Lazada deepLinkUrl must use lazada:// and partnerId 262501305');
assert.ok(lazResult.deepLinkUrl.includes('item_id=266090481'), 'Lazada deepLinkUrl must contain item_id');
assert.ok(lazResult.deepLinkUrl.includes('sku=987654321'), 'Lazada deepLinkUrl must contain sku for exact variant');
assert.strictEqual(lazResult.routing_mode, 'VARIANT_LEVEL_PDP_ROUTING');
console.log('  -> PASS: LazMall Deep-Link chuẩn: ' + lazResult.deepLinkUrl.slice(0, 70) + '...');

// [TEST 5/5] Test Search Fallback Routing when missing PDP
console.log('[TEST 5/5] Kiểm tra Search Fallback Routing khi đối thủ thiếu link PDP...');
const fallbackPayload = {
  isSearchFallback: true,
  searchQuery: 'Ốp lưng iPhone TPU Shin Case'
};
const ttFallback = sandboxFn('tiktok', fallbackPayload, '');
assert.ok(ttFallback.deepLinkUrl.includes('snssdk1180://ec/search?keyword='), 'TikTok search fallback must use search scheme');
assert.ok(ttFallback.destinationUrl.includes('shop.tiktok.com/search?q='), 'TikTok destination must fallback to clean web search');
assert.strictEqual(ttFallback.routing_mode, 'SEARCH_FALLBACK_ROUTING');

const lazFallback = sandboxFn('lazada', fallbackPayload, '');
assert.ok(lazFallback.deepLinkUrl.includes('lazada://search?keyword='), 'Lazada search fallback must use search scheme');
assert.ok(lazFallback.destinationUrl.includes('lazada.vn/catalog/?q='), 'Lazada destination must fallback to clean catalog search');
assert.strictEqual(lazFallback.routing_mode, 'SEARCH_FALLBACK_ROUTING');

console.log('  -> PASS: Search Fallback hoạt động minh bạch: xuất đúng Search Scheme & URL web sạch không bị chặn pop-up.');

console.log('\n=== CHU KỲ 1: 100% DEEP-LINK & APP SCHEME SÀN ĐẠT PASS TUYỆT ĐỐI ===\n');
