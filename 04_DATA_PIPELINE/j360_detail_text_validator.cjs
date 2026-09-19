'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function sha256(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

const ROOT = path.resolve(__dirname, '..');
const CANONICAL_REGISTRY_PATH = path.join(
  ROOT,
  '06_TRUST_AND_EVIDENCE',
  'batch_19_j360_detail_leaf_vault',
  'SEALED_DETAIL_TEXT_REGISTRY.json'
);
const EXPECTED_REGISTRY_SHA = 'a29d71027408cc8ea5b61dce591a62263679a9832a7078f0c141dc446f2491a1';

let _cachedCanonicalRegistry = null;

function loadCanonicalAnchoredRegistry() {
  if (_cachedCanonicalRegistry) {
    return _cachedCanonicalRegistry;
  }

  if (!fs.existsSync(CANONICAL_REGISTRY_PATH)) {
    throw new Error('Canonical sealed detail-text registry file not found: ' + CANONICAL_REGISTRY_PATH);
  }

  const realPath = fs.realpathSync(CANONICAL_REGISTRY_PATH);
  const expectedRealPath = fs.realpathSync(path.resolve(CANONICAL_REGISTRY_PATH));
  if (realPath !== expectedRealPath) {
    throw new Error('Canonical registry realpath mismatch! Symlink or junction attack detected.');
  }

  const buf = fs.readFileSync(CANONICAL_REGISTRY_PATH);
  const digest = sha256(buf);
  if (digest !== EXPECTED_REGISTRY_SHA) {
    throw new Error(`Canonical registry hash mismatch! Expected ${EXPECTED_REGISTRY_SHA}, got ${digest}`);
  }

  const parsed = JSON.parse(buf.toString('utf8'));
  _cachedCanonicalRegistry = {
    path: CANONICAL_REGISTRY_PATH,
    realpath: realPath,
    sha256: digest,
    data: parsed
  };

  return _cachedCanonicalRegistry;
}

function parseHTMLToDOM(htmlString) {
  const clean = htmlString
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

  return {
    raw: htmlString,
    cleanText: clean.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  };
}

function evaluateCandidate(candidate, rawBuf, metaObj, options = {}) {
  // Requirement 19: Reject any caller-supplied registry override
  if (
    options.customRegistryPath !== undefined ||
    options.registryPath !== undefined ||
    options.registry !== undefined ||
    options.customRegistry !== undefined ||
    options.customTrustRoot !== undefined ||
    options.validMetadataHashes !== undefined
  ) {
    return {
      candidate_id: candidate.b19_id || candidate.offer_id,
      status: 'HELD',
      held_reason: 'HELD__CALLER_REGISTRY_OVERRIDE_FORBIDDEN: Caller-supplied registry or override is strictly forbidden',
      preconditions_passed: false,
      missing_dimensions: ['canonical_trust_registry_anchor']
    };
  }

  const canonicalAnchor = loadCanonicalAnchoredRegistry();
  const registry = canonicalAnchor.data;

  // Verify Leaf in Registry
  const leafId = candidate.leaf_id;
  if (!leafId || !registry.leaves || !registry.leaves[leafId]) {
    return {
      candidate_id: candidate.b19_id || candidate.offer_id,
      status: 'HELD',
      held_reason: `HELD__LEAF_NOT_IN_SEALED_REGISTRY: Leaf "${leafId}" is not registered`,
      preconditions_passed: false,
      missing_dimensions: ['registered_leaf']
    };
  }

  const regLeaf = registry.leaves[leafId];

  // Preconditions Check
  if (!rawBuf || !Buffer.isBuffer(rawBuf)) {
    return {
      candidate_id: candidate.b19_id || candidate.offer_id,
      status: 'HELD',
      held_reason: 'HELD__INVALID_RAW_BUFFER: Raw HTML buffer missing or invalid',
      preconditions_passed: false,
      missing_dimensions: ['raw_buffer']
    };
  }

  const rawSha = sha256(rawBuf);
  if (rawSha !== regLeaf.raw_sha256) {
    return {
      candidate_id: candidate.b19_id || candidate.offer_id,
      status: 'HELD',
      held_reason: `HELD__REGISTRY_SOURCE_SHA_MISMATCH: Computed ${rawSha}, registered ${regLeaf.raw_sha256}`,
      preconditions_passed: false,
      missing_dimensions: ['source_integrity']
    };
  }

  if (metaObj.http_status !== 200 || metaObj.is_fetch_failed === true || metaObj.is_soft_404 === true) {
    return {
      candidate_id: candidate.b19_id || candidate.offer_id,
      status: 'HELD',
      held_reason: 'HELD__PRECONDITION_FAILED: HTTP status non-200 or soft-404/fetch failure detected',
      preconditions_passed: false,
      missing_dimensions: ['http_success']
    };
  }

  // Check Discovery Leaves
  if (regLeaf.discovery && regLeaf.discovery.status === 'DISCOVERY_PENDING') {
    return {
      candidate_id: candidate.b19_id || candidate.offer_id || regLeaf.discovery.discovery_id,
      status: 'DISCOVERY_PENDING',
      held_reason: 'DISCOVERY_PENDING: Placeholder discovery lineage. Does not count toward target.',
      preconditions_passed: true,
      missing_dimensions: ['detail_offer_identification']
    };
  }

  // Look up Candidate in Leaf Manifest
  const candidateId = candidate.b19_id || candidate.offer_id;
  const manifestCandidate = regLeaf.detail_text_manifest && regLeaf.detail_text_manifest[candidateId];

  if (!manifestCandidate) {
    return {
      candidate_id: candidateId,
      status: 'HELD',
      held_reason: `HELD__CANDIDATE_NOT_IN_DETAIL_MANIFEST: Candidate "${candidateId}" not found in leaf manifest`,
      preconditions_passed: true,
      missing_dimensions: ['candidate_manifest_registration']
    };
  }

  const verifiedClaims = {};
  const missingDimensions = [];

  // Verify Claims by exact quoted span and byte offsets
  const claims = manifestCandidate.claims || {};

  // 1. Title Claim
  if (claims.title && claims.title.quoted_span) {
    const span = claims.title.quoted_span;
    const [start, end] = claims.title.byte_range || [];
    if (start !== undefined && end !== undefined && end > start && end <= rawBuf.length) {
      const slice = rawBuf.slice(start, end).toString('utf8');
      if (slice === span) {
        verifiedClaims.title = { verified: true, quoted_span: span, byte_range: [start, end] };
      } else {
        missingDimensions.push('title_byte_mismatch');
      }
    } else {
      missingDimensions.push('title_invalid_range');
    }
  } else {
    missingDimensions.push('title');
  }

  // 2. Price Claim
  if (claims.price && claims.price.quoted_span) {
    const span = claims.price.quoted_span;
    const [start, end] = claims.price.byte_range || [];
    if (start !== undefined && end !== undefined && end > start && end <= rawBuf.length) {
      const slice = rawBuf.slice(start, end).toString('utf8');
      if (slice === span) {
        verifiedClaims.price = { verified: true, quoted_span: span, byte_range: [start, end], amount: claims.price.amount };
      } else {
        missingDimensions.push('price_byte_mismatch');
      }
    } else {
      missingDimensions.push('price_invalid_range');
    }
  } else {
    missingDimensions.push('explicit_price');
  }

  // 3. Da Nang Locality
  if (claims.da_nang_locality && claims.da_nang_locality.quoted_span) {
    const span = claims.da_nang_locality.quoted_span;
    const [start, end] = claims.da_nang_locality.byte_range || [];
    if (start !== undefined && end !== undefined && end > start && end <= rawBuf.length) {
      const slice = rawBuf.slice(start, end).toString('utf8');
      if (slice === span) {
        verifiedClaims.da_nang_locality = { verified: true, quoted_span: span, byte_range: [start, end] };
      } else {
        missingDimensions.push('da_nang_locality_mismatch');
      }
    } else {
      missingDimensions.push('da_nang_locality_invalid_range');
    }
  } else {
    missingDimensions.push('explicit_da_nang_locality');
  }

  // 4. Validity or Recurrence
  if (claims.validity_or_recurrence && claims.validity_or_recurrence.quoted_span) {
    const span = claims.validity_or_recurrence.quoted_span;
    const [start, end] = claims.validity_or_recurrence.byte_range || [];
    if (start !== undefined && end !== undefined && end > start && end <= rawBuf.length) {
      const slice = rawBuf.slice(start, end).toString('utf8');
      if (slice === span) {
        verifiedClaims.validity_or_recurrence = { verified: true, quoted_span: span, byte_range: [start, end] };
      } else {
        missingDimensions.push('validity_byte_mismatch');
      }
    } else {
      missingDimensions.push('validity_invalid_range');
    }
  } else {
    missingDimensions.push('current_validity_or_recurrence');
  }

  // Final Evaluation Verdict under Candid Shortfall Policy
  const isAllDimensionsPresent = missingDimensions.length === 0;

  return {
    candidate_id: candidateId,
    brand: manifestCandidate.brand,
    leaf_id: leafId,
    status: isAllDimensionsPresent ? 'VERIFIED' : 'HELD',
    held_reason: isAllDimensionsPresent
      ? null
      : `HELD__INSUFFICIENT_DETAIL_TEXT_CLAIMS: Missing [${missingDimensions.join(', ')}]`,
    preconditions_passed: true,
    verified_claims: verifiedClaims,
    missing_dimensions: missingDimensions,
    shortfall_notes: manifestCandidate.shortfall_notes || null
  };
}

module.exports = {
  CANONICAL_REGISTRY_PATH,
  EXPECTED_REGISTRY_SHA,
  loadCanonicalAnchoredRegistry,
  evaluateCandidate,
  parseHTMLToDOM
};
