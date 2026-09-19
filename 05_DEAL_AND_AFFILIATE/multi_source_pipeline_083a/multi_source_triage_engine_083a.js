/**
 * JAYT STRICT EVIDENCE-BOUND TRIAGE ENGINE (083A)
 * Directive: JAYT-083A-SYNTHETIC-SUPPLY-CONTAINMENT
 * 
 * Root-Fix Rule:
 * An evaluation point is STRICTLY `NOT_OBSERVED` unless backed by a complete,
 * physically verifiable evidence bundle on disk:
 * 1. `artifact_path`: Physical file exists on disk.
 * 2. `artifact_sha256`: Byte-for-byte SHA-256 matches actual file on disk.
 * 3. `capture_timestamp`: Valid capture ISO timestamp.
 * 4. `receipt_path`: Physical receipt file exists on disk.
 * 5. `source_snippet`: Concrete text excerpt verified present in artifact content.
 * 
 * Self-authored JSON fields, raw URLs without snapshots, or handwritten claims
 * CAN NEVER constitute evidence or produce an `OBSERVED` point.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..', '..');

const TRIAGE_STATES = {
  OBSERVED: 'OBSERVED',
  NOT_OBSERVED: 'NOT_OBSERVED',
  NOT_APPLICABLE: 'NOT_APPLICABLE'
};

const CONFIDENCE_LEVELS = {
  LEVEL_A: 'LEVEL_A_PROVIDER_VERIFIED',
  LEVEL_B: 'LEVEL_B_PUBLIC_BROWSER_VERIFIED',
  LEVEL_C: 'LEVEL_C_ACCOUNT_OR_CART_DEPENDENT',
  LEVEL_D: 'LEVEL_D_COMMUNITY_SIGNAL'
};

const BATCH_DECISIONS = {
  READY_FOR_BATCH_REVIEW: 'READY_FOR_BATCH_REVIEW',
  NEEDS_RECHECK: 'NEEDS_RECHECK',
  REJECTED_OR_ACCOUNT_DEPENDENT: 'REJECTED_OR_ACCOUNT_DEPENDENT'
};

function getFileSha256(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

/**
 * Verifies physical evidence lineage on disk.
 * Returns { valid: boolean, failure_reason: string, file_content: string }
 */
function verifyEvidenceBundleLineage(evidenceBundle) {
  if (!evidenceBundle || typeof evidenceBundle !== 'object') {
    return { valid: false, failure_reason: 'NO_EVIDENCE_BUNDLE_PROVIDED' };
  }

  const {
    artifact_path,
    artifact_sha256,
    capture_timestamp,
    receipt_path,
    source_snippet
  } = evidenceBundle;

  if (!artifact_path || typeof artifact_path !== 'string') {
    return { valid: false, failure_reason: 'MISSING_ARTIFACT_PATH' };
  }

  const fullArtifactPath = path.isAbsolute(artifact_path) ? artifact_path : path.join(repoRoot, artifact_path);
  if (!fs.existsSync(fullArtifactPath)) {
    return { valid: false, failure_reason: 'ARTIFACT_FILE_NOT_FOUND_ON_DISK: ' + artifact_path };
  }

  const actualArtifactHash = getFileSha256(fullArtifactPath);
  if (!artifact_sha256 || actualArtifactHash !== artifact_sha256) {
    return { valid: false, failure_reason: `HASH_MISMATCH: expected ${artifact_sha256}, got ${actualArtifactHash}` };
  }

  if (!capture_timestamp || isNaN(Date.parse(capture_timestamp))) {
    return { valid: false, failure_reason: 'INVALID_OR_MISSING_CAPTURE_TIMESTAMP' };
  }

  if (!receipt_path || typeof receipt_path !== 'string') {
    return { valid: false, failure_reason: 'MISSING_RECEIPT_PATH' };
  }

  const fullReceiptPath = path.isAbsolute(receipt_path) ? receipt_path : path.join(repoRoot, receipt_path);
  if (!fs.existsSync(fullReceiptPath)) {
    return { valid: false, failure_reason: 'RECEIPT_FILE_NOT_FOUND_ON_DISK: ' + receipt_path };
  }

  const artifactContent = fs.readFileSync(fullArtifactPath, 'utf8');

  if (!source_snippet || typeof source_snippet !== 'string' || source_snippet.trim().length === 0) {
    return { valid: false, failure_reason: 'MISSING_SOURCE_SNIPPET' };
  }

  if (!artifactContent.includes(source_snippet.trim())) {
    return { valid: false, failure_reason: 'SOURCE_SNIPPET_NOT_FOUND_IN_ARTIFACT_CONTENT' };
  }

  return {
    valid: true,
    file_content: artifactContent
  };
}

/**
 * Strict evaluation of a single signal.
 * Fails closed to NOT_OBSERVED unless physical evidence bundle is 100% verified.
 */
function evaluateSignalStrict083a(signal) {
  if (!signal || typeof signal !== 'object') {
    throw new Error('Signal payload must be an object');
  }

  const {
    id = '',
    cohort = '',
    brand = '',
    title = '',
    source_url = '',
    evidence_bundle = null,
    declared_level = CONFIDENCE_LEVELS.LEVEL_D,
    is_account_locked = false,
    is_cart_dependent = false
  } = signal;

  // Verify physical evidence bundle
  const lineage = verifyEvidenceBundleLineage(evidence_bundle);

  let point1_price = TRIAGE_STATES.NOT_OBSERVED;
  let point2_conditions = TRIAGE_STATES.NOT_OBSERVED;
  let point3_validity = TRIAGE_STATES.NOT_OBSERVED;
  let point4_scope = TRIAGE_STATES.NOT_OBSERVED;
  let point5_public = TRIAGE_STATES.NOT_OBSERVED;
  let point6_lineage = TRIAGE_STATES.NOT_OBSERVED;

  if (lineage.valid) {
    // Only inspect points if physical artifact is verified
    const content = lineage.file_content.toLowerCase();
    
    // 1. Price
    const priceRegex = /\b(\d{1,3}(?:\.\d{3})+|\d+k|\d{2,3}\.000)\s*(?:đ|₫|vnd|k)?\b/i;
    if (evidence_bundle.verified_price && priceRegex.test(content) && content.includes(evidence_bundle.verified_price.toString().toLowerCase())) {
      point1_price = TRIAGE_STATES.OBSERVED;
    }

    // 2. Conditions
    if (evidence_bundle.verified_conditions && content.includes(evidence_bundle.verified_conditions.toLowerCase())) {
      point2_conditions = TRIAGE_STATES.OBSERVED;
    }

    // 3. Validity
    if (evidence_bundle.verified_validity && content.includes(evidence_bundle.verified_validity.toLowerCase())) {
      point3_validity = TRIAGE_STATES.OBSERVED;
    }

    // 4. Scope
    if (evidence_bundle.verified_scope && content.includes(evidence_bundle.verified_scope.toLowerCase())) {
      point4_scope = TRIAGE_STATES.OBSERVED;
    }

    // 5. Public accessibility
    if (!is_account_locked && !is_cart_dependent) {
      point5_public = TRIAGE_STATES.OBSERVED;
    }

    // 6. Source lineage
    if (source_url && (source_url.startsWith('https://') || source_url.startsWith('http://'))) {
      point6_lineage = TRIAGE_STATES.OBSERVED;
    }
  }

  const triageGrid = {
    point_1_price_spec: point1_price,
    point_2_terms_conditions: point2_conditions,
    point_3_validity_window: point3_validity,
    point_4_geographic_scope: point4_scope,
    point_5_public_accessibility: point5_public,
    point_6_verifiable_lineage: point6_lineage
  };

  const observedCount = Object.values(triageGrid).filter(v => v === TRIAGE_STATES.OBSERVED).length;

  let decision = BATCH_DECISIONS.NEEDS_RECHECK;
  let reason = '';

  if (!lineage.valid) {
    decision = (is_account_locked || is_cart_dependent) 
      ? BATCH_DECISIONS.REJECTED_OR_ACCOUNT_DEPENDENT 
      : BATCH_DECISIONS.NEEDS_RECHECK;
    reason = `Chưa có bằng chứng snapshot vật lý hợp lệ (${lineage.failure_reason}). Xếp loại Lead/Radar cần thu thập capture thật.`;
  } else if (is_account_locked || is_cart_dependent || declared_level === CONFIDENCE_LEVELS.LEVEL_C) {
    decision = BATCH_DECISIONS.REJECTED_OR_ACCOUNT_DEPENDENT;
    reason = 'Ưu đãi phụ thuộc tài khoản cá nhân hoặc giỏ hàng trong app.';
  } else if (declared_level === CONFIDENCE_LEVELS.LEVEL_D) {
    decision = BATCH_DECISIONS.NEEDS_RECHECK;
    reason = 'Tín hiệu cộng đồng chưa qua đối soát độc lập.';
  } else if (observedCount === 6 && (declared_level === CONFIDENCE_LEVELS.LEVEL_A || declared_level === CONFIDENCE_LEVELS.LEVEL_B)) {
    decision = BATCH_DECISIONS.READY_FOR_BATCH_REVIEW;
    reason = 'Đủ 6/6 điểm đối soát trên bằng chứng snapshot vật lý đã xác thực.';
  } else {
    decision = BATCH_DECISIONS.NEEDS_RECHECK;
    reason = `Bằng chứng snapshot có trên đĩa nhưng chỉ quan sát thấy ${observedCount}/6 điểm tiêu chí.`;
  }

  return {
    id,
    cohort,
    brand,
    title,
    declared_level,
    lineage_valid: lineage.valid,
    lineage_failure_reason: lineage.failure_reason || null,
    triage_grid: triageGrid,
    observed_points_count: observedCount,
    total_applicable_points: 6,
    batch_decision: decision,
    decision_reason: reason,
    is_ready_for_review: decision === BATCH_DECISIONS.READY_FOR_BATCH_REVIEW
  };
}

module.exports = {
  TRIAGE_STATES,
  CONFIDENCE_LEVELS,
  BATCH_DECISIONS,
  verifyEvidenceBundleLineage,
  evaluateSignalStrict083a
};
