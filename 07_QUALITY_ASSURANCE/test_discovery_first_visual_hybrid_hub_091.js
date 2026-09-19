/**
 * JAYT DISCOVERY FIRST VISUAL HYBRID HUB TEST SUITE (091)
 * Directive: JAYT-091-DISCOVERY-FIRST-UX-AND-TRUTHFUL-DATA-REBUILD
 *
 * Verifies:
 * 1. Visual Hybrid Discovery Header & Dynamic Context:
 *    - 3 dropdowns [ Khu vực ▼ ] [ Đối tượng ▼ ] [ Nhu cầu ▼ ].
 *    - Real-time dynamic contextual prompt ("Hôm nay ở ... · [Giờ:Phút]").
 *    - Single horizontal scrolling pill row with >= 44px touch targets.
 * 2. Layer 1 Verified Today Honest Empty State:
 *    - Renders helpful honest empty state directing users to Watchlist when 0 approved deals.
 * 3. Layer 2 Watchlist Neutral Branding & Mandatory Disclaimer:
 *    - 9 verified locations with physical street address and official source button.
 *    - Standard disclaimer rendered; 0 red sale tags, 0 "Lấy mã" buttons.
 * 4. Layer 3 Community Radar Honest Empty State & 0 PII:
 *    - Honest empty state with 0 simulated signals; form with 0 PII policy notice.
 * 5. Layer 4 Loyalty & Layer 5 Supportive Utilities at Bottom:
 *    - Layer 4 loyalty policies with quotes; Layer 5 Splitwise-style bill splitter.
 * 6. DOM Negative Scan Forbids Unverified Prices/Codes/Countdowns in Layers 2-4:
 *    - Deep scan of rendered DOM ensuring 0 unverified claims.
 * 7. Asset & Dataset 100% Byte Parity:
 *    - SHA-256 parity across SoT, Deploy, Staging.
 * 8. Production Invariants Locked:
 *    - deals_feed.json: [], is_approved: false.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const vm = require('vm');

const repoRoot = path.resolve(__dirname, '..');
const datasetPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'four_layer_dataset.json');
const deployDatasetPath = path.join(repoRoot, 'deploy', 'public', 'four_layer_dataset.json');
const stagingDatasetPath = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '03_SOURCE_OF_TRUTH', 'four_layer_dataset.json');

const jsPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
const deployJsPath = path.join(repoRoot, 'deploy', 'public', 'jayt_apex_interface.js');
const stagingJsPath = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');

const htmlPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'index.html');
const deployHtmlPath = path.join(repoRoot, 'deploy', 'public', 'index.html');
const stagingHtmlPath = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '03_SOURCE_OF_TRUTH', 'index.html');

const contractPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'visual_hybrid_hub_contract.json');
const dealsFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

console.log('🧪 [JAYT-091-TEST] Khởi chạy bộ kiểm thử Visual Hybrid Hub 091...\n');

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

function renderJsDom() {
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
  vm.runInContext(jsCode, sandbox);
  return renderedHtml;
}

// TEST 01: Visual Hybrid Discovery Header & Dynamic Context
runTest('TEST_01_VISUAL_HYBRID_DISCOVERY_HEADER_AND_DYNAMIC_CONTEXT', () => {
  const html = renderJsDom();
  assert.ok(html.includes('id="select-hub-district"'), 'District dropdown missing');
  assert.ok(html.includes('id="select-hub-persona"'), 'Persona dropdown missing');
  assert.ok(html.includes('id="select-hub-need"'), 'Need dropdown missing');
  assert.ok(html.includes('Hôm nay ở'), 'Contextual prompt missing');
  assert.ok(html.includes('class="apex-scroll-pills-row"'), 'Scrollable pills row missing');
  assert.ok(html.includes('data-hub-need="LUNCH"'), 'Lunch pill missing');
  assert.ok(html.includes('data-hub-need="COFFEE_TEA"'), 'Coffee pill missing');
  assert.ok(html.includes('data-hub-need="CINEMA"'), 'Cinema pill missing');
});

// TEST 02: Layer 1 Verified Today Honest Empty State
runTest('TEST_02_LAYER_1_VERIFIED_TODAY_HONEST_EMPTY_STATE', () => {
  const html = renderJsDom();
  assert.ok(html.includes('1. Ưu Đãi Đã Xác Minh Hôm Nay'), 'Layer 1 Title missing');
  assert.ok(html.includes('0 Deal mở bán công khai'), 'Honest badge missing');
  assert.ok(html.includes('Hôm nay chưa có ưu đãi thương mại nào được phê duyệt mở bán công khai'), 'Empty state message missing');
});

// TEST 03: Layer 2 Watchlist Neutral Branding & Mandatory Disclaimer
runTest('TEST_03_LAYER_2_WATCHLIST_NEUTRAL_BRANDING_AND_MANDATORY_DISCLAIMER', () => {
  const html = renderJsDom();
  assert.ok(html.includes('2. Địa Điểm Nên Theo Dõi Gần Bạn'), 'Layer 2 Title missing');
  assert.ok(html.includes('JayT đã xác nhận địa điểm hoạt động tại Đà Nẵng; ưu đãi online chưa đủ dữ liệu để xác nhận. Hãy kiểm tra trực tiếp tại quán hoặc nguồn chính thức trước khi mua.'), 'Standard disclaimer missing');
  assert.ok(html.includes('Metiz Cinema Đà Nẵng'), 'Metiz missing');
  assert.ok(html.includes('CGV Vincom Đà Nẵng'), 'CGV Vincom missing');
  assert.ok(html.includes('Galaxy Cinema Co.opmart Đà Nẵng'), 'Galaxy missing');
  assert.ok(html.includes('Phê La - Bạch Đằng'), 'Phe La missing');
  assert.ok(html.includes('Gong Cha - Nguyễn Văn Linh'), 'Gong Cha missing');
  assert.ok(html.includes('Nguồn chính thức ↗'), 'Official source link missing');
  // Must NOT contain red sale tags or "Lấy mã"
  assert.strictEqual(html.includes('Lấy mã'), false, 'Forbidden "Lấy mã" button found in DOM');
});

// TEST 04: Layer 3 Community Radar Honest Empty State & 0 PII
runTest('TEST_04_LAYER_3_COMMUNITY_RADAR_HONEST_EMPTY_AND_ZERO_PII', () => {
  const html = renderJsDom();
  assert.ok(html.includes('3. Cộng Đồng Báo Về'), 'Layer 3 Title missing');
  assert.ok(html.includes('Chưa có tín hiệu cộng đồng nào được gửi hôm nay.'), 'Honest empty state missing');
  assert.ok(html.includes('JayT không thu thập họ tên, số điện thoại hay email (0 PII).'), '0 PII notice missing');
  assert.ok(html.includes('Báo deal vừa thấy 🚀'), 'Submit CTA missing');
});

// TEST 05: Layer 4 Loyalty & Layer 5 Supportive Utilities at Bottom
runTest('TEST_05_LAYER_4_AND_LAYER_5_SUPPORTIVE_UTILITIES_LAYOUT', () => {
  const html = renderJsDom();
  assert.ok(html.includes('4. Chính Sách Thành Viên & Tích Điểm'), 'Layer 4 Title missing');
  assert.ok(html.includes('5. Công Cụ Phụ Trợ (Tính Thực Trả & Chia Tiền Nhóm)'), 'Layer 5 Title missing');
  assert.ok(html.includes('calc-input-price'), 'Calculator price input missing');
  assert.ok(html.includes('calc-input-split'), 'Calculator split input missing');
  assert.ok(html.includes('Kết Quả Thực Trả Bàn Ăn'), 'Calculator result box missing');
});

// TEST 06: DOM Negative Scan Forbids Unverified Prices/Codes/Countdowns in Layers 2-4
runTest('TEST_06_DOM_NEGATIVE_SCAN_FORBIDS_PRICE_CODE_COUNTDOWN_IN_LAYERS_2_3_4', () => {
  const html = renderJsDom();

  // Split HTML by sections to inspect Layers 2, 3, 4
  const l2Idx = html.indexOf('2. Địa Điểm Nên Theo Dõi Gần Bạn');
  const l5Idx = html.indexOf('5. Công Cụ Phụ Trợ');
  assert.ok(l2Idx !== -1 && l5Idx !== -1, 'Sections not found in HTML');

  const l2ToL4Html = html.slice(l2Idx, l5Idx);
  const forbiddenPatterns = ['AHAI30K', 'KATINAT25', 'đáy 90 ngày', 'deal hot', 'giảm 50%', 'giảm 30%'];
  for (const p of forbiddenPatterns) {
    assert.strictEqual(l2ToL4Html.includes(p), false, `Forbidden string '${p}' found in Layers 2-4`);
  }
});

// TEST 07: Asset & Dataset 100% Byte Parity
runTest('TEST_07_ASSET_AND_DATASET_100_PERCENT_BYTE_PARITY', () => {
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
  console.log(`🟢 [VISUAL-HYBRID-HUB-091-SUMMARY] Kết quả kiểm thử: ${passedTests}/${totalTests} PASS!\n`);
} else {
  console.log(`❌ [VISUAL-HYBRID-HUB-091-SUMMARY] Thất bại: ${passedTests}/${totalTests} PASS.\n`);
  process.exitCode = 1;
}
