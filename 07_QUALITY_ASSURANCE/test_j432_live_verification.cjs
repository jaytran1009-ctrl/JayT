/**
 * JAYT-432: Live Puppeteer Production Verification Suite
 * Directive: CHAIRMAN_DIRECTIVE_20260918_AUTHENTIC_REVIEWS_AND_FULL_FEATURE1_GO_LIVE
 * Target: https://jayt-production-v3420.vercel.app/
 */

'use strict';

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const assert = require('assert');

(async () => {
  const targetUrl = process.env.TEST_URL || 'https://jayt-production-v3420.vercel.app/';
  const testPdpUrl = 'https://shop.tiktok.com/vn/pdp/1734961837103548126';
  const evidenceDir = path.resolve(__dirname, 'runtime_evidence');
  if (!fs.existsSync(evidenceDir)) {
    fs.mkdirSync(evidenceDir, { recursive: true });
  }

  console.log('================================================================');
  console.log('JAYT-432: LIVE PRODUCTION PUPPETEER VERIFICATION');
  console.log('Target URL: ' + targetUrl);
  console.log('Test PDP URL: ' + testPdpUrl);
  console.log('================================================================\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });

  try {
    // -------------------------------------------------------------
    // RUN 1: MOBILE SAFARI (390x844, scale 2) - DORM SHELF REVIEW MODAL
    // -------------------------------------------------------------
    console.log('[1/2] Testing Mobile Safari (390x844)...');
    const mobilePage = await browser.newPage();
    await mobilePage.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    await mobilePage.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1');

    const mobileResp = await mobilePage.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 45000 });
    console.log('Mobile HTTP Status:', mobileResp.status());

    // Wait for Dorm Shopping Module to render
    await mobilePage.waitForSelector('.btn-sku-drawer-info', { timeout: 15000 });
    console.log('Found .btn-sku-drawer-info on dorm shelf.');

    // Click the first .btn-sku-drawer-info to open Authentic Reviews modal
    await mobilePage.evaluate(() => {
      const btn = document.querySelector('.btn-sku-drawer-info');
      if (btn) btn.click();
    });

    // Wait for #jayt-authentic-reviews-modal to be visible
    await mobilePage.waitForFunction(() => {
      const m = document.getElementById('jayt-authentic-reviews-modal');
      return m && m.style.display !== 'none' && m.classList.contains('is-open');
    }, { timeout: 10000 });
    await new Promise(r => setTimeout(r, 1200));

    // Audit Mobile Review Modal
    const mobileAudit = await mobilePage.evaluate(() => {
      const modal = document.getElementById('jayt-authentic-reviews-modal');
      if (!modal) return { modalFound: false };

      const isVisible = modal.style.display !== 'none';
      const upper = (modal.innerText || '').toUpperCase();
      const html = modal.innerHTML || '';
      const buyBtn = modal.querySelector('.btn-review-modal-buy-action');

      return {
        modalFound: true,
        isVisible,
        hasTrustScore: upper.includes('⭐') && (upper.includes('4.8') || upper.includes('4.7') || upper.includes('4.9')),
        hasAntiSeedingAudit: upper.includes('ĐÃ LỌC SẠCH 100% SEEDING') || html.includes('seeding'),
        has30sSummary: upper.includes('BẢN TÓM TẮT KHEN / CHÊ 30 GIÂY') || upper.includes('KHEN NHIỀU NHẤT'),
        hasRealPhotoGallery: upper.includes('THƯ VIỆN ẢNH CHỤP MỘC THỰC TẾ'),
        hasMasterBuyAction: Boolean(buyBtn),
        buyActionText: buyBtn ? buyBtn.innerText.trim() : null
      };
    });

    console.log('Mobile Review Modal Audit:', JSON.stringify(mobileAudit, null, 2));
    assert.ok(mobileAudit.modalFound, 'Review modal must exist in mobile DOM');
    assert.ok(mobileAudit.isVisible, 'Review modal must be visible on mobile');
    assert.ok(mobileAudit.hasTrustScore, 'Must display JayT Trust Score');
    assert.ok(mobileAudit.hasAntiSeedingAudit, 'Must display Anti-Seeding Audit');
    assert.ok(mobileAudit.has30sSummary, 'Must display 30s Pros/Cons summary');
    assert.ok(mobileAudit.hasRealPhotoGallery, 'Must display Real Photo Gallery');
    assert.ok(mobileAudit.hasMasterBuyAction, 'Must have Master Buy Action button');

    // Mobile Screenshot
    const mobileScreenshotPath = path.join(evidenceDir, 'j432_live_mobile_authentic_reviews.png');
    await mobilePage.screenshot({ path: mobileScreenshotPath, fullPage: false });
    console.log('Mobile screenshot saved to:', mobileScreenshotPath);

    // -------------------------------------------------------------
    // RUN 2: DESKTOP HD (1440x900) - VOUCHER SCANNER & REVIEWS DUAL FLOW
    // -------------------------------------------------------------
    console.log('\n[2/2] Testing Desktop HD (1440x900)...');
    const desktopPage = await browser.newPage();
    await desktopPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

    const desktopResp = await desktopPage.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 45000 });
    console.log('Desktop HTTP Status:', desktopResp.status());

    // Enter Ema pillow PDP URL into scanner
    await desktopPage.waitForSelector('#j401-voucher-input', { timeout: 15000 });
    await desktopPage.$eval('#j401-voucher-input', (el, val) => { el.value = val; }, testPdpUrl);

    // Trigger lookup
    await desktopPage.evaluate(() => {
      if (typeof handleVoucherLookup === 'function') {
        handleVoucherLookup();
      }
    });

    // Wait for voucher scanner modal
    await desktopPage.waitForSelector('#jayt-voucher-scanner-modal.is-open', { timeout: 15000 });
    await new Promise(r => setTimeout(r, 1200));

    // Screenshot of Master Winner Box in Desktop Scanner Modal
    const desktopMasterWinnerScreenshot = path.join(evidenceDir, 'j432_live_desktop_master_winner.png');
    await desktopPage.screenshot({ path: desktopMasterWinnerScreenshot, fullPage: false });
    console.log('Desktop Master Winner screenshot saved to:', desktopMasterWinnerScreenshot);

    // Click Authentic Reviews button from inside scanner modal via evaluate click
    await desktopPage.waitForSelector('.btn-open-reviews-from-radar', { timeout: 10000 });
    await desktopPage.evaluate(() => {
      const btn = document.querySelector('.btn-open-reviews-from-radar');
      if (btn) btn.click();
    });

    // Wait for Authentic Reviews Modal to be visible
    await desktopPage.waitForFunction(() => {
      const m = document.getElementById('jayt-authentic-reviews-modal');
      return m && m.style.display !== 'none';
    }, { timeout: 10000 });
    await new Promise(r => setTimeout(r, 1200));

    // Audit Desktop Review Modal
    const desktopAudit = await desktopPage.evaluate(() => {
      const modal = document.getElementById('jayt-authentic-reviews-modal');
      if (!modal) return { modalFound: false };

      const isVisible = modal.style.display !== 'none';
      const upper = (modal.innerText || '').toUpperCase();
      const html = modal.innerHTML || '';
      const buyBtn = modal.querySelector('.btn-review-modal-buy-action');

      return {
        modalFound: true,
        isVisible,
        hasTrustScore: upper.includes('⭐ 4.8'),
        hasAntiSeedingAudit: html.includes('1.420') && html.includes('310'),
        has30sProsCons: upper.includes('KHEN NHIỀU NHẤT') && upper.includes('NHƯỢC ĐIỂM THỰC TẾ'),
        hasRealPhotos: upper.includes('THƯ VIỆN ẢNH CHỤP MỘC THỰC TẾ'),
        hasMasterBuyAction: Boolean(buyBtn),
        buyActionText: buyBtn ? buyBtn.innerText.trim() : null
      };
    });

    console.log('Desktop Review Modal Audit:', JSON.stringify(desktopAudit, null, 2));
    assert.ok(desktopAudit.modalFound, 'Review modal must exist in desktop DOM');
    assert.ok(desktopAudit.isVisible, 'Review modal must be visible on desktop');
    assert.ok(desktopAudit.hasTrustScore, 'Must display JayT Trust Score 4.8');
    assert.ok(desktopAudit.hasAntiSeedingAudit, 'Must display anti-seeding numbers 1.420 / 310');
    assert.ok(desktopAudit.has30sProsCons, 'Must display 30s Pros/Cons summary');
    assert.ok(desktopAudit.hasRealPhotos, 'Must display Real Photo Gallery');
    assert.ok(desktopAudit.hasMasterBuyAction, 'Must have Master Buy Action button');

    // Screenshot of Authentic Reviews Modal on Desktop
    const desktopReviewScreenshot = path.join(evidenceDir, 'j432_live_desktop_authentic_reviews.png');
    await desktopPage.screenshot({ path: desktopReviewScreenshot, fullPage: false });
    console.log('Desktop Authentic Reviews screenshot saved to:', desktopReviewScreenshot);

    // -------------------------------------------------------------
    // GENERATE RUNTIME RECEIPT
    // -------------------------------------------------------------
    const receipt = {
      directive: 'CHAIRMAN_DIRECTIVE_20260918_AUTHENTIC_REVIEWS_AND_FULL_FEATURE1_GO_LIVE',
      task_id: 'JAYT-432',
      timestamp: new Date().toISOString(),
      canonical_url: targetUrl,
      mobile_verification: {
        viewport: '390x844',
        http_status: mobileResp.status(),
        audit: mobileAudit,
        screenshot: 'j432_live_mobile_authentic_reviews.png'
      },
      desktop_verification: {
        viewport: '1440x900',
        http_status: desktopResp.status(),
        audit: desktopAudit,
        screenshots: [
          'j432_live_desktop_master_winner.png',
          'j432_live_desktop_authentic_reviews.png'
        ]
      },
      verdict: 'FULL_FEATURE1_AUTHENTIC_REVIEWS_RATIFIED_PASS'
    };

    const receiptPath = path.join(evidenceDir, 'JAYT_432_AUTHENTIC_REVIEWS_RECEIPT.json');
    fs.writeFileSync(receiptPath, JSON.stringify(receipt, null, 2), 'utf8');
    console.log('\nReceipt saved to:', receiptPath);

    console.log('\n================================================================');
    console.log('JAYT-432 LIVE PUPPETEER VERIFICATION COMPLETED SUCCESSFULLY (ALL PASS)');
    console.log('================================================================\n');

  } catch (err) {
    console.error('Puppeteer verification failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
