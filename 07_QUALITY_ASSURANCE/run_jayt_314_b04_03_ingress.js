const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.resolve(__dirname, '..');
const scope = JSON.parse(fs.readFileSync(path.join(root, '06_TRUST_AND_EVIDENCE', 'JAYT_314_B04_03_INGRESS_SCOPE.json'), 'utf8'));
const vault = path.join(root, scope.vault_directory);
const manifestPath = path.join(vault, 'JAYT_314_B04_03_INGRESS_MANIFEST.json');
const target = scope.target;

if (fs.existsSync(manifestPath)) throw new Error('JAYT-314 one-shot quota already consumed; retry requires a new authorization.');
fs.mkdirSync(vault, { recursive: true });

const prohibitedHeader = /cookie|token|authorization|set-cookie/i;
const sha256 = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const redactHeaders = headers => Object.fromEntries([...headers.entries()].filter(([key]) => !prohibitedHeader.test(key)));

(async () => {
  const startedAt = new Date().toISOString();
  let result;
  try {
    const response = await fetch(target.exact_source_url, {
      method: 'GET', redirect: 'manual', headers: { 'User-Agent': 'JayT-Evidence-Operator/1.0' }
    });
    const bytes = Buffer.from(await response.arrayBuffer());
    const headers = redactHeaders(response.headers);
    const capturedAt = new Date().toISOString();
    const digest = sha256(bytes);
    const offset = bytes.indexOf(Buffer.from(target.expected_text_span, 'utf8'));
    const base = path.join(vault, target.slot_id);

    if (response.status !== 200 || bytes.length === 0) {
      result = { slot_id: target.slot_id, status: 'INTAKE_FAILED__QUARANTINE', started_at_utc: startedAt, captured_at_utc: capturedAt, http_status: response.status, final_url: response.url, body_bytes: bytes.length, redirect_detected: response.status >= 300 && response.status < 400, headers_redacted: true };
    } else if (offset < 0) {
      result = { slot_id: target.slot_id, status: 'CONTENT_SPAN_MISMATCH__QUARANTINE', started_at_utc: startedAt, captured_at_utc: capturedAt, http_status: response.status, final_url: response.url, body_bytes: bytes.length, raw_body_sha256: digest, headers_redacted: true };
    } else {
      fs.writeFileSync(`${base}.raw.html`, bytes);
      fs.writeFileSync(`${base}.headers.json`, JSON.stringify({ slot_id: target.slot_id, captured_at_utc: capturedAt, http_status: response.status, final_url: response.url, response_headers: headers, raw_body_sha256: digest, supporting_text_span: target.expected_text_span, supporting_text_offset_utf8: offset, headers_redacted: true }, null, 2) + '\n');
      result = { slot_id: target.slot_id, status: 'RAW_BYTES_CAPTURED__AWAITING_VALIDATION', started_at_utc: startedAt, captured_at_utc: capturedAt, http_status: response.status, final_url: response.url, body_bytes: bytes.length, raw_body_sha256: digest, supporting_text_offset_utf8: offset, headers_redacted: true };
    }
  } catch (error) {
    result = { slot_id: target.slot_id, status: 'INTAKE_FAILED__QUARANTINE', started_at_utc: startedAt, captured_at_utc: new Date().toISOString(), error: String(error.message), headers_redacted: true };
  }
  const manifest = { scope_id: scope.scope_id, executed_at_utc: new Date().toISOString(), one_shot_consumed: true, redirects_followed: false, retry_authorized: false, result };
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
  console.log(JSON.stringify(manifest, null, 2));
  process.exitCode = result.status === 'RAW_BYTES_CAPTURED__AWAITING_VALIDATION' ? 0 : 1;
})().catch(error => { console.error(error.stack); process.exitCode = 1; });
