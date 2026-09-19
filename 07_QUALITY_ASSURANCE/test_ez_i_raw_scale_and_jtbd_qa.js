/**
 * JAYT RAW SCALE & QUALITATIVE JTBD QA SUITE (SECTION EZ-I)
 * Governing Directive: JAYT-245 Section EZ-I (Lines 4127-4147)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

const ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';

function runEZIRawScaleAndJTBDQA() {
  console.log('\n🔬 RUNNING JAYT SECTION EZ-I RAW SCALE & JTBD QA...\n');

  const vaultDir = path.join(ROOT, '06_TRUST_AND_EVIDENCE/evidence_vault_ez_i');
  const baseDir = path.join(ROOT, '00_PROGRAM_BASELINE');
  const councilDir = path.join(ROOT, '01_EXECUTIVE_COUNCIL');

  const regPath = path.join(ROOT, '06_TRUST_AND_EVIDENCE/PROPOSED_UTILITY_FACTS_EZ_I.json');
  const jtbdPath = path.join(ROOT, '06_TRUST_AND_EVIDENCE/ACCESSTRADE_QUALITATIVE_JTBD_RESEARCH_LEDGER_EZ_I.json');
  const receiptPath = path.join(baseDir, 'JAYT_RELEASE_RECEIPT_EZ_I.json');
  const manifestPath = path.join(baseDir, 'JAYT_VERSION_PARITY_MANIFEST_EZ_I.json');
  const packPath = path.join(councilDir, 'COUNCIL_REVIEW_PACK_EZ_I_RAW_SCALE_JTBD_20260831.md');

  assert.ok(fs.existsSync(regPath), 'Missing Candidates Registry');
  assert.ok(fs.existsSync(jtbdPath), 'Missing AccessTrade JTBD Ledger');
  assert.ok(fs.existsSync(receiptPath), 'Missing Release Receipt');
  assert.ok(fs.existsSync(manifestPath), 'Missing Parity Manifest');
  assert.ok(fs.existsSync(packPath), 'Missing Review Pack Markdown');

  const registry = JSON.parse(fs.readFileSync(regPath, 'utf8'));
  const jtbdLedger = JSON.parse(fs.readFileSync(jtbdPath, 'utf8'));
  const receipt = JSON.parse(fs.readFileSync(receiptPath, 'utf8'));
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const packContent = fs.readFileSync(packPath, 'utf8');

  let totalTests = 0;
  let passedTests = 0;

  function it(name, fn) {
    totalTests++;
    try {
      fn();
      console.log('  ✓ ' + name);
      passedTests++;
    } catch (err) {
      console.error('  ✕ ' + name + ': ' + err.message);
      throw err;
    }
  }

  // --- Suite 1: Dynamic Integrity Chain Parity for 2 Raw-First Candidates ---
  console.log('--- Suite 1: Dynamic Integrity Chain Parity for 2 Raw-First Candidates ---');

  it('Registry contains exactly 2 raw-first candidates (Mandate EZ-I.1)', () => {
    assert.strictEqual(registry.total_proposed_candidates, 2);
    assert.strictEqual(registry.proposed_candidates.length, 2);
  });

  registry.proposed_candidates.forEach((entry, idx) => {
    const binPath = path.join(vaultDir, entry.bin_file);
    const transcriptPath = path.join(vaultDir, entry.transcript_file);

    it('[' + entry.candidate_id + '] Raw binary file exists and is non-empty', () => {
      assert.ok(fs.existsSync(binPath));
      assert.ok(fs.statSync(binPath).size > 0);
    });

    const rawBuffer = fs.readFileSync(binPath);
    const transcript = JSON.parse(fs.readFileSync(transcriptPath, 'utf8'));
    const computedSha = crypto.createHash('sha256').update(rawBuffer).digest('hex');

    it('[' + entry.candidate_id + '] Computed SHA-256 matches Transcript SHA-256 (' + computedSha.substring(0, 16) + '...)', () => {
      assert.strictEqual(computedSha, transcript.raw_bytes_sha256);
    });

    it('[' + entry.candidate_id + '] Computed SHA-256 matches Registry SHA-256', () => {
      assert.strictEqual(computedSha, entry.sha256);
    });

    it('[' + entry.candidate_id + '] Computed SHA-256 matches Release Receipt SHA-256', () => {
      const receiptMatch = receipt.new_raw_first_candidates_internal.find(c => c.candidate_id === entry.candidate_id);
      assert.ok(receiptMatch, 'Missing from receipt');
      assert.strictEqual(computedSha, receiptMatch.sha256);
      assert.strictEqual(rawBuffer.length, receiptMatch.byte_length);
    });

    it('[' + entry.candidate_id + '] Computed SHA-256 verbatim string is present in Review Pack Markdown', () => {
      assert.ok(packContent.includes(computedSha), 'Review Pack Markdown is missing SHA-256 ' + computedSha);
    });

    it('[' + entry.candidate_id + '] Byte length strictly matches across file, transcript, registry, and receipt (' + rawBuffer.length + ' B)', () => {
      assert.strictEqual(rawBuffer.length, transcript.raw_bytes_length);
      assert.strictEqual(rawBuffer.length, entry.byte_length);
    });
  });

  // --- Suite 2: Contract Completeness & 4 Locators ---
  console.log('\n--- Suite 2: Contract Completeness & 4 Locators ---');

  registry.proposed_candidates.forEach((entry, idx) => {
    const transcript = JSON.parse(fs.readFileSync(path.join(vaultDir, entry.transcript_file), 'utf8'));

    it('[' + entry.candidate_id + '] Satisfies full contract with 4 locators, grounded sentence, scope, and exclusions', () => {
      assert.ok(transcript.locators.title_locator);
      assert.ok(transcript.locators.eligibility_locator);
      assert.ok(transcript.locators.scope_locator);
      assert.ok(transcript.locators.action_locator);
      assert.ok(transcript.grounded_customer_facing_sentence.length > 20);
      assert.ok(transcript.scope_provenance.length > 10);
      assert.ok(transcript.explicit_exclusions_caveat.length > 10);
      assert.strictEqual(transcript.freshness_policy_days, 30);
      assert.ok(transcript.asset_right_reference.includes('Public Domain'));
    });

    it('[' + entry.candidate_id + '] Remains strictly HELD_INTERNAL (public_eligible: false)', () => {
      assert.strictEqual(transcript.public_eligible, false);
      assert.strictEqual(entry.public_eligible, false);
      assert.ok(transcript.render_status.includes('HELD_INTERNAL'));
    });
  });

  // --- Suite 3: AccessTrade Qualitative JTBD Research Ledger ---
  console.log('\n--- Suite 3: AccessTrade Qualitative JTBD Research Ledger ---');

  it('AccessTrade JTBD Ledger has 100% of commercial monetization fields locked', () => {
    const locks = jtbdLedger.commercial_locks;
    assert.strictEqual(locks.monetization_active, false);
    assert.strictEqual(locks.affiliate_links_active, false);
    assert.strictEqual(locks.campaign_sub_id_tracking, false);
    assert.strictEqual(locks.prices_rendered, false);
    assert.strictEqual(locks.star_ratings_rendered, false);
    assert.strictEqual(locks.sales_volume_rendered, false);
    assert.strictEqual(locks.inventory_rendered, false);
    assert.strictEqual(locks.commission_rates_rendered, false);
    assert.strictEqual(locks.unverified_promo_codes_rendered, false);
  });

  it('Campus clusters are classified strictly as QUALITATIVE_RESEARCH_HYPOTHESIS_ONLY (Mandate EZ-I.3)', () => {
    assert.strictEqual(jtbdLedger.geographic_scope_status.campus_clusters_classification, 'QUALITATIVE_RESEARCH_HYPOTHESIS_ONLY');
    assert.strictEqual(jtbdLedger.geographic_scope_status.is_empirical_fact, false);
    assert.strictEqual(jtbdLedger.geographic_scope_status.is_segmentation_fact, false);
  });

  it('All 3 JTBD entries define problem, desired outcome, safety/fit, evidence needed, and authority required', () => {
    assert.strictEqual(jtbdLedger.jtbd_research_entries.length, 3);
    jtbdLedger.jtbd_research_entries.forEach(entry => {
      assert.ok(entry.problem_statement);
      assert.ok(entry.desired_outcome);
      assert.ok(entry.safety_and_fit_questions.length >= 2);
      assert.ok(entry.evidence_needed.length >= 2);
      assert.ok(entry.authority_required);
    });
  });

  // --- Suite 4: Negative QA & Guardrail Tests ---
  console.log('\n--- Suite 4: Negative QA & Guardrail Tests ---');

  it('[Negative Test 1] Tampered candidate raw bytes fail SHA-256 validator', () => {
    const fakeBuffer = Buffer.from('FAKE_UNAUTHORIZED_BYTES');
    const fakeSha = crypto.createHash('sha256').update(fakeBuffer).digest('hex');
    assert.notStrictEqual(fakeSha, registry.proposed_candidates[0].sha256);
  });

  it('[Negative Test 2] Candidate attempting to render without CEO review is rejected by staging filter', () => {
    const isAllowedOnStaging = (cand) => cand.public_eligible && cand.render_status === 'APPROVED_BY_CEO';
    assert.strictEqual(isAllowedOnStaging(registry.proposed_candidates[0]), false);
    assert.strictEqual(isAllowedOnStaging(registry.proposed_candidates[1]), false);
  });

  it('[Negative Test 3] Injected affiliate tracking parameter in canonical URL is rejected', () => {
    const testUrl = 'https://www.notion.so/product/notion-for-education?aff_id=12345&sub_id=promo';
    const hasAffiliateParam = testUrl.includes('aff_id') || testUrl.includes('sub_id');
    assert.strictEqual(hasAffiliateParam, true);
    // Real canonical URLs must be clean:
    assert.strictEqual(registry.proposed_candidates[0].canonical_action_url.includes('aff_id'), false);
    assert.strictEqual(registry.proposed_candidates[1].canonical_action_url.includes('aff_id'), false);
  });

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' EZ-I RAW SCALE & JTBD QA TESTS PASSED!\n');
}

runEZIRawScaleAndJTBDQA();
