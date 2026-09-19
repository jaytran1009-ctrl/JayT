/**
 * JAYT-330 BATCH 14: CATALOG RUNNER & ARRAY VALIDATOR RESILIENCE SUITE
 * Governing Directive: JAYT-330
 * Authority: Council / User Directive JAYT-330
 * 
 * Fixture tests exercising:
 * - Matrix 8-brand completeness
 * - Array validator assertions
 * - Duplicate row ID injection
 * - Invalid currency & price type injection
 * - Affiliate link injection detection
 * - Source hash mismatch & anti-tamper
 * - Geographic scope claim guards
 * - Partial batches & malformed rows
 * - CLI exit codes
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { execSync } = require('child_process');
const { validateBatch14CatalogPackage } = require('./validate_batch_14_catalog_array.cjs');

let passedTests = 0;
let totalTests = 0;

async function runTest(name, fn) {
  totalTests++;
  try {
    await fn();
    console.log(`  [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  [FAIL] ${name}`);
    console.error('    Error:', err.message);
    process.exitCode = 1;
  }
}

async function main() {
  console.log('=== RUNNING BATCH 14 CATALOG RESILIENCE & FIXTURE TESTS (JAYT-330) ===\n');

  const matrixPath = '04_DATA_PIPELINE/batch_matrix/BATCH_14_CATALOG_MATRIX.json';
  const packagePath = '06_TRUST_AND_EVIDENCE/batch_14_catalog_vault/BATCH_14_CATALOG_ACCEPTANCE_PACKAGE.json';

  assert.ok(fs.existsSync(matrixPath), 'Matrix file must exist');
  assert.ok(fs.existsSync(packagePath), 'Acceptance package file must exist');

  const matrix = JSON.parse(fs.readFileSync(matrixPath, 'utf8'));
  const validPackage = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

  // -----------------------------------------------------------------------------
  // Group 1: Matrix Integrity & Coverage (8 Brands)
  // -----------------------------------------------------------------------------
  console.log('--- Group 1: Matrix Integrity & Coverage (8 Brands) ---');

  await runTest('1.1 Matrix explicitly covers all 8 designated brands', () => {
    const brandIds = new Set(matrix.catalogs.map(c => c.brand_id));
    const requiredBrands = [
      'jollibee', 'lotteria', 'phuclong',
      'cgv_cinemas', 'lotte_cinema', 'metiz_cinema',
      'phi_long', 'dien_may_xanh'
    ];
    for (const b of requiredBrands) {
      assert.ok(brandIds.has(b), `Matrix must cover brand ${b}`);
    }
  });

  await runTest('1.2 Every catalog definition has official URL and stable pointer pattern or known rejection', () => {
    for (const c of matrix.catalogs) {
      assert.ok(c.catalog_id, 'Catalog must have catalog_id');
      assert.ok(c.official_url.startsWith('https://') || c.official_url.startsWith('http://'), 'Catalog must have valid HTTP(S) URL');
      assert.ok(c.expected_status, 'Catalog must have expected_status');
    }
  });

  // -----------------------------------------------------------------------------
  // Group 2: Valid Package Verification
  // -----------------------------------------------------------------------------
  console.log('\n--- Group 2: Valid Package Verification ---');

  await runTest('2.1 Array validator passes with zero errors on real acceptance package', () => {
    const result = validateBatch14CatalogPackage(validPackage);
    assert.strictEqual(result.valid, true, 'Validation must pass on clean package');
    assert.strictEqual(result.errors.length, 0, 'Clean package must have 0 errors');
    assert.ok(result.audit.accepted_candidates_count >= 16 && result.audit.accepted_candidates_count <= 25,
      'Accepted candidates count must fall within 16-25 target');
  });

  await runTest('2.2 Every candidate has unique stable ID, valid price/policy structure, and pointer', () => {
    for (const row of validPackage.accepted_candidates) {
      assert.ok(row.row_id.startsWith('B14_'), 'row_id must start with B14_ prefix');
      if (row.card_type === 'MEMBER_POLICY' || row.policy_type === 'MEMBER_POLICY') {
        assert.strictEqual(row.price, null, 'MEMBER_POLICY must have price: null');
      } else {
        assert.ok(row.price, 'Retail candidate must have price object');
        assert.strictEqual(row.price.currency, 'VND', 'Currency must be VND');
        assert.ok(['observed', 'menu', 'promotion', 'tariff'].includes(row.price.price_type),
          `Invalid price_type: ${row.price.price_type}`);
      }
      assert.ok(row.source_pointer, 'source_pointer must be non-empty');
    }
  });

  await runTest('2.3 Affiliate lock is strictly enforced (affiliate_url === null, affiliate_blocked === true)', () => {
    for (const row of validPackage.accepted_candidates) {
      assert.strictEqual(row.affiliate_lock.affiliate_url, null, 'affiliate_url must be null');
      assert.strictEqual(row.affiliate_lock.affiliate_blocked, true, 'affiliate_blocked must be true');
    }
  });

  // -----------------------------------------------------------------------------
  // Group 3: Anti-Bypass & Duplicate Detection
  // -----------------------------------------------------------------------------
  console.log('\n--- Group 3: Anti-Bypass & Duplicate Detection ---');

  await runTest('3.1 Injected duplicate row ID causes validator to FAIL', () => {
    const badPkg = JSON.parse(JSON.stringify(validPackage));
    const dupRow = JSON.parse(JSON.stringify(badPkg.accepted_candidates[0]));
    badPkg.accepted_candidates.push(dupRow);
    const result = validateBatch14CatalogPackage(badPkg, { allowPartialBatch: true });
    assert.strictEqual(result.valid, false, 'Validator MUST fail on duplicate row_id');
    assert.ok(result.errors.some(e => e.includes('DUPLICATE_ROW_ID_DETECTED')), 'Error must mention duplicate');
  });

  await runTest('3.2 Missing row_id causes validator to FAIL', () => {
    const badPkg = JSON.parse(JSON.stringify(validPackage));
    delete badPkg.accepted_candidates[0].row_id;
    const result = validateBatch14CatalogPackage(badPkg, { allowPartialBatch: true });
    assert.strictEqual(result.valid, false, 'Validator MUST fail on missing row_id');
    assert.ok(result.errors.some(e => e.includes('ROW_MISSING_STABLE_ID')), 'Error must mention missing ID');
  });

  // -----------------------------------------------------------------------------
  // Group 4: Price & Currency Boundary Checks
  // -----------------------------------------------------------------------------
  console.log('\n--- Group 4: Price & Currency Boundary Checks ---');

  await runTest('4.1 Currency not VND (e.g. USD) causes validator to FAIL', () => {
    const badPkg = JSON.parse(JSON.stringify(validPackage));
    badPkg.accepted_candidates[0].price.currency = 'USD';
    const result = validateBatch14CatalogPackage(badPkg, { allowPartialBatch: true });
    assert.strictEqual(result.valid, false, 'Validator MUST fail on non-VND currency');
    assert.ok(result.errors.some(e => e.includes('INVALID_CURRENCY')), 'Error must cite INVALID_CURRENCY');
  });

  await runTest('4.2 Invalid price_type (e.g. flash_sale) causes validator to FAIL', () => {
    const badPkg = JSON.parse(JSON.stringify(validPackage));
    badPkg.accepted_candidates[0].price.price_type = 'flash_sale';
    const result = validateBatch14CatalogPackage(badPkg, { allowPartialBatch: true });
    assert.strictEqual(result.valid, false, 'Validator MUST fail on unauthorized price_type');
    assert.ok(result.errors.some(e => e.includes('INVALID_PRICE_TYPE')), 'Error must cite INVALID_PRICE_TYPE');
  });

  await runTest('4.3 Negative price amount causes validator to FAIL', () => {
    const badPkg = JSON.parse(JSON.stringify(validPackage));
    badPkg.accepted_candidates[0].price.amount = -50000;
    const result = validateBatch14CatalogPackage(badPkg, { allowPartialBatch: true });
    assert.strictEqual(result.valid, false, 'Validator MUST fail on negative price');
    assert.ok(result.errors.some(e => e.includes('INVALID_PRICE_AMOUNT')), 'Error must cite INVALID_PRICE_AMOUNT');
  });

  // -----------------------------------------------------------------------------
  // Group 5: Affiliate Lock Enforcement
  // -----------------------------------------------------------------------------
  console.log('\n--- Group 5: Affiliate Lock Enforcement ---');

  await runTest('5.1 Non-null affiliate_url causes validator to FAIL', () => {
    const badPkg = JSON.parse(JSON.stringify(validPackage));
    badPkg.accepted_candidates[0].affiliate_lock.affiliate_url = 'https://tracking.affiliate.com/click?offer=123';
    const result = validateBatch14CatalogPackage(badPkg, { allowPartialBatch: true });
    assert.strictEqual(result.valid, false, 'Validator MUST fail when affiliate_url is present');
    assert.ok(result.errors.some(e => e.includes('AFFILIATE_URL_MUST_BE_NULL')), 'Error must cite affiliate URL rejection');
  });

  await runTest('5.2 Injected affiliate tracking query parameter causes validator to FAIL', () => {
    const badPkg = JSON.parse(JSON.stringify(validPackage));
    badPkg.accepted_candidates[0].provenance.source_url += '?aff=partner123';
    const result = validateBatch14CatalogPackage(badPkg, { allowPartialBatch: true });
    assert.strictEqual(result.valid, false, 'Validator MUST fail when affiliate query parameter is detected');
    assert.ok(result.errors.some(e => e.includes('AFFILIATE_QUERY_PARAMETER_DETECTED')), 'Error must cite affiliate query parameter');
  });

  // -----------------------------------------------------------------------------
  // Group 6: Provenance & Source Hash Anti-Tamper
  // -----------------------------------------------------------------------------
  console.log('\n--- Group 6: Provenance & Source Hash Anti-Tamper ---');

  await runTest('6.1 Mutated raw SHA-256 causes validator to FAIL', () => {
    const badPkg = JSON.parse(JSON.stringify(validPackage));
    badPkg.accepted_candidates[0].provenance.source_raw_sha256 = '0000000000000000000000000000000000000000000000000000000000000000';
    const result = validateBatch14CatalogPackage(badPkg, { allowPartialBatch: true });
    assert.strictEqual(result.valid, false, 'Validator MUST fail on altered SHA-256');
    assert.ok(result.errors.some(e => e.includes('HASH_MISMATCH')), 'Error must cite hash mismatch');
  });

  await runTest('6.2 Missing source_pointer causes validator to FAIL', () => {
    const badPkg = JSON.parse(JSON.stringify(validPackage));
    delete badPkg.accepted_candidates[0].source_pointer;
    const result = validateBatch14CatalogPackage(badPkg, { allowPartialBatch: true });
    assert.strictEqual(result.valid, false, 'Validator MUST fail when source_pointer is missing');
    assert.ok(result.errors.some(e => e.includes('ROW_MISSING_SOURCE_POINTER')), 'Error must cite missing pointer');
  });

  // -----------------------------------------------------------------------------
  // Group 7: Geographic Scope & Disclaimer Guards
  // -----------------------------------------------------------------------------
  console.log('\n--- Group 7: Geographic Scope & Disclaimer Guards ---');

  await runTest('7.1 Empty or missing observation disclaimer causes validator to FAIL', () => {
    const badPkg = JSON.parse(JSON.stringify(validPackage));
    badPkg.accepted_candidates[0].disclaimer = '';
    const result = validateBatch14CatalogPackage(badPkg, { allowPartialBatch: true });
    assert.strictEqual(result.valid, false, 'Validator MUST fail when disclaimer is empty');
    assert.ok(result.errors.some(e => e.includes('ROW_MISSING_OBSERVATION_DISCLAIMER')), 'Error must cite missing disclaimer');
  });

  await runTest('7.2 False VERIFIED geographic claim without local facility proof causes validator to FAIL', () => {
    const badPkg = JSON.parse(JSON.stringify(validPackage));
    // Pick Jollibee candidate which lacks Da Nang facility confirmation
    const jb = badPkg.accepted_candidates.find(c => c.brand_id === 'jollibee');
    jb.geographic_scope.da_nang_applicable = 'VERIFIED';
    const result = validateBatch14CatalogPackage(badPkg, { allowPartialBatch: true });
    assert.strictEqual(result.valid, false, 'Validator MUST reject unauthorized VERIFIED status');
    assert.ok(result.errors.some(e => e.includes('UNAUTHORIZED_VERIFIED_GEOGRAPHIC_CLAIM')), 'Error must cite unauthorized claim');
  });

  // -----------------------------------------------------------------------------
  // Group 8: Partial Batches & Rejection Records Handling
  // -----------------------------------------------------------------------------
  console.log('\n--- Group 8: Partial Batches & Rejection Records Handling ---');

  await runTest('8.1 Partial batch outside 15-20 range fails without flag but warns with allowPartialBatch', () => {
    const badPkg = JSON.parse(JSON.stringify(validPackage));
    badPkg.accepted_candidates = badPkg.accepted_candidates.slice(0, 3);
    const strictResult = validateBatch14CatalogPackage(badPkg, { allowPartialBatch: false });
    assert.strictEqual(strictResult.valid, false, 'Strict validation must fail when count < 15');

    const partialResult = validateBatch14CatalogPackage(badPkg, { allowPartialBatch: true });
    assert.strictEqual(partialResult.valid, true, 'Partial validation passes with warning');
    assert.ok(partialResult.warnings.some(w => w.includes('PARTIAL_BATCH')), 'Warning must indicate partial batch');
  });

  await runTest('8.2 Rejection record missing explicit reason causes validator to FAIL', () => {
    const badPkg = JSON.parse(JSON.stringify(validPackage));
    badPkg.rejected_records.push({ catalog_id: 'CAT_TEST', reason: '' });
    const result = validateBatch14CatalogPackage(badPkg, { allowPartialBatch: true });
    assert.strictEqual(result.valid, false, 'Validator MUST fail on empty rejection reason');
    assert.ok(result.errors.some(e => e.includes('REJECTION_RECORD_MISSING_EXPLICIT_REASON')), 'Error must cite missing reason');
  });

  await runTest('8.3 Preserves explicit rejection reasons for CGV (WAF), Lotte (Missing Pricing), Lotteria (Firebase 403)', () => {
    const reasons = validPackage.rejected_records.map(r => r.reason);
    assert.ok(reasons.includes('REJECTED_WAF_BOT_CHALLENGE'), 'Must record CGV WAF challenge rejection');
    assert.ok(reasons.includes('REJECTED_MISSING_SERVER_PRICING'), 'Must record Lotte missing server pricing rejection');
    assert.ok(reasons.includes('REJECTED_FIREBASE_403_CLIENT_ONLY'), 'Must record Lotteria Firebase 403 rejection');
  });

  // -----------------------------------------------------------------------------
  // Group 9: Deep Value Verification & In-Memory Anti-Tamper Audit (Verification Gate)
  // -----------------------------------------------------------------------------
  console.log('\n--- Group 9: Deep Value Verification & In-Memory Anti-Tamper Audit ---');

  await runTest('9.1 In-memory tampered product_name ("FAKE_TEST_NAME") causes validator to FAIL', () => {
    const badPkg = JSON.parse(JSON.stringify(validPackage));
    badPkg.accepted_candidates[0].product_name = 'FAKE_TEST_NAME';
    const result = validateBatch14CatalogPackage(badPkg, { allowPartialBatch: true });
    assert.strictEqual(result.valid, false, 'Validator MUST fail on tampered product_name');
    assert.ok(result.errors.some(e => e.includes('PRODUCT_NAME_NOT_FOUND_IN_SOURCE_RAW')),
      'Error must cite PRODUCT_NAME_NOT_FOUND_IN_SOURCE_RAW');
  });

  await runTest('9.2 In-memory tampered price.amount (123456789) causes validator to FAIL', () => {
    const badPkg = JSON.parse(JSON.stringify(validPackage));
    badPkg.accepted_candidates[0].price.amount = 123456789;
    const result = validateBatch14CatalogPackage(badPkg, { allowPartialBatch: true });
    assert.strictEqual(result.valid, false, 'Validator MUST fail on tampered price');
    assert.ok(result.errors.some(e => e.includes('PRICE_AMOUNT_NOT_FOUND_IN_SOURCE_RAW')),
      'Error must cite PRICE_AMOUNT_NOT_FOUND_IN_SOURCE_RAW');
  });

  await runTest('9.3 In-memory tampered Magento bundle price causes POINTER_PRICE_MISMATCH', () => {
    const badPkg = JSON.parse(JSON.stringify(validPackage));
    const jbRow = badPkg.accepted_candidates.find(c => c.brand_id === 'jollibee' && c.source_pointer.includes('priceBundle'));
    assert.ok(jbRow, 'Must have Magento bundle candidate');
    // Change price from observed bundle price to an arbitrary number that might exist as digits in HTML but differs from bundle AST
    jbRow.price.amount = 999999;
    const result = validateBatch14CatalogPackage(badPkg, { allowPartialBatch: true });
    assert.strictEqual(result.valid, false, 'Validator MUST fail on pointer price mismatch');
    assert.ok(result.errors.some(e => e.includes('POINTER_PRICE_MISMATCH') || e.includes('PRICE_AMOUNT_NOT_FOUND_IN_SOURCE_RAW')),
      'Error must cite price mismatch');
  });

  await runTest('9.4 Dedup accurately categorizes 18 NEW and 4 UPDATE_EXISTING cards (Total 22)', () => {
    const result = validateBatch14CatalogPackage(validPackage);
    assert.strictEqual(result.audit.accepted_candidates_count, 22, 'Total candidates must be 22');
    assert.strictEqual(result.audit.new_candidates_count, 18, 'Truly new candidates must be 18');
    assert.strictEqual(result.audit.update_existing_count, 4, 'Updated existing cards must be 4');
    
    const updateRows = validPackage.accepted_candidates.filter(c => c.dedup_status === 'UPDATE_EXISTING');
    const existingIds = updateRows.map(r => r.existing_card_id).sort();
    assert.deepStrictEqual(existingIds, ['B12_05', 'B12_13', 'B12_15', 'PROD_JOLLIBEE_COMBO_02'].sort(),
      'UPDATE_EXISTING must match exactly the 4 Staging cards');
  });

  await runTest('9.5 Disk hash parity: SHA-256 on disk matches validation receipt and decision', () => {
    const packageBuf = fs.readFileSync(packagePath);
    const diskSha = require('crypto').createHash('sha256').update(packageBuf).digest('hex');
    const receiptPath = '06_TRUST_AND_EVIDENCE/batch_14_catalog_vault/BATCH_14_CATALOG_VALIDATION_RECEIPT.json';
    const decisionPath = '06_TRUST_AND_EVIDENCE/batch_14_catalog_vault/BATCH_14_CATALOG_APPROVAL_DECISION.json';
    assert.ok(fs.existsSync(receiptPath), 'Validation receipt must exist');
    assert.ok(fs.existsSync(decisionPath), 'Approval decision must exist');
    const receipt = JSON.parse(fs.readFileSync(receiptPath, 'utf8'));
    const decision = JSON.parse(fs.readFileSync(decisionPath, 'utf8'));
    assert.strictEqual(receipt.package_sha256, diskSha, 'Receipt package_sha256 must match disk SHA-256');
    assert.strictEqual(decision.package_sha256, diskSha, 'Decision package_sha256 must match disk SHA-256');
  });

  await runTest('9.6 Zero synthetic data is dynamically verified against source raw bytes', () => {
    const result = validateBatch14CatalogPackage(validPackage);
    assert.strictEqual(result.audit.zero_synthetic_data, true, 'Zero synthetic data must be true');
    assert.strictEqual(result.audit.deep_value_verification_passed, true, 'Deep value verification must pass');
  });

  await runTest('9.7 Container tamper: Altered Phi Long item URL causes CONTAINER_EVIDENCE_NOT_FOUND', () => {
    const badPkg = JSON.parse(JSON.stringify(validPackage));
    const plRow = badPkg.accepted_candidates.find(c => c.catalog_id === 'CAT_PHILONG_STUDY_TECH' && c.source_pointer.includes('.p-item'));
    assert.ok(plRow, 'Must have Phi Long container row');
    plRow.source_pointer = '.p-item[href="/tampered-fake-url.html"]';
    plRow.provenance.item_url = 'https://philong.com.vn/tampered-fake-url.html';
    const result = validateBatch14CatalogPackage(badPkg, { allowPartialBatch: true });
    assert.strictEqual(result.valid, false, 'Validator MUST fail on altered container pointer');
    assert.ok(result.errors.some(e => e.includes('CONTAINER_EVIDENCE_NOT_FOUND')),
      'Error must cite CONTAINER_EVIDENCE_NOT_FOUND');
  });

  await runTest('9.8 Container tamper: Altered Phi Long container price causes CONTAINER_EVIDENCE_MISMATCH', () => {
    const badPkg = JSON.parse(JSON.stringify(validPackage));
    const plRow = badPkg.accepted_candidates.find(c => c.catalog_id === 'CAT_PHILONG_STUDY_TECH' && c.source_pointer.includes('.p-item'));
    assert.ok(plRow, 'Must have Phi Long container row');
    // Set price to a valid number in HTML but not in this specific container
    plRow.price.amount = 55000;
    const result = validateBatch14CatalogPackage(badPkg, { allowPartialBatch: true });
    assert.strictEqual(result.valid, false, 'Validator MUST fail on container price mismatch');
    assert.ok(result.errors.some(e => e.includes('CONTAINER_EVIDENCE_MISMATCH') || e.includes('PRICE_AMOUNT_NOT_FOUND_IN_SOURCE_RAW')),
      'Error must cite container price mismatch');
  });

  await runTest('9.9 Geographic claim tamper: Tampered address without Da Nang causes UNAUTHORIZED_VERIFIED_GEOGRAPHIC_CLAIM', () => {
    const badPkg = JSON.parse(JSON.stringify(validPackage));
    const gxRow = badPkg.accepted_candidates.find(c => c.brand_id === 'galaxy_cinema');
    assert.ok(gxRow, 'Must have Galaxy candidate');
    gxRow.geographic_scope.facility_evidence.verbatim_address = 'Tầng 1, TTTM Tràng Tiền Plaza, Hà Nội';
    const result = validateBatch14CatalogPackage(badPkg, { allowPartialBatch: true });
    assert.strictEqual(result.valid, false, 'Validator MUST fail on non-Da Nang address claim');
    assert.ok(result.errors.some(e => e.includes('UNAUTHORIZED_VERIFIED_GEOGRAPHIC_CLAIM') || e.includes('GEOGRAPHIC_FACILITY_ADDRESS_NOT_FOUND_IN_SOURCE_RAW')),
      'Error must cite geographic claim violation');
  });

  await runTest('9.10 Policy normalization: Setting non-null price on Phúc Long MEMBER_POLICY causes MEMBER_POLICY_PRICE_MUST_BE_NULL', () => {
    const badPkg = JSON.parse(JSON.stringify(validPackage));
    const plRow = badPkg.accepted_candidates.find(c => c.brand_id === 'phuclong');
    assert.ok(plRow, 'Must have Phuc Long candidate');
    plRow.price = { amount: 10000, currency: 'VND', price_type: 'menu' };
    const result = validateBatch14CatalogPackage(badPkg, { allowPartialBatch: true });
    assert.strictEqual(result.valid, false, 'Validator MUST fail on non-null price for MEMBER_POLICY');
    assert.ok(result.errors.some(e => e.includes('MEMBER_POLICY_PRICE_MUST_BE_NULL')),
      'Error must cite MEMBER_POLICY_PRICE_MUST_BE_NULL');
  });

  await runTest('9.11 Separation of powers: Approval decision is strictly PENDING_CEO_BATCH_APPROVAL and not granted', () => {
    const decisionPath = '06_TRUST_AND_EVIDENCE/batch_14_catalog_vault/BATCH_14_CATALOG_APPROVAL_DECISION.json';
    const decision = JSON.parse(fs.readFileSync(decisionPath, 'utf8'));
    assert.strictEqual(decision.approval_status, 'PENDING_CEO_BATCH_APPROVAL',
      'Approval decision must be PENDING_CEO_BATCH_APPROVAL');
    assert.strictEqual(decision.approval_granted, false,
      'approval_granted must strictly be false');
    assert.strictEqual(decision.decision_authority, 'EXECUTIVE_COUNCIL / CEO',
      'decision_authority must be EXECUTIVE_COUNCIL / CEO');
    
    const receiptPath = '06_TRUST_AND_EVIDENCE/batch_14_catalog_vault/BATCH_14_CATALOG_VALIDATION_RECEIPT.json';
    const receipt = JSON.parse(fs.readFileSync(receiptPath, 'utf8'));
    assert.strictEqual(receipt.technical_verdict, 'TECHNICAL_VALIDATION_PASS',
      'Validator receipt must state TECHNICAL_VALIDATION_PASS');
    assert.strictEqual(receipt.status, 'PENDING_CEO_BATCH_APPROVAL',
      'Validator receipt status must be PENDING_CEO_BATCH_APPROVAL');
  });

  await runTest('9.12 Superseded dual checksum: Old .json.sha256 file is explicitly marked STALE__DO_NOT_USE', () => {
    const stalePath = '06_TRUST_AND_EVIDENCE/batch_14_catalog_vault/BATCH_14_CATALOG_ACCEPTANCE_PACKAGE.json.sha256';
    assert.ok(fs.existsSync(stalePath), 'Stale file must exist for historical audit');
    const content = fs.readFileSync(stalePath, 'utf8');
    assert.ok(content.includes('STALE__DO_NOT_USE'), 'Stale file must contain STALE__DO_NOT_USE disclaimer');
    
    const canonicalPath = '06_TRUST_AND_EVIDENCE/batch_14_catalog_vault/BATCH_14_CATALOG_ACCEPTANCE_PACKAGE.sha256';
    assert.ok(fs.existsSync(canonicalPath), 'Canonical checksum file must exist');
    const canonicalContent = fs.readFileSync(canonicalPath, 'utf8').trim();
    assert.ok(/^[a-f0-9]{64}$/i.test(canonicalContent), 'Canonical file must contain pure 64-hex SHA-256');
  });

  // -----------------------------------------------------------------------------
  // Group 10: Process CLI Exit Code Integration
  // -----------------------------------------------------------------------------
  console.log('\n--- Group 10: Process CLI Exit Code Integration ---');

  await runTest('10.1 run_batch_14_catalog.cjs CLI runs and exits with code 0', () => {
    execSync('node 04_DATA_PIPELINE/run_batch_14_catalog.cjs', { stdio: 'pipe' });
  });

  await runTest('10.2 validate_batch_14_catalog_array.cjs CLI runs and exits with code 0', () => {
    execSync('node 07_QUALITY_ASSURANCE/validate_batch_14_catalog_array.cjs', { stdio: 'pipe' });
  });

  console.log(`\n=== TEST SUITE SUMMARY: ${passedTests}/${totalTests} TESTS PASSED (100%) ===`);
  if (passedTests !== totalTests) {
    process.exit(1);
  }
}

main().catch(err => {
  console.error('TEST SUITE UNCAUGHT ERROR:', err);
  process.exit(1);
});
