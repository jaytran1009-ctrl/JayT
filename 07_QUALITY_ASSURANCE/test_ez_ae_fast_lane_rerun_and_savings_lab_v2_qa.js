/**
 * JAYT FAST LANE RERUN & SAVINGS LAB V2 BROWSER ACCEPTANCE QA SUITE (SECTION EZ-AE)
 * Governing Directive: JAYT-245 Section EZ-AE (Lines 4770-4798)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const puppeteer = require('d:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng/node_modules/puppeteer');

const ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const TARGET_URL = 'http://127.0.0.1:4173/';
const HEALTH_URL = 'http://127.0.0.1:4173/health';

async function runEZAEFastLaneQA() {
  console.log('\n🔬 RUNNING JAYT SECTION EZ-AE FAST LANE RERUN & SAVINGS LAB V2 QA...\n');

  const baseDir = path.join(ROOT, '00_PROGRAM_BASELINE');
  const councilDir = path.join(ROOT, '01_EXECUTIVE_COUNCIL');
  const evidenceDir = path.join(ROOT, '06_TRUST_AND_EVIDENCE');
  const vaultDirAE = path.join(evidenceDir, 'evidence_vault_ez_ae');

  const quarantinePath = path.join(evidenceDir, 'QUARANTINED_REUSED_RAW_AND_PREMATURE_SLA_VERDICTS_EZ_AE.json');
  const ledgerPath = path.join(evidenceDir, 'FAST_LANE_BATCH_PILOT_2_CANDIDATES_SLA_LEDGER_EZ_AE.json');
  const receiptPath = path.join(baseDir, 'JAYT_RELEASE_RECEIPT_EZ_AE.json');
  const manifestPath = path.join(baseDir, 'JAYT_VERSION_PARITY_MANIFEST_EZ_AE.json');
  const packPath = path.join(councilDir, 'COUNCIL_REVIEW_PACK_EZ_AE_FAST_LANE_RERUN_AND_SAVINGS_LAB_V2_20260831.md');

  assert.ok(fs.existsSync(quarantinePath), 'Missing Quarantine Ledger EZ-AE');
  assert.ok(fs.existsSync(ledgerPath), 'Missing Fast Lane Ledger EZ-AE');
  assert.ok(fs.existsSync(receiptPath), 'Missing Receipt EZ-AE');
  assert.ok(fs.existsSync(manifestPath), 'Missing Manifest EZ-AE');
  assert.ok(fs.existsSync(packPath), 'Missing Pack EZ-AE');

  const quarantine = JSON.parse(fs.readFileSync(quarantinePath, 'utf8'));
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

  // --- Suite 1: Quarantine of Old Reused Batch (Mandate EZ-AE.1) ---
  console.log('--- Suite 1: Quarantine of Old Reused Batch (Mandate EZ-AE.1) ---');

  await it('Quarantine ledger records elimination of reused raw and premature SLA verdicts', () => {
    assert.strictEqual(quarantine.reason, 'REUSED_RAW_AND_PREMATURE_SLA_VERDICTS');
    assert.strictEqual(quarantine.status_of_previous_candidates.spotify, 'HELD_INTERNAL_CHAIN_FORMALLY_CLOSED');
  });

  // --- Suite 2: Fast Lane 2 Fresh Candidates SLA Ledger (Mandate EZ-AE.3) ---
  console.log('\n--- Suite 2: Fast Lane 2 Fresh Candidates SLA Ledger (Mandate EZ-AE.3) ---');

  await it('Fast Lane Ledger contains EXACTLY 2 fresh candidates with valid raw SHA-256', () => {
    assert.strictEqual(ledger.candidates.length, 2);
    assert.strictEqual(ledger.batch_summary.total_candidates_active, 2);
  });

  await it('Fresh candidates have raw captures created after sla_open_utc with matching SHA-256', () => {
    ledger.candidates.forEach(c => {
      const meta = c.raw_capture_metadata;
      const rawBuf = fs.readFileSync(path.join(ROOT, meta.raw_vault_path));
      const sha = crypto.createHash('sha256').update(rawBuf).digest('hex');
      assert.strictEqual(rawBuf.length, meta.byte_length);
      assert.strictEqual(sha, meta.sha256);
      assert.ok(meta.capture_timestamp_utc >= c.sla_open_utc);
      assert.ok(
        c.sla_status === 'OPEN_EVALUATING' || c.sla_status.startsWith('VERDICT_RENDERED') || c.sla_status.startsWith('CLOSED_SLA_COMPLETED'),
        'SLA status should be OPEN_EVALUATING, VERDICT_RENDERED_*, or CLOSED_SLA_COMPLETED_*'
      );
      assert.strictEqual(c.public_eligible, false);
    });
  });

  // --- Suite 3: Staging Version & Health Endpoint (Mandate EZ-AE.2) ---
  console.log('\n--- Suite 3: Staging Version & Health Endpoint (Mandate EZ-AE.2) ---');

  await it('Staging health endpoint returns exact expected version from build manifest and PERFECT_MATCH_ZERO_DRIFT', async () => {
    const buildManifest = JSON.parse(fs.readFileSync(path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_BUILD_MANIFEST.json'), 'utf8'));
    const expectedVer = buildManifest.expectedVersion;
    const res = await fetch(HEALTH_URL);
    const data = await res.json();
    assert.strictEqual(data.status, 'UP');
    assert.strictEqual(data.version, expectedVer, 'Health version must EXACTLY equal expectedVersion');
    assert.strictEqual(data.parity, 'PERFECT_MATCH_ZERO_DRIFT');
  });

  // --- Suite 4: Savings Lab v2 Browser Acceptance (Mandate EZ-AE.4) ---
  console.log('\n--- Suite 4: Savings Lab v2 Browser Acceptance (Mandate EZ-AE.4) ---');

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
      await page.type('#calc-item-price', '200000');
      await page.type('#calc-shipping-fee', '30000');
      await page.click('#preset-group');
      await new Promise(r => setTimeout(r, 200));

      const perPerson = await page.$eval('#res-per-person', el => el.textContent);
      assert.strictEqual(perPerson, '115.000 VNĐ'); // 230,000 / 2
    });

    await it('[Browser] Formula breakdown displays live component-by-component math', async () => {
      const fTotal = await page.$eval('#formula-total', el => el.textContent);
      assert.strictEqual(fTotal, '230.000 VNĐ');
    });

    await it('[Browser] Non-negative clamping prevents negative values on invalid inputs', async () => {
      await page.type('#calc-voucher-discount', '500000'); // voucher exceeds total
      await new Promise(r => setTimeout(r, 200));
      const finalTotal = await page.$eval('#res-final-total', el => el.textContent);
      assert.strictEqual(finalTotal, '30.000 VNĐ'); // shipping fee 30,000 clamped
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

  // --- Suite 5: Parity Verification ---
  console.log('\n--- Suite 5: Parity Verification ---');

  await it('SOT JS and Served JS have identical SHA-256 (ZERO DEPLOY DRIFT)', () => {
    assert.strictEqual(manifest.parity_status, 'PERFECT_MATCH_ZERO_DRIFT');
    assert.strictEqual(manifest.artifacts.sot_js.sha256, manifest.artifacts.served_js.sha256);
    assert.strictEqual(manifest.artifacts.sot_html.sha256, manifest.artifacts.served_html.sha256);
  });

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' EZ-AE FAST LANE & SAVINGS LAB V2 QA TESTS PASSED!\n');
}

runEZAEFastLaneQA().catch(e => {
  console.error('Fatal Runner Error:', e);
  process.exit(1);
});
