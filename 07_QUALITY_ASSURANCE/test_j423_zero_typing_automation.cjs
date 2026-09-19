/**
 * JAYT-422: AUTOMATED QA TEST SUITE
 * Directive: CHAIRMAN_DIRECTIVE_20260918_FIX_SEARCH_QUERY_AND_MANDATORY_BLIND_TEST
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
    console.log(`  [PASS] ${name}`);
  } catch (err) {
    console.error(`  [FAIL] ${name}: ${err.message}`);
    throw err;
  }
}

console.log('=== JAYT-423 ZERO-TYPING AUTOMATION & DANANG GO-LIVE TEST SUITE ===');

// --- GATE 1: BANNED GARBAGE QUERIES ---
it('Gate 1.1: isGarbageQuery bans "TikTok Shop Sản Phẩm" and variations', () => {
  assert.strictEqual(apex.isGarbageQuery('TikTok Shop Sản Phẩm'), true);
  assert.strictEqual(apex.isGarbageQuery('tiktok shop sản phẩm'), true);
  assert.strictEqual(apex.isGarbageQuery('Sản phẩm TikTok Shop'), true);
  assert.strictEqual(apex.isGarbageQuery('TikTok Shop'), true);
  assert.strictEqual(apex.isGarbageQuery('Sản phẩm Shopee'), true);
  assert.strictEqual(apex.isGarbageQuery('shopee sản phẩm'), true);
  assert.strictEqual(apex.isGarbageQuery('Lazada Item'), true);
  assert.strictEqual(apex.isGarbageQuery('sản phẩm lazada'), true);
  assert.strictEqual(apex.isGarbageQuery('sản phẩm chính hãng'), true);
  assert.strictEqual(apex.isGarbageQuery('sản phẩm liên kết'), true);
  assert.strictEqual(apex.isGarbageQuery('sản phẩm thương mại điện tử'), true);
  assert.strictEqual(apex.isGarbageQuery('sản phẩm'), true);
  assert.strictEqual(apex.isGarbageQuery('Chính Hãng'), true);
  assert.strictEqual(apex.isGarbageQuery('tiện ích sinh viên'), true);
});

it('Gate 1.2: isGarbageQuery bans token hashes, empty strings, and strings < 3 chars', () => {
  assert.strictEqual(apex.isGarbageQuery('ZS9AJ7tbWDtcs-yOIvD'), true);
  assert.strictEqual(apex.isGarbageQuery(''), true);
  assert.strictEqual(apex.isGarbageQuery(null), true);
  assert.strictEqual(apex.isGarbageQuery(undefined), true);
  assert.strictEqual(apex.isGarbageQuery('ab'), true);
  assert.strictEqual(apex.isGarbageQuery('1234567890abcdef'), true);
});

it('Gate 1.3: isGarbageQuery approves genuine brand and product search queries', () => {
  assert.strictEqual(apex.isGarbageQuery('ATYS Áo Khoác Cardigan'), false);
  assert.strictEqual(apex.isGarbageQuery('Ugreen Củ Sạc Nexode 65W GaN'), false);
  assert.strictEqual(apex.isGarbageQuery('Lock&Lock Bình Giữ Nhiệt 500ml'), false);
  assert.strictEqual(apex.isGarbageQuery('Logitech Chuột Không Dây M350s'), false);
  assert.strictEqual(apex.isGarbageQuery('TopGia Khăn Giấy Thùng 30 Gói'), false);
});

// --- GATE 2: SEO SANITIZATION ---
it('Gate 2.1: sanitizeProductTitle removes promotional SEO buzzwords', () => {
  const raw = '[MÃ GIẢM 50K] Áo khoác cardigan ATYS knit cotton freeship chính hãng 100% [Bảo hành 12T]';
  const clean = apex.sanitizeProductTitle(raw, 'ATYS');
  assert.ok(clean.includes('ATYS'), 'Should include brand');
  assert.ok(clean.includes('Áo khoác cardigan'), 'Should include core model');
  assert.ok(!clean.includes('[MÃ GIẢM 50K]'), 'Should strip promo bracket');
  assert.ok(!clean.includes('freeship'), 'Should strip freeship');
  assert.ok(!clean.includes('chính hãng'), 'Should strip chinh hang');
  assert.ok(!clean.includes('100%'), 'Should strip 100%');
  assert.ok(!clean.includes('Bảo hành'), 'Should strip bao hanh');
});

it('Gate 2.2: sanitizeProductTitle normalizes [Brand] + [Core Model]', () => {
  const raw = 'Củ sạc Ugreen Nexode 65W GaN sạc nhanh 3 cổng Type-C [Bảo hành 24T] giá sốc';
  const clean = apex.sanitizeProductTitle(raw, 'Ugreen');
  assert.ok(clean.startsWith('Ugreen'), 'Should prefix brand');
  assert.ok(clean.includes('Nexode 65W GaN'), 'Should retain core specs');
  assert.ok(!clean.includes('giá sốc'), 'Should strip gia soc');
  assert.ok(!clean.includes('24T'), 'Should strip warranty');
});

// --- GATE 3: CLEAN SEARCH QUERY ---
it('Gate 3.1: cleanProductSearchQuery never returns "sản phẩm chính hãng" on unresolved parsed object', () => {
  const unresolved = { title: null, brand: null, category: null, searchQuery: null };
  const query = apex.cleanProductSearchQuery(unresolved);
  assert.strictEqual(query, null, 'Unresolved query must be null, never fake keywords');
});

it('Gate 3.2: cleanProductSearchQuery blocks fallback strings if title is garbage', () => {
  const garbage = { title: 'TikTok Shop Sản Phẩm', brand: 'TikTok Shop', searchQuery: 'TikTok Shop Sản Phẩm' };
  const query = apex.cleanProductSearchQuery(garbage);
  assert.strictEqual(query, null, 'Garbage title must return null');
});

// --- GATE 4: LAYER 3 (SMART FALLBACK ARCHETYPE) ZERO-TYPING AUTOMATION ---
it('Gate 4.1: Raw shortlink automatically resolves to clean archetype with needsUserInput: false', () => {
  const shortlink = 'https://vt.tiktok.com/ZS9AJ7tbWDtcs-yOIvD/';
  const parsed = apex.resolveHeadlessProductLink(shortlink);
  assert.ok(parsed, 'Parsed object must exist');
  assert.strictEqual(parsed.platform, 'tiktok');
  assert.strictEqual(parsed.isShortlink, true);
  assert.strictEqual(parsed.needsUserInput, false, 'Zero-Typing Mandate: needsUserInput MUST be false');
  assert.strictEqual(parsed.status, 'RESOLVED', 'Status MUST be RESOLVED');
  assert.ok(parsed.title && parsed.title.length > 3, 'Title must be resolved to a meaningful string');
  assert.strictEqual(apex.isGarbageQuery(parsed.title), false, 'Resolved title must NOT be garbage');
  assert.strictEqual(apex.isGarbageQuery(parsed.searchQuery), false, 'Resolved searchQuery must NOT be garbage');
});

it('Gate 4.2: Raw PDP item ID automatically resolves to clean archetype with needsUserInput: false', () => {
  const rawIdUrl = 'https://shopee.vn/product/123456/789012';
  const parsed = apex.resolveHeadlessProductLink(rawIdUrl);
  assert.ok(parsed);
  assert.strictEqual(parsed.needsUserInput, false, 'Zero-Typing Mandate: needsUserInput MUST be false');
  assert.strictEqual(parsed.status, 'RESOLVED');
  assert.strictEqual(apex.isGarbageQuery(parsed.searchQuery), false, 'searchQuery must NOT be garbage');
});

it('Gate 4.3: Share text extraction recovers authentic product name without typing', () => {
  const input = 'ÁO KHOÁC CARDIGAN ATYS KNIT COTTON https://vt.tiktok.com/ZS9AJ7tbWDtcs-yOIvD/';
  const parsed = apex.resolveHeadlessProductLink(input);
  assert.ok(parsed);
  assert.strictEqual(parsed.needsUserInput, false, 'Should be valid with share text');
  assert.strictEqual(parsed.brand, 'ATYS');
  assert.ok(/cardigan/i.test(parsed.cleanTitle), 'cleanTitle should contain cardigan');
  assert.strictEqual(apex.isGarbageQuery(parsed.searchQuery), false, 'searchQuery must be valid');
});

// --- GATE 5: ZERO-TYPING MANDATE (ZERO PROMPT UI) ---
it('Gate 5.1: renderManualProductPromptHtml returns empty string unconditionally', () => {
  const testParsed1 = { needsUserInput: false, title: 'ATYS Cardigan', searchQuery: 'ATYS Cardigan' };
  assert.strictEqual(apex.renderManualProductPromptHtml(null, testParsed1, true), '');
  assert.strictEqual(apex.renderManualProductPromptHtml(null, testParsed1, false), '');

  const testParsed2 = { needsUserInput: true, title: null, searchQuery: null };
  assert.strictEqual(apex.renderManualProductPromptHtml(null, testParsed2, true), '');
  assert.strictEqual(apex.renderManualProductPromptHtml(null, testParsed2, false), '');
});

// --- GATE 6: PARTNER ID MONETIZATION WRAPPING ---
it('Gate 6.1: Partner registry preserves 100% official Partner IDs', () => {
  assert.ok(apexCode.includes('17372870594') || apexCode.includes("['17372870', '594']"), 'Shopee Partner ID 17372870594 must exist');
  assert.ok(apexCode.includes('262501305') || apexCode.includes("['26250', '1305']"), 'Lazada Partner ID 262501305 must exist');
  assert.ok(apexCode.includes('VNVNLCB6LYL3') || apexCode.includes("['VNVN', 'LCB6', 'LYL3']"), 'TikTok Shop Partner ID VNVNLCB6LYL3 must exist');
});

// --- GATE 7: SUB-5MS CLIENT RESOLUTION PERFORMANCE ---
it('Gate 7.1: Client resolution latency is <= 5ms across all vectors', () => {
  const { performance } = require('perf_hooks');
  const testUrls = [
    'https://vt.tiktok.com/ZS9AJ7tbWDtcs-yOIvD/',
    'https://vn.shp.ee/m9xyz12',
    'https://s.lazada.vn/s.abcd1',
    'https://shopee.vn/product/123456/789012',
    'ÁO KHOÁC CARDIGAN ATYS https://vt.tiktok.com/ZS9AJ7tbWDtcs-yOIvD/'
  ];
  for (const u of testUrls) {
    const t0 = performance.now();
    const res = apex.resolveHeadlessProductLink(u);
    const elapsed = performance.now() - t0;
    assert.ok(elapsed <= 5, `Resolution for ${u} took ${elapsed.toFixed(3)}ms (exceeds 5ms limit)`);
    assert.strictEqual(res.needsUserInput, false);
    assert.strictEqual(apex.isGarbageQuery(res.searchQuery), false);
  }
});

// --- GATE 8: GOVERNANCE FAIL-CLOSED ---
it('Gate 8.1: CONFIG.affiliate_enabled is fail-closed (false)', () => {
  const configMatch = apexCode.match(/affiliate_enabled:\s*(false|true)/);
  assert.ok(configMatch, 'CONFIG.affiliate_enabled must be present');
  assert.strictEqual(configMatch[1], 'false', 'affiliate_enabled must remain false in production');
});

console.log(`\nAll ${testsPassed}/${totalTests} JAYT-423 QA Gates Passed Successfully! (100% PASS)`);
