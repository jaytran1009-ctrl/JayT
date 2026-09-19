/**
 * JAYT STAGING ACCEPTANCE TEST SUITE (069 BATCH 1)
 * Directive: JAYT-REAL-DATA-TO-LAUNCH-069
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

const repoRoot = path.resolve(__dirname, '..');
const stagingFeedPath = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const stagingManifestPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'STAGING_ACCEPTANCE_MANIFEST_069.json');
const ceoDecisionReceiptPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'CEO_DECISION_RECEIPT_069_BATCH1.json');
const leadRegistryPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'track2_lead_registry_068.json');
const candidateDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'candidates', 'pending_review');

console.log('🧪 [TEST-069-STAGING] Khởi chạy bộ kiểm thử chấp nhận Staging Batch 1 (069)...');

// Test 1: Staging Feed has 4 deals
const stagingFeed = JSON.parse(fs.readFileSync(stagingFeedPath, 'utf8'));
assert.strictEqual(stagingFeed.length, 4, 'Staging feed must contain exactly 4 deals');
console.log('  [PASS] Test 1: Staging feed contains 4 approved deals.');

// Test 2: Production feed locked
const prodFeed = JSON.parse(fs.readFileSync(prodFeedPath, 'utf8'));
assert.strictEqual(prodFeed.length, 0, 'Production feed MUST be empty array []');
console.log('  [PASS] Test 2: Production feed is strictly locked ([]).');

// Test 3: Value clusters represented
const categories = new Set(stagingFeed.map(d => d.category));
assert.ok(categories.has('LOCAL_CINEMA'), 'Must have LOCAL_CINEMA');
assert.ok(categories.has('LOCAL_F_AND_B'), 'Must have LOCAL_F_AND_B');
assert.ok(categories.has('LOCAL_COFFEE_TEA'), 'Must have LOCAL_COFFEE_TEA');
console.log('  [PASS] Test 3: Value clusters 3/3 represented (CINEMA, F_AND_B, COFFEE_TEA).');

// Test 4: Candidates files exist
const candidateFiles = [
  'candidate_32_CAND-DNG-GALAXY-HAPPY-DAY-069.json',
  'candidate_33_CAND-DNG-LOTTE-AMAZING-DAY-069.json',
  'candidate_34_CAND-DNG-LOTTERIA-GACAY-M1T1-069.json',
  'candidate_35_CAND-DNG-PHELA-DONGLONG-069.json'
];
candidateFiles.forEach(f => {
  const p = path.join(candidateDir, f);
  assert.ok(fs.existsSync(p), 'Candidate file must exist: ' + f);
});
console.log('  [PASS] Test 4: All 4 Candidate JSON files exist on disk.');

// Test 5: CEO Decision Receipt is valid
const receipt = JSON.parse(fs.readFileSync(ceoDecisionReceiptPath, 'utf8'));
assert.strictEqual(receipt.approved_by, 'CEO_JAY_TRAN', 'Must be approved by CEO_JAY_TRAN');
assert.strictEqual(receipt.decision_status, 'AUTHORIZED_FOR_STAGING_DEPLOYMENT', 'Decision status valid');
assert.strictEqual(receipt.candidates_approved.length, 4, '4 candidates approved');
console.log('  [PASS] Test 5: CEO Decision Receipt valid and authorized.');

// Test 6: Staging Manifest integrity
const manifest = JSON.parse(fs.readFileSync(stagingManifestPath, 'utf8'));
assert.strictEqual(manifest.status, 'STAGING_ACTIVE_CEO_APPROVED');
assert.strictEqual(manifest.production_lock.is_approved, false);
assert.strictEqual(manifest.staging_scope.total_approved_staging_deals, 4);
console.log('  [PASS] Test 6: Staging Manifest valid with strict production lock.');

// Test 7: Lead Registry updated
const leadReg = JSON.parse(fs.readFileSync(leadRegistryPath, 'utf8'));
assert.strictEqual(leadReg.total_new_candidates_created, 4);
assert.strictEqual(leadReg.batch_verdict, 'BATCH_1_CANDIDATES_ACCEPTED_IN_STAGING_069');
console.log('  [PASS] Test 7: Track 2 Lead Registry 068 reflects staged candidates.');

console.log('\n🟢 [TEST-SUMMARY-069] TOÀN BỘ 7/7 KIỂM THỬ STAGING BATCH 1 ĐÃ ĐẠT [PASS]!');
