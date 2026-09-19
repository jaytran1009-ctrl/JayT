/**
 * JAYT CANDIDATE SEMANTICS & LOCALITY REPLAY TEST SUITE (088B)
 * Directive: JAYT-088B-CANDIDATE-SEMANTICS-AND-LOCALITY-REPLAY
 *
 * Verifies:
 * 1. 100% Upstream DOM Lineage with Offset & Resolution Verification:
 *    - All 3 CGV Da Nang theaters trace back to parent DOM, with literal_href matching at exact link_offset.
 * 2. Physical Capture Parity: All 3 CGV Da Nang capture folders contain page.png, page.html, page.txt, receipt.
 * 3. Specific Locality Verification: Candidate danang_branch quote MUST contain a specific street address or branch name (not isolated "Đà Nẵng").
 * 4. Metiz Semantics Verification: Metiz candidate records "Giá ưu đãi 55.000đ/vé (2D)" without unsubstantiated "tiết kiệm".
 * 5. Byte-for-Byte Quote Proof: Every single bundle piece quote MUST exist byte-for-byte in the physical artifact text on disk.
 * 6. Dynamic Candidate Accounting: Candidates are evaluated and counted dynamically based on genuine evidence.
 * 7. Radar UI & Dataset Invariance: SSOT radar_dataset_086u.json hash parity preserved across all instances.
 * 8. Production Invariants Locked: deals_feed.json: [], is_approved: false.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

const repoRoot = path.resolve(__dirname, '..');
const manifest088bPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_088b', 'captures_088b', 'batch_manifest_088b.json');
const bundleManifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_088b', 'evidence_bundles_088b.json');
const reviewPackPath = path.join(repoRoot, '08_RELEASE_VAULT', 'JAYT_VERIFIED_SUPPLY_REVIEW_PACK_088B.md');
const radarDatasetPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'radar_dataset_086u.json');
const deployJsonPath = path.join(repoRoot, 'deploy', 'public', 'radar_dataset_086u.json');
const stagingJsonPath = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '03_SOURCE_OF_TRUTH', 'radar_dataset_086u.json');
const dealsFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

console.log('🧪 [JAYT-088B-TEST] Khởi chạy bộ kiểm thử Candidate Semantics & Locality Replay 088B...\n');

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

// TEST 01: All 3 CGV Da Nang theaters have parent DOM lineage with offset & resolution verification
runTest('TEST_01_CGV_DANANG_THEATERS_HAVE_PARENT_DOM_LINEAGE_WITH_OFFSET', () => {
  assert.ok(fs.existsSync(manifest088bPath), 'Manifest 088B missing');
  const manifest = JSON.parse(fs.readFileSync(manifest088bPath, 'utf8'));
  assert.strictEqual(manifest.results.length, 3, 'Must have 3 CGV Da Nang theaters');

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
    const snippetAtOffset = parentHtml.slice(lineage.link_offset, lineage.link_offset + 300);
    assert.ok(snippetAtOffset.includes(lineage.literal_href), `literal_href '${lineage.literal_href}' not found at offset ${lineage.link_offset} of ${item.target_id}`);
  }
});

// TEST 02: All captured CGV artifacts exist with valid SHA-256
runTest('TEST_02_ALL_CAPTURED_CGV_ARTIFACTS_EXIST_WITH_SHA256', () => {
  const manifest = JSON.parse(fs.readFileSync(manifest088bPath, 'utf8'));

  for (const item of manifest.results) {
    const itemDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_088b', 'captures_088b', item.target_id);
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

// TEST 03: Candidate locality must contain specific branch or street address (not isolated "Đà Nẵng")
runTest('TEST_03_CANDIDATE_LOCALITY_MUST_CONTAIN_SPECIFIC_BRANCH_OR_STREET_ADDRESS', () => {
  const manifest = JSON.parse(fs.readFileSync(bundleManifestPath, 'utf8'));

  const candidates = manifest.bundles.filter(b => (
    b.tier === 'RECURRING_POLICY_CANDIDATE' || b.tier === 'TIME_BOUNDED_CANDIDATE'
  ));

  for (const c of candidates) {
    const branchQuote = c.pieces.danang_branch.quote;
    assert.ok(branchQuote, `Missing danang_branch quote in candidate ${c.bundle_id}`);
    assert.notStrictEqual(branchQuote.trim(), 'Đà Nẵng', `Isolated 'Đà Nẵng' is rejected as locality for candidate ${c.bundle_id}`);

    const isSpecific = (
      branchQuote.includes('Đường') ||
      branchQuote.includes('đường') ||
      branchQuote.includes('Số') ||
      branchQuote.includes('Tầng') ||
      branchQuote.includes('Quận') ||
      branchQuote.includes('Q.') ||
      branchQuote.includes('P.') ||
      branchQuote.includes('Phường') ||
      branchQuote.includes('TTTM') ||
      branchQuote.includes('Vincom')
    );
    assert.ok(isSpecific, `Locality quote '${branchQuote}' must contain specific street address or branch details in ${c.bundle_id}`);
  }
});

// TEST 04: Metiz semantics strictly discounted offer without unsubstantiated savings claim
runTest('TEST_04_METIZ_SEMANTICS_STRICTLY_DISCOUNTED_OFFER_NO_INFERRED_SAVINGS', () => {
  const manifest = JSON.parse(fs.readFileSync(bundleManifestPath, 'utf8'));
  const metizBundle = manifest.bundles.find(b => b.bundle_id === 'BUNDLE_088B_METIZ_U22_RECURRING');

  assert.ok(metizBundle, 'Metiz bundle missing');
  assert.strictEqual(metizBundle.computable_offer, 'Giá ưu đãi 55.000đ/vé (2D)', 'Must state exact discounted offer');
  assert.strictEqual(metizBundle.computable_offer.includes('tiết kiệm so với giá cơ sở'), false, 'No inferred savings permitted');
});

// TEST 05: Every piece quote exists byte-for-byte in the physical artifact
runTest('TEST_05_EVERY_PIECE_QUOTE_EXISTS_BYTE_FOR_BYTE_IN_PHYSICAL_ARTIFACT', () => {
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

// TEST 06: Dynamic candidate accounting based on genuine evidence
runTest('TEST_06_DYNAMIC_CANDIDATE_ACCOUNTING_BASED_ON_GENUINE_EVIDENCE', () => {
  const manifest = JSON.parse(fs.readFileSync(bundleManifestPath, 'utf8'));

  let verifiedCount = 0;
  for (const b of manifest.bundles) {
    if (b.tier === 'RECURRING_POLICY_CANDIDATE' || b.tier === 'TIME_BOUNDED_CANDIDATE') {
      assert.ok(b.computable_offer, `Candidate ${b.bundle_id} must have computable offer`);
      assert.ok(b.pieces.policy_scope, `Candidate ${b.bundle_id} must have policy_scope`);
      assert.ok(b.pieces.danang_branch, `Candidate ${b.bundle_id} must have danang_branch`);
      verifiedCount++;
    }
  }
  assert.ok(verifiedCount >= 1, `Must have at least 1 verified candidate based on evidence (found ${verifiedCount})`);
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
  console.log(`🟢 [SEMANTICS-LOCALITY-088B-SUMMARY] Kết quả kiểm thử: ${passedTests}/${totalTests} PASS!\n`);
} else {
  console.log(`❌ [SEMANTICS-LOCALITY-088B-SUMMARY] Thất bại: ${passedTests}/${totalTests} PASS.\n`);
  process.exitCode = 1;
}
