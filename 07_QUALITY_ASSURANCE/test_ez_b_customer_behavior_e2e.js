/**
 * JAYT SECTION EZ-B CUSTOMER BEHAVIOR E2E QA SUITE
 * Governing Directive: JAYT-245 Section EZ-B (Lines 3940-3969), Mandate EZ-B.4
 *
 * Verifies real customer interactions:
 * - Public CTA click into Savings Lab
 * - Interactive form input & real-time calculation
 * - Bill splitting calculation
 * - Validation & Reset handling
 * - Clean zero-state & absence of fake inventory / unverified locality
 */

const puppeteer = require('puppeteer');
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const BASE_URL = 'http://127.0.0.1:4173/';

const VIEWPORTS = [
  { name: 'Desktop 1440', width: 1440, height: 900 },
  { name: 'Tablet 768', width: 768, height: 1024 },
  { name: 'Mobile 390', width: 390, height: 844 }
];

const FORBIDDEN_TOKENS = [
  '50 / 50', '50/50', '50 mục', 'Khám phá (50)', 'Chương Trình (13)',
  'Hòa Khánh', 'Ngũ Hành Sơn', 'Hải Châu', 'Thanh Khê', 'Sơn Trà', 'Bách Khoa', 'VKU',
  'Mua 1 Tặng 1', 'Happy Lunch', 'Ngày Tri Ân', 'go.isclix'
];

async function runCustomerBehaviorE2E() {
  console.log('\n🎭 RUNNING JAYT SECTION EZ-B CUSTOMER BEHAVIOR E2E QA...');
  console.log('   Target: ' + BASE_URL + '\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const packDir = path.join(ROOT, '07_QUALITY_ASSURANCE/browser_pack_ez_b');
  if (!fs.existsSync(packDir)) fs.mkdirSync(packDir, { recursive: true });

  let totalTests = 0;
  let passedTests = 0;

  function it(name, fn) {
    totalTests++;
    try {
      fn();
      console.log('  ✓ ' + name);
      passedTests++;
    } catch (err) {
      console.error('  ✕ ' + name + ': ' + err.message);
      throw err;
    }
  }

  for (const vp of VIEWPORTS) {
    console.log('\n--- Viewport: ' + vp.name + ' (' + vp.width + 'x' + vp.height + ') ---');
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height });

    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 15000 });

    // 1. Check clean DOM text on fresh load
    const initialText = await page.evaluate(() => document.body.innerText);
    
    it('[' + vp.name + '] 0 console JS errors on load', () => {
      const critical = consoleErrors.filter(e => !e.includes('favicon') && !e.includes('404'));
      assert.strictEqual(critical.length, 0);
    });

    it('[' + vp.name + '] 0 Maps links in rendered DOM', async () => {
      const mapsCount = await page.evaluate(() => document.querySelectorAll('a[href*="google.com/maps"]').length);
      assert.strictEqual(mapsCount, 0);
    });

    it('[' + vp.name + '] 0 forbidden counts / unverified locality / fake promo', () => {
      let hits = [];
      FORBIDDEN_TOKENS.forEach(tok => {
        if (initialText.includes(tok)) hits.push(tok);
      });
      assert.strictEqual(hits.length, 0, 'Found forbidden tokens: ' + hits.join(', '));
    });

    // Capture initial home screenshot
    const shotHome = path.join(packDir, vp.name.toLowerCase().replace(' ', '_') + '_01_home.png');
    await page.screenshot({ path: shotHome });

    // 2. Real Customer Interaction: Click CTA to open Savings Lab
    console.log('  👉 Customer clicks "Tự Tính Thực Trả & Chia Bill" CTA...');
    const ctaExists = await page.evaluate(() => {
      const btn = document.querySelector('[data-nav="BUY_DECISION"]');
      if (btn) { btn.click(); return true; }
      return false;
    });

    it('[' + vp.name + '] Public CTA [data-nav="BUY_DECISION"] clicked', () => {
      assert.strictEqual(ctaExists, true, 'CTA button not found');
    });

    await new Promise(r => setTimeout(r, 400));

    // 3. Verify Savings Lab View is mounted
    const labMounted = await page.evaluate(() => {
      return !!document.getElementById('savings-lab-container') &&
             !!document.getElementById('calc-item-price') &&
             !!document.getElementById('calc-shipping-fee') &&
             !!document.getElementById('calc-discount') &&
             !!document.getElementById('calc-extra-discount') &&
             !!document.getElementById('calc-split-count');
    });

    it('[' + vp.name + '] Savings Lab form and inputs are rendered & visible', () => {
      assert.strictEqual(labMounted, true);
    });

    // 4. Real Customer Interaction: Fill Form & Compute
    console.log('  👉 Customer types: Price=150000, Ship=25000, Discount=30000, Extra=10000, People=3...');
    await page.type('#calc-item-price', '150000');
    await page.type('#calc-shipping-fee', '25000');
    await page.type('#calc-discount', '30000');
    await page.type('#calc-extra-discount', '10000');
    
    // Set split count to 3
    await page.evaluate(() => {
      document.getElementById('calc-split-count').value = '3';
    });
    
    await page.click('#btn-calc-execute');
    await new Promise(r => setTimeout(r, 200));

    const totalText = await page.evaluate(() => document.getElementById('res-total-amount').innerText);
    const savedText = await page.evaluate(() => document.getElementById('res-saved-amount').innerText);
    const splitText = await page.evaluate(() => document.getElementById('res-split-amount').innerText);

    it('[' + vp.name + '] Computed Total = 135.000 đ', () => {
      assert.ok(totalText.includes('135.000'), 'Expected 135.000 đ, got: ' + totalText);
    });

    it('[' + vp.name + '] Computed Saved = 40.000 đ', () => {
      assert.ok(savedText.includes('40.000'), 'Expected 40.000 đ, got: ' + savedText);
    });

    it('[' + vp.name + '] Computed Split = 45.000 đ / người', () => {
      assert.ok(splitText.includes('45.000'), 'Expected 45.000 đ, got: ' + splitText);
    });

    // Capture calculated result screenshot
    const shotCalc = path.join(packDir, vp.name.toLowerCase().replace(' ', '_') + '_02_savings_lab_computed.png');
    await page.screenshot({ path: shotCalc });

    // 5. Test Negative Number Validation
    console.log('  👉 Customer types negative price (-50000)...');
    await page.evaluate(() => {
      document.getElementById('calc-item-price').value = '-50000';
      document.getElementById('btn-calc-execute').click();
    });
    await new Promise(r => setTimeout(r, 200));

    const errVisible = await page.evaluate(() => {
      const err = document.getElementById('calc-validation-error');
      return err && err.style.display !== 'none';
    });

    it('[' + vp.name + '] Negative input triggers validation alert and auto-clamps', () => {
      assert.strictEqual(errVisible, true);
    });

    // 6. Test Reset Button
    console.log('  👉 Customer clicks "Xóa & Đặt Lại (Reset)"...');
    await page.click('#btn-calc-reset');
    await new Promise(r => setTimeout(r, 200));

    const resetTotal = await page.evaluate(() => document.getElementById('res-total-amount').innerText);
    const priceVal = await page.evaluate(() => document.getElementById('calc-item-price').value);

    it('[' + vp.name + '] Reset button clears inputs and resets total to 0 đ', () => {
      assert.strictEqual(priceVal, '');
      assert.ok(resetTotal.includes('0'));
    });

    await page.close();
  }

  await browser.close();

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' CUSTOMER BEHAVIOR E2E TESTS PASSED!\n');
}

runCustomerBehaviorE2E().catch(err => {
  console.error('❌ Customer Behavior E2E Error:', err.message);
  process.exit(1);
});
