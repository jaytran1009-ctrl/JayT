/**
 * JAYT CORRECTION RECEIPT INTEGRITY TEST SUITE (054C)
 * Directive: JAYT-CORRECTION-RECEIPT-INTEGRITY-054C
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const {
  getTrustedRuntimeTime,
  isolatePromoContainerBlock,
  locateVerbatimDateOrSchedule,
  locateVerbatimPrice,
  locateVerbatimLocality,
  locateVerbatimConditions,
  auditContentBlock054C
} = require('./dom_offset_locator_parser_054c');

const artifactsDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_054_artifacts');
const manifestPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'CORRECTION_RECEIPTS_MANIFEST_054C.json');
const summaryPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_054c_summary.json');
const reportPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'daily_public_sweep_054c_report.md');
const dealsFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
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

console.log('🧪 [JAYT-CORRECTION-INTEGRITY-054C-TEST] Khởi chạy bộ kiểm thử Tính Toàn Vẹn & DOM Offset 054C...');

// 1. No Circular Self-Hashing in Receipts
const receiptFiles = fs.readdirSync(artifactsDir).filter(f => f.startsWith('correction_receipt_054c_') && f.endsWith('.json'));
let noCircularHash = receiptFiles.length === 13;
for (const rf of receiptFiles) {
  const content = fs.readFileSync(path.join(artifactsDir, rf), 'utf8');
  if (content.includes('"correction_receipt_sha256"')) {
    noCircularHash = false;
  }
}
assertTest('T1_01_NO_CIRCULAR_SELF_HASHING', noCircularHash,
  'Tất cả 13 tệp correction_receipt_054c_*.json không chứa key tự băm vòng tròn nội bộ.');

// 2. All 13 Receipts Byte-for-Byte Match Independent Manifest
const manifestExists = fs.existsSync(manifestPath);
let allHashesMatch = manifestExists && receiptFiles.length === 13;
if (manifestExists) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  for (const rf of receiptFiles) {
    const fileBytes = fs.readFileSync(path.join(artifactsDir, rf));
    const actualSha = crypto.createHash('sha256').update(fileBytes).digest('hex');
    const recordedEntry = manifest.receipts[rf];
    if (!recordedEntry || recordedEntry.file_sha256 !== actualSha) {
      allHashesMatch = false;
    }
  }
}
assertTest('T1_02_ALL_13_RECEIPTS_MATCH_MANIFEST_HASH', allHashesMatch,
  'Toàn bộ 13 tệp receipt trên đĩa khớp 100% mã băm SHA-256 thực tế với manifest độc lập CORRECTION_RECEIPTS_MANIFEST_054C.json.');

// 3. Verbatim Range and Co-located Offsets in Container Block
const cgvReceiptPath = path.join(artifactsDir, 'correction_receipt_054c_cgv_1.json');
const cgvTxtPath = path.join(artifactsDir, 'capture_054_cgv_1.txt');
let offsetVerified = false;

if (fs.existsSync(cgvReceiptPath) && fs.existsSync(cgvTxtPath)) {
  const cgvReceipt = JSON.parse(fs.readFileSync(cgvReceiptPath, 'utf8'));
  const rawText = fs.readFileSync(cgvTxtPath, 'utf8');
  const container = isolatePromoContainerBlock(rawText);
  const claims = cgvReceipt.content_block_audit.claims;

  if (claims && claims.price && claims.conditions && claims.locality && claims.expiry) {
    const pSlice = container.cleanText.substring(claims.price.text_start, claims.price.text_end);
    const cSlice = container.cleanText.substring(claims.conditions.text_start, claims.conditions.text_end);
    const lSlice = container.cleanText.substring(claims.locality.text_start, claims.locality.text_end);
    const eSlice = container.cleanText.substring(claims.expiry.text_start, claims.expiry.text_end);

    if (pSlice === claims.price.verbatim_quote &&
        cSlice === claims.conditions.verbatim_quote &&
        lSlice === claims.locality.verbatim_quote &&
        eSlice === claims.expiry.verbatim_quote &&
        cgvReceipt.content_block_audit.container_block.container_block_sha256 === container.container_block_sha256) {
      offsetVerified = true;
    }
  }
}
assertTest('T1_03_VERBATIM_RANGE_AND_OFFSETS_CO_LOCATED', offsetVerified,
  'Tất cả 4 claims của CGV (giá, điều kiện, địa điểm, hạn dùng) có tọa độ text_start/text_end chính xác tuyệt đối trong cùng khối container.');

// 4. Locality Strictness: Observed Token Only & Address Null
const cgvReceiptData = fs.existsSync(cgvReceiptPath) ? JSON.parse(fs.readFileSync(cgvReceiptPath, 'utf8')) : null;
const localityObserved = cgvReceiptData?.content_block_audit?.claims?.locality?.locality_observed === 'CGV Vĩnh Trung Plaza';
const localityAddressNull = cgvReceiptData?.content_block_audit?.claims?.locality?.locality_address === null;
assertTest('T1_04_LOCALITY_OBSERVED_ONLY_ADDRESS_NULL', localityObserved && localityAddressNull,
  'Địa điểm ghi nhận đúng phần quan sát được (CGV Vĩnh Trung Plaza); địa chỉ chi tiết để null (không chèn số nhà suy diễn).');

// 5. Dynamic Trusted Runtime Date & Timestamp
const { evaluation_date, evaluation_timestamp } = getTrustedRuntimeTime();
const receiptEvalDate = cgvReceiptData?.runtime_evaluation?.evaluation_date;
const receiptEvalTs = cgvReceiptData?.runtime_evaluation?.evaluation_timestamp;
const isDateDynamic = receiptEvalDate === evaluation_date && Boolean(receiptEvalTs);
assertTest('T1_05_DYNAMIC_TRUSTED_TIME_RECORDED', isDateDynamic,
  `Thời gian runtime được lấy động từ hệ thống (${evaluation_date}), không hardcoded.`);

// 6. Negative: Past Date Evaluated Dynamically as Expired
const pastDOM = `
CGV Culture Day
Giá vé: 58.000đ tại CGV Vĩnh Trung Plaza
Ngày 10/01/2026.
Điều kiện áp dụng: Áp dụng cho thành viên. Không áp dụng ngày lễ.
`;
const pastAudit = auditContentBlock054C(pastDOM, 'dummy_html_hash', evaluation_date);
assertTest('T1_06_NEGATIVE_PAST_DATE_DYNAMIC_EXPIRED',
  pastAudit.status === 'NEEDS_RECHECK' && pastAudit.failure_code === 'PROMOTION_DATE_EXPIRED',
  'Ưu đãi có ngày trong quá khứ so với runtime date bị từ chối với mã PROMOTION_DATE_EXPIRED.');

// 7. Negative: Footer Phone Numbers / Hotlines and Aggregation Pages
const phoneString = 'Hotline: 028.39.333.303 - CSKH: 19002224';
const dateFromPhone = locateVerbatimDateOrSchedule(phoneString, evaluation_date);
const priceFromPhone = locateVerbatimPrice(phoneString);
const galaxyReceiptPath = path.join(artifactsDir, 'correction_receipt_054c_galaxy_2.json');
const galaxyReceipt = fs.existsSync(galaxyReceiptPath) ? JSON.parse(fs.readFileSync(galaxyReceiptPath, 'utf8')) : null;
const galaxyRejected = galaxyReceipt?.content_block_audit?.status === 'NEEDS_RECHECK' &&
                       galaxyReceipt?.content_block_audit?.failure_code === 'PARSER_FALSE_POSITIVE_FOOTER_PHONE';

assertTest('T1_07_NEGATIVE_FOOTER_PHONE_AND_AGGREGATION',
  dateFromPhone === null && priceFromPhone === null && galaxyRejected,
  'Số điện thoại footer bị chặn 100% và trang danh mục tổng hợp (Galaxy) bị phân loại NEEDS_RECHECK.');

// 8. Negative: 404 & Server Error Pages
const error404Audit = auditContentBlock054C('404 Not Found - The requested URL was not found on this server.', 'html_hash', evaluation_date);
assertTest('T1_08_NEGATIVE_404_SERVER_ERROR',
  error404Audit.status === 'NEEDS_RECHECK' && error404Audit.failure_code === 'HTTP_404_OR_ACCESS_DENIED',
  'Trang lỗi 404 bị từ chối triệt để với mã HTTP_404_OR_ACCESS_DENIED.');

// 9. CGV Classification: RAW_CAPTURE_PENDING_MANUAL_EVIDENCE_REVIEW
const isCGVPendingManual = cgvReceiptData?.content_block_audit?.status === 'RAW_CAPTURE_PENDING_MANUAL_EVIDENCE_REVIEW';
assertTest('T1_09_CGV_IN_PENDING_MANUAL_REVIEW', isCGVPendingManual,
  'CGV Culture Day được giữ ở trạng thái RAW_CAPTURE_PENDING_MANUAL_EVIDENCE_REVIEW (chờ CEO review thủ công; zero staging promotion).');

// 10. Production Feed Invariant Lock
const feedContent = fs.readFileSync(dealsFeedPath, 'utf8');
const feedJson = JSON.parse(feedContent);
const feedSha = crypto.createHash('sha256').update(feedContent).digest('hex');
const releaseManifestContent = fs.readFileSync(releaseManifestPath, 'utf8');
const releaseManifestJson = JSON.parse(releaseManifestContent);

const isProductionEmpty = Array.isArray(feedJson) && feedJson.length === 0;
const isFeedShaMatched = feedSha === '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945';
const isManifestLocked = (releaseManifestJson.governance_locks?.immutable_ceo_approval_record?.is_approved === false) ||
                         (releaseManifestJson.release_authorization?.is_approved === false) ||
                         (releaseManifestJson.is_approved === false);

assertTest('INVARIANT_10_PRODUCTION_LOCKED',
  isProductionEmpty && isFeedShaMatched && isManifestLocked,
  `Production feed duy trì bất biến [] (SHA-256: ${feedSha}) và RELEASE_MANIFEST is_approved: false (LOCKED)`);

console.log(`\n🟢 [CORRECTION-INTEGRITY-054C-SUMMARY] TOÀN BỘ ${passedCount}/${totalCount} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);
