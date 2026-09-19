/**
 * JAYT GALAXY CLAIM BOUND CORRECTION TEST SUITE (061D)
 * Directive: JAYT-GALAXY-CLAIM-BOUND-CORRECTION-061D / JAYT-PROJECT-MEMORY-TRANSACTION-057
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');

const correction061cPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'correction_receipt_061c_galaxy_happy_day.json');
const correction061dPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'correction_receipt_061d_galaxy_happy_day.json');
const reviewSheet061dPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'GALAXY_HAPPY_DAY_MANUAL_REVIEW_SHEET_061D.md');

const receipt058Path = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_058_first_cadence_observation', 'receipt.json');
const receipt058aPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_058a_cadence_receipt_lineage', 'receipt.json');
const receipt058bPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_058b_trigger_provenance_correction', 'receipt.json');
const receipt060Path = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_060_manual_bootstrap', 'receipt.json');
const receipt060bPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_060b_manual_bootstrap', 'receipt.json');
const receipt060cPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_060c_manual_bootstrap', 'receipt.json');
const receipt061Path = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_061_deep_promo_sweep', 'receipt.json');
const receipt061aPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_061a_deep_url_discovery', 'receipt.json');
const receipt061bPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_061b_discovery_provenance_remediation', 'receipt.json');
const receipt061cPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_061c_discovery_truth_closure', 'receipt.json');

const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

const EXPECTED_PROD_HASH = '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945';

let passedTests = 0;
let totalTests = 0;

function assertTest(testId, condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  [${testId}]: [PASS] - ${message}`);
  } else {
    console.error(`  [${testId}]: [FAIL] - ${message}`);
  }
}

function getSha256(strOrBuf) {
  if (!strOrBuf) return null;
  return crypto.createHash('sha256').update(strOrBuf).digest('hex');
}

/**
 * Validates a claim-bound correction receipt against physical artifacts on disk.
 */
function validateClaimBoundCorrectionReceipt061D(receipt, customRepoRoot = repoRoot) {
  if (!receipt || typeof receipt !== 'object') {
    return { valid: false, reason: 'INVALID_RECEIPT_OBJECT' };
  }

  const requiredFields = [
    'work_order',
    'dossier_id',
    'brand_id',
    'source_url',
    'captured_at',
    'recheck_due_at',
    'ttl_rule',
    'verified_claims',
    'artifacts'
  ];

  for (const f of requiredFields) {
    if (receipt[f] === undefined || receipt[f] === null) {
      return { valid: false, reason: `MISSING_REQUIRED_FIELD: ${f}` };
    }
  }

  // 1. Verify Recheck Due Date (Must be captured_at + 7 days max)
  const capMs = new Date(receipt.captured_at).getTime();
  const dueMs = new Date(receipt.recheck_due_at).getTime();
  const maxAllowedDueMs = capMs + (7 * 24 * 60 * 60 * 1000);

  if (isNaN(capMs) || isNaN(dueMs)) {
    return { valid: false, reason: 'INVALID_TIMESTAMP_FORMAT' };
  }

  if (dueMs > maxAllowedDueMs || dueMs <= capMs) {
    return {
      valid: false,
      reason: `INVALID_RECHECK_DUE_AT: recheck_due_at '${receipt.recheck_due_at}' exceeds maximum 7-day TTL from captured_at '${receipt.captured_at}'`
    };
  }

  // 2. Verify Artifacts Exist and Hash Matches
  if (!receipt.artifacts || !receipt.artifacts.text_path) {
    return { valid: false, reason: 'MISSING_TEXT_ARTIFACT_DECLARATION' };
  }

  const txtAbsPath = path.resolve(customRepoRoot, receipt.artifacts.text_path);
  if (!fs.existsSync(txtAbsPath)) {
    return { valid: false, reason: `TEXT_ARTIFACT_NOT_FOUND: ${receipt.artifacts.text_path}` };
  }

  const rawText = fs.readFileSync(txtAbsPath, 'utf8');
  const measuredSha = getSha256(rawText);
  if (measuredSha !== receipt.artifacts.text_sha256) {
    return {
      valid: false,
      reason: `TEXT_ARTIFACT_HASH_MISMATCH: Measured '${measuredSha}' != declared '${receipt.artifacts.text_sha256}'`
    };
  }

  // 3. Verify Every Single Claim Against Verbatim Text & Offsets
  if (!Array.isArray(receipt.verified_claims) || receipt.verified_claims.length === 0) {
    return { valid: false, reason: 'EMPTY_VERIFIED_CLAIMS_ARRAY' };
  }

  for (let i = 0; i < receipt.verified_claims.length; i++) {
    const claim = receipt.verified_claims[i];
    if (!claim.verbatim_quote || claim.character_offset_start === undefined || claim.character_offset_end === undefined) {
      return {
        valid: false,
        reason: `CLAIM_MISSING_VERBATIM_QUOTE_OR_OFFSET: Claim index ${i} lacks verbatim_quote or character_offset`
      };
    }

    // Check if unobserved street address is illegally injected
    if (claim.unobserved_address_declared !== null && claim.unobserved_address_declared !== undefined) {
      return {
        valid: false,
        reason: `UNOBSERVED_ADDRESS_INJECTION_DETECTED: Claim index ${i} illegally declared unobserved address '${claim.unobserved_address_declared}'`
      };
    }

    // Check if mandatory membership requirement is falsely claimed
    if (claim.mandatory_membership_required === true) {
      return {
        valid: false,
        reason: `FALSE_MANDATORY_MEMBERSHIP_CLAIM: Source text states 'tất cả khách hàng'. Cannot mandate membership.`
      };
    }

    // Verify verbatim quote presence in text artifact
    if (!rawText.includes(claim.verbatim_quote)) {
      return {
        valid: false,
        reason: `VERBATIM_QUOTE_NOT_FOUND_IN_ARTIFACT: Quote '${claim.verbatim_quote}' does not exist in artifact text`
      };
    }

    // Verify character offset accuracy
    const extractedSlice = rawText.substring(claim.character_offset_start, claim.character_offset_end);
    if (extractedSlice !== claim.verbatim_quote) {
      return {
        valid: false,
        reason: `CHARACTER_OFFSET_MISMATCH: Slice at [${claim.character_offset_start}, ${claim.character_offset_end}] ('${extractedSlice}') != quote '${claim.verbatim_quote}'`
      };
    }
  }

  return { valid: true };
}

function run061dTests() {
  console.log('🧪 [JAYT-GALAXY-061D-TEST] Khởi chạy bộ kiểm thử Claim-Bound Correction & 7-Day TTL (061D)...');

  // Load physical 061D correction receipt
  const receipt061d = JSON.parse(fs.readFileSync(correction061dPath, 'utf8'));

  // 1. Positive: Valid 061D Correction Receipt Passes
  const res1 = validateClaimBoundCorrectionReceipt061D(receipt061d, repoRoot);
  assertTest('T1_01_VALID_061D_CLAIM_BOUND_CORRECTION_PASSES',
    res1.valid,
    'Hồ sơ correction 061D đạt chuẩn claim-bound 100%: Mọi quote, offset, hash và TTL 7 ngày đều chính xác tuyệt đối.');

  // 2. Negative: Unobserved Street Address Injection Rejected
  const tamperedAddressReceipt = {
    ...receipt061d,
    verified_claims: receipt061d.verified_claims.map(c => {
      if (c.claim_type === 'PRICING_AND_LOCATION_BRANCH_1') {
        return { ...c, unobserved_address_declared: '478 Điện Biên Phủ, Thanh Khê, Đà Nẵng' };
      }
      return c;
    })
  };
  const res2 = validateClaimBoundCorrectionReceipt061D(tamperedAddressReceipt, repoRoot);
  assertTest('T1_02_NEGATIVE_UNOBSERVED_ADDRESS_INJECTION_REJECTED',
    !res2.valid && res2.reason.includes('UNOBSERVED_ADDRESS_INJECTION_DETECTED'),
    `Chặn đứng hành vi tự chèn địa chỉ đường phố không quan sát được: [${res2.reason}].`);

  // 3. Negative: Invented Mandatory Membership Requirement Rejected
  const tamperedMembershipReceipt = {
    ...receipt061d,
    verified_claims: receipt061d.verified_claims.map(c => {
      if (c.claim_type === 'SCHEDULE_AND_ELIGIBILITY') {
        return { ...c, mandatory_membership_required: true };
      }
      return c;
    })
  };
  const res3 = validateClaimBoundCorrectionReceipt061D(tamperedMembershipReceipt, repoRoot);
  assertTest('T1_03_NEGATIVE_INVENTED_MEMBERSHIP_REQUIREMENT_REJECTED',
    !res3.valid && res3.reason.includes('FALSE_MANDATORY_MEMBERSHIP_CLAIM'),
    `Chặn đứng hành vi suy diễn bắt buộc thẻ thành viên khi văn bản ghi 'tất cả khách hàng': [${res3.reason}].`);

  // 4. Negative: Missing Verbatim Quote or Offset Rejected
  const missingOffsetReceipt = {
    ...receipt061d,
    verified_claims: receipt061d.verified_claims.map((c, idx) => {
      if (idx === 0) {
        const copy = { ...c };
        delete copy.character_offset_start;
        return copy;
      }
      return c;
    })
  };
  const res4 = validateClaimBoundCorrectionReceipt061D(missingOffsetReceipt, repoRoot);
  assertTest('T1_04_NEGATIVE_MISSING_VERBATIM_QUOTE_OR_OFFSET_REJECTED',
    !res4.valid && res4.reason.includes('CLAIM_MISSING_VERBATIM_QUOTE_OR_OFFSET'),
    `Chặn đứng claim thiếu trích dẫn nguyên văn hoặc offset: [${res4.reason}].`);

  // 5. Negative: Tampered Artifact Hash Rejected
  const tamperedHashReceipt = {
    ...receipt061d,
    artifacts: {
      ...receipt061d.artifacts,
      text_sha256: '0000000000000000000000000000000000000000000000000000000000000000'
    }
  };
  const res5 = validateClaimBoundCorrectionReceipt061D(tamperedHashReceipt, repoRoot);
  assertTest('T1_05_NEGATIVE_TAMPERED_ARTIFACT_HASH_REJECTED',
    !res5.valid && res5.reason.includes('TEXT_ARTIFACT_HASH_MISMATCH'),
    `Chặn đứng sai lệch mã băm SHA-256 của tệp artifact: [${res5.reason}].`);

  // 6. Negative: Missing or Exceeded Recheck Due Date Rejected
  const overdueTtlReceipt = {
    ...receipt061d,
    recheck_due_at: '2026-09-30T00:00:00.000Z' // 38 days later (exceeds 7 days)
  };
  const res6 = validateClaimBoundCorrectionReceipt061D(overdueTtlReceipt, repoRoot);
  assertTest('T1_06_NEGATIVE_MISSING_RECHECK_DUE_AT_OR_OVER_7_DAYS_REJECTED',
    !res6.valid && res6.reason.includes('INVALID_RECHECK_DUE_AT'),
    `Chặn đứng hạn recheck vượt quá 7 ngày quy định cho nguồn không nêu hạn: [${res6.reason}].`);

  // 7. Positive: Rolling 7-Day Expiration Exactly Validated
  const capMs = new Date(receipt061d.captured_at).getTime();
  const dueMs = new Date(receipt061d.recheck_due_at).getTime();
  const diffDays = (dueMs - capMs) / (1000 * 60 * 60 * 24);
  assertTest('T1_07_ROLLING_7_DAY_EXPIRATION_VALIDATED',
    diffDays === 7,
    `Thời hạn kiểm tra lại được định lượng chuẩn xác đúng 7 ngày (${diffDays} ngày) từ thời điểm capture.`);

  // 8. Positive: Correction 061C and 061D Preserved Independently
  const cExists = fs.existsSync(correction061cPath);
  const dExists = fs.existsSync(correction061dPath);
  let differentContents = false;
  if (cExists && dExists) {
    const rawC = fs.readFileSync(correction061cPath, 'utf8');
    const rawD = fs.readFileSync(correction061dPath, 'utf8');
    differentContents = rawC !== rawD;
  }
  assertTest('T1_08_CORRECTION_061C_AND_061D_INDEPENDENTLY_PRESERVED',
    cExists && dExists && differentContents,
    'Cả hai correction receipt 061C và 061D tồn tại độc lập trên đĩa, không bị ghi đè append-only.');

  // 9. Historical Runs Preserved
  const allHistoricalExist = fs.existsSync(receipt058Path) &&
                             fs.existsSync(receipt058aPath) &&
                             fs.existsSync(receipt058bPath) &&
                             fs.existsSync(receipt060Path) &&
                             fs.existsSync(receipt060bPath) &&
                             fs.existsSync(receipt060cPath) &&
                             fs.existsSync(receipt061Path) &&
                             fs.existsSync(receipt061aPath) &&
                             fs.existsSync(receipt061bPath) &&
                             fs.existsSync(receipt061cPath);
  assertTest('T1_09_HISTORICAL_RUNS_PRESERVED_INCLUDING_061C',
    allHistoricalExist,
    'Toàn bộ các run receipt lịch sử (058, 058A, 058B, 060, 060B, 060C, 061, 061A, 061B, 061C) được bảo tồn 100% append-only.');

  // 10. Invariant: Production Locked
  const prodRaw = fs.readFileSync(prodFeedPath, 'utf8');
  const prodFeed = JSON.parse(prodRaw);
  const prodSha = getSha256(prodRaw);
  const releaseManifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
  const isApproved = releaseManifest.governance_locks?.immutable_ceo_approval_record?.is_approved === true;

  const isLocked = prodFeed.length === 0 &&
                   !isApproved &&
                   prodSha === EXPECTED_PROD_HASH;

  assertTest('INVARIANT_10_PRODUCTION_LOCKED',
    isLocked,
    `Production feed duy trì bất biến [] (SHA-256: ${prodSha}) và RELEASE_MANIFEST is_approved: false (LOCKED)`);

  console.log(`\n🟢 [GALAXY-061D-SUMMARY] TOÀN BỘ ${passedTests}/${totalTests} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);

  if (passedTests !== totalTests) {
    process.exit(1);
  }
}

if (require.main === module) {
  run061dTests();
}

module.exports = {
  validateClaimBoundCorrectionReceipt061D,
  run061dTests
};
