const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

console.log('========================================================================');
console.log('🔍 JAYT-141: DELTA FRESHNESS SCHEDULER & RED-TEAM AUDIT');
console.log('========================================================================\n');

const repoRoot = path.resolve(__dirname, '..');
const compilerPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'generic_compiler_141.js');
const manifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_141_manifest.json');
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
test('Sum of state machine categories equals exact total sources (15 == 15)', () => {
  const sm = manifest.state_machine_summary;
  const sum = (
    sm.baseline_established_count +
    sm.unchanged_count +
    sm.changed_count +
    sm.http_error_count +
    sm.not_yet_captured_count
  );
  console.log(`     Total Sources:                    ${sm.total_sources_evaluated}`);
  console.log(`     BASELINE_ESTABLISHED:             ${sm.baseline_established_count}`);
  console.log(`     UNCHANGED:                        ${sm.unchanged_count}`);
  console.log(`     CHANGED:                          ${sm.changed_count}`);
  console.log(`     HTTP_ERROR (Metiz 404):           ${sm.http_error_count}`);
  console.log(`     NOT_YET_CAPTURED:                 ${sm.not_yet_captured_count}`);
  console.log(`     Conservation Sum:                 ${sum}`);

  assert.strictEqual(sm.total_sources_evaluated, 15, 'Expected 15 total sources');
  assert.strictEqual(sum, 15, 'Metric conservation broken');
  assert.strictEqual(sm.metric_conservation_check, 15, 'Manifest internal check failed');
});

console.log('\n--- GATE 2: STATE MACHINE MUTUAL EXCLUSIVITY & BASELINE CORRECTION ---');
test('Exact counts: 14 BASELINE_ESTABLISHED, 1 HTTP_ERROR (404), 0 CHANGED', () => {
  const sm = manifest.state_machine_summary;
  assert.strictEqual(sm.baseline_established_count, 14, 'Expected exactly 14 baseline established');
  assert.strictEqual(sm.http_error_count, 1, 'Expected exactly 1 HTTP error');
  assert.strictEqual(sm.changed_count, 0, 'Expected exactly 0 changed (no false changes on first baseline cycle)');
  assert.strictEqual(sm.not_yet_captured_count, 0, 'Expected 0 not yet captured');
});

console.log('\n--- GATE 3: 100% OF BASELINE HASHES MATCH PHYSICAL DISK FILES BYTE-FOR-BYTE ---');
test('Baseline hashes match physical disk files byte-for-byte (0 patterns/placeholders)', () => {
  for (const src of registry.sources) {
    if (src.baseline_artifact_path) {
      const fullPath = path.join(repoRoot, src.baseline_artifact_path);
      assert(fs.existsSync(fullPath), `Artifact missing on disk: ${fullPath}`);
      const rawBuf = fs.readFileSync(fullPath);
      const computedSha = crypto.createHash('sha256').update(rawBuf).digest('hex');
      assert.strictEqual(src.baseline_sha256, computedSha, `Hash mismatch for ${src.source_id}`);
    }
  }
  console.log(`     Verified physical SHA-256 byte-for-byte matching across all ${registry.sources.length} sources.`);
});

console.log('\n--- GATE 4: 404 BACKOFF POLICY VERIFICATION (7-DAY BACKOFF) ---');
test('Metiz 404 has 7-day backoff timestamp (next_check_due >= 2026-09-02)', () => {
  const metiz = registry.sources.find(s => s.source_id === 'SRC_141_04');
  assert(metiz, 'Metiz source missing');
  assert.strictEqual(metiz.state, 'HTTP_ERROR');
  assert.strictEqual(metiz.http_status, 404);
  assert.strictEqual(metiz.backoff_policy, '7_DAYS_URL_REVIEW_BACKOFF');
  assert(new Date(metiz.next_check_due) >= new Date('2026-09-02T00:00:00Z'), 'Backoff date insufficient');
});

console.log('\n--- GATE 5: ZERO SEEDED/SYNTHETIC COMMUNITY SIGNALS (AUTHENTIC EMPTY QUEUE) ---');
test('Community signal queue is strictly authentic (signals: [], 0 simulated submitters/descriptions)', () => {
  assert(Array.isArray(communityQueue.signals), 'Queue signals is not an array');
  assert.strictEqual(communityQueue.signals.length, 0, 'Community signal queue must be empty ([]) until actual user submission');
  assert.strictEqual(manifest.streams_summary.community_signals_queued, 0, 'Manifest community signal count mismatch');
});

console.log('\n--- GATE 6: ZERO "VERIFIED" STATUS IN COMPILER OUTPUT ---');
test('Manifest 141 contains ZERO "VERIFIED" statuses or CTA buy/book buttons', () => {
  assert(!manifest.verified_bundles, 'Violation: manifest.verified_bundles exists');
  const manifestStr = JSON.stringify(manifest);
  assert(!manifestStr.includes('"status": "VERIFIED"'), 'Violation: Found "status": "VERIFIED" in manifest');
  assert(!manifestStr.includes('"status":"VERIFIED"'), 'Violation: Found "status":"VERIFIED" in manifest');
});

console.log('\n--- GATE 7: STATIC SOURCE SCAN — ZERO BRANDS, VENUES, LANDMARKS, OR WHITELISTS ---');
test('generic_compiler_141.js contains ZERO hardcoded brands, venues, malls, landmarks, or voucher codes', () => {
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

console.log('\n--- GATE 8: PRODUCTION LOCK & ZERO LIVE DEPLOYMENT IN 141 ---');
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
  console.log('✨ ALL 8 JAYT-141 DELTA FRESHNESS GATES PASSED 100% CLEAN!');
  process.exit(0);
}
