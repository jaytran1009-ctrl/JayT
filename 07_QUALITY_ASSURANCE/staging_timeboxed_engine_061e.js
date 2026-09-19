/**
 * JAYT STAGING TIME-BOXED & TTL RENDERING ENGINE (061E)
 * Directive: JAYT-GALAXY-STAGING-ACCEPTANCE-061E — APPROVED STAGING DEAL
 * 
 * Rules Enforced:
 * 1. Scope: Internal Staging ONLY.
 * 2. Deal: Galaxy Cinema — Happy Day (Thứ Ba Hàng Tuần).
 * 3. Two Observed Pricing Tiers:
 *    - Galaxy Đà Nẵng: 50.000đ / vé 2D tiêu chuẩn.
 *    - Galaxy CineX AEON Mall Thanh Khê: 70.000đ / vé 2D tiêu chuẩn.
 * 4. Zero street addresses (no '478 Điện Biên Phủ', no 'Coopmart'), zero mandatory Star membership, zero 'từ 45K' claim.
 * 5. Eligibility: 'Tất cả khách hàng'.
 * 6. Rolling 7-Day TTL: recheck_due_at = 2026-08-30T06:12:38.659Z.
 *    - After 2026-08-30T06:12:38.659Z: Auto-suppressed (renderable: false).
 * 7. Security: Zero outbound links, zero telemetry, zero tracking.
 * 8. Production feed locked: deals_feed.json: [], is_approved: false.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const stagingFeedPath = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const stagingManifestPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'STAGING_ACCEPTANCE_MANIFEST_061E.json');
const correctionReceiptPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'correction_receipt_061d_galaxy_happy_day.json');

const GALAXY_HAPPY_DAY_STAGING_ITEM_061E = {
  deal_id: 'DNG-GALAXY-HAPPY-DAY-WEEKLY-TUESDAY-061E',
  title: 'Galaxy Cinema — Happy Day (Thứ Ba Hàng Tuần)',
  merchant: 'Galaxy Cinema',
  category: 'LOCAL_CINEMA',
  schedule: 'Thứ Ba hàng tuần',
  day_of_week: 'TUESDAY',
  pricing_tiers: [
    {
      cinema_name: 'Galaxy Đà Nẵng',
      price_vnd: 50000,
      price_display: '50.000đ',
      format: 'Vé 2D tiêu chuẩn',
      address_observed: null // Zero address hallucination (artifact does not specify street address)
    },
    {
      cinema_name: 'Galaxy CineX AEON Mall Thanh Khê',
      price_vnd: 70000,
      price_display: '70.000đ',
      format: 'Vé 2D tiêu chuẩn',
      address_observed: null // Zero address hallucination
    }
  ],
  eligibility: 'Tất cả khách hàng',
  mandatory_membership: false,
  captured_at: '2026-08-23T06:12:38.659Z',
  recheck_due_at: '2026-08-30T06:12:38.659Z',
  ttl_rule: 'NO_FIXED_END_DATE_IN_SOURCE — AUTO_EXPIRE_FROM_STAGING_AND_LIVE_IF_NOT_REFRESHED_BY_NEW_CAPTURE_WITHIN_7_DAYS',
  conditions: [
    'Áp dụng Thứ Ba hàng tuần cho tất cả khách hàng.',
    'Giá vé Happy Day không áp dụng vào các ngày Lễ/Tết (giá vé Lễ Tết sẽ áp dụng theo bảng giá niêm yết của từng rạp), suất chiếu đặc biệt và định dạng IMAX Laser, phòng chiếu đặc biệt.',
    'Giá vé Happy Day không áp dụng cho các chương trình giảm giá khác.',
    'Trong mọi trường hợp, quyết định của Galaxy Cinema là quyết định cuối cùng.'
  ],
  watermark_badge: 'STAGING · Nguồn chính thức đã capture · Đã qua kiểm toán độc lập CEO (061D/061E)',
  security_and_privacy: {
    outbound_links_allowed: false,
    outbound_url: null,
    affiliate_tracking_enabled: false,
    telemetry_enabled: false,
    public_deployment_allowed: false
  },
  provenance: {
    work_order: 'JAYT-GALAXY-STAGING-ACCEPTANCE-061E',
    correction_receipt_ref: '07_QUALITY_ASSURANCE/runtime_evidence/correction_receipt_061d_galaxy_happy_day.json',
    correction_receipt_sha256: fs.existsSync(correctionReceiptPath) ? crypto.createHash('sha256').update(fs.readFileSync(correctionReceiptPath)).digest('hex') : null,
    source_url: 'https://www.galaxycine.vn/khuyen-mai/happy-day---ve-chi-tu-45k/',
    discovered_from_url: 'https://www.galaxycine.vn/khuyen-mai/',
    artifacts: {
      html: {
        file: '07_QUALITY_ASSURANCE/runtime_evidence/sweep_061c_artifacts/capture_061c_galaxy_deep_12.html',
        sha256: '3d91aefe542d268b864eaf3d22db07a2d2c414a29709a6ccf87c517e53e2a69c'
      },
      text: {
        file: '07_QUALITY_ASSURANCE/runtime_evidence/sweep_061c_artifacts/capture_061c_galaxy_deep_12.txt',
        sha256: '5783d3031fae22ba0734f212b99dd3115bd17e4df8ca2a58b1b1e045bca58ef7'
      },
      png: {
        file: '07_QUALITY_ASSURANCE/runtime_evidence/sweep_061c_artifacts/capture_061c_galaxy_deep_12.png',
        sha256: '12598d7a8cc8b5aa4e7217401a96447c99399a7972701346070c175f76707bd4'
      }
    }
  }
};

/**
 * Evaluates staging item status at a specific evaluation timestamp.
 */
function evaluateStagingTimebox061E(deal, currentTimestamp = new Date()) {
  const now = new Date(currentTimestamp);

  // 1. Check TTL Recheck Due Date
  if (deal.recheck_due_at) {
    const due = new Date(deal.recheck_due_at);
    if (now > due) {
      return {
        status: 'EXPIRED_RECHECK_DUE',
        renderable: false,
        reason: `Đã quá hạn 7 ngày kiểm tra lại (${deal.recheck_due_at}). Deal tự động ẩn khỏi Staging cho đến khi có capture mới xác nhận.`
      };
    }
  }

  // 2. Check Valid Window if present (e.g. CGV 054E)
  if (deal.valid_to) {
    const to = new Date(deal.valid_to);
    if (now > to) {
      return {
        status: 'EXPIRED',
        renderable: false,
        reason: `Đã quá thời hạn hiệu lực (${deal.valid_to}). Deal tự động hết hạn và cấm render.`
      };
    }
  }
  if (deal.valid_from) {
    const from = new Date(deal.valid_from);
    if (now < from) {
      return {
        status: 'SCHEDULED_PENDING_WINDOW',
        renderable: false,
        reason: `Chưa đến khung giờ hiệu lực (${deal.valid_from}).`
      };
    }
  }

  return {
    status: 'ACTIVE_STAGING_RENDERABLE',
    renderable: true,
    reason: 'Đang trong khung giờ hiệu lực và trước hạn kiểm tra lại 7 ngày.'
  };
}

/**
 * Renders staging feed for UI or API.
 */
function renderStagingFeed061E(feedItems, simulationTimestamp = new Date()) {
  const renderedItems = [];

  for (const item of feedItems) {
    const timebox = evaluateStagingTimebox061E(item, simulationTimestamp);
    if (timebox.renderable) {
      renderedItems.push({
        deal_id: item.deal_id,
        title: item.title,
        merchant: item.merchant,
        category: item.category,
        schedule: item.schedule,
        day_of_week: item.day_of_week,
        pricing_tiers: item.pricing_tiers || [
          {
            cinema_name: item.locality_observed || item.merchant,
            price_vnd: item.price_num,
            price_display: item.price_display,
            format: 'Vé 2D tiêu chuẩn',
            address_observed: item.locality_address || null
          }
        ],
        eligibility: item.eligibility || 'Tất cả khách hàng',
        recheck_due_at: item.recheck_due_at || null,
        conditions: item.conditions,
        watermark_badge: item.watermark_badge,
        status: timebox.status
      });
    }
  }

  return {
    simulation_timestamp: new Date(simulationTimestamp).toISOString(),
    total_feed_items: feedItems.length,
    active_rendered_count: renderedItems.length,
    rendered_items: renderedItems
  };
}

/**
 * Initializes and writes the Staging internal feed and manifest for 061E.
 */
function deployStagingFeed061E() {
  console.log('🚀 [STAGING-DEPLOY-061E] Khởi tạo Staging Feed cho Galaxy Cinema Happy Day...');

  const stagingDir = path.dirname(stagingFeedPath);
  if (!fs.existsSync(stagingDir)) {
    fs.mkdirSync(stagingDir, { recursive: true });
  }

  const stagingFeedData = [GALAXY_HAPPY_DAY_STAGING_ITEM_061E];
  fs.writeFileSync(stagingFeedPath, JSON.stringify(stagingFeedData, null, 2), 'utf8');

  const correctionSha = fs.existsSync(correctionReceiptPath)
    ? crypto.createHash('sha256').update(fs.readFileSync(correctionReceiptPath)).digest('hex')
    : null;

  const stagingManifest = {
    $schema: 'https://jayt.vn/schemas/staging-acceptance-manifest.v3.json',
    schema_version: '3.0.0',
    work_order: 'JAYT-GALAXY-STAGING-ACCEPTANCE-061E',
    status: 'APPROVED_INTERNAL_STAGING_SEED_DEAL',
    approved_by: 'CEO Jay Trần',
    decision_ref: '061D_APPROVED',
    generated_at: new Date().toISOString(),
    production_lock: {
      is_approved: false,
      deals_feed_sha256: '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945',
      public_go_live: 'BLOCKED'
    },
    staging_scope: {
      environment: 'STAGING_INTERNAL_ONLY',
      total_approved_staging_deals: 1,
      deal_ids: ['DNG-GALAXY-HAPPY-DAY-WEEKLY-TUESDAY-061E'],
      value_clusters_represented: 1, // LOCAL_CINEMA
      days_covered: 1, // TUESDAY
      rolling_expiration: {
        captured_at: '2026-08-23T06:12:38.659Z',
        recheck_due_at: '2026-08-30T06:12:38.659Z',
        ttl_rule: 'NO_FIXED_END_DATE_IN_SOURCE — AUTO_EXPIRE_FROM_STAGING_AND_LIVE_IF_NOT_REFRESHED_BY_NEW_CAPTURE_WITHIN_7_DAYS'
      },
      provenance_lineage: {
        correction_receipt_ref: '07_QUALITY_ASSURANCE/runtime_evidence/correction_receipt_061d_galaxy_happy_day.json',
        correction_receipt_sha256: correctionSha
      }
    },
    staging_feed_sha256: crypto.createHash('sha256').update(fs.readFileSync(stagingFeedPath)).digest('hex')
  };

  fs.writeFileSync(stagingManifestPath, JSON.stringify(stagingManifest, null, 2), 'utf8');

  console.log(`✅ [STAGING-DEPLOY-061E] Đã triển khai tệp Staging Feed: ${stagingFeedPath}`);
  console.log(`👉 Staging Manifest: ${stagingManifestPath}`);

  return {
    stagingFeedData,
    stagingManifest
  };
}

module.exports = {
  GALAXY_HAPPY_DAY_STAGING_ITEM_061E,
  evaluateStagingTimebox061E,
  renderStagingFeed061E,
  deployStagingFeed061E
};

if (require.main === module) {
  deployStagingFeed061E();
}
