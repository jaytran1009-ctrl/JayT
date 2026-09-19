/**
 * JAYT BATCH FAST LANE & SAVINGS LAB V2 QA SUITE (SECTION EZ-AD)
 * Governing Directive: JAYT-245 Section EZ-AD (Lines 4741-4768)
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const puppeteer = require('d:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng/node_modules/puppeteer');

const ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const TARGET_URL = 'http://127.0.0.1:4173/';

async function runEZADBatchFastLaneQA() {
  console.log('\n🔬 RUNNING JAYT SECTION EZ-AD BATCH FAST LANE & SAVINGS LAB V2 QA...\n');

  const baseDir = path.join(ROOT, '00_PROGRAM_BASELINE');
  const councilDir = path.join(ROOT, '01_EXECUTIVE_COUNCIL');
  const evidenceDir = path.join(ROOT, '06_TRUST_AND_EVIDENCE');

  const ledgerPath = path.join(evidenceDir, 'BATCH_FAST_LANE_5_CANDIDATES_SLA_LEDGER_EZ_AD.json');
  const receiptPath = path.join(baseDir, 'JAYT_RELEASE_RECEIPT_EZ_AD.json');
  const manifestPath = path.join(baseDir, 'JAYT_VERSION_PARITY_MANIFEST_EZ_AD.json');
  const packPath = path.join(councilDir, 'COUNCIL_REVIEW_PACK_EZ_AD_BATCH_FAST_LANE_AND_SAVINGS_LAB_V2_20260831.md');

  assert.ok(fs.existsSync(ledgerPath), 'Missing Fast Lane Ledger EZ-AD');
  assert.ok(fs.existsSync(receiptPath), 'Missing Receipt EZ-AD');
  assert.ok(fs.existsSync(manifestPath), 'Missing Manifest EZ-AD');
  assert.ok(fs.existsSync(packPath), 'Missing Pack EZ-AD');

  const ledger = JSON.parse(fs.readFileSync(ledgerPath, 'utf8'));
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

  // --- Suite 1: Batch Fast Lane 5 Candidates SLA Ledger (Mandates EZ-AD.1 - EZ-AD.4) ---
  console.log('--- Suite 1: Batch Fast Lane 5 Candidates SLA Ledger (Mandates EZ-AD.1 - EZ-AD.4) ---');

  await it('Fast Lane Ledger contains EXACTLY 5 candidates across 5 distinct JTBD categories', () => {
    assert.strictEqual(ledger.candidates.length, 5);
    assert.strictEqual(ledger.batch_summary.total_candidates_evaluated, 5);
    const categories = new Set(ledger.candidates.map(c => c.jtbd_category));
    assert.strictEqual(categories.size, 5);
  });

  await it('Each candidate has owner, 24h SLA timestamps, valid raw vault reference, and definitive verdict', () => {
    ledger.candidates.forEach(c => {
      assert.ok(c.owner, 'Missing owner for ' + c.candidate_id);
      assert.ok(c.sla_open_utc, 'Missing SLA open for ' + c.candidate_id);
      assert.ok(c.sla_close_utc, 'Missing SLA close for ' + c.candidate_id);
      assert.ok(fs.existsSync(path.join(ROOT, c.raw_vault_path)), 'Raw vault file missing: ' + c.raw_vault_path);
      assert.ok(c.verdict, 'Missing verdict for ' + c.candidate_id);
      assert.strictEqual(c.public_eligible, false);
    });
  });

  await it('Batch summary records 0 approved T1 deals and 0 public cards created', () => {
    assert.strictEqual(ledger.batch_summary.t1_deals_approved, 0);
    assert.strictEqual(ledger.batch_summary.public_actions.new_public_cards, 0);
    assert.strictEqual(ledger.batch_summary.public_actions.new_public_links, 0);
  });

  // --- Suite 2: Savings Lab v2 Browser E2E & A11y Verification (Mandate EZ-AD.5) ---
  console.log('\n--- Suite 2: Savings Lab v2 Browser E2E & A11y Verification (Mandate EZ-AD.5) ---');

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

    // Navigate to BUY_DECISION (Savings Lab)
    await page.click('button[data-nav="BUY_DECISION"]');
    await new Promise(r => setTimeout(r, 400));

    await it('[Browser] Savings Lab v2 title and empty preset buttons are rendered', async () => {
      const title = await page.$eval('h1', el => el.textContent);
      assert.ok(title.includes('Savings Lab v2'));
      const soloBtn = await page.$('#preset-solo');
      const groupBtn = await page.$('#preset-group');
      assert.ok(soloBtn && groupBtn);
    });

    await it('[Browser] Group Split preset switches people count and updates calculation', async () => {
      await page.type('#calc-item-price', '100000');
      await page.type('#calc-shipping-fee', '20000');
      await page.click('#preset-group');
      await new Promise(r => setTimeout(r, 200));

      const perPerson = await page.$eval('#res-per-person', el => el.textContent);
      assert.strictEqual(perPerson, '60.000 VNĐ'); // 120,000 / 2
    });

    await it('[Browser] Formula breakdown displays live component-by-component math', async () => {
      const fTotal = await page.$eval('#formula-total', el => el.textContent);
      assert.strictEqual(fTotal, '120.000 VNĐ');
    });

    await it('[Browser] Reset button clears inputs cleanly back to defaults', async () => {
      await page.click('#btn-calc-reset');
      await new Promise(r => setTimeout(r, 200));

      const finalTotal = await page.$eval('#res-final-total', el => el.textContent);
      assert.strictEqual(finalTotal, '0 VNĐ');
    });

    await it('[Browser] Exactly 1 external link in public DOM (GitHub Docs Pilot Only)', async () => {
      await page.click('button[data-nav="HOME"]');
      await new Promise(r => setTimeout(r, 400));
      const extLinks = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a')).map(a => a.href);
        return links.filter(h => h.startsWith('http') && !h.includes('127.0.0.1') && !h.includes('localhost'));
      });
      assert.strictEqual(extLinks.length, 1);
      assert.ok(extLinks[0].includes('docs.github.com'));
    });

    await it('[Browser] 0 console errors during full lifecycle', () => {
      assert.strictEqual(consoleErrors.length, 0);
    });

    await page.close();
  } finally {
    if (browser) await browser.close();
  }

  // --- Suite 3: Parity Verification ---
  console.log('\n--- Suite 3: Parity Verification ---');

  await it('SOT JS and Served JS have identical SHA-256 (ZERO DEPLOY DRIFT)', () => {
    assert.strictEqual(manifest.parity_status, 'PERFECT_MATCH_ZERO_DRIFT');
    assert.strictEqual(manifest.artifacts.sot_js.sha256, manifest.artifacts.served_js.sha256);
    assert.strictEqual(manifest.artifacts.sot_html.sha256, manifest.artifacts.served_html.sha256);
  });

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' EZ-AD BATCH FAST LANE & SAVINGS LAB V2 QA TESTS PASSED!\n');
}

runEZADBatchFastLaneQA().catch(e => {
  console.error('Fatal Runner Error:', e);
  process.exit(1);
});
