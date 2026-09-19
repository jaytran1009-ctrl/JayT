/**
 * JAYT PRODUCTION GOVERNANCE POLICY ENGINE (063C)
 * Directive: JAYT-GOVERNANCE-POLICY-BINDING-063C
 * 
 * Central shared governance policy module enforcing:
 * 1. Anti-Synthetic Data Gate (INC-SYNTHETIC-DATA-060)
 * 2. Claim-Bound Verbatim Provenance Gate (INC-UNBOUNDED-CLAIM-061C)
 * 3. Honest Audit Status Taxonomy Gate (INC-PREMATURE-AUDIT-CLAIM-056B-061E)
 * 4. Append-Only Run Isolation & Collision Guard (INC-STATIC-RUN-ID-062B)
 * 5. Cryptographic Registry Hash-Chain Verification (INC-MUTATION-OVERWRITE-058D-061F)
 * 
 * Used across: Candidate Intake, Truth Gate Triage, Staging Feed Gate, Receipt Emission, and QA Test Suites.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');

function getSha256(bufOrStr) {
  if (!bufOrStr) return null;
  return crypto.createHash('sha256').update(bufOrStr).digest('hex');
}

/**
 * 1. ANTI-SYNTHETIC DATA GATE (RULE_01_ANTI_SYNTHETIC_DATA)
 * Blocks any synthetic markers, mock deal IDs, or missing physical byte-for-byte artifacts.
 */
function validateAntiSynthetic(candidate, options = {}) {
  if (!candidate || typeof candidate !== 'object') {
    throw new Error('SYNTHETIC_DATA_REJECTED: Candidate payload is invalid or empty.');
  }

  // Check explicit synthetic flags
  if (candidate.is_synthetic === true || candidate.mock === true) {
    throw new Error(`SYNTHETIC_DATA_REJECTED: Candidate '${candidate.deal_id || 'UNKNOWN'}' explicitly marked as synthetic/mock.`);
  }

  // Check mock naming patterns
  if (candidate.deal_id && /MOCK|SYNTHETIC|TEST_STUB/i.test(candidate.deal_id)) {
    throw new Error(`SYNTHETIC_DATA_REJECTED: Candidate ID '${candidate.deal_id}' contains mock token.`);
  }

  // Require physical artifact references
  const artifacts = candidate.provenance?.artifacts || candidate.evidence_link?.artifacts;
  if (!artifacts) {
    throw new Error(`SYNTHETIC_DATA_REJECTED: Candidate '${candidate.deal_id || 'UNKNOWN'}' is missing physical artifact references.`);
  }

  // If required by options, verify physical files on disk
  if (options.verifyDiskArtifacts === true) {
    const textPathRel = artifacts.text?.file || artifacts.text_path;
    if (!textPathRel) {
      throw new Error(`SYNTHETIC_DATA_REJECTED: Candidate '${candidate.deal_id}' missing text artifact file path.`);
    }
    const textPathAbs = path.resolve(repoRoot, textPathRel);
    if (!fs.existsSync(textPathAbs)) {
      throw new Error(`SYNTHETIC_DATA_REJECTED: Physical artifact file does not exist on disk: '${textPathRel}'.`);
    }
    const expectedHash = artifacts.text?.sha256 || artifacts.text_sha256;
    if (expectedHash) {
      const actualHash = getSha256(fs.readFileSync(textPathAbs));
      if (actualHash !== expectedHash) {
        throw new Error(`SYNTHETIC_DATA_REJECTED: Artifact hash mismatch for '${textPathRel}': measured ${actualHash} != expected ${expectedHash}.`);
      }
    }
  }

  return { valid: true, deal_id: candidate.deal_id };
}

/**
 * 2. CLAIM-BOUND VERBATIM PROVENANCE GATE (RULE_02_CLAIM_BOUNDED_SUBSTRING)
 * Blocks claims that contain fabricated addresses, unobserved categories, or imaginary conditions.
 */
function validateClaimBoundedToArtifact(claimText, artifactText, options = {}) {
  if (!artifactText || typeof artifactText !== 'string') {
    throw new Error('CLAIM_NOT_BOUND_TO_SOURCE_ARTIFACT: Source artifact text is missing or invalid.');
  }
  if (!claimText || typeof claimText !== 'string') {
    throw new Error('CLAIM_NOT_BOUND_TO_SOURCE_ARTIFACT: Claim text is missing or empty.');
  }

  const normalizedClaim = claimText.trim();
  const normalizedArtifact = artifactText;

  if (!normalizedArtifact.includes(normalizedClaim)) {
    throw new Error(`CLAIM_NOT_BOUND_TO_SOURCE_ARTIFACT: Claim '${normalizedClaim}' is NOT a verbatim substring of source artifact text.`);
  }

  // If prohibited claims are checked
  if (options.forbiddenExtrapolations && Array.isArray(options.forbiddenExtrapolations)) {
    for (const forbidden of options.forbiddenExtrapolations) {
      if (normalizedClaim.includes(forbidden) && !normalizedArtifact.includes(forbidden)) {
        throw new Error(`CLAIM_NOT_BOUND_TO_SOURCE_ARTIFACT: Prohibited extrapolated claim '${forbidden}' detected.`);
      }
    }
  }

  return { valid: true, claim: normalizedClaim };
}

/**
 * 3. HONEST AUDIT STATUS TAXONOMY GATE (RULE_09_HONEST_STATUS_TAXONOMY_057)
 * Blocks AI from self-claiming ACCEPTED or using non-057 status tokens on unreviewed work orders.
 */
function validateAuditStatusTaxonomy(headerOrStatusText, options = {}) {
  if (!headerOrStatusText || typeof headerOrStatusText !== 'string') {
    throw new Error('PREMATURE_ACCEPTANCE_PROHIBITED: Status text is missing or invalid.');
  }

  // AI self-claiming ACCEPTED on unreviewed work order
  const prematureRegex = /(?:Status|Trạng thái)[^\r\n]*IMPLEMENTED[^\r\n]*ACCEPTED/i;
  if (prematureRegex.test(headerOrStatusText)) {
    throw new Error(`PREMATURE_ACCEPTANCE_PROHIBITED: AI cannot self-claim ACCEPTED status on active work orders.`);
  }

  // Check header line if it contains active work order status
  const activeHeaderMatch = headerOrStatusText.match(/>\s*\*\*Mã\s+chỉ\s+thị\*\*:[^\r\n]+/i);
  if (activeHeaderMatch) {
    const activeLine = activeHeaderMatch[0];
    if (activeLine.includes('ACCEPTED') && !options.isCeoSigned) {
      throw new Error(`PREMATURE_ACCEPTANCE_PROHIBITED: Active work order cannot contain ACCEPTED without CEO signature.`);
    }
  }

  return { valid: true };
}

/**
 * 4. APPEND-ONLY RUN ISOLATION & COLLISION GUARD (RULE_06_DYNAMIC_RUN_ID_COLLISION_FAIL_CLOSED)
 * Ensures each run initializes an isolated dynamic directory; prevents in-place overwrite.
 */
function validateAppendOnlyRunIsolation(targetPath, entityType = 'Run directory') {
  if (!targetPath || typeof targetPath !== 'string') {
    throw new Error(`FAIL_CLOSED_COLLISION: ${entityType} path is missing or invalid.`);
  }

  if (fs.existsSync(targetPath)) {
    throw new Error(`FAIL_CLOSED_COLLISION: ${entityType} '${targetPath}' already exists! Cannot overwrite existing execution.`);
  }

  return { valid: true, path: targetPath };
}

/**
 * 5. CRYPTOGRAPHIC REGISTRY HASH-CHAIN VERIFICATION (RULE_05_STRICT_APPEND_ONLY_IMMUTABILITY)
 * Verifies that all historical receipts match baseline hashes and that the registry revision chain is intact.
 */
function verifyRegistryHashChain(registryObject, baselineMap, chainLedger) {
  if (!registryObject || typeof registryObject !== 'object') {
    throw new Error('REGISTRY_HASH_CHAIN_TAMPERED: Registry object is missing or invalid.');
  }

  // 1. Verify receipt hashes
  const receiptsMap = registryObject.historical_receipts_baseline || baselineMap;
  if (!receiptsMap || Object.keys(receiptsMap).length === 0) {
    throw new Error('REGISTRY_HASH_CHAIN_TAMPERED: Historical receipts baseline map is empty.');
  }

  for (const [relPath, expectedHash] of Object.entries(receiptsMap)) {
    const absPath = path.resolve(repoRoot, relPath);
    if (!fs.existsSync(absPath)) {
      throw new Error(`REGISTRY_HASH_CHAIN_TAMPERED: Baseline receipt file missing: '${relPath}'.`);
    }
    const actualHash = getSha256(fs.readFileSync(absPath));
    if (actualHash !== expectedHash) {
      throw new Error(`REGISTRY_HASH_CHAIN_TAMPERED: Baseline receipt hash mismatch for '${relPath}': measured ${actualHash} != expected ${expectedHash}.`);
    }
  }

  // 2. Verify revision chain if ledger provided
  if (chainLedger && Array.isArray(chainLedger.revisions)) {
    let prevHash = null;
    for (const rev of chainLedger.revisions) {
      if (rev.previous_revision_sha256 !== prevHash) {
        throw new Error(`REGISTRY_HASH_CHAIN_TAMPERED: Broken revision hash chain at revision '${rev.revision_id}'. Expected previous hash ${prevHash}, got ${rev.previous_revision_sha256}.`);
      }
      const revFileAbs = path.resolve(repoRoot, rev.file_path);
      if (!fs.existsSync(revFileAbs)) {
        throw new Error(`REGISTRY_HASH_CHAIN_TAMPERED: Revision snapshot file missing: '${rev.file_path}'.`);
      }
      const actualRevHash = getSha256(fs.readFileSync(revFileAbs));
      if (actualRevHash !== rev.snapshot_sha256) {
        throw new Error(`REGISTRY_HASH_CHAIN_TAMPERED: Snapshot hash mismatch for '${rev.file_path}': measured ${actualRevHash} != expected ${rev.snapshot_sha256}.`);
      }
      prevHash = rev.snapshot_sha256;
    }
  }

  return { valid: true, verified_receipts_count: Object.keys(receiptsMap).length };
}

/**
 * 12. STRICT DEEP PROMOTION URL & LEAD FILTER (RULE_12_STRICT_DEEP_PROMOTION_URL_INTEGRITY)
 * Filters out fragments (#...), logins, generic navigation, external domains, and duplicate URLs.
 * Remediated in 064C: Exact-host matching / Subdomain allowlist; Pre-filter seller/policy/non-Da Nang URLs.
 */
function filterStrictDeepPromotionUrls(discoveredLinks, baseHost, customCatalog = null) {
  if (!Array.isArray(discoveredLinks)) return [];

  const seenUrls = new Set();
  const validLeads = [];

  const INVALID_PATH_PATTERNS = [
    /#.*/,                                  // fragments (#contentarea, #social-login, #...)
    /\/buyer\/(?:login|signup)/i,           // auth paths
    /\/login|\/signup|\/dang-nhap|\/dang-ky/i,
    /\/cart|\/checkout|\/gio-hang/i,
    /\/terms|\/dieu-khoan|\/chinh-sach|\/policy|\/quy-che/i,
    /\/tin-tuc-bao-chi|\/press|\/tin-tuc-su-kien/i,
    /\/contact|\/lien-he|\/about|\/gioi-thieu/i,
    /\/seller|\/sell-on|\/ban-hang|\/register_now/i, // Seller / business registration
    /\/category|\/trending|\/talk-of-the-town|\/food-signature|\/review-food|\/menu|\/product-listing/i, // Category / generic nav
    /(?:[\/_-])(?:tp-?hcm|ha-?noi|hoan-?kiem|hcm|hn|quan-1|dong-da)(?:[\/_-]|$)/i, // Non-target locality
    /\.(?:jpg|jpeg|png|gif|webp|svg|pdf|zip|rar)$/i
  ];

  const PROMO_DETAIL_INDICATORS = [
    /\/khuyen-mai\/[a-zA-Z0-9_-]+/i,
    /\/promotions?\/[a-zA-Z0-9_-]+/i,
    /\/uu-dai\/[a-zA-Z0-9_-]+/i,
    /\/voucher\/[a-zA-Z0-9_-]+/i,
    /\/tin-tuc\/[a-zA-Z0-9_-]*(?:uu-dai|khuyen-mai|giam-gia|combo|deal)[a-zA-Z0-9_-]*/i,
    /\/food-blog\/[a-zA-Z0-9_-]+/i,
    /\/campaign\/[a-zA-Z0-9_-]+/i,
    /\/wow\/i\/vn\/[a-zA-Z0-9_-]+/i
  ];

  let baseDomain = '';
  if (baseHost) {
    try {
      baseDomain = new URL(baseHost.startsWith('http') ? baseHost : `https://${baseHost}`).hostname.replace(/^www\./, '').toLowerCase();
    } catch (e) {
      baseDomain = baseHost.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0].toLowerCase();
    }
  }

  // Allowlisted subdomains map
  const ALLOWED_SUBDOMAINS = {
    'lazada.vn': new Set(['pages.lazada.vn', 'www.lazada.vn', 'lazada.vn']),
    'shopee.vn': new Set(['banhang.shopee.vn', 'www.shopee.vn', 'shopee.vn']),
    'tiki.vn': new Set(['www.tiki.vn', 'tiki.vn']),
    'phuclong.com.vn': new Set(['www.phuclong.com.vn', 'phuclong.com.vn']),
    'highlandscoffee.com.vn': new Set(['www.highlandscoffee.com.vn', 'highlandscoffee.com.vn']),
    'jollibee.com.vn': new Set(['www.jollibee.com.vn', 'jollibee.com.vn']),
    'dominos.vn': new Set(['www.dominos.vn', 'dominos.vn']),
    'thepizzacompany.vn': new Set(['www.thepizzacompany.vn', 'thepizzacompany.vn']),
    'lotteria.vn': new Set(['www.lotteria.vn', 'lotteria.vn']),
    'grab.com': new Set(['www.grab.com', 'grab.com']),
    'be.com.vn': new Set(['www.be.com.vn', 'be.com.vn'])
  };

  for (const item of discoveredLinks) {
    const rawHref = typeof item === 'string' ? item : item.href;
    if (!rawHref || typeof rawHref !== 'string') continue;

    // Must be HTTPS URL
    if (!rawHref.startsWith('https://')) continue;

    try {
      const parsedUrl = new URL(rawHref);
      const host = parsedUrl.hostname.toLowerCase();
      
      // Strict Exact Host or Allowlisted Subdomain matching (Prevents spoofing like otherphuclong.com or phuclong.com.vn.attacker.com)
      if (baseDomain) {
        const allowedSet = ALLOWED_SUBDOMAINS[baseDomain];
        if (allowedSet) {
          if (!allowedSet.has(host)) {
            continue;
          }
        } else {
          // Exact host or exact www. host only
          if (host !== baseDomain && host !== `www.${baseDomain}`) {
            continue;
          }
        }
      }

      // Reject fragments in raw href
      if (rawHref.includes('#')) {
        continue;
      }

      const fullUrlClean = parsedUrl.origin + parsedUrl.pathname;
      const pathname = parsedUrl.pathname.toLowerCase();

      // Check against invalid patterns (seller, policy, category, non-target locality, etc.)
      const isInvalid = INVALID_PATH_PATTERNS.some(pat => pat.test(rawHref) || pat.test(pathname));
      if (isInvalid) continue;

      // Must not be a shallow landing root
      const isLandingIndex = /^\/(?:khuyen-mai|promotions?|uu-dai|voucher|tin-tuc|food-blog)?\/?$/i.test(pathname);
      if (isLandingIndex) continue;

      const hasPromoIndicator = PROMO_DETAIL_INDICATORS.some(pat => pat.test(pathname));
      if (!hasPromoIndicator) continue;

      // Unique URL check
      if (seenUrls.has(fullUrlClean)) continue;
      seenUrls.add(fullUrlClean);

      validLeads.push({
        href: fullUrlClean,
        lead_url: fullUrlClean,
        text: (typeof item === 'object' && item.text) ? item.text.trim() : '',
        anchor_text: (typeof item === 'object' && item.text) ? item.text.trim() : '',
        classification: 'PROMOTION_LEAD'
      });
    } catch (e) {
      continue;
    }
  }

  return validLeads;
}

module.exports = {
  validateAntiSynthetic,
  validateClaimBoundedToArtifact,
  validateAuditStatusTaxonomy,
  validateAppendOnlyRunIsolation,
  verifyRegistryHashChain,
  filterStrictDeepPromotionUrls,
  getSha256
};
