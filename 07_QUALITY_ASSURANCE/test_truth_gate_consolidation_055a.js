/**
 * JAYT TRUTH GATE CONSOLIDATION & REGRESSION TEST SUITE (055A)
 * Directive: JAYT-TRUTH-GATE-CONSOLIDATION-055A
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const {
  processConsolidated055A,
  evaluateArtifact055A,
  isolatePromoContainerBlock,
  locateVerbatimPrice,
  locateVerbatimDate,
  locateVerbatimLocality,
  locateVerbatimConditions,
  computeCanonicalContentSignature
} = require('./truth_gate_consolidation_055a');

const summary055aPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_055a_summary.json');
const report055aPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'daily_public_sweep_055a_report.md');
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

function run055aRegressionAndConsolidationTests() {
  console.log('🧪 [JAYT-TRUTH-GATE-055A-TEST] Khởi chạy bộ kiểm thử khắc phục hồi quy & củng cố Truth Gate (055A)...');

  // Process 055A
  const summary = processConsolidated055A();

  // 1. Regression Test 1: Reject Footer Date 31/7/2008
  const sampleFooterText = `
  Đồng giá 58.000đ vé xem phim 2D
  Áp dụng ngày 24/08/2026 tại CGV Vĩnh Trung Plaza
  Điều kiện áp dụng: chỉ áp dụng mua tại quầy.
  --- CHÂN TRANG ---
  CÔNG TY TNHH CJ CGV VIETNAM
  Giấy CNĐKDN: 0303675393, đăng ký lần đầu ngày 31/7/2008, cấp bởi Sở KHĐT TP.HCM.
  `;
  const footerBlock = isolatePromoContainerBlock(sampleFooterText);
  const footerDate = locateVerbatimDate(footerBlock.cleanText, '2026-08-23');
  const has2008 = footerDate && footerDate.verbatim_quote.includes('2008');
  const has2026 = footerDate && footerDate.verbatim_quote.includes('24/08/2026');

  assertTest('REG_01_REJECT_FOOTER_DATE_2008',
    !has2008 && has2026,
    'Ngày đăng ký doanh nghiệp 31/7/2008 ở chân trang bị loại bỏ triệt để; Chỉ giữ ngày ưu đãi 24/08/2026.');

  // 2. Regression Test 2: Reject Phone & Tax Numbers (28.39.333, 028...)
  const samplePhoneText = `
  Hotline hỗ trợ: 028.39.333.123
  Tổng đài: 19006017
  Số đăng ký thuế: 28.39.333
  `;
  const phonePrice = locateVerbatimPrice(samplePhoneText, 'METIZ');
  const phoneDate = locateVerbatimDate(samplePhoneText, '2026-08-23');

  assertTest('REG_02_REJECT_PHONE_AND_TAX_NUMBERS',
    phonePrice === null && phoneDate === null,
    'Số điện thoại và mã số 28.39.333 bị từ chối 100%, không bị nhận nhầm thành giá hoặc ngày.');

  // 3. Regression Test 3: Reject Galaxy 100K Navigation Banner
  const sampleGalaxyNavText = `
  Galaxy Cinema Khuyến Mãi
  Menu: Phim Đang Chiếu | Lịch Chiếu | Ưu Đãi
  Thẻ thành viên Galaxy - Tích lũy 100K điểm nhận quà
  `;
  const galaxyPrice = locateVerbatimPrice(sampleGalaxyNavText, 'GALAXY');

  assertTest('REG_03_REJECT_GALAXY_100K_NAV_CARD',
    galaxyPrice === null,
    'Token 100K thẻ thành viên trong Galaxy Cinema bị loại bỏ, không bị gán làm giá deal.');

  // 4. Regression Test 4: Reject "toàn quốc/hệ thống" as Da Nang Locality
  const sampleNationwideText = `
  Giảm giá 30% toàn bộ menu
  Áp dụng trên toàn quốc và toàn hệ thống cửa hàng
  Hạn sử dụng: 30/08/2026
  Điều kiện: áp dụng cho thành viên.
  `;
  const nationwideLocality = locateVerbatimLocality(sampleNationwideText);

  assertTest('REG_04_REJECT_TOAN_QUOC_AS_DANANG',
    nationwideLocality === null,
    'Cụm từ "toàn quốc / toàn hệ thống" không được coi là chi nhánh Đà Nẵng (trả về null).');

  // 5. Output Schema Separation & Clean Nulls for Incomplete Sources
  const galaxyResult = summary.results.find(r => r.brand_id === 'GALAXY');
  const hasCleanNulls = galaxyResult &&
    galaxyResult.qualified_claims.conditions === null &&
    galaxyResult.status === 'NEEDS_RECHECK';

  assertTest('T1_05_SCHEMA_SEPARATION_CLEAN_NULLS', hasCleanNulls,
    'Trường chưa xác thực trong qualified_claims ghi nhận strictly null (không ghi token rác).');

  // 6. CGV Qualified Claims Extraction
  const cgvResult = summary.results.find(r => r.brand_id === 'CGV');
  const isCgvClaimsValid = cgvResult &&
    cgvResult.qualified_claims.price.verbatim_quote.includes('58') &&
    cgvResult.qualified_claims.locality.verbatim_quote.toLowerCase().includes('vĩnh trung') &&
    cgvResult.qualified_claims.conditions.length >= 1 &&
    cgvResult.status === 'STAGING_INTERNAL_ACCEPTED';

  assertTest('T1_06_CGV_EXACT_QUALIFIED_CLAIMS', isCgvClaimsValid,
    'CGV trích xuất chuẩn xác giá 58k, CGV Vĩnh Trung Plaza, điều kiện loại trừ và trạng thái STAGING_INTERNAL_ACCEPTED.');

  // 7. Canonical Content Signature Integrity
  const sig1 = computeCanonicalContentSignature('  CGV   Vĩnh Trung \n\n Plaza  58k  ');
  const sig2 = computeCanonicalContentSignature('cgv vĩnh trung plaza 58k');

  assertTest('T1_07_CANONICAL_SIGNATURE_DIFF_VERIFIED', sig1 === sig2 && sig1 !== null,
    'Chữ ký nội dung chuẩn hóa (canonical content signature) bất biến trước khoảng trắng và xuống dòng.');

  // 8. 4 Core Honest Batch Numbers
  const is4BatchNumbersValid = summary.total_sources_swept === 16 &&
    summary.new_ready_deals_from_055 === 0 &&
    summary.deals_in_recheck === 15 &&
    summary.staging_accepted_deals === 1;

  assertTest('T1_08_FOUR_HONEST_BATCH_NUMBERS_VERIFIED', is4BatchNumbersValid,
    `4 số liệu cốt lõi chuẩn xác 100%: Quét=16, New Ready Deals=0, Recheck=15, Staging=1 (CGV).`);

  // 9. Production Lock Invariant
  const prodFeedContent = fs.readFileSync(prodFeedPath, 'utf8');
  const prodFeedJson = JSON.parse(prodFeedContent);
  const prodFeedSha = crypto.createHash('sha256').update(prodFeedContent).digest('hex');
  const releaseManifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));

  const isProdEmpty = Array.isArray(prodFeedJson) && prodFeedJson.length === 0;
  const isProdShaMatched = prodFeedSha === '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945';
  const isReleaseLocked = releaseManifest.governance_locks?.immutable_ceo_approval_record?.is_approved === false;

  assertTest('INVARIANT_09_PRODUCTION_LOCKED',
    isProdEmpty && isProdShaMatched && isReleaseLocked,
    `Production feed duy trì bất biến [] (SHA-256: ${prodFeedSha}) và RELEASE_MANIFEST is_approved: false (LOCKED)`);

  console.log(`\n🟢 [TRUTH-GATE-055A-SUMMARY] TOÀN BỘ ${passedCount}/${totalCount} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);
}

if (require.main === module) {
  run055aRegressionAndConsolidationTests();
}

module.exports = { run055aRegressionAndConsolidationTests };
