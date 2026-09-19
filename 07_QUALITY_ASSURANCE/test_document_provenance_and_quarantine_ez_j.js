/**
 * JAYT DOCUMENT PROVENANCE & QUARANTINE QA SUITE (SECTION EZ-J)
 * Governing Directive: JAYT-245 Section EZ-J (Lines 4150-4179)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

const ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';

function runEZJProvenanceAndQuarantineQA() {
  console.log('\n🔬 RUNNING JAYT SECTION EZ-J DOCUMENT PROVENANCE & QUARANTINE QA...\n');

  const vaultDirEZJ = path.join(ROOT, '06_TRUST_AND_EVIDENCE/evidence_vault_ez_j');
  const baseDir = path.join(ROOT, '00_PROGRAM_BASELINE');
  const councilDir = path.join(ROOT, '01_EXECUTIVE_COUNCIL');

  const regPath = path.join(ROOT, '06_TRUST_AND_EVIDENCE/PROPOSED_UTILITY_FACTS_EZ_J.json');
  const receiptPath = path.join(baseDir, 'JAYT_RELEASE_RECEIPT_EZ_J.json');
  const manifestPath = path.join(baseDir, 'JAYT_VERSION_PARITY_MANIFEST_EZ_J.json');
  const packPath = path.join(councilDir, 'COUNCIL_REVIEW_PACK_EZ_J_PROVENANCE_AND_QUARANTINE_20260831.md');

  assert.ok(fs.existsSync(regPath), 'Missing Registry EZ-J');
  assert.ok(fs.existsSync(receiptPath), 'Missing Release Receipt EZ-J');
  assert.ok(fs.existsSync(manifestPath), 'Missing Parity Manifest EZ-J');
  assert.ok(fs.existsSync(packPath), 'Missing Review Pack Markdown EZ-J');

  const registry = JSON.parse(fs.readFileSync(regPath, 'utf8'));
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

  // --- Suite 1: Dynamic Integrity Chain Parity for 2 Pure Document Candidates ---
  console.log('--- Suite 1: Dynamic Integrity Chain Parity for 2 Pure Document Candidates ---');

  it('Registry contains exactly 2 resurveyed candidates (Mandate EZ-J.3)', () => {
    assert.strictEqual(registry.total_resurveyed_candidates, 2);
    assert.strictEqual(registry.resurveyed_candidates.length, 2);
  });

  registry.resurveyed_candidates.forEach((entry, idx) => {
    const binPath = path.join(vaultDirEZJ, entry.bin_file);
    const transcriptPath = path.join(vaultDirEZJ, entry.transcript_file);

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
      const receiptMatch = receipt.resurveyed_pure_document_candidates.find(c => c.candidate_id === entry.candidate_id);
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

  // --- Suite 2: Exact Byte Offset & Excerpt Verification ---
  console.log('\n--- Suite 2: Exact Byte Offset & Excerpt Verification ---');

  registry.resurveyed_candidates.forEach((entry, idx) => {
    const rawBuffer = fs.readFileSync(path.join(vaultDirEZJ, entry.bin_file));
    const rawText = rawBuffer.toString('utf8');
    const transcript = JSON.parse(fs.readFileSync(path.join(vaultDirEZJ, entry.transcript_file), 'utf8'));

    Object.keys(transcript.exact_locators).forEach(key => {
      const loc = transcript.exact_locators[key];
      it('[' + entry.candidate_id + '][' + key + '] Byte offset ' + loc.byte_offset + ' matches exact search string "' + loc.search_string + '"', () => {
        assert.strictEqual(loc.found, true);
        assert.ok(loc.byte_offset >= 0);
        const actualSubstr = rawText.substring(loc.byte_offset, loc.byte_offset + loc.search_string.length);
        assert.strictEqual(actualSubstr, loc.search_string);
      });
    });

    it('[' + entry.candidate_id + '] Satisfies fail-closed isolation (public_eligible: false)', () => {
      assert.strictEqual(transcript.public_eligible, false);
      assert.strictEqual(entry.public_eligible, false);
      assert.strictEqual(transcript.governance_status, 'HELD_INTERNAL_NO_STAGING_RENDER_PENDING_INDEPENDENT_CEO_REVIEW');
    });
  });

  // --- Suite 3: Quarantine Verification for EZ-I Records ---
  console.log('\n--- Suite 3: Quarantine Verification for EZ-I Records ---');

  it('Exactly 2 EZ-I records are registered in quarantine with explicit reason (Mandate EZ-J.1)', () => {
    assert.strictEqual(registry.quarantined_ez_i_records_count, 2);
    assert.strictEqual(registry.quarantined_ez_i_records.length, 2);
    assert.strictEqual(receipt.quarantined_ez_i_candidates.length, 2);
  });

  it('Old EZ-I raw binaries remain preserved in evidence vault for audit history', () => {
    const vaultDirEZI = path.join(ROOT, '06_TRUST_AND_EVIDENCE/evidence_vault_ez_i');
    assert.ok(fs.existsSync(path.join(vaultDirEZI, 'candidate_ez_i_01_notion_education_raw_bytes.bin')));
    assert.ok(fs.existsSync(path.join(vaultDirEZI, 'candidate_ez_i_02_canva_education_raw_bytes.bin')));
  });

  // --- Suite 4: Negative QA & Recreation of EZ-I Faults ---
  console.log('\n--- Suite 4: Negative QA & Recreation of EZ-I Faults ---');

  it('[Negative Test 1] Recreate EZ-I Notion fault: raw bytes do not contain <title>Notion for Education</title>', () => {
    const rawBuffer = fs.readFileSync(path.join(vaultDirEZJ, 'candidate_ez_j_01_notion_education_raw_bytes.bin'));
    const rawText = rawBuffer.toString('utf8');
    const faultyLocatorIndex = rawText.indexOf('<title>Notion for Education</title>');
    assert.strictEqual(faultyLocatorIndex, -1, 'Faulty locator unexpectedly found in Notion raw bytes');
  });

  it('[Negative Test 2] Recreate EZ-I Canva fault: raw bytes do not contain "teachers, students"', () => {
    const rawBuffer = fs.readFileSync(path.join(vaultDirEZJ, 'candidate_ez_j_02_canva_education_raw_bytes.bin'));
    const rawText = rawBuffer.toString('utf8');
    const faultyLocatorIndex = rawText.indexOf('teachers, students');
    assert.strictEqual(faultyLocatorIndex, -1, 'Faulty locator unexpectedly found in Canva raw bytes');
  });

  it('[Negative Test 3] Subresource/Pixel URLs in navigation redirect chain are detected and rejected', () => {
    const contaminatedRedirects = [
      { from: 'https://example.com/page', to: 'https://google-analytics.com/collect' }
    ];
    const isCleanNavigation = (chain) => chain.every(r => !r.to.includes('analytics') && !r.to.includes('pixel') && !r.to.includes('tracking'));
    assert.strictEqual(isCleanNavigation(contaminatedRedirects), false);

    // Verify both new candidate transcripts have 100% clean navigation redirect chains
    registry.resurveyed_candidates.forEach(entry => {
      const transcript = JSON.parse(fs.readFileSync(path.join(vaultDirEZJ, entry.transcript_file), 'utf8'));
      const chain = transcript.navigation_redirect_chain;
      assert.strictEqual(isCleanNavigation(chain.map(r => ({ to: r.document_to_url }))), true);
    });
  });

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' EZ-J PROVENANCE & QUARANTINE QA TESTS PASSED!\n');
}

runEZJProvenanceAndQuarantineQA();
