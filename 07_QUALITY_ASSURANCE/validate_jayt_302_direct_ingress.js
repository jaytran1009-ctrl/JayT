/* JAYT-302 read-only validator. */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const root = path.resolve(__dirname, '..');
const trust = path.join(root, '06_TRUST_AND_EVIDENCE');
const scope = JSON.parse(fs.readFileSync(path.join(trust, 'JAYT_302_DIRECT_INGRESS_SCOPE.json'), 'utf8'));
const vault = path.join(root, scope.vault_directory);
const hash = (bytes) => crypto.createHash('sha256').update(bytes).digest('hex');
const prohibited = /cookie|token|authorization|set-cookie/i;
const results = scope.targets.map((target) => {
  const rawPath = path.join(vault, `${target.slot_id}.raw.html`);
  const metadataPath = path.join(vault, `${target.slot_id}.metadata.json`);
  if (!fs.existsSync(rawPath) || !fs.existsSync(metadataPath)) return { slot_id: target.slot_id, state: 'AWAITING_OPERATOR_RAW_ATTACHMENT' };
  try {
    const bytes = fs.readFileSync(rawPath), metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    const text = bytes.toString('utf8'), at = text.toLowerCase().indexOf(target.expected_text_span.toLowerCase()), errors = [];
    if (metadata.http_status !== 200) errors.push('HTTP status is not 200');
    if (metadata.raw_body_sha256 !== hash(bytes)) errors.push('SHA-256 mismatch');
    if (Object.keys(metadata.sanitized_response_headers || {}).some((key) => prohibited.test(key))) errors.push('secret/session header present');
    if (at < 0 || Buffer.byteLength(text.slice(0, at), 'utf8') !== metadata.supporting_text_offset_utf8) errors.push('expected text span UTF-8 offset mismatch');
    return { slot_id: target.slot_id, state: errors.length ? 'QUARANTINE_INVALID_OPERATOR_ATTACHMENT' : 'EVIDENCE_COMPLETE_INTERNAL_HELD', errors };
  } catch (error) { return { slot_id: target.slot_id, state: 'QUARANTINE_INVALID_OPERATOR_ATTACHMENT', errors: [String(error.message)] }; }
});
const report = { report_id: 'JAYT_302_VALIDATION_REPORT', generated_at_utc: new Date().toISOString(), results, summary: { evidence_complete: results.filter((item) => item.state === 'EVIDENCE_COMPLETE_INTERNAL_HELD').length, public_approved: 0, render_permitted: false } };
fs.writeFileSync(path.join(trust, 'JAYT_302_VALIDATION_REPORT.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
if (report.summary.evidence_complete !== scope.targets.length) process.exitCode = 1;
