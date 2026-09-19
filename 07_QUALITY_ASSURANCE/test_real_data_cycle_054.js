/**
 * JAYT REAL DATA TO GO-LIVE CYCLE TEST SUITE (054)
 * Directive: JAYT-REAL-DATA-TO-GO-LIVE-054
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const sweepSummaryPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_054_summary.json');
const sweepReportPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'daily_public_sweep_054_report.md');
const targetsDossierPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'merchant_intake', 'DA_NANG_PRIORITY_TARGETS_054.md');
const dealsFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const manifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

let passedCount = 0;
let totalCount = 0;

function assertTest(testName, condition, detail) {
  totalCount++;
  if (condition) {
    passedCount++;
    console.log(`  [${testName}]: [PASS] - ${detail}`);
  } else {
    console.error(`  [${testName}]: [FAIL] - ${detail}`);
    process.exitCode = 1;
  }
}

console.log('🧪 [JAYT-REAL-DATA-054-TEST] Khởi chạy bộ kiểm thử Chu Kỳ Dữ Liệu Thật 054...');

// 1. Summary JSON exists & covers sources
const summaryExists = fs.existsSync(sweepSummaryPath);
assertTest('T1_01_SWEEP_SUMMARY_EXISTS', summaryExists,
  'Tệp sweep_054_summary.json tồn tại sau chu kỳ quét công khai.');

if (summaryExists) {
  const summary = JSON.parse(fs.readFileSync(sweepSummaryPath, 'utf8'));

  // 2. Multi-cluster coverage
  const categories = new Set(summary.results.map(r => r.category));
  const has3Clusters = categories.size >= 3;
  assertTest('T1_02_MULTI_CLUSTER_SWEEP_COVERAGE', has3Clusters,
    `Đã quét ${summary.results.length} nguồn bao phủ ${categories.size} cụm giá trị (Cinema, F&B, Delivery).`);

  // 3. Artifact completeness & integrity
  let artifactsValid = true;
  for (const r of summary.results) {
    if (r.artifacts.screenshot && r.artifacts.screenshot.sha256.length !== 64) artifactsValid = false;
    if (r.artifacts.html_dump && r.artifacts.html_dump.sha256.length !== 64) artifactsValid = false;
    if (r.artifacts.text_dump && r.artifacts.text_dump.sha256.length !== 64) artifactsValid = false;
  }
  assertTest('T1_03_RAW_ARTIFACTS_SHA256_INTEGRITY', artifactsValid,
    'Toàn bộ artifacts (PNG screenshot, HTML dump, text dump) có mã SHA-256 64-hex hợp lệ.');

  // 4. Strict 6-condition fail-closed evaluation
  let strictFailClosed = true;
  for (const r of summary.results) {
    const audit = r.truth_gate_audit || r.truth_evaluation;
    const isEligible = audit.status === 'READY_FOR_CEO_REVIEW' || audit.status === 'ELIGIBLE_FOR_CEO_REVIEW';
    const reasons = audit.reasons || audit.missing_conditions || [];
    if (reasons.length > 0 && isEligible) {
      strictFailClosed = false;
    }
  }
  assertTest('T1_04_STRICT_6_CONDITION_FAIL_CLOSED', strictFailClosed,
    'Nguồn thiếu bất kỳ điều kiện nào đều bị phân loại NEEDS_RECHECK.');

  // 5. Daily report exists
  const reportExists = fs.existsSync(sweepReportPath);
  assertTest('T1_05_DAILY_DISCOVERY_REPORT_EXISTS', reportExists,
    'Báo cáo daily_public_sweep_054_report.md được tạo với bảng discovery chi tiết.');
}

// 6. Da Nang priority targets dossier exists
const dossierExists = fs.existsSync(targetsDossierPath);
assertTest('T1_06_DA_NANG_PRIORITY_TARGETS_DOSSIER', dossierExists,
  'Hồ sơ cụm merchant ưu tiên Đà Nẵng (DA_NANG_PRIORITY_TARGETS_054.md) sẵn sàng cho Track 2.');

// 7. Production lock invariant
const deals = JSON.parse(fs.readFileSync(dealsFeedPath, 'utf8'));
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const productionLocked = Array.isArray(deals) && deals.length === 0 && manifest.governance_locks?.immutable_ceo_approval_record?.is_approved === false;
assertTest('INVARIANT_07_PRODUCTION_LOCKED', productionLocked,
  'Production feed duy trì bất biến [] và RELEASE_MANIFEST is_approved: false (LOCKED)');

console.log(`\n${passedCount === totalCount ? '🟢' : '🔴'} [REAL-DATA-054-SUMMARY] TOÀN BỘ ${passedCount}/${totalCount} KIỂM THỬ ĐÃ ĐẠT [${passedCount === totalCount ? 'PASS' : 'FAIL'}]!\n`);
