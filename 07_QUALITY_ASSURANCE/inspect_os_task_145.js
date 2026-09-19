const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');

console.log('--- WINDOWS TASK SCHEDULER QUERY ---');
const queryCmd = 'schtasks /query /tn "JAYT_AUTONOMOUS_SUPPLY_WORKER_145" /fo LIST /v';
console.log(execSync(queryCmd, { encoding: 'utf8' }));

const runsBase = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'runs');
console.log('--- RUN DIRECTORIES ---');
if (fs.existsSync(runsBase)) {
  const dirs = fs.readdirSync(runsBase);
  console.log(dirs);
  if (dirs.length > 0) {
    const latestDir = path.join(runsBase, dirs[dirs.length - 1]);
    console.log(`Contents of latest run dir (${dirs[dirs.length - 1]}):`, fs.readdirSync(latestDir));
  }
}

const schedulerRuns = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'scheduler_runs');
console.log('--- RUN RECEIPTS ---');
if (fs.existsSync(schedulerRuns)) {
  console.log(fs.readdirSync(schedulerRuns));
}
