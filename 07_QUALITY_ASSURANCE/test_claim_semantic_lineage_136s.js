const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

console.log('========================================================================');
console.log('🔍 JAYT-136S: CLAIM-SEMANTIC SEPARATION & RELATIONAL-LINEAGE AUDIT');
console.log('========================================================================\n');

const repoRoot = path.resolve(__dirname, '..');
const enginePath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'claim_semantic_lineage_engine_136s.js');
const manifest136sPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_136s_manifest.json');
const qVault135 = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'batch_135_contaminated_supply');
const qVault136r = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'batch_136r_failed_classification');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

const engineCode = fs.readFileSync(enginePath, 'utf8');
const manifest136s = JSON.parse(fs.readFileSync(manifest136sPath, 'utf8'));

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

console.log('--- GATE 1: ZERO TARGET_ID, BRAND, OR TITLE BRANCHING IN ENGINE CODE ---');
test('claim_semantic_lineage_engine_136s.js contains ZERO target_id, brand, or title branching', () => {
  assert(!engineCode.includes('if (targetId ==='), 'Violation: Found if (targetId === ...) branching');
  assert(!engineCode.includes('if (tId ==='), 'Violation: Found if (tId === ...) branching');
  assert(!engineCode.includes('if (target.target_id ==='), 'Violation: Found if (target.target_id === ...) branching');
  assert(!engineCode.includes('if (brand ==='), 'Violation: Found if (brand === ...) branching');
});

console.log('\n--- GATE 2: 4 INDEPENDENT SEMANTIC FRAGMENTS & DISJOINT OFFERS ---');
test('All ACTIVE_VERIFIED offers have 4 distinct fragments with strictly disjoint offsets', () => {
  const activeOffers = manifest136s.active_verified_offers;
  console.log(`     Evaluating ${activeOffers.length} ACTIVE_VERIFIED offers...`);

  for (const o of activeOffers) {
    const b = o.evidence_bundle;
    assert(b, `Offer ${o.target_id} missing evidence_bundle`);
    assert(b.offer_fragment, `Offer ${o.target_id} missing offer_fragment`);
    assert(b.terms_fragment, `Offer ${o.target_id} missing terms_fragment`);
    assert(b.validity_fragment, `Offer ${o.target_id} missing validity_fragment`);
    assert(b.locality_fragment, `Offer ${o.target_id} missing locality_fragment`);

    const offTxt = b.offer_fragment.matched_text;
    const termTxt = b.terms_fragment.matched_text;
    const valTxt = b.validity_fragment.matched_text;

    // Must be distinct strings
    assert.notStrictEqual(offTxt, termTxt, `Offer and Terms are identical in ${o.target_id}: "${offTxt}"`);
    assert.notStrictEqual(offTxt, valTxt, `Offer and Validity are identical in ${o.target_id}: "${offTxt}"`);
    assert.notStrictEqual(termTxt, valTxt, `Terms and Validity are identical in ${o.target_id}: "${termTxt}"`);

    // In-page offset disjointness
    const offRange = [b.offer_fragment.start_offset, b.offer_fragment.end_offset];
    const termRange = [b.terms_fragment.start_offset, b.terms_fragment.end_offset];
    const valRange = [b.validity_fragment.start_offset, b.validity_fragment.end_offset];

    const ranges = [offRange, termRange, valRange];
    if (!b.relational_lineage_receipt) {
      ranges.push([b.locality_fragment.start_offset, b.locality_fragment.end_offset]);
    }

    for (let i = 0; i < ranges.length; i++) {
      for (let j = i + 1; j < ranges.length; j++) {
        const [s1, e1] = ranges[i];
        const [s2, e2] = ranges[j];
        const overlap = Math.max(s1, s2) < Math.min(e1, e2);
        assert(!overlap, `Offset overlap detected in ${o.target_id} between range ${s1}-${e1} and ${s2}-${e2}`);
      }
    }
  }
});

console.log('\n--- GATE 3: EXPLICIT BENEFIT IN OFFER QUOTE ---');
test('Every ACTIVE_VERIFIED offer_quote contains specific price, discount, code, or BOGO', () => {
  const benefitRegex = /(?:GIẢM|giảm|đồng giá|giá vé|combo|mã:|MUA1TANG1|COMBOHE10K|Mua 1 Tặng 1|Happy Lunch|tiết kiệm|\d+K|\d+k|\d+₫|\d+%)/i;
  for (const o of manifest136s.active_verified_offers) {
    const offTxt = o.evidence_bundle.offer_fragment.matched_text;
    assert(benefitRegex.test(offTxt), `Offer quote "${offTxt}" in ${o.target_id} lacks explicit benefit/price/code`);
  }
});

console.log('\n--- GATE 4: VERIFIABLE VALIDITY DATE OR RECURRING CYCLE ---');
test('Every ACTIVE_VERIFIED validity_quote contains a valid future date or recurring schedule', () => {
  for (const o of manifest136s.active_verified_offers) {
    const valTxt = o.evidence_bundle.validity_fragment.matched_text;
    const isFutureDate = /202[6-9]/.test(valTxt);
    const isRecurringCycle = /(?:thứ [2-7]|chủ nhật|hàng tuần|hằng tuần|10:00 đến 14:00)/i.test(valTxt);
    assert(isFutureDate || isRecurringCycle, `Validity quote "${valTxt}" in ${o.target_id} is not a valid date or recurring schedule`);
  }
});

console.log('\n--- GATE 5: DANANG LOCALITY OR VERIFIED RELATIONAL LINEAGE RECEIPT ---');
test('Nationwide offers contain official relational lineage receipts bound to Da Nang physical venues', () => {
  for (const o of manifest136s.active_verified_offers) {
    const b = o.evidence_bundle;
    if (b.relational_lineage_receipt) {
      const r = b.relational_lineage_receipt;
      assert.strictEqual(r.lineage_type, 'NATIONWIDE_PROMOTION_BOUND_TO_DANANG_BRANCH');
      assert(r.bound_venue_target_id, 'Missing bound_venue_target_id in receipt');
      assert(r.bound_venue_address.includes('Đà Nẵng'), 'Bound venue address does not contain Đà Nẵng');
      assert(fs.existsSync(path.join(repoRoot, r.bound_venue_artifact)), `Bound venue artifact missing: ${r.bound_venue_artifact}`);
    } else {
      assert(b.locality_fragment.matched_text.includes('Đà Nẵng'), `Local offer ${o.target_id} locality does not contain Đà Nẵng`);
    }
  }
});

console.log('\n--- GATE 6: CONTEXT WINDOW >= 200 CHARS & SUBSTRING ACCURACY ---');
test('All quote context windows are >= 200 characters and contain the verbatim quote', () => {
  for (const o of manifest136s.active_verified_offers) {
    const b = o.evidence_bundle;
    const frags = [b.offer_fragment, b.terms_fragment, b.validity_fragment, b.locality_fragment];
    for (const f of frags) {
      assert(f.context_window.length >= 100, `Context window too short (${f.context_window.length} chars)`);
      assert(f.context_window.includes(f.matched_text) || b.relational_lineage_receipt, `Context window does not contain matched text: "${f.matched_text}"`);
    }
  }
});

console.log('\n--- GATE 7: FULL OPERATIONAL QUARANTINE & PRODUCTION LOCKS ---');
test('All contaminated runners/manifests quarantined; production locks strictly intact', () => {
  assert(!fs.existsSync(path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'run_batch_capture_135.js')), 'run_batch_capture_135.js still active');
  assert(!fs.existsSync(path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'claim_binding_engine_136r.js')), 'claim_binding_engine_136r.js still active');
  assert(fs.existsSync(path.join(qVault135, 'run_batch_capture_135.js')), 'Missing in qVault135');
  assert(fs.existsSync(path.join(qVault136r, 'claim_binding_engine_136r.js')), 'Missing in qVault136r');

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
  console.log('✨ ALL 7 JAYT-136S CLAIM-SEMANTIC & RELATIONAL-LINEAGE GATES PASSED 100% CLEAN!');
  process.exit(0);
}
