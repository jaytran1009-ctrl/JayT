'use strict';

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.resolve(__dirname, '..');
const URL = process.env.JAYT_COMMERCIAL_STAGING_URL || 'http://127.0.0.1:4176/commercial_test.html';
const OUT = process.env.JAYT_DOM_AUDIT_OUT
  ? path.resolve(ROOT, process.env.JAYT_DOM_AUDIT_OUT)
  : path.join(ROOT, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'STAGING_BATCH_15_P2_HYDRATION_RECEIPT.json');
const CATALOG = path.join(ROOT, 'staging_workspace_j328', 'JAYT_333_COMMERCIAL_PILOT_CATALOG.json');
const scopeIds = [
  'P2O_GALAXY_MEMBER_2026',
  'P2O_GALAXY_SHOPEEPAY_SEP_2026',
  'P2O_PHILONG_LENOVO_STUDENT_2026',
  'P2O_PHILONG_HP_BTS_2026'
];
const heldIds = [
  'P2O_CGV_FANC_2026',
  'P2O_GALAXY_ZALOPAY_REWARDS_2026Q3',
  'P2O_GALAXY_JCB_WEEKEND_2026Q3'
];
const expectedCards = JSON.parse(fs.readFileSync(CATALOG, 'utf8')).length;

(async () => {
  const receipt = {
    receipt_id: process.env.JAYT_DOM_AUDIT_RECEIPT_ID || 'STAGING_BATCH_15_P2_HYDRATION_RECEIPT',
    generated_at_utc: new Date().toISOString(),
    url: URL,
    expected_card_count: expectedCards,
    production_mutations: 0,
    production_deploy_permitted: false,
    console_errors: [],
    page_errors: [],
    viewports: [],
    assertions: {},
    all_passed: false
  };
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  try {
    const page = await browser.newPage();
    page.on('console', message => { if (message.type() === 'error') receipt.console_errors.push(message.text()); });
    page.on('pageerror', error => receipt.page_errors.push(error.message));
    const response = await page.goto(URL, { waitUntil: 'networkidle0', timeout: 20000 });
    await page.waitForFunction(expected => window.APPROVED_CARDS_COUNT === expected, { timeout: 12000 }, expectedCards);
    const metrics = await page.evaluate(({ scopeIds, heldIds }) => {
      const cards = [...document.querySelectorAll('.commercial-card')];
      const ids = cards.map(card => card.dataset.sku || card.dataset.cardId);
      const scoped = scopeIds.map(id => {
        const card = cards.find(node => (node.dataset.sku || node.dataset.cardId) === id);
        return { id, present: Boolean(card), text: card ? card.textContent : '', href: card?.querySelector('a')?.href || '' };
      });
      return {
        cardCount: cards.length,
        uniqueCount: new Set(ids).size,
        scoped,
        heldPresent: heldIds.filter(id => ids.includes(id)),
        sourceLinks: cards.map(card => card.querySelector('.source-link-btn')?.href || ''),
        appVoucherCount: cards.filter(card => card.dataset.voucherTier === 'APP_HIDDEN_CODE').length,
        tabbableCount: [...document.querySelectorAll('button, a[href]')].filter(el => !el.hidden).length
      };
    }, { scopeIds, heldIds });
    await page.evaluate(() => {
      if (document.activeElement && typeof document.activeElement.blur === 'function') document.activeElement.blur();
    });
    const keyboardSequence = [];
    for (let index = 0; index < metrics.tabbableCount; index++) {
      await page.keyboard.press('Tab');
      keyboardSequence.push(await page.evaluate(() => {
        const active = document.activeElement;
        const card = active && active.closest ? active.closest('.commercial-card') : null;
        return {
          tag: active ? active.tagName : null,
          filter: active?.dataset?.filter || null,
          card_id: card ? (card.dataset.sku || card.dataset.cardId) : null,
          class_name: active ? active.className : null
        };
      }));
    }
    receipt.keyboard_sequence = keyboardSequence;
    for (const width of [1440, 768, 390]) {
      await page.setViewport({ width, height: 900 });
      receipt.viewports.push(await page.evaluate(() => ({
        width: innerWidth,
        overflow: document.documentElement.scrollWidth > innerWidth,
        minInteractiveHeight: Math.min(...[...document.querySelectorAll('button, a[href]')].map(el => el.getBoundingClientRect().height))
      })));
    }
    const shopee = metrics.scoped.find(item => item.id === 'P2O_GALAXY_SHOPEEPAY_SEP_2026');
    receipt.http_status = response.status();
    receipt.metrics = metrics;
    receipt.assertions = {
      http_200: response.status() === 200,
      exact_28_unique_cards: expectedCards === 28 && metrics.cardCount === 28 && metrics.uniqueCount === 28,
      four_authorized_cards_present: metrics.scoped.every(item => item.present),
      three_held_cards_absent: metrics.heldPresent.length === 0,
      shopeepay_discloses_app_claim_and_budget: /ứng dụng ShopeePay/i.test(shopee.text) && /hết ngân sách/i.test(shopee.text) && /không phát hành mã/i.test(shopee.text),
      phi_long_model_restrictions_disclosed: metrics.scoped.filter(item => item.id.includes('PHILONG')).every(item => /model/i.test(item.text) && /tồn kho/i.test(item.text)),
      clean_https_source_links: metrics.sourceLinks.every(url => /^https:\/\//.test(url) && !/[?&](utm_|aff|ref|subid|click|track)/i.test(url)),
      zero_console_or_runtime_errors: receipt.console_errors.length === 0 && receipt.page_errors.length === 0,
      responsive_no_horizontal_overflow: receipt.viewports.every(item => !item.overflow),
      all_interactive_controls_minimum_44px: receipt.viewports.every(item => item.minInteractiveHeight >= 44),
      keyboard_navigation_surface_complete: metrics.tabbableCount === 33,
      keyboard_tab_order_exercised: keyboardSequence.length === 33
        && keyboardSequence.slice(0, 5).every(item => item.tag === 'BUTTON' && item.filter)
        && keyboardSequence.slice(5).every(item => item.tag === 'A' && item.card_id)
        && new Set(keyboardSequence.map(item => item.filter || item.card_id)).size === 33
    };
    receipt.all_passed = Object.values(receipt.assertions).every(Boolean);
  } finally {
    await browser.close();
    fs.writeFileSync(OUT, JSON.stringify(receipt, null, 2) + '\n');
  }
  console.log(JSON.stringify(receipt, null, 2));
  if (!receipt.all_passed) process.exitCode = 1;
})().catch(error => { console.error(error.stack || error.message); process.exitCode = 1; });
