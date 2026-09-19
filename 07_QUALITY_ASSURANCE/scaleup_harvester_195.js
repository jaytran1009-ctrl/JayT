const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const puppeteer = require('puppeteer');

const repoRoot = path.resolve(__dirname, '..');
const evidenceDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_195_harvest');
if (!fs.existsSync(evidenceDir)) fs.mkdirSync(evidenceDir, { recursive: true });

function sha256(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }

const harvestTargets = [
  // --- LANE A: CINEMA & ENTERTAINMENT (ĐÀ NẴNG) ---
  {
    target_id: 'LANE_A_METIZ_01',
    brand: 'Metiz Cinema Đà Nẵng',
    category: 'CINEMA',
    hub_id: 'HUB_3_ENTERTAINMENT_AND_LEISURE',
    leaf_url: 'https://metiz.vn/tin-va-khuyen-mai.html',
    locality_url: 'https://metiz.vn/',
    branch_address: 'Tầng 1 Helio Center, Đường 2/9, Phường Hòa Cường Bắc, Quận Hải Châu, TP. Đà Nẵng',
    expected_type: 'LOCAL_CONFIRMED_ACTIONABLE_DEAL'
  },
  {
    target_id: 'LANE_A_METIZ_02',
    brand: 'Metiz Cinema Đà Nẵng',
    category: 'CINEMA',
    hub_id: 'HUB_3_ENTERTAINMENT_AND_LEISURE',
    leaf_url: 'https://metiz.vn/',
    locality_url: 'https://metiz.vn/',
    branch_address: 'Tầng 1 Helio Center, Đường 2/9, Phường Hòa Cường Bắc, Quận Hải Châu, TP. Đà Nẵng',
    expected_type: 'LOCAL_CONFIRMED_ACTIONABLE_DEAL'
  },
  {
    target_id: 'LANE_A_STARLIGHT_01',
    brand: 'Starlight Cinema Đà Nẵng',
    category: 'CINEMA',
    hub_id: 'HUB_3_ENTERTAINMENT_AND_LEISURE',
    leaf_url: 'https://starlight.vn/uu-dai/thu-3-phim-viet-1046.html',
    locality_url: 'https://starlight.vn/uu-dai.html',
    branch_address: 'Tầng 4 TTTM Nguyễn Kim, 46 Điện Biên Phủ, Quận Thanh Khê, TP. Đà Nẵng',
    expected_type: 'LOCAL_CONFIRMED_ACTIONABLE_DEAL'
  },
  {
    target_id: 'LANE_A_STARLIGHT_02',
    brand: 'Starlight Cinema Đà Nẵng',
    category: 'CINEMA',
    hub_id: 'HUB_3_ENTERTAINMENT_AND_LEISURE',
    leaf_url: 'https://starlight.vn/uu-dai.html',
    locality_url: 'https://starlight.vn/uu-dai.html',
    branch_address: 'Tầng 4 TTTM Nguyễn Kim, 46 Điện Biên Phủ, Quận Thanh Khê, TP. Đà Nẵng',
    expected_type: 'LOCAL_CONFIRMED_ACTIONABLE_DEAL'
  },
  {
    target_id: 'LANE_A_MIKAZUKI_01',
    brand: 'Da Nang Mikazuki Japanese Resorts & Spa',
    category: 'ENTERTAINMENT_AND_LEISURE',
    hub_id: 'HUB_3_ENTERTAINMENT_AND_LEISURE',
    leaf_url: 'https://mikazuki.com.vn/vn/',
    locality_url: 'https://mikazuki.com.vn/vn/',
    branch_address: 'Khu du lịch Xuân Thiều, Đường Nguyễn Tất Thành, P. Hòa Hiệp Nam, Q. Liên Chiểu, TP. Đà Nẵng',
    expected_type: 'LOCAL_CONFIRMED_ACTIONABLE_DEAL'
  },
  {
    target_id: 'LANE_A_GALAXY_01',
    brand: 'Galaxy Cinema Đà Nẵng',
    category: 'CINEMA',
    hub_id: 'HUB_3_ENTERTAINMENT_AND_LEISURE',
    leaf_url: 'https://www.galaxycine.vn/khuyen-mai/happy-day/',
    locality_url: 'https://www.galaxycine.vn/rap-gia-ve/galaxy-da-nang/',
    branch_address: 'Tầng 3, Co.opmart Đà Nẵng, 478 Điện Biên Phủ, Quận Thanh Khê, TP. Đà Nẵng',
    expected_type: 'OFFER_WITH_DANANG_BRANCH_SCOPE_PENDING'
  },
  
  // --- LANE B: FOOD & DINING, COFFEE & GATHERING (ĐÀ NẴNG) ---
  {
    target_id: 'LANE_B_DOMINOS_01',
    brand: "Domino's Pizza",
    category: 'FOOD_AND_DINING',
    hub_id: 'HUB_1_FOOD_AND_DINING',
    leaf_url: 'https://dominos.vn/khuyen-mai/thu-5-mua-1-tang-1',
    locality_url: 'https://dominos.vn/cua-hang',
    branch_address: 'Hệ thống cửa hàng Domino\'s Pizza tại Đà Nẵng (Nguyễn Văn Thoại, Điện Biên Phủ)',
    expected_type: 'OFFER_WITH_DANANG_BRANCH_SCOPE_PENDING'
  },
  {
    target_id: 'LANE_B_TPC_01',
    brand: 'The Pizza Company',
    category: 'FOOD_AND_DINING',
    hub_id: 'HUB_1_FOOD_AND_DINING',
    leaf_url: 'https://thepizzacompany.vn/tin-tuc-va-su-kien/pepsi-mua-1-tang-1',
    locality_url: 'https://thepizzacompany.vn/Shop/List',
    branch_address: '173 Nguyễn Văn Thoại (Sơn Trà) & 478 Điện Biên Phủ (Thanh Khê) & Lotte Mart, Đà Nẵng',
    expected_type: 'OFFER_WITH_DANANG_BRANCH_SCOPE_PENDING'
  },
  {
    target_id: 'LANE_B_JOLLIBEE_01',
    brand: 'Jollibee Vietnam',
    category: 'FOOD_AND_DINING',
    hub_id: 'HUB_1_FOOD_AND_DINING',
    leaf_url: 'https://jollibee.com.vn/khuyen-mai',
    locality_url: 'https://jollibee.com.vn/cua-hang',
    branch_address: 'Hệ thống Jollibee Đà Nẵng (Co.opmart 478 Điện Biên Phủ, Vincom Ngô Quyền, Big C Đà Nẵng)',
    expected_type: 'LOCAL_CONFIRMED_ACTIONABLE_DEAL'
  },
  {
    target_id: 'LANE_B_LOTTERIA_01',
    brand: 'Lotteria Vietnam',
    category: 'FOOD_AND_DINING',
    hub_id: 'HUB_1_FOOD_AND_DINING',
    leaf_url: 'https://www.lotteria.vn/promotion',
    locality_url: 'https://www.lotteria.vn/stores',
    branch_address: 'Hệ thống Lotteria Đà Nẵng (Núi Thành, Hùng Vương, Ông Ích Khiêm, Big C Đà Nẵng)',
    expected_type: 'LOCAL_CONFIRMED_ACTIONABLE_DEAL'
  },

  // --- LANE C: TRANSIT & PUBLIC UTILITIES (ĐÀ NẴNG) ---
  {
    target_id: 'LANE_C_DANABUS_01',
    brand: 'DanaBus Đà Nẵng',
    category: 'PUBLIC_TRANSIT',
    hub_id: 'HUB_4_PUBLIC_TRANSIT',
    leaf_url: 'https://danangbus.vn/',
    locality_url: 'https://danangbus.vn/',
    branch_address: 'Trung tâm Điều hành Giao thông Đô thị Đà Nẵng, 493 Trần Cao Vân, Thanh Khê, Đà Nẵng',
    expected_type: 'LOCAL_CONFIRMED_ACTIONABLE_DEAL'
  },
  {
    target_id: 'LANE_C_DSVN_01',
    brand: 'Tổng Công Ty Đường Sắt Việt Nam (Ga Đà Nẵng)',
    category: 'PUBLIC_TRANSIT',
    hub_id: 'HUB_4_PUBLIC_TRANSIT',
    leaf_url: 'https://dsvn.vn/#/',
    locality_url: 'https://dsvn.vn/#/',
    branch_address: 'Ga Đà Nẵng: 202 Hải Phòng, Phường Tam Thuận, Quận Thanh Khê, TP. Đà Nẵng',
    expected_type: 'LOCAL_CONFIRMED_ACTIONABLE_DEAL'
  }
];

async function runScaleUpHarvest() {
  console.log('========================================================================');
  console.log('🌾 JAYT-195: DA NANG SCALE-UP HARVEST ENGINE (3 LANES)');
  console.log('   Timestamp: ' + new Date().toISOString());
  console.log('========================================================================\n');

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const harvestedItems = [];

  for (let i = 0; i < harvestTargets.length; i++) {
    const t = harvestTargets[i];
    console.log(`[TARGET ${i + 1}/${harvestTargets.length}] Harvesting ${t.brand} (${t.target_id})...`);
    try {
      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
      
      const res = await page.goto(t.leaf_url, { waitUntil: 'domcontentloaded', timeout: 20000 });
      const status = res ? res.status() : 200;
      const htmlContent = await page.content();
      const bodyText = await page.evaluate(() => document.body.innerText);

      // Save raw leaf html
      const rawLeafFileName = `raw_leaf_${t.target_id}.html`;
      const rawLeafFilePath = path.join(evidenceDir, rawLeafFileName);
      fs.writeFileSync(rawLeafFilePath, htmlContent, 'utf8');
      const rawLeafSha = sha256(Buffer.from(htmlContent, 'utf8'));

      // Save screenshot
      const shotFileName = `shot_leaf_${t.target_id}.png`;
      const shotFilePath = path.join(evidenceDir, shotFileName);
      await page.screenshot({ path: shotFilePath, fullPage: false });
      const shotSha = sha256(fs.readFileSync(shotFilePath));

      // Harvest locality leaf
      let rawLocalityFileName = rawLeafFileName;
      let rawLocalitySha = rawLeafSha;
      if (t.locality_url !== t.leaf_url) {
        try {
          await page.goto(t.locality_url, { waitUntil: 'domcontentloaded', timeout: 20000 });
          const locContent = await page.content();
          rawLocalityFileName = `raw_loc_${t.target_id}.html`;
          const rawLocPath = path.join(evidenceDir, rawLocalityFileName);
          fs.writeFileSync(rawLocPath, locContent, 'utf8');
          rawLocalitySha = sha256(Buffer.from(locContent, 'utf8'));
        } catch (e) {
          console.log(`   ⚠️ Locality secondary fetch warning for ${t.brand}: ${e.message}`);
        }
      }

      await page.close();

      harvestedItems.push({
        target_id: t.target_id,
        brand: t.brand,
        category: t.category,
        hub_id: t.hub_id,
        leaf_url: t.leaf_url,
        locality_url: t.locality_url,
        branch_address: t.branch_address,
        http_status: status,
        raw_leaf_file: rawLeafFileName,
        raw_leaf_sha256: rawLeafSha,
        raw_locality_file: rawLocalityFileName,
        raw_locality_sha256: rawLocalitySha,
        screenshot_file: shotFileName,
        screenshot_sha256: shotSha,
        body_text_sample: bodyText.substring(0, 300).replace(/\s+/g, ' '),
        expected_type: t.expected_type,
        harvested_at: new Date().toISOString()
      });

      console.log(`   ✅ Leaf: ${rawLeafFileName} (${rawLeafSha.substring(0, 16)}...)`);
      console.log(`   ✅ Locality: ${rawLocalityFileName} (${rawLocalitySha.substring(0, 16)}...)`);
      console.log(`   📸 Shot: ${shotFileName}`);
    } catch (err) {
      console.error(`   ❌ Failed harvesting ${t.brand}: ${err.message}`);
    }
  }

  await browser.close();

  // Save Harvest Report
  const reportPath = path.join(evidenceDir, 'SCALEUP_HARVEST_REPORT_195.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    harvest_id: 'HARVEST_195_' + Date.now(),
    timestamp: new Date().toISOString(),
    total_targets: harvestTargets.length,
    successful_targets: harvestedItems.length,
    harvested_items: harvestedItems
  }, null, 2), 'utf8');

  console.log('\n📄 Saved Scale-Up Harvest Report: ' + path.relative(repoRoot, reportPath));
  console.log(`🎉 Total Successfully Harvested: ${harvestedItems.length}/${harvestTargets.length}`);
}

if (require.main === module) {
  runScaleUpHarvest().catch(err => {
    console.error('Fatal Harvest Error:', err);
    process.exit(1);
  });
}

module.exports = { runScaleUpHarvest };
