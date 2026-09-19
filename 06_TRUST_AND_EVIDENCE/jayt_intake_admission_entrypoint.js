/**
 * JAYT INTAKE ADMISSION ENTRYPOINT (PILLAR 1: INTAKE)
 * Governing Directives:
 * - JAYT-245 Section JAYT-260-CORRECTION-4 (Lines 5488-5501)
 * - JAYT-245 Section JAYT-264-CORRECTION-1 (Lines 5802-5815)
 *
 * Ingests candidates and raw payloads strictly through the Canonical Admission Gateway.
 */

const { verifyCandidateAdmission, readEvidenceFile } = require('../00_PROGRAM_BASELINE/jayt_canonical_admission_gateway.js');

function ingestCandidatePayload(candidate, customOverlayPath = null) {
  // Enforce candidate admission, retirement overlay, and denylist checking via Gateway
  verifyCandidateAdmission(candidate, "INTAKE", customOverlayPath);

  if (candidate.raw_vault_path) {
    const rawData = readEvidenceFile(candidate.raw_vault_path, "INTAKE");
    if (candidate.raw_sha256 && rawData.sha256 !== candidate.raw_sha256) {
      throw new Error('ERR_RAW_SHA_MISMATCH: Ingest expected ' + candidate.raw_sha256 + ' but read ' + rawData.sha256);
    }
  }

  return {
    status: "INGEST_ADMITTED",
    candidate_id: candidate.candidate_id,
    intakeStatus: "RAW_CAPTURED",
    admissionState: "OPEN_EVALUATING"
  };
}

module.exports = { ingestCandidatePayload };
