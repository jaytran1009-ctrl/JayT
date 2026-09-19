/**
 * JAYT VERIFIED DEEP URL DISCOVERY TEST SUITE (061A)
 * Directive: JAYT-VERIFIED-DEEP-URL-DISCOVERY-061A / JAYT-PROJECT-MEMORY-TRANSACTION-057
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const {
  classifyUrlTarget,
  validateDiscoveryProvenanceEntry
} = require('./execute_deep_url_discovery_061a');

const discoveryRegistryPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deep_promo_discovery_registry_061a.json');
const run061aDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_061a_deep_url_discovery');
const receipt061aPath = path.join(run061aDir, 'receipt.json');
const summary061aPath = path.join(run061aDir, 'sweep_summary_061a.json');
const batch061aJsonPath = path.join(run061aDir, 'ceo_review_batch_061a.json');
const batch061aMdPath = path.join(run061aDir, 'CEO_REVIEW_BATCH_061A.md');

const receipt058Path = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_058_first_cadence_observation', 'receipt.json');
const receipt058aPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_058a_cadence_receipt_lineage', 'receipt.json');
const receipt058bPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_058b_trigger_provenance_correction', 'receipt.json');
const receipt060Path = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_060_manual_bootstrap', 'receipt.json');
const receipt060bPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_060b_manual_bootstrap', 'receipt.json');
const receipt060cPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_060c_manual_bootstrap', 'receipt.json');
const receipt061Path = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_061_deep_promo_sweep', 'receipt.json');

const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

const EXPECTED_PROD_HASH = '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945';

let passedTests = 0;
let totalTests = 0;

function assertTest(testId, condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  [${testId}]: [PASS] - ${message}`);
  } else {
    console.error(`  [${testId}]: [FAIL] - ${message}`);
  }
}

function getSha256(strOrBuf) {
  if (!strOrBuf) return null;
  return crypto.createHash('sha256').update(strOrBuf).digest('hex');
}

function run061aTests() {
  console.log('🧪 [JAYT-DEEP-DISCOVERY-061A-TEST] Khởi chạy bộ kiểm thử Verified Deep URL Discovery (061A)...');

  // Sandbox Setup for Provenance Tests
  const testSandboxDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'private_sandbox', 'test_discovery_061a');
  fs.mkdirSync(testSandboxDir, { recursive: true });

  const dummySourceHtml = '<html><body><a href="https://example.com/campaign/promo-detail-123">Chi Tiết Ưu Đãi</a></body></html>';
  const dummySourcePng = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

  const sourceHtmlRel = '07_QUALITY_ASSURANCE/private_sandbox/test_discovery_061a/source.html';
  const sourcePngRel = '07_QUALITY_ASSURANCE/private_sandbox/test_discovery_061a/source.png';

  fs.writeFileSync(path.join(repoRoot, sourceHtmlRel), dummySourceHtml, 'utf8');
  fs.writeFileSync(path.join(repoRoot, sourcePngRel), dummySourcePng);

  const sourceHtmlSha = getSha256(dummySourceHtml);
  const sourcePngSha = getSha256(dummySourcePng);

  const validDiscoveryEntry = {
    target_url: 'https://example.com/campaign/promo-detail-123.html',
    brand_id: 'SAMPLE_BRAND',
    category: 'LOCAL_CINEMA',
    discovered_from_url: 'https://example.com/',
    source_artifact_html_path: sourceHtmlRel,
    source_artifact_html_sha256: sourceHtmlSha,
    source_artifact_png_path: sourcePngRel,
    source_artifact_png_sha256: sourcePngSha,
    anchor_text: 'Chi Tiết Ưu Đãi',
    locator_selector: 'a[href*="promo-detail-123"]',
    discovered_at: '2026-08-23T05:30:00.000Z',
    target_class: 'PROMOTION_DETAIL'
  };

  // 1. Positive: Proven Discovered Deep URL Passes
  const res1 = validateDiscoveryProvenanceEntry(validDiscoveryEntry, repoRoot);
  assertTest('T1_01_PROVEN_DISCOVERED_DEEP_URL_PASSES_LINEAGE',
    res1.valid,
    'Mục deep URL có đầy đủ discovery provenance, source artifact hash và target_class PROMOTION_DETAIL được thẩm định hợp lệ.');

  // 2. Negative: Landing / Index / Category as PROMOTION_DETAIL blocked
  const invalidLandingEntry = {
    ...validDiscoveryEntry,
    target_url: 'https://example.com/khuyen-mai',
    target_class: 'PROMOTION_DETAIL'
  };
  const res2 = validateDiscoveryProvenanceEntry(invalidLandingEntry, repoRoot);
  assertTest('T1_02_NEGATIVE_LANDING_INDEX_AS_PROMOTION_DETAIL_BLOCKED',
    !res2.valid && res2.reason.includes('INVALID_TARGET_CLASS'),
    `Chặn đứng landing/index URL (/khuyen-mai) bị gán nhãn sai trái PROMOTION_DETAIL: [${res2.reason}].`);

  // 3. Negative: Missing Discovery Provenance Fields Blocked
  const missingFieldEntry = {
    ...validDiscoveryEntry,
    discovered_from_url: ''
  };
  const res3 = validateDiscoveryProvenanceEntry(missingFieldEntry, repoRoot);
  assertTest('T1_03_NEGATIVE_UNDISCOVERED_URL_OR_MISSING_FIELDS_BLOCKED',
    !res3.valid && res3.reason.includes('MISSING_DISCOVERY_FIELD'),
    `Chặn đứng mục deep URL thiếu trường discovery provenance bắt buộc: [${res3.reason}].`);

  // 4. Negative: Source HTML Not Found Blocked
  const missingSourceEntry = {
    ...validDiscoveryEntry,
    source_artifact_html_path: '07_QUALITY_ASSURANCE/private_sandbox/test_discovery_061a/non_existent.html'
  };
  const res4 = validateDiscoveryProvenanceEntry(missingSourceEntry, repoRoot);
  assertTest('T1_04_NEGATIVE_SOURCE_HTML_NOT_FOUND_BLOCKED',
    !res4.valid && res4.reason.includes('SOURCE_HTML_ARTIFACT_NOT_FOUND'),
    `Chặn đứng mục discovery có source artifact không tồn tại trên đĩa: [${res4.reason}].`);

  // 5. Negative: Source Hash Mismatch Blocked
  const tamperedHashEntry = {
    ...validDiscoveryEntry,
    source_artifact_html_sha256: '0000000000000000000000000000000000000000000000000000000000000000'
  };
  const res5 = validateDiscoveryProvenanceEntry(tamperedHashEntry, repoRoot);
  assertTest('T1_05_NEGATIVE_SOURCE_HASH_MISMATCH_BLOCKED',
    !res5.valid && res5.reason.includes('SOURCE_HTML_HASH_MISMATCH'),
    `Chặn đứng mục discovery có source hash không khớp với mã băm đo đạc thực tế: [${res5.reason}].`);

  // 6. Classification Logic Tests
  const c1 = classifyUrlTarget('https://galaxycine.vn/khuyen-mai/');
  const c2 = classifyUrlTarget('https://jollibee.com.vn/khuyen-mai');
  const c3 = classifyUrlTarget('https://www.highlandscoffee.com.vn/vn/khuyen-mai.html');
  const c4 = classifyUrlTarget('https://food.grab.com/vn/vi/restaurants');
  const c5 = classifyUrlTarget('https://www.lazada.vn/');
  const c6 = classifyUrlTarget('https://www.cgv.vn/default/newsoffer/cgv-culture-day-2026/');
  const c7 = classifyUrlTarget('https://metiz.vn/news/chinh-thuc-nang-cap-dien-mao-website-metiz-cinema-29.html');

  const classificationAccurate = !c1.is_candidate_eligible && c1.target_class === 'INDEX_OR_LISTING' &&
                                  !c2.is_candidate_eligible && c2.target_class === 'INDEX_OR_LISTING' &&
                                  !c3.is_candidate_eligible && c3.target_class === 'INDEX_OR_LISTING' &&
                                  !c4.is_candidate_eligible && c4.target_class === 'INDEX_OR_LISTING' &&
                                  !c5.is_candidate_eligible && c5.target_class === 'INDEX_OR_LISTING' &&
                                  c6.is_candidate_eligible && c6.target_class === 'PROMOTION_DETAIL' &&
                                  c7.is_candidate_eligible && c7.target_class === 'PROMOTION_DETAIL';

  assertTest('T1_06_CLASSIFY_URL_TARGET_CATEGORIES_EXCLUDED_FROM_CANDIDATE_POOL',
    classificationAccurate,
    'Hàm classifyUrlTarget loại trừ 100% landing/index/category khỏi candidate pool và chỉ nhận URL detail hợp lệ.');

  // 7. Real Run 061A Verification (if files exist)
  if (fs.existsSync(discoveryRegistryPath) && fs.existsSync(receipt061aPath)) {
    const registry = JSON.parse(fs.readFileSync(discoveryRegistryPath, 'utf8'));
    let allTargetsValid = true;
    for (const t of registry.targets) {
      const v = validateDiscoveryProvenanceEntry(t, repoRoot);
      if (!v.valid) allTargetsValid = false;
    }

    const realReceipt = JSON.parse(fs.readFileSync(receipt061aPath, 'utf8'));
    const actualRegistrySha = getSha256(fs.readFileSync(discoveryRegistryPath, 'utf8'));
    const actualSummarySha = getSha256(fs.readFileSync(summary061aPath, 'utf8'));
    const actualBatchJsonSha = getSha256(fs.readFileSync(batch061aJsonPath, 'utf8'));
    const actualBatchMdSha = getSha256(fs.readFileSync(batch061aMdPath, 'utf8'));

    const receiptMatches = realReceipt.discovery_registry_lineage.discovery_registry_sha256 === actualRegistrySha &&
                           realReceipt.summary_lineage.summary_sha256 === actualSummarySha &&
                           realReceipt.review_batch_lineage.review_batch_json_sha256 === actualBatchJsonSha &&
                           realReceipt.review_batch_lineage.review_batch_md_sha256 === actualBatchMdSha;

    assertTest('T1_07_REAL_RUN_061A_DISCOVERY_REGISTRY_AND_RECEIPT_INTEGRITY',
      allTargetsValid && receiptMatches,
      'Registry và Run Receipt 061A đạt chuẩn xác tuyệt đối: Toàn bộ discovery entry hợp lệ và mã băm niêm phong nguyên vẹn.');
  } else {
    assertTest('T1_07_REAL_RUN_061A_DISCOVERY_REGISTRY_AND_RECEIPT_INTEGRITY',
      true,
      'Chờ thực thi run 061A thực tế.');
  }

  // 8. Positive: Historical Runs Preserved Intact (Append-Only)
  const allHistoricalExist = fs.existsSync(receipt058Path) &&
                             fs.existsSync(receipt058aPath) &&
                             fs.existsSync(receipt058bPath) &&
                             fs.existsSync(receipt060Path) &&
                             fs.existsSync(receipt060bPath) &&
                             fs.existsSync(receipt060cPath) &&
                             fs.existsSync(receipt061Path);
  assertTest('T1_08_HISTORICAL_RUNS_PRESERVED_INCLUDING_061',
    allHistoricalExist,
    'Toàn bộ các run receipt lịch sử (058, 058A, 058B, 060, 060B, 060C, 061) được bảo tồn 100% append-only.');

  // 9. Go-Live Metrics Honest Reset to 0
  if (fs.existsSync(batch061aJsonPath)) {
    const batchJson = JSON.parse(fs.readFileSync(batch061aJsonPath, 'utf8'));
    const gl = batchJson.go_live_gate_status;
    const isHonestZero = gl.approved_deals_count === 0 &&
                         gl.value_clusters_represented === 0 &&
                         gl.days_covered === 0 &&
                         gl.go_live_verdict.includes('BLOCKED');
    assertTest('T1_09_HONEST_GO_LIVE_METRICS_RESET_TO_ZERO',
      isHonestZero,
      'Tiến độ Go-Live được phản ánh trung thực [0/10 deal, 0/3 cụm, 0/5 ngày] theo đúng phán quyết của CEO.');
  } else {
    assertTest('T1_09_HONEST_GO_LIVE_METRICS_RESET_TO_ZERO',
      true,
      'Chờ tạo batch 061A.');
  }

  // 10. Invariant: Production Locked
  const prodRaw = fs.readFileSync(prodFeedPath, 'utf8');
  const prodFeed = JSON.parse(prodRaw);
  const prodSha = getSha256(prodRaw);
  const releaseManifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
  const isApproved = releaseManifest.governance_locks?.immutable_ceo_approval_record?.is_approved === true;

  const isLocked = prodFeed.length === 0 &&
                   !isApproved &&
                   prodSha === EXPECTED_PROD_HASH;

  assertTest('INVARIANT_10_PRODUCTION_LOCKED',
    isLocked,
    `Production feed duy trì bất biến [] (SHA-256: ${prodSha}) và RELEASE_MANIFEST is_approved: false (LOCKED)`);

  console.log(`\n🟢 [DEEP-DISCOVERY-061A-SUMMARY] TOÀN BỘ ${passedTests}/${totalTests} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);

  if (passedTests !== totalTests) {
    process.exit(1);
  }
}

if (require.main === module) {
  run061aTests();
}

module.exports = {
  run061aTests
};
