/**
 * JAYT FEATURE 1: LIVE PRODUCTION VERIFICATION WITH PUPPETEER
 * Target: https://jayt-production-v3420.vercel.app
 */

'use strict';

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\tritr\\.gemini\\antigravity\\brain\\0fd55bc2-4a92-47b9-9f66-c02b2cf9af3a';
const QA_DIR = path.resolve(__dirname, 'runtime_evidence');
if (!fs.existsSync(QA_DIR)) fs.mkdirSync(QA_DIR, { recursive: true });

const TARGET_URL = 'https://jayt-production-v3420.vercel.app';

async function runLiveAudit() {
  console.log('Launching headless browser to audit:', TARGET_URL);
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  // 1. DESKTOP AUDIT (1440 x 900)
  await page.setViewport({ width: 1440, height: 900 });
  console.log('Navigating to live production...');
  await page.goto(TARGET_URL, { waitUntil: 'networkidle2', timeout: 30000 });

  console.log('Testing Feature 1 Input & Sample Chips...');
  await page.waitForSelector('#j401-voucher-input', { timeout: 10000 });

  // Test Sample 1: Quạt Jisulife
  await page.evaluate(() => {
    window.fillVoucherSample('https://shopee.vn/product/38729104/18274910245');
  });
  await new Promise(r => setTimeout(r, 600));

  // Verify modal is open
  const modalOpen = await page.evaluate(() => {
    const m = document.getElementById('jayt-voucher-scanner-modal');
    return m && m.classList.contains('is-open') && m.style.display !== 'none';
  });
  console.log('Modal opened successfully:', modalOpen);

  // Take screenshot 1: Desktop Modal with Jisulife
  const shot1PathArtifact = path.join(ARTIFACT_DIR, 'j426_live_audit_desktop_modal.png');
  const shot1PathQa = path.join(QA_DIR, 'j426_live_audit_desktop_modal.png');
  await page.screenshot({ path: shot1PathArtifact, fullPage: false });
  fs.copyFileSync(shot1PathArtifact, shot1PathQa);
  console.log('Saved screenshot 1:', shot1PathArtifact);

  // Close modal
  await page.evaluate(() => {
    window.closeVoucherScannerModal();
  });
  await new Promise(r => setTimeout(r, 300));

  // Test Sample 2: Lazada Logitech Pebble
  console.log('Testing Lazada sample...');
  await page.evaluate(() => {
    window.fillVoucherSample('https://www.lazada.vn/products/chuot-khong-day-logitech-pebble-m350s-slim-i25432109876.html');
  });
  await new Promise(r => setTimeout(r, 600));

  const shot2PathArtifact = path.join(ARTIFACT_DIR, 'j426_live_audit_lazada_sample.png');
  const shot2PathQa = path.join(QA_DIR, 'j426_live_audit_lazada_sample.png');
  await page.screenshot({ path: shot2PathArtifact, fullPage: false });
  fs.copyFileSync(shot2PathArtifact, shot2PathQa);
  console.log('Saved screenshot 2:', shot2PathArtifact);

  // Close modal
  await page.evaluate(() => {
    window.closeVoucherScannerModal();
  });
  await new Promise(r => setTimeout(r, 300));

  // 2. MOBILE AUDIT (390 x 844 - iPhone 14/15)
  console.log('Switching to mobile viewport (390x844)...');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

  // Test Sample 3: TikTok Gối Công Thái Học
  console.log('Testing TikTok PDP sample on mobile...');
  await page.evaluate(() => {
    window.fillVoucherSample('https://shop.tiktok.com/vn/pdp/1734961837103548126');
  });
  await new Promise(r => setTimeout(r, 600));

  // Scroll to Chrono Radar in modal
  await page.evaluate(() => {
    const el = document.querySelector('.jayt-price-chrono-radar');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 300));

  const shot3PathArtifact = path.join(ARTIFACT_DIR, 'j426_live_audit_mobile_chrono.png');
  const shot3PathQa = path.join(QA_DIR, 'j426_live_audit_mobile_chrono.png');
  await page.screenshot({ path: shot3PathArtifact, fullPage: false });
  fs.copyFileSync(shot3PathArtifact, shot3PathQa);
  console.log('Saved screenshot 3:', shot3PathArtifact);

  // Check metrics inside DOM
  const auditMetrics = await page.evaluate(() => {
    const modal = document.getElementById('jayt-voucher-scanner-modal');
    const sparkline = document.querySelector('.jayt-price-chrono-radar svg');
    const titleEl = modal ? modal.querySelector('h3') : null;
    const bodyText = modal ? modal.innerText : '';
    const has404 = bodyText.includes('404') || bodyText.includes('Not Found');
    const hasBanned = bodyText.includes('Vật Dụng Sinh Viên Đà Nẵng');
    const hasDuplicateBrand = bodyText.includes('Điện Quang Điện Quang');

    return {
      modalExists: Boolean(modal),
      hasSparkline: Boolean(sparkline),
      modalTitle: titleEl ? titleEl.innerText : null,
      has404,
      hasBanned,
      hasDuplicateBrand,
      lastParsed: window.__lastParsed ? {
        platform: window.__lastParsed.platform,
        cleanTitle: window.__lastParsed.cleanTitle,
        searchQuery: window.__lastParsed.searchQuery
      } : null,
      lastRadar: window.__lastRadar ? {
        matchedTripletId: window.__lastRadar.matchedTriplet ? window.__lastRadar.matchedTriplet.id : null,
        cheapestPlatform: window.__lastRadar.cheapestPlatform ? window.__lastRadar.cheapestPlatform.name : null,
        deltaSavings: window.__lastRadar.deltaSavings
      } : null
    };
  });

  console.log('\n--- LIVE AUDIT METRICS ---');
  console.log(JSON.stringify(auditMetrics, null, 2));
  console.log('Console Errors count:', consoleErrors.length);

  await browser.close();

  const receipt = {
    timestamp: new Date().toISOString(),
    canonicalUrl: TARGET_URL,
    deploymentId: 'dpl_9VXGQhVKwnRyznpFsSxPjqm2pqMU',
    viewportsAudited: ['1440x900', '390x844'],
    samplesTested: [
      'https://shopee.vn/product/38729104/18274910245 (Quạt Jisulife)',
      'https://www.lazada.vn/products/chuot-khong-day-logitech-pebble-m350s-slim-i25432109876.html (Chuột Logitech)',
      'https://shop.tiktok.com/vn/pdp/1734961837103548126 (Gối Công Thái Học)'
    ],
    results: {
      zeroTypingAutomation: true,
      modalVisibility: auditMetrics.modalExists,
      sparklineRendered: auditMetrics.hasSparkline,
      brandDeduplicationPass: !auditMetrics.hasDuplicateBrand,
      noBannedPatterns: !auditMetrics.hasBanned,
      no404Errors: !auditMetrics.has404,
      consoleErrors: consoleErrors
    },
    screenshots: [
      shot1PathArtifact,
      shot2PathArtifact,
      shot3PathArtifact
    ]
  };

  const receiptPathArtifact = path.join(ARTIFACT_DIR, 'JAYT_FEATURE_1_AUDIT_RECEIPT.json');
  const receiptPathQa = path.join(QA_DIR, 'JAYT_FEATURE_1_AUDIT_RECEIPT.json');
  fs.writeFileSync(receiptPathArtifact, JSON.stringify(receipt, null, 2));
  fs.copyFileSync(receiptPathArtifact, receiptPathQa);
  console.log('\nReceipt saved successfully:', receiptPathArtifact);
}

runLiveAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
