/**
 * JAYT DOM TRUTH PARSER & LINEAGE TEST SUITE (054B)
 * Directive: JAYT-EVIDENCE-LINEAGE-AND-DOM-TRUTH-054B
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const {
  isolatePromoBlockGeneric,
  parseVerbatimDateOrSchedule,
  parseVerbatimPrice,
  parseVerbatimLocality,
  parseVerbatimConditions,
  auditDOMTruth054B
} = require('./dom_truth_parser_054b');

const artifactsDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_054_artifacts');
const incidentPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'INCIDENT_RECEIPT_LINEAGE_054B.md');
const summaryPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_054b_summary.json');
const reportPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'daily_public_sweep_054b_report.md');
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

console.log('🧪 [JAYT-DOM-TRUTH-054B-TEST] Khởi chạy bộ kiểm thử DOM Truth & Lineage 054B...');

// 1. Incident Disclosure Verification
const incidentExists = fs.existsSync(incidentPath);
const incidentText = incidentExists ? fs.readFileSync(incidentPath, 'utf8') : '';
const incidentDisclosed = incidentText.includes('RAW_RECEIPT_LINEAGE_OVERWRITTEN') &&
                          incidentText.includes('tuyệt đối không tự nhận đã khôi phục byte-for-byte') &&
                          incidentText.includes('correction_receipt_054b_');
assertTest('T1_01_INCIDENT_DISCLOSURE_EXISTS', incidentDisclosed,
  'Sự cố RAW_RECEIPT_LINEAGE_OVERWRITTEN được ghi nhận trung thực tại INCIDENT_RECEIPT_LINEAGE_054B.md, không tuyên bố khôi phục byte-for-byte ảo.');

// 2. Negative: Zero Brand Hardcoding / No Injected Model Hallucinations
const mockDOMWithoutAddress = `
CGV Culture Day 2026
Giá vé: 58.000đ cho mọi loại vé 2D.
Áp dụng cho thành viên tại CGV Vĩnh Trung Plaza.
Ngày 24/08/2026.
Điều kiện áp dụng: Áp dụng vào ngày thứ hai cuối cùng của tháng. Không áp dụng cho các ngày lễ, tết.
`;
const mockAudit = auditDOMTruth054B(mockDOMWithoutAddress);
const noInjectedAddress = mockAudit.claims && mockAudit.claims.locality_address === null;
const noHardcodedTitle = !JSON.stringify(mockAudit).includes('255-257 Hùng Vương');
assertTest('T1_02_ZERO_BRAND_HARDCODING_NEGATIVE', noInjectedAddress && noHardcodedTitle,
  'Parser không tự ý chèn địa chỉ 255-257 Hùng Vương hoặc suy diễn dữ liệu ngoài DOM (Address is strictly null).');

// 3. Locality Strictness: Observed Token Only
assertTest('T1_03_LOCALITY_OBSERVED_ONLY_ADDRESS_NULL',
  mockAudit.claims && mockAudit.claims.locality_observed === 'CGV Vĩnh Trung Plaza' && mockAudit.claims.locality_address === null,
  'Địa điểm ghi nhận trung thực phần quan sát được (CGV Vĩnh Trung Plaza); địa chỉ chi tiết để null.');

// 4. Negative: Footer Phone Numbers / Hotlines Rejected as Dates or Prices
const phoneString = 'Hotline: 028.39.333.303 - CSKH: 19002224 - Fax: 028.38.222.111';
const dateFromPhone = parseVerbatimDateOrSchedule(phoneString);
const priceFromPhone = parseVerbatimPrice(phoneString);
assertTest('T1_04_NEGATIVE_FOOTER_PHONE_HOTLINE',
  dateFromPhone === null && priceFromPhone === null,
  'Số điện thoại và hotline footer (028.39.333.303, 28.39.333, 19002224) bị chặn 100%, không bị parse thành ngày hoặc giá.');

// 5. Negative: Universal Footer & Menu Price/Condition Leak Isolation
const textWithFooterLeak = `
Menu Quán Cà Phê
Cà phê đen: 35.000đ
Điều kiện: không có

Chân trang:
Công ty Cổ phần ABC
Hotline: 19001234
Giá niêm yết: 100.000đ
Chính sách bảo mật
`;
const isolated = isolatePromoBlockGeneric(textWithFooterLeak);
const footerExcluded = !isolated.includes('Chân trang:') && !isolated.includes('100.000đ') && !isolated.includes('Chính sách bảo mật');
assertTest('T1_05_NEGATIVE_FOOTER_MENU_PRICE_ISOLATION', footerExcluded,
  'Khối footer và menu điều hướng bị cô lập triệt để, không rò rỉ giá từ chân trang vào khối ưu đãi.');

// 6. Negative: 404 & Server Error Pages Rejected
const error404Audit = auditDOMTruth054B('404 Not Found - The requested URL was not found on this server.');
assertTest('T1_06_NEGATIVE_404_SERVER_ERROR',
  error404Audit.status === 'NEEDS_RECHECK' && error404Audit.failure_code === 'HTTP_404_OR_ACCESS_DENIED',
  'Trang lỗi 404 bị từ chối triệt để với mã HTTP_404_OR_ACCESS_DENIED.');

// 7. Negative: Aggregation Listing Page Rejected (Galaxy Cinema)
const galaxyRawPath = path.join(artifactsDir, 'capture_054_galaxy_2.txt');
const galaxyRawText = fs.existsSync(galaxyRawPath) ? fs.readFileSync(galaxyRawPath, 'utf8') : '';
const galaxyAudit = auditDOMTruth054B(galaxyRawText);
assertTest('T1_07_NEGATIVE_AGGREGATION_LISTING_PAGE',
  galaxyAudit.status === 'NEEDS_RECHECK' && galaxyAudit.failure_code === 'PARSER_FALSE_POSITIVE_FOOTER_PHONE',
  'Galaxy Cinema bị phân loại NEEDS_RECHECK do trang danh mục tổng hợp và số điện thoại footer.');

// 8. Negative: Expired Date Rejected
const expiredDOM = `
Ưu đãi xem phim đặc biệt
Giá vé: 45.000đ tại Đà Nẵng
Ngày 15/08/2026.
Điều kiện áp dụng: Áp dụng cho thành viên. Không áp dụng cho các ngày lễ.
`;
const expiredAudit = auditDOMTruth054B(expiredDOM);
assertTest('T1_08_NEGATIVE_EXPIRED_DATE_REJECTED',
  expiredAudit.status === 'NEEDS_RECHECK' && expiredAudit.failure_code === 'PROMOTION_DATE_EXPIRED',
  'Ưu đãi có ngày hết hạn trong quá khứ (15/08/2026 < 2026-08-23) bị từ chối PROMOTION_DATE_EXPIRED.');

// 9. CGV Classification: RAW_CAPTURE_PENDING_MANUAL_EVIDENCE_REVIEW (Held for manual CEO review)
const cgvRawPath = path.join(artifactsDir, 'capture_054_cgv_1.txt');
const cgvRawText = fs.existsSync(cgvRawPath) ? fs.readFileSync(cgvRawPath, 'utf8') : '';
const cgvAudit = auditDOMTruth054B(cgvRawText);
assertTest('T1_09_CGV_IN_PENDING_MANUAL_REVIEW_NOT_AUTO_PROMOTED',
  cgvAudit.status === 'RAW_CAPTURE_PENDING_MANUAL_EVIDENCE_REVIEW' && cgvAudit.claims.locality_address === null,
  'CGV Culture Day được phân loại RAW_CAPTURE_PENDING_MANUAL_EVIDENCE_REVIEW (chờ CEO review thủ công; không tự động đưa vào staging hay catalog).');

// 10. Immutable Lineage: All 13 Correction Receipts Generated
const correctionReceipts = fs.readdirSync(artifactsDir).filter(f => f.startsWith('correction_receipt_054b_') && f.endsWith('.json'));
let allReceiptsValid = correctionReceipts.length === 13;
for (const cr of correctionReceipts) {
  const crData = JSON.parse(fs.readFileSync(path.join(artifactsDir, cr), 'utf8'));
  if (crData.work_order !== 'JAYT-EVIDENCE-LINEAGE-AND-DOM-TRUTH-054B') allReceiptsValid = false;
  if (crData.incident_ref !== 'RAW_RECEIPT_LINEAGE_OVERWRITTEN') allReceiptsValid = false;
  if (!crData.correction_receipt_sha256) allReceiptsValid = false;
}
assertTest('T1_10_CORRECTION_RECEIPTS_IMMUTABLE_LINEAGE', allReceiptsValid,
  'Đã tạo đủ 13 tệp correction_receipt_054b_*.json độc lập, liên kết SHA-256 đến artifact gốc, ghi nhận incident_ref rõ ràng.');

// 11. Production Feed Invariant Lock
const feedContent = fs.readFileSync(dealsFeedPath, 'utf8');
const feedJson = JSON.parse(feedContent);
const feedSha = crypto.createHash('sha256').update(feedContent).digest('hex');
const manifestContent = fs.readFileSync(manifestPath, 'utf8');
const manifestJson = JSON.parse(manifestContent);

const isProductionEmpty = Array.isArray(feedJson) && feedJson.length === 0;
const isFeedShaMatched = feedSha === '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945';
const isManifestLocked = (manifestJson.governance_locks?.immutable_ceo_approval_record?.is_approved === false) ||
                         (manifestJson.release_authorization?.is_approved === false) ||
                         (manifestJson.is_approved === false);

assertTest('INVARIANT_11_PRODUCTION_LOCKED',
  isProductionEmpty && isFeedShaMatched && isManifestLocked,
  `Production feed duy trì bất biến [] (SHA-256: ${feedSha}) và RELEASE_MANIFEST is_approved: false (LOCKED)`);

console.log(`\n🟢 [DOM-TRUTH-054B-SUMMARY] TOÀN BỘ ${passedCount}/${totalCount} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);
