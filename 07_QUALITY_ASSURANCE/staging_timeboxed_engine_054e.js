/**
 * JAYT STAGING TIME-BOXED RENDERING & TTL ENGINE (054E)
 * Directive: JAYT-CGV-STAGING-ACCEPTANCE-054E — APPROVED, TIME-BOXED
 * 
 * Rules Enforced:
 * 1. Scope: Internal Staging ONLY.
 * 2. Deal: CGV Culture Day — 2D 58.000đ tại CGV Vĩnh Trung Plaza.
 * 3. Time-Boxed TTL: Only renderable during 24/08/2026 (00:00:00 - 23:59:59 +07:00).
 * 4. From 25/08/2026 00:00:00 +07:00 onwards: Automatically EXPIRED, renderable: false.
 * 5. Mandatory Badge: "STAGING · Nguồn chính thức đã capture · Chưa xác minh độc lập".
 * 6. Zero outbound links, zero affiliate links, zero telemetry, zero public deployment.
 * 7. Production feed strictly untouched: deals_feed.json: [], is_approved: false.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const stagingFeedPath = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const stagingManifestPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'STAGING_ACCEPTANCE_MANIFEST_054E.json');

const CGV_STAGING_ITEM_054E = {
  deal_id: 'DNG-CGV-VINHTRUNG-CULTURE-DAY-20260824',
  title: 'CGV Culture Day — Vé 2D Tiêu Chuẩn 58.000đ',
  merchant: 'CGV Vĩnh Trung Plaza',
  category: 'LOCAL_CINEMA',
  price_num: 58000,
  currency: 'VND',
  price_display: '58.000đ',
  locality_observed: 'CGV Vĩnh Trung Plaza',
  locality_address: null, // Zero address hallucination (web DOM does not specify street number)
  valid_date: '2026-08-24',
  valid_from: '2026-08-24T00:00:00+07:00',
  valid_to: '2026-08-24T23:59:59+07:00',
  conditions: [
    'Áp dụng cho khách hàng đặt vé trực tuyến (online) hoặc tại quầy.',
    'Áp dụng phòng chiếu tiêu chuẩn 2D (chưa bao gồm phụ thu ghế VIP, Sweetbox).',
    'Không áp dụng cho phòng chiếu IMAX, SCREENX, 4DX, ULTRA 4DX.',
    'Không áp dụng cho mua vé nhóm (Group Sales), Suất Chiếu Đặc Biệt.',
    'Không áp dụng chung với chương trình khuyến mãi khác của CGV và đối tác.',
    'Không áp dụng cho các ngày Lễ, Tết.'
  ],
  watermark_badge: 'STAGING · Nguồn chính thức đã capture · Chưa xác minh độc lập',
  security_and_privacy: {
    outbound_links_allowed: false,
    outbound_url: null,
    affiliate_tracking_enabled: false,
    telemetry_enabled: false,
    public_deployment_allowed: false
  },
  provenance: {
    work_order: 'JAYT-CGV-STAGING-ACCEPTANCE-054E',
    source_url: 'https://www.cgv.vn/default/newsoffer/cgv-culture-day-2026/',
    source_captured_at: '2026-08-22T19:21:43.692Z',
    reviewed_at: '2026-08-22T19:51:34.829Z',
    artifacts: {
      screenshot_png: {
        file: 'capture_054_cgv_1.png',
        sha256: 'b8d82bb0544c3d57293896e0890ec63af424daa803a36d03d8300ee11760dd4a'
      },
      raw_html_dump: {
        file: 'capture_054_cgv_1.html',
        sha256: '3510d04545c5242b8ba5811f64d60d226c8f54972aa53c0bfb36747bcf3be509'
      },
      raw_text_dump: {
        file: 'capture_054_cgv_1.txt',
        sha256: '0fd10af3edb3a57f272a9254d0caf13e6139e21597e15d92b13d01d89f7050c6'
      },
      correction_receipt: {
        file: 'correction_receipt_054c_cgv_1.json',
        sha256: '1f6de39f8f26dc8ba01843b46e1c73e2eec0e21f8066cd2037d5d3a19bd9a3b1'
      }
    }
  }
};

/**
 * Evaluates the time-boxed status of a deal at a given timestamp (ISO or Date object).
 * Returns { status, renderable, reason }.
 */
function evaluateStagingTimebox(deal, currentTimestamp = new Date()) {
  const now = new Date(currentTimestamp);
  const from = new Date(deal.valid_from);
  const to = new Date(deal.valid_to);

  if (now > to) {
    return {
      status: 'EXPIRED',
      renderable: false,
      reason: `Đã quá thời hạn hiệu lực (${deal.valid_to}). Deal tự động hết hạn và cấm render.`
    };
  }

  if (now < from) {
    return {
      status: 'SCHEDULED_PENDING_WINDOW',
      renderable: false,
      reason: `Chưa đến khung giờ hiệu lực (${deal.valid_from}).`
    };
  }

  return {
    status: 'ACTIVE_STAGING_RENDERABLE',
    renderable: true,
    reason: 'Đang trong khung giờ hiệu lực duy nhất của ngày 24/08/2026.'
  };
}

/**
 * Simulates Staging UI feed render at a specific timestamp.
 */
function renderStagingFeed(feedItems, simulationTimestamp = new Date()) {
  const renderedItems = [];

  for (const item of feedItems) {
    const timebox = evaluateStagingTimebox(item, simulationTimestamp);
    if (timebox.renderable) {
      renderedItems.push({
        deal_id: item.deal_id,
        title: item.title,
        merchant: item.merchant,
        locality_observed: item.locality_observed,
        locality_address: item.locality_address,
        price_display: item.price_display,
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
 * Initializes and writes the Staging internal feed and manifest.
 */
function deployStagingTimeboxedFeed054E() {
  console.log('🚀 [STAGING-DEPLOY-054E] Khởi tạo Staging Feed Time-Boxed cho CGV Culture Day...');

  const stagingDir = path.dirname(stagingFeedPath);
  if (!fs.existsSync(stagingDir)) {
    fs.mkdirSync(stagingDir, { recursive: true });
  }

  const stagingFeedData = [CGV_STAGING_ITEM_054E];
  fs.writeFileSync(stagingFeedPath, JSON.stringify(stagingFeedData, null, 2), 'utf8');

  const stagingManifest = {
    work_order: 'JAYT-CGV-STAGING-ACCEPTANCE-054E',
    status: 'APPROVED_TIME_BOXED_INTERNAL_STAGING_ONLY',
    approved_by: 'CEO Jay Trần',
    decision_ref: '054D1_APPROVED',
    generated_at: new Date().toISOString(),
    production_lock: {
      is_approved: false,
      deals_feed_sha256: '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945',
      public_go_live: 'BLOCKED'
    },
    staging_scope: {
      environment: 'STAGING_INTERNAL_ONLY',
      total_deals: 1,
      deal_ids: ['DNG-CGV-VINHTRUNG-CULTURE-DAY-20260824'],
      timebox_window: {
        valid_date: '2026-08-24',
        valid_from: '2026-08-24T00:00:00+07:00',
        valid_to: '2026-08-24T23:59:59+07:00',
        post_window_behavior: 'AUTOMATICALLY_EXPIRED_ZERO_RENDER'
      }
    },
    staging_feed_sha256: crypto.createHash('sha256').update(fs.readFileSync(stagingFeedPath)).digest('hex')
  };

  fs.writeFileSync(stagingManifestPath, JSON.stringify(stagingManifest, null, 2), 'utf8');

  console.log(`✅ [STAGING-DEPLOY-054E] Đã triển khai tệp Staging Feed: ${stagingFeedPath}`);
  console.log(`👉 Staging Manifest: ${stagingManifestPath}`);
}

module.exports = {
  CGV_STAGING_ITEM_054E,
  evaluateStagingTimebox,
  renderStagingFeed,
  deployStagingTimeboxedFeed054E
};

if (require.main === module) {
  deployStagingTimeboxedFeed054E();
}
