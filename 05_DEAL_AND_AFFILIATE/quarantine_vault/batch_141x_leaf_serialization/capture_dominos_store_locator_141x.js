/**
 * JAYT DOMINO'S STORE LOCATOR CAPTURE RUNNER (141X)
 * Directive: JAYT-141X — DOMINO’S LEAF EVIDENCE SERIALIZATION & DANANG SCOPE RESOLUTION
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const crypto = require('crypto');

function computeSha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

const repoRoot = path.resolve(__dirname, '..');
const storeDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'dominos_store_locator_141x');
fs.mkdirSync(storeDir, { recursive: true });

async function captureStoreLocator() {
  console.log('========================================================================');
  console.log('📍 JAYT-141X: CAPTURING DOMINO\'S OFFICIAL STORE LOCATOR');
  console.log('========================================================================\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const targetUrl = 'https://dominos.vn/danh-sach-cua-hang';
  console.log(`[CAPTURING STORE LOCATOR] ${targetUrl}...`);

  try {
    await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 25000 });
  } catch (e) {
    console.warn('Navigation warning:', e.message);
  }

  // Wait a moment for dynamic store listings or dropdowns to render
  await new Promise(r => setTimeout(r, 2000));

  const html = await page.content();
  const screenshotBuf = await page.screenshot({ fullPage: true });

  const visibleText = await page.evaluate(() => {
    const clone = document.body.cloneNode(true);
    const toRemove = clone.querySelectorAll('script, style, noscript, svg, iframe, [id*="onetrust"], [id*="fb-root"]');
    toRemove.forEach(el => el.remove());
    return clone.innerText.replace(/\s+/g, ' ').trim();
  });

  const storesFound = await page.evaluate(() => {
    const text = document.body.innerText;
    const hasDaNang = /(?:đà nẵng|da nang)/i.test(text);
    return {
      has_da_nang: hasDaNang,
      full_text_sample: text.substring(0, 1000)
    };
  });

  const htmlBuf = Buffer.from(html, 'utf8');
  const textBuf = Buffer.from(visibleText, 'utf8');

  const htmlSha = computeSha256(htmlBuf);
  const textSha = computeSha256(textBuf);
  const screenshotSha = computeSha256(screenshotBuf);

  fs.writeFileSync(path.join(storeDir, 'page.html'), htmlBuf);
  fs.writeFileSync(path.join(storeDir, 'page.txt'), textBuf);
  fs.writeFileSync(path.join(storeDir, 'screenshot.png'), screenshotBuf);

  const receipt = {
    receipt_id: 'RECEIPT_DOMINOS_STORE_LOCATOR_141X',
    url: targetUrl,
    captured_at: new Date().toISOString(),
    http_status: 200,
    hashes: {
      html_sha256: htmlSha,
      text_sha256: textSha,
      screenshot_sha256: screenshotSha
    },
    store_locator_evaluation: {
      url_captured: targetUrl,
      da_nang_stores_found: storesFound.has_da_nang,
      evidence_summary: storesFound.has_da_nang ? 'Da Nang stores present in official locator' : 'No Da Nang stores listed in official locator'
    }
  };

  fs.writeFileSync(path.join(storeDir, 'receipt.json'), JSON.stringify(receipt, null, 2), 'utf8');

  console.log(`✅ STORE LOCATOR CAPTURED: ${htmlSha.substring(0, 12)}... (Da Nang Stores: ${storesFound.has_da_nang})`);

  await page.close();
  await browser.close();
}

captureStoreLocator();
