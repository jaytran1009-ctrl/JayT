/**
 * Delegator to 07_QUALITY_ASSURANCE/runners/run_candidate_j361_audit.cjs
 */
const { runAudit } = require('./runners/run_candidate_j361_audit.cjs');
if (require.main === module) {
  runAudit().catch(err => {
    console.error('Fatal audit error:', err);
    process.exit(1);
  });
}
module.exports = { runAudit };
