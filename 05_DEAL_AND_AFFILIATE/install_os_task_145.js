const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const userHome = process.env.USERPROFILE || 'C:\\Users\\tritr';
const launcherBatPath = path.join(userHome, 'run_jayt_worker_145.bat');
const taskName = 'JAYT_AUTONOMOUS_SUPPLY_WORKER_145';

// 1. Create robust launcher batch in User Profile (pure ASCII path)
const batContent = `@echo off
chcp 65001 > nul
cd /d "${repoRoot}"
"${process.execPath}" "05_DEAL_AND_AFFILIATE\\jayt_autonomous_worker_145.js" --limit 2
`;
fs.writeFileSync(launcherBatPath, batContent, 'utf8');
console.log(`✅ Created Launcher Batch at: ${launcherBatPath}`);

// 2. Register Scheduled Task in Windows Task Scheduler
const psScript = `
$bat = '${launcherBatPath.replace(/'/g, "''")}'
$action = New-ScheduledTaskAction -Execute $bat
$trigger = New-ScheduledTaskTrigger -Daily -At 3am
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries
Register-ScheduledTask -TaskName "${taskName}" -Action $action -Trigger $trigger -Settings $settings -Force
`;

const psScriptPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'register_task.ps1');
fs.writeFileSync(psScriptPath, psScript, 'utf8');

console.log('--- REGISTERING TASK VIA POWERSHELL ---');
const out = execSync(`powershell -NoProfile -ExecutionPolicy Bypass -File "${psScriptPath}"`, { encoding: 'utf8' });
console.log(out);

console.log('--- QUERYING TASK DETAILS ---');
const queryOut = execSync(`schtasks /query /tn "${taskName}" /fo LIST /v`, { encoding: 'utf8' });
console.log(queryOut);
