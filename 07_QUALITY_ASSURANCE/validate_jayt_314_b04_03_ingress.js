const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.resolve(__dirname, '..');
const scope = JSON.parse(fs.readFileSync(path.join(root, '06_TRUST_AND_EVIDENCE', 'JAYT_314_B04_03_INGRESS_SCOPE.json'), 'utf8'));
const target = scope.target;
const vault = path.join(root, scope.vault_directory);
const rawPath = path.join(vault, `${target.slot_id}.raw.html`);
const headersPath = path.join(vault, `${target.slot_id}.headers.json`);
const manifestPath = path.join(vault, 'JAYT_314_B04_03_INGRESS_MANIFEST.json');

if (!fs.existsSync(rawPath) || !fs.existsSync(headersPath)) {
  const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, 'utf8')) : null;
  const sealedVerdict = manifest?.result?.status;
  console.log(`${target.slot_id}: ${sealedVerdict || 'AWAITING_OPERATOR_RAW_ATTACHMENT'}; PUBLIC_APPROVED=0; RENDER_PERMITTED=false`);
  process.exitCode = 1;
} else {
  const raw = fs.readFileSync(rawPath);
  const meta = JSON.parse(fs.readFileSync(headersPath, 'utf8'));
  const hash = crypto.createHash('sha256').update(raw).digest('hex');
  const offset = raw.indexOf(Buffer.from(target.expected_text_span, 'utf8'));
  const headersClean = Object.keys(meta.response_headers || {}).every(key => !/cookie|token|authorization|set-cookie/i.test(key));
  const passed = meta.http_status === 200 && hash === meta.raw_body_sha256 && offset === meta.supporting_text_offset_utf8 && headersClean;
  console.log(`${target.slot_id}: ${passed ? 'EVIDENCE_COMPLETE_INTERNAL_HELD' : 'VALIDATION_FAILED__QUARANTINE'}; PUBLIC_APPROVED=0; RENDER_PERMITTED=false`);
  process.exitCode = passed ? 0 : 1;
}
