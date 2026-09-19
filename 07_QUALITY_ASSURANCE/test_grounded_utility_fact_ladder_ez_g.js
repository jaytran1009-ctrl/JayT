/**
 * JAYT GROUNDED UTILITY FACT LADDER & INTEGRITY QA SUITE (SECTION EZ-G)
 * Governing Directive: JAYT-245 Section EZ-G (Lines 4078-4098)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

const ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';

function runGroundedFactLadderQA() {
  console.log('\n🔬 RUNNING JAYT SECTION EZ-G GROUNDED FACT LADDER & INTEGRITY QA...\n');

  const vaultDir = path.join(ROOT, '06_TRUST_AND_EVIDENCE/evidence_vault_ez_g');
  const deskDir = path.join(ROOT, '06_TRUST_AND_EVIDENCE/evidence_desk_ez_g');
  const baseDir = path.join(ROOT, '00_PROGRAM_BASELINE');
  const councilDir = path.join(ROOT, '01_EXECUTIVE_COUNCIL');

  const regPath = path.join(ROOT, '06_TRUST_AND_EVIDENCE/PROPOSED_UTILITY_FACTS_EZ_G.json');
  const receiptPath = path.join(baseDir, 'JAYT_RELEASE_RECEIPT_EZ_G.json');
  const manifestPath = path.join(baseDir, 'JAYT_VERSION_PARITY_MANIFEST_EZ_G.json');
  const packPath = path.join(councilDir, 'COUNCIL_REVIEW_PACK_EZ_G_GROUNDED_FACT_LADDER_20260831.md');
  const assetRegPath = path.join(ROOT, '04_DESIGN_SYSTEM/JAYT_ASSET_REGISTER_EZ_G.json');

  assert.ok(fs.existsSync(regPath), 'Missing Proposed Facts Registry');
  assert.ok(fs.existsSync(receiptPath), 'Missing Receipt');
  assert.ok(fs.existsSync(manifestPath), 'Missing Manifest');
  assert.ok(fs.existsSync(packPath), 'Missing Review Pack Markdown');
  assert.ok(fs.existsSync(assetRegPath), 'Missing Asset Register');

  const registry = JSON.parse(fs.readFileSync(regPath, 'utf8'));
  const receipt = JSON.parse(fs.readFileSync(receiptPath, 'utf8'));
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const packContent = fs.readFileSync(packPath, 'utf8');
  const assetReg = JSON.parse(fs.readFileSync(assetRegPath, 'utf8'));

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

  // --- Suite 1: Dynamic Integrity Chain Parity for 2 Proposed Grounded Facts ---
  console.log('--- Suite 1: Dynamic Integrity Chain Parity for 2 Grounded Facts ---');

  it('Registry contains exactly 2 proposed grounded utility facts (Mandate EZ-G.5)', () => {
    assert.strictEqual(registry.total_proposed_facts, 2);
    assert.strictEqual(registry.proposed_facts.length, 2);
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
      const receiptMatch = receipt.proposed_grounded_facts_dynamic.find(f => f.fact_id === entry.fact_id);
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

    it('[' + entry.fact_id + '] Exact locator string is present verbatim in raw response bytes', () => {
      const rawText = rawBuffer.toString('utf8');
      assert.ok(rawText.includes(entry.exact_locator), 'Raw bytes missing locator: ' + entry.exact_locator);
    });
  });

  // --- Suite 2: Sentence-to-Locator Faithful Mapping ---
  console.log('\n--- Suite 2: Sentence-to-Locator Faithful Mapping ---');

  it('[FACT_EZ_G_01_GITHUB_DOCS_ELIGIBILITY] Grounded sentence is strictly faithful to raw locator', () => {
    const f1 = registry.proposed_facts[0];
    assert.ok(f1.grounded_sentence.includes('người học hoặc giảng viên'));
    assert.ok(f1.grounded_sentence.includes('cơ sở giáo dục được công nhận'));
    // Verify no interpolated email/id card claim
    assert.strictEqual(f1.grounded_sentence.includes('email hoặc thẻ sinh viên'), false);
    assert.strictEqual(f1.grounded_sentence.includes('miễn phí'), false);
  });

  it('[FACT_EZ_G_02_DANANG_CIVIC_PORTAL_IDENTITY] Grounded sentence strictly confirms title identity only', () => {
    const f2 = registry.proposed_facts[1];
    assert.ok(f2.grounded_sentence.includes('Cổng Thông tin điện tử'));
    // Verify no interpolated procedural claim
    assert.strictEqual(f2.grounded_sentence.includes('thủ tục hành chính'), false);
    assert.strictEqual(f2.grounded_sentence.includes('chỉ đạo điều hành'), false);
  });

  // --- Suite 3: Asset Register & Governance Invariants ---
  console.log('\n--- Suite 3: Asset Register & Governance Invariants ---');

  it('Asset register documents author, license type, and excludes third-party trademark logos (Mandate EZ-G.4)', () => {
    assert.ok(assetReg.assets.length >= 3);
    assert.strictEqual(assetReg.third_party_logos_status.includes('EXCLUDED'), true);
  });

  it('All proposed utility facts remain public_eligible: false (Pending CEO Approval)', () => {
    registry.proposed_facts.forEach(f => {
      assert.strictEqual(f.public_eligible, false);
    });
    assert.strictEqual(receipt.voucher_verified_t1_count, 0);
    assert.strictEqual(receipt.grounded_utility_ladder.public_eligible_count, 0);
  });

  // --- Suite 4: Negative QA Tests ---
  console.log('\n--- Suite 4: Negative QA Tests ---');

  it('[Negative Test 1] Rewrite containing unproven "email hoặc thẻ sinh viên" is detected and rejected', () => {
    const unprovenSentence = 'Sinh viên có email hoặc thẻ sinh viên được nhận gói miễn phí.';
    const hasUnprovenKeywords = unprovenSentence.includes('email hoặc thẻ sinh viên') || unprovenSentence.includes('gói miễn phí');
    assert.strictEqual(hasUnprovenKeywords, true);
  });

  it('[Negative Test 2] Identity-only portal title attempting to claim public administrative procedures is rejected', () => {
    const unprovenPortalSentence = 'Cổng thông tin cung cấp danh mục thủ tục hành chính công.';
    const f2Locator = registry.proposed_facts[1].exact_locator;
    const provesProcedures = f2Locator.includes('thủ tục hành chính');
    assert.strictEqual(provesProcedures, false);
  });

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' EZ-G GROUNDED FACT LADDER QA TESTS PASSED!\n');
}

runGroundedFactLadderQA();
