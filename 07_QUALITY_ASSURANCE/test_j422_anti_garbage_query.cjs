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

console.log('=== JAYT-422 ANTI-GARBAGE QUERY & BLIND TEST TEST SUITE ===');

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

// --- GATE 4: RAW SHORTLINK RESOLUTION & USER INPUT FALLBACK ---
it('Gate 4.1: Raw shortlink resolution flags needsUserInput: true and title: null', () => {
  const shortlink = 'https://vt.tiktok.com/ZS9AJ7tbWDtcs-yOIvD/';
  const parsed = apex.resolveHeadlessProductLink(shortlink);
  assert.ok(parsed, 'Parsed object must exist');
  assert.strictEqual(parsed.platform, 'tiktok');
  assert.strictEqual(parsed.isShortlink, true);
  assert.strictEqual(parsed.needsUserInput, true, 'Must flag needsUserInput when title cannot be scraped');
  assert.strictEqual(parsed.title, null, 'Title must be null');
  assert.strictEqual(parsed.searchQuery, null, 'Search query must be null');
  assert.strictEqual(parsed.status, 'NEEDS_USER_INPUT');
  assert.strictEqual(apex.isGarbageQuery(parsed.searchQuery), true, 'searchQuery must be considered garbage/invalid');
});

it('Gate 4.2: Share text extraction recovers authentic product name', () => {
  const input = 'ÁO KHOÁC CARDIGAN ATYS KNIT COTTON https://vt.tiktok.com/ZS9AJ7tbWDtcs-yOIvD/';
  const parsed = apex.resolveHeadlessProductLink(input);
  assert.ok(parsed);
  assert.strictEqual(parsed.needsUserInput, false, 'Should be valid with share text');
  assert.strictEqual(parsed.brand, 'ATYS');
  assert.ok(/cardigan/i.test(parsed.cleanTitle), 'cleanTitle should contain cardigan');
  assert.strictEqual(apex.isGarbageQuery(parsed.searchQuery), false, 'searchQuery must be valid');
});

// --- GATE 5: FRIENDLY PROMPT RENDERING ---
it('Gate 5.1: renderManualProductPromptHtml renders input when product is unresolved', () => {
  const unresolvedParsed = { needsUserInput: true, title: null, searchQuery: null };
  const htmlModal = apex.renderManualProductPromptHtml(null, unresolvedParsed, true);
  assert.ok(htmlModal.includes('jayt-modal-manual-product-name'), 'Must include modal input ID');
  assert.ok(htmlModal.includes('applyManualProductName'), 'Must include apply function call');

  const htmlInline = apex.renderManualProductPromptHtml(null, unresolvedParsed, false);
  assert.ok(htmlInline.includes('jayt-inline-manual-product-name'), 'Must include inline input ID');
});

it('Gate 5.2: renderManualProductPromptHtml returns empty string when product is already resolved', () => {
  const resolvedParsed = { needsUserInput: false, title: 'ATYS Áo Khoác Cardigan', searchQuery: 'ATYS Áo Khoác Cardigan' };
  const html = apex.renderManualProductPromptHtml(null, resolvedParsed, false);
  assert.strictEqual(html, '', 'Must not show prompt when title is already valid');
});

// --- GATE 6: PARTNER ID MONETIZATION WRAPPING ---
it('Gate 6.1: Affiliate configuration contains official partner IDs', () => {
  assert.ok(apexCode.includes('17372870594') || apexCode.includes("['17372870', '594']"), 'Shopee Partner ID 17372870594 must exist');
  assert.ok(apexCode.includes('262501305') || apexCode.includes("['26250', '1305']"), 'Lazada Partner ID 262501305 must exist');
  assert.ok(apexCode.includes('VNVNLCB6LYL3') || apexCode.includes("['VNVN', 'LCB6', 'LYL3']"), 'TikTok Shop Partner ID VNVNLCB6LYL3 must exist');
});

// --- GATE 7: GOVERNANCE & COMMERCIAL FAIL-CLOSED ---
it('Gate 7.1: CONFIG.affiliate_enabled is fail-closed (false)', () => {
  const configMatch = apexCode.match(/affiliate_enabled:\s*(false|true)/);
  assert.ok(configMatch, 'CONFIG.affiliate_enabled must be present');
  assert.strictEqual(configMatch[1], 'false', 'affiliate_enabled must remain false in production');
});

console.log(`\nAll ${testsPassed}/${totalTests} JAYT-422 QA Gates Passed Successfully! (100% PASS)`);
