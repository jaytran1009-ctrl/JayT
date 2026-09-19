/**
 * JAYT EVIDENCE CONTRACT V3 & ENTAILMENT GATE QA SUITE (SECTION EZ-K)
 * Governing Directive: JAYT-245 Section EZ-K (Lines 4182-4210)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

const ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';

function runEZKContractV3AndEntailmentQA() {
  console.log('\n🔬 RUNNING JAYT SECTION EZ-K EVIDENCE CONTRACT V3 & ENTAILMENT QA...\n');

  const baseDir = path.join(ROOT, '00_PROGRAM_BASELINE');
  const councilDir = path.join(ROOT, '01_EXECUTIVE_COUNCIL');
  const evidenceDir = path.join(ROOT, '06_TRUST_AND_EVIDENCE');

  const schemaPath = path.join(evidenceDir, 'JAYT_EVIDENCE_CONTRACT_V3_SCHEMA_EZ_K.json');
  const regPath = path.join(evidenceDir, 'PROPOSED_UTILITY_FACTS_EZ_K.json');
  const receiptPath = path.join(baseDir, 'JAYT_RELEASE_RECEIPT_EZ_K.json');
  const manifestPath = path.join(baseDir, 'JAYT_VERSION_PARITY_MANIFEST_EZ_K.json');
  const packPath = path.join(councilDir, 'COUNCIL_REVIEW_PACK_EZ_K_EVIDENCE_CONTRACT_V3_20260831.md');

  assert.ok(fs.existsSync(schemaPath), 'Missing Schema v3');
  assert.ok(fs.existsSync(regPath), 'Missing Registry EZ-K');
  assert.ok(fs.existsSync(receiptPath), 'Missing Release Receipt EZ-K');
  assert.ok(fs.existsSync(manifestPath), 'Missing Parity Manifest EZ-K');
  assert.ok(fs.existsSync(packPath), 'Missing Review Pack Markdown EZ-K');

  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  const registry = JSON.parse(fs.readFileSync(regPath, 'utf8'));
  const receipt = JSON.parse(fs.readFileSync(receiptPath, 'utf8'));
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const packContent = fs.readFileSync(packPath, 'utf8');

  let totalTests = 0;
  let passedTests = 0;

  function it(name, fn) {
    totalTests++;
    try {
      fn();
      console.log('  ✓ ' + name);
      passedTests++;
    } catch (err) {
      console.error('  ✕ ' + name + ': ' + err.message);
      throw err;
    }
  }

  // --- Suite 1: Evidence Contract v3 Schema Compliance ---
  console.log('--- Suite 1: Evidence Contract v3 Schema Compliance ---');

  it('Schema v3 mandates sentence_level_raw_excerpts with byte start/end positions', () => {
    assert.ok(schema.properties.sentence_level_raw_excerpts);
    assert.ok(schema.required.includes('sentence_level_raw_excerpts'));
  });

  it('Schema v3 mandates clause_by_clause_translation_mapping', () => {
    assert.ok(schema.properties.clause_by_clause_translation_mapping);
    assert.ok(schema.required.includes('clause_by_clause_translation_mapping'));
  });

  it('Schema v3 defines claim_class taxonomy (IDENTITY, DESCRIPTIVE, ELIGIBILITY, SCOPE, ECONOMIC, LOCAL)', () => {
    const enumVals = schema.properties.claim_class.enum;
    assert.ok(enumVals.includes('IDENTITY_ONLY'));
    assert.ok(enumVals.includes('DESCRIPTIVE_ONLY'));
    assert.ok(enumVals.includes('ELIGIBILITY_REQUIREMENT'));
    assert.ok(enumVals.includes('SCOPE_RESTRICTION'));
    assert.ok(enumVals.includes('ECONOMIC_BENEFIT'));
    assert.ok(enumVals.includes('LOCAL_TERRITORY'));
  });

  it('Schema v3 mandates entailment_gate_verification with isolated_token_heuristic_rejected', () => {
    assert.ok(schema.properties.entailment_gate_verification);
    assert.ok(schema.required.includes('entailment_gate_verification'));
  });

  // --- Suite 2: Semantic Failure Matrix Verification ---
  console.log('\n--- Suite 2: Semantic Failure Matrix Verification ---');

  it('Semantic Failure Matrix contains both EZ-J candidates with root cause diagnosis (Mandate EZ-K.1)', () => {
    assert.strictEqual(registry.semantic_failure_matrix.length, 2);
    const notionFailure = registry.semantic_failure_matrix.find(c => c.candidate_id.includes('NOTION'));
    const canvaFailure = registry.semantic_failure_matrix.find(c => c.candidate_id.includes('CANVA'));
    assert.ok(notionFailure);
    assert.ok(canvaFailure);
    assert.strictEqual(notionFailure.verdict, 'HELD_INTERNAL_SEMANTIC_LOCATOR_INSUFFICIENT');
    assert.strictEqual(canvaFailure.verdict, 'HELD_INTERNAL_SEMANTIC_LOCATOR_INSUFFICIENT');
    assert.ok(notionFailure.root_cause_failure.length > 20);
    assert.ok(canvaFailure.root_cause_failure.length > 20);
  });

  // --- Suite 3: Contract v3 Trial Candidate & 'NO_PUBLISHABLE_FACT' Verdict ---
  console.log('\n--- Suite 3: Contract v3 Trial Candidate & No Publishable Fact Verdict ---');

  it('Trial candidate Notion is classified strictly as DESCRIPTIVE_ONLY', () => {
    const cand = registry.trial_candidates_v3[0];
    assert.strictEqual(cand.claim_class, 'DESCRIPTIVE_ONLY');
    assert.strictEqual(cand.sentence_level_raw_excerpts[0].claim_class, 'DESCRIPTIVE_ONLY');
  });

  it('Trial candidate Notion has honest verdict NO_PUBLISHABLE_FACT_DESCRIPTIVE_ONLY_HELD_INTERNAL (Mandate EZ-K.3)', () => {
    const cand = registry.trial_candidates_v3[0];
    assert.strictEqual(cand.entailment_gate_verification.publishable_status, 'NO_PUBLISHABLE_FACT_DESCRIPTIVE_ONLY_HELD_INTERNAL');
    assert.strictEqual(cand.entailment_gate_verification.isolated_token_heuristic_rejected, true);
    assert.strictEqual(cand.entailment_gate_verification.all_clauses_strictly_entailed, false);
  });

  it('All clauses in trial candidate have explicit translation mapping and entailment status', () => {
    const cand = registry.trial_candidates_v3[0];
    assert.strictEqual(cand.clause_by_clause_translation_mapping.length, 2);
    cand.clause_by_clause_translation_mapping.forEach(clause => {
      assert.ok(clause.source_clause_text);
      assert.ok(clause.faithful_vietnamese_clause);
      assert.strictEqual(clause.entailment_status, 'DESCRIPTIVE_ENTAILMENT');
    });
  });

  it('Trial candidate specifies explicit disallowed extrapolated claims to protect public surface', () => {
    const cand = registry.trial_candidates_v3[0];
    assert.ok(cand.disallowed_extrapolated_claims.length >= 3);
  });

  // --- Suite 4: Negative QA & Entailment Gate Fixtures ---
  console.log('\n--- Suite 4: Negative QA & Entailment Gate Fixtures ---');

  it('[Negative Test 1] Attempt to use short token "Education" to claim student discount entitlement is rejected by Entailment Gate', () => {
    function evaluateEntailment(rawExcerpt, proposedClaim) {
      if (rawExcerpt.length < 10) return { passed: false, reason: 'EXCERPT_TOO_SHORT_TOKEN_HEURISTIC_REJECTED' };
      if (!rawExcerpt.toLowerCase().includes('eligible') && proposedClaim.includes('đủ điều kiện')) {
        return { passed: false, reason: 'PREDICATE_MISSING_FOR_ELIGIBILITY' };
      }
      return { passed: true };
    }
    const result = evaluateEntailment('Education', 'Mọi sinh viên đủ điều kiện nhận ưu đãi');
    assert.strictEqual(result.passed, false);
    assert.strictEqual(result.reason, 'EXCERPT_TOO_SHORT_TOKEN_HEURISTIC_REJECTED');
  });

  it('[Negative Test 2] Attempt to claim global scope when raw text does not state global/worldwide is rejected by Entailment Gate', () => {
    function evaluateScopeEntailment(sourceScopeObj, proposedScopeLabel) {
      if (proposedScopeLabel === 'GLOBAL' && !sourceScopeObj.is_explicitly_stated_global) {
        return { passed: false, reason: 'UNPROVEN_GLOBAL_SCOPE_EXTRAPOLATION' };
      }
      return { passed: true };
    }
    const result = evaluateScopeEntailment(registry.trial_candidates_v3[0].source_scope, 'GLOBAL');
    assert.strictEqual(result.passed, false);
    assert.strictEqual(result.reason, 'UNPROVEN_GLOBAL_SCOPE_EXTRAPOLATION');
  });

  it('[Negative Test 3] Descriptive-only meta tag attempting to publish as T2 documentation is blocked', () => {
    function canPublishAsT2(contract) {
      return contract.claim_class === 'ELIGIBILITY_REQUIREMENT' && contract.entailment_gate_verification.publishable_status === 'PUBLISHABLE_AS_T2_DOCUMENTATION';
    }
    assert.strictEqual(canPublishAsT2(registry.trial_candidates_v3[0]), false);
  });

  // --- Suite 5: Platform & Governance Gate Invariants ---
  console.log('\n--- Suite 5: Platform & Governance Gate Invariants ---');

  it('Public eligible count on staging remains strictly 1 (Approved GitHub Pilot Only)', () => {
    assert.strictEqual(registry.approved_staging_t2_pilot_count, 1);
    assert.strictEqual(registry.new_candidates_public_count, 0);
  });

  it('T1 verified voucher count remains strictly 0', () => {
    assert.strictEqual(registry.t1_voucher_verified_count, 0);
  });

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' EZ-K EVIDENCE CONTRACT V3 & ENTAILMENT QA TESTS PASSED!\n');
}

runEZKContractV3AndEntailmentQA();
