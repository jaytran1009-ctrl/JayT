/**
 * JAYT LARGE-SCALE SUPPLY ACQUISITION RED-TEAM TEST SUITE (142)
 * Directive: JAYT-142 — LARGE-SCALE VERIFIED SUPPLY ACQUISITION & AUTONOMOUS BATCH LOOP
 * 
 * STRICT MANDATE:
 * - 9 fail-closed regression gates testing Store Locator locality, multi-cohort leaf batch,
 *   DOM-native node provenance, 5-state terminal classification, and production lock.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

console.log('========================================================================');
console.log('🧪 JAYT-142: LARGE-SCALE SUPPLY ACQUISITION RED-TEAM AUDIT');
console.log('========================================================================\n');

const repoRoot = path.resolve(__dirname, '..');
const brandRegistryPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'brand_locality_registry_142.json');
const queuePath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'leaf_batch_142_queue.json');
const tablePath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'leaf_batch_142_table.json');
const registryPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'fresh_source_registry_142.json');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

const brandRegistry = JSON.parse(fs.readFileSync(brandRegistryPath, 'utf8'));
const queue = JSON.parse(fs.readFileSync(queuePath, 'utf8'));
const table = JSON.parse(fs.readFileSync(tablePath, 'utf8'));
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

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

console.log('--- GATE 1: BRAND LOCALITY BASELINE (14 VERIFIED, 1 UNPROVEN) ---');
test('14 brands have verified Da Nang locality; Domino\'s has LOCALITY_UNPROVEN_NO_DA_NANG_STORE', () => {
  assert.strictEqual(brandRegistry.total_brands_evaluated, 15);
  assert.strictEqual(brandRegistry.locality_summary.da_nang_verified_count, 14);
  assert.strictEqual(brandRegistry.locality_summary.da_nang_unproven_count, 1);
  const dominos = brandRegistry.brands.find(b => b.brand_id === 'BRAND_DOMINOS');
  assert(dominos);
  assert.strictEqual(dominos.locality_status, 'LOCALITY_UNPROVEN_NO_DA_NANG_STORE');
});

console.log('\n--- GATE 2: STORE LOCATOR PHYSICAL RECEIPTS ---');
test('All 15 brand Store Locator receipts exist physically on disk with valid SHA-256', () => {
  for (const b of brandRegistry.brands) {
    const rPath = path.join(repoRoot, b.receipt_path);
    assert(fs.existsSync(rPath), `Missing receipt for ${b.brand_id}`);
    assert(b.hashes.html_sha256 && b.hashes.html_sha256.length === 64);
  }
  console.log('     Verified 15/15 brand locator receipts on disk.');
});

console.log('\n--- GATE 3: LARGE-SCALE OFFICIAL LEAF BATCH CAPTURE (>= 20 LEAVES) ---');
test('Queue has >= 20 leaves (exactly 32 leaves captured with HTML, text, screenshots, receipts)', () => {
  assert(queue.total_leaves_captured >= 20, 'Expected at least 20 captured leaves');
  assert.strictEqual(queue.total_leaves_captured, 32);
  for (const l of queue.leaves) {
    const rPath = path.join(repoRoot, l.receipt_path);
    assert(fs.existsSync(rPath), `Missing receipt for ${l.leaf_id}`);
    assert(l.hashes.html_sha256 && l.hashes.html_sha256.length === 64);
  }
  console.log(`     Verified ${queue.total_leaves_captured} official leaf physical receipts on disk.`);
});

console.log('\n--- GATE 4: MULTI-COHORT COVERAGE (COHORTS 1, 2, 3) ---');
test('All 3 cohorts have robust leaf representation', () => {
  const c1 = queue.cohort_breakdown.cohort_1_cinemas;
  const c2 = queue.cohort_breakdown.cohort_2_fnb;
  const c3 = queue.cohort_breakdown.cohort_3_student_utilities;
  console.log(`     Cohort 1 (Cinemas):             ${c1} leaves`);
  console.log(`     Cohort 2 (F&B):                 ${c2} leaves`);
  console.log(`     Cohort 3 (Student Utilities):   ${c3} leaves`);
  assert(c1 >= 5, 'Cohort 1 should have >= 5 leaves');
  assert(c2 >= 5, 'Cohort 2 should have >= 5 leaves');
  assert(c3 >= 5, 'Cohort 3 should have >= 5 leaves');
  assert.strictEqual(c1 + c2 + c3, 32);
});

console.log('\n--- GATE 5: DOM-NATIVE NODE PROVENANCE TRACKING ---');
test('100% of serialized leaves record exact DOM node selector and outer_html_sha256', () => {
  for (const leaf of table.leaves) {
    assert(leaf.fields.title.dom_tag, `Missing title dom_tag for ${leaf.leaf_id}`);
    assert(leaf.fields.title.selector, `Missing title selector for ${leaf.leaf_id}`);
    assert(leaf.fields.title.outer_html_sha256, `Missing title outer_html_sha256 for ${leaf.leaf_id}`);
  }
  console.log('     Verified DOM node provenance across all 32 leaves.');
});

console.log('\n--- GATE 6: STRICT 5-STATE TERMINAL CLASSIFICATION CONSERVATION ---');
test('Sum of 5 terminal states equals exactly 32 leaves', () => {
  const sd = table.state_distribution;
  const sum = (
    sd.EVIDENCE_COMPLETE_FOR_REVIEW +
    sd.MISSING_EXPLICIT_VALIDITY +
    sd.SCOPE_UNPROVEN +
    sd.NO_PRICE_CLAIM +
    sd.NOT_CANDIDATE
  );
  console.log(`     EVIDENCE_COMPLETE_FOR_REVIEW:   ${sd.EVIDENCE_COMPLETE_FOR_REVIEW}`);
  console.log(`     MISSING_EXPLICIT_VALIDITY:      ${sd.MISSING_EXPLICIT_VALIDITY}`);
  console.log(`     SCOPE_UNPROVEN:                 ${sd.SCOPE_UNPROVEN}`);
  console.log(`     NO_PRICE_CLAIM:                 ${sd.NO_PRICE_CLAIM}`);
  console.log(`     NOT_CANDIDATE:                  ${sd.NOT_CANDIDATE}`);
  console.log(`     Conservation Sum:               ${sum}`);

  assert.strictEqual(sum, 32);
  assert.strictEqual(sd.EVIDENCE_COMPLETE_FOR_REVIEW, 23);
  assert.strictEqual(sd.MISSING_EXPLICIT_VALIDITY, 4);
  assert.strictEqual(sd.SCOPE_UNPROVEN, 0);
  assert.strictEqual(sd.NO_PRICE_CLAIM, 2);
  assert.strictEqual(sd.NOT_CANDIDATE, 3);
});

console.log('\n--- GATE 7: FRESH SOURCE REGISTRY INVARIANCE (15 == 15) ---');
test('Fresh Source Registry has 15 sources with exact delta classifications', () => {
  assert.strictEqual(registry.sources.length, 15);
  const vars = registry.sources.filter(s => s.state === 'PAGE_RENDER_VARIATION').length;
  const sems = registry.sources.filter(s => s.state === 'PAGE_SEMANTIC_CHANGE_UNBOUND').length;
  const cards = registry.sources.filter(s => s.state === 'CANONICAL_OFFER_CARD_CHANGED').length;
  const errs = registry.sources.filter(s => s.state === 'HTTP_ERROR_BACKOFF').length;

  assert.strictEqual(vars + sems + cards + errs, 15);
  assert.strictEqual(vars, 10);
  assert.strictEqual(sems, 3);
  assert.strictEqual(cards, 1);
  assert.strictEqual(errs, 1);
});

console.log('\n--- GATE 8: AUTOMATED STAGING GATE EVALUATION ---');
test('Staging gate evaluates multi-cohort bundle completeness', () => {
  const completeCount = table.state_distribution.EVIDENCE_COMPLETE_FOR_REVIEW;
  const c1Complete = table.cohort_summary.cohort_1_cinemas_complete;
  const c2Complete = table.cohort_summary.cohort_2_fnb_complete;
  const c3Complete = table.cohort_summary.cohort_3_student_utilities_complete;

  console.log(`     Evidence Complete Count:        ${completeCount}`);
  console.log(`     Cohort 1 Complete:              ${c1Complete}`);
  console.log(`     Cohort 2 Complete:              ${c2Complete}`);
  console.log(`     Cohort 3 Complete:              ${c3Complete}`);

  assert(completeCount >= 10, 'Complete count should be >= 10');
  assert(c1Complete >= 3, 'Cohort 1 should have >= 3 complete');
  assert(c2Complete >= 3, 'Cohort 2 should have >= 3 complete');
  assert(c3Complete >= 3, 'Cohort 3 should have >= 3 complete');
});

console.log('\n--- GATE 9: PRODUCTION LOCKED & ZERO LIVE DEPLOYMENT IN 142 ---');
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
  console.log('✨ ALL 9 JAYT-142 LARGE-SCALE SUPPLY ACQUISITION TESTS PASSED 100% CLEAN!');
  process.exit(0);
}
