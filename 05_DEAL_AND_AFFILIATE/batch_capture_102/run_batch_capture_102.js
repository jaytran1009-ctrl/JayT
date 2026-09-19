const fs = require('fs');
const path = require('path');
const { captureVenueProvenance } = require('../safe_provenance_collector_100.js');

const TARGETS_102 = [
  // 1-5: Rạp chiếu phim & Chính sách
  { id: 'TARGET_102_CGV_VINCOM_DNG', venueName: 'CGV Vincom Đà Nẵng', url: 'https://www.cgv.vn/default/cinox/site/cgv-vincom-da-nang', sector: 'CINEMA' },
  { id: 'TARGET_102_CGV_VINH_TRUNG', venueName: 'CGV Vĩnh Trung Plaza', url: 'https://www.cgv.vn/default/cinox/site/cgv-vinh-trung-plaza', sector: 'CINEMA' },
  { id: 'TARGET_102_CGV_MEMBERSHIP', venueName: 'CGV Membership Policy', url: 'https://www.cgv.vn/default/membership', sector: 'CINEMA' },
  { id: 'TARGET_102_GALAXY_DANANG', venueName: 'Galaxy Cinema Đà Nẵng', url: 'https://galaxycine.vn/rap-gia-ve/galaxy-da-nang/', sector: 'CINEMA' },
  { id: 'TARGET_102_GALAXY_POLICY', venueName: 'Galaxy Cinema Policy 2026', url: 'https://galaxycine.vn/chinh-sach-thanh-vien-2026', sector: 'CINEMA' },
  { id: 'TARGET_102_METIZ_POLICY', venueName: 'Metiz Cinema Member Policy', url: 'https://metiz.vn/policy/chinh-sach-thanh-vien-3.html', sector: 'CINEMA' },
  { id: 'TARGET_102_METIZ_HOME', venueName: 'Metiz Cinema Đà Nẵng Home', url: 'https://metiz.vn/', sector: 'CINEMA' },
  { id: 'TARGET_102_LOTTE_CINEMA_DNG', venueName: 'Lotte Cinema Đà Nẵng', url: 'https://www.lottecinemavn.com/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=4&cinemaID=5001', sector: 'CINEMA' },

  // 6-15: Cà phê & Trà sữa
  { id: 'TARGET_102_PHELA_HOME', venueName: 'Phê La Vietnam', url: 'https://phela.vn/', sector: 'COFFEE_TEA' },
  { id: 'TARGET_102_GONGCHA_HOME', venueName: 'Gong Cha Vietnam', url: 'https://gongcha.com.vn/', sector: 'COFFEE_TEA' },
  { id: 'TARGET_102_GONGCHA_STORES', venueName: 'Gong Cha Cửa Hàng', url: 'https://gongcha.com.vn/cua-hang/', sector: 'COFFEE_TEA' },
  { id: 'TARGET_102_HIGHLANDS_HOME', venueName: 'Highlands Coffee Home', url: 'https://www.highlandscoffee.com.vn/', sector: 'COFFEE_TEA' },
  { id: 'TARGET_102_HIGHLANDS_STORES', venueName: 'Highlands Coffee Hệ Thống', url: 'https://www.highlandscoffee.com.vn/vn/he-thong-cua-hang.html', sector: 'COFFEE_TEA' },
  { id: 'TARGET_102_PHUCLONG_STORES', venueName: 'Phúc Long Hệ Thống', url: 'https://phuclong.com.vn/he-thong-cua-hang', sector: 'COFFEE_TEA' },
  { id: 'TARGET_102_THECOFFEEHOUSE_STORES', venueName: 'The Coffee House Danh Sách', url: 'https://thecoffeehouse.com/pages/danh-sach-cua-hang', sector: 'COFFEE_TEA' },
  { id: 'TARGET_102_KATINAT_HOME', venueName: 'Katinat Saigon Kafe Home', url: 'https://katinat.vn/', sector: 'COFFEE_TEA' },
  { id: 'TARGET_102_TOCOTOCO_STORES', venueName: 'TocoToco Danh Sách Cửa Hàng', url: 'https://tocotocotea.com/danh-sach-cua-hang/', sector: 'COFFEE_TEA' },
  { id: 'TARGET_102_MIXUE_HOME', venueName: 'Mixue Vietnam', url: 'https://www.mxbc.vn/', sector: 'COFFEE_TEA' },

  // 16-25: F&B / Fastfood / Chuỗi tiện lợi
  { id: 'TARGET_102_JOLLIBEE_HOME', venueName: 'Jollibee Vietnam Home', url: 'https://jollibee.com.vn/', sector: 'FNB_FASTFOOD' },
  { id: 'TARGET_102_JOLLIBEE_STORES', venueName: 'Jollibee Danh Sách Cửa Hàng', url: 'https://jollibee.com.vn/cua-hang', sector: 'FNB_FASTFOOD' },
  { id: 'TARGET_102_DOMINOS_HOME', venueName: 'Domino\'s Pizza Vietnam', url: 'https://dominos.vn/', sector: 'FNB_FASTFOOD' },
  { id: 'TARGET_102_DOMINOS_STORES', venueName: 'Domino\'s Cửa Hàng', url: 'https://dominos.vn/cua-hang', sector: 'FNB_FASTFOOD' },
  { id: 'TARGET_102_KFC_STORES', venueName: 'KFC Vietnam Nhà Hàng', url: 'https://kfcvietnam.com.vn/he-thong-nha-hang-kfc', sector: 'FNB_FASTFOOD' },
  { id: 'TARGET_102_LOTTERIA_STORES', venueName: 'Lotteria Cửa Hàng', url: 'https://www.lotteria.vn/store/', sector: 'FNB_FASTFOOD' },
  { id: 'TARGET_102_COOPMART_DANANG', venueName: 'Co.opmart Đà Nẵng', url: 'https://co-opmart.com.vn/he-thong-coop-mart/', sector: 'RETAIL' }
];

async function run() {
  console.log(`🚀 [BATCH-102] Bắt đầu Controlled Live Provenance Capture trên ${TARGETS_102.length} URL chính thức...`);

  const outputDir = path.resolve(__dirname, 'captures_102');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const batchResults = {
    batch_id: 'BATCH_102_COMPREHENSIVE_LIVE_CAPTURE',
    executed_at: new Date().toISOString(),
    collector_engine: 'safe_provenance_collector_100.js',
    invariants_enforced: {
      authentic_http_response: true,
      non_empty_dom: true,
      non_empty_text: true,
      authentic_screenshot: true,
      zero_synthetic_fallback: true
    },
    targets_total: TARGETS_102.length,
    authenticated_count: 0,
    failed_count: 0,
    results: []
  };

  for (let i = 0; i < TARGETS_102.length; i++) {
    const target = TARGETS_102[i];
    console.log(`\n[${i + 1}/${TARGETS_102.length}] ⏳ Đang quét: ${target.id} (${target.venueName}) -> ${target.url}`);
    
    const res = await captureVenueProvenance(target, outputDir, { timeoutMs: 25000 });
    if (res.success) {
      console.log(`  ✅ [PASS] CAPTURE_AUTHENTICATED: ${target.id}`);
      batchResults.authenticated_count++;
      batchResults.results.push({
        target_id: target.id,
        venue_name: target.venueName,
        url: target.url,
        sector: target.sector,
        status: 'CAPTURE_AUTHENTICATED',
        receipt: res.receipt
      });
    } else {
      console.warn(`  ⚠️ [FAIL-CLOSED] FAILED_CAPTURE: ${target.id} - ${res.error}`);
      batchResults.failed_count++;
      batchResults.results.push({
        target_id: target.id,
        venue_name: target.venueName,
        url: target.url,
        sector: target.sector,
        status: 'FAILED_CAPTURE',
        error: res.error,
        receipt: res.receipt
      });
    }
  }

  const summaryPath = path.join(__dirname, 'batch_102_summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify(batchResults, null, 2), 'utf8');

  console.log('\n======================================================');
  console.log(`🏁 [BATCH-102-COMPLETE] Hoàn tất: ${batchResults.authenticated_count} AUTHENTICATED / ${batchResults.failed_count} FAILED`);
  console.log(`📄 Summary: ${summaryPath}`);
}

run().catch(err => {
  console.error('❌ Lỗi thực thi Batch 102:', err);
  process.exit(1);
});
