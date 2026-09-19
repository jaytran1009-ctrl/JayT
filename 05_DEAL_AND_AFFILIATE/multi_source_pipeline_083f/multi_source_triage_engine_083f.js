/**
 * JAYT STRICT PROVENANCE ORIGIN & EVIDENCE GATE ENGINE (083F)
 * Directive: JAYT-083F-PROVENANCE-ORIGIN-GATE
 * 
 * Invariants & Gate Rules:
 * 1. PROVENANCE ORIGIN & FORBIDDEN PATH LOCKOUT:
 *    - All mock/fixture/test/sandbox/quarantine/temp paths are strictly rejected fail-closed.
 *    - No mock fixture can EVER reach `READY_FOR_BATCH_REVIEW`.
 *    - Receipt must contain authentic `capture_origin` / `capture_method` in the allowlist.
 * 2. ZERO-TRUST RECEIPT-ONLY VALIDITY:
 *    - `validity_spec` is read EXCLUSIVELY from `receipt_data.validity_spec`.
 *    - Any signal/caller-injected validity spec -> `VALIDITY_SPEC_NOT_RECEIPT_BOUND`.
 * 3. EXPLICIT ARTIFACT TYPE & CRYPTOGRAPHIC LINKAGE:
 *    - `artifact_type` must be explicitly defined and allowlisted: `['html', 'text', 'pdf', 'dom_html', 'raw_html', 'extracted_text']`.
 *    - Byte-for-byte SHA-256 verification on disk for receipt and artifact.
 * 4. DISJOINT SNIPPET VERIFICATION:
 *    - Prohibits duplicate snippets, substring overlaps, and overlapping offset ranges.
 * 5. FRESHNESS TTL & TEMPORAL VALIDITY:
 *    - Daily: <= 24h
 *    - Weekly recurring: <= 7d (with snippet grounding)
 *    - Specific valid_to: <= 30d (valid_to >= refDate)
 *    - Real captures that are historical or exceed TTL -> `LINEAGE_VALID_HISTORICAL_ONLY`.
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

const ALLOWED_ARTIFACT_TYPES = new Set([
  'html',
  'text',
  'pdf',
  'dom_html',
  'raw_html',
  'extracted_text'
]);

const ALLOWED_CAPTURE_ORIGINS = new Set([
  'LIVE_CHROME_CDP_ANONYMOUS',
  'REAL_BROWSER_CDP',
  'REAL_CHROME_CDP',
  'OFFICIAL_FEED_INTAKE',
  'MERCHANT_API_INGESTION'
]);

const FORBIDDEN_PATH_PATTERNS = [
  /mock_fixtures?/i,
  /\/fixtures?\//i,
  /\/tests?\//i,
  /\/test_/i,
  /\/private_sandbox\//i,
  /\/sandbox\//i,
  /\/quarantine_vault\//i,
  /\/temp\//i,
  /\/tmp\//i,
  /sample_intake_template/i,
  /\.user_uploaded/i,
  /project_memory\.md/i
];

const SYNTHETIC_CONTENT_MARKERS = [
  'DEMO_ONLY_NOT_FOR_RENDER',
  '[SYNTHETIC]',
  'TEST_ONLY_NOT_EVIDENCE',
  'SYNTHETIC_NOT_EVIDENCE'
];

const SHA256_HEX_REGEX = /^[0-9a-f]{64}$/i;

const FRESHNESS_TTL_MS = {
  DAILY_DEAL: 24 * 60 * 60 * 1000,
  WEEKLY_RECURRING: 7 * 24 * 60 * 60 * 1000,
  SPECIFIC_VALID_TO: 30 * 24 * 60 * 60 * 1000
};

function getFileSha256(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function normalizeUrlStrict(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string') return '';
  try {
    const parsed = new URL(rawUrl.trim());
    let hostname = parsed.hostname.toLowerCase().replace(/^www\./, '');
    let pathname = parsed.pathname.replace(/\/+$/, '');
    return `${hostname}${pathname}`;
  } catch {
    return rawUrl.trim().toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/[?#].*$/, '')
      .replace(/\/+$/, '');
  }
}

/**
 * Validates physical receipt completeness, provenance origin, allowlisted artifact type, and cryptographic integrity.
 */
function verifyReceiptProvenanceStrict083f(evidenceBundle) {
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

  // 2. Strict Forbidden Path Check (Blocks all mocks, fixtures, tests, temp, quarantine)
  for (const pattern of FORBIDDEN_PATH_PATTERNS) {
    if (pattern.test(receipt_path)) {
      return { valid: false, failure_reason: `FORBIDDEN_EVIDENCE_PATH: '${receipt_path}' originates from prohibited test/mock/sandbox path.` };
    }
  }

  // 3. Mandatory receipt_sha256 (64 hex characters)
  if (!receipt_sha256 || typeof receipt_sha256 !== 'string' || !SHA256_HEX_REGEX.test(receipt_sha256)) {
    return { valid: false, failure_reason: 'MISSING_OR_INVALID_RECEIPT_SHA256_MANDATORY' };
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

  // 5. Mandatory receipt_id
  if (!receiptData.receipt_id || typeof receiptData.receipt_id !== 'string') {
    return { valid: false, failure_reason: 'RECEIPT_MISSING_RECEIPT_ID' };
  }

  // 6. Mandatory Provenance Origin / Capture Method
  const captureOrigin = receiptData.capture_origin || receiptData.capture_method || receiptData.origin;
  if (!captureOrigin || typeof captureOrigin !== 'string' || !ALLOWED_CAPTURE_ORIGINS.has(captureOrigin.trim())) {
    return { valid: false, failure_reason: `PROVENANCE_ORIGIN_UNVERIFIED: '${captureOrigin}'. Allowed origins: [${Array.from(ALLOWED_CAPTURE_ORIGINS).join(', ')}]` };
  }

  // 7. Mandatory target_url
  const receiptTargetUrl = receiptData.target_url || receiptData.source_url;
  if (!receiptTargetUrl || typeof receiptTargetUrl !== 'string') {
    return { valid: false, failure_reason: 'RECEIPT_MISSING_TARGET_URL' };
  }

  // 8. Mandatory URL normalization comparison
  if (signal_source_url) {
    const normSignalUrl = normalizeUrlStrict(signal_source_url);
    const normReceiptUrl = normalizeUrlStrict(receiptTargetUrl);
    if (!normSignalUrl || !normReceiptUrl || normSignalUrl !== normReceiptUrl) {
      return { valid: false, failure_reason: `NORMALIZED_URL_MISMATCH: signal '${normSignalUrl}' vs receipt '${normReceiptUrl}'` };
    }
  }

  // 9. Mandatory capture timestamp
  const capturedAt = receiptData.checked_at || receiptData.captured_at || receiptData.timestamp;
  if (!capturedAt || isNaN(Date.parse(capturedAt))) {
    return { valid: false, failure_reason: 'RECEIPT_MISSING_OR_INVALID_CAPTURE_TIMESTAMP' };
  }

  // 10. Extract Artifact References & Allowlisted Artifact Type
  let artifactPath = null;
  let artifactSha = null;
  let artifactType = null;

  if (typeof receiptData.artifact_type === 'string' && receiptData.artifact_type.trim().length > 0) {
    artifactType = receiptData.artifact_type.trim().toLowerCase();
  }

  if (receiptData.artifacts && typeof receiptData.artifacts === 'object') {
    if (receiptData.artifacts.dom_html) {
      artifactPath = receiptData.artifacts.dom_html.path;
      artifactSha = receiptData.artifacts.dom_html.sha256;
      if (!artifactType) artifactType = 'dom_html';
    } else if (receiptData.artifacts.raw_html) {
      artifactPath = receiptData.artifacts.raw_html.path;
      artifactSha = receiptData.artifacts.raw_html.sha256;
      if (!artifactType) artifactType = 'raw_html';
    } else if (receiptData.artifacts.extracted_text) {
      artifactPath = receiptData.artifacts.extracted_text.path;
      artifactSha = receiptData.artifacts.extracted_text.sha256;
      if (!artifactType) artifactType = 'extracted_text';
    } else if (receiptData.artifacts.primary) {
      artifactPath = receiptData.artifacts.primary.path;
      artifactSha = receiptData.artifacts.primary.sha256;
      if (!artifactType) artifactType = receiptData.artifacts.primary.artifact_type;
    }
  }

  if (!artifactPath) {
    artifactPath = receiptData.artifact_path;
    artifactSha = receiptData.artifact_sha256;
  }

  if (!artifactType) {
    return { valid: false, failure_reason: 'RECEIPT_MISSING_EXPLICIT_ARTIFACT_TYPE: Receipt must explicitly specify valid artifact_type.' };
  }

  if (!ALLOWED_ARTIFACT_TYPES.has(artifactType)) {
    return { valid: false, failure_reason: `UNALLOWLISTED_ARTIFACT_TYPE: '${artifactType}'. Allowed: [${Array.from(ALLOWED_ARTIFACT_TYPES).join(', ')}]` };
  }

  if (!artifactPath || typeof artifactPath !== 'string') {
    return { valid: false, failure_reason: 'RECEIPT_MISSING_ARTIFACT_PATH' };
  }

  // Check forbidden paths on artifact_path as well
  for (const pattern of FORBIDDEN_PATH_PATTERNS) {
    if (pattern.test(artifactPath)) {
      return { valid: false, failure_reason: `FORBIDDEN_EVIDENCE_PATH: '${artifactPath}' originates from prohibited test/mock/sandbox path.` };
    }
  }

  if (!artifactSha || typeof artifactSha !== 'string' || !SHA256_HEX_REGEX.test(artifactSha)) {
    return { valid: false, failure_reason: 'RECEIPT_MISSING_OR_INVALID_ARTIFACT_SHA256' };
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

  // 11. Check for synthetic markers
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
    artifact_type: artifactType,
    capture_origin: captureOrigin,
    captured_at: capturedAt,
    target_url: receiptTargetUrl
  };
}

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

function isRangeOverlapping(r1, r2) {
  return Math.max(r1.start, r2.start) < Math.min(r1.end, r2.end);
}

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

  // 1. Check duplicate snippets or substring inclusion
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

  // 2. Find occurrence offsets
  const claimOccurrences = {};
  for (const claim of claims) {
    const tLower = claim.text.toLowerCase();
    const ranges = findSnippetRanges(contentLower, tLower);
    if (ranges.length === 0) {
      continue;
    }
    claimOccurrences[claim.key] = ranges;
  }

  const presentKeys = Object.keys(claimOccurrences);
  if (presentKeys.length === 0) {
    return results;
  }

  // 3. Search non-overlapping range assignment
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

  for (const key of presentKeys) {
    results[key] = TRIAGE_STATES.OBSERVED;
  }

  return results;
}

/**
 * Checks Active Temporal Validity from Receipt-Only Validity Spec.
 */
function checkTemporalActiveValidity083f(receiptValiditySpec, capturedAt, validitySnippet, refDate = new Date()) {
  if (!capturedAt || isNaN(Date.parse(capturedAt))) {
    return { is_active: false, reason: 'MISSING_OR_INVALID_CAPTURE_TIME' };
  }

  const captureTime = new Date(capturedAt).getTime();
  const refTime = refDate.getTime();
  const ageMs = refTime - captureTime;

  if (ageMs < 0) {
    return { is_active: false, reason: `FUTURE_CAPTURE_TIME_ANOMALY: captured_at '${capturedAt}' is after refDate` };
  }

  if (!receiptValiditySpec || typeof receiptValiditySpec !== 'object') {
    return { is_active: false, reason: 'RECEIPT_HAS_NO_VALIDITY_SPEC' };
  }

  const {
    deal_type = 'WEEKLY_RECURRING',
    valid_to = null,
    recurring_rule = null,
    is_recurring = false
  } = receiptValiditySpec;

  const vSnippetLower = (validitySnippet || '').trim().toLowerCase();

  // Case 1: Daily / Hourly Flash Deal
  if (deal_type === 'DAILY_DEAL' || deal_type === 'FLASH_DEAL') {
    if (ageMs > FRESHNESS_TTL_MS.DAILY_DEAL) {
      const ageHours = (ageMs / (3600 * 1000)).toFixed(1);
      return { is_active: false, reason: `DAILY_DEAL_EXCEEDED_TTL_24H: capture age is ${ageHours}h (> 24h)` };
    }
    return { is_active: true, reason: 'ACTIVE_DAILY_DEAL_WITHIN_24H_TTL' };
  }

  // Case 2: Specific valid_to Date
  if (valid_to) {
    const toDate = new Date(valid_to);
    if (isNaN(toDate.getTime())) {
      return { is_active: false, reason: 'INVALID_VALID_TO_DATE_IN_RECEIPT' };
    }

    const refIso = refDate.toISOString().slice(0, 10);
    const toIso = toDate.toISOString().slice(0, 10);
    if (toIso < refIso) {
      return { is_active: false, reason: `OFFER_EXPIRED: valid_to '${toIso}' is before current '${refIso}'` };
    }

    if (ageMs > FRESHNESS_TTL_MS.SPECIFIC_VALID_TO) {
      const ageDays = (ageMs / (24 * 3600 * 1000)).toFixed(1);
      return { is_active: false, reason: `CAPTURE_EXCEEDED_30D_TTL: capture age is ${ageDays}d (> 30d)` };
    }

    return { is_active: true, reason: `ACTIVE_VALID_TO_WITHIN_30D_TTL: valid_to=${toIso}` };
  }

  // Case 3: Weekly / Recurring Deal
  if (is_recurring && recurring_rule) {
    const ruleLower = recurring_rule.trim().toLowerCase();
    if (!vSnippetLower || (!vSnippetLower.includes(ruleLower) && !ruleLower.includes(vSnippetLower))) {
      return { is_active: false, reason: `VALIDITY_SNIPPET_UNGROUNDED: snippet '${validitySnippet}' does not substantiate receipt rule '${recurring_rule}'` };
    }

    if (ageMs > FRESHNESS_TTL_MS.WEEKLY_RECURRING) {
      const ageDays = (ageMs / (24 * 3600 * 1000)).toFixed(1);
      return { is_active: false, reason: `RECURRING_DEAL_EXCEEDED_7D_TTL: capture age is ${ageDays}d (> 7d)` };
    }
    return { is_active: true, reason: `ACTIVE_RECURRING_RULE_WITHIN_7D_TTL: ${recurring_rule}` };
  }

  return { is_active: false, reason: 'NO_ACTIVE_VALIDITY_RULE_IN_RECEIPT' };
}

/**
 * Strict evaluation of a single signal in 083F.
 */
function evaluateSignalStrict083f(signal, options = {}) {
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

  // 1. Zero-Trust Check: Reject caller self-declared validity_spec
  if (signal.validity_spec || evidence_bundle?.validity_spec) {
    return {
      id,
      cohort,
      brand,
      title,
      declared_level,
      binding_valid: false,
      binding_failure_reason: 'VALIDITY_SPEC_NOT_RECEIPT_BOUND: Prohibited self-declared validity_spec in signal/evidence_bundle. Validity must be read exclusively from physical receipt on disk.',
      triage_grid: {
        point_1_price_spec: TRIAGE_STATES.NOT_OBSERVED,
        point_2_terms_conditions: TRIAGE_STATES.NOT_OBSERVED,
        point_3_validity_window: TRIAGE_STATES.NOT_OBSERVED,
        point_4_geographic_scope: TRIAGE_STATES.NOT_OBSERVED,
        point_5_public_accessibility: TRIAGE_STATES.NOT_OBSERVED,
        point_6_verifiable_lineage: TRIAGE_STATES.NOT_OBSERVED
      },
      observed_points_count: 0,
      total_applicable_points: 6,
      batch_decision: BATCH_DECISIONS.NEEDS_RECHECK,
      decision_reason: 'VALIDITY_SPEC_NOT_RECEIPT_BOUND: Prohibited self-declared validity_spec detected.',
      temporal_validity: { is_active: false, reason: 'PROHIBITED_SELF_DECLARED_VALIDITY' },
      is_ready_for_review: false,
      is_historical_lineage_only: false
    };
  }

  const binding = verifyReceiptProvenanceStrict083f({
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

  const receiptValiditySpec = binding.receipt_data?.validity_spec || null;
  const temporalCheck = checkTemporalActiveValidity083f(
    receiptValiditySpec,
    binding.captured_at,
    evidence_bundle?.validity_snippet,
    options.refDate || new Date()
  );

  if (!binding.valid) {
    decision = (is_account_locked || is_cart_dependent) 
      ? BATCH_DECISIONS.REJECTED_OR_ACCOUNT_DEPENDENT 
      : BATCH_DECISIONS.NEEDS_RECHECK;
    reason = `Chưa có bằng chứng receipt & artifact hợp lệ (${binding.failure_reason}). Xếp loại Lead/Radar cần thu thập capture thật.`;
  } else if (snippetValidationReason) {
    decision = BATCH_DECISIONS.NEEDS_RECHECK;
    reason = `Snippet không hợp lệ: ${snippetValidationReason}`;
  } else if (is_account_locked || is_cart_dependent || declared_level === CONFIDENCE_LEVELS.LEVEL_C) {
    decision = BATCH_DECISIONS.REJECTED_OR_ACCOUNT_DEPENDENT;
    reason = 'Ưu đãi phụ thuộc tài khoản cá nhân hoặc giỏ hàng trong app.';
  } else if (declared_level === CONFIDENCE_LEVELS.LEVEL_D) {
    decision = BATCH_DECISIONS.NEEDS_RECHECK;
    reason = 'Tín hiệu cộng đồng (Level D) bắt buộc giữ ở hàng đợi Chưa xác minh, không tự nâng Level B.';
  } else if (observedCount === 6 && (declared_level === CONFIDENCE_LEVELS.LEVEL_A || declared_level === CONFIDENCE_LEVELS.LEVEL_B)) {
    if (temporalCheck.is_active) {
      decision = BATCH_DECISIONS.READY_FOR_BATCH_REVIEW;
      reason = `Đủ 6/6 điểm đối soát trên bằng chứng snapshot vật lý & receipt chứng minh còn hiệu lực (${temporalCheck.reason}).`;
    } else {
      decision = BATCH_DECISIONS.LINEAGE_VALID_HISTORICAL_ONLY;
      reason = `Bằng chứng vật lý hợp lệ 6/6 điểm nhưng receipt đã hết hạn hoặc không chứng minh còn hiệu lực hiện tại (${temporalCheck.reason}).`;
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
  ALLOWED_ARTIFACT_TYPES,
  ALLOWED_CAPTURE_ORIGINS,
  FRESHNESS_TTL_MS,
  normalizeUrlStrict,
  verifyReceiptProvenanceStrict083f,
  validateDisjointSnippets,
  checkTemporalActiveValidity083f,
  evaluateSignalStrict083f
};
