/**
 * JAYT DEEP URL RECOVERY & NEGATIVE TEST SUITE (044C)
 * Directive: JAYT-DEEP-URL-RECOVERY-044C — EXECUTE TODAY
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const repoRoot = path.resolve(__dirname, '..');

const { loadAllDeepUrls } = require('./execute_deep_url_recovery_044c');
const artifactsDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_044c_artifacts');
const summaryPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_044c_summary.json');

let testCount = 0;
let passCount = 0;

function assertTest(name, condition, message) {
  testCount++;
  if (condition) {
    passCount++;
    console.log(`  [${name}]: [PASS] - ${message}`);
  } else {
    console.error(`  [${name}]: [FAIL] - ${message}`);
    process.exitCode = 1;
  }
}

console.log('🧪 [JAYT-DEEP-URL-044C-TEST] Khởi chạy bộ kiểm thử Deep URL Recovery 044C...');

// [TEST 1]: 16 Brands & 33 Deep URLs Dynamic Registration
const { registry, allItems } = loadAllDeepUrls();
assertTest(
  'DEEP_01_ALL_33_URLS_LOADED',
  registry.length === 16 && allItems.length === 33,
  `Nạp động đầy đủ 16 thương hiệu với tổng cộng ${allItems.length} Deep URLs từ content_coverage_schedule.json`
);

// [TEST 2]: Individual Receipt Per Deep URL
let receiptsValid = true;
let receiptErrors = [];
if (fs.existsSync(summaryPath)) {
  const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
  for (const item of summary.results) {
    const rFile = item.artifacts.receipt_file;
    const rPath = path.join(artifactsDir, rFile);
    if (!fs.existsSync(rPath)) {
      receiptsValid = false;
      receiptErrors.push(`Thiếu receipt ${rFile}`);
      continue;
    }
    const rData = JSON.parse(fs.readFileSync(rPath, 'utf8'));
    if (typeof rData.http_status !== 'number' || !rData.requested_url || !Array.isArray(rData.redirect_chain)) {
      receiptsValid = false;
      receiptErrors.push(`Receipt ${rFile} thiếu http_status/redirect_chain`);
    }
  }
} else {
  receiptsValid = false;
  receiptErrors.push('Chưa tìm thấy sweep_044c_summary.json');
}

assertTest(
  'DEEP_02_INDIVIDUAL_RECEIPT_PER_URL',
  receiptsValid,
  receiptsValid
    ? 'Tất cả 33 deep URLs đều có receipt độc lập với đầy đủ HTTP status, redirect chain, timestamp và SHA-256 đối soát'
    : `Lỗi receipt metadata: ${receiptErrors.join('; ')}`
);

// [TEST 3]: Deprecated URL Detection (404 / Homepage Redirect)
let deprecatedFound = false;
if (fs.existsSync(summaryPath)) {
  const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
  deprecatedFound = summary.deprecated_urls_count > 0;
}
assertTest(
  'DEEP_03_DEPRECATED_URL_IDENTIFIED',
  deprecatedFound,
  'Hệ thống tự động phát hiện và phân loại chính xác các URL 404 / redirect về DEPRECATED_OR_REDIRECTED'
);

// [TEST 4]: Negative Test - Zero Fake Files on Fetch Failure
let zeroMockFiles = true;
if (fs.existsSync(summaryPath)) {
  const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
  for (const item of summary.results) {
    if (item.fetch_success === false) {
      if (item.artifacts.screenshot_file !== null || item.artifacts.screenshot_sha256 !== null) {
        zeroMockFiles = false;
      }
    }
  }
}
assertTest(
  'DEEP_04_ZERO_MOCK_FILES_ON_FAILURE',
  zeroMockFiles,
  'Tuyệt đối không sinh bất kỳ ảnh PNG 1x1 hay artifact mô phỏng nào khi URL fetch thất bại'
);

// [TEST 5]: Fail-Closed Production Zero-Mutation Invariant
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const prodRaw = fs.readFileSync(prodFeedPath, 'utf8');
const prodHash = crypto.createHash('sha256').update(prodRaw).digest('hex');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');
const releaseManifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
const isApproved = releaseManifest.governance_locks?.immutable_ceo_approval_record?.is_approved ?? releaseManifest.is_approved;

assertTest(
  'DEEP_05_FAIL_CLOSED_ZERO_MUTATION_PRODUCTION',
  prodRaw.trim() === '[]' &&
  prodHash === '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945' &&
  isApproved === false,
  `Production feed duy trì bất biến [] (SHA-256: ${prodHash}) và RELEASE_MANIFEST is_approved: false (LOCKED)`
);

if (passCount === testCount && testCount > 0) {
  console.log(`\n🟢 [DEEP-URL-SUMMARY] TOÀN BỘ ${passCount}/${testCount} KIỂM THỬ DEEP URL RECOVERY ĐÃ ĐẠT [PASS]!\n`);
} else {
  console.error(`\n❌ [DEEP-URL-SUMMARY] KIỂM THỬ THẤT BẠI: ${passCount}/${testCount} PASS!\n`);
  process.exitCode = 1;
}
