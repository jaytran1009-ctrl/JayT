/**
 * JAYT FALSE PROVENANCE CONTAINMENT TEST SUITE (084A)
 * Directive: JAYT-084A-FALSE-PROVENANCE-CONTAINMENT
 * 
 * Verifies:
 * 1. 100% of 084 operational files removed from active paths.
 * 2. 62 quarantined files exist in quarantine_vault/batch_084_false_cdp_incident/ with valid SHA-256.
 * 3. Correction receipt emitted in runtime_evidence/.
 * 4. Clean discovery seeds established in discovery_seeds/.
 * 5. Production invariants locked [].
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

const repoRoot = path.resolve(__dirname, '..');
const quarantineVaultDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'batch_084_false_cdp_incident');
const quarantineManifestPath = path.join(quarantineVaultDir, 'BATCH_084_QUARANTINE_MANIFEST.json');
const correctionReceiptPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'correction_receipt_084a_false_cdp_containment.json');
const discoverySeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'discovery_seeds', 'official_brand_discovery_urls.json');
const dealsFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

function getSha256(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

console.log('🧪 [JAYT-084A-TEST] Khởi chạy bộ kiểm thử False Provenance Containment 084A...\n');

let passedTests = 0;
const totalTests = 5;

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

// TEST 01: All 084 operational files removed
runTest('TEST_01_ALL_084_OPERATIONAL_FILES_REMOVED', () => {
  const radarDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_084_community_deal_radar');
  const evidenceDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'raw_evidence', 'batch_084_radar');
  const oldTestPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'test_community_deal_radar_084.js');

  assert.ok(!fs.existsSync(radarDir), 'batch_084_community_deal_radar must not exist in operational path');
  assert.ok(!fs.existsSync(evidenceDir), 'raw_evidence/batch_084_radar must not exist in operational path');
  assert.ok(!fs.existsSync(oldTestPath), 'test_community_deal_radar_084.js must not exist in operational path');
});

// TEST 02: Quarantine vault integrity
runTest('TEST_02_QUARANTINE_VAULT_INTEGRITY', () => {
  assert.ok(fs.existsSync(quarantineManifestPath), 'Quarantine manifest missing');
  const manifest = JSON.parse(fs.readFileSync(quarantineManifestPath, 'utf8'));

  assert.strictEqual(manifest.incident_id, 'INC-FALSE-PROVENANCE-084A');
  assert.strictEqual(manifest.snapshot_byte_for_byte_persisted, true);
  assert.strictEqual(manifest.total_files_quarantined, 62);

  for (const entry of manifest.quarantined_entries) {
    const qAbs = path.join(repoRoot, entry.quarantine_path);
    assert.ok(fs.existsSync(qAbs), `Quarantined file missing on disk: ${entry.quarantine_path}`);
    const actualSha = getSha256(qAbs);
    assert.strictEqual(actualSha, entry.sha256, `Hash mismatch in quarantine for: ${entry.quarantine_path}`);
  }
});

// TEST 03: Correction receipt emitted
runTest('TEST_03_CORRECTION_RECEIPT_EMITTED', () => {
  assert.ok(fs.existsSync(correctionReceiptPath), 'Correction receipt missing');
  const receipt = JSON.parse(fs.readFileSync(correctionReceiptPath, 'utf8'));

  assert.strictEqual(receipt.work_order, 'JAYT-084A-FALSE-PROVENANCE-CONTAINMENT');
  assert.strictEqual(receipt.verdict, 'ALL_084_ARTIFACTS_QUARANTINED_AND_CONTAINED');
  assert.strictEqual(receipt.total_quarantined_files, 62);
  assert.ok(receipt.quarantine_vault_manifest_sha256.length === 64);
});

// TEST 04: Discovery seeds clean (no false CDP claims)
runTest('TEST_04_DISCOVERY_SEEDS_CLEAN', () => {
  assert.ok(fs.existsSync(discoverySeedPath), 'Discovery seeds file missing');
  const seeds = JSON.parse(fs.readFileSync(discoverySeedPath, 'utf8'));

  assert.strictEqual(seeds.length, 28);
  for (const item of seeds) {
    assert.ok(item.brand && item.sector && item.domain && item.discovery_url);
    assert.strictEqual(item.capture_origin, undefined, 'Must not claim capture_origin');
    assert.strictEqual(item.receipt_sha256, undefined, 'Must not claim receipt_sha256');
    assert.strictEqual(item.artifact_sha256, undefined, 'Must not claim artifact_sha256');
  }
});

// TEST 05: Production invariants locked
runTest('TEST_05_PRODUCTION_INVARIANTS_LOCKED', () => {
  const feedContent = JSON.parse(fs.readFileSync(dealsFeedPath, 'utf8'));
  assert.strictEqual(feedContent.length, 0, 'Production feed must remain []');

  const manifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
  assert.strictEqual(manifest.governance_locks.immutable_ceo_approval_record.is_approved, false, 'is_approved must remain false');
});

console.log('\n======================================================');
if (passedTests === totalTests) {
  console.log(`🟢 [CONTAINMENT-084A-SUMMARY] Kết quả kiểm thử: ${passedTests}/${totalTests} PASS!\n`);
} else {
  console.log(`❌ [CONTAINMENT-084A-SUMMARY] Thất bại: ${passedTests}/${totalTests} PASS.\n`);
  process.exitCode = 1;
}
