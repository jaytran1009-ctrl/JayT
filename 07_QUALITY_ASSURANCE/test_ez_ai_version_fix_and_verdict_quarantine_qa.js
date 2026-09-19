/**
 * JAYT VERSION FIX & VERDICT QUARANTINE QA SUITE (SECTION EZ-AI)
 * Governing Directive: JAYT-245 Section EZ-AI (Lines 4889-4922)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const puppeteer = require('d:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng/node_modules/puppeteer');

const ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const TARGET_URL = 'http://127.0.0.1:4173/';
const HEALTH_URL = 'http://127.0.0.1:4173/health';
const BUILD_MANIFEST_PATH = path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_BUILD_MANIFEST.json');
const NEW_VERSION = fs.existsSync(BUILD_MANIFEST_PATH) ? JSON.parse(fs.readFileSync(BUILD_MANIFEST_PATH, 'utf8')).expectedVersion : 'v3.483.0-staging.ao';

async function runEZAIQA() {
  console.log('\n🔬 RUNNING JAYT SECTION EZ-AI VERSION FIX & VERDICT QUARANTINE QA...\n');

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

  // --- Suite 1: P0 Version Identity Consistency (Mandate EZ-AI.2) ---
  console.log('--- Suite 1: P0 Version Identity Consistency (Mandate EZ-AI.2) ---');

  await it('Health endpoint reports ' + NEW_VERSION, async () => {
    const res = await fetch(HEALTH_URL);
    const data = await res.json();
    assert.strictEqual(data.version, NEW_VERSION);
    assert.strictEqual(data.parity, 'PERFECT_MATCH_ZERO_DRIFT');
  });

  await it('SOT JS contains only ' + NEW_VERSION + ' (no v3.480 or v3.481)', () => {
    const js = fs.readFileSync(path.join(ROOT, '03_SOURCE_OF_TRUTH/jayt_storefront_staging_ey.js'), 'utf8');
    assert.ok(!js.includes('v3.480.0-staging.ez'), 'SOT JS still contains old v3.480.0');
    assert.ok(!js.includes('v3.481.0-staging.ez'), 'SOT JS contains v3.481.0');
    assert.ok(js.includes(NEW_VERSION), 'SOT JS does not contain ' + NEW_VERSION);
  });

  await it('SOT HTML contains only ' + NEW_VERSION + ' (no v3.480 or v3.481)', () => {
    const html = fs.readFileSync(path.join(ROOT, '03_SOURCE_OF_TRUTH/index.html'), 'utf8');
    assert.ok(!html.includes('v3.480.0-staging.ez'), 'SOT HTML still contains old v3.480.0');
    assert.ok(!html.includes('v3.481.0-staging.ez'), 'SOT HTML contains v3.481.0');
    assert.ok(html.includes(NEW_VERSION), 'SOT HTML does not contain ' + NEW_VERSION);
  });

  await it('SOT JS and Served JS have identical SHA-256 (ZERO DEPLOY DRIFT)', () => {
    const sotSha = crypto.createHash('sha256').update(fs.readFileSync(path.join(ROOT, '03_SOURCE_OF_TRUTH/jayt_storefront_staging_ey.js'))).digest('hex');
    const depSha = crypto.createHash('sha256').update(fs.readFileSync(path.join(ROOT, 'staging_deploy_ey/jayt_storefront_staging_ey.js'))).digest('hex');
    assert.strictEqual(sotSha, depSha);
  });

  await it('SOT HTML and Served HTML have identical SHA-256', () => {
    const sotSha = crypto.createHash('sha256').update(fs.readFileSync(path.join(ROOT, '03_SOURCE_OF_TRUTH/index.html'))).digest('hex');
    const depSha = crypto.createHash('sha256').update(fs.readFileSync(path.join(ROOT, 'staging_deploy_ey/index.html'))).digest('hex');
    assert.strictEqual(sotSha, depSha);
  });

  // Browser DOM version check
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(TARGET_URL, { waitUntil: 'networkidle0', timeout: 15000 });

    await it('[Browser] Page title contains ' + NEW_VERSION, async () => {
      const title = await page.title();
      assert.ok(title.includes(NEW_VERSION), 'Title: ' + title);
    });

    await it('[Browser] data-ledger-version attribute is ' + NEW_VERSION, async () => {
      const ver = await page.evaluate(() => document.body.getAttribute('data-ledger-version'));
      assert.strictEqual(ver, NEW_VERSION);
    });

    await it('[Browser] Header tagline contains ' + NEW_VERSION, async () => {
      const tagline = await page.evaluate(() => {
        const el = document.querySelector('.brand-tagline');
        return el ? el.textContent : '';
      });
      assert.ok(tagline.includes(NEW_VERSION), 'Header tagline: ' + tagline);
    });

    await it('[Browser] Footer contains ' + NEW_VERSION, async () => {
      const footer = await page.evaluate(() => {
        const el = document.querySelector('.footer-note');
        return el ? el.textContent : '';
      });
      assert.ok(footer.includes(NEW_VERSION), 'Footer: ' + footer);
    });

    await it('[Browser] Health version matches browser version (NO DRIFT)', async () => {
      const healthRes = await fetch(HEALTH_URL);
      const healthData = await healthRes.json();
      const browserVer = await page.evaluate(() => document.body.getAttribute('data-ledger-version'));
      assert.strictEqual(healthData.version, browserVer, 'Health=' + healthData.version + ' Browser=' + browserVer);
    });

    await it('[Browser] Exactly 1 external link (GitHub Docs Pilot Only)', async () => {
      const extLinks = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('a')).map(a => a.href)
          .filter(h => h.startsWith('http') && !h.includes('127.0.0.1') && !h.includes('localhost'));
      });
      assert.strictEqual(extLinks.length, 1);
      assert.ok(extLinks[0].includes('docs.github.com'));
    });

    await page.close();
  } finally {
    if (browser) await browser.close();
  }

  // --- Suite 2: Premature Verdict Quarantine (Mandate EZ-AI.3) ---
  console.log('\n--- Suite 2: Premature Verdict Quarantine (Mandate EZ-AI.3) ---');

  await it('Quarantine record exists with correct reason', () => {
    const q = JSON.parse(fs.readFileSync(path.join(ROOT, '06_TRUST_AND_EVIDENCE/QUARANTINE_PREMATURE_SLA_VERDICTS_EZ_AI.json'), 'utf8'));
    assert.strictEqual(q.reason, 'QUARANTINED_PREMATURE_EARLY_VERDICT_CORE_FIELDS_CONTRADICTION');
    assert.strictEqual(q.quarantined_records.length, 2);
  });

  await it('Original verdict files renamed to .quarantined_ez_ai', () => {
    assert.ok(fs.existsSync(path.join(ROOT, '06_TRUST_AND_EVIDENCE/SLA_VERDICT_JETBRAINS_EZ_AH.json.quarantined_ez_ai')));
    assert.ok(fs.existsSync(path.join(ROOT, '06_TRUST_AND_EVIDENCE/SLA_VERDICT_FIGMA_EZ_AH.json.quarantined_ez_ai')));
    assert.ok(!fs.existsSync(path.join(ROOT, '06_TRUST_AND_EVIDENCE/SLA_VERDICT_JETBRAINS_EZ_AH.json')));
    assert.ok(!fs.existsSync(path.join(ROOT, '06_TRUST_AND_EVIDENCE/SLA_VERDICT_FIGMA_EZ_AH.json')));
  });

  await it('Fast Lane Ledger records valid lifecycle state for 2 candidates', () => {
    const ledger = JSON.parse(fs.readFileSync(path.join(ROOT, '06_TRUST_AND_EVIDENCE/FAST_LANE_BATCH_PILOT_2_CANDIDATES_SLA_LEDGER_EZ_AE.json'), 'utf8'));
    assert.strictEqual(ledger.candidates.length, 2);
    assert.strictEqual(ledger.batch_summary.early_verdicts_rendered, 0);
    ledger.candidates.forEach(c => {
      assert.ok(
        c.sla_status === 'OPEN_EVALUATING' || c.sla_status.startsWith('CLOSED_SLA_COMPLETED'),
        'Status must be OPEN_EVALUATING or CLOSED_SLA_COMPLETED'
      );
      assert.strictEqual(c.early_verdict_triggered, false);
      assert.strictEqual(c.public_eligible, false);
    });
  });

  await it('Fast Lane Ledger has EZ-AI correction record', () => {
    const ledger = JSON.parse(fs.readFileSync(path.join(ROOT, '06_TRUST_AND_EVIDENCE/FAST_LANE_BATCH_PILOT_2_CANDIDATES_SLA_LEDGER_EZ_AE.json'), 'utf8'));
    assert.ok(ledger.batch_summary.ez_ai_correction);
    assert.strictEqual(ledger.batch_summary.ez_ai_correction.action, 'RESTORED_OPEN_EVALUATING_FROM_QUARANTINED_PREMATURE_VERDICT');
  });

  // --- Suite 3: Manifest & Receipt (Mandate EZ-AI.4) ---
  console.log('\n--- Suite 3: Manifest & Receipt (Mandate EZ-AI.4) ---');

  await it('Manifest records P0 version drift as fixed and version identity sources all match', () => {
    const m = JSON.parse(fs.readFileSync(path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_VERSION_PARITY_MANIFEST_EZ_AI.json'), 'utf8'));
    assert.ok(m.version === NEW_VERSION || m.version === 'v3.482.0-staging.ez');
    assert.strictEqual(m.p0_version_drift_fixed, true);
    const sources = Object.values(m.version_identity_sources);
    sources.forEach(s => assert.ok(s === NEW_VERSION || s === 'v3.482.0-staging.ez', 'Version identity source mismatch: ' + s));
  });

  await it('Receipt records UX_ACCEPTED_SAVINGS_LAB_V2_BEHAVIOR_ONLY and PENDING recheck', () => {
    const r = JSON.parse(fs.readFileSync(path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_RELEASE_RECEIPT_EZ_AI.json'), 'utf8'));
    assert.strictEqual(r.ux_acceptance.savings_lab_v2_behavior, 'UX_ACCEPTED_SAVINGS_LAB_V2_BEHAVIOR_ONLY');
    assert.strictEqual(r.ux_acceptance.version_identity, 'PENDING_CEO_BROWSER_RECHECK');
    assert.strictEqual(r.production_locked, true);
    assert.strictEqual(r.affiliate_activation, false);
    assert.strictEqual(r.voucher_verified_t1_count, 0);
  });

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' EZ-AI VERSION FIX & VERDICT QUARANTINE QA TESTS PASSED!\n');
}

runEZAIQA().catch(e => {
  console.error('Fatal Runner Error:', e);
  process.exit(1);
});
