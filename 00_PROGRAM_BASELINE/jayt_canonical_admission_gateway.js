/**
 * JAYT CANONICAL ADMISSION GATEWAY & UNIFIED ARTIFACT LOADER
 * Governing Directives:
 * - JAYT-245 Section JAYT-260-CORRECTION-3 (Lines 5470-5485)
 * - JAYT-245 Section JAYT-264-CORRECTION-1 (Lines 5802-5815)
 *
 * UNIFIED ADMISSION ARCHITECTURE:
 * All intake pipelines, validators, renderers, and QA loaders MUST interact with evidence artifacts
 * exclusively through this gateway.
 *
 * ENFORCEMENT RULES:
 * 1. Pre-execution Remediation Overlay Check:
 *    - Loads REMEDIATION_OVERLAY_COHORT_15_RETIREMENT.json dynamically at runtime.
 *    - Validates file availability, JSON syntax, schema, and exact SHA-256 integrity.
 *    - Rejects retired candidate_id or colliding disallowed_hash with CLOSED_CONTAMINATION_SHARED_RAW.
 *    - Rejects candidates lacking identification with ERR_RETIREMENT_OVERLAY_INSUFFICIENT_CANDIDATE_IDENTITY.
 * 2. Pre-execution Denylist Check: Asserts path, SHA-256 hash, and raw byte content against quarantined denylist.
 * 3. Mandatory Fail-Closed: Any match throws immediately before reading raw files, writing ledgers, or rendering.
 * 4. 4-Pillar Caller Graph: Covers INTAKE, VALIDATION, RENDERING, and QUALITY_ASSURANCE.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const { assertArtifactNotQuarantined, getQuarantineDenylist } = require('./jayt_artifact_loader_guard.js');

const REMEDIATION_OVERLAY_PATH = path.join(ROOT, '06_TRUST_AND_EVIDENCE/REMEDIATION_OVERLAY_COHORT_15_RETIREMENT.json');
const EXPECTED_OVERLAY_SHA256 = '4d5baeaa9257ce554360f9b896ce70af75233f1795eaf930373b94a852e540e4';

const CALLER_GRAPH_REGISTRY = {
  INTAKE: {
    name: "intake_pipeline",
    description: "Ingests raw candidate payloads, verifies HTTP receipts, and writes intake ledgers.",
    enforcement_gate: "readEvidenceFile & verifyCandidateAdmission"
  },
  VALIDATION: {
    name: "validation_engine",
    description: "Evaluates 2D content matrix, standalone T4 contracts, and SLA maturity.",
    enforcement_gate: "loadAndValidateLedger & verifyCandidateAdmission"
  },
  RENDERING: {
    name: "storefront_renderer",
    description: "Renders approved content cards to staging/production DOM.",
    enforcement_gate: "renderCatalogWithAdmission"
  },
  QUALITY_ASSURANCE: {
    name: "qa_loader_gate",
    description: "Verifies platform parity, viewports, and negative fixtures across test suites.",
    enforcement_gate: "loadAndValidateLedger & readEvidenceFile"
  }
};

/**
 * 0. Remediation Overlay Loader & Integrity Verifier
 */
function loadAndVerifyRemediationOverlay(customOverlayPath = null) {
  const targetPath = customOverlayPath || REMEDIATION_OVERLAY_PATH;

  if (!fs.existsSync(targetPath)) {
    throw new Error('ERR_REMEDIATION_OVERLAY_UNAVAILABLE: Remediation overlay file "' + targetPath + '" is missing or unavailable.');
  }

  const rawBytes = fs.readFileSync(targetPath);
  let overlay;
  try {
    overlay = JSON.parse(rawBytes.toString('utf8'));
  } catch (err) {
    throw new Error('ERR_REMEDIATION_OVERLAY_MALFORMED: Overlay JSON syntax error: ' + err.message);
  }

  if (!overlay || typeof overlay !== 'object') {
    throw new Error('ERR_REMEDIATION_OVERLAY_MALFORMED: Overlay content is not a valid JSON object.');
  }

  // Integrity check: match SHA-256 against manifest / contract
  const computedHash = crypto.createHash('sha256').update(rawBytes).digest('hex');
  if (computedHash !== EXPECTED_OVERLAY_SHA256) {
    throw new Error(
      'ERR_REMEDIATION_OVERLAY_INTEGRITY_MISMATCH: Remediation overlay SHA-256 mismatch. Expected: ' +
      EXPECTED_OVERLAY_SHA256 + ', Computed: ' + computedHash
    );
  }

  // Minimum schema validation
  if (!overlay.transaction_id || !overlay.candidate_id || overlay.new_state !== 'CLOSED_CONTAMINATION_SHARED_RAW' || !overlay.disallowed_hash) {
    throw new Error('ERR_REMEDIATION_OVERLAY_MALFORMED: Overlay missing required schema properties.');
  }

  return overlay;
}

/**
 * Pre-check: Candidate Identity & Retirement Circuit Breaker
 */
function assertCandidateNotRetired(candidate, customOverlayPath = null) {
  if (!candidate || typeof candidate !== 'object') {
    throw new Error('ERR_RETIREMENT_OVERLAY_INSUFFICIENT_CANDIDATE_IDENTITY: Candidate payload is not an object.');
  }

  if (!candidate.candidate_id || typeof candidate.candidate_id !== 'string' || candidate.candidate_id.trim() === '') {
    throw new Error('ERR_RETIREMENT_OVERLAY_INSUFFICIENT_CANDIDATE_IDENTITY: Candidate lacks candidate_id.');
  }

  // Load and verify overlay dynamically at runtime (no hardcoded bypass)
  const overlay = loadAndVerifyRemediationOverlay(customOverlayPath);

  // Check 1: Candidate ID match
  if (candidate.candidate_id === overlay.candidate_id) {
    throw new Error(
      'CLOSED_CONTAMINATION_SHARED_RAW: Candidate "' + candidate.candidate_id +
      '" is permanently retired under ' + overlay.governing_directive + '. Reason: ' + overlay.reason
    );
  }

  // Check 2: Raw SHA-256 collision match
  if (candidate.raw_sha256 && candidate.raw_sha256 === overlay.disallowed_hash) {
    throw new Error(
      'CLOSED_CONTAMINATION_SHARED_RAW: Candidate "' + candidate.candidate_id +
      '" utilizes quarantined colliding raw SHA-256 hash "' + candidate.raw_sha256 + '".'
    );
  }

  return true;
}

/**
 * 1. Canonical Evidence File Reader
 * Checks path, bytes, and computed hash before returning payload.
 */
function readEvidenceFile(relativePathOrAbsolute, callerPillar = "QUALITY_ASSURANCE") {
  const resolvedPath = path.isAbsolute(relativePathOrAbsolute)
    ? relativePathOrAbsolute
    : path.join(ROOT, relativePathOrAbsolute);

  const relativeFromRoot = path.relative(ROOT, resolvedPath).replace(/\\/g, '/');

  // Step 1: Pre-read path denylist check
  assertArtifactNotQuarantined(relativeFromRoot);

  if (!fs.existsSync(resolvedPath)) {
    throw new Error('ERR_EVIDENCE_FILE_NOT_FOUND: ' + relativeFromRoot);
  }

  const bytes = fs.readFileSync(resolvedPath);
  const sha256 = crypto.createHash('sha256').update(bytes).digest('hex');

  // Step 2: Post-read content and hash denylist check
  assertArtifactNotQuarantined(relativeFromRoot, bytes);
  assertArtifactNotQuarantined(sha256);

  return {
    path: relativeFromRoot,
    absolutePath: resolvedPath,
    bytes: bytes,
    utf8: bytes.toString('utf8'),
    sha256: sha256,
    byteLength: bytes.length,
    callerPillar: callerPillar
  };
}

/**
 * 2. Canonical Ledger Loader & Candidate Validator
 * Loads JSON ledger and validates every candidate's evidence reference.
 */
function loadAndValidateLedger(ledgerRelativeOrAbsolute, callerPillar = "VALIDATION") {
  const fileData = readEvidenceFile(ledgerRelativeOrAbsolute, callerPillar);
  const ledger = JSON.parse(fileData.utf8);

  if (ledger.candidates && Array.isArray(ledger.candidates)) {
    for (const c of ledger.candidates) {
      if (c.raw_vault_path) {
        assertArtifactNotQuarantined(c.raw_vault_path);
      }
      if (c.raw_sha256) {
        assertArtifactNotQuarantined(c.raw_sha256);
      }
    }
  }

  return ledger;
}

/**
 * 3. Candidate Admission Validator
 * Pre-checks remediation overlay, then checks candidate against denylist and geographic contract rules.
 */
function verifyCandidateAdmission(candidate, callerPillar = "INTAKE", customOverlayPath = null) {
  // Gate 0: Remediation overlay preflight check (Mandate JAYT-264-CORRECTION-1)
  assertCandidateNotRetired(candidate, customOverlayPath);

  // Gate 1: Denylist path & hash checks
  if (candidate.raw_vault_path) {
    assertArtifactNotQuarantined(candidate.raw_vault_path);
  }
  if (candidate.raw_sha256) {
    assertArtifactNotQuarantined(candidate.raw_sha256);
  }

  // Gate 2: Geographic scope enforcement
  if (candidate.out_of_scope_city || (candidate.geographic_scope && !['DA_NANG', 'DA_NANG_STUDENT_CLUSTER', 'TOAN_QUOC_DA_NANG_VERIFIED'].includes(candidate.geographic_scope))) {
    throw new Error('ERR_GEOGRAPHIC_SCOPE_VIOLATION_NOT_DA_NANG: Candidate targets out-of-scope locality.');
  }

  return {
    candidate_id: candidate.candidate_id,
    admission_permitted: true,
    callerPillar: callerPillar
  };
}

/**
 * 4. Storefront Catalog Renderer Gate
 * Ensures only candidates passing admission AND PUBLIC_APPROVED can be rendered.
 */
function renderCatalogWithAdmission(candidateList, callerPillar = "RENDERING", customOverlayPath = null) {
  const sanitizedRenderables = [];

  for (const item of candidateList) {
    verifyCandidateAdmission(item, callerPillar, customOverlayPath);

    if (item.admissionState === 'PUBLIC_APPROVED' && item.public_eligible === true) {
      sanitizedRenderables.push(item);
    }
  }

  return {
    rendered_count: sanitizedRenderables.length,
    rendered_items: sanitizedRenderables,
    callerPillar: callerPillar
  };
}

module.exports = {
  CALLER_GRAPH_REGISTRY,
  REMEDIATION_OVERLAY_PATH,
  EXPECTED_OVERLAY_SHA256,
  loadAndVerifyRemediationOverlay,
  assertCandidateNotRetired,
  readEvidenceFile,
  loadAndValidateLedger,
  verifyCandidateAdmission,
  renderCatalogWithAdmission
};
