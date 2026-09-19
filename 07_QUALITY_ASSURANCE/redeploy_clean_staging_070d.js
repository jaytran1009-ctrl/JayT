/**
 * JAYT CLEAN STAGING REDEPLOY ENGINE (070D)
 * Directive: JAYT-070D — CLEAN STAGING REDEPLOY + BATCH-2 ACCUMULATION
 */

const fs = require('fs');
const path = require('path');
const { validateCrossLayerStagingLineage } = require('./cross_layer_staging_lineage_gate_070c');

const repoRoot = path.resolve(__dirname, '..');
const cand44Path = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'candidates', 'pending_review', 'candidate_44_CAND-DNG-METIZ-SUPER-MONDAY-2026.json');
const cand45Path = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'candidates', 'pending_review', 'candidate_45_CAND-DNG-METIZ-U22-2026.json');
const stagingFeedPath = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '05_DEAL_AND_AFFILIATE', 'deals_feed.json');

const cand44 = JSON.parse(fs.readFileSync(cand44Path, 'utf8'));
const cand45 = JSON.parse(fs.readFileSync(cand45Path, 'utf8'));

// 1. Build exact Metiz Super Monday Staging Item from Candidate 44
const ev44 = cand44.evidence['EVID_CAND-DNG-METIZ-SUPER-MONDAY-2026'];
const deal44 = cand44.deals[0];
const metizSuperMondayStagingItem = {
  deal_id: deal44.deal_id,
  title: deal44.title,
  merchant: deal44.merchant,
  category: 'LOCAL_CINEMA',
  schedule: 'Thứ Hai hàng tuần',
  day_of_week: 'MONDAY',
  pricing_tiers: [
    {
      cinema_name: 'Metiz Cinema Đà Nẵng',
      price_vnd: deal44.deal_price,
      price_display: deal44.observed_price,
      format: 'Vé 2D tiêu chuẩn (Ghế thường/VIP/đôi)',
      address_observed: deal44.locality_scope
    }
  ],
  eligibility: 'Thành viên Metiz Cinema (xuất trình thẻ tại quầy)',
  mandatory_membership: true,
  purchase_channel: deal44.purchase_channel,
  captured_at: ev44.captured_at,
  expires_at: `${deal44.expires_at}T23:59:59+07:00`,
  recheck_due_at: `${deal44.expires_at}T23:59:59+07:00`,
  ttl_rule: 'ANNUAL_OFFICIAL_CAMPAIGN — VALID_THROUGH_2026_12_31',
  conditions: [
    'Áp dụng vào ngày Thứ Hai hàng tuần.',
    'Áp dụng cho khách hàng là thành viên của Metiz Cinema.',
    'Vui lòng xuất trình thẻ thành viên trước khi mua vé.',
    'Áp dụng cho hình thức mua vé trực tiếp tại quầy.',
    'Không áp dụng vào các ngày lễ, Tết, suất chiếu đặc biệt, suất chiếu sớm.'
  ],
  watermark_badge: 'STAGING · CEO Approved Batch 070B · Nguồn Metiz Official 2026',
  security_and_privacy: {
    outbound_links_allowed: false,
    outbound_url: null,
    affiliate_tracking_enabled: false,
    telemetry_enabled: false,
    public_deployment_allowed: false
  },
  provenance: {
    work_order: 'JAYT-070D',
    candidate_id: cand44.candidate_id,
    candidate_sha256: '246ad1bae523ca67741ad600751e2ec5461a276b17405253a07cb6b517b93a98',
    ceo_batch_receipt_ref: '07_QUALITY_ASSURANCE/runtime_evidence/CEO_BATCH_DECISION_RECEIPT_070B.json',
    source_url: ev44.source_url,
    capture_receipt_ref: ev44.capture_receipt_ref,
    capture_receipt_hash: ev44.capture_receipt_hash,
    artifacts: {
      png: {
        file: `05_DEAL_AND_AFFILIATE/candidates/evidence_snapshots/${ev44.capture_file}`,
        sha256: ev44.evidence_content_hash
      },
      html: {
        file: `05_DEAL_AND_AFFILIATE/candidates/evidence_snapshots/${ev44.artifact_html_dump}`,
        sha256: ev44.artifact_html_hash
      },
      text: {
        file: `05_DEAL_AND_AFFILIATE/candidates/evidence_snapshots/${ev44.artifact_text_dump}`,
        sha256: ev44.artifact_text_hash
      }
    }
  }
};

// 2. Build exact Metiz U22 Staging Item from Candidate 45
const ev45 = cand45.evidence['EVID_CAND-DNG-METIZ-U22-2026'];
const deal45 = cand45.deals[0];
const metizU22StagingItem = {
  deal_id: deal45.deal_id,
  title: deal45.title,
  merchant: deal45.merchant,
  category: 'LOCAL_CINEMA',
  schedule: 'Thứ Ba, Thứ Tư, Thứ Năm hàng tuần',
  day_of_week: 'TUESDAY_TO_THURSDAY',
  days_of_week: [2, 3, 4],
  pricing_tiers: [
    {
      cinema_name: 'Metiz Cinema Đà Nẵng',
      price_vnd: deal45.deal_price,
      price_display: deal45.observed_price,
      format: 'Vé 2D tiêu chuẩn (Ghế thường/VIP)',
      address_observed: deal45.locality_scope
    }
  ],
  eligibility: 'Thành viên Metiz Cinema từ 22 tuổi trở xuống (xuất trình thẻ thành viên và CCCD tại quầy)',
  mandatory_membership: true,
  purchase_channel: deal45.purchase_channel,
  captured_at: ev45.captured_at,
  expires_at: `${deal45.expires_at}T23:59:59+07:00`,
  recheck_due_at: `${deal45.expires_at}T23:59:59+07:00`,
  ttl_rule: 'ANNUAL_OFFICIAL_CAMPAIGN — VALID_THROUGH_2026_12_31',
  conditions: [
    'Áp dụng từ Thứ Ba đến Thứ Năm hàng tuần.',
    'Áp dụng cho khách hàng thành viên từ 22 tuổi trở xuống.',
    'Vui lòng xuất trình thẻ thành viên và căn cước công dân trước khi mua vé.',
    'Áp dụng cho hình thức mua vé trực tiếp tại quầy.',
    'Không áp dụng vào các ngày lễ, Tết, suất chiếu đặc biệt, suất chiếu sớm.'
  ],
  watermark_badge: 'STAGING · CEO Approved Batch 070B · Nguồn Metiz Official 2026',
  security_and_privacy: {
    outbound_links_allowed: false,
    outbound_url: null,
    affiliate_tracking_enabled: false,
    telemetry_enabled: false,
    public_deployment_allowed: false
  },
  provenance: {
    work_order: 'JAYT-070D',
    candidate_id: cand45.candidate_id,
    candidate_sha256: 'f6e1b460c47d4d27ae60c66fd37a76e1f7044862d58d1dade869a89d1f8e835d',
    ceo_batch_receipt_ref: '07_QUALITY_ASSURANCE/runtime_evidence/CEO_BATCH_DECISION_RECEIPT_070B.json',
    source_url: ev45.source_url,
    capture_receipt_ref: ev45.capture_receipt_ref,
    capture_receipt_hash: ev45.capture_receipt_hash,
    artifacts: {
      png: {
        file: `05_DEAL_AND_AFFILIATE/candidates/evidence_snapshots/${ev45.capture_file}`,
        sha256: ev45.evidence_content_hash
      },
      html: {
        file: `05_DEAL_AND_AFFILIATE/candidates/evidence_snapshots/${ev45.artifact_html_dump}`,
        sha256: ev45.artifact_html_hash
      },
      text: {
        file: `05_DEAL_AND_AFFILIATE/candidates/evidence_snapshots/${ev45.artifact_text_dump}`,
        sha256: ev45.artifact_text_hash
      }
    }
  }
};

// 3. Pre-Write Cross-Layer Gate Validation
console.log('🛡️ [PRE-WRITE-GATE] Kiểm tra cross-layer lineage cho Candidate 44...');
const check44 = validateCrossLayerStagingLineage(metizSuperMondayStagingItem, cand44);
if (!check44.valid) {
  throw new Error(`FAIL-CLOSED: Cross-layer gate failed for Candidate 44:\n${check44.errors.join('\n')}`);
}
console.log('  🟢 Candidate 44 PASS 100% cross-layer lineage gate!');

console.log('🛡️ [PRE-WRITE-GATE] Kiểm tra cross-layer lineage cho Candidate 45...');
const check45 = validateCrossLayerStagingLineage(metizU22StagingItem, cand45);
if (!check45.valid) {
  throw new Error(`FAIL-CLOSED: Cross-layer gate failed for Candidate 45:\n${check45.errors.join('\n')}`);
}
console.log('  🟢 Candidate 45 PASS 100% cross-layer lineage gate!');

// 4. Load baseline 061F Galaxy deal
const currentFeed = JSON.parse(fs.readFileSync(stagingFeedPath, 'utf8'));
const galaxyDeal = currentFeed.find(d => d.deal_id === 'DNG-GALAXY-HAPPY-DAY-WEEKLY-TUESDAY-061F');
if (!galaxyDeal) {
  throw new Error('FAIL-CLOSED: Missing Galaxy baseline 061F deal in staging feed');
}

// 5. Combine exactly 3 clean staging deals
const cleanStagingFeed = [
  galaxyDeal,
  metizSuperMondayStagingItem,
  metizU22StagingItem
];

// 6. Write atomically to staging feed
fs.writeFileSync(stagingFeedPath, JSON.stringify(cleanStagingFeed, null, 2), 'utf8');
console.log(`\n💾 [STAGING-DEPLOYED-070D] Đã deploy thành công 3 deals sạch vào staging feed: ${stagingFeedPath}`);
console.log(`   Deals: ${cleanStagingFeed.map(d => d.deal_id).join(', ')}`);
