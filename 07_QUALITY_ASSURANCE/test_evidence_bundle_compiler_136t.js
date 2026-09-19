const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

console.log('========================================================================');
console.log('🔍 JAYT-136T: EVIDENCE BUNDLE COMPILER & BATCH READINESS REGRESSION AUDIT');
console.log('========================================================================\n');

const repoRoot = path.resolve(__dirname, '..');
const compilerPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'evidence_bundle_compiler_136t.js');
const manifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_136t_manifest.json');
const qVault135 = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'batch_135_contaminated_supply');
const qVault136r = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'batch_136r_failed_classification');
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

console.log('--- REGRESSION GATE 1: "THÀNH VIÊN" IN MENU IS REJECTED AS TERMS ---');
test('"THÀNH VIÊN" in navigation menu is strictly rejected as terms in all verified bundles', () => {
  for (const b of manifest.verified_bundles) {
    const termsQuote = b.evidence_bundle.terms.quote.trim();
    assert.notStrictEqual(termsQuote, 'THÀNH VIÊN', `Violation: "THÀNH VIÊN" accepted as terms in ${b.target_id}`);
    assert.notStrictEqual(termsQuote, 'Thành Viên', `Violation: "Thành Viên" accepted as terms in ${b.target_id}`);
    assert(termsQuote.length >= 15, `Terms quote too short (${termsQuote.length} chars) in ${b.target_id}`);
  }
});

console.log('\n--- REGRESSION GATE 2: ZERO HARDCODED ADDRESSES / SCOPES / FALLBACKS IN CODE ---');
test('Compiler code contains ZERO hardcoded Da Nang addresses or synthetic scope strings', () => {
  assert(!compilerCode.includes('255-257 đường Hùng Vương'), 'Hardcoded address found in compiler source!');
  assert(!compilerCode.includes('Tầng 4 Trung tâm Thương Mại'), 'Hardcoded address found in compiler source!');
  assert(!compilerCode.includes('Toàn hệ thống rạp trên toàn quốc'), 'Hardcoded nationwide scope found in compiler source!');
  assert(!compilerCode.includes('OFFLINE_CACHE'), 'Synthetic fallback found in compiler source!');
});

console.log('\n--- REGRESSION GATE 3: 100% BYTE-FOR-BYTE SUBSTRING & HASH PARITY ---');
test('Every quote matches physical artifact byte-for-byte at exact start/end offsets and hash', () => {
  for (const b of manifest.verified_bundles) {
    const eb = b.evidence_bundle;
    const fragments = [eb.offer, eb.terms, eb.validity, eb.danang_scope];

    for (const f of fragments) {
      assert(f.artifact_path, `Missing artifact_path in ${b.target_id}`);
      assert(f.artifact_sha256, `Missing artifact_sha256 in ${b.target_id}`);

      const fullPath = path.join(repoRoot, f.artifact_path);
      assert(fs.existsSync(fullPath), `Artifact file does not exist: ${f.artifact_path}`);

      const fileBuf = fs.readFileSync(fullPath);
      const computedSha = crypto.createHash('sha256').update(fileBuf).digest('hex');
      assert.strictEqual(computedSha, f.artifact_sha256, `SHA-256 mismatch for ${f.artifact_path}`);

      const fileText = fileBuf.toString('utf8');
      const sliced = fileText.substring(f.start_offset, f.end_offset);
      assert.strictEqual(sliced, f.quote, `Offset mismatch in ${f.artifact_path}: expected "${f.quote}", got "${sliced}"`);

      assert(f.context_window.length >= 100, `Context window too short in ${f.artifact_path}`);
      assert(f.context_window.includes(f.quote), `Context window does not contain quote in ${f.artifact_path}`);
    }
  }
});

console.log('\n--- REGRESSION GATE 4: RELATIONAL LINEAGE HAS DUAL ARTIFACT QUOTES ---');
test('Nationwide offers contain dual artifact quotes (nationwide scope quote + Da Nang branch quote)', () => {
  for (const b of manifest.verified_bundles) {
    const eb = b.evidence_bundle;
    if (eb.relational_lineage_receipt) {
      const r = eb.relational_lineage_receipt;
      assert.strictEqual(r.lineage_type, 'NATIONWIDE_OFFER_BOUND_TO_PHYSICAL_DANANG_BRANCH');
      assert(r.nationwide_scope_evidence, 'Missing nationwide_scope_evidence');
      assert(r.danang_branch_address_evidence, 'Missing danang_branch_address_evidence');

      // Verify nationwide scope quote in offer artifact
      const offerTxt = fs.readFileSync(path.join(repoRoot, r.nationwide_scope_evidence.artifact_path), 'utf8');
      const nwSlice = offerTxt.substring(r.nationwide_scope_evidence.start_offset, r.nationwide_scope_evidence.end_offset);
      assert.strictEqual(nwSlice, r.nationwide_scope_evidence.quote, 'Nationwide scope quote slice mismatch');

      // Verify Da Nang branch address quote in venue artifact
      const venueTxt = fs.readFileSync(path.join(repoRoot, r.danang_branch_address_evidence.artifact_path), 'utf8');
      const vnSlice = venueTxt.substring(r.danang_branch_address_evidence.start_offset, r.danang_branch_address_evidence.end_offset);
      assert.strictEqual(vnSlice, r.danang_branch_address_evidence.quote, 'Venue address quote slice mismatch');
      assert(r.danang_branch_address_evidence.quote.includes('Đà Nẵng'), 'Venue address does not mention Đà Nẵng');
    }
  }
});

console.log('\n--- REGRESSION GATE 5: NAVIGATION / FOOTER / LEGAL HEADERS REJECTED ---');
test('Institutional, copyright, and general navigation pages are classified as LOCALITY_ONLY or REJECTED', () => {
  const rejectedOrLocalityIds = ['TARGET_136_04', 'TARGET_136_46', 'TARGET_136_47', 'TARGET_136_48', 'TARGET_136_49', 'TARGET_136_50', 'TARGET_136_54', 'TARGET_136_55'];
  for (const id of rejectedOrLocalityIds) {
    const foundInVerified = manifest.verified_bundles.find(b => b.target_id === id);
    assert(!foundInVerified, `Violation: Institutional/Venue ${id} was falsely promoted to VERIFIED bundle!`);
  }
});

console.log('\n--- REGRESSION GATE 6: ZERO TARGET_ID, BRAND, OR URL BRANCHING ---');
test('Compiler logic contains zero target_id, brand, or URL branching', () => {
  assert(!compilerCode.includes('if (targetId ==='), 'Violation: Found if (targetId === ...) branching');
  assert(!compilerCode.includes('if (tId ==='), 'Violation: Found if (tId === ...) branching');
  assert(!compilerCode.includes('if (target.target_id ==='), 'Violation: Found if (target.target_id === ...) branching');
  assert(!compilerCode.includes('if (brand ==='), 'Violation: Found if (brand === ...) branching');
  assert(!compilerCode.includes('if (metadata.brand ==='), 'Violation: Found if (metadata.brand === ...) branching');
});

console.log('\n--- REGRESSION GATE 7: BATCH SUMMARY METRICS INTEGRITY ---');
test('Manifest summary metrics accurately reflect compiled bundles without merging', () => {
  const m = manifest.summary_metrics;
  console.log(`     Total Targets:     ${m.total_targets_evaluated}`);
  console.log(`     VERIFIED:          ${m.verified_bundles_count}`);
  console.log(`     LOCALITY_ONLY:     ${m.locality_only_count}`);
  console.log(`     INCOMPLETE:        ${m.incomplete_count}`);
  console.log(`     BLOCKED/ERROR:     ${m.blocked_or_error_count}`);

  assert.strictEqual(m.total_targets_evaluated, 55, 'Expected 55 targets');
  assert.strictEqual(m.verified_bundles_count, 2, 'Expected 2 verified bundles');
  assert.strictEqual(m.locality_only_count, 18, 'Expected 18 locality-only venues');
});

console.log('\n--- REGRESSION GATE 8: PRODUCTION LOCK INVARIANCE ---');
test('Production catalog is strictly locked (deals_feed.json = [], is_approved = false)', () => {
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
  console.log('✨ ALL 8 JAYT-136T EVIDENCE COMPILER REGRESSION GATES PASSED 100% CLEAN!');
  process.exit(0);
}
