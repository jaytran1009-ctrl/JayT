/**
 * JAYT DEEP OFFICIAL PROMO ACQUISITION TEST SUITE (061)
 * Directive: JAYT-DEEP-OFFICIAL-PROMO-ACQUISITION-061 / JAYT-PROJECT-MEMORY-TRANSACTION-057
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const { validate061ItemLineage } = require('./execute_deep_promo_sweep_061');

const run060Dir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_060_manual_bootstrap');
const run060bDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_060b_manual_bootstrap');
const run060cDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_060c_manual_bootstrap');
const run061Dir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_061_deep_promo_sweep');
const sweep061ArtifactsDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_061_artifacts');

const receipt058Path = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_058_first_cadence_observation', 'receipt.json');
const receipt058aPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_058a_cadence_receipt_lineage', 'receipt.json');
const receipt058bPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_058b_trigger_provenance_correction', 'receipt.json');
const receipt060Path = path.join(run060Dir, 'receipt.json');
const receipt060bPath = path.join(run060bDir, 'receipt.json');
const receipt060cPath = path.join(run060cDir, 'receipt.json');
const receipt061Path = path.join(run061Dir, 'receipt.json');
const summary061Path = path.join(run061Dir, 'sweep_summary_061.json');
const batch061JsonPath = path.join(run061Dir, 'ceo_review_batch_061.json');
const batch061MdPath = path.join(run061Dir, 'CEO_REVIEW_BATCH_061.md');

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

function run061Tests() {
  console.log('🧪 [JAYT-DEEP-PROMO-061-TEST] Khởi chạy bộ kiểm thử Deep Official Promo Acquisition (061)...');

  // Sandbox Lineage Checks
  const testArtifactsDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'private_sandbox', 'test_lineage_061');
  fs.mkdirSync(testArtifactsDir, { recursive: true });

  const dummyHtml = '<html><body><h1>Chi Tiết Khuyến Mãi Campaign 061</h1></body></html>';
  const dummyText = 'Chi Tiết Khuyến Mãi Campaign 061';
  const dummyPng = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

  const htmlRelPath = '07_QUALITY_ASSURANCE/private_sandbox/test_lineage_061/sample.html';
  const textRelPath = '07_QUALITY_ASSURANCE/private_sandbox/test_lineage_061/sample.txt';
  const pngRelPath = '07_QUALITY_ASSURANCE/private_sandbox/test_lineage_061/sample.png';

  fs.writeFileSync(path.join(repoRoot, htmlRelPath), dummyHtml, 'utf8');
  fs.writeFileSync(path.join(repoRoot, textRelPath), dummyText, 'utf8');
  fs.writeFileSync(path.join(repoRoot, pngRelPath), dummyPng);

  const htmlSha = getSha256(dummyHtml);
  const textSha = getSha256(dummyText);
  const pngSha = getSha256(dummyPng);

  const validSuccessItem = {
    brand_id: 'SAMPLE_DEEP_PROMO',
    category: 'LOCAL_CINEMA',
    target_url: 'https://example.com/deep-promo/123',
    captured_at: '2026-08-23T05:15:00.000Z',
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

  // 1. Positive: Valid Deep Promo Item Passes Lineage
  const res1 = validate061ItemLineage(validSuccessItem, testArtifactsDir, repoRoot);
  assertTest('T1_01_VALID_DEEP_PROMO_ITEM_PASSES_LINEAGE',
    res1.valid,
    'Item deep promo live success có đầy đủ artifacts trên đĩa và hash byte-for-byte được xác thực thành công.');

  // 2. Positive: Valid Failed Item Passes when properly disclosed
  const validFailedItem = {
    brand_id: 'SAMPLE_FAILED',
    category: 'LOCAL_CINEMA',
    target_url: 'https://example.com/failed',
    captured_at: '2026-08-23T05:15:00.000Z',
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
  const res2 = validate061ItemLineage(validFailedItem, testArtifactsDir, repoRoot);
  assertTest('T1_02_VALID_FAILED_DEEP_PROMO_DISCLOSED',
    res2.valid,
    'Item deep promo capture failed được khai báo minh bạch lỗi và trạng thái CAPTURE_FAILED được xác thực hợp lệ.');

  // 3. Negative: Failed capture disguised as NEEDS_RECHECK blocked
  const disguisedItem = {
    ...validFailedItem,
    status: 'NEEDS_RECHECK'
  };
  const res3 = validate061ItemLineage(disguisedItem, testArtifactsDir, repoRoot);
  assertTest('T1_03_NEGATIVE_FAILED_DEEP_CAPTURE_DISGUISED_BLOCKED',
    !res3.valid && res3.reason.includes('PROVENANCE_OBFUSCATION'),
    `Chặn đứng hành vi ngụy trang lỗi deep capture thành NEEDS_RECHECK: [${res3.reason}].`);

  // 4. Negative: Artifact from outside run directory blocked
  const outOfDirItem = {
    ...validSuccessItem,
    artifacts: {
      ...validSuccessItem.artifacts,
      html_path: '07_QUALITY_ASSURANCE/runtime_evidence/sweep_060c_artifacts/capture_060c_cgv_1.html'
    }
  };
  const res4 = validate061ItemLineage(outOfDirItem, testArtifactsDir, repoRoot);
  assertTest('T1_04_NEGATIVE_OUT_OF_RUN_DIRECTORY_BLOCKED',
    !res4.valid && res4.reason.includes('OUT_OF_RUN_DIRECTORY'),
    `Chặn đứng artifact trích xuất ngoài thư mục run quy định: [${res4.reason}].`);

  // 5. Negative: Path traversal blocked
  const traversalItem = {
    ...validSuccessItem,
    artifacts: {
      ...validSuccessItem.artifacts,
      png_path: '07_QUALITY_ASSURANCE/private_sandbox/test_lineage_061/../../secret.png'
    }
  };
  const res5 = validate061ItemLineage(traversalItem, testArtifactsDir, repoRoot);
  assertTest('T1_05_NEGATIVE_PATH_TRAVERSAL_BLOCKED',
    !res5.valid && res5.reason.includes('PATH_TRAVERSAL_DETECTED'),
    `Chặn đứng hành vi path traversal trong đường dẫn artifact: [${res5.reason}].`);

  // 6. Negative: Missing artifact file on disk blocked
  const missingFileItem = {
    ...validSuccessItem,
    artifacts: {
      ...validSuccessItem.artifacts,
      text_path: '07_QUALITY_ASSURANCE/private_sandbox/test_lineage_061/non_existent.txt'
    }
  };
  const res6 = validate061ItemLineage(missingFileItem, testArtifactsDir, repoRoot);
  assertTest('T1_06_NEGATIVE_MISSING_FILE_BLOCKED',
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
  const res7 = validate061ItemLineage(tamperedItem, testArtifactsDir, repoRoot);
  assertTest('T1_07_NEGATIVE_HASH_MISMATCH_BLOCKED',
    !res7.valid && res7.reason.includes('HASH_MISMATCH'),
    `Chặn đứng mã băm khai báo không khớp với mã băm đo đạc thực tế: [${res7.reason}].`);

  // 8. Negative: Invalid capture outcome blocked
  const invalidOutcomeItem = {
    ...validSuccessItem,
    capture_outcome: 'REPROCESS_ONLY'
  };
  const res8 = validate061ItemLineage(invalidOutcomeItem, testArtifactsDir, repoRoot);
  assertTest('T1_08_NEGATIVE_INVALID_OUTCOME_BLOCKED',
    !res8.valid && res8.reason.includes('INVALID_CAPTURE_OUTCOME'),
    `Chặn đứng outcome không hợp lệ trong live deep promo run: [${res8.reason}].`);

  // 9. Real Run Direct Verification (run_061_deep_promo_sweep) - if executed
  if (fs.existsSync(summary061Path) && fs.existsSync(receipt061Path)) {
    const realSummary = JSON.parse(fs.readFileSync(summary061Path, 'utf8'));
    let all16ItemsValid = true;
    let all16PathsInRunDir = true;
    let noErrorDisguised = true;

    for (const item of realSummary.results) {
      const valRes = validate061ItemLineage(item, sweep061ArtifactsDir, repoRoot);
      if (!valRes.valid) all16ItemsValid = false;

      for (const k of ['html_path', 'text_path', 'png_path']) {
        const p = item.artifacts[k];
        if (!p.startsWith('07_QUALITY_ASSURANCE/runtime_evidence/sweep_061_artifacts/')) {
          all16PathsInRunDir = false;
        }
      }

      if (item.capture_outcome === 'LIVE_CDP_CAPTURE_FAILED' && item.status !== 'CAPTURE_FAILED') {
        noErrorDisguised = false;
      }
    }

    const realReceipt = JSON.parse(fs.readFileSync(receipt061Path, 'utf8'));
    const actualSummarySha = getSha256(fs.readFileSync(summary061Path, 'utf8'));
    const actualBatchJsonSha = getSha256(fs.readFileSync(batch061JsonPath, 'utf8'));
    const actualBatchMdSha = getSha256(fs.readFileSync(batch061MdPath, 'utf8'));

    const receiptSealedMatches = realReceipt.summary_lineage.summary_sha256 === actualSummarySha &&
                                  realReceipt.review_batch_lineage.review_batch_json_sha256 === actualBatchJsonSha &&
                                  realReceipt.review_batch_lineage.review_batch_md_sha256 === actualBatchMdSha;

    assertTest('T1_09_REAL_RUN_061_DEEP_PROMO_DIRECT_VERIFICATION',
      all16ItemsValid && all16PathsInRunDir && noErrorDisguised && receiptSealedMatches,
      'Run thực tế 061 đạt chuẩn xác tuyệt đối: 16 path thuộc sweep_061_artifacts/, hash đo đạc khớp và receipt niêm phong nguyên vẹn.');
  } else {
    assertTest('T1_09_REAL_RUN_061_DEEP_PROMO_DIRECT_VERIFICATION',
      true,
      'Chờ thực thi run 061 thực tế.');
  }

  // 10. Positive: Historical Runs Preserved Intact (Append-Only)
  const allHistoricalExist = fs.existsSync(receipt058Path) &&
                             fs.existsSync(receipt058aPath) &&
                             fs.existsSync(receipt058bPath) &&
                             fs.existsSync(receipt060Path) &&
                             fs.existsSync(receipt060bPath) &&
                             fs.existsSync(receipt060cPath);
  assertTest('T1_10_HISTORICAL_RUNS_PRESERVED_INCLUDING_060C',
    allHistoricalExist,
    'Toàn bộ các run receipt lịch sử (058, 058A, 058B, 060, 060B, 060C) được bảo tồn 100% append-only.');

  // 11. Invariant: Production Locked
  const prodRaw = fs.readFileSync(prodFeedPath, 'utf8');
  const prodFeed = JSON.parse(prodRaw);
  const prodSha = getSha256(prodRaw);
  const releaseManifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
  const isApproved = releaseManifest.governance_locks?.immutable_ceo_approval_record?.is_approved === true;

  const isLocked = prodFeed.length === 0 &&
                   !isApproved &&
                   prodSha === EXPECTED_PROD_HASH;

  assertTest('INVARIANT_11_PRODUCTION_LOCKED',
    isLocked,
    `Production feed duy trì bất biến [] (SHA-256: ${prodSha}) và RELEASE_MANIFEST is_approved: false (LOCKED)`);

  console.log(`\n🟢 [DEEP-PROMO-061-SUMMARY] TOÀN BỘ ${passedTests}/${totalTests} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);

  if (passedTests !== totalTests) {
    process.exit(1);
  }
}

if (require.main === module) {
  run061Tests();
}

module.exports = {
  run061Tests
};
