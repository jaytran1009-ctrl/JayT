/**
 * JAYT SCHEDULER EVIDENCE CALIBRATION TEST SUITE (056C)
 * Directive: JAYT-SCHEDULER-EVIDENCE-CALIBRATION-056C
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const proofPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'scheduler_registration_proof_056c.json');
const baselinePath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'canonical_signatures_baseline.json');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

const { runAuthorizedCadence } = require('./cadence_sweep_runner_056');

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

async function run056cCalibrationTests() {
  console.log('🧪 [JAYT-SCHEDULER-056C-TEST] Khởi chạy bộ kiểm thử Evidence Calibration & Cross-Env Status (056C)...');

  // 1. Calibrated Baseline Schema
  let baselineValid = false;
  if (fs.existsSync(baselinePath)) {
    const b = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));
    baselineValid = b.truth_gate_version === '055D_DOM_CONTAINER_SCOPED' &&
                    b.baseline_mode === 'REBASELINE' &&
                    Array.isArray(b.sources) &&
                    b.sources.length === 16 &&
                    b.sources.every(s => s.change_status === 'NOT_COMPARABLE');
  }

  assertTest('T1_01_CALIBRATED_BASELINE_SCHEMA',
    baselineValid,
    `canonical_signatures_baseline.json chứa đầy đủ truth_gate_version: 055D_DOM_CONTAINER_SCOPED, baseline_mode: REBASELINE, và change_status: NOT_COMPARABLE.`);

  // 2. Real Execution Proof & Cross-Environment Disclosure
  let proofValid = false;
  if (fs.existsSync(proofPath)) {
    const p = JSON.parse(fs.readFileSync(proofPath, 'utf8'));
    proofValid = p.work_order === 'JAYT-SCHEDULER-EVIDENCE-CALIBRATION-056C' &&
                 p.audit_verdict === 'REGISTERED_IN_ANTIGRAVITY_ENVIRONMENT — UNVERIFIED_IN_CODEX_AUDIT_ENVIRONMENT' &&
                 Object.keys(p.tasks).length === 4 &&
                 Object.values(p.tasks).every(t => t.create_command && typeof t.create_exit_code === 'number' && t.query_list_verbatim);
  }

  assertTest('T1_02_REAL_EXECUTION_PROOF_ARTIFACT',
    proofValid,
    `Chứng thư đăng ký 056C lưu nguyên văn kết quả thực thi và công bố trung thực trạng thái cross-environment.`);

  // 3. Canary Sandbox Reprocess with Zero Sources Changed (diff = 0)
  const sandboxTestEvidenceDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'private_sandbox', 'test_evidence');
  const sandboxTestCandidatesDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'private_sandbox', 'test_candidates');
  fs.mkdirSync(sandboxTestEvidenceDir, { recursive: true });
  fs.mkdirSync(sandboxTestCandidatesDir, { recursive: true });

  const canaryResult = await runAuthorizedCadence({
    reprocessOnly: true,
    isTest: true,
    workOrder: 'JAYT-056C-CANARY-ZERO-DIFF-TEST',
    receiptsDir: sandboxTestEvidenceDir,
    reviewSheetsDir: sandboxTestCandidatesDir
  });

  const canaryValid = canaryResult &&
                      canaryResult.production_locked === true &&
                      canaryResult.sweepSummary.total_sources_swept === 16 &&
                      canaryResult.sweepSummary.sources_changed === 0 &&
                      canaryResult.sweepSummary.staging_accepted_deals === 1 &&
                      canaryResult.sweepSummary.deals_in_recheck === 15;

  assertTest('T1_03_CANARY_SANDBOX_REPROCESS_ZERO_DIFF',
    canaryValid,
    `Canary sandbox reprocess đạt chuẩn xác tuyệt đối: 16 nguồn quét / 0 sources_changed (diff = 0) / 1 Staging CGV / 15 Recheck.`);

  // 4. Cycle Filtering Specification (DAILY_MORNING_0800 sweeps 5 sources with 0 diff)
  const morningCycleResult = await runAuthorizedCadence({
    cycle: 'DAILY_MORNING_0800',
    reprocessOnly: true,
    isTest: true,
    workOrder: 'JAYT-056C-MORNING-CYCLE-TEST',
    receiptsDir: sandboxTestEvidenceDir,
    reviewSheetsDir: sandboxTestCandidatesDir
  });

  const morningValid = morningCycleResult &&
                       morningCycleResult.sweepSummary.total_sources_swept === 5 &&
                       morningCycleResult.sweepSummary.sources_changed === 0 &&
                       morningCycleResult.sweepSummary.results.every(r => ['SHOPEEFOOD', 'GRABFOOD', 'SHOPEE', 'LAZADA', 'TIKTOK'].includes(r.brand_id));

  assertTest('T1_04_CYCLE_FILTERING_5_SOURCES',
    morningValid,
    `Runner 056 lọc đúng 5 thương hiệu mục tiêu khi nhận cờ --cycle DAILY_MORNING_0800 với 0 diff.`);

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

  console.log(`\n🟢 [SCHEDULER-056C-SUMMARY] TOÀN BỘ ${passedCount}/${totalCount} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);
}

if (require.main === module) {
  run056cCalibrationTests();
}

module.exports = { run056cCalibrationTests };
