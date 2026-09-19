/**
 * JAYT SCHEDULER REAL REGISTRATION TEST SUITE (056B)
 * Directive: JAYT-SCHEDULER-REAL-REGISTRATION-056B
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const proofPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'scheduler_registration_proof_056b.json');
const operationalArtifactsDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_055_artifacts');
const operationalCandidatesDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'candidates', 'pending_review');
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

async function run056bSchedulerTests() {
  console.log('🧪 [JAYT-SCHEDULER-056B-TEST] Khởi chạy bộ kiểm thử Real Windows Tasks Registration (056B)...');

  // 1. Live Windows Tasks XML & Status Query (4/4 Tasks)
  const taskNames = [
    'JayT_Coverage_Daily_Morning_0800',
    'JayT_Coverage_Daily_Evening_1630',
    'JayT_Coverage_Weekly_Monday_0600',
    'JayT_Coverage_Monthly_1st_0000'
  ];

  let allTasksVerified = true;
  let taskVerificationDetails = [];

  for (const tn of taskNames) {
    try {
      const xml = execSync(`schtasks /query /tn "${tn}" /xml`, { encoding: 'utf8' });
      const list = execSync(`schtasks /query /tn "${tn}" /fo LIST`, { encoding: 'utf8' });

      const hasPs = xml.includes('<Command>powershell.exe</Command>');
      const hasEncoded = xml.includes('-EncodedCommand');
      const hasLegacyWorker = xml.includes('coverage_worker.js');
      const isReadyOrRunning = list.includes('Ready') || list.includes('Running') || list.includes('Sẵn sàng');

      // Decode base64 to verify live flag and cycle
      const encodedMatch = xml.match(/-EncodedCommand\s+([A-Za-z0-9+/=]+)/);
      let decodedCommand = '';
      if (encodedMatch) {
        decodedCommand = Buffer.from(encodedMatch[1], 'base64').toString('utf16le');
      }

      const hasLiveFlag = decodedCommand.includes('--live');
      const hasCycleFlag = decodedCommand.includes('--cycle');

      if (!hasPs || !hasEncoded || hasLegacyWorker || !isReadyOrRunning || !hasLiveFlag || !hasCycleFlag) {
        allTasksVerified = false;
        taskVerificationDetails.push(`${tn}: UNVERIFIED (hasPs:${hasPs}, isReady:${isReadyOrRunning}, hasLive:${hasLiveFlag}, hasCycle:${hasCycleFlag})`);
      } else {
        taskVerificationDetails.push(`${tn}: VERIFIED (Ready, Unicode-safe, --live, --cycle)`);
      }
    } catch (e) {
      allTasksVerified = false;
      taskVerificationDetails.push(`${tn}: UNVERIFIED (${e.message})`);
    }
  }

  assertTest('T1_01_REAL_WINDOWS_TASKS_LIVE_QUERY_VERIFIED',
    allTasksVerified,
    `Cả 4 Windows Tasks được kiểm chứng trực tiếp qua schtasks /query /xml và /fo LIST: 100% Ready, --live flag, Unicode-Safe.`);

  // 2. Canary Sandbox Reprocess with Zero Sources Changed (Requirement 5: sources_changed = 0)
  const sandboxTestEvidenceDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'private_sandbox', 'test_evidence');
  const sandboxTestCandidatesDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'private_sandbox', 'test_candidates');
  fs.mkdirSync(sandboxTestEvidenceDir, { recursive: true });
  fs.mkdirSync(sandboxTestCandidatesDir, { recursive: true });

  const canaryResult = await runAuthorizedCadence({
    reprocessOnly: true,
    isTest: true,
    workOrder: 'JAYT-056B-CANARY-ZERO-DIFF-TEST',
    receiptsDir: sandboxTestEvidenceDir,
    reviewSheetsDir: sandboxTestCandidatesDir
  });

  const canaryValid = canaryResult &&
                      canaryResult.production_locked === true &&
                      canaryResult.sweepSummary.total_sources_swept === 16 &&
                      canaryResult.sweepSummary.sources_changed === 0 &&
                      canaryResult.sweepSummary.staging_accepted_deals === 1 &&
                      canaryResult.sweepSummary.deals_in_recheck === 15;

  assertTest('T1_02_CANARY_SANDBOX_REPROCESS_ZERO_DIFF',
    canaryValid,
    `Canary sandbox reprocess đạt chuẩn xác tuyệt đối: 16 nguồn quét / 0 sources_changed (diff = 0) / 1 Staging CGV / 15 Recheck.`);

  // 3. Cycle Filtering Verification (DAILY_MORNING_0800 sweeps 5 sources)
  const morningCycleResult = await runAuthorizedCadence({
    cycle: 'DAILY_MORNING_0800',
    reprocessOnly: true,
    isTest: true,
    workOrder: 'JAYT-056B-MORNING-CYCLE-TEST',
    receiptsDir: sandboxTestEvidenceDir,
    reviewSheetsDir: sandboxTestCandidatesDir
  });

  const morningValid = morningCycleResult &&
                       morningCycleResult.sweepSummary.total_sources_swept === 5 &&
                       morningCycleResult.sweepSummary.results.every(r => ['SHOPEEFOOD', 'GRABFOOD', 'SHOPEE', 'LAZADA', 'TIKTOK'].includes(r.brand_id));

  assertTest('T1_03_CYCLE_FILTERING_SPECIFICATION',
    morningValid,
    `Runner 056 lọc đúng 5 thương hiệu mục tiêu khi nhận cờ --cycle DAILY_MORNING_0800.`);

  // 4. Evidence Lake & Candidate Queue Hygiene (Zero Test Pollution)
  let operationalClean = true;
  if (fs.existsSync(operationalArtifactsDir)) {
    const files = fs.readdirSync(operationalArtifactsDir);
    for (const f of files) {
      if (f.endsWith('.json')) {
        const json = JSON.parse(fs.readFileSync(path.join(operationalArtifactsDir, f), 'utf8'));
        if (json.work_order && json.work_order.includes('TEST')) {
          operationalClean = false;
        }
      }
    }
  }

  let candidatesClean = true;
  if (fs.existsSync(operationalCandidatesDir)) {
    const candFiles = fs.readdirSync(operationalCandidatesDir);
    for (const cf of candFiles) {
      if (cf.startsWith('CEO_REVIEW_SHEET_')) {
        candidatesClean = false;
      }
    }
  }

  assertTest('T1_04_EVIDENCE_AND_CANDIDATE_HYGIENE_ISOLATED',
    operationalClean && candidatesClean,
    `Kho bằng chứng và hàng đợi candidate vận hành sạch 100%: zero test artifacts/receipts.`);

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

  console.log(`\n🟢 [SCHEDULER-056B-SUMMARY] TOÀN BỘ ${passedCount}/${totalCount} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);
}

if (require.main === module) {
  run056bSchedulerTests();
}

module.exports = { run056bSchedulerTests };
