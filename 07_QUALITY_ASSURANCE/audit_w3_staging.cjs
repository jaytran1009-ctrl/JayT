const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const puppeteer = require('puppeteer');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const STAGING_URL = process.env.JAYT_W3_STAGING_URL || 'http://127.0.0.1:4177';
const VIEWPORTS = [1440, 768, 390];
const PROHIBITED_PUBLIC_TERMS = ['bento hub', 'đối soát 4 lớp', 'provenance audit', 'fail-closed', 'quarantine manifest'];

function sha256(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

async function inspectViewport(browser, width) {
  const page = await browser.newPage();
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', error => errors.push(error.message));
  await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
  await page.goto(STAGING_URL, { waitUntil: 'networkidle0', timeout: 20000 });

  const before = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    text: document.body.innerText,
    spotify: Boolean(document.querySelector('#student-savings-module a[href="https://www.spotify.com/vn-vi/student/"]')),
    danabus: Boolean(document.querySelector('#student-savings-module a[href="https://danangbus.vn/"]')),
    lunchInputs: document.querySelectorAll('[data-lunch-app][data-lunch-field]').length,
    stackInputs: document.querySelectorAll('[data-stack-input]').length,
    affiliateTokens: ['partner_id', 's.shopee.vn', 'tiki.vn/affiliate', 'c.lazada.vn']
      .reduce((total, term) => total + document.documentElement.innerHTML.toLowerCase().split(term).length - 1, 0),
    affiliateReadiness: typeof window.dispatchSmartAffiliate === 'function'
      ? window.dispatchSmartAffiliate('shopee')
      : null
  }));

  await page.$eval('#slider-dish-price', el => {
    el.value = '80000';
    el.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await page.waitForSelector('[data-lunch-app="shopeefood"][data-lunch-field="deliveryFee"]');
  await page.$eval('[data-lunch-app="shopeefood"][data-lunch-field="deliveryFee"]', el => {
    el.value = '12000';
    el.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await page.waitForSelector('[data-lunch-app="shopeefood"][data-lunch-field="voucher"]');
  await page.$eval('[data-lunch-app="shopeefood"][data-lunch-field="voucher"]', el => {
    el.value = '5000';
    el.dispatchEvent(new Event('input', { bubbles: true }));
  });

  const calculation = await page.evaluate(() => {
    const card = [...document.querySelectorAll('.app-calc-card')]
      .find(element => element.textContent.includes('ShopeeFood'));
    return card ? card.textContent.replace(/\s+/g, ' ').trim() : '';
  });

  for (const [field, value] of Object.entries({
    basketValue: 80000,
    shopDiscount: 10000,
    platformVoucher: 15000,
    deliveryFee: 10000,
    freeshipCredit: 5000
  })) {
    const selector = `[data-stack-input="${field}"]`;
    await page.waitForSelector(selector);
    await page.$eval(selector, (element, nextValue) => {
      element.value = String(nextValue);
      element.dispatchEvent(new Event('input', { bubbles: true }));
    }, value);
  }
  const stackReplayText = await page.$eval('#student-savings-module .split-big-number', element => element.textContent.trim());
  await page.close();

  return {
    viewport_width_px: width,
    scroll_width_px: before.scrollWidth,
    horizontal_overflow: before.scrollWidth > before.clientWidth,
    spotify_visible: before.spotify,
    danabus_visible: before.danabus,
    lunch_input_count: before.lunchInputs,
    stack_input_count: before.stackInputs,
    affiliate_token_count: before.affiliateTokens,
    affiliate_readiness: before.affiliateReadiness,
    prohibited_public_terms: PROHIBITED_PUBLIC_TERMS.filter(term => before.text.toLowerCase().includes(term)),
    shopeefood_replay_text: calculation,
    ktx_replay_text: stackReplayText,
    console_or_runtime_errors: errors
  };
}

async function run() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  try {
    const viewports = [];
    for (const width of VIEWPORTS) viewports.push(await inspectViewport(browser, width));
    const source = path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
    const receipt = {
      receipt_id: 'JAYT_W3_STAGING_RUNTIME_AUDIT_RECEIPT',
      work_order_id: 'WORK_ORDER_W3_MOBILIZATION_STAGING',
      staging_url: STAGING_URL,
      production_mutated: false,
      source_sha256: sha256(source),
      viewports,
      contract: {
        affiliate_enabled: false,
        automated_shopeefood_capture: 'DISABLED_BY_POLICY',
        calculator_formula: 'user_entered_food_price + user_entered_delivery_fee - user_entered_voucher',
        danabus_fare_claim: 'HELD_STALE_SOURCE'
      }
    };
    const pass = viewports.every(result =>
      !result.horizontal_overflow &&
      result.spotify_visible &&
      result.danabus_visible &&
      result.lunch_input_count === 6 &&
      result.stack_input_count === 5 &&
      result.affiliate_token_count === 0 &&
      result.affiliate_readiness?.status === 'PENDING_PARTNER_AUTHENTICATION' &&
      result.affiliate_readiness?.affiliateEnabled === false &&
      result.affiliate_readiness?.dispatchPerformed === false &&
      result.affiliate_readiness?.destinationUrl === null &&
      result.affiliate_readiness?.trackingParameters === null &&
      result.prohibited_public_terms.length === 0 &&
      result.console_or_runtime_errors.length === 0 &&
      result.shopeefood_replay_text.includes('87.000 ₫') &&
      result.ktx_replay_text.includes('60.000 ₫')
    );
    receipt.decision = pass ? 'PASS' : 'FAIL';
    const output = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'JAYT_W3_STAGING_RUNTIME_AUDIT_RECEIPT.json');
    fs.writeFileSync(output, JSON.stringify(receipt, null, 2) + '\n');
    console.log(JSON.stringify(receipt, null, 2));
    process.exitCode = pass ? 0 : 2;
  } finally {
    await browser.close();
  }
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
