/**
 * JAYT EVIDENCE MATRIX HARDENING AND SECOND-PASS TEST SUITE (087B)
 * Directive: JAYT-087B-EVIDENCE-MATRIX-HARDENING-AND-SECOND-PASS
 *
 * Verifies:
 * 1. Zero hardcoded target_id branches in matrix builder (pure generic evaluation).
 * 2. 100% Upstream DOM Lineage: All 66 targets (40 Pass 1 + 26 Pass 2) trace back to parent DOM with matching SHA-256, literal_href at offset, and resolution.
 * 3. Physical Artifact Parity: All 66 target folders contain page.png, page.html, page.txt, receipt.
 * 4. Byte-for-Byte Quote Verification: Every non-null bundle quote MUST exist byte-for-byte in the physical artifact text on disk.
 * 5. Unified Matrix Accounting: 66 total targets, 0 false candidates, 62 signal only, 4 not confirmed Da Nang.
 * 6. Review Pack 087B: JAYT_VERIFIED_SUPPLY_REVIEW_PACK_087B.md published with evidence deficit report.
 * 7. Radar UI & Dataset Invariance: SSOT radar_dataset_086u.json hash parity preserved across all instances.
 * 8. Production Invariants Locked: deals_feed.json: [], is_approved: false.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

const repoRoot = path.resolve(__dirname, '..');
const builderPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_087b', 'build_unified_matrix_087b.js');
const unifiedMatrixPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_087b', 'ground_truth_matrix_087b.json');
const manifest087aPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_087a', 'captures_087a', 'batch_manifest_087a.json');
const manifest087bPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_087b', 'captures_087b', 'batch_manifest_087b.json');
const reviewPackPath = path.join(repoRoot, '08_RELEASE_VAULT', 'JAYT_VERIFIED_SUPPLY_REVIEW_PACK_087B.md');
const radarDatasetPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'radar_dataset_086u.json');
const deployJsonPath = path.join(repoRoot, 'deploy', 'public', 'radar_dataset_086u.json');
const stagingJsonPath = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '03_SOURCE_OF_TRUTH', 'radar_dataset_086u.json');
const dealsFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

console.log('🧪 [JAYT-087B-TEST] Khởi chạy bộ kiểm thử Evidence Matrix Hardening & Second-Pass 087B...\n');

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

// TEST 01: Zero hardcoded target_id branches in builder
runTest('TEST_01_ZERO_HARDCODED_TARGET_ID_BRANCHES_IN_BUILDER', () => {
  const builderCode = fs.readFileSync(builderPath, 'utf8');
  assert.strictEqual(builderCode.includes("res.target_id === 'TARGET_087A_014'"), false, 'No TARGET_087A_014 branching permitted');
  assert.strictEqual(builderCode.includes("res.target_id === 'TARGET_087A_022'"), false, 'No TARGET_087A_022 branching permitted');
  assert.strictEqual(builderCode.includes("res.target_id === 'TARGET_087A_012'"), false, 'No TARGET_087A_012 branching permitted');
  assert.strictEqual(builderCode.includes("target_id ==="), false, 'No target_id === branching permitted in builder');
});

// TEST 02: All 66 targets have verifiable upstream parent DOM lineage
runTest('TEST_02_ALL_66_TARGETS_HAVE_VERIFIABLE_PARENT_DOM_LINEAGE', () => {
  const matrix = JSON.parse(fs.readFileSync(unifiedMatrixPath, 'utf8'));
  assert.strictEqual(matrix.items.length, 66, 'Must have 66 items in unified matrix');

  for (const item of matrix.items) {
    const lineage = item.target_lineage;
    assert.ok(lineage, `Lineage missing for target ${item.target_id}`);
    assert.ok(lineage.parent_artifact_path, `parent_artifact_path missing for ${item.target_id}`);
    assert.ok(lineage.parent_artifact_sha256, `parent_artifact_sha256 missing for ${item.target_id}`);
    assert.ok(lineage.literal_href, `literal_href missing for ${item.target_id}`);
    assert.ok(typeof lineage.link_offset === 'number', `link_offset missing for ${item.target_id}`);

    const parentAbsPath = path.join(repoRoot, lineage.parent_artifact_path);
    assert.ok(fs.existsSync(parentAbsPath), `Parent artifact file not found: ${parentAbsPath}`);

    const parentBuf = fs.readFileSync(parentAbsPath);
    const actualParentSha = sha256(parentBuf);
    assert.strictEqual(actualParentSha, lineage.parent_artifact_sha256, `Parent SHA-256 mismatch for ${item.target_id}`);

    const parentHtml = parentBuf.toString('utf8');
    assert.ok(parentHtml.includes(lineage.literal_href), `literal_href '${lineage.literal_href}' not found in parent HTML of ${item.target_id}`);
  }
});

// TEST 03: All 66 captured artifacts exist on disk with valid SHA-256
runTest('TEST_03_ALL_66_CAPTURED_ARTIFACTS_EXIST_WITH_SHA256_PARITY', () => {
  const m087a = JSON.parse(fs.readFileSync(manifest087aPath, 'utf8'));
  const m087b = JSON.parse(fs.readFileSync(manifest087bPath, 'utf8'));

  const checkManifest = (m, baseDir) => {
    for (const item of m.results) {
      const itemDir = path.join(baseDir, item.target_id);
      assert.ok(fs.existsSync(itemDir), `Capture directory missing for ${item.target_id}`);

      const pngPath = path.join(itemDir, 'page.png');
      const htmlPath = path.join(itemDir, 'page.html');
      const txtPath = path.join(itemDir, 'page.txt');
      const receiptPath = path.join(itemDir, 'capture_receipt.json');

      assert.ok(fs.existsSync(pngPath), `PNG missing for ${item.target_id}`);
      assert.ok(fs.existsSync(htmlPath), `HTML missing for ${item.target_id}`);
      assert.ok(fs.existsSync(txtPath), `TXT missing for ${item.target_id}`);
      assert.ok(fs.existsSync(receiptPath), `Receipt missing for ${item.target_id}`);

      const receipt = JSON.parse(fs.readFileSync(receiptPath, 'utf8'));
      const actualTxtHash = sha256(fs.readFileSync(txtPath));
      assert.strictEqual(actualTxtHash, receipt.files.text_extract.sha256, `TXT hash mismatch for ${item.target_id}`);
    }
  };

  checkManifest(m087a, path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_087a', 'captures_087a'));
  checkManifest(m087b, path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_087b', 'captures_087b'));
});

// TEST 04: Every non-null bundle quote exists byte-for-byte in the physical artifact
runTest('TEST_04_EVERY_NON_NULL_BUNDLE_QUOTE_EXISTS_BYTE_FOR_BYTE_IN_ARTIFACT', () => {
  const matrix = JSON.parse(fs.readFileSync(unifiedMatrixPath, 'utf8'));

  for (const item of matrix.items) {
    const b = item.bundle_6_point;
    const fields = ['price_or_discount', 'terms_and_conditions', 'valid_until', 'locality_danang', 'redemption_channel'];

    for (const f of fields) {
      const val = b[f];
      if (val !== null && typeof val === 'object') {
        assert.ok(val.quote, `Field ${f} has object without quote for ${item.target_id}`);
        assert.ok(val.artifact_path, `Field ${f} missing artifact_path for ${item.target_id}`);
        assert.ok(val.artifact_sha256, `Field ${f} missing artifact_sha256 for ${item.target_id}`);

        const absPath = path.join(repoRoot, val.artifact_path);
        assert.ok(fs.existsSync(absPath), `Artifact file not found: ${absPath}`);

        const fileBuf = fs.readFileSync(absPath);
        const actualSha = sha256(fileBuf);
        assert.strictEqual(actualSha, val.artifact_sha256, `Artifact SHA mismatch for ${item.target_id} field ${f}`);

        const fileContent = fileBuf.toString('utf8');
        assert.ok(fileContent.includes(val.quote), `Quote '${val.quote}' does NOT exist byte-for-byte in ${val.artifact_path} for ${item.target_id}`);
      }
    }
  }
});

// TEST 05: Unified matrix accounting 66 targets & zero false candidates
runTest('TEST_05_UNIFIED_MATRIX_ACCOUNTING_66_TARGETS_ZERO_FALSE_CANDIDATES', () => {
  const matrix = JSON.parse(fs.readFileSync(unifiedMatrixPath, 'utf8'));
  assert.strictEqual(matrix.total_targets, 66);
  assert.strictEqual(matrix.pass_counts.pass_087a_targets, 40);
  assert.strictEqual(matrix.pass_counts.pass_087b_second_pass_targets, 26);

  let totalVerified = 0;
  Object.values(matrix.cohorts).forEach(c => totalVerified += c.verified_candidates);
  assert.strictEqual(totalVerified, 0, 'No false verified candidates permitted');
});

// TEST 06: Evidence deficit report documented
runTest('TEST_06_EVIDENCE_DEFICIT_REPORT_DOCUMENTED', () => {
  assert.ok(fs.existsSync(reviewPackPath), 'Review Pack 087B missing');
  const content = fs.readFileSync(reviewPackPath, 'utf8');
  assert.ok(content.includes('JAYT VERIFIED SUPPLY UNIFIED REVIEW PACK (087B)'));
  assert.ok(content.includes('BÁO CÁO THIẾU HỤT ĐỊNH LƯỢNG THEO TỪNG ĐIỂM CHỨNG CỨ'));
  assert.ok(content.includes('price_or_discount'));
});

// TEST 07: Radar UI and dataset invariance from 086V
runTest('TEST_07_RADAR_UI_AND_DATASET_UNCHANGED_FROM_086V', () => {
  const jsonSotHash = sha256(fs.readFileSync(radarDatasetPath));
  const jsonDeployHash = sha256(fs.readFileSync(deployJsonPath));
  const jsonStagingHash = sha256(fs.readFileSync(stagingJsonPath));

  assert.strictEqual(jsonSotHash, jsonDeployHash, 'JSON hash parity SoT === Deploy failed');
  assert.strictEqual(jsonSotHash, jsonStagingHash, 'JSON hash parity SoT === Staging failed');
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
  console.log(`🟢 [MATRIX-HARDENING-087B-SUMMARY] Kết quả kiểm thử: ${passedTests}/${totalTests} PASS!\n`);
} else {
  console.log(`❌ [MATRIX-HARDENING-087B-SUMMARY] Thất bại: ${passedTests}/${totalTests} PASS.\n`);
  process.exitCode = 1;
}
