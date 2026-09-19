// Rolling Production verification for v3.424.0 baseline (51 cards).
// Writes strictly to JAYT_341_V3424_ROLLING_MONITOR_RECEIPT.json.
// The immutable release receipt JAYT_341_V3424_R1_LIVE_POST_DEPLOY_AUDIT.json is NEVER modified.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const puppeteer = require('puppeteer');

const root = path.resolve(__dirname, '..');
const productionUrl = 'https://jayt-production-v3420.vercel.app';
const rollingReceiptPath = path.join(__dirname, 'runtime_evidence', 'JAYT_341_V3424_ROLLING_MONITOR_RECEIPT.json');

const requiredNewIds = [
  'P2O_GALAXY_MEMBER_2026',
  'P2O_GALAXY_SHOPEEPAY_SEP_2026',
  'P2O_PHILONG_LENOVO_STUDENT_2026',
  'P2O_PHILONG_HP_BTS_2026'
];
const forbiddenIds = [
  'B14_DMX_M170_DEN',
  'P2O_CGV_FANC_2026',
  'P2O_GALAXY_ZALOPAY_REWARDS_2026Q3',
  'P2O_GALAXY_JCB_WEEKEND_2026Q3'
];

(async () => {
  const result = {
    receipt_id: 'JAYT_341_V3424_ROLLING_MONITOR_RECEIPT',
    evidence_mode: 'ROLLING_MONITOR__DOES_NOT_MUTATE_IMMUTABLE_RELEASE_RECEIPT',
    checked_at_utc: new Date().toISOString(),
    production_url: productionUrl,
    baseline_version: 'v3.424.0',
    expected_total_cards: 51,
    http_probes: {},
    gates: {},
    blockers: []
  };

  const rootRes = await fetch(productionUrl + '/', { cache: 'no-store' });
  const regRes = await fetch(productionUrl + '/registry.json', { cache: 'no-store' });
  const dealsRes = await fetch(productionUrl + '/deals_feed.json', { cache: 'no-store' });
  const dealsText = await dealsRes.text();
  let dealsJson = null;
  try { dealsJson = JSON.parse(dealsText); } catch(e) {}

  result.http_probes = {
    root_status: rootRes.status,
    registry_status: regRes.status,
    deals_feed_status: dealsRes.status,
    deals_feed_is_empty_array: Array.isArray(dealsJson) && dealsJson.length === 0
  };

  if (rootRes.status !== 200) result.blockers.push('Root HTTP != 200');
  if (regRes.status !== 200) result.blockers.push('Registry HTTP != 200');
  if (dealsRes.status !== 200 || !result.http_probes.deals_feed_is_empty_array) result.blockers.push('deals_feed HTTP != 200 or not []');

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  try {
    const page = await browser.newPage();
    const consoleErrors = [];
    const runtimeErrors = [];
    page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
    page.on('pageerror', err => runtimeErrors.push(String(err)));

    await page.goto(productionUrl, { waitUntil: 'networkidle0', timeout: 20000 });
    const storefront = await page.evaluate(() => ({
      version: window.__JAYT_STOREFRONT__?.version,
      total: window.__JAYT_STOREFRONT__?.totalCardsCount,
      civic: window.__JAYT_STOREFRONT__?.civicCardsCount,
      commercial: window.__JAYT_STOREFRONT__?.commercialCardsCount,
      civicDomCount: document.querySelectorAll('.t2-pilot-card-section').length
    }));

    await page.evaluate(() => document.querySelector('[data-nav="VOUCHER_HUB"]')?.click());
    await page.waitForSelector('#v3424-commercial-container .commercial-card', { timeout: 5000 });

    const commercial = await page.evaluate(() => {
      const cards = [...document.querySelectorAll('#v3424-commercial-container .commercial-card')];
      return {
        count: cards.length,
        ids: cards.map(c => c.dataset.sku),
        overflow: document.documentElement.scrollWidth > window.innerWidth
      };
    });

    result.gates = {
      http_all_200: result.blockers.length === 0,
      storefront_v3424_51_cards: storefront.version === 'v3.424.0' && storefront.total === 51 && storefront.commercial === 27,
      civic_dom_cards_count_24: storefront.civicDomCount === 24,
      commercial_cards_count_27: commercial.count === 27,
      four_batch_15_present: requiredNewIds.every(id => commercial.ids.includes(id)),
      forbidden_absent: forbiddenIds.every(id => !commercial.ids.includes(id)),
      zero_overflow: !commercial.overflow,
      zero_console_errors: consoleErrors.length === 0 && runtimeErrors.length === 0
    };

    result.pass = Object.values(result.gates).every(Boolean) && result.blockers.length === 0;
    if (!result.pass) {
      console.error('P0 MONITORING DRIFT DETECTED:', result);
    }
  } finally {
    await browser.close();
  }

  fs.mkdirSync(path.dirname(rollingReceiptPath), { recursive: true });
  fs.writeFileSync(rollingReceiptPath, JSON.stringify(result, null, 2) + '\n');
  console.log(JSON.stringify({ status: result.pass ? 'HEALTHY' : 'DRIFT_ALERT', gates: result.gates }, null, 2));
  if (!result.pass) process.exitCode = 1;
})().catch(err => {
  console.error(err);
  process.exitCode = 1;
});
