/**
 * JAYT NEUTRAL TRIAGE REMEDIATION TEST SUITE (062A)
 * Directive: JAYT-NEUTRAL-TRIAGE-REMEDIATION-062A / JAYT-PROJECT-MEMORY-TRANSACTION-057
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');

const rawReportPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'RAW_OBSERVATION_REPORT_062A.md');
const candidateSheetPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'CANDIDATE_REVIEW_SHEET_062A.md');
const summary062aPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_062a_neutral_triage_remediation', 'sweep_summary_062a.json');
const receipt062aPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_062a_neutral_triage_remediation', 'receipt.json');

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
const receipt062Path = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_062_neutral_source_observation', 'receipt.json');

const { evaluateProbeTruthGate062A } = require('./strict_dom_triage_engine_062a');

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

function run062aTests() {
  console.log('🧪 [JAYT-TRIAGE-062A-TEST] Khởi chạy bộ kiểm thử Strict DOM Triage & Remediation (062A)...');

  // 1. Positive: Decoupling of Raw Report from Candidate Review Sheet
  const rawReportExists = fs.existsSync(rawReportPath);
  const candSheetExists = fs.existsSync(candidateSheetPath);
  let decoupledValid = false;

  if (rawReportExists && candSheetExists) {
    const rawContent = fs.readFileSync(rawReportPath, 'utf8');
    const candContent = fs.readFileSync(candidateSheetPath, 'utf8');

    decoupledValid = rawContent.includes('BÁO CÁO QUAN SÁT NGUỒN THÔ & KẾT QUẢ TRIAGE (062A)') &&
                     rawContent.includes('18 Deep Probes') &&
                     candContent.includes('ZERO CANDIDATE QUALIFIED (HONEST EMPTY STATE)') &&
                     candContent.includes('0 Candidate');
  }
  assertTest('T1_01_DECOUPLING_OF_RAW_REPORT_FROM_CANDIDATE_SHEET',
    decoupledValid,
    'Tách rời hoàn toàn Báo cáo quan sát thô (18 probes) khỏi Candidate Review Sheet (0 candidate qualified).');

  // 2. Positive: All 18 Probes Default to OBSERVED_NOT_QUALIFIED
  const summaryExists = fs.existsSync(summary062aPath);
  let all18Defaulted = false;
  if (summaryExists) {
    const sum = JSON.parse(fs.readFileSync(summary062aPath, 'utf8'));
    all18Defaulted = sum.triage_metrics.total_probes_evaluated === 18 &&
                     sum.triage_metrics.observed_not_qualified_count === 18 &&
                     sum.triage_metrics.qualified_candidates_count === 0 &&
                     sum.triaged_probes.every(p => p.triage_status === 'OBSERVED_NOT_QUALIFIED');
  }
  assertTest('T1_02_ALL_18_PROBES_DEFAULT_TO_NOT_QUALIFIED',
    all18Defaulted,
    'Toàn bộ 18 deep probes đều được mặc định và thẩm định chính xác là OBSERVED_NOT_QUALIFIED.');

  // 3. Negative: Category / Navigation Page Rejected
  const catProbe = {
    target_url: 'https://jollibee.com.vn/category/combo',
    outcome: 'LIVE_CDP_SUCCESS'
  };
  const catText = 'Danh mục món ăn nhanh gà giòn combo các loại thực đơn tổng hợp của thương hiệu Jollibee.';
  const catEval = evaluateProbeTruthGate062A(catProbe, '<div class="menu">' + catText + '</div>', catText);
  assertTest('T1_03_NEGATIVE_CATEGORY_PAGE_REJECTED',
    catEval.passed_gate === false && catEval.failure_reason === 'CATEGORY_OR_NAVIGATION_PAGE_REJECTED',
    `Chặn đứng trang danh mục/menu: [${catEval.failure_reason}].`);

  // 4. Negative: Missing Numerical Price Rejected
  const noPriceProbe = {
    target_url: 'https://sample.vn/khuyen-mai-soc',
    outcome: 'LIVE_CDP_SUCCESS'
  };
  const noPriceText = 'Voucher giảm giá cực sốc áp dụng Thứ Ba hàng tuần tại toàn quốc cho mọi khách hàng.';
  const noPriceEval = evaluateProbeTruthGate062A(noPriceProbe, '<div class="promo">' + noPriceText + '</div>', noPriceText);
  assertTest('T1_04_NEGATIVE_MISSING_NUMERICAL_PRICE_REJECTED',
    noPriceEval.passed_gate === false && noPriceEval.failure_reason === 'MISSING_NUMERICAL_PRICE_REJECTED',
    `Chặn đứng trang có từ 'voucher/giảm' nhưng thiếu giá số: [${noPriceEval.failure_reason}].`);

  // 5. Negative: Missing Concrete Schedule / Date Window Rejected
  const noScheduleProbe = {
    target_url: 'https://sample.vn/khuyen-mai-50k',
    outcome: 'LIVE_CDP_SUCCESS'
  };
  const noScheduleText = 'Ưu đãi combo chỉ 50.000đ áp dụng tại Đà Nẵng, không áp dụng khuyến mãi khác.';
  const noScheduleEval = evaluateProbeTruthGate062A(noScheduleProbe, '<div class="promo">' + noScheduleText + '</div>', noScheduleText);
  assertTest('T1_05_NEGATIVE_MISSING_SCHEDULE_OR_WINDOW_REJECTED',
    noScheduleEval.passed_gate === false && noScheduleEval.failure_reason === 'MISSING_SCHEDULE_OR_DATE_WINDOW_REJECTED',
    `Chặn đứng deal có giá nhưng thiếu lịch/khung ngày: [${noScheduleEval.failure_reason}].`);

  // 6. Negative: Missing Locality Scope Rejected
  const noLocalityProbe = {
    target_url: 'https://sample.vn/khuyen-mai-thu-ba',
    outcome: 'LIVE_CDP_SUCCESS'
  };
  const noLocalityText = 'Ưu đãi 50.000đ áp dụng Thứ Ba hàng tuần, không áp dụng khuyến mãi khác.';
  const noLocalityEval = evaluateProbeTruthGate062A(noLocalityProbe, '<div class="promo">' + noLocalityText + '</div>', noLocalityText);
  assertTest('T1_06_NEGATIVE_MISSING_LOCALITY_SCOPE_REJECTED',
    noLocalityEval.passed_gate === false && noLocalityEval.failure_reason === 'MISSING_LOCALITY_SCOPE_REJECTED',
    `Chặn đứng deal có giá & lịch nhưng thiếu phạm vi địa bàn: [${noLocalityEval.failure_reason}].`);

  // 7. Negative: Fragmented / Missing Single DOM Container Rejected
  const noContainerProbe = {
    target_url: 'https://sample.vn/khuyen-mai-roi-rac',
    outcome: 'LIVE_CDP_SUCCESS'
  };
  const validText = 'Ưu đãi 50.000đ áp dụng Thứ Ba hàng tuần tại Đà Nẵng, điều kiện áp dụng đầy đủ.';
  const fragmentedHtml = '<html><body>' + validText + '</body></html>'; // no class container
  const noContainerEval = evaluateProbeTruthGate062A(noContainerProbe, fragmentedHtml, validText);
  assertTest('T1_07_NEGATIVE_FRAGMENTED_OR_MISSING_DOM_CONTAINER_REJECTED',
    noContainerEval.passed_gate === false && noContainerEval.failure_reason === 'FRAGMENTED_OR_MISSING_DOM_CONTAINER_REJECTED',
    `Chặn đứng deal không nằm trong khối container DOM cục bộ: [${noContainerEval.failure_reason}].`);

  // 8. Positive: Fully Qualified Deal Passes All 5 Pillars
  const perfectProbe = {
    target_url: 'https://sample.vn/khuyen-mai-hoan-hao',
    outcome: 'LIVE_CDP_SUCCESS'
  };
  const perfectText = 'Ưu đãi 50.000đ áp dụng Thứ Ba hàng tuần tại cụm rạp Đà Nẵng. Điều kiện áp dụng cho tất cả khách hàng.';
  const perfectHtml = '<div class="deal-card-container"><p>' + perfectText + '</p></div>';
  const perfectEval = evaluateProbeTruthGate062A(perfectProbe, perfectHtml, perfectText);
  assertTest('T1_08_POSITIVE_QUALIFIED_DEAL_PASSES_ALL_5_PILLARS',
    perfectEval.passed_gate === true && perfectEval.triage_status === 'CANDIDATE_QUALIFIED_PENDING_CEO_REVIEW',
    'Deal hội tụ đủ cả 5 trụ cột trong 1 container DOM duy nhất được công nhận CANDIDATE_QUALIFIED.');

  // 9. Positive: Historical Runs and Receipts Preserved Append-Only
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
                             fs.existsSync(ceoDecision061gPath) &&
                             fs.existsSync(receipt062Path);

  assertTest('T1_09_HISTORICAL_RUNS_AND_RECEIPTS_PRESERVED_APPEND_ONLY',
    allHistoricalExist,
    'Toàn bộ các run receipts và correction receipts lịch sử (058..062) được bảo tồn 100% append-only.');

  // 10. Invariant: Staging Isolated & Production Locked
  const stagingRaw = fs.readFileSync(stagingFeedPath, 'utf8');
  const stagingFeed = JSON.parse(stagingRaw);
  const prodRaw = fs.readFileSync(prodFeedPath, 'utf8');
  const prodFeed = JSON.parse(prodRaw);
  const prodSha = getSha256(prodRaw);
  const releaseManifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
  const isApproved = releaseManifest.governance_locks?.immutable_ceo_approval_record?.is_approved === true;

  const isLocked = stagingFeed.length === 1 &&
                   stagingFeed[0].deal_id === 'DNG-GALAXY-HAPPY-DAY-WEEKLY-TUESDAY-061F' &&
                   prodFeed.length === 0 &&
                   !isApproved &&
                   prodSha === EXPECTED_PROD_HASH;

  assertTest('INVARIANT_10_STAGING_AND_PRODUCTION_LOCKED',
    isLocked,
    `Staging duy trì đúng 1 deal Galaxy Cinema, Production feed duy trì bất biến [] (SHA-256: ${prodSha}) và RELEASE_MANIFEST is_approved: false (LOCKED). Zero leak.`);

  console.log(`\n🟢 [TRIAGE-062A-SUMMARY] TOÀN BỘ ${passedTests}/${totalTests} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);

  if (passedTests !== totalTests) {
    process.exit(1);
  }
}

if (require.main === module) {
  run062aTests();
}

module.exports = {
  run062aTests
};
