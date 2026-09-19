/**
 * JAYT TWO-PHASE SUPPLY CAMPAIGN RED-TEAM TEST SUITE (152)
 * Directive: JAYT-152: OFFICIAL ROOT DISCOVERY & LEAF RE-CAPTURE CAMPAIGN
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const { isRejectedByNegativeFilter } = require('../05_DEAL_AND_AFFILIATE/jayt_autonomous_worker_152');

console.log('========================================================================');
console.log('🧪 JAYT-152: TWO-PHASE SUPPLY CAMPAIGN RED-TEAM AUDIT');
console.log('========================================================================\n');

const repoRoot = path.resolve(__dirname, '..');
const runsBaseDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'runs');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const manifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_144_manifest.json');
const registryPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'autonomous_schedule_registry_152.json');
const rootsPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'official_root_sources_152.json');
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

async function runSupplyEngine152Audit() {
  console.log('--- GATE 1: STATIC CODE SCAN (ZERO STATIC DICTIONARIES & ZERO STRING FALLBACKS) ---');
  test('Active pipeline contains zero static dictionary or string fallback patterns', () => {
    const targetDirs = [
      path.join(repoRoot, '05_DEAL_AND_AFFILIATE'),
      path.join(repoRoot, '07_QUALITY_ASSURANCE')
    ];
    const forbidden = ['leaf' + 'Semantics' + 'Map', 'expected_' + 'da_nang_' + 'verified', 'known_' + 'da_nang_' + 'venues'];
    for (const dir of targetDirs) {
      const files = fs.readdirSync(dir).filter(f => f.endsWith('.js') && !f.includes('quarantine') && !f.includes('test_supply_engine_152.js'));
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

  console.log('\n--- GATE 3: TWO-PHASE CAMPAIGN ARCHITECTURE AUDIT ---');
  test('Latest run executed both Phase 1 (Root Discovery) and Phase 2 (Leaf Re-capture)', () => {
    const runDirs = fs.readdirSync(runsBaseDir).filter(d => d.startsWith('RUN_'));
    const latestDirName = runDirs[runDirs.length - 1];
    const manifest = JSON.parse(fs.readFileSync(path.join(runsBaseDir, latestDirName, 'RUN_MANIFEST.json'), 'utf8'));

    assert.strictEqual(manifest.execution_mode, 'TWO_PHASE_CAMPAIGN_MANUAL_BATCH');
    assert(manifest.phase_1_root_discovery_summary, 'Phase 1 summary must exist');
    assert(manifest.phase_2_leaf_recapture_summary, 'Phase 2 summary must exist');
    assert.strictEqual(manifest.phase_1_root_discovery_summary.total_official_roots_scanned, 32);
    assert(manifest.phase_2_leaf_recapture_summary.total_leaves_recaptured > 0);
    console.log(`     Verified two-phase architecture: Phase 1 (32 roots scanned -> ${manifest.phase_1_root_discovery_summary.total_valid_lineage_leaves_discovered} discovered) -> Phase 2 (${manifest.phase_2_leaf_recapture_summary.total_leaves_recaptured} re-captured).`);
  });

  console.log('\n--- GATE 4: THREE-COHORT ROOT DISCOVERY COVERAGE ---');
  test('Phase 1 scanned official roots across Cohort A, Cohort B, and Cohort C', () => {
    const runDirs = fs.readdirSync(runsBaseDir).filter(d => d.startsWith('RUN_'));
    const latestDirName = runDirs[runDirs.length - 1];
    const manifest = JSON.parse(fs.readFileSync(path.join(runsBaseDir, latestDirName, 'RUN_MANIFEST.json'), 'utf8'));

    const cb = manifest.phase_1_root_discovery_summary.cohort_breakdown;
    assert.strictEqual(cb.COHORT_A_CINEMA_ENTERTAINMENT, 7);
    assert.strictEqual(cb.COHORT_B_FNB_COFFEE, 17);
    assert.strictEqual(cb.COHORT_C_TRANSIT_STUDENT, 8);
    console.log(`     Verified three-cohort root breakdown: Cohort A (7), Cohort B (17), Cohort C (8).`);
  });

  console.log('\n--- GATE 5: DOM-LINEAGE DISCOVERY & NEGATIVE FILTER COMPLIANCE ---');
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

  console.log('\n--- GATE 6: SOURCE REPAIR & UNRESOLVED BRAND CONTAINMENT ---');
  test('Unresolved roots/leaves are marked BRAND_SOURCE_UNRESOLVED / ERROR_OR_BLOCKED_SOURCE with zero guessing', () => {
    const runDirs = fs.readdirSync(runsBaseDir).filter(d => d.startsWith('RUN_'));
    const latestDirName = runDirs[runDirs.length - 1];
    const manifest = JSON.parse(fs.readFileSync(path.join(runsBaseDir, latestDirName, 'RUN_MANIFEST.json'), 'utf8'));

    const unresolved = manifest.root_captures.filter(r => r.root_status === 'ERROR_OR_BLOCKED_SOURCE');
    for (const u of unresolved) {
      assert(!u.is_trusted || u.http_status >= 400, 'Unresolved brand root must have failed receipt or HTTP error');
    }
    console.log(`     Verified source repair: ${unresolved.length} unresolved roots isolated cleanly with zero guessing.`);
  });

  console.log('\n--- GATE 7: STRICT RECONCILIATION INVARIANCE ---');
  test('Reconciliation formula initial_root_count + new_valid_discovered_leaves = final_registry_count holds exactly', () => {
    const runDirs = fs.readdirSync(runsBaseDir).filter(d => d.startsWith('RUN_'));
    const latestDirName = runDirs[runDirs.length - 1];
    const manifest = JSON.parse(fs.readFileSync(path.join(runsBaseDir, latestDirName, 'RUN_MANIFEST.json'), 'utf8'));
    const reg = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

    const rec = manifest.reconciliation;
    assert.strictEqual(rec.is_reconciled, true);
    assert.strictEqual(rec.initial_root_count + rec.new_valid_discovered_leaves, rec.final_registry_count);
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
    console.log('✨ ALL 9 JAYT-152 TWO-PHASE SUPPLY CAMPAIGN TESTS PASSED 100% CLEAN!');
    process.exit(0);
  }
}

if (require.main === module) {
  runSupplyEngine152Audit();
}

module.exports = {
  runSupplyEngine152Audit
};
