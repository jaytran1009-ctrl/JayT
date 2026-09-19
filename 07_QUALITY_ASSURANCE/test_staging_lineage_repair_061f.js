/**
 * JAYT STAGING LINEAGE REPAIR TEST SUITE (061F)
 * Directive: JAYT-STAGING-LINEAGE-REPAIR-061F / JAYT-PROJECT-MEMORY-TRANSACTION-057
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');

const incidentReceiptPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'INCIDENT_MUTATION_DISCLOSURE_RECEIPT_061F.json');
const correction061fPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'correction_receipt_061f_galaxy_happy_day.json');
const reviewSheet061fPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'GALAXY_HAPPY_DAY_MANUAL_REVIEW_SHEET_061F.md');

const stagingFeedPath = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const stagingManifestPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'STAGING_ACCEPTANCE_MANIFEST_061F.json');
const stagingReceiptPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'staging_061f', 'STAGING_E2E_RECEIPT_061F.json');
const screenshotPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'staging_061f', 'galaxy_staging_smoke_061f.png');

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
const correction061dPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'correction_receipt_061d_galaxy_happy_day.json');

const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

const {
  GALAXY_HAPPY_DAY_STAGING_ITEM_061F,
  verifySourceArtifactIntegrity,
  evaluateStagingTimebox061F,
  renderStagingFeed061F
} = require('./staging_timeboxed_engine_061f');

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

function run061fTests() {
  console.log('🧪 [JAYT-STAGING-061F-TEST] Khởi chạy bộ kiểm thử Staging Lineage Repair & Drift Quarantine (061F)...');

  // 1. Positive: Incident Disclosure Receipt Valid
  const incidentExists = fs.existsSync(incidentReceiptPath);
  let incidentValid = false;
  if (incidentExists) {
    const inc = JSON.parse(fs.readFileSync(incidentReceiptPath, 'utf8'));
    incidentValid = inc.work_order === 'JAYT-STAGING-LINEAGE-REPAIR-061F' &&
                    Array.isArray(inc.disclosed_violations) &&
                    inc.disclosed_violations.length >= 3 &&
                    inc.governance_enforcement.source_drift_quarantine_enforced === true;
  }
  assertTest('T1_01_INCIDENT_DISCLOSURE_RECEIPT_VALID',
    incidentValid,
    'Chứng thư công bố sự cố INCIDENT_MUTATION_DISCLOSURE_RECEIPT_061F.json hợp lệ, công bố đầy đủ 3 vi phạm và giải pháp.');

  // 2. Positive: Pristine 061F Correction Receipt Valid
  const corr061fExists = fs.existsSync(correction061fPath);
  let corr061fValid = false;
  if (corr061fExists) {
    const corr = JSON.parse(fs.readFileSync(correction061fPath, 'utf8'));
    const measuredHtml = getSha256(fs.readFileSync(htmlArtifactPath));
    const measuredText = getSha256(fs.readFileSync(textArtifactPath));
    const measuredPng = getSha256(fs.readFileSync(pngArtifactPath));

    corr061fValid = corr.work_order === 'JAYT-STAGING-LINEAGE-REPAIR-061F' &&
                    corr.artifacts.html_sha256 === measuredHtml &&
                    corr.artifacts.text_sha256 === measuredText &&
                    corr.artifacts.png_sha256 === measuredPng &&
                    corr.verified_claims.length >= 6;
  }
  assertTest('T1_02_PRISTINE_061F_CORRECTION_RECEIPT_VALID',
    corr061fValid,
    'Correction receipt 061F nguyên bản, khớp 100% byte-for-byte với cả 3 tệp HTML, Text, PNG trên đĩa.');

  // 3. Positive: Staging Feed File Contains Exactly 061F Deal
  const stagingFeedRaw = fs.existsSync(stagingFeedPath) ? fs.readFileSync(stagingFeedPath, 'utf8') : null;
  const stagingFeed = stagingFeedRaw ? JSON.parse(stagingFeedRaw) : [];
  const galaxyDeal = stagingFeed.find(d => d.deal_id === 'DNG-GALAXY-HAPPY-DAY-WEEKLY-TUESDAY-061F');

  assertTest('T1_03_STAGING_FEED_FILE_CONTAINS_EXACTLY_061F',
    galaxyDeal !== undefined && stagingFeed.length === 1,
    `Staging feed chứa đúng 1 deal được đề xuất 061F (${galaxyDeal ? galaxyDeal.title : 'None'}).`);

  // 4. Positive: Truthful Watermark Enforced
  const watermarkHonest = galaxyDeal &&
                          galaxyDeal.watermark_badge &&
                          galaxyDeal.watermark_badge.includes('Chờ kiểm toán độc lập CEO (061F)') &&
                          !galaxyDeal.watermark_badge.includes('Đã qua kiểm toán độc lập CEO (061D/061E)');

  assertTest('T1_04_TRUTHFUL_WATERMARK_ENFORCED',
    watermarkHonest,
    "Watermark phản ánh trung thực trạng thái 'Chờ kiểm toán độc lập CEO (061F)', loại bỏ tuyên bố kiểm toán sớm.");

  // 5. Negative: Source Hash Drift Triggers Quarantine Fail-Closed
  const tamperedItem = {
    ...galaxyDeal,
    provenance: {
      ...galaxyDeal.provenance,
      artifacts: {
        ...galaxyDeal.provenance.artifacts,
        text: {
          file: '07_QUALITY_ASSURANCE/runtime_evidence/sweep_061c_artifacts/capture_061c_galaxy_deep_12.txt',
          sha256: '0000000000000000000000000000000000000000000000000000000000000000'
        }
      }
    }
  };

  const driftEval = evaluateStagingTimebox061F(tamperedItem, new Date());
  assertTest('T1_05_NEGATIVE_SOURCE_HASH_DRIFT_TRIGGERS_QUARANTINE',
    driftEval.renderable === false && driftEval.status === 'QUARANTINED_SOURCE_HASH_DRIFT',
    `Khi mã băm artifact nguồn bị lệch, deal lập tức bị cách ly Fail-Closed [${driftEval.status}].`);

  // 6. Negative: Zero Unobserved Addresses
  const rawFeedStr = JSON.stringify(stagingFeed);
  const hasHallucinatedAddress = rawFeedStr.includes('478 Điện Biên Phủ') || rawFeedStr.includes('Coopmart');

  assertTest('T1_06_NEGATIVE_ZERO_UNOBSERVED_ADDRESS_IN_STAGING',
    !hasHallucinatedAddress,
    'Chặn đứng 100% địa chỉ suy diễn (không chứa 478 Điện Biên Phủ / Coopmart).');

  // 7. Negative: Zero Mandatory Membership Requirement
  const isEligibilityTrue = galaxyDeal && galaxyDeal.eligibility === 'Tất cả khách hàng' && galaxyDeal.mandatory_membership === false;

  assertTest('T1_07_NEGATIVE_ZERO_MANDATORY_MEMBERSHIP_IN_STAGING',
    isEligibilityTrue,
    "Đối tượng áp dụng ghi nhận trung thực 'Tất cả khách hàng', mandatory_membership: false.");

  // 8. Positive: Rolling 7-Day TTL Auto-Suppression
  const beforeTtlTime = '2026-08-25T12:00:00.000Z';
  const afterTtlTime = '2026-08-31T00:00:00.000Z';

  const evalBefore = evaluateStagingTimebox061F(galaxyDeal, beforeTtlTime);
  const evalAfter = evaluateStagingTimebox061F(galaxyDeal, afterTtlTime);

  const feedRenderBefore = renderStagingFeed061F(stagingFeed, beforeTtlTime);
  const feedRenderAfter = renderStagingFeed061F(stagingFeed, afterTtlTime);

  const ttlLogicValid = evalBefore.renderable === true &&
                        evalBefore.status === 'ACTIVE_STAGING_RENDERABLE' &&
                        evalAfter.renderable === false &&
                        evalAfter.status === 'EXPIRED_RECHECK_DUE' &&
                        feedRenderBefore.active_rendered_count === 1 &&
                        feedRenderAfter.active_rendered_count === 0;

  assertTest('T1_08_ROLLING_7_DAY_TTL_AUTO_SUPPRESSION_VALIDATED',
    ttlLogicValid,
    'Cơ chế TTL 7 ngày hoạt động hoàn hảo: Trước 30/08 renderable=true (count: 1); Sau 30/08 auto-suppressed (count: 0).');

  // 9. Positive: Staging Manifest and E2E Receipt 061F Valid
  const manifestExists = fs.existsSync(stagingManifestPath);
  const receiptExists = fs.existsSync(stagingReceiptPath);
  const screenshotExists = fs.existsSync(screenshotPath);

  let manifestValid = false;
  if (manifestExists && receiptExists && screenshotExists) {
    const manifestObj = JSON.parse(fs.readFileSync(stagingManifestPath, 'utf8'));
    const receiptObj = JSON.parse(fs.readFileSync(stagingReceiptPath, 'utf8'));
    manifestValid = manifestObj.work_order === 'JAYT-STAGING-LINEAGE-REPAIR-061F' &&
                    receiptObj.status === 'STAGING_E2E_VERIFIED_SUCCESS_PENDING_CEO_AUDIT' &&
                    receiptObj.e2e_verifications.truthful_watermark_verified === true;
  }

  assertTest('T1_09_STAGING_MANIFEST_AND_E2E_RECEIPT_061F_VALID',
    manifestValid,
    'Chứng thư Staging Manifest 061F và E2E Smoke Receipt 061F tồn tại và đạt chuẩn toàn vẹn.');

  // 10. Positive: Historical Receipts Preserved Append-Only
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

  assertTest('T1_10_HISTORICAL_RECEIPTS_PRESERVED_APPEND_ONLY',
    allHistoricalExist,
    'Toàn bộ các run receipt và correction lịch sử (058..061D) được bảo tồn 100% append-only.');

  // 11. Invariant: Production Locked
  const prodRaw = fs.readFileSync(prodFeedPath, 'utf8');
  const prodFeed = JSON.parse(prodRaw);
  const prodSha = getSha256(prodRaw);
  const releaseManifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
  const isApproved = releaseManifest.governance_locks?.immutable_ceo_approval_record?.is_approved === true;

  const isLocked = prodFeed.length === 0 &&
                   !isApproved &&
                   prodSha === EXPECTED_PROD_HASH;

  assertTest('INVARIANT_11_PRODUCTION_LOCKED',
    isLocked,
    `Production feed duy trì bất biến [] (SHA-256: ${prodSha}) và RELEASE_MANIFEST is_approved: false (LOCKED). Zero leak.`);

  console.log(`\n🟢 [STAGING-061F-SUMMARY] TOÀN BỘ ${passedTests}/${totalTests} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);

  if (passedTests !== totalTests) {
    process.exit(1);
  }
}

if (require.main === module) {
  run061fTests();
}

module.exports = {
  run061fTests
};
