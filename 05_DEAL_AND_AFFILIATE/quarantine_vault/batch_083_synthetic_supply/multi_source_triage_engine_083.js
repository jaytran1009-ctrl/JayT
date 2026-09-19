/**
 * JAYT MULTI-SOURCE TRIAGE ENGINE (083)
 * Directive: JAYT-P0.2-VERIFIED-SUPPLY-EXPANSION-083
 * 
 * Implements 6-point triage grid with 3-state evaluation:
 * - OBSERVED: Directly present in verified evidence payload
 * - NOT_OBSERVED: Missing or unprovable
 * - NOT_APPLICABLE: Not required for specific source category
 * 
 * Classifications:
 * - READY_FOR_BATCH_REVIEW: 6/6 points OBSERVED & Level A or B (Presented for CEO Review)
 * - NEEDS_RECHECK: Missing criteria or unverified community signal
 * - REJECTED_OR_ACCOUNT_DEPENDENT: Account-locked, cart-restricted, app-walled
 */

const CONFIDENCE_LEVELS = {
  LEVEL_A: 'LEVEL_A_PROVIDER_VERIFIED',
  LEVEL_B: 'LEVEL_B_PUBLIC_BROWSER_VERIFIED',
  LEVEL_C: 'LEVEL_C_ACCOUNT_OR_CART_DEPENDENT',
  LEVEL_D: 'LEVEL_D_COMMUNITY_SIGNAL'
};

const TRIAGE_STATES = {
  OBSERVED: 'OBSERVED',
  NOT_OBSERVED: 'NOT_OBSERVED',
  NOT_APPLICABLE: 'NOT_APPLICABLE'
};

const BATCH_DECISIONS = {
  READY_FOR_BATCH_REVIEW: 'READY_FOR_BATCH_REVIEW',
  NEEDS_RECHECK: 'NEEDS_RECHECK',
  REJECTED_OR_ACCOUNT_DEPENDENT: 'REJECTED_OR_ACCOUNT_DEPENDENT'
};

function evaluateSignal(signal) {
  if (!signal || typeof signal !== 'object') {
    throw new Error('Signal payload must be a valid object');
  }

  const {
    id = '',
    cohort = '',
    brand = '',
    title = '',
    source_url = '',
    observed_price = '',
    observed_original_price = '',
    observed_conditions = '',
    observed_validity = '',
    observed_scope = '',
    declared_level = '',
    evidence_type = '',
    is_account_locked = false,
    is_cart_dependent = false
  } = signal;

  // 1. Point 1: Price / Discount Specification
  const hasPrice = (observed_price !== undefined && observed_price !== null && observed_price.toString().trim().length > 0);
  const point1_price = hasPrice ? TRIAGE_STATES.OBSERVED : TRIAGE_STATES.NOT_OBSERVED;

  // 2. Point 2: Applicable Terms & Conditions
  const hasConditions = (observed_conditions && observed_conditions.trim().length > 5);
  const point2_conditions = hasConditions ? TRIAGE_STATES.OBSERVED : TRIAGE_STATES.NOT_OBSERVED;

  // 3. Point 3: Validity Window / Expiry
  const hasValidity = (observed_validity && observed_validity.trim().length > 2);
  const point3_validity = hasValidity ? TRIAGE_STATES.OBSERVED : TRIAGE_STATES.NOT_OBSERVED;

  // 4. Point 4: Geographic Scope (Đà Nẵng / Nationwide)
  const hasScope = (observed_scope && observed_scope.trim().length > 2);
  const point4_scope = hasScope ? TRIAGE_STATES.OBSERVED : TRIAGE_STATES.NOT_OBSERVED;

  // 5. Point 5: Public Accessibility (Non-Cart / Non-Account restricted)
  const isPubliclyAccessible = !is_account_locked && !is_cart_dependent;
  const point5_public_access = isPubliclyAccessible ? TRIAGE_STATES.OBSERVED : TRIAGE_STATES.NOT_OBSERVED;

  // 6. Point 6: Verifiable Lineage / Official Source URL
  const isOfficialWebSource = (source_url && (source_url.startsWith('https://') || source_url.startsWith('http://')) && declared_level !== CONFIDENCE_LEVELS.LEVEL_D);
  const point6_lineage = isOfficialWebSource ? TRIAGE_STATES.OBSERVED : (declared_level === CONFIDENCE_LEVELS.LEVEL_D ? TRIAGE_STATES.NOT_OBSERVED : TRIAGE_STATES.NOT_OBSERVED);

  const triageGrid = {
    point_1_price_spec: point1_price,
    point_2_terms_conditions: point2_conditions,
    point_3_validity_window: point3_validity,
    point_4_geographic_scope: point4_scope,
    point_5_public_accessibility: point5_public_access,
    point_6_verifiable_lineage: point6_lineage
  };

  const observedPointsCount = Object.values(triageGrid).filter(v => v === TRIAGE_STATES.OBSERVED).length;

  // Final Classification Logic
  let decision = BATCH_DECISIONS.NEEDS_RECHECK;
  let decisionReason = '';

  if (declared_level === CONFIDENCE_LEVELS.LEVEL_C || is_account_locked || is_cart_dependent) {
    decision = BATCH_DECISIONS.REJECTED_OR_ACCOUNT_DEPENDENT;
    decisionReason = 'Ưu đãi phụ thuộc tài khoản cá nhân, phân đoạn người dùng, ví voucher hoặc giỏ hàng cụ thể trong app; không thể công bố đại trà công khai.';
  } else if (declared_level === CONFIDENCE_LEVELS.LEVEL_D) {
    decision = BATCH_DECISIONS.NEEDS_RECHECK;
    decisionReason = 'Tín hiệu cộng đồng chưa qua đối soát độc lập (Chờ evidence bundle độc lập từ đối soát thực tế).';
  } else if (declared_level === CONFIDENCE_LEVELS.LEVEL_B || declared_level === CONFIDENCE_LEVELS.LEVEL_A) {
    if (observedPointsCount === 6) {
      decision = BATCH_DECISIONS.READY_FOR_BATCH_REVIEW;
      decisionReason = 'Đạt chuẩn 6/6 điểm đối soát trên nguồn công khai (Mức giá, điều kiện, thời hạn, phạm vi, tính công khai và lineage URL). Sẵn sàng trình CEO xem xét theo đợt.';
    } else {
      decision = BATCH_DECISIONS.NEEDS_RECHECK;
      decisionReason = `Thiếu ${6 - observedPointsCount}/6 điểm đối soát chứng cứ bắt buộc.`;
    }
  }

  return {
    id,
    cohort,
    brand,
    title,
    declared_level,
    triage_grid: triageGrid,
    observed_points_count: observedPointsCount,
    total_applicable_points: 6,
    batch_decision: decision,
    decision_reason: decisionReason,
    is_ready_for_review: decision === BATCH_DECISIONS.READY_FOR_BATCH_REVIEW
  };
}

function processSignalBatch(signals) {
  if (!Array.isArray(signals)) {
    throw new Error('Signals input must be an array');
  }

  const results = signals.map(evaluateSignal);

  const stats = {
    total_signals: results.length,
    by_decision: {
      READY_FOR_BATCH_REVIEW: results.filter(r => r.batch_decision === BATCH_DECISIONS.READY_FOR_BATCH_REVIEW).length,
      NEEDS_RECHECK: results.filter(r => r.batch_decision === BATCH_DECISIONS.NEEDS_RECHECK).length,
      REJECTED_OR_ACCOUNT_DEPENDENT: results.filter(r => r.batch_decision === BATCH_DECISIONS.REJECTED_OR_ACCOUNT_DEPENDENT).length
    },
    by_level: {
      LEVEL_A: results.filter(r => r.declared_level === CONFIDENCE_LEVELS.LEVEL_A).length,
      LEVEL_B: results.filter(r => r.declared_level === CONFIDENCE_LEVELS.LEVEL_B).length,
      LEVEL_C: results.filter(r => r.declared_level === CONFIDENCE_LEVELS.LEVEL_C).length,
      LEVEL_D: results.filter(r => r.declared_level === CONFIDENCE_LEVELS.LEVEL_D).length
    },
    by_cohort: {}
  };

  results.forEach(r => {
    stats.by_cohort[r.cohort] = (stats.by_cohort[r.cohort] || 0) + 1;
  });

  return {
    stats,
    results
  };
}

module.exports = {
  CONFIDENCE_LEVELS,
  TRIAGE_STATES,
  BATCH_DECISIONS,
  evaluateSignal,
  processSignalBatch
};
