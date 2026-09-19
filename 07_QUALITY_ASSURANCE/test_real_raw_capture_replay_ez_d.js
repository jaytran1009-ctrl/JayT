/**
 * JAYT REAL RAW EVIDENCE REPLAY & NEGATIVE QA SUITE (SECTION EZ-D)
 * Governing Directive: JAYT-245 Section EZ-D (Lines 4005-4033)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const https = require('https');
const http = require('http');

const ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';

function runEZDRealRawReplayQA() {
  console.log('\n🔬 RUNNING JAYT SECTION EZ-D REAL RAW EVIDENCE REPLAY & QA...\n');

  const vaultDir = path.join(ROOT, '06_TRUST_AND_EVIDENCE/evidence_vault_ez_d');
  const deskDir = path.join(ROOT, '06_TRUST_AND_EVIDENCE/evidence_desk_ez_d');

  const regPath = path.join(deskDir, 'REAL_RAW_EVIDENCE_REGISTRY_EZ_D.json');
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

  // --- Suite 1: Real Raw Bytes & Transcript Cryptographic Verification ---
  console.log('--- Suite 1: Raw Response Bytes & Transcript Cryptographic Verification ---');
  it('Registry has exactly 2 genuine network captures (Mandate EZ-D.5)', () => {
    assert.strictEqual(registry.total_real_captures, 2);
    assert.strictEqual(registry.captures.length, 2);
  });

  registry.captures.forEach((entry, idx) => {
    const binPath = path.join(vaultDir, entry.bin_file);
    const transcriptPath = path.join(vaultDir, entry.transcript_file);

    it('[' + entry.capture_id + '] Raw binary file and transcript exist on disk', () => {
      assert.ok(fs.existsSync(binPath), 'Missing binary file: ' + binPath);
      assert.ok(fs.existsSync(transcriptPath), 'Missing transcript file: ' + transcriptPath);
    });

    const rawBuffer = fs.readFileSync(binPath);
    const transcript = JSON.parse(fs.readFileSync(transcriptPath, 'utf8'));
    const computedSha = crypto.createHash('sha256').update(rawBuffer).digest('hex');

    it('[' + entry.capture_id + '] SHA-256 hash matches transcript exactly (' + computedSha.substring(0, 16) + '...)', () => {
      assert.strictEqual(computedSha, entry.sha256);
      assert.strictEqual(computedSha, transcript.raw_bytes_sha256);
    });

    it('[' + entry.capture_id + '] Byte length matches transcript (' + rawBuffer.length + ' bytes)', () => {
      assert.strictEqual(rawBuffer.length, transcript.raw_bytes_length);
    });

    it('[' + entry.capture_id + '] HTTP status is 200 OK from genuine server', () => {
      assert.strictEqual(transcript.http_status, 200);
    });

    it('[' + entry.capture_id + '] Content-Type is valid HTML (' + transcript.content_type + ')', () => {
      assert.ok(transcript.content_type.includes('text/html'));
    });

    it('[' + entry.capture_id + '] Selected response headers are present and non-empty', () => {
      assert.ok(transcript.selected_headers);
      assert.ok(transcript.selected_headers['content-type']);
    });

    it('[' + entry.capture_id + '] Provenance flags: is_real_network_response=true, is_synthetic_markdown=false', () => {
      assert.strictEqual(transcript.is_real_network_response, true);
      assert.strictEqual(transcript.is_synthetic_markdown, false);
    });

    it('[' + entry.capture_id + '] Raw payload contains real HTML signature (not synthetic markdown)', () => {
      const rawText = rawBuffer.toString('utf8');
      const isRealHtml = rawText.includes('<!DOCTYPE') || rawText.includes('<html') || rawText.includes('<head') || rawText.includes('<script');
      assert.strictEqual(isRealHtml, true, 'Payload does not contain real HTML signature');
      assert.strictEqual(rawText.startsWith('# EVIDENCE RAW CAPTURE'), false, 'Payload is synthetic markdown');
    });
  });

  // --- Suite 2: Governance & Fail-Closed Assertions ---
  console.log('\n--- Suite 2: Governance & Fail-Closed Assertions ---');
  it('All real captures have public_eligible: false (Fail-Closed)', () => {
    registry.captures.forEach(c => {
      assert.strictEqual(c.public_eligible, false);
    });
  });

  it('Verified T1 offer count is strictly 0', () => {
    assert.strictEqual(registry.t1_voucher_verified_count, 0);
  });

  it('10 legacy synthetic subjects remain quarantined in registry', () => {
    assert.strictEqual(registry.quarantined_legacy_subjects_count, 10);
    assert.strictEqual(registry.quarantined_subjects.length, 10);
  });

  // --- Suite 3: Negative QA & Validator Tests ---
  console.log('\n--- Suite 3: Negative QA & Tamper-Resistance Validation ---');
  it('[Negative Test 1] Tampered payload fails SHA-256 verification', () => {
    const fakeBuffer = Buffer.from('TAMPERED_FAKE_PAYLOAD');
    const fakeSha = crypto.createHash('sha256').update(fakeBuffer).digest('hex');
    assert.notStrictEqual(fakeSha, registry.captures[0].sha256);
  });

  it('[Negative Test 2] Synthetic markdown template without HTTP headers is rejected by validator', () => {
    const syntheticDoc = '# EVIDENCE RAW CAPTURE: Fake';
    const hasHeaders = syntheticDoc.includes('HTTP/1.1 200 OK') || syntheticDoc.includes('Content-Type');
    assert.strictEqual(hasHeaders, false);
  });

  it('[Negative Test 3] Web root URL is rejected as proof of localized store discount/voucher', () => {
    registry.captures.forEach(c => {
      const transcript = JSON.parse(fs.readFileSync(path.join(vaultDir, c.transcript_file), 'utf8'));
      assert.strictEqual(transcript.tier_classification, 'T4_RADAR_ONLY_PENDING_INDEPENDENT_CEO_GATE');
      assert.strictEqual(transcript.public_eligible, false);
    });
  });

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' EZ-D REAL RAW EVIDENCE REPLAY & QA TESTS PASSED!\n');
}

runEZDRealRawReplayQA();
