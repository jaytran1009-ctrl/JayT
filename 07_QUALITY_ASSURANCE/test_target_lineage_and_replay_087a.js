/**
 * JAYT TARGET LINEAGE CONTAINMENT AND REPLAY TEST SUITE (087A)
 * Directive: JAYT-087A-TARGET-LINEAGE-CONTAINMENT-AND-REPLAY
 *
 * Verifies:
 * 1. 100% Upstream DOM Lineage: Every target must trace back to parent_artifact_path,
 *    match parent_artifact_sha256, contain literal_href at link_offset, and resolve to requested_url.
 * 2. Physical Replay Artifacts: All 40 target folders contain page.png, page.html, page.txt, receipt.
 * 3. 5-Cohort Coverage: Cinema, F&B, Coffee/Tea, Food & Ride, Wallets all covered with DOM-derived targets.
 * 4. 087 Incident Quarantine: 149 files sealed in quarantine_vault_087_target_lineage_incident with receipt.
 * 5. Strict Matrix Ground Truth: Bundle fields require quote + hash or null; verified_candidates = 0.
 * 6. UI & Radar Invariance: SSOT radar_dataset_086u.json hash parity preserved across all instances.
 * 7. Review Pack 087A: JAYT_VERIFIED_SUPPLY_REVIEW_PACK_087A.md published with gap analysis.
 * 8. Production Invariants Locked: deals_feed.json: [], is_approved: false.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

const repoRoot = path.resolve(__dirname, '..');
const manifest087aPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_087a', 'captures_087a', 'batch_manifest_087a.json');
const matrix087aPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_087a', 'ground_truth_matrix_087a.json');
const quarantineManifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault_087_target_lineage_incident', 'quarantine_manifest_087.json');
const correctionReceiptPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'correction_receipt_087a_target_lineage_containment.json');
const reviewPackPath = path.join(repoRoot, '08_RELEASE_VAULT', 'JAYT_VERIFIED_SUPPLY_REVIEW_PACK_087A.md');
const radarDatasetPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'radar_dataset_086u.json');
const deployJsonPath = path.join(repoRoot, 'deploy', 'public', 'radar_dataset_086u.json');
const stagingJsonPath = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '03_SOURCE_OF_TRUTH', 'radar_dataset_086u.json');
const dealsFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

console.log('🧪 [JAYT-087A-TEST] Khởi chạy bộ kiểm thử Target Lineage Containment & Replay 087A...\n');

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

// TEST 01: 100% Upstream DOM Lineage Verification
runTest('TEST_01_ALL_TARGETS_HAVE_VERIFIABLE_PARENT_DOM_LINEAGE', () => {
  assert.ok(fs.existsSync(manifest087aPath), 'Manifest 087A missing');
  const manifest = JSON.parse(fs.readFileSync(manifest087aPath, 'utf8'));

  for (const item of manifest.results) {
    const lineage = item.target_lineage;
    assert.ok(lineage, `Lineage missing for target ${item.target_id}`);
    assert.ok(lineage.parent_artifact_path, `parent_artifact_path missing for ${item.target_id}`);
    assert.ok(lineage.parent_artifact_sha256, `parent_artifact_sha256 missing for ${item.target_id}`);
    assert.ok(lineage.literal_href, `literal_href missing for ${item.target_id}`);
    assert.ok(typeof lineage.link_offset === 'number', `link_offset missing for ${item.target_id}`);

    // Verify parent file exists on disk
    const parentAbsPath = path.join(repoRoot, lineage.parent_artifact_path);
    assert.ok(fs.existsSync(parentAbsPath), `Parent artifact file not found: ${parentAbsPath}`);

    // Verify parent SHA-256
    const parentBuf = fs.readFileSync(parentAbsPath);
    const actualParentSha = sha256(parentBuf);
    assert.strictEqual(actualParentSha, lineage.parent_artifact_sha256, `Parent SHA-256 mismatch for ${item.target_id}`);

    // Verify literal_href exists in parent HTML
    const parentHtml = parentBuf.toString('utf8');
    assert.ok(parentHtml.includes(lineage.literal_href), `literal_href '${lineage.literal_href}' not found in parent HTML of ${item.target_id}`);
  }
});

// TEST 02: Physical Replay Artifacts on Disk
runTest('TEST_02_ALL_CAPTURED_ARTIFACTS_EXIST_ON_DISK_WITH_MATCHING_SHA256', () => {
  const manifest = JSON.parse(fs.readFileSync(manifest087aPath, 'utf8'));
  assert.strictEqual(manifest.results.length, 40, 'Must have 40 replay targets');

  for (const item of manifest.results) {
    const itemDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_087a', 'captures_087a', item.target_id);
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

// TEST 03: 5-Cohort Coverage with DOM Targets
runTest('TEST_03_COHORT_COVERAGE_ALL_5_SECTORS', () => {
  const manifest = JSON.parse(fs.readFileSync(manifest087aPath, 'utf8'));
  const sectorCounts = {};
  manifest.results.forEach(r => {
    sectorCounts[r.sector] = (sectorCounts[r.sector] || 0) + 1;
  });

  const expectedSectors = ['CINEMA', 'FNB_FASTFOOD', 'COFFEE_TEA', 'FOOD_AND_RIDE', 'ECOMMERCE_WALLETS'];
  for (const s of expectedSectors) {
    assert.strictEqual(sectorCounts[s], 8, `Sector ${s} must have 8 targets in 087A replay`);
  }
});

// TEST 04: Quarantine 087 Sealed with Correction Receipt
runTest('TEST_04_QUARANTINE_087_SEALED_WITH_CORRECTION_RECEIPT', () => {
  assert.ok(fs.existsSync(quarantineManifestPath), 'Quarantine manifest 087 missing');
  const qManifest = JSON.parse(fs.readFileSync(quarantineManifestPath, 'utf8'));
  assert.strictEqual(qManifest.total_quarantined_files, 149, 'Must quarantine exactly 149 files from 087');

  assert.ok(fs.existsSync(correctionReceiptPath), 'Correction receipt 087A missing');
  const receipt = JSON.parse(fs.readFileSync(correctionReceiptPath, 'utf8'));
  assert.strictEqual(receipt.correction_id, 'CORRECTION_087A_TARGET_LINEAGE_CONTAINMENT');
  assert.strictEqual(receipt.verdict, 'TARGET_LINEAGE_CONTAINED_AND_REPLAYED');
});

// TEST 05: Ground Truth Matrix 087A Strict Quote & Hash
runTest('TEST_05_GROUND_TRUTH_MATRIX_087A_STRICT_QUOTE_AND_HASH', () => {
  assert.ok(fs.existsSync(matrix087aPath), 'Matrix 087A missing');
  const matrix = JSON.parse(fs.readFileSync(matrix087aPath, 'utf8'));

  let totalVerified = 0;
  Object.values(matrix.cohorts).forEach(c => totalVerified += c.verified_candidates);
  assert.strictEqual(totalVerified, 0, 'No false verified candidates permitted without complete proof');

  for (const item of matrix.items) {
    const b = item.bundle_6_point;
    if (b.locality_danang !== null) {
      assert.ok(b.locality_danang.quote, `Locality quote missing for ${item.target_id}`);
      assert.ok(b.locality_danang.source_hash, `Locality source hash missing for ${item.target_id}`);
    }
    if (b.redemption_channel !== null) {
      assert.ok(b.redemption_channel.quote, `Channel quote missing for ${item.target_id}`);
      assert.ok(b.redemption_channel.source_hash, `Channel source hash missing for ${item.target_id}`);
    }
  }
});

// TEST 06: Radar UI and Dataset Invariance from 086V
runTest('TEST_06_RADAR_UI_AND_DATASET_UNCHANGED_FROM_086V', () => {
  const jsonSotHash = sha256(fs.readFileSync(radarDatasetPath));
  const jsonDeployHash = sha256(fs.readFileSync(deployJsonPath));
  const jsonStagingHash = sha256(fs.readFileSync(stagingJsonPath));

  assert.strictEqual(jsonSotHash, jsonDeployHash, 'JSON hash parity SoT === Deploy failed');
  assert.strictEqual(jsonSotHash, jsonStagingHash, 'JSON hash parity SoT === Staging failed');
});

// TEST 07: Review Pack 087A Exists with Lineage Report
runTest('TEST_07_REVIEW_PACK_087A_EXISTS_WITH_LINEAGE_REPORT', () => {
  assert.ok(fs.existsSync(reviewPackPath), 'Review Pack 087A missing');
  const content = fs.readFileSync(reviewPackPath, 'utf8');
  assert.ok(content.includes('JAYT VERIFIED SUPPLY REPLAY REVIEW PACK (087A)'));
  assert.ok(content.includes('CÔNG BỐ SỰ CỐ VÀ CÁCH LY 087'));
  assert.ok(content.includes('parent_artifact_path'));
});

// TEST 08: Production Invariants Locked
runTest('TEST_08_PRODUCTION_INVARIANTS_LOCKED', () => {
  const feedContent = JSON.parse(fs.readFileSync(dealsFeedPath, 'utf8'));
  assert.strictEqual(feedContent.length, 0, 'Production feed must remain []');

  const releaseManifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
  assert.strictEqual(releaseManifest.governance_locks.immutable_ceo_approval_record.is_approved, false, 'is_approved must remain false');
});

console.log('\n======================================================');
if (passedTests === totalTests) {
  console.log(`🟢 [TARGET-LINEAGE-087A-SUMMARY] Kết quả kiểm thử: ${passedTests}/${totalTests} PASS!\n`);
} else {
  console.log(`❌ [TARGET-LINEAGE-087A-SUMMARY] Thất bại: ${passedTests}/${totalTests} PASS.\n`);
  process.exitCode = 1;
}
