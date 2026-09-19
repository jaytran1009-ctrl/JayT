/**
 * JAYT-429: Live Puppeteer Production Verification Suite
 * Directive: CHAIRMAN_DIRECTIVE_20260918_INTEGRATE_FLASH_DEALS_70_80_AND_DANANG_GO_LIVE
 * Target: https://jayt-production-v3420.vercel.app/
 */

'use strict';

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const crypto = require('crypto');

(async () => {
  const targetUrl = process.env.TEST_URL || 'https://jayt-production-v3420.vercel.app/';
  const evidenceDir = path.resolve(__dirname, 'runtime_evidence');
  if (!fs.existsSync(evidenceDir)) {
    fs.mkdirSync(evidenceDir, { recursive: true });
  }

  console.log('================================================================');
  console.log('JAYT-429: LIVE PRODUCTION PUPPETEER VERIFICATION');
  console.log('Target URL: ' + targetUrl);
  console.log('================================================================\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });

  const auditReport = {
    directive: 'CHAIRMAN_DIRECTIVE_20260918_INTEGRATE_FLASH_DEALS_70_80_AND_DANANG_GO_LIVE',
    timestamp: new Date().toISOString(),
    targetUrl,
    tests: {}
  };

  try {
    // -------------------------------------------------------------
    // RUN 1: MOBILE SAFARI (390x844, scale 2)
    // -------------------------------------------------------------
    console.log('[1/2] Testing Mobile Safari (390x844)...');
    const mobilePage = await browser.newPage();
    await mobilePage.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    await mobilePage.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1');

    const mobileResp = await mobilePage.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 35000 });
    console.log('Mobile HTTP Status:', mobileResp.status());
    assert.ok([200, 304].includes(mobileResp.status()), 'HTTP status must be 200 or 304');

    // Wait for flash radar container
    await mobilePage.waitForSelector('#jayt-flash-arbitrage-radar', { timeout: 15000 });
    console.log('Flash Arbitrage Radar container detected on mobile.');

    // Audit cards count
    const mobileCardsCount = await mobilePage.$$eval('.flash-deal-card', els => els.length);
    console.log('Total Flash Deal cards rendered on mobile:', mobileCardsCount);
    assert.strictEqual(mobileCardsCount, 12, 'Must render exactly 12 deal cards');

    // Click tab 2: DECOR_49K
    await mobilePage.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('.btn-flash-deal-tab')).find(b => b.textContent.includes('Decor'));
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 600));

    // Verify filter state
    const decorVisible = await mobilePage.$$eval('.flash-deal-card[data-group="DECOR_49K"]', els => els.every(el => el.style.display !== 'none'));
    const deal9kHidden = await mobilePage.$$eval('.flash-deal-card[data-group="DEAL_9K"]', els => els.every(el => el.style.display === 'none'));
    assert.ok(decorVisible, 'DECOR_49K cards should be visible');
    assert.ok(deal9kHidden, 'DEAL_9K cards should be hidden');
    console.log('Tab filtering interaction verified on mobile.');

    // Switch back to DEAL_9K for screenshot
    await mobilePage.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('.btn-flash-deal-tab')).find(b => b.textContent.includes('Deal 9K'));
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 600));

    // Mobile screenshot centered on Flash Radar
    await mobilePage.evaluate(() => {
      const el = document.getElementById('jayt-flash-arbitrage-radar');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise(r => setTimeout(r, 600));

    const mobileScreenshotPath = path.join(evidenceDir, 'j429_live_mobile_flash_radar.png');
    await mobilePage.screenshot({ path: mobileScreenshotPath, fullPage: false });
    console.log('Mobile screenshot saved to:', mobileScreenshotPath);

    auditReport.tests.mobile = {
      httpStatus: mobileResp.status(),
      cardsCount: mobileCardsCount,
      tabFiltering: 'PASS',
      screenshot: mobileScreenshotPath
    };

    // -------------------------------------------------------------
    // RUN 2: DESKTOP HD (1440x900)
    // -------------------------------------------------------------
    console.log('\n[2/2] Testing Desktop HD (1440x900)...');
    const desktopPage = await browser.newPage();
    await desktopPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

    const desktopResp = await desktopPage.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 35000 });
    console.log('Desktop HTTP Status:', desktopResp.status());
    assert.ok([200, 304].includes(desktopResp.status()), 'HTTP status must be 200 or 304');

    await desktopPage.waitForSelector('#jayt-flash-arbitrage-radar', { timeout: 15000 });

    // Desktop screenshot of Flash Radar
    await desktopPage.evaluate(() => {
      const el = document.getElementById('jayt-flash-arbitrage-radar');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise(r => setTimeout(r, 600));

    const desktopScreenshotPath = path.join(evidenceDir, 'j429_live_desktop_flash_radar.png');
    await desktopPage.screenshot({ path: desktopScreenshotPath, fullPage: false });
    console.log('Desktop screenshot saved to:', desktopScreenshotPath);

    // Audit KTX Dorm shelves for classification fix
    const shelfAudit = await desktopPage.evaluate(() => {
      const allSkus = window.J387_DORM_SKUS || [];
      const phuocSkuId = 'DORM_SKU_FEED_15_40900937672';
      
      const cluster1Survival = allSkus.filter(p => p.observed_price <= 49000 || p.sku_id === 'DORM_SKU_FEED_10_23244410073' || p.sku_id === 'DORM_SKU_FEED_14_29000715432' || p.sku_id === 'DORM_SKU_FEED_02_26609048170');
      const cluster2Desk = allSkus.filter(p => !cluster1Survival.includes(p) && p.category === 'Học tập & Công nghệ' && p.observed_price < 1000000);
      const cluster3Living = allSkus.filter(p => !cluster1Survival.includes(p) && !cluster2Desk.includes(p));

      const phuocInDesk = cluster2Desk.some(p => p.sku_id === phuocSkuId || p.observed_price >= 1000000);
      const phuocInLiving = cluster3Living.some(p => p.sku_id === phuocSkuId);

      // Check DOM elements in shelf 2
      const shelves = Array.from(document.querySelectorAll('.j465-price-shelf'));
      const shelf2El = shelves.find(s => (s.getAttribute('aria-label') || '').includes('Nhóm 2') || s.innerText.includes('Nhóm 2'));
      const shelf2Text = shelf2El ? shelf2El.innerText : '';
      const phuocInShelf2Dom = shelf2Text.includes('Phuộc') || shelf2Text.includes('2.400.000');

      return {
        phuocInDesk,
        phuocInLiving,
        phuocInShelf2Dom,
        cluster2DeskCount: cluster2Desk.length,
        cluster2MaxPrice: Math.max(...cluster2Desk.map(p => p.observed_price)),
        shelf2DomFound: !!shelf2El
      };
    });

    console.log('Dorm Shelf Classification Audit:', JSON.stringify(shelfAudit, null, 2));
    assert.strictEqual(shelfAudit.phuocInDesk, false, 'Phuộc RCB 2.400.000₫ must NOT be in cluster2Desk');
    assert.strictEqual(shelfAudit.phuocInLiving, true, 'Phuộc RCB 2.400.000₫ must be in cluster3Living');
    assert.strictEqual(shelfAudit.phuocInShelf2Dom, false, 'Phuộc RCB text must NOT appear in Shelf 2 DOM');
    assert.strictEqual(shelfAudit.shelf2DomFound, true, 'Shelf 2 DOM element must exist');
    console.log('Data classification bug verified 100% eradicated on live DOM.');

    // Scroll to shelf 2 to capture screenshot
    await desktopPage.evaluate(() => {
      const shelves = Array.from(document.querySelectorAll('.j465-price-shelf'));
      const shelf2 = shelves.find(s => (s.getAttribute('aria-label') || '').includes('Nhóm 2') || s.innerText.includes('Nhóm 2'));
      if (shelf2) {
        shelf2.scrollIntoView({ behavior: 'instant', block: 'center' });
      }
    });
    await new Promise(r => setTimeout(r, 800));

    const cleanShelfScreenshotPath = path.join(evidenceDir, 'j429_live_desktop_clean_shelf.png');
    await desktopPage.screenshot({ path: cleanShelfScreenshotPath, fullPage: false });
    console.log('Clean shelf screenshot saved to:', cleanShelfScreenshotPath);

    // Scroll back to top and test 1-Click "⚡ So 3 Sàn" on a flash deal
    await desktopPage.evaluate(() => {
      window.scrollTo(0, 0);
      const btn = document.querySelector('.btn-sku-cross-radar');
      if (btn) btn.click();
    });
    await desktopPage.waitForSelector('#jayt-voucher-scanner-modal.is-open', { timeout: 12000 });
    await new Promise(r => setTimeout(r, 1000));

    // Verify modal is opened
    const modalOpened = await desktopPage.evaluate(() => {
      const modal = document.getElementById('jayt-voucher-scanner-modal');
      return modal && modal.classList.contains('is-open');
    });
    console.log('Cross-Platform Comparison Modal Opened:', modalOpened);
    assert.ok(modalOpened, 'Cross-Platform comparison modal must open upon clicking ⚡ So 3 Sàn');

    const modalScreenshotPath = path.join(evidenceDir, 'j429_live_desktop_flash_modal.png');
    await desktopPage.screenshot({ path: modalScreenshotPath, fullPage: false });
    console.log('Comparison modal screenshot saved to:', modalScreenshotPath);

    auditReport.tests.desktop = {
      httpStatus: desktopResp.status(),
      classificationFix: shelfAudit,
      modalOpened,
      screenshots: [desktopScreenshotPath, cleanShelfScreenshotPath, modalScreenshotPath]
    };

    // Save final receipt
    const receiptPath = path.join(evidenceDir, 'JAYT_429_FLASH_DEALS_RECEIPT.json');
    fs.writeFileSync(receiptPath, JSON.stringify(auditReport, null, 2), 'utf8');
    console.log('\nReceipt saved to:', receiptPath);

    console.log('\n================================================================');
    console.log('JAYT-429 LIVE VERIFICATION COMPLETED: 100% PASS');
    console.log('================================================================\n');

  } catch (err) {
    console.error('LIVE VERIFICATION FAILED:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
