/**
 * JAYT-110R: WINDOWS TASK SCHEDULER REGISTRATION
 * 
 * Registers 5 real daily Windows Task Scheduler tasks:
 * 1. JayT_Beta_Auton_0700 (07:00 daily)
 * 2. JayT_Beta_Auton_1045 (10:45 daily)
 * 3. JayT_Beta_Auton_1400 (14:00 daily)
 * 4. JayT_Beta_Auton_1700 (17:00 daily)
 * 5. JayT_Beta_Auton_2030 (20:30 daily)
 * 
 * Saves receipt to 08_RELEASE_VAULT/WINDOWS_TASK_SCHEDULER_RECEIPT_110R.json
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const nodePath = process.execPath;
const scriptPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE/fresh_recapture_engine_110r.js');
const receiptPath = path.join(repoRoot, '08_RELEASE_VAULT/WINDOWS_TASK_SCHEDULER_RECEIPT_110R.json');

const TASKS = [
  { name: 'JayT_Beta_Auton_0700', time: '07:00', label: 'Morning Kickoff & Breakfast/Coffee Scan' },
  { name: 'JayT_Beta_Auton_1045', time: '10:45', label: 'Lunch F&B Real-time Scan' },
  { name: 'JayT_Beta_Auton_1400', time: '14:00', label: 'Afternoon Mobility & Work Cafe Scan' },
  { name: 'JayT_Beta_Auton_1700', time: '17:00', label: 'Evening Cinema & Entertainment Peak Scan' },
  { name: 'JayT_Beta_Auton_2030', time: '20:30', label: 'Nightly TTL Expiry Audit & Parity Recheck' }
];

function registerTasks() {
  console.log('📝 [SCHEDULER-110R] Bắt đầu đăng ký 5 Windows Task Scheduler tasks thực tế...\n');
  console.log(`Node Executable: ${nodePath}`);
  console.log(`Target Script:   ${scriptPath}\n`);

  const taskResults = [];

  for (const t of TASKS) {
    console.log(`⏳ Đang đăng ký: ${t.name} (Chạy lúc ${t.time} hàng ngày)...`);
    
    // Use PowerShell Register-ScheduledTask to register cleanly
    const psCmd = `powershell -NoProfile -Command "$action = New-ScheduledTaskAction -Execute '${nodePath}' -Argument '\\\"${scriptPath}\\\"' -WorkingDirectory '${repoRoot}'; $trigger = New-ScheduledTaskTrigger -Daily -At '${t.time}'; Register-ScheduledTask -TaskName '${t.name}' -Action $action -Trigger $trigger -Description 'JayT Beta Autonomous Operations - ${t.label}' -Force"`;
    
    try {
      const regOut = execSync(psCmd, { encoding: 'utf8' });
      console.log(`  -> Đăng ký thành công!`);

      // Query task status
      const queryCmd = `schtasks /query /tn "${t.name}" /fo list`;
      const queryOut = execSync(queryCmd, { encoding: 'utf8' });

      // Parse query output
      const statusMatch = queryOut.match(/Status:\s+([^\r\n]+)/i);
      const nextRunMatch = queryOut.match(/Next Run Time:\s+([^\r\n]+)/i);
      const hostMatch = queryOut.match(/HostName:\s+([^\r\n]+)/i);

      const taskInfo = {
        task_name: t.name,
        scheduled_time: t.time,
        label: t.label,
        state: statusMatch ? statusMatch[1].trim() : 'Ready',
        next_run_time: nextRunMatch ? nextRunMatch[1].trim() : null,
        host_name: hostMatch ? hostMatch[1].trim() : null,
        target_executable: nodePath,
        target_script: scriptPath,
        registered_at: new Date().toISOString()
      };

      console.log(`     Trạng thái: ${taskInfo.state} | Lần chạy kế: ${taskInfo.next_run_time}`);
      taskResults.push(taskInfo);
    } catch (err) {
      console.error(`  ❌ Lỗi khi đăng ký task ${t.name}:`, err.stdout || err.message);
      throw err;
    }
  }

  // Write receipt
  const receipt = {
    receipt_id: 'WINDOWS_TASK_SCHEDULER_RECEIPT_110R',
    work_order: 'JAYT-110R-REAL-SCHEDULER-AND-FRESH-RECAPTURE',
    generated_at: new Date().toISOString(),
    total_tasks_registered: taskResults.length,
    status: 'ALL_TASKS_REGISTERED_AND_READY',
    tasks: taskResults
  };

  fs.writeFileSync(receiptPath, JSON.stringify(receipt, null, 2), 'utf8');
  console.log(`\n✅ Biên nhận Windows Task Scheduler đã ghi tại: ${path.relative(repoRoot, receiptPath)}`);
  return receipt;
}

module.exports = {
  TASKS,
  registerTasks
};

if (require.main === module) {
  try {
    registerTasks();
  } catch (err) {
    process.exit(1);
  }
}
