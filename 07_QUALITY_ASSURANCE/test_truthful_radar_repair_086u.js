/**
 * JAYT TRUTHFUL RADAR RELEASE REPAIR TEST SUITE (086U)
 * Directive: JAYT-086U-TRUTHFUL-RADAR-RELEASE-REPAIR
 *
 * Verifies:
 * 1. ZERO currency values / prices in any unverified dataset source.
 * 2. ZERO percentages, discount codes, or promo campaign names in unverified dataset.
 * 3. ZERO countdown timers or expiry claims in unverified dataset.
 * 4. ZERO unverified promo claims, prices, codes, or purchase CTA in rendered Radar DOM.
 * 5. BHD Star uses neutral status NOT_CONFIRMED_FOR_DANANG with non-overreached copy.
 * 6. Dataset accounts for 28 sources across 5 standard categories.
 * 7. Correction receipt 086U exists and discloses all purged claims.
 * 8. Production invariants locked: deals_feed.json: [], is_approved: false.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const vm = require('vm');

const repoRoot = path.resolve(__dirname, '..');
const radarDatasetPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'radar_dataset_086u.json');
const correctionReceiptPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'correction_receipt_086u_truthful_radar_repair.json');
const sotJsPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
const dealsFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

console.log('🧪 [JAYT-086U-TEST] Khởi chạy bộ kiểm thử Truthful Radar Release Repair 086U...\n');

let passedTests = 0;
const totalTests = 8;

function runTest(testName, testFn) {
  try {
    testFn();
    passedTests++;
    console.log(`  [${testName}]: [PASS]`);
  } catch (err) {
    console.error(`  [${testName}]: [FAIL] - ${err.message}`);
    process.exitCode = 1;
  }
}

// Banned patterns for unverified sources
const PRICE_PATTERNS = [
  /\b\d+[\.,]?\d*\s*(?:đ|đồng|vnđ|nghìn|triệu)\b/i,
  /\b\d+[\.,]?\d*\s*k(?![a-zA-Z\u00C0-\u1EF9])/i,
  /\$\d+/,
  /\b\d{2,3}\.000\s*(?:đ|đồng|vnđ)?\b/i
];

const CODE_AND_PROMO_PATTERNS = [
  /\b(?:HOCHE|CHONMOMO|MOMOBUS)\b/i,
  /\d+\s*%/,
  /\b(?:Super Monday|Happy Monday|Couple Day|Vinpearl|VinWonders|U22 Day)\b/i
];

const COUNTDOWN_PATTERNS = [
  /\b(?:\d+\s*tuần|\d+\s*ngày nữa|kết thúc|hết hạn|23 tháng tám)\b/i
];

// TEST 01: Zero prices in unverified sources in radar_dataset_086u.json
runTest('TEST_01_ZERO_PRICES_IN_UNVERIFIED_DATASET', () => {
  assert.ok(fs.existsSync(radarDatasetPath), 'Radar dataset 086U missing');
  const dataset = JSON.parse(fs.readFileSync(radarDatasetPath, 'utf8'));

  for (const s of dataset.sources) {
    if (s.status !== 'VERIFIED_CANDIDATE') {
      const textToScan = `${s.note} ${s.channelName} ${s.statusBadge} ${s.categoryLabel}`;
      for (const pattern of PRICE_PATTERNS) {
        const match = textToScan.match(pattern);
        assert.strictEqual(match, null, `Forbidden price pattern '${match ? match[0] : ''}' found in source ${s.domain}: "${textToScan}"`);
      }
    }
  }
});

// TEST 02: Zero percentages, promo codes, or promo names in unverified dataset
runTest('TEST_02_ZERO_PERCENTAGES_OR_CODES_IN_UNVERIFIED_DATASET', () => {
  const dataset = JSON.parse(fs.readFileSync(radarDatasetPath, 'utf8'));

  for (const s of dataset.sources) {
    if (s.status !== 'VERIFIED_CANDIDATE') {
      const textToScan = `${s.note} ${s.channelName} ${s.statusBadge} ${s.categoryLabel}`;
      for (const pattern of CODE_AND_PROMO_PATTERNS) {
        const match = textToScan.match(pattern);
        assert.strictEqual(match, null, `Forbidden promo pattern '${match ? match[0] : ''}' found in source ${s.domain}: "${textToScan}"`);
      }
    }
  }
});

// TEST 03: Zero countdowns or expiry claims in unverified dataset
runTest('TEST_03_ZERO_COUNTDOWNS_OR_EXPIRY_IN_UNVERIFIED_DATASET', () => {
  const dataset = JSON.parse(fs.readFileSync(radarDatasetPath, 'utf8'));

  for (const s of dataset.sources) {
    if (s.status !== 'VERIFIED_CANDIDATE') {
      const textToScan = `${s.note} ${s.channelName} ${s.statusBadge}`;
      for (const pattern of COUNTDOWN_PATTERNS) {
        const match = textToScan.match(pattern);
        assert.strictEqual(match, null, `Forbidden countdown pattern '${match ? match[0] : ''}' found in source ${s.domain}: "${textToScan}"`);
      }
    }
  }
});

// TEST 04: Zero unverified claims in rendered Radar DOM
runTest('TEST_04_ZERO_UNVERIFIED_CLAIMS_IN_RENDERED_RADAR_DOM', () => {
  const jsCode = fs.readFileSync(sotJsPath, 'utf8');

  let renderedHtml = '';
  const domElementsMap = {};
  const domMock = {
    getElementById: (id) => domElementsMap[id] || null,
    querySelectorAll: () => [],
    createElement: (tag) => ({
      tagName: tag.toUpperCase(),
      id: '',
      style: {},
      classList: { add: () => {}, remove: () => {} },
      setAttribute: () => {},
      appendChild: () => {},
      addEventListener: () => {}
    }),
    head: { appendChild: (c) => { if (c && c.id) domElementsMap[c.id] = c; } },
    body: { appendChild: (c) => { if (c && c.id) domElementsMap[c.id] = c; } },
    addEventListener: () => {},
    readyState: 'complete'
  };

  domElementsMap['jayt-apex'] = {
    id: 'jayt-apex',
    set innerHTML(val) { renderedHtml = val; },
    get innerHTML() { return renderedHtml; },
    appendChild: () => {},
    classList: { add: () => {}, remove: () => {} },
    setAttribute: () => {},
    addEventListener: () => {}
  };

  const datasetObj = JSON.parse(fs.readFileSync(radarDatasetPath, 'utf8'));
  const sandbox = {
    window: { location: { origin: 'http://localhost', pathname: '/', hash: '' }, localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} }, scrollTo: () => {}, open: () => {}, JAYT_RADAR_DATASET: datasetObj },
    document: domMock,
    localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
    Notification: { permission: 'default', requestPermission: () => Promise.resolve('granted') },
    navigator: { clipboard: { writeText: () => Promise.resolve() } },
    prompt: () => '150000',
    confirm: () => true,
    alert: () => {},
    setTimeout: setTimeout,
    Date: Date,
    console: console
  };
  sandbox.window.window = sandbox.window;
  sandbox.window.document = domMock;

  vm.createContext(sandbox);
  vm.runInContext(jsCode, sandbox);

  // Extract the Radar Section from rendered HTML
  const radarSectionStart = renderedHtml.indexOf('📡 Deal Discovery Radar');
  assert.ok(radarSectionStart >= 0, 'Radar section not found in rendered HTML');

  const nextSectionStart = renderedHtml.indexOf('<!-- KHU VỰC 4:', radarSectionStart);
  const radarSectionHtml = nextSectionStart >= 0 ? renderedHtml.slice(radarSectionStart, nextSectionStart) : renderedHtml.slice(radarSectionStart);

  // Scan rendered radar section for forbidden price/promo patterns
  for (const pattern of [...PRICE_PATTERNS, ...CODE_AND_PROMO_PATTERNS, ...COUNTDOWN_PATTERNS]) {
    const match = radarSectionHtml.match(pattern);
    assert.strictEqual(match, null, `Forbidden pattern '${match ? match[0] : ''}' leaked into rendered Radar DOM!`);
  }

  // Ensure NO buy/get-deal CTA
  assert.strictEqual(radarSectionHtml.includes('btn-buy-now'), false, 'Must not render buy buttons');
  assert.strictEqual(radarSectionHtml.includes('btn-get-deal'), false, 'Must not render get deal buttons');
});

// TEST 05: BHD Star uses neutral status NOT_CONFIRMED_FOR_DANANG with non-overreached copy
runTest('TEST_05_BHD_STAR_NOT_CONFIRMED_FOR_DANANG_NEUTRAL_COPY', () => {
  const dataset = JSON.parse(fs.readFileSync(radarDatasetPath, 'utf8'));
  const bhd = dataset.sources.find(s => s.domain === 'bhdstar.vn');

  assert.ok(bhd, 'BHD Star entry missing');
  assert.strictEqual(bhd.status, 'NOT_CONFIRMED_FOR_DANANG', 'BHD status must be NOT_CONFIRMED_FOR_DANANG');
  assert.strictEqual(bhd.note.includes('không có rạp'), false, 'Must not make absolute assertion of no rạp');
  assert.ok(bhd.note.includes('Chưa xác nhận phạm vi áp dụng tại Đà Nẵng'), 'Must use neutral copy');
});

// TEST 06: Dataset accounts for 28 sources across 5 standard categories
runTest('TEST_06_DATASET_ACCOUNTING_28_SOURCES', () => {
  const dataset = JSON.parse(fs.readFileSync(radarDatasetPath, 'utf8'));

  assert.strictEqual(dataset.total_sources, 28);
  assert.strictEqual(dataset.summary.verified_deals, 0);
  assert.strictEqual(dataset.summary.signal_only, 8);
  assert.strictEqual(dataset.summary.not_confirmed_for_danang, 1);
  assert.strictEqual(dataset.summary.blocked_challenge, 8);
  assert.strictEqual(dataset.summary.failed_access, 11);
  assert.strictEqual(dataset.sources.length, 28);
});

// TEST 07: Correction receipt 086U exists and discloses all purged claims
runTest('TEST_07_CORRECTION_RECEIPT_086U_VALID', () => {
  assert.ok(fs.existsSync(correctionReceiptPath), 'Correction receipt 086U missing');
  const receipt = JSON.parse(fs.readFileSync(correctionReceiptPath, 'utf8'));

  assert.strictEqual(receipt.correction_id, 'CORRECTION_086U_TRUTHFUL_RADAR_REPAIR');
  assert.strictEqual(receipt.work_order, 'JAYT-086U-TRUTHFUL-RADAR-RELEASE-REPAIR');
  assert.ok(receipt.purged_items.length >= 4, 'Must list purged items');
});

// TEST 08: Production invariants locked []
runTest('TEST_08_PRODUCTION_INVARIANTS_LOCKED', () => {
  const feedContent = JSON.parse(fs.readFileSync(dealsFeedPath, 'utf8'));
  assert.strictEqual(feedContent.length, 0, 'Production feed must remain []');

  const releaseManifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
  assert.strictEqual(releaseManifest.governance_locks.immutable_ceo_approval_record.is_approved, false, 'is_approved must remain false');
});

console.log('\n======================================================');
if (passedTests === totalTests) {
  console.log(`🟢 [TRUTHFUL-RADAR-086U-SUMMARY] Kết quả kiểm thử: ${passedTests}/${totalTests} PASS!\n`);
} else {
  console.log(`❌ [TRUTHFUL-RADAR-086U-SUMMARY] Thất bại: ${passedTests}/${totalTests} PASS.\n`);
  process.exitCode = 1;
}
