/**
 * JAYT LINKED TERMS AND URL GRAPH QA SUITE (SECTION EZ-AC)
 * Governing Directive: JAYT-245 Section EZ-AC (Lines 4709-4739)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const puppeteer = require('d:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng/node_modules/puppeteer');

const ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const TARGET_URL = 'http://127.0.0.1:4173/';

async function runEZACLinkedTermsQA() {
  console.log('\n🔬 RUNNING JAYT SECTION EZ-AC LINKED TERMS AND URL GRAPH QA...\n');

  const baseDir = path.join(ROOT, '00_PROGRAM_BASELINE');
  const councilDir = path.join(ROOT, '01_EXECUTIVE_COUNCIL');
  const evidenceDir = path.join(ROOT, '06_TRUST_AND_EVIDENCE');
  const vaultDirAA = path.join(evidenceDir, 'evidence_vault_ez_aa');
  const vaultDirAC = path.join(evidenceDir, 'evidence_vault_ez_ac');

  const quarantinePath = path.join(evidenceDir, 'QUARANTINED_INDIRECT_FOOTER_LINK_NOT_DOCUMENT_RELATION_EZ_AC.json');
  const contractPath = path.join(evidenceDir, 'EVIDENCE_CONTRACT_V3_LINKED_PROMOTIONAL_TERMS_EZ_AC.json');
  const ledgerPath = path.join(evidenceDir, 'LINKED_PROMOTIONAL_TERMS_LEDGER_EZ_AC.json');
  const rawBinBPath = path.join(vaultDirAA, 'candidate_ez_aa_doc_b_program_policy_raw_bytes.bin');
  const rawBinCPath = path.join(vaultDirAC, 'candidate_ez_ac_doc_c_linked_promotional_terms_raw_bytes.bin');
  const receiptPath = path.join(baseDir, 'JAYT_RELEASE_RECEIPT_EZ_AC.json');
  const manifestPath = path.join(baseDir, 'JAYT_VERSION_PARITY_MANIFEST_EZ_AC.json');
  const packPath = path.join(councilDir, 'COUNCIL_REVIEW_PACK_EZ_AC_LINKED_TERMS_PILOT_20260831.md');

  assert.ok(fs.existsSync(quarantinePath), 'Missing Quarantine Ledger EZ-AC');
  assert.ok(fs.existsSync(contractPath), 'Missing Contract v3 EZ-AC');
  assert.ok(fs.existsSync(ledgerPath), 'Missing Ledger EZ-AC');
  assert.ok(fs.existsSync(rawBinBPath), 'Missing Raw Binary Doc B');
  assert.ok(fs.existsSync(rawBinCPath), 'Missing Raw Binary Doc C');
  assert.ok(fs.existsSync(receiptPath), 'Missing Receipt EZ-AC');
  assert.ok(fs.existsSync(manifestPath), 'Missing Manifest EZ-AC');
  assert.ok(fs.existsSync(packPath), 'Missing Pack EZ-AC');

  const quarantine = JSON.parse(fs.readFileSync(quarantinePath, 'utf8'));
  const contract = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
  const ledger = JSON.parse(fs.readFileSync(ledgerPath, 'utf8'));
  const rawBufB = fs.readFileSync(rawBinBPath);
  const rawBufC = fs.readFileSync(rawBinCPath);
  const receipt = JSON.parse(fs.readFileSync(receiptPath, 'utf8'));
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  let totalTests = 0;
  let passedTests = 0;

  async function it(name, fn) {
    totalTests++;
    try {
      await fn();
      console.log('  ✓ ' + name);
      passedTests++;
    } catch (err) {
      console.error('  ✕ ' + name + ': ' + err.message);
      throw err;
    }
  }

  // --- Suite 1: Quarantine of Indirect Footer Link (Mandate EZ-AC.1) ---
  console.log('--- Suite 1: Quarantine of Indirect Footer Link (Mandate EZ-AC.1) ---');

  await it('Quarantine ledger records elimination of indirect footer link inference', () => {
    assert.strictEqual(quarantine.reason, 'QUARANTINED_INDIRECT_FOOTER_LINK_NOT_DOCUMENT_RELATION');
    assert.ok(quarantine.raw_files_preserved.doc_a);
    assert.ok(quarantine.raw_files_preserved.doc_b);
  });

  // --- Suite 2: URL Graph Exact Match & Raw Bytes (Mandate EZ-AC.3) ---
  console.log('\n--- Suite 2: URL Graph Exact Match & Raw Bytes (Mandate EZ-AC.3) ---');

  const computedShaC = crypto.createHash('sha256').update(rawBufC).digest('hex');

  await it('Doc C raw bytes exist, length matches contract, and SHA-256 matches exactly', () => {
    assert.strictEqual(rawBufC.length, contract.source_document_graph.linked_target_document.byte_length);
    assert.strictEqual(computedShaC, contract.source_document_graph.linked_target_document.sha256);
    assert.strictEqual(computedShaC, receipt.linked_terms_evaluation.doc_c_sha256);
  });

  await it('Doc B direct link locator matches exact raw byte slice and equals Doc C request URL', () => {
    const loc = contract.source_document_graph.parent_document.direct_link_locator;
    const slice = rawBufB.subarray(loc.byte_start, loc.byte_end).toString('utf8');
    assert.strictEqual(slice, loc.raw_string);
    assert.strictEqual(contract.url_graph_exact_match.url_equality_verified, true);
    assert.strictEqual(contract.url_graph_exact_match.doc_b_href_target, contract.url_graph_exact_match.doc_c_captured_request_url);
  });

  // --- Suite 3: Sentence-Level Excerpts & Anti-Inference in Matrix (Mandate EZ-AC.3) ---
  console.log('\n--- Suite 3: Sentence-Level Excerpts & Anti-Inference in Matrix (Mandate EZ-AC.3) ---');

  await it('Doc C promotional terms excerpts match exact raw byte slices', () => {
    contract.sentence_level_raw_excerpts.doc_c_excerpts.forEach(ex => {
      const slice = rawBufC.subarray(ex.byte_start, ex.byte_end).toString('utf8');
      assert.strictEqual(slice, ex.raw_string);
    });
  });

  await it('Contract records relation_to_legal_entity_proven = false (no footer copyright inference)', () => {
    const matrix = contract.clause_by_clause_entailment_matrix;
    assert.strictEqual(matrix.promotional_terms_linked_proven, true);
    assert.strictEqual(matrix.relation_to_legal_entity_proven, false);
    assert.strictEqual(matrix.operator_entity_in_linked_terms_body_observed, 'UNOBSERVED');
    assert.strictEqual(matrix.effective_period_clause_observed, 'UNOBSERVED');
    assert.strictEqual(matrix.territory_da_nang_clause_observed, 'UNOBSERVED');
    assert.strictEqual(matrix.total_cost_clause_observed, 'UNOBSERVED');
    assert.strictEqual(matrix.voucher_code_observed, 'UNOBSERVED');
  });

  // --- Suite 4: Fail-Closed Isolation & Classification (Mandates EZ-AC.3 & EZ-AC.4) ---
  console.log('\n--- Suite 4: Fail-Closed Isolation & Classification (Mandates EZ-AC.3 & EZ-AC.4) ---');

  await it('Linked terms outcome is classified as HELD_INTERNAL_LINKED_PROMOTIONAL_TERMS_EVALUATED', () => {
    assert.strictEqual(contract.entailment_and_provenance_verdict.classification, 'HELD_INTERNAL_LINKED_PROMOTIONAL_TERMS_EVALUATED');
    assert.strictEqual(contract.entailment_and_provenance_verdict.public_eligible, false);
    assert.strictEqual(ledger.evaluation_record.pipeline_status, 'HELD_INTERNAL_LINKED_PROMOTIONAL_TERMS_EVALUATED');
    assert.strictEqual(ledger.evaluation_record.public_eligible, false);
    assert.strictEqual(ledger.evaluation_record.public_actions.new_public_cards, 0);
  });

  // --- Suite 5: Puppeteer Live DOM Containment & Parity Verification (Mandate EZ-AC.4) ---
  console.log('\n--- Suite 5: Puppeteer Live DOM Containment & Parity Verification (Mandate EZ-AC.4) ---');

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.goto(TARGET_URL, { waitUntil: 'networkidle0', timeout: 15000 });

    await it('[Browser] Exactly 1 external link in public DOM (GitHub Docs Pilot Only)', async () => {
      const extLinks = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a')).map(a => a.href);
        return links.filter(h => h.startsWith('http') && !h.includes('127.0.0.1') && !h.includes('localhost'));
      });
      assert.strictEqual(extLinks.length, 1);
      assert.ok(extLinks[0].includes('docs.github.com'));
    });

    await it('[Browser] Exactly 1 approved pilot card rendered, 0 new unverified cards', async () => {
      const cardCount = await page.evaluate(() => {
        return document.querySelectorAll('.t2-pilot-card-section').length;
      });
      assert.strictEqual(cardCount, 1);
    });

    await it('[Browser] 0 console errors during full page lifecycle', () => {
      assert.strictEqual(consoleErrors.length, 0);
    });

    await page.close();
  } finally {
    if (browser) await browser.close();
  }

  // --- Suite 6: Parity Verification ---
  console.log('\n--- Suite 6: Parity Verification ---');

  await it('SOT JS and Served JS have identical SHA-256 (ZERO DEPLOY DRIFT)', () => {
    assert.strictEqual(manifest.parity_status, 'PERFECT_MATCH_ZERO_DRIFT');
    assert.strictEqual(manifest.artifacts.sot_js.sha256, manifest.artifacts.served_js.sha256);
    assert.strictEqual(manifest.artifacts.sot_html.sha256, manifest.artifacts.served_html.sha256);
  });

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' EZ-AC LINKED TERMS QA TESTS PASSED!\n');
}

runEZACLinkedTermsQA().catch(e => {
  console.error('Fatal Runner Error:', e);
  process.exit(1);
});
