'use strict';
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 1050 });
    await page.goto('https://jayt-production-v3420.vercel.app/', { waitUntil: 'networkidle2' });
    await page.waitForSelector('#j401-voucher-input');
    await page.$eval('#j401-voucher-input', el => {
      el.value = 'https://shop.tiktok.com/vn/pdp/1734961837103548126';
    });
    await page.evaluate(() => {
      if (typeof handleVoucherLookup === 'function') handleVoucherLookup();
    });
    await page.waitForSelector('#jayt-voucher-scanner-modal.is-open');
    await new Promise(r => setTimeout(r, 1500));

    // Scroll modal down to reveal Tier 2
    await page.evaluate(() => {
      const modal = document.querySelector('#jayt-voucher-scanner-modal > div');
      if (modal) modal.scrollTop = 600;
    });
    await new Promise(r => setTimeout(r, 800));

    const pDesk = path.join(__dirname, 'runtime_evidence/j428_live_desktop_tier2_scrolled.png');
    await page.screenshot({ path: pDesk });
    console.log('Saved:', pDesk);

    const artDir = 'C:/Users/tritr/.gemini/antigravity/brain/0fd55bc2-4a92-47b9-9f66-c02b2cf9af3a';
    fs.copyFileSync(pDesk, path.join(artDir, 'j428_live_desktop_tier2_scrolled.png'));
    console.log('Copied to artifacts.');
  } finally {
    await browser.close();
  }
})();
