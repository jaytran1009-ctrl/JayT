/**
 * JAYT QA EVIDENCE LOADER ENTRYPOINT (PILLAR 4: QUALITY_ASSURANCE)
 * Governing Directive: JAYT-245 Section JAYT-260-CORRECTION-4 (Lines 5488-5501)
 *
 * Provides evidence file and ledger loading for test suites strictly through the Canonical Admission Gateway.
 */

const { readEvidenceFile, loadAndValidateLedger } = require('../00_PROGRAM_BASELINE/jayt_canonical_admission_gateway.js');

function loadQAEvidence(relativePath) {
  return readEvidenceFile(relativePath, "QUALITY_ASSURANCE");
}

function loadQALedger(ledgerPath) {
  return loadAndValidateLedger(ledgerPath, "QUALITY_ASSURANCE");
}

module.exports = {
  loadQAEvidence,
  loadQALedger
};
