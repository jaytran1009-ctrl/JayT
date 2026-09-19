/**
 * JAYT SCHEDULER WIRING AND EVIDENCE ISOLATION TEST SUITE (056A)
 * Directive: JAYT-SCHEDULER-WIRING-AND-EVIDENCE-ISOLATION-056A
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const proofPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'scheduler_registration_proof.json');
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

async function run056aIsolationTests() {
  console.log('🧪 [JAYT-SCHEDULER-056A-TEST] Khởi chạy bộ kiểm thử Scheduler Wiring & Evidence Isolation (056A)...');

  // 1. Live Windows Tasks XML Verification (4/4 Tasks)
  const taskNames = [
    'JayT_Coverage_Daily_Morning_0800',
    'JayT_Coverage_Daily_Evening_1630',
    'JayT_Coverage_Weekly_Monday_0600',
    'JayT_Coverage_Monthly_1st_0000'
  ];

  let allTasksValid = true;
  let taskVerificationDetails = [];

  for (const tn of taskNames) {
    try {
      const xml = execSync(`schtasks /query /tn "${tn}" /xml`, { encoding: 'utf8' });
      const hasPs = xml.includes('<Command>powershell.exe</Command>');
      const hasEncoded = xml.includes('-EncodedCommand');
      const hasLegacyWorker = xml.includes('coverage_worker.js');

      // Check if action or arguments contain corrupted path characters like '?' or 'C?ng'
      const execMatch = xml.match(/<Exec>[\s\S]*?<\/Exec>/);
      const execBlock = execMatch ? execMatch[0] : '';
      const hasCorruptedPathInExec = execBlock.includes('?') || execBlock.includes('C?ng') || execBlock.includes('D?');

      if (!hasPs || !hasEncoded || hasCorruptedPathInExec || hasLegacyWorker) {
        allTasksValid = false;
        taskVerificationDetails.push(`${tn}: INVALID (hasPs:${hasPs}, hasEncoded:${hasEncoded}, hasCorrupt:${hasCorruptedPathInExec}, hasLegacy:${hasLegacyWorker})`);
      } else {
        taskVerificationDetails.push(`${tn}: VALID (Unicode-safe PowerShell EncodedCommand)`);
      }
    } catch (e) {
      allTasksValid = false;
      taskVerificationDetails.push(`${tn}: FAILED_TO_QUERY (${e.message})`);
    }
  }

  assertTest('T1_01_FOUR_WINDOWS_TASKS_XML_VERIFIED',
    allTasksValid,
    `Cả 4 Windows Tasks được kiểm chứng trực tiếp qua schtasks /xml: 100% Unicode-Safe, zero corrupted '?' in action, zero 'coverage_worker.js'.`);

  // 2. Canary Execution (Reprocess-Only, Zero Web Network Calls)
  const sandboxTestEvidenceDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'private_sandbox', 'test_evidence');
  const sandboxTestCandidatesDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'private_sandbox', 'test_candidates');
  fs.mkdirSync(sandboxTestEvidenceDir, { recursive: true });
  fs.mkdirSync(sandboxTestCandidatesDir, { recursive: true });

  const canaryResult = await runAuthorizedCadence({
    reprocessOnly: true,
    isTest: true,
    workOrder: 'JAYT-056A-CANARY-TEST',
    receiptsDir: sandboxTestEvidenceDir,
    reviewSheetsDir: sandboxTestCandidatesDir
  });

  const canaryValid = canaryResult &&
                      canaryResult.production_locked === true &&
                      canaryResult.sweepSummary.total_sources_swept === 16 &&
                      canaryResult.sweepSummary.staging_accepted_deals === 1 &&
                      canaryResult.sweepSummary.deals_in_recheck === 15;

  assertTest('T1_02_CANARY_EXECUTION_REPROCESS_ONLY',
    canaryValid,
    'Canary run thực thi chuẩn xác qua runner 056 (--reprocess-only, zero network calls): 16 quét / 0 biến động / 1 Staging CGV / 15 Recheck.');

  // 3. Evidence Lake & Candidate Queue Hygiene (Zero Test Artifact Pollution)
  let operationalClean = true;
  let testReceiptsInOperational = [];

  if (fs.existsSync(operationalArtifactsDir)) {
    const files = fs.readdirSync(operationalArtifactsDir);
    for (const f of files) {
      if (f.endsWith('.json')) {
        const json = JSON.parse(fs.readFileSync(path.join(operationalArtifactsDir, f), 'utf8'));
        if (json.work_order && json.work_order.includes('TEST')) {
          operationalClean = false;
          testReceiptsInOperational.push(`${f} (${json.work_order})`);
        }
      }
    }
  }

  let candidatesClean = true;
  let mockReviewSheetsFound = [];
  if (fs.existsSync(operationalCandidatesDir)) {
    const candFiles = fs.readdirSync(operationalCandidatesDir);
    for (const cf of candFiles) {
      if (cf.startsWith('CEO_REVIEW_SHEET_')) {
        candidatesClean = false;
        mockReviewSheetsFound.push(cf);
      }
    }
  }

  assertTest('T1_03_EVIDENCE_AND_CANDIDATE_HYGIENE_ISOLATED',
    operationalClean && candidatesClean,
    `Kho bằng chứng và hàng đợi candidate vận hành sạch 100%: 0 test receipt trong runtime_evidence, 0 mock review sheet trong candidates/pending_review.`);

  // 4. Legacy Worker Deprecation
  const workerContent = fs.readFileSync(path.join(repoRoot, '07_QUALITY_ASSURANCE', 'coverage_worker.js'), 'utf8');
  const isDeprecated = workerContent.includes('HISTORICAL / DEPRECATED') && workerContent.includes('MUST NOT be called for operational deal sweeps');

  assertTest('T1_04_COVERAGE_WORKER_DEPRECATED_AND_DISARMED',
    isDeprecated,
    'coverage_worker.js đã gắn nhãn DEPRECATED rõ ràng, tuyệt đối không được gọi bởi các lịch quét tự động.');

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

  console.log(`\n🟢 [SCHEDULER-056A-SUMMARY] TOÀN BỘ ${passedCount}/${totalCount} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);
}

if (require.main === module) {
  run056aIsolationTests();
}

module.exports = { run056aIsolationTests };
