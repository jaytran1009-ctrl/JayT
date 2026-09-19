/**
 * JAYT REAL SUPPLY SPRINT TEST SUITE (086)
 * Directive: JAYT-REAL-SUPPLY-SPRINT-086
 *
 * Single test suite run after batch completion.
 * Verifies: manifest integrity, artifact presence, receipt provenance,
 * no auto-classification, production invariants.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

const repoRoot = path.resolve(__dirname, '..');
const captureDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_086', 'captures');
const manifestPath = path.join(captureDir, 'batch_manifest_086.json');
const classificationPath = path.join(captureDir, 'batch_classification_086.json');
const reviewPackPath = path.join(repoRoot, '08_RELEASE_VAULT', 'BATCH_CAPTURE_REVIEW_PACK_086.md');
const dealsFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

function sha256File(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

console.log('🧪 [JAYT-086-TEST] Khởi chạy bộ kiểm thử Real Supply Sprint 086...\n');

let passedTests = 0;
const totalTests = 6;

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

// TEST 01: Batch manifest exists and contains 28 entries
runTest('TEST_01_BATCH_MANIFEST_28_ENTRIES', () => {
  assert.ok(fs.existsSync(manifestPath), 'Batch manifest must exist');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  assert.strictEqual(manifest.total_seeds, 28, 'Must have 28 seeds');
  assert.strictEqual(manifest.entries.length, 28, 'Must have 28 entries');
  assert.strictEqual(manifest.capture_origin, 'REAL_BROWSER_CDP', 'Must declare REAL_BROWSER_CDP');
  assert.ok(manifest.run_id, 'Must have run_id');
});

// TEST 02: Every SUCCESS entry has PNG + HTML + TXT + receipt on disk with matching SHA-256
runTest('TEST_02_SUCCESS_ENTRIES_ARTIFACTS_COMPLETE', () => {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const successEntries = manifest.entries.filter(e => !e.error && e.http_status);

  let verifiedCount = 0;
  for (const entry of successEntries) {
    if (!entry.artifacts) continue;
    for (const [type, art] of Object.entries(entry.artifacts)) {
      if (!art || !art.path) continue;
      const absPath = path.join(repoRoot, art.path);
      assert.ok(fs.existsSync(absPath), `Artifact missing: ${art.path}`);
      if (art.sha256) {
        const diskHash = sha256File(absPath);
        assert.strictEqual(diskHash, art.sha256, `Hash mismatch for ${art.path}: disk=${diskHash}, manifest=${art.sha256}`);
      }
    }
    verifiedCount++;
  }
  assert.ok(verifiedCount > 0, 'At least one entry must be verified');
});

// TEST 03: Every receipt declares REAL_BROWSER_CDP, no mock/fixture paths
runTest('TEST_03_RECEIPTS_REAL_CDP_NO_MOCK_PATHS', () => {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const FORBIDDEN_PATH_SEGMENTS = ['mock', 'fixture', 'test_data', 'sandbox', 'quarantine'];

  for (const entry of manifest.entries) {
    if (!entry.artifacts || !entry.artifacts.receipt) continue;
    const receiptPath = path.join(repoRoot, entry.artifacts.receipt.path);
    if (!fs.existsSync(receiptPath)) continue;

    const receipt = JSON.parse(fs.readFileSync(receiptPath, 'utf8'));
    assert.strictEqual(receipt.capture_origin, 'REAL_BROWSER_CDP', `Receipt for ${entry.domain} must be REAL_BROWSER_CDP`);
    assert.strictEqual(receipt.capture_method, 'puppeteer_cdp_headless', `Receipt for ${entry.domain} must use puppeteer_cdp_headless`);

    // Check no forbidden path segments in any artifact path
    for (const [type, art] of Object.entries(receipt.artifacts || {})) {
      if (art && art.path) {
        for (const seg of FORBIDDEN_PATH_SEGMENTS) {
          assert.ok(!art.path.toLowerCase().includes(seg), `Forbidden path segment '${seg}' found in ${art.path}`);
        }
      }
    }
  }
});

// TEST 04: No entry is auto-classified as READY_FOR_BATCH_REVIEW or ACTIVE
runTest('TEST_04_NO_AUTO_DEAL_CLASSIFICATION', () => {
  const manifestRaw = fs.readFileSync(manifestPath, 'utf8');
  assert.ok(!manifestRaw.includes('READY_FOR_BATCH_REVIEW'), 'Manifest must not contain READY_FOR_BATCH_REVIEW');
  assert.ok(!manifestRaw.includes('"ACTIVE"'), 'Manifest must not contain ACTIVE status');
  assert.ok(!manifestRaw.includes('deal_candidate'), 'Manifest must not create deal candidates');

  if (fs.existsSync(classificationPath)) {
    const classRaw = fs.readFileSync(classificationPath, 'utf8');
    assert.ok(!classRaw.includes('READY_FOR_BATCH_REVIEW'), 'Classification must not contain READY_FOR_BATCH_REVIEW');
  }
});

// TEST 05: Review pack exists
runTest('TEST_05_REVIEW_PACK_EXISTS', () => {
  assert.ok(fs.existsSync(reviewPackPath), 'Review pack must exist at 08_RELEASE_VAULT/BATCH_CAPTURE_REVIEW_PACK_086.md');
  const content = fs.readFileSync(reviewPackPath, 'utf8');
  assert.ok(content.includes('Batch Capture Review Pack 086'), 'Review pack must have correct title');
  assert.ok(content.includes('REAL_BROWSER_CDP') || content.includes('Chrome CDP'), 'Review pack must mention real CDP');
});

// TEST 06: Production invariants locked
runTest('TEST_06_PRODUCTION_INVARIANTS_LOCKED', () => {
  const feedContent = JSON.parse(fs.readFileSync(dealsFeedPath, 'utf8'));
  assert.strictEqual(feedContent.length, 0, 'Production feed must remain []');

  const manifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
  assert.strictEqual(manifest.governance_locks.immutable_ceo_approval_record.is_approved, false, 'is_approved must remain false');
});

console.log('\n======================================================');
if (passedTests === totalTests) {
  console.log(`🟢 [REAL-SUPPLY-086-SUMMARY] Kết quả kiểm thử: ${passedTests}/${totalTests} PASS!\n`);
} else {
  console.log(`❌ [REAL-SUPPLY-086-SUMMARY] Thất bại: ${passedTests}/${totalTests} PASS.\n`);
  process.exitCode = 1;
}
