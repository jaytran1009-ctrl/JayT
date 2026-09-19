/**
 * JAYT-421: PUPPETEER REAL IPHONE RUNTIME AUDIT
 * Target: https://jayt-production-v3420.vercel.app
 * Viewport: iPhone 14/15 Pro (390x844)
 */

'use strict';

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT_DIR = path.resolve(__dirname, '..');
const CANONICAL_URL = 'https://jayt-production-v3420.vercel.app';

async function runLiveAudit() {
  console.log('=== JAYT-421: LIVE PUPPETEER IPHONE AUDIT ON CANONICAL PRODUCTION ===\n');

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1');

    console.log(`Navigating to ${CANONICAL_URL}...`);
    await page.goto(CANONICAL_URL, { waitUntil: 'networkidle2', timeout: 45000 });

    // Check for input
    await page.waitForSelector('#j401-voucher-input', { timeout: 15000 });
    console.log('Found #j401-voucher-input on live production');

    // Paste Chairman's shortlink
    const testLink = 'https://vt.tiktok.com/ZS9AJ7tbWDtcs-yOIvD/';
    console.log(`Entering test shortlink: ${testLink}`);
    await page.$eval('#j401-voucher-input', (el, val) => {
      el.value = val;
      el.dispatchEvent(new Event('input', { bubbles: true }));
    }, testLink);

    // Click submit button or call handleVoucherLookup
    await page.evaluate(() => {
      if (typeof handleVoucherLookup === 'function') {
        handleVoucherLookup();
      }
    });
    console.log('Called handleVoucherLookup(). Waiting for async resolution and advisory render...');

    // Wait for the advisory engine box to appear
    await page.waitForSelector('.jayt-buying-advisory-engine', { timeout: 20000 });
    console.log('Found .jayt-buying-advisory-engine on live production!');

    // Wait 2s for all animations and renders to settle
    await new Promise(r => setTimeout(r, 2000));

    // Scroll advisory engine into view inside modal or page
    await page.evaluate(() => {
      const adv = document.querySelector('.jayt-buying-advisory-engine');
      if (adv) {
        adv.scrollIntoView({ behavior: 'instant', block: 'start' });
      }
    });
    await new Promise(r => setTimeout(r, 800));

    // Capture screenshot
    const evidenceDir = path.join(ROOT_DIR, '07_QUALITY_ASSURANCE/runtime_evidence');
    if (!fs.existsSync(evidenceDir)) fs.mkdirSync(evidenceDir, { recursive: true });

    const screenshotPath = path.join(evidenceDir, 'j421_live_advisory_engine_iphone.png');
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log(`Saved runtime screenshot to: ${screenshotPath}`);

    // Copy to artifact directory
    const artifactPath = 'C:\\Users\\tritr\\.gemini\\antigravity\\brain\\0fd55bc2-4a92-47b9-9f66-c02b2cf9af3a\\j421_live_advisory_engine_iphone.png';
    fs.copyFileSync(screenshotPath, artifactPath);
    console.log(`Copied screenshot to artifact directory: ${artifactPath}`);

    // Also close modal and take inline screenshot
    await page.evaluate(() => {
      if (typeof closeVoucherScannerModal === 'function') {
        closeVoucherScannerModal();
      }
      const inlineAdv = document.querySelector('#j401-voucher-output .jayt-buying-advisory-engine');
      if (inlineAdv) {
        inlineAdv.scrollIntoView({ behavior: 'instant', block: 'start' });
      }
    });
    await new Promise(r => setTimeout(r, 800));

    const inlineScreenshotPath = path.join(evidenceDir, 'j421_live_inline_advisory_iphone.png');
    await page.screenshot({ path: inlineScreenshotPath, fullPage: false });
    console.log(`Saved inline runtime screenshot to: ${inlineScreenshotPath}`);

    const artifactInlinePath = 'C:\\Users\\tritr\\.gemini\\antigravity\\brain\\0fd55bc2-4a92-47b9-9f66-c02b2cf9af3a\\j421_live_inline_advisory_iphone.png';
    fs.copyFileSync(inlineScreenshotPath, artifactInlinePath);
    console.log(`Copied inline screenshot to artifact directory: ${artifactInlinePath}`);

    // Extract DOM texts
    const advisoryText = await page.$eval('.jayt-buying-advisory-engine', el => el.innerText);
    console.log('\n--- EXTRACTED ADVISORY ENGINE TEXT ---');
    console.log(advisoryText.slice(0, 600));
    console.log('-------------------------------------\n');

    // Assertions
    if (!advisoryText.includes('Phán Quyết Mua Sắm Từ JayT')) {
      throw new Error('FAIL: Advisory engine missing title!');
    }
    if (!advisoryText.includes('MẸO ÁP MÃ KÉP GIỜ VÀNG')) {
      throw new Error('FAIL: Advisory engine missing Pillar 2 (Golden Hours)!');
    }
    if (!advisoryText.includes('CẢNH BÁO VẬN CHUYỂN ĐÀ NẴNG')) {
      throw new Error('FAIL: Advisory engine missing Pillar 3 (Da Nang Shipping)!');
    }

    console.log('=== LIVE IPHONE VERIFICATION COMPLETED WITH 100% PASS ===');
  } catch (err) {
    console.error('Live audit error:', err);
    process.exit(1);
  } finally {
    if (browser) await browser.close();
  }
}

runLiveAudit();
