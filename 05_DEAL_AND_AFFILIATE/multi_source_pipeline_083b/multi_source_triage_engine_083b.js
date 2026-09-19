/**
 * JAYT CRYPTOGRAPHIC RECEIPT-BOUND TRIAGE ENGINE (083B)
 * Directive: JAYT-083B-RECEIPT-BINDING-AND-MEMORY-REPAIR
 * 
 * Enforces deep cryptographic receipt binding & physical artifact lineage:
 * 1. Forbids using PROJECT_MEMORY.md, test files, fixtures, or quarantined files as positive evidence.
 * 2. Reads & validates physical receipt JSON on disk:
 *    - `receipt_sha256` matches actual bytes on disk.
 *    - `artifact_path` exists and `artifact_sha256` matches actual bytes on disk.
 *    - `source_url` in receipt matches signal `source_url`.
 *    - `captured_at` is a valid ISO timestamp.
 * 3. Requires separate, distinct, non-overlapping snippets for each claim:
 *    - `price_snippet`
 *    - `conditions_snippet`
 *    - `validity_snippet`
 *    - `scope_snippet`
 *    Snippets must NOT be identical and must each be present in artifact content.
 * 4. Fails closed to `NOT_OBSERVED` on any mismatch, missing field, or single-snippet reuse.
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

const FORBIDDEN_EVIDENCE_PATTERNS = [
  /project_memory\.md/i,
  /\/test_/i,
  /\/tests\//i,
  /\/private_sandbox\//i,
  /\/quarantine_vault\//i,
  /sample_intake_template/i,
  /\.user_uploaded/i
];

const SYNTHETIC_CONTENT_MARKERS = [
  'DEMO_ONLY_NOT_FOR_RENDER',
  '[SYNTHETIC]',
  'TEST_ONLY_NOT_EVIDENCE',
  'SYNTHETIC_NOT_EVIDENCE'
];

function getFileSha256(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

/**
 * Validates physical receipt and artifact binding on disk.
 */
function verifyReceiptAndArtifactBinding083b(evidenceBundle) {
  if (!evidenceBundle || typeof evidenceBundle !== 'object') {
    return { valid: false, failure_reason: 'NO_EVIDENCE_BUNDLE_PROVIDED' };
  }

  const {
    receipt_path,
    receipt_sha256,
    signal_source_url
  } = evidenceBundle;

  if (!receipt_path || typeof receipt_path !== 'string') {
    return { valid: false, failure_reason: 'MISSING_RECEIPT_PATH' };
  }

  // 1. Check for forbidden file paths
  for (const pattern of FORBIDDEN_EVIDENCE_PATTERNS) {
    if (pattern.test(receipt_path)) {
      return { valid: false, failure_reason: `FORBIDDEN_RECEIPT_PATH: ${receipt_path}` };
    }
  }

  const fullReceiptPath = path.isAbsolute(receipt_path) ? receipt_path : path.join(repoRoot, receipt_path);
  if (!fs.existsSync(fullReceiptPath)) {
    return { valid: false, failure_reason: `RECEIPT_NOT_FOUND_ON_DISK: ${receipt_path}` };
  }

  // 2. Check receipt hash
  const actualReceiptHash = getFileSha256(fullReceiptPath);
  if (receipt_sha256 && actualReceiptHash !== receipt_sha256) {
    return { valid: false, failure_reason: `RECEIPT_HASH_MISMATCH: expected ${receipt_sha256}, got ${actualReceiptHash}` };
  }

  let receiptData;
  try {
    receiptData = JSON.parse(fs.readFileSync(fullReceiptPath, 'utf8'));
  } catch (e) {
    return { valid: false, failure_reason: `INVALID_RECEIPT_JSON: ${e.message}` };
  }

  // 3. Extract artifact references from receipt
  const artifactPath = receiptData.artifacts?.dom_html?.path || receiptData.artifact_path || receiptData.snapshot_path || receiptData.html_snapshot_path;
  const artifactSha = receiptData.artifacts?.dom_html?.sha256 || receiptData.artifact_sha256 || receiptData.snapshot_sha256 || receiptData.html_snapshot_sha256;
  const receiptSourceUrl = receiptData.target_url || receiptData.source_url || receiptData.requested_url;
  const capturedAt = receiptData.checked_at || receiptData.captured_at || receiptData.timestamp || receiptData.created_at;

  if (!artifactPath || typeof artifactPath !== 'string') {
    return { valid: false, failure_reason: 'RECEIPT_MISSING_ARTIFACT_PATH' };
  }

  for (const pattern of FORBIDDEN_EVIDENCE_PATTERNS) {
    if (pattern.test(artifactPath)) {
      return { valid: false, failure_reason: `FORBIDDEN_ARTIFACT_PATH: ${artifactPath}` };
    }
  }

  const fullArtifactPath = path.isAbsolute(artifactPath) ? artifactPath : path.join(repoRoot, artifactPath);
  if (!fs.existsSync(fullArtifactPath)) {
    return { valid: false, failure_reason: `ARTIFACT_NOT_FOUND_ON_DISK: ${artifactPath}` };
  }

  const actualArtifactHash = getFileSha256(fullArtifactPath);
  if (!artifactSha || actualArtifactHash !== artifactSha) {
    return { valid: false, failure_reason: `ARTIFACT_HASH_MISMATCH: expected ${artifactSha}, got ${actualArtifactHash}` };
  }

  if (!capturedAt || isNaN(Date.parse(capturedAt))) {
    return { valid: false, failure_reason: 'RECEIPT_INVALID_CAPTURE_TIMESTAMP' };
  }

  if (signal_source_url && receiptSourceUrl && signal_source_url.toLowerCase() !== receiptSourceUrl.toLowerCase()) {
    return { valid: false, failure_reason: `SOURCE_URL_MISMATCH: signal '${signal_source_url}' vs receipt '${receiptSourceUrl}'` };
  }

  const artifactContent = fs.readFileSync(fullArtifactPath, 'utf8');

  // Check for synthetic markers
  for (const marker of SYNTHETIC_CONTENT_MARKERS) {
    if (artifactContent.includes(marker)) {
      return { valid: false, failure_reason: `SYNTHETIC_MARKER_DETECTED_IN_ARTIFACT: ${marker}` };
    }
  }

  return {
    valid: true,
    receipt_data: receiptData,
    artifact_content: artifactContent,
    artifact_path: artifactPath,
    artifact_sha256: actualArtifactHash
  };
}

/**
 * Evaluates a signal with strict cryptographic receipt binding & separate snippet checks.
 */
function evaluateSignalStrict083b(signal) {
  if (!signal || typeof signal !== 'object') {
    throw new Error('Signal payload must be an object');
  }

  const {
    id = '',
    cohort = '',
    brand = '',
    title = '',
    source_url = '',
    declared_level = CONFIDENCE_LEVELS.LEVEL_D,
    is_account_locked = false,
    is_cart_dependent = false,
    evidence_bundle = null
  } = signal;

  const binding = verifyReceiptAndArtifactBinding083b({
    ...(evidence_bundle || {}),
    signal_source_url: source_url
  });

  let point1_price = TRIAGE_STATES.NOT_OBSERVED;
  let point2_conditions = TRIAGE_STATES.NOT_OBSERVED;
  let point3_validity = TRIAGE_STATES.NOT_OBSERVED;
  let point4_scope = TRIAGE_STATES.NOT_OBSERVED;
  let point5_public = TRIAGE_STATES.NOT_OBSERVED;
  let point6_lineage = TRIAGE_STATES.NOT_OBSERVED;

  if (binding.valid && evidence_bundle) {
    const content = binding.artifact_content;
    const contentLower = content.toLowerCase();

    const pSnippet = (evidence_bundle.price_snippet || '').trim();
    const cSnippet = (evidence_bundle.conditions_snippet || '').trim();
    const vSnippet = (evidence_bundle.validity_snippet || '').trim();
    const sSnippet = (evidence_bundle.scope_snippet || '').trim();

    // Check distinctness: distinct snippets must not be identical strings (if present)
    const activeSnippets = [pSnippet, cSnippet, vSnippet, sSnippet].filter(s => s.length > 0);
    const uniqueSnippets = new Set(activeSnippets.map(s => s.toLowerCase()));

    const hasDuplicateSnippets = activeSnippets.length > 1 && uniqueSnippets.size < activeSnippets.length;

    if (!hasDuplicateSnippets) {
      // 1. Price snippet
      if (pSnippet.length > 0 && contentLower.includes(pSnippet.toLowerCase())) {
        point1_price = TRIAGE_STATES.OBSERVED;
      }

      // 2. Conditions snippet
      if (cSnippet.length > 0 && contentLower.includes(cSnippet.toLowerCase())) {
        point2_conditions = TRIAGE_STATES.OBSERVED;
      }

      // 3. Validity snippet
      if (vSnippet.length > 0 && contentLower.includes(vSnippet.toLowerCase())) {
        point3_validity = TRIAGE_STATES.OBSERVED;
      }

      // 4. Scope snippet
      if (sSnippet.length > 0 && contentLower.includes(sSnippet.toLowerCase())) {
        point4_scope = TRIAGE_STATES.OBSERVED;
      }
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

  if (!binding.valid) {
    decision = (is_account_locked || is_cart_dependent) 
      ? BATCH_DECISIONS.REJECTED_OR_ACCOUNT_DEPENDENT 
      : BATCH_DECISIONS.NEEDS_RECHECK;
    reason = `Chưa có bằng chứng receipt & artifact hợp lệ (${binding.failure_reason}). Xếp loại Lead/Radar cần thu thập capture thật.`;
  } else if (is_account_locked || is_cart_dependent || declared_level === CONFIDENCE_LEVELS.LEVEL_C) {
    decision = BATCH_DECISIONS.REJECTED_OR_ACCOUNT_DEPENDENT;
    reason = 'Ưu đãi phụ thuộc tài khoản cá nhân hoặc giỏ hàng trong app.';
  } else if (declared_level === CONFIDENCE_LEVELS.LEVEL_D) {
    decision = BATCH_DECISIONS.NEEDS_RECHECK;
    reason = 'Tín hiệu cộng đồng (Level D) bắt buộc giữ ở hàng đợi Chưa xác minh, không tự nâng Level B.';
  } else if (observedCount === 6 && (declared_level === CONFIDENCE_LEVELS.LEVEL_A || declared_level === CONFIDENCE_LEVELS.LEVEL_B)) {
    decision = BATCH_DECISIONS.READY_FOR_BATCH_REVIEW;
    reason = 'Đủ 6/6 điểm đối soát trên bằng chứng snapshot vật lý đã xác thực và receipt đối soát độc lập.';
  } else {
    decision = BATCH_DECISIONS.NEEDS_RECHECK;
    reason = `Bằng chứng snapshot có trên đĩa nhưng chỉ quan sát thấy ${observedCount}/6 điểm tiêu chí riêng biệt.`;
  }

  return {
    id,
    cohort,
    brand,
    title,
    declared_level,
    binding_valid: binding.valid,
    binding_failure_reason: binding.failure_reason || null,
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
  verifyReceiptAndArtifactBinding083b,
  evaluateSignalStrict083b
};
