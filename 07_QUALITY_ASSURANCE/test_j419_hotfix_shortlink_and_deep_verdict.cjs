/**
 * JAYT-420 (J419-HOTFIX): SHORTLINK RESOLUTION, ANTI-GIBBERISH FILTER & DEEP VERDICT AUDIT SUITE
 * 
 * Mandate: CHAIRMAN_DIRECTIVE_20260917_HOTFIX_SHORTLINK_RESOLVER_AND_DEEP_VERDICT
 * 
 * Verifies:
 * 1. Shortlink resolution via /api/resolve-link using real TikTok shortlink https://vt.tiktok.com/ZS9AJ7tbWDtcs-yOIvD/.
 * 2. Anti-Gibberish Filter: Blocks random hashes like ZS9AJ7tbWDtcs from search queries.
 * 3. Share-Text Extraction: Resolves user input containing both descriptive text and URLs.
 * 4. JayT Deep Verdict Matrix: 5-standard comprehensive evaluation (Price, Warranty, Shipping, Reputation, Recommendation).
 * 5. 100% Partner ID wrapping on clean queries and commercial fail-closed discipline.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('node:assert/strict');

const ROOT_DIR = path.resolve(__dirname, '..');
const APEX_FILE = path.join(ROOT_DIR, '03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
const RESOLVE_API_FILE = path.join(ROOT_DIR, 'deploy/api/resolve-link.js');

console.log('=== JAYT-420: SHORTLINK RESOLVER & DEEP VERDICT MATRIX AUDIT ===\n');

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
  // TEST 1: Serverless Shortlink Resolution (/api/resolve-link)
  console.log('[TEST 1/5] Kiểm tra Serverless Resolver giải mã shortlink thật (vt.tiktok.com)...');
  const resolveHandler = require(RESOLVE_API_FILE);
  assert.ok(typeof resolveHandler === 'function', 'resolveHandler must be a function');

  const realShortlink = 'https://vt.tiktok.com/ZS9AJ7tbWDtcs-yOIvD/';
  let apiResponse = null;

  const mockReq = {
    method: 'GET',
    url: '/api/resolve-link?url=' + encodeURIComponent(realShortlink)
  };

  await new Promise((resolve) => {
    const mockRes = {
      statusCode: 0,
      headers: {},
      setHeader(k, v) { this.headers[k] = v; },
      end(data) {
        apiResponse = JSON.parse(data);
        resolve();
      }
    };
    resolveHandler(mockReq, mockRes);
  });

  assert.ok(apiResponse, 'API response must exist');
  assert.equal(apiResponse.success, true, 'Resolution must succeed');
  assert.equal(apiResponse.resolved, true, 'Must be resolved');
  assert.ok(apiResponse.title.includes('ATYS') && apiResponse.title.includes('CARDIGAN'), 'Title must contain ATYS CARDIGAN (actual: ' + apiResponse.title + ')');
  assert.equal(apiResponse.brand, 'ATYS', 'Brand must be detected as ATYS');
  assert.equal(apiResponse.categoryCode, 'PERSONAL', 'Category must be PERSONAL');
  assert.ok(!apiResponse.searchQuery.includes('ZS9AJ7'), 'Search query must NOT contain gibberish ZS9AJ7');
  assert.ok(apiResponse.searchQuery.includes('ATYS') && apiResponse.searchQuery.includes('CARDIGAN'), 'Search query must be clean ATYS CARDIGAN');

  console.log('  -> PASS: Giải mã thành công link thực tế thành "' + apiResponse.cleanTitle + '", Brand: ' + apiResponse.brand + ', Query: "' + apiResponse.searchQuery + '".');
  passed++;

  // TEST 2: Anti-Gibberish Filter Triệt Tiêu Từ Khóa Rác
  console.log('[TEST 2/5] Kiểm tra Bộ lọc Anti-Gibberish triệt tiêu chuỗi rác khỏi ô tìm kiếm...');
  const isGibberishFn = sandbox.isGibberishText;
  assert.ok(typeof isGibberishFn === 'function', 'isGibberishText must be exported/available');

  assert.equal(isGibberishFn('ZS9AJ7tbWDtcs'), true, 'ZS9AJ7tbWDtcs must be detected as gibberish');
  assert.equal(isGibberishFn('ZS9AJ7tbWDtcs yOIvD'), true, 'Token with random suffix must be gibberish');
  assert.equal(isGibberishFn('Áo Cardigan ATYS'), false, 'Legitimate title must NOT be gibberish');
  assert.equal(isGibberishFn('Sạc nhanh Baseus 100W'), false, 'Legitimate title must NOT be gibberish');

  // Check that cleanProductSearchQuery NEVER outputs gibberish
  const cleanSearchFn = sandbox.cleanProductSearchQuery;
  assert.ok(typeof cleanSearchFn === 'function', 'cleanProductSearchQuery must exist');
  const cleanQuery = cleanSearchFn({
    title: 'ZS9AJ7tbWDtcs yOIvD',
    cleanTitle: 'ZS9AJ7tbWDtcs yOIvD',
    brand: 'Chính Hãng',
    category: 'Thời trang'
  });
  assert.ok(!cleanQuery.includes('ZS9AJ7'), 'Clean query must not contain gibberish (got: ' + cleanQuery + ')');

  console.log('  -> PASS: Khóa cứng và triệt tiêu 100% chuỗi rác ngẫu nhiên ZS9AJ7... khỏi thanh tìm kiếm.');
  passed++;

  // TEST 3: Share-Text Extraction (Dán cả đoạn text kèm link)
  console.log('[TEST 3/5] Kiểm tra Trích xuất văn bản chia sẻ kèm link di động...');
  const extractShareFn = sandbox.extractUrlAndShareText;
  assert.ok(typeof extractShareFn === 'function', 'extractUrlAndShareText must exist');

  const pastedWithText = 'ÁO KHOÁC CARDIGAN ATYS CHÍNH HÃNG https://vt.tiktok.com/ZS9AJ7tbWDtcs-yOIvD/';
  const extracted = extractShareFn(pastedWithText);
  assert.equal(extracted.url, 'https://vt.tiktok.com/ZS9AJ7tbWDtcs-yOIvD/');
  assert.ok(extracted.cleanShareText.includes('CARDIGAN ATYS'));

  const parsedFromText = sandbox.resolveHeadlessProductLink(pastedWithText);
  assert.ok(parsedFromText, 'Must parse text with link');
  assert.ok(parsedFromText.title.includes('CARDIGAN ATYS') || parsedFromText.title.includes('ATYS'));

  console.log('  -> PASS: Tách link và tiêu đề chia sẻ tức thì: "' + parsedFromText.title + '".');
  passed++;

  // TEST 4: JayT Deep Verdict Matrix (5 Tiêu Chuẩn Toàn Diện)
  console.log('[TEST 4/5] Kiểm tra Bộ Đánh Giá Chuyên Sâu 5 Tiêu Chuẩn (JayT Deep Verdict Matrix)...');
  const radarFn = sandbox.computeCrossPlatformRadar;
  assert.ok(typeof radarFn === 'function');

  // Tech evaluation
  const techParsed = sandbox.resolveHeadlessProductLink('https://shopee.vn/Cap-sac-nhanh-Type-C-Baseus-100W-i.54321098.17654321098');
  const techRadar = radarFn(techParsed, 200000);
  assert.ok(techRadar.deepVerdictMatrix, 'Must have deepVerdictMatrix');
  assert.equal(techRadar.deepVerdictMatrix.length, 5, 'Must have exactly 5 evaluation standards');

  // Verify 5 standards
  const stdNames = techRadar.deepVerdictMatrix.map(s => s.id);
  assert.equal(stdNames.join(','), 'price,warranty,shipping,reputation,recommendation');

  // Verify tech recommendation in standard 5
  assert.equal(techRadar.deepVerdictMatrix[4].winner, 'MALL', 'Tech standard 5 must recommend MALL');
  assert.ok(techRadar.deepVerdictMatrix[1].mall.includes('Bảo hành hãng 12–24 tháng'), 'Standard 2 must state official warranty');
  assert.ok(techRadar.deepVerdictMatrix[2].mall.includes('Đà Nẵng'), 'Standard 3 must mention Da Nang delivery');
  assert.ok(techRadar.deepVerdictMatrix[3].trusted.includes('>5.000'), 'Standard 4 must verify >5000 sold');

  // Consumables evaluation
  const homeParsed = sandbox.resolveHeadlessProductLink('https://shopee.vn/Op-lung-Shin-Case-iPhone-i.11111111.22222222');
  const homeRadar = radarFn(homeParsed, 50000);
  assert.equal(homeRadar.deepVerdictMatrix[4].winner, 'TRUSTED', 'Consumables standard 5 must recommend TRUSTED');

  console.log('  -> PASS: Ma trận 5 Tiêu Chuẩn chuẩn xác: 1.Giá, 2.Bảo hành, 3.Vận chuyển ĐN, 4.Uy tín shop, 5.Lập luận chuyên biệt.');
  passed++;

  // TEST 5: 100% Partner ID Wrapping on Clean Deep Links & Commercial Safety
  console.log('[TEST 5/5] Kiểm tra 100% Bọc Partner IDs trên Search Query Sạch & Cờ Fail-Closed...');
  const dispatchFn = sandbox.dispatchSmartAffiliate;
  assert.ok(typeof dispatchFn === 'function');

  // Check dispatch with ATYS product
  const atysPayload = {
    isSearchFallback: true,
    searchQuery: 'ATYS Áo ATYS Knit Cotton Cardigan',
    brand: 'ATYS',
    category: 'Thời trang'
  };

  // Shopee dispatch
  const shopeeRes = dispatchFn('shopee', atysPayload);
  assert.ok(shopeeRes.deepLinkUrl.includes('partner=17372870594'), 'Shopee deep link must wrap partner 17372870594');
  assert.ok(shopeeRes.deepLinkUrl.includes('ATYS') && shopeeRes.deepLinkUrl.includes('Cardigan'), 'Shopee search query must be clean');
  assert.ok(!shopeeRes.deepLinkUrl.includes('ZS9AJ7'), 'Shopee query must NOT contain ZS9AJ7');

  // Lazada dispatch
  const lazadaRes = dispatchFn('lazada', atysPayload);
  assert.ok(lazadaRes.deepLinkUrl.includes('pid=262501305'), 'Lazada deep link must wrap pid 262501305');
  assert.ok(!lazadaRes.deepLinkUrl.includes('ZS9AJ7'), 'Lazada query must NOT contain ZS9AJ7');

  // TikTok dispatch
  const tiktokRes = dispatchFn('tiktok', atysPayload);
  assert.ok(tiktokRes.deepLinkUrl.includes('code=VNVNLCB6LYL3'), 'TikTok deep link must wrap code VNVNLCB6LYL3');
  assert.ok(!tiktokRes.deepLinkUrl.includes('ZS9AJ7'), 'TikTok query must NOT contain ZS9AJ7');

  // Fail-closed commercial guard check
  assert.equal(shopeeRes.affiliate_enabled, false, 'affiliate_enabled must be false fail-closed on canonical production');

  console.log('  -> PASS: 100% DeepLinks bọc chính danh Partner IDs; sạch tuyệt đối 0% từ khóa rác; fail-closed an toàn.');
  passed++;

  console.log('\n=== TẤT CẢ 5/5 BÀI KIỂM ĐỊNH J420 ĐẠT PASS TUYỆT ĐỐI 100% ===');
  process.exit(0);
}

runTests().catch(err => {
  console.error('Test Suite Failed:', err);
  process.exit(1);
});
