const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const puppeteer = require('puppeteer');

const repoRoot = path.resolve(__dirname, '..');
const harvestDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_192_harvest');
if (!fs.existsSync(harvestDir)) fs.mkdirSync(harvestDir, { recursive: true });

function sha256Buf(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }
function sha256Str(str) { return crypto.createHash('sha256').update(str, 'utf8').digest('hex'); }

const CANDIDATE_DAILY_SOURCES = [
  {
    candidate_id: 'CAND_192_01',
    brand: 'Galaxy Cinema Đà Nẵng',
    category: 'Rạp chiếu phim & Giải trí',
    title: 'Galaxy Cinema — Happy Day Vé Chỉ Từ 45K & Ưu Đãi Thành Viên',
    url: 'https://www.galaxycine.vn/khuyen-mai/',
    hub_id: 'HUB_3_ENTERTAINMENT_AND_LEISURE',
    target_cluster: 'ALL',
    search_keywords: ['Happy Day - Vé Chỉ Từ 45K', 'Vé Chỉ Từ 45K', 'Ưu Đãi Thành Viên', 'U22', 'Happy Day']
  },
  {
    candidate_id: 'CAND_192_02',
    brand: 'Domino\'s Pizza Đà Nẵng',
    category: 'Ẩm thực & F&B',
    title: 'Domino\'s Pizza — Thứ 5 Mua 1 Tặng 1 Pizza & Ưu Đãi Hằng Tuần',
    url: 'https://dominos.vn/khuyen-mai',
    hub_id: 'HUB_1_FOOD_AND_DINING',
    target_cluster: 'ALL',
    search_keywords: ['Thứ 5 Mua 1 Tặng 1', 'Mua 1 Tặng 1', 'Khuyến Mãi', 'E-Voucher']
  },
  {
    candidate_id: 'CAND_192_03',
    brand: 'The Pizza Company Đà Nẵng',
    category: 'Ẩm thực & F&B',
    title: 'The Pizza Company — Khuyến Mãi Mua 1 Tặng 1 & Combo Tiết Kiệm',
    url: 'https://thepizzacompany.vn/',
    hub_id: 'HUB_1_FOOD_AND_DINING',
    target_cluster: 'ALL',
    search_keywords: ['Mua 1 Tặng 1', 'Khuyến mãi, Combo', 'Tặng 1 Chai', 'Ưu Đãi']
  },
  {
    candidate_id: 'CAND_192_04',
    brand: 'Mikazuki Water Park 365 Đà Nẵng',
    category: 'Vui chơi & Nghỉ dưỡng',
    title: 'Da Nang Mikazuki — Đại Tiệc Buffet & Ưu Đãi Vui Chơi Công Viên Nước',
    url: 'https://mikazuki.com.vn/vn/tin-tuc-khuyen-mai.html',
    hub_id: 'HUB_3_ENTERTAINMENT_AND_LEISURE',
    target_cluster: 'hoakhang',
    search_keywords: ['ĐẠI TIỆC BUFFET', 'ƯU ĐÃI', 'Buffet', 'Khuyến mãi', 'Mikazuki']
  },
  {
    candidate_id: 'CAND_192_05',
    brand: 'Apple Music',
    category: 'Giải trí số có hạn',
    title: 'Apple Music — Dùng Thử 1 Tháng Miễn Phí + Apple TV+ Dành Cho Sinh Viên',
    url: 'https://www.apple.com/vn/apple-music/',
    hub_id: 'HUB_3_ENTERTAINMENT_AND_LEISURE',
    target_cluster: 'ALL',
    search_keywords: ['Sinh viên được nhận 1 tháng sử dụng Apple Music miễn phí', 'Apple Music miễn phí', 'Dùng thử miễn phí']
  }
];

async function runDailyHarvestSprint() {
  console.log('========================================================================');
  console.log('🚀 JAYT-192: DAILY ACTIONABLE DEAL HARVEST SPRINT');
  console.log('   Timestamp: ' + new Date().toISOString());
  console.log('   Candidates: ' + CANDIDATE_DAILY_SOURCES.length);
  console.log('========================================================================\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--window-size=1440,900']
  });

  const harvestResults = [];

  for (let i = 0; i < CANDIDATE_DAILY_SOURCES.length; i++) {
    const cand = CANDIDATE_DAILY_SOURCES[i];
    console.log(`[${i + 1}/${CANDIDATE_DAILY_SOURCES.length}] Harvesting Daily Deal: ${cand.brand} (${cand.url})`);

    const result = {
      candidate_id: cand.candidate_id,
      brand: cand.brand,
      category: cand.category,
      title: cand.title,
      target_url: cand.url,
      hub_id: cand.hub_id,
      target_cluster: cand.target_cluster,
      status: 'PENDING',
      rejection_reason: null,
      http_status: null,
      final_url: null,
      evidence_file: null,
      evidence_sha256: null,
      screenshot_file: null,
      screenshot_sha256: null,
      captured_at: new Date().toISOString(),
      offer_quote: null
    };

    let page = null;
    try {
      page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
      await page.setViewport({ width: 1440, height: 900 });

      const response = await page.goto(cand.url, { waitUntil: 'domcontentloaded', timeout: 25000 });
      result.http_status = response ? response.status() : 200;
      result.final_url = page.url();

      if (result.http_status >= 400) {
        result.status = 'REJECTED';
        result.rejection_reason = 'HTTP_STATUS_' + result.http_status;
        console.log(`   ❌ HTTP Error ${result.http_status}`);
        harvestResults.push(result);
        await page.close();
        continue;
      }

      await new Promise(r => setTimeout(r, 2500));

      const rawHtml = await page.content();
      const cleanBrand = cand.brand.toUpperCase().replace(/[^A-Z0-9]/g, '_');
      const htmlFileName = `raw_daily_${cand.candidate_id}_${cleanBrand}.html`;
      const pngFileName = `shot_daily_${cand.candidate_id}_${cleanBrand}.png`;

      const htmlPath = path.join(harvestDir, htmlFileName);
      const pngPath = path.join(harvestDir, pngFileName);

      fs.writeFileSync(htmlPath, rawHtml, 'utf8');
      result.evidence_file = htmlFileName;
      result.evidence_sha256 = sha256Buf(fs.readFileSync(htmlPath));

      await page.screenshot({ path: pngPath, fullPage: false });
      result.screenshot_file = pngFileName;
      result.screenshot_sha256 = sha256Buf(fs.readFileSync(pngPath));

      // Extract verbatim offer quotes
      const extractedSnippets = await page.evaluate((keywords) => {
        const bodyText = document.body.innerText || '';
        const lines = bodyText.split('\n').map(l => l.trim()).filter(l => l.length >= 10 && l.length <= 260);
        const matched = [];

        for (const line of lines) {
          for (const kw of keywords) {
            if (line.toLowerCase().includes(kw.toLowerCase())) {
              if (!matched.includes(line)) {
                matched.push(line);
              }
              break;
            }
          }
        }
        return matched;
      }, cand.search_keywords);

      if (extractedSnippets.length > 0) {
        // Pick best matching line
        result.offer_quote = extractedSnippets[0];
        result.status = 'QUALIFIED_DAILY_DEAL';
        console.log(`   ✅ QUALIFIED DAILY DEAL: "${result.offer_quote}"`);
      } else {
        result.status = 'REJECTED';
        result.rejection_reason = 'NO_VERBATIM_OFFER_QUOTE';
        console.log(`   ⚠️ REJECTED: No offer quote found`);
      }

      harvestResults.push(result);
      await page.close();

    } catch (err) {
      console.log(`   ❌ Error harvesting ${cand.brand}: ${err.message}`);
      result.status = 'REJECTED';
      result.rejection_reason = 'ERROR: ' + err.message;
      harvestResults.push(result);
      if (page) {
        try { await page.close(); } catch (_) {}
      }
    }
  }

  await browser.close();

  const report = {
    batch_id: 'DAILY_HARVEST_BATCH_192_' + Date.now(),
    timestamp: new Date().toISOString(),
    total_candidates: CANDIDATE_DAILY_SOURCES.length,
    qualified_daily_deals: harvestResults.filter(r => r.status === 'QUALIFIED_DAILY_DEAL').length,
    results: harvestResults
  };

  const reportPath = path.join(harvestDir, 'DAILY_HARVEST_REPORT_192.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');

  console.log('\n========================================================================');
  console.log('📊 DAILY HARVEST BATCH 192 SUMMARY:');
  console.log(`   Total Candidates:     ${report.total_candidates}`);
  console.log(`   🔥 Qualified Deals:   ${report.qualified_daily_deals}`);
  console.log(`   📄 Report File:       ${path.relative(repoRoot, reportPath)}`);
  console.log('========================================================================\n');

  return report;
}

if (require.main === module) {
  runDailyHarvestSprint().catch(err => {
    console.error('Fatal Harvest Error:', err);
    process.exit(1);
  });
}

module.exports = { runDailyHarvestSprint };
