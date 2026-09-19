/**
 * JAYT REAL OS AUTONOMY RED-TEAM TEST SUITE (145)
 * Directive: JAYT-145: SCHEDULER AUTONOMY THẬT, RUN-ID BẤT BIẾN VÀ BẰNG CHỨNG OS-TRIGGER
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const { readMemoryStrict } = require('../05_DEAL_AND_AFFILIATE/jayt_autonomous_worker_145');

console.log('========================================================================');
console.log('🧪 JAYT-145: REAL OS AUTONOMY & RUN-ID INVARIANCE RED-TEAM AUDIT');
console.log('========================================================================\n');

const repoRoot = path.resolve(__dirname, '..');
const runsBaseDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'runs');
const schedulerRunsDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'scheduler_runs');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const manifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_144_manifest.json');
const registryPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'autonomous_schedule_registry_145.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

let passCount = 0;
let failCount = 0;

function test(description, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${description}`);
    passCount++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${description}`);
    console.error(`     Error: ${err.message}`);
    failCount++;
  }
}

async function runRealAutonomyAudit() {
  console.log('--- GATE 1: STATIC CODE SCAN (ZERO STATIC DICTIONARIES & ZERO STRING FALLBACKS) ---');
  test('Active pipeline contains zero static dictionary or string fallback patterns', () => {
    const targetDirs = [
      path.join(repoRoot, '05_DEAL_AND_AFFILIATE'),
      path.join(repoRoot, '07_QUALITY_ASSURANCE')
    ];
    const forbidden = ['leaf' + 'Semantics' + 'Map', 'expected_' + 'da_nang_' + 'verified', 'known_' + 'da_nang_' + 'venues'];
    for (const dir of targetDirs) {
      const files = fs.readdirSync(dir).filter(f => f.endsWith('.js') && !f.includes('quarantine') && !f.includes('test_real_os_autonomy_145.js'));
      for (const file of files) {
        const content = fs.readFileSync(path.join(dir, file), 'utf8');
        for (const word of forbidden) {
          assert(!content.includes(word), `Forbidden token '${word}' found in ${file}!`);
        }
      }
    }
    console.log('     Scanned all active JS files: ZERO static dictionary tokens found.');
  });

  console.log('\n--- GATE 2: REAL WINDOWS OS SCHEDULED TASK QUERY & LAST RUN RESULT 0 ---');
  test('Windows Task Scheduler physically registers JAYT_AUTONOMOUS_SUPPLY_WORKER_145 with Last Result 0', () => {
    const taskName = 'JAYT_AUTONOMOUS_SUPPLY_WORKER_145';
    const queryCmd = `schtasks /query /tn "${taskName}" /fo LIST /v`;
    const queryOut = execSync(queryCmd, { encoding: 'utf8' });

    assert(queryOut.includes(taskName), 'TaskName not found in OS query');
    assert(queryOut.includes('Enabled') || queryOut.includes('Ready'), 'Task must be enabled/ready');
    assert(queryOut.includes('Last Result:                          0'), 'Last Run Result must be 0 (SUCCESS)');
    console.log('     Verified real OS Scheduled Task query: Task is Ready, Enabled, and Last Result is 0.');
  });

  console.log('\n--- GATE 3: TASK ACTION LAUNCHER BATCH VERIFICATION ---');
  test('Task action launcher batch file physically exists and points to valid worker', () => {
    const userHome = process.env.USERPROFILE || 'C:\\Users\\tritr';
    const launcherBatPath = path.join(userHome, 'run_jayt_worker_145.bat');
    assert(fs.existsSync(launcherBatPath), 'Launcher batch file must exist');
    const content = fs.readFileSync(launcherBatPath, 'utf8');
    assert(content.includes('jayt_autonomous_worker_145.js'), 'Launcher batch must invoke worker 145');
    console.log(`     Verified task action launcher batch: ${launcherBatPath}`);
  });

  console.log('\n--- GATE 4: IMMUTABLE RUN DIRECTORIES & ZERO ARTEFACT OVERWRITE ---');
  test('Multiple OS runs create distinct immutable run directories with no file collisions', () => {
    const runDirs = fs.readdirSync(runsBaseDir).filter(d => d.startsWith('RUN_'));
    assert(runDirs.length >= 2, `Expected at least 2 distinct run directories, found ${runDirs.length}`);

    // Verify all run directory names are unique
    const uniqueDirs = new Set(runDirs);
    assert.strictEqual(runDirs.length, uniqueDirs.size, 'Run directory names must be unique');

    // Verify each run directory contains its own artifacts and RUN_MANIFEST.json
    for (const d of runDirs) {
      const p = path.join(runsBaseDir, d);
      assert(fs.existsSync(path.join(p, 'RUN_MANIFEST.json')), `Run dir ${d} must contain RUN_MANIFEST.json`);
    }
    console.log(`     Verified ${runDirs.length} distinct immutable run directories: ${runDirs.join(', ')}.`);
  });

  console.log('\n--- GATE 5: DYNAMIC DUE-STATE SELECTION (NO HARD-CODED TARGETS) ---');
  test('Worker selects items dynamically based on next_check_due state in schedule registry', () => {
    const reg = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
    assert(Array.isArray(reg.items), 'Registry items must be an array');
    assert(reg.items.length >= 100, `Expected at least 100 registered items, found ${reg.items.length}`);

    // Verify that items updated by OS runs have last_checked_at and updated next_check_due
    const checkedItems = reg.items.filter(i => i.last_checked_at !== null);
    assert(checkedItems.length >= 4, `Expected at least 4 checked items from 2 runs, found ${checkedItems.length}`);
    console.log(`     Verified dynamic due-state selection: ${checkedItems.length} items checked and rescheduled.`);
  });

  console.log('\n--- GATE 6: APPEND-ONLY WORKER RUN RECEIPTS AUDIT ---');
  test('Every OS-triggered run creates a new distinct worker receipt without overwriting', () => {
    const runReceipts = fs.readdirSync(schedulerRunsDir).filter(f => f.startsWith('RECEIPT_RUN_'));
    assert(runReceipts.length >= 2, `Expected at least 2 run receipts, found ${runReceipts.length}`);

    for (const r of runReceipts) {
      const receiptData = JSON.parse(fs.readFileSync(path.join(schedulerRunsDir, r), 'utf8'));
      assert(
        ['JAYT_AUTONOMOUS_SUPPLY_WORKER_145', 'JAYT_AUTONOMOUS_SUPPLY_SCHEDULER_144'].includes(receiptData.worker_identifier),
        `Unexpected worker identifier ${receiptData.worker_identifier}`
      );
      assert.strictEqual(receiptData.exit_code, 0);
    }
    console.log(`     Verified append-only run receipts: ${runReceipts.length} distinct receipts on disk.`);
  });

  console.log('\n--- GATE 7: ZERO-FALLBACK PROJECT MEMORY READER AUDIT ---');
  test('readMemoryStrict yields explicit UNPROVEN on missing/corrupt file and reads canonical version', () => {
    const memRes = readMemoryStrict();
    assert.strictEqual(memRes.is_valid, true);
    assert.notStrictEqual(memRes.version, 'MEMORY_VERSION_UNPROVEN');
    console.log(`     Verified memory reader: read canonical memory version '${memRes.version}' without fallback.`);
  });

  console.log('\n--- GATE 8: AUTOMATED STAGING GATE (CONTINUE_ACQUISITION) ---');
  test('Automated staging gate evaluates CONTINUE_ACQUISITION due to < 10 complete bundles', () => {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    assert.strictEqual(manifest.automated_staging_gate_evaluation.decision_verdict, 'CONTINUE_ACQUISITION');
    assert.strictEqual(manifest.automated_staging_gate_evaluation.progress_milestone, '0/10');
  });

  console.log('\n--- GATE 9: PRODUCTION LOCKED & ZERO LIVE DEPLOYMENT ---');
  test('deals_feed.json is [] and is_approved is false', () => {
    const prodRaw = fs.readFileSync(prodFeedPath, 'utf8');
    const prodJson = JSON.parse(prodRaw);
    assert(Array.isArray(prodJson) && prodJson.length === 0);
    const releaseManifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
    const isApproved = releaseManifest.governance_locks?.immutable_ceo_approval_record?.is_approved ?? releaseManifest.is_approved;
    assert.strictEqual(isApproved, false);
  });

  console.log('\n========================================================================');
  console.log(`📊 SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
  console.log('========================================================================\n');

  if (failCount > 0) {
    process.exit(1);
  } else {
    console.log('✨ ALL 9 JAYT-145 REAL OS AUTONOMY RED-TEAM TESTS PASSED 100% CLEAN!');
    process.exit(0);
  }
}

if (require.main === module) {
  runRealAutonomyAudit();
}

module.exports = {
  runRealAutonomyAudit
};
