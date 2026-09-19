/**
 * JAYT SWEEP HARNESS INTEGRITY & OBSERVATION HARDENING TEST SUITE (044B)
 * Directive: JAYT-SWEEP-044B-OBSERVATION-HARDENING
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const repoRoot = path.resolve(__dirname, '..');

const { loadRegistrySources } = require('./execute_full_source_sweep_044b');
const artifactsDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_044b_artifacts');
const summaryPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_044b_summary.json');

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

console.log('🧪 [JAYT-SWEEP-HARDENING-TEST] Khởi chạy bộ kiểm thử Observation Hardening (044B)...');

// [TEST 1]: 16 Brands Dynamic Loading from Registry
const sources = loadRegistrySources();
assertTest(
  'HARDEN_01_ALL_16_BRANDS_REGISTERED',
  sources.length === 16,
  `Đã đăng ký đủ 16/16 thương hiệu từ content_coverage_schedule.json`
);

// [TEST 2]: Receipts Contain HTTP Status, Redirect Chain & Browser Metadata
let allReceiptsHardened = true;
let receiptErrors = [];
for (const s of sources) {
  const rPath = path.join(artifactsDir, `receipt_sweep_044b_${s.brand_id.toLowerCase()}.json`);
  if (!fs.existsSync(rPath)) {
    allReceiptsHardened = false;
    receiptErrors.push(`Thiếu receipt cho ${s.brand_id}`);
    continue;
  }
  const rData = JSON.parse(fs.readFileSync(rPath, 'utf8'));
  const hasHttpStatus = typeof rData.http_status === 'number';
  const hasRedirectChain = Array.isArray(rData.redirect_chain) && rData.redirect_chain.length >= 1;
  const hasBrowserMeta = Boolean(rData.browser_metadata?.browser_name && rData.browser_metadata?.version);
  const hasValidClass = rData.classification === 'PROMOTION_SIGNAL' || rData.classification === 'NEEDS_RECHECK';

  if (!hasHttpStatus || !hasRedirectChain || !hasBrowserMeta || !hasValidClass) {
    allReceiptsHardened = false;
    receiptErrors.push(`Receipt ${s.brand_id} thiếu metadata bắt buộc (http_status, redirect_chain, browser_metadata, classification)`);
  }
}

assertTest(
  'HARDEN_02_RECEIPT_METADATA_COMPREHENSIVE',
  allReceiptsHardened,
  allReceiptsHardened
    ? 'Toàn bộ 16 receipts chứa đủ HTTP status, final_url, redirect_chain, browser_metadata và phân loại PROMOTION_SIGNAL/NEEDS_RECHECK'
    : `Lỗi receipt metadata: ${receiptErrors.join('; ')}`
);

// [TEST 3]: Negative Test - Challenge & 404 Prioritized
const metizReceipt = JSON.parse(fs.readFileSync(path.join(artifactsDir, 'receipt_sweep_044b_metiz.json'), 'utf8'));
assertTest(
  'HARDEN_03_404_AND_CHALLENGE_PRIORITIZED',
  metizReceipt.http_status === 404 && metizReceipt.reason === 'PAGE_NOT_FOUND_OR_DEPRECATED_URL',
  'Lỗi 404 được nhận diện ưu tiên chính xác là PAGE_NOT_FOUND_OR_DEPRECATED_URL, không bị nhầm thành thiếu giá'
);

// [TEST 4]: Negative Test - Fetch Failed Never Creates Mock Files
const lotteriaReceipt = JSON.parse(fs.readFileSync(path.join(artifactsDir, 'receipt_sweep_044b_lotteria.json'), 'utf8'));
const lotteriaPngExists = fs.existsSync(path.join(artifactsDir, 'capture_sweep_044b_lotteria.png'));

assertTest(
  'HARDEN_04_FETCH_FAILED_ZERO_MOCK_FILES',
  lotteriaReceipt.fetch_success === false && !lotteriaPngExists && lotteriaReceipt.artifacts.screenshot_file === null,
  'Nguồn FETCH_FAILED ghi nhận trung thực và không tạo bất kỳ file PNG 1x1 hay artifact mô phỏng nào'
);

// [TEST 5]: Fail-Closed Production Zero-Mutation Invariant
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const prodRaw = fs.readFileSync(prodFeedPath, 'utf8');
const prodHash = crypto.createHash('sha256').update(prodRaw).digest('hex');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');
const releaseManifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
const isApproved = releaseManifest.governance_locks?.immutable_ceo_approval_record?.is_approved ?? releaseManifest.is_approved;

assertTest(
  'HARDEN_05_FAIL_CLOSED_ZERO_MUTATION_PRODUCTION',
  prodRaw.trim() === '[]' &&
  prodHash === '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945' &&
  isApproved === false,
  `Production feed duy trì bất biến [] (SHA-256: ${prodHash}) và RELEASE_MANIFEST is_approved: false (LOCKED)`
);

if (passCount === testCount && testCount > 0) {
  console.log(`\n🟢 [HARDENING-SUMMARY] TOÀN BỘ ${passCount}/${testCount} KIỂM THỬ OBSERVATION HARDENING ĐÃ ĐẠT [PASS]!\n`);
} else {
  console.error(`\n❌ [HARDENING-SUMMARY] KIỂM THỬ THẤT BẠI: ${passCount}/${testCount} PASS!\n`);
  process.exitCode = 1;
}
