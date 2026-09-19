/**
 * JAYT-419: DUAL-TIER ARBITRAGE & SMART VERDICT AUDIT SUITE
 * 
 * Mandate: CHAIRMAN_DIRECTIVE_20260917_DUAL_TIER_ARBITRAGE_AND_SMART_DECISION_ENGINE
 * 
 * Verifies:
 * 1. Fast link resolution (< 800ms) with Smart Title, Brand & Category.
 * 2. Dual-Tier Generation: Tier 1 (Mall) and Tier 2 (Shop Uy Tín meeting 3 standards: >5k sold, >= 4.8★, 15%-35% cheaper).
 * 3. JayT Smart Verdict reasoning engine: trade-off matrix, category-based recommendation (TECH -> Mall, CONSUMABLES -> Trusted Shop).
 * 4. 100% Partner ID wrapping across all Mall and Trusted Shop endpoints (Shopee: 17372870594, Lazada: 262501305, TikTok: VNVNLCB6LYL3).
 * 5. Value-First dynamic price range & commercial fail-closed safety.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('node:assert/strict');

const ROOT_DIR = path.resolve(__dirname, '..');
const APEX_FILE = path.join(ROOT_DIR, '03_SOURCE_OF_TRUTH/jayt_apex_interface.js');

console.log('=== JAYT-419: DUAL-TIER ARBITRAGE & SMART VERDICT AUDIT ===\n');

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
  // TEST 1: Fast Link Resolution & Category Extraction (< 800ms)
  console.log('[TEST 1/5] Kiểm tra Thuật toán Bóc tách Thông minh & Tốc độ (< 800ms)...');
  const resolveFn = sandbox.window.resolveHeadlessProductLink;
  assert.ok(typeof resolveFn === 'function', 'resolveHeadlessProductLink must be a function');

  const t0 = Date.now();
  const techLink = 'https://shopee.vn/Cap-sac-nhanh-Type-C-Baseus-100W-i.54321098.17654321098';
  const parsedTech = resolveFn(techLink);
  const elapsed = Date.now() - t0;

  assert.ok(parsedTech, 'Tech link must be resolved');
  assert.equal(parsedTech.brand, 'Baseus');
  assert.equal(parsedTech.categoryCode, 'TECH');
  assert.ok(parsedTech.resolvedInMs <= 800, 'Resolved in < 800ms');

  const homeLink = 'https://shopee.vn/Binh-Giu-Nhiet-Lock-Lock-500ml-i.99999999.88888888';
  const parsedHome = resolveFn(homeLink);
  assert.ok(parsedHome);
  assert.equal(parsedHome.brand, 'Lock&Lock');
  assert.equal(parsedHome.categoryCode, 'HOME');

  console.log('  -> PASS: Bóc tách chính xác Title, Brand, Category trong ' + elapsed + 'ms (< 800ms).');
  passed++;

  // TEST 2: Dual-Tier Arbitrage Engine (Mall vs Shop Uy Tín Đủ 3 Tiêu Chuẩn)
  console.log('[TEST 2/5] Kiểm tra Cơ chế Đối Soát Đa Tầng (Mall vs Shop Uy Tín)...');
  const radarFn = sandbox.window.computeCrossPlatformRadar;
  assert.ok(typeof radarFn === 'function');

  const radar = radarFn(parsedHome, 150000);
  assert.ok(radar.tierMall, 'Must have tierMall');
  assert.ok(radar.tierTrusted, 'Must have tierTrusted');
  assert.equal(radar.tierMall.length, 3, 'tierMall must have 3 platforms');
  assert.equal(radar.tierTrusted.length, 3, 'tierTrusted must have 3 platforms');

  // Verify 3 standards for each trusted shop:
  radar.tierTrusted.forEach(tp => {
    assert.ok(tp.soldCount > 5000, 'Standard 1: Sold count must be > 5000 (actual: ' + tp.soldCount + ')');
    assert.ok(tp.rating >= 4.8, 'Standard 2: Rating must be >= 4.8★ (actual: ' + tp.rating + ')');
    assert.ok(tp.discountRate >= 0.15 && tp.discountRate <= 0.35, 'Standard 3: Discount must be 15%-35% (actual: ' + tp.discountRate + ')');
    assert.ok(tp.payable < (radar.minPrice || 150000), 'Trusted shop payable must be cheaper than Mall');
    assert.ok(tp.actionLabel.includes('⚡ Mua Shop Uy Tín'));
  });

  console.log('  -> PASS: Tầng 2 Shop Uy Tín thỏa mãn đủ 3 tiêu chuẩn: >5.000 bán, >= 4.8★, rẻ hơn 15%–35%.');
  passed++;

  // TEST 3: JayT Smart Verdict (Trợ lý Lập luận Ra Quyết Định)
  console.log('[TEST 3/5] Kiểm tra Trợ lý Lập luận Ra Quyết Định (JayT Smart Verdict)...');
  const techRadar = radarFn(parsedTech, 200000);
  assert.ok(techRadar.smartVerdict, 'Must have smartVerdict');
  assert.equal(techRadar.smartVerdict.recommendedTier, 'MALL', 'TECH products must recommend MALL for warranty/safety');
  assert.equal(techRadar.smartVerdict.badgeColor, '#38BDF8');
  assert.ok(techRadar.smartVerdict.analysis.includes('bảo hành'), 'Tech verdict must mention warranty');
  assert.ok(techRadar.smartVerdict.cashDifference > 0, 'Must calculate positive cash difference');
  assert.ok(techRadar.smartVerdict.percentSavings > 0, 'Must calculate positive percent savings');

  const homeRadar = radarFn(parsedHome, 120000);
  assert.ok(homeRadar.smartVerdict);
  assert.equal(homeRadar.smartVerdict.recommendedTier, 'TRUSTED', 'HOME/CONSUMABLES must recommend TRUSTED shop for cash savings');
  assert.equal(homeRadar.smartVerdict.badgeColor, '#10B981');
  assert.ok(homeRadar.smartVerdict.analysis.includes('tiết kiệm'), 'Consumables verdict must mention savings');

  console.log('  -> PASS: Smart Verdict phân tích chính xác trade-off: TECH -> Mall, TIÊU HAO -> Shop Uy Tín.');
  passed++;

  // TEST 4: 100% Partner ID Wrapping Across Both Tiers
  console.log('[TEST 4/5] Kiểm tra Tự động hóa bọc Partner IDs trên cả 2 tầng...');
  const dispatchFn = sandbox.dispatchSmartAffiliate;
  assert.ok(typeof dispatchFn === 'function');

  // Check trusted shop payload
  homeRadar.tierTrusted.forEach(tp => {
    assert.equal(tp.payload.isTrustedShop, true, 'isTrustedShop must be true');
    assert.ok(tp.payload.searchQuery.length > 0, 'searchQuery must be non-empty');
  });

  // Dispatch trusted shop on Shopee
  const shopeeTrustedRes = dispatchFn('shopee', homeRadar.tierTrusted[0].payload);
  assert.ok(shopeeTrustedRes.deepLinkUrl.includes('partner=17372870594'), 'Shopee deep link must wrap partner 17372870594');

  // Dispatch trusted shop on Lazada
  const lazadaTrustedRes = dispatchFn('lazada', homeRadar.tierTrusted[1].payload);
  assert.ok(lazadaTrustedRes.deepLinkUrl.includes('pid=262501305'), 'Lazada deep link must wrap pid 262501305');

  // Dispatch trusted shop on TikTok
  const tiktokTrustedRes = dispatchFn('tiktok', homeRadar.tierTrusted[2].payload);
  assert.ok(tiktokTrustedRes.deepLinkUrl.includes('code=VNVNLCB6LYL3'), 'TikTok deep link must wrap code VNVNLCB6LYL3');

  console.log('  -> PASS: 100% điểm chạm chuyển đổi bọc chính danh Partner IDs (Shopee 17372870594, Lazada 262501305, TikTok Shop VNVNLCB6LYL3).');
  passed++;

  // TEST 5: Commercial Fail-Closed Guard & Pipeline Readiness
  console.log('[TEST 5/5] Kiểm tra Kỷ luật thương mại Fail-Closed & Độ tương thích ngược...');
  assert.equal(shopeeTrustedRes.affiliate_enabled, false, 'affiliate_enabled must be false (Fail-Closed)');
  assert.equal(lazadaTrustedRes.affiliate_enabled, false);
  assert.equal(tiktokTrustedRes.affiliate_enabled, false);

  // Backward compatibility: radar.platforms must still exist and equal tierMall
  assert.equal(homeRadar.platforms, homeRadar.tierMall, 'radar.platforms must point to tierMall for backwards compatibility');
  assert.ok(homeRadar.cheapestPlatform, 'cheapestPlatform must exist');

  console.log('  -> PASS: affiliate_enabled: false fail-closed an toàn tuyệt đối; 100% tương thích ngược.');
  passed++;

  console.log('\n=== TẤT CẢ 5/5 BÀI KIỂM ĐỊNH J419 ĐẠT PASS TUYỆT ĐỐI 100% ===');
  process.exit(0);
}

runTests().catch(err => {
  console.error('Test Suite Failed:', err);
  process.exit(1);
});
