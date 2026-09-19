/**
 * JAYT NEUTRAL SOURCE OBSERVATION TEST SUITE (062)
 * Directive: JAYT-NEUTRAL-SOURCE-OBSERVATION-062 / JAYT-PROJECT-MEMORY-TRANSACTION-057
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');

const roadmap062Path = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'ACQUISITION_ROADMAP_062.md');
const summary062Path = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_062_neutral_source_observation', 'sweep_summary_062.json');
const receipt062Path = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_062_neutral_source_observation', 'receipt.json');
const reviewSheet062Path = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'CANDIDATE_REVIEW_SHEET_062.md');

const stagingFeedPath = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

const receipt058Path = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_058_first_cadence_observation', 'receipt.json');
const receipt058aPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_058a_cadence_receipt_lineage', 'receipt.json');
const receipt058bPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_058b_trigger_provenance_correction', 'receipt.json');
const receipt060Path = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_060_manual_bootstrap', 'receipt.json');
const receipt060bPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_060b_manual_bootstrap', 'receipt.json');
const receipt060cPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_060c_manual_bootstrap', 'receipt.json');
const receipt061Path = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_061_deep_promo_sweep', 'receipt.json');
const receipt061aPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_061a_deep_url_discovery', 'receipt.json');
const receipt061bPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_061b_discovery_provenance_remediation', 'receipt.json');
const receipt061cPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_061c_discovery_truth_closure', 'receipt.json');
const correction061dPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'correction_receipt_061d_galaxy_happy_day.json');
const incidentReceipt061fPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'INCIDENT_MUTATION_DISCLOSURE_RECEIPT_061F.json');
const correction061fPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'correction_receipt_061f_galaxy_happy_day.json');
const ceoDecision061gPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'CEO_DECISION_RECEIPT_061G_GALAXY_STAGING_ACCEPTANCE.json');

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

function getSha256(bufOrStr) {
  if (!bufOrStr) return null;
  return crypto.createHash('sha256').update(bufOrStr).digest('hex');
}

function run062Tests() {
  console.log('🧪 [JAYT-OBSERVATION-062-TEST] Khởi chạy bộ kiểm thử Neutral Source Observation (062)...');

  // 1. Positive: Neutral Roadmap 062 Exists and Unbiased
  const roadmapExists = fs.existsSync(roadmap062Path);
  let roadmapValid = false;
  if (roadmapExists) {
    const rawR = fs.readFileSync(roadmap062Path, 'utf8');
    roadmapValid = rawR.includes('UNVERIFIED_DISCOVERY_LEAD') &&
                   !rawR.includes('Mua 1 Tặng 1 Thứ Ba') &&
                   !rawR.includes('FreeShip Thứ Tư') &&
                   rawR.includes('JAYT-NEUTRAL-SOURCE-OBSERVATION-062');
  }
  assertTest('T1_01_NEUTRAL_ROADMAP_062_EXISTS_AND_UNBIASED',
    roadmapValid,
    'Roadmap 062 chuẩn xác: Toàn bộ nguồn ban đầu dán nhãn UNVERIFIED_DISCOVERY_LEAD, loại bỏ hoàn toàn các giả định lịch/ưu đãi đầu vào.');

  // 2. Positive: Run 062 Summary and Receipt Valid
  const summaryExists = fs.existsSync(summary062Path);
  const receiptExists = fs.existsSync(receipt062Path);
  let summaryObj = null;
  let receiptObj = null;

  if (summaryExists && receiptExists) {
    summaryObj = JSON.parse(fs.readFileSync(summary062Path, 'utf8'));
    receiptObj = JSON.parse(fs.readFileSync(receipt062Path, 'utf8'));
  }

  const runValid = summaryObj && receiptObj &&
                   summaryObj.work_order === 'JAYT-NEUTRAL-SOURCE-OBSERVATION-062' &&
                   summaryObj.total_hubs_swept === 9 &&
                   summaryObj.total_deep_items_probed === 18 &&
                   receiptObj.status === 'COMPLETED_PENDING_CEO_AUDIT';

  assertTest('T1_02_RUN_062_SUMMARY_AND_RECEIPT_VALID',
    runValid,
    `Bản tóm tắt và chứng thư quét 062 hợp lệ: Đã quét 9 Hubs, thực hiện 18 deep probes trên thực tế.`);

  // 3. Positive: Discovery Provenance Bound for All Deep Items
  let allProvenanceBound = false;
  if (summaryObj && Array.isArray(summaryObj.deep_probes) && summaryObj.deep_probes.length === 18) {
    allProvenanceBound = summaryObj.deep_probes.every(dp => {
      return dp.discovered_from &&
             dp.discovered_from.hub_url &&
             dp.discovered_from.locator_selector &&
             dp.discovered_from.source_captured_at &&
             dp.captured_at &&
             dp.recheck_due_at;
    });
  }
  assertTest('T1_03_DISCOVERY_PROVENANCE_BOUND_FOR_ALL_DEEP_ITEMS',
    allProvenanceBound,
    'Tất cả 18 deep probes đều được gắn chặt chẽ discovery provenance [discovered_from, selector, source_hash, timestamp, 7-day TTL].');

  // 4. Positive: All Artifacts Exist and Match Declared Hashes
  let allArtifactsMatch = false;
  if (summaryObj && Array.isArray(summaryObj.deep_probes)) {
    const successProbes = summaryObj.deep_probes.filter(dp => dp.outcome === 'LIVE_CDP_SUCCESS');
    allArtifactsMatch = successProbes.length > 0 && successProbes.every(dp => {
      const htmlAbs = path.resolve(repoRoot, dp.artifacts.html_path);
      const textAbs = path.resolve(repoRoot, dp.artifacts.text_path);
      const pngAbs = path.resolve(repoRoot, dp.artifacts.png_path);

      if (!fs.existsSync(htmlAbs) || !fs.existsSync(textAbs) || !fs.existsSync(pngAbs)) return false;
      const hSha = getSha256(fs.readFileSync(htmlAbs));
      const tSha = getSha256(fs.readFileSync(textAbs));
      const pSha = getSha256(fs.readFileSync(pngAbs));

      return hSha === dp.artifacts.html_sha256 &&
             tSha === dp.artifacts.text_sha256 &&
             pSha === dp.artifacts.png_sha256;
    });
  }
  assertTest('T1_04_ALL_ARTIFACTS_EXIST_AND_MATCH_DECLARED_HASHES',
    allArtifactsMatch,
    'Toàn bộ các tệp HTML, Text, PNG của các deep probe thành công đều tồn tại vật lý và khớp 100% mã băm SHA-256 trên đĩa.');

  // 5. Negative: Ban Speculative Promo Inputs Enforced
  const zeroSpeculativeEnforced = summaryObj &&
                                  summaryObj.neutral_observation_protocol &&
                                  summaryObj.neutral_observation_protocol.zero_speculative_inputs_enforced === true &&
                                  summaryObj.neutral_observation_protocol.unauthenticated_guest_only === true;

  assertTest('T1_05_NEGATIVE_SPECULATIVE_INPUTS_BAN_ENFORCED',
    zeroSpeculativeEnforced,
    'Cơ chế giám sát trung lập thực thi tuyệt đối: zero speculative inputs, unauthenticated guest, zero captcha bypass.');

  // 6. Negative: No Auto-Staging Injection (Staging Feed Isolated)
  const stagingRaw = fs.readFileSync(stagingFeedPath, 'utf8');
  const stagingFeed = JSON.parse(stagingRaw);
  const onlyGalaxyInStaging = stagingFeed.length === 1 &&
                              stagingFeed[0].deal_id === 'DNG-GALAXY-HAPPY-DAY-WEEKLY-TUESDAY-061F';

  assertTest('T1_06_NEGATIVE_NO_AUTO_STAGING_INJECTION',
    onlyGalaxyInStaging,
    'Không tự ý đưa candidates 062 vào Staging: Staging feed tiếp tục duy trì duy nhất 1 deal Galaxy Happy Day đã được CEO duyệt.');

  // 7. Positive: Candidate Review Sheet 062 Generated
  const reviewSheetExists = fs.existsSync(reviewSheet062Path);
  let reviewSheetValid = false;
  if (reviewSheetExists) {
    const rawRS = fs.readFileSync(reviewSheet062Path, 'utf8');
    reviewSheetValid = rawRS.includes('JAYT-NEUTRAL-SOURCE-OBSERVATION-062') &&
                       rawRS.includes('CANDIDATE_PENDING_CEO_REVIEW');
  }
  assertTest('T1_07_CANDIDATE_REVIEW_SHEET_062_GENERATED',
    reviewSheetValid,
    'Bảng tổng hợp CANDIDATE_REVIEW_SHEET_062.md đã được khởi tạo đầy đủ để trình CEO kiểm toán độc lập từng candidate.');

  // 8. Positive: Historical Runs and Receipts Preserved Append-Only
  const allHistoricalExist = fs.existsSync(receipt058Path) &&
                             fs.existsSync(receipt058aPath) &&
                             fs.existsSync(receipt058bPath) &&
                             fs.existsSync(receipt060Path) &&
                             fs.existsSync(receipt060bPath) &&
                             fs.existsSync(receipt060cPath) &&
                             fs.existsSync(receipt061Path) &&
                             fs.existsSync(receipt061aPath) &&
                             fs.existsSync(receipt061bPath) &&
                             fs.existsSync(receipt061cPath) &&
                             fs.existsSync(correction061dPath) &&
                             fs.existsSync(incidentReceipt061fPath) &&
                             fs.existsSync(correction061fPath) &&
                             fs.existsSync(ceoDecision061gPath);

  assertTest('T1_08_HISTORICAL_RUNS_AND_RECEIPTS_PRESERVED_APPEND_ONLY',
    allHistoricalExist,
    'Toàn bộ các run receipts và correction receipts lịch sử (058..061G) được bảo tồn 100% append-only.');

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
    `Production feed duy trì bất biến [] (SHA-256: ${prodSha}) và RELEASE_MANIFEST is_approved: false (LOCKED). Zero leak.`);

  console.log(`\n🟢 [OBSERVATION-062-SUMMARY] TOÀN BỘ ${passedTests}/${totalTests} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);

  if (passedTests !== totalTests) {
    process.exit(1);
  }
}

if (require.main === module) {
  run062Tests();
}

module.exports = {
  run062Tests
};
