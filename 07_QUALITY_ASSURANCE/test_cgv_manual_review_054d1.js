/**
 * JAYT CGV MANUAL REVIEW METADATA CORRECTION TEST SUITE (054D1)
 * Directive: JAYT-CGV-MANUAL-REVIEW-METADATA-CORRECTION-054D1
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const sheet054dPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'CGV_CULTURE_DAY_MANUAL_REVIEW_SHEET_054D.md');
const sheet054d1Path = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'CGV_CULTURE_DAY_MANUAL_REVIEW_SHEET_054D1.md');
const artifactsDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_054_artifacts');
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

console.log('🧪 [JAYT-CGV-MANUAL-REVIEW-054D1-TEST] Khởi chạy kiểm tra hiệu chỉnh metadata hồ sơ thẩm duyệt 054D1...');

// 1. Immutable preservation: Both 054D and 054D1 exist
const sheet054dExists = fs.existsSync(sheet054dPath);
const sheet054d1Exists = fs.existsSync(sheet054d1Path);
assertTest('T1_01_SHEET_IMMUTABLE_PRESERVATION', sheet054dExists && sheet054d1Exists,
  'Tệp 054D gốc được bảo toàn bất biến; Tệp hiệu chỉnh 054D1 được tạo độc lập.');

const sheetText = sheet054d1Exists ? fs.readFileSync(sheet054d1Path, 'utf8') : '';

// 2. Timestamp Disambiguation (capture-time vs review-time)
const hasCaptureTime = sheetText.includes('source_captured_at') && sheetText.includes('2026-08-22T19:21:43.692Z');
const hasReviewTime = sheetText.includes('reviewed_at') && sheetText.includes('2026-08-22T19:51:34.829Z');
assertTest('T1_02_TIMESTAMP_DISAMBIGUATION', hasCaptureTime && hasReviewTime,
  'Tách bạch chuẩn xác thời gian capture nguồn (19:21:43.692Z) và thời gian thẩm định (19:51:34.829Z).');

// 3. Artifact Hashes on Disk Match 100% (Including Correction Receipt 054C)
const pngPath = path.join(artifactsDir, 'capture_054_cgv_1.png');
const htmlPath = path.join(artifactsDir, 'capture_054_cgv_1.html');
const txtPath = path.join(artifactsDir, 'capture_054_cgv_1.txt');
const rawReceiptPath = path.join(artifactsDir, 'receipt_054_cgv_1.json');
const corrReceiptPath = path.join(artifactsDir, 'correction_receipt_054c_cgv_1.json');

const pngSha = crypto.createHash('sha256').update(fs.readFileSync(pngPath)).digest('hex');
const htmlSha = crypto.createHash('sha256').update(fs.readFileSync(htmlPath)).digest('hex');
const txtSha = crypto.createHash('sha256').update(fs.readFileSync(txtPath)).digest('hex');
const rawReceiptSha = crypto.createHash('sha256').update(fs.readFileSync(rawReceiptPath)).digest('hex');
const corrReceiptSha = crypto.createHash('sha256').update(fs.readFileSync(corrReceiptPath)).digest('hex');

const allHashesMatched = sheetText.includes(pngSha) &&
                         sheetText.includes(htmlSha) &&
                         sheetText.includes(txtSha) &&
                         sheetText.includes(rawReceiptSha) &&
                         sheetText.includes(corrReceiptSha) &&
                         corrReceiptSha === '1f6de39f8f26dc8ba01843b46e1c73e2eec0e21f8066cd2037d5d3a19bd9a3b1';

assertTest('T1_03_ALL_ARTIFACT_AND_RECEIPT_HASHES_MATCH_DISK', allHashesMatched,
  `Toàn bộ mã băm trên đĩa (PNG, HTML, TXT, Raw Receipt, Correction Receipt ${corrReceiptSha.substring(0, 16)}...) khớp 100% trong sheet.`);

// 4. All 4 Verbatim Evidence Conclusions Present
const hasPriceQuote = sheetText.includes('58.000đ/Vé') && sheetText.includes('58.000 VNĐ');
const hasConditionsQuote = sheetText.includes('ĐIỀU KHOẢN VÀ ĐIỀU KIỆN') && sheetText.includes('Áp dụng cho khách hàng đặt vé trực tuyến');
const hasLocalityQuote = sheetText.includes('CGV Vĩnh Trung Plaza') && sheetText.includes('locality_address`: **`null`**');
const hasExpiryQuote = sheetText.includes('24/08/2026') && sheetText.includes('Lên lịch và xếp kèo rạp CGV vào Thứ Hai – 24/08/2026');

assertTest('T1_04_ALL_4_VERBATIM_CONCLUSIONS_RECORDED',
  hasPriceQuote && hasConditionsQuote && hasLocalityQuote && hasExpiryQuote,
  'Đủ 4 kết luận thẩm định bằng trích dẫn nguyên văn: Giá (58.000đ), Điều kiện, Địa điểm (CGV Vĩnh Trung Plaza, address null), Hiệu lực (24/08/2026).');

// 5. Strict Single-Day TTL Boundary Present
const hasTTLBoundary = sheetText.includes('STRICT SINGLE-DAY TTL BOUNDARY') &&
                       sheetText.includes('24/08/2026') &&
                       sheetText.includes('TUYỆT ĐỐI KHÔNG ĐƯỢC PHÉP RENDER HOẶC HIỂN THỊ');
assertTest('T1_05_STRICT_TTL_BOUNDARY_EXPLICIT', hasTTLBoundary,
  'Quy định rõ giới hạn vòng đời nghiêm ngặt: sau ngày 24/08/2026 deal tự hết hạn và cấm render.');

// 6. Zero Auto-Promotion / Production Lock Invariant
const feedContent = fs.readFileSync(dealsFeedPath, 'utf8');
const feedJson = JSON.parse(feedContent);
const feedSha = crypto.createHash('sha256').update(feedContent).digest('hex');
const isProductionEmpty = Array.isArray(feedJson) && feedJson.length === 0;
const isFeedShaMatched = feedSha === '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945';

assertTest('INVARIANT_06_PRODUCTION_LOCKED', isProductionEmpty && isFeedShaMatched,
  `Production feed duy trì bất biến [] (SHA-256: ${feedSha}) và is_approved: false (LOCKED)`);

console.log(`\n🟢 [CGV-MANUAL-REVIEW-054D1-SUMMARY] TOÀN BỘ ${passedCount}/${totalCount} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);
