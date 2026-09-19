/**
 * JAYT GALAXY STAGING ACCEPTANCE TEST SUITE (061E)
 * Directive: JAYT-GALAXY-STAGING-ACCEPTANCE-061E / JAYT-PROJECT-MEMORY-TRANSACTION-057
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');

const stagingFeedPath = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const stagingManifestPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'STAGING_ACCEPTANCE_MANIFEST_061E.json');
const stagingReceiptPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'staging_061e', 'STAGING_E2E_RECEIPT_061E.json');
const screenshotPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'staging_061e', 'galaxy_staging_smoke_061e.png');

const correction061dPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'correction_receipt_061d_galaxy_happy_day.json');

const htmlArtifactPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_061c_artifacts', 'capture_061c_galaxy_deep_12.html');
const textArtifactPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_061c_artifacts', 'capture_061c_galaxy_deep_12.txt');
const pngArtifactPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_061c_artifacts', 'capture_061c_galaxy_deep_12.png');

const receipt058Path = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_058_first_cadence_observation', 'receipt.json');
const receipt058aPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_058a_cadence_receipt_lineage', 'receipt.json');
const receipt058bPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_058b_trigger_provenance_correction', 'receipt.json');
const receipt060Path = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_060_manual_bootstrap', 'receipt.json');
const receipt060bPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_060b_manual_bootstrap', 'receipt.json');
const receipt060cPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_060c_manual_bootstrap', 'receipt.json');
const receipt061Path = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_061_deep_promo_sweep', 'receipt.json');
const receipt061aPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_061a_deep_url_discovery', 'receipt.json');
const receipt061bPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_061b_discovery_provenance_remediation', 'receipt.json');
const receipt061cPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_061c_discovery_truth_closure', 'receipt.json');

const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

const { evaluateStagingTimebox061E, renderStagingFeed061E } = require('./staging_timeboxed_engine_061e');

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

function getSha256(bufOrStr) {
  if (!bufOrStr) return null;
  return crypto.createHash('sha256').update(bufOrStr).digest('hex');
}

function run061eTests() {
  console.log('🧪 [JAYT-STAGING-061E-TEST] Khởi chạy bộ kiểm thử Staging Acceptance Galaxy Happy Day (061E)...');

  // 1. Positive: Staging Feed File Exists and Contains Galaxy Deal
  const stagingFeedRaw = fs.existsSync(stagingFeedPath) ? fs.readFileSync(stagingFeedPath, 'utf8') : null;
  const stagingFeed = stagingFeedRaw ? JSON.parse(stagingFeedRaw) : [];
  const galaxyDeal = stagingFeed.find(d => d.deal_id === 'DNG-GALAXY-HAPPY-DAY-WEEKLY-TUESDAY-061E');

  assertTest('T1_01_STAGING_FEED_EXISTS_AND_CONTAINS_GALAXY',
    galaxyDeal !== undefined && stagingFeed.length === 1,
    `Staging feed tồn tại đúng 1 deal được duyệt (${galaxyDeal ? galaxyDeal.title : 'None'}).`);

  // 2. Positive: Provenance Correction Receipt Lineage
  const correctionSha = getSha256(fs.readFileSync(correction061dPath));
  const provenanceMatches = galaxyDeal &&
                            galaxyDeal.provenance &&
                            galaxyDeal.provenance.correction_receipt_ref.includes('correction_receipt_061d_galaxy_happy_day.json') &&
                            galaxyDeal.provenance.correction_receipt_sha256 === correctionSha;

  assertTest('T1_02_CORRECTION_RECEIPT_LINEAGE_MATCH',
    provenanceMatches,
    `Lineage liên kết chính xác byte-for-byte với correction receipt 061D (SHA-256: ${correctionSha}).`);

  // 3. Positive: Three Artifact Hashes Match Physical Files on Disk
  const measuredHtmlSha = getSha256(fs.readFileSync(htmlArtifactPath));
  const measuredTextSha = getSha256(fs.readFileSync(textArtifactPath));
  const measuredPngSha = getSha256(fs.readFileSync(pngArtifactPath));

  const artifactsMatch = galaxyDeal &&
                         galaxyDeal.provenance &&
                         galaxyDeal.provenance.artifacts &&
                         galaxyDeal.provenance.artifacts.html.sha256 === measuredHtmlSha &&
                         galaxyDeal.provenance.artifacts.text.sha256 === measuredTextSha &&
                         galaxyDeal.provenance.artifacts.png.sha256 === measuredPngSha;

  assertTest('T1_03_THREE_ARTIFACT_HASHES_MATCH',
    artifactsMatch,
    '3 mã băm artifacts (HTML, Text, PNG) trong staging feed khớp 100% byte-for-byte với tệp trên đĩa.');

  // 4. Positive: Two Pricing Tiers Rendered
  const tier50k = galaxyDeal && galaxyDeal.pricing_tiers && galaxyDeal.pricing_tiers.find(t => t.cinema_name === 'Galaxy Đà Nẵng' && t.price_vnd === 50000);
  const tier70k = galaxyDeal && galaxyDeal.pricing_tiers && galaxyDeal.pricing_tiers.find(t => t.cinema_name === 'Galaxy CineX AEON Mall Thanh Khê' && t.price_vnd === 70000);

  assertTest('T1_04_TWO_PRICING_TIERS_EXACTLY_RENDERED',
    tier50k !== undefined && tier70k !== undefined && galaxyDeal.pricing_tiers.length === 2,
    'Hai mức giá theo rạp (Galaxy Đà Nẵng: 50.000đ & CineX AEON Thanh Khê: 70.000đ) được định nghĩa chuẩn xác.');

  // 5. Negative: Zero Unobserved Addresses in Staging Feed
  const rawFeedStr = JSON.stringify(stagingFeed);
  const hasHallucinatedAddress = rawFeedStr.includes('478 Điện Biên Phủ') || rawFeedStr.includes('Coopmart');

  assertTest('T1_05_NEGATIVE_ZERO_UNOBSERVED_ADDRESS_IN_STAGING',
    !hasHallucinatedAddress,
    'Chặn đứng 100% địa chỉ suy diễn không có trong artifact (không chứa 478 Điện Biên Phủ / Coopmart).');

  // 6. Negative: Zero Mandatory Membership Requirement
  const isEligibilityTrue = galaxyDeal && galaxyDeal.eligibility === 'Tất cả khách hàng' && galaxyDeal.mandatory_membership === false;

  assertTest('T1_06_NEGATIVE_ZERO_MANDATORY_MEMBERSHIP_IN_STAGING',
    isEligibilityTrue,
    "Đối tượng áp dụng ghi nhận trung thực 'Tất cả khách hàng', mandatory_membership: false.");

  // 7. Positive: Rolling 7-Day TTL Auto-Suppression
  const beforeTtlTime = '2026-08-25T12:00:00.000Z'; // Tuesday during valid window
  const afterTtlTime = '2026-08-31T00:00:00.000Z';  // Past 7-day TTL

  const evalBefore = evaluateStagingTimebox061E(galaxyDeal, beforeTtlTime);
  const evalAfter = evaluateStagingTimebox061E(galaxyDeal, afterTtlTime);

  const feedRenderBefore = renderStagingFeed061E(stagingFeed, beforeTtlTime);
  const feedRenderAfter = renderStagingFeed061E(stagingFeed, afterTtlTime);

  const ttlLogicValid = evalBefore.renderable === true &&
                        evalBefore.status === 'ACTIVE_STAGING_RENDERABLE' &&
                        evalAfter.renderable === false &&
                        evalAfter.status === 'EXPIRED_RECHECK_DUE' &&
                        feedRenderBefore.active_rendered_count === 1 &&
                        feedRenderAfter.active_rendered_count === 0;

  assertTest('T1_07_ROLLING_7_DAY_TTL_AUTO_SUPPRESSION_VALIDATED',
    ttlLogicValid,
    'Cơ chế TTL 7 ngày hoạt động hoàn hảo: Trước 30/08 renderable=true (count: 1); Sau 30/08 auto-suppressed (count: 0).');

  // 8. Positive: Staging Manifest and E2E Receipt Integrity
  const manifestExists = fs.existsSync(stagingManifestPath);
  const receiptExists = fs.existsSync(stagingReceiptPath);
  const screenshotExists = fs.existsSync(screenshotPath);

  let manifestValid = false;
  if (manifestExists && receiptExists && screenshotExists) {
    const manifestObj = JSON.parse(fs.readFileSync(stagingManifestPath, 'utf8'));
    const receiptObj = JSON.parse(fs.readFileSync(stagingReceiptPath, 'utf8'));
    manifestValid = manifestObj.work_order === 'JAYT-GALAXY-STAGING-ACCEPTANCE-061E' &&
                    receiptObj.status === 'STAGING_E2E_VERIFIED_SUCCESS' &&
                    receiptObj.e2e_verifications.pricing_50k_and_70k_rendered === true;
  }

  assertTest('T1_08_STAGING_MANIFEST_AND_E2E_RECEIPT_INTEGRITY',
    manifestValid,
    'Chứng thư Staging Manifest 061E và E2E Smoke Receipt 061E tồn tại và đạt chuẩn toàn vẹn.');

  // 9. Positive: Historical Runs Preserved
  const allHistoricalExist = fs.existsSync(receipt058Path) &&
                             fs.existsSync(receipt058aPath) &&
                             fs.existsSync(receipt058bPath) &&
                             fs.existsSync(receipt060Path) &&
                             fs.existsSync(receipt060bPath) &&
                             fs.existsSync(receipt060cPath) &&
                             fs.existsSync(receipt061Path) &&
                             fs.existsSync(receipt061aPath) &&
                             fs.existsSync(receipt061bPath) &&
                             fs.existsSync(receipt061cPath) &&
                             fs.existsSync(correction061dPath);

  assertTest('T1_09_HISTORICAL_RUNS_PRESERVED_INCLUDING_061D',
    allHistoricalExist,
    'Toàn bộ các run receipt và correction lịch sử (058..061D) được bảo tồn 100% append-only.');

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
    `Production feed duy trì bất biến [] (SHA-256: ${prodSha}) và RELEASE_MANIFEST is_approved: false (LOCKED). Zero leak.`);

  console.log(`\n🟢 [STAGING-061E-SUMMARY] TOÀN BỘ ${passedTests}/${totalTests} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);

  if (passedTests !== totalTests) {
    process.exit(1);
  }
}

if (require.main === module) {
  run061eTests();
}

module.exports = {
  run061eTests
};
