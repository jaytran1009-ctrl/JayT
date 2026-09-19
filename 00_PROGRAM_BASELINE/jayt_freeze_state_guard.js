/**
 * JAYT CONTAMINATION FREEZE STATE GUARD (V2 - INTEGRITY ENFORCED)
 * Governing Directives: JAYT-245 Section JAYT-263-CORRECTION-1 (Lines 5746-5759)
 *
 * PREFLIGHT INTEGRITY & FAIL-CLOSED CONTRACT:
 * 1. Checks JAYT_CONTAMINATION_FREEZE_STATE.json before ANY read or write I/O.
 * 2. If file missing or unavailable -> throws FREEZE_STATE_UNAVAILABLE (fail-closed).
 * 3. If malformed JSON -> throws ERR_INVALID_FREEZE_STATE_JSON (fail-closed).
 * 4. Recomputes canonical payload SHA-256 (excluding canonical_payload_sha256).
 *    If mismatch -> throws FREEZE_STATE_INTEGRITY_MISMATCH (fail-closed).
 * 5. If state is ACTIVE and component in scope -> throws CONTAMINATION_FREEZE_ACTIVE (fail-closed).
 * 6. Immutable unlock rule: Only CEO directive can remove freeze.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const FREEZE_STATE_PATH = path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_CONTAMINATION_FREEZE_STATE.json');

function canonicalizeObject(val) {
  if (val === null || typeof val !== 'object') {
    return val;
  }
  if (Array.isArray(val)) {
    // Array elements preserve explicit order, but any objects inside are recursively canonicalized
    return val.map(canonicalizeObject);
  }
  const sortedKeys = Object.keys(val).sort();
  const res = {};
  for (const k of sortedKeys) {
    res[k] = canonicalizeObject(val[k]);
  }
  return res;
}

function computeCanonicalPayloadSha256(stateObj) {
  const cleanObj = {};
  for (const k of Object.keys(stateObj)) {
    if (k !== 'canonical_payload_sha256') {
      cleanObj[k] = stateObj[k];
    }
  }
  const canonicalized = canonicalizeObject(cleanObj);
  const payloadStr = JSON.stringify(canonicalized);
  return crypto.createHash('sha256').update(payloadStr, 'utf8').digest('hex');
}

function assertContaminationFreezeNotActive(componentName, customFreezeStatePath = null) {
  const targetPath = customFreezeStatePath || FREEZE_STATE_PATH;

  if (!fs.existsSync(targetPath)) {
    throw new Error('FREEZE_STATE_UNAVAILABLE: Freeze state record file "' + targetPath + '" is missing or unavailable.');
  }

  let state;
  try {
    state = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
  } catch (err) {
    throw new Error('ERR_INVALID_FREEZE_STATE_JSON: ' + err.message);
  }

  if (!state || typeof state !== 'object') {
    throw new Error('ERR_INVALID_FREEZE_STATE_JSON: State record is not a valid JSON object.');
  }

  // Integrity Check: Compute canonical payload digest (excluding canonical_payload_sha256)
  const computedSha256 = computeCanonicalPayloadSha256(state);
  const declaredSha256 = state.canonical_payload_sha256;

  if (!declaredSha256 || declaredSha256 !== computedSha256) {
    throw new Error(
      'FREEZE_STATE_INTEGRITY_MISMATCH: Freeze state record integrity verification failed. ' +
      'Declared digest: ' + declaredSha256 + ', Computed digest: ' + computedSha256
    );
  }

  const isActive = (state.state === 'ACTIVE' || state.freeze_active === true);
  if (isActive) {
    const scopes = state.scope || state.freeze_scope || [];
    const inScope = (scopes.length === 0) ||
      scopes.includes(componentName) ||
      (componentName === 'COHORT_15_OPERATIONAL_RUNNER' && (scopes.includes('COHORT_15_RUNNER') || scopes.includes('COHORT_15_OPERATIONAL_RUNNER'))) ||
      (componentName === 'STOREFRONT_CATALOG_BUILDER' && (scopes.includes('CATALOG_BUILD') || scopes.includes('STOREFRONT_CATALOG_BUILDER')));

    if (inScope) {
      throw new Error(
        'CONTAMINATION_FREEZE_ACTIVE: Component "' + componentName +
        '" is strictly FROZEN under ' + (state.directive_id || state.ceo_directive_id || 'JAYT-263-CORRECTION-1') +
        '. Reason: ' + (state.reason || 'Hard circuit breaker freeze active until CEO audit.')
      );
    }
  }
}

module.exports = {
  assertContaminationFreezeNotActive,
  computeCanonicalPayloadSha256,
  FREEZE_STATE_PATH
};
