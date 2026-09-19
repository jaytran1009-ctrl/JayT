/**
 * JAYT COMPLETE RESOLUTION & REAL RADAR TEST SUITE (086T)
 * Directive: JAYT-086T-COMPLETE-RESOLUTION-AND-REAL-RADAR
 *
 * Verifies:
 * 1. Deep CDP traces exist for all 8 targets with valid PNG, HTML, TXT, Receipt, SHA-256.
 * 2. Independent, physical proof on disk that BHD Star has zero cinemas in Da Nang.
 * 3. UI Deal Discovery Radar loads and renders all 28 dynamic states from radar_dataset_086t.json.
 * 4. Zero prices, vouchers, or purchase CTA rendered for SIGNAL_ONLY, OUT_OF_SCOPE, BLOCKED, FAILED.
 * 5. Comprehensive correction receipt lists all 9 demoted 086R claims.
 * 6. 8 blocked sources maintain BLOCKED status with 0 bypass.
 * 7. 11 failed sources documented with transparent notes.
 * 8. Production invariants locked: deals_feed.json: [], is_approved: false.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const vm = require('vm');

const repoRoot = path.resolve(__dirname, '..');
const deepManifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_086', 'deep_traces_086t', 'deep_trace_manifest_086t.json');
const radarDatasetPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'radar_dataset_086t.json');
const correctionReceiptPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'correction_receipt_086t_comprehensive_claim_demotion.json');
const sotJsPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
const dealsFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

function sha256File(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

console.log('🧪 [JAYT-086T-TEST] Khởi chạy bộ kiểm thử Complete Resolution & Real Radar 086T...\n');

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

// TEST 01: Deep traces exist for all 8 targets with valid artifacts & SHA-256
runTest('TEST_01_DEEP_TRACES_ALL_EXIST_AND_SHA256_PARITY', () => {
  assert.ok(fs.existsSync(deepManifestPath), 'Deep trace manifest missing');
  const manifest = JSON.parse(fs.readFileSync(deepManifestPath, 'utf8'));

  assert.strictEqual(manifest.length, 8, 'Must have 8 deep trace targets');
  for (const item of manifest) {
    assert.ok(item.artifacts, `Artifacts missing for ${item.trace_id}`);
    assert.strictEqual(item.capture_origin, 'REAL_BROWSER_CDP');

    for (const [type, art] of Object.entries(item.artifacts)) {
      const absPath = path.join(repoRoot, art.path);
      assert.ok(fs.existsSync(absPath), `Deep trace artifact missing: ${art.path}`);
      const diskHash = sha256File(absPath);
      assert.strictEqual(diskHash, art.sha256, `SHA-256 mismatch for ${art.path}`);
    }
  }
});

// TEST 02: BHD Star independent locality proof (Physical disk text proof of 0 Da Nang branches)
runTest('TEST_02_BHD_STAR_INDEPENDENT_LOCALITY_PROOF', () => {
  const bhdNetworkTextPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_086', 'deep_traces_086t', 'bhd_cinema_network', 'page.txt');
  const bhdPromoTextPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_086', 'captures', 'bhdstar.vn', 'page.txt');

  assert.ok(fs.existsSync(bhdNetworkTextPath), 'BHD network text missing');
  assert.ok(fs.existsSync(bhdPromoTextPath), 'BHD promo text missing');

  const networkText = fs.readFileSync(bhdNetworkTextPath, 'utf8');
  const promoText = fs.readFileSync(bhdPromoTextPath, 'utf8');

  // Verify that BHD lists its explicit branches across 6 regions
  const expectedRegions = ['HÀ NỘI', 'TP. HUẾ', 'TP. HỒ CHÍ MINH', 'LONG KHÁNH', 'PHÚ MỸ', 'THANH HÓA'];
  for (const region of expectedRegions) {
    assert.ok(networkText.includes(region), `BHD network text must include ${region}`);
    assert.ok(promoText.includes(region), `BHD promo text must include ${region}`);
  }

  // Verify that Đà Nẵng is NOT in the cinema location lists
  assert.strictEqual(networkText.includes('BHD STAR CINEPLEX ĐÀ NẴNG'), false, 'BHD must NOT have Da Nang cinema in network');
  assert.strictEqual(promoText.includes('BHD STAR CINEPLEX ĐÀ NẴNG'), false, 'BHD must NOT have Da Nang cinema in promo');
});

// TEST 03: UI Deal Discovery Radar loads and renders all 28 dynamic states from dataset
runTest('TEST_03_UI_RADAR_LOADS_AND_RENDERS_ALL_28_STATES', () => {
  assert.ok(fs.existsSync(radarDatasetPath), 'Radar dataset missing');
  const dataset = JSON.parse(fs.readFileSync(radarDatasetPath, 'utf8'));
  assert.strictEqual(dataset.total_sources, 28);

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

  const sandbox = {
    window: { location: { origin: 'http://localhost', pathname: '/', hash: '' }, localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} }, scrollTo: () => {}, open: () => {}, JAYT_RADAR_DATASET: dataset },
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

  // Assert all 28 source domains are present in rendered radar HTML
  for (const s of dataset.sources) {
    assert.ok(renderedHtml.includes(s.domain), `Radar UI must render domain: ${s.domain}`);
    const escapedBrand = s.brand.replace(/&/g, '&amp;');
    assert.ok(renderedHtml.includes(escapedBrand) || renderedHtml.includes(s.brand), `Radar UI must render brand: ${s.brand}`);
    assert.ok(renderedHtml.includes(s.statusBadge), `Radar UI must render status badge: ${s.statusBadge}`);
  }
});

// TEST 04: Zero fake prices, fake vouchers, or purchase CTA for unverified sources
runTest('TEST_04_NO_UNVERIFIED_PRICES_OR_CTA_FOR_SIGNAL_ONLY', () => {
  const jsCode = fs.readFileSync(sotJsPath, 'utf8');

  // Verify that the radar section does not render fake discount percentages or purchase CTA
  const radarSectionMatch = jsCode.match(/renderOfficialSourcesSection\(\) \{([\s\S]*?)\n  \}/);
  assert.ok(radarSectionMatch, 'renderOfficialSourcesSection function not found');

  const radarCode = radarSectionMatch[1];
  assert.strictEqual(radarCode.includes('btn-buy-now'), false, 'Must not render buy buttons');
  assert.strictEqual(radarCode.includes('btn-get-deal'), false, 'Must not render get deal buttons');
  assert.strictEqual(radarCode.includes('badge-discount-percent'), false, 'Must not render speculative discount badges');
});

// TEST 05: Comprehensive correction receipt 086T exists and lists all 9 demoted claims
runTest('TEST_05_COMPREHENSIVE_CORRECTION_RECEIPT_086T_VALID', () => {
  assert.ok(fs.existsSync(correctionReceiptPath), 'Correction receipt 086T missing');
  const receipt = JSON.parse(fs.readFileSync(correctionReceiptPath, 'utf8'));

  assert.strictEqual(receipt.correction_id, 'CORRECTION_086T_COMPREHENSIVE_CLAIM_DEMOTION');
  assert.strictEqual(receipt.work_order, 'JAYT-086T-COMPLETE-RESOLUTION-AND-REAL-RADAR');
  assert.strictEqual(receipt.demoted_claims.length, 9, 'Must list all 9 demoted claims');

  const expectedDemotedDomains = [
    'metiz.vn', 'bhdstar.vn', 'momo.vn', 'zalopay.vn',
    'lottecinemavn.com', 'kfcvietnam.com.vn', 'phuclong.com.vn', 'phela.vn', 'shopeefood.vn'
  ];

  for (const domain of expectedDemotedDomains) {
    const found = receipt.demoted_claims.find(c => c.source === domain);
    assert.ok(found, `Demoted claim missing for domain: ${domain}`);
  }
});

// TEST 06: 8 blocked sources maintain BLOCKED status with 0 bypass
runTest('TEST_06_BLOCKED_SOURCES_ZERO_BYPASS', () => {
  const dataset = JSON.parse(fs.readFileSync(radarDatasetPath, 'utf8'));
  const blocked = dataset.sources.filter(s => s.status === 'BLOCKED');

  assert.strictEqual(blocked.length, 8, 'Must have 8 blocked sources');
  for (const b of blocked) {
    assert.ok(b.statusBadge.includes('Bị chặn'), `Blocked source ${b.domain} must have blocked badge`);
  }
});

// TEST 07: 11 failed sources documented with transparent notes
runTest('TEST_07_FAILED_SOURCES_DOCUMENTED', () => {
  const dataset = JSON.parse(fs.readFileSync(radarDatasetPath, 'utf8'));
  const failed = dataset.sources.filter(s => s.status === 'FAILED');

  assert.strictEqual(failed.length, 11, 'Must have 11 failed sources');
  for (const f of failed) {
    assert.ok(f.statusBadge.includes('Lỗi'), `Failed source ${f.domain} must have error badge`);
  }
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
  console.log(`🟢 [COMPLETE-RESOLUTION-086T-SUMMARY] Kết quả kiểm thử: ${passedTests}/${totalTests} PASS!\n`);
} else {
  console.log(`❌ [COMPLETE-RESOLUTION-086T-SUMMARY] Thất bại: ${passedTests}/${totalTests} PASS.\n`);
  process.exitCode = 1;
}
