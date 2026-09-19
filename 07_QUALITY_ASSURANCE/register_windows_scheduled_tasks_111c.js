/**
 * JAYT WINDOWS TASK SCHEDULER REGISTRATION SCRIPT (111C)
 * Directive: JAYT-111C-TRUE-SCHEDULER-AND-VERIFIED-VENUE-PROMOTION
 * 
 * Registers 5 real OS Scheduled Tasks using PowerShell's Register-ScheduledTask
 * to ensure bulletproof Unicode working directory and arguments.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const receiptPath = path.join(repoRoot, '08_RELEASE_VAULT/WINDOWS_TASK_SCHEDULER_RECEIPT_111C.json');

const TASKS = [
  { name: 'JayT_Beta_Auton_0700', time: '07:00', desc: 'JayT Beta Autonomous Operations - Morning Kickoff & Breakfast Scan' },
  { name: 'JayT_Beta_Auton_1045', time: '10:45', desc: 'JayT Beta Autonomous Operations - Lunch Peak Deals Scan' },
  { name: 'JayT_Beta_Auton_1400', time: '14:00', desc: 'JayT Beta Autonomous Operations - Afternoon Coffee & Work Venue Refresh' },
  { name: 'JayT_Beta_Auton_1700', time: '17:00', desc: 'JayT Beta Autonomous Operations - Evening Entertainment & Cinema Scan' },
  { name: 'JayT_Beta_Auton_2030', time: '20:30', desc: 'JayT Beta Autonomous Operations - Night Expiration Audit & Tomorrow Prep' }
];

function registerAllTasks() {
  console.log('⏰ [SCHEDULER-111C] Bắt đầu đăng ký 5 Windows Scheduled Tasks thực tế...');
  const registeredTasks = [];

  for (const t of TASKS) {
    console.log(`  -> Đăng ký Task: ${t.name} (Mốc chạy: ${t.time} hàng ngày)...`);
    const psScriptPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', `_tmp_register_${t.name}.ps1`);
    const psScript = `
$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$workDir = '${repoRoot.replace(/'/g, "''")}'
$action = New-ScheduledTaskAction -Execute 'node.exe' -Argument '05_DEAL_AND_AFFILIATE/autonomous_orchestrator_111c.js' -WorkingDirectory $workDir
$trigger = New-ScheduledTaskTrigger -Daily -At '${t.time}'
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable
Register-ScheduledTask -TaskName '${t.name}' -Description '${t.desc}' -Action $action -Trigger $trigger -Settings $settings -Force | Out-Null
`;
    fs.writeFileSync(psScriptPath, psScript, 'utf8');

    try {
      execSync(`powershell.exe -NoProfile -ExecutionPolicy Bypass -File "${psScriptPath}"`, { cwd: repoRoot, stdio: 'pipe' });
      
      // Verify registration
      const queryPs = `(Get-ScheduledTask -TaskName '${t.name}').State`;
      const state = execSync(`powershell.exe -NoProfile -Command "${queryPs}"`, { cwd: repoRoot, encoding: 'utf8' }).trim();

      registeredTasks.push({
        task_name: t.name,
        schedule_time: t.time,
        state: state,
        action: 'node.exe 05_DEAL_AND_AFFILIATE/autonomous_orchestrator_111c.js',
        working_directory: repoRoot,
        registered_at: new Date().toISOString()
      });
      console.log(`     ✅ Đã đăng ký thành công [${t.name}] - Trạng thái: ${state}`);
    } catch (err) {
      console.error(`     ❌ Lỗi đăng ký [${t.name}]:`, err.message);
      throw err;
    } finally {
      if (fs.existsSync(psScriptPath)) {
        fs.unlinkSync(psScriptPath);
      }
    }
  }

  const receipt = {
    batch_id: 'SCHEDULER_REGISTRATION_111C_' + Date.now(),
    directive: 'JAYT-111C-TRUE-SCHEDULER-AND-VERIFIED-VENUE-PROMOTION',
    total_tasks_registered: registeredTasks.length,
    orchestrator_script: '05_DEAL_AND_AFFILIATE/autonomous_orchestrator_111c.js',
    registered_tasks: registeredTasks,
    completed_at: new Date().toISOString()
  };

  fs.writeFileSync(receiptPath, JSON.stringify(receipt, null, 2), 'utf8');
  console.log(`\n🎉 [SCHEDULER-111C] Hoàn tất đăng ký ${registeredTasks.length}/5 Tasks! Receipt đã lưu tại: ${receiptPath}`);
  return receipt;
}

if (require.main === module) {
  try {
    registerAllTasks();
  } catch (e) {
    process.exit(1);
  }
}

module.exports = { registerAllTasks, TASKS };

