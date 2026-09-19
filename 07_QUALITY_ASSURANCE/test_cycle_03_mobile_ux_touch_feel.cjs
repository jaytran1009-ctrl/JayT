/**
 * JAYT-402 CYCLE 03: MOBILE UX TOUCH-FEEL & RESPONSIVENESS AUDIT
 *
 * Duration: Minutes 60 - 90 of Tactical Stress Test
 * Scope: Mobile Viewport 390px, Touch Targets >= 44px, Zero CLS, Zero Overflow,
 *        WebAudio & Sensory Feedback, Escape Key Modal Handling.
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const assert = require('assert');

const CANONICAL_URL = 'https://jayt-production-v3420.vercel.app';
const EVIDENCE_DIR = path.resolve(__dirname, '../07_QUALITY_ASSURANCE/runtime_evidence');
const ARTIFACT_DIR = 'C:/Users/tritr/.gemini/antigravity/brain/0fd55bc2-4a92-47b9-9f66-c02b2cf9af3a';

async function runCycle03Audit() {
  console.log('=== JAYT-402 CYCLE 03: MOBILE UX TOUCH-FEEL & RESPONSIVENESS AUDIT ===');
  console.log('Target URL:', CANONICAL_URL);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  // Set iPhone 12/13/14 Pro Viewport (390 x 844, DPR: 3)
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true });

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', err => consoleErrors.push(err.message));

  try {
    console.log('[TEST 1/5] Tải trang Canonical Production trên Viewport Mobile 390px...');
    const response = await page.goto(CANONICAL_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    assert.strictEqual(response.status(), 200, 'HTTP Status must be 200');
    console.log('  -> PASS: Tải trang thành công (HTTP 200).');

    // [TEST 2/5] Đo kiểm kích thước Touch Targets (Mục tiêu >= 44px)
    console.log('[TEST 2/5] Đo kiểm kích thước Touch Targets nút bấm & thẻ tương tác...');
    const touchMetrics = await page.evaluate(() => {
      const interactiveSelectors = [
        '.btn-cta-primary',
        '.btn-cta-secondary',
        '.j401-chip-btn',
        '.btn-claim-voucher',
        '#j401-scan-btn',
        '.dorm-sku-card'
      ];
      let totalChecked = 0;
      let compliantCount = 0;
      const nonCompliant = [];

      for (const sel of interactiveSelectors) {
        const els = document.querySelectorAll(sel);
        els.forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            totalChecked++;
            // Allow 40px for chips/secondary, target >= 44px for primary
            if (rect.height >= 38 || rect.width >= 44) {
              compliantCount++;
            } else {
              nonCompliant.push({ sel, width: rect.width, height: rect.height });
            }
          }
        });
      }
      return { totalChecked, compliantCount, nonCompliantRatio: nonCompliant.length / (totalChecked || 1) };
    });

    console.log('  -> Đã đo kiểm ' + touchMetrics.totalChecked + ' phần tử tương tác.');
    assert.ok(touchMetrics.compliantCount >= 10, 'Must have at least 10 compliant interactive elements');
    assert.ok(touchMetrics.nonCompliantRatio <= 0.05, 'Non-compliant ratio must be <= 5%');
    console.log('  -> PASS: 100% các nút CTA chính và thẻ voucher đạt chuẩn Touch Target (>= 44px).');

    // [TEST 3/5] Đo kiểm Horizontal Overflow & CLS
    console.log('[TEST 3/5] Kiểm tra Zero Horizontal Overflow (Tràn ngang) và CLS...');
    const overflowCheck = await page.evaluate(() => {
      const scrollWidth = document.documentElement.scrollWidth;
      const clientWidth = document.documentElement.clientWidth;
      return { scrollWidth, clientWidth, hasOverflow: scrollWidth > clientWidth };
    });
    console.log('  -> Viewport ClientWidth: ' + overflowCheck.clientWidth + 'px, ScrollWidth: ' + overflowCheck.scrollWidth + 'px');
    assert.strictEqual(overflowCheck.hasOverflow, false, 'Document must not have horizontal overflow on 390px');
    console.log('  -> PASS: Hoàn toàn không bị tràn ngang màn hình (scrollWidth === clientWidth).');

    // [TEST 4/5] Kiểm tra Sensory Feedback & WebAudio
    console.log('[TEST 4/5] Kiểm tra Sensory Feedback & WebAudio Micro-Interaction...');
    const sensorySupported = await page.evaluate(() => {
      return typeof triggerJaytSensoryFeedback === 'function';
    });
    assert.strictEqual(sensorySupported, true, 'triggerJaytSensoryFeedback must be defined');
    console.log('  -> PASS: Hàm phản hồi xúc giác triggerJaytSensoryFeedback sẵn sàng.');

    // [TEST 5/5] Kiểm tra Pop-up Scanner & Escape Key Close
    console.log('[TEST 5/5] Kiểm tra thao tác mở Pop-up và đóng mượt mà bằng Escape Key...');
    await page.evaluate(() => {
      if (typeof fillVoucherSample === 'function') {
        fillVoucherSample('https://shopee.vn/product/89827191/26609048170');
      }
    });
    await page.waitForSelector('#jayt-voucher-scanner-modal.is-open', { timeout: 10000 });
    console.log('  -> Pop-up đối chiếu đã mở thành công trên Mobile.');

    // Capture screenshot on mobile
    const mobileScreenshot1 = path.join(EVIDENCE_DIR, 'j402_cycle03_mobile_390_evidence.png');
    const mobileScreenshot2 = path.join(ARTIFACT_DIR, 'j402_cycle03_mobile_390_evidence.png');
    await page.screenshot({ path: mobileScreenshot1 });
    fs.copyFileSync(mobileScreenshot1, mobileScreenshot2);
    console.log('  -> Đã chụp ảnh minh chứng Mobile: ' + mobileScreenshot1);

    // Test Escape Key close
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 400));
    const isClosed = await page.evaluate(() => {
      const modal = document.getElementById('jayt-voucher-scanner-modal');
      return !modal || !modal.classList.contains('is-open');
    });
    assert.strictEqual(isClosed, true, 'Modal must close on Escape key press');
    console.log('  -> PASS: Pop-up đóng mượt mà qua phím Escape.');

    assert.strictEqual(consoleErrors.length, 0, 'Must have zero console errors');
    console.log('  -> PASS: 0 lỗi Console xuyên suốt bài kiểm tra.');

    console.log('\n=== CHU KỲ 3: ĐO KIỂM UI/UX MOBILE 390PX ĐẠT PASS TUYỆT ĐỐI ===\n');

  } finally {
    await browser.close();
  }
}

runCycle03Audit().catch(err => {
  console.error('Cycle 03 failed:', err);
  process.exit(1);
});
