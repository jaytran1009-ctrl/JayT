const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const puppeteer = require('puppeteer');

const repoRoot = path.resolve(__dirname, '..');
const harvestDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_200_autopilot_harvest');
if (!fs.existsSync(harvestDir)) fs.mkdirSync(harvestDir, { recursive: true });

function sha256Str(str) { return crypto.createHash('sha256').update(str, 'utf8').digest('hex'); }

const spaTargets = [
  { id: 'SPA_200_METIZ_HELIO_PAGE', url: 'https://helio.vn/vi/rap-chieu-phim-metiz-cinema-da-nang/' },
  { id: 'SPA_200_DANABUS_FARES_RENDERED', url: 'https://danangbus.vn/chinh-sach-gia-ve.html' },
  { id: 'SPA_200_DANABUS_VE_THANG_RENDERED', url: 'https://danangbus.vn/tin-tuc/huong-dan-dang-ky-ve-thang-xe-buyt-da-nang.html' },
  { id: 'SPA_200_STARLIGHT_PROMO_RENDERED', url: 'https://starlight.vn/uu-dai.html' },
  { id: 'SPA_200_MIKAZUKI_WATERPARK_RENDERED', url: 'https://mikazuki.com.vn/vn/water-park-365.html' },
  { id: 'SPA_200_GALAXY_DANANG_RENDERED', url: 'https://www.galaxycine.vn/rap-gia-ve/galaxy-da-nang/' },
  { id: 'SPA_200_GALAXY_HAPPY_DAY_RENDERED', url: 'https://www.galaxycine.vn/khuyen-mai/happy-day/' },
  { id: 'SPA_200_DOMINOS_PROMO_RENDERED', url: 'https://dominos.vn/khuyen-mai' },
  { id: 'SPA_200_PIZZA_COMPANY_PROMO_RENDERED', url: 'https://thepizzacompany.vn/promotions' }
];

async function runSpaCrawler() {
  console.log('========================================================================');
  console.log('🕷️ JAYT-200: PUPPETEER SPA DEEP LEAF CRAWLER');
  console.log('   Timestamp: ' + new Date().toISOString());
  console.log('========================================================================\n');

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const results = [];

  for (let i = 0; i < spaTargets.length; i++) {
    const t = spaTargets[i];
    console.log(`[${i + 1}/${spaTargets.length}] Crawling ${t.id} -> ${t.url}`);
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    try {
      await page.goto(t.url, { waitUntil: 'networkidle2', timeout: 20000 });
      await new Promise(r => setTimeout(r, 1500));

      const htmlContent = await page.content();
      const textContent = await page.evaluate(() => document.body.innerText);

      const fileName = `rendered_${t.id}.html`;
      const filePath = path.join(harvestDir, fileName);
      fs.writeFileSync(filePath, htmlContent, 'utf8');
      const sha = sha256Str(htmlContent);

      results.push({
        id: t.id,
        url: t.url,
        status: 'RENDERED_SUCCESS',
        file_name: fileName,
        sha256: sha,
        text_length: textContent.length,
        text_preview: textContent.replace(/\s+/g, ' ').substring(0, 300)
      });

      console.log(`  ✅ SUCCESS: ${fileName} (${sha.substring(0, 16)}... | ${textContent.length} text chars)`);
      console.log(`     Preview: ${textContent.replace(/\s+/g, ' ').substring(0, 150)}...\n`);
    } catch (err) {
      console.log(`  ⚠️ INCONCLUSIVE / ERROR: ${err.message}`);
      results.push({
        id: t.id,
        url: t.url,
        status: 'INCONCLUSIVE_ERROR',
        error: err.message
      });
    } finally {
      await page.close();
    }
  }

  await browser.close();

  const reportPath = path.join(harvestDir, 'SPA_CRAWLER_REPORT_200.json');
  fs.writeFileSync(reportPath, JSON.stringify({ timestamp: new Date().toISOString(), results }, null, 2), 'utf8');
  console.log(`📄 SPA Crawler Report saved to: ${path.relative(repoRoot, reportPath)}`);
}

if (require.main === module) {
  runSpaCrawler().catch(err => {
    console.error('Fatal SPA Crawler Error:', err);
    process.exit(1);
  });
}

module.exports = { runSpaCrawler };
