const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const puppeteer = require('puppeteer');

const targets = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'batch_087_curated_targets.json'), 'utf8')
);

const outBaseDir = path.join(__dirname, 'captures_087');
if (!fs.existsSync(outBaseDir)) {
  fs.mkdirSync(outBaseDir, { recursive: true });
}

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

async function runBatch() {
  console.log(`🚀 [BATCH-CAPTURE-087] Bắt đầu quét CDP thật ${targets.length} sub-pages theo 5 nhóm ngành...`);

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--window-size=1280,800'
      ]
    });
  } catch (err) {
    console.error('Lỗi khởi chạy Chrome Puppeteer:', err);
    process.exit(1);
  }

  const manifest = {
    batch_id: 'BATCH_087_VERIFIED_SUPPLY_ACQUISITION',
    captured_at: new Date().toISOString(),
    collector: 'PUPPETEER_CHROME_CDP_ANONYMOUS',
    total_targets: targets.length,
    results: []
  };

  for (let i = 0; i < targets.length; i++) {
    const t = targets[i];
    const targetDir = path.join(outBaseDir, t.id);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    console.log(`\n[${i + 1}/${targets.length}] [${t.sector}] ${t.brand} -> ${t.url}`);
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');

    let httpStatus = 0;
    let finalUrl = t.url;
    let errorMessage = null;

    try {
      const response = await page.goto(t.url, {
        waitUntil: 'networkidle2',
        timeout: 25000
      });

      if (response) {
        httpStatus = response.status();
        finalUrl = response.url();
      }

      await new Promise(r => setTimeout(r, 2000));

      const screenshotBuf = await page.screenshot({ fullPage: false });
      const htmlContent = await page.content();
      const textContent = await page.evaluate(() => document.body ? document.body.innerText : '');

      const pngPath = path.join(targetDir, 'page.png');
      const htmlPath = path.join(targetDir, 'page.html');
      const txtPath = path.join(targetDir, 'page.txt');

      fs.writeFileSync(pngPath, screenshotBuf);
      fs.writeFileSync(htmlPath, htmlContent, 'utf8');
      fs.writeFileSync(txtPath, textContent, 'utf8');

      const pngHash = sha256(screenshotBuf);
      const htmlHash = sha256(Buffer.from(htmlContent, 'utf8'));
      const txtHash = sha256(Buffer.from(textContent, 'utf8'));

      const receipt = {
        target_id: t.id,
        brand: t.brand,
        sector: t.sector,
        domain: t.domain,
        requested_url: t.url,
        final_url: finalUrl,
        http_status: httpStatus,
        captured_at: new Date().toISOString(),
        provenance_method: 'PUPPETEER_CHROME_CDP_HEADLESS',
        files: {
          screenshot_png: { path: 'page.png', sha256: pngHash, size: screenshotBuf.length },
          raw_html: { path: 'page.html', sha256: htmlHash, size: Buffer.byteLength(htmlContent, 'utf8') },
          text_extract: { path: 'page.txt', sha256: txtHash, size: Buffer.byteLength(textContent, 'utf8') }
        }
      };

      fs.writeFileSync(path.join(targetDir, 'capture_receipt.json'), JSON.stringify(receipt, null, 2), 'utf8');
      console.log(`  -> HTTP ${httpStatus} | PNG: ${(screenshotBuf.length / 1024).toFixed(1)}KB | TXT: ${Buffer.byteLength(textContent, 'utf8')}B | SHA: ${txtHash.slice(0, 12)}...`);

      manifest.results.push({
        id: t.id,
        brand: t.brand,
        sector: t.sector,
        domain: t.domain,
        url: t.url,
        http_status: httpStatus,
        status: httpStatus === 200 ? 'SUCCESS' : httpStatus === 403 || httpStatus === 503 ? 'BLOCKED' : 'FAILED',
        receipt: receipt
      });
    } catch (err) {
      errorMessage = err.message;
      console.log(`  -> FAILED/TIMEOUT: ${err.message}`);

      const receipt = {
        target_id: t.id,
        brand: t.brand,
        sector: t.sector,
        domain: t.domain,
        requested_url: t.url,
        final_url: finalUrl,
        http_status: httpStatus,
        error: errorMessage,
        captured_at: new Date().toISOString(),
        provenance_method: 'PUPPETEER_CHROME_CDP_HEADLESS'
      };
      fs.writeFileSync(path.join(targetDir, 'capture_receipt.json'), JSON.stringify(receipt, null, 2), 'utf8');

      manifest.results.push({
        id: t.id,
        brand: t.brand,
        sector: t.sector,
        domain: t.domain,
        url: t.url,
        http_status: httpStatus,
        status: 'FAILED',
        error: errorMessage
      });
    } finally {
      await page.close();
    }
  }

  await browser.close();

  const manifestPath = path.join(outBaseDir, 'batch_manifest_087.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`\n🎉 [BATCH-COMPLETE] Đã hoàn tất quét 35 targets. Manifest lưu tại: ${manifestPath}`);
}

runBatch().catch(err => {
  console.error('Fatal batch error:', err);
  process.exit(1);
});
