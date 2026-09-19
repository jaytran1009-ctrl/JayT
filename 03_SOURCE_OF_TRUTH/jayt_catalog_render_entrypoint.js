/**
 * JAYT CATALOG RENDER ENTRYPOINT (PILLAR 3: RENDERING)
 * Governing Directive: JAYT-245 Section JAYT-260-CORRECTION-4 (Lines 5488-5501)
 *
 * Provides sanitized, admitted public catalog items for UI rendering strictly through the Canonical Admission Gateway.
 */

const { renderCatalogWithAdmission } = require('../00_PROGRAM_BASELINE/jayt_canonical_admission_gateway.js');

function getApprovedCatalogForRender(candidatesList) {
  const result = renderCatalogWithAdmission(candidatesList, "RENDERING");
  return result.rendered_items;
}

module.exports = { getApprovedCatalogForRender };
