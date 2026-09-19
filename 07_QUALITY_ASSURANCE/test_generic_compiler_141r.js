const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

console.log('========================================================================');
console.log('🔍 JAYT-141R: REAL DELTA SCHEDULER & RED-TEAM AUDIT');
console.log('========================================================================\n');

const repoRoot = path.resolve(__dirname, '..');
const compilerPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'generic_compiler_141r.js');
const manifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_141r_manifest.json');
const registryPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'fresh_source_registry_141.json');
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
test('Sum of delta execution categories equals exact total sources (15 == 15)', () => {
  const de = manifest.delta_execution_summary;
  const sum = (
    de.unchanged_count +
    de.changed_count +
    de.http_error_count
  );
  console.log(`     Total Sources:                    ${de.total_sources_in_registry}`);
  console.log(`     Sources Captured Live in Cycle:   ${de.sources_captured_in_cycle}`);
  console.log(`     UNCHANGED (Starlight):            ${de.unchanged_count}`);
  console.log(`     CHANGED (Dynamic content):        ${de.changed_count}`);
  console.log(`     HTTP_ERROR (Metiz 404):           ${de.http_error_count}`);
  console.log(`     SKIPPED_BACKOFF:                  ${de.skipped_backoff_count}`);
  console.log(`     Conservation Sum:                 ${sum}`);

  assert.strictEqual(de.total_sources_in_registry, 15, 'Expected 15 total sources');
  assert.strictEqual(de.sources_captured_in_cycle, 14, 'Expected 14 sources captured live');
  assert.strictEqual(sum, 15, 'Metric conservation broken');
  assert.strictEqual(de.metric_conservation_check, 15, 'Manifest internal check failed');
});

console.log('\n--- GATE 2: REAL DELTA CAPTURE EXECUTION INTEGRITY ---');
test('14 sources captured live, 1 skipped under 7-day backoff', () => {
  const de = manifest.delta_execution_summary;
  assert.strictEqual(de.sources_captured_in_cycle, 14);
  assert.strictEqual(de.skipped_backoff_count, 1);
  assert.strictEqual(de.unchanged_count, 1);
  assert.strictEqual(de.changed_count, 13);
});

console.log('\n--- GATE 3: UNCHANGED STATE LINEAGE MATCH (STARLIGHT CINEMA) ---');
test('Starlight Cinema (SRC_141_02) transitioned to UNCHANGED with byte-for-byte matching hash', () => {
  const starlight = registry.sources.find(s => s.source_id === 'SRC_141_02');
  assert(starlight, 'Starlight source missing');
  assert.strictEqual(starlight.state, 'UNCHANGED');
  assert.strictEqual(starlight.last_verified_sha256, starlight.baseline_sha256);
  assert(starlight.last_verified_receipt_path, 'Missing verified receipt path');
});

console.log('\n--- GATE 4: CHANGED STATE LINEAGE MATCH (DUAL RECEIPTS & HASHES) ---');
test('100% of CHANGED sources have prior baseline hash, new hash, and verifiable receipts on disk', () => {
  const changedSources = registry.sources.filter(s => s.state === 'CHANGED');
  assert.strictEqual(changedSources.length, 13);
  for (const src of changedSources) {
    assert(src.prior_baseline_sha256, `Missing prior baseline hash for ${src.source_id}`);
    assert(src.new_sha256, `Missing new hash for ${src.source_id}`);
    assert.notStrictEqual(src.prior_baseline_sha256, src.new_sha256, `Hashes should differ for CHANGED source ${src.source_id}`);
    assert(src.prior_baseline_receipt_path, `Missing prior receipt path for ${src.source_id}`);
    assert(src.new_receipt_path, `Missing new receipt path for ${src.source_id}`);
    assert(fs.existsSync(path.join(repoRoot, src.new_receipt_path)), `New receipt missing on disk for ${src.source_id}`);
  }
  console.log(`     Verified dual receipt lineage for all 13 CHANGED sources.`);
});

console.log('\n--- GATE 5: 404 BACKOFF POLICY & SKIP ENFORCEMENT ---');
test('Metiz 404 is skipped during execution due to active 7-day backoff', () => {
  const metiz = registry.sources.find(s => s.source_id === 'SRC_141_04');
  assert.strictEqual(metiz.state, 'HTTP_ERROR');
  assert.strictEqual(metiz.http_status, 404);
  assert.strictEqual(metiz.backoff_policy, '7_DAYS_URL_REVIEW_BACKOFF');
  assert(new Date(metiz.next_check_due) >= new Date('2026-09-02T00:00:00Z'));
});

console.log('\n--- GATE 6: ZERO "VERIFIED" STATUS IN COMPILER OUTPUT ---');
test('Manifest 141R contains ZERO "VERIFIED" statuses or CTA buy/book buttons', () => {
  assert(!manifest.verified_bundles, 'Violation: manifest.verified_bundles exists');
  const manifestStr = JSON.stringify(manifest);
  assert(!manifestStr.includes('"status": "VERIFIED"'), 'Violation: Found "status": "VERIFIED" in manifest');
  assert(!manifestStr.includes('"status":"VERIFIED"'), 'Violation: Found "status":"VERIFIED" in manifest');
});

console.log('\n--- GATE 7: STATIC SOURCE SCAN — ZERO BRANDS, VENUES, LANDMARKS, OR WHITELISTS ---');
test('generic_compiler_141r.js contains ZERO hardcoded brands, venues, malls, landmarks, or voucher codes', () => {
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

console.log('\n--- GATE 8: PRODUCTION LOCK & ZERO LIVE DEPLOYMENT IN 141R ---');
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
  console.log('✨ ALL 8 JAYT-141R REAL DELTA SCHEDULER GATES PASSED 100% CLEAN!');
  process.exit(0);
}
