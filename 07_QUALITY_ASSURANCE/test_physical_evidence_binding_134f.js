const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

console.log('========================================================================');
console.log('🔍 JAYT-134F: PHYSICAL EVIDENCE BINDING & GOVERNANCE AUDIT TEST');
console.log('========================================================================\n');

const repoRoot = path.resolve(__dirname, '..');
const fourLayerPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'four_layer_dataset.json');
const jsPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
const receiptPath = path.join(repoRoot, '08_RELEASE_VAULT', 'DISCLOSURE_RECEIPT_JAYT_134F_GOVERNANCE_AND_PROVENANCE.json');

const dataset = JSON.parse(fs.readFileSync(fourLayerPath, 'utf8'));
const jsCode = fs.readFileSync(jsPath, 'utf8');
const receipt = JSON.parse(fs.readFileSync(receiptPath, 'utf8'));

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

console.log('--- 1. AUDIT SURFACE 1: PHYSICAL ON-DISK ARTIFACT & SHA-256 VERIFICATION ---');
test('All 26 Layer 2 Watchlist locations exist on physical disk with matching SHA-256 and quotes', () => {
  const locations = dataset.layer_2_watchlist.verified_locations;
  assert.strictEqual(locations.length, 26, `Expected 26 locations, found ${locations.length}`);

  let valid = 0;
  locations.forEach((loc, idx) => {
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

console.log('\n--- 2. AUDIT SURFACE 2: DISCLOSURE RECEIPT APPEND-ONLY INTEGRITY ---');
test('DISCLOSURE_RECEIPT_JAYT_134F is present and documents the 2 governance findings', () => {
  assert.strictEqual(receipt.receipt_id, 'DISCLOSURE_RECEIPT_JAYT_134F');
  assert.strictEqual(receipt.status, 'DISCLOSED_AND_CONTAINED');
  assert.strictEqual(receipt.governance_errors.length, 2);
  assert.strictEqual(receipt.governance_errors[0].error_id, 'GOV_ERR_01_DIRECT_MEMORY_MUTATION');
  assert.strictEqual(receipt.governance_errors[1].error_id, 'GOV_ERR_02_MANIFEST_HASH_MISMATCH');
});

console.log('\n--- 3. AUDIT SURFACE 3: UI TAXONOMY HONESTY (NO FAKE ACTIVE DEAL GREEN CHECKS) ---');
test('Venue cards use 🔵 ĐỊA ĐIỂM XÁC MINH with explicit facility verification disclaimer', () => {
  assert(jsCode.includes('🔵 ĐỊA ĐIỂM XÁC MINH'), 'Missing 🔵 ĐỊA ĐIỂM XÁC MINH badge in JS');
  assert(jsCode.includes('Chỉ xác thực địa điểm cơ sở; menu và giá kiểm tra thực tế tại quán.'), 'Missing honest facility disclaimer');
});

console.log('\n--- 4. AUDIT SURFACE 4: ZERO RESIDUAL SUPER-APP OR COMMERCIAL ARBITRAGE ENGINES ---');
test('Zero residual super-app delivery arbitrage, hardcoded cinema schedules, or pass generators', () => {
  assert(!jsCode.includes('ShopeeFood rẻ hơn'), 'Found ShopeeFood rẻ hơn in JS');
  assert(!jsCode.includes('Freeship 18K'), 'Found Freeship 18K in JS');
  assert(!jsCode.includes('getCinemaSchedule('), 'Found getCinemaSchedule in JS');
  assert(!jsCode.includes('TIKTOKVIP0D'), 'Found TIKTOKVIP0D in JS');
  assert(!jsCode.includes('JAYTSHOPEE50'), 'Found JAYTSHOPEE50 in JS');
});

console.log('\n========================================================================');
console.log(`📊 SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log('========================================================================\n');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('✨ ALL 4 JAYT-134F PHYSICAL EVIDENCE & GOVERNANCE AUDIT TESTS PASSED 100%!');
  process.exit(0);
}
