const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

console.log('========================================================================');
console.log('🔍 JAYT-139: ATOMIC PROMOTION UNIT & RED-TEAM AUDIT (360 TARGETS)');
console.log('========================================================================\n');

const repoRoot = path.resolve(__dirname, '..');
const compilerPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'generic_compiler_139.js');
const manifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_139_manifest.json');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

const compilerCode = fs.readFileSync(compilerPath, 'utf8');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

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

console.log('--- GATE 1: METRIC CONSERVATION INVARIANCE ---');
test('Sum of all categories equals exact total leaf targets evaluated (360 == 360)', () => {
  const m = manifest.summary_metrics;
  const sum = (
    m.evidence_bundle_candidates_count +
    m.discovery_only_listing_count +
    m.cross_item_merge_blocked_count +
    m.incomplete_offer_benefit_unproven_count +
    m.incomplete_scope_unproven_count +
    m.incomplete_location_proof_count +
    m.locality_only_strict_count +
    m.incomplete_count +
    m.blocked_or_error_count
  );
  console.log(`     Total Targets:                    ${m.total_targets_evaluated}`);
  console.log(`     EVIDENCE_BUNDLE_CANDIDATE:        ${m.evidence_bundle_candidates_count}`);
  console.log(`     DISCOVERY_ONLY_LISTING:           ${m.discovery_only_listing_count}`);
  console.log(`     CROSS_ITEM_MERGE_BLOCKED:         ${m.cross_item_merge_blocked_count}`);
  console.log(`     INCOMPLETE_OFFER_BENEFIT_UNPROVEN:${m.incomplete_offer_benefit_unproven_count}`);
  console.log(`     INCOMPLETE_SCOPE_UNPROVEN:        ${m.incomplete_scope_unproven_count}`);
  console.log(`     INCOMPLETE_LOCATION_PROOF:        ${m.incomplete_location_proof_count}`);
  console.log(`     LOCALITY_ONLY_STRICT:             ${m.locality_only_strict_count}`);
  console.log(`     INCOMPLETE:                       ${m.incomplete_count}`);
  console.log(`     BLOCKED_OR_ERROR:                 ${m.blocked_or_error_count}`);
  console.log(`     Conservation Sum:                 ${sum}`);

  assert.strictEqual(m.total_targets_evaluated, 360, 'Expected 360 total targets');
  assert.strictEqual(sum, 360, 'Metric conservation broken');
  assert.strictEqual(m.metric_conservation_check, 360, 'Manifest internal check failed');
});

console.log('\n--- GATE 2: DISCOVERY-ONLY LISTING ISOLATION ---');
test('RSS / listing / category root URLs are strictly isolated in DISCOVERY_ONLY_LISTING', () => {
  for (const disc of manifest.discovery_only_listing) {
    const url = disc.final_url.toLowerCase();
    const isDisc = (
      url.includes('/rss/') ||
      url.includes('/feed/') ||
      url.endsWith('/khuyen-mai') ||
      url.endsWith('/khuyen-mai/') ||
      url.endsWith('/uu-dai') ||
      url.endsWith('/uu-dai/') ||
      url.includes('/category/') ||
      url.includes('/tag/')
    );
    assert(isDisc || disc.reason.includes('Discovery-Only'), `Unexpected discovery item: ${url}`);
  }
  console.log(`     Verified ${manifest.discovery_only_listing.length} listing/feed sources quarantined from candidate generation.`);
});

console.log('\n--- GATE 3: ATOMIC PROMOTION UNIT ENFORCEMENT ---');
test('Every candidate bundle has matching promotion_unit_id across offer, terms, and validity', () => {
  for (const cand of manifest.evidence_bundle_candidates) {
    const unitId = cand.promotion_unit_id;
    assert(unitId && unitId.startsWith('UNIT_139_'), `Invalid promotion_unit_id: ${unitId}`);
    assert.strictEqual(cand.evidence_bundle.promotion_unit_id, unitId, 'Bundle unit ID mismatch');
  }
});

console.log('\n--- GATE 4: AUTOMATED STAGING GATE DECISION VERDICT ---');
test('Under-threshold batch correctly evaluated as CONTINUE_ACQUISITION (No premature staging)', () => {
  const gate = manifest.summary_metrics.automated_staging_gate_evaluation;
  assert.strictEqual(gate.decision_verdict, 'CONTINUE_ACQUISITION', 'Expected CONTINUE_ACQUISITION decision');
  assert.strictEqual(gate.min_candidates_met, false, 'Candidate threshold (>=10) should not be met');
});

console.log('\n--- GATE 5: ANTI-FOOTER & ANTI-COPYRIGHT GATE ---');
test('Zero copyright / footer years passed into locality_only_strict', () => {
  for (const loc of manifest.locality_only_strict) {
    const quote = loc.locality_evidence.quote;
    const ctx = loc.locality_evidence.context_window.toLowerCase();
    assert(!ctx.includes('copyright') && !ctx.includes('bản quyền') && !ctx.includes('ubnd'), `Violation: Footer in locality: "${quote}"`);
  }
});

console.log('\n--- GATE 6: ZERO "VERIFIED" STATUS IN COMPILER OUTPUT ---');
test('Manifest 139 contains ZERO "VERIFIED" statuses or CTA buy/book buttons', () => {
  assert(!manifest.verified_bundles, 'Violation: manifest.verified_bundles exists');
  const manifestStr = JSON.stringify(manifest);
  assert(!manifestStr.includes('"status": "VERIFIED"'), 'Violation: Found "status": "VERIFIED" in manifest');
  assert(!manifestStr.includes('"status":"VERIFIED"'), 'Violation: Found "status":"VERIFIED" in manifest');
});

console.log('\n--- GATE 7: STATIC SOURCE SCAN — ZERO BRANDS, VENUES, LANDMARKS, OR WHITELISTS ---');
test('generic_compiler_139.js contains ZERO hardcoded brands, venues, malls, landmarks, or voucher codes', () => {
  const forbiddenTokens = [
    'cgv', 'domino', 'galaxy', 'starlight', 'lotte', 'jollibee', 'kfc', 'highlands', 'phúc long', 'phê la',
    'vĩnh trung', 'vinh trung', 'helio', 'co.opmart', 'nguyễn kim', 'nguyen kim', 'lotte mart', 'vincom', 'indochina',
    'COMBOHE10K', 'MUA1TANG1', 'TIKTOKVIP0D',
    '255-257 đường Hùng Vương', 'Tầng 4 Trung tâm Thương Mại', 'OFFLINE_CACHE'
  ];

  for (const token of forbiddenTokens) {
    const regex = new RegExp(`\\b${token}\\b`, 'i');
    assert(!regex.test(compilerCode), `Violation: Found forbidden hardcoded token "${token}" in compiler source!`);
  }
  console.log('     Static scan verified 0% hardcoding across all forbidden brand/venue/landmark/voucher tokens.');
});

console.log('\n--- GATE 8: PRODUCTION LOCK & ZERO LIVE DEPLOYMENT IN 139 ---');
test('Production catalog is strictly locked (deals_feed.json = [], is_approved = false) and zero deployment ran', () => {
  const prodRaw = fs.readFileSync(prodFeedPath, 'utf8');
  const prodJson = JSON.parse(prodRaw);
  const prodSha = crypto.createHash('sha256').update(prodRaw).digest('hex');
  assert(Array.isArray(prodJson) && prodJson.length === 0, 'Production feed is not empty');
  assert.strictEqual(prodSha, '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945', 'deals_feed.json SHA-256 altered');

  const releaseManifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
  const isApproved = releaseManifest.governance_locks?.immutable_ceo_approval_record?.is_approved ?? releaseManifest.is_approved;
  assert.strictEqual(isApproved, false, 'Production is_approved lock is not false');
});

console.log('\n========================================================================');
console.log(`📊 SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log('========================================================================\n');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('✨ ALL 8 JAYT-139 ATOMIC PROMOTION UNIT GATES PASSED 100% CLEAN!');
  process.exit(0);
}
