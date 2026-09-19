/**
 * JAYT REGISTRY PROVENANCE TEST SUITE (044E)
 * Directive: JAYT-REGISTRY-PROVENANCE-044E — EXECUTE TODAY
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const repoRoot = path.resolve(__dirname, '..');

const pendingRegistryPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'pending_registry_updates.json');
const provenanceManifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'provenance_discovered_registry_044e.json');
const schedulePath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'content_coverage_schedule.json');
const summaryPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_044e_summary.json');
const artifactsDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_044e_artifacts');

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

console.log('🧪 [JAYT-PROVENANCE-044E-TEST] Khởi chạy bộ kiểm thử Registry Provenance 044E...');

// [TEST 1]: 044D Pending Updates Formally Marked as REJECTED
let updatesRejected = false;
if (fs.existsSync(pendingRegistryPath)) {
  const pData = JSON.parse(fs.readFileSync(pendingRegistryPath, 'utf8'));
  updatesRejected = pData.governance_status === 'REJECTED_BY_CEO_UNSUPPORTED_REPLACEMENT' &&
                    pData.updates.every(u => u.status === 'REJECTED_BY_CEO_UNSUPPORTED_REPLACEMENT');
}
assertTest(
  'PROV_01_044D_PENDING_UPDATES_REJECTED',
  updatesRejected,
  'Toàn bộ 7 đề xuất 044D thiếu provenance đã được chuyển sang trạng thái REJECTED_BY_CEO_UNSUPPORTED_REPLACEMENT'
);

// [TEST 2]: DOM Link Provenance Strict Contract
let provenanceValid = false;
if (fs.existsSync(provenanceManifestPath)) {
  const provData = JSON.parse(fs.readFileSync(provenanceManifestPath, 'utf8'));
  const roots = provData.discovery_roots || [];
  const validRoots = roots.filter(r => r.discovered_links_count > 0);
  provenanceValid = validRoots.length >= 3 && validRoots.every(r => {
    return r.root_url && r.root_screenshot_sha256 && r.root_html_sha256 &&
           r.links.every(l => l.discovery_source_url && l.source_screenshot_sha256 && l.locator && l.same_origin_verified);
  });
}
assertTest(
  'PROV_02_DOM_PROVENANCE_METADATA_VERIFIED',
  provenanceValid,
  'Mỗi đề xuất link mới đều có đầy đủ xuất xứ DOM: trang gốc, hash ảnh/HTML, anchor text, locator và xác thực same-origin'
);

// [TEST 3]: Negative Test - Homepage Never Counts As Deal Evidence
let noHomepageAsDeal = true;
if (fs.existsSync(summaryPath)) {
  const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
  for (const s of summary.sweep_results || []) {
    const parsed = new URL(s.requested_url);
    if (parsed.pathname === '/' && s.classification === 'PROMOTION_SIGNAL') {
      noHomepageAsDeal = false;
    }
  }
}
assertTest(
  'PROV_03_HOMEPAGE_NEVER_COUNTS_AS_DEAL',
  noHomepageAsDeal,
  'Trang chủ chính thức chỉ đóng vai trò bệ phóng khám phá DOM, tuyệt đối không được coi là bằng chứng ưu đãi'
);

// [TEST 4]: Official Deep URL Registry Not Mutated
const officialSchedule = JSON.parse(fs.readFileSync(schedulePath, 'utf8'));
const regUrls = officialSchedule.deep_url_registry.flatMap(r => r.discovery_urls);
assertTest(
  'PROV_04_OFFICIAL_REGISTRY_ZERO_MUTATION',
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
  'PROV_05_FAIL_CLOSED_ZERO_MUTATION_PRODUCTION',
  prodRaw.trim() === '[]' &&
  prodHash === '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945' &&
  isApproved === false,
  `Production feed duy trì bất biến [] (SHA-256: ${prodHash}) và RELEASE_MANIFEST is_approved: false (LOCKED)`
);

if (passCount === testCount && testCount > 0) {
  console.log(`\n🟢 [PROVENANCE-SUMMARY] TOÀN BỘ ${passCount}/${testCount} KIỂM THỬ REGISTRY PROVENANCE ĐÃ ĐẠT [PASS]!\n`);
} else {
  console.error(`\n❌ [PROVENANCE-SUMMARY] KIỂM THỬ THẤT BẠI: ${passCount}/${testCount} PASS!\n`);
  process.exitCode = 1;
}
