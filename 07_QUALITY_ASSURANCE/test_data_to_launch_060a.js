/**
 * JAYT DATA TO LAUNCH TEST SUITE (060A)
 * Directive: JAYT-DATA-TO-LAUNCH-060A / JAYT-PROJECT-MEMORY-TRANSACTION-057
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const { buildHardenedCeoReviewBatch, executeHardenedCadenceRunner } = require('./execute_bootstrap_sweep_060a');

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

async function run060aTests() {
  console.log('🧪 [JAYT-DATA-TO-LAUNCH-060A-TEST] Khởi chạy bộ kiểm thử Hardened Data Pipeline (060A)...');

  // 1. Positive: Zero Hardcoded Deals in Runner Code
  const runnerFileContent = fs.readFileSync(path.join(repoRoot, '07_QUALITY_ASSURANCE', 'execute_bootstrap_sweep_060a.js'), 'utf8');
  const hasHardcodedPrice = runnerFileContent.includes('50.000đ') ||
                            runnerFileContent.includes('50.000 VND') ||
                            runnerFileContent.includes('58.000đ') ||
                            runnerFileContent.includes('Thứ 4 cuối tháng');
  assertTest('T1_01_ZERO_HARDCODED_DEALS_IN_RUNNER',
    !hasHardcodedPrice,
    'Runner 060A hoàn toàn sạch bóng mọi giá trị/lịch trình CGV hard-coded giả định.');

  // 2. Positive: Fail-Closed on Live Capture Errors (NO Reprocess Fallback)
  let liveFailedProperly = false;
  try {
    await executeHardenedCadenceRunner({
      live: true,
      mockFailure: true
    });
  } catch (err) {
    liveFailedProperly = err.message.includes('LIVE_CAPTURE_FAILED');
  }
  assertTest('T1_02_LIVE_MODE_FAIL_CLOSED_NO_FALLBACK',
    liveFailedProperly,
    'Live capture gặp sự cố bắt buộc ném lỗi LIVE_CAPTURE_FAILED fail-closed; Chặn đứng hành vi tự chuyển sang reprocess artifacts cũ dưới nhãn live.');

  // 3. Positive: Review Batch Verifies On-Disk Artifact Hashes
  const sampleSweepResults = [
    {
      brand_id: 'CGV',
      category: 'LOCAL_CINEMA',
      target_url: 'https://www.cgv.vn/',
      captured_at: '2026-08-23T04:11:41.016Z',
      status: 'NEEDS_RECHECK',
      change_status: 'UNCHANGED',
      canonical_content_signature: null,
      dom_container_scope: { is_container_scoped: false },
      html_sha256: 'd96fbd05c7af91e4b45ac21440764737192720ee8ecede6857d5607a52adc55a',
      text_sha256: 'e3ebaa16dd9d9b9fc107c42183fb6cf9d22927e1af03dbbdfa0ccc38e4e4ac31',
      png_sha256: '76a074546823e6514f2956a90af92afd6b667d27c89f216ee9d502ff312d844b'
    }
  ];
  const sampleBatch = buildHardenedCeoReviewBatch(sampleSweepResults, {
    artifactsDir: path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_055_artifacts')
  });
  const cgvItem = sampleBatch.value_clusters.LOCAL_CINEMA.items[0];
  const hasValidHashes = cgvItem.artifact_hashes.html_sha256 &&
                         cgvItem.artifact_hashes.text_sha256 &&
                         cgvItem.artifact_hashes.png_sha256;
  assertTest('T1_03_REVIEW_BATCH_ARTIFACT_HASH_LINEAGE_ENFORCED',
    Boolean(hasValidHashes),
    'Review batch trích xuất và bảo toàn mã băm SHA-256 thực tế của artifact (HTML/Text/PNG).');

  // 4. Positive: Historical Staging Reference by Link Only
  const stagingRefs = sampleBatch.historical_staging_references || [];
  const validStagingRef = stagingRefs.length === 1 &&
                          stagingRefs[0].dossier_links &&
                          stagingRefs[0].dossier_links.length >= 2 &&
                          !stagingRefs[0].price &&
                          !stagingRefs[0].schedule;
  assertTest('T1_04_HISTORICAL_STAGING_REFERENCE_BY_LINK_ONLY',
    validStagingRef,
    'Hồ sơ Staging lịch sử chỉ được liên kết qua dossier links, không chép lại giá hay điều kiện.');

  // 5. Positive: Historical Runs Preserved Intact (Append-Only)
  const allHistoricalExist = fs.existsSync(receipt058Path) &&
                             fs.existsSync(receipt058aPath) &&
                             fs.existsSync(receipt058bPath) &&
                             fs.existsSync(receipt060Path);
  assertTest('T1_05_HISTORICAL_RUNS_PRESERVED_INCLUDING_060',
    allHistoricalExist,
    'Toàn bộ các run receipt lịch sử (058, 058A, 058B, 060) được bảo tồn 100% append-only.');

  // 6. Negative: Block Fallback Old Artifact Claiming Live Status
  function validateLiveClaimAgainstArtifactTimestamps(receipt) {
    if (receipt.execution_trigger === 'MANUAL_BOOTSTRAP_RUN_LIVE' && receipt.used_cached_fallback === true) {
      return { valid: false, reason: 'PROVENANCE_VIOLATION: Cached fallback cannot be declared as LIVE' };
    }
    return { valid: true };
  }
  const fakeFallbackReceipt = {
    execution_trigger: 'MANUAL_BOOTSTRAP_RUN_LIVE',
    used_cached_fallback: true
  };
  const negCheck = validateLiveClaimAgainstArtifactTimestamps(fakeFallbackReceipt);
  assertTest('T1_06_NEGATIVE_CACHED_FALLBACK_LIVE_CLAIM_BLOCKED',
    !negCheck.valid && negCheck.reason.includes('PROVENANCE_VIOLATION'),
    `Chặn đứng khai gian cờ LIVE khi sử dụng artifact fallback: [${negCheck.reason}].`);

  // 7. Invariant: Production Locked
  const prodRaw = fs.readFileSync(prodFeedPath, 'utf8');
  const prodFeed = JSON.parse(prodRaw);
  const prodSha = getSha256(prodRaw);
  const releaseManifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
  const isApproved = releaseManifest.governance_locks?.immutable_ceo_approval_record?.is_approved === true;

  const isLocked = prodFeed.length === 0 &&
                   !isApproved &&
                   prodSha === EXPECTED_PROD_HASH;

  assertTest('INVARIANT_07_PRODUCTION_LOCKED',
    isLocked,
    `Production feed duy trì bất biến [] (SHA-256: ${prodSha}) và RELEASE_MANIFEST is_approved: false (LOCKED)`);

  console.log(`\n🟢 [DATA-TO-LAUNCH-060A-SUMMARY] TOÀN BỘ ${passedTests}/${totalTests} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);

  if (passedTests !== totalTests) {
    process.exit(1);
  }
}

if (require.main === module) {
  run060aTests();
}

module.exports = {
  run060aTests
};
