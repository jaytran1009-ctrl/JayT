/**
 * JAYT-110: AUTONOMOUS SCHEDULE MANAGER
 * 
 * Configures and tracks the 5 daily checkpoints:
 * 1. 07:00 (Sáng) - Quét khởi động ngày & cập nhật ưu đãi ăn sáng/cà phê
 * 2. 10:45 (Trưa) - Quét thực đơn & ưu đãi ăn trưa
 * 3. 14:00 (Chiều) - Quét ưu đãi cà phê / vận chuyển
 * 4. 17:00 (Tối) - Quét ưu đãi rạp phim & giải trí buổi tối
 * 5. 20:30 (Đêm) - Recheck ưu đãi hết hạn (TTL) & chuẩn bị dữ liệu ngày hôm sau
 */

const fs = require('fs');
const path = require('path');
const { runAutonomousBatch } = require('./autonomous_pipeline_engine');

const SCHEDULE_CONFIG = [
  { time: '07:00', cron: '0 7 * * *', label: 'Morning Kickoff & Coffee/Breakfast Discovery' },
  { time: '10:45', cron: '45 10 * * *', label: 'Lunch Offers & F&B Real-time Scan' },
  { time: '14:00', cron: '0 14 * * *', label: 'Afternoon Mobility & Cafe Scan' },
  { time: '17:00', cron: '0 17 * * *', label: 'Evening Cinema & Entertainment Peak Scan' },
  { time: '20:30', cron: '30 20 * * *', label: 'Nightly TTL Expiry Audit & Parity Sync' }
];

const SCHEDULE_STATE_PATH = path.resolve(__dirname, 'autonomous_schedule_state.json');

function getScheduleStatus() {
  let state = {};
  if (fs.existsSync(SCHEDULE_STATE_PATH)) {
    state = JSON.parse(fs.readFileSync(SCHEDULE_STATE_PATH, 'utf8'));
  }
  return {
    is_active: true,
    checkpoints: SCHEDULE_CONFIG,
    last_run: state.last_run || null,
    next_checkpoints: SCHEDULE_CONFIG.map(c => c.time),
    status: 'AUTONOMOUS_SCHEDULER_ACTIVE'
  };
}

function recordScheduleRun(batchResult) {
  const state = {
    last_run: {
      timestamp: new Date().toISOString(),
      batch_id: batchResult.batchId,
      scanned: batchResult.scannedCount,
      verified: batchResult.activeVerifiedCount,
      watchlist: batchResult.watchlistCount,
      report: batchResult.reportPath
    },
    updated_at: new Date().toISOString()
  };
  fs.writeFileSync(SCHEDULE_STATE_PATH, JSON.stringify(state, null, 2), 'utf8');
}

async function triggerScheduledRun() {
  console.log('⏰ [SCHEDULE-110] Kích hoạt lượt chạy tự động định kỳ...');
  const result = await runAutonomousBatch();
  recordScheduleRun(result);
  console.log('✅ Lượt chạy tự động định kỳ đã ghi nhận thành công!');
  return result;
}

module.exports = {
  SCHEDULE_CONFIG,
  CHECKPOINTS: SCHEDULE_CONFIG,
  getScheduleStatus,
  triggerScheduledRun
};

if (require.main === module) {
  triggerScheduledRun().catch(err => {
    console.error('Lỗi khi chạy scheduled run:', err);
    process.exit(1);
  });
}
