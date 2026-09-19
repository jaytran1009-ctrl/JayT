/**
 * JAYT EVIDENCE-GROUNDED RESOLUTION TEST SUITE (086S)
 * Directive: JAYT-086S-EVIDENCE-GROUNDED-RESOLUTION-AND-RADAR-UI
 * 
 * Verifies:
 * 1. Ground-Truth Matrix accounts for 28 sources (0 Verified, 8 Signal, 1 Out-of-scope, 8 Blocked, 11 Failed).
 * 2. 100% of artifact paths exist on disk and their SHA-256 matches byte-for-byte.
 * 3. 100% of verbatim quotes exist literally in the raw page.txt artifacts.
 * 4. Metiz Cinema is strictly SIGNAL_ONLY with missing street address in promo block.
 * 5. BHD Star is strictly OUT_OF_SCOPE (0 cinema locations in Da Nang).
 * 6. 8 blocked sources maintain BLOCKED status with 0 bypass.
 * 7. Correction receipt 086S exists and discloses claim demotion.
 * 8. Production invariants locked: deals_feed.json: [], is_approved: false.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

const repoRoot = path.resolve(__dirname, '..');
const matrixPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'evidence_resolution_086s', 'ground_truth_matrix_086s.json');
const reviewPackPath = path.join(repoRoot, '08_RELEASE_VAULT', 'JAYT_GROUND_TRUTH_REVIEW_PACK_086S.md');
const correctionReceiptPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'correction_receipt_086s_demotion_of_unverified_claims.json');
const dealsFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

function sha256File(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

console.log('🧪 [JAYT-086S-TEST] Khởi chạy bộ kiểm thử Evidence-Grounded Resolution 086S...\n');

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

// TEST 01: Matrix accounts for all 28 sources across standard tiers
runTest('TEST_01_MATRIX_ACCOUNTS_FOR_28_SOURCES', () => {
  assert.ok(fs.existsSync(matrixPath), 'Matrix file missing');
  const matrix = JSON.parse(fs.readFileSync(matrixPath, 'utf8'));

  assert.strictEqual(matrix.summary.total_sources, 28);
  assert.strictEqual(matrix.summary.verified_candidates, 0, 'Must have 0 verified candidates');
  assert.strictEqual(matrix.summary.signal_only, 8);
  assert.strictEqual(matrix.summary.out_of_scope, 1);
  assert.strictEqual(matrix.summary.blocked_challenge, 8);
  assert.strictEqual(matrix.summary.failed_404, 11);
  assert.strictEqual(matrix.sources.length, 28);
});

// TEST 02: Physical artifact existence and SHA-256 byte-for-byte parity
runTest('TEST_02_ARTIFACTS_EXIST_AND_SHA256_PARITY', () => {
  const matrix = JSON.parse(fs.readFileSync(matrixPath, 'utf8'));
  let verifiedCount = 0;

  for (const s of matrix.sources) {
    if (s.artifact_path) {
      const absPath = path.join(repoRoot, s.artifact_path);
      assert.ok(fs.existsSync(absPath), `Artifact missing on disk: ${s.artifact_path}`);
      const diskHash = sha256File(absPath);
      assert.strictEqual(diskHash, s.artifact_sha256, `SHA-256 mismatch for ${s.domain}: disk=${diskHash}, matrix=${s.artifact_sha256}`);
      verifiedCount++;
    }
  }
  assert.strictEqual(verifiedCount, 9, 'Must verify all 9 captured artifacts');
});

// TEST 03: Verbatim quote grounding against actual raw text artifacts
runTest('TEST_03_VERBATIM_QUOTE_GROUNDING_AGAINST_DISK_TEXT', () => {
  const matrix = JSON.parse(fs.readFileSync(matrixPath, 'utf8'));

  for (const s of matrix.sources) {
    if (s.verbatim_quote && s.artifact_path) {
      const absPath = path.join(repoRoot, s.artifact_path);
      const diskText = fs.readFileSync(absPath, 'utf8');

      // Split quote by ellipsis and assert each individual fragment is present in disk text
      const fragments = s.verbatim_quote.split('...').map(f => f.trim()).filter(f => f.length > 0);
      for (const frag of fragments) {
        assert.ok(diskText.includes(frag), `Quote fragment not found in ${s.artifact_path}: "${frag}"`);
      }
    }
  }
});

// TEST 04: Metiz Cinema is strictly SIGNAL_ONLY (not a verified candidate)
runTest('TEST_04_METIZ_CINEMA_DEMOTED_TO_SIGNAL_ONLY', () => {
  const matrix = JSON.parse(fs.readFileSync(matrixPath, 'utf8'));
  const metiz = matrix.sources.find(s => s.domain === 'metiz.vn');

  assert.ok(metiz, 'Metiz entry missing');
  assert.strictEqual(metiz.tier, 'SIGNAL_ONLY', 'Metiz must be SIGNAL_ONLY');
  assert.ok(metiz.missing_fields.includes('LITERAL_STREET_ADDRESS_IN_PROMO_TEXT'), 'Must document missing street address');
});

// TEST 05: BHD Star is strictly OUT_OF_SCOPE
runTest('TEST_05_BHD_STAR_IS_OUT_OF_SCOPE', () => {
  const matrix = JSON.parse(fs.readFileSync(matrixPath, 'utf8'));
  const bhd = matrix.sources.find(s => s.domain === 'bhdstar.vn');

  assert.ok(bhd, 'BHD entry missing');
  assert.strictEqual(bhd.tier, 'OUT_OF_SCOPE', 'BHD must be OUT_OF_SCOPE');
  assert.ok(bhd.missing_fields.includes('DANANG_LOCALITY_PHYSICAL_PRESENCE'), 'Must document lack of Da Nang presence');
});

// TEST 06: 8 blocked sources have zero bypass claims
runTest('TEST_06_BLOCKED_SOURCES_ZERO_BYPASS', () => {
  const matrix = JSON.parse(fs.readFileSync(matrixPath, 'utf8'));
  const blocked = matrix.sources.filter(s => s.tier === 'BLOCKED');
  assert.strictEqual(blocked.length, 8, 'Must have 8 blocked sources');

  for (const b of blocked) {
    assert.ok(b.note.includes('Tuyệt đối không bypass'), `Blocked source ${b.domain} must note no bypass`);
  }
});

// TEST 07: Correction receipt 086S exists and is valid
runTest('TEST_07_CORRECTION_RECEIPT_086S_VALID', () => {
  assert.ok(fs.existsSync(correctionReceiptPath), 'Correction receipt 086S missing');
  const receipt = JSON.parse(fs.readFileSync(correctionReceiptPath, 'utf8'));

  assert.strictEqual(receipt.correction_id, 'CORRECTION_086S_DEMOTION_OF_UNVERIFIED_CLAIMS');
  assert.strictEqual(receipt.work_order, 'JAYT-086S-EVIDENCE-GROUNDED-RESOLUTION-AND-RADAR-UI');
  assert.strictEqual(receipt.matrix_summary_086s.VERIFIED_CANDIDATE, 0);
  assert.strictEqual(receipt.matrix_summary_086s.SIGNAL_ONLY, 8);
  assert.strictEqual(receipt.matrix_summary_086s.OUT_OF_SCOPE, 1);
  assert.strictEqual(receipt.matrix_summary_086s.BLOCKED, 8);
  assert.strictEqual(receipt.matrix_summary_086s.FAILED, 11);
});

// TEST 08: Production invariants locked []
runTest('TEST_08_PRODUCTION_INVARIANTS_LOCKED', () => {
  const feedContent = JSON.parse(fs.readFileSync(dealsFeedPath, 'utf8'));
  assert.strictEqual(feedContent.length, 0, 'Production feed must remain []');

  const releaseManifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
  assert.strictEqual(releaseManifest.governance_locks.immutable_ceo_approval_record.is_approved, false, 'is_approved must remain false');
});

console.log('\n======================================================');
if (passedTests === totalTests) {
  console.log(`🟢 [EVIDENCE-GROUNDED-086S-SUMMARY] Kết quả kiểm thử: ${passedTests}/${totalTests} PASS!\n`);
} else {
  console.log(`❌ [EVIDENCE-GROUNDED-086S-SUMMARY] Thất bại: ${passedTests}/${totalTests} PASS.\n`);
  process.exitCode = 1;
}
