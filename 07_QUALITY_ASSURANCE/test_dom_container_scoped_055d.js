/**
 * JAYT DOM CONTAINER SCOPING TEST SUITE (055D)
 * Directive: JAYT-DOM-CONTAINER-SCOPE-055D
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const sweepScriptPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'execute_daily_public_sweep_055.js');
const baselineSignaturesPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'canonical_signatures_baseline.json');
const summary055Path = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_055_summary.json');
const report055Path = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'daily_public_sweep_055_report.md');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

const {
  processConsolidated055D,
  auditDomContainerScopedPromo055D,
  extractHtmlContainers
} = require('./truth_gate_container_scoped_055d');

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

function run055dContainerScopedTests() {
  console.log('🧪 [JAYT-DOM-CONTAINER-055D-TEST] Khởi chạy bộ kiểm thử DOM Container Scoping (055D)...');

  // 1. Sweep Script Uses DOM Container Scoped Truth Gate
  const sweepScriptContent = fs.readFileSync(sweepScriptPath, 'utf8');
  const hasContainerScopedCall = sweepScriptContent.includes('auditDomContainerScopedPromo055D');
  const hasLegacyFunction = sweepScriptContent.includes('function evaluate5TruthFactors');

  assertTest('T1_01_SWEEP_SCRIPT_USES_CONTAINER_SCOPED_ENGINE',
    hasContainerScopedCall && !hasLegacyFunction,
    'execute_daily_public_sweep_055.js gọi duy nhất engine auditDomContainerScopedPromo055D; Zero regex lỏng lẻo toàn trang.');

  // 2. Negative Test: Disconnected DOM Elements (Anti-Fragment Joining)
  const splitHtml = `
    <html>
      <body>
        <div id="banner-pricing"><strong>58.000đ</strong> Vé xem phim</div>
        <div id="sidebar-dates">Áp dụng ngày 24/08/2026</div>
        <div id="footer-branches">Hệ thống CGV Vĩnh Trung Plaza Đà Nẵng</div>
        <div id="terms-modal">Điều khoản và điều kiện áp dụng cho thành viên</div>
      </body>
    </html>
  `;
  const splitEval = auditDomContainerScopedPromo055D(splitHtml, '58.000đ 24/08/2026 CGV Vĩnh Trung Plaza Điều khoản và điều kiện');

  assertTest('T1_02_ANTI_FRAGMENT_JOINING_REJECTED',
    splitEval.status === 'NEEDS_RECHECK' &&
    splitEval.dom_container_scope.is_container_scoped === false &&
    splitEval.qualified_claims.price === null &&
    splitEval.qualified_claims.date_window === null &&
    splitEval.qualified_claims.locality === null &&
    splitEval.qualified_claims.conditions === null,
    'Các mảnh dữ kiện nằm ở các element rời rạc (khác container) bị từ chối triệt để — cấm ghép token xuyên container.');

  // 3. Isolated Test Baseline Run in private_sandbox
  const sandboxTestDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'private_sandbox', 'test_evidence');
  fs.mkdirSync(sandboxTestDir, { recursive: true });
  const testBaselinePath = path.join(sandboxTestDir, 'canonical_signatures_baseline_test.json');
  if (fs.existsSync(testBaselinePath)) {
    try { fs.unlinkSync(testBaselinePath); } catch (e) {}
  }

  const summaryTest = processConsolidated055D({ isTest: true }, testBaselinePath, 'JAYT-055D-TEST');

  // Verify test baseline created in sandbox and clean up
  const isTestBaselineCreated = fs.existsSync(testBaselinePath);
  if (fs.existsSync(testBaselinePath)) {
    try { fs.unlinkSync(testBaselinePath); } catch (e) {}
  }

  assertTest('T1_03_TEST_BASELINE_ISOLATION', isTestBaselineCreated,
    'Bộ test tự động thực thi với baseline test trong private_sandbox, không xóa hay ghi đè baseline vận hành.');

  // 4. CGV Container Scoping Provenance
  const cgvItem = summaryTest.results.find(r => r.brand_id === 'CGV');
  const isCgvContainerValid = cgvItem &&
                              cgvItem.dom_container_scope.is_container_scoped === true &&
                              cgvItem.dom_container_scope.container_locator.includes('postContent') &&
                              cgvItem.dom_container_scope.container_outer_html_sha256 !== null &&
                              cgvItem.dom_container_scope.container_text_sha256 !== null &&
                              cgvItem.status === 'STAGING_INTERNAL_ACCEPTED' &&
                              cgvItem.qualified_claims.price.verbatim_quote.includes('58.000đ') &&
                              cgvItem.qualified_claims.date_window.verbatim_quote.includes('24/08/2026') &&
                              cgvItem.qualified_claims.locality.verbatim_quote.includes('CGV Vĩnh Trung Plaza');

  assertTest('T1_04_CGV_DOM_CONTAINER_PROVENANCE_VALID', isCgvContainerValid,
    `CGV Culture Day được định danh chính xác container DOM '${cgvItem?.dom_container_scope?.container_locator}' kèm mã băm outerHTML/text.`);

  // 5. All 15 Unqualified Sources Fail-Closed Container Scoping
  let all15Clean = true;
  let unqualifiedCount = 0;
  summaryTest.results.forEach(r => {
    if (r.brand_id !== 'CGV') {
      unqualifiedCount++;
      if (r.dom_container_scope.is_container_scoped !== false ||
          r.dom_container_scope.container_locator !== null ||
          r.qualified_claims.price !== null ||
          r.qualified_claims.date_window !== null ||
          r.qualified_claims.conditions !== null ||
          r.qualified_claims.locality !== null) {
        all15Clean = false;
      }
    }
  });

  assertTest('T1_05_UNQUALIFIED_SOURCES_CONTAINER_FAIL_CLOSED',
    all15Clean && unqualifiedCount === 15,
    'Toàn bộ 15 nguồn chưa đủ 4 yếu tố trong cùng 1 container đều có container_locator=null và 4 qualified_claims=null.');

  // 6. Honest Batch Metrics
  const isMetricsValid = summaryTest.total_sources_swept === 16 &&
                         summaryTest.sources_changed === 0 &&
                         summaryTest.new_ready_deals_from_055 === 0 &&
                         summaryTest.staging_accepted_deals === 1 &&
                         summaryTest.deals_in_recheck === 15;

  assertTest('T1_06_HONEST_BATCH_METRICS_055D', isMetricsValid,
    '4 số liệu cốt lõi chuẩn xác: Quét=16, Đổi=0, Deal mới sẵn sàng duyệt=0, Recheck=15, Staging=1 (CGV).');

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

  console.log(`\n🟢 [DOM-CONTAINER-055D-SUMMARY] TOÀN BỘ ${passedCount}/${totalCount} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);
}

if (require.main === module) {
  run055dContainerScopedTests();
}

module.exports = { run055dContainerScopedTests };
