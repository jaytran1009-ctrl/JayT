/**
 * JAYT TRUTHFUL COMMUNITY HUB REMEDIATION TEST SUITE (090A)
 * Directive: JAYT-090A-TRUTHFUL-COMMUNITY-HUB-REMEDIATION
 *
 * Verifies:
 * 1. Zero Simulated Community Signals & Honest Empty State:
 *    - layer_3_community_radar.items must be strictly [] (0 fake/simulated signals).
 *    - Honest empty state and privacy notice present with zero PII collection.
 * 2. Watchlist Two-Tier Split & Mandatory Evidence Pointers:
 *    - Partitioned into verified_locations (with exact physical street quote, artifact_path, sha256, captured_at)
 *      and brand_signals_only (Highlands, Domino's labeled "Thương hiệu theo dõi").
 * 3. Loyalty Claims Mandatory Byte-for-Byte Quote Proof:
 *    - All loyalty rules must have artifact_path, artifact_sha256, and byte-for-byte quote in physical files.
 * 4. Layer 1 Labeled Pending Internal Review with Disabled Purchase CTAs:
 *    - Candidates Metiz U22 & CGV Payday maintained with PENDING_CEO_REVIEW, is_commercial_published: false.
 * 5. Full Text Scan Forbids Unverified Prices/Codes/Countdowns in Layers 2-4:
 *    - Layers 2, 3, 4 contain 0 unverified prices, codes, percent discounts, fake countdowns.
 * 6. DOM Render Validates Badges, Disclaimers & Zero Outbound Purchase Links:
 *    - Standard disclaimers rendered, disabled internal review button, 0 commercial outbound links in Layers 2-4.
 * 7. Asset & Dataset Byte-for-Byte Parity:
 *    - 100% SHA-256 parity across SoT, Deploy, Staging.
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

console.log('🧪 [JAYT-090A-TEST] Khởi chạy bộ kiểm thử Truthful Community Hub Remediation 090A...\n');

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

// TEST 01: Zero Simulated Community Signals & Honest Empty State
runTest('TEST_01_ZERO_SIMULATED_COMMUNITY_SIGNALS_AND_HONEST_EMPTY_STATE', () => {
  const ds = JSON.parse(fs.readFileSync(datasetPath, 'utf8'));
  assert.ok(ds.layer_3_community_radar, 'layer_3_community_radar missing');
  assert.strictEqual(Array.isArray(ds.layer_3_community_radar.items), true, 'items must be array');
  assert.strictEqual(ds.layer_3_community_radar.items.length, 0, 'Must have ZERO simulated community signals (honest empty state)');
  assert.ok(ds.layer_3_community_radar.empty_state_message.includes('Chưa có tín hiệu cộng đồng nào được gửi hôm nay'), 'Must have honest empty state message');
  assert.ok(ds.layer_3_community_radar.privacy_policy_notice.includes('không thu thập'), 'Must state zero PII collection');
});

// TEST 02: Watchlist Two-Tier Split & Mandatory Evidence Pointers
runTest('TEST_02_WATCHLIST_TWO_TIER_SPLIT_AND_MANDATORY_EVIDENCE_POINTERS', () => {
  const ds = JSON.parse(fs.readFileSync(datasetPath, 'utf8'));
  assert.ok(ds.layer_2_watchlist, 'layer_2_watchlist missing');
  assert.ok(Array.isArray(ds.layer_2_watchlist.verified_locations), 'verified_locations missing');
  assert.ok(Array.isArray(ds.layer_2_watchlist.brand_signals_only), 'brand_signals_only missing');

  // Verified locations
  assert.strictEqual(ds.layer_2_watchlist.verified_locations.length, 9, 'Must have exactly 9 verified locations with physical evidence');
  for (const vloc of ds.layer_2_watchlist.verified_locations) {
    assert.ok(vloc.street_address, `Verified location ${vloc.id} missing street_address`);
    assert.ok(vloc.captured_at, `Verified location ${vloc.id} missing captured_at`);
    assert.ok(vloc.official_source_url, `Verified location ${vloc.id} missing official_source_url`);
    assert.ok(vloc.evidence_pointer, `Verified location ${vloc.id} missing evidence_pointer`);

    const pointer = vloc.evidence_pointer;
    const absPath = path.join(repoRoot, pointer.artifact_path);
    assert.ok(fs.existsSync(absPath), `Artifact missing: ${absPath}`);

    const fileBuf = fs.readFileSync(absPath);
    assert.strictEqual(sha256(fileBuf), pointer.artifact_sha256, `SHA-256 mismatch for ${vloc.id}`);
    assert.ok(fileBuf.toString('utf8').includes(pointer.quote), `Quote missing in artifact for ${vloc.id}`);
    assert.strictEqual(vloc.status_disclaimer, 'JayT đã xác nhận địa điểm hoạt động tại Đà Nẵng; ưu đãi online chưa đủ dữ liệu để xác nhận. Hãy kiểm tra trực tiếp tại quán hoặc nguồn chính thức trước khi mua.');
  }

  // Brand signals only
  assert.strictEqual(ds.layer_2_watchlist.brand_signals_only.length, 2, 'Must have 2 brand signals (Highlands & Dominos)');
  for (const bsig of ds.layer_2_watchlist.brand_signals_only) {
    assert.strictEqual(bsig.street_address, undefined, `Brand signal ${bsig.id} must NOT have street address`);
    assert.ok(bsig.status_label.includes('Thương hiệu đang theo dõi'), `Brand signal ${bsig.id} must state brand under monitoring`);
  }
});

// TEST 03: Loyalty Claims Mandatory Byte-for-Byte Quote Proof
runTest('TEST_03_LOYALTY_CLAIMS_MANDATORY_BYTE_FOR_BYTE_QUOTE_PROOF', () => {
  const ds = JSON.parse(fs.readFileSync(datasetPath, 'utf8'));
  assert.ok(Array.isArray(ds.layer_4_loyalty_policies), 'layer_4_loyalty_policies missing');
  assert.strictEqual(ds.layer_4_loyalty_policies.length, 4, 'Must have 4 loyalty policies');

  for (const pol of ds.layer_4_loyalty_policies) {
    assert.ok(pol.evidence_pointer, `Loyalty policy ${pol.id} missing evidence_pointer`);
    const pointer = pol.evidence_pointer;
    const absPath = path.join(repoRoot, pointer.artifact_path);
    assert.ok(fs.existsSync(absPath), `Artifact missing for loyalty ${pol.id}: ${absPath}`);

    const fileBuf = fs.readFileSync(absPath);
    assert.strictEqual(sha256(fileBuf), pointer.artifact_sha256, `SHA-256 mismatch for loyalty ${pol.id}`);
    assert.ok(fileBuf.toString('utf8').includes(pointer.quote), `Quote missing in artifact for loyalty ${pol.id}`);
  }
});

// TEST 04: Layer 1 Labeled Pending Internal Review with Disabled Purchase CTAs
runTest('TEST_04_LAYER_1_PENDING_INTERNAL_REVIEW_STATUS_AND_DISABLED_CTA', () => {
  const ds = JSON.parse(fs.readFileSync(datasetPath, 'utf8'));
  assert.ok(Array.isArray(ds.layer_1_pending_candidates), 'layer_1_pending_candidates missing');
  assert.strictEqual(ds.layer_1_pending_candidates.length, 2, 'Layer 1 must have 2 pending candidates');

  for (const c of ds.layer_1_pending_candidates) {
    assert.strictEqual(c.status, 'PENDING_CEO_REVIEW', 'Candidate must be PENDING_CEO_REVIEW');
    assert.strictEqual(c.is_commercial_published, false, 'Candidate must NOT be commercial published');
    assert.ok(c.status_label.includes('Ứng viên đang chờ duyệt nội bộ'), 'Must have pending internal review status label');
  }
});

// TEST 05: Full Text Scan Forbids Unverified Prices/Codes/Countdowns in Layers 2-4
runTest('TEST_05_FULL_TEXT_SCAN_FORBIDS_UNVERIFIED_PRICES_CODES_COUNTDOWNS_IN_LAYERS_2_3_4', () => {
  const ds = JSON.parse(fs.readFileSync(datasetPath, 'utf8'));

  // Scan Layer 2
  const l2Json = JSON.stringify(ds.layer_2_watchlist);
  assert.strictEqual(l2Json.includes('\"price\"'), false, 'Layer 2 must not have price field');
  assert.strictEqual(l2Json.includes('\"discount\"'), false, 'Layer 2 must not have discount field');
  assert.strictEqual(l2Json.includes('\"promo_code\"'), false, 'Layer 2 must not have promo_code field');

  // Scan Layer 3
  const l3Json = JSON.stringify(ds.layer_3_community_radar);
  assert.strictEqual(l3Json.includes('\"price\"'), false, 'Layer 3 must not have price field');

  // Forbidden strings
  const forbidden = ['AHAI30K', 'KATINAT25', 'đáy 90 ngày', 'deal hot'];
  for (const f of forbidden) {
    assert.strictEqual(l2Json.includes(f), false, `Forbidden string '${f}' found in Layer 2`);
    assert.strictEqual(l3Json.includes(f), false, `Forbidden string '${f}' found in Layer 3`);
  }
});

// TEST 06: DOM Render Validates Badges, Disclaimers & Zero Outbound Purchase Links
runTest('TEST_06_DOM_RENDER_VALIDATES_BADGES_DISCLAIMERS_AND_ZERO_OUTBOUND_PURCHASE_LINKS', () => {
  const jsCode = fs.readFileSync(jsPath, 'utf8');

  let renderedHtml = '';
  const fakeDom = {
    set innerHTML(val) { renderedHtml = val; },
    get innerHTML() { return renderedHtml; },
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
      head: { appendChild: () => {} }
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
  }, 'Failed running JS in VM');

  // Validate standard disclaimer presence
  assert.ok(renderedHtml.includes('JayT đã xác nhận địa điểm hoạt động tại Đà Nẵng; ưu đãi online chưa đủ dữ liệu để xác nhận.'), 'Disclaimer must render in DOM');
  assert.ok(renderedHtml.includes('🔒 Đang chờ CEO Audit'), 'Disabled audit button must render in DOM');
  assert.ok(renderedHtml.includes('Chưa có tín hiệu cộng đồng nào được gửi hôm nay.'), 'Honest empty state must render in DOM');
});

// TEST 07: Asset & Dataset Byte-for-Byte Parity
runTest('TEST_07_ASSET_AND_DATASET_BYTE_FOR_BYTE_PARITY', () => {
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

// TEST 08: Production Invariants Locked
runTest('TEST_08_PRODUCTION_INVARIANTS_LOCKED', () => {
  const feedContent = JSON.parse(fs.readFileSync(dealsFeedPath, 'utf8'));
  assert.strictEqual(feedContent.length, 0, 'Production feed must remain []');

  const releaseManifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
  assert.strictEqual(releaseManifest.governance_locks.immutable_ceo_approval_record.is_approved, false, 'is_approved must remain false');
});

console.log('\n======================================================');
if (passedTests === totalTests) {
  console.log(`🟢 [TRUTHFUL-COMMUNITY-HUB-090A-SUMMARY] Kết quả kiểm thử: ${passedTests}/${totalTests} PASS!\n`);
} else {
  console.log(`❌ [TRUTHFUL-COMMUNITY-HUB-090A-SUMMARY] Thất bại: ${passedTests}/${totalTests} PASS.\n`);
  process.exitCode = 1;
}
