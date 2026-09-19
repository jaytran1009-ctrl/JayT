const { execSync } = require('child_process');
const path = require('path');

const nodePath = process.execPath;
const scriptPath = path.resolve(__dirname, '../05_DEAL_AND_AFFILIATE/schedule_autonomous_cron.js');

console.log('Node Path:', nodePath);
console.log('Script Path:', scriptPath);

try {
  const taskName = 'JayT_Beta_Auton_0700_Test';
  // Use powershell to create scheduled task cleanly
  const psCmd = `powershell -NoProfile -Command "$action = New-ScheduledTaskAction -Execute '${nodePath}' -Argument '${scriptPath}' -WorkingDirectory '${path.dirname(scriptPath)}'; $trigger = New-ScheduledTaskTrigger -Daily -At '07:00'; Register-ScheduledTask -TaskName '${taskName}' -Action $action -Trigger $trigger -Description 'JayT Test Task' -Force"`;
  
  console.log('Registering test task...');
  const regOut = execSync(psCmd, { encoding: 'utf8' });
  console.log('Register output:', regOut.trim());

  console.log('Querying test task...');
  const queryOut = execSync(`schtasks /query /tn "${taskName}" /fo list`, { encoding: 'utf8' });
  console.log('Query output:\n', queryOut);

  console.log('Deleting test task...');
  execSync(`schtasks /delete /tn "${taskName}" /f`, { encoding: 'utf8' });
  console.log('Cleaned up successfully!');
} catch (err) {
  console.error('Error:', err.stdout || err.message);
}
