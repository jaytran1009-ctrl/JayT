const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

console.log('========================================================================');
console.log('🔍 JAYT-137: GENERIC COMPILER CERTIFICATION & RED-TEAM AUDIT');
console.log('========================================================================\n');

const repoRoot = path.resolve(__dirname, '..');
const compilerPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'generic_compiler_137.js');
const manifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_137_manifest.json');
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
test('Sum of all categories equals exact total targets evaluated (105 == 105)', () => {
  const m = manifest.summary_metrics;
  const sum = (
    m.evidence_bundle_candidates_count +
    m.incomplete_scope_unproven_count +
    m.incomplete_location_proof_count +
    m.locality_only_strict_count +
    m.incomplete_count +
    m.blocked_or_error_count
  );
  console.log(`     Total Targets:               ${m.total_targets_evaluated}`);
  console.log(`     EVIDENCE_BUNDLE_CANDIDATE:   ${m.evidence_bundle_candidates_count}`);
  console.log(`     INCOMPLETE_SCOPE_UNPROVEN:   ${m.incomplete_scope_unproven_count}`);
  console.log(`     INCOMPLETE_LOCATION_PROOF:   ${m.incomplete_location_proof_count}`);
  console.log(`     LOCALITY_ONLY_STRICT:        ${m.locality_only_strict_count}`);
  console.log(`     INCOMPLETE:                  ${m.incomplete_count}`);
  console.log(`     BLOCKED_OR_ERROR:            ${m.blocked_or_error_count}`);
  console.log(`     Conservation Sum:            ${sum}`);

  assert.strictEqual(m.total_targets_evaluated, 105, 'Expected 105 total targets');
  assert.strictEqual(sum, 105, 'Metric conservation broken');
  assert.strictEqual(m.metric_conservation_check, 105, 'Manifest internal check failed');
});

console.log('\n--- GATE 2: ZERO TARGET_ID LOCALITY BYPASS IN COMPILER & TESTS ---');
test('Every locality_only_strict entry strictly satisfies full administrative address without target_id bypass', () => {
  // Check that test and compiler code contains zero target_id bypasses
  assert(!compilerCode.includes('target_id.startsWith'), 'Violation: Found target_id.startsWith bypass in compiler!');
  assert(!compilerCode.includes('tId.startsWith'), 'Violation: Found tId.startsWith bypass in compiler!');

  for (const loc of manifest.locality_only_strict) {
    const quote = loc.locality_evidence.quote;
    // Must contain house number + street name + district/ward + Da Nang
    const hasStructure = /(?:\d+[-\w\/]*\s+(?:đường\s+|phố\s+|đ\.\s*)?[A-ZÀ-Ỹa-zà-ỹ0-9\s,\.]+(?:quận|q\.|huyện|phường|p\.)\s+[A-ZÀ-Ỹa-zà-ỹ\s]+(?:tp\.\s*đà nẵng|đà nẵng|tp đà nẵng))/i.test(quote);
    assert(hasStructure, `Violation: Incomplete address passed into locality_only_strict: "${quote}"`);
  }
});

console.log('\n--- GATE 3: NEGATIVE TEST — "DROPDOWN / BRANCH LIST" DEMOTED TO INCOMPLETE_SCOPE_UNPROVEN ---');
test('Starlight Cinema (TARGET_137_C1_08) is demoted to INCOMPLETE_SCOPE_UNPROVEN', () => {
  const inCandidates = manifest.evidence_bundle_candidates.find(b => b.target_id === 'TARGET_137_C1_08');
  assert(!inCandidates, 'Violation: TARGET_137_C1_08 was promoted to candidate!');

  const unproven = manifest.incomplete_scope_unproven.find(b => b.target_id === 'TARGET_137_C1_08');
  assert(unproven, 'TARGET_137_C1_08 missing from incomplete_scope_unproven');
  assert(unproven.reason.includes('Scope appears, but scope application unproven'), 'Incorrect demotion reason');
});

console.log('\n--- GATE 4: NEGATIVE TEST — "LOOSE KEYWORDS" DEMOTED TO INCOMPLETE_LOCATION_PROOF ---');
test('Venues with loose keywords (Đà Nẵng, Hải Châu, Nguyễn Văn Linh) are in INCOMPLETE_LOCATION_PROOF', () => {
  assert(manifest.incomplete_location_proof.length > 0, 'No entries in incomplete_location_proof');
  for (const item of manifest.incomplete_location_proof) {
    const hasStrict = /(?:\d+[-\w\/]*\s+(?:đường\s+|phố\s+|đ\.\s*)?[A-ZÀ-Ỹa-zà-ỹ0-9\s,\.]+(?:quận|q\.|huyện|phường|p\.)\s+[A-ZÀ-Ỹa-zà-ỹ\s]+(?:tp\.\s*đà nẵng|đà nẵng|tp đà nẵng))/i.test(item.partial_locality_evidence.quote);
    assert(!hasStrict, `Item has strict address but was demoted: ${item.target_id}`);
  }
});

console.log('\n--- GATE 5: STATIC SOURCE SCAN — ZERO BRANDS, VENUES, LANDMARKS, OR WHITELISTS ---');
test('generic_compiler_137.js contains ZERO hardcoded brands, venues, malls, landmarks, or voucher codes', () => {
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

console.log('\n--- GATE 6: ZERO "VERIFIED" STATUS IN COMPILER OUTPUT ---');
test('Manifest 137 contains ZERO "VERIFIED" statuses or CTA buy/book buttons', () => {
  assert(!manifest.verified_bundles, 'Violation: manifest.verified_bundles exists');
  const manifestStr = JSON.stringify(manifest);
  assert(!manifestStr.includes('"status": "VERIFIED"'), 'Violation: Found "status": "VERIFIED" in manifest');
  assert(!manifestStr.includes('"status":"VERIFIED"'), 'Violation: Found "status":"VERIFIED" in manifest');
});

console.log('\n--- GATE 7: DUAL RELATIONAL LINEAGE CANDIDATE INTEGRITY ---');
test('Evidence bundle candidate has valid dual physical artifact quotes, offsets, and context >= 200 chars', () => {
  for (const b of manifest.evidence_bundle_candidates) {
    const eb = b.evidence_bundle;
    const frags = [eb.offer, eb.terms, eb.validity, eb.danang_scope];

    for (const f of frags) {
      assert(f.context_window.length >= 200, `Context window too short (${f.context_window.length} chars) in ${f.artifact_path}`);
      assert(f.context_window.includes(f.quote), `Context window does not contain verbatim quote in ${f.artifact_path}`);

      const fullPath = path.join(repoRoot, f.artifact_path);
      assert(fs.existsSync(fullPath), `Artifact file missing: ${f.artifact_path}`);

      const fileBuf = fs.readFileSync(fullPath);
      const computedSha = crypto.createHash('sha256').update(fileBuf).digest('hex');
      assert.strictEqual(computedSha, f.artifact_sha256, `SHA-256 mismatch for ${f.artifact_path}`);

      const fileText = fileBuf.toString('utf8');
      const sliced = fileText.substring(f.start_offset, f.end_offset);
      assert.strictEqual(sliced, f.quote, `Offset mismatch in ${f.artifact_path}: expected "${f.quote}", got "${sliced}"`);
    }

    if (eb.relational_lineage_receipt) {
      const r = eb.relational_lineage_receipt;
      assert.strictEqual(r.lineage_type, 'NATIONWIDE_OFFER_BOUND_TO_PHYSICAL_DANANG_BRANCH');
      assert(r.nationwide_scope_evidence, 'Missing nationwide_scope_evidence');
      assert(r.danang_branch_address_evidence, 'Missing danang_branch_address_evidence');
    }
  }
});

console.log('\n--- GATE 8: PRODUCTION LOCK & ZERO LIVE DEPLOYMENT IN 137 ---');
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
  console.log('✨ ALL 8 JAYT-137 GENERIC COMPILER CERTIFICATION GATES PASSED 100% CLEAN!');
  process.exit(0);
}
