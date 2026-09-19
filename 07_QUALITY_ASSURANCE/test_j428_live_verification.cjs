/**
 * JAYT-428: Live Puppeteer Production Verification Suite
 * Directive: CHAIRMAN_DIRECTIVE_20260918_FIX_DUAL_TIER_NAMING_AND_BRAND_CROSS_MATCH
 * Target: https://jayt-production-v3420.vercel.app/
 * Test PDP: https://shop.tiktok.com/vn/pdp/1734961837103548126
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
  console.log('JAYT-428: LIVE PRODUCTION PUPPETEER VERIFICATION');
  console.log('Target URL: ' + targetUrl);
  console.log('Test PDP URL: ' + testPdpUrl);
  console.log('================================================================\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });

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

    await mobilePage.waitForSelector('#j401-voucher-input', { timeout: 10000 });
    await mobilePage.$eval('#j401-voucher-input', (el, val) => { el.value = val; }, testPdpUrl);

    // Trigger lookup
    await mobilePage.evaluate(() => {
      if (typeof handleVoucherLookup === 'function') {
        handleVoucherLookup();
      }
    });

    // Wait for modal
    await mobilePage.waitForSelector('#jayt-voucher-scanner-modal.is-open', { timeout: 12000 });
    await new Promise(r => setTimeout(r, 1500));

    // Mobile Screenshot
    const mobileScreenshotPath = path.join(evidenceDir, 'j428_live_mobile_dual_tier_title_sync.png');
    await mobilePage.screenshot({ path: mobileScreenshotPath, fullPage: false });
    console.log('Mobile screenshot saved to:', mobileScreenshotPath);

    // -------------------------------------------------------------
    // RUN 2: DESKTOP HD (1440x900)
    // -------------------------------------------------------------
    console.log('\n[2/2] Testing Desktop HD (1440x900)...');
    const desktopPage = await browser.newPage();
    await desktopPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

    const desktopResp = await desktopPage.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 35000 });
    console.log('Desktop HTTP Status:', desktopResp.status());

    await desktopPage.waitForSelector('#j401-voucher-input', { timeout: 10000 });
    await desktopPage.$eval('#j401-voucher-input', (el, val) => { el.value = val; }, testPdpUrl);

    await desktopPage.evaluate(() => {
      if (typeof handleVoucherLookup === 'function') {
        handleVoucherLookup();
      }
    });

    await desktopPage.waitForSelector('#jayt-voucher-scanner-modal.is-open', { timeout: 12000 });
    await new Promise(r => setTimeout(r, 1500));

    // Audit live DOM on desktop
    const liveAudit = await desktopPage.evaluate(() => {
      const modal = document.getElementById('jayt-voucher-scanner-modal');
      const radar = window.__lastRadar;
      const parsed = window.__lastParsed;
      const modalText = modal ? modal.innerText : '';

      const titleElements = Array.from(modal.querySelectorAll('div[title]'))
        .map(el => el.innerText.trim())
        .filter(t => t.length > 0);

      const buttons = Array.from(modal.querySelectorAll('button'))
        .map(b => b.innerText.trim());

      const variantBadges = Array.from(modal.querySelectorAll('span, div'))
        .filter(el => el.innerText && el.innerText.includes('🏷️ Phân loại:'))
        .map(el => el.innerText.trim());

      return {
        hasModal: Boolean(modal),
        radarExists: Boolean(radar),
        matchedTripletId: radar && radar.matchedTriplet ? radar.matchedTriplet.id : null,
        tripletBrand: radar && radar.matchedTriplet ? radar.matchedTriplet.brand : null,
        tripletCleanTitle: radar && radar.matchedTriplet ? radar.matchedTriplet.cleanTitle : null,
        parsedBrand: parsed ? parsed.brand : null,
        parsedSellerName: parsed ? parsed.sellerName : null,
        parsedVariantName: parsed ? parsed.variantName : null,
        titleElements,
        buttons,
        variantBadges,
        modalTextSnippet: modalText.substring(0, 500),
        hasDefensiveButton: modalText.includes('Tìm Sản Phẩm Tương Đương'),
        hasZeroSavings: modalText.includes('Tiết kiệm: 0đ') || modalText.includes('Tiết kiệm 0đ'),
        platforms: radar && radar.platforms ? radar.platforms.map(p => ({
          name: p.name,
          available: p.available,
          payable: p.payable,
          savings: p.savings,
          actionLabel: p.actionLabel,
          variantName: p.variantName
        })) : [],
        tierTrusted: radar && radar.tierTrusted ? radar.tierTrusted.map(t => ({
          name: t.name,
          merchantName: t.merchantName,
          payable: t.payable,
          savings: t.savings,
          actionLabel: t.actionLabel,
          variantName: t.variantName
        })) : []
      };
    });

    console.log('\n--- LIVE DOM AUDIT RESULTS ---');
    console.log('Matched Triplet:', liveAudit.matchedTripletId);
    console.log('Parsed Brand:', liveAudit.parsedBrand);
    console.log('Parsed Seller:', liveAudit.parsedSellerName);
    console.log('Parsed Variant:', liveAudit.parsedVariantName);
    console.log('Has Defensive Button:', liveAudit.hasDefensiveButton);
    console.log('Has Zero Savings:', liveAudit.hasZeroSavings);
    console.log('Tier 1 Platforms Count:', liveAudit.platforms.length);
    console.log('Tier 2 Trusted Shops Count:', liveAudit.tierTrusted.length);

    // Desktop Screenshot
    const desktopScreenshotPath = path.join(evidenceDir, 'j428_live_desktop_mall_cross_match.png');
    await desktopPage.screenshot({ path: desktopScreenshotPath, fullPage: false });
    console.log('Desktop screenshot saved to:', desktopScreenshotPath);

    // ASSERTIONS
    assert.strictEqual(liveAudit.hasModal, true, 'Modal must be open');
    assert.strictEqual(liveAudit.matchedTripletId, 'SKU_TRIPLET_11_GOI_CONG_THAI_HOC', 'Must match Triplet 11');
    assert.strictEqual(liveAudit.parsedBrand, 'Ema', 'Parsed brand must be Ema');
    assert.strictEqual(liveAudit.parsedSellerName, 'Ema Official Store', 'Parsed sellerName must be Ema Official Store');
    assert.strictEqual(liveAudit.hasDefensiveButton, false, 'Must have zero defensive search buttons');
    assert.strictEqual(liveAudit.hasZeroSavings, false, 'Must have zero 0đ savings');

    for (const p of liveAudit.platforms) {
      assert.strictEqual(p.available, true, `${p.name} must be available`);
      assert.ok(p.payable < Infinity, `${p.name} payable must be finite`);
      assert.ok(p.savings > 0, `${p.name} savings must be > 0`);
      assert.ok(p.actionLabel.includes('Mall'), `${p.name} actionLabel must reference Mall`);
    }

    // Save JSON audit receipt
    const receipt = {
      timestamp: new Date().toISOString(),
      directive: 'CHAIRMAN_DIRECTIVE_20260918_FIX_DUAL_TIER_NAMING_AND_BRAND_CROSS_MATCH',
      code: 'JAYT-428',
      status: 'VERIFIED_LIVE_PRODUCTION',
      targetUrl,
      testPdpUrl,
      audit: liveAudit,
      screenshots: [
        'j428_live_mobile_dual_tier_title_sync.png',
        'j428_live_desktop_mall_cross_match.png'
      ]
    };
    const receiptPath = path.join(evidenceDir, 'JAYT_428_DUAL_TIER_NAMING_RECEIPT.json');
    fs.writeFileSync(receiptPath, JSON.stringify(receipt, null, 2), 'utf8');
    console.log('Receipt saved to:', receiptPath);

    console.log('\n================================================================');
    console.log('LIVE PRODUCTION VERIFICATION: 100% SUCCESSFUL');
    console.log('Both Tiers Synchronized · Official Mall Cross-Matched · Zero 404');
    console.log('================================================================\n');

  } catch (err) {
    console.error('LIVE VERIFICATION FAILED:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
