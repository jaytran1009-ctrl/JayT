/**
 * JAYT EVIDENCE PILOT ONE DOCUMENT PAIR QA SUITE (SECTION EZ-AA)
 * Governing Directive: JAYT-245 Section EZ-AA (Lines 4642-4666)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const puppeteer = require('d:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng/node_modules/puppeteer');

const ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const TARGET_URL = 'http://127.0.0.1:4173/';

async function runEZEvidencePilotOneQA() {
  console.log('\n🔬 RUNNING JAYT SECTION EZ-AA EVIDENCE PILOT ONE QA...\n');

  const baseDir = path.join(ROOT, '00_PROGRAM_BASELINE');
  const councilDir = path.join(ROOT, '01_EXECUTIVE_COUNCIL');
  const evidenceDir = path.join(ROOT, '06_TRUST_AND_EVIDENCE');
  const vaultDir = path.join(evidenceDir, 'evidence_vault_ez_aa');

  const contractPath = path.join(evidenceDir, 'EVIDENCE_CONTRACT_V3_DOCUMENT_PAIR_PILOT_ONE_EZ_AA.json');
  const ledgerPath = path.join(evidenceDir, 'DOCUMENT_PAIR_PILOT_ONE_LEDGER_EZ_AA.json');
  const rawBinAPath = path.join(vaultDir, 'candidate_ez_aa_doc_a_operator_identity_raw_bytes.bin');
  const rawBinBPath = path.join(vaultDir, 'candidate_ez_aa_doc_b_program_policy_raw_bytes.bin');
  const receiptPath = path.join(baseDir, 'JAYT_RELEASE_RECEIPT_EZ_AA.json');
  const manifestPath = path.join(baseDir, 'JAYT_VERSION_PARITY_MANIFEST_EZ_AA.json');
  const packPath = path.join(councilDir, 'COUNCIL_REVIEW_PACK_EZ_AA_EVIDENCE_PILOT_ONE_20260831.md');

  assert.ok(fs.existsSync(contractPath), 'Missing Contract v3 EZ-AA');
  assert.ok(fs.existsSync(ledgerPath), 'Missing Ledger EZ-AA');
  assert.ok(fs.existsSync(rawBinAPath), 'Missing Raw Binary Doc A EZ-AA');
  assert.ok(fs.existsSync(rawBinBPath), 'Missing Raw Binary Doc B EZ-AA');
  assert.ok(fs.existsSync(receiptPath), 'Missing Receipt EZ-AA');
  assert.ok(fs.existsSync(manifestPath), 'Missing Manifest EZ-AA');
  assert.ok(fs.existsSync(packPath), 'Missing Pack EZ-AA');

  const contract = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
  const ledger = JSON.parse(fs.readFileSync(ledgerPath, 'utf8'));
  const rawBufA = fs.readFileSync(rawBinAPath);
  const rawBufB = fs.readFileSync(rawBinBPath);
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

  // --- Suite 1: Document Pair Raw Binary & Hash Verification (Mandate EZ-AA.1) ---
  console.log('--- Suite 1: Document Pair Raw Binary & Hash Verification (Mandate EZ-AA.1) ---');

  const computedShaA = crypto.createHash('sha256').update(rawBufA).digest('hex');
  const computedShaB = crypto.createHash('sha256').update(rawBufB).digest('hex');

  await it('Doc A raw response bytes exist, length matches contract, and SHA-256 matches exactly', () => {
    assert.strictEqual(rawBufA.length, contract.document_a_capture_metadata.byte_length);
    assert.strictEqual(computedShaA, contract.document_a_capture_metadata.sha256);
    assert.strictEqual(computedShaA, receipt.document_pair_pilot_one.doc_a.sha256);
    assert.strictEqual(computedShaA, ledger.evaluation_record.doc_a_record.sha256);
  });

  await it('Doc B raw response bytes exist, length matches contract, and SHA-256 matches exactly', () => {
    assert.strictEqual(rawBufB.length, contract.document_b_capture_metadata.byte_length);
    assert.strictEqual(computedShaB, contract.document_b_capture_metadata.sha256);
    assert.strictEqual(computedShaB, receipt.document_pair_pilot_one.doc_b.sha256);
    assert.strictEqual(computedShaB, ledger.evaluation_record.doc_b_record.sha256);
  });

  await it('Both documents share the same domain and were discovered zero-login', () => {
    assert.strictEqual(contract.pair_architecture.domain, 'spotify.com');
    assert.strictEqual(contract.document_a_capture_metadata.discovery_method, 'MANUAL_READ_ONLY_NAVIGATION_ZERO_LOGIN');
    assert.strictEqual(contract.document_b_capture_metadata.discovery_method, 'MANUAL_READ_ONLY_NAVIGATION_ZERO_LOGIN');
  });

  // --- Suite 2: Sentence-Level Excerpts & Cross-Document Locators (Mandates EZ-AA.2 & EZ-AA.3) ---
  console.log('\n--- Suite 2: Sentence-Level Excerpts & Cross-Document Locators (Mandates EZ-AA.2 & EZ-AA.3) ---');

  await it('Doc A operator sentence has exact byte start/end positions matching raw binary slice', () => {
    const exA = contract.document_a_sentence_excerpts[0];
    const sliceA = rawBufA.subarray(exA.byte_start, exA.byte_end).toString('utf8');
    assert.strictEqual(sliceA, exA.raw_string);
    assert.ok(sliceA.includes('Spotify AB'));
    assert.ok(sliceA.includes('Stockholm, Thụy Điển'));
  });

  await it('Doc B program and eligibility sentences match exact raw binary slices', () => {
    contract.document_b_sentence_excerpts.forEach(exB => {
      const sliceB = rawBufB.subarray(exB.byte_start, exB.byte_end).toString('utf8');
      assert.strictEqual(sliceB, exB.raw_string);
    });
  });

  await it('Doc B contains verified canonical cross-document link to Doc A legal space', () => {
    const linkLoc = contract.pair_architecture.cross_document_link_locator;
    const linkSlice = rawBufB.subarray(linkLoc.byte_start, linkLoc.byte_end).toString('utf8');
    assert.strictEqual(linkSlice, linkLoc.raw_string);
    assert.ok(linkSlice.includes('spotify.com/vn-vi/legal/'));
  });

  await it('Contract records proven operator, proven policy, and missing fields strictly UNOBSERVED', () => {
    const matrix = contract.clause_by_clause_entailment_matrix;
    assert.strictEqual(matrix.operator_relation_proven, true);
    assert.strictEqual(matrix.program_policy_proven, true);
    assert.strictEqual(matrix.eligibility_policy_proven, true);
    assert.strictEqual(matrix.cross_document_canonical_link_proven, true);
    assert.strictEqual(matrix.voucher_code_clause_observed, 'UNOBSERVED');
    assert.strictEqual(matrix.local_da_nang_scope_clause_observed, 'UNOBSERVED');
    assert.strictEqual(matrix.affiliate_clause_observed, 'UNOBSERVED');
    assert.strictEqual(matrix.asset_usage_clause_observed, 'UNOBSERVED');
    assert.strictEqual(matrix.total_basket_cost_clause_observed, 'UNOBSERVED');
  });

  // --- Suite 3: Fail-Closed Isolation & Classification (Mandates EZ-AA.4 & EZ-AA.5) ---
  console.log('\n--- Suite 3: Fail-Closed Isolation & Classification (Mandates EZ-AA.4 & EZ-AA.5) ---');

  await it('Pilot 1 outcome is classified as HELD_INTERNAL_DOCUMENT_PAIR_RELATION_PROVEN with public_eligible = false', () => {
    assert.strictEqual(contract.entailment_and_provenance_verdict.classification, 'HELD_INTERNAL_DOCUMENT_PAIR_RELATION_PROVEN');
    assert.strictEqual(contract.entailment_and_provenance_verdict.public_eligible, false);
    assert.strictEqual(ledger.evaluation_record.pipeline_status, 'HELD_INTERNAL_DOCUMENT_PAIR_RELATION_PROVEN');
    assert.strictEqual(ledger.evaluation_record.public_eligible, false);
    assert.strictEqual(ledger.evaluation_record.public_actions.new_public_cards, 0);
  });

  // --- Suite 4: Puppeteer Live DOM Containment & Parity Verification (Mandate EZ-AA.4) ---
  console.log('\n--- Suite 4: Puppeteer Live DOM Containment & Parity Verification (Mandate EZ-AA.4) ---');

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

  // --- Suite 5: Parity Verification ---
  console.log('\n--- Suite 5: Parity Verification ---');

  await it('SOT JS and Served JS have identical SHA-256 (ZERO DEPLOY DRIFT)', () => {
    assert.strictEqual(manifest.parity_status, 'PERFECT_MATCH_ZERO_DRIFT');
    assert.strictEqual(manifest.artifacts.sot_js.sha256, manifest.artifacts.served_js.sha256);
    assert.strictEqual(manifest.artifacts.sot_html.sha256, manifest.artifacts.served_html.sha256);
  });

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' EZ-AA EVIDENCE PILOT ONE QA TESTS PASSED!\n');
}

runEZEvidencePilotOneQA().catch(e => {
  console.error('Fatal Runner Error:', e);
  process.exit(1);
});
