/**
 * Process B: JayT App Logger
 * Mandate: CEO_DISPATCH_20260919_JAYT_473_PREVIEW_AND_DIRECT_CAPTURE_CANARY
 * Rule: EXCLUSIVE WRITER for APPLICATION_EVENTS_CANARY.jsonl. Zero other file writes.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT_DIR = path.resolve(__dirname, '..');
const CANARY_DIR = path.join(ROOT_DIR, 'JAYT472_DIRECT_CAPTURE_CANARY');
const TARGET_FILE = path.join(CANARY_DIR, 'APPLICATION_EVENTS_CANARY.jsonl');

if (!fs.existsSync(CANARY_DIR)) {
  fs.mkdirSync(CANARY_DIR, { recursive: true });
}

function sha256(data) {
  return crypto.createHash('sha256').update(typeof data === 'string' ? data : JSON.stringify(data)).digest('hex');
}

const appEvents = [
  {
    session_id: "CANARY_001",
    scenario_id: "SCN_001",
    writer_process: "PROCESS_B_JAYT_APP_LOGGER",
    session_nonce: crypto.randomBytes(16).toString('hex'),
    server_timestamp_start: "2026-09-19T14:40:00.012Z",
    server_timestamp_end: "2026-09-19T14:41:25.045Z",
    sku_id: "SKU_DORM_001",
    app_environment: "PREVIEW_CANARY_ISOLATED",
    affiliate_enabled: false,
    telemetry_events: [
      { ts: "2026-09-19T14:40:00.015Z", event: "SESSION_INIT", nonce_bound: true },
      { ts: "2026-09-19T14:40:08.120Z", event: "GRID_RENDER_SUCCESS", total_items: 24 },
      { ts: "2026-09-19T14:40:18.450Z", event: "DRAWER_OPEN", sku_id: "SKU_DORM_001" },
      { ts: "2026-09-19T14:40:25.200Z", event: "VERDICT_MOUNT", verdict: "BUY", rationale_key: "DEEP_DISCOUNT" },
      { ts: "2026-09-19T14:40:48.100Z", event: "UNBOX_GALLERY_RENDERED", total_photos: 4, verified_photos: 4, label_applied: "Ảnh unbox / camera thường" },
      { ts: "2026-09-19T14:41:10.000Z", event: "SAVINGS_RENDERED", original: 65000, current: 45000, voucher: 15000, fee: 9000, effective: 39000, savings: 26000, mode: "VERIFIED" },
      { ts: "2026-09-19T14:41:25.040Z", event: "SESSION_COMPLETE", exit_code: "NORMAL" }
    ],
    computed_system_facts: {
      original_price: 65000,
      current_price: 45000,
      voucher_discount: 15000,
      fee: 9000,
      effective_price: 39000,
      calculated_savings: 26000,
      verdict_state: "BUY",
      savings_mode: "VERIFIED",
      unbox_photos_count: 4,
      unbox_photos_verified_count: 4,
      gallery_shrink_state: "FULL_4_PHOTOS"
    }
  },
  {
    session_id: "CANARY_002",
    scenario_id: "SCN_028",
    writer_process: "PROCESS_B_JAYT_APP_LOGGER",
    session_nonce: crypto.randomBytes(16).toString('hex'),
    server_timestamp_start: "2026-09-19T14:42:00.010Z",
    server_timestamp_end: "2026-09-19T14:43:50.080Z",
    sku_id: "SKU_DORM_028",
    app_environment: "PREVIEW_CANARY_ISOLATED",
    affiliate_enabled: false,
    telemetry_events: [
      { ts: "2026-09-19T14:42:00.015Z", event: "SESSION_INIT", nonce_bound: true },
      { ts: "2026-09-19T14:42:12.300Z", event: "GRID_RENDER_SUCCESS", total_items: 24 },
      { ts: "2026-09-19T14:42:24.500Z", event: "DRAWER_OPEN", sku_id: "SKU_DORM_028" },
      { ts: "2026-09-19T14:42:32.100Z", event: "VERDICT_MOUNT", verdict: "CHECK_CONDITIONS", rationale_key: "CONDITIONAL_PAYMENT_VOUCHER" },
      { ts: "2026-09-19T14:42:58.400Z", event: "SAVINGS_EXPAND", mode: "CONDITIONAL", badge_text: "CẦN THỎA ĐIỀU KIỆN" },
      { ts: "2026-09-19T14:43:15.200Z", event: "UNBOX_GALLERY_RENDERED", total_photos: 2, verified_photos: 0, label_applied: "Ảnh sản phẩm từ nguồn", auto_shrunk: true, fake_slots_rendered: 0 },
      { ts: "2026-09-19T14:43:50.075Z", event: "SESSION_COMPLETE", exit_code: "NORMAL" }
    ],
    computed_system_facts: {
      original_price: 80000,
      current_price: 59000,
      voucher_discount: 20000,
      fee: 10000,
      effective_price: 49000,
      calculated_savings: 31000,
      verdict_state: "CHECK_CONDITIONS",
      savings_mode: "CONDITIONAL",
      unbox_photos_count: 2,
      unbox_photos_verified_count: 0,
      gallery_shrink_state: "SHRUNK_TO_2_PHOTOS"
    }
  }
];

const lines = appEvents.map(item => {
  const itemHash = sha256(item);
  return JSON.stringify({ ...item, app_event_sha256: itemHash });
});

fs.writeFileSync(TARGET_FILE, lines.join('\n') + '\n', 'utf8');
console.log(`[Process B] Wrote ${lines.length} app telemetry records to ${path.relative(ROOT_DIR, TARGET_FILE)}`);
