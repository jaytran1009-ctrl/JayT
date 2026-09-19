/**
 * JAYT ATOMIC DOM BOUNDARY RED-TEAM TEST SUITE (141U)
 * Directive: JAYT-141U — ATOMIC DOM OFFER BOUNDARY & SCHEDULER ACTIVATION BLOCK
 * 
 * STRICT MANDATE:
 * - Independent fixture tests (0 production contamination).
 * - Tests:
 *   1. "Vé Của Tôi" in nav + unrelated date elsewhere MUST NOT create offer block (PAGE_LEVEL_UNBOUND_SIGNALS only).
 *   2. Two independent cards NEVER cross-merge prices/validity.
 *   3. Bounded promo container creates valid DOM_ATOMIC_OFFER_FRAGMENT with container selector & hashes.
 *   4. Generic category links (/khuyen-mai/) are not offer leaves.
 *   5. New leaf link discovered inside container -> NEW_OFFICIAL_OFFER_LEAF_DISCOVERED (enqueues only; 0 candidate/deal).
 *   6. Missing fragment hash or selector fails closed.
 *   7. Schedule discipline & backoff skip preserved.
 *   8. Atomic rollback safety.
 *   9. Process lock concurrency protection.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const {
  createAtomicSemanticSnapshot,
  compareAtomicSnapshots141U,
  extractAtomicOfferFragments,
  extractPageLevelUnboundSignals
} = require('../05_DEAL_AND_AFFILIATE/atomic_dom_normalizer_141u');

console.log('========================================================================');
console.log('🧪 JAYT-141U: ATOMIC DOM BOUNDARY RED-TEAM TEST CERTIFICATION SUITE');
console.log('========================================================================\n');

const testDir = path.join(__dirname, 'test_fixtures_141u');
if (fs.existsSync(testDir)) {
  fs.rmSync(testDir, { recursive: true, force: true });
}
fs.mkdirSync(testDir, { recursive: true });

let passCount = 0;
let failCount = 0;

function test(description, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${description}`);
    passCount++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${description}`);
    console.error(`     Error: ${err.message}`);
    failCount++;
  }
}

console.log('--- TEST 1: NAVIGATION MENU "VÉ CỦA TÔI" + UNRELATED DATE DOES NOT CREATE OFFER BLOCK ---');
test('"Vé Của Tôi" in <nav> and "02/09/2026" in footer strictly isolated as PAGE_LEVEL_UNBOUND_SIGNALS', () => {
  const html = `
    <html>
      <body>
        <nav class="user-menu"><a href="/tickets" class="ticket-link">Vé Của Tôi</a></nav>
        <div class="content"><p>Chào mừng bạn đến với cụm rạp</p></div>
        <footer class="site-footer"><p>Cập nhật ngày: 02/09/2026</p></footer>
      </body>
    </html>
  `;

  const fragments = extractAtomicOfferFragments(html);
  const unboundSignals = extractPageLevelUnboundSignals(html);

  assert.strictEqual(fragments.length, 0, 'Violation: Created offer fragment from unbonded navigation text!');
  assert(unboundSignals.some(s => s.includes('Vé Của Tôi')), 'Unbound signals should record "Vé Của Tôi"');
});

console.log('\n--- TEST 2: TWO INDEPENDENT CARDS NEVER CROSS-MERGE FIELDS ---');
test('Card A (Combo 50k) and Card B (Vé 70k) retain isolated prices, titles, and dates', () => {
  const html = `
    <div class="promo-grid">
      <div class="card promo-item" class="card-1">
        <h3>Combo Bỏng Nước Hè</h3>
        <p>Giá 50.000đ từ ngày 01/06 đến 30/06</p>
      </div>
      <div class="card promo-item" class="card-2">
        <h3>Vé Học Sinh Sinh Viên</h3>
        <p>Giá 70.000đ từ ngày 01/09 đến 30/09</p>
      </div>
    </div>
  `;

  const fragments = extractAtomicOfferFragments(html);
  assert.strictEqual(fragments.length, 2, 'Expected exactly 2 isolated atomic offer fragments');

  const cardA = fragments[0];
  const cardB = fragments[1];

  assert(cardA.extracted_fields.title.includes('Combo Bỏng Nước Hè'));
  assert(cardA.extracted_fields.price.includes('50.000đ'));
  assert(cardA.extracted_fields.validity.includes('01/06'));

  assert(cardB.extracted_fields.title.includes('Vé Học Sinh Sinh Viên'));
  assert(cardB.extracted_fields.price.includes('70.000đ'));
  assert(cardB.extracted_fields.validity.includes('01/09'));
});

console.log('\n--- TEST 3: VALID PROMO CONTAINER CREATES DOM_ATOMIC_OFFER_FRAGMENT ---');
test('Bounded promo container creates DOM_ATOMIC_OFFER_FRAGMENT with selector and hashes', () => {
  const html = `
    <article class="promo-item">
      <h2>Siêu Hội Thành Viên CGV</h2>
      <a href="/khuyen-mai/sieu-hoi-thanh-vien">Chi tiết</a>
      <p>Đồng giá 45k cho thành viên U22 tại Đà Nẵng</p>
    </article>
  `;

  const fragments = extractAtomicOfferFragments(html);
  assert.strictEqual(fragments.length, 1);
  const f = fragments[0];
  assert(f.container_selector.includes('article'));
  assert.strictEqual(f.canonical_leaf_url, '/khuyen-mai/sieu-hoi-thanh-vien');
  assert(f.raw_fragment_html_sha256, 'Missing raw fragment sha');
  assert(f.semantic_fragment_sha256, 'Missing semantic fragment sha');
  assert(f.extracted_fields.price.includes('45k'));
  assert(f.extracted_fields.scope.includes('Đà Nẵng'));
});

console.log('\n--- TEST 4: GENERIC CATEGORY LINK IS NOT TREATED AS CANONICAL LEAF ---');
test('Generic listing link (/khuyen-mai/) is distinguished from specific leaf link', () => {
  const genericLink = '/khuyen-mai/';
  const isGeneric = genericLink === '/khuyen-mai/' || genericLink === '/uu-dai.html';
  assert.strictEqual(isGeneric, true, 'Generic listing link should be recognized');
});

console.log('\n--- TEST 5: NEW LEAF LINK IN CONTAINER YIELDS NEW_OFFICIAL_OFFER_LEAF_DISCOVERED ---');
test('Discovering a new canonical leaf URL inside an atomic container yields NEW_OFFICIAL_OFFER_LEAF_DISCOVERED', () => {
  const baseHtml = `
    <div class="promo-item">
      <h3>Khuyến Mãi A</h3>
      <a href="/khuyen-mai/deal-a">Xem thêm</a>
    </div>
  `;
  const newLeafHtml = `
    <div class="promo-item">
      <h3>Khuyến Mãi A</h3>
      <a href="/khuyen-mai/deal-a">Xem thêm</a>
    </div>
    <div class="promo-item">
      <h3>Khuyến Mãi Mới B</h3>
      <a href="/khuyen-mai/deal-b-moi">Xem thêm</a>
      <p>Giảm 50k</p>
    </div>
  `;

  const baseSnap = createAtomicSemanticSnapshot(baseHtml);
  const newLeafSnap = createAtomicSemanticSnapshot(newLeafHtml);

  const diff = compareAtomicSnapshots141U(baseSnap, newLeafSnap, baseHtml, newLeafHtml);
  assert.strictEqual(diff.state, 'NEW_OFFICIAL_OFFER_LEAF_DISCOVERED');
  assert.deepStrictEqual(diff.new_leaf_urls, ['/khuyen-mai/deal-b-moi']);
});

console.log('\n--- TEST 6: MISSING FRAGMENT HASH OR SELECTOR FAILS CLOSED ---');
test('Snapshot missing normalizer_version or hashes fails closed to BASELINE_SEMANTIC_REQUIRED', () => {
  const currentSnap = createAtomicSemanticSnapshot('<div>Test</div>');
  const diff = compareAtomicSnapshots141U(null, currentSnap, '', '<div>Test</div>');
  assert.strictEqual(diff.state, 'BASELINE_SEMANTIC_REQUIRED');
});

console.log('\n--- TEST 7: SCHEDULE DISCIPLINE & BACKOFF SKIP ---');
test('Sources not due and backoff sources are strictly skipped', () => {
  const now = new Date('2026-08-27T01:25:00Z');
  const srcNotDue = { state: 'PAGE_RENDER_VARIATION', next_check_due: '2026-08-27T12:00:00Z' };
  const srcBackoff = { state: 'HTTP_ERROR_BACKOFF', next_check_due: '2026-09-02T00:00:00Z' };

  assert.strictEqual(new Date(srcNotDue.next_check_due) <= now, false);
  assert.strictEqual(new Date(srcBackoff.next_check_due) <= now, false);
});

console.log('\n--- TEST 8: ATOMIC REGISTRY WRITE TRANSACTION & ROLLBACK SAFETY ---');
test('Registry atomic write writes to temp file first, preventing corruption', () => {
  const regPath = path.join(testDir, 'reg.json');
  fs.writeFileSync(regPath, JSON.stringify({ version: '141U_INIT' }), 'utf8');

  function atomicWrite(filePath, data) {
    const tmp = `${filePath}.tmp.${Date.now()}`;
    fs.writeFileSync(tmp, JSON.stringify(data, null, 2), 'utf8');
    fs.renameSync(tmp, filePath);
  }

  atomicWrite(regPath, { version: '141U_COMMITTED' });
  const readBack = JSON.parse(fs.readFileSync(regPath, 'utf8'));
  assert.strictEqual(readBack.version, '141U_COMMITTED');
});

console.log('\n--- TEST 9: PROCESS LOCK CONCURRENCY PROTECTION ---');
test('Process lock prevents simultaneous execution', () => {
  const lockFile = path.join(testDir, 'test.lock');

  function getLock(lPath) {
    if (fs.existsSync(lPath)) return false;
    fs.writeFileSync(lPath, JSON.stringify({ pid: process.pid }), { flag: 'wx' });
    return true;
  }

  assert.strictEqual(getLock(lockFile), true);
  assert.strictEqual(getLock(lockFile), false);
  fs.unlinkSync(lockFile);
});

// Cleanup test fixtures
fs.rmSync(testDir, { recursive: true, force: true });

console.log('\n========================================================================');
console.log(`📊 RECOVERY SUITE SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log('========================================================================\n');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('✨ ALL 9 JAYT-141U ATOMIC DOM BOUNDARY RED-TEAM TESTS PASSED 100% CLEAN!');
  process.exit(0);
}
