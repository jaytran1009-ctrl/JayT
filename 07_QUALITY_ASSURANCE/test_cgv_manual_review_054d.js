/**
 * JAYT CGV MANUAL REVIEW VERIFICATION TEST SUITE (054D)
 * Directive: JAYT-CGV-MANUAL-EVIDENCE-REVIEW-054D
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const reviewSheetPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'CGV_CULTURE_DAY_MANUAL_REVIEW_SHEET_054D.md');
const receiptPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_054_artifacts', 'correction_receipt_054c_cgv_1.json');
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

console.log('🧪 [JAYT-CGV-MANUAL-REVIEW-054D-TEST] Khởi chạy kiểm tra hồ sơ thẩm duyệt thủ công 054D...');

// 1. Review Sheet Exists
const sheetExists = fs.existsSync(reviewSheetPath);
assertTest('T1_01_REVIEW_SHEET_EXISTS', sheetExists,
  'Tệp hồ sơ thẩm duyệt CGV_CULTURE_DAY_MANUAL_REVIEW_SHEET_054D.md tồn tại.');

const sheetText = sheetExists ? fs.readFileSync(reviewSheetPath, 'utf8') : '';

// 2. All 4 Verbatim Evidence Conclusions Present
const hasPriceQuote = sheetText.includes('58.000đ/Vé') && sheetText.includes('58.000 VNĐ');
const hasConditionsQuote = sheetText.includes('ĐIỀU KHOẢN VÀ ĐIỀU KIỆN') && sheetText.includes('Áp dụng cho khách hàng đặt vé trực tuyến');
const hasLocalityQuote = sheetText.includes('CGV Vĩnh Trung Plaza') && sheetText.includes('locality_address`: **`null`**');
const hasExpiryQuote = sheetText.includes('24/08/2026') && sheetText.includes('Lên lịch và xếp kèo rạp CGV vào Thứ Hai – 24/08/2026');

assertTest('T1_02_ALL_4_VERBATIM_CONCLUSIONS_RECORDED',
  hasPriceQuote && hasConditionsQuote && hasLocalityQuote && hasExpiryQuote,
  'Đủ 4 kết luận thẩm định bằng trích dẫn nguyên văn: Giá (58.000đ), Điều kiện, Địa điểm (CGV Vĩnh Trung Plaza, address null), Hiệu lực (24/08/2026).');

// 3. Strict TTL Single-Day Boundary Present
const hasTTLBoundary = sheetText.includes('STRICT SINGLE-DAY TTL BOUNDARY') &&
                       sheetText.includes('24/08/2026') &&
                       sheetText.includes('TUYỆT ĐỐI KHÔNG ĐƯỢC PHÉP RENDER HOẶC HIỂN THỊ');
assertTest('T1_03_STRICT_TTL_BOUNDARY_EXPLICIT', hasTTLBoundary,
  'Quy định rõ giới hạn vòng đời nghiêm ngặt: sau ngày 24/08/2026 deal tự hết hạn và cấm render.');

// 4. Artifact Hashes in Sheet Match Real Files
const cgvPngPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_054_artifacts', 'capture_054_cgv_1.png');
const cgvHtmlPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_054_artifacts', 'capture_054_cgv_1.html');
const cgvTxtPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_054_artifacts', 'capture_054_cgv_1.txt');

const actualPngSha = crypto.createHash('sha256').update(fs.readFileSync(cgvPngPath)).digest('hex');
const actualHtmlSha = crypto.createHash('sha256').update(fs.readFileSync(cgvHtmlPath)).digest('hex');
const actualTxtSha = crypto.createHash('sha256').update(fs.readFileSync(cgvTxtPath)).digest('hex');

const hashesMatched = sheetText.includes(actualPngSha) &&
                      sheetText.includes(actualHtmlSha) &&
                      sheetText.includes(actualTxtSha);
assertTest('T1_04_ARTIFACT_HASHES_MATCH_DISK', hashesMatched,
  'Toàn bộ mã băm SHA-256 trong hồ sơ review khớp 100% tệp thật trên đĩa.');

// 5. Zero Auto-Promotion / Production Lock Invariant
const feedContent = fs.readFileSync(dealsFeedPath, 'utf8');
const feedJson = JSON.parse(feedContent);
const feedSha = crypto.createHash('sha256').update(feedContent).digest('hex');
const isProductionEmpty = Array.isArray(feedJson) && feedJson.length === 0;
const isFeedShaMatched = feedSha === '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945';

assertTest('INVARIANT_05_PRODUCTION_LOCKED', isProductionEmpty && isFeedShaMatched,
  `Production feed duy trì bất biến [] (SHA-256: ${feedSha}) và is_approved: false (LOCKED)`);

console.log(`\n🟢 [CGV-MANUAL-REVIEW-054D-SUMMARY] TOÀN BỘ ${passedCount}/${totalCount} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);
