const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.resolve(__dirname, '..');
const URL = process.env.JAYT_COMMERCIAL_STAGING_URL || 'http://127.0.0.1:4176/commercial_test.html';
const OUT = path.join(ROOT, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'JAYT_333_COMMERCIAL_DOM_AUDIT_RECEIPT.json');
const CATALOG = path.join(ROOT, 'staging_workspace_j328', 'JAYT_333_COMMERCIAL_PILOT_CATALOG.json');
const expectedCards = JSON.parse(fs.readFileSync(CATALOG, 'utf8')).length;

(async () => {
  const receipt = {
    receipt_name: 'JAYT_333_COMMERCIAL_DOM_AUDIT_RECEIPT',
    generated_at_utc: new Date().toISOString(),
    url: URL,
    console_errors: [],
    page_errors: [],
    viewports: [],
    assertions: {},
    all_passed: false
  };
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  try {
    const page = await browser.newPage();
    page.on('console', msg => { if (msg.type() === 'error') receipt.console_errors.push(msg.text()); });
    page.on('pageerror', err => receipt.page_errors.push(err.message));
    const response = await page.goto(URL, { waitUntil: 'networkidle0', timeout: 15000 });
    await page.waitForFunction(expected => window.APPROVED_CARDS_COUNT === expected, { timeout: 10000 }, expectedCards);
    const summary = await page.evaluate(() => {
      const cards = [...document.querySelectorAll('.commercial-card')];
      const buttons = [...document.querySelectorAll('.tier-filter')];
      return {
        cards: cards.length,
        uniqueIds: new Set(cards.map(card => card.dataset.sku || card.dataset.cardId)).size,
        controls: buttons.map(button => ({ filter: button.dataset.filter, minHeight: button.getBoundingClientRect().height })),
        localityQualified: cards.filter(card => /Đà Nẵng/.test(card.querySelector('.geographic-scope')?.textContent || '') && !/Chưa xác minh/.test(card.querySelector('.geographic-scope')?.textContent || '')).length,
        sourceLinks: cards.map(card => card.querySelector('.source-link-btn')?.href || ''),
        visibleCards: cards.filter(card => !card.hidden).length
      };
    });
    const filters = {};
    for (const filter of ['COUNTER_DEAL', 'BRAND_PROGRAM', 'APP_HIDDEN_CODE', 'VALUE_RADAR', 'ALL']) {
      filters[filter] = await page.evaluate(filterName => {
        document.querySelector(`[data-filter="${filterName}"]`).click();
        return [...document.querySelectorAll('.commercial-card')].filter(card => !card.hidden).length;
      }, filter);
    }
    for (const width of [1440, 768, 390]) {
      await page.setViewport({ width, height: 900 });
      const viewport = await page.evaluate(() => ({
        width: innerWidth,
        overflow: document.documentElement.scrollWidth > innerWidth,
        minControlHeight: Math.min(...[...document.querySelectorAll('.tier-filter')].map(el => el.getBoundingClientRect().height))
      }));
      receipt.viewports.push(viewport);
    }
    receipt.http_status = response.status();
    receipt.metrics = { ...summary, filters };
    receipt.assertions = {
      http_200: response.status() === 200,
      exact_catalog_card_count: summary.cards === expectedCards && summary.uniqueIds === expectedCards,
      minimum_20_locality_qualified: summary.localityQualified >= 20,
      three_voucher_tiers_present: ['COUNTER_DEAL', 'BRAND_PROGRAM', 'APP_HIDDEN_CODE'].every(key => summary.controls.some(control => control.filter === key)),
      app_hidden_code_empty_fail_closed: filters.APP_HIDDEN_CODE === 0,
      value_radar_present: filters.VALUE_RADAR >= 13,
      all_filter_restores_catalog_count: filters.ALL === expectedCards,
      clean_source_links: summary.sourceLinks.every(url => /^https:\/\//.test(url) && !/[?&](utm_|aff|ref|subid|click|track)/i.test(url)),
      zero_console_or_runtime_errors: receipt.console_errors.length === 0 && receipt.page_errors.length === 0,
      responsive_no_horizontal_overflow: receipt.viewports.every(viewport => !viewport.overflow),
      controls_minimum_44px: receipt.viewports.every(viewport => viewport.minControlHeight >= 44)
    };
    receipt.all_passed = Object.values(receipt.assertions).every(Boolean);
  } finally {
    await browser.close();
    fs.writeFileSync(OUT, JSON.stringify(receipt, null, 2) + '\n');
  }
  console.log(JSON.stringify(receipt, null, 2));
  if (!receipt.all_passed) process.exitCode = 1;
})().catch(error => { console.error(error); process.exitCode = 1; });
