// Bridge forwarding scheduled executions to J358 Freshness Guardian
const { runFreshnessGuardian } = require('./run_jayt_358_freshness_guardian.cjs');

if (require.main === module) {
  console.log('[SCHEDULER_BRIDGE] Forwarding JayT-Ops-Monitor scheduled execution to Freshness Guardian v3.429.0...');
  runFreshnessGuardian().catch(err => {
    console.error('[SCHEDULER_BRIDGE] Freshness Guardian failed:', err);
    process.exit(1);
  });
}

module.exports = { runFreshnessGuardian };
