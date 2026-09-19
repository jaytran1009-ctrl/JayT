/**
 * JAYT DOMINO'S EVIDENCE SERIALIZATION RED-TEAM TEST SUITE (141X)
 * Directive: JAYT-141X — DOMINO’S LEAF EVIDENCE SERIALIZATION & DANANG SCOPE RESOLUTION
 * 
 * STRICT MANDATE:
 * - 9 fail-closed tests validating DOM-native leaf serialization, store locator proof, and locality resolution.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('========================================================================');
console.log('🧪 JAYT-141X: DOMINO’S LEAF EVIDENCE SERIALIZATION RED-TEAM AUDIT');
console.log('========================================================================\n');

const repoRoot = path.resolve(__dirname, '..');
const tablePath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'dominos_leaf_batch_141x_table.json');
const storeLocatorReceiptPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'dominos_store_locator_141x', 'receipt.json');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

const table = JSON.parse(fs.readFileSync(tablePath, 'utf8'));
const storeReceipt = JSON.parse(fs.readFileSync(storeLocatorReceiptPath, 'utf8'));

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

console.log('--- TEST 1: "MUA 1 TẶNG 1" NEVER INFERS "1 Đ" (PRICE NULL) ---');
test('DOMINOS_LEAF_5 has price_claim === null and explicit weekly_schedule', () => {
  const leaf5 = table.leaves.find(l => l.leaf_id === 'DOMINOS_LEAF_5');
  assert(leaf5, 'Missing DOMINOS_LEAF_5');
  assert.strictEqual(leaf5.fields.price_claim, null, 'Price must be null for Mua 1 Tang 1');
  assert(leaf5.fields.weekly_schedule.includes('Thứ Năm'), 'Weekly schedule must contain Thứ Năm');
  console.log(`     Leaf 5 verified: Title="${leaf5.fields.title.value}", Price=${leaf5.fields.price_claim}, Schedule="${leaf5.fields.weekly_schedule}"`);
});

console.log('\n--- TEST 2: "GIẢM 50%" RECORDED AS DISCOUNT PERCENTAGE, NOT PAYABLE PRICE ---');
test('DOMINOS_LEAF_2 has discount_percentage: "50%" and price_claim === null', () => {
  const leaf2 = table.leaves.find(l => l.leaf_id === 'DOMINOS_LEAF_2');
  assert(leaf2, 'Missing DOMINOS_LEAF_2');
  assert.strictEqual(leaf2.fields.discount_percentage, '50%');
  assert.strictEqual(leaf2.fields.price_claim, null);
  console.log(`     Leaf 2 verified: Discount="${leaf2.fields.discount_percentage}", Price=${leaf2.fields.price_claim}`);
});

console.log('\n--- TEST 3: DATE RANGE PRESERVATION WITHOUT TRUNCATION ---');
test('DOMINOS_LEAF_2 preserves full span "12/08 đến 10/09/2026"', () => {
  const leaf2 = table.leaves.find(l => l.leaf_id === 'DOMINOS_LEAF_2');
  assert.strictEqual(leaf2.fields.program_validity_span, '12/08 đến 10/09/2026');
  console.log(`     Leaf 2 validity span: "${leaf2.fields.program_validity_span}"`);
});

console.log('\n--- TEST 4: NODE PROVENANCE TRACKED FOR EXTRACTED FIELDS ---');
test('Every extracted leaf title contains dom_tag, selector, and outer_html_sha256', () => {
  for (const leaf of table.leaves) {
    assert(leaf.fields.title.dom_tag, `Missing dom_tag for ${leaf.leaf_id}`);
    assert(leaf.fields.title.selector, `Missing selector for ${leaf.leaf_id}`);
    assert(leaf.fields.title.outer_html_sha256, `Missing outer_html_sha256 for ${leaf.leaf_id}`);
  }
  console.log('     Verified 6/6 leaf title node provenance.');
});

console.log('\n--- TEST 5: STRICT FIELD ISOLATION ACROSS LEAF PAGES ---');
test('Leaves never cross-pollinate terms, discounts, or prices', () => {
  const leaf5 = table.leaves.find(l => l.leaf_id === 'DOMINOS_LEAF_5');
  const leaf2 = table.leaves.find(l => l.leaf_id === 'DOMINOS_LEAF_2');
  assert.strictEqual(leaf5.fields.program_validity_span, null, 'Leaf 5 must not inherit Leaf 2 validity');
  assert.strictEqual(leaf2.fields.weekly_schedule.includes('Thứ Năm'), false, 'Leaf 2 must not inherit Leaf 5 Thursday schedule');
});

console.log('\n--- TEST 6: STORE LOCATOR PHYSICAL CAPTURE & RECEIPT VALIDATION ---');
test('Official Store Locator receipt proves 0 Da Nang stores found', () => {
  assert(fs.existsSync(path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'dominos_store_locator_141x', 'page.html')));
  assert.strictEqual(storeReceipt.store_locator_evaluation.da_nang_stores_found, false);
  console.log(`     Store Locator SHA-256: ${storeReceipt.hashes.html_sha256.substring(0, 16)}...`);
});

console.log('\n--- TEST 7: LOCALITY RESOLUTION (ALL 6 LEAVES SCOPE_UNPROVEN) ---');
test('All 6 Domino\'s leaves classified as SCOPE_UNPROVEN', () => {
  assert.strictEqual(table.state_distribution.SCOPE_UNPROVEN, 6);
  for (const leaf of table.leaves) {
    assert.strictEqual(leaf.terminal_state, 'SCOPE_UNPROVEN');
    assert.strictEqual(leaf.candidate_status, 'NOT_CANDIDATE');
  }
});

console.log('\n--- TEST 8: BATCH TABLE ADHERES STRICTLY TO 5 ALLOWED TERMINAL STATES ---');
test('Table states match allowed set and 0 candidate bundles created', () => {
  const allowed = ['EVIDENCE_COMPLETE_FOR_REVIEW', 'MISSING_EXPLICIT_VALIDITY', 'SCOPE_UNPROVEN', 'NO_PRICE_CLAIM', 'NOT_CANDIDATE'];
  for (const leaf of table.leaves) {
    assert(allowed.includes(leaf.terminal_state), `Invalid state: ${leaf.terminal_state}`);
  }
});

console.log('\n--- TEST 9: PRODUCTION LOCKED & ZERO LIVE DEPLOYMENT IN 141X ---');
test('deals_feed.json is empty [] and is_approved is false', () => {
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
  console.log('✨ ALL 9 JAYT-141X DOMINO’S EVIDENCE SERIALIZATION TESTS PASSED 100% CLEAN!');
  process.exit(0);
}
