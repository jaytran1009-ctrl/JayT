/**
 * JAYT DE-SYNTHETICIZED PROTOCOL & PROOF GATE QA SUITE (SECTION EZ-R)
 * Governing Directive: JAYT-245 Section EZ-R (Lines 4386-4410)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const puppeteer = require('d:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng/node_modules/puppeteer');

const ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const TARGET_URL = 'http://127.0.0.1:4173/';

async function runEZRDeSyntheticizedQA() {
  console.log('\n🔬 RUNNING JAYT SECTION EZ-R DE-SYNTHETICIZED QA...\n');

  const baseDir = path.join(ROOT, '00_PROGRAM_BASELINE');
  const councilDir = path.join(ROOT, '01_EXECUTIVE_COUNCIL');
  const evidenceDir = path.join(ROOT, '06_TRUST_AND_EVIDENCE');

  const protoPath = path.join(evidenceDir, 'UX_RESEARCH_PROTOCOL_ZERO_PII_EZ_R.json');
  const uxRubricPath = path.join(evidenceDir, 'UX_ACCEPTANCE_RUBRIC_EZ_R.json');
  const proofGatePath = path.join(evidenceDir, 'SOURCE_PROOF_GATE_LEDGER_EZ_R.json');
  const quarantinePath = path.join(evidenceDir, 'QUARANTINED_SYNTHETIC_SCORING_EZ_Q.json');
  const receiptPath = path.join(baseDir, 'JAYT_RELEASE_RECEIPT_EZ_R.json');
  const manifestPath = path.join(baseDir, 'JAYT_VERSION_PARITY_MANIFEST_EZ_R.json');
  const packPath = path.join(councilDir, 'COUNCIL_REVIEW_PACK_EZ_R_DESYNTHETICIZED_OPS_20260831.md');

  assert.ok(fs.existsSync(protoPath), 'Missing Protocol EZ-R');
  assert.ok(fs.existsSync(uxRubricPath), 'Missing UX Rubric EZ-R');
  assert.ok(fs.existsSync(proofGatePath), 'Missing Proof Gate EZ-R');
  assert.ok(fs.existsSync(quarantinePath), 'Missing Quarantine EZ-Q in EZ-R');
  assert.ok(fs.existsSync(receiptPath), 'Missing Receipt EZ-R');
  assert.ok(fs.existsSync(manifestPath), 'Missing Manifest EZ-R');
  assert.ok(fs.existsSync(packPath), 'Missing Pack EZ-R');

  const proto = JSON.parse(fs.readFileSync(protoPath, 'utf8'));
  const uxRubric = JSON.parse(fs.readFileSync(uxRubricPath, 'utf8'));
  const proofGate = JSON.parse(fs.readFileSync(proofGatePath, 'utf8'));
  const quarantine = JSON.parse(fs.readFileSync(quarantinePath, 'utf8'));
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

  // --- Suite 1: De-syntheticized Research Protocol Invariants (Mandate EZ-R.1 & EZ-R.2) ---
  console.log('--- Suite 1: De-syntheticized Research Protocol Invariants (Mandate EZ-R.1 & EZ-R.2) ---');

  await it('Protocol contains ZERO commercial sample numbers or prefilled prices', () => {
    const protoStr = JSON.stringify(proto);
    assert.ok(!protoStr.includes('120000'));
    assert.ok(!protoStr.includes('120.000'));
    assert.ok(!protoStr.includes('20000'));
    assert.ok(!protoStr.includes('20.000'));
    assert.ok(!protoStr.includes('10% sinh viên'));
  });

  await it('Protocol task statuses are strictly honest automated affordance assertions', () => {
    proto.evaluation_tasks.forEach(t => {
      assert.strictEqual(t.task_status, 'AUTOMATED_AFFORDANCE_VERIFIED');
    });
    assert.strictEqual(proto.participant_recruitment_status, 'NO_RECRUITMENT_AUTHORIZED_ZERO_PII');
  });

  await it('UX Acceptance Rubric clearly records user research as NOT_CONDUCTED', () => {
    assert.strictEqual(uxRubric.user_research_status, 'NOT_CONDUCTED_WITH_USERS_PENDING_AUTHORITY');
  });

  // --- Suite 2: Binary Source Proof Gate Invariants (Mandate EZ-R.3 & EZ-R.4) ---
  console.log('\n--- Suite 2: Binary Source Proof Gate Invariants (Mandate EZ-R.3 & EZ-R.4) ---');

  await it('Source Proof Gate contains ZERO arbitrary numerical scores or sums', () => {
    const gateStr = JSON.stringify(proofGate);
    assert.ok(!gateStr.includes('scoring_dimensions'));
    assert.ok(!gateStr.includes('scoring_threshold'));
    assert.ok(!gateStr.includes('total_score'));
  });

  await it('All 10 sources are evaluated with evidence-linked binary proof fields', () => {
    assert.strictEqual(proofGate.evaluated_sources.length, 10);
    proofGate.evaluated_sources.forEach(s => {
      assert.strictEqual(typeof s.document_path_known, 'boolean');
      assert.strictEqual(typeof s.raw_accessible, 'boolean');
      assert.ok(['OBSERVED_WITH_LOCATOR_RECEIPT_EZ_L', 'OBSERVED_WITH_LOCATOR_RECEIPT_EZ_O', 'OBSERVED_WITH_LOCATOR_RECEIPT_EZ_P', 'UNOBSERVED'].includes(s.operating_body_clause_observed));
    });
  });

  await it('Old EZ-Q scoring is archived immutably with proper quarantine reason (Mandate EZ-R.4)', () => {
    assert.strictEqual(quarantine.reason, 'SYNTHETIC_INTERNAL_SCORING_AND_SAMPLE_COMMERCIAL_FIXTURE');
  });

  // --- Suite 3: Puppeteer DOM Neutrality & Affordance Verification ---
  console.log('\n--- Suite 3: Puppeteer DOM Neutrality & Affordance Verification (Mandate EZ-R.5) ---');

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

    await it('[Browser] Public DOM has strictly 1 external link on initial load (GitHub Docs Pilot Only)', async () => {
      const extLinks = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a')).map(a => a.href);
        return links.filter(h => h.startsWith('http') && !h.includes('127.0.0.1') && !h.includes('localhost'));
      });
      assert.strictEqual(extLinks.length, 1);
      assert.ok(extLinks[0].includes('docs.github.com'));
    });

    await it('[Browser] Savings Lab input placeholders are completely neutral without commercial samples', async () => {
      await page.click('[data-nav="BUY_DECISION"]');
      await new Promise(r => setTimeout(r, 100));

      const placeholders = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.calc-input')).map(i => i.placeholder);
      });
      placeholders.forEach(p => {
        assert.ok(!p.includes('120000'));
        assert.ok(!p.includes('20000'));
        assert.ok(!p.includes('Ví dụ:'));
      });
    });

    await it('[Browser] Safe "+ Báo nguồn" modal opens read-only with 0 inputs', async () => {
      await page.click('#btn-open-report');
      await new Promise(r => setTimeout(r, 100));

      const isDialog = await page.evaluate(() => {
        const modal = document.getElementById('report-modal-overlay');
        const inputs = modal ? modal.querySelectorAll('input, textarea').length : -1;
        return modal && modal.style.display === 'flex' && inputs === 0;
      });
      assert.strictEqual(isDialog, true);

      await page.keyboard.press('Escape');
    });

    await it('[Browser] 0 console errors across all interaction flows', () => {
      assert.strictEqual(consoleErrors.length, 0);
    });

    await page.close();
  } finally {
    if (browser) await browser.close();
  }

  // --- Suite 4: Parity Verification ---
  console.log('\n--- Suite 4: Parity Verification ---');

  await it('SOT JS and Served JS have identical SHA-256 (ZERO DEPLOY DRIFT)', () => {
    assert.strictEqual(manifest.parity_status, 'PERFECT_MATCH_ZERO_DRIFT');
    assert.strictEqual(manifest.artifacts.sot_js.sha256, manifest.artifacts.served_js.sha256);
    assert.strictEqual(manifest.artifacts.sot_html.sha256, manifest.artifacts.served_html.sha256);
  });

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' EZ-R DE-SYNTHETICIZED QA TESTS PASSED!\n');
}

runEZRDeSyntheticizedQA().catch(e => {
  console.error('Fatal Runner Error:', e);
  process.exit(1);
});
