const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const puppeteer = require('puppeteer');

const repoRoot = path.resolve(__dirname, '..');
const harvestDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_190_harvest');
if (!fs.existsSync(harvestDir)) fs.mkdirSync(harvestDir, { recursive: true });

function sha256Buf(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }
function sha256Str(str) { return crypto.createHash('sha256').update(str, 'utf8').digest('hex'); }

const CANDIDATE_SOURCES = [
  // --- LANE 1: STUDENT DIGITAL BENEFITS ---
  {
    lane: 'Lane 1: Student Digital Benefits',
    candidate_id: 'CAND_190_01',
    brand: 'GitHub Education',
    title: 'GitHub — GitHub Student Developer Pack',
    url: 'https://github.com/education/students',
    hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES',
    target_cluster: 'ALL',
    search_keywords: ['Student Developer Pack', 'developer tools', 'student', 'pack', 'free', 'education']
  },
  {
    lane: 'Lane 1: Student Digital Benefits',
    candidate_id: 'CAND_190_02',
    brand: 'Notion',
    title: 'Notion — Notion for Education',
    url: 'https://www.notion.so/product/notion-for-education',
    hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES',
    target_cluster: 'ALL',
    search_keywords: ['free Plus plan', 'for students and educators', 'free for students', 'Notion for Education', 'education']
  },
  {
    lane: 'Lane 1: Student Digital Benefits',
    candidate_id: 'CAND_190_03',
    brand: 'Figma',
    title: 'Figma — Figma for Education',
    url: 'https://www.figma.com/education/',
    hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES',
    target_cluster: 'ALL',
    search_keywords: ['free professional features', 'free for students', 'Figma for Education', 'verified students', 'education']
  },
  {
    lane: 'Lane 1: Student Digital Benefits',
    candidate_id: 'CAND_190_04',
    brand: 'Autodesk',
    title: 'Autodesk — Free Educational Access to Autodesk Software',
    url: 'https://www.autodesk.com/education/edu-software/overview',
    hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES',
    target_cluster: 'ALL',
    search_keywords: ['Free educational access', 'free Autodesk software', 'students and educators', 'educational access', 'software']
  },
  {
    lane: 'Lane 1: Student Digital Benefits',
    candidate_id: 'CAND_190_05',
    brand: 'Canva',
    title: 'Canva — Canva for Education',
    url: 'https://www.canva.com/education/',
    hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES',
    target_cluster: 'ALL',
    search_keywords: ['Canva for Education', '100% free', 'free for teachers and students', 'free for education', 'classroom']
  },
  {
    lane: 'Lane 1: Student Digital Benefits',
    candidate_id: 'CAND_190_06',
    brand: 'Microsoft Education',
    title: 'Microsoft — Microsoft 365 Education',
    url: 'https://www.microsoft.com/vi-vn/education/products/office',
    hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES',
    target_cluster: 'ALL',
    search_keywords: ['miễn phí cho học sinh', 'sinh viên', 'Office 365', 'Microsoft 365', 'miễn phí', 'giáo dục']
  },
  {
    lane: 'Lane 1: Student Digital Benefits',
    candidate_id: 'CAND_190_07',
    brand: 'Apple',
    title: 'Apple Music — Gói Sinh Viên',
    url: 'https://www.apple.com/vn/apple-music/',
    hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES',
    target_cluster: 'ALL',
    search_keywords: ['Sinh Viên', 'Gói Sinh Viên', 'ưu đãi cho sinh viên', 'dành cho sinh viên', 'miễn phí']
  },
  {
    lane: 'Lane 1: Student Digital Benefits',
    candidate_id: 'CAND_190_08',
    brand: 'Adobe',
    title: 'Adobe Creative Cloud — Giảm Giá Sinh Viên',
    url: 'https://www.adobe.com/creativecloud/buy/students.html',
    hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES',
    target_cluster: 'ALL',
    search_keywords: ['Students and teachers', 'Save over 60%', 'Creative Cloud', 'student discount', 'discount']
  },

  // --- LANE 2: CINEMA & LOCAL ENTERTAINMENT ---
  {
    lane: 'Lane 2: Cinema & Local Entertainment',
    candidate_id: 'CAND_190_09',
    brand: 'Galaxy Cinema',
    title: 'Galaxy Cinema — Ưu Đãi Thành Viên & HSSV U22',
    url: 'https://www.galaxycine.vn/khuyen-mai/',
    hub_id: 'HUB_3_ENTERTAINMENT_AND_LEISURE',
    target_cluster: 'ALL',
    search_keywords: ['Happy Day', 'U22', 'Thành Viên', 'Ưu Đãi', 'Vé', 'khuyến mãi', 'chỉ từ']
  },
  {
    lane: 'Lane 2: Cinema & Local Entertainment',
    candidate_id: 'CAND_190_10',
    brand: 'Metiz Cinema Đà Nẵng',
    title: 'Metiz Cinema Đà Nẵng — Chương Trình Khuyến Mãi Rạp Helio',
    url: 'https://metiz.vn/khuyen-mai/',
    hub_id: 'HUB_3_ENTERTAINMENT_AND_LEISURE',
    target_cluster: 'bacmyan',
    search_keywords: ['Học sinh sinh viên', 'Ưu đãi', 'Member', 'Thứ 4', 'Khuyến mãi', 'vé']
  },
  {
    lane: 'Lane 2: Cinema & Local Entertainment',
    candidate_id: 'CAND_190_11',
    brand: 'Starlight Cinema Đà Nẵng',
    title: 'Starlight Cinema Đà Nẵng — Ưu Đãi Vé Xem Phim & Học Sinh Sinh Viên',
    url: 'https://starlight.vn/khuyen-mai.html',
    hub_id: 'HUB_3_ENTERTAINMENT_AND_LEISURE',
    target_cluster: 'hoakhang',
    search_keywords: ['Học sinh', 'Sinh viên', 'Member Day', 'Giá vé', 'Khuyến mãi', 'ưu đãi']
  },
  {
    lane: 'Lane 2: Cinema & Local Entertainment',
    candidate_id: 'CAND_190_12',
    brand: 'Lotte Cinema',
    title: 'Lotte Cinema — Danh Sách Sự Kiện & Ưu Đãi Thành Viên',
    url: 'https://www.lottecinemavn.com/LCHS/Contents/Event/Event-List.aspx',
    hub_id: 'HUB_3_ENTERTAINMENT_AND_LEISURE',
    target_cluster: 'ALL',
    search_keywords: ['Học sinh sinh viên', 'U22', 'Cinema Day', 'Khuyến mãi', 'Ưu đãi', 'Sự kiện']
  },
  {
    lane: 'Lane 2: Cinema & Local Entertainment',
    candidate_id: 'CAND_190_13',
    brand: 'Bảo Tàng Điêu Khắc Chăm',
    title: 'Bảo Tàng Điêu Khắc Chăm Đà Nẵng — Chính Sách Vé Tham Quan',
    url: 'https://chammuseum.vn/',
    hub_id: 'HUB_3_ENTERTAINMENT_AND_LEISURE',
    target_cluster: 'haichau_thanhkhe',
    search_keywords: ['vé', 'học sinh', 'sinh viên', 'tham quan', 'bảo tàng', 'Đà Nẵng']
  },

  // --- LANE 3: F&B CHAINS ---
  {
    lane: 'Lane 3: F&B Chains',
    candidate_id: 'CAND_190_14',
    brand: 'KFC Vietnam',
    title: 'KFC Vietnam — Chương Trình Ưu Đãi & Khuyến Mãi Mới Nhất',
    url: 'https://kfcvietnam.com.vn/khuyen-mai',
    hub_id: 'HUB_1_FOOD_AND_DINING',
    target_cluster: 'ALL',
    search_keywords: ['Combo', 'Ưu đãi', 'Khuyến mãi', 'Giảm giá', 'Tiết kiệm', 'KFC']
  },
  {
    lane: 'Lane 3: F&B Chains',
    candidate_id: 'CAND_190_15',
    brand: 'Lotteria Vietnam',
    title: 'Lotteria Vietnam — Tổng Hợp Khuyến Mãi & Combo Ưu Đãi',
    url: 'https://www.lotteria.vn/promotions',
    hub_id: 'HUB_1_FOOD_AND_DINING',
    target_cluster: 'ALL',
    search_keywords: ['Khuyến mãi', 'Ưu đãi', 'Combo', 'Giảm giá', 'Tiết kiệm', 'Lotteria']
  },
  {
    lane: 'Lane 3: F&B Chains',
    candidate_id: 'CAND_190_16',
    brand: 'Jollibee Vietnam',
    title: 'Jollibee Vietnam — Khuyến Mãi & Combo Giá Tốt',
    url: 'https://jollibee.com.vn/khuyen-mai',
    hub_id: 'HUB_1_FOOD_AND_DINING',
    target_cluster: 'ALL',
    search_keywords: ['Khuyến mãi', 'Ưu đãi', 'Combo', 'Tiết kiệm', 'Món ngon', 'Jollibee']
  },
  {
    lane: 'Lane 3: F&B Chains',
    candidate_id: 'CAND_190_17',
    brand: 'Highlands Coffee',
    title: 'Highlands Coffee — Tin Tức Sự Kiện & Chương Trình Ưu Đãi',
    url: 'https://www.highlandscoffee.com.vn/vn/tin-tuc-su-kien.html',
    hub_id: 'HUB_2_COFFEE_AND_STUDY_SPACES',
    target_cluster: 'ALL',
    search_keywords: ['Ưu đãi', 'Khuyến mãi', 'Chương trình', 'Tin tức', 'Sự kiện', 'Highlands']
  },
  {
    lane: 'Lane 3: F&B Chains',
    candidate_id: 'CAND_190_18',
    brand: 'Phúc Long',
    title: 'Phúc Long Coffee & Tea — Tin Tức & Khuyến Mãi',
    url: 'https://phuclong.com.vn/tin-tuc-khuyen-mai',
    hub_id: 'HUB_2_COFFEE_AND_STUDY_SPACES',
    target_cluster: 'ALL',
    search_keywords: ['Khuyến mãi', 'Ưu đãi', 'Thành viên', 'Chương trình', 'Tin tức', 'Phúc Long']
  },

  // --- LANE 4: PUBLIC MOBILITY & CITY SERVICES ---
  {
    lane: 'Lane 4: Public Mobility & City Services',
    candidate_id: 'CAND_190_19',
    brand: 'DanaBus Đà Nẵng',
    title: 'DanaBus Đà Nẵng — Chính Sách Trợ Giá & Vé Tháng Xe Buýt Công Cộng',
    url: 'https://www.danangbus.vn/',
    hub_id: 'HUB_4_MOBILITY_AND_TRANSIT',
    target_cluster: 'ALL',
    search_keywords: ['Vé tháng', 'Trợ giá', 'Học sinh sinh viên', 'Xe buýt', 'Tuyến buýt', 'Đà Nẵng']
  },
  {
    lane: 'Lane 4: Public Mobility & City Services',
    candidate_id: 'CAND_190_20',
    brand: 'Đường Sắt Việt Nam (DSVN)',
    title: 'Đường Sắt Việt Nam — Chính Sách Giảm Giá Vé Tàu Học Sinh Sinh Viên',
    url: 'https://dsvn.vn/',
    hub_id: 'HUB_4_MOBILITY_AND_TRANSIT',
    target_cluster: 'ALL',
    search_keywords: ['Học sinh sinh viên', 'Giảm giá vé', 'Đối tượng chính sách', 'Vé tàu', 'Đường sắt']
  },
  {
    lane: 'Lane 4: Public Mobility & City Services',
    candidate_id: 'CAND_190_21',
    brand: 'TNGo Đà Nẵng',
    title: 'TNGo Đà Nẵng — Dịch Vụ Xe Đạp Công Cộng Đà Nẵng',
    url: 'https://tngo.vn/',
    hub_id: 'HUB_4_MOBILITY_AND_TRANSIT',
    target_cluster: 'haichau_thanhkhe',
    search_keywords: ['Xe đạp công cộng', 'Bảng giá', 'Thuê xe', 'Đà Nẵng', 'Gói cước', 'TNGo']
  }
];

async function runHarvestSprint() {
  console.log('========================================================================');
  console.log('🚀 JAYT-190: REAL SUPPLY HARVESTER & EVIDENCE BATCH ENGINE');
  console.log('   Timestamp: ' + new Date().toISOString());
  console.log('   Candidate Sources: ' + CANDIDATE_SOURCES.length);
  console.log('========================================================================\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const harvestResults = [];

  for (let i = 0; i < CANDIDATE_SOURCES.length; i++) {
    const cand = CANDIDATE_SOURCES[i];
    console.log(`[${i + 1}/${CANDIDATE_SOURCES.length}] [${cand.lane}] Harvesting: ${cand.brand} (${cand.url})`);

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    const result = {
      candidate_id: cand.candidate_id,
      lane: cand.lane,
      brand: cand.brand,
      title: cand.title,
      target_url: cand.url,
      hub_id: cand.hub_id,
      target_cluster: cand.target_cluster,
      status: 'REJECTED',
      rejection_reason: null,
      http_status: null,
      final_url: null,
      evidence_file: null,
      evidence_sha256: null,
      screenshot_file: null,
      screenshot_sha256: null,
      captured_at: new Date().toISOString(),
      extracted_quotes: [],
      offer_quote: null,
      tier: null
    };

    try {
      const response = await page.goto(cand.url, { waitUntil: 'domcontentloaded', timeout: 25000 });
      result.http_status = response ? response.status() : 200;
      result.final_url = page.url();

      if (result.http_status >= 400) {
        result.rejection_reason = 'HTTP_STATUS_' + result.http_status;
        console.log(`   ❌ HTTP Error ${result.http_status}`);
      } else {
        // Wait 2.5s for dynamic content
        await new Promise(r => setTimeout(r, 2500));

        const rawHtml = await page.content();
        const bodyText = await page.evaluate(() => document.body.innerText || '');
        
        const cleanBrand = cand.brand.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase();
        const fileNameHtml = `raw_leaf_${cand.candidate_id}_${cleanBrand}.html`;
        const fileNamePng = `shot_leaf_${cand.candidate_id}_${cleanBrand}.png`;

        const pathHtml = path.join(harvestDir, fileNameHtml);
        const pathPng = path.join(harvestDir, fileNamePng);

        fs.writeFileSync(pathHtml, rawHtml, 'utf8');
        await page.screenshot({ path: pathPng, fullPage: false });

        result.evidence_file = fileNameHtml;
        result.evidence_sha256 = sha256Buf(Buffer.from(rawHtml, 'utf8'));
        result.screenshot_file = fileNamePng;
        result.screenshot_sha256 = sha256Buf(fs.readFileSync(pathPng));

        // Extract verbatim quotes based on keywords
        const extracted = [];
        const lines = bodyText.split('\n').map(l => l.trim()).filter(l => l.length > 15 && l.length < 200);

        for (const kw of cand.search_keywords) {
          const found = lines.find(l => l.toLowerCase().includes(kw.toLowerCase()));
          if (found && !extracted.includes(found)) {
            extracted.push(found);
          }
        }

        result.extracted_quotes = extracted;

        if (extracted.length > 0) {
          result.offer_quote = extracted[0];
          result.status = 'QUALIFIED_TIER_2';
          result.tier = 'TIER_2_OFFICIAL_PROMOTION';
          console.log(`   ✅ QUALIFIED 🔵 Tier 2: "${extracted[0].substring(0, 70)}..."`);
        } else {
          result.status = 'REJECTED';
          result.rejection_reason = 'NO_VERBATIM_OFFER_QUOTE_FOUND';
          console.log(`   ⚠️ REJECTED: No promotion quote found in captured text.`);
        }
      }

    } catch (err) {
      result.status = 'REJECTED';
      result.rejection_reason = 'FETCH_FAILED: ' + err.message;
      console.log(`   ❌ Fetch Failed: ${err.message}`);
    } finally {
      await page.close();
    }

    harvestResults.push(result);
  }

  await browser.close();

  // Save Harvest Report
  const qualifiedTier2 = harvestResults.filter(r => r.status === 'QUALIFIED_TIER_2');
  const rejected = harvestResults.filter(r => r.status === 'REJECTED');

  const harvestReport = {
    batch_id: 'HARVEST_BATCH_190_' + Date.now(),
    timestamp: new Date().toISOString(),
    total_candidates: CANDIDATE_SOURCES.length,
    qualified_tier_2_count: qualifiedTier2.length,
    rejected_count: rejected.length,
    results: harvestResults
  };

  const reportPath = path.join(harvestDir, 'HARVEST_REPORT_190.json');
  fs.writeFileSync(reportPath, JSON.stringify(harvestReport, null, 2), 'utf8');

  console.log('\n========================================================================');
  console.log('📊 HARVEST BATCH 190 SUMMARY:');
  console.log(`   Total Candidates Attempted: ${CANDIDATE_SOURCES.length}`);
  console.log(`   🔵 Qualified Tier 2 Promos: ${qualifiedTier2.length}`);
  console.log(`   ❌ Rejected Candidates:     ${rejected.length}`);
  console.log(`   📄 Report File:             ${path.relative(repoRoot, reportPath)}`);
  console.log('========================================================================\n');

  return harvestReport;
}

if (require.main === module) {
  runHarvestSprint().catch(err => {
    console.error('Fatal Harvest Error:', err);
    process.exit(1);
  });
}

module.exports = { runHarvestSprint };

