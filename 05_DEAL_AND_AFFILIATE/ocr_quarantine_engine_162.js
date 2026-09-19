/**
 * JAYT OCR QUARANTINE ENGINE (162)
 * Directive: JAYT-162: 5 CATEGORY HUBS, TRUSTED-AUTOMATION ONLY
 * 
 * CORE RULES:
 * 1. OCR output is strictly labeled OCR_EXTRACTED_UNVERIFIED.
 * 2. OCR alone CANNOT grant 🟢 (VERIFIED_PROOF_DEAL).
 * 3. Upgrading to 🟢 requires a SECOND independent evidence source:
 *    - Human Operator / Scout verification OR
 *    - Official verified source linked to the exact venue.
 * 4. Zero hallucination of free items (e.g. "trà đá 0đ") or unproven terms.
 */

const crypto = require('crypto');

function processOcrEvidence(imageProofPayload) {
  if (!imageProofPayload.image_source_url && !imageProofPayload.image_sha256) {
    throw new Error('OCR_INPUT_INVALID: Cần có nguồn ảnh hoặc mã băm ảnh hợp lệ');
  }

  const rawExtractedText = (imageProofPayload.extracted_text || '').trim();
  const ocrHash = crypto.createHash('sha256').update(rawExtractedText).digest('hex');

  const quarantinedRecord = {
    ocr_record_id: `OCR_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`,
    image_sha256: imageProofPayload.image_sha256 || 'UNKNOWN_IMAGE_SHA',
    image_source_url: imageProofPayload.image_source_url || null,
    extracted_text_snippet: rawExtractedText.substring(0, 300),
    ocr_hash: ocrHash,
    status: 'OCR_EXTRACTED_UNVERIFIED',
    evidence_tier: 'TIER_3_TRACKED_SOURCE_SIGNAL',
    can_auto_promote_to_green: false,
    second_source_verified: false,
    verified_by_human_or_provider: null,
    quarantine_notice: 'Kết quả OCR chỉ là gợi ý đề xuất; bắt buộc có nguồn độc lập thứ hai hoặc Human Scout xác nhận trước khi lên 🟢.'
  };

  return quarantinedRecord;
}

function resolveSecondSourceVerification(quarantinedRecord, secondSourcePayload) {
  if (!secondSourcePayload.verifier_type || !['HUMAN_OPERATOR', 'CAMPUS_SCOUT', 'OFFICIAL_PROVIDER_LINK'].includes(secondSourcePayload.verifier_type)) {
    throw new Error('INVALID_SECOND_SOURCE: Nguồn thứ hai phải là HUMAN_OPERATOR, CAMPUS_SCOUT hoặc OFFICIAL_PROVIDER_LINK');
  }

  return {
    ...quarantinedRecord,
    second_source_verified: true,
    verified_by_human_or_provider: {
      verifier_type: secondSourcePayload.verifier_type,
      verifier_id: secondSourcePayload.verifier_id,
      verified_at: new Date().toISOString(),
      notes: secondSourcePayload.notes || 'Đã đối soát thực địa vòng 2 thành công'
    },
    status: 'SECOND_SOURCE_CONFIRMED_PENDING_STAGING'
  };
}

module.exports = {
  processOcrEvidence,
  resolveSecondSourceVerification
};
