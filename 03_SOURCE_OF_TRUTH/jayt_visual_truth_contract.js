/**
 * ============================================================================
 * JAYT-217: VISUAL TRUTH CONTRACT & 3-STATE EVIDENCE TAXONOMY
 * ============================================================================
 * Stop-ship invariant: No asset can be rendered as real brand/venue visual
 * without 100% complete original evidence.
 */

const VISUAL_TRUTH_STATES = {
  VERIFIED_EXACT: 'VERIFIED_EXACT',
  IDENTITY_VISUAL: 'IDENTITY_VISUAL',
  BLOCKED: 'BLOCKED'
};

const VISUAL_TRUTH_REQUIREMENTS = [
  'original_asset_or_approved_embed',
  'source_url_from_merchant_or_portal',
  'independent_capture_receipt',
  'cryptographic_sha256',
  'exact_deal_or_branch_relation',
  'documented_display_rights_basis'
];

/**
 * Validates whether a card visual meets all 6 mandatory criteria for VERIFIED_EXACT.
 * If any criterion is missing, returns BLOCKED with reasons.
 */
function evaluateVisualTruthState(cardVisualEvidence, physicalBundleExists = false) {
  if (!cardVisualEvidence) {
    return { state: VISUAL_TRUTH_STATES.IDENTITY_VISUAL, reason: 'No visual evidence record provided' };
  }

  // If explicitly declared as JayT Identity Visual
  if (cardVisualEvidence.visual_kind === 'OFFICIAL_IDENTITY' || cardVisualEvidence.visual_kind === 'IDENTITY_VISUAL') {
    return {
      state: VISUAL_TRUTH_STATES.IDENTITY_VISUAL,
      render_label: 'Nhận diện thương hiệu JayT — chưa có ảnh ưu đãi/địa điểm xác minh',
      reason: 'Standard JayT Monogram & Brand Palette Identity Canvas'
    };
  }

  // Check the 6 mandatory criteria for VERIFIED_EXACT
  const missingCriteria = [];

  if (!cardVisualEvidence.asset_file_or_embed_url) {
    missingCriteria.push('original_asset_or_approved_embed');
  }
  if (!cardVisualEvidence.source_page_url) {
    missingCriteria.push('source_url_from_merchant_or_portal');
  }
  if (!cardVisualEvidence.rights_proof_artifact_path) {
    missingCriteria.push('independent_capture_receipt');
  }
  if (!cardVisualEvidence.asset_sha256) {
    missingCriteria.push('cryptographic_sha256');
  }
  if (!cardVisualEvidence.brand_and_branch_relation) {
    missingCriteria.push('exact_deal_or_branch_relation');
  }
  if (!cardVisualEvidence.rights_basis || cardVisualEvidence.rights_basis === 'IDENTITY_CANVAS_NO_MEDIA_LICENSE_ASSERTED') {
    missingCriteria.push('documented_display_rights_basis');
  }
  if (!physicalBundleExists) {
    missingCriteria.push('physical_evidence_bundle_on_disk');
  }

  if (missingCriteria.length > 0) {
    return {
      state: VISUAL_TRUTH_STATES.BLOCKED,
      fallback_to: VISUAL_TRUTH_STATES.IDENTITY_VISUAL,
      render_label: 'Nhận diện thương hiệu JayT — chưa có ảnh ưu đãi/địa điểm xác minh',
      missing_criteria: missingCriteria,
      reason: `Blocked from VERIFIED_EXACT due to missing: ${missingCriteria.join(', ')}`
    };
  }

  return {
    state: VISUAL_TRUTH_STATES.VERIFIED_EXACT,
    render_label: 'Ảnh thật / Banner đã kiểm định độc lập',
    reason: 'All 6 Visual Truth criteria satisfied with physical bundle on disk'
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    VISUAL_TRUTH_STATES,
    VISUAL_TRUTH_REQUIREMENTS,
    evaluateVisualTruthState
  };
}
