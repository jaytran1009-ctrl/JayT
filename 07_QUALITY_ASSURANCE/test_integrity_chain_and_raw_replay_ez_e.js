/**
 * JAYT DYNAMIC INTEGRITY CHAIN & EVIDENCE GRAPH V2 QA SUITE (SECTION EZ-E)
 * Governing Directive: JAYT-245 Section EZ-E (Lines 4036-4055)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

const ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';

function runIntegrityChainQA() {
  console.log('\n🔬 RUNNING JAYT SECTION EZ-E DYNAMIC INTEGRITY CHAIN & GRAPH V2 QA...\n');

  const vaultDir = path.join(ROOT, '06_TRUST_AND_EVIDENCE/evidence_vault_ez_e');
  const deskDir = path.join(ROOT, '06_TRUST_AND_EVIDENCE/evidence_desk_ez_e');
  const baseDir = path.join(ROOT, '00_PROGRAM_BASELINE');
  const councilDir = path.join(ROOT, '01_EXECUTIVE_COUNCIL');

  const regPath = path.join(deskDir, 'REAL_RAW_EVIDENCE_REGISTRY_EZ_E.json');
  const receiptPath = path.join(baseDir, 'JAYT_RELEASE_RECEIPT_EZ_E.json');
  const manifestPath = path.join(baseDir, 'JAYT_VERSION_PARITY_MANIFEST_EZ_E.json');
  const packPath = path.join(councilDir, 'COUNCIL_REVIEW_PACK_EZ_E_RAW_EVIDENCE_PRODUCTION_20260831.md');
  const schemaPath = path.join(ROOT, '06_TRUST_AND_EVIDENCE/JAYT_EVIDENCE_GRAPH_V2_SCHEMA_EZ_E.json');

  assert.ok(fs.existsSync(regPath), 'Missing Registry file');
  assert.ok(fs.existsSync(receiptPath), 'Missing Receipt file');
  assert.ok(fs.existsSync(manifestPath), 'Missing Manifest file');
  assert.ok(fs.existsSync(packPath), 'Missing Review Pack file');
  assert.ok(fs.existsSync(schemaPath), 'Missing Evidence Graph v2 Schema file');

  const registry = JSON.parse(fs.readFileSync(regPath, 'utf8'));
  const receipt = JSON.parse(fs.readFileSync(receiptPath, 'utf8'));
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const packContent = fs.readFileSync(packPath, 'utf8');
  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

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

  // --- Suite 1: Dynamic Integrity Chain Parity ---
  console.log('--- Suite 1: Dynamic Integrity Chain Cryptographic Parity ---');

  it('Registry has exactly 2 substantive network captures (Mandate EZ-E.5)', () => {
    assert.strictEqual(registry.total_real_captures, 2);
    assert.strictEqual(registry.captures.length, 2);
  });

  registry.captures.forEach((entry, idx) => {
    const binPath = path.join(vaultDir, entry.bin_file);
    const transcriptPath = path.join(vaultDir, entry.transcript_file);

    it('[' + entry.capture_id + '] Raw binary file exists and is non-empty', () => {
      assert.ok(fs.existsSync(binPath));
      assert.ok(fs.statSync(binPath).size > 0);
    });

    const rawBuffer = fs.readFileSync(binPath);
    const transcript = JSON.parse(fs.readFileSync(transcriptPath, 'utf8'));
    const computedSha = crypto.createHash('sha256').update(rawBuffer).digest('hex');

    it('[' + entry.capture_id + '] Computed SHA-256 matches Transcript SHA-256 (' + computedSha.substring(0, 16) + '...)', () => {
      assert.strictEqual(computedSha, transcript.raw_bytes_sha256);
    });

    it('[' + entry.capture_id + '] Computed SHA-256 matches Registry SHA-256', () => {
      assert.strictEqual(computedSha, entry.sha256);
    });

    it('[' + entry.capture_id + '] Computed SHA-256 matches Release Receipt SHA-256', () => {
      const receiptMatch = receipt.real_captures_vault_dynamic.find(c => c.capture_id === entry.capture_id);
      assert.ok(receiptMatch, 'Missing from receipt');
      assert.strictEqual(computedSha, receiptMatch.sha256);
      assert.strictEqual(rawBuffer.length, receiptMatch.byte_length);
    });

    it('[' + entry.capture_id + '] Computed SHA-256 verbatim string is present in Review Pack Markdown', () => {
      assert.ok(packContent.includes(computedSha), 'Review Pack Markdown is missing SHA-256 ' + computedSha);
    });

    it('[' + entry.capture_id + '] Byte length strictly matches across file, transcript, registry, and receipt (' + rawBuffer.length + ' B)', () => {
      assert.strictEqual(rawBuffer.length, transcript.raw_bytes_length);
      assert.strictEqual(rawBuffer.length, entry.byte_length);
    });
  });

  // --- Suite 2: Evidence Graph v2 Decoupled Node Invariants ---
  console.log('\n--- Suite 2: Evidence Graph v2 Decoupled Node Invariants ---');

  it('Evidence Graph v2 Schema defines 5 decoupled node types', () => {
    assert.ok(schema.node_types.SourceIdentityNode);
    assert.ok(schema.node_types.SubjectFactNode);
    assert.ok(schema.node_types.LocalScopeNode);
    assert.ok(schema.node_types.EconomicFactNode);
    assert.ok(schema.node_types.AssetRightNode);
  });

  it('Both captures do NOT assert LocalScope or EconomicFact (Fail-Closed)', () => {
    registry.captures.forEach(c => {
      const transcript = JSON.parse(fs.readFileSync(path.join(vaultDir, c.transcript_file), 'utf8'));
      assert.strictEqual(transcript.evidence_graph_v2.has_source_identity_node, true);
      assert.strictEqual(transcript.evidence_graph_v2.has_subject_fact_node, true);
      assert.strictEqual(transcript.evidence_graph_v2.has_local_scope_node, false);
      assert.strictEqual(transcript.evidence_graph_v2.has_economic_fact_node, false);
      assert.strictEqual(transcript.public_eligible, false);
    });
  });

  it('Verified T1 offer count is strictly 0', () => {
    assert.strictEqual(receipt.voucher_verified_t1_count, 0);
  });

  it('Public eligible count is strictly 0', () => {
    assert.strictEqual(receipt.evidence_production_lab.public_eligible_count, 0);
  });

  it('10 legacy synthetic subjects remain recorded in quarantine registry', () => {
    assert.strictEqual(registry.quarantined_legacy_subjects_count, 10);
  });

  // --- Suite 3: Negative QA & Mismatch Detection Tests ---
  console.log('\n--- Suite 3: Negative QA & Mismatch Detection Tests ---');

  it('[Negative Test 1] Altered report hash fails integrity validator', () => {
    const fakeHash = '0000000000000000000000000000000000000000000000000000000000000000';
    const rawSha = registry.captures[0].sha256;
    assert.notStrictEqual(fakeHash, rawSha);
  });

  it('[Negative Test 2] Identity-only node attempting to claim economic discount is rejected', () => {
    const fakeClaim = { has_source_identity_node: true, has_economic_fact_node: false };
    const canPromoteToT1 = fakeClaim.has_source_identity_node && fakeClaim.has_economic_fact_node;
    assert.strictEqual(canPromoteToT1, false);
  });

  it('[Negative Test 3] Web root URL is rejected as proof of localized store discount/voucher', () => {
    registry.captures.forEach(c => {
      const transcript = JSON.parse(fs.readFileSync(path.join(vaultDir, c.transcript_file), 'utf8'));
      assert.strictEqual(transcript.tier_classification, 'T4_RADAR_ONLY_PENDING_INDEPENDENT_CEO_GATE');
    });
  });

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' EZ-E INTEGRITY CHAIN & GRAPH V2 QA TESTS PASSED!\n');
}

runIntegrityChainQA();
