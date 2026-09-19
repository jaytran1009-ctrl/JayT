/* JAYT-286 Authorization 01 validator: offline, deterministic, fail-closed. */
const assert = require('assert');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const vault = path.resolve(__dirname, '..', '06_TRUST_AND_EVIDENCE/batch_03b_micro_capture_vault');
const ids = ['JAYT286_REPLACEMENT_HK_04', 'BATCH03_AT_02'];
const secretHeader = /cookie|token|authorization|set-cookie/i;
const results = ids.map(id => {
  const errors = []; let metadata;
  const rawPath = path.join(vault, `${id}.jayt286.operator.raw.html`);
  const metadataPath = path.join(vault, `${id}.jayt286.operator.metadata.json`);
  if (!fs.existsSync(rawPath)) errors.push('missing raw body');
  if (!fs.existsSync(metadataPath)) errors.push('missing metadata');
  if (!errors.length) {
    try { metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8')); } catch { errors.push('invalid metadata JSON'); }
  }
  if (metadata) {
    const bytes = fs.readFileSync(rawPath); const text = bytes.toString('utf8');
    if (metadata.http_status !== 200) errors.push('http status must be 200');
    if (!metadata.captured_at_utc || !metadata.final_url || !metadata.supporting_text_span) errors.push('required metadata missing');
    if (crypto.createHash('sha256').update(bytes).digest('hex') !== metadata.raw_body_sha256) errors.push('sha256 mismatch');
    if (text.indexOf(metadata.supporting_text_span) !== metadata.supporting_text_offset_utf8) errors.push('UTF-8 span offset mismatch');
    if (Object.keys(metadata.sanitized_response_headers || {}).some(key => secretHeader.test(key))) errors.push('secret-bearing header retained');
  }
  return { target_id: id, state: errors.length ? 'QUARANTINE_VALIDATION_FAILED' : 'EVIDENCE_COMPLETE_INTERNAL_HELD', errors };
});
const pass = results.every(item => item.errors.length === 0);
console.log(JSON.stringify({ validator: 'JAYT-286-AUTH-01', pass, results, public_approved: 0, render_permitted: false }, null, 2));
assert.ok(pass, 'JAYT-286 attachments failed validation');
