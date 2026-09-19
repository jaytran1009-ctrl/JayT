const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
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
      console.log(`Run ID: ${manifest.run_id}`);
      console.log(`Execution Mode: ${manifest.execution_mode}`);
      console.log(`Execution Origin: ${manifest.execution_origin}`);
      console.log(`Host Scheduler Status: ${manifest.host_scheduler_status}`);
      console.log(JSON.stringify(manifest.summary, null, 2));
      console.log('\n--- RECONCILIATION ---');
      console.log(JSON.stringify(manifest.reconciliation, null, 2));
      console.log('\n--- STAGING GATE ---');
      console.log(manifest.automated_staging_gate_evaluation);
    }
  }
}

const regPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'autonomous_schedule_registry_150.json');
if (fs.existsSync(regPath)) {
  const reg = JSON.parse(fs.readFileSync(regPath, 'utf8'));
  console.log('\n--- REGISTRY 150 STATUS ---');
  console.log(`Total Targets in Registry: ${reg.items.length}`);
  console.log(`Stale Sources Count: ${reg.stale_sources_count}`);
  const discovered = reg.items.filter(i => i.target_type === 'DISCOVERED_OFFER_LEAF');
  console.log(`Newly Discovered Offer Leaves: ${discovered.length}`);
}
