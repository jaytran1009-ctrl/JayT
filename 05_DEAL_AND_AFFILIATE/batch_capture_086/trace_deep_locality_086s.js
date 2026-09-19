/**
 * JAYT DEEP LOCALITY CDP TRACER (086S)
 * Directive: JAYT-086S-EVIDENCE-GROUNDED-RESOLUTION-AND-RADAR-UI
 *
 * Captures official branch/locality & policy pages discovered from 086 batch
 * using real Puppeteer Chrome CDP.
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..', '..');
const outDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_086', 'deep_traces_086s');
fs.mkdirSync(outDir, { recursive: true });

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

const TRACE_TARGETS = [
  {
    id: 'metiz_about',
    brand: 'Metiz Cinema Đà Nẵng',
    url: 'https://metiz.vn/about.html',
    domain: 'metiz.vn'
  },
  {
    id: 'metiz_contact',
    brand: 'Metiz Cinema Đà Nẵng',
    url: 'https://metiz.vn/lien-he.html',
    domain: 'metiz.vn'
  }
];

async function main() {
  console.log('🚀 [TRACE-086S] Khởi chạy Deep Locality CDP Tracer...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--lang=vi-VN']
  });

  const manifest = [];

  for (const target of TRACE_TARGETS) {
    const targetDir = path.join(outDir, target.id);
    fs.mkdirSync(targetDir, { recursive: true });

    console.log(`📡 Tracing [${target.id}] ${target.url}...`);
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844 });
    await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1');

    try {
      const response = await page.goto(target.url, { waitUntil: 'networkidle2', timeout: 20000 });
      const status = response ? response.status() : 0;

      // Screenshot
      const pngPath = path.join(targetDir, 'screenshot.png');
      await page.screenshot({ path: pngPath, fullPage: true });
      const pngBuf = fs.readFileSync(pngPath);

      // HTML
      const htmlPath = path.join(targetDir, 'page.html');
      const html = await page.content();
      fs.writeFileSync(htmlPath, html, 'utf8');
      const htmlBuf = fs.readFileSync(htmlPath);

      // Text
      const txtPath = path.join(targetDir, 'page.txt');
      const text = await page.evaluate(() => document.body ? document.body.innerText : '');
      fs.writeFileSync(txtPath, text, 'utf8');
      const txtBuf = fs.readFileSync(txtPath);

      // Receipt
      const receipt = {
        trace_id: target.id,
        brand: target.brand,
        url: target.url,
        captured_at: new Date().toISOString(),
        capture_origin: 'REAL_BROWSER_CDP',
        http_status: status,
        artifacts: {
          png: { path: path.relative(repoRoot, pngPath).replace(/\\/g, '/'), sha256: sha256(pngBuf), size: pngBuf.length },
          html: { path: path.relative(repoRoot, htmlPath).replace(/\\/g, '/'), sha256: sha256(htmlBuf), size: htmlBuf.length },
          text: { path: path.relative(repoRoot, txtPath).replace(/\\/g, '/'), sha256: sha256(txtBuf), size: txtBuf.length }
        }
      };

      const receiptPath = path.join(targetDir, 'trace_receipt.json');
      fs.writeFileSync(receiptPath, JSON.stringify(receipt, null, 2), 'utf8');

      manifest.push(receipt);
      console.log(`   ✅ HTTP ${status} | PNG: ${pngBuf.length}B | TXT: ${txtBuf.length}B`);
    } catch (err) {
      console.error(`   ❌ Failed: ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();

  fs.writeFileSync(path.join(outDir, 'deep_trace_manifest_086s.json'), JSON.stringify(manifest, null, 2), 'utf8');
  console.log('🏁 [TRACE-086S] Hoàn tất deep trace.');
}

main().catch(err => {
  console.error('FATAL:', err.message);
  process.exit(1);
});
