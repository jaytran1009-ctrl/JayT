const fs = require('fs');

const content = `/**
 * =============================================================================
 * JAYT CANDIDATE EVIDENCE VALIDATOR TEST SUITE
 * =============================================================================
 * Test Coverage:
 * 1. [VAL_01] Positive Test: Properly evidenced candidate passes validation.
 * 2. [VAL_02] Negative Test (CEO Mandate): Generic homepage claiming READY_FOR_CEO_REVIEW
 *    without textual price/conditions/expiry evidence is strictly REJECTED.
 * 3. [VAL_03] Negative Test: Tampered artifact hash fails validation.
 * 4. [VAL_04] Negative Test: Unapproved domain fails validation.
 * 5. [VAL_05] Negative Test: Missing mandatory schema fields fails validation.
 * 6. [VAL_06] Positive Test: Candidate marked NEEDS_RECHECK with clear rejection reason passes.
 * =============================================================================
 */
const { validateCandidate, isDomainAllowed } = require('./validate_candidate_evidence.js');
const fsModule = require('fs');
const path = require('path');
const crypto = require('crypto');
const os = require('os');

console.log('🧪 [JAYT-VALIDATOR-TEST] Khởi chạy bộ kiểm thử tính toàn vẹn và bài test âm cho Candidate Validator...');

const repoRoot = path.resolve(__dirname, '..');
const tempTestDir = fsModule.mkdtempSync(path.join(os.tmpdir(), 'jayt_val_test_'));

let allPassed = true;
function assertTest(name, condition, detail = '') {
  console.log(\`  [\${name}]: [\${condition ? 'PASS' : 'FAIL'}]\${detail ? ' - ' + detail : ''}\`);
  if (!condition) allPassed = false;
}

try {
  // Create sample artifact files
  const validTextPath = path.join(tempTestDir, 'sample_evidence.txt');
  const validTextContent = 'Metiz Cinema: Vé 2D 55.000 VNĐ cho thành viên U22 từ 01/01/2026 đến 31/12/2026.';
  fsModule.writeFileSync(validTextPath, validTextContent, 'utf8');
  const validTextHash = crypto.createHash('sha256').update(validTextContent).digest('hex');

  const validPngPath = path.join(tempTestDir, 'sample_capture.png');
  const validPngContent = Buffer.from('89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c4890000000a49444154789c636000000002000148afa4710000000049454e44ae426082', 'hex');
  fsModule.writeFileSync(validPngPath, validPngContent);
  const validPngHash = crypto.createHash('sha256').update(validPngContent).digest('hex');

  const mockDomainCatalog = [
    { domain: 'metiz.vn', is_enabled: true, emergency_kill_switch_active: false },
    { domain: 'highlandscoffee.com.vn', is_enabled: true, emergency_kill_switch_active: false },
    { domain: 'shopee.vn', is_enabled: true, emergency_kill_switch_active: false }
  ];

  // ---------------------------------------------------------------------------
  // [VAL_01] Positive Test: Fully Evidenced Candidate
  // ---------------------------------------------------------------------------
  const candidateValid = {
    candidate_id: "CAND-TEST-VALID-01",
    merchant: "Metiz Cinema Đà Nẵng",
    title: "Vé 2D 55K U22",
    category: "local_entertainment",
    category_scope: "LOCAL_EXPERIENCE",
    affiliate_type: "DIRECT_DEAL",
    source_url: "https://metiz.vn/tin-tuc/u22/",
    artifact_source_url: "https://metiz.vn/tin-tuc/u22/",
    captured_at: new Date().toISOString(),
    artifact_screenshot: path.relative(repoRoot, validPngPath).replace(/\\\\/g, '/'),
    artifact_screenshot_hash: validPngHash,
    artifact_text_dump: path.relative(repoRoot, validTextPath).replace(/\\\\/g, '/'),
    artifact_text_hash: validTextHash,
    extracted_claims: {
      price_snippet: "55.000 VNĐ",
      conditions_snippet: "thành viên U22",
      expiry_snippet: "31/12/2026"
    },
    observed_price_or_offer: "55.000 VNĐ",
    observed_conditions: "Thành viên U22",
    expiry_basis: "Đến 31/12/2026",
    verification_readiness: "READY_FOR_CEO_REVIEW"
  };

  const res1 = validateCandidate(candidateValid, { domainCatalog: mockDomainCatalog, snapshotsDir: tempTestDir });
  assertTest('VAL_01_POSITIVE_FULLY_EVIDENCED', res1.valid === true, res1.errors.join('; '));

  // ---------------------------------------------------------------------------
  // [VAL_02] Negative Test (CEO Mandate): Generic Homepage claiming READY_FOR_CEO_REVIEW
  // without textual price/conditions/expiry evidence MUST BE REJECTED
  // ---------------------------------------------------------------------------
  const emptyHomepageTextPath = path.join(tempTestDir, 'homepage_only.txt');
  const emptyHomepageContent = 'Chào mừng đến với Metiz Cinema. Trang chủ rạp chiếu phim.';
  fsModule.writeFileSync(emptyHomepageTextPath, emptyHomepageContent, 'utf8');
  const emptyHomepageHash = crypto.createHash('sha256').update(emptyHomepageContent).digest('hex');

  const candidateFakeReview = {
    candidate_id: "CAND-TEST-FAKE-REVIEW-02",
    merchant: "Metiz Cinema Đà Nẵng",
    title: "Vé 2D 55K U22 (Chưa Có Bằng Chứng)",
    category: "local_entertainment",
    category_scope: "LOCAL_EXPERIENCE",
    affiliate_type: "DIRECT_DEAL",
    source_url: "https://metiz.vn/",
    artifact_source_url: "https://metiz.vn/",
    captured_at: new Date().toISOString(),
    artifact_screenshot: path.relative(repoRoot, validPngPath).replace(/\\\\/g, '/'),
    artifact_screenshot_hash: validPngHash,
    artifact_text_dump: path.relative(repoRoot, emptyHomepageTextPath).replace(/\\\\/g, '/'),
    artifact_text_hash: emptyHomepageHash,
    extracted_claims: {
      price_snippet: "55.000 VNĐ", // Not in homepage_only.txt
      conditions_snippet: "thành viên U22", // Not in homepage_only.txt
      expiry_snippet: "31/12/2026" // Not in homepage_only.txt
    },
    observed_price_or_offer: "55.000 VNĐ",
    observed_conditions: "Thành viên U22",
    expiry_basis: "Đến 31/12/2026",
    verification_readiness: "READY_FOR_CEO_REVIEW" // Should be BLOCKED!
  };

  const res2 = validateCandidate(candidateFakeReview, { domainCatalog: mockDomainCatalog, snapshotsDir: tempTestDir });
  assertTest('VAL_02_NEGATIVE_GENERIC_HOMEPAGE_BLOCKED', res2.valid === false,
    \`Blocked with expected errors: \${res2.errors.length} error(s) found\`);

  // ---------------------------------------------------------------------------
  // [VAL_03] Negative Test: Tampered Artifact Hash
  // ---------------------------------------------------------------------------
  const candidateTamperedHash = {
    ...candidateValid,
    candidate_id: "CAND-TEST-TAMPERED-03",
    artifact_screenshot_hash: "0000000000000000000000000000000000000000000000000000000000000000"
  };
  const res3 = validateCandidate(candidateTamperedHash, { domainCatalog: mockDomainCatalog, snapshotsDir: tempTestDir });
  assertTest('VAL_03_NEGATIVE_TAMPERED_HASH_BLOCKED', res3.valid === false,
    res3.errors.find(e => e.includes('hash mismatch')) || 'Hash mismatch detected');

  // ---------------------------------------------------------------------------
  // [VAL_04] Negative Test: Unapproved Domain
  // ---------------------------------------------------------------------------
  const candidateUnapprovedDomain = {
    ...candidateValid,
    candidate_id: "CAND-TEST-UNAPPROVED-DOMAIN-04",
    source_url: "https://evil-unapproved-site.com/promo"
  };
  const res4 = validateCandidate(candidateUnapprovedDomain, { domainCatalog: mockDomainCatalog, snapshotsDir: tempTestDir });
  assertTest('VAL_04_NEGATIVE_UNAPPROVED_DOMAIN_BLOCKED', res4.valid === false,
    res4.errors.find(e => e.includes('domain_catalog')) || 'Domain rejected');

  // ---------------------------------------------------------------------------
  // [VAL_05] Negative Test: Missing Mandatory Schema Field
  // ---------------------------------------------------------------------------
  const candidateMissingField = { ...candidateValid };
  delete candidateMissingField.captured_at;
  const res5 = validateCandidate(candidateMissingField, { domainCatalog: mockDomainCatalog, snapshotsDir: tempTestDir });
  assertTest('VAL_05_NEGATIVE_MISSING_FIELD_BLOCKED', res5.valid === false,
    res5.errors.find(e => e.includes('Missing mandatory field')) || 'Schema enforced');

  // ---------------------------------------------------------------------------
  // [VAL_06] Positive Test: Candidate properly marked as NEEDS_RECHECK
  // ---------------------------------------------------------------------------
  const candidateNeedsRecheck = {
    candidate_id: "CAND-TEST-RECHECK-06",
    merchant: "Highlands Coffee",
    title: "Khuyến Mãi Highlands Coffee",
    category: "local_beverage",
    category_scope: "LOCAL_EXPERIENCE",
    affiliate_type: "DIRECT_DEAL",
    source_url: "https://highlandscoffee.com.vn/vn/tin-tuc-khuyen-mai.html",
    artifact_source_url: "https://highlandscoffee.com.vn/vn/tin-tuc-khuyen-mai.html",
    captured_at: new Date().toISOString(),
    artifact_screenshot: path.relative(repoRoot, validPngPath).replace(/\\\\/g, '/'),
    artifact_screenshot_hash: validPngHash,
    artifact_text_dump: path.relative(repoRoot, emptyHomepageTextPath).replace(/\\\\/g, '/'),
    artifact_text_hash: emptyHomepageHash,
    observed_price_or_offer: null,
    observed_conditions: null,
    expiry_basis: null,
    missing_evidence_fields: ["observed_price_or_offer", "observed_conditions", "expiry_basis"],
    rejection_reason: "INSUFFICIENT_DATA: Promotional banner does not state fixed discount price for in-store combo.",
    verification_readiness: "NEEDS_RECHECK"
  };
  const res6 = validateCandidate(candidateNeedsRecheck, { domainCatalog: mockDomainCatalog, snapshotsDir: tempTestDir });
  assertTest('VAL_06_POSITIVE_NEEDS_RECHECK_ACCEPTED', res6.valid === true, res6.errors.join('; '));

  // ---------------------------------------------------------------------------
  // [VAL_07] Negative Test: Claim Snippet Mismatch in Text Dump
  // ---------------------------------------------------------------------------
  const candidateMismatchSnippet = {
    ...candidateValid,
    candidate_id: "CAND-TEST-MISMATCH-07",
    extracted_claims: {
      price_snippet: "999.000 VNĐ", // Non-existent in validTextContent
      conditions_snippet: "thành viên U22",
      expiry_snippet: "31/12/2026"
    }
  };
  const res7 = validateCandidate(candidateMismatchSnippet, { domainCatalog: mockDomainCatalog, snapshotsDir: tempTestDir });
  assertTest('VAL_07_NEGATIVE_OFFER_TEXT_MISMATCH_BLOCKED', res7.valid === false,
    res7.errors.find(e => e.includes('Price evidence snippet not found')) || 'Snippet mismatch caught');

  // ---------------------------------------------------------------------------
  // [VAL_08] Negative Test: Subdomain Blocked when allow_subdomains is false
  // ---------------------------------------------------------------------------
  const candidateSubdomainBlocked = {
    ...candidateValid,
    candidate_id: "CAND-TEST-SUBDOMAIN-08",
    source_url: "https://promo.metiz.vn/"
  };
  const res8 = validateCandidate(candidateSubdomainBlocked, { domainCatalog: mockDomainCatalog, snapshotsDir: tempTestDir });
  assertTest('VAL_08_NEGATIVE_SUBDOMAIN_BLOCKED', res8.valid === false,
    res8.errors.find(e => e.includes('domain_catalog')) || 'Subdomain rejected');

  // ---------------------------------------------------------------------------
  // [VAL_09] Negative Test: Shell Injection Prevention
  // ---------------------------------------------------------------------------
  const candidateShellInjection = {
    ...candidateValid,
    candidate_id: "CAND-TEST-SHELL-09",
    source_url: "https://example.com/promo\\\"; echo 'HACKED' > hacked.txt; \\\""
  };
  const res9 = validateCandidate(candidateShellInjection, { domainCatalog: mockDomainCatalog, snapshotsDir: tempTestDir });
  assertTest('VAL_09_NEGATIVE_SHELL_INJECTION_BLOCKED', res9.valid === false, 
    res9.errors.find(e => e.includes('domain is not approved')) || 'Shell injection blocked');

  const hackedFile = path.join(__dirname, 'hacked.txt');
  if (fsModule.existsSync(hackedFile)) {
    console.error('  [VAL_09] CRITICAL FAILURE: Shell injection was executed!');
    fsModule.unlinkSync(hackedFile);
    allPassed = false;
  }

} finally {
  fsModule.rmSync(tempTestDir, { recursive: true, force: true });
}

// --- Summary ---
console.log('\\n' + (allPassed ? '🟢' : '❌') + ' [VALIDATOR-TEST-SUMMARY] Toàn bộ ' + (allPassed ? '9/9' : 'bài') + ' kiểm thử validator (bao gồm Negative Tests) đã ' + (allPassed ? 'ĐẠT [PASS]' : 'THẤT BẠI [FAIL]') + '!');
if (!allPassed) {
  process.exit(1);
} else {
  process.exit(0);
}
`;
fs.writeFileSync('test_candidate_evidence_validator.js', content);
