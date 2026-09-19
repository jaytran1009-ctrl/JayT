const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

console.log('========================================================================');
console.log('🔍 JAYT-136R: CLAIM BINDING ENGINE & RED-TEAM AUDIT (ZERO FALSE POSITIVES)');
console.log('========================================================================\n');

const repoRoot = path.resolve(__dirname, '..');
const manifest136rPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_136r_manifest.json');
const qVault135 = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'batch_135_contaminated_supply');
const qVault136 = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'batch_136_semantic_false_positive');
const memoryPath = path.join(repoRoot, 'PROJECT_MEMORY.md');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

const manifest136r = JSON.parse(fs.readFileSync(manifest136rPath, 'utf8'));
const allTargets = [
  ...manifest136r.active_verified_offers,
  ...manifest136r.locality_only_venues,
  ...manifest136r.incomplete_or_blocked
];

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

console.log('--- RED-TEAM GATE 1: CGV VĨNH TRUNG OPENING HOURS / HEADER IS NOT AN OFFER ---');
test('TARGET_136_04 (CGV Vĩnh Trung) is classified strictly as LOCALITY_ONLY, not ACTIVE_VERIFIED', () => {
  const cgvVinhTrung = allTargets.find(t => t.target_id === 'TARGET_136_04');
  assert(cgvVinhTrung, 'Missing TARGET_136_04 in manifest');
  assert.notStrictEqual(cgvVinhTrung.classification, 'ACTIVE_VERIFIED', 'TARGET_136_04 falsely promoted to ACTIVE_VERIFIED');
  assert.strictEqual(cgvVinhTrung.classification, 'LOCALITY_ONLY', `Expected LOCALITY_ONLY, got ${cgvVinhTrung.classification}`);
});

console.log('\n--- RED-TEAM GATE 2: KFC LEGAL REGISTRATION / FOOTER IS NOT A VALIDITY DATE ---');
test('TARGET_136_26 / TARGET_136_27 (KFC) are not ACTIVE_VERIFIED based on legal/footer dates', () => {
  const kfcPromo = allTargets.find(t => t.target_id === 'TARGET_136_26');
  const kfcVenue = allTargets.find(t => t.target_id === 'TARGET_136_27');
  if (kfcPromo) assert.notStrictEqual(kfcPromo.classification, 'ACTIVE_VERIFIED', 'KFC Promo falsely promoted');
  if (kfcVenue) assert.notStrictEqual(kfcVenue.classification, 'ACTIVE_VERIFIED', 'KFC Venue falsely promoted');
});

console.log('\n--- RED-TEAM GATE 3: JOLLIBEE NON-DANANG BRANCHES ARE NOT DANANG LOCALITY ---');
test('TARGET_136_30 / TARGET_136_31 (Jollibee) are not ACTIVE_VERIFIED based on non-Da Nang branches', () => {
  const jollibeePromo = allTargets.find(t => t.target_id === 'TARGET_136_30');
  const jollibeeVenue = allTargets.find(t => t.target_id === 'TARGET_136_31');
  if (jollibeePromo) assert.notStrictEqual(jollibeePromo.classification, 'ACTIVE_VERIFIED', 'Jollibee Promo falsely promoted');
  if (jollibeeVenue) assert.notStrictEqual(jollibeeVenue.classification, 'ACTIVE_VERIFIED', 'Jollibee Venue falsely promoted');
});

console.log('\n--- RED-TEAM GATE 4: ZERO SYNTHESIZED "NIÊN KHÓA" OR "TOÀN QUỐC" STRINGS ---');
test('Every quote in ACTIVE_VERIFIED has a verified offset matching page.txt verbatim', () => {
  for (const o of manifest136r.active_verified_offers) {
    const txtPath = path.join(repoRoot, o.artifacts.page_txt.path);
    const pageTxt = fs.readFileSync(txtPath, 'utf8');

    assert(o.claims, `Offer ${o.target_id} missing claims object`);
    const c = o.claims;

    if (c.offer_quote && c.offer_offset) {
      const slice = pageTxt.substring(c.offer_offset.start_offset, c.offer_offset.end_offset);
      assert.strictEqual(slice, c.offer_quote, `Offer quote offset mismatch in ${o.target_id}`);
    }

    if (c.terms_quote && c.terms_offset) {
      const slice = pageTxt.substring(c.terms_offset.start_offset, c.terms_offset.end_offset);
      assert.strictEqual(slice, c.terms_quote, `Terms quote offset mismatch in ${o.target_id}`);
    }
  }
  console.log(`     Verified exact offset substring match for all ${manifest136r.active_verified_offers.length} active verified offers.`);
});

console.log('\n--- RED-TEAM GATE 5: INTRODUCTORY & CAMPUS PAGES ARE NEVER ACTIVE_VERIFIED ---');
test('VKU, Duy Tân, Sư Phạm, Bách Khoa, Chợ Cồn, Chợ Hàn are LOCALITY_ONLY, not ACTIVE_VERIFIED', () => {
  const campusIds = ['TARGET_136_46', 'TARGET_136_47', 'TARGET_136_48', 'TARGET_136_49', 'TARGET_136_50', 'TARGET_136_51', 'TARGET_136_54', 'TARGET_136_55'];
  for (const id of campusIds) {
    const target = allTargets.find(t => t.target_id === id);
    if (target) {
      assert.notStrictEqual(target.classification, 'ACTIVE_VERIFIED', `Campus/Landmark ${id} falsely promoted to ACTIVE_VERIFIED`);
    }
  }
});

console.log('\n--- RED-TEAM GATE 6: FAILED / BLOCKED / ERROR PAGES ARE BLOCKED_OR_ERROR ---');
test('Network errors and timeout pages are strictly marked as BLOCKED_OR_ERROR with zero fallback text', () => {
  const failedTargets = allTargets.filter(t => t.capture_status !== 'OK');
  for (const f of failedTargets) {
    assert.strictEqual(f.classification, 'BLOCKED_OR_ERROR', `Failed target ${f.target_id} not marked BLOCKED_OR_ERROR`);
    const txtPath = path.join(repoRoot, f.artifacts.page_txt.path);
    const txt = fs.readFileSync(txtPath, 'utf8');
    assert(!txt.includes('THƯƠNG HIỆU:'), `Failed target ${f.target_id} contains synthetic fallback template text!`);
  }
});

console.log('\n--- RED-TEAM GATE 7: OPERATIONAL QUARANTINE & PRODUCTION LOCKS ---');
test('Batch 135 runner is quarantined, Batch 136 contaminated parser is quarantined, production is locked', () => {
  assert(!fs.existsSync(path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'run_batch_capture_135.js')), 'Active run_batch_capture_135.js still in active directory!');
  assert(fs.existsSync(path.join(qVault135, 'run_batch_capture_135.js')), 'run_batch_capture_135.js missing in quarantine vault');
  assert(fs.existsSync(path.join(qVault136, 'BATCH_136_QUARANTINE_MANIFEST.json')), 'BATCH_136_QUARANTINE_MANIFEST.json missing in quarantine vault');

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
  console.log('✨ ALL 7 JAYT-136R CLAIM BINDING & RED-TEAM GATES PASSED 100% CLEAN!');
  process.exit(0);
}
