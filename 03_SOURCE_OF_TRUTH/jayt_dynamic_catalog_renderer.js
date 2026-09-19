/**
 * JAYT DYNAMIC CATALOG RENDERING ENGINE
 * Governing Directive: JAYT-245 Section JAYT-260-CORRECTION-6 (Lines 5520-5535)
 *
 * DYNAMIC RENDERING CONTRACT:
 * 1. Input Integrity: Computes SHA-256 input_hash of raw candidate list.
 * 2. Gateway Admission Gate: Invokes renderCatalogWithAdmission before any HTML generation.
 * 3. Fail-Closed Guarantee: If any item in candidate list references quarantined artifacts, throws QUARANTINED_ARTIFACT_REFERENCE immediately.
 * 4. Dynamic HTML Output: Generates HTML body strictly from admitted items and returns response_body_hash.
 */

const crypto = require('crypto');
const { renderCatalogWithAdmission } = require('../00_PROGRAM_BASELINE/jayt_canonical_admission_gateway.js');

function renderDynamicCatalogWithAdmission(inputCandidatesList) {
  const inputJson = JSON.stringify(inputCandidatesList);
  const inputHash = crypto.createHash('sha256').update(inputJson).digest('hex');
  const traceId = "DYN_RENDER_" + Date.now();

  // Step 1: Enforce Admission Gate through Gateway
  const admissionResult = renderCatalogWithAdmission(inputCandidatesList, "RENDERING");
  const admittedItems = admissionResult.rendered_items;
  const admittedIds = admittedItems.map(item => item.candidate_id);

  // Step 2: Dynamically Generate HTML from Admitted Entities Only
  let htmlBody = '<div class="jayt-dynamic-catalog-grid" data-input-hash="' + inputHash + '" data-admitted-count="' + admittedItems.length + '">\\n';

  for (const item of admittedItems) {
    htmlBody += '  <article class="jayt-card" data-candidate-id="' + item.candidate_id + '" data-admission="PUBLIC_APPROVED">\\n';
    htmlBody += '    <h3>' + (item.title || item.candidate_id) + '</h3>\\n';
    htmlBody += '    <p class="geo-scope">' + (item.geographic_scope || 'DA_NANG') + '</p>\\n';
    if (item.external_url) {
      htmlBody += '    <a href="' + item.external_url + '" class="jayt-link" target="_blank" rel="noopener">Chi tiết chính sách</a>\\n';
    }
    htmlBody += '  </article>\\n';
  }

  htmlBody += '</div>';

  const responseBodyHash = crypto.createHash('sha256').update(htmlBody).digest('hex');

  return {
    trace_id: traceId,
    input_hash: inputHash,
    admitted_ids: admittedIds,
    rendered_count: admittedItems.length,
    html_body: htmlBody,
    response_body_hash: responseBodyHash
  };
}

module.exports = { renderDynamicCatalogWithAdmission };
