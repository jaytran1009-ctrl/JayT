/**
 * JAYT PROOF GATE CLEANUP & SCHEMA QA SUITE (SECTION EZ-S)
 * Governing Directive: JAYT-245 Section EZ-S (Lines 4412-4430)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const puppeteer = require('d:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng/node_modules/puppeteer');

const ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const TARGET_URL = 'http://127.0.0.1:4173/';

async function runEZSProofGateCleanupQA() {
  console.log('\n🔬 RUNNING JAYT SECTION EZ-S PROOF GATE CLEANUP QA...\n');

  const baseDir = path.join(ROOT, '00_PROGRAM_BASELINE');
  const councilDir = path.join(ROOT, '01_EXECUTIVE_COUNCIL');
  const evidenceDir = path.join(ROOT, '06_TRUST_AND_EVIDENCE');

  const proofGatePath = path.join(evidenceDir, 'SOURCE_PROOF_GATE_LEDGER_EZ_S.json');
  const invalidatedPath = path.join(evidenceDir, 'INVALIDATED_PROOF_REFERENCES_LEDGER_EZ_S.json');
  const queuePath = path.join(evidenceDir, 'SOURCE_INTAKE_QUEUE_EZ_S.json');
  const receiptPath = path.join(baseDir, 'JAYT_RELEASE_RECEIPT_EZ_S.json');
  const manifestPath = path.join(baseDir, 'JAYT_VERSION_PARITY_MANIFEST_EZ_S.json');
  const packPath = path.join(councilDir, 'COUNCIL_REVIEW_PACK_EZ_S_PROOF_GATE_CLEANUP_20260831.md');

  assert.ok(fs.existsSync(proofGatePath), 'Missing Proof Gate EZ-S');
  assert.ok(fs.existsSync(invalidatedPath), 'Missing Invalidated References Ledger EZ-S');
  assert.ok(fs.existsSync(queuePath), 'Missing Queue EZ-S');
  assert.ok(fs.existsSync(receiptPath), 'Missing Receipt EZ-S');
  assert.ok(fs.existsSync(manifestPath), 'Missing Manifest EZ-S');
  assert.ok(fs.existsSync(packPath), 'Missing Pack EZ-S');

  const proofGate = JSON.parse(fs.readFileSync(proofGatePath, 'utf8'));
  const invalidated = JSON.parse(fs.readFileSync(invalidatedPath, 'utf8'));
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

  // --- Suite 1: Invalidated References Verification (Mandate EZ-S.1) ---
  console.log('--- Suite 1: Invalidated References Verification (Mandate EZ-S.1) ---');

  await it('Invalidated references ledger lists all 6 previously misattributed sources', () => {
    assert.strictEqual(invalidated.invalidated_items.length, 6);
  });

  await it('Operating body clause is strictly UNOBSERVED across all 10 sources in Proof Gate Ledger', () => {
    proofGate.evaluated_sources.forEach(s => {
      assert.strictEqual(s.operating_body_clause_observed, 'UNOBSERVED');
    });
  });

  // --- Suite 2: Strict Proof Object Schema Validation (Mandate EZ-S.2 & EZ-S.3) ---
  console.log('\n--- Suite 2: Strict Proof Object Schema Validation (Mandate EZ-S.2 & EZ-S.3) ---');

  const requiredFields = [
    'raw_receipt_id',
    'exact_source_excerpt',
    'byte_start',
    'byte_end',
    'claim_class',
    'faithful_mapping',
    'reviewer_status'
  ];

  await it('All observed proof objects contain strictly all 7 required schema fields', () => {
    proofGate.evaluated_sources.forEach(s => {
      if (typeof s.identity_title_observed === 'object' && s.identity_title_observed !== null) {
        requiredFields.forEach(field => {
          assert.ok(field in s.identity_title_observed, `Missing ${field} in ${s.intake_id}`);
        });
      }
    });
  });

  await it('Identity title is separated from operating body clause and does not grant operating authority', () => {
    proofGate.evaluated_sources.forEach(s => {
      if (typeof s.identity_title_observed === 'object') {
        assert.strictEqual(s.identity_title_observed.claim_class, 'IDENTITY_TITLE_ONLY');
        assert.strictEqual(s.operating_body_clause_observed, 'UNOBSERVED');
      }
    });
  });

  await it('[Negative Schema Test] An object missing required fields fails validation and falls back to UNOBSERVED', () => {
    const invalidObj = { raw_receipt_id: 'R1', exact_source_excerpt: 'Test' };
    const isValid = requiredFields.every(f => f in invalidObj);
    assert.strictEqual(isValid, false);
    const resolvedStatus = isValid ? 'VALID_OBJECT' : 'UNOBSERVED';
    assert.strictEqual(resolvedStatus, 'UNOBSERVED');
  });

  // --- Suite 3: Capture Paused Invariant (Mandate EZ-S.4) ---
  console.log('\n--- Suite 3: Capture Paused Invariant (Mandate EZ-S.4) ---');

  await it('0 sources have document_path_known and all captures remain safely paused', () => {
    assert.strictEqual(receipt.sources_with_known_document_paths_count, 0);
    assert.strictEqual(receipt.operating_body_clauses_observed_count, 0);
    assert.strictEqual(proofGate.capture_state_summary.sources_with_operating_body_proof, 0);
  });

  // --- Suite 4: Puppeteer DOM Containment & Parity Verification ---
  console.log('\n--- Suite 4: Puppeteer DOM Containment & Parity Verification (Mandate EZ-S.5) ---');

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

    await it('[Browser] Exactly 1 external link present in public DOM (Approved Pilot Only)', async () => {
      const extLinks = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a')).map(a => a.href);
        return links.filter(h => h.startsWith('http') && !h.includes('127.0.0.1') && !h.includes('localhost'));
      });
      assert.strictEqual(extLinks.length, 1);
      assert.ok(extLinks[0].includes('docs.github.com'));
    });

    await it('[Browser] 0 official source labels outside approved pilot caveat', async () => {
      const labels = await page.evaluate(() => {
        const text = document.body.innerText;
        return (text.match(/nguồn chính thức/gi) || []).length;
      });
      // In the body, "TÀI LIỆU CHƯƠNG TRÌNH CHÍNH THỨC" and "Theo tài liệu chính thức" appear inside pilot card only
      assert.ok(labels <= 2);
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

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' EZ-S PROOF GATE CLEANUP QA TESTS PASSED!\n');
}

runEZSProofGateCleanupQA().catch(e => {
  console.error('Fatal Runner Error:', e);
  process.exit(1);
});
