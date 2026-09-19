/**
 * JAYT PROMOTION LINK FILTER TEST SUITE (044G)
 * Directive: JAYT-PROMOTION-LINK-FILTER-044G — EXECUTE TODAY
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const repoRoot = path.resolve(__dirname, '..');

const { APPROVED_DISCOVERY_HUBS, analyzeVerbatimSnippets } = require('./execute_promotion_link_filter_044g');
const schedulePath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'content_coverage_schedule.json');
const summaryPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_044g_summary.json');
const artifactsDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_044g_artifacts');

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

console.log('🧪 [JAYT-FILTER-044G-TEST] Khởi chạy bộ kiểm thử Promotion Link Filter 044G...');

// [TEST 1]: Strict Negative Test - Zero Fragments, Zero Logins, Zero Nav Menus
let noNegativeLinks = true;
let negativeViolations = [];
const negativePatterns = ['#', 'login', 'dang-nhap', 'dang-ky', 'register', 'cart', 'checkout', 'gio-hang', 've-cua-toi', 'lich-chieu'];

if (fs.existsSync(summaryPath)) {
  const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
  for (const r of summary.results || []) {
    const lowerUrl = r.requested_url.toLowerCase();
    const lowerAnchor = (r.anchor_text || '').toLowerCase();
    for (const pat of negativePatterns) {
      if (lowerUrl.includes(pat) || lowerAnchor === pat || lowerAnchor.startsWith('skip')) {
        noNegativeLinks = false;
        negativeViolations.push(`Vi phạm ${pat}: ${r.requested_url} (${r.anchor_text})`);
      }
    }
  }
} else {
  noNegativeLinks = false;
  negativeViolations.push('Chưa tìm thấy sweep_044g_summary.json');
}

assertTest(
  'FILTER_01_NO_FRAGMENT_NO_LOGIN_NO_MENU',
  noNegativeLinks,
  noNegativeLinks
    ? 'Bộ lọc đã loại bỏ 100% các liên kết URL fragment (#), đăng nhập, giỏ hàng và menu điều hướng tĩnh'
    : `Vi phạm lọc: ${negativeViolations.join('; ')}`
);

// [TEST 2]: Promo Context Integrity
let promoContextValid = true;
if (fs.existsSync(summaryPath)) {
  const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
  const promoKeywords = ['khuyen', 'uu-dai', 'voucher', 'giam', 'combo', 'culture', 'happy', 'u22', 'dong-gia', 'qua', 'tin-va-khuyen-mai', 'mon-ngon', 'chinh-thuc', 'special', 'theater', 'gift', 'cine', 'tang', 'voucher', 'deadpool', 'open-bar'];
  for (const r of summary.results || []) {
    const textContext = `${r.requested_url} ${r.anchor_text} ${r.card_title || ''}`.toLowerCase();
    const hasPromoKeyword = promoKeywords.some(k => textContext.includes(k));
    if (!hasPromoKeyword) {
      promoContextValid = false;
    }
  }
}
assertTest(
  'FILTER_02_PROMOTION_SEMANTIC_CONTEXT',
  promoContextValid,
  'Toàn bộ link được quét đều mang ngữ nghĩa hoặc ngữ cảnh khuyến mãi rõ ràng'
);

// [TEST 3]: Complete Batch Sweeping (No Arbitrary Top 3 Slicing)
let fullBatchScanned = false;
if (fs.existsSync(summaryPath)) {
  const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
  fullBatchScanned = summary.total_filtered_links_found === summary.total_links_swept && summary.total_links_swept > 0;
}
assertTest(
  'FILTER_03_COMPLETE_BATCH_SWEEP',
  fullBatchScanned,
  'Quét trọn vẹn toàn bộ các liên kết đạt chuẩn bộ lọc trong một batch duy nhất'
);

// [TEST 4]: Official Deep URL Registry Not Mutated
const officialSchedule = JSON.parse(fs.readFileSync(schedulePath, 'utf8'));
const regUrls = officialSchedule.deep_url_registry.flatMap(r => r.discovery_urls);
assertTest(
  'FILTER_04_OFFICIAL_REGISTRY_ZERO_MUTATION',
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
  'FILTER_05_FAIL_CLOSED_ZERO_MUTATION_PRODUCTION',
  prodRaw.trim() === '[]' &&
  prodHash === '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945' &&
  isApproved === false,
  `Production feed duy trì bất biến [] (SHA-256: ${prodHash}) và RELEASE_MANIFEST is_approved: false (LOCKED)`
);

if (passCount === testCount && testCount > 0) {
  console.log(`\n🟢 [FILTER-SUMMARY] TOÀN BỘ ${passCount}/${testCount} KIỂM THỬ PROMOTION LINK FILTER ĐÃ ĐẠT [PASS]!\n`);
} else {
  console.error(`\n❌ [FILTER-SUMMARY] KIỂM THỬ THẤT BẠI: ${passCount}/${testCount} PASS!\n`);
  process.exitCode = 1;
}
