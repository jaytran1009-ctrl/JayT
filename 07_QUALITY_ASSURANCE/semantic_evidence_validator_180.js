/**
 * JAYT-180: SEMANTIC EVIDENCE GATE & 5-LEVEL VALIDATOR
 * Strict semantic analysis of captured quotes beyond raw text matching.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function sha256Str(str) { return crypto.createHash('sha256').update(str, 'utf8').digest('hex'); }

// Semantic Validation Rules (Directive JAYT-180)
const VALUE_BENEFIT_TERMS = [
  'miễn phí', 'free', '0đ', 'giá', '₫', 'vnd', 'giảm', '%', 'dùng thử', 'tháng', 'trial', 'tiết kiệm', 'tặng'
];

const FORBIDDEN_OFFER_NAMES = [
  'github student developer pack', 'canva education', 'notion for education', 'youtube premium'
];

const ELIGIBILITY_ACTION_TERMS = [
  'dành cho', 'yêu cầu', 'xác minh', 'sinh viên', 'học sinh', 'thẻ', 'email', 'trường', 'đại học', 'cao đẳng',
  'verify', 'eligib', 'student', 'studies', 'academic', 'isic'
];

const MARKETING_FILLER_TERMS = [
  'cost-prohibitive', 'real world tools', 'empowering the world to design', 'one workspace for every team'
];

const TEMPORAL_TERMS = [
  'tháng', 'năm', 'ngày', 'duration', 'studies', 'hằng năm', 'hạn', 'cycle', '12 tháng', '1 tháng', '2 tháng'
];

const SCOPE_TERMS = [
  'vn', 'việt nam', 'đà nẵng', 'accredited', 'toàn quốc', 'trường', 'áp dụng tại', 'chỉ áp dụng'
];

const FORBIDDEN_DOMAIN_ONLY_SCOPE = [
  'github.com', 'google.com', 'spotify.com', 'canva.com', 'notion.so', 'youtube.com'
];

function validateSemanticQuotes(candidate) {
  const issues = [];
  const { offer_quote, terms_quote, validity_quote, scope_quote } = candidate;

  // 1. Offer Quote Semantic Validation
  if (!offer_quote || typeof offer_quote !== 'string') {
    issues.push('OFFER_QUOTE_MISSING');
  } else {
    const lower = offer_quote.toLowerCase().trim();
    if (FORBIDDEN_OFFER_NAMES.includes(lower)) {
      issues.push('OFFER_QUOTE_IS_ONLY_PROGRAM_NAME');
    }
    const hasValueTerm = VALUE_BENEFIT_TERMS.some(t => lower.includes(t));
    if (!hasValueTerm) {
      issues.push('OFFER_QUOTE_LACKS_CONCRETE_BENEFIT_OR_PRICING');
    }
  }

  // 2. Terms Quote Semantic Validation
  if (!terms_quote || typeof terms_quote !== 'string') {
    issues.push('TERMS_QUOTE_MISSING');
  } else {
    const lower = terms_quote.toLowerCase().trim();
    const hasMarketingFiller = MARKETING_FILLER_TERMS.some(t => lower.includes(t));
    const hasActionTerm = ELIGIBILITY_ACTION_TERMS.some(t => lower.includes(t));
    if (hasMarketingFiller && !hasActionTerm) {
      issues.push('TERMS_QUOTE_IS_MARKETING_FILLER');
    } else if (!hasActionTerm) {
      issues.push('TERMS_QUOTE_LACKS_ACTIONABLE_ELIGIBILITY');
    }
  }

  // 3. Validity Quote Semantic Validation
  if (!validity_quote || typeof validity_quote !== 'string') {
    issues.push('VALIDITY_QUOTE_MISSING');
  } else {
    const lower = validity_quote.toLowerCase().trim();
    const hasTemporalTerm = TEMPORAL_TERMS.some(t => lower.includes(t));
    if (!hasTemporalTerm) {
      issues.push('VALIDITY_QUOTE_LACKS_VERIFIABLE_DURATION_OR_CYCLE');
    }
  }

  // 4. Scope Quote Semantic Validation
  if (!scope_quote || typeof scope_quote !== 'string') {
    issues.push('SCOPE_QUOTE_MISSING');
  } else {
    const lower = scope_quote.toLowerCase().trim();
    if (FORBIDDEN_DOMAIN_ONLY_SCOPE.includes(lower)) {
      issues.push('SCOPE_QUOTE_IS_DOMAIN_NAME_ONLY');
    } else {
      const hasScopeTerm = SCOPE_TERMS.some(t => lower.includes(t));
      if (!hasScopeTerm) {
        issues.push('SCOPE_QUOTE_LACKS_VALID_GEO_OR_TARGET_SCOPE');
      }
    }
  }

  return {
    is_valid: issues.length === 0,
    issues: issues
  };
}

// JAYT-182: Multi-Modal Modality & Provenance Gate
function validateMultiModalEvidence(candidate) {
  const issues = [];
  const modality = candidate.evidence_modality || 'HTML_TEXT_LEAF';

  // First run semantic quotes check
  const quoteResult = validateSemanticQuotes(candidate);
  if (!quoteResult.is_valid) {
    issues.push(...quoteResult.issues);
  }

  // Modality-specific integrity check
  if (modality === 'HTML_TEXT_LEAF') {
    if (!candidate.evidence_file || !candidate.evidence_sha256) {
      issues.push('LANE_A_MISSING_HTML_ARTIFACT_OR_HASH');
    }
  } else if (modality === 'OFFICIAL_IMAGE_OCR') {
    if (!candidate.image_file || !candidate.image_sha256) {
      issues.push('LANE_B_MISSING_ORIGINAL_IMAGE_OR_HASH');
    }
    if (!candidate.ocr_extracted_text || candidate.ocr_extracted_text.trim().length === 0) {
      issues.push('LANE_B_MISSING_OCR_EXTRACTION');
    }
    if (candidate.visual_verification !== true) {
      issues.push('LANE_B_UNVERIFIED_VISUAL_CHECK');
    }
  } else if (modality === 'COMMUNITY_PROOF_INTAKE') {
    if (!candidate.scout_id && !candidate.submission_id) {
      issues.push('LANE_C_MISSING_SUBMISSION_SOURCE');
    }
    if (!candidate.venue_address || candidate.venue_address.trim().length === 0) {
      issues.push('LANE_C_MISSING_VENUE_LOCATION');
    }
    if (candidate.consent_given !== true) {
      issues.push('LANE_C_MISSING_CONSENT');
    }
    if (candidate.privacy_sanitized !== true) {
      issues.push('LANE_C_UNSANITIZED_PII');
    }
    if (!candidate.recheck_cycle_days || candidate.recheck_cycle_days <= 0) {
      issues.push('LANE_C_MISSING_RECHECK_CYCLE');
    }
  } else if (modality === 'PARTNER_AUTHORIZED_FEED') {
    if (!candidate.partner_id || !candidate.authorization_token_hash) {
      issues.push('LANE_D_UNAUTHORIZED_PARTNER_FEED');
    }
  } else {
    issues.push('UNKNOWN_EVIDENCE_MODALITY');
  }

  return {
    is_valid: issues.length === 0,
    modality,
    issues
  };
}

// JAYT-183: Anti-Synthetic Configuration Gate (Khóa chống tái diễn dữ liệu giả lập)
function assertNoSyntheticConfig(config) {
  if (!config || typeof config !== 'object') return;
  const forbiddenKeys = ['ocr_text', 'four_quotes', 'sanitized_notes', 'raw_notes'];
  for (const key of forbiddenKeys) {
    if (config[key] !== undefined) {
      throw new Error('SYNTHETIC_CONFIG_VIOLATION: Crawler config must not pre-populate "' + key + '". Evidence must be captured dynamically from live source bytes.');
    }
  }
  if (config.visual_verified === true && !config.image_capture_timestamp) {
    throw new Error('SYNTHETIC_CONFIG_VIOLATION: Cannot pre-set visual_verified=true before image capture.');
  }
}

module.exports = {
  validateSemanticQuotes,
  validateMultiModalEvidence,
  assertNoSyntheticConfig
};

if (require.main === module) {
  console.log('🧪 Running Semantic Evidence Gate 180 Self-Tests...');
  
  // Test Candidate 1: Spotify
  const spotifyTest = validateSemanticQuotes({
    offer_quote: 'Sinh viên nhận 2 tháng dùng gói Premium với giá 33.000',
    terms_quote: 'Ưu đãi chỉ dành cho sinh viên tại các trường cao đẳng và đại học được công nhận.',
    validity_quote: 'trong tối đa 12 tháng kể từ ngày bạn đăng ký',
    scope_quote: 'Spotify (VN)'
  });
  console.log('  Spotify Test:', spotifyTest.is_valid ? '✅ PASS' : '❌ FAIL', spotifyTest.issues);

  // Test Candidate 2: GitHub (Should FAIL semantic check)
  const githubTest = validateSemanticQuotes({
    offer_quote: 'GitHub Student Developer Pack',
    terms_quote: 'for most students, real world tools can be cost-prohibitive.',
    validity_quote: 'while you are a student',
    scope_quote: 'GitHub.com'
  });
  console.log('  GitHub Test (Expected FAIL):', !githubTest.is_valid ? '✅ PROPERLY REJECTED' : '❌ INCORRECTLY PASSED', githubTest.issues);

  // Test Candidate 3: JetBrains
  const jetbrainsTest = validateSemanticQuotes({
    offer_quote: 'Free JetBrains Student Pack',
    terms_quote: 'Verify your student status with your university email address, ISIC/ITIC card, or GitHub Student Developer Pack',
    validity_quote: 'at no cost for the duration of your studies',
    scope_quote: 'accredited educational programs'
  });
  console.log('  JetBrains Test:', jetbrainsTest.is_valid ? '✅ PASS' : '❌ FAIL', jetbrainsTest.issues);

  // Test Candidate 4: YouTube
  const youtubeTest = validateSemanticQuotes({
    offer_quote: 'Dùng thử 1 tháng với giá 0',
    terms_quote: 'Chỉ cho sinh viên đủ điều kiện. Yêu cầu xác minh hằng năm.',
    validity_quote: 'Dùng thử 1 tháng với giá 0',
    scope_quote: 'VN'
  });
  console.log('  YouTube Test:', youtubeTest.is_valid ? '✅ PASS' : '❌ FAIL', youtubeTest.issues);
}
