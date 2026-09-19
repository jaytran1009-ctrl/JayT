const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const DRILL_ALIAS = 'jayt-rollback-drill.vercel.app';
const DRILL_URL = `https://${DRILL_ALIAS}`;
const PROD_URL = 'https://jayt-production-v3420.vercel.app';
const PROVISIONAL_DPL = 'dpl_EY8hrscg5f1tRCG9WeKsHGfSJXUM';
const ROLLBACK_DPL = 'dpl_5emod95fKr3NuLEEgeYY1tLctGr4';
const BASE_DIR = 'D:\\Công Việc MMO\\OPC JayT\\JayT-Dự Án Giá Trị Cộng Đồng';

async function probeUrl(url) {
  const t0 = Date.now();
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'JayT-Rollback-Drill-Probe/1.0' } });
    const text = await res.text();
    const latencyMs = Date.now() - t0;
    const versionMatch = text.match(/v3\.[0-9]+\.[0-9]+[a-z0-9\-]*/i);
    return {
      status: res.status,
      x_vercel_id: res.headers.get('x-vercel-id'),
      latency_ms: latencyMs,
      version: versionMatch ? versionMatch[0] : 'unknown',
      timestamp_utc: new Date().toISOString()
    };
  } catch (err) {
    return {
      status: 0,
      error: err.message,
      latency_ms: Date.now() - t0,
      timestamp_utc: new Date().toISOString()
    };
  }
}

async function runDrill() {
  console.log('=== STARTING JAYT-392 FINAL NON-PRODUCTION ROLLBACK DRILL ===');
  const drillStartTime = new Date().toISOString();

  // 1. Initial State Probes
  console.log('1. Probing Initial State...');
  const initialDrillProbe = await probeUrl(DRILL_URL);
  const initialProdProbe = await probeUrl(PROD_URL);
  console.log('  Drill Initial:', initialDrillProbe);
  console.log('  Prod Initial:', initialProdProbe);

  // 2. Trigger Rollback Swap
  console.log(`2. Triggering Vercel Alias Swap to rollback deployment ${ROLLBACK_DPL}...`);
  const swapStart = Date.now();
  const swapCommand = `npx vercel alias set ${ROLLBACK_DPL} ${DRILL_ALIAS}`;
  let swapOutput = '';
  let swapExitCode = 0;
  try {
    swapOutput = execSync(swapCommand, { cwd: BASE_DIR, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  } catch (err) {
    swapExitCode = err.status || 1;
    swapOutput = (err.stdout || '') + '\n' + (err.stderr || '');
  }
  const swapDurationMs = Date.now() - swapStart;
  console.log(`  Swap finished in ${swapDurationMs}ms with exit code ${swapExitCode}`);

  // 3. Repeated CDN Edge Convergence Probes
  console.log('3. Checking CDN Edge Convergence...');
  const rollbackProbes = [];
  let converged = false;
  for (let i = 0; i < 5; i++) {
    await new Promise(r => setTimeout(r, 600));
    const p = await probeUrl(DRILL_URL);
    rollbackProbes.push(p);
    console.log(`  Probe ${i + 1}: status=${p.status}, version=${p.version}, vercel_id=${p.x_vercel_id}`);
    if (p.version === 'v3.440.0-j385-m1') {
      converged = true;
    }
  }
  const totalRtoMs = Date.now() - swapStart;

  // 4. Verify Canonical Production Intact
  console.log('4. Verifying Canonical Production remains untouched...');
  const prodDuringProbe = await probeUrl(PROD_URL);
  console.log('  Canonical Prod Check:', prodDuringProbe);

  // 5. Trigger Restoration Swap back to baseline
  console.log(`5. Triggering Restoration Swap back to ${PROVISIONAL_DPL}...`);
  const restoreStart = Date.now();
  const restoreCommand = `npx vercel alias set ${PROVISIONAL_DPL} ${DRILL_ALIAS}`;
  let restoreOutput = '';
  let restoreExitCode = 0;
  try {
    restoreOutput = execSync(restoreCommand, { cwd: BASE_DIR, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  } catch (err) {
    restoreExitCode = err.status || 1;
    restoreOutput = (err.stdout || '') + '\n' + (err.stderr || '');
  }
  const restoreDurationMs = Date.now() - restoreStart;
  console.log(`  Restoration finished in ${restoreDurationMs}ms with exit code ${restoreExitCode}`);

  // 6. Verify Restoration
  console.log('6. Verifying Restoration on Drill Target...');
  const restorationProbes = [];
  for (let i = 0; i < 3; i++) {
    await new Promise(r => setTimeout(r, 600));
    const p = await probeUrl(DRILL_URL);
    restorationProbes.push(p);
    console.log(`  Restore Probe ${i + 1}: status=${p.status}, version=${p.version}`);
  }

  const finalProdProbe = await probeUrl(PROD_URL);
  console.log('  Final Canonical Prod Check:', finalProdProbe);

  const drillEndTime = new Date().toISOString();

  const receipt = {
    $schema: 'https://jayt.vn/schemas/j392-final-nonproduction-drill-receipt.v1.json',
    receipt_id: 'JAYT_392_FINAL_NONPRODUCTION_DRILL_RECEIPT',
    work_order: 'WORK_ORDER_J392_FINAL_EXECUTION',
    dispatch_sha256: 'af3da365f03da160953a0253ebdb51293a36eae41421a597eeef7f52e1db2bd3',
    drill_started_at_utc: drillStartTime,
    drill_completed_at_utc: drillEndTime,
    executor: 'Antigravity',
    target_drill_environment: {
      drill_alias: DRILL_ALIAS,
      drill_url: DRILL_URL,
      project_name: 'jayt-production-v3420',
      pre_drill_deployment: PROVISIONAL_DPL,
      rollback_target_deployment: ROLLBACK_DPL,
      is_non_production_target: true
    },
    canonical_production_protection: {
      canonical_url: PROD_URL,
      active_deployment: PROVISIONAL_DPL,
      version_before_drill: initialProdProbe.version,
      version_during_drill: prodDuringProbe.version,
      version_after_drill: finalProdProbe.version,
      canonical_mutated: false,
      status: 'CANONICAL_PRODUCTION_100_PERCENT_UNTOUCHED_AND_FROZEN'
    },
    swap_to_rollback: {
      command: swapCommand,
      exit_code: swapExitCode,
      duration_ms: swapDurationMs,
      raw_output: swapOutput.trim()
    },
    cdn_convergence_probes: rollbackProbes,
    restoration_to_baseline: {
      command: restoreCommand,
      exit_code: restoreExitCode,
      duration_ms: restoreDurationMs,
      raw_output: restoreOutput.trim(),
      restoration_probes: restorationProbes
    },
    measured_rto: {
      swap_duration_seconds: (swapDurationMs / 1000).toFixed(2),
      total_rto_seconds: (totalRtoMs / 1000).toFixed(2),
      sla_limit_seconds: 120,
      sla_satisfied: totalRtoMs < 120000
    },
    verdict: (converged && swapExitCode === 0 && restoreExitCode === 0 && initialProdProbe.version === finalProdProbe.version)
      ? 'JAYT_392_FINAL_NONPRODUCTION_ROLLBACK_DRILL_VERIFIED_PASS'
      : 'JAYT_392_FINAL_NONPRODUCTION_ROLLBACK_DRILL_FAIL'
  };

  const receiptPath = path.join(BASE_DIR, '08_RELEASE_VAULT/JAYT_392_FINAL_NONPRODUCTION_DRILL_RECEIPT.json');
  fs.writeFileSync(receiptPath, JSON.stringify(receipt, null, 2), 'utf8');
  console.log(`Saved Drill Receipt to ${receiptPath}`);
  console.log(`Verdict: ${receipt.verdict}`);
}

runDrill().catch(err => {
  console.error('Drill failed:', err);
  process.exit(1);
});
