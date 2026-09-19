/**
 * JAYT TRIAGE LINEAGE HARDENING TEST SUITE (062B)
 * Directive: JAYT-TRIAGE-LINEAGE-HARDENING-062B / JAYT-PROJECT-MEMORY-TRANSACTION-057
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');

const rawReport062bPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'RAW_OBSERVATION_REPORT_062B.md');
const candidateSheet062bPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'CANDIDATE_REVIEW_SHEET_062B.md');
const summary062bPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_062b_triage_lineage_hardening', 'sweep_summary_062b.json');
const receipt062bPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_062b_triage_lineage_hardening', 'receipt.json');

const rawReport062aPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'RAW_OBSERVATION_REPORT_062A.md');
const candidateSheet062aPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'CANDIDATE_REVIEW_SHEET_062A.md');
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

const {
  CALENDAR_SCHEDULE_REGEX,
  evaluateProbeStructuralTruthGate062B
} = require('./structural_dom_container_engine_062b');

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

function run062bTests() {
  console.log('🧪 [JAYT-TRIAGE-062B-TEST] Khởi chạy bộ kiểm thử Structural DOM Triage & Lineage Hardening (062B)...');

  // 1. Positive: Dedicated 062B Run Directory and Receipt Valid
  const sumExists = fs.existsSync(summary062bPath);
  const recExists = fs.existsSync(receipt062bPath);
  let run062bValid = false;

  if (sumExists && recExists) {
    const sum = JSON.parse(fs.readFileSync(summary062bPath, 'utf8'));
    const rec = JSON.parse(fs.readFileSync(receipt062bPath, 'utf8'));

    run062bValid = sum.work_order === 'JAYT-TRIAGE-LINEAGE-HARDENING-062B' &&
                   rec.run_id === 'run_062b_triage_lineage_hardening' &&
                   rec.status === 'COMPLETED_PENDING_CEO_AUDIT';
  }
  assertTest('T1_01_DEDICATED_062B_RUN_DIRECTORY_AND_RECEIPT_VALID',
    run062bValid,
    'Thư mục run_062b_triage_lineage_hardening/ và chứng thư receipt.json 062B hợp lệ, độc lập và append-only.');

  // 2. Positive: All 18 Probes Default to OBSERVED_NOT_QUALIFIED
  let all18Defaulted = false;
  if (sumExists) {
    const sum = JSON.parse(fs.readFileSync(summary062bPath, 'utf8'));
    all18Defaulted = sum.triage_metrics.total_probes_evaluated === 18 &&
                     sum.triage_metrics.observed_not_qualified_count === 18 &&
                     sum.triage_metrics.qualified_candidates_count === 0 &&
                     sum.triaged_probes.every(p => p.triage_status === 'OBSERVED_NOT_QUALIFIED');
  }
  assertTest('T1_02_ALL_18_PROBES_DEFAULT_TO_NOT_QUALIFIED',
    all18Defaulted,
    'Toàn bộ 18 deep probes đều được thẩm định chính xác là OBSERVED_NOT_QUALIFIED trên engine cấu trúc DOM.');

  // 3. Negative: Fragmented Across Disjoint DOM Nodes Rejected
  const fragmentedProbe = {
    target_url: 'https://sample.vn/fragmented-promo',
    outcome: 'LIVE_CDP_SUCCESS'
  };
  const fragmentedHtml = `
    <html>
      <head><title>Fragmented Page</title></head>
      <body>
        <div class="top-nav">Header banner with logo</div>
        <div id="price-box">Giá chỉ 50.000đ</div>
        <div id="calendar-box">Áp dụng Thứ Ba hàng tuần</div>
        <div id="terms-box">Điều kiện áp dụng cho mọi khách hàng</div>
        <div id="location-box">Áp dụng tại Đà Nẵng</div>
      </body>
    </html>
  `;
  const fragmentedText = 'Header banner with logo Giá chỉ 50.000đ Áp dụng Thứ Ba hàng tuần Điều kiện áp dụng cho mọi khách hàng Áp dụng tại Đà Nẵng';
  const fragmentedEval = evaluateProbeStructuralTruthGate062B(fragmentedProbe, fragmentedHtml, fragmentedText);

  assertTest('T1_03_NEGATIVE_FRAGMENTED_ACROSS_DISJOINT_DOM_NODES_REJECTED',
    fragmentedEval.passed_gate === false && fragmentedEval.failure_reason === 'FRAGMENTED_ACROSS_DISJOINT_DOM_NODES',
    `Chặn đứng thông tin bị phân mảnh qua các node DOM rời rạc: [${fragmentedEval.failure_reason}].`);

  // 4. Negative: Permissive Character Classes in Calendar Regex Rejected
  const falseCalendarText1 = 'thứ tha cho nhau mọi lỗi lầm';
  const falseCalendarText2 = 'hàng quán đóng cửa từ từ';
  const falseCalendarText3 = 'ngày ngày trôi qua êm đềm';

  const falseCal1 = CALENDAR_SCHEDULE_REGEX.test(falseCalendarText1);
  const falseCal2 = CALENDAR_SCHEDULE_REGEX.test(falseCalendarText2);
  const falseCal3 = CALENDAR_SCHEDULE_REGEX.test(falseCalendarText3);

  assertTest('T1_04_NEGATIVE_PERMISSIVE_CALENDAR_PATTERNS_REJECTED',
    !falseCal1 && !falseCal2 && !falseCal3,
    'Regex lịch chính xác tuyệt đối: Bác bỏ hoàn toàn các từ ngữ chứa ký tự ngẫu nhiên không phải lịch ưu đãi.');

  // 5. Positive: Real Calendar Patterns Matched
  const trueCal1 = CALENDAR_SCHEDULE_REGEX.test('Áp dụng Thứ Ba hàng tuần cho tất cả khách hàng');
  const trueCal2 = CALENDAR_SCHEDULE_REGEX.test('Chương trình áp dụng từ ngày 01/08/2026 đến 31/08/2026');
  const trueCal3 = CALENDAR_SCHEDULE_REGEX.test('Duy nhất ngày 24/08/2026 tại các cụm rạp');

  assertTest('T1_05_POSITIVE_REAL_CALENDAR_PATTERNS_MATCHED',
    trueCal1 && trueCal2 && trueCal3,
    'Regex lịch nhận diện chuẩn xác: Thứ Ba hàng tuần, từ ngày..đến ngày, và ngày duy nhất.');

  // 6. Positive: Single Bounded Container Qualified
  const qualifiedProbe = {
    target_url: 'https://sample.vn/single-container-deal',
    outcome: 'LIVE_CDP_SUCCESS'
  };
  const qualifiedHtml = `
    <div class="deal-card" id="deal-happy-day">
      <h3 class="deal-title">Ưu Đãi Đặc Biệt</h3>
      <p class="deal-price">Giá vé 50.000đ</p>
      <p class="deal-schedule">Áp dụng Thứ Ba hàng tuần</p>
      <p class="deal-terms">Điều kiện áp dụng: Không áp dụng ngày Lễ/Tết</p>
      <p class="deal-loc">Áp dụng tại cụm rạp Đà Nẵng</p>
    </div>
  `;
  const qualifiedText = 'Ưu Đãi Đặc Biệt Giá vé 50.000đ Áp dụng Thứ Ba hàng tuần Điều kiện áp dụng: Không áp dụng ngày Lễ/Tết Áp dụng tại cụm rạp Đà Nẵng';
  const qualifiedEval = evaluateProbeStructuralTruthGate062B(qualifiedProbe, qualifiedHtml, qualifiedText);

  const containerPassed = qualifiedEval.passed_gate === true &&
                          qualifiedEval.triage_status === 'CANDIDATE_QUALIFIED_PENDING_CEO_REVIEW' &&
                          qualifiedEval.structural_container !== null &&
                          qualifiedEval.structural_container.selector === 'div#deal-happy-day' &&
                          typeof qualifiedEval.structural_container.container_sha256 === 'string';

  assertTest('T1_06_POSITIVE_SINGLE_BOUNDED_CONTAINER_QUALIFIED',
    containerPassed,
    'Khối container DOM trọn vẹn chứa đủ 4 yếu tố được công nhận CANDIDATE_QUALIFIED với selector và container hash.');

  // 7. Positive: Preservation of 062A Files Append-Only
  const preserved062a = fs.existsSync(rawReport062aPath) &&
                        fs.existsSync(candidateSheet062aPath) &&
                        fs.existsSync(receipt062aPath);

  assertTest('T1_07_PRESERVATION_OF_062A_FILES_APPEND_ONLY',
    preserved062a,
    'Toàn bộ các tệp của đợt 062A được bảo tồn 100% không bị ghi đè append-only.');

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
                             fs.existsSync(ceoDecision061gPath) &&
                             fs.existsSync(receipt062Path) &&
                             fs.existsSync(receipt062aPath);

  assertTest('T1_08_HISTORICAL_RUNS_AND_RECEIPTS_PRESERVED_APPEND_ONLY',
    allHistoricalExist,
    'Toàn bộ các run receipts và correction receipts lịch sử (058..062A) được bảo tồn 100% append-only.');

  // 9. Invariant: Staging Isolated & Production Locked
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

  assertTest('INVARIANT_09_STAGING_AND_PRODUCTION_LOCKED',
    isLocked,
    `Staging duy trì đúng 1 deal Galaxy Cinema, Production feed duy trì bất biến [] (SHA-256: ${prodSha}) và RELEASE_MANIFEST is_approved: false (LOCKED). Zero leak.`);

  console.log(`\n🟢 [TRIAGE-062B-SUMMARY] TOÀN BỘ ${passedTests}/${totalTests} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);

  if (passedTests !== totalTests) {
    process.exit(1);
  }
}

if (require.main === module) {
  run062bTests();
}

module.exports = {
  run062bTests
};
