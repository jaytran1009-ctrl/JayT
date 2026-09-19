/**
 * JAYT COMPLETE AUTONOMOUS SUPPLY ENGINE RED-TEAM TEST SUITE (148)
 * Directive: JAYT-148: SCHEDULER REALITY, LINEAGE PRECISION & AUTONOMOUS ACQUISITION
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const { readMemoryStrict, isRejectedByNegativeFilter } = require('../05_DEAL_AND_AFFILIATE/jayt_autonomous_worker_148');

console.log('========================================================================');
console.log('🧪 JAYT-148: AUTONOMOUS SUPPLY ENGINE, LINEAGE PRECISION & SCHEDULER AUDIT');
console.log('========================================================================\n');

const repoRoot = path.resolve(__dirname, '..');
const runsBaseDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'runs');
const schedulerRunsDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'scheduler_runs');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const manifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_144_manifest.json');
const registryPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'autonomous_schedule_registry_148.json');
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

async function runSupplyEngine148Audit() {
  console.log('--- GATE 1: STATIC CODE SCAN (ZERO STATIC DICTIONARIES & ZERO STRING FALLBACKS) ---');
  test('Active pipeline contains zero static dictionary or string fallback patterns', () => {
    const targetDirs = [
      path.join(repoRoot, '05_DEAL_AND_AFFILIATE'),
      path.join(repoRoot, '07_QUALITY_ASSURANCE')
    ];
    const forbidden = ['leaf' + 'Semantics' + 'Map', 'expected_' + 'da_nang_' + 'verified', 'known_' + 'da_nang_' + 'venues'];
    for (const dir of targetDirs) {
      const files = fs.readdirSync(dir).filter(f => f.endsWith('.js') && !f.includes('quarantine') && !f.includes('test_supply_engine_148.js'));
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
  test('Windows Task Scheduler physically registers JAYT_AUTONOMOUS_SUPPLY_WORKER_148 with Last Result 0', () => {
    const taskName = 'JAYT_AUTONOMOUS_SUPPLY_WORKER_148';
    const queryCmd = `schtasks /query /tn "${taskName}" /fo LIST /v`;
    const queryOut = execSync(queryCmd, { encoding: 'utf8' });

    assert(queryOut.includes(taskName), 'TaskName not found in OS query');
    assert(queryOut.includes('Enabled') || queryOut.includes('Ready'), 'Task must be enabled/ready');
    assert(queryOut.includes('Last Result:                          0'), 'Last Run Result must be 0 (SUCCESS)');
    console.log('     Verified real OS Scheduled Task query: Task is Ready, Enabled, and Last Result is 0.');
  });

  console.log('\n--- GATE 3: SCHEDULED TASK ACTION VERIFICATION (--scheduled-cycle, NO --run-once) ---');
  test('Task action invokes --scheduled-cycle --origin OS_TRIGGERED and contains zero --run-once', () => {
    const taskName = 'JAYT_AUTONOMOUS_SUPPLY_WORKER_148';
    const queryCmd = `schtasks /query /tn "${taskName}" /fo LIST /v`;
    const queryOut = execSync(queryCmd, { encoding: 'utf8' });

    assert(queryOut.includes('--scheduled-cycle'), 'Task To Run must include --scheduled-cycle');
    assert(queryOut.includes('--origin OS_TRIGGERED'), 'Task To Run must include --origin OS_TRIGGERED');
    assert(!queryOut.includes('--run-once'), 'Task To Run must NOT include --run-once');
    console.log('     Verified task action: executes --scheduled-cycle --origin OS_TRIGGERED.');
  });

  console.log('\n--- GATE 4: SCHEDULED BATCH CAP & OS_TRIGGERED EXECUTION ORIGIN ---');
  test('OS-triggered scheduled cycle processed batch into immutable run dir with OS_TRIGGERED origin', () => {
    const runDirs = fs.readdirSync(runsBaseDir).filter(d => d.startsWith('RUN_'));
    assert(runDirs.length >= 5, `Expected at least 5 run directories, found ${runDirs.length}`);

    // Find the latest scheduled batch run
    const latestDirName = runDirs[runDirs.length - 1];
    const latestDirPath = path.join(runsBaseDir, latestDirName);
    const manifestFile = path.join(latestDirPath, 'RUN_MANIFEST.json');
    assert(fs.existsSync(manifestFile), `RUN_MANIFEST.json must exist in ${latestDirName}`);

    const manifest = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));
    assert.strictEqual(manifest.execution_mode, 'SCHEDULED_CYCLE');
    assert.strictEqual(manifest.execution_origin, 'OS_TRIGGERED');
    assert.strictEqual(manifest.summary.items_processed, 20);
    console.log(`     Verified OS_TRIGGERED batch: processed ${manifest.summary.items_processed} items into ${latestDirName}.`);
  });

  console.log('\n--- GATE 5: 6-STEP TAXONOMY & ERROR_OR_BLOCKED_SOURCE CLASSIFICATION ---');
  test('Error pages (404, anti-bot, timeout) are strictly classified as ERROR_OR_BLOCKED_SOURCE', () => {
    const runDirs = fs.readdirSync(runsBaseDir).filter(d => d.startsWith('RUN_'));
    const latestDirName = runDirs[runDirs.length - 1];
    const manifest = JSON.parse(fs.readFileSync(path.join(runsBaseDir, latestDirName, 'RUN_MANIFEST.json'), 'utf8'));

    const b = manifest.summary.classification_breakdown;
    const totalClassified = b.EVIDENCE_COMPLETE_FOR_REVIEW + b.INCOMPLETE_OFFER_EVIDENCE + b.SCOPE_UNPROVEN + b.NON_OFFER_PAGE_OR_SHELL + b.ERROR_OR_BLOCKED_SOURCE;
    assert.strictEqual(totalClassified, manifest.summary.items_processed, 'Classification sum must equal items processed');
    assert.strictEqual(b.ERROR_OR_BLOCKED_SOURCE, 7, 'Expected exactly 7 blocked/error sources');
    assert.strictEqual(b.NON_OFFER_PAGE_OR_SHELL, 13, 'Expected exactly 13 shell/non-offer pages');
    console.log(`     Verified classification taxonomy: ${manifest.summary.items_processed} == ${totalClassified} (Conservation 100%).`);
  });

  console.log('\n--- GATE 6: LINEAGE PRECISION & NEGATIVE FILTER REJECTION AUDIT ---');
  test('Negative filter rejects static files, API endpoints, empty anchor text, and generic index roots', () => {
    // 1. Static file extension rejection
    const testJs = isRejectedByNegativeFilter('https://cgv.vn/static/js/bundle.js', 'https://cgv.vn');
    assert.strictEqual(testJs.rejected, true);
    assert(testJs.reason.includes('STATIC_FILE_EXTENSION'));

    // 2. Generic index path rejection
    const testIndex = isRejectedByNegativeFilter('https://cgv.vn/khuyen-mai/', 'https://cgv.vn');
    assert.strictEqual(testIndex.rejected, true);
    assert(testIndex.reason.includes('GENERIC_INDEX_OR_CATEGORY_ROOT'));

    // 3. API endpoint rejection
    const testApi = isRejectedByNegativeFilter('https://cgv.vn/api/v1/promotions', 'https://cgv.vn');
    assert.strictEqual(testApi.rejected, true);

    // 4. Valid promo leaf accepted
    const testValid = isRejectedByNegativeFilter('https://cgv.vn/khuyen-mai/u22-happy-day', 'https://cgv.vn');
    assert.strictEqual(testValid.rejected, false);

    console.log('     Verified negative filter and lineage precision rules: 100% rejection compliance.');
  });

  console.log('\n--- GATE 7: STRICT RECONCILIATION INVARIANCE ---');
  test('Reconciliation formula initial_count + newly_discovered = final_count holds exactly', () => {
    const runDirs = fs.readdirSync(runsBaseDir).filter(d => d.startsWith('RUN_'));
    const latestDirName = runDirs[runDirs.length - 1];
    const manifest = JSON.parse(fs.readFileSync(path.join(runsBaseDir, latestDirName, 'RUN_MANIFEST.json'), 'utf8'));
    const reg = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

    const rec = manifest.reconciliation;
    assert.strictEqual(rec.is_reconciled, true);
    assert.strictEqual(rec.registry_initial_count + rec.new_valid_discovered_count, rec.registry_final_count);
    assert.strictEqual(reg.items.length, rec.registry_final_count, 'Registry total on disk must match manifest final count');
    console.log(`     Verified reconciliation invariance: ${rec.invariance_formula} (100% MATCH).`);
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
    console.log('✨ ALL 9 JAYT-148 AUTONOMOUS SUPPLY ENGINE RED-TEAM TESTS PASSED 100% CLEAN!');
    process.exit(0);
  }
}

if (require.main === module) {
  runSupplyEngine148Audit();
}

module.exports = {
  runSupplyEngine148Audit
};
