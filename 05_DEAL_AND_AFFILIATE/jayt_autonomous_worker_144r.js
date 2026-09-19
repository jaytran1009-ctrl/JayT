/**
 * JAYT REAL AUTONOMOUS WORKER & ORCHESTRATOR (144R)
 * Directive: JAYT-144R: CÀI ĐẶT SCHEDULER THẬT, END-TO-END SMOKE RUN VÀ KHÔI PHỤC AUTONOMY
 * 
 * CORE MANDATES:
 * 1. Process Lock with TTL & Stale Lock Recovery Logging.
 * 2. Strict PROJECT_MEMORY.md reading with ZERO fallback versions (explicit UNPROVEN on failure).
 * 3. Actual execution of capture harness (never dry-run-only).
 * 4. Append-only worker execution receipts.
 * 5. Supports --run-once for end-to-end smoke verification.
 * 6. Hard-locked production: Zero auto-deploy, zero synthetic deals.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const puppeteer = require('puppeteer');
const { captureSingleUrlNative } = require('./native_event_capture_harness_143r');
const { verifyStrictRawCaptureReceipt143R } = require('./strict_receipt_truth_verifier_143r');

const repoRoot = path.resolve(__dirname, '..');
const lockFilePath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'scheduler_worker.lock');
const runsLogDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'scheduler_runs');
const memoryFilePath = path.join(repoRoot, 'PROJECT_MEMORY.md');
const queuePath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_144_queue.json');

const LOCK_TTL_MS = 30 * 60 * 1000; // 30 minutes TTL

function acquireLock() {
  fs.mkdirSync(runsLogDir, { recursive: true });
  const now = Date.now();

  if (fs.existsSync(lockFilePath)) {
    try {
      const lockData = JSON.parse(fs.readFileSync(lockFilePath, 'utf8'));
      const lockAge = now - new Date(lockData.acquired_at).getTime();

      let isProcessAlive = false;
      if (lockData.pid) {
        try {
          process.kill(lockData.pid, 0);
          isProcessAlive = true;
        } catch (_) {
          isProcessAlive = false;
        }
      }

      if (isProcessAlive && lockAge < LOCK_TTL_MS) {
        console.error(`⚠️ [WORKER-LOCK] Active worker already running (PID: ${lockData.pid}, Age: ${Math.round(lockAge / 1000)}s). Aborting concurrent run.`);
        return { acquired: false, reason: 'CONCURRENT_EXECUTION_BLOCKED' };
      }

      // Stale lock detected (either dead PID or expired TTL)
      const staleReceipt = {
        incident: 'STALE_LOCK_RECOVERED',
        recovered_at: new Date().toISOString(),
        previous_lock_data: lockData,
        stale_reason: !isProcessAlive ? 'PROCESS_DEAD' : 'TTL_EXPIRED'
      };
      fs.writeFileSync(
        path.join(runsLogDir, `INCIDENT_STALE_LOCK_${now}.json`),
        JSON.stringify(staleReceipt, null, 2),
        'utf8'
      );
      console.log(`ℹ️ [WORKER-LOCK] Stale lock recovered (Reason: ${staleReceipt.stale_reason}).`);
    } catch (_) {}
  }

  const newLock = {
    worker_identifier: 'JAYT_AUTONOMOUS_SUPPLY_SCHEDULER_144',
    pid: process.pid,
    acquired_at: new Date().toISOString()
  };
  fs.writeFileSync(lockFilePath, JSON.stringify(newLock, null, 2), 'utf8');
  return { acquired: true };
}

function releaseLock() {
  if (fs.existsSync(lockFilePath)) {
    try {
      fs.unlinkSync(lockFilePath);
    } catch (_) {}
  }
}

/**
 * Strict Project Memory Reader without synthetic version defaults
 */
function readMemoryStrict() {
  if (!fs.existsSync(memoryFilePath)) {
    return {
      version: 'MEMORY_VERSION_UNPROVEN',
      sha256: 'MEMORY_SHA256_UNPROVEN',
      is_valid: false
    };
  }

  try {
    const content = fs.readFileSync(memoryFilePath, 'utf8');
    const versionMatch = content.match(/(?:Version|TRANSACTION:[^\(]*\()\s*([0-9]+\.[0-9]+\.[0-9]+)/i);
    const version = versionMatch ? versionMatch[1] : 'MEMORY_VERSION_UNPROVEN';
    const sha = crypto.createHash('sha256').update(content).digest('hex');

    return {
      version,
      sha256: sha,
      is_valid: version !== 'MEMORY_VERSION_UNPROVEN'
    };
  } catch (_) {
    return {
      version: 'MEMORY_VERSION_UNPROVEN',
      sha256: 'MEMORY_SHA256_UNPROVEN',
      is_valid: false
    };
  }
}

/**
 * Executes a real smoke run on selected targets
 */
async function executeSmokeRun144R() {
  console.log('========================================================================');
  console.log('🚀 JAYT-144R: EXECUTING REAL AUTONOMOUS SMOKE RUN (--run-once)');
  console.log('========================================================================\n');

  const lockRes = acquireLock();
  if (!lockRes.acquired) {
    return { status: 'LOCKED_CONCURRENT_BLOCKED', exit_code: 1 };
  }

  const runId = `RUN_SMOKE_144R_${Date.now()}`;
  const smokeOutputDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_144r_smoke_captures');
  fs.mkdirSync(smokeOutputDir, { recursive: true });

  try {
    // 1. Read Project Memory
    const memory = readMemoryStrict();
    console.log(`📖 Read Memory: Version=${memory.version}, SHA=${memory.sha256.substring(0, 12)}...`);

    if (!memory.is_valid) {
      throw new Error(`Project Memory validation failed: ${memory.version}`);
    }

    // 2. Select 2 Smoke targets from queue (1 Locator, 1 Offer Leaf)
    const queue = JSON.parse(fs.readFileSync(queuePath, 'utf8'));
    const smokeLocator = queue.items.find(i => i.capture_id === 'CAP_144_A_05') || queue.items[0]; // Starlight Locator
    const smokeLeaf = queue.items.find(i => i.capture_id === 'CAP_144_B_13') || queue.items[1];   // Starlight Leaf

    const smokeTargets = [smokeLocator, smokeLeaf];
    console.log(`🎯 Selected Smoke Targets: ${smokeTargets.map(t => `${t.capture_id} (${t.brand_name})`).join(', ')}`);

    // 3. Launch Certified Native Browser
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });

    const captureResults = [];

    for (let i = 0; i < smokeTargets.length; i++) {
      const target = smokeTargets[i];
      const targetDir = path.join(smokeOutputDir, target.capture_id);
      console.log(`[${i + 1}/${smokeTargets.length}] Capturing ${target.capture_id} -> ${target.url}`);
      const res = await captureSingleUrlNative(browser, target, targetDir, runId);
      const verifiedReceipt = verifyStrictRawCaptureReceipt143R(targetDir);
      captureResults.push({
        target,
        capture_result: res,
        verified_receipt: verifiedReceipt
      });
    }

    await browser.close();

    // 4. Emit Worker Run Receipt
    const workerReceipt = {
      run_id: runId,
      worker_identifier: 'JAYT_AUTONOMOUS_SUPPLY_SCHEDULER_144',
      execution_mode: 'SMOKE_RUN_REAL_CAPTURE',
      executed_at: new Date().toISOString(),
      project_memory_verified: memory,
      smoke_targets_count: smokeTargets.length,
      captures: captureResults.map(cr => ({
        capture_id: cr.target.capture_id,
        brand_name: cr.target.brand_name,
        requested_url: cr.target.url,
        final_url: cr.verified_receipt.final_url,
        http_status: cr.verified_receipt.http_status,
        receipt_status: cr.verified_receipt.status,
        html_sha256: cr.verified_receipt.fresh_hashes?.html_sha256,
        is_trusted: cr.verified_receipt.is_receipt_trusted
      })),
      governance_status: 'PRODUCTION_LOCKED_PENDING_CEO_APPROVAL',
      exit_code: 0
    };

    const workerReceiptPath = path.join(runsLogDir, `RECEIPT_${runId}.json`);
    fs.writeFileSync(workerReceiptPath, JSON.stringify(workerReceipt, null, 2), 'utf8');

    console.log('\n========================================================================');
    console.log('✅ REAL SMOKE RUN COMPLETED SUCCESSFULLY (EXIT CODE: 0)');
    console.log(`- Run ID: ${runId}`);
    console.log(`- Worker Receipt: ${workerReceiptPath}`);
    console.log(`- Output Folder: ${smokeOutputDir}`);
    console.log('========================================================================\n');

    return {
      status: 'SUCCESS',
      exit_code: 0,
      run_id: runId,
      worker_receipt_path: workerReceiptPath,
      worker_receipt: workerReceipt,
      smoke_output_dir: smokeOutputDir
    };
  } finally {
    releaseLock();
  }
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.includes('--run-once')) {
    executeSmokeRun144R().then(res => process.exit(res.exit_code));
  } else {
    executeSmokeRun144R().then(res => process.exit(res.exit_code));
  }
}

module.exports = {
  acquireLock,
  releaseLock,
  readMemoryStrict,
  executeSmokeRun144R
};
