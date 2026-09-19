const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const puppeteer = require('puppeteer');

const repoRoot = path.resolve(__dirname, '..', '..');
const targets = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'selected_second_pass_targets_087b.json'), 'utf8')
);

const outBaseDir = path.join(__dirname, 'captures_087b');
if (!fs.existsSync(outBaseDir)) {
  fs.mkdirSync(outBaseDir, { recursive: true });
}

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

async function runSecondPass() {
  console.log(`🚀 [SECOND-PASS-CDP-087B] Bắt đầu quét Chrome CDP thật ${targets.length} second-pass targets...`);

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
    batch_id: 'BATCH_087B_SECOND_PASS',
    captured_at: new Date().toISOString(),
    collector: 'PUPPETEER_CHROME_CDP_ANONYMOUS',
    total_targets: targets.length,
    results: []
  };

  for (let i = 0; i < targets.length; i++) {
    const t = targets[i];
    const targetDir = path.join(outBaseDir, t.target_id);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    console.log(`\n[${i + 1}/${targets.length}] [${t.sector}] ${t.brand} -> ${t.resolved_url}`);
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');

    let httpStatus = 0;
    let finalUrl = t.resolved_url;
    let errorMessage = null;

    try {
      const response = await page.goto(t.resolved_url, {
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
        target_id: t.target_id,
        brand: t.brand,
        sector: t.sector,
        requested_url: t.resolved_url,
        final_url: finalUrl,
        http_status: httpStatus,
        captured_at: new Date().toISOString(),
        provenance_method: 'PUPPETEER_CHROME_CDP_HEADLESS',
        target_lineage: t.lineage,
        files: {
          screenshot_png: { path: 'page.png', sha256: pngHash, size: screenshotBuf.length },
          raw_html: { path: 'page.html', sha256: htmlHash, size: Buffer.byteLength(htmlContent, 'utf8') },
          text_extract: { path: 'page.txt', sha256: txtHash, size: Buffer.byteLength(textContent, 'utf8') }
        }
      };

      fs.writeFileSync(path.join(targetDir, 'capture_receipt.json'), JSON.stringify(receipt, null, 2), 'utf8');
      console.log(`  -> HTTP ${httpStatus} | PNG: ${(screenshotBuf.length / 1024).toFixed(1)}KB | TXT: ${Buffer.byteLength(textContent, 'utf8')}B | SHA: ${txtHash.slice(0, 12)}...`);

      manifest.results.push({
        target_id: t.target_id,
        brand: t.brand,
        sector: t.sector,
        requested_url: t.resolved_url,
        final_url: finalUrl,
        http_status: httpStatus,
        status: httpStatus === 200 ? 'SUCCESS' : httpStatus === 403 || httpStatus === 503 ? 'BLOCKED' : 'FAILED',
        target_lineage: t.lineage,
        receipt: receipt
      });
    } catch (err) {
      errorMessage = err.message;
      console.log(`  -> FAILED/TIMEOUT: ${err.message}`);

      const receipt = {
        target_id: t.target_id,
        brand: t.brand,
        sector: t.sector,
        requested_url: t.resolved_url,
        final_url: finalUrl,
        http_status: httpStatus,
        error: errorMessage,
        captured_at: new Date().toISOString(),
        provenance_method: 'PUPPETEER_CHROME_CDP_HEADLESS',
        target_lineage: t.lineage
      };
      fs.writeFileSync(path.join(targetDir, 'capture_receipt.json'), JSON.stringify(receipt, null, 2), 'utf8');

      manifest.results.push({
        target_id: t.target_id,
        brand: t.brand,
        sector: t.sector,
        requested_url: t.resolved_url,
        final_url: finalUrl,
        http_status: httpStatus,
        status: 'FAILED',
        error: errorMessage,
        target_lineage: t.lineage
      });
    } finally {
      await page.close();
    }
  }

  await browser.close();

  const manifestPath = path.join(outBaseDir, 'batch_manifest_087b.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`\n🎉 [SECOND-PASS-COMPLETE] Đã hoàn tất quét 26 second-pass targets. Manifest lưu tại: ${manifestPath}`);
}

runSecondPass().catch(err => {
  console.error('Fatal second-pass error:', err);
  process.exit(1);
});
