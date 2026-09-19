const { execSync } = require('child_process');
const fs = require('fs');

console.log('=== DIAGNOSING WINDOWS TASK SCHEDULER & EVENT LOGS ===\n');

// 1. Check all JAYT tasks via schtasks
try {
  const out = execSync('schtasks /query /fo LIST /v', { encoding: 'utf8' });
  const tasks = out.split('\n\n').filter(t => t.toUpperCase().includes('JAYT'));
  console.log(`Found ${tasks.length} JAYT task(s) in schtasks:`);
  tasks.forEach((t, i) => console.log(`[Task ${i + 1}]\n${t.trim()}\n`));
} catch (e) {
  console.error('Error querying schtasks:', e.message);
}

// 2. Check Task Scheduler Operational Event Log via PowerShell script
try {
  const psScript = `
Get-WinEvent -LogName 'Microsoft-Windows-TaskScheduler/Operational' -MaxEvents 20 -ErrorAction SilentlyContinue | 
  Select-Object TimeCreated, Id, Message | Format-List
`;
  const psFile = '07_QUALITY_ASSURANCE/temp_check_events.ps1';
  fs.writeFileSync(psFile, '\uFEFF' + psScript, 'utf8');
  const eventOut = execSync(`powershell -NoProfile -ExecutionPolicy Bypass -File "${psFile}"`, { encoding: 'utf8' });
  console.log('Recent TaskScheduler Operational Events:\n', eventOut.trim() || 'NO_EVENTS_FOUND_OR_LOG_DISABLED');
  fs.unlinkSync(psFile);
} catch (e) {
  console.log('TaskScheduler Operational log query failed or not enabled:', e.message);
}
