const puppeteer = require('puppeteer');
const fs = require('fs');

async function captureBottom() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)');
  await page.goto('https://jayt-production-v3420.vercel.app', { waitUntil: 'networkidle2' });

  await page.$eval('#j401-voucher-input', el => {
    el.value = 'https://vt.tiktok.com/ZS9AJ7tbWDtcs-yOIvD/';
    el.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await page.evaluate(() => handleVoucherLookup());
  await page.waitForSelector('.jayt-buying-advisory-engine', { timeout: 20000 });
  await new Promise(r => setTimeout(r, 2000));

  // Scroll so Pillar 2 & Pillar 3 are centered
  await page.evaluate(() => {
    closeVoucherScannerModal();
    const adv = document.querySelector('#j401-voucher-output .jayt-buying-advisory-engine');
    if (adv) {
      adv.scrollIntoView({ behavior: 'instant', block: 'end' });
    }
  });
  await new Promise(r => setTimeout(r, 1000));

  const p2p3Path = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng/07_QUALITY_ASSURANCE/runtime_evidence/j421_live_advisory_bottom_iphone.png';
  await page.screenshot({ path: p2p3Path });
  fs.copyFileSync(p2p3Path, 'C:/Users/tritr/.gemini/antigravity/brain/0fd55bc2-4a92-47b9-9f66-c02b2cf9af3a/j421_live_advisory_bottom_iphone.png');

  console.log('Saved bottom screenshot');
  await browser.close();
}

captureBottom().catch(console.error);
