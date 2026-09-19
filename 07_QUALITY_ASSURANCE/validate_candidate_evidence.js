/**
 * validate_candidate_evidence.js
 * Comprehensive Candidate Evidence & Provenance Validator.
 * Directives: JAYT-EVIDENCE-PROVENANCE-040B, 040A, 036E, 028B.
 * Enforces:
 * 1. Full PNG parser (magic bytes, all chunks, CRC32 over type+data, IHDR, IEND, zlib IDAT inflate).
 * 2. Raw HTML & text dump technical thresholds.
 * 3. Verified capture_receipt.json for REAL_CAPTURE_PROVEN / READY_FOR_CEO_REVIEW.
 * 4. Text/raw snippet cross-checking against observed text dump.
 * 5. Strict distinction between structurally_valid and evidence_status.
 * 6. Zone evidence contract & domain allowlist.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const zlib = require('zlib');

const repoRoot = path.resolve(__dirname, '..');

// CRC32 Lookup Table
const crcTable = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[i] = c;
}

function calcCrc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

/**
 * Full PNG Verification:
 * Validates 8-byte signature, iterates all chunks, verifies chunk length & CRC32,
 * enforces IHDR dimensions >= 100x100, validates IDAT zlib stream inflation, and verifies IEND.
 */
function parseAndVerifyPng(buffer) {
  if (!buffer || buffer.length < 8) {
    return { ok: false, message: 'File too small for PNG header (< 8 bytes).' };
  }
  const magic = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  for (let i = 0; i < 8; i++) {
    if (buffer[i] !== magic[i]) {
      return { ok: false, message: 'Invalid PNG magic signature bytes.' };
    }
  }
  let offset = 8;
  let hasIhdr = false;
  let hasIend = false;
  let width = 0, height = 0, bitDepth = 0, colorType = 0;
  const idatChunks = [];
  let chunkCount = 0;

  while (offset < buffer.length) {
    if (offset + 8 > buffer.length) {
      return { ok: false, message: 'Truncated PNG chunk header.' };
    }
    const length = buffer.readUInt32BE(offset);
    const typeBuf = buffer.slice(offset + 4, offset + 8);
    const typeStr = typeBuf.toString('ascii');
    offset += 8;

    if (offset + length + 4 > buffer.length) {
      return { ok: false, message: `Truncated PNG chunk data for ${typeStr}.` };
    }
    const dataBuf = buffer.slice(offset, offset + length);
    const crcVal = buffer.readUInt32BE(offset + length);
    offset += length + 4;

    // Verify CRC32 over chunk type + chunk data
    const chunkHeaderAndData = Buffer.concat([typeBuf, dataBuf]);
    const computedCrc = calcCrc32(chunkHeaderAndData);
    if (computedCrc !== crcVal) {
      return { ok: false, message: `CRC32 mismatch for chunk ${typeStr}: expected ${crcVal}, computed ${computedCrc}.` };
    }

    if (chunkCount === 0) {
      if (typeStr !== 'IHDR') return { ok: false, message: 'First chunk must be IHDR.' };
      if (length !== 13) return { ok: false, message: 'IHDR chunk length must be 13.' };
      width = dataBuf.readUInt32BE(0);
      height = dataBuf.readUInt32BE(4);
      bitDepth = dataBuf[8];
      colorType = dataBuf[9];
      if (width < 100 || height < 100) {
        return { ok: false, message: `Image dimensions too small: ${width}x${height}; screenshot must be at least 100x100.` };
      }
      hasIhdr = true;
    }

    if (typeStr === 'IDAT') {
      idatChunks.push(dataBuf);
    }
    if (typeStr === 'IEND') {
      hasIend = true;
      if (length !== 0) return { ok: false, message: 'IEND chunk length must be 0.' };
    }
    chunkCount++;
  }

  if (!hasIhdr) return { ok: false, message: 'Missing IHDR chunk.' };
  if (!hasIend) return { ok: false, message: 'Missing IEND chunk.' };
  if (idatChunks.length === 0) return { ok: false, message: 'Missing IDAT image data chunks.' };

  // Decompress zlib payload to prove actual image decode capability
  try {
    const fullIdat = Buffer.concat(idatChunks);
    const decompressed = zlib.inflateSync(fullIdat);
    if (decompressed.length === 0) return { ok: false, message: 'Decompressed image data is empty.' };
  } catch (e) {
    return { ok: false, message: `Failed to inflate IDAT zlib stream (corrupted image payload): ${e.message}` };
  }

  return { ok: true, width, height, bitDepth, colorType, chunks: chunkCount, size: buffer.length };
}

function validateHtmlTechnicalThreshold(htmlContent) {
  if (typeof htmlContent !== 'string' || htmlContent.length < 500) {
    return { ok: false, message: `Raw HTML content (${typeof htmlContent === 'string' ? htmlContent.length : 0} bytes) is below minimum threshold (500 bytes). Synthetic HTML stubs rejected.` };
  }
  const hasHtmlTag = /<html[^>]*>/i.test(htmlContent) || /<body[^>]*>/i.test(htmlContent);
  if (!hasHtmlTag) {
    return { ok: false, message: "Raw HTML content lacks standard HTML container tags." };
  }
  return { ok: true, size: htmlContent.length };
}

function loadDomainCatalog() {
  const catalogPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'domain_catalog.json');
  if (!fs.existsSync(catalogPath)) {
    throw new Error(`domain_catalog.json not found at ${catalogPath}`);
  }
  return JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
}

function loadZoneCatalog() {
  const catalogPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'zone_catalog.json');
  if (!fs.existsSync(catalogPath)) {
    throw new Error(`zone_catalog.json not found at ${catalogPath}`);
  }
  return JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
}

function validateDomainPolicy(urlStr, domainCatalog) {
  if (!urlStr) return { ok: false, message: "Missing URL." };
  let parsed;
  try {
    parsed = new URL(urlStr);
  } catch (e) {
    return { ok: false, message: `Invalid URL format: ${urlStr}` };
  }

  const catalog = domainCatalog || loadDomainCatalog();
  const hostname = parsed.hostname.toLowerCase();
  const protocol = parsed.protocol.replace(':', '').toLowerCase();

  const matched = catalog.find(item => {
    const itemDomain = item.domain.toLowerCase();
    if (item.allow_subdomains) {
      return hostname === itemDomain || hostname.endsWith('.' + itemDomain);
    } else {
      return hostname === itemDomain;
    }
  });

  if (!matched) {
    return {
      ok: false,
      message: `Domain '${hostname}' is NOT permitted in domain_catalog.json (exact match required; subdomains require allow_subdomains=true) (Fail-Closed).`
    };
  }

  if (matched.emergency_kill_switch_active) {
    return {
      ok: false,
      message: `Domain '${matched.domain}' is disabled via EMERGENCY_KILL_SWITCH (Fail-Closed).`
    };
  }

  if (!matched.is_enabled || matched.status !== 'ACTIVE') {
    return {
      ok: false,
      message: `Domain '${matched.domain}' is inactive or disabled (Fail-Closed).`
    };
  }

  if (matched.approved_protocols && !matched.approved_protocols.includes(protocol)) {
    return {
      ok: false,
      message: `Protocol '${protocol}' is not approved for domain '${matched.domain}' (Fail-Closed).`
    };
  }

  return { ok: true, matched_domain: matched.domain };
}

function isDomainApproved(urlStr, domainCatalog) {
  const res = validateDomainPolicy(urlStr, domainCatalog);
  return res.ok;
}

function resolveAndVerifyPath(providedPath, allowedBaseDir) {
  if (!providedPath) return null;
  const resolvedPath = path.resolve(allowedBaseDir, providedPath);
  const base = path.resolve(allowedBaseDir);
  const rel = path.relative(base, resolvedPath);
  if (rel.startsWith('..') || path.isAbsolute(rel)) {
    return null;
  }
  return resolvedPath;
}

function getFileSha256(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
}

/**
 * Enhanced Zone Policy Validator (036E)
 */
function validateZonePolicy(zoneId, candidateAddress, options = {}) {
  if (!zoneId) return { ok: true };
  const zones = options.zoneCatalog || (Array.isArray(options) ? options : loadZoneCatalog());
  const domainCatalog = options.domainCatalog || loadDomainCatalog();
  const snapshotsDir = options.snapshotsDir || path.resolve(repoRoot, '05_DEAL_AND_AFFILIATE', 'candidates', 'evidence_snapshots');

  const matched = zones.find(z => z.zone_id === zoneId);
  if (!matched) {
    return { ok: false, message: `Zone '${zoneId}' is NOT registered in zone_catalog.json (Fail-Closed).` };
  }

  const isEvidenced = matched.status === 'LOCATION_EVIDENCED' || !!matched.location_evidence_ref || !!matched.source_url;

  if (isEvidenced) {
    if (!matched.source_url) {
      return { ok: false, message: `Zone '${zoneId}' is LOCATION_EVIDENCED but lacks 'source_url' (Fail-Closed).` };
    }
    const domRes = validateDomainPolicy(matched.source_url, domainCatalog);
    if (!domRes.ok) {
      return { ok: false, message: `Zone '${zoneId}' source_url '${matched.source_url}' is not permitted: ${domRes.message}` };
    }

    if (!matched.location_evidence_ref) {
      return { ok: false, message: `Zone '${zoneId}' is LOCATION_EVIDENCED but lacks 'location_evidence_ref' (Fail-Closed).` };
    }
    const safeRef = resolveAndVerifyPath(matched.location_evidence_ref, snapshotsDir);
    if (!safeRef) {
      return { ok: false, message: `Zone '${zoneId}' location_evidence_ref '${matched.location_evidence_ref}' is invalid or contains path traversal (Fail-Closed).` };
    }
    if (!fs.existsSync(safeRef)) {
      return { ok: false, message: `Zone '${zoneId}' location evidence artifact file does not exist on disk: '${safeRef}'.` };
    }

    if (!matched.location_artifact_hash) {
      return { ok: false, message: `Zone '${zoneId}' is LOCATION_EVIDENCED but lacks 'location_artifact_hash' (Fail-Closed).` };
    }
    if (!/^[a-f0-9]{64}$/.test(matched.location_artifact_hash)) {
      return { ok: false, message: `Zone '${zoneId}' location_artifact_hash must be a 64-character lowercase SHA-256 hex string.` };
    }

    const actualHash = getFileSha256(safeRef);
    if (actualHash !== matched.location_artifact_hash) {
      return {
        ok: false,
        message: `Zone '${zoneId}' location artifact SHA-256 mismatch: catalog '${matched.location_artifact_hash}' vs disk '${actualHash}'.`
      };
    }
  }

  if (candidateAddress && matched.district) {
    const normAddr = candidateAddress.toLowerCase();
    const normDist = matched.district.toLowerCase();

    if (normDist.includes('thanh khê') && (normAddr.includes('hải châu') && !normAddr.includes('thanh khê'))) {
      return { ok: false, message: `District contradiction: candidate address specifies 'Hải Châu' but zone '${zoneId}' district is '${matched.district}'.` };
    }
    if (normDist.includes('hải châu') && (normAddr.includes('thanh khê') && !normAddr.includes('hải châu'))) {
      return { ok: false, message: `District contradiction: candidate address specifies 'Thanh Khê' but zone '${zoneId}' district is '${matched.district}'.` };
    }
  }

  return { ok: true, matched_zone: matched };
}

/**
 * Validate a candidate object against full schema, provenance and technical rules.
 */
function validateCandidate(candidateData, options = {}) {
  const errors = [];
  const domainCatalog = options.domainCatalog || loadDomainCatalog();
  const zoneCatalog = options.zoneCatalog || loadZoneCatalog();
  const snapshotsDir = options.snapshotsDir || path.resolve(repoRoot, '05_DEAL_AND_AFFILIATE', 'candidates', 'evidence_snapshots');

  const evidenceMap = candidateData.evidence || {};
  const evidenceKeys = Object.keys(evidenceMap);
  const evidenceData = evidenceKeys.length > 0 ? evidenceMap[evidenceKeys[0]] : candidateData;

  const readiness = evidenceData.verification_readiness || evidenceData.verification_status;
  const explicitEvidenceStatus = evidenceData.evidence_status || (
    readiness === 'REJECTED_SYNTHETIC_ARTIFACT' ? 'REJECTED_SYNTHETIC_ARTIFACT' :
    readiness === 'READY_FOR_CEO_REVIEW' || readiness === 'PASS' ? 'REAL_CAPTURE_PROVEN' :
    'NEEDS_RECHECK'
  );

  // 1. Mandatory Schema Fields
  const requiredEvidenceFields = [
    'deal_id',
    'source_url',
    'captured_at',
    'temporal_validity'
  ];

  for (const field of requiredEvidenceFields) {
    if (!evidenceData[field]) {
      errors.push(`Missing mandatory field: ${field}`);
    }
  }

  // 2. Domain Allowlist Verification
  const domRes1 = validateDomainPolicy(evidenceData.source_url, domainCatalog);
  if (!domRes1.ok) {
    errors.push(`source_url domain is not approved in domain_catalog.json: ${evidenceData.source_url} (${domRes1.message})`);
  }
  if (evidenceData.artifact_source_url) {
    const domRes2 = validateDomainPolicy(evidenceData.artifact_source_url, domainCatalog);
    if (!domRes2.ok) {
      errors.push(`artifact_source_url domain is not approved in domain_catalog.json: ${evidenceData.artifact_source_url} (${domRes2.message})`);
    }
  }
  if (evidenceData.location_provenance_url) {
    const domRes3 = validateDomainPolicy(evidenceData.location_provenance_url, domainCatalog);
    if (!domRes3.ok) {
      errors.push(`location_provenance_url domain is not approved in domain_catalog.json: ${evidenceData.location_provenance_url} (${domRes3.message})`);
    }
  }

  // 3. Artifact Disk & Hash Integrity & Full PNG/HTML Parsing
  const shotPath = evidenceData.artifact_screenshot || evidenceData.capture_file;
  if (shotPath) {
    const screenshotPath = resolveAndVerifyPath(shotPath, snapshotsDir);
    if (!screenshotPath) {
      errors.push(`Invalid screenshot artifact path (possible path traversal): ${shotPath}`);
    } else if (!fs.existsSync(screenshotPath)) {
      errors.push(`Screenshot artifact file does not exist: ${screenshotPath}`);
    } else {
      if (evidenceData.artifact_screenshot_hash || evidenceData.evidence_content_hash) {
        const actualShotHash = getFileSha256(screenshotPath);
        const expectedHash = evidenceData.artifact_screenshot_hash || evidenceData.evidence_content_hash;
        if (actualShotHash !== expectedHash) {
          errors.push(`Screenshot hash mismatch: expected ${expectedHash}, got ${actualShotHash}`);
        }
      }
      if (readiness !== 'REJECTED_SYNTHETIC_ARTIFACT') {
        const pngBuf = fs.readFileSync(screenshotPath);
        const pngRes = parseAndVerifyPng(pngBuf);
        if (!pngRes.ok) {
          errors.push(`SYNTHETIC_OR_INVALID_SCREENSHOT_ARTIFACT: ${pngRes.message}`);
        }
      }
    }
  }

  const htmlPath = evidenceData.artifact_html_dump || evidenceData.raw_html_artifact;
  if (htmlPath) {
    const rawHtmlPath = resolveAndVerifyPath(htmlPath, snapshotsDir);
    if (!rawHtmlPath) {
      errors.push(`Invalid HTML dump artifact path: ${htmlPath}`);
    } else if (!fs.existsSync(rawHtmlPath)) {
      errors.push(`HTML dump artifact file does not exist: ${rawHtmlPath}`);
    } else {
      if (evidenceData.artifact_html_hash || evidenceData.raw_html_hash) {
        const actualHtmlHash = getFileSha256(rawHtmlPath);
        const expectedHtmlHash = evidenceData.artifact_html_hash || evidenceData.raw_html_hash;
        if (actualHtmlHash !== expectedHtmlHash) {
          errors.push(`HTML hash mismatch: expected ${expectedHtmlHash}, got ${actualHtmlHash}`);
        }
      }
      if (readiness !== 'REJECTED_SYNTHETIC_ARTIFACT') {
        const htmlContent = fs.readFileSync(rawHtmlPath, 'utf8');
        const htmlRes = validateHtmlTechnicalThreshold(htmlContent);
        if (!htmlRes.ok) {
          errors.push(`SYNTHETIC_OR_INVALID_HTML_ARTIFACT: ${htmlRes.message}`);
        }
      }
    }
  }

  const textPath = evidenceData.artifact_text_dump;
  let textContent = '';
  if (textPath) {
    const textDumpPath = resolveAndVerifyPath(textPath, snapshotsDir);
    if (!textDumpPath) {
      errors.push(`Invalid text dump artifact path (possible path traversal): ${textPath}`);
    } else if (!fs.existsSync(textDumpPath)) {
      errors.push(`Text dump artifact file does not exist: ${textDumpPath}`);
    } else {
      if (evidenceData.artifact_text_hash) {
        const actualTextHash = getFileSha256(textDumpPath);
        if (actualTextHash !== evidenceData.artifact_text_hash) {
          errors.push(`Text dump hash mismatch: expected ${evidenceData.artifact_text_hash}, got ${actualTextHash}`);
        }
      }
      textContent = fs.readFileSync(textDumpPath, 'utf8');
    }
  }

  // Location provenance artifact verification
  if (evidenceData.location_provenance_artifact) {
    const locArtifactPath = resolveAndVerifyPath(evidenceData.location_provenance_artifact, snapshotsDir);
    if (!locArtifactPath) {
      errors.push(`Invalid location artifact path: ${evidenceData.location_provenance_artifact}`);
    } else if (!fs.existsSync(locArtifactPath)) {
      errors.push(`Location artifact file does not exist: ${locArtifactPath}`);
    } else if (evidenceData.location_provenance_hash) {
      const actualLocHash = getFileSha256(locArtifactPath);
      if (actualLocHash !== evidenceData.location_provenance_hash) {
        errors.push(`Location artifact hash mismatch: expected ${evidenceData.location_provenance_hash}, got ${actualLocHash}`);
      }
      if (readiness !== 'REJECTED_SYNTHETIC_ARTIFACT') {
        const locPngBuf = fs.readFileSync(locArtifactPath);
        const locPngRes = parseAndVerifyPng(locPngBuf);
        if (!locPngRes.ok) {
          errors.push(`SYNTHETIC_OR_INVALID_LOCATION_ARTIFACT: ${locPngRes.message}`);
        }
      }
    }
  }

  // 4. Zone Policy & District Contradiction Enforcement
  const candidateAddress = evidenceData.location_provenance_address || evidenceData.observed_conditions || '';
  if (candidateData.deals && Array.isArray(candidateData.deals)) {
    for (const d of candidateData.deals) {
      if (d.zone) {
        const zoneRes = validateZonePolicy(d.zone, candidateAddress, {
          zoneCatalog: zoneCatalog,
          domainCatalog: domainCatalog,
          snapshotsDir: snapshotsDir
        });
        if (!zoneRes.ok) {
          errors.push(zoneRes.message);
        }
      }
    }
  }

  // 5. Bidirectional Provenance & Capture Receipt Enforcement (041A)
  const isLocallyLinked = explicitEvidenceStatus === 'LOCALLY_CAPTURED_SOURCE_LINKED' || explicitEvidenceStatus === 'REAL_CAPTURE_PROVEN';
  if (isLocallyLinked || readiness === 'READY_FOR_CEO_REVIEW' || readiness === 'PASS' || evidenceData.capture_receipt_ref) {
    if (!evidenceData.capture_receipt_ref) {
      errors.push("LOCALLY_CAPTURED_SOURCE_LINKED requires non-empty capture_receipt_ref (Fail-Closed).");
    } else {
      const receiptPath = resolveAndVerifyPath(evidenceData.capture_receipt_ref, snapshotsDir);
      if (!receiptPath || !fs.existsSync(receiptPath)) {
        errors.push(`Capture receipt file does not exist on disk: ${evidenceData.capture_receipt_ref}`);
      } else {
        const actualReceiptHash = getFileSha256(receiptPath);
        if (evidenceData.capture_receipt_hash && actualReceiptHash !== evidenceData.capture_receipt_hash) {
          errors.push(`Capture receipt hash mismatch: expected ${evidenceData.capture_receipt_hash}, got ${actualReceiptHash}`);
        }
        try {
          const receiptObj = JSON.parse(fs.readFileSync(receiptPath, 'utf8'));
          const requiredReceiptFields = [
            'candidate_id',
            'evidence_id',
            'deal_id',
            'requested_url',
            'final_url',
            'captured_at',
            'runtime_run_id',
            'content_class'
          ];
          for (const rf of requiredReceiptFields) {
            if (!receiptObj[rf] || typeof receiptObj[rf] !== 'string' || receiptObj[rf].trim() === '') {
              errors.push(`Capture receipt is missing required execution metadata field: '${rf}'.`);
            }
          }

          // Bidirectional Linkage Checks
          const expectedCandId = candidateData.candidate_id || evidenceData.candidate_id || (evidenceKeys[0] ? evidenceKeys[0].replace(/^EVID_/, '') : null);
          if (expectedCandId && receiptObj.candidate_id !== expectedCandId) {
            errors.push(`RECEIPT_CANDIDATE_MISMATCH: Receipt candidate_id '${receiptObj.candidate_id}' does not match candidate '${expectedCandId}'.`);
          }
          if (evidenceKeys[0] && receiptObj.evidence_id !== evidenceKeys[0]) {
            errors.push(`RECEIPT_EVIDENCE_MISMATCH: Receipt evidence_id '${receiptObj.evidence_id}' does not match evidence key '${evidenceKeys[0]}'.`);
          }
          if (evidenceData.deal_id && receiptObj.deal_id !== evidenceData.deal_id) {
            errors.push(`RECEIPT_DEAL_MISMATCH: Receipt deal_id '${receiptObj.deal_id}' does not match deal '${evidenceData.deal_id}'.`);
          }

          // Final URL Domain Allowlist Check
          if (receiptObj.final_url) {
            const finalDomRes = validateDomainPolicy(receiptObj.final_url, domainCatalog);
            if (!finalDomRes.ok) {
              errors.push(`Receipt final_url domain is not approved in domain_catalog.json: ${receiptObj.final_url} (${finalDomRes.message})`);
            }
          }

          // Content Class Classification Check
          const allowedClasses = [
            'PROMOTION_DETAIL',
            'NO_PUBLIC_PROMO',
            'GENERIC_MARKETING',
            'ANTI_BOT_OR_CHALLENGE',
            'NOT_FOUND',
            'DYNAMIC_ACCOUNT_REQUIRED'
          ];
          if (receiptObj.content_class && !allowedClasses.includes(receiptObj.content_class)) {
            errors.push(`Invalid content_class in receipt: '${receiptObj.content_class}'. Must be one of: ${allowedClasses.join(', ')}`);
          }

          // Strict Gate: Only PROMOTION_DETAIL can be READY_FOR_CEO_REVIEW or PASS
          if ((readiness === 'READY_FOR_CEO_REVIEW' || readiness === 'PASS') && receiptObj.content_class !== 'PROMOTION_DETAIL') {
            errors.push(`PROMOTION_CLASS_GATE_FAILED: Candidate readiness is '${readiness}' but capture receipt content_class is '${receiptObj.content_class}' (only 'PROMOTION_DETAIL' is eligible for staging review).`);
          }

          if (!receiptObj.decoded_dimensions || receiptObj.decoded_dimensions.width < 100 || receiptObj.decoded_dimensions.height < 100) {
            errors.push("Capture receipt lacks verified decoded_dimensions >= 100x100.");
          }
        } catch (e) {
          errors.push(`Failed to parse capture receipt JSON: ${e.message}`);
        }
      }
    }
  }

  // 6. Claim Verifiability & Text Cross-Check Enforcement
  if (readiness === 'READY_FOR_CEO_REVIEW' || readiness === 'PASS') {
    if (!evidenceData.observed_price_or_offer) errors.push("READY_FOR_CEO_REVIEW requires non-empty observed_price_or_offer");
    if (!evidenceData.observed_conditions) errors.push("READY_FOR_CEO_REVIEW requires non-empty observed_conditions");
    if (!evidenceData.expiry_basis || evidenceData.expiry_basis === 'NOT_OBSERVED_ON_CAPTURED_PROMOTION_PAGE') {
      errors.push("READY_FOR_CEO_REVIEW requires verifiable expiry_basis observed on page");
    }
    if (evidenceData.temporal_validity === 'UNCONFIRMED_AT_CAPTURE_TIME') {
      errors.push("Candidate with temporal_validity 'UNCONFIRMED_AT_CAPTURE_TIME' cannot be READY_FOR_CEO_REVIEW or PASS (Fail-Closed)");
    }
    if (Array.isArray(evidenceData.missing_evidence_fields) && evidenceData.missing_evidence_fields.length > 0) {
      errors.push(`READY_FOR_CEO_REVIEW cannot have missing_evidence_fields`);
    }

    // Strict Text Cross-Check: Price, Expiry, Conditions, Location
    const extracted = evidenceData.extracted_claims || {};
    if (!extracted.price_snippet || !textContent.includes(extracted.price_snippet)) {
      errors.push(`CLAIM_VERIFICATION_FAILED: Price snippet '${extracted.price_snippet}' not found in captured text dump.`);
    }
    if (extracted.expiry_snippet && !textContent.includes(extracted.expiry_snippet)) {
      errors.push(`CLAIM_VERIFICATION_FAILED: Expiry snippet '${extracted.expiry_snippet}' not found in captured text dump.`);
    }
    if (extracted.conditions_snippet && !textContent.includes(extracted.conditions_snippet)) {
      errors.push(`CLAIM_VERIFICATION_FAILED: Conditions snippet '${extracted.conditions_snippet}' not found in captured text dump.`);
    }
  } else if (readiness === 'NEEDS_RECHECK') {
    if (candidateData.deals && Array.isArray(candidateData.deals)) {
      for (const d of candidateData.deals) {
        if (d.original_price !== null && d.original_price !== undefined) errors.push("NEEDS_RECHECK must not have original_price");
        if (d.deal_price !== null && d.deal_price !== undefined) errors.push("NEEDS_RECHECK must not have deal_price");
        if (d.discount_pct !== null && d.discount_pct !== undefined) errors.push("NEEDS_RECHECK must not have discount_pct");
        if (d.schedule !== null && d.schedule !== undefined) errors.push("NEEDS_RECHECK must not have schedule");
        if (d.expires_at !== null && d.expires_at !== undefined) errors.push("NEEDS_RECHECK must not have expires_at");
        if (d.affiliate_link !== null && d.affiliate_link !== undefined) errors.push("NEEDS_RECHECK must not have affiliate_link");
        if (d.commission_rate !== null && d.commission_rate !== undefined) errors.push("NEEDS_RECHECK must not have commission_rate");
        if (d.start_minutes !== null && d.start_minutes !== undefined) errors.push("NEEDS_RECHECK must not have start_minutes");
        if (d.end_minutes !== null && d.end_minutes !== undefined) errors.push("NEEDS_RECHECK must not have end_minutes");
        if (d.days_of_week !== null && d.days_of_week !== undefined) errors.push("NEEDS_RECHECK must not have days_of_week");
        if (d.persona !== null && d.persona !== undefined) errors.push("NEEDS_RECHECK must not have persona");
        if (d.duration_mins !== null && d.duration_mins !== undefined) errors.push("NEEDS_RECHECK must not have duration_mins");
      }
    }
  } else if (readiness === 'REJECTED_SYNTHETIC_ARTIFACT') {
    if (candidateData.deals && Array.isArray(candidateData.deals)) {
      for (const d of candidateData.deals) {
        if (d.render_eligible === true) errors.push("REJECTED_SYNTHETIC_ARTIFACT must not have render_eligible=true");
        if (d.lifecycle_status !== 'PROBING' && d.lifecycle_status !== 'REJECTED') {
          errors.push("REJECTED_SYNTHETIC_ARTIFACT deals must have lifecycle_status PROBING or REJECTED");
        }
      }
    }
  }

  // 7. Evidence Revisions Lineage Enforcement (041B)
  if (candidateData.evidence_revisions) {
    const revs = candidateData.evidence_revisions;
    if (!revs.current_revision_id || typeof revs.current_revision_id !== 'string') {
      errors.push("evidence_revisions must specify a valid non-empty current_revision_id.");
    }
    if (!Array.isArray(revs.revisions) || revs.revisions.length === 0) {
      errors.push("evidence_revisions must contain a non-empty revisions array.");
    } else {
      const currentRev = revs.revisions.find(r => r.revision_id === revs.current_revision_id);
      if (!currentRev) {
        errors.push(`INVALID_CURRENT_REVISION: current_revision_id '${revs.current_revision_id}' was not found in revisions list.`);
      }
      for (const r of revs.revisions) {
        if (!r.revision_id || !r.evidence_status) {
          errors.push("Every revision entry must have non-empty revision_id and evidence_status.");
        }
        if (r.revision_id === 'REV_040_SYNTHETIC' && r.evidence_status !== 'REJECTED_SYNTHETIC_ARTIFACT') {
          errors.push(`FORBIDDEN_SYNTHETIC_MUTATION: Historical REV_040_SYNTHETIC must maintain 'REJECTED_SYNTHETIC_ARTIFACT' status (Fail-Closed).`);
        }
      }
    }
  }

  const isStructurallyValid = errors.length === 0;

  return {
    structurally_valid: isStructurallyValid,
    valid: isStructurallyValid, // backward compatibility
    evidence_status: explicitEvidenceStatus,
    verification_readiness: readiness,
    candidate_id: evidenceData.candidate_id || evidenceData.deal_id,
    errors: errors
  };
}

function scanAndValidateAllCandidates(candidatesDir) {
  const targetDir = candidatesDir || path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'candidates', 'pending_review');
  if (!fs.existsSync(targetDir)) return { total_files: 0, passed: 0, failed: 0, results: [] };

  const files = fs.readdirSync(targetDir).filter(f => f.startsWith('candidate_') && f.endsWith('.json'));
  const results = [];
  for (const f of files) {
    const fullPath = path.join(targetDir, f);
    try {
      const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
      const validation = validateCandidate(data);
      results.push({ file: f, ...validation });
    } catch (e) {
      results.push({
        file: f,
        structurally_valid: false,
        valid: false,
        evidence_status: 'UNKNOWN',
        errors: [`JSON Parse Error: ${e.message}`]
      });
    }
  }

  const structurallyValidCount = results.filter(r => r.structurally_valid).length;
  const readyForReviewCount = results.filter(r => r.structurally_valid && (r.verification_readiness === 'READY_FOR_CEO_REVIEW' || r.verification_readiness === 'PASS')).length;
  const needsRecheckCount = results.filter(r => r.structurally_valid && (r.verification_readiness === 'NEEDS_RECHECK' || r.evidence_status === 'NEEDS_RECHECK')).length;
  const syntheticQuarantinedCount = results.filter(r => r.structurally_valid && (r.verification_readiness === 'REJECTED_SYNTHETIC_ARTIFACT' || r.evidence_status === 'REJECTED_SYNTHETIC_ARTIFACT')).length;
  const locallyCapturedCount = results.filter(r => r.structurally_valid && (r.evidence_status === 'LOCALLY_CAPTURED_SOURCE_LINKED' || r.evidence_status === 'REAL_CAPTURE_PROVEN')).length;
  const failedCount = results.length - structurallyValidCount;

  return {
    total_files: results.length,
    structurally_valid: structurallyValidCount,
    locally_captured_source_linked: locallyCapturedCount,
    ready_for_review: readyForReviewCount,
    real_capture_proven: readyForReviewCount, // backward compatibility
    needs_recheck: needsRecheckCount,
    synthetic_quarantined: syntheticQuarantinedCount,
    failed: failedCount,
    results: results
  };
}

// CLI Execution Output
if (require.main === module) {
  console.log('🔍 [JAYT-CANDIDATE-VALIDATOR] Quét và thẩm định candidate files (041)...');
  const summary = scanAndValidateAllCandidates();
  console.log(`  ↳ Tổng số candidate files: ${summary.total_files}`);
  console.log(`  ↳ Cấu trúc hợp lệ (Structurally Valid): ${summary.structurally_valid}/${summary.total_files}`);
  console.log(`  ↳ Bằng chứng capture liên kết (LOCALLY_CAPTURED_SOURCE_LINKED): ${summary.locally_captured_source_linked}`);
  console.log(`  ↳ Sẵn sàng duyệt Staging (READY_FOR_CEO_REVIEW): ${summary.ready_for_review}`);
  console.log(`  ↳ Cần tái thẩm định / Không có giá công khai (NEEDS_RECHECK): ${summary.needs_recheck}`);
  if (summary.synthetic_quarantined > 0) {
    console.log(`  ↳ Đã cách ly mô phỏng (REJECTED_SYNTHETIC_ARTIFACT): ${summary.synthetic_quarantined}`);
  }
  if (summary.failed > 0) {
    console.log(`  ↳ Lỗi cấu trúc/Schema (Failed): ${summary.failed}`);
  }

  for (const r of summary.results) {
    if (r.structurally_valid) {
      console.log(`    - [${r.file}] ${r.candidate_id}: STRUCTURALLY_VALID (${r.evidence_status})`);
    } else {
      console.error(`    - [${r.file}] ${r.candidate_id}: FAILED - ${r.errors.join('; ')}`);
    }
  }

  if (summary.failed > 0) {
    process.exit(1);
  }
}

module.exports = {
  validateCandidate,
  scanAndValidateAllCandidates,
  validateDomainPolicy,
  isDomainApproved,
  validateZonePolicy,
  loadDomainCatalog,
  loadZoneCatalog,
  parseAndVerifyPng,
  calcCrc32,
  getFileSha256
};
