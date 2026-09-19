const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');

console.log('--- WINDOWS TASK SCHEDULER QUERY ---');
const queryCmd = 'schtasks /query /tn "JAYT_AUTONOMOUS_SUPPLY_WORKER_145" /fo LIST /v';
console.log(execSync(queryCmd, { encoding: 'utf8' }));

const runsBase = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'runs');
console.log('--- ALL RUN DIRECTORIES ---');
if (fs.existsSync(runsBase)) {
  const dirs = fs.readdirSync(runsBase);
  console.log(dirs);
  if (dirs.length > 0) {
    const latestDir = path.join(runsBase, dirs[dirs.length - 1]);
    console.log(`\nContents of latest run dir (${dirs[dirs.length - 1]}):`);
    console.log(fs.readdirSync(latestDir));

    const manifestPath = path.join(latestDir, 'RUN_MANIFEST.json');
    if (fs.existsSync(manifestPath)) {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      console.log('\n--- LATEST RUN MANIFEST SUMMARY ---');
      console.log(JSON.stringify(manifest.summary, null, 2));
      console.log('Staging Gate:', manifest.automated_staging_gate_evaluation);
    }
  }
}

const regPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'autonomous_schedule_registry_146.json');
if (fs.existsSync(regPath)) {
  const reg = JSON.parse(fs.readFileSync(regPath, 'utf8'));
  console.log('\n--- REGISTRY 146 STATUS ---');
  console.log(`Total Targets in Registry: ${reg.items.length}`);
  const discovered = reg.items.filter(i => i.target_type === 'DISCOVERED_OFFER_LEAF');
  console.log(`Newly Discovered Offer Leaves: ${discovered.length}`);
}
