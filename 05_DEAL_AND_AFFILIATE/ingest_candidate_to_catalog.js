const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Dynamic Root Resolution (NO HARD-CODED DRIVES)
const repoRoot = path.resolve(__dirname, '..');
const { validateCandidate } = require(path.join(repoRoot, '07_QUALITY_ASSURANCE', 'validate_candidate_evidence.js'));
const {
  validateAntiSynthetic,
  validateClaimBoundedToArtifact,
  validateAppendOnlyRunIsolation
} = require(path.join(repoRoot, '07_QUALITY_ASSURANCE', 'governance_policy_engine.js'));

const DEALS_FEED_PATH = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const EVIDENCE_STORE_PATH = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'evidence_store.json');

function getSha256(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

/**
 * Validates the mandatory explicit CEO Approval Token/Manifest.
 * Neither PASS nor READY_FOR_CEO_REVIEW is authorized to auto-import without this artifact.
 */
function validateCeoApprovalManifest(approvalManifest, candidateData, candidatePath) {
  if (!approvalManifest || typeof approvalManifest !== 'object') {
    return {
      valid: false,
      error_code: 'ERR_CEO_APPROVAL_REQUIRED',
      message: 'FAIL-CLOSED: Ingestion requires an explicit CEO Approval Manifest. Auto-import from PASS or READY_FOR_CEO_REVIEW is strictly prohibited.'
    };
  }

  if (approvalManifest.approved_by !== 'CEO_JAY_TRAN') {
    return {
      valid: false,
      error_code: 'ERR_INVALID_APPROVER',
      message: `FAIL-CLOSED: Approval manifest must be signed by 'CEO_JAY_TRAN' (got '${approvalManifest.approved_by}').`
    };
  }

  if (approvalManifest.status !== 'AUTHORIZED_FOR_CATALOG_INGESTION') {
    return {
      valid: false,
      error_code: 'ERR_APPROVAL_NOT_AUTHORIZED',
      message: `FAIL-CLOSED: Approval status is '${approvalManifest.status}'. Must be 'AUTHORIZED_FOR_CATALOG_INGESTION'.`
    };
  }

  const candidateId = candidateData.candidate_id || (candidateData.deals && candidateData.deals[0] && candidateData.deals[0].deal_id);
  if (approvalManifest.candidate_id !== candidateId) {
    return {
      valid: false,
      error_code: 'ERR_APPROVAL_CANDIDATE_MISMATCH',
      message: `FAIL-CLOSED: Approval manifest candidate_id '${approvalManifest.candidate_id}' does not match deal candidate_id '${candidateId}'.`
    };
  }

  if (candidatePath && fs.existsSync(candidatePath)) {
    const actualCandidateHash = getSha256(candidatePath);
    if (approvalManifest.candidate_sha256 && approvalManifest.candidate_sha256 !== actualCandidateHash) {
      return {
        valid: false,
        error_code: 'ERR_APPROVAL_HASH_MISMATCH',
        message: `FAIL-CLOSED: Candidate SHA-256 '${actualCandidateHash}' does not match approval token '${approvalManifest.candidate_sha256}'.`
      };
    }
  }

  return { valid: true };
}

/**
 * True 2-File Atomic Ingest Candidate with Dual-Backup Rollback Journal
 */
function ingestCandidateFile(candidatePath, targetFeedPath = DEALS_FEED_PATH, targetEvidencePath = EVIDENCE_STORE_PATH, options = {}) {
  if (!fs.existsSync(candidatePath)) {
    return {
      success: false,
      error_code: 'ERR_CANDIDATE_NOT_FOUND',
      message: `Candidate file not found: ${candidatePath}`,
      ingested_deals: 0
    };
  }

  const preFeedHash = getSha256(targetFeedPath);
  const preEvidenceHash = getSha256(targetEvidencePath);

  let data;
  try {
    data = JSON.parse(fs.readFileSync(candidatePath, 'utf8'));
  } catch (e) {
    return {
      success: false,
      error_code: 'ERR_JSON_PARSE',
      message: `Invalid JSON in candidate file: ${e.message}`,
      ingested_deals: 0
    };
  }

  // 0. Shared Governance Policy Engine Gates (063F Fail-Closed)
  try {
    validateAntiSynthetic(data, { verifyDiskArtifacts: false });
    extractAndValidateCandidateClaims(data, options);
  } catch (govErr) {
    let errorCode = 'ERR_GOVERNANCE_SYNTHETIC_REJECTED';
    if (govErr.code === 'ERR_GOVERNANCE_CLAIM_SOURCE_MISSING' || govErr.message.includes('CLAIM_SOURCE_ARTIFACT_MISSING')) {
      errorCode = 'ERR_GOVERNANCE_CLAIM_SOURCE_MISSING';
    } else if (govErr.message.includes('CLAIM_NOT_BOUND')) {
      errorCode = 'ERR_GOVERNANCE_CLAIM_UNBOUNDED';
    }
    return {
      success: false,
      error_code: errorCode,
      message: govErr.message,
      ingested_deals: 0,
      pre_feed_hash: preFeedHash,
      post_feed_hash: getSha256(targetFeedPath)
    };
  }

  // 1. Evidence Temporal Validity Check (Gate G2)
  const candidateEvidence = data.evidence || {};
  for (const [evidId, evid] of Object.entries(candidateEvidence)) {
    if (evid.temporal_validity === 'UNCONFIRMED_AT_CAPTURE_TIME') {
      return {
        success: false,
        error_code: 'ERR_UNCONFIRMED_TEMPORAL_VALIDITY',
        message: `REJECTED_UNCONFIRMED_TEMPORAL_VALIDITY: Evidence '${evidId}' has temporal_validity 'UNCONFIRMED_AT_CAPTURE_TIME'. Missing verified expiry on promotion page (Fail-Closed).`,
        ingested_deals: 0,
        pre_feed_hash: preFeedHash,
        post_feed_hash: getSha256(targetFeedPath),
        pre_evidence_hash: preEvidenceHash,
        post_evidence_hash: getSha256(targetEvidencePath)
      };
    }
    if (evid.expiry_basis === 'NOT_OBSERVED_ON_CAPTURED_PROMOTION_PAGE') {
      return {
        success: false,
        error_code: 'ERR_EXPIRY_NOT_OBSERVED',
        message: `REJECTED_EXPIRY_NOT_OBSERVED: Evidence '${evidId}' has expiry_basis 'NOT_OBSERVED_ON_CAPTURED_PROMOTION_PAGE'. Cannot ingest deal without confirmed expiry (Fail-Closed).`,
        ingested_deals: 0,
        pre_feed_hash: preFeedHash,
        post_feed_hash: getSha256(targetFeedPath),
        pre_evidence_hash: preEvidenceHash,
        post_evidence_hash: getSha256(targetEvidencePath)
      };
    }
  }

  // 2. Mandatory CEO Approval Manifest Gate (Neither PASS nor READY_FOR_REVIEW may auto-import)
  const approvalManifest = options.approvalManifest || (options.approvalManifestPath && fs.existsSync(options.approvalManifestPath) ? JSON.parse(fs.readFileSync(options.approvalManifestPath, 'utf8')) : null);
  const approvalCheck = validateCeoApprovalManifest(approvalManifest, data, candidatePath);
  if (!approvalCheck.valid) {
    return {
      success: false,
      error_code: approvalCheck.error_code,
      message: approvalCheck.message,
      ingested_deals: 0,
      pre_feed_hash: preFeedHash,
      post_feed_hash: getSha256(targetFeedPath),
      pre_evidence_hash: preEvidenceHash,
      post_evidence_hash: getSha256(targetEvidencePath)
    };
  }

  // 3. Validate Candidate Structural Schema & Verifiability
  const valRes = validateCandidate(data);
  if (!valRes.valid) {
    return {
      success: false,
      error_code: 'ERR_VALIDATION_FAILED',
      message: `INGESTION_BLOCKED: Candidate validation failed: ${valRes.errors.join('; ')}`,
      ingested_deals: 0,
      pre_feed_hash: preFeedHash,
      post_feed_hash: getSha256(targetFeedPath),
      pre_evidence_hash: preEvidenceHash,
      post_evidence_hash: getSha256(targetEvidencePath)
    };
  }

  // 4. TRUE 2-FILE ATOMIC COMMIT WITH DUAL-BACKUP ROLLBACK JOURNAL
  const timestamp = Date.now();
  const stageFeedPath = `${targetFeedPath}.stage.${timestamp}`;
  const stageEvidencePath = `${targetEvidencePath}.stage.${timestamp}`;
  const backupFeedPath = `${targetFeedPath}.bak.${timestamp}`;
  const backupEvidencePath = `${targetEvidencePath}.bak.${timestamp}`;

  let feedSwapped = false;
  let evidenceSwapped = false;

  try {
    const targetFeed = JSON.parse(fs.readFileSync(targetFeedPath, 'utf8'));
    const targetEvidence = JSON.parse(fs.readFileSync(targetEvidencePath, 'utf8'));

    const candidateDeals = data.deals || [data];
    const newFeed = [...targetFeed, ...candidateDeals];
    const newEvidence = { ...targetEvidence, ...candidateEvidence };

    // Phase 1: Write Staged Copies
    fs.writeFileSync(stageFeedPath, JSON.stringify(newFeed, null, 2), 'utf8');

    if (options.simulate_evidence_write_failure) {
      throw new Error('SIMULATED_FAULT: Evidence store write crash during Phase 1');
    }

    fs.writeFileSync(stageEvidencePath, JSON.stringify(newEvidence, null, 2), 'utf8');

    // Phase 2: Create Preserved Backups before touching target files
    fs.copyFileSync(targetFeedPath, backupFeedPath);
    fs.copyFileSync(targetEvidencePath, backupEvidencePath);

    // Swap Feed First
    fs.copyFileSync(stageFeedPath, targetFeedPath);
    feedSwapped = true;

    // Simulate Fault-Injection AFTER Feed is Swapped, but BEFORE Evidence is Swapped
    if (options.simulate_post_feed_swap_failure) {
      throw new Error('SIMULATED_FAULT: Crash after feed swapped but before evidence swapped');
    }

    // Swap Evidence Second
    fs.copyFileSync(stageEvidencePath, targetEvidencePath);
    evidenceSwapped = true;

    // Both Swapped Successfully: Clean up stage and backup files
    try { fs.unlinkSync(stageFeedPath); } catch {}
    try { fs.unlinkSync(stageEvidencePath); } catch {}
    try { fs.unlinkSync(backupFeedPath); } catch {}
    try { fs.unlinkSync(backupEvidencePath); } catch {}

    const postFeedHash = getSha256(targetFeedPath);
    const postEvidenceHash = getSha256(targetEvidencePath);

    return {
      success: true,
      message: `SUCCESSFULLY_INGESTED: Ingested ${candidateDeals.length} deal(s) from '${candidatePath}'.`,
      ingested_deals: candidateDeals.length,
      pre_feed_hash: preFeedHash,
      post_feed_hash: postFeedHash,
      pre_evidence_hash: preEvidenceHash,
      post_evidence_hash: postEvidenceHash
    };

  } catch (err) {
    // ATOMIC ROLLBACK / RECOVERY:
    // If feed was swapped, restore it from backup!
    if (feedSwapped && fs.existsSync(backupFeedPath)) {
      try { fs.copyFileSync(backupFeedPath, targetFeedPath); } catch {}
    }
    if (evidenceSwapped && fs.existsSync(backupEvidencePath)) {
      try { fs.copyFileSync(backupEvidencePath, targetEvidencePath); } catch {}
    }

    // Clean up all temporary files
    try { if (fs.existsSync(stageFeedPath)) fs.unlinkSync(stageFeedPath); } catch {}
    try { if (fs.existsSync(stageEvidencePath)) fs.unlinkSync(stageEvidencePath); } catch {}
    try { if (fs.existsSync(backupFeedPath)) fs.unlinkSync(backupFeedPath); } catch {}
    try { if (fs.existsSync(backupEvidencePath)) fs.unlinkSync(backupEvidencePath); } catch {}

    return {
      success: false,
      error_code: 'ERR_INGESTION_ROLLBACK',
      message: `INGESTION_ABORTED_AND_ROLLED_BACK: ${err.message}`,
      ingested_deals: 0,
      pre_feed_hash: preFeedHash,
      post_feed_hash: getSha256(targetFeedPath),
      pre_evidence_hash: preEvidenceHash,
      post_evidence_hash: getSha256(targetEvidencePath)
    };
  }
}

/**
 * Strict Fail-Closed Candidate Claims Extractor and Validator across Candidate & Deals Bundle (063F)
 */
function extractAndValidateCandidateClaims(candidateOrDeal, options = {}) {
  if (!candidateOrDeal || typeof candidateOrDeal !== 'object') {
    return { valid: true };
  }

  // Check text artifact existence
  let sourceText = options.sourceArtifactText || '';
  const textRel = candidateOrDeal.provenance?.artifacts?.text?.file;

  if (!sourceText) {
    if (!textRel) {
      const err = new Error(`CLAIM_SOURCE_ARTIFACT_MISSING: Missing provenance.artifacts.text.file in candidate/deal '${candidateOrDeal.candidate_id || candidateOrDeal.deal_id || 'UNKNOWN'}'.`);
      err.code = 'ERR_GOVERNANCE_CLAIM_SOURCE_MISSING';
      throw err;
    }
    const textAbs = path.resolve(repoRoot, textRel);
    if (!fs.existsSync(textAbs)) {
      const err = new Error(`CLAIM_SOURCE_ARTIFACT_MISSING: Source artifact text file not found on disk: '${textRel}'.`);
      err.code = 'ERR_GOVERNANCE_CLAIM_SOURCE_MISSING';
      throw err;
    }
    sourceText = fs.readFileSync(textAbs, 'utf8');
  }

  if (!sourceText || typeof sourceText !== 'string' || sourceText.trim().length === 0) {
    const err = new Error(`CLAIM_SOURCE_ARTIFACT_MISSING: Source artifact text is empty or unreadable for candidate/deal '${candidateOrDeal.candidate_id || candidateOrDeal.deal_id || 'UNKNOWN'}'.`);
    err.code = 'ERR_GOVERNANCE_CLAIM_SOURCE_MISSING';
    throw err;
  }

  // Extract all claims from candidate level
  const claims = [
    candidateOrDeal.title,
    candidateOrDeal.schedule,
    candidateOrDeal.eligibility,
    ...(candidateOrDeal.conditions || []),
    ...(candidateOrDeal.pricing_tiers || []).map(p => p.price_display),
    ...(candidateOrDeal.pricing_tiers || []).map(p => p.cinema_name)
  ].filter(c => typeof c === 'string' && c.trim().length > 0);

  // Validate each claim
  for (const claim of claims) {
    validateClaimBoundedToArtifact(claim, sourceText);
  }

  // If candidate contains a bundle of deals: candidateOrDeal.deals
  if (Array.isArray(candidateOrDeal.deals)) {
    for (const deal of candidateOrDeal.deals) {
      extractAndValidateCandidateClaims(deal, { ...options, sourceArtifactText: sourceText });
    }
  }

  return { valid: true };
}

/**
 * Production Candidate Writer with Append-Only, Anti-Synthetic, and Claim-Bound Verification (063F)
 */
function writeCandidateFile(candidateData, targetCandidatePath, options = {}) {
  if (!candidateData || typeof candidateData !== 'object') {
    throw new Error('CANDIDATE_DATA_INVALID: Candidate data object is required.');
  }

  // 1. Append-Only collision guard before write
  if (options.enforceAppendOnly !== false) {
    validateAppendOnlyRunIsolation(targetCandidatePath, 'Candidate file');
  }

  // 2. Anti-Synthetic Data Validation
  validateAntiSynthetic(candidateData, options);

  // 3. Claim-Bound Validation across candidate and all bundle deals (fail-closed if missing artifact)
  extractAndValidateCandidateClaims(candidateData, options);

  // 4. Atomic Write
  const candidateDir = path.dirname(targetCandidatePath);
  if (!fs.existsSync(candidateDir)) {
    fs.mkdirSync(candidateDir, { recursive: true });
  }

  fs.writeFileSync(targetCandidatePath, JSON.stringify(candidateData, null, 2), 'utf8');
  return { success: true, path: targetCandidatePath };
}

module.exports = {
  ingestCandidateFile,
  validateCeoApprovalManifest,
  writeCandidateFile,
  extractAndValidateCandidateClaims
};

if (require.main === module) {
  const args = process.argv.slice(2);
  let candidateFile = null;
  let targetFeed = DEALS_FEED_PATH;
  let targetEvidence = EVIDENCE_STORE_PATH;
  let approvalPath = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--candidate' && args[i + 1]) candidateFile = args[i + 1];
    if (args[i] === '--target-feed' && args[i + 1]) targetFeed = args[i + 1];
    if (args[i] === '--target-evidence' && args[i + 1]) targetEvidence = args[i + 1];
    if (args[i] === '--approval-manifest' && args[i + 1]) approvalPath = args[i + 1];
  }

  if (!candidateFile) {
    console.error("Usage: node ingest_candidate_to_catalog.js --candidate <path_to_candidate.json> [--approval-manifest <path>] [--target-feed <path>] [--target-evidence <path>]");
    process.exit(1);
  }

  const res = ingestCandidateFile(candidateFile, targetFeed, targetEvidence, { approvalManifestPath: approvalPath });
  console.log(JSON.stringify(res, null, 2));

  if (!res.success) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}
