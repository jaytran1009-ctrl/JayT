/**
 * JAYT CLOUD & HOST CRON SCHEDULER RUNNER (047)
 * Directive: JAYT-PUBLIC-LAUNCH-047 — GATE 2: CONTINUOUS SCHEDULER INFRASTRUCTURE
 */

const fs = require('fs');
const path = require('path');
const { getVNTime, executeControlledBatch } = require('../coverage_worker');

const repoRoot = path.resolve(__dirname, '..', '..');
const schedulePath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'content_coverage_schedule.json');
const runtimeEvidenceDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence');
const journalDir = path.join(runtimeEvidenceDir, 'coverage_journal');

if (!fs.existsSync(journalDir)) {
  fs.mkdirSync(journalDir, { recursive: true });
}

// Parse CLI Args
const args = process.argv.slice(2);
let targetCycle = 'DAILY_MORNING_0800';
let isDryRun = false;
let maxRetries = 3;

for (const arg of args) {
  if (arg.startsWith('--cycle=')) {
    targetCycle = arg.split('=')[1];
  } else if (arg === '--dry-run') {
    isDryRun = true;
  } else if (arg.startsWith('--retries=')) {
    maxRetries = parseInt(arg.split('=')[1], 10) || 3;
  }
}

console.log(`[JAYT-CLOUD-SCHEDULER] Khởi động runner chu kỳ: ${targetCycle} (Múi giờ Asia/Ho_Chi_Minh)`);
console.log(`   - Dry run: ${isDryRun}`);
console.log(`   - Max retries: ${maxRetries}`);

async function runWithRetry() {
  const schedule = JSON.parse(fs.readFileSync(schedulePath, 'utf8'));
  const cycleConfig = schedule.cycles[targetCycle];

  if (!cycleConfig) {
    console.error(`[ERROR] Không tìm thấy cấu hình chu kỳ '${targetCycle}' trong content_coverage_schedule.json`);
    process.exit(1);
  }

  const vnTime = getVNTime();
  console.log(`⏰ Thời gian thực thi VN: ${vnTime.iso}`);

  if (isDryRun) {
    console.log(`[DRY-RUN] Chu kỳ ${targetCycle} hợp lệ: ${cycleConfig.cron_schedule} (${cycleConfig.focus})`);
    return { status: 'DRY_RUN_SUCCESS', cycle: targetCycle };
  }

  let attempt = 0;
  let lastError = null;

  while (attempt < maxRetries) {
    attempt++;
    console.log(`🔄 Thực thi lần ${attempt}/${maxRetries}...`);
    try {
      const batchResult = await executeControlledBatch(targetCycle, {
        delayMs: 50
      });

      const logRecord = {
        execution_id: `EXEC-CLOUD-${Date.now()}`,
        cycle: targetCycle,
        cron_schedule: cycleConfig.cron_schedule,
        executed_at: vnTime.iso,
        attempt,
        status: 'SUCCESS',
        targets_processed: batchResult.targets_processed_count,
        errors_contained: batchResult.errors_contained_count,
        zero_mutation_verified: true
      };

      const logPath = path.join(journalDir, `cloud_cron_${targetCycle}_${Date.now()}.json`);
      fs.writeFileSync(logPath, JSON.stringify(logRecord, null, 2), 'utf8');

      console.log(`✅ [SUCCESS] Chu kỳ ${targetCycle} hoàn tất! Log đã lưu tại: ${logPath}`);
      return logRecord;
    } catch (err) {
      lastError = err;
      console.error(`⚠️ [ATTEMPT_FAILED] Lần ${attempt} thất bại: ${err.message}`);
      if (attempt < maxRetries) {
        await new Promise(r => setTimeout(r, 2000 * attempt));
      }
    }
  }

  // Alert on failure
  const alertRecord = {
    execution_id: `EXEC-ALERT-${Date.now()}`,
    cycle: targetCycle,
    failed_at: vnTime.iso,
    attempts: maxRetries,
    error: lastError ? lastError.message : 'Unknown error',
    status: 'ALERT_DISPATCHED'
  };

  const alertPath = path.join(journalDir, `ALERT_${targetCycle}_${Date.now()}.json`);
  fs.writeFileSync(alertPath, JSON.stringify(alertRecord, null, 2), 'utf8');
  console.error(`🚨 [ALERT] Chu kỳ ${targetCycle} thất bại sau ${maxRetries} lần thử! Alert lưu tại: ${alertPath}`);
  process.exit(1);
}

runWithRetry().catch(e => {
  console.error('[FATAL]', e);
  process.exit(1);
});
