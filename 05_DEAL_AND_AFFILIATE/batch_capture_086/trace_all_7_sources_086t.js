/**
 * JAYT COMPREHENSIVE DEEP CDP TRACER (086T)
 * Directive: JAYT-086T-COMPLETE-RESOLUTION-AND-REAL-RADAR
 *
 * Deep-traces official branch, locality, and promo detail pages for:
 * 1. BHD Star: https://www.bhdstar.vn/he-thong-rap/ (independent proof of cinema network)
 * 2. Lotte Cinema: https://www.lottecinemavn.com/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=3&cinemaID=8017 (Da Nang branch)
 * 3. MoMo: https://www.momo.vn/tin-tuc/khuyen-mai/ban-moi-nhap-ma-chonmomo-co-qua-500000d-giam-8225 (promo detail)
 * 4. ZaloPay: https://zalopay.vn/khuyen-mai (promo list)
 * 5. KFC: https://kfcvietnam.com.vn/ (official home)
 * 6. Phúc Long: https://phuclong.com.vn/ (official home)
 * 7. Phê La: https://phela.vn/he-thong-cua-hang/ (store network)
 * 8. ShopeeFood: https://shopeefood.vn/ (official home)
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..', '..');
const outDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_086', 'deep_traces_086t');
fs.mkdirSync(outDir, { recursive: true });

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

const TRACE_TARGETS = [
  {
    id: 'bhd_cinema_network',
    brand: 'BHD Star Cineplex',
    url: 'https://www.bhdstar.vn/he-thong-rap/',
    domain: 'bhdstar.vn',
    purpose: 'Prove independent cinema network locations and lack of Da Nang branch'
  },
  {
    id: 'lotte_danang_branch',
    brand: 'Lotte Cinema Vietnam',
    url: 'https://www.lottecinemavn.com/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=3&cinemaID=8017',
    domain: 'lottecinemavn.com',
    purpose: 'Capture Lotte Cinema Da Nang branch locality and theater info'
  },
  {
    id: 'momo_promo_detail',
    brand: 'Ví MoMo',
    url: 'https://www.momo.vn/tin-tuc/khuyen-mai/ban-moi-nhap-ma-chonmomo-co-qua-500000d-giam-8225',
    domain: 'momo.vn',
    purpose: 'Capture MoMo new user promo terms and in-app requirements'
  },
  {
    id: 'zalopay_promo_list',
    brand: 'Ví ZaloPay',
    url: 'https://zalopay.vn/khuyen-mai',
    domain: 'zalopay.vn',
    purpose: 'Capture ZaloPay promo directory and countdown timers'
  },
  {
    id: 'kfc_official_home',
    brand: 'KFC Vietnam',
    url: 'https://kfcvietnam.com.vn/',
    domain: 'kfcvietnam.com.vn',
    purpose: 'Capture KFC official homepage structure'
  },
  {
    id: 'phuclong_official_home',
    brand: 'Phúc Long Coffee & Tea',
    url: 'https://phuclong.com.vn/',
    domain: 'phuclong.com.vn',
    purpose: 'Capture Phuc Long official homepage structure'
  },
  {
    id: 'phela_store_network',
    brand: 'Phê La',
    url: 'https://phela.vn/he-thong-cua-hang/',
    domain: 'phela.vn',
    purpose: 'Capture Phe La store network locations'
  },
  {
    id: 'shopeefood_official_home',
    brand: 'ShopeeFood Vietnam',
    url: 'https://shopeefood.vn/',
    domain: 'shopeefood.vn',
    purpose: 'Capture ShopeeFood official homepage structure'
  }
];

async function main() {
  console.log('🚀 [TRACE-086T] Khởi chạy Comprehensive Deep CDP Tracer cho 8 mục tiêu...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--lang=vi-VN']
  });

  const manifest = [];

  for (let i = 0; i < TRACE_TARGETS.length; i++) {
    const target = TRACE_TARGETS[i];
    const targetDir = path.join(outDir, target.id);
    fs.mkdirSync(targetDir, { recursive: true });

    console.log(`[${i + 1}/${TRACE_TARGETS.length}] 📡 Tracing [${target.id}] ${target.url}...`);
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844 });
    await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1');

    try {
      const response = await page.goto(target.url, { waitUntil: 'networkidle2', timeout: 25000 });
      const status = response ? response.status() : 0;

      // Wait a moment for dynamic rendering
      await new Promise(r => setTimeout(r, 1500));

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
        domain: target.domain,
        purpose: target.purpose,
        captured_at: new Date().toISOString(),
        capture_origin: 'REAL_BROWSER_CDP',
        capture_method: 'puppeteer_cdp_headless',
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
      manifest.push({
        trace_id: target.id,
        brand: target.brand,
        url: target.url,
        domain: target.domain,
        error: err.message,
        captured_at: new Date().toISOString()
      });
    } finally {
      await page.close();
    }
  }

  await browser.close();

  const manifestPath = path.join(outDir, 'deep_trace_manifest_086t.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`\n🏁 [TRACE-086T] Hoàn tất deep trace. Manifest: ${manifestPath}`);
}

main().catch(err => {
  console.error('FATAL:', err.message);
  process.exit(1);
});
