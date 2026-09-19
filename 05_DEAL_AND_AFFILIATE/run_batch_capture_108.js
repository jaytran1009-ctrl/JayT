/**
 * JAYT BATCH CAPTURE RUNNER 108
 * Directive: JAYT-108R-SUPPLY-TRUTH-AND-CANONICALIZATION
 * Captures real HTTP/browser evidence from 32 discovery seed URLs.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const puppeteer = require('puppeteer');

const repoRoot = path.resolve(__dirname, '..');
const outputBaseDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_108', 'captures_108');

fs.mkdirSync(outputBaseDir, { recursive: true });

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

const SEED_TARGETS = [
  { id: 'TARGET_108_01_JOLLIBEE', brand: 'Jollibee Vietnam', category: 'LUNCH', url: 'https://jollibee.com.vn/' },
  { id: 'TARGET_108_02_LOTTERIA', brand: 'Lotteria Vietnam', category: 'LUNCH', url: 'https://www.lotteria.vn/' },
  { id: 'TARGET_108_03_KFC', brand: 'KFC Vietnam', category: 'LUNCH', url: 'https://www.kfcvietnam.com.vn/' },
  { id: 'TARGET_108_04_KICHI', brand: 'Kichi-Kichi', category: 'LUNCH', url: 'https://kichi.com.vn/' },
  { id: 'TARGET_108_05_GOGI', brand: 'Gogi House', category: 'LUNCH', url: 'https://gogi.com.vn/' },
  { id: 'TARGET_108_06_COM_NIEU_NHA_DO', brand: 'Cơm Niêu Nhà Đỏ', category: 'LUNCH', url: 'https://comnieunhado.com/' },
  { id: 'TARGET_108_07_PHELA', brand: 'Phê La', category: 'COFFEE_TEA', url: 'https://phela.vn/' },
  { id: 'TARGET_108_08_GONGCHA', brand: 'Gong Cha Vietnam', category: 'COFFEE_TEA', url: 'https://gongcha.com.vn/' },
  { id: 'TARGET_108_09_HIGHLANDS', brand: 'Highlands Coffee', category: 'COFFEE_TEA', url: 'https://www.highlandscoffee.com.vn/' },
  { id: 'TARGET_108_10_TCH', brand: 'The Coffee House', category: 'COFFEE_TEA', url: 'https://thecoffeehouse.com/' },
  { id: 'TARGET_108_11_PHUCLONG', brand: 'Phúc Long Coffee & Tea', category: 'COFFEE_TEA', url: 'https://phuclong.com.vn/' },
  { id: 'TARGET_108_12_KATINAT', brand: 'Katinat Saigon Kafe', category: 'COFFEE_TEA', url: 'https://katinat.vn/' },
  { id: 'TARGET_108_13_GALAXY', brand: 'Galaxy Cinema', category: 'CINEMA', url: 'https://galaxycine.vn/' },
  { id: 'TARGET_108_14_CGV', brand: 'CGV Cinemas', category: 'CINEMA', url: 'https://www.cgv.vn/' },
  { id: 'TARGET_108_15_METIZ', brand: 'Metiz Cinema', category: 'CINEMA', url: 'https://metiz.vn/' },
  { id: 'TARGET_108_16_LOTTE_CINEMA', brand: 'Lotte Cinema', category: 'CINEMA', url: 'https://www.lottecinemavn.com/' },
  { id: 'TARGET_108_17_STARLIGHT', brand: 'Starlight Cinema', category: 'CINEMA', url: 'https://starlight.vn/' },
  { id: 'TARGET_108_18_CGV_U22', brand: 'CGV Cinemas Vietnam', category: 'CINEMA', url: 'https://www.cgv.vn/' },
  { id: 'TARGET_108_19_XANH_SM', brand: 'Xanh SM', category: 'MOBILITY', url: 'https://www.xanhsm.com/' },
  { id: 'TARGET_108_20_GRAB', brand: 'Grab Vietnam', category: 'MOBILITY', url: 'https://www.grab.com/vn/' },
  { id: 'TARGET_108_21_BE', brand: 'Be Group', category: 'MOBILITY', url: 'https://be.com.vn/' },
  { id: 'TARGET_108_22_DANABUS', brand: 'DanaBus Đà Nẵng', category: 'MOBILITY', url: 'https://danangbus.vn/' },
  { id: 'TARGET_108_23_TNGO', brand: 'TNGo Xe Đạp', category: 'MOBILITY', url: 'https://tngo.vn/' },
  { id: 'TARGET_108_24_SHOPEEFOOD', brand: 'ShopeeFood', category: 'MOBILITY', url: 'https://shopeefood.vn/' },
  { id: 'TARGET_108_25_COOPMART', brand: 'Co.opmart', category: 'SHOPPING', url: 'https://co-opmart.com.vn/' },
  { id: 'TARGET_108_26_MM_MEGA', brand: 'MM Mega Market', category: 'SHOPPING', url: 'https://mmvietnam.com/' },
  { id: 'TARGET_108_27_GO_DANANG', brand: 'GO! Vietnam', category: 'SHOPPING', url: 'https://go-vietnam.vn/' },
  { id: 'TARGET_108_28_VINCOM', brand: 'Vincom Plaza', category: 'SHOPPING', url: 'https://vincom.com.vn/' },
  { id: 'TARGET_108_29_LOTTE_MART', brand: 'Lotte Mart', category: 'SHOPPING', url: 'https://www.lottemart.com.vn/' },
  { id: 'TARGET_108_30_WINMART', brand: 'WinMart+', category: 'SHOPPING', url: 'https://winmart.vn/' },
  { id: 'TARGET_108_31_CHO_CON', brand: 'Cổng TT Đà Nẵng - Chợ Cồn', category: 'SHOPPING', url: 'https://danang.gov.vn/' },
  { id: 'TARGET_108_32_CHO_HAN', brand: 'Cổng TT Đà Nẵng - Chợ Hàn', category: 'SHOPPING', url: 'https://danang.gov.vn/' }
];

async function captureAll() {
  console.log('🌐 [BATCH-CAPTURE-108] Khởi chạy thu thập bằng chứng 32 URL discovery seeds...');

  let browser = null;
  const results = [];

  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
    });

    for (let i = 0; i < SEED_TARGETS.length; i++) {
      const target = SEED_TARGETS[i];
      const targetDir = path.join(outputBaseDir, target.id);
      fs.mkdirSync(targetDir, { recursive: true });

      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
      await page.setViewport({ width: 1280, height: 800 });

      let captured = false;
      let finalUrl = target.url;
      let pageText = '';
      let pageHtml = '';
      let errorMsg = null;
      const timestamp = new Date().toISOString();

      try {
        console.log(`[${i + 1}/32] Đang tải ${target.id}: ${target.url} ...`);
        const response = await page.goto(target.url, { waitUntil: 'domcontentloaded', timeout: 12000 });
        finalUrl = page.url();

        // Wait brief moment for dynamic text
        await new Promise(r => setTimeout(r, 1000));

        pageText = await page.evaluate(() => document.body ? document.body.innerText : '');
        pageHtml = await page.content();

        if (pageText && pageText.trim().length > 20) {
          captured = true;
          // Save page text
          const textPath = path.join(targetDir, 'page.txt');
          fs.writeFileSync(textPath, pageText, 'utf8');

          // Save page html
          const htmlPath = path.join(targetDir, 'page.html');
          fs.writeFileSync(htmlPath, pageHtml, 'utf8');

          // Save screenshot
          const screenshotPath = path.join(targetDir, 'screenshot.png');
          await page.screenshot({ path: screenshotPath, fullPage: false });

          const textSha = sha256(Buffer.from(pageText, 'utf8'));
          const screenshotBuf = fs.readFileSync(screenshotPath);
          const screenshotSha = sha256(screenshotBuf);

          const meta = {
            target_id: target.id,
            brand: target.brand,
            category: target.category,
            source_url: target.url,
            final_url: finalUrl,
            captured_at: timestamp,
            status: 'CAPTURED_SUCCESS',
            http_status: response ? response.status() : 200,
            text_bytes: Buffer.byteLength(pageText, 'utf8'),
            text_sha256: textSha,
            screenshot_bytes: screenshotBuf.length,
            screenshot_sha256: screenshotSha,
            evidence_path: `05_DEAL_AND_AFFILIATE/batch_capture_108/captures_108/${target.id}/page.txt`,
            error: null
          };

          fs.writeFileSync(path.join(targetDir, 'metadata.json'), JSON.stringify(meta, null, 2), 'utf8');
          console.log(`  -> ✅ Thành công: ${target.id} (${textSha.substring(0, 16)}...)`);
          results.push(meta);
        } else {
          throw new Error('Nội dung trang trống hoặc dưới ngưỡng 20 ký tự');
        }
      } catch (err) {
        errorMsg = err.message;
        console.warn(`  -> ⚠️ Thất bại/Giới hạn truy cập: ${target.id} (${err.message}) -> Lưu trạng thái SEED_ONLY`);
        const meta = {
          target_id: target.id,
          brand: target.brand,
          category: target.category,
          source_url: target.url,
          final_url: finalUrl,
          captured_at: timestamp,
          status: 'UNCAPTURED_DISCOVERY_SEED',
          evidence_path: null,
          error: errorMsg
        };
        fs.writeFileSync(path.join(targetDir, 'metadata.json'), JSON.stringify(meta, null, 2), 'utf8');
        results.push(meta);
      } finally {
        await page.close();
      }
    }
  } finally {
    if (browser) await browser.close();
  }

  // Summary file
  const summaryPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_108', 'batch_108_capture_summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify({
    manifest_id: 'BATCH_108_CAPTURE_SUMMARY',
    generated_at: new Date().toISOString(),
    total_seeds: SEED_TARGETS.length,
    captured_count: results.filter(r => r.status === 'CAPTURED_SUCCESS').length,
    uncaptured_count: results.filter(r => r.status !== 'CAPTURED_SUCCESS').length,
    results
  }, null, 2), 'utf8');

  console.log(`\n✅ Hoàn tất batch capture 108! Đã ghi: ${summaryPath}`);
}

captureAll().catch(err => {
  console.error('Fatal capture error:', err);
  process.exit(1);
});
