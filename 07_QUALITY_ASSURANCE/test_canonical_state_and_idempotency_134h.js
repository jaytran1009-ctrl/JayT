const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

console.log('========================================================================');
console.log('🔍 JAYT-134H: CANONICAL STATE, IDEMPOTENCY & HASH-TRUTH AUDIT');
console.log('========================================================================\n');

const repoRoot = path.resolve(__dirname, '..');
const fourLayerPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'four_layer_dataset.json');
const jsPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
const htmlPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'index.html');
const memoryPath = path.join(repoRoot, 'PROJECT_MEMORY.md');
const receipt134hPath = path.join(repoRoot, '08_RELEASE_VAULT', 'DISCLOSURE_RECEIPT_JAYT_134H_IDEMPOTENCY_AND_HASH_TRUTH.json');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

const { applyProjectMemoryTransaction067 } = require('./memory_transaction_manager_057');

const dataset = JSON.parse(fs.readFileSync(fourLayerPath, 'utf8'));
const jsCode = fs.readFileSync(jsPath, 'utf8');
const htmlCode = fs.readFileSync(htmlPath, 'utf8');
const memory = fs.readFileSync(memoryPath, 'utf8');
const receipt134h = JSON.parse(fs.readFileSync(receipt134hPath, 'utf8'));

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

console.log('--- GATE 1: SINGLE CANONICAL CURRENT TRUTH HEADER AT TOP OF MEMORY ---');
test('PROJECT_MEMORY.md contains exactly ONE Current Lifecycle State header matching canonical 134H state', () => {
  const lines = memory.split('\n');
  const currentStateLines = lines.filter(l => l.includes('Current Lifecycle State'));
  
  assert.strictEqual(currentStateLines.length, 1, `Expected exactly 1 Current Lifecycle State line, found ${currentStateLines.length}`);
  assert(
    currentStateLines[0].includes('SAFE_UI_CONTAINMENT_PROVISIONAL — GOVERNANCE_RECOVERY_PENDING_INDEPENDENT_AUDIT'),
    `Current Lifecycle State line does not match canonical state: "${currentStateLines[0]}"`
  );
  
  // Verify it appears in the top header block (first 10 lines)
  const topBlock = lines.slice(0, 10).join('\n');
  assert(topBlock.includes('## 🔴 CURRENT TRUTH HEADER (TRẠNG THÁI HIỆN TẠI)'), 'Missing Current Truth Header in first 10 lines');
  assert(topBlock.includes('SAFE_UI_CONTAINMENT_PROVISIONAL — GOVERNANCE_RECOVERY_PENDING_INDEPENDENT_AUDIT'), 'Top header missing canonical state');
});

console.log('\n--- GATE 2: TRANSACTION MANAGER IDEMPOTENCY ENFORCEMENT ---');
test('Re-running applyProjectMemoryTransaction067 for JAYT-134H returns ALREADY_APPLIED and keeps hash invariant', () => {
  const preSha = crypto.createHash('sha256').update(fs.readFileSync(memoryPath)).digest('hex');
  
  const reRunResult = applyProjectMemoryTransaction067({
    version: '3.261.0',
    workOrder: 'JAYT-134H',
    workOrderDescription: 'Idempotency test re-run',
    headerStatusLine: 'SAFE_UI_CONTAINMENT_PROVISIONAL — GOVERNANCE_RECOVERY_PENDING_INDEPENDENT_AUDIT',
    receiptStatus: 'IMPLEMENTED_PENDING_CEO_AUDIT'
  });

  assert.strictEqual(reRunResult.status, 'ALREADY_APPLIED', `Expected status ALREADY_APPLIED, got: ${reRunResult.status}`);
  assert.strictEqual(reRunResult.finalHash, preSha, `Memory hash changed during idempotent re-run!`);
  
  const postSha = crypto.createHash('sha256').update(fs.readFileSync(memoryPath)).digest('hex');
  assert.strictEqual(preSha, postSha, 'Memory file was mutated on disk during idempotent re-run!');
});

console.log('\n--- GATE 3: PHYSICAL DYNAMIC HASH PARITY ---');
test('Physical SHA-256 of jayt_apex_interface.js matches canonical truth', () => {
  const computedJsSha = crypto.createHash('sha256').update(fs.readFileSync(jsPath)).digest('hex');
  const expectedJsSha = 'ae4f3376524650a36d623ff79d47b387ae57eb5121f9bfb7c875fddcd3bbac35';
  assert.strictEqual(computedJsSha, expectedJsSha, `JS SHA mismatch: Expected ${expectedJsSha}, got ${computedJsSha}`);

  const deployJsPath = path.join(repoRoot, 'deploy', 'jayt_apex_interface.js');
  const deployPublicJsPath = path.join(repoRoot, 'deploy', 'public', 'jayt_apex_interface.js');
  const deploySha = crypto.createHash('sha256').update(fs.readFileSync(deployJsPath)).digest('hex');
  const deployPublicSha = crypto.createHash('sha256').update(fs.readFileSync(deployPublicJsPath)).digest('hex');

  assert.strictEqual(computedJsSha, deploySha, 'Deploy JS hash mismatch');
  assert.strictEqual(computedJsSha, deployPublicSha, 'Deploy Public JS hash mismatch');
});

console.log('\n--- GATE 4: DISCLOSURE RECEIPT APPEND-ONLY INTEGRITY ---');
test('DISCLOSURE_RECEIPT_JAYT_134H documents duplicate header, hash mismatch, and lack of idempotency', () => {
  assert.strictEqual(receipt134h.receipt_id, 'DISCLOSURE_RECEIPT_JAYT_134H');
  assert.strictEqual(receipt134h.status, 'DISCLOSED_AND_CONTAINED');
  assert.strictEqual(receipt134h.governance_errors.length, 3);
  assert.strictEqual(receipt134h.governance_errors[0].error_id, 'GOV_ERR_05_DUPLICATE_CONTRADICTORY_CURRENT_HEADERS');
  assert.strictEqual(receipt134h.governance_errors[1].error_id, 'GOV_ERR_06_HARDCODED_INACCURATE_HASH_REPORTING');
  assert.strictEqual(receipt134h.governance_errors[2].error_id, 'GOV_ERR_07_LACK_OF_RUNNER_IDEMPOTENCY');
});

console.log('\n--- GATE 5: PHYSICAL EVIDENCE BINDING (26/26 LOCATIONS) ---');
test('All 26 Layer 2 Watchlist locations exist on physical disk with matching SHA-256 and quotes', () => {
  const locations = dataset.layer_2_watchlist.verified_locations;
  assert.strictEqual(locations.length, 26, `Expected 26 locations, found ${locations.length}`);

  let valid = 0;
  locations.forEach((loc) => {
    const ptr = loc.evidence_pointer;
    assert(ptr, `Location ${loc.id} missing evidence_pointer`);
    const fullPath = path.join(repoRoot, ptr.artifact_path);
    assert(fs.existsSync(fullPath), `Artifact file not found: ${ptr.artifact_path}`);

    const content = fs.readFileSync(fullPath, 'utf8');
    const computedSha = crypto.createHash('sha256').update(content).digest('hex');
    assert.strictEqual(computedSha, ptr.artifact_sha256, `SHA-256 mismatch for ${loc.id}`);
    assert(content.includes(ptr.quote), `Quote "${ptr.quote}" not found in artifact for ${loc.id}`);
    valid++;
  });

  assert.strictEqual(valid, 26, `Only ${valid}/26 locations valid`);
});

console.log('\n--- GATE 6: CLAIM INVENTORY SCANNER & PRODUCTION LOCKS ---');
test('Zero residual super-app delivery arbitrage, hardcoded schedules, fake vouchers, or deep links', () => {
  assert(!jsCode.includes('ShopeeFood rẻ hơn'), 'Found ShopeeFood rẻ hơn in JS');
  assert(!jsCode.includes('Freeship 18K'), 'Found Freeship 18K in JS');
  assert(!jsCode.includes('getCinemaSchedule('), 'Found getCinemaSchedule in JS');
  assert(!jsCode.includes('TIKTOKVIP0D'), 'Found TIKTOKVIP0D in JS');
  assert(!jsCode.includes('JAYTSHOPEE50'), 'Found JAYTSHOPEE50 in JS');
  assert(!jsCode.includes('https://shopeefood.vn'), 'Found ShopeeFood link in JS');
  assert(jsCode.includes('🔵 ĐỊA ĐIỂM XÁC MINH'), 'Missing 🔵 ĐỊA ĐIỂM XÁC MINH badge in JS');
  assert(jsCode.includes('Chỉ xác thực địa điểm cơ sở; menu và giá kiểm tra thực tế tại quán.'), 'Missing honest facility disclaimer');

  // Verify production locks
  const prodRaw = fs.readFileSync(prodFeedPath, 'utf8');
  const prodJson = JSON.parse(prodRaw);
  const prodSha = crypto.createHash('sha256').update(prodRaw).digest('hex');
  assert(Array.isArray(prodJson) && prodJson.length === 0, 'Production feed is not empty');
  assert.strictEqual(prodSha, '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945', 'deals_feed.json SHA-256 altered');

  const manifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
  const isApproved = manifest.governance_locks?.immutable_ceo_approval_record?.is_approved ?? manifest.is_approved;
  assert.strictEqual(isApproved, false, 'Production is_approved lock is not false');
});

console.log('\n========================================================================');
console.log(`📊 SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log('========================================================================\n');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('✨ ALL 6 JAYT-134H CANONICAL STATE & IDEMPOTENCY GATES PASSED 100%!');
  process.exit(0);
}
