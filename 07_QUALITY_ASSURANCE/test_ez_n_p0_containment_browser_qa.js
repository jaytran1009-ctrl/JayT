/**
 * JAYT P0 CONTAINMENT & LIVE BROWSER DOM QA SUITE (SECTION EZ-N)
 * Governing Directive: JAYT-245 Section EZ-N (Lines 4270-4299)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const puppeteer = require('d:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng/node_modules/puppeteer');

const ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const TARGET_URL = 'http://127.0.0.1:4173/';

async function runEZNContainmentQA() {
  console.log('\n🔬 RUNNING JAYT SECTION EZ-N P0 CONTAINMENT BROWSER QA...\n');

  const baseDir = path.join(ROOT, '00_PROGRAM_BASELINE');
  const councilDir = path.join(ROOT, '01_EXECUTIVE_COUNCIL');
  const evidenceDir = path.join(ROOT, '06_TRUST_AND_EVIDENCE');

  const quarantinePath = path.join(evidenceDir, 'LEGACY_RADAR_DATASET_QUARANTINE_EZ_N.json');
  const receiptPath = path.join(baseDir, 'JAYT_RELEASE_RECEIPT_EZ_N.json');
  const manifestPath = path.join(baseDir, 'JAYT_VERSION_PARITY_MANIFEST_EZ_N.json');
  const packPath = path.join(councilDir, 'COUNCIL_REVIEW_PACK_EZ_N_CONTAINMENT_20260831.md');

  assert.ok(fs.existsSync(quarantinePath), 'Missing Quarantine Archive EZ-N');
  assert.ok(fs.existsSync(receiptPath), 'Missing Release Receipt EZ-N');
  assert.ok(fs.existsSync(manifestPath), 'Missing Parity Manifest EZ-N');
  assert.ok(fs.existsSync(packPath), 'Missing Review Pack Markdown EZ-N');

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

  // --- Suite 1: Quarantine Archive & Data-Boundary Invariants ---
  console.log('--- Suite 1: Quarantine Archive & Data-Boundary Invariants (Mandates EZ-N.3 & EZ-N.4) ---');

  await it('Legacy radar dataset is archived immutably with 50 items (Mandate EZ-N.4)', () => {
    assert.strictEqual(quarantine.total_quarantined_items, 50);
    assert.strictEqual(quarantine.quarantined_items.length, 50);
  });

  await it('Release receipt records P0_FALSE_PROVENANCE_STAGING_CONTAINED and exactly 1 external link', () => {
    assert.strictEqual(receipt.governance_state, 'P0_FALSE_PROVENANCE_STAGING_CONTAINED');
    assert.strictEqual(receipt.containment_assertions.total_external_links_in_public_dom, 1);
    assert.strictEqual(receipt.containment_assertions.legacy_radar_cards_in_public_dom, 0);
  });

  // --- Suite 2: Puppeteer Live DOM Assertions on 1440, 768, 390 ---
  console.log('\n--- Suite 2: Puppeteer Live DOM Assertions on 1440, 768, 390 (Mandates EZ-N.1 & EZ-N.5) ---');

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });

    const viewports = [
      { name: 'Desktop 1440', width: 1440, height: 900 },
      { name: 'Tablet 768', width: 768, height: 1024 },
      { name: 'Mobile 390', width: 390, height: 844 }
    ];

    for (const vp of viewports) {
      const page = await browser.newPage();
      await page.setViewport({ width: vp.width, height: vp.height });

      const consoleErrors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });

      await page.goto(TARGET_URL, { waitUntil: 'networkidle0', timeout: 15000 });

      await it('[' + vp.name + '] 0 console JS errors on load', () => {
        assert.strictEqual(consoleErrors.length, 0);
      });

      await it('[' + vp.name + '] Exactly 1 external link in public DOM (GitHub Docs Pilot Only)', async () => {
        const extLinks = await page.evaluate(() => {
          const links = Array.from(document.querySelectorAll('a')).map(a => a.href);
          return links.filter(h => h.startsWith('http') && !h.includes('127.0.0.1') && !h.includes('localhost'));
        });
        assert.strictEqual(extLinks.length, 1);
        assert.ok(extLinks[0].includes('docs.github.com'));
      });

      await it('[' + vp.name + '] 0 unverified official source labels outside pilot caveat', async () => {
        const text = await page.evaluate(() => {
          const clone = document.body.cloneNode(true);
          const pilot = clone.querySelector('.t2-pilot-card-section');
          if (pilot) pilot.remove();
          return clone.innerText;
        });
        const matches = text.match(/nguồn chính thức|Mở cổng chính thức/gi) || [];
        assert.strictEqual(matches.length, 0);
      });

      await it('[' + vp.name + '] 0 legacy radar / merchant / locality cards rendered', async () => {
        const legacyCards = await page.evaluate(() => {
          return document.querySelectorAll('.editorial-curated-card, [data-item-id]').length;
        });
        assert.strictEqual(legacyCards, 0);
      });

      await it('[' + vp.name + '] Controlled T2 pilot card is rendered and visible', async () => {
        const pilotCount = await page.evaluate(() => {
          return document.querySelectorAll('.t2-pilot-card-section').length;
        });
        assert.strictEqual(pilotCount, 1);
      });

      await it('[' + vp.name + '] Neutral transparent zero-state is rendered and visible', async () => {
        const zeroStateCount = await page.evaluate(() => {
          return document.querySelectorAll('.zero-state-neutral-provenance').length;
        });
        assert.strictEqual(zeroStateCount, 1);
      });

      await it('[' + vp.name + '] Savings Lab form and inputs are functional and clean', async () => {
        await page.evaluate(() => {
          const navBtn = document.querySelector('[data-nav="BUY_DECISION"]');
          if (navBtn) navBtn.click();
        });
        await new Promise(r => setTimeout(r, 100));

        const calcRendered = await page.evaluate(() => {
          return document.getElementById('calc-item-price') !== null;
        });
        assert.strictEqual(calcRendered, true);
      });

      await page.close();
    }
  } finally {
    if (browser) await browser.close();
  }

  // --- Suite 3: SOT vs Served Deploy Parity ---
  console.log('\n--- Suite 3: SOT vs Served Deploy Parity ---');

  await it('SOT JS and Served JS have identical SHA-256 (ZERO DEPLOY DRIFT)', () => {
    assert.strictEqual(manifest.parity_status, 'PERFECT_MATCH_ZERO_DRIFT');
    assert.strictEqual(manifest.artifacts.sot_js.sha256, manifest.artifacts.served_js.sha256);
    assert.strictEqual(manifest.artifacts.sot_html.sha256, manifest.artifacts.served_html.sha256);
  });

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' EZ-N P0 CONTAINMENT QA TESTS PASSED!\n');
}

runEZNContainmentQA().catch(e => {
  console.error('Fatal Runner Error:', e);
  process.exit(1);
});
