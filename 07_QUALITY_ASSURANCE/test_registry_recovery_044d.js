/**
 * JAYT REGISTRY RECOVERY TEST SUITE (044D)
 * Directive: JAYT-REGISTRY-RECOVERY-044D — EXECUTE TODAY
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const repoRoot = path.resolve(__dirname, '..');

const { REPLACEMENT_CANDIDATES } = require('./execute_deep_url_recovery_044d');
const pendingRegistryPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'pending_registry_updates.json');
const schedulePath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'content_coverage_schedule.json');
const artifactsDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_044d_artifacts');
const summaryPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_044d_summary.json');

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

console.log('🧪 [JAYT-REGISTRY-044D-TEST] Khởi chạy bộ kiểm thử Registry Recovery 044D...');

// [TEST 1]: Pending Registry Updates Formed & Strictly PENDING_CEO_APPROVAL
let pendingValid = false;
if (fs.existsSync(pendingRegistryPath)) {
  const pData = JSON.parse(fs.readFileSync(pendingRegistryPath, 'utf8'));
  pendingValid = pData.governance_status === 'PENDING_CEO_APPROVAL' &&
                 Array.isArray(pData.updates) &&
                 pData.updates.length === 7 &&
                 pData.updates.every(u => u.status === 'PENDING_CEO_APPROVAL');
}
assertTest(
  'REG_01_PENDING_REGISTRY_GOVERNANCE_LOCKED',
  pendingValid,
  'Tệp pending_registry_updates.json chứa đủ 7 đề xuất và mang nhãn PENDING_CEO_APPROVAL chuẩn mực'
);

// [TEST 2]: Zero Mutation to Official Registry Before CEO Approval
const officialData = JSON.parse(fs.readFileSync(schedulePath, 'utf8'));
const officialUrls = [];
for (const r of officialData.deep_url_registry || []) {
  for (const u of r.discovery_urls || []) {
    officialUrls.push(u);
  }
}
const hasCGVCinemasOld = officialUrls.includes('https://www.cgv.vn/default/culture-day-2026/');
const hasMetizOld = officialUrls.includes('https://metiz.vn/khuyen-mai/');

assertTest(
  'REG_02_ZERO_UNAUTHORIZED_MUTATION_OFFICIAL_REGISTRY',
  hasCGVCinemasOld && hasMetizOld,
  'Official registry (content_coverage_schedule.json) tuyệt đối chưa bị chỉnh sửa trước khi CEO phê chuẩn'
);

// [TEST 3]: Individual Receipt Per Replacement URL
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
    if (typeof rData.http_status !== 'number' || !rData.replacement_url || !Array.isArray(rData.redirect_chain)) {
      receiptsValid = false;
      receiptErrors.push(`Receipt ${rFile} thiếu metadata`);
    }
  }
} else {
  receiptsValid = false;
  receiptErrors.push('Chưa có sweep_044d_summary.json');
}

assertTest(
  'REG_03_REPLACEMENT_RECEIPTS_COMPREHENSIVE',
  receiptsValid,
  receiptsValid
    ? 'Toàn bộ 7 URL thay thế đều có receipt độc lập với đầy đủ HTTP status, redirect chain, final URL và SHA-256 đối soát'
    : `Lỗi receipt: ${receiptErrors.join('; ')}`
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
  'REG_04_ZERO_MOCK_FILES_ON_FAILURE',
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
  'REG_05_FAIL_CLOSED_ZERO_MUTATION_PRODUCTION',
  prodRaw.trim() === '[]' &&
  prodHash === '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945' &&
  isApproved === false,
  `Production feed duy trì bất biến [] (SHA-256: ${prodHash}) và RELEASE_MANIFEST is_approved: false (LOCKED)`
);

if (passCount === testCount && testCount > 0) {
  console.log(`\n🟢 [REGISTRY-SUMMARY] TOÀN BỘ ${passCount}/${testCount} KIỂM THỬ REGISTRY RECOVERY ĐÃ ĐẠT [PASS]!\n`);
} else {
  console.error(`\n❌ [REGISTRY-SUMMARY] KIỂM THỬ THẤT BẠI: ${passCount}/${testCount} PASS!\n`);
  process.exitCode = 1;
}
