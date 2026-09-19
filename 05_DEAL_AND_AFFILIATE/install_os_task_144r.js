/**
 * JAYT OS TASK INSTALLER & QUERY MANAGER (144R)
 * Directive: JAYT-144R: CÀI ĐẶT SCHEDULER THẬT, END-TO-END SMOKE RUN VÀ KHÔI PHỤC AUTONOMY
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const workerScriptPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'jayt_autonomous_worker_144r.js');
const runnerBatPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'run_scheduler_task.bat');

// 1. Create a clean .bat launcher to prevent argument quote escaping issues on Windows
const batContent = `@echo off
cd /d "${repoRoot}"
"${process.execPath}" "${workerScriptPath}" --run-once
`;
fs.writeFileSync(runnerBatPath, batContent, 'utf8');
console.log(`✅ Created Task Launcher Batch: ${runnerBatPath}`);

const taskName = 'JAYT_AUTONOMOUS_SUPPLY_SCHEDULER_144';

function installAndVerifyOsTask() {
  console.log('========================================================================');
  console.log(`🔧 INSTALLING REAL WINDOWS SCHEDULED TASK: ${taskName}`);
  console.log('========================================================================\n');

  try {
    // schtasks /create /tn "taskName" /tr "runnerBatPath" /sc DAILY /st 03:00 /f
    const createCmd = `schtasks /create /tn "${taskName}" /tr "\\"${runnerBatPath}\\"" /sc DAILY /st 03:00 /f`;
    console.log(`Running: ${createCmd}`);
    const createOut = execSync(createCmd, { encoding: 'utf8' });
    console.log(createOut);

    // Query task details
    const queryCmd = `schtasks /query /tn "${taskName}" /fo LIST /v`;
    const queryOut = execSync(queryCmd, { encoding: 'utf8' });
    console.log('--- ACTUAL OS TASK QUERY OUTPUT ---');
    console.log(queryOut);

    return {
      success: true,
      task_name: taskName,
      runner_bat: runnerBatPath,
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
  installAndVerifyOsTask();
}

module.exports = {
  installAndVerifyOsTask,
  taskName
};
