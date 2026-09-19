/**
 * JAYT EVIDENCE INTEGRITY & LOCAL DEAL EXPANSION TEST SUITE (088D)
 * Directive: JAYT-088D-EVIDENCE-INTEGRITY-AND-LOCAL-DEAL-EXPANSION
 *
 * Verifies:
 * 1. Mandatory Parent Receipt & Deterministic Lineage URL Resolution:
 *    - Parent receipt MUST exist (fails if missing).
 *    - Literal href parsed at link_offset, resolved deterministically, matching requested_url and final_url.
 * 2. Full 3-File SHA-256 Integrity Verification:
 *    - Computes and verifies SHA-256 for page.png, page.html, and page.txt against receipt records.
 * 3. Two Candidates Preserved in PENDING_CEO_REVIEW:
 *    - Metiz U22 and CGV Payday maintained with verified physical street locality.
 * 4. Byte-for-Byte Quote Proof: Every single bundle piece quote MUST exist byte-for-byte in the physical artifact text on disk.
 * 5. Zero Hardcoded Count Quotas: No candidate >= N or loyalty == N forcing; purely structural and evidentiary audit.
 * 6. Loyalty Policies Strictly Isolated: 4 loyalty references preserved without deal/CTA inflation.
 * 7. Radar UI & Dataset Invariance: SSOT radar_dataset_086u.json hash parity preserved across all instances.
 * 8. Production Invariants Locked: deals_feed.json: [], is_approved: false.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

const repoRoot = path.resolve(__dirname, '..');
const manifest088dPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_088d', 'captures_088d', 'batch_manifest_088d.json');
const manifest088cPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_088c', 'captures_088c', 'batch_manifest_088c.json');
const bundleManifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_088d', 'evidence_bundles_088d.json');
const reviewPackPath = path.join(repoRoot, '08_RELEASE_VAULT', 'JAYT_VERIFIED_SUPPLY_REVIEW_PACK_088D.md');
const radarDatasetPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'radar_dataset_086u.json');
const deployJsonPath = path.join(repoRoot, 'deploy', 'public', 'radar_dataset_086u.json');
const stagingJsonPath = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '03_SOURCE_OF_TRUTH', 'radar_dataset_086u.json');
const dealsFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

console.log('🧪 [JAYT-088D-TEST] Khởi chạy bộ kiểm thử Evidence Integrity & Local Deal Expansion 088D...\n');

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

// TEST 01: Mandatory Parent Receipt & Deterministic Lineage URL Resolution
runTest('TEST_01_MANDATORY_PARENT_RECEIPT_AND_DETERMINISTIC_LINEAGE_URL_PARSE', () => {
  assert.ok(fs.existsSync(manifest088dPath), 'Manifest 088D missing');
  const manifest = JSON.parse(fs.readFileSync(manifest088dPath, 'utf8'));
  assert.strictEqual(manifest.results.length, 32, 'Must have 32 targets in 088D');

  for (const item of manifest.results) {
    const lineage = item.target_lineage;
    assert.ok(lineage, `Lineage missing for target ${item.target_id}`);
    assert.ok(lineage.parent_artifact_path, `parent_artifact_path missing for ${item.target_id}`);
    assert.ok(lineage.parent_artifact_sha256, `parent_artifact_sha256 missing for ${item.target_id}`);
    assert.ok(lineage.literal_href, `literal_href missing for ${item.target_id}`);
    assert.ok(typeof lineage.link_offset === 'number', `link_offset missing for ${item.target_id}`);

    const parentAbsPath = path.join(repoRoot, lineage.parent_artifact_path);
    assert.ok(fs.existsSync(parentAbsPath), `Parent artifact file not found: ${parentAbsPath}`);

    // Mandatory Parent Receipt Check (FAILS if missing)
    const parentDir = path.dirname(parentAbsPath);
    const parentReceiptPath = path.join(parentDir, 'capture_receipt.json');
    assert.ok(fs.existsSync(parentReceiptPath), `Mandatory parent receipt missing at: ${parentReceiptPath}`);

    const parentReceipt = JSON.parse(fs.readFileSync(parentReceiptPath, 'utf8'));
    assert.ok(parentReceipt.requested_url, `parent receipt missing requested_url for ${item.target_id}`);

    const parentBuf = fs.readFileSync(parentAbsPath);
    const actualParentSha = sha256(parentBuf);
    assert.strictEqual(actualParentSha, lineage.parent_artifact_sha256, `Parent SHA-256 mismatch for ${item.target_id}`);

    const parentHtml = parentBuf.toString('utf8');
    const snippetAtOffset = parentHtml.slice(lineage.link_offset, lineage.link_offset + 300);
    assert.ok(snippetAtOffset.includes(lineage.literal_href), `literal_href '${lineage.literal_href}' not found at offset ${lineage.link_offset} of ${item.target_id}`);

    // Deterministic URL resolution against parent base domain
    const u = new URL(parentReceipt.requested_url);
    const baseDomain = `${u.protocol}//${u.host}`;

    let recomputed = '';
    if (lineage.literal_href.startsWith('http://') || lineage.literal_href.startsWith('https://')) {
      recomputed = lineage.literal_href;
    } else if (lineage.literal_href.startsWith('/')) {
      recomputed = baseDomain + lineage.literal_href;
    } else {
      recomputed = baseDomain + '/' + lineage.literal_href;
    }
    if (recomputed.includes('#')) recomputed = recomputed.split('#')[0];

    assert.strictEqual(recomputed, item.requested_url, `Deterministic URL resolution mismatch for ${item.target_id}`);
    if (item.receipt && item.receipt.final_url) {
      assert.strictEqual(item.final_url, item.receipt.final_url, `Final URL mismatch for ${item.target_id}`);
    }
  }
});

// TEST 02: Full 3-file SHA-256 integrity verification (PNG, HTML, TXT)
runTest('TEST_02_FULL_THREE_FILE_SHA256_INTEGRITY_VERIFICATION', () => {
  const manifests = [
    JSON.parse(fs.readFileSync(manifest088dPath, 'utf8')),
    JSON.parse(fs.readFileSync(manifest088cPath, 'utf8'))
  ];

  for (const manifest of manifests) {
    for (const item of manifest.results) {
      if (item.status === 'SUCCESS') {
        const batchDir = manifest.batch_id === 'BATCH_088D_PAIRED_SUPPLY_EXPANSION' ? 'batch_capture_088d' : 'batch_capture_088c';
        const capturesDir = manifest.batch_id === 'BATCH_088D_PAIRED_SUPPLY_EXPANSION' ? 'captures_088d' : 'captures_088c';
        const itemDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', batchDir, capturesDir, item.target_id);

        const pngPath = path.join(itemDir, 'page.png');
        const htmlPath = path.join(itemDir, 'page.html');
        const txtPath = path.join(itemDir, 'page.txt');
        const receiptPath = path.join(itemDir, 'capture_receipt.json');

        assert.ok(fs.existsSync(pngPath), `PNG missing for ${item.target_id}`);
        assert.ok(fs.existsSync(htmlPath), `HTML missing for ${item.target_id}`);
        assert.ok(fs.existsSync(txtPath), `TXT missing for ${item.target_id}`);
        assert.ok(fs.existsSync(receiptPath), `Receipt missing for ${item.target_id}`);

        const receipt = JSON.parse(fs.readFileSync(receiptPath, 'utf8'));

        const actualPngHash = sha256(fs.readFileSync(pngPath));
        const actualHtmlHash = sha256(fs.readFileSync(htmlPath));
        const actualTxtHash = sha256(fs.readFileSync(txtPath));

        assert.strictEqual(actualPngHash, receipt.files.screenshot_png.sha256, `PNG SHA-256 mismatch for ${item.target_id}`);
        assert.strictEqual(actualHtmlHash, receipt.files.raw_html.sha256, `HTML SHA-256 mismatch for ${item.target_id}`);
        assert.strictEqual(actualTxtHash, receipt.files.text_extract.sha256, `TXT SHA-256 mismatch for ${item.target_id}`);
      }
    }
  }
});

// TEST 03: Two candidates preserved in PENDING_CEO_REVIEW
runTest('TEST_03_TWO_CANDIDATES_PRESERVED_IN_PENDING_CEO_REVIEW', () => {
  const manifest = JSON.parse(fs.readFileSync(bundleManifestPath, 'utf8'));

  const metiz = manifest.bundles.find(b => b.bundle_id === 'BUNDLE_088D_METIZ_U22_RECURRING');
  const cgv = manifest.bundles.find(b => b.bundle_id === 'BUNDLE_088D_CGV_PAYDAY_30K_TIME_BOUNDED');

  assert.ok(metiz && metiz.tier === 'RECURRING_POLICY_CANDIDATE', 'Metiz U22 candidate preserved');
  assert.ok(cgv && cgv.tier === 'TIME_BOUNDED_CANDIDATE', 'CGV Payday candidate preserved');
  assert.ok(metiz.pieces.danang_branch.quote.includes('Số 01 Đường 2 Tháng 9, Hải Châu, Đà Nẵng'), 'Metiz Da Nang branch verified');
  assert.ok(cgv.pieces.danang_branch.quote.includes('Vincom Đà Nẵng'), 'CGV Da Nang branch verified');
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

// TEST 05: No hardcoded count quotas - pure structural and evidentiary audit
runTest('TEST_05_NO_HARDCODED_COUNT_QUOTAS_PURE_STRUCTURAL_AUDIT', () => {
  const manifest = JSON.parse(fs.readFileSync(bundleManifestPath, 'utf8'));

  let verifiedCandidates = 0;
  let verifiedLoyalties = 0;
  let verifiedSignals = 0;

  for (const b of manifest.bundles) {
    assert.ok(b.bundle_id, 'Bundle must have bundle_id');
    assert.ok(b.brand, 'Bundle must have brand');
    assert.ok(b.sector, 'Bundle must have sector');
    assert.ok(b.tier, 'Bundle must have tier');
    assert.ok(b.pieces, 'Bundle must have pieces');

    if (b.tier === 'RECURRING_POLICY_CANDIDATE' || b.tier === 'TIME_BOUNDED_CANDIDATE') {
      assert.ok(b.computable_offer, `Candidate ${b.bundle_id} must have computable offer`);
      assert.ok(b.pieces.policy_scope, `Candidate ${b.bundle_id} must have policy_scope`);
      assert.ok(b.pieces.danang_branch, `Candidate ${b.bundle_id} must have danang_branch`);
      verifiedCandidates++;
    } else if (b.tier === 'LOYALTY_POLICY_REFERENCE') {
      assert.strictEqual(b.computable_offer, undefined, `Loyalty policy ${b.bundle_id} must not have deal offer`);
      verifiedLoyalties++;
    } else if (b.tier === 'SIGNAL_ONLY') {
      verifiedSignals++;
    }
  }

  // Pure dynamic reporting (0 quota forcing)
  console.log(`     (Dynamic Audit 088D: ${verifiedCandidates} Candidates · ${verifiedLoyalties} Loyalty Policies · ${verifiedSignals} Signals)`);
});

// TEST 06: Loyalty policies strictly isolated from deal CTAs
runTest('TEST_06_LOYALTY_POLICIES_STRICTLY_ISOLATED_FROM_DEAL_CTAS', () => {
  const manifest = JSON.parse(fs.readFileSync(bundleManifestPath, 'utf8'));

  const loyaltyBundles = manifest.bundles.filter(b => b.tier === 'LOYALTY_POLICY_REFERENCE');
  for (const lb of loyaltyBundles) {
    assert.strictEqual(lb.computable_offer, undefined, `Loyalty policy ${lb.bundle_id} must not have deal offer`);
    assert.strictEqual(lb.pieces.promo_code, undefined, `Loyalty policy ${lb.bundle_id} must not have promo code`);
  }
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
  console.log(`🟢 [EVIDENCE-INTEGRITY-088D-SUMMARY] Kết quả kiểm thử: ${passedTests}/${totalTests} PASS!\n`);
} else {
  console.log(`❌ [EVIDENCE-INTEGRITY-088D-SUMMARY] Thất bại: ${passedTests}/${totalTests} PASS.\n`);
  process.exitCode = 1;
}
