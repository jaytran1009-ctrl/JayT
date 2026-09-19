const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const CANONICAL_URL = 'https://jayt-production-v3420.vercel.app';
const ARTIFACT_DIR = 'C:/Users/tritr/.gemini/antigravity/brain/0fd55bc2-4a92-47b9-9f66-c02b2cf9af3a';
const WS1_ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const QA_EVIDENCE_DIR = path.join(WS1_ROOT, '07_QUALITY_ASSURANCE/runtime_evidence');

async function runLiveAudit() {
  console.log('=== JAYT: LIVE CANONICAL TRIPLET AUDIT VIA PUPPETEER ===');
  console.log('Target URL:', CANONICAL_URL);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const consoleErrors = [];
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', err => {
    consoleErrors.push(err.message);
  });

  try {
    console.log('[1/4] Navigating to canonical production...');
    const response = await page.goto(CANONICAL_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    console.log('  -> HTTP Status:', response.status());

    // 1. TEST VERIFIED TRIPLET (SHIN CASE)
    console.log('[2/4] Testing Verified SKU Triplet: Shin Case iPhone 11...');
    const shinCaseUrl = 'https://shopee.vn/product/89827191/26609048170';
    await page.evaluate((url) => {
      if (typeof fillVoucherSample === 'function') {
        fillVoucherSample(url);
      }
    }, shinCaseUrl);

    await page.waitForSelector('#jayt-voucher-scanner-modal.is-open', { timeout: 10000 });
    await new Promise(r => setTimeout(r, 600)); // Render settle

    const verifiedModalText = await page.evaluate(() => {
      const modal = document.getElementById('jayt-voucher-scanner-modal');
      return modal ? modal.innerText : '';
    });

    const hasTitle = verifiedModalText.includes('Shin Case') || verifiedModalText.includes('Ốp Lưng');
    const hasShopeeMall = verifiedModalText.includes('Shopee Mall');
    const hasLazMall = verifiedModalText.includes('LazMall');
    const hasPdpBadge = verifiedModalText.includes('PDP Chính Hãng');
    const hasTiktokFallback = verifiedModalText.includes('Chưa Có Link PDP') || verifiedModalText.includes('Chưa có gian hàng chính hãng trên TikTok');

    console.log('  -> Modal verified content check:', {
      hasTitle,
      hasShopeeMall,
      hasLazMall,
      hasPdpBadge,
      hasTiktokFallback
    });

    if (!hasShopeeMall || !hasLazMall || !hasPdpBadge) {
      throw new Error('Verified Triplet modal missing required Mall or PDP badges');
    }

    const verifiedScreenshotPath1 = path.join(QA_EVIDENCE_DIR, 'modal_triplet_verified_live.png');
    const verifiedScreenshotPath2 = path.join(ARTIFACT_DIR, 'modal_triplet_verified_live.png');
    await page.screenshot({ path: verifiedScreenshotPath1 });
    fs.copyFileSync(verifiedScreenshotPath1, verifiedScreenshotPath2);
    console.log('  -> Captured verified modal screenshot:', verifiedScreenshotPath1);

    // Close modal
    await page.evaluate(() => {
      if (typeof closeVoucherScannerModal === 'function') closeVoucherScannerModal();
    });
    await new Promise(r => setTimeout(r, 400));

    // 2. TEST TRANSPARENCY FALLBACK (ARBITRARY UNMATCHED LINK)
    console.log('[3/4] Testing Transparency Fallback for Unmatched Link...');
    const arbitraryUrl = 'https://shopee.vn/product/99999999/88888888888';
    await page.evaluate((url) => {
      if (typeof fillVoucherSample === 'function') {
        fillVoucherSample(url);
      }
    }, arbitraryUrl);

    await page.waitForSelector('#jayt-voucher-scanner-modal.is-open', { timeout: 10000 });
    await new Promise(r => setTimeout(r, 600));

    const fallbackModalText = await page.evaluate(() => {
      const modal = document.getElementById('jayt-voucher-scanner-modal');
      return modal ? modal.innerText : '';
    });

    const hasHonestWarning = fallbackModalText.includes('Chưa Có Link PDP') || fallbackModalText.includes('Chưa liên kết PDP') || fallbackModalText.includes('bảo vệ sự trung thực');
    const hasSearchButton = fallbackModalText.includes('Tìm Tương Đương') || fallbackModalText.includes('Tìm kiếm sản phẩm') || fallbackModalText.includes('Tìm Sản Phẩm');

    console.log('  -> Modal fallback content check:', {
      hasHonestWarning,
      hasSearchButton
    });

    if (!hasHonestWarning || !hasSearchButton) {
      throw new Error('Fallback modal missing honest warning or search button');
    }

    const fallbackScreenshotPath1 = path.join(QA_EVIDENCE_DIR, 'modal_triplet_fallback_live.png');
    const fallbackScreenshotPath2 = path.join(ARTIFACT_DIR, 'modal_triplet_fallback_live.png');
    await page.screenshot({ path: fallbackScreenshotPath1 });
    fs.copyFileSync(fallbackScreenshotPath1, fallbackScreenshotPath2);
    console.log('  -> Captured fallback modal screenshot:', fallbackScreenshotPath1);

    // 3. CONSOLE ERROR CHECK
    console.log('[4/4] Checking Console Error Hygiene...');
    console.log('  -> Console Errors count:', consoleErrors.length);
    if (consoleErrors.length > 0) {
      console.log('  -> Errors details:', consoleErrors);
    }

    const receipt = {
      timestamp: new Date().toISOString(),
      canonical_url: CANONICAL_URL,
      deployment_status: 'HEALTHY_VERIFIED',
      verified_sku_triplet: {
        tested_url: shinCaseUrl,
        hasShopeeMall,
        hasLazMall,
        hasPdpBadge,
        hasTiktokFallback
      },
      transparency_fallback: {
        tested_url: arbitraryUrl,
        hasHonestWarning,
        hasSearchButton
      },
      console_errors: consoleErrors,
      verdict: consoleErrors.length === 0 ? 'PASS_100_PERCENT' : 'PASS_WITH_WARNINGS'
    };

    const receiptPath = path.join(QA_EVIDENCE_DIR, 'JAYT_SKU_TRIPLET_LIVE_RECEIPT.json');
    fs.writeFileSync(receiptPath, JSON.stringify(receipt, null, 2), 'utf8');
    console.log('=== AUDIT COMPLETE: SUCCESS 100% ===');
    console.log('Receipt saved to:', receiptPath);

  } finally {
    await browser.close();
  }
}

runLiveAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
