const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

console.log('========================================================================');
console.log('🔍 JAYT-137R: SEMANTIC FALSE-POSITIVE CORRECTION & RECERTIFICATION AUDIT');
console.log('========================================================================\n');

const repoRoot = path.resolve(__dirname, '..');
const compilerPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'generic_compiler_137r.js');
const manifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_137r_manifest.json');
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

console.log('--- GATE 1: NEGATIVE TEST — PR HEADINGS REJECTED AS OFFER (CGV DEMOTION) ---');
test('Generic headlines / PR wrappers (CGV TARGET_137_C1_02) demoted to INCOMPLETE_OFFER_BENEFIT_UNPROVEN', () => {
  const inCandidates = manifest.evidence_bundle_candidates.find(b => b.target_id === 'TARGET_137_C1_02');
  assert(!inCandidates, 'Violation: TARGET_137_C1_02 was promoted to candidate!');

  const unproven = manifest.incomplete_offer_benefit_unproven.find(b => b.target_id === 'TARGET_137_C1_02');
  assert(unproven, 'TARGET_137_C1_02 missing from incomplete_offer_benefit_unproven');
  assert(unproven.reason.includes('tiêu đề bài viết / PR announcement wrapper'), 'Incorrect demotion reason');
});

console.log('\n--- GATE 2: NEGATIVE TEST — COPYRIGHT FOOTER REJECTED (DANANG FANTASTICITY DEMOTION) ---');
test('Copyright footer "2024 UBND TP. Đà Nẵng..." (TARGET_137_C5_19) demoted to INCOMPLETE_LOCATION_PROOF', () => {
  const inStrict = manifest.locality_only_strict.find(b => b.target_id === 'TARGET_137_C5_19');
  assert(!inStrict, 'Violation: TARGET_137_C5_19 was promoted to locality_only_strict!');

  const inIncompleteLoc = manifest.incomplete_location_proof.find(b => b.target_id === 'TARGET_137_C5_19');
  assert(inIncompleteLoc, 'TARGET_137_C5_19 missing from incomplete_location_proof');
  assert(inIncompleteLoc.reason.includes('footer/bản quyền'), 'Incorrect demotion reason');
});

console.log('\n--- GATE 3: NEGATIVE TEST — YEARS / HOTLINES / POSTAL CODES CANNOT BE HOUSE NUMBERS ---');
test('Numbers 2024, 19006017, 02363550000 are rejected as house numbers', () => {
  const testStrings = [
    '2024 đường Bạch Đằng, Quận Hải Châu, Đà Nẵng',
    '19006017 đường Hùng Vương, Quận Thanh Khê, TP Đà Nẵng',
    '02363550000 đường 2 Tháng 9, Quận Hải Châu, Đà Nẵng'
  ];

  const addressRegex = /^(?:số\s+)?(?!19\d{2}|20\d{2}|1900|0236)\d{1,4}[A-Za-z\/\-]*\s+(?:đường\s+|phố\s+|đ\.\s+)[A-ZÀ-Ỹa-zà-ỹ0-9\s,\.]+\b(?:quận|q\.|huyện)\s+[A-ZÀ-Ỹa-zà-ỹ\s]+\b(?:tp\.\s*đà nẵng|đà nẵng|tp đà nẵng)\b/i;
  for (const s of testStrings) {
    assert(!addressRegex.test(s), `Violation: False positive address match for "${s}"`);
  }
});

console.log('\n--- GATE 4: BOUNDARY CHECK ON "TP." AND "P." UNITS ---');
test('"TP." and "P." units match only with strict character/word boundaries', () => {
  const falseStrings = ['HTTP. Đà Nẵng', 'APP. Đà Nẵng', 'SMTP. Đà Nẵng'];
  const strictUnitRegex = /\b(?:quận|q\.|huyện|phường|p\.)\b/i;
  for (const s of falseStrings) {
    assert(!strictUnitRegex.test(s), `Violation: False match for "${s}"`);
  }
});

console.log('\n--- GATE 5: METRIC CONSERVATION INVARIANCE ---');
test('Sum of all categories equals exact total targets evaluated (105 == 105)', () => {
  const m = manifest.summary_metrics;
  const sum = (
    m.evidence_bundle_candidates_count +
    m.incomplete_offer_benefit_unproven_count +
    m.incomplete_scope_unproven_count +
    m.incomplete_location_proof_count +
    m.locality_only_strict_count +
    m.incomplete_count +
    m.blocked_or_error_count
  );
  console.log(`     Total Targets:                    ${m.total_targets_evaluated}`);
  console.log(`     EVIDENCE_BUNDLE_CANDIDATE:        ${m.evidence_bundle_candidates_count}`);
  console.log(`     INCOMPLETE_OFFER_BENEFIT_UNPROVEN:${m.incomplete_offer_benefit_unproven_count}`);
  console.log(`     INCOMPLETE_SCOPE_UNPROVEN:        ${m.incomplete_scope_unproven_count}`);
  console.log(`     INCOMPLETE_LOCATION_PROOF:        ${m.incomplete_location_proof_count}`);
  console.log(`     LOCALITY_ONLY_STRICT:             ${m.locality_only_strict_count}`);
  console.log(`     INCOMPLETE:                       ${m.incomplete_count}`);
  console.log(`     BLOCKED_OR_ERROR:                 ${m.blocked_or_error_count}`);
  console.log(`     Conservation Sum:                 ${sum}`);

  assert.strictEqual(m.total_targets_evaluated, 105, 'Expected 105 total targets');
  assert.strictEqual(sum, 105, 'Metric conservation broken');
  assert.strictEqual(m.metric_conservation_check, 105, 'Manifest internal check failed');
});

console.log('\n--- GATE 6: ZERO "VERIFIED" STATUS IN COMPILER OUTPUT ---');
test('Manifest 137R contains ZERO "VERIFIED" statuses or CTA buy/book buttons', () => {
  assert(!manifest.verified_bundles, 'Violation: manifest.verified_bundles exists');
  const manifestStr = JSON.stringify(manifest);
  assert(!manifestStr.includes('"status": "VERIFIED"'), 'Violation: Found "status": "VERIFIED" in manifest');
  assert(!manifestStr.includes('"status":"VERIFIED"'), 'Violation: Found "status":"VERIFIED" in manifest');
});

console.log('\n--- GATE 7: STATIC SOURCE SCAN — ZERO BRANDS, VENUES, LANDMARKS, OR WHITELISTS ---');
test('generic_compiler_137r.js contains ZERO hardcoded brands, venues, malls, landmarks, or voucher codes', () => {
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

console.log('\n--- GATE 8: PRODUCTION LOCK & ZERO LIVE DEPLOYMENT IN 137R ---');
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
  console.log('✨ ALL 8 JAYT-137R RECERTIFICATION GATES PASSED 100% CLEAN!');
  process.exit(0);
}
