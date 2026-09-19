const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * JAYT PROVENANCE VALIDATOR ENGINE (JAYT-245 SECTION AI ARCHITECTURE)
 * Complete Semantic Rendering Contract for All Rendered Fields,
 * Exact UTF-16 Code Unit Offsets, Strict Acronym Expansion Guard,
 * and Sensitive Header Pruning.
 */

const FORBIDDEN_SENSITIVE_HEADERS = new Set([
  'set-cookie',
  'cookie',
  'authorization',
  'proxy-authorization',
  'x-amz-security-token',
  'x-csrf-token',
  'x-xsrf-token',
  'session',
  'token',
  'www-authenticate'
]);

function sha256Buffer(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

function validateFieldProvenance(manifestItem, receiptData, rawPayloadBuffer) {
  const errors = [];

  if (!manifestItem || typeof manifestItem !== 'object') {
    return { valid: false, errors: ['Invalid manifest item object'] };
  }

  // 1. Schema & Tier Contract
  if (!manifestItem.item_id || !manifestItem.tier) {
    errors.push('Missing essential manifest item fields (item_id, tier)');
  }

  // 2. Offset Convention Declaration (Section AI)
  if (manifestItem.offset_convention !== 'utf16_code_unit_offset') {
    errors.push(`Invalid offset convention: declared ${manifestItem.offset_convention} (must be utf16_code_unit_offset)`);
  }

  // 3. Receipt Integrity & Privacy Redaction Check (P0)
  if (!receiptData || typeof receiptData !== 'object') {
    errors.push('Missing or invalid capture receipt');
  } else {
    if (receiptData.http_status !== 200) {
      errors.push(`Invalid capture HTTP status: ${receiptData.http_status}`);
    }

    const now = Date.now();
    const captureStart = new Date(receiptData.collector_clock_start_iso).getTime();
    if (captureStart > now + 1000) {
      errors.push(`Future capture timestamp detected: ${receiptData.collector_clock_start_iso}`);
    }

    if (receiptData.final_canonical_url !== manifestItem.canonical_url) {
      errors.push(`Canonical URL mismatch: manifest ${manifestItem.canonical_url} vs receipt ${receiptData.final_canonical_url}`);
    }

    // Check that sensitive header names/values are 100% PRUNED (P0 Privacy)
    if (receiptData.redirect_chain && Array.isArray(receiptData.redirect_chain)) {
      receiptData.redirect_chain.forEach((step, idx) => {
        if (step.headers) {
          Object.keys(step.headers).forEach(headerKey => {
            const hLower = headerKey.toLowerCase();
            if (FORBIDDEN_SENSITIVE_HEADERS.has(hLower)) {
              errors.push(`Sensitive header key "${headerKey}" exposed in receipt step ${idx}`);
            }
          });
        }
      });
    }
  }

  // 4. Raw Payload Buffer, Hash & Content-Length Verification (P0)
  if (!rawPayloadBuffer || rawPayloadBuffer.length === 0) {
    errors.push('Raw payload buffer is empty or missing');
  } else {
    const actualLength = rawPayloadBuffer.length;
    if (receiptData && receiptData.content_length_bytes && receiptData.content_length_bytes !== actualLength) {
      errors.push(`Content-length mismatch: receipt ${receiptData.content_length_bytes} vs raw buffer ${actualLength}`);
    }
    if (manifestItem.content_length_bytes && manifestItem.content_length_bytes !== actualLength) {
      errors.push(`Content-length mismatch: manifest ${manifestItem.content_length_bytes} vs raw buffer ${actualLength}`);
    }

    const actualHash = sha256Buffer(rawPayloadBuffer);
    if (receiptData && receiptData.raw_sha256 && actualHash !== receiptData.raw_sha256) {
      errors.push(`SHA-256 mismatch with receipt: calculated ${actualHash} vs receipt ${receiptData.raw_sha256}`);
    }
    if (manifestItem.raw_sha256 && actualHash !== manifestItem.raw_sha256) {
      errors.push(`SHA-256 mismatch with manifest: calculated ${actualHash} vs manifest ${manifestItem.raw_sha256}`);
    }
  }

  // 5. All-Rendered-Fields Semantic Contract Validation (Section AI P0)
  if (manifestItem.fields && rawPayloadBuffer) {
    const rawHtml = rawPayloadBuffer.toString('utf8');

    // Title Check
    if (manifestItem.fields.title) {
      const t = manifestItem.fields.title;
      if (t.mapping_type === 'LITERAL_EXACT') {
        if (t.value !== t.exact_quote) {
          errors.push(`Title LITERAL_EXACT mapping failure: value "${t.value}" !== exact_quote "${t.exact_quote}"`);
        }
        const actualIdx = rawHtml.indexOf(t.exact_quote);
        if (actualIdx === -1) {
          errors.push(`Title quote "${t.exact_quote}" not found in raw payload`);
        } else if (t.offset_start !== undefined && t.offset_start !== actualIdx) {
          errors.push(`Title UTF-16 offset mismatch: declared ${t.offset_start} vs actual ${actualIdx}`);
        }
      }
    }

    // Brand Check (Guard against acronym expansion without proof)
    if (manifestItem.fields.brand) {
      const b = manifestItem.fields.brand;
      if (b.mapping_type === 'LITERAL_EXACT') {
        if (b.value !== b.exact_quote) {
          errors.push(`Brand LITERAL_EXACT mapping failure: value "${b.value}" !== exact_quote "${b.exact_quote}"`);
        }
        const actualIdx = rawHtml.indexOf(b.exact_quote);
        if (actualIdx === -1) {
          errors.push(`Brand quote "${b.exact_quote}" not found in raw payload`);
        } else if (b.offset_start !== undefined && b.offset_start !== actualIdx) {
          errors.push(`Brand UTF-16 offset mismatch: declared ${b.offset_start} vs actual ${actualIdx}`);
        }
      }
    }

    // Category Check (Controlled Taxonomy)
    if (manifestItem.fields.category) {
      const c = manifestItem.fields.category;
      if (c.mapping_type === 'CONTROLLED_TAXONOMY') {
        if (!c.allowlist || !c.allowlist.includes(c.value)) {
          errors.push(`Category "${c.value}" not in approved allowlist`);
        }
        if (c.supporting_source_span) {
          const actualIdx = rawHtml.indexOf(c.supporting_source_span);
          if (actualIdx === -1) {
            errors.push(`Category supporting span "${c.supporting_source_span}" not found in raw payload`);
          } else if (c.offset_start !== undefined && c.offset_start !== actualIdx) {
            errors.push(`Category UTF-16 offset mismatch: declared ${c.offset_start} vs actual ${actualIdx}`);
          }
        }
      }
    }

    // Scope / Cluster Check (Controlled Disclosure)
    if (manifestItem.fields.cluster) {
      const cl = manifestItem.fields.cluster;
      if (cl.mapping_type === 'CONTROLLED_DISCLOSURE') {
        if (cl.supporting_source_span) {
          const actualIdx = rawHtml.indexOf(cl.supporting_source_span);
          if (actualIdx === -1) {
            errors.push(`Cluster supporting span "${cl.supporting_source_span}" not found in raw payload`);
          } else if (cl.offset_start !== undefined && cl.offset_start !== actualIdx) {
            errors.push(`Cluster UTF-16 offset mismatch: declared ${cl.offset_start} vs actual ${actualIdx}`);
          }
        }
      }
    }

    // Summary Text Check (Controlled Disclosure)
    if (manifestItem.fields.summary_text) {
      const s = manifestItem.fields.summary_text;
      if (s.mapping_type === 'CONTROLLED_DISCLOSURE') {
        if (s.supporting_source_span) {
          const actualIdx = rawHtml.indexOf(s.supporting_source_span);
          if (actualIdx === -1) {
            errors.push(`Summary supporting span "${s.supporting_source_span}" not found in raw payload`);
          } else if (s.offset_start !== undefined && s.offset_start !== actualIdx) {
            errors.push(`Summary UTF-16 offset mismatch: declared ${s.offset_start} vs actual ${actualIdx}`);
          }
        }
      }
    }

    // Verbatim Quote Check
    if (manifestItem.fields.verbatim_quote) {
      const v = manifestItem.fields.verbatim_quote;
      if (v.exact_quote) {
        const actualIdx = rawHtml.indexOf(v.exact_quote);
        if (actualIdx === -1) {
          errors.push(`Verbatim quote "${v.exact_quote}" not found in raw payload`);
        } else if (v.offset_start !== undefined && v.offset_start !== actualIdx) {
          errors.push(`Verbatim quote UTF-16 offset mismatch: declared ${v.offset_start} vs actual ${actualIdx}`);
        }
      }
    }

    // Action URL Check
    if (manifestItem.fields.action_type && manifestItem.fields.action_type.value === 'PRIMARY_LINK') {
      if (manifestItem.fields.action_type.target_url !== manifestItem.canonical_url) {
        errors.push('Primary link target URL must match canonical URL');
      }
    }
  }

  // 6. Radar Lane Invariant Rules
  if (manifestItem.tier === 'RADAR_TRACKING') {
    if (manifestItem.fields && manifestItem.fields.price_claim && manifestItem.fields.price_claim.value !== null) {
      errors.push('Radar item cannot contain pricing claims');
    }
  }

  return {
    valid: errors.length === 0,
    errors: errors
  };
}

module.exports = { validateFieldProvenance, sha256Buffer, FORBIDDEN_SENSITIVE_HEADERS };
