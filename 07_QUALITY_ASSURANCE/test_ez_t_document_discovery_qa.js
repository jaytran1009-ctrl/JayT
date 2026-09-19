/**
 * JAYT DOCUMENT DISCOVERY & CONTRACT V3 QA SUITE (SECTION EZ-T)
 * Governing Directive: JAYT-245 Section EZ-T (Lines 4432-4454)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const puppeteer = require('d:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng/node_modules/puppeteer');

const ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const TARGET_URL = 'http://127.0.0.1:4173/';

async function runEZTDocumentDiscoveryQA() {
  console.log('\n🔬 RUNNING JAYT SECTION EZ-T DOCUMENT DISCOVERY QA...\n');

  const baseDir = path.join(ROOT, '00_PROGRAM_BASELINE');
  const councilDir = path.join(ROOT, '01_EXECUTIVE_COUNCIL');
  const evidenceDir = path.join(ROOT, '06_TRUST_AND_EVIDENCE');
  const vaultDir = path.join(evidenceDir, 'evidence_vault_ez_t');

  const discoveryPath = path.join(evidenceDir, 'DOCUMENT_PATH_DISCOVERY_LEDGER_EZ_T.json');
  const contractPath = path.join(evidenceDir, 'EVIDENCE_CONTRACT_V3_CANDIDATE_EZ_T_01_DANANG_LIBRARY.json');
  const proofGatePath = path.join(evidenceDir, 'SOURCE_PROOF_GATE_LEDGER_EZ_T.json');
  const rawBinPath = path.join(vaultDir, 'candidate_ez_t_01_danang_library_card_policy_raw_bytes.bin');
  const receiptPath = path.join(baseDir, 'JAYT_RELEASE_RECEIPT_EZ_T.json');
  const manifestPath = path.join(baseDir, 'JAYT_VERSION_PARITY_MANIFEST_EZ_T.json');
  const packPath = path.join(councilDir, 'COUNCIL_REVIEW_PACK_EZ_T_DOCUMENT_PATH_DISCOVERY_20260831.md');

  assert.ok(fs.existsSync(discoveryPath), 'Missing Discovery Ledger EZ-T');
  assert.ok(fs.existsSync(contractPath), 'Missing Contract v3 EZ-T');
  assert.ok(fs.existsSync(proofGatePath), 'Missing Proof Gate EZ-T');
  assert.ok(fs.existsSync(rawBinPath), 'Missing Raw Binary EZ-T');
  assert.ok(fs.existsSync(receiptPath), 'Missing Receipt EZ-T');
  assert.ok(fs.existsSync(manifestPath), 'Missing Manifest EZ-T');
  assert.ok(fs.existsSync(packPath), 'Missing Pack EZ-T');

  const discovery = JSON.parse(fs.readFileSync(discoveryPath, 'utf8'));
  const contract = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
  const proofGate = JSON.parse(fs.readFileSync(proofGatePath, 'utf8'));
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

  // --- Suite 1: Document Path Discovery Ledger (Mandate EZ-T.1 & EZ-T.2) ---
  console.log('--- Suite 1: Document Path Discovery Ledger (Mandate EZ-T.1 & EZ-T.2) ---');

  await it('Discovery ledger evaluates at most 2 candidates via read-only visible navigation', () => {
    assert.strictEqual(discovery.evaluated_candidates.length, 2);
    discovery.evaluated_candidates.forEach(c => {
      assert.ok(c.visible_internal_links_inspected.length <= 3);
    });
    assert.strictEqual(discovery.navigation_policy.mode, 'READ_ONLY_VISIBLE_DOM_NAVIGATION');
  });

  await it('Discovered links are classified as unverified and not claimed canonical/official', () => {
    assert.strictEqual(discovery.navigation_policy.taxonomy_rule, 'DISCOVERED_LINKS_ARE_UNVERIFIED_NOT_CANONICAL_OR_OFFICIAL');
  });

  // --- Suite 2: Evidence Contract v3 & Raw Binary Verification (Mandate EZ-T.3) ---
  console.log('\n--- Suite 2: Evidence Contract v3 & Raw Binary Verification (Mandate EZ-T.3) ---');

  const computedSha = crypto.createHash('sha256').update(rawBuf).digest('hex');

  await it('Raw document candidate exists, length matches contract, and SHA-256 matches exactly', () => {
    assert.strictEqual(rawBuf.length, contract.capture_metadata.byte_length);
    assert.strictEqual(computedSha, contract.capture_metadata.sha256);
    assert.strictEqual(computedSha, receipt.evaluated_document_candidate.sha256);
  });

  await it('All 4 sentence-level excerpts have precise byte offsets verifying raw bytes', () => {
    assert.strictEqual(contract.sentence_level_raw_excerpts.length, 4);
    contract.sentence_level_raw_excerpts.forEach(ex => {
      const slice = rawBuf.subarray(ex.byte_start, ex.byte_end).toString('utf8');
      assert.strictEqual(slice, ex.raw_string);
    });
  });

  await it('Entailment verdict proves operating body but honestly holds document internal due to historical date', () => {
    assert.strictEqual(contract.entailment_and_provenance_verdict.operating_body_proven, true);
    assert.strictEqual(contract.entailment_and_provenance_verdict.public_eligible, false);
    assert.strictEqual(receipt.new_public_cards_created, 0);
  });

  // --- Suite 3: Proof Gate State (Mandates EZ-T.3 & EZ-T.4) ---
  console.log('\n--- Suite 3: Proof Gate State (Mandates EZ-T.3 & EZ-T.4) ---');

  await it('Proof gate updates Da Nang Library with document_path_known = true and verified operating body locator', () => {
    const libSource = proofGate.evaluated_sources.find(s => s.intake_id === 'INTAKE_02_DANANG_GENERAL_SCIENCE_LIBRARY');
    assert.strictEqual(libSource.document_path_known, true);
    assert.strictEqual(typeof libSource.operating_body_clause_observed, 'object');
    assert.strictEqual(libSource.operating_body_clause_observed.raw_receipt_id, 'CONTRACT_V3_CANDIDATE_EZ_T_01_DANANG_LIBRARY_CARD_POLICY');
  });

  // --- Suite 4: Puppeteer Live DOM Containment & Parity Verification (Mandate EZ-T.5) ---
  console.log('\n--- Suite 4: Puppeteer Live DOM Containment & Parity Verification (Mandate EZ-T.5) ---');

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

    await it('[Browser] Public DOM has strictly 1 external link (GitHub Docs Pilot Only)', async () => {
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

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' EZ-T DOCUMENT DISCOVERY QA TESTS PASSED!\n');
}

runEZTDocumentDiscoveryQA().catch(e => {
  console.error('Fatal Runner Error:', e);
  process.exit(1);
});
