/**
 * JAYT BATCH 144 CAPTURE RUNNER (CERTIFIED NATIVE HARNESS)
 * Directive: JAYT-144: SCHEDULER THẬT, QUÉT ĐA NGUỒN VÀ VÒNG LẶP CUNG ỨNG TỰ VẬN HÀNH
 */

const fs = require('fs');
const path = require('path');
const { runBatchCaptureNative143R } = require('./native_event_capture_harness_143r');

const repoRoot = path.resolve(__dirname, '..');
const queuePath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_144_queue.json');
const outputBaseDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_144_captures');

async function execute144Batch() {
  console.log('========================================================================');
  console.log('🌐 JAYT-144: EXECUTING MULTI-SOURCE BATCH ON CERTIFIED NATIVE HARNESS');
  console.log('========================================================================\n');

  const queue = JSON.parse(fs.readFileSync(queuePath, 'utf8'));
  console.log(`📋 Loaded Queue 144: ${queue.total_urls_queued} URLs across ${queue.total_brand_sources} Brands.`);

  const res = await runBatchCaptureNative143R(queue.items, outputBaseDir);

  const manifest144Run = {
    batch_run_id: res.capture_run_id,
    executed_at: new Date().toISOString(),
    total_captures: res.results.length,
    trusted_receipts: res.results.filter(r => r.is_trusted).length,
    unproven_receipts: res.results.filter(r => !r.is_trusted).length,
    captures: res.results
  };

  const summaryPath = path.join(outputBaseDir, 'CAPTURE_RUN_144_SUMMARY.json');
  fs.writeFileSync(summaryPath, JSON.stringify(manifest144Run, null, 2), 'utf8');

  console.log('\n========================================================================');
  console.log(`✅ 144 BATCH CAPTURE COMPLETE: ${res.results.length} URLs Processed.`);
  console.log(`- Trusted Receipts (Observed HTTP Response): ${manifest144Run.trusted_receipts}`);
  console.log(`- Unproven Receipts (Timeout/Error/Blocked): ${manifest144Run.unproven_receipts}`);
  console.log(`📂 Output Directory: ${outputBaseDir}`);
  console.log('========================================================================\n');
}

execute144Batch();
