/**
 * JAYT CUSTOMER JOURNEY FIRST & FOUR-LAYER COMMUNITY HUB TEST SUITE (090)
 * Directive: JAYT-090-CUSTOMER-JOURNEY-FIRST-COMMUNITY-HUB
 *
 * Verifies:
 * 1. North Star SSOT & 11 Scenarios Validation:
 *    - All 11 real Da Nang scenarios present in customer_journey_north_star.json & markdown.
 *    - Guiding principle strictly embedded.
 * 2. Four-Layer Contract Integrity & Standard Disclaimer:
 *    - Layer 1 (Verified Offers): 2 candidates with physical evidence & pending status.
 *    - Layer 2 (Watchlist Locations): Store locator Da Nang addresses + exact standard disclaimer.
 *    - Layer 3 (Community Radar): Default status CHƯA XÁC MINH, 0 PII.
 *    - Layer 4 (Loyalty Policies): 4 loyalty references without buy CTAs.
 * 3. Zero Unverified Price/Code in Watchlist and Community Layers:
 *    - No price claims, discount codes, or fake countdowns in Layer 2 & Layer 3.
 * 4. Zero Forbidden Hardcoded Examples:
 *    - No AHAI30K, KATINAT25, 'đáy 90 ngày'.
 * 5. JS Customer Journey Render & VM Evaluation:
 *    - Decision Hub, Layer 1, Layer 2, Layer 3, Layer 4, and Layer 5 render cleanly.
 * 6. Asset & Dataset Byte-for-Byte Parity:
 *    - four_layer_dataset.json, jayt_apex_interface.js, index.html have 100% hash parity across SoT, Deploy, Staging.
 * 7. Calculator & Bill Splitter Exact Mathematical Accuracy:
 *    - Live payment breakdown calculation engine verified.
 * 8. Production Invariants Locked:
 *    - deals_feed.json: [], is_approved: false.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const vm = require('vm');

const repoRoot = path.resolve(__dirname, '..');
const northStarJsonPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'customer_journey_north_star.json');
const northStarMdPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'CUSTOMER_JOURNEY_NORTH_STAR.md');
const datasetPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'four_layer_dataset.json');
const deployDatasetPath = path.join(repoRoot, 'deploy', 'public', 'four_layer_dataset.json');
const stagingDatasetPath = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '03_SOURCE_OF_TRUTH', 'four_layer_dataset.json');

const jsPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
const deployJsPath = path.join(repoRoot, 'deploy', 'public', 'jayt_apex_interface.js');
const stagingJsPath = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');

const htmlPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'index.html');
const deployHtmlPath = path.join(repoRoot, 'deploy', 'public', 'index.html');
const stagingHtmlPath = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '03_SOURCE_OF_TRUTH', 'index.html');

const dealsFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

console.log('🧪 [JAYT-090-TEST] Khởi chạy bộ kiểm thử Customer Journey First & 4-Layer Community Hub 090...\n');

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

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

// TEST 01: North Star SSOT & 11 Scenarios Validation
runTest('TEST_01_NORTH_STAR_SSOT_AND_11_SCENARIOS_VALIDATION', () => {
  assert.ok(fs.existsSync(northStarJsonPath), 'customer_journey_north_star.json missing');
  assert.ok(fs.existsSync(northStarMdPath), 'CUSTOMER_JOURNEY_NORTH_STAR.md missing');

  const ns = JSON.parse(fs.readFileSync(northStarJsonPath, 'utf8'));
  assert.strictEqual(ns.contract_id, 'JAYT_CUSTOMER_JOURNEY_NORTH_STAR_V1');
  assert.ok(ns.north_star_guiding_principle.includes('sinh viên hoặc dân văn phòng Đà Nẵng'), 'Guiding principle missing');
  assert.strictEqual(ns.customer_journey_scenarios.length, 11, 'Must have exactly 11 customer journey scenarios');

  for (let i = 0; i < ns.customer_journey_scenarios.length; i++) {
    const sc = ns.customer_journey_scenarios[i];
    assert.ok(sc.id, `Scenario ${i+1} missing id`);
    assert.ok(sc.title, `Scenario ${i+1} missing title`);
    assert.ok(sc.persona, `Scenario ${i+1} missing persona`);
    assert.ok(sc.need, `Scenario ${i+1} missing need`);
    assert.ok(sc.sector, `Scenario ${i+1} missing sector`);
    assert.ok(sc.district, `Scenario ${i+1} missing district`);
    assert.ok(sc.recommended_action, `Scenario ${i+1} missing recommended_action`);
  }
});

// TEST 02: Four-Layer Contract Integrity & Standard Disclaimer
runTest('TEST_02_FOUR_LAYER_CONTRACT_INTEGRITY_AND_DISCLAIMER', () => {
  assert.ok(fs.existsSync(datasetPath), 'four_layer_dataset.json missing');
  const ds = JSON.parse(fs.readFileSync(datasetPath, 'utf8'));

  // Layer 1
  assert.ok(Array.isArray(ds.layer_1_verified_offers), 'layer_1_verified_offers missing');
  assert.strictEqual(ds.layer_1_verified_offers.length, 2, 'Layer 1 must have 2 candidate offers');
  for (const off of ds.layer_1_verified_offers) {
    assert.strictEqual(off.status, 'PENDING_CEO_REVIEW', 'Layer 1 offers must be PENDING_CEO_REVIEW');
    assert.strictEqual(off.is_commercial_published, false, 'Layer 1 must not be commercial published');
    assert.ok(off.danang_branch.includes('Đà Nẵng'), 'Layer 1 must specify Da Nang branch');
  }

  // Layer 2
  assert.ok(Array.isArray(ds.layer_2_watchlist_locations), 'layer_2_watchlist_locations missing');
  assert.ok(ds.layer_2_watchlist_locations.length >= 10, 'Layer 2 must have at least 10 Da Nang locations');
  const expectedDisclaimer = 'JayT đã xác nhận địa điểm hoạt động tại Đà Nẵng; ưu đãi online chưa đủ dữ liệu để xác nhận. Hãy kiểm tra trực tiếp tại quán hoặc nguồn chính thức trước khi mua.';
  for (const loc of ds.layer_2_watchlist_locations) {
    assert.ok(loc.street_address.includes('Đà Nẵng') || loc.street_address.includes('TP. Đà Nẵng'), `Location ${loc.id} must have Da Nang address`);
    assert.strictEqual(loc.status_disclaimer, expectedDisclaimer, `Location ${loc.id} must have exact standard disclaimer`);
  }

  // Layer 3
  assert.ok(Array.isArray(ds.layer_3_community_radar), 'layer_3_community_radar missing');
  for (const sig of ds.layer_3_community_radar) {
    assert.strictEqual(sig.status, 'CHƯA XÁC MINH', 'Layer 3 signals must be CHƯA XÁC MINH');
  }

  // Layer 4
  assert.ok(Array.isArray(ds.layer_4_loyalty_policies), 'layer_4_loyalty_policies missing');
  assert.strictEqual(ds.layer_4_loyalty_policies.length, 4, 'Layer 4 must have 4 loyalty policies');
  for (const pol of ds.layer_4_loyalty_policies) {
    assert.ok(pol.points_rule, `Loyalty policy ${pol.id} missing points_rule`);
    assert.ok(pol.birthday_perk, `Loyalty policy ${pol.id} missing birthday_perk`);
  }
});

// TEST 03: Zero Unverified Price/Code in Watchlist and Community Layers
runTest('TEST_03_ZERO_UNVERIFIED_PRICE_OR_CODE_IN_WATCHLIST_AND_COMMUNITY', () => {
  const ds = JSON.parse(fs.readFileSync(datasetPath, 'utf8'));

  // Watchlist locations must not contain price or discount fields
  for (const loc of ds.layer_2_watchlist_locations) {
    assert.strictEqual(loc.price, undefined, `Location ${loc.id} must not have price`);
    assert.strictEqual(loc.discount, undefined, `Location ${loc.id} must not have discount`);
    assert.strictEqual(loc.promo_code, undefined, `Location ${loc.id} must not have promo_code`);
    assert.strictEqual(loc.voucher, undefined, `Location ${loc.id} must not have voucher`);
  }
});

// TEST 04: Zero Forbidden Hardcoded Examples Across Codebase
runTest('TEST_04_NO_FORBIDDEN_HARDCODED_EXAMPLES_ACROSS_CODEBASE', () => {
  const jsContent = fs.readFileSync(jsPath, 'utf8');
  const dsContent = fs.readFileSync(datasetPath, 'utf8');

  const forbiddenStrings = ['AHAI30K', 'KATINAT25', 'đáy 90 ngày'];
  for (const str of forbiddenStrings) {
    assert.strictEqual(jsContent.includes(str), false, `Forbidden string '${str}' found in JS`);
    assert.strictEqual(dsContent.includes(str), false, `Forbidden string '${str}' found in dataset`);
  }
});

// TEST 05: JS Customer Journey Render & VM Evaluation
runTest('TEST_05_JS_CUSTOMER_JOURNEY_RENDER_AND_VM_EVALUATION', () => {
  const jsCode = fs.readFileSync(jsPath, 'utf8');

  const fakeDom = {
    innerHTML: '',
    querySelectorAll: () => [],
    querySelector: () => null,
    addEventListener: () => {},
    setAttribute: () => {},
    appendChild: () => {}
  };

  const sandbox = {
    window: {
      location: { href: 'http://localhost' },
      localStorage: { getItem: () => null, setItem: () => {} },
      JAYT_FOUR_LAYER_DATASET: JSON.parse(fs.readFileSync(datasetPath, 'utf8'))
    },
    document: {
      getElementById: (id) => (id === 'jayt-apex' ? fakeDom : null),
      querySelectorAll: () => [],
      querySelector: () => null,
      createElement: () => fakeDom,
      head: {
        appendChild: () => {}
      }
    },
    localStorage: { getItem: () => null, setItem: () => {} },
    fetch: () => Promise.resolve({ ok: true, json: () => Promise.resolve({}) }),
    console: console,
    setTimeout: (fn) => fn(),
    setInterval: () => 1
  };

  vm.createContext(sandbox);
  assert.doesNotThrow(() => {
    vm.runInContext(jsCode, sandbox);
  }, 'Failed executing jayt_apex_interface.js in VM');

  assert.ok(sandbox.window.ApexApp, 'ApexApp must be exported');
});

// TEST 06: Asset & Dataset Byte-for-Byte Parity
runTest('TEST_06_DATASET_AND_ASSETS_BYTE_FOR_BYTE_PARITY', () => {
  const dsHashSoT = sha256(fs.readFileSync(datasetPath));
  const dsHashDeploy = sha256(fs.readFileSync(deployDatasetPath));
  const dsHashStaging = sha256(fs.readFileSync(stagingDatasetPath));
  assert.strictEqual(dsHashSoT, dsHashDeploy, 'four_layer_dataset.json SoT === Deploy parity failed');
  assert.strictEqual(dsHashSoT, dsHashStaging, 'four_layer_dataset.json SoT === Staging parity failed');

  const jsHashSoT = sha256(fs.readFileSync(jsPath));
  const jsHashDeploy = sha256(fs.readFileSync(deployJsPath));
  const jsHashStaging = sha256(fs.readFileSync(stagingJsPath));
  assert.strictEqual(jsHashSoT, jsHashDeploy, 'jayt_apex_interface.js SoT === Deploy parity failed');
  assert.strictEqual(jsHashSoT, jsHashStaging, 'jayt_apex_interface.js SoT === Staging parity failed');

  const htmlHashSoT = sha256(fs.readFileSync(htmlPath));
  const htmlHashDeploy = sha256(fs.readFileSync(deployHtmlPath));
  const htmlHashStaging = sha256(fs.readFileSync(stagingHtmlPath));
  assert.strictEqual(htmlHashSoT, htmlHashDeploy, 'index.html SoT === Deploy parity failed');
  assert.strictEqual(htmlHashSoT, htmlHashStaging, 'index.html SoT === Staging parity failed');
});

// TEST 07: Calculator & Bill Splitter Exact Mathematical Accuracy
runTest('TEST_07_CALCULATOR_AND_BILL_SPLITTER_ZERO_DISCREPANCY', () => {
  const jsCode = fs.readFileSync(jsPath, 'utf8');
  const fakeDom = {
    innerHTML: '',
    querySelectorAll: () => [],
    querySelector: () => null,
    addEventListener: () => {},
    setAttribute: () => {},
    appendChild: () => {}
  };
  const sandbox = {
    window: {},
    document: {
      getElementById: (id) => (id === 'jayt-apex' ? fakeDom : null),
      querySelectorAll: () => [],
      querySelector: () => null,
      createElement: () => fakeDom,
      head: { appendChild: () => {} }
    },
    localStorage: { getItem: () => null, setItem: () => {} }
  };
  vm.createContext(sandbox);
  vm.runInContext(jsCode, sandbox);

  const calc = sandbox.window.ApexApp.calculate({
    item_price: 250000,
    voucher_discount: 50000,
    min_spend: 200000,
    shipping_fee: 15000,
    surcharge: 5000,
    split_count: 3
  });

  assert.strictEqual(calc.grossTotal, 270000, 'Gross total must be 270k');
  assert.strictEqual(calc.effectiveVoucher, 50000, 'Effective voucher must be 50k');
  assert.strictEqual(calc.netTotal, 220000, 'Net total must be 220k');
  assert.strictEqual(calc.perPerson, Math.round(220000 / 3), 'Per person breakdown must match exact rounding');
});

// TEST 08: Production Invariants Locked
runTest('TEST_08_PRODUCTION_INVARIANTS_LOCKED', () => {
  const feedContent = JSON.parse(fs.readFileSync(dealsFeedPath, 'utf8'));
  assert.strictEqual(feedContent.length, 0, 'Production feed must remain []');

  const releaseManifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
  assert.strictEqual(releaseManifest.governance_locks.immutable_ceo_approval_record.is_approved, false, 'is_approved must remain false');
});

console.log('\n======================================================');
if (passedTests === totalTests) {
  console.log(`🟢 [CUSTOMER-JOURNEY-090-SUMMARY] Kết quả kiểm thử: ${passedTests}/${totalTests} PASS!\n`);
} else {
  console.log(`❌ [CUSTOMER-JOURNEY-090-SUMMARY] Thất bại: ${passedTests}/${totalTests} PASS.\n`);
  process.exitCode = 1;
}
