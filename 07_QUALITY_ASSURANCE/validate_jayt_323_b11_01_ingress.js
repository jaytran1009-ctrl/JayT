const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.resolve(__dirname, '..');
const scope = JSON.parse(fs.readFileSync(path.join(root, '06_TRUST_AND_EVIDENCE', 'JAYT_323_B11_01_TARGETED_INGRESS_SCOPE.json'), 'utf8'));
const target = scope.targets[0];
const vault = path.join(root, scope.vault_directory);
const rawPath = path.join(vault, `${target.slot_id}.raw.html`);
const headersPath = path.join(vault, `${target.slot_id}.headers.json`);
const reportPath = path.join(vault, 'JAYT_323_B11_01_VALIDATION_REPORT.json');
const blockedHeader = /cookie|token|authorization|set-cookie/i;

let report = {
  validator: 'JAYT_323_B11_01_REAL_BYTE_VALIDATOR',
  slot_id: target.slot_id,
  public_approved: false,
  render_permitted: false,
  production_mutation: false
};

if (!fs.existsSync(rawPath) || !fs.existsSync(headersPath)) {
  report.status = 'AWAITING_OPERATOR_RAW_ATTACHMENT';
  report.missing = [!fs.existsSync(rawPath) && 'raw body', !fs.existsSync(headersPath) && 'headers metadata'].filter(Boolean);
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`${target.slot_id}: ${report.status}`);
  process.exitCode = 1;
} else {
  const raw = fs.readFileSync(rawPath);
  const headers = JSON.parse(fs.readFileSync(headersPath, 'utf8'));
  const textBytes = Buffer.from(target.expected_text_span, 'utf8');
  const offset = raw.indexOf(textBytes);
  const unsafeHeaders = Object.keys(headers.response_headers || {}).filter(key => blockedHeader.test(key));
  const valid = headers.http_status === 200
    && headers.final_url === target.leaf_url
    && typeof headers.captured_at_utc === 'string'
    && unsafeHeaders.length === 0
    && offset >= 0;
  report = {
    ...report,
    status: valid ? 'EVIDENCE_COMPLETE_INTERNAL_HELD__AWAITING_CEO_ITEM_AUDIT' : 'VALIDATION_FAILED__QUARANTINE',
    raw_body_sha256: crypto.createHash('sha256').update(raw).digest('hex'),
    supporting_text_offset_utf8: offset,
    http_status: headers.http_status,
    final_url: headers.final_url,
    unsafe_header_names: unsafeHeaders,
    span_found: offset >= 0
  };
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`${target.slot_id}: ${report.status}`);
  process.exitCode = valid ? 0 : 1;
}
