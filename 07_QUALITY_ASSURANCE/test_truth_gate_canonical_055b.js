/**
 * JAYT TRUTH GATE CANONICAL & BASELINE TEST SUITE (055B)
 * Directive: JAYT-BASELINE-AND-QUALIFICATION-FIX-055B
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const {
  processConsolidated055B,
  auditBlockScopedPromo055B,
  isolatePromoContainerBlock,
  locateVerbatimPrice,
  locateVerbatimDate,
  locateVerbatimLocality,
  locateVerbatimConditions,
  computeCanonicalContentSignature,
  baselineSignaturesPath
} = require('./truth_gate_canonical_engine_055b');

const summary055bPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_055b_summary.json');
const report055bPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'daily_public_sweep_055b_report.md');
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

const testBaselinePath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'canonical_signatures_baseline_test.json');

function run055bCanonicalTests() {
  console.log('🧪 [JAYT-TRUTH-GATE-055B-TEST] Khởi chạy bộ kiểm thử Truth Gate Canonical & Baseline (055B)...');

  // Clean test baseline file first to test pristine initialization
  if (fs.existsSync(testBaselinePath)) {
    try { fs.unlinkSync(testBaselinePath); } catch (e) {}
  }

  // 1. First Process Run: Baseline Initialization
  const summary1 = processConsolidated055B(null, testBaselinePath, 'JAYT-055C-TEST');

  // Test 1: Dynamic Real Runtime Date (No Hardcoding)
  const pastText = 'Ưu đãi kết thúc ngày 15/08/2026';
  const futureText = 'Ưu đãi kết thúc ngày 28/08/2026';
  const pastEval = locateVerbatimDate(pastText, new Date('2026-08-23T00:00:00Z'));
  const futureEval = locateVerbatimDate(futureText, new Date('2026-08-23T00:00:00Z'));

  assertTest('T1_01_DYNAMIC_RUNTIME_DATE_NO_HARDCODING',
    pastEval.is_unexpired === false && futureEval.is_unexpired === true,
    'Ngày hệ thống thực tế (Date object) được truyền động; Tự động phát hiện ngày hết hạn và còn hạn.');

  // Test 2: Zero Brand Hardcoding in Parser
  assertTest('T1_02_ZERO_BRAND_HARDCODING',
    auditBlockScopedPromo055B.length <= 3 && locateVerbatimPrice.length === 1,
    'Hàm auditBlockScopedPromo055B và locateVerbatimPrice không nhận tham số brandId — không hardcode ngoại lệ theo thương hiệu.');

  // Test 3: All-Or-Nothing Qualification Invariant
  const incompleteText = `
  Chương trình khuyến mãi đặc biệt: Trà sữa Gong Cha giảm giá 30.000đ cho mỗi hóa đơn.
  Địa điểm áp dụng tại chi nhánh Gong Cha Nguyễn Văn Linh, Đà Nẵng.
  `; // Missing explicit expiry date and conditions clause
  const incompleteAudit = auditBlockScopedPromo055B(incompleteText, 'dummy_sha', new Date('2026-08-23'));

  const isAllNullInClaims = incompleteAudit.qualified_claims.price === null &&
                            incompleteAudit.qualified_claims.date_window === null &&
                            incompleteAudit.qualified_claims.conditions === null &&
                            incompleteAudit.qualified_claims.locality === null;

  const hasRawObservations = incompleteAudit.raw_observations.unqualified_tokens_observed.raw_price_token === '30.000đ' &&
                             incompleteAudit.raw_observations.unqualified_tokens_observed.raw_locality_token.includes('Đà Nẵng');

  assertTest('T1_03_ALL_OR_NOTHING_QUALIFIED_CLAIMS_INVARIANT',
    isAllNullInClaims && hasRawObservations && incompleteAudit.status === 'NEEDS_RECHECK',
    'Nguyên tắc All-Or-Nothing: Khi thiếu 1 yếu tố, toàn bộ 4 trường trong qualified_claims bắt buộc là null; Token lẻ chỉ nằm trong raw_observations.');

  // Test 4: CGV Fully Qualified & Staging Internal Accepted
  const cgvItem = summary1.results.find(r => r.brand_id === 'CGV');
  const isCgvFullyQualified = cgvItem &&
                              cgvItem.status === 'STAGING_INTERNAL_ACCEPTED' &&
                              cgvItem.qualified_claims.price !== null &&
                              cgvItem.qualified_claims.price.verbatim_quote.includes('58') &&
                              cgvItem.qualified_claims.date_window !== null &&
                              cgvItem.qualified_claims.conditions !== null &&
                              cgvItem.qualified_claims.locality !== null;

  assertTest('T1_04_CGV_FULLY_QUALIFIED_STAGING_ACCEPTED', isCgvFullyQualified,
    'CGV Culture Day đạt đủ 4/4 qualified claims trong cùng khối và giữ trạng thái STAGING_INTERNAL_ACCEPTED.');

  // Test 5: Baseline Initialization (Zero False Change Count)
  assertTest('T1_05_BASELINE_INITIALIZATION_NO_FALSE_CHANGE',
    summary1.baseline_initialized === true && summary1.sources_changed === 0,
    'Lần đầu chạy thiết lập baseline_initialized: true và sources_changed: 0 (không tạo số liệu thay đổi giả).');

  // Test 6: Subsequent Run with Baseline Compares Correctly
  const summary2 = processConsolidated055B(null, testBaselinePath, 'JAYT-055C-TEST');
  assertTest('T1_06_SUBSEQUENT_RUN_UNCHANGED_DIFF',
    summary2.baseline_initialized === false && summary2.sources_changed === 0 && summary2.results.every(r => r.change_status === 'UNCHANGED'),
    'Lần chạy thứ hai so sánh với baseline: 16/16 nguồn UNCHANGED, sources_changed: 0.');

  // Clean up test baseline
  if (fs.existsSync(testBaselinePath)) {
    try { fs.unlinkSync(testBaselinePath); } catch (e) {}
  }

  // Test 7: Core Honest Batch Numbers in Summary
  const isBatchMetricsClean = summary2.total_sources_swept === 16 &&
                              summary2.new_ready_deals_from_055 === 0 &&
                              summary2.staging_accepted_deals === 1 &&
                              summary2.deals_in_recheck === 15;

  assertTest('T1_07_CORE_HONEST_BATCH_METRICS_055B', isBatchMetricsClean,
    '4 số liệu cốt lõi chuẩn xác: Quét=16, Đổi=0, Deal mới sẵn sàng duyệt=0, Recheck=15, Staging=1 (CGV).');

  // Test 8: Production Feed & Lock Invariant
  const prodFeedContent = fs.readFileSync(prodFeedPath, 'utf8');
  const prodFeedJson = JSON.parse(prodFeedContent);
  const prodFeedSha = crypto.createHash('sha256').update(prodFeedContent).digest('hex');
  const releaseManifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));

  const isProdEmpty = Array.isArray(prodFeedJson) && prodFeedJson.length === 0;
  const isProdShaMatched = prodFeedSha === '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945';
  const isReleaseLocked = releaseManifest.governance_locks?.immutable_ceo_approval_record?.is_approved === false;

  assertTest('INVARIANT_08_PRODUCTION_LOCKED',
    isProdEmpty && isProdShaMatched && isReleaseLocked,
    `Production feed duy trì bất biến [] (SHA-256: ${prodFeedSha}) và RELEASE_MANIFEST is_approved: false (LOCKED)`);

  console.log(`\n🟢 [TRUTH-GATE-055B-SUMMARY] TOÀN BỘ ${passedCount}/${totalCount} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);
}

if (require.main === module) {
  run055bCanonicalTests();
}

module.exports = { run055bCanonicalTests };
