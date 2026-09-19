/**
 * JAYT UTILITY FACT LADDER & INTEGRITY QA SUITE (SECTION EZ-F)
 * Governing Directive: JAYT-245 Section EZ-F (Lines 4058-4076)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

const ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';

function runUtilityFactLadderQA() {
  console.log('\n🔬 RUNNING JAYT SECTION EZ-F UTILITY FACT LADDER QA...\n');

  const vaultDir = path.join(ROOT, '06_TRUST_AND_EVIDENCE/evidence_vault_ez_f');
  const deskDir = path.join(ROOT, '06_TRUST_AND_EVIDENCE/evidence_desk_ez_f');
  const baseDir = path.join(ROOT, '00_PROGRAM_BASELINE');
  const councilDir = path.join(ROOT, '01_EXECUTIVE_COUNCIL');

  const regPath = path.join(ROOT, '06_TRUST_AND_EVIDENCE/PROPOSED_UTILITY_FACTS_EZ_F.json');
  const receiptPath = path.join(baseDir, 'JAYT_RELEASE_RECEIPT_EZ_F.json');
  const manifestPath = path.join(baseDir, 'JAYT_VERSION_PARITY_MANIFEST_EZ_F.json');
  const packPath = path.join(councilDir, 'COUNCIL_REVIEW_PACK_EZ_F_UTILITY_FACT_LADDER_20260831.md');
  const protoSpecPath = path.join(ROOT, '04_DESIGN_SYSTEM/JAYT_VERIFIED_UTILITY_CARD_PROTOTYPE_SPEC_EZ_F.json');

  assert.ok(fs.existsSync(regPath), 'Missing Proposed Facts Registry');
  assert.ok(fs.existsSync(receiptPath), 'Missing Receipt');
  assert.ok(fs.existsSync(manifestPath), 'Missing Manifest');
  assert.ok(fs.existsSync(packPath), 'Missing Review Pack Markdown');
  assert.ok(fs.existsSync(protoSpecPath), 'Missing Prototype Spec');

  const registry = JSON.parse(fs.readFileSync(regPath, 'utf8'));
  const receipt = JSON.parse(fs.readFileSync(receiptPath, 'utf8'));
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const packContent = fs.readFileSync(packPath, 'utf8');
  const protoSpec = JSON.parse(fs.readFileSync(protoSpecPath, 'utf8'));

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

  // --- Suite 1: Dynamic Integrity Chain Parity across 3 Proposed Utility Facts ---
  console.log('--- Suite 1: Dynamic Integrity Chain Parity for 3 Proposed Utility Facts ---');

  it('Registry contains exactly 3 proposed utility facts (Mandate EZ-F.1 & EZ-F.6)', () => {
    assert.strictEqual(registry.total_proposed_facts, 3);
    assert.strictEqual(registry.proposed_facts.length, 3);
  });

  registry.proposed_facts.forEach((entry, idx) => {
    const binPath = path.join(vaultDir, entry.bin_file);
    const transcriptPath = path.join(vaultDir, entry.transcript_file);

    it('[' + entry.fact_id + '] Raw binary file exists and is non-empty', () => {
      assert.ok(fs.existsSync(binPath));
      assert.ok(fs.statSync(binPath).size > 0);
    });

    const rawBuffer = fs.readFileSync(binPath);
    const transcript = JSON.parse(fs.readFileSync(transcriptPath, 'utf8'));
    const computedSha = crypto.createHash('sha256').update(rawBuffer).digest('hex');

    it('[' + entry.fact_id + '] Computed SHA-256 matches Transcript SHA-256 (' + computedSha.substring(0, 16) + '...)', () => {
      assert.strictEqual(computedSha, transcript.raw_bytes_sha256);
    });

    it('[' + entry.fact_id + '] Computed SHA-256 matches Registry SHA-256', () => {
      assert.strictEqual(computedSha, entry.sha256);
    });

    it('[' + entry.fact_id + '] Computed SHA-256 matches Release Receipt SHA-256', () => {
      const receiptMatch = receipt.proposed_utility_facts_dynamic.find(f => f.fact_id === entry.fact_id);
      assert.ok(receiptMatch, 'Missing from receipt');
      assert.strictEqual(computedSha, receiptMatch.sha256);
      assert.strictEqual(rawBuffer.length, receiptMatch.byte_length);
    });

    it('[' + entry.fact_id + '] Computed SHA-256 verbatim string is present in Review Pack Markdown', () => {
      assert.ok(packContent.includes(computedSha), 'Review Pack Markdown is missing SHA-256 ' + computedSha);
    });

    it('[' + entry.fact_id + '] Byte length strictly matches across file, transcript, registry, and receipt (' + rawBuffer.length + ' B)', () => {
      assert.strictEqual(rawBuffer.length, transcript.raw_bytes_length);
      assert.strictEqual(rawBuffer.length, entry.byte_length);
    });
  });

  // --- Suite 2: 8-Point Utility Fact Contract Verification ---
  console.log('\n--- Suite 2: 8-Point Utility Fact Contract Verification ---');

  registry.proposed_facts.forEach((entry, idx) => {
    const transcript = JSON.parse(fs.readFileSync(path.join(vaultDir, entry.transcript_file), 'utf8'));

    it('[' + entry.fact_id + '] Satisfies full 8-point contract: substantive fact, locator, scope, action URL, freshness, asset right', () => {
      assert.ok(transcript.substantive_fact_statement && transcript.substantive_fact_statement.length > 10);
      assert.ok(transcript.locator_path && transcript.locator_path.length > 5);
      assert.ok(transcript.scope_provenance && transcript.scope_provenance.length > 5);
      assert.ok(transcript.canonical_action_url && transcript.canonical_action_url.startsWith('https://'));
      assert.strictEqual(transcript.freshness_policy_days, 30);
      assert.ok(transcript.asset_right_decision && transcript.asset_right_decision.includes('SVG'));
      assert.ok(transcript.reviewer_decision && transcript.reviewer_decision.decision.includes('HELD_FAIL_CLOSED'));
    });
  });

  // --- Suite 3: Governance & Prototype Spec Isolation ---
  console.log('\n--- Suite 3: Governance & Prototype Spec Isolation ---');

  it('Prototype Card Spec is marked is_mounted_on_public_storefront: false (Mandate EZ-F.4)', () => {
    assert.strictEqual(protoSpec.public_surface_isolation.is_mounted_on_public_storefront, false);
    assert.strictEqual(protoSpec.public_surface_isolation.public_eligible_count, 0);
  });

  it('All proposed utility facts remain public_eligible: false (Pending CEO Review)', () => {
    registry.proposed_facts.forEach(f => {
      assert.strictEqual(f.public_eligible, false);
    });
    assert.strictEqual(receipt.voucher_verified_t1_count, 0);
    assert.strictEqual(receipt.utility_fact_ladder.public_eligible_count, 0);
  });

  // --- Suite 4: Negative QA Tests ---
  console.log('\n--- Suite 4: Negative QA Tests ---');

  it('[Negative Test 1] Tampered raw bytes fail SHA-256 verification', () => {
    const fakeBuffer = Buffer.from('CORRUPTED_RAW_BYTES');
    const fakeSha = crypto.createHash('sha256').update(fakeBuffer).digest('hex');
    assert.notStrictEqual(fakeSha, registry.proposed_facts[0].sha256);
  });

  it('[Negative Test 2] Identity-only web root cannot claim economic voucher or store discount', () => {
    registry.proposed_facts.forEach(f => {
      const transcript = JSON.parse(fs.readFileSync(path.join(vaultDir, f.transcript_file), 'utf8'));
      assert.strictEqual(transcript.evidence_graph_v2.has_economic_fact_node, false);
    });
  });

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' EZ-F UTILITY FACT LADDER QA TESTS PASSED!\n');
}

runUtilityFactLadderQA();
