/**
 * JAYT OS TASK INSTALLER & LAUNCHER (147)
 * Directive: JAYT-147: KHÔI PHỤC TÍNH TIN CẬY CỦA AUTONOMOUS SUPPLY ENGINE
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const userHome = process.env.USERPROFILE || 'C:\\Users\\tritr';
const launcherBatPath = path.join(userHome, 'run_jayt_worker_147.bat');
const taskName = 'JAYT_AUTONOMOUS_SUPPLY_WORKER_147';
const workerScript147 = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'jayt_autonomous_worker_147.js');

// 1. Create robust Launcher Batch in User Profile (pure ASCII path)
const batContent = `@echo off
chcp 65001 > nul
cd /d "${repoRoot}"
"${process.execPath}" "05_DEAL_AND_AFFILIATE\\jayt_autonomous_worker_147.js" --scheduled-cycle
`;
fs.writeFileSync(launcherBatPath, batContent, 'utf8');
console.log(`✅ Created Launcher Batch at ${launcherBatPath} invoking --scheduled-cycle.`);

function installAndVerifyOsTask147() {
  console.log('========================================================================');
  console.log(`🔧 INSTALLING REAL WINDOWS SCHEDULED TASK: ${taskName}`);
  console.log('========================================================================\n');

  try {
    const psScript = `
$bat = '${launcherBatPath.replace(/'/g, "''")}'
$action = New-ScheduledTaskAction -Execute $bat
$trigger = New-ScheduledTaskTrigger -Daily -At 3am
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries
Register-ScheduledTask -TaskName "${taskName}" -Action $action -Trigger $trigger -Settings $settings -Force
`;
    const psScriptPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'register_task_147.ps1');
    fs.writeFileSync(psScriptPath, psScript, 'utf8');

    console.log('--- REGISTERING SCHEDULED TASK VIA POWERSHELL ---');
    const out = execSync(`powershell -NoProfile -ExecutionPolicy Bypass -File "${psScriptPath}"`, { encoding: 'utf8' });
    console.log(out);

    console.log('--- QUERYING TASK DETAILS FROM WINDOWS TASK SCHEDULER ---');
    const queryCmd = `schtasks /query /tn "${taskName}" /fo LIST /v`;
    const queryOut = execSync(queryCmd, { encoding: 'utf8' });
    console.log(queryOut);

    return {
      success: true,
      task_name: taskName,
      runner_bat: launcherBatPath,
      raw_query_output: queryOut
    };
  } catch (err) {
    console.error(`❌ Failed to install/query task: ${err.message}`);
    return {
      success: false,
      error: err.message
    };
  }
}

if (require.main === module) {
  installAndVerifyOsTask147();
}

module.exports = {
  installAndVerifyOsTask147,
  taskName,
  launcherBatPath
};
