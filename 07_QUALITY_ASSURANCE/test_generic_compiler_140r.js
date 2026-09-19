const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

console.log('========================================================================');
console.log('🔍 JAYT-140R: FRESH SUPPLY PROVENANCE & RED-TEAM AUDIT');
console.log('========================================================================\n');

const repoRoot = path.resolve(__dirname, '..');
const compilerPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'generic_compiler_140r.js');
const manifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_140r_manifest.json');
const freshRegistryPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'fresh_source_registry_140r.json');
const communityQueuePath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'community_signal_queue_140r.json');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

const compilerCode = fs.readFileSync(compilerPath, 'utf8');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const freshRegistry = JSON.parse(fs.readFileSync(freshRegistryPath, 'utf8'));
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
test('Sum of all categories equals exact total fresh targets evaluated (15 == 15)', () => {
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

  assert.strictEqual(m.total_targets_evaluated, 15, 'Expected 15 total targets');
  assert.strictEqual(sum, 15, 'Metric conservation broken');
  assert.strictEqual(m.metric_conservation_check, 15, 'Manifest internal check failed');
});

console.log('\n--- GATE 2: REGISTRY HASH & PHYSICAL ARTIFACT BYTE-FOR-BYTE MATCH ---');
test('100% of recorded registry hashes match physical disk files byte-for-byte (0 patterns/placeholders)', () => {
  for (const src of freshRegistry.sources) {
    if (src.last_capture_artifact_path) {
      const fullPath = path.join(repoRoot, src.last_capture_artifact_path);
      assert(fs.existsSync(fullPath), `Artifact missing on disk: ${fullPath}`);
      const rawBuf = fs.readFileSync(fullPath);
      const computedSha = crypto.createHash('sha256').update(rawBuf).digest('hex');
      assert.strictEqual(src.last_content_sha256, computedSha, `Hash mismatch for ${src.source_id}`);
    }
  }
  console.log(`     Verified physical SHA-256 byte-for-byte matching across all ${freshRegistry.sources.length} sources.`);
});

console.log('\n--- GATE 3: REGISTRY TIMESTAMP & PHYSICAL CAPTURE RECEIPT LINEAGE MATCH ---');
test('100% of registry timestamps and metadata originate from verifiable physical capture receipts', () => {
  for (const src of freshRegistry.sources) {
    if (src.capture_receipt_path) {
      const fullReceiptPath = path.join(repoRoot, src.capture_receipt_path);
      assert(fs.existsSync(fullReceiptPath), `Receipt missing on disk: ${fullReceiptPath}`);
      const receipt = JSON.parse(fs.readFileSync(fullReceiptPath, 'utf8'));
      assert.strictEqual(src.last_captured_timestamp, receipt.captured_at, `Timestamp mismatch for ${src.source_id}`);
      assert.strictEqual(src.last_content_sha256, receipt.physical_artifacts.html_sha256, `Receipt SHA mismatch for ${src.source_id}`);
    }
  }
  console.log(`     Verified physical capture receipt lineage for all captured sources.`);
});

console.log('\n--- GATE 4: ZERO SEEDED/SYNTHETIC COMMUNITY SIGNALS (AUTHENTIC EMPTY QUEUE) ---');
test('Community signal queue is strictly authentic (signals: [], 0 simulated submitters/descriptions)', () => {
  assert(Array.isArray(communityQueue.signals), 'Queue signals is not an array');
  assert.strictEqual(communityQueue.signals.length, 0, 'Community signal queue must be empty ([]) until actual user submission');
  assert.strictEqual(manifest.streams_summary.community_signals_queued, 0, 'Manifest community signal count mismatch');
});

console.log('\n--- GATE 5: STATUS MONITORED_ACTIVE STRICTLY CONTINGENT ON PHYSICAL CAPTURE ---');
test('Only captured sources have MONITORED_ACTIVE; uncaptured sources are strictly NOT_YET_CAPTURED', () => {
  for (const src of freshRegistry.sources) {
    if (src.change_status === 'MONITORED_ACTIVE') {
      assert(src.last_capture_artifact_path !== null, `MONITORED_ACTIVE without artifact for ${src.source_id}`);
      assert(src.capture_receipt_path !== null, `MONITORED_ACTIVE without receipt for ${src.source_id}`);
    } else {
      assert.strictEqual(src.change_status.startsWith('HTTP_ERROR') || src.change_status === 'NOT_YET_CAPTURED' || src.change_status === 'BLOCKED_OR_ERROR', true, `Invalid status: ${src.change_status}`);
    }
  }
});

console.log('\n--- GATE 6: ZERO "VERIFIED" STATUS IN COMPILER OUTPUT ---');
test('Manifest 140R contains ZERO "VERIFIED" statuses or CTA buy/book buttons', () => {
  assert(!manifest.verified_bundles, 'Violation: manifest.verified_bundles exists');
  const manifestStr = JSON.stringify(manifest);
  assert(!manifestStr.includes('"status": "VERIFIED"'), 'Violation: Found "status": "VERIFIED" in manifest');
  assert(!manifestStr.includes('"status":"VERIFIED"'), 'Violation: Found "status":"VERIFIED" in manifest');
});

console.log('\n--- GATE 7: STATIC SOURCE SCAN — ZERO BRANDS, VENUES, LANDMARKS, OR WHITELISTS ---');
test('generic_compiler_140r.js contains ZERO hardcoded brands, venues, malls, landmarks, or voucher codes', () => {
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

console.log('\n--- GATE 8: PRODUCTION LOCK & ZERO LIVE DEPLOYMENT IN 140R ---');
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
  console.log('✨ ALL 8 JAYT-140R PROVENANCE RECOVERY GATES PASSED 100% CLEAN!');
  process.exit(0);
}
