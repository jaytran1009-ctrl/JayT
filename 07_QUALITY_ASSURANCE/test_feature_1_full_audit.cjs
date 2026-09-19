/**
 * JAYT FEATURE 1 FULL QUALITY ASSURANCE & AUDIT TEST SUITE
 * Purpose: End-to-end verification of Feature 1 (Link Parser, Radar, Chrono-Radar, Math, Performance)
 */

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

const ROOT_DIR = path.resolve(__dirname, '..');
const APEX_PATH = path.join(ROOT_DIR, '03_SOURCE_OF_TRUTH/jayt_apex_interface.js');

console.log('================================================================');
console.log('JAYT FEATURE 1: FULL SYSTEM AUDIT & INTEGRITY VERIFICATION SUITE');
console.log('Target: 03_SOURCE_OF_TRUTH/jayt_apex_interface.js & api/resolve-link.js');
console.log('================================================================\n');

// Load apex interface into sandboxed VM
const apexCode = fs.readFileSync(APEX_PATH, 'utf8');
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

let passCount = 0;
let failCount = 0;
const results = [];

function checkGate(gateNum, name, testFn) {
  try {
    testFn();
    passCount++;
    console.log(`[PASS] Gate ${gateNum}: ${name}`);
    results.push({ gate: gateNum, name, status: 'PASS' });
  } catch (err) {
    failCount++;
    console.error(`[FAIL] Gate ${gateNum}: ${name} -> ${err.message}`);
    results.push({ gate: gateNum, name, status: 'FAIL', error: err.message });
  }
}

// --------------------------------------------------------------------------
// GATE 1: 11 SKU Triplets Data Contract & Field Integrity
// --------------------------------------------------------------------------
checkGate(1, '11 SKU Triplets Contract & Math Integrity', () => {
  const triplets = sandbox.window.CROSS_PLATFORM_SKU_TRIPLETS || sandbox.CROSS_PLATFORM_SKU_TRIPLETS;
  assert.ok(Array.isArray(triplets), 'Triplets must be an array');
  assert.strictEqual(triplets.length, 11, 'Must have exactly 11 verified SKU triplets');

  triplets.forEach((t, i) => {
    assert.ok(t.id && t.id.startsWith('SKU_TRIPLET_'), `Triplet ${i} ID must be valid`);
    assert.ok(t.title && t.title.length > 5, `Triplet ${i} title must be valid`);
    assert.ok(Array.isArray(t.matchKeys) && t.matchKeys.length > 0, `Triplet ${i} matchKeys must be non-empty`);
    assert.ok(t.platforms, `Triplet ${i} must define platforms`);
    assert.ok(t.platforms.shopee, `Triplet ${i} must define Shopee platform`);
    assert.ok(t.platforms.lazada, `Triplet ${i} must define Lazada platform`);
    assert.ok(t.platforms.tiktok, `Triplet ${i} must define TikTok platform`);

    // Verify Shopee pricing if available
    if (t.platforms.shopee.available) {
      assert.ok(t.platforms.shopee.observedPrice > 0, `Triplet ${i} Shopee observedPrice must be positive`);
      assert.ok(!isNaN(t.platforms.shopee.observedPrice), `Triplet ${i} Shopee observedPrice must be a number`);
      assert.ok(t.platforms.shopee.pdpUrl.startsWith('https://shopee.vn/'), `Triplet ${i} Shopee PDP URL must be valid`);
    }
  });
});

// --------------------------------------------------------------------------
// GATE 2: Brand Sanitization & Unicode Word Boundary Verification
// --------------------------------------------------------------------------
checkGate(2, 'Brand Sanitization & No Duplicate Brand Names', () => {
  const sanitizeFn = sandbox.sanitizeProductTitle || sandbox.window.sanitizeProductTitle;
  assert.strictEqual(typeof sanitizeFn, 'function', 'sanitizeProductTitle must be a function');

  // Test Vietnamese brand with accents (Điện Quang)
  const testTitle1 = 'Ổ Cắm Điện Điện Quang 5 Lỗ 2m Chống Giật An Toàn';
  const clean1 = sanitizeFn(testTitle1, 'Điện Quang');
  const count1 = (clean1.match(/Điện Quang/gi) || []).length;
  assert.strictEqual(count1, 1, `Brand "Điện Quang" must appear at most once, got ${count1}: "${clean1}"`);

  // Test English brand
  const testTitle2 = 'Củ Sạc Nhanh Ugreen GaN 30W Type-C Robot Nexode';
  const clean2 = sanitizeFn(testTitle2, 'Ugreen');
  const count2 = (clean2.match(/Ugreen/gi) || []).length;
  assert.strictEqual(count2, 1, `Brand "Ugreen" must appear at most once, got ${count2}: "${clean2}"`);
});

// --------------------------------------------------------------------------
// GATE 3: Sample Chips Link Resolution & Non-Null Guarantee
// --------------------------------------------------------------------------
checkGate(3, 'Feature 1 Sample Chips Resolution Integrity', () => {
  const sampleUrls = [
    { name: 'Jisulife Fan', url: 'https://shopee.vn/product/38729104/18274910245' },
    { name: 'Shin Case', url: 'https://shopee.vn/product/89827191/26609048170' },
    { name: 'Ugreen Charger', url: 'https://shopee.vn/product/10987654/22145890123' },
    { name: 'TopGia Tissue', url: 'https://shopee.vn/product/1016604648/23552060269' },
    { name: 'Dien Quang Socket', url: 'https://shopee.vn/product/32456789/19827364512' },
    { name: 'TikTok Ergonomic Pillow', url: 'https://shop.tiktok.com/vn/pdp/1734961837103548126' },
    { name: 'Lazada Logitech Pebble', url: 'https://www.lazada.vn/products/chuot-khong-day-logitech-pebble-m350s-slim-i25432109876.html' }
  ];

  sampleUrls.forEach(item => {
    const parsed = sandbox.window.resolveHeadlessProductLink(item.url);
    assert.ok(parsed, `Sample "${item.name}" must resolve successfully`);
    assert.ok(parsed.cleanTitle && parsed.cleanTitle.length >= 3, `Sample "${item.name}" must have valid cleanTitle`);
    assert.ok(!sandbox.window.isGarbageQuery(parsed.cleanTitle), `Sample "${item.name}" cleanTitle must not be garbage`);
    assert.ok(parsed.searchQuery && parsed.searchQuery.length >= 3, `Sample "${item.name}" must have valid searchQuery`);
  });
});

// --------------------------------------------------------------------------
// GATE 4: Dynamic Voucher Stack Math Integrity (Exact VND, No Float Errors)
// --------------------------------------------------------------------------
checkGate(4, 'Dynamic Voucher Stack Calculation Integrity', () => {
  const calcStack = sandbox.calculateDynamicStack || sandbox.window.calculateDynamicStack;
  assert.strictEqual(typeof calcStack, 'function', 'calculateDynamicStack must be a function');

  // Case A: Standard stack
  // Basket (250k) - Shop (20k) - Platform (30k) = 200k
  // Delivery (22k) - Freeship (22k) = 0k
  // Subtotal (200k) - Payment (15k) = 185k
  // Total Original = 250k + 22k = 272k
  // Total Savings = 272k - 185k = 87k (includes 22k freeship)
  const stackA = calcStack({
    basketValue: 250000,
    shopDiscount: 20000,
    platformVoucher: 30000,
    deliveryFee: 22000,
    freeshipCredit: 22000,
    paymentDiscount: 15000
  });

  assert.strictEqual(stackA.payable, 185000, `Payable must be 185,000, got ${stackA.payable}`);
  assert.strictEqual(stackA.savings, 87000, `Savings must be 87,000, got ${stackA.savings}`);
  assert.ok(Number.isInteger(stackA.payable), 'Payable must be an exact integer');
  assert.ok(Number.isInteger(stackA.savings), 'Savings must be an exact integer');

  // Case B: Oversized discount
  const stackB = calcStack({
    basketValue: 50000,
    shopDiscount: 30000,
    platformVoucher: 40000,
    deliveryFee: 15000,
    freeshipCredit: 15000,
    paymentDiscount: 20000
  });
  assert.ok(stackB.payable >= 0, 'Payable must never be negative');
});

// --------------------------------------------------------------------------
// GATE 5: Price Chrono-Radar 90 Days Mathematical Consistency & Sparkline
// --------------------------------------------------------------------------
checkGate(5, 'Price Chrono-Radar 90 Days Engine & SVG Sparkline', () => {
  const chronoFn = sandbox.computePriceChronoHistory;
  assert.strictEqual(typeof chronoFn, 'function', 'computePriceChronoHistory must be a function');

  const history = chronoFn(150000, 200000);
  assert.ok(history, 'History must not be null');
  assert.ok(history.maxPrice90d >= history.avgPrice90d, 'maxPrice90d >= avgPrice90d');
  assert.ok(history.avgPrice90d >= history.allTimeLow90d, 'avgPrice90d >= allTimeLow90d');
  assert.strictEqual(history.timelinePoints.length, 7, 'Must have 7 observation points');

  const svgFn = sandbox.renderPriceChronoRadarHtml;
  assert.strictEqual(typeof svgFn, 'function', 'renderPriceChronoRadarHtml must be a function');
  const svgHtml = svgFn(history, (v) => v + 'đ');
  assert.ok(svgHtml.includes('<svg'), 'Must render SVG element');
  assert.ok(svgHtml.includes('CHRONO-RADAR'), 'Must contain Chrono-Radar header');
  assert.ok(!svgHtml.includes('NaN'), 'SVG must not contain NaN');
});

// --------------------------------------------------------------------------
// GATE 6: Cross-Platform Radar 2-Tier Architecture
// --------------------------------------------------------------------------
checkGate(6, 'Radar 2-Tier Architecture (Mall PDP + Trusted Shops)', () => {
  const parsed = sandbox.window.resolveHeadlessProductLink('https://shopee.vn/product/10987654/22145890123');
  const radar = sandbox.window.computeCrossPlatformRadar(parsed);

  assert.ok(radar, 'Radar must not be null');
  assert.strictEqual(radar.platforms.length, 3, 'Tier 1 must have 3 platform cards (Shopee, Lazada, TikTok)');
  assert.ok(radar.tierTrusted && radar.tierTrusted.length === 3, 'Tier 2 must have 3 trusted shops');
  assert.ok(radar.cheapestPlatform, 'Cheapest platform must be identified');
  assert.ok(radar.cheapestPlatform.payable > 0, 'Cheapest platform payable must be > 0');
});

// --------------------------------------------------------------------------
// GATE 7: Commercial Boundary & Affiliate Attribution Lock
// --------------------------------------------------------------------------
checkGate(7, 'Affiliate Attribution Lock & Fail-Closed Guard', () => {
  const shopeeDispatch = sandbox.window.dispatchSmartAffiliate('shopee', '26609048170', 'VOUCHER10');
  const lazadaDispatch = sandbox.window.dispatchSmartAffiliate('lazada', '123456789', 'VOUCHER10');
  const tiktokDispatch = sandbox.window.dispatchSmartAffiliate('tiktok', '1734961837103548126', 'VOUCHER10');

  assert.strictEqual(shopeeDispatch.partnerId, '17372870594', 'Shopee partner ID must be 17372870594');
  assert.strictEqual(lazadaDispatch.partnerId, '262501305', 'Lazada partner ID must be 262501305');
  assert.strictEqual(tiktokDispatch.partnerId, 'VNVNLCB6LYL3', 'TikTok partner ID must be VNVNLCB6LYL3');

  assert.strictEqual(shopeeDispatch.affiliate_enabled, false, 'Shopee must be fail-closed');
  assert.strictEqual(lazadaDispatch.affiliate_enabled, false, 'Lazada must be fail-closed');
  assert.strictEqual(tiktokDispatch.affiliate_enabled, false, 'TikTok must be fail-closed');
});

// --------------------------------------------------------------------------
// GATE 8: Client-side Resolution Performance Benchmark (SLA <= 5ms)
// --------------------------------------------------------------------------
checkGate(8, 'Client-side Headless Resolution Latency (<= 5ms)', () => {
  const url = 'https://shopee.vn/product/89827191/26609048170';
  const iterations = 100;
  const start = Date.now();
  for (let i = 0; i < iterations; i++) {
    sandbox.window.resolveHeadlessProductLink(url);
  }
  const totalMs = Date.now() - start;
  const avgMs = totalMs / iterations;
  console.log(`       Execution: ${iterations} parses in ${totalMs}ms (Avg: ${avgMs.toFixed(3)}ms per parse)`);
  assert.ok(avgMs <= 5, `Average latency must be <= 5ms, got ${avgMs}ms`);
});

// --------------------------------------------------------------------------
// GATE 9: Banned Strings & Codebase Cleanliness
// --------------------------------------------------------------------------
checkGate(9, 'Banned Strings & Clean Code Verification', () => {
  const banned = ['Vật Dụng Sinh Viên Đà Nẵng', 'shop.tiktok.com/search'];
  banned.forEach(b => {
    assert.strictEqual(apexCode.includes(b), false, `Must NOT contain banned string: "${b}"`);
  });
});

// --------------------------------------------------------------------------
// GATE 10: Serverless Resolver API Route Integrity
// --------------------------------------------------------------------------
checkGate(10, 'Serverless API Route (/api/resolve-link) Execution', () => {
  const apiHandler = require(path.join(ROOT_DIR, 'api/resolve-link.js'));
  assert.strictEqual(typeof apiHandler, 'function', 'API handler must be a function');

  let output = null;
  const mockReq = {
    method: 'GET',
    url: 'http://localhost/api/resolve-link?url=' + encodeURIComponent('https://shop.tiktok.com/vn/pdp/1734961837103548126')
  };
  const mockRes = {
    statusCode: 200,
    setHeader: () => {},
    end: (str) => { output = JSON.parse(str); }
  };

  apiHandler(mockReq, mockRes);
  assert.strictEqual(mockRes.statusCode, 200, 'Status must be 200');
  assert.ok(output && output.success, 'Output must indicate success');
  assert.strictEqual(output.cleanTitle, 'Gối Ngủ Công Thái Học', 'Clean title must match');
});

console.log('\n================================================================');
console.log(`AUDIT COMPLETED: ${passCount}/10 GATES PASSED, ${failCount} FAILED.`);
console.log('================================================================\n');

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
