const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.resolve(__dirname, '..');
const scopePath = path.join(root, '06_TRUST_AND_EVIDENCE', 'JAYT_312_BATCH_04_INGRESS_SCOPE.json');
const scope = JSON.parse(fs.readFileSync(scopePath, 'utf8'));
const vault = path.join(root, scope.vault_directory);
const manifestPath = path.join(vault, 'JAYT_312_BATCH_04_INGRESS_MANIFEST.json');

if (fs.existsSync(manifestPath)) {
  throw new Error('JAYT-312 one-shot quota already consumed; retry requires a new CEO authorization.');
}
fs.mkdirSync(vault, { recursive: true });

const prohibitedHeader = /cookie|token|authorization|set-cookie/i;
const sha256 = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const redactHeaders = headers => Object.fromEntries(
  [...headers.entries()].filter(([key]) => !prohibitedHeader.test(key))
);

async function capture(target) {
  const startedAt = new Date().toISOString();
  try {
    const response = await fetch(target.exact_source_url, {
      method: 'GET', redirect: 'manual', headers: { 'User-Agent': 'JayT-Evidence-Operator/1.0' }
    });
    const bytes = Buffer.from(await response.arrayBuffer());
    const headers = redactHeaders(response.headers);
    const finishedAt = new Date().toISOString();
    const base = path.join(vault, target.slot_id);

    if (response.status !== 200 || bytes.length === 0) {
      return { slot_id: target.slot_id, status: 'INTAKE_FAILED__QUARANTINE', started_at_utc: startedAt,
        finished_at_utc: finishedAt, http_status: response.status, final_url: response.url,
        body_bytes: bytes.length, redirect_detected: response.status >= 300 && response.status < 400,
        headers_redacted: true };
    }
    const offset = bytes.indexOf(Buffer.from(target.expected_text_span, 'utf8'));
    if (offset < 0) {
      return { slot_id: target.slot_id, status: 'CONTENT_SPAN_MISMATCH__QUARANTINE', started_at_utc: startedAt,
        finished_at_utc: finishedAt, http_status: response.status, final_url: response.url,
        body_bytes: bytes.length, headers_redacted: true, raw_body_sha256: sha256(bytes) };
    }
    const digest = sha256(bytes);
    fs.writeFileSync(`${base}.raw.html`, bytes);
    fs.writeFileSync(`${base}.metadata.json`, JSON.stringify({
      slot_id: target.slot_id, captured_at_utc: finishedAt, http_status: response.status,
      final_url: response.url, response_headers: headers, raw_body_sha256: digest,
      supporting_text_span: target.expected_text_span, supporting_text_offset_utf8: offset,
      headers_redacted: true
    }, null, 2) + '\n');
    return { slot_id: target.slot_id, status: 'RAW_BYTES_CAPTURED__AWAITING_VALIDATION', started_at_utc: startedAt,
      finished_at_utc: finishedAt, http_status: response.status, final_url: response.url, body_bytes: bytes.length,
      raw_body_sha256: digest, supporting_text_offset_utf8: offset, headers_redacted: true };
  } catch (error) {
    return { slot_id: target.slot_id, status: 'INTAKE_FAILED__QUARANTINE', started_at_utc: startedAt,
      finished_at_utc: new Date().toISOString(), error: String(error.message), headers_redacted: true };
  }
}

(async () => {
  const results = [];
  for (const target of scope.targets) results.push(await capture(target));
  const manifest = { scope_id: scope.scope_id, executed_at_utc: new Date().toISOString(),
    one_shot_consumed: true, redirects_followed: false, retry_authorized: false, results };
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
  console.log(JSON.stringify(manifest, null, 2));
  process.exitCode = results.every(r => r.status === 'RAW_BYTES_CAPTURED__AWAITING_VALIDATION') ? 0 : 1;
})().catch(error => { console.error(error.stack); process.exitCode = 1; });
