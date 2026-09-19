const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

console.log('========================================================================');
console.log('🔍 JAYT-134G: TRANSACTION INTEGRITY & TEST COHERENCE AUDIT');
console.log('========================================================================\n');

const repoRoot = path.resolve(__dirname, '..');
const fourLayerPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'four_layer_dataset.json');
const jsPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
const memoryPath = path.join(repoRoot, 'PROJECT_MEMORY.md');
const runner134gPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'apply_memory_transaction_134g.js');
const receipt134gPath = path.join(repoRoot, '08_RELEASE_VAULT', 'DISCLOSURE_RECEIPT_JAYT_134G_TRANSACTION_BYPASS.json');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

const dataset = JSON.parse(fs.readFileSync(fourLayerPath, 'utf8'));
const jsCode = fs.readFileSync(jsPath, 'utf8');
const memory = fs.readFileSync(memoryPath, 'utf8');
const runner134gCode = fs.readFileSync(runner134gPath, 'utf8');
const receipt134g = JSON.parse(fs.readFileSync(receipt134gPath, 'utf8'));

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

console.log('--- GATE 1: PHYSICAL EVIDENCE BINDING (26/26 LOCATIONS) ---');
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

console.log('\n--- GATE 2: CLAIM INVENTORY SCANNER & SAFE TRUTH UI ---');
test('Zero residual super-app delivery arbitrage, hardcoded cinema schedules, fake vouchers, or deep links', () => {
  assert(!jsCode.includes('ShopeeFood rẻ hơn'), 'Found ShopeeFood rẻ hơn in JS');
  assert(!jsCode.includes('Freeship 18K'), 'Found Freeship 18K in JS');
  assert(!jsCode.includes('getCinemaSchedule('), 'Found getCinemaSchedule in JS');
  assert(!jsCode.includes('TIKTOKVIP0D'), 'Found TIKTOKVIP0D in JS');
  assert(!jsCode.includes('JAYTSHOPEE50'), 'Found JAYTSHOPEE50 in JS');
  assert(!jsCode.includes('https://shopeefood.vn'), 'Found ShopeeFood link in JS');
  assert(jsCode.includes('🔵 ĐỊA ĐIỂM XÁC MINH'), 'Missing 🔵 ĐỊA ĐIỂM XÁC MINH badge in JS');
  assert(jsCode.includes('Chỉ xác thực địa điểm cơ sở; menu và giá kiểm tra thực tế tại quán.'), 'Missing honest facility disclaimer');
});

console.log('\n--- GATE 3: TRANSACTION-MANAGER-ONLY INTEGRITY (ZERO DIRECT FILE WRITES) ---');
test('Runner 134G imports applyProjectMemoryTransaction067 and contains ZERO direct writes to PROJECT_MEMORY.md', () => {
  assert(runner134gCode.includes("require('./memory_transaction_manager_057')"), 'Missing import from memory_transaction_manager_057');
  assert(runner134gCode.includes('applyProjectMemoryTransaction067('), 'Missing call to applyProjectMemoryTransaction067');
  
  // Assert zero direct file writes
  assert(!runner134gCode.includes('fs.writeFileSync(memoryPath'), 'Violation: Found direct fs.writeFileSync(memoryPath) in 134G runner');
  assert(!runner134gCode.includes('fs.writeFileSync('), 'Violation: Found fs.writeFileSync in 134G runner');
  assert(!runner134gCode.includes('fs.writeFile('), 'Violation: Found fs.writeFile in 134G runner');
});

console.log('\n--- GATE 4: DISCLOSURE RECEIPT APPEND-ONLY INTEGRITY ---');
test('DISCLOSURE_RECEIPT_JAYT_134G is present and records the 134F transaction bypass', () => {
  assert.strictEqual(receipt134g.receipt_id, 'DISCLOSURE_RECEIPT_JAYT_134G');
  assert.strictEqual(receipt134g.status, 'DISCLOSED_AND_CONTAINED');
  assert.strictEqual(receipt134g.governance_errors[0].error_id, 'GOV_ERR_03_134F_TRANSACTION_MANAGER_BYPASS');
});

console.log('\n--- GATE 5: CANONICAL GOVERNANCE STATE & PRODUCTION LOCKS ---');
test('PROJECT_MEMORY.md records SAFE_UI_CONTAINMENT_PROVISIONAL and production is locked', () => {
  assert(memory.includes('SAFE_UI_CONTAINMENT_PROVISIONAL — GOVERNANCE_RECOVERY_PENDING_INDEPENDENT_AUDIT'), 'Missing state in memory');
  assert(memory.includes('JAYT-134G') || memory.includes('JAYT-134H'), 'Missing JAYT-134G or 134H in memory');

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
  console.log('✨ ALL 5 JAYT-134G TRANSACTION INTEGRITY & TEST COHERENCE GATES PASSED 100%!');
  process.exit(0);
}
