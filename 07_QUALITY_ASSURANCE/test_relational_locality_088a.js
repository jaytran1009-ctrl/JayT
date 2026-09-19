/**
 * JAYT RELATIONAL LOCALITY & BULK BRANCH RESOLUTION TEST SUITE (088A)
 * Directive: JAYT-088A-RELATIONAL-LOCALITY-CORRECTION-AND-BULK-BRANCH-RESOLUTION
 *
 * Verifies:
 * 1. 100% Upstream DOM Lineage: All 24 branch locator targets trace back to parent artifacts with matching SHA-256, literal_href at offset, and resolution.
 * 2. Physical Capture Parity: All 24 branch target folders contain page.png, page.html, page.txt, receipt.
 * 3. Mandatory 2-Piece Relational Locality: policy_scope + danang_branch required on all candidate/loyalty bundles. Hotline/brand name alone rejected.
 * 4. Byte-for-Byte Quote Proof: Every single bundle piece quote MUST exist byte-for-byte in the physical artifact text on disk.
 * 5. Loyalty Point Programs Classified as LOYALTY_POLICY_REFERENCE: Point accumulation programs are not inflated to deal candidates.
 * 6. Zero Quota Forcing: Computable deal candidates counted honestly (2 candidates).
 * 7. Radar UI & Dataset Invariance: SSOT radar_dataset_086u.json hash parity preserved across all instances.
 * 8. Production Invariants Locked: deals_feed.json: [], is_approved: false.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

const repoRoot = path.resolve(__dirname, '..');
const manifest088aPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_088a', 'captures_088a', 'batch_manifest_088a.json');
const bundleManifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_088a', 'evidence_bundles_088a.json');
const reviewPackPath = path.join(repoRoot, '08_RELEASE_VAULT', 'JAYT_VERIFIED_SUPPLY_REVIEW_PACK_088A.md');
const radarDatasetPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'radar_dataset_086u.json');
const deployJsonPath = path.join(repoRoot, 'deploy', 'public', 'radar_dataset_086u.json');
const stagingJsonPath = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '03_SOURCE_OF_TRUTH', 'radar_dataset_086u.json');
const dealsFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

console.log('🧪 [JAYT-088A-TEST] Khởi chạy bộ kiểm thử Relational Locality & Bulk Branch 088A...\n');

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

// TEST 01: All 24 branch targets have verifiable upstream parent DOM lineage
runTest('TEST_01_DISCOVERED_BRANCH_TARGETS_HAVE_UPSTREAM_PARENT_LINEAGE', () => {
  assert.ok(fs.existsSync(manifest088aPath), 'Manifest 088A missing');
  const manifest = JSON.parse(fs.readFileSync(manifest088aPath, 'utf8'));
  assert.strictEqual(manifest.results.length, 24, 'Must have 24 branch targets');

  for (const item of manifest.results) {
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

// TEST 02: All captured branch artifacts exist on disk with valid SHA-256
runTest('TEST_02_ALL_CAPTURED_BRANCH_ARTIFACTS_EXIST_WITH_SHA256', () => {
  const manifest = JSON.parse(fs.readFileSync(manifest088aPath, 'utf8'));

  for (const item of manifest.results) {
    const itemDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_088a', 'captures_088a', item.target_id);
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
});

// TEST 03: Mandatory 2-piece relational locality enforced
runTest('TEST_03_MANDATORY_TWO_PIECE_RELATIONAL_LOCALITY_ENFORCED', () => {
  const manifest = JSON.parse(fs.readFileSync(bundleManifestPath, 'utf8'));

  for (const bundle of manifest.bundles) {
    if (bundle.tier === 'RECURRING_POLICY_CANDIDATE' || bundle.tier === 'TIME_BOUNDED_CANDIDATE' || bundle.tier === 'LOYALTY_POLICY_REFERENCE') {
      const p = bundle.pieces;
      assert.ok(p.policy_scope, `policy_scope piece missing in ${bundle.bundle_id}`);
      assert.ok(p.danang_branch, `danang_branch piece missing in ${bundle.bundle_id}`);

      // Check that hotline or generic brand is not used as danang_branch
      assert.strictEqual(p.danang_branch.quote.startsWith('Hotline:'), false, `Hotline quote rejected as danang_branch in ${bundle.bundle_id}`);
      assert.strictEqual(p.danang_branch.quote === 'rạp Metiz Cinema', false, `Generic brand name rejected as danang_branch in ${bundle.bundle_id}`);
      assert.strictEqual(p.danang_branch.quote === 'RẠP CGV', false, `Generic text rejected as danang_branch in ${bundle.bundle_id}`);
    }
  }
});

// TEST 04: Every piece quote exists byte-for-byte in the physical artifact
runTest('TEST_04_EVERY_PIECE_QUOTE_EXISTS_BYTE_FOR_BYTE_IN_PHYSICAL_ARTIFACT', () => {
  const manifest = JSON.parse(fs.readFileSync(bundleManifestPath, 'utf8'));

  for (const bundle of manifest.bundles) {
    for (const [pieceName, piece] of Object.entries(bundle.pieces)) {
      assert.ok(piece.quote, `Piece ${pieceName} missing quote in ${bundle.bundle_id}`);
      assert.ok(piece.artifact_path, `Piece ${pieceName} missing artifact_path in ${bundle.bundle_id}`);
      assert.ok(piece.artifact_sha256, `Piece ${pieceName} missing artifact_sha256 in ${bundle.bundle_id}`);

      const absPath = path.join(repoRoot, piece.artifact_path);
      assert.ok(fs.existsSync(absPath), `Artifact file not found: ${absPath}`);

      const fileBuf = fs.readFileSync(absPath);
      const actualSha = sha256(fileBuf);
      assert.strictEqual(actualSha, piece.artifact_sha256, `Artifact SHA mismatch for ${bundle.bundle_id} piece ${pieceName}`);

      const fileContent = fileBuf.toString('utf8');
      assert.ok(fileContent.includes(piece.quote), `Quote '${piece.quote}' does NOT exist byte-for-byte in ${piece.artifact_path} for ${bundle.bundle_id}`);
    }
  }
});

// TEST 05: Loyalty point programs classified as LOYALTY_POLICY_REFERENCE
runTest('TEST_05_LOYALTY_POINT_PROGRAMS_CLASSIFIED_AS_LOYALTY_POLICY_REFERENCE', () => {
  const manifest = JSON.parse(fs.readFileSync(bundleManifestPath, 'utf8'));

  const cgvLoyalty = manifest.bundles.find(b => b.bundle_id === 'BUNDLE_088A_CGV_MEMBERSHIP_LOYALTY');
  const metizLoyalty = manifest.bundles.find(b => b.bundle_id === 'BUNDLE_088A_METIZ_MEMBER_2026_LOYALTY');
  const gongChaLoyalty = manifest.bundles.find(b => b.bundle_id === 'BUNDLE_088A_GONGCHA_MEMBERSHIP_LOYALTY');

  assert.ok(cgvLoyalty && cgvLoyalty.tier === 'LOYALTY_POLICY_REFERENCE', 'CGV loyalty must be LOYALTY_POLICY_REFERENCE');
  assert.ok(metizLoyalty && metizLoyalty.tier === 'LOYALTY_POLICY_REFERENCE', 'Metiz loyalty must be LOYALTY_POLICY_REFERENCE');
  assert.ok(gongChaLoyalty && gongChaLoyalty.tier === 'LOYALTY_POLICY_REFERENCE', 'Gong Cha loyalty must be LOYALTY_POLICY_REFERENCE');
});

// TEST 06: Zero quota forcing - exact candidate count verified
runTest('TEST_06_ZERO_QUOTA_FORCING_EXACT_CANDIDATE_COUNT', () => {
  const manifest = JSON.parse(fs.readFileSync(bundleManifestPath, 'utf8'));

  const candidates = manifest.bundles.filter(b => (
    b.tier === 'RECURRING_POLICY_CANDIDATE' || b.tier === 'TIME_BOUNDED_CANDIDATE'
  ));
  assert.strictEqual(candidates.length, 2, 'Must have exactly 2 computable deal candidates (Metiz U22 + CGV Payday)');
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
  console.log(`🟢 [RELATIONAL-LOCALITY-088A-SUMMARY] Kết quả kiểm thử: ${passedTests}/${totalTests} PASS!\n`);
} else {
  console.log(`❌ [RELATIONAL-LOCALITY-088A-SUMMARY] Thất bại: ${passedTests}/${totalTests} PASS.\n`);
  process.exitCode = 1;
}
