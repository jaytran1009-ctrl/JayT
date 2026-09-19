/**
 * JAYT-424: Live Puppeteer Verification for JayT Price Chrono-Radar 90-Day Tracker
 * Directive: CHAIRMAN_DIRECTIVE_20260918_PRICE_HISTORY_TRACKER_AND_DANANG_GO_LIVE
 * Authority: CEO CODEX & ANTIGRAVITY ENGINEERING
 */

'use strict';

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const assert = require('assert');

(async () => {
  const targetUrl = process.env.TEST_URL || 'https://jayt-production-v3420.vercel.app/';
  console.log('=== JAYT-424 LIVE PUPPETEER VERIFICATION ===');
  console.log('Target URL:', targetUrl);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', err => errors.push(err.message));

    const response = await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    console.log('HTTP Status:', response.status());

    // 1. Verify Global Functions on Window
    const globalCheck = await page.evaluate(() => {
      return {
        hasComputeChrono: typeof window.computePriceChronoHistory === 'function',
        hasRenderChrono: typeof window.renderPriceChronoRadarHtml === 'function',
        hasOpenVoucherModal: typeof window.openVoucherScannerModal === 'function',
        hasCrossPlatformRadar: typeof window.computeCrossPlatformRadar === 'function',
        hasAdvisoryEngine: typeof window.renderBuyingAdvisoryEngineHtml === 'function'
      };
    });
    console.log('Global functions check:', globalCheck);
    assert.strictEqual(globalCheck.hasComputeChrono, true, 'computePriceChronoHistory missing');
    assert.strictEqual(globalCheck.hasRenderChrono, true, 'renderPriceChronoRadarHtml missing');

    // 2. Open Modal with a real product link
    const modalAudit = await page.evaluate(() => {
      const parsed = window.resolveHeadlessProductLink('https://shopee.vn/product/123456/789012');
      const radar = window.computeCrossPlatformRadar(parsed, 135000);
      window.openVoucherScannerModal(radar, parsed, window.__lastInitialStack, 135000, 16000);

      const modal = document.getElementById('jayt-voucher-scanner-modal');
      const chronoEl = modal ? modal.querySelector('.jayt-price-chrono-radar') : null;
      const sparklineSvg = chronoEl ? chronoEl.querySelector('svg') : null;

      return {
        modalOpened: !!modal,
        hasChronoRadar: !!chronoEl,
        chronoText: chronoEl ? chronoEl.innerText : '',
        hasSparklineSvg: !!sparklineSvg,
        hasCircles: sparklineSvg ? sparklineSvg.querySelectorAll('circle').length : 0,
        hasGradient: sparklineSvg ? sparklineSvg.querySelectorAll('linearGradient').length : 0,
        hasMaxPrice: chronoEl ? chronoEl.innerText.includes('Giá Cao Nhất 90 Ngày') : false,
        hasAvgPrice: chronoEl ? chronoEl.innerText.includes('Giá Trung Bình 90 Ngày') : false,
        hasAllTimeLow: chronoEl ? chronoEl.innerText.includes('Giá Đáy Lịch Sử Sau Voucher') : false,
        hasTrapBadge: chronoEl ? (chronoEl.innerText.includes('ĐÁY THỰC TẾ') || chronoEl.innerText.includes('GIÁ BÌNH ỔN') || chronoEl.innerText.includes('CẢNH BÁO')) : false
      };
    });

    console.log('Modal audit result:', modalAudit);
    assert.strictEqual(modalAudit.modalOpened, true, 'Modal should open');
    assert.strictEqual(modalAudit.hasChronoRadar, true, 'Chrono-Radar element must be present in modal');
    assert.strictEqual(modalAudit.hasSparklineSvg, true, 'Sparkline SVG must be present');
    assert.ok(modalAudit.hasCircles >= 7, 'Must have at least 7 circle checkpoints');
    assert.strictEqual(modalAudit.hasMaxPrice, true, 'Must display Max Price 90 Days');
    assert.strictEqual(modalAudit.hasAvgPrice, true, 'Must display Avg Price 90 Days');
    assert.strictEqual(modalAudit.hasAllTimeLow, true, 'Must display All-Time Low');
    assert.strictEqual(modalAudit.hasTrapBadge, true, 'Must display Price Trap Badge');

    // Capture screenshot of the Modal with Chrono-Radar
    const modalShotPath = path.resolve(__dirname, 'runtime_evidence', 'j424_live_chrono_radar_modal.png');
    await page.screenshot({ path: modalShotPath });
    console.log('Captured modal screenshot:', modalShotPath);

    // Scroll inside modal to capture Buying Advisory + Sparkline in full detail
    await page.evaluate(() => {
      const modal = document.getElementById('jayt-voucher-scanner-modal');
      if (modal) {
        const dialog = modal.querySelector('div[style*=\"overflow-y\"]') || modal;
        dialog.scrollTop = 250;
      }
    });

    const advisoryShotPath = path.resolve(__dirname, 'runtime_evidence', 'j424_live_sparkline_advisory.png');
    await page.screenshot({ path: advisoryShotPath });
    console.log('Captured advisory scroll screenshot:', advisoryShotPath);

    // Write Receipt JSON
    const receipt = {
      test_run_id: 'JAYT_424_CHRONO_RADAR_RECEIPT',
      directive: 'CHAIRMAN_DIRECTIVE_20260918_PRICE_HISTORY_TRACKER_AND_DANANG_GO_LIVE',
      timestamp: new Date().toISOString(),
      canonical_url: targetUrl,
      http_status: response.status(),
      audit: modalAudit,
      verdict: 'JAYT_424_PRICE_CHRONO_RADAR_90_DAY_VERIFIED_PASS',
      screenshots: [
        '07_QUALITY_ASSURANCE/runtime_evidence/j424_live_chrono_radar_modal.png',
        '07_QUALITY_ASSURANCE/runtime_evidence/j424_live_sparkline_advisory.png'
      ]
    };

    const receiptPath = path.resolve(__dirname, 'runtime_evidence', 'JAYT_424_CHRONO_RADAR_RECEIPT.json');
    fs.writeFileSync(receiptPath, JSON.stringify(receipt, null, 2), 'utf8');
    console.log('Successfully written receipt:', receiptPath);
    console.log('=== ALL J424 LIVE CHECKS PASSED SUCCESSFULLY ===');

  } finally {
    await browser.close();
  }
})();
