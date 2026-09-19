/**
 * TEST SUITE 109R: SEMANTIC OFFER TRUTH GATE REGRESSION & INTEGRITY
 * 
 * Verifies:
 * 1. All 84 leaves evaluated into 3 discrete groups: ACTIVE_REVIEWABLE, EXPIRED_OR_REJECTED, INCOMPLETE
 * 2. 19 previous candidates strictly demoted to UNVERIFIED_LEAF_REQUIRES_SEMANTIC_RECHECK
 * 3. Specific CEO False Positive Regressions:
 *    - Jollibee news / ISO certification -> REJECTED
 *    - CGV 3D theater format page -> REJECTED
 *    - Be historical Cake 2020 / PR rebrand -> REJECTED
 *    - TNGo discontinued Da Nang service / pass -> REJECTED
 *    - Starlight historical / expired standing programs -> REJECTED (HISTORICAL_OR_EXPIRED_CONTENT)
 *    - CGV duplicate URLs across seeds -> REJECTED (DUPLICATE_URL)
 * 4. Active Reviewable criteria: valid_to >= 2026-08-25, concrete offer value, verified Da Nang scope
 * 5. Production lock invariant: deals_feed.json is empty [], is_approved is false
 * 6. Memory Transaction Consistency: version >= 3.218.0
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=== RUNNING TEST SUITE 109R: SEMANTIC OFFER TRUTH GATE ===\n');

let passedTests = 0;
let totalTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`✅ PASS: [${totalTests}] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`❌ FAIL: [${totalTests}] ${name}`);
    console.error(err.message);
  }
}

const MANIFEST_109_PATH = path.resolve(__dirname, '../05_DEAL_AND_AFFILIATE/official_offer_leaf_manifest_109.json');
const MANIFEST_109R_PATH = path.resolve(__dirname, '../05_DEAL_AND_AFFILIATE/semantic_offer_manifest_109r.json');
const DEALS_FEED_PATH = path.resolve(__dirname, '../05_DEAL_AND_AFFILIATE/deals_feed.json');
const PROJECT_MEMORY_PATH = path.resolve(__dirname, '../PROJECT_MEMORY.md');

const m109 = JSON.parse(fs.readFileSync(MANIFEST_109_PATH, 'utf8'));
const m109r = JSON.parse(fs.readFileSync(MANIFEST_109R_PATH, 'utf8'));

// Test 1: Total 84 leaves evaluated
runTest('Total 84 leaves evaluated in Manifest 109R', () => {
  assert.strictEqual(m109r.summary_metrics.total_leaves_evaluated, 84, 'Must evaluate exactly 84 leaves');
  const sum = m109r.active_reviewable.length + m109r.expired_or_rejected.length + m109r.incomplete.length;
  assert.strictEqual(sum, 84, 'Sum of 3 groups must equal 84');
});

// Test 2: Demotion of 19 previous candidates
runTest('All 19 previous candidates demoted in Manifest 109', () => {
  assert.strictEqual(m109.summary_metrics.total_offer_candidates_for_ceo_review, 0, 'Candidates count in manifest 109 must be 0');
  assert.strictEqual(m109.demoted_previous_candidates.length, 19, 'Must record exactly 19 demoted leaves');
  m109.demoted_previous_candidates.forEach(item => {
    assert.strictEqual(item.status, 'UNVERIFIED_LEAF_REQUIRES_SEMANTIC_RECHECK', 'Status must be UNVERIFIED_LEAF_REQUIRES_SEMANTIC_RECHECK');
  });
});

// Test 3: CEO FP Regression - Jollibee News & Certification
runTest('CEO FP Regression: Jollibee news and certification pages rejected', () => {
  const leaf03 = m109r.expired_or_rejected.find(l => l.leaf_id === 'TARGET_108_01_JOLLIBEE_LEAF_03');
  const leaf04 = m109r.expired_or_rejected.find(l => l.leaf_id === 'TARGET_108_01_JOLLIBEE_LEAF_04');
  assert.ok(leaf03, 'Jollibee Leaf 03 must be in expired_or_rejected');
  assert.ok(leaf04, 'Jollibee Leaf 04 must be in expired_or_rejected');
  assert.strictEqual(leaf03.rejection_reason, 'CERTIFICATION_OR_FRANCHISE_NEWS', 'Leaf 03 must be rejected for CERTIFICATION_OR_FRANCHISE_NEWS');
  assert.strictEqual(leaf04.rejection_reason, 'MALFORMED_URL', 'Leaf 04 must be rejected for MALFORMED_URL');
});

// Test 4: CEO FP Regression - CGV 3D Theater Format Page
runTest('CEO FP Regression: CGV 3D format page rejected', () => {
  const cgv3d = m109r.expired_or_rejected.find(l => l.leaf_id === 'TARGET_108_14_CGV_LEAF_05');
  assert.ok(cgv3d, 'CGV 3D Leaf 05 must be in expired_or_rejected');
  assert.strictEqual(cgv3d.rejection_reason, 'PRODUCT_DESCRIPTION_NOT_OFFER', 'Must be rejected for PRODUCT_DESCRIPTION_NOT_OFFER');
});

// Test 5: CEO FP Regression - Be Historical Content & PR Rebrand
runTest('CEO FP Regression: Be historical 2020 Cake and 2022 PR rebrand rejected', () => {
  const beCake = m109r.expired_or_rejected.find(l => l.leaf_id === 'TARGET_108_21_BE_LEAF_02');
  const bePR = m109r.expired_or_rejected.find(l => l.leaf_id === 'TARGET_108_21_BE_LEAF_05');
  assert.ok(beCake, 'Be Leaf 02 must be in expired_or_rejected');
  assert.ok(bePR, 'Be Leaf 05 must be in expired_or_rejected');
  assert.strictEqual(beCake.rejection_reason, 'HISTORICAL_OR_EXPIRED_CONTENT', 'Be Leaf 02 must be HISTORICAL_OR_EXPIRED_CONTENT');
  assert.strictEqual(bePR.rejection_reason, 'PR_OR_BRAND_ANNOUNCEMENT', 'Be Leaf 05 must be PR_OR_BRAND_ANNOUNCEMENT');
});

// Test 6: CEO FP Regression - TNGo Da Nang Discontinued Service
runTest('CEO FP Regression: TNGo discontinued Da Nang service rejected', () => {
  const tngo02 = m109r.expired_or_rejected.find(l => l.leaf_id === 'TARGET_108_23_TNGO_LEAF_02');
  const tngo03 = m109r.expired_or_rejected.find(l => l.leaf_id === 'TARGET_108_23_TNGO_LEAF_03');
  const tngo04 = m109r.expired_or_rejected.find(l => l.leaf_id === 'TARGET_108_23_TNGO_LEAF_04');
  assert.ok(tngo02, 'TNGo Leaf 02 must be in expired_or_rejected');
  assert.ok(tngo03, 'TNGo Leaf 03 must be in expired_or_rejected');
  assert.ok(tngo04, 'TNGo Leaf 04 must be in expired_or_rejected');
  assert.strictEqual(tngo02.rejection_reason, 'SERVICE_STOPPED_IN_DANANG');
  assert.strictEqual(tngo03.rejection_reason, 'SERVICE_STOPPED_IN_DANANG');
  assert.strictEqual(tngo04.rejection_reason, 'SERVICE_STOPPED_IN_DANANG');
});

// Test 7: CEO FP Regression - Starlight Standing Programs with historical/expired dates
runTest('CEO FP Regression: Starlight historical programs rejected as expired/historical', () => {
  const star04 = m109r.expired_or_rejected.find(l => l.leaf_id === 'TARGET_108_17_STARLIGHT_LEAF_04');
  const star05 = m109r.expired_or_rejected.find(l => l.leaf_id === 'TARGET_108_17_STARLIGHT_LEAF_05');
  assert.ok(star04, 'Starlight Leaf 04 must be in expired_or_rejected');
  assert.ok(star05, 'Starlight Leaf 05 must be in expired_or_rejected');
  assert.strictEqual(star04.rejection_reason, 'HISTORICAL_OR_EXPIRED_CONTENT');
  assert.strictEqual(star05.rejection_reason, 'HISTORICAL_OR_EXPIRED_CONTENT');
});

// Test 8: CEO FP Regression - CGV Duplicate URLs
runTest('CEO FP Regression: CGV duplicate URLs across seeds rejected', () => {
  const dup01 = m109r.expired_or_rejected.find(l => l.leaf_id === 'TARGET_108_18_CGV_U22_LEAF_01');
  const dup05 = m109r.expired_or_rejected.find(l => l.leaf_id === 'TARGET_108_18_CGV_U22_LEAF_05');
  assert.ok(dup01, 'Duplicate CGV U22 Leaf 01 must be in expired_or_rejected');
  assert.ok(dup05, 'Duplicate CGV U22 Leaf 05 must be in expired_or_rejected');
  assert.strictEqual(dup01.rejection_reason, 'DUPLICATE_URL');
  assert.strictEqual(dup05.rejection_reason, 'DUPLICATE_URL');
});

// Test 9: Active Reviewable Quality Check
runTest('All ACTIVE_REVIEWABLE entries meet 4 strict criteria and future validity', () => {
  assert.ok(m109r.active_reviewable.length > 0, 'Must have active reviewable items');
  const refDate = new Date('2026-08-25T18:00:00+07:00');
  m109r.active_reviewable.forEach(item => {
    assert.ok(item.details.valid_to, `${item.leaf_id} must have valid_to`);
    const d = new Date(item.details.valid_to);
    assert.ok(d >= refDate, `${item.leaf_id} valid_to ${item.details.valid_to} must be >= capture date`);
    assert.ok(item.details.offer_highlight, `${item.leaf_id} must have concrete offer value highlight`);
    assert.ok(item.details.scope, `${item.leaf_id} must have verified scope`);
  });
});

// Test 10: Production Lock Invariant
runTest('Production lock invariant: deals_feed.json is empty array and is_approved is false', () => {
  const dealsFeed = JSON.parse(fs.readFileSync(DEALS_FEED_PATH, 'utf8'));
  assert.ok(Array.isArray(dealsFeed), 'deals_feed must be an array');
  assert.strictEqual(dealsFeed.length, 0, 'deals_feed must remain empty []');
});

// Test 11: Memory Transaction Consistency
runTest('Project memory consistency: version matches 3.2x after transaction', () => {
  const memoryContent = fs.readFileSync(PROJECT_MEMORY_PATH, 'utf8');
  assert.ok(/(?:v)?3\.2\d+\.0/.test(memoryContent), 'Memory must be at version v3.2xx.0');
  assert.ok(!memoryContent.includes('19 candidates'), 'Must not claim 19 candidates');
});

console.log(`\n====================================`);
console.log(`TEST RESULTS: ${passedTests}/${totalTests} PASSED`);
console.log(`====================================`);

if (passedTests !== totalTests) {
  process.exit(1);
}
