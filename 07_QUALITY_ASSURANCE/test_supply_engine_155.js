/**
 * JAYT MULTI-TIER PRESERVATION & REAL-VALUE SUPPLY RED-TEAM TEST SUITE (155)
 * Directive: JAYT-155: KHÔI PHỤC TÍNH TOÀN VẸN & BATCH NGUỒN CUNG GIÁ TRỊ THẬT
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const { isRejectedByNegativePolicy, evaluateOfferValueSignals } = require('../05_DEAL_AND_AFFILIATE/jayt_autonomous_worker_155');

console.log('========================================================================');
console.log('🧪 JAYT-155: MULTI-TIER DATA PRESERVATION & REAL-VALUE RED-TEAM AUDIT');
console.log('========================================================================\n');

const repoRoot = path.resolve(__dirname, '..');
const runsBaseDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'runs');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const manifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_144_manifest.json');
const registryPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'autonomous_schedule_registry_155.json');
const ledgerPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'discovery_lineage_ledger_155.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');
const diagnosticReportPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'WINDOWS_TASK_SCHEDULER_HOST_DIAGNOSTIC.md');
const disclosure154Path = path.join(repoRoot, '08_RELEASE_VAULT', 'JAYT_154_RECOVERY_AND_CONTAINMENT_DISCLOSURE.md');

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

async function runSupplyEngine155Audit() {
  console.log('--- GATE 1: STATIC CODE SCAN (ZERO STATIC DICTIONARIES & ZERO STRING FALLBACKS) ---');
  test('Active pipeline contains zero static dictionary or string fallback patterns', () => {
    const targetDirs = [
      path.join(repoRoot, '05_DEAL_AND_AFFILIATE'),
      path.join(repoRoot, '07_QUALITY_ASSURANCE')
    ];
    const forbidden = ['leaf' + 'Semantics' + 'Map', 'expected_' + 'da_nang_' + 'verified', 'known_' + 'da_nang_' + 'venues'];
    for (const dir of targetDirs) {
      const files = fs.readdirSync(dir).filter(f => f.endsWith('.js') && !f.includes('quarantine') && !f.includes('test_supply_engine_155.js'));
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

  console.log('\n--- GATE 3: WORKSTREAM A CONTAINMENT & 154 DISCLOSURE INTEGRITY ---');
  test('Mutated 154 artifacts are quarantined and disclosure disclosure is published', () => {
    assert(fs.existsSync(disclosure154Path), '154 Disclosure document must exist');
    const run154Dir = path.join(runsBaseDir, 'RUN_20260827_120833_ff006b');
    assert(fs.existsSync(path.join(run154Dir, 'QUARANTINED_RUN_MANIFEST_POST_MUTATION.json')), 'Quarantined manifest must exist');
    assert(fs.existsSync(path.join(run154Dir, 'RECOVERED_AUDIT_MANIFEST_154.json')), 'Recovered audit manifest must exist');
    const recovered = JSON.parse(fs.readFileSync(path.join(run154Dir, 'RECOVERED_AUDIT_MANIFEST_154.json'), 'utf8'));
    assert.strictEqual(recovered.total_physical_receipts_found, 73, '73 physical receipts preserved in run 154');
    console.log('     Verified 154 containment: Quarantined mutations, preserved 73 physical receipts.');
  });

  console.log('\n--- GATE 4: WORKSTREAM B MULTI-TIER DATA PRESERVATION INVARIANCE ---');
  test('Equations Eq1 (raw = rejected + candidates) and Eq2 (candidates = duplicates + unique) hold 100% exact', () => {
    assert(fs.existsSync(ledgerPath), 'Discovery ledger must exist on disk');
    const ledger = JSON.parse(fs.readFileSync(ledgerPath, 'utf8'));
    const rec = ledger.reconciliation;

    assert.strictEqual(rec.is_reconciled, true);
    assert.strictEqual(rec.tier_1_raw_anchors_observed, rec.tier_2_policy_rejected + rec.tier_3_canonical_candidates_before_dedupe);
    assert.strictEqual(rec.tier_3_canonical_candidates_before_dedupe, rec.tier_4_canonical_duplicates + rec.tier_5_unique_eligible_leaves);
    assert.strictEqual(ledger.total_records, rec.tier_5_unique_eligible_leaves);
    assert.strictEqual(ledger.records.length, 71);
    console.log(`     Verified multi-tier preservation: Eq1 (${rec.equation_1}), Eq2 (${rec.equation_2}) (100% INVARIANT MATCH).`);
  });

  console.log('\n--- GATE 5: WORKSTREAM C VALUE-BASED SELECTION & ZERO NOISE COMPLIANCE ---');
  test('Selected leaves contain zero movie trailers, zero PR, zero language buttons, and zero noise traffic articles', () => {
    const runDirs = fs.readdirSync(runsBaseDir).filter(d => d.startsWith('RUN_'));
    const latestDirName = runDirs[runDirs.length - 1];
    const manifest = JSON.parse(fs.readFileSync(path.join(runsBaseDir, latestDirName, 'RUN_MANIFEST.json'), 'utf8'));

    const forbiddenTerms = [
      'trailer', 'nhện nhọ', 'moana', 'minions', 'hulk', 'zombie', 'quang tuấn', 'lầu chú hỏa',
      'flagship', 'hà nội', 'hoàn kiếm', 'chúc mừng',
      'chuyển sang tiếng việt', 'lộ trình nâng tầm', 'bài toán dịch chuyển'
    ];

    for (const leaf of manifest.leaf_captures) {
      const text = `${leaf.anchor_text} ${leaf.canonical_url}`.toLowerCase();
      for (const term of forbiddenTerms) {
        assert(!text.includes(term), `Forbidden noise term '${term}' found in selected leaf: ${leaf.canonical_url} ("${leaf.anchor_text}")!`);
      }
    }
    console.log('     Verified value selection: 30/30 selected leaves are 100% free of trailers, PR, and noise.');
  });

  console.log('\n--- GATE 6: WORKSTREAM D STRATIFIED ALLOCATION (10/10/10 & MAX 3/BRAND) ---');
  test('Batch captured 30 stratified leaves across Cohort A (10), B (10), C (10) with max 3/brand', () => {
    const runDirs = fs.readdirSync(runsBaseDir).filter(d => d.startsWith('RUN_'));
    const latestDirName = runDirs[runDirs.length - 1];
    const manifest = JSON.parse(fs.readFileSync(path.join(runsBaseDir, latestDirName, 'RUN_MANIFEST.json'), 'utf8'));

    const alloc = manifest.workstream_c_d_stratified_allocation.allocation;
    assert.strictEqual(alloc.COHORT_A_CINEMA_ENTERTAINMENT.selected, 10);
    assert.strictEqual(alloc.COHORT_B_FNB_COFFEE.selected, 10);
    assert.strictEqual(alloc.COHORT_C_TRANSIT_STUDENT.selected, 10);
    assert.strictEqual(manifest.workstream_c_d_stratified_allocation.total_stratified_batch_size, 30);

    // Verify brand caps
    const brandCounts = {};
    for (const leaf of manifest.leaf_captures) {
      brandCounts[leaf.brand_id] = (brandCounts[leaf.brand_id] || 0) + 1;
      assert(brandCounts[leaf.brand_id] <= 3, `Brand ${leaf.brand_id} exceeded cap of 3!`);
    }

    assert(brandCounts['GALAXY_CINEMA'] <= 3, 'Galaxy Cinema must be <= 3');
    console.log(`     Verified stratified allocation: Cohort A (10), Cohort B (10), Cohort C (10), all brands <= 3.`);
  });

  console.log('\n--- GATE 7: WORKSTREAM E 5-STATE RESOLUTION & MANIFEST PARITY ---');
  test('Manifest classification breakdown matches sum of leaf captures exactly', () => {
    const runDirs = fs.readdirSync(runsBaseDir).filter(d => d.startsWith('RUN_'));
    const latestDirName = runDirs[runDirs.length - 1];
    const manifest = JSON.parse(fs.readFileSync(path.join(runsBaseDir, latestDirName, 'RUN_MANIFEST.json'), 'utf8'));

    const breakdown = manifest.workstream_e_evidence_resolution.classification_breakdown;
    const sum = breakdown.EVIDENCE_COMPLETE_FOR_REVIEW + breakdown.INCOMPLETE_OFFER_EVIDENCE + breakdown.NON_OFFER_PAGE_OR_SHELL + breakdown.EXPIRED_OR_HISTORICAL + breakdown.ERROR_OR_BLOCKED_SOURCE;
    assert.strictEqual(sum, manifest.leaf_captures.length, 'Sum of breakdown must equal leaf captures count');
    assert.strictEqual(breakdown.EVIDENCE_COMPLETE_FOR_REVIEW, 0);
    assert.strictEqual(breakdown.INCOMPLETE_OFFER_EVIDENCE, 4);
    assert.strictEqual(breakdown.EXPIRED_OR_HISTORICAL, 3);
    assert.strictEqual(breakdown.NON_OFFER_PAGE_OR_SHELL, 23);
    assert.strictEqual(breakdown.ERROR_OR_BLOCKED_SOURCE, 0);
    console.log('     Verified 5-state resolution: 0 complete, 4 incomplete, 3 expired, 23 shell, 0 error (Total: 30).');
  });

  console.log('\n--- GATE 8: STRICT RECONCILIATION INVARIANCE ---');
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
    console.log('✨ ALL 9 JAYT-155 MULTI-TIER DATA PRESERVATION TESTS PASSED 100% CLEAN!');
    process.exit(0);
  }
}

if (require.main === module) {
  runSupplyEngine155Audit();
}

module.exports = {
  runSupplyEngine155Audit
};
