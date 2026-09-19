const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const puppeteer = require('puppeteer');
const { validateSemanticQuotes } = require('./semantic_evidence_validator_180');

const repoRoot = path.resolve(__dirname, '..');
const harvestDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_181_harvest');
if (!fs.existsSync(harvestDir)) fs.mkdirSync(harvestDir, { recursive: true });

function sha256Buf(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }
function sha256Str(str) { return crypto.createHash('sha256').update(str, 'utf8').digest('hex'); }

const wave2Targets = [
  // COHORT 1: ONLINE / STUDENT DIGITAL INFRASTRUCTURE
  {
    target_id: 'W2_MS365_EDU',
    brand: 'Microsoft 365 Education',
    category: 'STUDENT_BENEFIT',
    hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES',
    url: 'https://www.microsoft.com/vi-vn/education/products/office',
    quote_candidates: {
      offer_patterns: [/miễn phí/i, /free/i, /0đ/i, /dùng thử/i],
      terms_patterns: [/sinh viên/i, /học sinh/i, /giáo viên/i, /email trường/i, /hợp lệ/i],
      validity_patterns: [/trong suốt thời gian/i, /hằng năm/i, /thời gian học/i, /1 năm/i, /30 ngày/i],
      scope_patterns: [/trường học/i, /Việt Nam/i, /toàn cầu/i, /VN/i, /giáo dục/i]
    }
  },
  {
    target_id: 'W2_FIGMA_EDU',
    brand: 'Figma for Education',
    category: 'STUDENT_BENEFIT',
    hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES',
    url: 'https://www.figma.com/education/',
    quote_candidates: {
      offer_patterns: [/free/i, /miễn phí/i, /Professional plan for free/i],
      terms_patterns: [/students and educators/i, /student/i, /verify/i, /accredited/i],
      validity_patterns: [/for 2 years/i, /renewable/i, /duration of studies/i, /while enrolled/i],
      scope_patterns: [/k-12/i, /higher education/i, /universities/i, /schools/i]
    }
  },
  {
    target_id: 'W2_AUTODESK_EDU',
    brand: 'Autodesk Education',
    category: 'STUDENT_BENEFIT',
    hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES',
    url: 'https://www.autodesk.com/education/edu-software/overview',
    quote_candidates: {
      offer_patterns: [/free access/i, /free educational access/i, /miễn phí/i],
      terms_patterns: [/students and educators/i, /confirm your eligibility/i, /enrolled/i],
      validity_patterns: [/1-year renewable/i, /1-year/i, /annual/i, /12 months/i],
      scope_patterns: [/qualified educational institutions/i, /accredited/i, /educational/i]
    }
  },
  {
    target_id: 'W2_NOTION_EDU',
    brand: 'Notion for Education',
    category: 'STUDENT_BENEFIT',
    hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES',
    url: 'https://www.notion.so/product/notion-for-education',
    quote_candidates: {
      offer_patterns: [/free Plus plan/i, /free/i, /miễn phí/i, /100% free/i],
      terms_patterns: [/school email address/i, /students and educators/i, /student/i],
      validity_patterns: [/as long as you are enrolled/i, /duration/i, /unlimited/i],
      scope_patterns: [/accredited colleges/i, /universities/i, /students/i]
    }
  },
  {
    target_id: 'W2_CANVA_EDU',
    brand: 'Canva for Education',
    category: 'STUDENT_BENEFIT',
    hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES',
    url: 'https://www.canva.com/vi_vn/giao-duc/',
    quote_candidates: {
      offer_patterns: [/100% miễn phí/i, /miễn phí/i, /free/i],
      terms_patterns: [/giáo viên và học sinh/i, /trường học/i, /đủ điều kiện/i],
      validity_patterns: [/hằng năm/i, /trong suốt/i, /vĩnh viễn/i],
      scope_patterns: [/k12/i, /trường học/i, /Việt Nam/i]
    }
  },
  {
    target_id: 'W2_APPLE_MUSIC_EDU',
    brand: 'Apple Music Student',
    category: 'STUDENT_BENEFIT',
    hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES',
    url: 'https://www.apple.com/vn/apple-music/',
    quote_candidates: {
      offer_patterns: [/giá ưu đãi/i, /35.000/i, /dùng thử miễn phí/i, /tháng/i],
      terms_patterns: [/sinh viên đại học/i, /xác minh/i, /UNiDAYS/i],
      validity_patterns: [/tối đa 48 tháng/i, /48 tháng/i, /hằng tháng/i],
      scope_patterns: [/Việt Nam/i, /VN/i, /đại học/i]
    }
  },

  // COHORT 2: CINEMA LEAVES IN DA NANG
  {
    target_id: 'W2_CGV_U22_DANANG',
    brand: 'CGV Đà Nẵng (U22)',
    category: 'CINEMA_STUDENT',
    hub_id: 'HUB_3_WEEKEND_ENTERTAINMENT',
    url: 'https://www.cgv.vn/default/movies/u22.html',
    quote_candidates: {
      offer_patterns: [/đồng giá/i, /55.000/i, /65.000/i, /vé xem phim/i, /ưu đãi/i],
      terms_patterns: [/thành viên U22/i, /từ 12 đến 22 tuổi/i, /CMND/i, /thẻ HSSV/i],
      validity_patterns: [/tất cả các ngày trong tuần/i, /từ thứ 2 đến chủ nhật/i, /2026/i],
      scope_patterns: [/Đà Nẵng/i, /toàn quốc/i, /cụm rạp CGV/i, /Vincom Đà Nẵng/i]
    }
  },
  {
    target_id: 'W2_CGV_CULTURE_DAY',
    brand: 'CGV Culture Day',
    category: 'CINEMA_STUDENT',
    hub_id: 'HUB_3_WEEKEND_ENTERTAINMENT',
    url: 'https://www.cgv.vn/default/culture-day',
    quote_candidates: {
      offer_patterns: [/đồng giá/i, /50.000/i, /60.000/i, /vé 2D/i],
      terms_patterns: [/thứ Tư cuối cùng/i, /áp dụng cho mọi khách hàng/i, /tất cả suất chiếu/i],
      validity_patterns: [/thứ 4 cuối cùng của tháng/i, /trong ngày/i],
      scope_patterns: [/tất cả các rạp CGV/i, /toàn quốc/i, /Đà Nẵng/i]
    }
  },
  {
    target_id: 'W2_GALAXY_DANANG_PRICING',
    brand: 'Galaxy Cinema Đà Nẵng',
    category: 'CINEMA_STUDENT',
    hub_id: 'HUB_3_WEEKEND_ENTERTAINMENT',
    url: 'https://www.galaxycine.vn/rap-gia-ve/galaxy-da-nang',
    quote_candidates: {
      offer_patterns: [/giá vé HSSV/i, /U22/i, /45.000/i, /50.000/i, /55.000/i],
      terms_patterns: [/xuất trình thẻ HSSV/i, /dưới 22 tuổi/i, /thành viên/i],
      validity_patterns: [/thứ 2 đến thứ 6/i, /ngày thường/i, /mọi khung giờ/i],
      scope_patterns: [/Galaxy Đà Nẵng/i, /Đà Nẵng/i, /Coop Mart Đà Nẵng/i]
    }
  },
  {
    target_id: 'W2_STARLIGHT_DANANG_MEMBER',
    brand: 'Starlight Cinema Đà Nẵng',
    category: 'CINEMA_STUDENT',
    hub_id: 'HUB_3_WEEKEND_ENTERTAINMENT',
    url: 'https://starlight.vn/khuyen-mai/ngay-hoi-thanh-vien-happy-day.html',
    quote_candidates: {
      offer_patterns: [/đồng giá/i, /45.000/i, /50.000/i, /vé 2D/i],
      terms_patterns: [/thành viên Starlight/i, /thứ 3 hàng tuần/i, /thẻ thành viên/i],
      validity_patterns: [/thứ 3 hàng tuần/i, /áp dụng cả ngày/i],
      scope_patterns: [/Starlight Đà Nẵng/i, /Đà Nẵng/i, /toàn hệ thống/i]
    }
  },

  // COHORT 3: F&B DA NANG CHAINS
  {
    target_id: 'W2_JOLLIBEE_PROMO',
    brand: 'Jollibee Vietnam',
    category: 'FOOD_AND_BEVERAGE',
    hub_id: 'HUB_1_BUDGET_DINING',
    url: 'https://jollibee.com.vn/thuc-don/combo-tiet-kiem',
    quote_candidates: {
      offer_patterns: [/combo/i, /tiết kiệm/i, /chỉ từ/i, /giá/i, /35.000/i, /40.000/i, /45.000/i, /50.000/i],
      terms_patterns: [/áp dụng khi mua/i, /tại cửa hàng/i, /giao hàng/i],
      validity_patterns: [/hằng ngày/i, /trong ngày/i, /theo chương trình/i],
      scope_patterns: [/toàn quốc/i, /Đà Nẵng/i, /cửa hàng Jollibee/i]
    }
  },
  {
    target_id: 'W2_LOTTERIA_COMBO',
    brand: 'Lotteria Vietnam',
    category: 'FOOD_AND_BEVERAGE',
    hub_id: 'HUB_1_BUDGET_DINING',
    url: 'https://www.lotteria.vn/thuc-don/combo-1-nguoi',
    quote_candidates: {
      offer_patterns: [/combo/i, /chỉ từ/i, /giá/i, /38.000/i, /45.000/i, /55.000/i],
      terms_patterns: [/áp dụng tại cửa hàng/i, /đặt online/i, /thành viên/i],
      validity_patterns: [/hằng ngày/i, /theo thực đơn/i],
      scope_patterns: [/Đà Nẵng/i, /toàn quốc/i, /hệ thống Lotteria/i]
    }
  },
  {
    target_id: 'W2_HIGHLANDS_COMBO',
    brand: 'Highlands Coffee',
    category: 'FOOD_AND_BEVERAGE',
    hub_id: 'HUB_2_STUDY_COFFEE',
    url: 'https://www.highlandscoffee.com.vn/vn/tin-tuc-su-kien.html',
    quote_candidates: {
      offer_patterns: [/combo/i, /ưu đãi/i, /giảm/i, /tặng/i, /chỉ từ/i, /29.000/i, /39.000/i],
      terms_patterns: [/áp dụng tại quán/i, /thẻ thành viên/i, /khi mua/i],
      validity_patterns: [/hằng ngày/i, /khung giờ/i, /theo chương trình/i],
      scope_patterns: [/Đà Nẵng/i, /toàn quốc/i, /quán Highlands/i]
    }
  }
];

async function runWave2Harvest() {
  console.log('========================================================================');
  console.log('🌊 JAYT-181: WAVE-2 DEEP LEAF-PAGE HARVEST ENGINE');
  console.log('   Timestamp: ' + new Date().toISOString());
  console.log('   Targets:   ' + wave2Targets.length + ' deep leaf pages');
  console.log('========================================================================\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });

  const harvestManifest = [];
  const qualifiedDeals = [];
  const rejectedDeals = [];

  for (let i = 0; i < wave2Targets.length; i++) {
    const t = wave2Targets[i];
    console.log('[TARGET ' + (i + 1) + '/' + wave2Targets.length + '] 🎯 Scanning: ' + t.brand + ' -> ' + t.url);

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    try {
      const resp = await page.goto(t.url, { waitUntil: 'networkidle2', timeout: 25000 });
      const status = resp ? resp.status() : 0;
      await new Promise(r => setTimeout(r, 2000));

      const rawHtml = await page.content();
      const bodyText = await page.evaluate(() => document.body.innerText || '');

      const htmlFileName = 'raw_leaf_' + t.target_id + '.html';
      const shotFileName = 'shot_leaf_' + t.target_id + '.png';
      const htmlPath = path.join(harvestDir, htmlFileName);
      const shotPath = path.join(harvestDir, shotFileName);

      fs.writeFileSync(htmlPath, rawHtml, 'utf8');
      await page.screenshot({ path: shotPath, fullPage: false });

      const htmlSha = sha256Buf(fs.readFileSync(htmlPath));
      const shotSha = sha256Buf(fs.readFileSync(shotPath));

      console.log('   HTTP ' + status + ' | HTML: ' + rawHtml.length + ' bytes (SHA: ' + htmlSha.slice(0, 12) + '...) | Screenshot saved.');

      // Semantic Quote Extraction
      const lines = bodyText.split('\n').map(l => l.trim()).filter(l => l.length > 5 && l.length < 250);
      
      let offerQuote = '';
      let termsQuote = '';
      let validityQuote = '';
      let scopeQuote = '';

      for (const line of lines) {
        if (!offerQuote && t.quote_candidates.offer_patterns.some(p => p.test(line))) {
          offerQuote = line;
        } else if (!termsQuote && t.quote_candidates.terms_patterns.some(p => p.test(line))) {
          termsQuote = line;
        } else if (!validityQuote && t.quote_candidates.validity_patterns.some(p => p.test(line))) {
          validityQuote = line;
        } else if (!scopeQuote && t.quote_candidates.scope_patterns.some(p => p.test(line))) {
          scopeQuote = line;
        }
      }

      const candidateRecord = {
        deal_id: 'DEAL_W2_' + t.target_id,
        brand: t.brand,
        title: t.brand + ' — ' + (offerQuote || 'Ưu đãi chính thức'),
        offer_quote: offerQuote,
        terms_quote: termsQuote,
        validity_quote: validityQuote,
        scope_quote: scopeQuote,
        benefit_summary: offerQuote,
        terms: termsQuote,
        freshness_sla: validityQuote,
        hub_id: t.hub_id,
        target_cluster: 'ALL',
        action_url: t.url,
        source_url: t.url,
        evidence_file: htmlFileName,
        evidence_sha256: htmlSha,
        screenshot_file: shotFileName,
        captured_at: new Date().toISOString(),
        reliability_tier: 'TIER_1_VERIFIED_PROOF_DEAL',
        tier_badge: '🟢 ĐÃ ĐỐI SOÁT'
      };

      // Semantic Validation
      const hasAllQuotes = !!(offerQuote && termsQuote && validityQuote && scopeQuote);
      const semResult = hasAllQuotes ? validateSemanticQuotes(candidateRecord) : { is_valid: false, issues: ['MISSING_ONE_OR_MORE_QUOTES'] };

      const manifestEntry = {
        target_id: t.target_id,
        brand: t.brand,
        url: t.url,
        http_status: status,
        html_file: htmlFileName,
        html_sha256: htmlSha,
        screenshot_file: shotFileName,
        screenshot_sha256: shotSha,
        captured_at: new Date().toISOString(),
        quotes_extracted: {
          offer_quote: offerQuote,
          terms_quote: termsQuote,
          validity_quote: validityQuote,
          scope_quote: scopeQuote
        },
        has_all_4_quotes: hasAllQuotes,
        semantic_gate_valid: semResult.is_valid,
        semantic_issues: semResult.issues || []
      };

      harvestManifest.push(manifestEntry);

      if (hasAllQuotes && semResult.is_valid) {
        console.log('   🟢 [QUALIFIED TIER 1]: All 4 semantic quotes passed gate.');
        qualifiedDeals.push(candidateRecord);
      } else {
        console.log('   🟣 [REJECTED FROM 🟢]: ' + (semResult.issues ? semResult.issues.join(', ') : 'Incomplete 4-quotes'));
        rejectedDeals.push(manifestEntry);
      }

    } catch (err) {
      console.log('   ❌ ERROR: ' + err.message);
      harvestManifest.push({
        target_id: t.target_id,
        brand: t.brand,
        url: t.url,
        error: err.message,
        semantic_gate_valid: false
      });
    } finally {
      await page.close();
    }
  }

  await browser.close();

  const manifestPath = path.join(harvestDir, 'WAVE2_HARVEST_181_MANIFEST.json');
  fs.writeFileSync(manifestPath, JSON.stringify({
    session_id: 'HARVEST_WAVE2_' + Date.now(),
    timestamp: new Date().toISOString(),
    total_scanned: wave2Targets.length,
    qualified_count: qualifiedDeals.length,
    rejected_count: rejectedDeals.length,
    targets: harvestManifest
  }, null, 2), 'utf8');

  console.log('\n========================================================================');
  console.log('📊 WAVE-2 HARVEST SUMMARY:');
  console.log('   Total Leaf Targets Scanned: ' + wave2Targets.length);
  console.log('   🟢 New Semantic Qualified: ' + qualifiedDeals.length);
  console.log('   🟣 Rejected (Incomplete):    ' + rejectedDeals.length);
  console.log('   Manifest saved to: ' + manifestPath);
  console.log('========================================================================\n');

  return { qualifiedDeals, rejectedDeals, harvestManifest };
}

if (require.main === module) {
  runWave2Harvest().catch(err => {
    console.error('Fatal wave 2 error:', err);
    process.exit(1);
  });
}

module.exports = { runWave2Harvest };
