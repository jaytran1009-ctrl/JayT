/**
 * JAYT BATCH 143R RUNNER (CERTIFIED NATIVE HARNESS)
 * Directive: JAYT-143R: CAPTURE-PROVENANCE INCIDENT, HARNESS CERTIFICATION & SCHEDULER FREEZE
 */

const fs = require('fs');
const path = require('path');
const { runBatchCaptureNative143R } = require('./native_event_capture_harness_143r');

const repoRoot = path.resolve(__dirname, '..');
const queuePath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_143_queue.json');
const outputBaseDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_143r_captures');

async function execute143RBatch() {
  console.log('========================================================================');
  console.log('🌐 JAYT-143R: EXECUTING BATCH RUN ON CERTIFIED NATIVE HARNESS');
  console.log('========================================================================\n');

  const queue = JSON.parse(fs.readFileSync(queuePath, 'utf8'));
  console.log(`📋 Loaded Queue 143: ${queue.total_urls_queued} URLs across 3 Cohorts.`);

  const res = await runBatchCaptureNative143R(queue.items, outputBaseDir);

  const manifest143rRun = {
    batch_run_id: res.capture_run_id,
    executed_at: new Date().toISOString(),
    total_captures: res.results.length,
    trusted_receipts: res.results.filter(r => r.is_trusted).length,
    unproven_receipts: res.results.filter(r => !r.is_trusted).length,
    captures: res.results
  };

  const summaryPath = path.join(outputBaseDir, 'CAPTURE_RUN_143R_SUMMARY.json');
  fs.writeFileSync(summaryPath, JSON.stringify(manifest143rRun, null, 2), 'utf8');

  console.log('\n========================================================================');
  console.log(`✅ 143R CERTIFIED BATCH CAPTURE COMPLETE: ${res.results.length} URLs Processed.`);
  console.log(`- Trusted Receipts (Observed HTTP Response): ${manifest143rRun.trusted_receipts}`);
  console.log(`- Unproven Receipts (Timeout/Network Error/Blocked): ${manifest143rRun.unproven_receipts}`);
  console.log(`📂 Output Directory: ${outputBaseDir}`);
  console.log('========================================================================\n');
}

execute143RBatch();
