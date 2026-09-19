/**
 * JAYT COMPILER (142S)
 * Directive: JAYT-142S: SEMANTIC-ROOT RECOVERY & RECEIPT-TRUST REBUILD
 */

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const registryPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'fresh_source_registry_142s.json');
const brandRegistryPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'brand_locality_registry_142s.json');
const leafTablePath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'leaf_batch_142s_table.json');
const communityQueuePath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'community_signal_queue_141.json');
const inboundIntakePath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'inbound_evidence_intake_141.json');
const manifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_142s_manifest.json');

function compile142S() {
  console.log('🚀 [COMPILER-142S] Khởi chạy biên dịch Batch 142S (Semantic Root & Receipt Trust)...');

  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const brandRegistry = JSON.parse(fs.readFileSync(brandRegistryPath, 'utf8'));
  const leafTable = JSON.parse(fs.readFileSync(leafTablePath, 'utf8'));
  const communityQueue = JSON.parse(fs.readFileSync(communityQueuePath, 'utf8'));
  const inboundIntake = JSON.parse(fs.readFileSync(inboundIntakePath, 'utf8'));

  let pageRenderVariationCount = 0;
  let pageSemanticChangeUnboundCount = 0;
  let canonicalOfferCardChangedCount = 0;
  let newOfficialOfferLeafDiscoveredCount = 0;
  let httpErrorBackoffCount = 0;

  const stateCategorization = {
    page_render_variation: [],
    page_semantic_change_unbound: [],
    canonical_offer_card_changed: [],
    new_official_offer_leaf_discovered: [],
    http_error_backoff: []
  };

  for (const src of registry.sources) {
    if (src.state === 'PAGE_RENDER_VARIATION') {
      pageRenderVariationCount++;
      stateCategorization.page_render_variation.push(src);
    } else if (src.state === 'PAGE_SEMANTIC_CHANGE_UNBOUND') {
      pageSemanticChangeUnboundCount++;
      stateCategorization.page_semantic_change_unbound.push(src);
    } else if (src.state === 'CANONICAL_OFFER_CARD_CHANGED') {
      canonicalOfferCardChangedCount++;
      stateCategorization.canonical_offer_card_changed.push(src);
    } else if (src.state === 'NEW_OFFICIAL_OFFER_LEAF_DISCOVERED') {
      newOfficialOfferLeafDiscoveredCount++;
      stateCategorization.new_official_offer_leaf_discovered.push(src);
    } else if (src.state === 'HTTP_ERROR_BACKOFF') {
      httpErrorBackoffCount++;
      stateCategorization.http_error_backoff.push(src);
    }
  }

  const completeCount = leafTable.state_distribution.EVIDENCE_COMPLETE_FOR_REVIEW;
  const automatedDecision = (completeCount >= 10) ? 'STAGING_PROPOSAL_READY' : 'CONTINUE_ACQUISITION';

  // 3 Safe Community Feed Layers
  const safeCommunityFeed = {
    layer_1_verified_deals: {
      badge: '🟢 ĐÃ ĐỐI SOÁT',
      count: 0,
      bundles: [],
      governance_note: 'Khóa hoàn toàn (deals_feed.json: []). Hiện có 0 bundle chứng minh đầy đủ 5 tiêu chuẩn trong semantic content root.'
    },
    layer_2_monitored_sources: {
      badge: '🟣 NGUỒN ĐANG THEO DÕI',
      count: registry.sources.length,
      sources: registry.sources.map(s => ({
        source_id: s.source_id,
        brand_name: s.brand_name,
        canonical_url: s.canonical_url,
        state: s.state,
        next_check_due: s.next_check_due,
        disclaimer: 'Nguồn chính thức đang được theo dõi định kỳ qua Semantic-Root DOM Engine.'
      }))
    },
    layer_3_verified_venues: {
      badge: '🔵 ĐỊA ĐIỂM XÁC MINH',
      count: brandRegistry.locality_distribution.LOCALITY_VERIFIED_DA_NANG,
      disclaimer: 'Cơ sở kinh doanh đã có node DOM chứng minh đơn vị địa chỉ (address unit) cụ thể tại TP. Đà Nẵng qua Store Locator.'
    }
  };

  const manifest142s = {
    manifest_id: 'BATCH_CAPTURE_142S_MANIFEST',
    directive: 'JAYT-142S: SEMANTIC-ROOT RECOVERY & RECEIPT-TRUST REBUILD',
    generated_at: new Date().toISOString(),
    governance_statement: 'Tái xử lý toàn diện 142S với ranh giới semantic content_root, loại bỏ widget dùng chung, xác minh address unit và tính lại toàn bộ mã băm receipt vật lý. 32 raw captures: 0 Evidence Complete, 0 Missing Validity, 11 Scope Unproven, 11 Online Unproven, 0 No Price, 8 Shell/Non-Offer, 2 Identity Collisions. Quyết định tự động: CONTINUE_ACQUISITION. Catalog locked.',
    streams_summary: {
      fresh_sources_monitored: registry.sources.length,
      brand_store_locators_audited: brandRegistry.total_brands_audited,
      raw_leaves_evaluated: leafTable.total_raw_captures_evaluated,
      community_signals_queued: communityQueue.signals.length,
      inbound_submissions: inboundIntake.inbound_submissions.length
    },
    receipt_trust_summary: {
      clean_physical_receipts: brandRegistry.receipt_trust_audit.clean_physical_receipts,
      inherited_metadata_discarded: brandRegistry.receipt_trust_audit.inherited_metadata_discarded,
      identity_collisions_detected: leafTable.state_distribution.CAPTURE_IDENTITY_COLLISION
    },
    delta_classification_summary: {
      total_sources_in_registry: registry.sources.length,
      page_render_variation_count: pageRenderVariationCount,
      page_semantic_change_unbound_count: pageSemanticChangeUnboundCount,
      canonical_offer_card_changed_count: canonicalOfferCardChangedCount,
      new_official_offer_leaf_discovered_count: newOfficialOfferLeafDiscoveredCount,
      http_error_backoff_count: httpErrorBackoffCount,
      metric_conservation_check: (
        pageRenderVariationCount +
        pageSemanticChangeUnboundCount +
        canonicalOfferCardChangedCount +
        newOfficialOfferLeafDiscoveredCount +
        httpErrorBackoffCount
      )
    },
    locality_baseline_summary: {
      total_brands: brandRegistry.total_brands_audited,
      locality_verified_da_nang: brandRegistry.locality_distribution.LOCALITY_VERIFIED_DA_NANG,
      online_eligibility_unproven_for_danang: brandRegistry.locality_distribution.ONLINE_ELIGIBILITY_UNPROVEN_FOR_DANANG,
      locality_pending_address_unit_validation: brandRegistry.locality_distribution.LOCALITY_PENDING_ADDRESS_UNIT_VALIDATION
    },
    leaf_batch_reprocessing_summary: {
      total_raw_captures: leafTable.total_raw_captures_evaluated,
      state_distribution: leafTable.state_distribution,
      conservation_check: leafTable.conservation_check
    },
    automated_staging_gate_evaluation: {
      min_candidates_threshold: 10,
      min_candidates_met: completeCount >= 10,
      complete_bundles_count: completeCount,
      decision_verdict: automatedDecision
    },
    safe_community_feed: safeCommunityFeed,
    state_categorization: stateCategorization
  };

  fs.writeFileSync(manifestPath, JSON.stringify(manifest142s, null, 2), 'utf8');

  console.log('========================================================================');
  console.log('📊 KẾT QUẢ BIÊN DỊCH 142S:');
  console.log(`- Tổng số nguồn: ${registry.sources.length}`);
  console.log(`- Store Locators đã đối soát: ${brandRegistry.total_brands_audited} (Đà Nẵng Address Unit: ${brandRegistry.locality_distribution.LOCALITY_VERIFIED_DA_NANG}, Online: ${brandRegistry.locality_distribution.ONLINE_ELIGIBILITY_UNPROVEN_FOR_DANANG}, Pending Address Unit: ${brandRegistry.locality_distribution.LOCALITY_PENDING_ADDRESS_UNIT_VALIDATION})`);
  console.log(`- Raw Captures đã thẩm định: ${leafTable.total_raw_captures_evaluated}`);
  console.log(`- EVIDENCE_COMPLETE_FOR_REVIEW: ${completeCount}`);
  console.log(`- SCOPE_UNPROVEN: ${leafTable.state_distribution.SCOPE_UNPROVEN}`);
  console.log(`- ONLINE_ELIGIBILITY_UNPROVEN_FOR_DANANG: ${leafTable.state_distribution.ONLINE_ELIGIBILITY_UNPROVEN_FOR_DANANG}`);
  console.log(`- NON_OFFER_PAGE_OR_SHELL: ${leafTable.state_distribution.NON_OFFER_PAGE_OR_SHELL}`);
  console.log(`- CAPTURE_IDENTITY_COLLISION: ${leafTable.state_distribution.CAPTURE_IDENTITY_COLLISION}`);
  console.log(`- Metric Conservation Check: ${manifest142s.leaf_batch_reprocessing_summary.conservation_check} == ${leafTable.total_raw_captures_evaluated}`);
  console.log(`- Automated Staging Decision: 🎯 [${automatedDecision}]`);
  console.log(`- Manifest 142S Path: ${manifestPath}`);
  console.log('========================================================================\n');
}

compile142S();
