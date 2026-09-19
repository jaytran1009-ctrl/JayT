/**
 * JAYT RADAR SSOT INTEGRATION TEST SUITE (086V)
 * Directive: JAYT-086V-RADAR-SSOT-INTEGRATION
 *
 * Verifies:
 * 1. ZERO hardcoded source arrays in jayt_apex_interface.js (OFFICIAL_SOURCES_DIRECTORY completely deleted).
 * 2. Runtime dynamic rendering: Mock dataset with altered brand/status reflects immediately in DOM.
 * 3. Zero fallback on error/missing data: Failed/empty fetch displays error/empty state, NEVER hardcoded list.
 * 4. SSOT dataset loading: All 28 sources from radar_dataset_086u.json rendered correctly when provided.
 * 5. Strict negative pattern scan: Zero prices, %, codes, countdowns, or buy CTAs in unverified sources & DOM.
 * 6. BHD Star neutrality: NOT_CONFIRMED_FOR_DANANG with non-overreached copy.
 * 7. Staging deployment hash parity: 100% SHA-256 parity for JSON and JS files across SoT, Deploy, and Staging.
 * 8. Production invariants locked: deals_feed.json: [], is_approved: false.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const vm = require('vm');

const repoRoot = path.resolve(__dirname, '..');
const radarDatasetPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'radar_dataset_086u.json');
const sotJsPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
const deployJsonPath = path.join(repoRoot, 'deploy', 'public', 'radar_dataset_086u.json');
const deployJsPath = path.join(repoRoot, 'deploy', 'public', 'jayt_apex_interface.js');
const stagingJsonPath = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '03_SOURCE_OF_TRUTH', 'radar_dataset_086u.json');
const stagingJsPath = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
const dealsFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

console.log('🧪 [JAYT-086V-TEST] Khởi chạy bộ kiểm thử Radar SSOT Integration 086V...\n');

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

function getSha256(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function createMockDomEnvironment(initialDataset = null) {
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

  const sandbox = {
    window: {
      location: { origin: 'http://localhost', pathname: '/', hash: '' },
      localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
      scrollTo: () => {},
      open: () => {},
      JAYT_RADAR_DATASET: initialDataset
    },
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

  return { sandbox, getRenderedHtml: () => renderedHtml };
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

// TEST 01: Zero hardcoded source arrays in jayt_apex_interface.js
runTest('TEST_01_ZERO_HARDCODED_SOURCES_ARRAY_IN_JS', () => {
  const jsCode = fs.readFileSync(sotJsPath, 'utf8');
  assert.strictEqual(jsCode.includes('OFFICIAL_SOURCES_DIRECTORY'), false, 'OFFICIAL_SOURCES_DIRECTORY must be completely deleted from JS');
  assert.strictEqual(jsCode.includes("id: 'RADAR_METIZ'"), false, 'Hardcoded source definitions must not exist in JS');
  assert.strictEqual(jsCode.includes("id: 'RADAR_LOTTE'"), false, 'Hardcoded source definitions must not exist in JS');
});

// TEST 02: Runtime dynamic dataset rendering with mocked data
runTest('TEST_02_RUNTIME_DYNAMIC_DATASET_RENDERING', () => {
  const jsCode = fs.readFileSync(sotJsPath, 'utf8');
  const mockDataset = {
    total_sources: 1,
    sources: [
      {
        id: 'RADAR_DYNAMIC_TEST',
        brand: 'Thương hiệu Test Động 086V',
        domain: 'test-dong-086v.vn',
        sector: 'CINEMA',
        categoryLabel: '🎬 Rạp chiếu phim',
        url: 'https://test-dong-086v.vn/',
        status: 'SIGNAL_ONLY',
        statusBadge: '📡 Tín hiệu Test Động',
        statusColor: '#10B981',
        channelName: 'Kênh Test Động',
        last_checked_at: '2026-08-25T12:00:00Z',
        note: 'Ghi chú kiểm tra tính động của Deal Discovery Radar.'
      }
    ]
  };

  const { sandbox, getRenderedHtml } = createMockDomEnvironment(mockDataset);
  vm.createContext(sandbox);
  vm.runInContext(jsCode, sandbox);

  const html = getRenderedHtml();
  assert.ok(html.includes('Thương hiệu Test Động 086V'), 'Rendered DOM must reflect injected dynamic brand name');
  assert.ok(html.includes('test-dong-086v.vn'), 'Rendered DOM must reflect injected dynamic domain');
  assert.ok(html.includes('📡 Tín hiệu Test Động'), 'Rendered DOM must reflect injected dynamic status badge');
  assert.ok(html.includes('Ghi chú kiểm tra tính động của Deal Discovery Radar.'), 'Rendered DOM must reflect injected note');
});

// TEST 03: Zero fallback on error or missing data
runTest('TEST_03_ZERO_FALLBACK_ON_ERROR_OR_MISSING_DATA', () => {
  const jsCode = fs.readFileSync(sotJsPath, 'utf8');
  // No initial dataset, fetch will fail gracefully
  const { sandbox, getRenderedHtml } = createMockDomEnvironment(null);
  vm.createContext(sandbox);
  vm.runInContext(jsCode, sandbox);

  // Trigger error state explicitly via ApexApp API
  sandbox.window.ApexApp.loadRadarDataset(null);
  const html = getRenderedHtml();

  assert.ok(html.includes('apex-radar-error'), 'Must render apex-radar-error container when dataset fails');
  assert.strictEqual(html.includes('Metiz Cinema'), false, 'Must NOT fallback to hardcoded Metiz Cinema card');
  assert.strictEqual(html.includes('Lotte Cinema'), false, 'Must NOT fallback to hardcoded Lotte Cinema card');
});

// TEST 04: SSOT JSON loading and accounting of 28 sources
runTest('TEST_04_SSOT_JSON_LOADING_AND_ACCOUNTING_28_SOURCES', () => {
  const jsCode = fs.readFileSync(sotJsPath, 'utf8');
  const realDataset = JSON.parse(fs.readFileSync(radarDatasetPath, 'utf8'));

  const { sandbox, getRenderedHtml } = createMockDomEnvironment(realDataset);
  vm.createContext(sandbox);
  vm.runInContext(jsCode, sandbox);

  const html = getRenderedHtml();
  assert.strictEqual(realDataset.sources.length, 28, 'Dataset must have 28 sources');

  for (const s of realDataset.sources) {
    assert.ok(html.includes(s.domain), `Rendered DOM must include domain: ${s.domain}`);
    const escapedBrand = s.brand.replace(/&/g, '&amp;');
    assert.ok(html.includes(escapedBrand) || html.includes(s.brand), `Rendered DOM must include brand: ${s.brand}`);
    assert.ok(html.includes(s.statusBadge), `Rendered DOM must include status badge: ${s.statusBadge}`);
  }
});

// TEST 05: Strict negative pattern scan in unverified dataset and rendered DOM
runTest('TEST_05_STRICT_NEGATIVE_PATTERN_SCAN_IN_DATASET_AND_RENDERED_DOM', () => {
  const jsCode = fs.readFileSync(sotJsPath, 'utf8');
  const realDataset = JSON.parse(fs.readFileSync(radarDatasetPath, 'utf8'));

  const { sandbox, getRenderedHtml } = createMockDomEnvironment(realDataset);
  vm.createContext(sandbox);
  vm.runInContext(jsCode, sandbox);

  const html = getRenderedHtml();
  const radarSectionStart = html.indexOf('📡 Deal Discovery Radar');
  assert.ok(radarSectionStart >= 0, 'Radar section must exist in rendered HTML');
  const nextSectionStart = html.indexOf('<!-- KHU VỰC 4:', radarSectionStart);
  const radarSectionHtml = nextSectionStart >= 0 ? html.slice(radarSectionStart, nextSectionStart) : html.slice(radarSectionStart);

  for (const pattern of [...PRICE_PATTERNS, ...CODE_AND_PROMO_PATTERNS, ...COUNTDOWN_PATTERNS]) {
    const match = radarSectionHtml.match(pattern);
    assert.strictEqual(match, null, `Forbidden pattern '${match ? match[0] : ''}' leaked into rendered Radar DOM!`);
  }

  // Scan dataset fields
  for (const s of realDataset.sources) {
    if (s.status !== 'VERIFIED_CANDIDATE') {
      const textToScan = `${s.note} ${s.channelName} ${s.statusBadge} ${s.categoryLabel || ''}`;
      for (const pattern of [...PRICE_PATTERNS, ...CODE_AND_PROMO_PATTERNS, ...COUNTDOWN_PATTERNS]) {
        const match = textToScan.match(pattern);
        assert.strictEqual(match, null, `Forbidden pattern '${match ? match[0] : ''}' found in source ${s.domain}: "${textToScan}"`);
      }
    }
  }
});

// TEST 06: BHD Star neutrality: NOT_CONFIRMED_FOR_DANANG with non-overreached copy
runTest('TEST_06_BHD_STAR_NOT_CONFIRMED_FOR_DANANG_NEUTRAL_COPY', () => {
  const realDataset = JSON.parse(fs.readFileSync(radarDatasetPath, 'utf8'));
  const bhd = realDataset.sources.find(s => s.domain === 'bhdstar.vn');

  assert.ok(bhd, 'BHD Star entry missing');
  assert.strictEqual(bhd.status, 'NOT_CONFIRMED_FOR_DANANG', 'BHD status must be NOT_CONFIRMED_FOR_DANANG');
  assert.strictEqual(bhd.note.includes('không có rạp'), false, 'Must not make absolute assertion of no rạp');
  assert.ok(bhd.note.includes('Chưa xác nhận phạm vi áp dụng tại Đà Nẵng'), 'Must use neutral copy');
});

// TEST 07: Staging deployment hash parity across all instances
runTest('TEST_07_STAGING_DEPLOY_HASH_PARITY_AND_SMOKE_CHECK', () => {
  const jsonSotHash = getSha256(radarDatasetPath);
  const jsonDeployHash = getSha256(deployJsonPath);
  const jsonStagingHash = getSha256(stagingJsonPath);

  assert.strictEqual(jsonSotHash, jsonDeployHash, 'JSON hash parity SoT === Deploy failed');
  assert.strictEqual(jsonSotHash, jsonStagingHash, 'JSON hash parity SoT === Staging failed');

  const jsSotHash = getSha256(sotJsPath);
  const jsDeployHash = getSha256(deployJsPath);
  const jsStagingHash = getSha256(stagingJsPath);

  assert.strictEqual(jsSotHash, jsDeployHash, 'JS hash parity SoT === Deploy failed');
  assert.strictEqual(jsSotHash, jsStagingHash, 'JS hash parity SoT === Staging failed');
});

// TEST 08: Production invariants locked
runTest('TEST_08_PRODUCTION_INVARIANTS_LOCKED', () => {
  const feedContent = JSON.parse(fs.readFileSync(dealsFeedPath, 'utf8'));
  assert.strictEqual(feedContent.length, 0, 'Production feed must remain []');

  const releaseManifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
  assert.strictEqual(releaseManifest.governance_locks.immutable_ceo_approval_record.is_approved, false, 'is_approved must remain false');
});

console.log('\n======================================================');
if (passedTests === totalTests) {
  console.log(`🟢 [RADAR-SSOT-086V-SUMMARY] Kết quả kiểm thử: ${passedTests}/${totalTests} PASS!\n`);
} else {
  console.log(`❌ [RADAR-SSOT-086V-SUMMARY] Thất bại: ${passedTests}/${totalTests} PASS.\n`);
  process.exitCode = 1;
}
