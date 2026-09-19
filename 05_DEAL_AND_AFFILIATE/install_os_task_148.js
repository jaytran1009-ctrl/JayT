/**
 * JAYT OS TASK INSTALLER & LAUNCHER (148)
 * Directive: JAYT-148: SCHEDULER REALITY, LINEAGE PRECISION & AUTONOMOUS ACQUISITION
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const userHome = process.env.USERPROFILE || 'C:\\Users\\tritr';
const launcherBatPath = path.join(userHome, 'run_jayt_worker_148.bat');
const taskName = 'JAYT_AUTONOMOUS_SUPPLY_WORKER_148';
const scriptPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'jayt_autonomous_worker_148.js');
const nodeExePath = process.execPath;

// 1. Create robust Launcher Batch with UTF-8 support
const batContent = `@echo off
chcp 65001 > nul
set "OS_TRIGGERED=1"
"${nodeExePath}" "${scriptPath}" --scheduled-cycle --origin OS_TRIGGERED
`;
fs.writeFileSync(launcherBatPath, batContent, 'utf8');
console.log(`✅ Created Launcher Batch at ${launcherBatPath} invoking --scheduled-cycle --origin OS_TRIGGERED.`);

function installAndVerifyOsTask148() {
  console.log('========================================================================');
  console.log(`🔧 INSTALLING REAL WINDOWS SCHEDULED TASK: ${taskName}`);
  console.log('========================================================================\n');

  try {
    const psScript = `$nodePath = '${nodeExePath.replace(/'/g, "''")}'
$scriptPath = '${scriptPath.replace(/'/g, "''")}'
$repoRoot = '${repoRoot.replace(/'/g, "''")}'
$argList = "\`"$scriptPath\`" --scheduled-cycle --origin OS_TRIGGERED"
$action = New-ScheduledTaskAction -Execute $nodePath -Argument $argList -WorkingDirectory $repoRoot
$trigger = New-ScheduledTaskTrigger -Daily -At 3am
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries
Register-ScheduledTask -TaskName "${taskName}" -Action $action -Trigger $trigger -Settings $settings -Force
`;
    const psScriptPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'register_task_148.ps1');
    const BOM = '\uFEFF';
    fs.writeFileSync(psScriptPath, BOM + psScript, 'utf8');

    console.log('--- REGISTERING SCHEDULED TASK VIA POWERSHELL UTF-8 BOM ---');
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
  installAndVerifyOsTask148();
}

module.exports = {
  installAndVerifyOsTask148,
  taskName,
  launcherBatPath
};
