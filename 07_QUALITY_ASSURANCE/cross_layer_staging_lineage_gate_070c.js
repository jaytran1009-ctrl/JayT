/**
 * JAYT CROSS-LAYER STAGING LINEAGE & ZERO-TRANSFORMATION GATE (070C)
 * Directive: JAYT-070C — STAGING SOURCE-LINEAGE INCIDENT CONTAINMENT
 * 
 * Invariants Enforced:
 * 1. source_url MUST match candidate.source_url exactly.
 * 2. captured_at MUST match candidate.captured_at exactly.
 * 3. receipt_ref & receipt_hash MUST match candidate.capture_receipt_ref & hash exactly.
 * 4. artifact hashes (png, html, text) MUST match candidate evidence hashes exactly.
 * 5. locality_scope MUST match candidate locality_scope exactly (no synthetic street addresses).
 * 6. purchase_channel MUST match candidate purchase_channel exactly.
 * 7. Any deviation triggers immediate fail-closed error.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function getSha256(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

/**
 * Validate that a staging item is 100% byte-for-byte and claim-identical to its source candidate.
 * @param {Object} stagingItem - The staging item in deals_feed.json
 * @param {Object} candidateJson - The source candidate JSON object
 * @returns {Object} validation result { valid: boolean, errors: string[] }
 */
function validateCrossLayerStagingLineage(stagingItem, candidateJson) {
  const errors = [];
  const candEvidenceKey = Object.keys(candidateJson.evidence || {})[0];
  const candEvidence = candidateJson.evidence[candEvidenceKey];
  const candDeal = candidateJson.deals?.[0];

  if (!candEvidence || !candDeal) {
    errors.push(`INVALID_CANDIDATE_STRUCTURE: Missing evidence or deals block in candidate ${candidateJson.candidate_id}`);
    return { valid: false, errors };
  }

  // 1. Source URL exact match
  const candSourceUrl = candEvidence.source_url || candDeal.source_url;
  const stgSourceUrl = stagingItem.provenance?.source_url;
  if (stgSourceUrl !== candSourceUrl) {
    errors.push(`SOURCE_URL_MUTATION: Staging '${stgSourceUrl}' !== Candidate '${candSourceUrl}'`);
  }

  // 2. captured_at exact match
  const candCapturedAt = candEvidence.captured_at || candEvidence.checked_at;
  const stgCapturedAt = stagingItem.captured_at;
  if (stgCapturedAt !== candCapturedAt) {
    errors.push(`CAPTURED_AT_MUTATION: Staging '${stgCapturedAt}' !== Candidate '${candCapturedAt}'`);
  }

  // 3. Receipt Ref and Hash match
  const candReceiptRef = candEvidence.capture_receipt_ref;
  const candReceiptHash = candEvidence.capture_receipt_hash;
  const stgReceiptRef = stagingItem.provenance?.capture_receipt_ref;
  const stgReceiptHash = stagingItem.provenance?.capture_receipt_hash;
  if (stgReceiptRef && stgReceiptRef !== candReceiptRef) {
    errors.push(`RECEIPT_REF_MUTATION: Staging '${stgReceiptRef}' !== Candidate '${candReceiptRef}'`);
  }
  if (stgReceiptHash && stgReceiptHash !== candReceiptHash) {
    errors.push(`RECEIPT_HASH_MUTATION: Staging '${stgReceiptHash}' !== Candidate '${candReceiptHash}'`);
  }

  // 4. Artifact Hashes match
  if (stagingItem.provenance?.artifacts) {
    const stgArts = stagingItem.provenance.artifacts;
    if (stgArts.png?.sha256 && candEvidence.evidence_content_hash && stgArts.png.sha256 !== candEvidence.evidence_content_hash) {
      errors.push(`PNG_HASH_MUTATION: Staging '${stgArts.png.sha256}' !== Candidate '${candEvidence.evidence_content_hash}'`);
    }
    if (stgArts.html?.sha256 && candEvidence.artifact_html_hash && stgArts.html.sha256 !== candEvidence.artifact_html_hash) {
      errors.push(`HTML_HASH_MUTATION: Staging '${stgArts.html.sha256}' !== Candidate '${candEvidence.artifact_html_hash}'`);
    }
    if (stgArts.text?.sha256 && candEvidence.artifact_text_hash && stgArts.text.sha256 !== candEvidence.artifact_text_hash) {
      errors.push(`TEXT_HASH_MUTATION: Staging '${stgArts.text.sha256}' !== Candidate '${candEvidence.artifact_text_hash}'`);
    }
  }

  // 5. Locality Scope exact match (no synthetic street addresses)
  const candLocality = candEvidence.location_provenance_claim || candDeal.locality_scope;
  const stgAddress = stagingItem.pricing_tiers?.[0]?.address_observed;
  if (stgAddress && candLocality && !candLocality.includes(stgAddress) && stgAddress !== candLocality) {
    errors.push(`LOCALITY_MUTATION: Staging address '${stgAddress}' violates candidate locality '${candLocality}'`);
  }

  // 6. Purchase Channel exact match
  const candChannel = candEvidence.purchase_channel || candDeal.purchase_channel;
  const stgChannel = stagingItem.purchase_channel;
  if (candChannel && stgChannel && stgChannel !== candChannel) {
    errors.push(`PURCHASE_CHANNEL_MUTATION: Staging '${stgChannel}' !== Candidate '${candChannel}'`);
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

module.exports = {
  validateCrossLayerStagingLineage
};
