/**
 * JAYT RELEASE CANDIDATE v3.421.0 DEDICATED PREVIEW & QA TEST SUITE
 * Governing Directive: JAYT-324
 *
 * SCOPE: Rigorously verifies the standalone 22-card release candidate bundle on port 4174.
 * Asserts exact 22 card IDs, 22 external links, 0 exclusions (B11_01, B11_02, B10_03),
 * 0 console errors, 100% local requests across Desktop 1440, Tablet 768, Mobile 390.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const puppeteer = require('puppeteer');

const ROOT = path.resolve(__dirname, '..');
const RC_HEALTH_URL = 'http://127.0.0.1:4174/health';
const RC_PREVIEW_URL = 'http://127.0.0.1:4174/';
const RC_REGISTRY_PATH = path.join(ROOT, '08_RELEASE_VAULT/RELEASE_CANDIDATE_v3.421.0_REGISTRY.json');
const rcRegistry = JSON.parse(fs.readFileSync(RC_REGISTRY_PATH, 'utf8'));

async function runRcA迴Audit() {
  console.log('\n🔬 RUNNING JAYT-324 RELEASE CANDIDATE v3.421.0 (22-CARD) PREVIEW & QA SUITE...\n');
  console.log('  ℹ Current System Runtime UTC: ' + new Date().toISOString());
  console.log('  ℹ Testing dedicated preview endpoint: ' + RC_PREVIEW_URL);

  let totalTests = 0;
  let passedTests = 0;

  async function it(name, fn) {
    totalTests++;
    try {
      await fn();
      passedTests++;
      console.log('  ✓ ' + name);
    } catch (err) {
      console.error('  ✗ ' + name);
      console.error('    Error:', err.message);
      throw err;
    }
  }

  // Suite 1: Health & Parity
  console.log('\n--- Suite 1: RC Health Endpoint & Artifact Parity ---');
  await it('RC Preview health endpoint returns UP, v3.421.0, and exactly 22 cards', async () => {
    const res = await fetch(RC_HEALTH_URL);
    const data = await res.json();
    assert.strictEqual(data.status, 'UP');
    assert.strictEqual(data.target_version, 'v3.421.0');
    assert.strictEqual(data.cards_count, 22);
    assert.strictEqual(data.parity, 'PERFECT_MATCH_ZERO_DRIFT');
    assert.strictEqual(data.manifest_match, true);
  });

  await it('Candidate registry contains strictly 22 entities matching pinned hash', () => {
    assert.strictEqual(rcRegistry.approved_entities_count, 22);
    assert.strictEqual(rcRegistry.approved_entities.length, 22);
    assert.strictEqual(rcRegistry.registry_pinned_sha256, 'fdcee9d13e55506770a28e057f958336c3e8c992c78059587cf21ce7203bb67b');
  });

  // Suite 2: Viewports & DOM Inspection
  console.log('\n--- Suite 2: Cross-Viewport DOM Verification & Exclusions (1440, 768, 390) ---');
  const viewports = [
    { name: 'Desktop 1440', width: 1440, height: 900, isMobile: false, hasTouch: false },
    { name: 'Tablet 768', width: 768, height: 1024, isMobile: true, hasTouch: true },
    { name: 'Mobile 390', width: 390, height: 844, isMobile: true, hasTouch: true }
  ];

  let browser;
  try {
    browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });

    for (const vp of viewports) {
      const page = await browser.newPage();
      await page.setViewport({
        width: vp.width,
        height: vp.height,
        isMobile: vp.isMobile,
        hasTouch: vp.hasTouch
      });

      const consoleErrors = [];
      const networkRequests = [];

      page.on('console', msg => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });

      page.on('request', req => {
        networkRequests.push(req.url());
      });

      await page.goto(RC_PREVIEW_URL, { waitUntil: 'networkidle0' });

      await it('[' + vp.name + '] Strictly 22 approved cards rendered in DOM', async () => {
        const cards = await page.$$('.t2-pilot-card-section');
        assert.strictEqual(cards.length, 22);
      });

      await it('[' + vp.name + '] Strictly 22 external links matching approved registry', async () => {
        const extLinks = await page.$$eval('a[href^="http"]', anchors => {
          return anchors
            .map(a => a.href)
            .filter(h => !h.startsWith('http://127.0.0.1') && !h.startsWith('http://localhost'));
        });
        assert.strictEqual(extLinks.length, 22);
        for (const item of rcRegistry.approved_entities) {
          assert.ok(extLinks.some(link => new URL(link).href === new URL(item.external_url).href),
            'Missing approved external link: ' + item.external_url);
        }
      });

      await it('[' + vp.name + '] Strictly 0 excluded cards (B11_01, B11_02, B10_03) rendered in DOM', async () => {
        const bodyText = await page.$eval('body', el => el.textContent);
        assert.ok(!bodyText.includes('Danang Smart City'), 'B11_01 card detected in 22-card candidate!');
        assert.ok(!bodyText.includes('vũ điệu Champa'), 'B11_02 card detected in 22-card candidate!');
        assert.ok(!bodyText.includes('Bảo tàng Điêu khắc Chăm'), 'B11_02 card detected in 22-card candidate!');
        assert.ok(!bodyText.includes('Sông Vàng'), 'B10_03 card detected in 22-card candidate!');
      });

      await it('[' + vp.name + '] Strictly 0 commercial entities (Metiz, Galaxy, TNGo) in DOM', async () => {
        const bodyText = await page.$eval('body', el => el.textContent);
        assert.ok(!bodyText.includes('Metiz'));
        assert.ok(!bodyText.includes('Galaxy'));
        assert.ok(!bodyText.includes('TNGo'));
      });

      await it('[' + vp.name + '] 100% local network requests (0 external fonts/CDNs/analytics)', () => {
        const thirdParty = networkRequests.filter(u => !u.startsWith('http://127.0.0.1') && !u.startsWith('http://localhost') && !u.startsWith('data:'));
        assert.strictEqual(thirdParty.length, 0);
      });

      await it('[' + vp.name + '] Zero console errors during complete lifecycle', () => {
        assert.strictEqual(consoleErrors.length, 0);
      });

      await page.close();
    }
  } finally {
    if (browser) await browser.close();
  }

  // Suite 3: Commercial Locks
  console.log('\n--- Suite 3: Commercial Locks & Production Isolation ---');
  await it('Deals feed is strictly empty array [] and voucher count is 0', () => {
    const deals = JSON.parse(fs.readFileSync(path.join(ROOT, '05_DEAL_AND_AFFILIATE/deals_feed.json'), 'utf8'));
    assert.strictEqual(deals.length, 0);
  });

  await it('Production v3.420.0 rollback deployment bundle is verified on disk', () => {
    const rollbackRoot = path.join(ROOT, 'deploy_personal_v3420');
    assert.ok(fs.existsSync(rollbackRoot));
    const jsPath = path.join(rollbackRoot, 'jayt_storefront_staging_ey.js');
    const jsSha = require('crypto').createHash('sha256').update(fs.readFileSync(jsPath)).digest('hex');
    assert.strictEqual(jsSha, '5c11252bae14c70873972ac0eb256200772b346a281320394ff54d676ea4e9f6');
  });

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' JAYT-324 RC v3.421.0 QA TESTS PASSED!\n');
}

runRcA迴Audit().catch(err => {
  console.error('\n💥 QA SUITE FAILED:', err.message);
  process.exit(1);
});
