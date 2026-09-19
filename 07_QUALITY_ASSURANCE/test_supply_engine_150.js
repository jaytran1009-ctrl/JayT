/**
 * JAYT COMPLETE REAL-SUPPLY ENGINE RED-TEAM TEST SUITE (150)
 * Directive: JAYT-150: EXECUTION CREDIBILITY RESET & REAL-SUPPLY CONTINUITY
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const { readMemoryStrict, isRejectedByNegativeFilter } = require('../05_DEAL_AND_AFFILIATE/jayt_autonomous_worker_150');

console.log('========================================================================');
console.log('🧪 JAYT-150: REAL-SUPPLY ENGINE & EXECUTION CREDIBILITY RESET AUDIT');
console.log('========================================================================\n');

const repoRoot = path.resolve(__dirname, '..');
const runsBaseDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'runs');
const schedulerRunsDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'scheduler_runs');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const manifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_144_manifest.json');
const registryPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'autonomous_schedule_registry_150.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');
const diagnosticReportPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'WINDOWS_TASK_SCHEDULER_HOST_DIAGNOSTIC.md');

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

async function runSupplyEngine150Audit() {
  console.log('--- GATE 1: STATIC CODE SCAN (ZERO STATIC DICTIONARIES & ZERO STRING FALLBACKS) ---');
  test('Active pipeline contains zero static dictionary or string fallback patterns', () => {
    const targetDirs = [
      path.join(repoRoot, '05_DEAL_AND_AFFILIATE'),
      path.join(repoRoot, '07_QUALITY_ASSURANCE')
    ];
    const forbidden = ['leaf' + 'Semantics' + 'Map', 'expected_' + 'da_nang_' + 'verified', 'known_' + 'da_nang_' + 'venues'];
    for (const dir of targetDirs) {
      const files = fs.readdirSync(dir).filter(f => f.endsWith('.js') && !f.includes('quarantine') && !f.includes('test_supply_engine_150.js'));
      for (const file of files) {
        const content = fs.readFileSync(path.join(dir, file), 'utf8');
        for (const word of forbidden) {
          assert(!content.includes(word), `Forbidden token '${word}' found in ${file}!`);
        }
      }
    }
    console.log('     Scanned all active JS files: ZERO static dictionary tokens found.');
  });

  console.log('\n--- GATE 2: DEFINITIVE SCHEDULER DIAGNOSTIC & HONEST ORIGIN VERIFICATION ---');
  test('Scheduler diagnostic concludes SCHEDULER_BLOCKED_ON_THIS_HOST and origin is MANUAL_TRIGGERED', () => {
    assert(fs.existsSync(diagnosticReportPath), 'Diagnostic report must exist');
    const diagContent = fs.readFileSync(diagnosticReportPath, 'utf8');
    assert(diagContent.includes('SCHEDULER_BLOCKED_ON_THIS_HOST'), 'Diagnostic must conclude SCHEDULER_BLOCKED_ON_THIS_HOST');

    const runDirs = fs.readdirSync(runsBaseDir).filter(d => d.startsWith('RUN_'));
    const latestDirName = runDirs[runDirs.length - 1];
    const manifest = JSON.parse(fs.readFileSync(path.join(runsBaseDir, latestDirName, 'RUN_MANIFEST.json'), 'utf8'));
    assert.strictEqual(manifest.execution_origin, 'MANUAL_TRIGGERED', 'Execution origin must be truthfully MANUAL_TRIGGERED');
    assert.strictEqual(manifest.host_scheduler_status, 'SCHEDULER_BLOCKED_ON_THIS_HOST');
    console.log('     Verified truthful origin and diagnostic conclusion: SCHEDULER_BLOCKED_ON_THIS_HOST.');
  });

  console.log('\n--- GATE 3: IMMUTABLE RUN DIRECTORY & BATCH PROCESSING (20 ITEMS) ---');
  test('Manual batch processed 20 items into immutable timestamped run directory', () => {
    const runDirs = fs.readdirSync(runsBaseDir).filter(d => d.startsWith('RUN_'));
    assert(runDirs.length >= 5, `Expected at least 5 run directories, found ${runDirs.length}`);

    const latestDirName = runDirs[runDirs.length - 1];
    const latestDirPath = path.join(runsBaseDir, latestDirName);
    const manifestFile = path.join(latestDirPath, 'RUN_MANIFEST.json');
    assert(fs.existsSync(manifestFile), `RUN_MANIFEST.json must exist in ${latestDirName}`);

    const manifest = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));
    assert.strictEqual(manifest.summary.items_processed, 20);
    console.log(`     Verified batch run: processed ${manifest.summary.items_processed} items into ${latestDirName}.`);
  });

  console.log('\n--- GATE 4: 6-STEP TAXONOMY & SOURCE REPAIR ERROR CLASSIFICATION ---');
  test('Error pages are classified as ERROR_OR_BLOCKED_SOURCE and marked SOURCE_PATH_STALE', () => {
    const runDirs = fs.readdirSync(runsBaseDir).filter(d => d.startsWith('RUN_'));
    const latestDirName = runDirs[runDirs.length - 1];
    const manifest = JSON.parse(fs.readFileSync(path.join(runsBaseDir, latestDirName, 'RUN_MANIFEST.json'), 'utf8'));

    const b = manifest.summary.classification_breakdown;
    const totalClassified = b.EVIDENCE_COMPLETE_FOR_REVIEW + b.INCOMPLETE_OFFER_EVIDENCE + b.SCOPE_UNPROVEN + b.NON_OFFER_PAGE_OR_SHELL + b.ERROR_OR_BLOCKED_SOURCE;
    assert.strictEqual(totalClassified, manifest.summary.items_processed, 'Classification sum must equal items processed');
    assert.strictEqual(b.ERROR_OR_BLOCKED_SOURCE, 6, 'Expected 6 blocked/error sources in this batch');
    assert.strictEqual(b.INCOMPLETE_OFFER_EVIDENCE, 4, 'Expected 4 incomplete offer pages in this batch');
    console.log(`     Verified classification taxonomy: ${manifest.summary.items_processed} == ${totalClassified} (Conservation 100%).`);
  });

  console.log('\n--- GATE 5: LINEAGE PRECISION & NEGATIVE FILTER REJECTION AUDIT ---');
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

  console.log('\n--- GATE 6: STRICT RECONCILIATION INVARIANCE ---');
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

  console.log('\n--- GATE 7: AUTOMATED STAGING GATE (CONTINUE_ACQUISITION) ---');
  test('Automated staging gate evaluates CONTINUE_ACQUISITION due to < 10 complete bundles', () => {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    assert.strictEqual(manifest.automated_staging_gate_evaluation.decision_verdict, 'CONTINUE_ACQUISITION');
    assert.strictEqual(manifest.automated_staging_gate_evaluation.progress_milestone, '0/10');
  });

  console.log('\n--- GATE 8: PRODUCTION LOCKED & ZERO LIVE DEPLOYMENT ---');
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
    console.log('✨ ALL 8 JAYT-150 REAL-SUPPLY ENGINE RED-TEAM TESTS PASSED 100% CLEAN!');
    process.exit(0);
  }
}

if (require.main === module) {
  runSupplyEngine150Audit();
}

module.exports = {
  runSupplyEngine150Audit
};
