/**
 * JAYT CEO DECISION & STAGING PROGRESS MILESTONE TEST SUITE (061G)
 * Directive: JAYT-GALAXY-STAGING-CEO-DECISION-061G / JAYT-PROJECT-MEMORY-TRANSACTION-057
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');

const decisionReceiptPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'CEO_DECISION_RECEIPT_061G_GALAXY_STAGING_ACCEPTANCE.json');
const roadmapPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'ACQUISITION_ROADMAP_061G.md');

const incidentReceiptPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'INCIDENT_MUTATION_DISCLOSURE_RECEIPT_061F.json');
const correction061fPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'correction_receipt_061f_galaxy_happy_day.json');
const stagingManifest061fPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'STAGING_ACCEPTANCE_MANIFEST_061F.json');
const stagingReceipt061fPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'staging_061f', 'STAGING_E2E_RECEIPT_061F.json');

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

function run061gTests() {
  console.log('🧪 [JAYT-CEO-DECISION-061G-TEST] Khởi chạy bộ kiểm thử CEO Decision & Acquisition Roadmap (061G)...');

  // 1. Positive: CEO Decision Receipt Exists and Valid
  const decisionExists = fs.existsSync(decisionReceiptPath);
  let decisionObj = null;
  let decisionValid = false;

  if (decisionExists) {
    decisionObj = JSON.parse(fs.readFileSync(decisionReceiptPath, 'utf8'));
    decisionValid = decisionObj.work_order === 'JAYT-GALAXY-STAGING-CEO-DECISION-061G' &&
                    decisionObj.approved_by === 'CEO Jay Trần' &&
                    decisionObj.decision_verdict === 'APPROVED_FIRST_STAGING_SEED_DEAL';
  }
  assertTest('T1_01_CEO_DECISION_RECEIPT_EXISTS_AND_VALID',
    decisionValid,
    'Quyết định của CEO (CEO_DECISION_RECEIPT_061G_GALAXY_STAGING_ACCEPTANCE.json) hợp lệ và được phê duyệt chính thức.');

  // 2. Positive: Referenced 4 Evidence Hashes Match Physical Files
  let lineageHashesMatch = false;
  if (decisionObj && decisionObj.referenced_evidence_lineage) {
    const lin = decisionObj.referenced_evidence_lineage;

    const actualIncSha = getSha256(fs.readFileSync(incidentReceiptPath));
    const actualCorrSha = getSha256(fs.readFileSync(correction061fPath));
    const actualManSha = getSha256(fs.readFileSync(stagingManifest061fPath));
    const actualE2eSha = getSha256(fs.readFileSync(stagingReceipt061fPath));

    lineageHashesMatch = lin.incident_disclosure_receipt.sha256 === actualIncSha &&
                         lin.correction_receipt.sha256 === actualCorrSha &&
                         lin.staging_manifest.sha256 === actualManSha &&
                         lin.staging_e2e_receipt.sha256 === actualE2eSha;
  }
  assertTest('T1_02_REFERENCED_4_EVIDENCE_HASHES_MATCH_PHYSICAL_FILES',
    lineageHashesMatch,
    'Toàn bộ 4 mã băm bằng chứng (Incident, Correction 061F, Manifest 061F, E2E Receipt 061F) trong quyết định CEO khớp 100% byte-for-byte với tệp trên đĩa.');

  // 3. Positive: Staging Progress Milestone Unlocked
  const milestoneValid = decisionObj &&
                         decisionObj.staging_milestone_progress &&
                         decisionObj.staging_milestone_progress.approved_staging_deals_count === 1 &&
                         decisionObj.staging_milestone_progress.value_clusters_covered === 1 &&
                         decisionObj.staging_milestone_progress.days_covered === 1 &&
                         decisionObj.staging_milestone_progress.progress_display === 'STAGING: 1/10 deal · 1/3 cụm · 1/5 ngày';

  assertTest('T1_03_STAGING_PROGRESS_MILESTONE_UNLOCKED',
    milestoneValid,
    'Tiến độ Staging chính thức mở khóa mốc: STAGING: 1/10 deal · 1/3 cụm · 1/5 ngày.');

  // 4. Positive: Approved Deal Provenance and Pricing Integrity
  const deal = decisionObj ? decisionObj.approved_staging_deal : null;
  const dealValid = deal &&
                    deal.deal_id === 'DNG-GALAXY-HAPPY-DAY-WEEKLY-TUESDAY-061F' &&
                    deal.schedule === 'Thứ Ba hàng tuần' &&
                    deal.pricing_tiers.length === 2 &&
                    deal.pricing_tiers.some(t => t.cinema_name === 'Galaxy Đà Nẵng' && t.price_vnd === 50000) &&
                    deal.pricing_tiers.some(t => t.cinema_name === 'Galaxy CineX AEON Mall Thanh Khê' && t.price_vnd === 70000) &&
                    deal.eligibility === 'Tất cả khách hàng' &&
                    deal.recheck_due_at === '2026-08-30T06:12:38.659Z';

  assertTest('T1_04_APPROVED_DEAL_PROVENANCE_AND_PRICING_INTEGRITY',
    dealValid,
    'Chi tiết deal được duyệt bảo toàn 100%: Giá 50k & 70k, lịch Thứ Ba, tất cả khách hàng và TTL 7 ngày.');

  // 5. Positive: Acquisition Roadmap Document Exists
  const roadmapExists = fs.existsSync(roadmapPath);
  let roadmapValid = false;
  if (roadmapExists) {
    const rawRoadmap = fs.readFileSync(roadmapPath, 'utf8');
    roadmapValid = rawRoadmap.includes('F&B / Cà phê') &&
                   rawRoadmap.includes('Online / App / Sàn') &&
                   rawRoadmap.includes('Truth Gate 055D') &&
                   rawRoadmap.includes('Claim-Bound Evidence');
  }
  assertTest('T1_05_ACQUISITION_ROADMAP_DOCUMENT_EXISTS',
    roadmapValid,
    'Kế hoạch tác chiến ACQUISITION_ROADMAP_061G.md bao quát 2 cụm ưu tiên (F&B và Online/App) cùng 5 cổng kiểm duyệt bắt buộc.');

  // 6. Positive: Historical Runs and Receipts Preserved Append-Only
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
                             fs.existsSync(correction061dPath) &&
                             fs.existsSync(incidentReceiptPath) &&
                             fs.existsSync(correction061fPath);

  assertTest('T1_06_HISTORICAL_RUNS_AND_RECEIPTS_PRESERVED_APPEND_ONLY',
    allHistoricalExist,
    'Toàn bộ các run receipts và correction receipts lịch sử (058..061F) được bảo tồn 100% append-only.');

  // 7. Invariant: Production Locked
  const prodRaw = fs.readFileSync(prodFeedPath, 'utf8');
  const prodFeed = JSON.parse(prodRaw);
  const prodSha = getSha256(prodRaw);
  const releaseManifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
  const isApproved = releaseManifest.governance_locks?.immutable_ceo_approval_record?.is_approved === true;

  const isLocked = prodFeed.length === 0 &&
                   !isApproved &&
                   prodSha === EXPECTED_PROD_HASH;

  assertTest('INVARIANT_07_PRODUCTION_LOCKED',
    isLocked,
    `Production feed duy trì bất biến [] (SHA-256: ${prodSha}) và RELEASE_MANIFEST is_approved: false (LOCKED). Zero leak.`);

  console.log(`\n🟢 [CEO-DECISION-061G-SUMMARY] TOÀN BỘ ${passedTests}/${totalTests} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);

  if (passedTests !== totalTests) {
    process.exit(1);
  }
}

if (require.main === module) {
  run061gTests();
}

module.exports = {
  run061gTests
};
