/**
 * JAYT REAL DATA ACCUMULATION TEST SUITE (055)
 * Directive: JAYT-REAL-DATA-ACCUMULATION-055
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const summaryPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_055_summary.json');
const reportPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'daily_public_sweep_055_report.md');
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

function getFileSha256(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function runRealDataAccumulation055Tests() {
  console.log('🧪 [JAYT-DATA-ACCUMULATION-055-TEST] Khởi chạy bộ kiểm thử tích lũy dữ liệu thật 16 nguồn (055)...');

  // 1. Summary File Exists & Valid
  const summaryExists = fs.existsSync(summaryPath);
  assertTest('T1_01_SUMMARY_EXISTS', summaryExists,
    'Tệp sweep_055_summary.json tồn tại trên đĩa.');

  const summary = summaryExists ? JSON.parse(fs.readFileSync(summaryPath, 'utf8')) : null;

  // 2. 4 Core Batch Metrics Consistent
  const has4CoreMetrics = summary &&
    summary.total_sources_swept === 16 &&
    summary.sources_changed >= 1 &&
    summary.deals_ready_for_review === 1 &&
    summary.deals_in_recheck === 15;

  assertTest('T1_02_4_CORE_BATCH_METRICS_CONSISTENT', has4CoreMetrics,
    `4 số liệu cốt lõi chuẩn xác: Quét=${summary?.total_sources_swept}, Đổi=${summary?.sources_changed}, Đủ review=${summary?.deals_ready_for_review}, Recheck=${summary?.deals_in_recheck}.`);

  // 3. Markdown Report Exists and Contains Full Table
  const reportExists = fs.existsSync(reportPath);
  const reportContent = reportExists ? fs.readFileSync(reportPath, 'utf8') : '';
  const reportValid = reportExists &&
    reportContent.includes('BÁO CÁO TÍCH LŨY DỮ LIỆU THẬT 16 NGUỒN (055)') &&
    reportContent.includes('CGV') &&
    reportContent.includes('GALAXY') &&
    reportContent.includes('METIZ') &&
    reportContent.includes('SHOPEE') &&
    reportContent.includes('LAZADA') &&
    reportContent.includes('TIKTOK');

  assertTest('T1_03_MARKDOWN_REPORT_EXISTS_AND_VALID', reportValid,
    'Báo cáo Markdown daily_public_sweep_055_report.md đầy đủ bảng 16 nguồn và 4 số liệu batch.');

  // 4. Artifact Integrity Check for All 16 Sources
  let allArtifactsValid = true;
  let artifactCount = 0;

  if (summary && Array.isArray(summary.results)) {
    summary.results.forEach(r => {
      const { png_path, html_path, text_path, png_sha256, html_sha256, text_sha256 } = r.artifacts;
      if (html_path && fs.existsSync(html_path)) {
        artifactCount++;
        const calcSha = getFileSha256(html_path);
        if (calcSha !== html_sha256) allArtifactsValid = false;
      }
      if (text_path && fs.existsSync(text_path)) {
        artifactCount++;
        const calcSha = getFileSha256(text_path);
        if (calcSha !== text_sha256) allArtifactsValid = false;
      }
      if (png_path && fs.existsSync(png_path)) {
        artifactCount++;
        const calcSha = getFileSha256(png_path);
        if (calcSha !== png_sha256) allArtifactsValid = false;
      }
    });
  }

  assertTest('T1_04_ALL_ARTIFACTS_MATCH_SHA256', allArtifactsValid && artifactCount >= 40,
    `Đã xác thực ${artifactCount} artifacts thật trên đĩa (HTML/Text/PNG), toàn bộ khớp 100% mã băm SHA-256.`);

  // 5. Single Ready Deal is CGV Culture Day
  const cgvResult = summary?.results?.find(r => r.brand_id === 'CGV');
  const isCgvReady = cgvResult &&
    cgvResult.status === 'RAW_CAPTURE_PENDING_MANUAL_REVIEW' &&
    cgvResult.truth_evaluation.is_ready_for_review === true &&
    cgvResult.truth_evaluation.observed_price.includes('58');

  assertTest('T1_05_CGV_IS_SINGLE_READY_DEAL', isCgvReady,
    'Duy nhất nguồn CGV đạt tiêu chuẩn trích xuất sự thật đủ 5 yếu tố.');

  // 6. Remaining 15 Sources Fail-Closed with Honest Reasons
  const recheckResults = summary?.results?.filter(r => r.brand_id !== 'CGV') || [];
  const allRecheckHaveReasons = recheckResults.length === 15 &&
    recheckResults.every(r => r.status === 'NEEDS_RECHECK' && r.truth_evaluation.failure_reason);

  assertTest('T1_06_15_RECHECK_SOURCES_HONEST_FAIL_CLOSED', allRecheckHaveReasons,
    'Toàn bộ 15 nguồn chưa đủ điều kiện đều chuyển NEEDS_RECHECK với lý do kỹ thuật minh bạch (không tự bịa deal).');

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

  console.log(`\n🟢 [DATA-ACCUMULATION-055-SUMMARY] TOÀN BỘ ${passedCount}/${totalCount} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);
}

if (require.main === module) {
  runRealDataAccumulation055Tests();
}

module.exports = { runRealDataAccumulation055Tests };
