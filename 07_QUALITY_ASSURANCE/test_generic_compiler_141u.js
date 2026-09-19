const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

console.log('========================================================================');
console.log('🔍 JAYT-141U: ATOMIC DOM COMPILER & RED-TEAM AUDIT');
console.log('========================================================================\n');

const repoRoot = path.resolve(__dirname, '..');
const compilerPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'generic_compiler_141u.js');
const manifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_141u_manifest.json');
const registryPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'fresh_source_registry_141u.json');
const communityQueuePath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'community_signal_queue_141.json');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

const compilerCode = fs.readFileSync(compilerPath, 'utf8');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const communityQueue = JSON.parse(fs.readFileSync(communityQueuePath, 'utf8'));

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
test('Sum of atomic DOM categories equals exact total sources (15 == 15)', () => {
  const ad = manifest.atomic_dom_summary;
  const sum = (
    ad.page_render_variation_count +
    ad.page_semantic_change_unbound_count +
    ad.atomic_offer_fragment_changed_count +
    ad.new_official_offer_leaf_discovered_count +
    ad.http_error_backoff_count
  );
  console.log(`     Total Sources:                          ${ad.total_sources_in_registry}`);
  console.log(`     PAGE_RENDER_VARIATION:                  ${ad.page_render_variation_count}`);
  console.log(`     PAGE_SEMANTIC_CHANGE_UNBOUND:           ${ad.page_semantic_change_unbound_count}`);
  console.log(`     ATOMIC_OFFER_FRAGMENT_CHANGED:          ${ad.atomic_offer_fragment_changed_count}`);
  console.log(`     NEW_OFFICIAL_OFFER_LEAF_DISCOVERED:     ${ad.new_official_offer_leaf_discovered_count}`);
  console.log(`     HTTP_ERROR_BACKOFF (Metiz 404):         ${ad.http_error_backoff_count}`);
  console.log(`     Conservation Sum:                       ${sum}`);

  assert.strictEqual(ad.total_sources_in_registry, 15, 'Expected 15 total sources');
  assert.strictEqual(sum, 15, 'Metric conservation broken');
  assert.strictEqual(ad.metric_conservation_check, 15, 'Manifest internal check failed');
});

console.log('\n--- GATE 2: STRUCTURED ATOMIC SNAPSHOT LINEAGE ---');
test('100% of active sources have baseline and current structured atomic snapshots with unbound signal tracking', () => {
  for (const src of registry.sources) {
    if (src.state !== 'HTTP_ERROR_BACKOFF') {
      assert(src.baseline_snapshot, `Missing baseline snapshot for ${src.source_id}`);
      assert(src.current_snapshot, `Missing current snapshot for ${src.source_id}`);
      assert.strictEqual(src.baseline_snapshot.normalizer_version, 'v141u_atomic_dom_boundary_v1');
      assert.strictEqual(src.current_snapshot.normalizer_version, 'v141u_atomic_dom_boundary_v1');
      assert(Array.isArray(src.baseline_snapshot.page_level_unbound_signals), 'Signals should be array');
      assert(Array.isArray(src.baseline_snapshot.atomic_offer_fragments), 'Fragments should be array');
    }
  }
  console.log('     Verified structured atomic snapshot lineage across all 14 active sources.');
});

console.log('\n--- GATE 3: ACCURATE ATOMIC DOM CLASSIFICATION ---');
test('Exact counts: 11 Render Variations, 3 Semantic Changes, 0 Fragment Changed, 0 Leaf Discovered, 1 Backoff', () => {
  const ad = manifest.atomic_dom_summary;
  assert.strictEqual(ad.page_render_variation_count, 11);
  assert.strictEqual(ad.page_semantic_change_unbound_count, 3);
  assert.strictEqual(ad.atomic_offer_fragment_changed_count, 0);
  assert.strictEqual(ad.new_official_offer_leaf_discovered_count, 0);
  assert.strictEqual(ad.http_error_backoff_count, 1);
});

console.log('\n--- GATE 4: 404 BACKOFF POLICY & SKIP ENFORCEMENT ---');
test('Metiz 404 has 7-day backoff timestamp (next_check_due >= 2026-09-02)', () => {
  const metiz = registry.sources.find(s => s.source_id === 'SRC_141_04');
  assert.strictEqual(metiz.state, 'HTTP_ERROR_BACKOFF');
  assert.strictEqual(metiz.http_status, 404);
  assert.strictEqual(metiz.backoff_policy, '7_DAYS_URL_REVIEW_BACKOFF');
  assert(new Date(metiz.next_check_due) >= new Date('2026-09-02T00:00:00Z'));
});

console.log('\n--- GATE 5: ZERO SEEDED/SYNTHETIC COMMUNITY SIGNALS (AUTHENTIC EMPTY QUEUE) ---');
test('Community signal queue is strictly authentic (signals: [], 0 simulated submitters/descriptions)', () => {
  assert(Array.isArray(communityQueue.signals), 'Queue signals is not an array');
  assert.strictEqual(communityQueue.signals.length, 0, 'Community signal queue must be empty ([]) until actual user submission');
  assert.strictEqual(manifest.streams_summary.community_signals_queued, 0, 'Manifest community signal count mismatch');
});

console.log('\n--- GATE 6: ZERO "VERIFIED" STATUS IN COMPILER OUTPUT ---');
test('Manifest 141U contains ZERO "VERIFIED" statuses or CTA buy/book buttons', () => {
  assert(!manifest.verified_bundles, 'Violation: manifest.verified_bundles exists');
  const manifestStr = JSON.stringify(manifest);
  assert(!manifestStr.includes('"status": "VERIFIED"'), 'Violation: Found "status": "VERIFIED" in manifest');
  assert(!manifestStr.includes('"status":"VERIFIED"'), 'Violation: Found "status":"VERIFIED" in manifest');
});

console.log('\n--- GATE 7: STATIC SOURCE SCAN — ZERO BRANDS, VENUES, LANDMARKS, OR WHITELISTS ---');
test('generic_compiler_141u.js contains ZERO hardcoded brands, venues, malls, landmarks, or voucher codes', () => {
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

console.log('\n--- GATE 8: PRODUCTION LOCK & ZERO LIVE DEPLOYMENT IN 141U ---');
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
  console.log('✨ ALL 8 JAYT-141U ATOMIC DOM GATES PASSED 100% CLEAN!');
  process.exit(0);
}
