const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

function verifyAllPolicySpans(matrixInput, options = {}) {
  let matrix;
  let matrixSha = null;
  let matrixPath = null;

  if (matrixInput && typeof matrixInput === 'object') {
    matrix = matrixInput;
    matrixSha = sha256(Buffer.from(JSON.stringify(matrix)));
  } else {
    matrixPath = matrixInput || path.resolve('04_DATA_PIPELINE/batch_matrix/BRAND_POLICY_AUDIT_MATRIX.json');
    if (!fs.existsSync(matrixPath)) {
      throw new Error(`Matrix not found at ${matrixPath}`);
    }
    const rawContent = fs.readFileSync(matrixPath);
    matrixSha = sha256(rawContent);
    matrix = JSON.parse(rawContent.toString('utf8'));
  }

  const receipt = {
    receipt_name: "SPAN_VERIFICATION_RECEIPT",
    generated_at_utc: new Date().toISOString(),
    matrix_name: matrix.matrix_name || "UNKNOWN",
    matrix_version: matrix.version || "1.0",
    matrix_sha256: matrixSha,
    total_policies: (matrix.policies || []).length,
    total_spans_checked: 0,
    total_spans_passed: 0,
    total_spans_failed: 0,
    all_passed: true,
    policy_results: []
  };

  for (const policy of matrix.policies) {
    const policyRes = {
      policy_id: policy.policy_id,
      brand_id: policy.brand_id,
      raw_source_path: policy.raw_source_path,
      raw_sha256_expected: policy.raw_sha256,
      raw_file_exists: false,
      raw_sha256_match: false,
      spans_checked: []
    };

    if (!policy.raw_source_path) {
      policyRes.status = "NO_RAW_SOURCE (ALL TERMS UNVERIFIED)";
      receipt.policy_results.push(policyRes);
      continue;
    }

    const rawAbsPath = path.resolve(policy.raw_source_path);
    if (!fs.existsSync(rawAbsPath)) {
      policyRes.status = "RAW_FILE_MISSING";
      policyRes.error = `File not found: ${rawAbsPath}`;
      receipt.all_passed = false;
      receipt.policy_results.push(policyRes);
      continue;
    }

    policyRes.raw_file_exists = true;
    const rawBuf = fs.readFileSync(rawAbsPath);
    const actualSha = sha256(rawBuf);
    policyRes.raw_sha256_actual = actualSha;
    policyRes.raw_bytes = rawBuf.length;

    if (policy.raw_sha256) {
      policyRes.raw_sha256_match = (actualSha === policy.raw_sha256);
      if (!policyRes.raw_sha256_match) {
        receipt.all_passed = false;
      }
    }

    // Check all verified terms with text_span and byte_offset
    // COUNCIL QA RULE: Any term marked VERIFIED but lacking text_span, byte_offset, or raw_sha256 MUST FAIL!
    const terms = policy.terms || {};
    for (const [termKey, termObj] of Object.entries(terms)) {
      if (termObj && termObj.status === "VERIFIED") {
        receipt.total_spans_checked++;

        const hasSpan = typeof termObj.text_span === 'string' && termObj.text_span.length > 0;
        const hasOffset = typeof termObj.byte_offset === 'number' && termObj.byte_offset >= 0;
        const hasRawSha = typeof policy.raw_sha256 === 'string' && policy.raw_sha256.length === 64;
        const hasRawBuf = policyRes.raw_file_exists && policyRes.raw_sha256_match && rawBuf;

        let matches = false;
        let actualOffset = -1;
        let targetBuf = null;

        if (hasSpan && hasOffset && hasRawSha && hasRawBuf) {
          targetBuf = Buffer.from(termObj.text_span, 'utf8');
          actualOffset = rawBuf.indexOf(targetBuf);
          matches = (actualOffset === termObj.byte_offset && termObj.byte_offset !== -1);
        }

        const spanCheck = {
          term_key: termKey,
          text_span: termObj.text_span,
          declared_offset: termObj.byte_offset,
          actual_offset: actualOffset,
          span_bytes: targetBuf ? targetBuf.length : 0,
          has_valid_span: hasSpan,
          has_valid_offset: hasOffset,
          has_matching_raw_sha: hasRawSha && policyRes.raw_sha256_match,
          matches: matches
        };

        if (matches) {
          receipt.total_spans_passed++;
        } else {
          receipt.total_spans_failed++;
          receipt.all_passed = false;
          spanCheck.error = !hasSpan
            ? "MANDATORY_FAIL: Term marked VERIFIED but missing or empty text_span"
            : !hasOffset
            ? "MANDATORY_FAIL: Term marked VERIFIED but missing or invalid byte_offset"
            : !hasRawSha
            ? "MANDATORY_FAIL: Policy missing valid raw_sha256 hash"
            : !policyRes.raw_sha256_match
            ? "MANDATORY_FAIL: Raw buffer hash does not match declared raw_sha256"
            : `Offset mismatch: declared ${termObj.byte_offset}, actual ${actualOffset}`;
        }

        policyRes.spans_checked.push(spanCheck);
      }
    }

    receipt.policy_results.push(policyRes);
  }

  if (options.saveReceipt !== false) {
    const outDir = path.resolve('06_TRUST_AND_EVIDENCE/batch_13_locator_vault');
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }
    const outPath = path.join(outDir, 'SPAN_VERIFICATION_RECEIPT.json');
    fs.writeFileSync(outPath, JSON.stringify(receipt, null, 2), 'utf8');
    console.log(`Span verification receipt written to ${outPath}`);
    console.log(`Summary: ${receipt.total_spans_passed}/${receipt.total_spans_checked} passed. All Passed: ${receipt.all_passed}`);
  }

  return receipt;
}

if (require.main === module) {
  const res = verifyAllPolicySpans();
  if (!res.all_passed) {
    console.error('Span verification FAILED!');
    process.exit(1);
  }
}

module.exports = { verifyAllPolicySpans };
