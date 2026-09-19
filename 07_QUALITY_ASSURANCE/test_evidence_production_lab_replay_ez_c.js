/**
 * JAYT EVIDENCE PRODUCTION LAB DETERMINISTIC REPLAY TEST (SECTION EZ-C)
 * Governing Directive: JAYT-245 Section EZ-C (Lines 3972-4002), Mandate EZ-C.2 & EZ-C.3
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

const ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';

function runEvidenceLabReplay() {
  console.log('\n🔬 RUNNING EVIDENCE PRODUCTION LAB DETERMINISTIC REPLAY (SECTION EZ-C)...\n');

  const deskDir = path.join(ROOT, '06_TRUST_AND_EVIDENCE/evidence_desk_ez');
  const vaultDir = path.join(ROOT, '06_TRUST_AND_EVIDENCE/evidence_vault_ez');

  const regPath = path.join(deskDir, 'PROPOSED_FACTS_REGISTRY_EZ_C.json');
  assert.ok(fs.existsSync(regPath), 'Registry file must exist');

  const registry = JSON.parse(fs.readFileSync(regPath, 'utf8'));

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

  it('Registry has exactly 10 subjects across 5 cohorts (2 subjects / cohort)', () => {
    assert.strictEqual(registry.total_subjects_count, 10);
    assert.strictEqual(registry.cohorts_count, 5);
    assert.strictEqual(registry.entries.length, 10);
  });

  it('All entries in lab have public_eligible: false (Fail-closed)', () => {
    registry.entries.forEach(e => {
      assert.strictEqual(e.public_eligible, false);
    });
  });

  it('Verified T1 offer count is strictly 0', () => {
    assert.strictEqual(registry.t1_voucher_verified_count, 0);
  });

  // Test deterministic artifact hash and verbatim quote match for each of the 10 subjects
  registry.entries.forEach((entry, idx) => {
    const artifactFile = path.join(vaultDir, 'artifact_' + entry.subject_id.toLowerCase() + '.md');
    const receiptFile = path.join(vaultDir, 'artifact_' + entry.subject_id.toLowerCase() + '_receipt.json');

    it('[Subject ' + (idx + 1) + ': ' + entry.subject_id + '] Raw artifact & receipt exist on disk', () => {
      assert.ok(fs.existsSync(artifactFile), 'Artifact ' + artifactFile + ' missing');
      assert.ok(fs.existsSync(receiptFile), 'Receipt ' + receiptFile + ' missing');
    });

    const rawContent = fs.readFileSync(artifactFile, 'utf8');
    const receipt = JSON.parse(fs.readFileSync(receiptFile, 'utf8'));
    const computedSha = crypto.createHash('sha256').update(rawContent).digest('hex');

    it('[Subject ' + (idx + 1) + ': ' + entry.subject_id + '] SHA-256 hash matches receipt exactly (' + computedSha.substring(0, 12) + '...)', () => {
      assert.strictEqual(computedSha, receipt.sha256);
      assert.strictEqual(computedSha, entry.sha256);
    });

    it('[Subject ' + (idx + 1) + ': ' + entry.subject_id + '] Verbatim quote is present in raw artifact', () => {
      assert.ok(rawContent.includes(receipt.verbatim_quote), 'Quote "' + receipt.verbatim_quote + '" not found in artifact');
    });

    it('[Subject ' + (idx + 1) + ': ' + entry.subject_id + '] Canonical URL is valid HTTPS', () => {
      assert.ok(receipt.canonical_url.startsWith('https://'));
    });
  });

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' EVIDENCE PRODUCTION LAB REPLAY TESTS PASSED!\n');
}

runEvidenceLabReplay();
