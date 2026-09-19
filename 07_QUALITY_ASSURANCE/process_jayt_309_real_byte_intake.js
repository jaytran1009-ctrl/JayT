/* JAYT-309: local-only real-byte intake harness. Never fetches, writes raw bytes, or approves content. */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.resolve(__dirname, '..');
const trust = path.join(root, '06_TRUST_AND_EVIDENCE');
const scope = JSON.parse(fs.readFileSync(path.join(trust, 'JAYT_302_DIRECT_INGRESS_SCOPE.json'), 'utf8'));
const vault = path.join(root, scope.vault_directory);
const hash = (bytes) => crypto.createHash('sha256').update(bytes).digest('hex');
const forbidden = /cookie|token|authorization|set-cookie/i;

const results = scope.targets.map((target) => {
  const rawPath = path.join(vault, `${target.slot_id}.raw.html`);
  const headersPath = path.join(vault, `${target.slot_id}.headers.json`);
  if (!fs.existsSync(rawPath) || !fs.existsSync(headersPath)) return { slot_id: target.slot_id, state: 'AWAITING_REAL_OPERATOR_FILES' };
  try {
    const bytes = fs.readFileSync(rawPath);
    const headers = JSON.parse(fs.readFileSync(headersPath, 'utf8'));
    const text = bytes.toString('utf8');
    const index = text.toLowerCase().indexOf(target.expected_text_span.toLowerCase());
    const errors = [];
    if (headers.status !== 200) errors.push('HTTP status is not 200');
    if (Object.keys(headers).some((key) => forbidden.test(key))) errors.push('prohibited secret/session field in headers');
    if (index < 0) errors.push('expected text span absent from raw bytes');
    return {
      slot_id: target.slot_id,
      state: errors.length ? 'QUARANTINE_REAL_BYTE_INTAKE_INVALID' : 'REAL_BYTES_VERIFIED__AWAITING_CEO_AUDIT',
      raw_body_sha256: hash(bytes),
      supporting_text_offset_utf8: index < 0 ? -1 : Buffer.byteLength(text.slice(0, index), 'utf8'),
      errors
    };
  } catch (error) { return { slot_id: target.slot_id, state: 'QUARANTINE_REAL_BYTE_INTAKE_INVALID', errors: [String(error.message)] }; }
});
const manifest = {
  manifest_id: 'CEO_EMERGENCY_INGRESS_MANIFEST',
  authority: 'JAYT-309',
  generated_at_utc: new Date().toISOString(),
  provenance: 'Derived only from locally supplied operator raw HTML and headers files; no network fetch or synthetic body.',
  results,
  summary: { verified: results.filter((item) => item.state === 'REAL_BYTES_VERIFIED__AWAITING_CEO_AUDIT').length, public_approved: 0, render_permitted: false }
};
fs.writeFileSync(path.join(vault, 'CEO_EMERGENCY_INGRESS_MANIFEST.json'), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(JSON.stringify(manifest, null, 2));
if (manifest.summary.verified === 0) process.exitCode = 1;
