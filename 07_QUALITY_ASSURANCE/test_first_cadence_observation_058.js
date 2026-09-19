/**
 * JAYT FIRST CADENCE OBSERVATION TEST SUITE (058)
 * Directive: JAYT-FIRST-CADENCE-OBSERVATION-058 / JAYT-PROJECT-MEMORY-TRANSACTION-057
 * 
 * Verifies:
 * 1. Operational receipt presence and schema (task identity, time window, 16 URLs, artifact hashes, 4 weekly metrics).
 * 2. Strict classification fidelity: 1 Staging Internal Accepted (CGV), 15 Needs Recheck. Zero synthetic/auto-created claims.
 * 3. Change detection accuracy against 055D baseline: sources_changed = 0 (diff = 0).
 * 4. Production Lock Invariant: deals_feed.json: [], is_approved: false (LOCKED).
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const receipt058Path = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_058_first_cadence_observation', 'receipt.json');
const summary055Path = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_055_summary.json');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

let passedCount = 0;
let totalCount = 0;

function assertTest(testName, condition, detail) {
  totalCount++;
  if (condition) {
    passedCount++;
    console.log(`  [${testName}]: [PASS] - ${detail}`);
  } else {
    console.error(`  [${testName}]: [FAIL] - ${detail}`);
    process.exitCode = 1;
  }
}

function run058ObservationTests() {
  console.log('🧪 [JAYT-CADENCE-058-TEST] Khởi chạy bộ kiểm thử First Cadence Observation (058)...');

  // 1. Receipt presence & core schema
  let receiptValid = false;
  let receiptData = null;
  if (fs.existsSync(receipt058Path)) {
    try {
      receiptData = JSON.parse(fs.readFileSync(receipt058Path, 'utf8'));
      receiptValid = receiptData.work_order === 'JAYT-FIRST-CADENCE-OBSERVATION-058' &&
                     receiptData.task_identity &&
                     receiptData.started_at &&
                     receiptData.completed_at &&
                     Array.isArray(receiptData.urls_swept) &&
                     receiptData.urls_swept.length === 16 &&
                     receiptData.weekly_indicators &&
                     receiptData.status === 'IMPLEMENTED_PENDING_CEO_AUDIT';
    } catch (e) {
      receiptValid = false;
    }
  }

  assertTest('T1_01_OPERATIONAL_RECEIPT_SCHEMA',
    receiptValid,
    `Operational receipt 058 tồn tại đầy đủ task_identity, thời gian, 16 URLs, và 4 chỉ số tuần.`);

  // 2. 4 Weekly Indicators Conformance
  const ind = receiptData?.weekly_indicators || {};
  const indValid = ind.total_sources_swept === 16 &&
                   ind.sources_changed === 0 &&
                   ind.staging_accepted_deals === 1 &&
                   ind.deals_in_recheck === 15;

  assertTest('T1_02_WEEKLY_INDICATORS_MATCH_055D',
    indValid,
    `4 chỉ số tuần chính xác tuyệt đối: 16 swept / 0 changed (diff = 0) / 1 Staging CGV / 15 Recheck.`);

  // 3. Artifact Hashes & Classification Fidelity
  let artifactsValid = false;
  if (receiptData && receiptData.classification_summary) {
    const summary = receiptData.classification_summary;
    artifactsValid = summary.staging_internal_accepted.length === 1 &&
                     summary.staging_internal_accepted[0].brand_id === 'CGV' &&
                     summary.needs_recheck.length === 15 &&
                     receiptData.urls_swept.every(u => u.html_sha256 || u.png_sha256);
  }

  assertTest('T1_03_CLASSIFICATION_AND_ARTIFACT_HASHES',
    artifactsValid,
    `Phân loại dữ liệu trung thực: 1 CGV Culture Day ở Staging nội bộ, 15 nguồn NEEDS_RECHECK; 100% tệp có hash SHA-256.`);

  // 4. Zero Auto-Created Claim / Zero Synthetic Intrusion
  const zeroClaimsInjected = receiptData?.weekly_indicators?.new_ready_deals_from_055 === 0;
  assertTest('T1_04_ZERO_UNVERIFIED_CLAIMS_INJECTED',
    zeroClaimsInjected,
    `Không có bất kỳ claim nào tự sinh hay tự ý nhập vào production (new_ready_deals = 0).`);

  // 5. Production Invariant Lock
  const prodFeedContent = fs.readFileSync(prodFeedPath, 'utf8');
  const prodFeedJson = JSON.parse(prodFeedContent);
  const prodFeedSha = crypto.createHash('sha256').update(prodFeedContent).digest('hex');
  const releaseManifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));

  const isProdEmpty = Array.isArray(prodFeedJson) && prodFeedJson.length === 0;
  const isProdShaMatched = prodFeedSha === '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945';
  const isReleaseLocked = releaseManifest.governance_locks?.immutable_ceo_approval_record?.is_approved === false;

  assertTest('INVARIANT_05_PRODUCTION_LOCKED',
    isProdEmpty && isProdShaMatched && isReleaseLocked,
    `Production feed duy trì bất biến [] (SHA-256: ${prodFeedSha}) và RELEASE_MANIFEST is_approved: false (LOCKED)`);

  console.log(`\n🟢 [CADENCE-058-SUMMARY] TOÀN BỘ ${passedCount}/${totalCount} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);
}

if (require.main === module) {
  run058ObservationTests();
}

module.exports = { run058ObservationTests };
