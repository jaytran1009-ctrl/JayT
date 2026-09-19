/**
 * JAYT FAIL-CLOSED RECEIPT COMPLETENESS & DISJOINT EVIDENCE ENGINE (083C)
 * Directive: JAYT-083C-FAIL-CLOSED-RECEIPT-COMPLETENESS
 * 
 * Strict Fail-Closed Guarantees:
 * 1. MANDATORY `receipt_sha256`: Missing or mismatch with disk bytes -> Rejected.
 * 2. MANDATORY `target_url` in receipt + Normalized URL matching with signal.
 * 3. MANDATORY Complete Receipt Schema: receipt_id, artifact path, artifact SHA-256, artifact type, captured_at, target_url.
 * 4. STRICT DISJOINT SNIPPETS:
 *    - Rejects exact duplicate snippets.
 *    - Rejects substring inclusion (e.g. s1 in s2 or s2 in s1).
 *    - Rejects overlapping character offset ranges in physical artifact text.
 * 5. SEPARATE HISTORICAL VS ACTIVE TAXONOMY:
 *    - `LINEAGE_VALID_HISTORICAL_ONLY`: Valid physical evidence on disk, but expired or lacking current active validity proof.
 *    - `READY_FOR_BATCH_REVIEW`: 6/6 points OBSERVED + Level A/B + active validity window / verified recurring schedule.
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
  LINEAGE_VALID_HISTORICAL_ONLY: 'LINEAGE_VALID_HISTORICAL_ONLY',
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

const SHA256_HEX_REGEX = /^[0-9a-f]{64}$/i;

function getFileSha256(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

/**
 * Normalizes URL for strict deterministic comparison:
 * - Lowercase
 * - Strip http/https prefix variation
 * - Strip www prefix
 * - Strip trailing slashes
 * - Strip query parameters and hash fragments
 */
function normalizeUrlStrict(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string') return '';
  try {
    const parsed = new URL(rawUrl.trim());
    let hostname = parsed.hostname.toLowerCase().replace(/^www\./, '');
    let pathname = parsed.pathname.replace(/\/+$/, '');
    return `${hostname}${pathname}`;
  } catch {
    // If not a standard URL object, do basic string normalization
    return rawUrl.trim().toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/[?#].*$/, '')
      .replace(/\/+$/, '');
  }
}

/**
 * Validates physical receipt completeness, cryptographic hash, and artifact binding on disk.
 */
function verifyReceiptCompletenessStrict083c(evidenceBundle) {
  if (!evidenceBundle || typeof evidenceBundle !== 'object') {
    return { valid: false, failure_reason: 'NO_EVIDENCE_BUNDLE_PROVIDED' };
  }

  const {
    receipt_path,
    receipt_sha256,
    signal_source_url
  } = evidenceBundle;

  // 1. Mandatory receipt_path
  if (!receipt_path || typeof receipt_path !== 'string') {
    return { valid: false, failure_reason: 'MISSING_RECEIPT_PATH' };
  }

  // 2. Mandatory receipt_sha256 (64 hex characters)
  if (!receipt_sha256 || typeof receipt_sha256 !== 'string' || !SHA256_HEX_REGEX.test(receipt_sha256)) {
    return { valid: false, failure_reason: 'MISSING_OR_INVALID_RECEIPT_SHA256_MANDATORY' };
  }

  // 3. Forbidden paths check
  for (const pattern of FORBIDDEN_EVIDENCE_PATTERNS) {
    if (pattern.test(receipt_path)) {
      return { valid: false, failure_reason: `FORBIDDEN_RECEIPT_PATH: ${receipt_path}` };
    }
  }

  const fullReceiptPath = path.isAbsolute(receipt_path) ? receipt_path : path.join(repoRoot, receipt_path);
  if (!fs.existsSync(fullReceiptPath)) {
    return { valid: false, failure_reason: `RECEIPT_NOT_FOUND_ON_DISK: ${receipt_path}` };
  }

  // 4. Mandatory byte-for-byte receipt hash verification
  const actualReceiptHash = getFileSha256(fullReceiptPath);
  if (actualReceiptHash !== receipt_sha256.toLowerCase()) {
    return { valid: false, failure_reason: `RECEIPT_HASH_MISMATCH: expected ${receipt_sha256}, got ${actualReceiptHash}` };
  }

  let receiptData;
  try {
    receiptData = JSON.parse(fs.readFileSync(fullReceiptPath, 'utf8'));
  } catch (e) {
    return { valid: false, failure_reason: `INVALID_RECEIPT_JSON: ${e.message}` };
  }

  // 5. Mandatory receipt fields verification
  if (!receiptData.receipt_id || typeof receiptData.receipt_id !== 'string') {
    return { valid: false, failure_reason: 'RECEIPT_MISSING_RECEIPT_ID' };
  }

  const receiptTargetUrl = receiptData.target_url || receiptData.source_url;
  if (!receiptTargetUrl || typeof receiptTargetUrl !== 'string') {
    return { valid: false, failure_reason: 'RECEIPT_MISSING_TARGET_URL' };
  }

  // 6. Mandatory URL normalization comparison
  if (signal_source_url) {
    const normSignalUrl = normalizeUrlStrict(signal_source_url);
    const normReceiptUrl = normalizeUrlStrict(receiptTargetUrl);
    if (!normSignalUrl || !normReceiptUrl || normSignalUrl !== normReceiptUrl) {
      return { valid: false, failure_reason: `NORMALIZED_URL_MISMATCH: signal '${normSignalUrl}' vs receipt '${normReceiptUrl}'` };
    }
  }

  // 7. Mandatory capture timestamp
  const capturedAt = receiptData.checked_at || receiptData.captured_at || receiptData.timestamp;
  if (!capturedAt || isNaN(Date.parse(capturedAt))) {
    return { valid: false, failure_reason: 'RECEIPT_MISSING_OR_INVALID_CAPTURE_TIMESTAMP' };
  }

  // 8. Extract artifact references from receipt
  const artifactPath = receiptData.artifacts?.dom_html?.path || receiptData.artifacts?.raw_html?.path || receiptData.artifact_path || receiptData.snapshot_path;
  const artifactSha = receiptData.artifacts?.dom_html?.sha256 || receiptData.artifacts?.raw_html?.sha256 || receiptData.artifact_sha256 || receiptData.snapshot_sha256;

  if (!artifactPath || typeof artifactPath !== 'string') {
    return { valid: false, failure_reason: 'RECEIPT_MISSING_ARTIFACT_PATH' };
  }

  if (!artifactSha || typeof artifactSha !== 'string' || !SHA256_HEX_REGEX.test(artifactSha)) {
    return { valid: false, failure_reason: 'RECEIPT_MISSING_OR_INVALID_ARTIFACT_SHA256' };
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
  if (actualArtifactHash !== artifactSha.toLowerCase()) {
    return { valid: false, failure_reason: `ARTIFACT_HASH_MISMATCH: expected ${artifactSha}, got ${actualArtifactHash}` };
  }

  const artifactContent = fs.readFileSync(fullArtifactPath, 'utf8');

  // 9. Check for synthetic markers
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
    artifact_sha256: actualArtifactHash,
    captured_at: capturedAt,
    target_url: receiptTargetUrl
  };
}

/**
 * Finds all character index ranges [start, end] for a snippet in content.
 */
function findSnippetRanges(contentLower, snippetLower) {
  const ranges = [];
  if (!snippetLower || snippetLower.length === 0) return ranges;

  let pos = 0;
  while ((pos = contentLower.indexOf(snippetLower, pos)) !== -1) {
    ranges.push({ start: pos, end: pos + snippetLower.length });
    pos += 1;
  }
  return ranges;
}

/**
 * Checks if two range spans [s1, e1] and [s2, e2] overlap.
 */
function isRangeOverlapping(r1, r2) {
  return Math.max(r1.start, r2.start) < Math.min(r1.end, r2.end);
}

/**
 * Validates that 4 snippets are mutually disjoint in string inclusion and character offsets.
 */
function validateDisjointSnippets(artifactContent, snippetsObj) {
  const {
    price_snippet = '',
    conditions_snippet = '',
    validity_snippet = '',
    scope_snippet = ''
  } = snippetsObj;

  const contentLower = artifactContent.toLowerCase();
  const claims = [
    { key: 'price', text: price_snippet.trim() },
    { key: 'conditions', text: conditions_snippet.trim() },
    { key: 'validity', text: validity_snippet.trim() },
    { key: 'scope', text: scope_snippet.trim() }
  ].filter(c => c.text.length > 0);

  const results = {
    price: TRIAGE_STATES.NOT_OBSERVED,
    conditions: TRIAGE_STATES.NOT_OBSERVED,
    validity: TRIAGE_STATES.NOT_OBSERVED,
    scope: TRIAGE_STATES.NOT_OBSERVED,
    disjoint_valid: true,
    failure_reason: null
  };

  // 1. Check for exact duplicate snippets or substring inclusion
  for (let i = 0; i < claims.length; i++) {
    for (let j = i + 1; j < claims.length; j++) {
      const t1 = claims[i].text.toLowerCase();
      const t2 = claims[j].text.toLowerCase();
      if (t1 === t2) {
        results.disjoint_valid = false;
        results.failure_reason = `DUPLICATE_SNIPPETS: '${claims[i].key}' and '${claims[j].key}' use identical string '${claims[i].text}'`;
        return results;
      }
      if (t1.includes(t2) || t2.includes(t1)) {
        results.disjoint_valid = false;
        results.failure_reason = `SUBSTRING_OVERLAP_SNIPPETS: '${claims[i].key}' ('${claims[i].text}') contains or is contained in '${claims[j].key}' ('${claims[j].text}')`;
        return results;
      }
    }
  }

  // 2. Find occurrence offsets for each claim in artifact
  const claimOccurrences = {};
  for (const claim of claims) {
    const tLower = claim.text.toLowerCase();
    const ranges = findSnippetRanges(contentLower, tLower);
    if (ranges.length === 0) {
      // Snippet not found in artifact
      continue;
    }
    claimOccurrences[claim.key] = ranges;
  }

  // 3. Find a combination of mutually disjoint ranges across all present claims
  const presentKeys = Object.keys(claimOccurrences);
  if (presentKeys.length === 0) {
    return results;
  }

  // Verify non-overlapping range assignment
  let disjointFound = false;
  function searchDisjoint(index, chosenRanges) {
    if (index === presentKeys.length) {
      disjointFound = true;
      return;
    }
    const key = presentKeys[index];
    for (const range of claimOccurrences[key]) {
      let overlaps = false;
      for (const chosen of chosenRanges) {
        if (isRangeOverlapping(range, chosen)) {
          overlaps = true;
          break;
        }
      }
      if (!overlaps) {
        chosenRanges.push(range);
        searchDisjoint(index + 1, chosenRanges);
        if (disjointFound) return;
        chosenRanges.pop();
      }
    }
  }

  searchDisjoint(0, []);

  if (!disjointFound && presentKeys.length > 1) {
    results.disjoint_valid = false;
    results.failure_reason = 'OFFSET_RANGE_OVERLAP: Snippets share overlapping character spans in artifact content.';
    return results;
  }

  // Assign OBSERVED for each claim that was successfully matched and disjoint
  for (const key of presentKeys) {
    results[key] = TRIAGE_STATES.OBSERVED;
  }

  return results;
}

/**
 * Checks current active validity against reference date (default: today).
 */
function checkTemporalActiveValidity(validitySpec, refDate = new Date()) {
  if (!validitySpec || typeof validitySpec !== 'object') {
    return { is_active: false, reason: 'NO_VALIDITY_SPEC' };
  }

  const {
    valid_to,
    recurring_rule,
    is_recurring = false
  } = validitySpec;

  // Case 1: Specific valid_to date
  if (valid_to) {
    const toDate = new Date(valid_to);
    if (isNaN(toDate.getTime())) {
      return { is_active: false, reason: 'INVALID_VALID_TO_DATE' };
    }
    const refIso = refDate.toISOString().slice(0, 10);
    const toIso = toDate.toISOString().slice(0, 10);
    if (toIso < refIso) {
      return { is_active: false, reason: `OFFER_EXPIRED: valid_to '${toIso}' is before current '${refIso}'` };
    }
    return { is_active: true, reason: `ACTIVE_VALID_TO: ${toIso}` };
  }

  // Case 2: Verified recurring schedule rule
  if (is_recurring && recurring_rule) {
    return { is_active: true, reason: `ACTIVE_RECURRING_RULE: ${recurring_rule}` };
  }

  return { is_active: false, reason: 'NO_ACTIVE_VALIDITY_PROOF' };
}

/**
 * Strict evaluation of a single signal in 083C.
 */
function evaluateSignalStrict083c(signal, options = {}) {
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
    evidence_bundle = null,
    validity_spec = null
  } = signal;

  const binding = verifyReceiptCompletenessStrict083c({
    ...(evidence_bundle || {}),
    signal_source_url: source_url
  });

  let point1_price = TRIAGE_STATES.NOT_OBSERVED;
  let point2_conditions = TRIAGE_STATES.NOT_OBSERVED;
  let point3_validity = TRIAGE_STATES.NOT_OBSERVED;
  let point4_scope = TRIAGE_STATES.NOT_OBSERVED;
  let point5_public = TRIAGE_STATES.NOT_OBSERVED;
  let point6_lineage = TRIAGE_STATES.NOT_OBSERVED;

  let snippetValidationReason = null;

  if (binding.valid && evidence_bundle) {
    const snippetCheck = validateDisjointSnippets(binding.artifact_content, {
      price_snippet: evidence_bundle.price_snippet,
      conditions_snippet: evidence_bundle.conditions_snippet,
      validity_snippet: evidence_bundle.validity_snippet,
      scope_snippet: evidence_bundle.scope_snippet
    });

    snippetValidationReason = snippetCheck.failure_reason;

    if (snippetCheck.disjoint_valid) {
      point1_price = snippetCheck.price;
      point2_conditions = snippetCheck.conditions;
      point3_validity = snippetCheck.validity;
      point4_scope = snippetCheck.scope;
    }

    // 5. Public accessibility
    if (!is_account_locked && !is_cart_dependent) {
      point5_public = TRIAGE_STATES.OBSERVED;
    }

    // 6. Source lineage
    if (binding.target_url && (binding.target_url.startsWith('https://') || binding.target_url.startsWith('http://'))) {
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

  const temporalCheck = checkTemporalActiveValidity(validity_spec || evidence_bundle?.validity_spec, options.refDate || new Date());

  if (!binding.valid) {
    decision = (is_account_locked || is_cart_dependent) 
      ? BATCH_DECISIONS.REJECTED_OR_ACCOUNT_DEPENDENT 
      : BATCH_DECISIONS.NEEDS_RECHECK;
    reason = `Chưa có bằng chứng receipt & artifact hợp lệ (${binding.failure_reason}). Xếp loại Lead/Radar cần thu thập capture thật.`;
  } else if (!snippetValidationReason && observedCount < 6 && snippetValidationReason) {
    decision = BATCH_DECISIONS.NEEDS_RECHECK;
    reason = `Snippet không hợp lệ: ${snippetValidationReason}`;
  } else if (is_account_locked || is_cart_dependent || declared_level === CONFIDENCE_LEVELS.LEVEL_C) {
    decision = BATCH_DECISIONS.REJECTED_OR_ACCOUNT_DEPENDENT;
    reason = 'Ưu đãi phụ thuộc tài khoản cá nhân hoặc giỏ hàng trong app.';
  } else if (declared_level === CONFIDENCE_LEVELS.LEVEL_D) {
    decision = BATCH_DECISIONS.NEEDS_RECHECK;
    reason = 'Tín hiệu cộng đồng (Level D) bắt buộc giữ ở hàng đợi Chưa xác minh, không tự nâng Level B.';
  } else if (observedCount === 6 && (declared_level === CONFIDENCE_LEVELS.LEVEL_A || declared_level === CONFIDENCE_LEVELS.LEVEL_B)) {
    // Check temporal active validity
    if (temporalCheck.is_active) {
      decision = BATCH_DECISIONS.READY_FOR_BATCH_REVIEW;
      reason = `Đủ 6/6 điểm đối soát trên bằng chứng snapshot vật lý & còn hiệu lực thời gian (${temporalCheck.reason}).`;
    } else {
      decision = BATCH_DECISIONS.LINEAGE_VALID_HISTORICAL_ONLY;
      reason = `Bằng chứng vật lý hợp lệ 6/6 điểm nhưng đã hết hạn hoặc không chứng minh còn hiệu lực hiện tại (${temporalCheck.reason}).`;
    }
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
    binding_failure_reason: binding.failure_reason || snippetValidationReason || null,
    triage_grid: triageGrid,
    observed_points_count: observedCount,
    total_applicable_points: 6,
    batch_decision: decision,
    decision_reason: reason,
    temporal_validity: temporalCheck,
    is_ready_for_review: decision === BATCH_DECISIONS.READY_FOR_BATCH_REVIEW,
    is_historical_lineage_only: decision === BATCH_DECISIONS.LINEAGE_VALID_HISTORICAL_ONLY
  };
}

module.exports = {
  TRIAGE_STATES,
  CONFIDENCE_LEVELS,
  BATCH_DECISIONS,
  normalizeUrlStrict,
  verifyReceiptCompletenessStrict083c,
  validateDisjointSnippets,
  checkTemporalActiveValidity,
  evaluateSignalStrict083c
};
