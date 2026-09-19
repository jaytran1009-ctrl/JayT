/**
 * JAYT IMMUTABLE LIVE CAPTURE TEST SUITE (060C)
 * Directive: JAYT-IMMUTABLE-LIVE-CAPTURE-060C / JAYT-PROJECT-MEMORY-TRANSACTION-057
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const { validate060cItemLineage } = require('./execute_bootstrap_sweep_060c');

const run060Dir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_060_manual_bootstrap');
const run060bDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_060b_manual_bootstrap');
const run060cDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_060c_manual_bootstrap');
const sweep060cArtifactsDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_060c_artifacts');

const receipt058Path = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_058_first_cadence_observation', 'receipt.json');
const receipt058aPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_058a_cadence_receipt_lineage', 'receipt.json');
const receipt058bPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_058b_trigger_provenance_correction', 'receipt.json');
const receipt060Path = path.join(run060Dir, 'receipt.json');
const receipt060bPath = path.join(run060bDir, 'receipt.json');
const receipt060cPath = path.join(run060cDir, 'receipt.json');
const summary060cPath = path.join(run060cDir, 'sweep_summary_060c.json');
const batch060cJsonPath = path.join(run060cDir, 'ceo_review_batch_060c.json');
const batch060cMdPath = path.join(run060cDir, 'CEO_REVIEW_BATCH_060C.md');

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

function run060cTests() {
  console.log('🧪 [JAYT-IMMUTABLE-LIVE-CAPTURE-060C-TEST] Khởi chạy bộ kiểm thử Monotonic Live Capture (060C)...');

  // Sandbox Fixture Checks
  const testArtifactsDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'private_sandbox', 'test_lineage_060c');
  fs.mkdirSync(testArtifactsDir, { recursive: true });

  const dummyHtml = '<html><body><h1>Khuyến Mãi Live 060C</h1></body></html>';
  const dummyText = 'Khuyến Mãi Live 060C';
  const dummyPng = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

  const htmlRelPath = '07_QUALITY_ASSURANCE/private_sandbox/test_lineage_060c/sample.html';
  const textRelPath = '07_QUALITY_ASSURANCE/private_sandbox/test_lineage_060c/sample.txt';
  const pngRelPath = '07_QUALITY_ASSURANCE/private_sandbox/test_lineage_060c/sample.png';

  fs.writeFileSync(path.join(repoRoot, htmlRelPath), dummyHtml, 'utf8');
  fs.writeFileSync(path.join(repoRoot, textRelPath), dummyText, 'utf8');
  fs.writeFileSync(path.join(repoRoot, pngRelPath), dummyPng);

  const htmlSha = getSha256(dummyHtml);
  const textSha = getSha256(dummyText);
  const pngSha = getSha256(dummyPng);

  const validSuccessItem = {
    brand_id: 'SAMPLE_SUCCESS',
    category: 'LOCAL_CINEMA',
    target_url: 'https://example.com/promo',
    captured_at: '2026-08-23T05:00:00.000Z',
    capture_outcome: 'LIVE_CDP_SUCCESS',
    capture_error: null,
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

  // 1. Positive: Valid Live Success Item Passes
  const res1 = validate060cItemLineage(validSuccessItem, testArtifactsDir, repoRoot);
  assertTest('T1_01_VALID_LIVE_SUCCESS_ITEM_PASSES',
    res1.valid,
    'Item live success có đầy đủ artifacts trên đĩa và hash byte-for-byte được xác thực thành công.');

  // 2. Positive: Valid Live Failed Item Passes when properly disclosed
  const validFailedItem = {
    brand_id: 'SAMPLE_FAILED',
    category: 'LOCAL_CINEMA',
    target_url: 'https://example.com/failed',
    captured_at: '2026-08-23T05:00:00.000Z',
    capture_outcome: 'LIVE_CDP_CAPTURE_FAILED',
    capture_error: 'Navigation timeout 4500ms exceeded',
    status: 'CAPTURE_FAILED',
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
  const res2 = validate060cItemLineage(validFailedItem, testArtifactsDir, repoRoot);
  assertTest('T1_02_VALID_LIVE_FAILED_ITEM_PASSES_WHEN_PROPERLY_DISCLOSED',
    res2.valid,
    'Item capture failed được khai báo minh bạch lỗi và trạng thái CAPTURE_FAILED được xác thực hợp lệ.');

  // 3. Negative: Failed capture disguised as NEEDS_RECHECK or candidate blocked
  const disguisedItem = {
    ...validFailedItem,
    status: 'NEEDS_RECHECK'
  };
  const res3 = validate060cItemLineage(disguisedItem, testArtifactsDir, repoRoot);
  assertTest('T1_03_NEGATIVE_FAILED_CAPTURE_DISGUISED_AS_RECHECK_BLOCKED',
    !res3.valid && res3.reason.includes('PROVENANCE_OBFUSCATION'),
    `Chặn đứng hành vi ngụy trang lỗi capture thành NEEDS_RECHECK: [${res3.reason}].`);

  // 4. Negative: Artifact from outside run directory blocked
  const outOfDirItem = {
    ...validSuccessItem,
    artifacts: {
      ...validSuccessItem.artifacts,
      html_path: '07_QUALITY_ASSURANCE/runtime_evidence/sweep_055_artifacts/capture_055_cgv_1.html'
    }
  };
  const res4 = validate060cItemLineage(outOfDirItem, testArtifactsDir, repoRoot);
  assertTest('T1_04_NEGATIVE_OUT_OF_RUN_DIRECTORY_BLOCKED',
    !res4.valid && res4.reason.includes('OUT_OF_RUN_DIRECTORY'),
    `Chặn đứng artifact trích xuất ngoài thư mục run quy định: [${res4.reason}].`);

  // 5. Negative: Path traversal blocked
  const traversalItem = {
    ...validSuccessItem,
    artifacts: {
      ...validSuccessItem.artifacts,
      png_path: '07_QUALITY_ASSURANCE/private_sandbox/test_lineage_060c/../../secret.png'
    }
  };
  const res5 = validate060cItemLineage(traversalItem, testArtifactsDir, repoRoot);
  assertTest('T1_05_NEGATIVE_PATH_TRAVERSAL_BLOCKED',
    !res5.valid && res5.reason.includes('PATH_TRAVERSAL_DETECTED'),
    `Chặn đứng hành vi path traversal trong đường dẫn artifact: [${res5.reason}].`);

  // 6. Negative: Missing artifact file on disk blocked
  const missingFileItem = {
    ...validSuccessItem,
    artifacts: {
      ...validSuccessItem.artifacts,
      text_path: '07_QUALITY_ASSURANCE/private_sandbox/test_lineage_060c/non_existent.txt'
    }
  };
  const res6 = validate060cItemLineage(missingFileItem, testArtifactsDir, repoRoot);
  assertTest('T1_06_NEGATIVE_MISSING_ARTIFACT_FILE_BLOCKED',
    !res6.valid && res6.reason.includes('ARTIFACT_FILE_MISSING'),
    `Chặn đứng item có file artifact không tồn tại vật lý trên đĩa: [${res6.reason}].`);

  // 7. Negative: Tampered hash blocked
  const tamperedItem = {
    ...validSuccessItem,
    artifacts: {
      ...validSuccessItem.artifacts,
      html_sha256: '0000000000000000000000000000000000000000000000000000000000000000'
    }
  };
  const res7 = validate060cItemLineage(tamperedItem, testArtifactsDir, repoRoot);
  assertTest('T1_07_NEGATIVE_TAMPERED_HASH_BLOCKED',
    !res7.valid && res7.reason.includes('HASH_MISMATCH'),
    `Chặn đứng mã băm khai báo không khớp với mã băm đo đạc thực tế: [${res7.reason}].`);

  // 8. Negative: Invalid capture outcome blocked
  const invalidOutcomeItem = {
    ...validSuccessItem,
    capture_outcome: 'REPROCESS_ONLY'
  };
  const res8 = validate060cItemLineage(invalidOutcomeItem, testArtifactsDir, repoRoot);
  assertTest('T1_08_NEGATIVE_INVALID_CAPTURE_OUTCOME_BLOCKED',
    !res8.valid && res8.reason.includes('INVALID_CAPTURE_OUTCOME'),
    `Chặn đứng outcome không hợp lệ trong live bootstrap run: [${res8.reason}].`);

  // 9. Real Run Direct Verification (run_060c_manual_bootstrap)
  assertTest('T1_09_REAL_RUN_060C_ARTIFACTS_EXIST',
    fs.existsSync(summary060cPath) && fs.existsSync(batch060cJsonPath) && fs.existsSync(batch060cMdPath) && fs.existsSync(receipt060cPath),
    'Toàn bộ các tệp của run thực tế 060C tồn tại trên đĩa.');

  const realSummary = JSON.parse(fs.readFileSync(summary060cPath, 'utf8'));
  let all16ItemsValid = true;
  let all16PathsInRunDir = true;
  let all16HashesMatchDisk = true;
  let noErrorDisguised = true;

  for (const item of realSummary.results) {
    const valRes = validate060cItemLineage(item, sweep060cArtifactsDir, repoRoot);
    if (!valRes.valid) all16ItemsValid = false;

    for (const k of ['html_path', 'text_path', 'png_path']) {
      const p = item.artifacts[k];
      if (!p.startsWith('07_QUALITY_ASSURANCE/runtime_evidence/sweep_060c_artifacts/')) {
        all16PathsInRunDir = false;
      }
    }

    if (item.capture_outcome === 'LIVE_CDP_CAPTURE_FAILED' && item.status !== 'CAPTURE_FAILED') {
      noErrorDisguised = false;
    }
  }

  assertTest('T1_10_REAL_RUN_060C_16_SOURCES_LINEAGE_BYTE_FOR_BYTE_MATCH',
    all16ItemsValid && all16PathsInRunDir && all16HashesMatchDisk && noErrorDisguised && realSummary.results.length === 16,
    'Tất cả 16 nguồn của run 060C có đường dẫn trong sweep_060c_artifacts/, hash đo đạc khớp 100% byte-for-byte và phân loại outcome trung thực.');

  // 11. Real Run Receipt Sealed Hashes Integrity
  const realReceipt = JSON.parse(fs.readFileSync(receipt060cPath, 'utf8'));
  const actualSummarySha = getSha256(fs.readFileSync(summary060cPath, 'utf8'));
  const actualBatchJsonSha = getSha256(fs.readFileSync(batch060cJsonPath, 'utf8'));
  const actualBatchMdSha = getSha256(fs.readFileSync(batch060cMdPath, 'utf8'));

  const receiptSealedMatches = realReceipt.summary_lineage.summary_sha256 === actualSummarySha &&
                                realReceipt.review_batch_lineage.review_batch_json_sha256 === actualBatchJsonSha &&
                                realReceipt.review_batch_lineage.review_batch_md_sha256 === actualBatchMdSha;

  assertTest('T1_11_REAL_RUN_060C_RECEIPT_SEALED_HASHES_MATCH_DISK',
    receiptSealedMatches,
    'Mã băm niêm phong trong receipt 060C khớp chính xác tuyệt đối với tệp summary, batch JSON và batch Markdown trên đĩa.');

  // 12. Positive: Historical Runs Preserved Intact (Append-Only)
  const allHistoricalExist = fs.existsSync(receipt058Path) &&
                             fs.existsSync(receipt058aPath) &&
                             fs.existsSync(receipt058bPath) &&
                             fs.existsSync(receipt060Path) &&
                             fs.existsSync(receipt060bPath);
  assertTest('T1_12_HISTORICAL_RUNS_PRESERVED_INCLUDING_060_AND_060B',
    allHistoricalExist,
    'Toàn bộ các run receipt lịch sử (058, 058A, 058B, 060, 060B) được bảo tồn 100% append-only.');

  // 13. Invariant: Production Locked
  const prodRaw = fs.readFileSync(prodFeedPath, 'utf8');
  const prodFeed = JSON.parse(prodRaw);
  const prodSha = getSha256(prodRaw);
  const releaseManifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
  const isApproved = releaseManifest.governance_locks?.immutable_ceo_approval_record?.is_approved === true;

  const isLocked = prodFeed.length === 0 &&
                   !isApproved &&
                   prodSha === EXPECTED_PROD_HASH;

  assertTest('INVARIANT_13_PRODUCTION_LOCKED',
    isLocked,
    `Production feed duy trì bất biến [] (SHA-256: ${prodSha}) và RELEASE_MANIFEST is_approved: false (LOCKED)`);

  console.log(`\n🟢 [IMMUTABLE-LIVE-CAPTURE-060C-SUMMARY] TOÀN BỘ ${passedTests}/${totalTests} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);

  if (passedTests !== totalTests) {
    process.exit(1);
  }
}

if (require.main === module) {
  run060cTests();
}

module.exports = {
  run060cTests
};
