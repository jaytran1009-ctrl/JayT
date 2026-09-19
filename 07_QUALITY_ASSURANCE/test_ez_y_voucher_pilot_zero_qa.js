/**
 * JAYT VOUCHER EVIDENCE PILOT ZERO QA SUITE (SECTION EZ-Y)
 * Governing Directive: JAYT-245 Section EZ-Y (Lines 4597-4618)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const puppeteer = require('d:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng/node_modules/puppeteer');

const ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const TARGET_URL = 'http://127.0.0.1:4173/';

async function runEZYVoucherPilotZeroQA() {
  console.log('\n🔬 RUNNING JAYT SECTION EZ-Y VOUCHER EVIDENCE PILOT ZERO QA...\n');

  const baseDir = path.join(ROOT, '00_PROGRAM_BASELINE');
  const councilDir = path.join(ROOT, '01_EXECUTIVE_COUNCIL');
  const evidenceDir = path.join(ROOT, '06_TRUST_AND_EVIDENCE');
  const vaultDir = path.join(evidenceDir, 'evidence_vault_ez_y');

  const contractPath = path.join(evidenceDir, 'EVIDENCE_CONTRACT_V3_VOUCHER_PILOT_ZERO.json');
  const ledgerPath = path.join(evidenceDir, 'VOUCHER_EVIDENCE_PILOT_ZERO_LEDGER_EZ_Y.json');
  const rawBinPath = path.join(vaultDir, 'candidate_ez_y_01_github_pack_raw_bytes.bin');
  const receiptPath = path.join(baseDir, 'JAYT_RELEASE_RECEIPT_EZ_Y.json');
  const manifestPath = path.join(baseDir, 'JAYT_VERSION_PARITY_MANIFEST_EZ_Y.json');
  const packPath = path.join(councilDir, 'COUNCIL_REVIEW_PACK_EZ_Y_VOUCHER_EVIDENCE_PILOT_ZERO_20260831.md');

  assert.ok(fs.existsSync(contractPath), 'Missing Contract v3 EZ-Y');
  assert.ok(fs.existsSync(ledgerPath), 'Missing Ledger EZ-Y');
  assert.ok(fs.existsSync(rawBinPath), 'Missing Raw Binary EZ-Y');
  assert.ok(fs.existsSync(receiptPath), 'Missing Receipt EZ-Y');
  assert.ok(fs.existsSync(manifestPath), 'Missing Manifest EZ-Y');
  assert.ok(fs.existsSync(packPath), 'Missing Pack EZ-Y');

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

  // --- Suite 1: Pilot Zero Raw Binary & Hash Verification (Mandate EZ-Y.1) ---
  console.log('--- Suite 1: Pilot Zero Raw Binary & Hash Verification (Mandate EZ-Y.1) ---');

  const computedSha = crypto.createHash('sha256').update(rawBuf).digest('hex');

  await it('Raw response bytes exist, length matches contract, and SHA-256 matches exactly', () => {
    assert.strictEqual(rawBuf.length, contract.capture_metadata.byte_length);
    assert.strictEqual(computedSha, contract.capture_metadata.sha256);
    assert.strictEqual(computedSha, receipt.voucher_evidence_pilot_zero.sha256);
    assert.strictEqual(computedSha, ledger.evaluation_record.sha256);
  });

  await it('Capture metadata records manual read-only discovery with 0 login and HTTP 200', () => {
    assert.strictEqual(contract.capture_metadata.discovery_method, 'MANUAL_READ_ONLY_NAVIGATION_ZERO_LOGIN');
    assert.strictEqual(contract.capture_metadata.http_status, 200);
    assert.strictEqual(contract.capture_metadata.redirect_chain.length, 1);
  });

  // --- Suite 2: Sentence-Level Excerpts & Locators Verification (Mandates EZ-Y.2 & EZ-Y.3) ---
  console.log('\n--- Suite 2: Sentence-Level Excerpts & Locators Verification (Mandates EZ-Y.2 & EZ-Y.3) ---');

  await it('All sentence-level excerpts have exact byte start/end positions matching raw binary slices', () => {
    assert.ok(contract.sentence_level_raw_excerpts.length >= 4);
    contract.sentence_level_raw_excerpts.forEach(ex => {
      const slice = rawBuf.subarray(ex.byte_start, ex.byte_end).toString('utf8');
      assert.strictEqual(slice, ex.raw_string);
    });
  });

  await it('Contract records operator and offer proven, but all missing voucher fields strictly UNOBSERVED', () => {
    const matrix = contract.clause_by_clause_entailment_matrix;
    assert.strictEqual(matrix.operator_proven, true);
    assert.strictEqual(matrix.offer_proven, true);
    assert.strictEqual(matrix.code_clause_observed, 'UNOBSERVED');
    assert.strictEqual(matrix.condition_clause_observed, 'UNOBSERVED');
    assert.strictEqual(matrix.validity_clause_observed, 'UNOBSERVED');
    assert.strictEqual(matrix.scope_clause_observed, 'UNOBSERVED');
    assert.strictEqual(matrix.total_cost_clause_observed, 'UNOBSERVED');
  });

  // --- Suite 3: Fail-Closed Isolation & Classification (Mandates EZ-Y.4 & EZ-Y.5) ---
  console.log('\n--- Suite 3: Fail-Closed Isolation & Classification (Mandates EZ-Y.4 & EZ-Y.5) ---');

  await it('Pilot Zero outcome is classified as HELD_INTERNAL with public_eligible = false', () => {
    assert.strictEqual(contract.entailment_and_provenance_verdict.public_eligible, false);
    assert.strictEqual(ledger.evaluation_record.public_eligible, false);
    assert.strictEqual(receipt.voucher_evidence_pilot_zero.public_eligible, false);
    assert.strictEqual(ledger.evaluation_record.public_actions.new_public_cards, 0);
  });

  // --- Suite 4: Puppeteer Live DOM Containment & Parity Verification (Mandate EZ-Y.5) ---
  console.log('\n--- Suite 4: Puppeteer Live DOM Containment & Parity Verification (Mandate EZ-Y.5) ---');

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

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' EZ-Y VOUCHER PILOT ZERO QA TESTS PASSED!\n');
}

runEZYVoucherPilotZeroQA().catch(e => {
  console.error('Fatal Runner Error:', e);
  process.exit(1);
});
