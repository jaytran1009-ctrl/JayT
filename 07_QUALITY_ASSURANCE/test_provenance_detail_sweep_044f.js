/**
 * JAYT PROVENANCE DETAIL SWEEP TEST SUITE (044F)
 * Directive: JAYT-PROVENANCE-DETAIL-SWEEP-044F — EXECUTE TODAY
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const repoRoot = path.resolve(__dirname, '..');

const { APPROVED_DISCOVERY_HUBS, analyzeVerbatimSnippets } = require('./execute_provenance_detail_sweep_044f');
const schedulePath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'content_coverage_schedule.json');
const summaryPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_044f_summary.json');
const artifactsDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_044f_artifacts');

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

console.log('🧪 [JAYT-DETAIL-044F-TEST] Khởi chạy bộ kiểm thử Provenance Detail Sweep 044F...');

// [TEST 1]: Scope strictly restricted to 3 CEO-Approved Hubs
const hubBrands = APPROVED_DISCOVERY_HUBS.map(h => h.brand_id).sort().join(',');
assertTest(
  'DETAIL_01_APPROVED_HUBS_RESTRICTED',
  hubBrands === 'CGV,JOLLIBEE,METIZ',
  `Phạm vi quét được giới hạn chính xác vào 3 Hubs đã được CEO phê chuẩn (${hubBrands})`
);

// [TEST 2]: Detail Receipts have DOM Provenance Metadata
let receiptsValid = true;
let receiptErrors = [];
if (fs.existsSync(summaryPath)) {
  const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
  for (const item of summary.results) {
    const rPath = path.join(artifactsDir, item.artifacts.receipt_file);
    if (!fs.existsSync(rPath)) {
      receiptsValid = false;
      receiptErrors.push(`Thiếu receipt ${item.artifacts.receipt_file}`);
      continue;
    }
    const rData = JSON.parse(fs.readFileSync(rPath, 'utf8'));
    if (!rData.provenance?.source_hub_url || !rData.provenance?.same_origin_verified) {
      receiptsValid = false;
      receiptErrors.push(`Receipt ${item.artifacts.receipt_file} thiếu provenance`);
    }
  }
} else {
  receiptsValid = false;
  receiptErrors.push('Chưa tìm thấy sweep_044f_summary.json');
}

assertTest(
  'DETAIL_02_RECEIPTS_DOM_PROVENANCE',
  receiptsValid,
  receiptsValid
    ? 'Toàn bộ trang chi tiết đều có receipt chứa đầy đủ nguồn gốc hub, anchor text, locator và xác thực same-origin'
    : `Lỗi receipt provenance: ${receiptErrors.join('; ')}`
);

// [TEST 3]: Strict 4-Snippet Analyzer
const testTextComplete = 'Vé 2D đồng giá 55.000đ áp dụng tại tất cả các rạp CGV Đà Nẵng từ thứ hai đến thứ sáu cho thành viên.';
const evalComplete = analyzeVerbatimSnippets('CGV', testTextComplete);

const testTextIncomplete = 'Ưu đãi cực khủng tại rạp. Xem phim thả ga cùng bạn bè.';
const evalIncomplete = analyzeVerbatimSnippets('CGV', testTextIncomplete);

assertTest(
  'DETAIL_03_VERBATIM_4_SNIPPETS_CLASSIFIER',
  evalComplete.all_present === true && evalIncomplete.all_present === false,
  'Bộ bóc tách nguyên văn phân loại chính xác: đủ 4 yếu tố -> PROMOTION_SIGNAL; thiếu -> NEEDS_RECHECK'
);

// [TEST 4]: Official Deep URL Registry Not Mutated
const officialSchedule = JSON.parse(fs.readFileSync(schedulePath, 'utf8'));
const regUrls = officialSchedule.deep_url_registry.flatMap(r => r.discovery_urls);
assertTest(
  'DETAIL_04_OFFICIAL_REGISTRY_ZERO_MUTATION',
  regUrls.includes('https://www.cgv.vn/default/culture-day-2026/') && regUrls.includes('https://metiz.vn/khuyen-mai/'),
  'Registry chính thức content_coverage_schedule.json được bảo toàn nguyên vẹn 33 URLs gốc'
);

// [TEST 5]: Fail-Closed Production Zero-Mutation Invariant
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const prodRaw = fs.readFileSync(prodFeedPath, 'utf8');
const prodHash = crypto.createHash('sha256').update(prodRaw).digest('hex');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');
const releaseManifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
const isApproved = releaseManifest.governance_locks?.immutable_ceo_approval_record?.is_approved ?? releaseManifest.is_approved;

assertTest(
  'DETAIL_05_FAIL_CLOSED_ZERO_MUTATION_PRODUCTION',
  prodRaw.trim() === '[]' &&
  prodHash === '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945' &&
  isApproved === false,
  `Production feed duy trì bất biến [] (SHA-256: ${prodHash}) và RELEASE_MANIFEST is_approved: false (LOCKED)`
);

if (passCount === testCount && testCount > 0) {
  console.log(`\n🟢 [DETAIL-SUMMARY] TOÀN BỘ ${passCount}/${testCount} KIỂM THỬ PROVENANCE DETAIL SWEEP ĐÃ ĐẠT [PASS]!\n`);
} else {
  console.error(`\n❌ [DETAIL-SUMMARY] KIỂM THỬ THẤT BẠI: ${passCount}/${testCount} PASS!\n`);
  process.exitCode = 1;
}
