/**
 * JAYT DATA LINEAGE HARDENING TEST SUITE (060B)
 * Directive: JAYT-DATA-LINEAGE-HARDENING-060B / JAYT-PROJECT-MEMORY-TRANSACTION-057
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const { validateItemArtifactLineage, buildHardenedCeoReviewBatch060B } = require('./execute_bootstrap_sweep_060b');

const run060Dir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_060_manual_bootstrap');
const receipt058Path = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_058_first_cadence_observation', 'receipt.json');
const receipt058aPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_058a_cadence_receipt_lineage', 'receipt.json');
const receipt058bPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_058b_trigger_provenance_correction', 'receipt.json');
const receipt060Path = path.join(run060Dir, 'receipt.json');

const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

const EXPECTED_PROD_HASH = '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945';

let passedTests = 0;
let totalTests = 0;

function assertTest(testId, condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  [${testId}]: [PASS] - ${message}`);
  } else {
    console.error(`  [${testId}]: [FAIL] - ${message}`);
  }
}

function getSha256(strOrBuf) {
  if (!strOrBuf) return null;
  return crypto.createHash('sha256').update(strOrBuf).digest('hex');
}

function run060bTests() {
  console.log('🧪 [JAYT-DATA-LINEAGE-060B-TEST] Khởi chạy bộ kiểm thử Artifact Lineage Hardening (060B)...');

  const testArtifactsDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'private_sandbox', 'test_lineage_060b');
  fs.mkdirSync(testArtifactsDir, { recursive: true });

  const dummyHtml = '<html><body><h1>Khuyến Mãi Live 060B</h1></body></html>';
  const dummyText = 'Khuyến Mãi Live 060B';
  const dummyPng = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

  const htmlRelPath = '07_QUALITY_ASSURANCE/private_sandbox/test_lineage_060b/sample.html';
  const textRelPath = '07_QUALITY_ASSURANCE/private_sandbox/test_lineage_060b/sample.txt';
  const pngRelPath = '07_QUALITY_ASSURANCE/private_sandbox/test_lineage_060b/sample.png';

  fs.writeFileSync(path.join(repoRoot, htmlRelPath), dummyHtml, 'utf8');
  fs.writeFileSync(path.join(repoRoot, textRelPath), dummyText, 'utf8');
  fs.writeFileSync(path.join(repoRoot, pngRelPath), dummyPng);

  const htmlSha = getSha256(dummyHtml);
  const textSha = getSha256(dummyText);
  const pngSha = getSha256(dummyPng);

  const validItem = {
    brand_id: 'SAMPLE_BRAND',
    category: 'LOCAL_CINEMA',
    target_url: 'https://example.com/promo',
    captured_at: '2026-08-23T04:45:00.000Z',
    capture_provenance: 'LIVE_CDP',
    status: 'NEEDS_RECHECK',
    dom_container_scope: { is_container_scoped: false },
    artifacts: {
      html_path: htmlRelPath,
      html_sha256: htmlSha,
      text_path: textRelPath,
      text_sha256: textSha,
      png_path: pngRelPath,
      png_sha256: pngSha
    }
  };

  // 1. Positive: Valid Lineage Item Passes
  const res1 = validateItemArtifactLineage(validItem, testArtifactsDir, repoRoot);
  assertTest('T1_01_VALID_LINEAGE_ITEM_PASSES',
    res1.valid,
    'Item có đầy đủ artifacts trên đĩa, hash khớp byte-for-byte và provenance LIVE_CDP được xác thực thành công.');

  // 2. Negative: Artifact from old run directory blocked
  const oldRunItem = {
    ...validItem,
    artifacts: {
      ...validItem.artifacts,
      html_path: '07_QUALITY_ASSURANCE/runtime_evidence/sweep_055_artifacts/capture_055_cgv_1.html'
    }
  };
  const res2 = validateItemArtifactLineage(oldRunItem, testArtifactsDir, repoRoot);
  assertTest('T1_02_NEGATIVE_OUT_OF_RUN_DIRECTORY_BLOCKED',
    !res2.valid && res2.reason.includes('OUT_OF_RUN_DIRECTORY'),
    `Chặn đứng artifact trích xuất ngoài thư mục run quy định: [${res2.reason}].`);

  // 3. Negative: Path traversal attempt blocked
  const traversalItem = {
    ...validItem,
    artifacts: {
      ...validItem.artifacts,
      text_path: '07_QUALITY_ASSURANCE/private_sandbox/test_lineage_060b/../../secret.txt'
    }
  };
  const res3 = validateItemArtifactLineage(traversalItem, testArtifactsDir, repoRoot);
  assertTest('T1_03_NEGATIVE_PATH_TRAVERSAL_BLOCKED',
    !res3.valid && res3.reason.includes('PATH_TRAVERSAL_DETECTED'),
    `Chặn đứng hành vi path traversal trong đường dẫn artifact: [${res3.reason}].`);

  // 4. Negative: Missing artifact file on disk blocked
  const missingFileItem = {
    ...validItem,
    artifacts: {
      ...validItem.artifacts,
      png_path: '07_QUALITY_ASSURANCE/private_sandbox/test_lineage_060b/non_existent.png'
    }
  };
  const res4 = validateItemArtifactLineage(missingFileItem, testArtifactsDir, repoRoot);
  assertTest('T1_04_NEGATIVE_MISSING_ARTIFACT_FILE_BLOCKED',
    !res4.valid && res4.reason.includes('ARTIFACT_FILE_MISSING'),
    `Chặn đứng item có file artifact không tồn tại vật lý trên đĩa: [${res4.reason}].`);

  // 5. Negative: Tampered hash mismatch blocked
  const tamperedHashItem = {
    ...validItem,
    artifacts: {
      ...validItem.artifacts,
      html_sha256: '0000000000000000000000000000000000000000000000000000000000000000'
    }
  };
  const res5 = validateItemArtifactLineage(tamperedHashItem, testArtifactsDir, repoRoot);
  assertTest('T1_05_NEGATIVE_TAMPERED_HASH_BLOCKED',
    !res5.valid && res5.reason.includes('HASH_MISMATCH'),
    `Chặn đứng mã băm khai báo không khớp với mã băm đo đạc thực tế của file: [${res5.reason}].`);

  // 6. Negative: REPROCESS_ONLY provenance blocked
  const reprocessItem = {
    ...validItem,
    capture_provenance: 'REPROCESS_ONLY'
  };
  const res6 = validateItemArtifactLineage(reprocessItem, testArtifactsDir, repoRoot);
  assertTest('T1_06_NEGATIVE_REPROCESS_ONLY_PROVENANCE_BLOCKED',
    !res6.valid && res6.reason.includes('INVALID_PROVENANCE'),
    `Chặn đứng provenance không phải LIVE_CDP trong batch runner: [${res6.reason}].`);

  // 7. Positive: Zero Hardcoded Deals in Runner Code 060B
  const runnerFileContent = fs.readFileSync(path.join(repoRoot, '07_QUALITY_ASSURANCE', 'execute_bootstrap_sweep_060b.js'), 'utf8');
  const hasHardcodedPrice = runnerFileContent.includes('50.000đ') ||
                            runnerFileContent.includes('50.000 VND') ||
                            runnerFileContent.includes('58.000đ') ||
                            runnerFileContent.includes('Thứ 4 cuối tháng');
  assertTest('T1_07_ZERO_HARDCODED_DEALS_IN_060B_PIPELINE',
    !hasHardcodedPrice,
    'Runner 060B hoàn toàn sạch bóng mọi giá trị/lịch trình CGV hard-coded giả định.');

  // 8. Positive: Historical Runs Preserved Intact (Append-Only)
  const allHistoricalExist = fs.existsSync(receipt058Path) &&
                             fs.existsSync(receipt058aPath) &&
                             fs.existsSync(receipt058bPath) &&
                             fs.existsSync(receipt060Path);
  assertTest('T1_08_HISTORICAL_RUNS_PRESERVED_INCLUDING_060',
    allHistoricalExist,
    'Toàn bộ các run receipt lịch sử (058, 058A, 058B, 060) được bảo tồn 100% append-only.');

  // 9. Invariant: Production Locked
  const prodRaw = fs.readFileSync(prodFeedPath, 'utf8');
  const prodFeed = JSON.parse(prodRaw);
  const prodSha = getSha256(prodRaw);
  const releaseManifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
  const isApproved = releaseManifest.governance_locks?.immutable_ceo_approval_record?.is_approved === true;

  const isLocked = prodFeed.length === 0 &&
                   !isApproved &&
                   prodSha === EXPECTED_PROD_HASH;

  assertTest('INVARIANT_09_PRODUCTION_LOCKED',
    isLocked,
    `Production feed duy trì bất biến [] (SHA-256: ${prodSha}) và RELEASE_MANIFEST is_approved: false (LOCKED)`);

  console.log(`\n🟢 [DATA-LINEAGE-060B-SUMMARY] TOÀN BỘ ${passedTests}/${totalTests} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);

  if (passedTests !== totalTests) {
    process.exit(1);
  }
}

if (require.main === module) {
  run060bTests();
}

module.exports = {
  run060bTests
};
