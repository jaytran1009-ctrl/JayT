/**
 * JAYT AUTONOMOUS BATCH SCHEDULER DAEMON (143R)
 * Directive: JAYT-143R: CAPTURE-PROVENANCE INCIDENT, HARNESS CERTIFICATION & SCHEDULER FREEZE
 */

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const registryPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'fresh_source_registry_143r.json');
const manifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_143r_manifest.json');
const batchTablePath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_143r_table.json');

const SCHEDULER_CONFIG = {
  source_index_scan_interval_ms: 7 * 24 * 60 * 60 * 1000, // 7 days
  offer_leaf_scan_interval_ms: 24 * 60 * 60 * 1000,      // 24 hours
  error_backoff_ms: 7 * 24 * 60 * 60 * 1000,             // 7 days
  min_complete_bundles_for_staging: 10,
  min_categories_for_staging: 3
};

function checkSchedulerStatus143R() {
  console.log('🤖 [SCHEDULER-DAEMON-143R] Evaluating autonomous batch scheduler state...');

  if (!fs.existsSync(registryPath) || !fs.existsSync(batchTablePath)) {
    console.log('⚠️ [SCHEDULER] Registries not yet populated. Standing by for fresh capture completion.');
    return { status: 'STANDBY_INITIAL_CAPTURE_REQUIRED' };
  }

  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const batchTable = JSON.parse(fs.readFileSync(batchTablePath, 'utf8'));

  const now = Date.now();
  let dueForSourceScan = 0;
  let dueForLeafScan = 0;

  for (const src of registry.sources) {
    const dueTime = new Date(src.next_check_due).getTime();
    if (dueTime <= now) {
      if (src.state === 'HTTP_ERROR_BACKOFF') {
        dueForSourceScan++;
      } else {
        dueForLeafScan++;
      }
    }
  }

  const completeCount = batchTable.state_distribution.EVIDENCE_COMPLETE_FOR_REVIEW;
  const stagingReady = completeCount >= SCHEDULER_CONFIG.min_complete_bundles_for_staging;

  const status = {
    daemon_id: 'SCHEDULER_DAEMON_143R',
    evaluated_at: new Date().toISOString(),
    config: SCHEDULER_CONFIG,
    sources_monitored_count: registry.sources.length,
    sources_due_for_scan: dueForSourceScan + dueForLeafScan,
    complete_offer_bundles_count: completeCount,
    staging_gate_status: stagingReady ? 'STAGING_PROPOSAL_READY' : 'CONTINUE_ACQUISITION',
    governance_lock: 'LIVE_DEPLOYMENT_LOCKED_PENDING_CEO_APPROVAL'
  };

  console.log('📊 Scheduler Evaluation Result:');
  console.log(`- Monitored Sources: ${status.sources_monitored_count}`);
  console.log(`- Staging Gate Status: 🎯 [${status.staging_gate_status}] (${completeCount}/${SCHEDULER_CONFIG.min_complete_bundles_for_staging} bundles)`);
  console.log(`- Governance Lock: 🔒 ${status.governance_lock}`);

  return status;
}

if (require.main === module) {
  checkSchedulerStatus143R();
}

module.exports = {
  SCHEDULER_CONFIG,
  checkSchedulerStatus143R
};
