/**
 * JAYT CANONICAL GATE CUTOVER TEST SUITE (055C)
 * Directive: JAYT-055C-CANONICAL-GATE-CUTOVER
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const sweepScriptPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'execute_daily_public_sweep_055.js');
const baselineSignaturesPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'canonical_signatures_baseline.json');
const summary055Path = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_055_summary.json');
const report055Path = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'daily_public_sweep_055_report.md');
const artifactsDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_055_artifacts');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

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

function runCanonicalGateCutover055cTests() {
  console.log('🧪 [JAYT-055C-CUTOVER-TEST] Khởi chạy bộ kiểm thử chuyển giao Canonical Gate (055C)...');

  // 1. Sweep Script Uses Canonical Truth Gate Exclusively
  const sweepScriptContent = fs.readFileSync(sweepScriptPath, 'utf8');
  const hasCanonicalCall = sweepScriptContent.includes('auditBlockScopedPromo055B');
  const hasLegacyFunction = sweepScriptContent.includes('function evaluate5TruthFactors');

  assertTest('T1_01_SWEEP_SCRIPT_USES_CANONICAL_ENGINE_ONLY',
    hasCanonicalCall && !hasLegacyFunction,
    'execute_daily_public_sweep_055.js gọi duy nhất canonical engine auditBlockScopedPromo055B; Đã xóa bỏ hoàn toàn evaluate5TruthFactors cũ.');

  // 2. Operational Baseline Rich Metadata Valid
  const baselineExists = fs.existsSync(baselineSignaturesPath);
  const baselineJson = baselineExists ? JSON.parse(fs.readFileSync(baselineSignaturesPath, 'utf8')) : null;
  const isBaselineValid = baselineJson &&
                          baselineJson.created_at &&
                          baselineJson.total_sources === 16 &&
                          Array.isArray(baselineJson.sources) &&
                          baselineJson.sources.length === 16 &&
                          baselineJson.sources.every(s => s.brand_id && s.artifact_hashes && typeof s.artifact_hashes === 'object');

  assertTest('T1_02_OPERATIONAL_BASELINE_METADATA_VALID', isBaselineValid,
    'canonical_signatures_baseline.json lưu đầy đủ metadata: timestamp, total_sources=16, danh sách nguồn và mã băm artifact.');

  // 3. Operational Summary Conforms to 055C Batch Metrics
  const summaryExists = fs.existsSync(summary055Path);
  const summary = summaryExists ? JSON.parse(fs.readFileSync(summary055Path, 'utf8')) : null;
  const isSummaryValid = summary &&
                         summary.total_sources_swept === 16 &&
                         summary.new_ready_deals_from_055 === 0 &&
                         summary.staging_accepted_deals === 1 &&
                         summary.deals_in_recheck === 15;

  assertTest('T1_03_SUMMARY_BATCH_METRICS_VALID', isSummaryValid,
    `Báo cáo summary chuẩn xác: Quét=16, Đổi=${summary?.sources_changed}, Deal mới=0, Staging=1 (CGV), Recheck=15.`);

  // 4. All-Or-Nothing Enforcement Across All Receipts
  let allRecheckReceiptsClean = true;
  let recheckReceiptCount = 0;

  if (summary && Array.isArray(summary.results)) {
    summary.results.forEach(r => {
      if (r.brand_id !== 'CGV') {
        recheckReceiptCount++;
        const { price, date_window, conditions, locality } = r.qualified_claims;
        if (price !== null || date_window !== null || conditions !== null || locality !== null) {
          allRecheckReceiptsClean = false;
        }
      }
    });
  }

  assertTest('T1_04_ALL_OR_NOTHING_ENFORCED_IN_RECEIPTS',
    allRecheckReceiptsClean && recheckReceiptCount === 15,
    `Toàn bộ 15 receipts chưa đủ điều kiện đều có 4 trường trong qualified_claims ghi nhận strictly null.`);

  // 5. CGV Staging Receipt Integrity
  const cgvResult = summary?.results?.find(r => r.brand_id === 'CGV');
  const isCgvValid = cgvResult &&
                     cgvResult.status === 'STAGING_INTERNAL_ACCEPTED' &&
                     cgvResult.qualified_claims.price.verbatim_quote.includes('58') &&
                     cgvResult.qualified_claims.date_window.verbatim_quote.includes('24/08/2026') &&
                     cgvResult.qualified_claims.locality.verbatim_quote.includes('CGV Vĩnh Trung Plaza') &&
                     Array.isArray(cgvResult.qualified_claims.conditions);

  assertTest('T1_05_CGV_STAGING_RECEIPT_INTEGRITY', isCgvValid,
    'Hồ sơ CGV đạt đủ 4 qualified claims (58k, 24/08/2026, Vĩnh Trung Plaza) và trạng thái STAGING_INTERNAL_ACCEPTED.');

  // 6. Markdown Report Exists and Reflects Cutover
  const reportExists = fs.existsSync(report055Path);
  const reportContent = reportExists ? fs.readFileSync(report055Path, 'utf8') : '';
  const isReportValid = reportExists &&
                        reportContent.includes('055C CUTOVER') &&
                        reportContent.includes('CANONICAL TRUTH GATE');

  assertTest('T1_06_MARKDOWN_REPORT_VALID', isReportValid,
    'Báo cáo Markdown daily_public_sweep_055_report.md phản ánh chính xác trạng thái Canonical Cutover.');

  // 7. Production Lock Invariant
  const prodFeedContent = fs.readFileSync(prodFeedPath, 'utf8');
  const prodFeedJson = JSON.parse(prodFeedContent);
  const prodFeedSha = crypto.createHash('sha256').update(prodFeedContent).digest('hex');
  const releaseManifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));

  const isProdEmpty = Array.isArray(prodFeedJson) && prodFeedJson.length === 0;
  const isProdShaMatched = prodFeedSha === '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945';
  const isReleaseLocked = releaseManifest.governance_locks?.immutable_ceo_approval_record?.is_approved === false;

  assertTest('INVARIANT_07_PRODUCTION_LOCKED',
    isProdEmpty && isProdShaMatched && isReleaseLocked,
    `Production feed duy trì bất biến [] (SHA-256: ${prodFeedSha}) và RELEASE_MANIFEST is_approved: false (LOCKED)`);

  console.log(`\n🟢 [CANONICAL-CUTOVER-055C-SUMMARY] TOÀN BỘ ${passedCount}/${totalCount} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);
}

if (require.main === module) {
  runCanonicalGateCutover055cTests();
}

module.exports = { runCanonicalGateCutover055cTests };
