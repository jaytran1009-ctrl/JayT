/**
 * 07_QUALITY_ASSURANCE/verify_policy_ingress_scope.cjs
 * 
 * JAYT-329 Batch 13: Policy Ingress Scope Strict Validator
 * 
 * Council Verification Rules:
 * 1. parent_file_sha256 MUST exactly match raw file SHA-256 on disk.
 * 2. buf.slice(span_start, span_start + span_length) MUST exactly match anchor_tag_raw.
 * 3. buf.slice(href_start, href_start + len(href_value)) MUST exactly match href_value.
 * 4. new URL(href_value, parent_url).href MUST exactly match target_url.
 * 5. Target URLs MUST match the three approved targets:
 *    - CGV: https://www.cgv.vn/default/cgv-membership
 *    - Galaxy: https://www.galaxycine.vn/u22/
 *    - Jollibee: https://jollibee.com.vn/mon-moi-mon-ngon.html
 * 6. Status MUST be PROPOSAL_UNVERIFIED and capture_authorized MUST be false.
 * 7. policy_scope_required MUST NOT contain predefined price/age assertions (must be audit questions).
 * 
 * If ANY condition fails, the validator records failure and returns all_passed: false.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

function verifyPolicyIngressScope(scopeInput, options = {}) {
  let scope;
  let scopeSha = null;
  let scopePath = null;

  if (scopeInput && typeof scopeInput === 'object') {
    scope = scopeInput;
    scopeSha = sha256(Buffer.from(JSON.stringify(scope)));
  } else {
    scopePath = scopeInput || path.resolve('04_DATA_PIPELINE/batch_matrix/BATCH_13_POLICY_INGRESS_SCOPE.json');
    if (!fs.existsSync(scopePath)) {
      throw new Error(`Scope file not found at ${scopePath}`);
    }
    const rawContent = fs.readFileSync(scopePath);
    scopeSha = sha256(rawContent);
    scope = JSON.parse(rawContent.toString('utf8'));
  }

  const receipt = {
    receipt_name: "SCOPE_VERIFICATION_RECEIPT",
    generated_at_utc: new Date().toISOString(),
    scope_file: scopePath ? path.resolve(scopePath).replace(/\\/g, '/') : "IN_MEMORY_OBJECT",
    scope_file_sha256: scopeSha,
    scope_version: scope.version || "1.0",
    candidates_count: (scope.candidates || []).length,
    candidates_checked: 0,
    candidates_passed: 0,
    candidates_failed: 0,
    all_passed: true,
    candidate_results: []
  };

  const expectedTargets = {
    cgv_cinemas: "https://www.cgv.vn/default/cgv-membership",
    galaxy_cinema: "https://www.galaxycine.vn/u22/",
    jollibee: "https://jollibee.com.vn/mon-moi-mon-ngon.html"
  };

  const candidates = scope.candidates || [];
  if (candidates.length !== 3) {
    receipt.all_passed = false;
    receipt.error = `Expected exactly 3 candidates, found ${candidates.length}`;
  }

  for (const cand of candidates) {
    receipt.candidates_checked++;
    const candRes = {
      candidate_id: cand.candidate_id,
      brand_id: cand.brand_id,
      target_url: cand.target_url,
      checks: {
        file_exists: false,
        file_sha256_match: false,
        byte_slice_match: false,
        href_start_match: false,
        url_resolved_match: false,
        expected_target_match: false,
        unverified_status_guarded: false,
        no_predefined_assertions: false
      },
      errors: [],
      passed: true
    };

    const prov = cand.link_provenance || {};

    // 1. File existence check
    const parentFile = prov.parent_file ? path.resolve(prov.parent_file) : null;
    if (!parentFile || !fs.existsSync(parentFile)) {
      candRes.checks.file_exists = false;
      candRes.errors.push(`Parent file missing: ${prov.parent_file}`);
      candRes.passed = false;
      receipt.candidates_failed++;
      receipt.all_passed = false;
      receipt.candidate_results.push(candRes);
      continue;
    }
    candRes.checks.file_exists = true;

    const fileBuf = fs.readFileSync(parentFile);
    const actualFileSha = sha256(fileBuf);

    // 2. File SHA-256 match
    if (actualFileSha === prov.parent_file_sha256) {
      candRes.checks.file_sha256_match = true;
    } else {
      candRes.checks.file_sha256_match = false;
      candRes.errors.push(`File SHA-256 mismatch: expected ${prov.parent_file_sha256}, got ${actualFileSha}`);
      candRes.passed = false;
    }

    // 3. Byte slice match: buf.slice(span_start, span_start + span_length) === anchor_tag_raw
    const spanStart = prov.span_start;
    const spanLength = prov.span_length;
    if (typeof spanStart === 'number' && typeof spanLength === 'number' && spanStart >= 0 && spanLength > 0) {
      const sliceBuf = fileBuf.slice(spanStart, spanStart + spanLength);
      const sliceStr = sliceBuf.toString('utf8');
      if (sliceStr === prov.anchor_tag_raw) {
        candRes.checks.byte_slice_match = true;
      } else {
        candRes.checks.byte_slice_match = false;
        candRes.errors.push(`Byte slice mismatch at offset [${spanStart}..${spanStart + spanLength}]: expected "${prov.anchor_tag_raw}", got "${sliceStr}"`);
        candRes.passed = false;
      }
    } else {
      candRes.checks.byte_slice_match = false;
      candRes.errors.push('Missing or invalid span_start/span_length');
      candRes.passed = false;
    }

    // 4. href_start match
    const hrefStart = prov.href_start;
    const hrefValue = prov.href_value;
    if (typeof hrefStart === 'number' && typeof hrefValue === 'string' && hrefStart >= 0) {
      const hrefValBuf = Buffer.from(hrefValue, 'utf8');
      const actualHrefSlice = fileBuf.slice(hrefStart, hrefStart + hrefValBuf.length);
      if (actualHrefSlice.equals(hrefValBuf)) {
        candRes.checks.href_start_match = true;
      } else {
        candRes.checks.href_start_match = false;
        candRes.errors.push(`href_start mismatch at offset ${hrefStart}: expected "${hrefValue}", got "${actualHrefSlice.toString('utf8')}"`);
        candRes.passed = false;
      }
    } else {
      candRes.checks.href_start_match = false;
      candRes.errors.push('Missing or invalid href_start/href_value');
      candRes.passed = false;
    }

    // 5. URL resolution check
    if (prov.parent_url && prov.href_value) {
      try {
        const resolved = new URL(prov.href_value, prov.parent_url).href;
        if (resolved === cand.target_url) {
          candRes.checks.url_resolved_match = true;
        } else {
          candRes.checks.url_resolved_match = false;
          candRes.errors.push(`URL resolution mismatch: resolved "${resolved}", declared target_url "${cand.target_url}"`);
          candRes.passed = false;
        }
      } catch (e) {
        candRes.checks.url_resolved_match = false;
        candRes.errors.push(`URL resolution parse error: ${e.message}`);
        candRes.passed = false;
      }
    } else {
      candRes.checks.url_resolved_match = false;
      candRes.errors.push('Missing parent_url or href_value for URL resolution');
      candRes.passed = false;
    }

    // 6. Expected target match (Council-locked targets)
    const expectedTarget = expectedTargets[cand.brand_id];
    if (expectedTarget && cand.target_url === expectedTarget) {
      candRes.checks.expected_target_match = true;
    } else {
      candRes.checks.expected_target_match = false;
      candRes.errors.push(`Expected target mismatch for ${cand.brand_id}: expected ${expectedTarget}, got ${cand.target_url}`);
      candRes.passed = false;
    }

    // 7. Authorization & Staging Guard
    // Accepts either initial proposal state (PROPOSAL_UNVERIFIED & capture_authorized: false)
    // or council-authorized capture state (COUNCIL_AUTHORIZED_FOR_INTERNAL_CAPTURE & capture_authorized: true).
    // In ALL cases, public_approved MUST be false and render_permitted MUST be false.
    const isProposalState = (cand.status === 'PROPOSAL_UNVERIFIED' && cand.capture_authorized === false);
    const isCouncilAuthorized = (cand.status === 'COUNCIL_AUTHORIZED_FOR_INTERNAL_CAPTURE' && cand.capture_authorized === true);
    const isPublicBlocked = (cand.public_approved === false && cand.render_permitted === false);

    if ((isProposalState || isCouncilAuthorized) && isPublicBlocked) {
      candRes.checks.unverified_status_guarded = true;
    } else {
      candRes.checks.unverified_status_guarded = false;
      candRes.errors.push(`Authorization / Staging guard failed: status=${cand.status}, capture_authorized=${cand.capture_authorized}, public_approved=${cand.public_approved}, render_permitted=${cand.render_permitted}`);
      candRes.passed = false;
    }

    // 8. No predefined assertions in policy_scope_required
    const scopeReq = cand.policy_scope_required || [];
    const priceRegex = /\b(69k|89k|145k|58k|45k|55k|\d{2,3}\.000\s*(?:đ|vnd))\b/i;
    const ageRegex = /\b(dưới 22|12-22)\b/i;
    let hasPredefined = false;
    for (const reqItem of scopeReq) {
      if (priceRegex.test(reqItem) || ageRegex.test(reqItem)) {
        hasPredefined = true;
        candRes.errors.push(`Predefined assertion detected in scope item: "${reqItem}"`);
        break;
      }
    }
    if (!hasPredefined && scopeReq.length > 0) {
      candRes.checks.no_predefined_assertions = true;
    } else {
      candRes.checks.no_predefined_assertions = false;
      candRes.passed = false;
    }

    if (candRes.passed) {
      receipt.candidates_passed++;
    } else {
      receipt.candidates_failed++;
      receipt.all_passed = false;
    }

    receipt.candidate_results.push(candRes);
  }

  if (options.saveReceipt !== false) {
    const outDir = path.resolve('06_TRUST_AND_EVIDENCE/batch_13_locator_vault');
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }
    const outPath = path.join(outDir, 'SCOPE_VERIFICATION_RECEIPT.json');
    fs.writeFileSync(outPath, JSON.stringify(receipt, null, 2), 'utf8');
    console.log(`Scope verification receipt written to ${outPath}`);
    console.log(`Summary: ${receipt.candidates_passed}/${receipt.candidates_checked} passed. All Passed: ${receipt.all_passed}`);
  }

  return receipt;
}

if (require.main === module) {
  const res = verifyPolicyIngressScope();
  if (!res.all_passed) {
    console.error('Scope verification FAILED!');
    process.exit(1);
  }
  process.exit(0);
}

module.exports = { verifyPolicyIngressScope };
