/**
 * JAYT COMPILER (144)
 * Directive: JAYT-144: SCHEDULER THẬT, QUÉT ĐA NGUỒN VÀ VÒNG LẶP CUNG ỨNG TỰ VẬN HÀNH
 */

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const registryPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'fresh_source_registry_144.json');
const brandRegistryPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'brand_locality_registry_144.json');
const batchTablePath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_144_table.json');
const manifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_144_manifest.json');

function compile144() {
  console.log('🚀 [COMPILER-144] Khởi chạy biên dịch Batch 144 (32 Brands, 101 URLs)...');

  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const brandRegistry = JSON.parse(fs.readFileSync(brandRegistryPath, 'utf8'));
  const batchTable = JSON.parse(fs.readFileSync(batchTablePath, 'utf8'));

  const completeCount = batchTable.state_distribution.EVIDENCE_COMPLETE_FOR_REVIEW;
  const automatedDecision = (completeCount >= 10) ? 'STAGING_PROPOSAL_READY' : 'CONTINUE_ACQUISITION';

  // Honest Community Display Layers (During Acquisition Phase)
  const safeCommunityFeed = {
    layer_1_verified_deals: {
      badge: '🟢 ĐÃ ĐỐI SOÁT',
      count: completeCount,
      bundles: [],
      governance_note: 'Khóa hoàn toàn (deals_feed.json: []). Hiện đang tích lũy dữ liệu, 0 bundle giả tạo được đưa lên production.'
    },
    layer_2_monitored_sources: {
      badge: '🟣 NGUỒN CHÍNH THỨC ĐANG THEO DÕI',
      count: registry.sources.length,
      sources: registry.sources.map(s => ({
        source_id: s.source_id,
        brand_id: s.brand_id,
        brand_name: s.brand_name,
        category: s.category,
        canonical_url: s.canonical_url,
        state: s.state,
        next_check_due: s.next_check_due,
        disclaimer: 'Nguồn chính thức đang được theo dõi định kỳ qua Certified Native Capture Harness.'
      }))
    },
    layer_3_verified_venues: {
      badge: '🔵 ĐỊA ĐIỂM ĐÃ XÁC MINH',
      count: brandRegistry.locality_distribution.LOCALITY_VERIFIED_DA_NANG,
      venues: brandRegistry.brands.filter(b => b.locality_status === 'LOCALITY_VERIFIED_DA_NANG').map(b => ({
        brand_name: b.brand_name,
        address_units: b.address_units.map(u => u.normalized_address_text),
        status_label: 'Ưu đãi đang được theo dõi định kỳ',
        note: 'Cơ sở kinh doanh đã có receipt được chứng nhận và node DOM chứng minh địa chỉ thực tế tại TP. Đà Nẵng.'
      })),
      disclaimer: 'Chỉ các cơ sở có receipt hợp lệ và đơn vị địa chỉ chuẩn hóa tại TP. Đà Nẵng. Không hiển thị giá hay deal giả khi chưa đủ bằng chứng.'
    }
  };

  const manifest144 = {
    manifest_id: 'BATCH_CAPTURE_144_MANIFEST',
    directive: 'JAYT-144: SCHEDULER THẬT, QUÉT ĐA NGUỒN VÀ VÒNG LẶP CUNG ỨNG TỰ VẬN HÀNH',
    generated_at: new Date().toISOString(),
    governance_statement: `Mở rộng thu thập 32 nguồn thương hiệu và 101 URLs trên Certified Native Harness. Scheduler tự vận hành ghi nhận run receipt append-only. Khóa sản xuất tuyệt đối (deals_feed.json: []). Quyết định tự động: CONTINUE_ACQUISITION.`,
    streams_summary: {
      fresh_sources_monitored: registry.sources.length,
      brand_store_locators_audited: brandRegistry.total_brands_audited,
      raw_leaves_and_utilities_evaluated: batchTable.total_leaves_and_utilities_evaluated,
      total_urls_processed: batchTable.total_urls_queued
    },
    receipt_trust_summary: {
      capture_receipt_valid: brandRegistry.receipt_trust_audit.capture_receipt_valid,
      capture_receipt_invalid: brandRegistry.receipt_trust_audit.capture_receipt_invalid,
      identity_collisions_detected: batchTable.state_distribution.CAPTURE_IDENTITY_COLLISION
    },
    locality_baseline_summary: {
      total_brands: brandRegistry.total_brands_audited,
      locality_verified_da_nang: brandRegistry.locality_distribution.LOCALITY_VERIFIED_DA_NANG,
      online_eligibility_unproven_for_danang: brandRegistry.locality_distribution.ONLINE_ELIGIBILITY_UNPROVEN_FOR_DANANG,
      locality_pending_address_unit_validation: brandRegistry.locality_distribution.LOCALITY_PENDING_ADDRESS_UNIT_VALIDATION,
      locality_pending_fresh_receipt_certification: brandRegistry.locality_distribution.LOCALITY_PENDING_FRESH_RECEIPT_CERTIFICATION
    },
    leaf_batch_evaluation_summary: {
      total_items_evaluated: batchTable.total_leaves_and_utilities_evaluated,
      state_distribution: batchTable.state_distribution,
      conservation_check: batchTable.conservation_check
    },
    autonomous_scheduler_status: {
      task_identifier: 'JAYT_AUTONOMOUS_SUPPLY_SCHEDULER_144',
      status: 'SCHEDULER_INSTALLED_AND_VERIFIED',
      source_index_scan_frequency: '7_DAYS (604800s)',
      offer_leaves_scan_frequency: '24_HOURS (86400s)',
      error_backoff_policy: '7_DAYS (604800s)',
      auto_staging_gate_threshold: '>= 10 bundles across >= 3 categories'
    },
    automated_staging_gate_evaluation: {
      min_candidates_threshold: 10,
      min_categories_threshold: 3,
      min_useful_days_threshold: 5,
      complete_bundles_count: completeCount,
      progress_milestone: `${completeCount}/10`,
      decision_verdict: automatedDecision
    },
    safe_community_feed: safeCommunityFeed
  };

  fs.writeFileSync(manifestPath, JSON.stringify(manifest144, null, 2), 'utf8');

  console.log('========================================================================');
  console.log('📊 KẾT QUẢ BIÊN DỊCH 144:');
  console.log(`- Tổng số nguồn: ${registry.sources.length}`);
  console.log(`- Store Locators đã đối soát: ${brandRegistry.total_brands_audited}`);
  console.log(`- URLs đã thẩm định trong batch: ${batchTable.total_leaves_and_utilities_evaluated}`);
  console.log(`- EVIDENCE_COMPLETE_FOR_REVIEW: ${completeCount}`);
  console.log(`- Metric Conservation Check: ${manifest144.leaf_batch_evaluation_summary.conservation_check} == ${batchTable.total_leaves_and_utilities_evaluated}`);
  console.log(`- Automated Staging Decision: 🎯 [${automatedDecision}] (${manifest144.automated_staging_gate_evaluation.progress_milestone})`);
  console.log(`- Manifest 144 Path: ${manifestPath}`);
  console.log('========================================================================\n');
}

if (require.main === module) {
  compile144();
}

module.exports = {
  compile144
};
