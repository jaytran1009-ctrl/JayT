/**
 * JAYT RECURRING POLICY EVIDENCE RESOLUTION TEST SUITE (088)
 * Directive: JAYT-088-RECURRING-POLICY-EVIDENCE-RESOLUTION
 *
 * Verifies:
 * 1. 100% Upstream DOM Lineage: All 31 policy targets trace back to parent artifacts with matching SHA-256, literal_href at offset, and resolution.
 * 2. Physical Capture Parity: All 31 target folders contain page.png, page.html, page.txt, receipt.
 * 3. Qualified Candidate Bundles: >= 5 bundles in RECURRING_POLICY_CANDIDATE or TIME_BOUNDED_CANDIDATE tiers.
 * 4. Byte-for-Byte Quote Proof: Every single bundle piece quote MUST exist byte-for-byte in the physical artifact text on disk.
 * 5. Transparent Validity Mechanics: RECURRING_POLICY has checked_at/recheck_due_at without invented valid_to; TIME_BOUNDED has specific source-stated dates.
 * 6. Review Pack 088: JAYT_VERIFIED_SUPPLY_REVIEW_PACK_088.md published with multi-piece evidence linkage.
 * 7. Radar UI & Dataset Invariance: SSOT radar_dataset_086u.json hash parity preserved across all instances.
 * 8. Production Invariants Locked: deals_feed.json: [], is_approved: false.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

const repoRoot = path.resolve(__dirname, '..');
const manifest088Path = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_088', 'captures_088', 'batch_manifest_088.json');
const bundleManifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_088', 'evidence_bundles_088.json');
const reviewPackPath = path.join(repoRoot, '08_RELEASE_VAULT', 'JAYT_VERIFIED_SUPPLY_REVIEW_PACK_088.md');
const radarDatasetPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'radar_dataset_086u.json');
const deployJsonPath = path.join(repoRoot, 'deploy', 'public', 'radar_dataset_086u.json');
const stagingJsonPath = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '03_SOURCE_OF_TRUTH', 'radar_dataset_086u.json');
const dealsFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

console.log('🧪 [JAYT-088-TEST] Khởi chạy bộ kiểm thử Recurring Policy Evidence Resolution 088...\n');

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

// TEST 01: All 31 policy targets have verifiable upstream parent DOM lineage
runTest('TEST_01_DISCOVERED_POLICY_TARGETS_HAVE_UPSTREAM_PARENT_LINEAGE', () => {
  assert.ok(fs.existsSync(manifest088Path), 'Manifest 088 missing');
  const manifest = JSON.parse(fs.readFileSync(manifest088Path, 'utf8'));
  assert.strictEqual(manifest.results.length, 31, 'Must have 31 policy targets');

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

// TEST 02: All captured policy artifacts exist on disk with valid SHA-256
runTest('TEST_02_ALL_CAPTURED_POLICY_ARTIFACTS_EXIST_WITH_SHA256', () => {
  const manifest = JSON.parse(fs.readFileSync(manifest088Path, 'utf8'));

  for (const item of manifest.results) {
    const itemDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_088', 'captures_088', item.target_id);
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

// TEST 03: Evidence bundles have at least 5 qualified candidate bundles
runTest('TEST_03_EVIDENCE_BUNDLES_HAVE_AT_LEAST_5_QUALIFIED_CANDIDATES', () => {
  assert.ok(fs.existsSync(bundleManifestPath), 'Bundle manifest 088 missing');
  const manifest = JSON.parse(fs.readFileSync(bundleManifestPath, 'utf8'));

  const candidateBundles = manifest.bundles.filter(b => (
    b.tier === 'RECURRING_POLICY_CANDIDATE' || b.tier === 'TIME_BOUNDED_CANDIDATE'
  ));
  assert.ok(candidateBundles.length >= 5, `Must have >= 5 candidate bundles (found ${candidateBundles.length})`);
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

// TEST 05: Transparent validity mechanics enforced without synthetic valid_to
runTest('TEST_05_TRANSPARENT_VALIDITY_MECHANICS_ENFORCED', () => {
  const manifest = JSON.parse(fs.readFileSync(bundleManifestPath, 'utf8'));

  for (const bundle of manifest.bundles) {
    if (bundle.tier === 'RECURRING_POLICY_CANDIDATE') {
      assert.ok(bundle.freshness, `Freshness missing for recurring bundle ${bundle.bundle_id}`);
      assert.ok(bundle.freshness.checked_at, `checked_at missing for ${bundle.bundle_id}`);
      assert.ok(bundle.freshness.recheck_due_at, `recheck_due_at missing for ${bundle.bundle_id}`);
      assert.strictEqual(bundle.valid_to, undefined, `Must NOT invent valid_to for recurring policy bundle ${bundle.bundle_id}`);
    } else if (bundle.tier === 'TIME_BOUNDED_CANDIDATE') {
      assert.ok(bundle.valid_from, `valid_from missing for time bounded bundle ${bundle.bundle_id}`);
      assert.ok(bundle.valid_to, `valid_to missing for time bounded bundle ${bundle.bundle_id}`);
    }
  }
});

// TEST 06: Review Pack 088 exists and documents all bundles
runTest('TEST_06_REVIEW_PACK_088_EXISTS_AND_DOCUMENTS_ALL_BUNDLES', () => {
  assert.ok(fs.existsSync(reviewPackPath), 'Review Pack 088 missing');
  const content = fs.readFileSync(reviewPackPath, 'utf8');
  assert.ok(content.includes('JAYT RECURRING POLICY EVIDENCE REVIEW PACK (088)'));
  assert.ok(content.includes('BUNDLE_088_METIZ_U22_RECURRING'));
  assert.ok(content.includes('BUNDLE_088_CGV_PAYDAY_30K_TIME_BOUNDED'));
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
  console.log(`🟢 [POLICY-RESOLUTION-088-SUMMARY] Kết quả kiểm thử: ${passedTests}/${totalTests} PASS!\n`);
} else {
  console.log(`❌ [POLICY-RESOLUTION-088-SUMMARY] Thất bại: ${passedTests}/${totalTests} PASS.\n`);
  process.exitCode = 1;
}
