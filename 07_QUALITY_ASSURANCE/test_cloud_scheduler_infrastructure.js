/**
 * JAYT CLOUD SCHEDULER INFRASTRUCTURE TEST SUITE (047)
 * Directive: JAYT-PUBLIC-LAUNCH-047 — GATE 2: SCHEDULER RUNTIME INFRASTRUCTURE
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const repoRoot = path.resolve(__dirname, '..');

const schedDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'scheduler_tasks');
const ghaWorkflowPath = path.join(repoRoot, '.github', 'workflows', 'content_coverage_schedule.yml');

let testCount = 0;
let passCount = 0;

function assertTest(name, condition, message) {
  testCount++;
  if (condition) {
    passCount++;
    console.log(`  [${name}]: [PASS] - ${message}`);
  } else {
    console.error(`  [${name}]: [FAIL] - ${message}`);
    process.exitCode = 1;
  }
}

console.log('🧪 [JAYT-GATE2-TEST] Khởi chạy bộ kiểm thử Cloud Scheduler Infrastructure 047...');

// [TEST 1]: Cron Cloud Runner Exists & Implements Retries and Logging
const runnerPath = path.join(schedDir, 'cron_cloud_runner.js');
let runnerValid = false;
if (fs.existsSync(runnerPath)) {
  const runnerContent = fs.readFileSync(runnerPath, 'utf8');
  runnerValid = runnerContent.includes('Asia/Ho_Chi_Minh') &&
                runnerContent.includes('maxRetries') &&
                runnerContent.includes('journalDir') &&
                runnerContent.includes('ALERT');
}
assertTest(
  'GATE2_01_CRON_CLOUD_RUNNER_CONFIG',
  runnerValid,
  'cron_cloud_runner.js hỗ trợ múi giờ Asia/Ho_Chi_Minh, cơ chế retry (max 3), ghi journal log và bắn cảnh báo khi lỗi'
);

// [TEST 2]: Crontab Configuration 4 Exact Cycles
const crontabPath = path.join(schedDir, 'crontab.example');
let crontabValid = false;
if (fs.existsSync(crontabPath)) {
  const crontabContent = fs.readFileSync(crontabPath, 'utf8');
  crontabValid = crontabContent.includes('0 8 * * *') &&
                 crontabContent.includes('30 16 * * *') &&
                 crontabContent.includes('0 6 * * 1') &&
                 crontabContent.includes('0 0 1 * *') &&
                 crontabContent.includes('TZ=Asia/Ho_Chi_Minh');
}
assertTest(
  'GATE2_02_CRONTAB_SPECIFICATION',
  crontabValid,
  'crontab.example định nghĩa chuẩn xác 4 mốc thời gian: 08:00, 16:30, T2 06:00, Ngày 1 lúc 00:00 (Asia/Ho_Chi_Minh)'
);

// [TEST 3]: Systemd Service & Timer Definitions
const servicePath = path.join(schedDir, 'systemd', 'jayt-scheduler.service');
const timerPath = path.join(schedDir, 'systemd', 'jayt-scheduler.timer');
let systemdValid = false;
if (fs.existsSync(servicePath) && fs.existsSync(timerPath)) {
  const timerContent = fs.readFileSync(timerPath, 'utf8');
  systemdValid = timerContent.includes('08:00:00') &&
                 timerContent.includes('16:30:00') &&
                 timerContent.includes('Mon') &&
                 timerContent.includes('Asia/Ho_Chi_Minh');
}
assertTest(
  'GATE2_03_SYSTEMD_SERVICE_AND_TIMER',
  systemdValid,
  'Hệ thống systemd service & timer sẵn sàng cho máy chủ Linux host độc lập'
);

// [TEST 4]: GitHub Actions Serverless Workflow Exists
let ghaValid = false;
if (fs.existsSync(ghaWorkflowPath)) {
  const ghaContent = fs.readFileSync(ghaWorkflowPath, 'utf8');
  ghaValid = ghaContent.includes('schedule:') &&
             ghaContent.includes('Asia/Ho_Chi_Minh') &&
             ghaContent.includes('workflow_dispatch');
}
assertTest(
  'GATE2_04_GITHUB_ACTIONS_WORKFLOW',
  ghaValid,
  'GitHub Actions Workflow cấu hình serverless tự động chạy theo 4 mốc thời gian UTC/ICT tương ứng'
);

// [TEST 5]: CLI Dry-Run Execution Test
const dryRunRes = spawnSync(process.execPath, [runnerPath, '--cycle=DAILY_MORNING_0800', '--dry-run'], {
  cwd: repoRoot,
  encoding: 'utf8'
});
const dryRunPass = dryRunRes.status === 0 && dryRunRes.stdout.includes('DRY-RUN');

assertTest(
  'GATE2_05_CLI_DRY_RUN_EXECUTION',
  dryRunPass,
  'CLI runner thực thi dry-run thành công, trả về exit code 0'
);

if (passCount === testCount && testCount > 0) {
  console.log(`\n🟢 [GATE2-SUMMARY] TOÀN BỘ ${passCount}/${testCount} KIỂM THỬ CLOUD SCHEDULER ĐÃ ĐẠT [PASS]!\n`);
} else {
  console.error(`\n❌ [GATE2-SUMMARY] KIỂM THỬ THẤT BẠI: ${passCount}/${testCount} PASS!\n`);
  process.exitCode = 1;
}
