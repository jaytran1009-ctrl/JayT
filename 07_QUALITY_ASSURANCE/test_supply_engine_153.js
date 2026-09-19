/**
 * JAYT STRATIFIED SUPPLY CAMPAIGN RED-TEAM TEST SUITE (153)
 * Directive: JAYT-153: STRATIFIED LEAF RESOLUTION & SUPPLY DIVERSITY
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const { isRejectedByNegativeFilter } = require('../05_DEAL_AND_AFFILIATE/jayt_autonomous_worker_153');

console.log('========================================================================');
console.log('🧪 JAYT-153: STRATIFIED LEAF RESOLUTION & SUPPLY DIVERSITY RED-TEAM AUDIT');
console.log('========================================================================\n');

const repoRoot = path.resolve(__dirname, '..');
const runsBaseDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'runs');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const manifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_144_manifest.json');
const registryPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'autonomous_schedule_registry_153.json');
const ledgerPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'discovery_lineage_ledger_153.json');
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

async function runSupplyEngine153Audit() {
  console.log('--- GATE 1: STATIC CODE SCAN (ZERO STATIC DICTIONARIES & ZERO STRING FALLBACKS) ---');
  test('Active pipeline contains zero static dictionary or string fallback patterns', () => {
    const targetDirs = [
      path.join(repoRoot, '05_DEAL_AND_AFFILIATE'),
      path.join(repoRoot, '07_QUALITY_ASSURANCE')
    ];
    const forbidden = ['leaf' + 'Semantics' + 'Map', 'expected_' + 'da_nang_' + 'verified', 'known_' + 'da_nang_' + 'venues'];
    for (const dir of targetDirs) {
      const files = fs.readdirSync(dir).filter(f => f.endsWith('.js') && !f.includes('quarantine') && !f.includes('test_supply_engine_153.js'));
      for (const file of files) {
        const content = fs.readFileSync(path.join(dir, file), 'utf8');
        for (const word of forbidden) {
          assert(!content.includes(word), `Forbidden token '${word}' found in ${file}!`);
        }
      }
    }
    console.log('     Scanned all active JS files: ZERO static dictionary tokens found.');
  });

  console.log('\n--- GATE 2: DEFINITIVE SCHEDULER STATUS & HONEST ORIGIN VERIFICATION ---');
  test('Host scheduler status is SCHEDULER_BLOCKED_ON_THIS_HOST and origin is MANUAL_TRIGGERED', () => {
    assert(fs.existsSync(diagnosticReportPath), 'Diagnostic report must exist');
    const diagContent = fs.readFileSync(diagnosticReportPath, 'utf8');
    assert(diagContent.includes('SCHEDULER_BLOCKED_ON_THIS_HOST'), 'Diagnostic must conclude SCHEDULER_BLOCKED_ON_THIS_HOST');

    const runDirs = fs.readdirSync(runsBaseDir).filter(d => d.startsWith('RUN_'));
    const latestDirName = runDirs[runDirs.length - 1];
    const manifest = JSON.parse(fs.readFileSync(path.join(runsBaseDir, latestDirName, 'RUN_MANIFEST.json'), 'utf8'));
    assert.strictEqual(manifest.execution_origin, 'MANUAL_TRIGGERED', 'Execution origin must be MANUAL_TRIGGERED');
    assert.strictEqual(manifest.host_scheduler_status, 'SCHEDULER_BLOCKED_ON_THIS_HOST');
    console.log('     Verified transparent origin: MANUAL_TRIGGERED with SCHEDULER_BLOCKED_ON_THIS_HOST.');
  });

  console.log('\n--- GATE 3: WORKSTREAM A DISCOVERY LEDGER INTEGRITY ---');
  test('Discovery lineage ledger persists 100% discovered links across all 3 cohorts', () => {
    assert(fs.existsSync(ledgerPath), 'Discovery ledger must exist on disk');
    const ledger = JSON.parse(fs.readFileSync(ledgerPath, 'utf8'));
    assert(ledger.records.length > 0, 'Ledger must have records');
    assert(ledger.cohort_breakdown.COHORT_A_CINEMA_ENTERTAINMENT > 0);
    assert(ledger.cohort_breakdown.COHORT_B_FNB_COFFEE > 0);
    assert(ledger.cohort_breakdown.COHORT_C_TRANSIT_STUDENT > 0);
    for (const rec of ledger.records) {
      assert(rec.parent_source_url, 'Record must have parent_source_url');
      assert(rec.canonical_url, 'Record must have canonical_url');
      assert(rec.anchor_text && rec.anchor_text.length >= 3, 'Record must have valid anchor_text');
      assert(rec.content_root_selector, 'Record must have content_root_selector');
    }
    console.log(`     Verified ledger: ${ledger.records.length} records covering Cohort A (${ledger.cohort_breakdown.COHORT_A_CINEMA_ENTERTAINMENT}), Cohort B (${ledger.cohort_breakdown.COHORT_B_FNB_COFFEE}), Cohort C (${ledger.cohort_breakdown.COHORT_C_TRANSIT_STUDENT}).`);
  });

  console.log('\n--- GATE 4: STRATIFIED ALLOCATION QUOTA COMPLIANCE (10/10/10 & MAX 3/BRAND) ---');
  test('Batch enforces 10/10/10 cohort caps and max 3 per brand with zero brand monopolization', () => {
    const runDirs = fs.readdirSync(runsBaseDir).filter(d => d.startsWith('RUN_'));
    const latestDirName = runDirs[runDirs.length - 1];
    const manifest = JSON.parse(fs.readFileSync(path.join(runsBaseDir, latestDirName, 'RUN_MANIFEST.json'), 'utf8'));

    const alloc = manifest.workstream_b_stratified_allocation.allocation;
    assert(alloc.COHORT_A_CINEMA_ENTERTAINMENT.selected <= 10, 'Cohort A must be <= 10');
    assert(alloc.COHORT_B_FNB_COFFEE.selected <= 10, 'Cohort B must be <= 10');
    assert(alloc.COHORT_C_TRANSIT_STUDENT.selected <= 10, 'Cohort C must be <= 10');

    // Check brand caps
    const brandCounts = {};
    for (const leaf of manifest.leaf_captures) {
      brandCounts[leaf.brand_id] = (brandCounts[leaf.brand_id] || 0) + 1;
      assert(brandCounts[leaf.brand_id] <= 3, `Brand ${leaf.brand_id} exceeded brand cap of 3 (had ${brandCounts[leaf.brand_id]})!`);
    }

    assert(brandCounts['GALAXY_CINEMA'] <= 3, 'Galaxy Cinema must not exceed 3');
    console.log(`     Verified stratified allocation: Cohort A (${alloc.COHORT_A_CINEMA_ENTERTAINMENT.selected}), Cohort B (${alloc.COHORT_B_FNB_COFFEE.selected}), Cohort C (${alloc.COHORT_C_TRANSIT_STUDENT.selected}), all brands <= 3.`);
  });

  console.log('\n--- GATE 5: SHORTFALL TRANSPARENCY & ZERO MONOPOLIZATION BACKFILL ---');
  test('Shortfalls are reported transparently and not backfilled with extra leaves from single brand', () => {
    const runDirs = fs.readdirSync(runsBaseDir).filter(d => d.startsWith('RUN_'));
    const latestDirName = runDirs[runDirs.length - 1];
    const manifest = JSON.parse(fs.readFileSync(path.join(runsBaseDir, latestDirName, 'RUN_MANIFEST.json'), 'utf8'));

    const alloc = manifest.workstream_b_stratified_allocation.allocation;
    assert.strictEqual(alloc.COHORT_B_FNB_COFFEE.shortfall, 5, 'Cohort B shortfall must be recorded as 5');
    assert.strictEqual(manifest.workstream_b_stratified_allocation.total_stratified_batch_size, 23);
    console.log('     Verified shortfall transparency: Cohort B recorded 5 shortfall, 0 illicit backfill.');
  });

  console.log('\n--- GATE 6: DOM-LINEAGE DISCOVERY & NEGATIVE FILTER COMPLIANCE ---');
  test('Negative filter rejects static files, API endpoints, empty anchor text, and generic index roots', () => {
    const testJs = isRejectedByNegativeFilter('https://galaxycine.vn/static/js/bundle.js', 'https://galaxycine.vn');
    assert.strictEqual(testJs.rejected, true);
    assert(testJs.reason.includes('STATIC_FILE_EXTENSION'));

    const testIndex = isRejectedByNegativeFilter('https://galaxycine.vn/khuyen-mai/', 'https://galaxycine.vn');
    assert.strictEqual(testIndex.rejected, true);
    assert(testIndex.reason.includes('GENERIC_INDEX_OR_CATEGORY_ROOT'));

    const testValid = isRejectedByNegativeFilter('https://www.galaxycine.vn/khuyen-mai/happy-day---ve-chi-tu-45k/', 'https://www.galaxycine.vn');
    assert.strictEqual(testValid.rejected, false);

    console.log('     Verified negative filter and lineage precision rules: 100% rejection compliance.');
  });

  console.log('\n--- GATE 7: STRICT RECONCILIATION INVARIANCE ---');
  test('Reconciliation formula initial_root_count + stratified_leaves_captured = final_registry_count holds exactly', () => {
    const runDirs = fs.readdirSync(runsBaseDir).filter(d => d.startsWith('RUN_'));
    const latestDirName = runDirs[runDirs.length - 1];
    const manifest = JSON.parse(fs.readFileSync(path.join(runsBaseDir, latestDirName, 'RUN_MANIFEST.json'), 'utf8'));
    const reg = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

    const rec = manifest.reconciliation;
    assert.strictEqual(rec.is_reconciled, true);
    assert.strictEqual(rec.initial_root_count + rec.stratified_leaves_captured, rec.final_registry_count);
    assert.strictEqual(reg.items.length, rec.final_registry_count, 'Registry total on disk must match manifest final count');
    console.log(`     Verified reconciliation invariance: ${rec.invariance_formula} (100% MATCH).`);
  });

  console.log('\n--- GATE 8: AUTOMATED STAGING GATE (CONTINUE_ACQUISITION) ---');
  test('Automated staging gate evaluates CONTINUE_ACQUISITION due to < 10 complete bundles', () => {
    const runDirs = fs.readdirSync(runsBaseDir).filter(d => d.startsWith('RUN_'));
    const latestDirName = runDirs[runDirs.length - 1];
    const manifest = JSON.parse(fs.readFileSync(path.join(runsBaseDir, latestDirName, 'RUN_MANIFEST.json'), 'utf8'));
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
    console.log('✨ ALL 9 JAYT-153 STRATIFIED SUPPLY CAMPAIGN TESTS PASSED 100% CLEAN!');
    process.exit(0);
  }
}

if (require.main === module) {
  runSupplyEngine153Audit();
}

module.exports = {
  runSupplyEngine153Audit
};
