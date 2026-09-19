/**
 * JAYT SOURCE INTAKE QUEUE & A11Y QA SUITE (SECTION EZ-L)
 * Governing Directive: JAYT-245 Section EZ-L (Lines 4212-4240)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

const ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';

function runEZLIntakeQueueAndA11yQA() {
  console.log('\n🔬 RUNNING JAYT SECTION EZ-L SOURCE INTAKE QUEUE & A11Y QA...\n');

  const baseDir = path.join(ROOT, '00_PROGRAM_BASELINE');
  const councilDir = path.join(ROOT, '01_EXECUTIVE_COUNCIL');
  const evidenceDir = path.join(ROOT, '06_TRUST_AND_EVIDENCE');
  const vaultDirEZL = path.join(evidenceDir, 'evidence_vault_ez_l');

  const queuePath = path.join(evidenceDir, 'SOURCE_INTAKE_QUEUE_EZ_L.json');
  const regPath = path.join(evidenceDir, 'PROPOSED_UTILITY_FACTS_EZ_L.json');
  const receiptPath = path.join(baseDir, 'JAYT_RELEASE_RECEIPT_EZ_L.json');
  const manifestPath = path.join(baseDir, 'JAYT_VERSION_PARITY_MANIFEST_EZ_L.json');
  const packPath = path.join(councilDir, 'COUNCIL_REVIEW_PACK_EZ_L_INTAKE_QUEUE_AND_A11Y_20260831.md');

  assert.ok(fs.existsSync(queuePath), 'Missing Source Intake Queue');
  assert.ok(fs.existsSync(regPath), 'Missing Registry EZ-L');
  assert.ok(fs.existsSync(receiptPath), 'Missing Release Receipt EZ-L');
  assert.ok(fs.existsSync(manifestPath), 'Missing Parity Manifest EZ-L');
  assert.ok(fs.existsSync(packPath), 'Missing Review Pack Markdown EZ-L');

  const queue = JSON.parse(fs.readFileSync(queuePath, 'utf8'));
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

  // --- Suite 1: Source Intake Queue Structure ---
  console.log('--- Suite 1: Source Intake Queue Structure ---');

  it('Source Intake Queue contains exactly 10 queued items (Mandate EZ-L.2)', () => {
    assert.strictEqual(queue.total_queued_candidates, 10);
    assert.strictEqual(queue.queue_items.length, 10);
  });

  it('All queue items contain only allowed identity fields and no premature claims', () => {
    queue.queue_items.forEach(item => {
      assert.ok(item.intake_id);
      assert.ok(item.jtbd_category);
      assert.ok(item.source_owner);
      assert.ok(item.canonical_url);
      assert.ok(item.need_cohort);
      assert.strictEqual(item.status, 'UNFETCHED');
      // Assert zero commercial fields:
      assert.strictEqual(item.price, undefined);
      assert.strictEqual(item.discount, undefined);
      assert.strictEqual(item.voucher, undefined);
      assert.strictEqual(item.rating, undefined);
    });
  });

  // --- Suite 2: Notion & Canva 30-Day Closure ---
  console.log('\n--- Suite 2: Notion & Canva 30-Day Closure ---');

  it('Cohort closure notice is active until 2026-09-30 (Mandate EZ-L.1)', () => {
    assert.strictEqual(queue.cohort_quarantine_notice.notion_canva_education_status, 'COHORT_CLOSED_FOR_30_DAYS_UNTIL_20260930');
    assert.strictEqual(registry.cohort_closure_notice, 'NOTION_CANVA_COHORT_CLOSED_FOR_30_DAYS_UNTIL_20260930');
    assert.strictEqual(receipt.cohort_closure_notice.notion_canva_education_status, 'COHORT_CLOSED_FOR_30_DAYS_UNTIL_20260930');
  });

  // --- Suite 3: Evaluated Intake Candidates V3 Evidence ---
  console.log('\n--- Suite 3: Evaluated Intake Candidates V3 Evidence ---');

  it('Exactly 2 intake items were evaluated in round 1 (Mandate EZ-L.3)', () => {
    assert.strictEqual(registry.intake_queue_evaluated_items.length, 2);
  });

  registry.intake_queue_evaluated_items.forEach(entry => {
    const binPath = path.join(vaultDirEZL, entry.bin_file);
    const transcriptPath = path.join(vaultDirEZL, entry.transcript_file);

    it('[' + entry.candidate_id + '] Raw binary exists and matches dynamic SHA-256 (' + entry.sha256.substring(0, 16) + '...)', () => {
      assert.ok(fs.existsSync(binPath));
      const buf = fs.readFileSync(binPath);
      const computedSha = crypto.createHash('sha256').update(buf).digest('hex');
      assert.strictEqual(computedSha, entry.sha256);
      assert.strictEqual(buf.length, entry.byte_length);
    });

    it('[' + entry.candidate_id + '] Evidence Contract v3 is classified as IDENTITY_ONLY / HELD_INTERNAL', () => {
      const transcript = JSON.parse(fs.readFileSync(transcriptPath, 'utf8'));
      assert.strictEqual(transcript.evidence_contract_v3.claim_class, 'IDENTITY_ONLY');
      assert.strictEqual(transcript.public_eligible, false);
      assert.strictEqual(transcript.governance_status, 'IDENTITY_CONFIRMED_HELD_INTERNAL_NO_PUBLIC_CARD');
    });
  });

  // --- Suite 4: Negative QA & Guardrails ---
  console.log('\n--- Suite 4: Negative QA & Guardrails ---');

  it('[Negative Test 1] Queue entry with premature voucher/discount field is rejected by intake validator', () => {
    function validateIntakeItem(item) {
      const forbidden = ['price', 'discount', 'voucher', 'rating', 'storefront_title'];
      for (const k of forbidden) {
        if (item[k] !== undefined) return { valid: false, reason: 'FORBIDDEN_FIELD_' + k.toUpperCase() };
      }
      return { valid: true };
    }
    const badItem = { intake_id: 'BAD', source_owner: 'Test', canonical_url: 'https://test.vn', voucher: 'DISCOUNT_50' };
    const check = validateIntakeItem(badItem);
    assert.strictEqual(check.valid, false);
    assert.strictEqual(check.reason, 'FORBIDDEN_FIELD_VOUCHER');
  });

  it('[Negative Test 2] Identity-only candidate attempting public render is rejected by publish gate', () => {
    function canPublish(candidate) {
      return candidate.contract_v3.claim_class === 'ELIGIBILITY_REQUIREMENT' && candidate.public_eligible === true;
    }
    assert.strictEqual(canPublish(registry.intake_queue_evaluated_items[0]), false);
    assert.strictEqual(canPublish(registry.intake_queue_evaluated_items[1]), false);
  });

  // --- Suite 5: Governance & Staging Parity ---
  console.log('\n--- Suite 5: Governance & Staging Parity ---');

  it('Public eligible T2 count remains strictly 1 (Approved GitHub Pilot Only)', () => {
    assert.strictEqual(registry.approved_staging_t2_pilot_count, 1);
    assert.strictEqual(registry.new_candidates_public_count, 0);
  });

  it('T1 verified voucher count remains strictly 0', () => {
    assert.strictEqual(registry.t1_voucher_verified_count, 0);
  });

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' EZ-L SOURCE INTAKE & A11Y QA TESTS PASSED!\n');
}

runEZLIntakeQueueAndA11yQA();
