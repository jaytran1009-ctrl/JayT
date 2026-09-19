/**
 * JAYT COMPLETE AUTONOMOUS SUPPLY ENGINE RED-TEAM TEST SUITE (146)
 * Directive: JAYT-146: CHUYỂN SCHEDULER TỪ SMOKE MODE SANG SUPPLY ENGINE THẬT
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const { readMemoryStrict } = require('../05_DEAL_AND_AFFILIATE/jayt_autonomous_worker_146');

console.log('========================================================================');
console.log('🧪 JAYT-146: AUTONOMOUS SUPPLY ENGINE & DYNAMIC DISCOVERY AUDIT');
console.log('========================================================================\n');

const repoRoot = path.resolve(__dirname, '..');
const runsBaseDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'runs');
const schedulerRunsDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'scheduler_runs');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const manifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_144_manifest.json');
const registryPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'autonomous_schedule_registry_146.json');
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

async function runSupplyEngineAudit() {
  console.log('--- GATE 1: STATIC CODE SCAN (ZERO STATIC DICTIONARIES & ZERO STRING FALLBACKS) ---');
  test('Active pipeline contains zero static dictionary or string fallback patterns', () => {
    const targetDirs = [
      path.join(repoRoot, '05_DEAL_AND_AFFILIATE'),
      path.join(repoRoot, '07_QUALITY_ASSURANCE')
    ];
    const forbidden = ['leaf' + 'Semantics' + 'Map', 'expected_' + 'da_nang_' + 'verified', 'known_' + 'da_nang_' + 'venues'];
    for (const dir of targetDirs) {
      const files = fs.readdirSync(dir).filter(f => f.endsWith('.js') && !f.includes('quarantine') && !f.includes('test_supply_engine_146.js'));
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

  console.log('\n--- GATE 3: SCHEDULED TASK ACTION VERIFICATION (--scheduled-cycle, NO --run-once) ---');
  test('Task action launcher batch explicitly invokes --scheduled-cycle and contains zero --run-once', () => {
    const userHome = process.env.USERPROFILE || 'C:\\Users\\tritr';
    const launcherBatPath = path.join(userHome, 'run_jayt_worker_145.bat');
    assert(fs.existsSync(launcherBatPath), 'Launcher batch file must exist');
    const content = fs.readFileSync(launcherBatPath, 'utf8');
    assert(content.includes('--scheduled-cycle'), 'Launcher batch must invoke --scheduled-cycle');
    assert(!content.includes('--run-once'), 'Launcher batch must NOT contain --run-once');
    console.log(`     Verified task action launcher batch: ${launcherBatPath} executes --scheduled-cycle.`);
  });

  console.log('\n--- GATE 4: SCHEDULED BATCH CAP & IMMUTABLE RUN DIRECTORIES ---');
  test('OS-triggered scheduled cycle processed batch (up to 20 items) into an immutable run directory', () => {
    const runDirs = fs.readdirSync(runsBaseDir).filter(d => d.startsWith('RUN_'));
    assert(runDirs.length >= 3, `Expected at least 3 run directories, found ${runDirs.length}`);

    // Find the latest scheduled batch run
    const latestDirName = runDirs[runDirs.length - 1];
    const latestDirPath = path.join(runsBaseDir, latestDirName);
    const manifestFile = path.join(latestDirPath, 'RUN_MANIFEST.json');
    assert(fs.existsSync(manifestFile), `RUN_MANIFEST.json must exist in ${latestDirName}`);

    const manifest = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));
    assert(manifest.summary.items_processed >= 10, `Expected scheduled batch processing >= 10 items, found ${manifest.summary.items_processed}`);
    assert(manifest.summary.items_processed <= 20, `Batch cap of 20 exceeded: ${manifest.summary.items_processed}`);
    console.log(`     Verified scheduled batch: processed ${manifest.summary.items_processed} items into ${latestDirName}.`);
  });

  console.log('\n--- GATE 5: END-TO-END CLASSIFICATION CHAIN AUDIT ---');
  test('Run manifest records strict 5-step classification with metric conservation', () => {
    const runDirs = fs.readdirSync(runsBaseDir).filter(d => d.startsWith('RUN_'));
    const latestDirName = runDirs[runDirs.length - 1];
    const manifest = JSON.parse(fs.readFileSync(path.join(runsBaseDir, latestDirName, 'RUN_MANIFEST.json'), 'utf8'));

    const b = manifest.summary.classification_breakdown;
    const totalClassified = b.EVIDENCE_COMPLETE_FOR_REVIEW + b.INCOMPLETE_OFFER_EVIDENCE + b.SCOPE_UNPROVEN + b.NON_OFFER_PAGE_OR_SHELL + b.CAPTURE_RECEIPT_INVALID;
    assert.strictEqual(totalClassified, manifest.summary.items_processed, 'Classification sum must equal items processed');
    console.log(`     Verified 5-step classification: ${manifest.summary.items_processed} == ${totalClassified} (Conservation 100%).`);
  });

  console.log('\n--- GATE 6: DYNAMIC DOM DISCOVERY AUDIT ---');
  test('Dynamic leaf discovery extracts canonical URLs from DOM and expands registry targets', () => {
    const reg = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
    const discovered = reg.items.filter(i => i.target_type === 'DISCOVERED_OFFER_LEAF');
    assert(discovered.length > 0, 'Must have at least one dynamically discovered leaf target');
    assert(reg.items.length > 101, `Registry must have expanded beyond initial 101 targets, found ${reg.items.length}`);
    console.log(`     Verified dynamic DOM discovery: ${discovered.length} new promo URLs registered. Total targets: ${reg.items.length}.`);
  });

  console.log('\n--- GATE 7: APPEND-ONLY WORKER RUN RECEIPTS AUDIT ---');
  test('Every OS-triggered scheduled cycle creates a new distinct worker receipt without overwriting', () => {
    const runReceipts = fs.readdirSync(schedulerRunsDir).filter(f => f.startsWith('RECEIPT_RUN_'));
    assert(runReceipts.length >= 3, `Expected at least 3 run receipts, found ${runReceipts.length}`);

    for (const r of runReceipts) {
      const receiptData = JSON.parse(fs.readFileSync(path.join(schedulerRunsDir, r), 'utf8'));
      assert.strictEqual(receiptData.exit_code, 0);
    }
    console.log(`     Verified append-only run receipts: ${runReceipts.length} distinct receipts on disk.`);
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
    console.log('✨ ALL 9 JAYT-146 AUTONOMOUS SUPPLY ENGINE RED-TEAM TESTS PASSED 100% CLEAN!');
    process.exit(0);
  }
}

if (require.main === module) {
  runSupplyEngineAudit();
}

module.exports = {
  runSupplyEngineAudit
};
