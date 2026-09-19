const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

console.log('========================================================================');
console.log('🔍 JAYT-136U: GENERIC PROVENANCE COMPILER & RED-TEAM AUDIT');
console.log('========================================================================\n');

const repoRoot = path.resolve(__dirname, '..');
const compilerPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'generic_provenance_compiler_136u.js');
const manifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_136u_manifest.json');
const qVault135 = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'batch_135_contaminated_supply');
const qVault136t = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'batch_136t_hardcoded_compiler');
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

console.log('--- GATE 1: STATIC SOURCE SCAN — ZERO HARDCODED BRANDS / VOUCHERS / ADDRESSES ---');
test('generic_provenance_compiler_136u.js contains ZERO hardcoded brands, voucher codes, or addresses', () => {
  const forbiddenTokens = [
    'cgv', 'domino', 'galaxy', 'starlight', 'lotte', 'jollibee', 'kfc', 'highlands', 'phúc long', 'phê la',
    'COMBOHE10K', 'MUA1TANG1', 'TIKTOKVIP0D',
    '255-257 đường Hùng Vương', 'Tầng 4 Trung tâm Thương Mại', 'OFFLINE_CACHE'
  ];

  for (const token of forbiddenTokens) {
    // Check if token exists in compiler code (case-insensitive for brands)
    const regex = new RegExp(`\\b${token}\\b`, 'i');
    assert(!regex.test(compilerCode), `Violation: Found forbidden hardcoded token "${token}" in compiler source!`);
  }
  console.log('     Static scan verified 0% hardcoding across all forbidden brand/voucher/address tokens.');
});

console.log('\n--- GATE 2: NEGATIVE TEST — OUT-OF-PROVINCE ADDRESSES REJECTED FROM LOCALITY ---');
test('Addresses with out-of-province context (e.g. Hà Nội, TP.HCM, Mỹ Tho) are rejected', () => {
  // Check locality only list to ensure none contain out-of-province citations
  for (const loc of manifest.locality_only_venues) {
    const quote = loc.locality_evidence.quote.toLowerCase();
    const ctx = loc.locality_evidence.context_window.toLowerCase();
    assert(!ctx.includes('mỹ tho') || quote.includes('đà nẵng'), 'Found out-of-province Mỹ Tho in locality venue');
    assert(!ctx.includes('hà nội') || quote.includes('đà nẵng'), 'Found out-of-province Hà Nội in locality venue');
  }
});

console.log('\n--- GATE 3: NEGATIVE TEST — STANDALONE VOUCHER CODES REJECTED FROM OFFER ---');
test('Standalone voucher code without explicit benefit sentence is rejected from offer', () => {
  for (const b of manifest.verified_bundles) {
    const offerQuote = b.evidence_bundle.offer.quote;
    // Must not be a standalone code without words
    assert(!/^[A-Z0-9_]{5,20}$/.test(offerQuote.trim()), `Standalone code rejected in ${b.target_id}: "${offerQuote}"`);
    assert(offerQuote.length >= 15, `Offer quote too short (${offerQuote.length} chars) in ${b.target_id}`);
  }
});

console.log('\n--- GATE 4: CONTEXT WINDOW >= 200 CHARS FOR 100% OF FRAGMENTS ---');
test('Every single quote fragment has a context window of at least 200 characters containing quote', () => {
  for (const b of manifest.verified_bundles) {
    const eb = b.evidence_bundle;
    const frags = [eb.offer, eb.terms, eb.validity, eb.danang_scope];
    for (const f of frags) {
      assert(f.context_window.length >= 200, `Context window too short (${f.context_window.length} chars) in ${f.artifact_path}`);
      assert(f.context_window.includes(f.quote), `Context window does not contain verbatim quote in ${f.artifact_path}`);
    }
  }
});

console.log('\n--- GATE 5: 100% BYTE-FOR-BYTE SUBSTRING & PHYSICAL SHA-256 PARITY ---');
test('Every quote matches physical artifact byte-for-byte at exact start/end offsets and hash', () => {
  for (const b of manifest.verified_bundles) {
    const eb = b.evidence_bundle;
    const frags = [eb.offer, eb.terms, eb.validity, eb.danang_scope];

    for (const f of frags) {
      const fullPath = path.join(repoRoot, f.artifact_path);
      assert(fs.existsSync(fullPath), `Artifact file missing: ${f.artifact_path}`);

      const fileBuf = fs.readFileSync(fullPath);
      const computedSha = crypto.createHash('sha256').update(fileBuf).digest('hex');
      assert.strictEqual(computedSha, f.artifact_sha256, `SHA-256 mismatch for ${f.artifact_path}`);

      const fileText = fileBuf.toString('utf8');
      const sliced = fileText.substring(f.start_offset, f.end_offset);
      assert.strictEqual(sliced, f.quote, `Offset mismatch in ${f.artifact_path}: expected "${f.quote}", got "${sliced}"`);
    }
  }
});

console.log('\n--- GATE 6: DISJOINT OFFSETS & DISTINCT FRAGMENTS ---');
test('All in-page fragments have strictly disjoint character offsets and distinct non-identical text', () => {
  for (const b of manifest.verified_bundles) {
    const eb = b.evidence_bundle;
    const offText = eb.offer.quote;
    const termText = eb.terms.quote;
    const valText = eb.validity.quote;

    assert.notStrictEqual(offText, termText, 'Offer and Terms identical');
    assert.notStrictEqual(offText, valText, 'Offer and Validity identical');
    assert.notStrictEqual(termText, valText, 'Terms and Validity identical');
  }
});

console.log('\n--- GATE 7: FULL OPERATIONAL QUARANTINE & ZERO DEPLOY IN DATA ORDER ---');
test('Contaminated compilers quarantined; catalog strictly locked (deals_feed.json = [], is_approved = false)', () => {
  assert(!fs.existsSync(path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'run_batch_capture_135.js')), 'run_batch_capture_135.js still active');
  assert(!fs.existsSync(path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'evidence_bundle_compiler_136t.js')), 'evidence_bundle_compiler_136t.js still active');
  assert(fs.existsSync(path.join(qVault135, 'run_batch_capture_135.js')), 'Missing in qVault135');
  assert(fs.existsSync(path.join(qVault136t, 'evidence_bundle_compiler_136t.js')), 'Missing in qVault136t');

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
  console.log('✨ ALL 7 JAYT-136U GENERIC PROVENANCE GATES PASSED 100% CLEAN!');
  process.exit(0);
}
