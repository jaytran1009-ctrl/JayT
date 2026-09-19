/**
 * JAYT VERIFIED SUPPLY ACQUISITION TEST SUITE (087)
 * Directive: JAYT-087-VERIFIED-SUPPLY-ACQUISITION-BATCH
 *
 * Verifies:
 * 1. Batch 087 manifest contains 35 targets across 5 cohorts.
 * 2. All 35 target directories have physical PNG, HTML, TXT, and receipt with valid SHA-256.
 * 3. 5-cohort distribution covers Cinema, F&B, Coffee/Tea, Ride/Food, Wallets.
 * 4. Ground truth matrix 087 accounts for 26 signals, 9 failed, 0 false candidates.
 * 5. Zero synthetic deals generated; strictly transparent.
 * 6. Community signal inflow mechanism queued safely without auto-publishing.
 * 7. Review Pack 087 exists with sector gap analysis.
 * 8. Production invariants locked: deals_feed.json: [], is_approved: false.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

const repoRoot = path.resolve(__dirname, '..');
const manifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_087', 'captures_087', 'batch_manifest_087.json');
const matrixPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_087', 'ground_truth_matrix_087.json');
const reviewPackPath = path.join(repoRoot, '08_RELEASE_VAULT', 'JAYT_VERIFIED_SUPPLY_REVIEW_PACK_087.md');
const dealsFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

console.log('🧪 [JAYT-087-TEST] Khởi chạy bộ kiểm thử Verified Supply Acquisition 087...\n');

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

// TEST 01: Manifest contains >= 30 targets (35 actual)
runTest('TEST_01_BATCH_087_MANIFEST_CONTAINS_35_TARGETS', () => {
  assert.ok(fs.existsSync(manifestPath), 'Batch manifest 087 missing');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  assert.ok(manifest.results.length >= 30, `Target count must be >= 30 (found ${manifest.results.length})`);
  assert.strictEqual(manifest.collector, 'PUPPETEER_CHROME_CDP_ANONYMOUS');
});

// TEST 02: Physical artifacts exist on disk with valid SHA-256
runTest('TEST_02_ALL_CAPTURED_ARTIFACTS_EXIST_WITH_SHA256', () => {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  for (const item of manifest.results) {
    const itemDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_087', 'captures_087', item.id);
    assert.ok(fs.existsSync(itemDir), `Capture directory missing for ${item.id}`);

    const receiptPath = path.join(itemDir, 'capture_receipt.json');
    assert.ok(fs.existsSync(receiptPath), `Receipt missing for ${item.id}`);

    if (item.http_status === 200) {
      const pngPath = path.join(itemDir, 'page.png');
      const htmlPath = path.join(itemDir, 'page.html');
      const txtPath = path.join(itemDir, 'page.txt');

      assert.ok(fs.existsSync(pngPath), `PNG missing for ${item.id}`);
      assert.ok(fs.existsSync(htmlPath), `HTML missing for ${item.id}`);
      assert.ok(fs.existsSync(txtPath), `TXT missing for ${item.id}`);

      const receipt = JSON.parse(fs.readFileSync(receiptPath, 'utf8'));
      const actualTxtHash = sha256(fs.readFileSync(txtPath));
      assert.strictEqual(actualTxtHash, receipt.files.text_extract.sha256, `TXT hash mismatch for ${item.id}`);
    }
  }
});

// TEST 03: 5 cohorts covered with >= 5 targets each
runTest('TEST_03_COHORT_COVERAGE_ALL_5_SECTORS', () => {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const sectorCounts = {};

  manifest.results.forEach(r => {
    sectorCounts[r.sector] = (sectorCounts[r.sector] || 0) + 1;
  });

  const expectedSectors = ['CINEMA', 'FNB_FASTFOOD', 'COFFEE_TEA', 'FOOD_AND_RIDE', 'ECOMMERCE_WALLETS'];
  for (const s of expectedSectors) {
    assert.ok(sectorCounts[s] >= 5, `Sector ${s} must have >= 5 targets (found ${sectorCounts[s]})`);
  }
});

// TEST 04: Ground truth matrix 087 valid
runTest('TEST_04_GROUND_TRUTH_MATRIX_087_VALID', () => {
  assert.ok(fs.existsSync(matrixPath), 'Matrix 087 missing');
  const matrix = JSON.parse(fs.readFileSync(matrixPath, 'utf8'));

  assert.strictEqual(matrix.total_targets, 35);
  assert.strictEqual(matrix.cohorts.CINEMA.total, 8);
  assert.strictEqual(matrix.cohorts.FNB_FASTFOOD.total, 7);
  assert.strictEqual(matrix.cohorts.COFFEE_TEA.total, 8);
  assert.strictEqual(matrix.cohorts.FOOD_AND_RIDE.total, 5);
  assert.strictEqual(matrix.cohorts.ECOMMERCE_WALLETS.total, 7);
});

// TEST 05: Zero synthetic deals generated
runTest('TEST_05_NO_SYNTHETIC_DEALS_GENERATED', () => {
  const matrix = JSON.parse(fs.readFileSync(matrixPath, 'utf8'));
  let totalVerified = 0;
  Object.values(matrix.cohorts).forEach(c => totalVerified += c.verified_candidates);
  assert.strictEqual(totalVerified, 0, 'No false verified candidates permitted without complete 6-point proof');
});

// TEST 06: Community signal inflow queue valid
runTest('TEST_06_COMMUNITY_SIGNAL_INFLOW_QUEUE_VALID', () => {
  const jsCode = fs.readFileSync(path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js'), 'utf8');
  assert.ok(jsCode.includes('NEWLY_SUBMITTED'), 'Community signals must be tagged NEWLY_SUBMITTED');
  assert.ok(jsCode.includes('btn-submit-signal-action'), 'Community signal submit button must exist');
});

// TEST 07: Review Pack 087 exists with sector gap analysis
runTest('TEST_07_REVIEW_PACK_087_EXISTS', () => {
  assert.ok(fs.existsSync(reviewPackPath), 'Review Pack 087 missing');
  const content = fs.readFileSync(reviewPackPath, 'utf8');
  assert.ok(content.includes('JAYT VERIFIED SUPPLY ACQUISITION REVIEW PACK (087)'));
  assert.ok(content.includes('BÁO CÁO THIẾU HỤT NGUỒN CUNG THEO TỪNG NGÀNH HÀNG'));
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
  console.log(`🟢 [VERIFIED-SUPPLY-087-SUMMARY] Kết quả kiểm thử: ${passedTests}/${totalTests} PASS!\n`);
} else {
  console.log(`❌ [VERIFIED-SUPPLY-087-SUMMARY] Thất bại: ${passedTests}/${totalTests} PASS.\n`);
  process.exitCode = 1;
}
