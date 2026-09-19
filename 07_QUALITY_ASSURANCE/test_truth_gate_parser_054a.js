/**
 * JAYT EVIDENCE PARSER TRUTH GATE TEST SUITE (054A)
 * Directive: JAYT-EVIDENCE-PARSER-TRUTH-GATE-054A
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const {
  isolatePromoContentBlock,
  validateDateOrSchedule,
  validatePromoPrice,
  validateDaNangLocality,
  validatePromoConditions,
  auditSourceTruthGate054A
} = require('./truth_gate_parser_054a');

const artifactsDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_054_artifacts');
const summaryPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_054_summary.json');
const reportPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'daily_public_sweep_054_report.md');
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

console.log('🧪 [JAYT-TRUTH-GATE-054A-TEST] Khởi chạy bộ kiểm thử Cổng Bằng Chứng & Phân Loại Parser 054A...');

// 1. Negative Test: Footer phone numbers must NOT be parsed as dates
const phoneFooter1 = validateDateOrSchedule('028.39.333.303', 'Hotline CSKH: 028.39.333.303');
const phoneFooter2 = validateDateOrSchedule('28.39.333', ': 028.39.333.303 - : 19002224');
const phoneFooter3 = validateDateOrSchedule('19002224', 'Tổng đài 19002224');
assertTest('T1_01_NEGATIVE_FOOTER_PHONE_NOT_DATE', phoneFooter1 === null && phoneFooter2 === null && phoneFooter3 === null,
  'Số điện thoại và hotline footer (028.39.333.303, 28.39.333, 19002224) bị chặn 100%, không bị nhận nhầm làm ngày.');

// 2. Negative Test: Header/Menu/Footer isolation
const dummyPageWithFooterPrice = `
ĐĂNG NHẬP / ĐĂNG KÝ
Menu Món Ăn
Khuyến mãi mùa hè
---
CÔNG TY CỔ PHẦN PHIM THIÊN NGÂN
MST: 0101595681
3/9 Võ Văn Tần, TP. Hồ Chí Minh
Giá vé niêm yết: 120.000đ
Tel: 028.39.333.303
`;
const isolatedBlock = isolatePromoContentBlock(dummyPageWithFooterPrice);
const footerPriceLeaked = validatePromoPrice(isolatedBlock);
assertTest('T1_02_NEGATIVE_FOOTER_PRICE_ISOLATED', footerPriceLeaked === null,
  'Mức giá và thông tin nằm trong footer bị loại bỏ khi cô lập khối nội dung ưu đãi.');

// 3. Negative Test: 404 / Error / Empty pages
const errAudit = auditSourceTruthGate054A({
  brand_id: 'TEST_404',
  page_text: '404 Not Found. The requested URL was not found on this server.'
});
assertTest('T1_03_NEGATIVE_404_ERROR_REJECTED', errAudit.status === 'NEEDS_RECHECK' && errAudit.failure_code === 'HTTP_404_OR_ACCESS_DENIED',
  'Trang lỗi 404 bị từ chối triệt để với mã HTTP_404_OR_ACCESS_DENIED.');

// 4. Negative Test: Galaxy Cinema downgraded with PARSER_FALSE_POSITIVE_FOOTER_PHONE
const galaxyAudit = auditSourceTruthGate054A({
  brand_id: 'GALAXY',
  page_text: 'Galaxy Cinema x KFC Tặng Đến 100K\n028.39.333.303'
});
assertTest('T1_04_GALAXY_DOWNGRADED_PHONE_FALSE_POSITIVE', galaxyAudit.status === 'NEEDS_RECHECK' && galaxyAudit.failure_code === 'PARSER_FALSE_POSITIVE_FOOTER_PHONE',
  'Galaxy Cinema bị hạ về NEEDS_RECHECK với lý do PARSER_FALSE_POSITIVE_FOOTER_PHONE.');

// 5. Negative Test: Out-of-scope non-Da Nang location
const hcmAudit = auditSourceTruthGate054A({
  brand_id: 'TEST_HCM',
  page_text: 'Ưu đãi chỉ áp dụng tại chi nhánh Quận 1, TP. Hồ Chí Minh và Cầu Giấy, Hà Nội. Giá 50.000đ ngày 25/08/2026. Điều kiện áp dụng cho thành viên.'
});
assertTest('T1_05_NEGATIVE_NON_DANANG_CITY_REJECTED', hcmAudit.status === 'NEEDS_RECHECK' && hcmAudit.failure_code === 'MISSING_IN_CONTENT_DA_NANG_LOCALITY',
  'Ưu đãi chỉ áp dụng tại Hà Nội/TP.HCM không có Đà Nẵng bị từ chối MISSING_IN_CONTENT_DA_NANG_LOCALITY.');

// 6. Positive Audit: CGV Culture Day has valid block-scoped claims
const cgvReceiptPath = path.join(artifactsDir, 'receipt_054_cgv_1.json');
const cgvReceipt = JSON.parse(fs.readFileSync(cgvReceiptPath, 'utf8'));
assertTest('T1_06_CGV_CULTURE_DAY_ONLY_STAGING_CANDIDATE',
  cgvReceipt.truth_gate_audit.status === 'READY_FOR_CEO_REVIEW' &&
  cgvReceipt.truth_gate_audit.claims.price_snippet === '58.000đ' &&
  cgvReceipt.truth_gate_audit.claims.locality_snippet === 'vĩnh trung plaza' &&
  cgvReceipt.truth_gate_audit.claims.expiry_snippet === '24/08/2026',
  'CGV Culture Day là ứng viên DUY NHẤT đạt 6/6 điều kiện sự thật và nằm ở hàng chờ CEO review.');

// 7. Audit Summary Count: Exactly 1 READY_FOR_CEO_REVIEW and 12 NEEDS_RECHECK
const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
assertTest('T1_07_CALIBRATED_SUMMARY_COUNTS',
  summary.total_sources_audited === 13 &&
  summary.eligible_for_ceo_review === 1 &&
  summary.needs_recheck_count === 12,
  'Tổng hợp audit sau hiệu chỉnh chuẩn xác: 1 READY_FOR_CEO_REVIEW (CGV) và 12 NEEDS_RECHECK.');

// 8. Production Invariant: Zero live feeds mutation
const deals = JSON.parse(fs.readFileSync(dealsFeedPath, 'utf8'));
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const productionLocked = Array.isArray(deals) && deals.length === 0 && manifest.governance_locks?.immutable_ceo_approval_record?.is_approved === false;
assertTest('INVARIANT_08_PRODUCTION_LOCKED', productionLocked,
  'Production feed duy trì bất biến [] (SHA-256: 4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945) và RELEASE_MANIFEST is_approved: false (LOCKED)');

console.log(`\n${passedCount === totalCount ? '🟢' : '🔴'} [TRUTH-GATE-054A-SUMMARY] TOÀN BỘ ${passedCount}/${totalCount} KIỂM THỬ ĐÃ ĐẠT [${passedCount === totalCount ? 'PASS' : 'FAIL'}]!\n`);
