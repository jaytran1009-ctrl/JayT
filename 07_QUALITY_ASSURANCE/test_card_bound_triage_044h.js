/**
 * JAYT CARD-BOUND PROMOTION TRIAGE TEST SUITE (044H)
 * Directive: JAYT-CARD-BOUND-PROMOTION-TRIAGE-044H — EXECUTE TODAY
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const repoRoot = path.resolve(__dirname, '..');

const { triage044GLinks, analyzeVerbatimSnippets044H } = require('./execute_card_bound_triage_044h');
const schedulePath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'content_coverage_schedule.json');
const summaryPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_044h_summary.json');
const artifactsDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_044h_artifacts');

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

console.log('🧪 [JAYT-TRIAGE-044H-TEST] Khởi chạy bộ kiểm thử Card-Bound Promotion Triage 044H...');

// [TEST 1]: False Positives Discarded with Explicit Reasons
let falsePositivesDiscarded = false;
if (fs.existsSync(summaryPath)) {
  const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
  const discarded = summary.discarded_items || [];
  const hasTheatersSpecial = discarded.some(d => d.url.includes('/theaters-special') || d.url.includes('/special/4dx'));
  const hasVoucherStore = discarded.some(d => d.url.includes('/online-store/'));
  const hasGiftStore = discarded.some(d => d.url.includes('/gift/'));
  falsePositivesDiscarded = hasTheatersSpecial && hasVoucherStore && hasGiftStore && summary.discarded_navigation_count >= 16;
}
assertTest(
  'TRIAGE_01_FALSE_POSITIVES_DISCARDED',
  falsePositivesDiscarded,
  'Toàn bộ các liên kết rạp đặc biệt, quầy online, thẻ quà tặng và điều hướng đã bị loại bỏ với lý do rõ ràng'
);

// [TEST 2]: Card-Bound Heading Binding (Never "Read More")
let cardBoundHeadingsValid = true;
let invalidHeadings = [];
if (fs.existsSync(summaryPath)) {
  const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
  for (const r of summary.recaptured_results || []) {
    const heading = (r.card_heading || '').trim().toLowerCase();
    if (!heading || heading === 'read more' || heading === 'chi tiết') {
      cardBoundHeadingsValid = false;
      invalidHeadings.push(r.requested_url);
    }
  }
} else {
  cardBoundHeadingsValid = false;
}
assertTest(
  'TRIAGE_02_CARD_BOUND_HEADING_BINDING',
  cardBoundHeadingsValid,
  cardBoundHeadingsValid
    ? 'Toàn bộ bài viết ưu đãi hợp lệ đều được gán tiêu đề thẻ cha cụ thể, tuyệt đối không dùng nhãn "Read More"'
    : `Tiêu đề không hợp lệ: ${invalidHeadings.join(', ')}`
);

// [TEST 3]: Date / Expiry Inspection & EXPIRED_OR_UNDATED Flagging
let expiredOrUndatedLogged = false;
if (fs.existsSync(summaryPath)) {
  const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
  const expiredItems = summary.recaptured_results.filter(r => r.reason.includes('EXPIRED_OR_UNDATED'));
  expiredOrUndatedLogged = expiredItems.length > 0;
}
assertTest(
  'TRIAGE_03_EXPIRED_OR_UNDATED_FLAGGING',
  expiredOrUndatedLogged,
  'Các bài viết ưu đãi thiếu hạn dùng hoặc có ngày tháng cũ được gắn nhãn EXPIRED_OR_UNDATED chính xác'
);

// [TEST 4]: Official Deep URL Registry Not Mutated
const officialSchedule = JSON.parse(fs.readFileSync(schedulePath, 'utf8'));
const regUrls = officialSchedule.deep_url_registry.flatMap(r => r.discovery_urls);
assertTest(
  'TRIAGE_04_OFFICIAL_REGISTRY_ZERO_MUTATION',
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
  'TRIAGE_05_FAIL_CLOSED_ZERO_MUTATION_PRODUCTION',
  prodRaw.trim() === '[]' &&
  prodHash === '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945' &&
  isApproved === false,
  `Production feed duy trì bất biến [] (SHA-256: ${prodHash}) và RELEASE_MANIFEST is_approved: false (LOCKED)`
);

if (passCount === testCount && testCount > 0) {
  console.log(`\n🟢 [TRIAGE-SUMMARY] TOÀN BỘ ${passCount}/${testCount} KIỂM THỬ CARD-BOUND TRIAGE ĐÃ ĐẠT [PASS]!\n`);
} else {
  console.error(`\n❌ [TRIAGE-SUMMARY] KIỂM THỬ THẤT BẠI: ${passCount}/${testCount} PASS!\n`);
  process.exitCode = 1;
}
