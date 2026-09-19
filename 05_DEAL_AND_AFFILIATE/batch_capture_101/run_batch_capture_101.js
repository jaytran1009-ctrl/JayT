const fs = require('fs');
const path = require('path');
const { captureVenueProvenance } = require('../safe_provenance_collector_100.js');

const TARGETS_101 = [
  {
    id: 'TARGET_101_METIZ_OFFICIAL',
    venueName: 'Metiz Cinema Đà Nẵng',
    url: 'https://metiz.vn/',
    sector: 'CINEMA'
  },
  {
    id: 'TARGET_101_GALAXY_DANANG_OFFICIAL',
    venueName: 'Galaxy Cinema Đà Nẵng',
    url: 'https://galaxycine.vn/rap-gia-ve/galaxy-da-nang/',
    sector: 'CINEMA'
  },
  {
    id: 'TARGET_101_PHELA_OFFICIAL',
    venueName: 'Phê La Vietnam',
    url: 'https://phela.vn/',
    sector: 'COFFEE_TEA'
  },
  {
    id: 'TARGET_101_GONGCHA_OFFICIAL',
    venueName: 'Gong Cha Vietnam',
    url: 'https://gongcha.com.vn/',
    sector: 'COFFEE_TEA'
  },
  {
    id: 'TARGET_101_JOLLIBEE_OFFICIAL',
    venueName: 'Jollibee Vietnam',
    url: 'https://jollibee.com.vn/',
    sector: 'FNB_FASTFOOD'
  }
];

async function run() {
  console.log('🚀 [BATCH-101] Bắt đầu chạy Controlled Live Provenance Capture (5 URL Chính Thức)...');

  const outputDir = path.resolve(__dirname, 'captures_101');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const batchResults = {
    batch_id: 'BATCH_101_CONTROLLED_LIVE_CAPTURE',
    executed_at: new Date().toISOString(),
    collector_engine: 'safe_provenance_collector_100.js',
    invariants_enforced: {
      authentic_http_response: true,
      non_empty_dom: true,
      non_empty_text: true,
      authentic_screenshot: true,
      zero_synthetic_fallback: true
    },
    targets_total: TARGETS_101.length,
    authenticated_count: 0,
    failed_count: 0,
    results: []
  };

  for (const target of TARGETS_101) {
    console.log(`\n⏳ [CAPTURE] Đang kết nối tới ${target.id} (${target.venueName}): ${target.url}`);
    const res = await captureVenueProvenance(target, outputDir, { timeoutMs: 30000 });

    if (res.success) {
      console.log(`  ✅ [PASS] CAPTURE_AUTHENTICATED: ${target.id}`);
      batchResults.authenticated_count++;
      batchResults.results.push({
        target_id: target.id,
        venue_name: target.venueName,
        url: target.url,
        status: 'CAPTURE_AUTHENTICATED',
        receipt: res.receipt
      });
    } else {
      console.warn(`  ⚠️ [FAIL-CLOSED] FAILED_CAPTURE: ${target.id} - Lỗi: ${res.error}`);
      batchResults.failed_count++;
      batchResults.results.push({
        target_id: target.id,
        venue_name: target.venueName,
        url: target.url,
        status: 'FAILED_CAPTURE',
        error: res.error,
        receipt: res.receipt
      });
    }
  }

  const summaryPath = path.join(__dirname, 'batch_101_summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify(batchResults, null, 2), 'utf8');

  console.log('\n======================================================');
  console.log(`🏁 [BATCH-101-COMPLETE] Hoàn tất: ${batchResults.authenticated_count} AUTHENTICATED / ${batchResults.failed_count} FAILED`);
  console.log(`📄 Summary: ${summaryPath}`);
}

run().catch(err => {
  console.error('❌ Lỗi thực thi Batch 101:', err);
  process.exit(1);
});
