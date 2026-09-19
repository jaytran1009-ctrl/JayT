/**
 * JAYT CORRECTED PILOT ZERO & ANTI-INFERENCE QA SUITE (SECTION EZ-Z)
 * Governing Directive: JAYT-245 Section EZ-Z (Lines 4620-4640)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const puppeteer = require('d:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng/node_modules/puppeteer');

const ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const TARGET_URL = 'http://127.0.0.1:4173/';

async function runEZZCorrectedPilotZeroQA() {
  console.log('\n🔬 RUNNING JAYT SECTION EZ-Z CORRECTED PILOT ZERO & ANTI-INFERENCE QA...\n');

  const baseDir = path.join(ROOT, '00_PROGRAM_BASELINE');
  const councilDir = path.join(ROOT, '01_EXECUTIVE_COUNCIL');
  const evidenceDir = path.join(ROOT, '06_TRUST_AND_EVIDENCE');
  const vaultDir = path.join(evidenceDir, 'evidence_vault_ez_y');

  const quarantinePath = path.join(evidenceDir, 'QUARANTINED_TITLE_TO_OPERATOR_INFERENCE_EZ_Z.json');
  const contractPath = path.join(evidenceDir, 'EVIDENCE_CONTRACT_V3_VOUCHER_PILOT_ZERO_EZ_Z.json');
  const ledgerPath = path.join(evidenceDir, 'VOUCHER_EVIDENCE_PILOT_ZERO_LEDGER_EZ_Z.json');
  const rawBinPath = path.join(vaultDir, 'candidate_ez_y_01_github_pack_raw_bytes.bin');
  const receiptPath = path.join(baseDir, 'JAYT_RELEASE_RECEIPT_EZ_Z.json');
  const manifestPath = path.join(baseDir, 'JAYT_VERSION_PARITY_MANIFEST_EZ_Z.json');
  const packPath = path.join(councilDir, 'COUNCIL_REVIEW_PACK_EZ_Z_CORRECTED_PILOT_ZERO_20260831.md');

  assert.ok(fs.existsSync(quarantinePath), 'Missing Quarantine Ledger EZ-Z');
  assert.ok(fs.existsSync(contractPath), 'Missing Corrected Contract v3 EZ-Z');
  assert.ok(fs.existsSync(ledgerPath), 'Missing Corrected Ledger EZ-Z');
  assert.ok(fs.existsSync(rawBinPath), 'Missing Raw Binary EZ-Z');
  assert.ok(fs.existsSync(receiptPath), 'Missing Receipt EZ-Z');
  assert.ok(fs.existsSync(manifestPath), 'Missing Manifest EZ-Z');
  assert.ok(fs.existsSync(packPath), 'Missing Pack EZ-Z');

  const quarantine = JSON.parse(fs.readFileSync(quarantinePath, 'utf8'));
  const contract = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
  const ledger = JSON.parse(fs.readFileSync(ledgerPath, 'utf8'));
  const rawBuf = fs.readFileSync(rawBinPath);
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

  // --- Suite 1: Quarantine of Title-to-Operator Inference (Mandate EZ-Z.1) ---
  console.log('--- Suite 1: Quarantine of Title-to-Operator Inference (Mandate EZ-Z.1) ---');

  await it('Quarantine ledger records invalid title-to-operator inference with raw file preserved', () => {
    assert.strictEqual(quarantine.reason, 'QUARANTINED_TITLE_TO_OPERATOR_INFERENCE');
    assert.strictEqual(quarantine.raw_file_preserved.byte_length, rawBuf.length);
  });

  // --- Suite 2: Corrected Contract v3 & Ledger State (Mandate EZ-Z.2) ---
  console.log('\n--- Suite 2: Corrected Contract v3 & Ledger State (Mandate EZ-Z.2) ---');

  const computedSha = crypto.createHash('sha256').update(rawBuf).digest('hex');

  await it('Raw response bytes match recomputed SHA-256 and byte length exactly', () => {
    assert.strictEqual(rawBuf.length, contract.capture_metadata.byte_length);
    assert.strictEqual(computedSha, contract.capture_metadata.sha256);
  });

  await it('Corrected contract records operator_proven = false and offer_proven = false', () => {
    const matrix = contract.clause_by_clause_entailment_matrix;
    assert.strictEqual(matrix.title_observed, true);
    assert.strictEqual(matrix.operator_proven, false);
    assert.strictEqual(matrix.program_name_observed, true);
    assert.strictEqual(matrix.offer_proven, false);
    assert.strictEqual(matrix.code_clause_observed, 'UNOBSERVED');
    assert.strictEqual(matrix.condition_clause_observed, 'UNOBSERVED');
    assert.strictEqual(matrix.validity_clause_observed, 'UNOBSERVED');
    assert.strictEqual(matrix.scope_clause_observed, 'UNOBSERVED');
    assert.strictEqual(matrix.total_cost_clause_observed, 'UNOBSERVED');
  });

  await it('Classification is HELD_INTERNAL_DOCUMENT_IDENTITY_ONLY with public_eligible = false', () => {
    assert.strictEqual(contract.entailment_and_provenance_verdict.classification, 'HELD_INTERNAL_DOCUMENT_IDENTITY_ONLY');
    assert.strictEqual(contract.entailment_and_provenance_verdict.public_eligible, false);
    assert.strictEqual(ledger.evaluation_record.pipeline_status, 'HELD_INTERNAL_DOCUMENT_IDENTITY_ONLY');
    assert.strictEqual(ledger.evaluation_record.public_eligible, false);
    assert.strictEqual(ledger.evaluation_record.public_actions.new_public_cards, 0);
  });

  // --- Suite 3: Anti-Inference QA Rule Verification (Mandate EZ-Z.3) ---
  console.log('\n--- Suite 3: Anti-Inference QA Rule Verification (Mandate EZ-Z.3) ---');

  await it('[Anti-Inference Rule] Title string cannot assert institutional operating authority', () => {
    const titleExcerpt = contract.sentence_level_raw_excerpts.find(e => e.excerpt_id === 'CLAUSE_01_TITLE');
    assert.strictEqual(titleExcerpt.claim_class, 'DOCUMENT_IDENTITY');
    assert.ok(!titleExcerpt.faithful_mapping.includes('do GitHub Education cung cấp'));
    assert.ok(!titleExcerpt.faithful_mapping.includes('đơn vị vận hành là'));
  });

  // --- Suite 4: Puppeteer Live DOM Containment & Parity Verification (Mandate EZ-Z.4) ---
  console.log('\n--- Suite 4: Puppeteer Live DOM Containment & Parity Verification (Mandate EZ-Z.4) ---');

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

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' EZ-Z CORRECTED PILOT ZERO & ANTI-INFERENCE QA TESTS PASSED!\n');
}

runEZZCorrectedPilotZeroQA().catch(e => {
  console.error('Fatal Runner Error:', e);
  process.exit(1);
});
