const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const crypto = require('crypto');
const puppeteer = require('puppeteer');

const repoRoot = path.resolve(__dirname, '..');
const harvestDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_201_actionable_harvest');
if (!fs.existsSync(harvestDir)) fs.mkdirSync(harvestDir, { recursive: true });

function sha256Str(str) { return crypto.createHash('sha256').update(str, 'utf8').digest('hex'); }

const harvestTargets = [
  // Cinema
  { id: 'HARVEST_201_GALAXY_HAPPY_DAY', url: 'https://www.galaxycine.vn/khuyen-mai/happy-day/' },
  { id: 'HARVEST_201_GALAXY_DANANG_BRANCH', url: 'https://www.galaxycine.vn/rap-gia-ve/galaxy-da-nang/' },
  { id: 'HARVEST_201_STARLIGHT_PROMOS', url: 'https://starlight.vn/uu-dai.html' },
  { id: 'HARVEST_201_METIZ_PROMOS', url: 'https://metiz.vn/tin-va-khuyen-mai.html' },
  { id: 'HARVEST_201_LOTTE_CINEMA_DANANG', url: 'https://www.lottecinemavn.com/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=5&cinemaID=8001' },
  { id: 'HARVEST_201_CGV_OFFERS', url: 'https://www.cgv.vn/default/offers/' },

  // Pizza & Fast Food
  { id: 'HARVEST_201_DOMINOS_THU_5_MUA_1_TANG_1', url: 'https://dominos.vn/khuyen-mai/thu-5-mua-1-tang-1' },
  { id: 'HARVEST_201_DOMINOS_GIAM_70_PIZZA_2', url: 'https://dominos.vn/khuyen-mai' },
  { id: 'HARVEST_201_THE_PIZZA_COMPANY_MUA_1_TANG_1', url: 'https://thepizzacompany.vn/promotions' },
  { id: 'HARVEST_201_JOLLIBEE_PROMOS', url: 'https://jollibee.com.vn/khuyen-mai' },
  { id: 'HARVEST_201_KFC_PROMOS', url: 'https://www.kfcvietnam.com.vn/khuyen-mai' },
  { id: 'HARVEST_201_LOTTERIA_PROMOS', url: 'https://lotteria.vn/khuyen-mai' },

  // F&B & Hotpot Chains
  { id: 'HARVEST_201_KICHI_KICHI_PROMOS', url: 'https://kichi.com.vn/uu-dai' },
  { id: 'HARVEST_201_GOGI_HOUSE_PROMOS', url: 'https://gogi.com.vn/uu-dai' },
  { id: 'HARVEST_201_HIGHLANDS_PROMOS', url: 'https://www.highlandscoffee.com.vn/vn/tin-tuc.html' },
  { id: 'HARVEST_201_PHUC_LONG_PROMOS', url: 'https://phuclong.com.vn/khuyen-mai' },
  { id: 'HARVEST_201_DOOKKI_VIETNAM', url: 'https://dookkivietnam.com/' },

  // Transport & Public Destinations
  { id: 'HARVEST_201_DANABUS_VE_THANG', url: 'https://danangbus.vn/tin-tuc/huong-dan-dang-ky-ve-thang-xe-buyt-da-nang.html' },
  { id: 'HARVEST_201_DSVN_STUDENT_DISCOUNT', url: 'https://dsvn.vn/#/thongtindatcho' },
  { id: 'HARVEST_201_MIKAZUKI_WATERPARK_PROMO', url: 'https://mikazuki.com.vn/vn/water-park-365.html' },
  { id: 'HARVEST_201_CHAM_MUSEUM_FARES', url: 'http://chammuseum.danang.vn/' },
  { id: 'HARVEST_201_TNGO_DANANG', url: 'https://tngo.vn/' }
];

async function runHarvest201() {
  console.log('========================================================================');
  console.log('🚀 JAYT-201: HARVESTING ACTIONABLE OFFICIAL OFFERS AT SCALE');
  console.log('   Timestamp: ' + new Date().toISOString());
  console.log('========================================================================\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const results = [];

  for (let i = 0; i < harvestTargets.length; i++) {
    const t = harvestTargets[i];
    console.log(`[${i + 1}/${harvestTargets.length}] Harvesting ${t.id} -> ${t.url}`);
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    try {
      await page.goto(t.url, { waitUntil: 'networkidle2', timeout: 18000 });
      await new Promise(r => setTimeout(r, 1200));

      const htmlContent = await page.content();
      const textContent = await page.evaluate(() => document.body.innerText || '');

      const fileName = `raw_actionable_${t.id}.html`;
      const filePath = path.join(harvestDir, fileName);
      fs.writeFileSync(filePath, htmlContent, 'utf8');
      const sha = sha256Str(htmlContent);

      results.push({
        id: t.id,
        url: t.url,
        status: 'CAPTURED_SUCCESS',
        file_name: fileName,
        sha256: sha,
        text_length: textContent.length,
        text_preview: textContent.replace(/\s+/g, ' ').substring(0, 200)
      });
      console.log(`  ✅ SUCCESS: ${fileName} (${sha.substring(0, 16)}... | ${textContent.length} chars)`);
    } catch (err) {
      console.log(`  ⚠️ INCONCLUSIVE: ${err.message}`);
      results.push({
        id: t.id,
        url: t.url,
        status: 'INCONCLUSIVE_CAPTURE_ERROR',
        error: err.message
      });
    } finally {
      await page.close();
    }
  }

  await browser.close();

  const reportPath = path.join(harvestDir, 'ACTIONABLE_HARVEST_REPORT_201.json');
  fs.writeFileSync(reportPath, JSON.stringify({ timestamp: new Date().toISOString(), results }, null, 2), 'utf8');
  console.log(`\n📄 Actionable Harvest Report saved to: ${path.relative(repoRoot, reportPath)}`);
}

if (require.main === module) {
  runHarvest201().catch(err => {
    console.error('Fatal Harvest 201 Error:', err);
    process.exit(1);
  });
}

module.exports = { runHarvest201 };
