/**
 * JAYT-424: PRICE CHRONO-RADAR 90-DAY TRACKER & DANANG GO-LIVE QA SUITE
 * Directive: CHAIRMAN_DIRECTIVE_20260918_PRICE_HISTORY_TRACKER_AND_DANANG_GO_LIVE
 * Authority: CEO CODEX & ANTIGRAVITY ENGINEERING
 */

'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const apexFilePath = path.resolve(__dirname, '..', '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
const apexCode = fs.readFileSync(apexFilePath, 'utf8');

global.localStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {}
};

const mockWindow = {
  location: { href: 'http://localhost:3000' },
  addEventListener: () => {},
  localStorage: global.localStorage,
  document: {
    getElementById: () => null,
    createElement: () => ({ style: {}, classList: { add: () => {}, remove: () => {} }, addEventListener: () => {} }),
    body: { style: {}, appendChild: () => {} }
  }
};

global.window = mockWindow;
global.document = mockWindow.document;

const contextFn = new Function('window', 'document', 'localStorage', apexCode + '; return window;');
const apex = contextFn(mockWindow, mockWindow.document, global.localStorage);

let testsPassed = 0;
let totalTests = 0;

function it(name, fn) {
  totalTests++;
  try {
    fn();
    testsPassed++;
    console.log('  [PASS] ' + name);
  } catch (err) {
    console.error('  [FAIL] ' + name + ': ' + err.message);
    throw err;
  }
}

console.log('=== JAYT-424 PRICE CHRONO-RADAR & DANANG GO-LIVE QA SUITE ===');

// --- GATE 1: MATHEMATICAL RIGOR OF 3 GOLDEN POINTS ---
it('Gate 1.1: computePriceChronoHistory correctly derives maxPrice90d >= avgPrice90d >= allTimeLow90d', () => {
  assert.strictEqual(typeof apex.computePriceChronoHistory, 'function', 'computePriceChronoHistory must be exported');
  const chrono = apex.computePriceChronoHistory(78000, 100000, 'TECH', 'Ugreen');
  assert.ok(chrono, 'Chrono object must exist');
  assert.ok(chrono.maxPrice90d >= chrono.avgPrice90d, 'max >= avg');
  assert.ok(chrono.avgPrice90d >= chrono.allTimeLow90d, 'avg >= low');
  assert.strictEqual(chrono.currentPrice, 78000);
  assert.strictEqual(chrono.timelinePoints.length, 7, 'Must have exactly 7 timeline points');
});

// --- GATE 2: PRICE TRAP DETECTION BADGES ---
it('Gate 2.1: Detects [🟢 ĐÁY THỰC TẾ 90 NGÀY - NÊN MUA NGAY] when at or near all-time low', () => {
  const chrono = apex.computePriceChronoHistory(76000, 100000, 'HOME');
  assert.strictEqual(chrono.trapBadge.status, 'ALL_TIME_LOW');
  assert.ok(chrono.trapBadge.label.includes('ĐÁY THỰC TẾ 90 NGÀY'));
  assert.strictEqual(chrono.trapBadge.color, '#10B981');
});

it('Gate 2.2: Detects [🔴 CẢNH BÁO: GIÁ CAO HƠN BÌNH THƯỜNG] when price is inflated', () => {
  const chrono = apex.computePriceChronoHistory(135000, 100000, 'TECH');
  assert.strictEqual(chrono.trapBadge.status, 'OVERPRICED_WARNING');
  assert.ok(chrono.trapBadge.label.includes('CẢNH BÁO: GIÁ CAO HƠN BÌNH THƯỜNG'));
  assert.strictEqual(chrono.trapBadge.color, '#EF4444');
});

it('Gate 2.3: Detects [🟡 GIÁ BÌNH ỔN] when price is within normal range', () => {
  const chrono = apex.computePriceChronoHistory(96000, 100000, 'HOME');
  assert.strictEqual(chrono.trapBadge.status, 'NORMAL_STABLE');
  assert.ok(chrono.trapBadge.label.includes('GIÁ BÌNH ỔN'));
  assert.strictEqual(chrono.trapBadge.color, '#F59E0B');
});

// --- GATE 3: HTML & SVG SPARKLINE GENERATION ---
it('Gate 3.1: renderPriceChronoRadarHtml outputs valid semantic HTML and SVG sparkline', () => {
  assert.strictEqual(typeof apex.renderPriceChronoRadarHtml, 'function', 'renderPriceChronoRadarHtml must be exported');
  const chrono = apex.computePriceChronoHistory(82000, 110000, 'TECH');
  const money = (v) => v.toLocaleString('vi-VN') + '₫';
  const html = apex.renderPriceChronoRadarHtml(chrono, money);
  assert.ok(html.includes('jayt-price-chrono-radar'), 'Contains main wrapper class');
  assert.ok(html.includes('Giá Cao Nhất 90 Ngày'), 'Contains max price label');
  assert.ok(html.includes('Giá Trung Bình 90 Ngày'), 'Contains avg price label');
  assert.ok(html.includes('Giá Đáy Lịch Sử Sau Voucher'), 'Contains all-time low label');
  assert.ok(html.includes('<svg'), 'Contains SVG element');
  assert.ok(html.includes('Đôi 9.9'), 'Contains milestone label for 9.9');
  assert.ok(html.includes('Giữa tháng 15.9'), 'Contains milestone label for 15.9');
  assert.ok(html.includes('Hiện tại'), 'Contains milestone label for current');
});

// --- GATE 4: RADAR INTEGRATION ---
it('Gate 4.1: computeCrossPlatformRadar automatically includes chronoHistory', () => {
  const parsed = apex.resolveHeadlessProductLink('https://shopee.vn/product/123/456');
  const radar = apex.computeCrossPlatformRadar(parsed, 150000);
  assert.ok(radar.chronoHistory, 'radar must contain chronoHistory');
  assert.ok(radar.chronoHistory.maxPrice90d > 0, 'maxPrice90d must be positive');
  assert.ok(radar.chronoHistory.avgPrice90d > 0, 'avgPrice90d must be positive');
  assert.ok(radar.chronoHistory.allTimeLow90d > 0, 'allTimeLow90d must be positive');
});

it('Gate 4.2: renderBuyingAdvisoryEngineHtml includes Chrono-Radar block', () => {
  const parsed = apex.resolveHeadlessProductLink('https://shopee.vn/product/123/456');
  const radar = apex.computeCrossPlatformRadar(parsed, 150000);
  const money = (v) => (v || 0).toLocaleString('vi-VN') + '₫';
  const advisoryHtml = apex.renderBuyingAdvisoryEngineHtml(radar, money);
  assert.ok(advisoryHtml.includes('jayt-price-chrono-radar'), 'Advisory engine must contain Chrono-Radar');
  assert.ok(advisoryHtml.includes('JAYT PRICE CHRONO-RADAR'), 'Advisory engine must mention Price Chrono-Radar');
});

// --- GATE 5: ZERO-TYPING & CLIENT LATENCY SLA <= 5MS ---
it('Gate 5.1: 100 consecutive computations execute within SLA (<= 5ms per run)', () => {
  const t0 = process.hrtime.bigint();
  const iterations = 100;
  for (let i = 0; i < iterations; i++) {
    const c = apex.computePriceChronoHistory(78000 + i * 500, 120000, 'TECH');
    apex.renderPriceChronoRadarHtml(c, (v) => v + '₫');
  }
  const t1 = process.hrtime.bigint();
  const avgMs = Number(t1 - t0) / (iterations * 1000000);
  console.log('    Measured average Chrono-Radar latency: ' + avgMs.toFixed(3) + 'ms');
  assert.ok(avgMs <= 5.0, 'Average latency must be <= 5ms');
});

it('Gate 5.2: Preserves Zero-Typing Mandate and 100% Partner IDs', () => {
  const parsed = apex.resolveHeadlessProductLink('https://vt.tiktok.com/ZS9AJ7tbWDtcs-yOIvD/');
  assert.strictEqual(parsed.needsUserInput, false, 'needsUserInput must be false');
  const radar = apex.computeCrossPlatformRadar(parsed, 120000);
  assert.ok(radar.tierMall.some(p => p.id === 'shopee'));
  assert.ok(radar.tierTrusted.some(t => t.id === 'shopee' && t.partnerId === '17372870594'));
  assert.ok(radar.tierTrusted.some(t => t.id === 'lazada' && t.partnerId === '262501305'));
  assert.ok(radar.tierTrusted.some(t => t.id === 'tiktok' && t.partnerId === 'VNVNLCB6LYL3'));
});

console.log('=== JAYT-424 TEST RESULT: ' + testsPassed + '/' + totalTests + ' GATES PASSED ===');