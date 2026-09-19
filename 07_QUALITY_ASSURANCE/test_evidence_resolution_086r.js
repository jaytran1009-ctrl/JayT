/**
 * JAYT EVIDENCE RESOLUTION TEST SUITE (086R)
 * Directive: JAYT-EVIDENCE-RESOLUTION-086R
 * 
 * Verifies:
 * 1. 28 sources accounted for in resolution manifest.
 * 2. 9 deep-browsed sources properly categorized:
 *    - Metiz Cinema has complete 6-factor verified bundle at Da Nang.
 *    - BHD Star has OUT_OF_SCOPE_DANANG locality resolution.
 *    - MoMo & ZaloPay have SIGNAL_ONLY_APP_WALLET resolution.
 * 3. 8 blocked sources maintained as BLOCKED_CHALLENGE (0 bypass).
 * 4. 11 failed sources maintained as FAILED_404 on radar.
 * 5. Review Pack 086R exists and is comprehensive.
 * 6. Production invariants locked [].
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

const repoRoot = path.resolve(__dirname, '..');
const manifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'evidence_resolution_086r', 'evidence_resolution_manifest_086r.json');
const reviewPackPath = path.join(repoRoot, '08_RELEASE_VAULT', 'JAYT_EVIDENCE_RESOLUTION_REVIEW_PACK_086R.md');
const dealsFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

function sha256File(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

console.log('🧪 [JAYT-086R-TEST] Khởi chạy bộ kiểm thử Evidence Resolution 086R...\n');

let passedTests = 0;
const totalTests = 7;

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

// TEST 01: Manifest exists and accounts for all 28 sources
runTest('TEST_01_MANIFEST_ACCOUNTS_FOR_28_SOURCES', () => {
  assert.ok(fs.existsSync(manifestPath), 'Resolution manifest missing');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  assert.strictEqual(manifest.summary_metrics.total_sources_scanned, 28);
  assert.strictEqual(manifest.resolved_sources.length, 9);
  assert.strictEqual(manifest.blocked_challenge_sources.length, 8);
  assert.strictEqual(manifest.failed_404_sources.length, 11);
  assert.strictEqual(manifest.resolved_sources.length + manifest.blocked_challenge_sources.length + manifest.failed_404_sources.length, 28);
});

// TEST 02: Metiz Super Monday is complete 6-factor verified bundle
runTest('TEST_02_METIZ_SUPER_MONDAY_COMPLETE_BUNDLE', () => {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const metiz = manifest.resolved_sources.find(s => s.domain === 'metiz.vn');

  assert.ok(metiz, 'Metiz entry missing');
  assert.strictEqual(metiz.resolution_tier, 'FULL_VERIFIED_BUNDLE_DANANG');
  assert.strictEqual(metiz.price_claim, '55.000đ / vé 2D');
  assert.strictEqual(metiz.schedule_claim, 'Thứ Hai hằng tuần');
  assert.strictEqual(metiz.purchase_channel, 'AT_COUNTER');
  assert.ok(metiz.locality.includes('Đà Nẵng'), 'Locality must be in Da Nang');
  assert.strictEqual(metiz.bundle_complete, true);

  // Check physical artifacts on disk
  for (const [type, relPath] of Object.entries(metiz.evidence_artifacts)) {
    const absPath = path.join(repoRoot, relPath);
    assert.ok(fs.existsSync(absPath), `Metiz artifact missing on disk: ${relPath}`);
  }
});

// TEST 03: BHD Star locality check resolves OUT_OF_SCOPE_DANANG
runTest('TEST_03_BHD_STAR_LOCALITY_OUT_OF_SCOPE', () => {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const bhd = manifest.resolved_sources.find(s => s.domain === 'bhdstar.vn');

  assert.ok(bhd, 'BHD Star entry missing');
  assert.strictEqual(bhd.resolution_tier, 'SIGNAL_ONLY_OUT_OF_SCOPE_DANANG');
  assert.strictEqual(bhd.radar_status, 'OUT_OF_SCOPE_LOCALITY');
  assert.strictEqual(bhd.bundle_complete, false);
  assert.ok(bhd.locality_assessment.includes('KHÔNG CÓ chi nhánh tại Đà Nẵng'), 'Locality assessment must note lack of Da Nang branch');
});

// TEST 04: MoMo and ZaloPay resolved as SIGNAL_ONLY_APP_WALLET
runTest('TEST_04_WALLETS_RESOLVED_AS_SIGNAL_ONLY_APP', () => {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const momo = manifest.resolved_sources.find(s => s.domain === 'momo.vn');
  const zalopay = manifest.resolved_sources.find(s => s.domain === 'zalopay.vn');

  assert.ok(momo && zalopay, 'MoMo and ZaloPay entries must exist');
  assert.strictEqual(momo.resolution_tier, 'SIGNAL_ONLY_APP_WALLET');
  assert.strictEqual(zalopay.resolution_tier, 'SIGNAL_ONLY_APP_WALLET');
  assert.strictEqual(momo.radar_status, 'CHECK_IN_APP');
  assert.strictEqual(zalopay.radar_status, 'CHECK_IN_APP');
  assert.strictEqual(momo.bundle_complete, false);
  assert.strictEqual(zalopay.bundle_complete, false);
});

// TEST 05: 8 blocked sources have zero bypass claims
runTest('TEST_05_NO_CAPTCHA_BYPASS_ENFORCED', () => {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  assert.strictEqual(manifest.blocked_challenge_sources.length, 8);

  for (const item of manifest.blocked_challenge_sources) {
    assert.strictEqual(item.status, 'BLOCKED_CHALLENGE');
    assert.strictEqual(item.policy, 'NO_BYPASS_ATTEMPT_MAINTAIN_BLOCKED');
  }
});

// TEST 06: Review Pack 086R exists and covers 4 focus groups
runTest('TEST_06_REVIEW_PACK_086R_INTEGRITY', () => {
  assert.ok(fs.existsSync(reviewPackPath), 'Review pack 086R missing');
  const content = fs.readFileSync(reviewPackPath, 'utf8');

  assert.ok(content.includes('JAYT EVIDENCE RESOLUTION REVIEW PACK (086R)'));
  assert.ok(content.includes('METIZ CINEMA ĐÀ NẴNG'));
  assert.ok(content.includes('BHD STAR CINEPLEX'));
  assert.ok(content.includes('VÍ MOMO'));
  assert.ok(content.includes('VÍ ZALOPAY'));
  assert.ok(content.includes('TUYỆT ĐỐI KHÔNG BYPASS'));
});

// TEST 07: Production invariants locked []
runTest('TEST_07_PRODUCTION_INVARIANTS_LOCKED', () => {
  const feedContent = JSON.parse(fs.readFileSync(dealsFeedPath, 'utf8'));
  assert.strictEqual(feedContent.length, 0, 'Production feed must remain []');

  const releaseManifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
  assert.strictEqual(releaseManifest.governance_locks.immutable_ceo_approval_record.is_approved, false, 'is_approved must remain false');
});

console.log('\n======================================================');
if (passedTests === totalTests) {
  console.log(`🟢 [EVIDENCE-RESOLUTION-086R-SUMMARY] Kết quả kiểm thử: ${passedTests}/${totalTests} PASS!\n`);
} else {
  console.log(`❌ [EVIDENCE-RESOLUTION-086R-SUMMARY] Thất bại: ${passedTests}/${totalTests} PASS.\n`);
  process.exitCode = 1;
}
