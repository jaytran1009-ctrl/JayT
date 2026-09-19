const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.resolve(__dirname, '..');
const scope = JSON.parse(fs.readFileSync(path.join(root, '06_TRUST_AND_EVIDENCE', 'JAYT_312_BATCH_04_INGRESS_SCOPE.json'), 'utf8'));
const vault = path.join(root, scope.vault_directory);
const blockedHeader = /cookie|token|authorization|set-cookie/i;
let passed = 0;

for (const target of scope.targets) {
  const rawPath = path.join(vault, `${target.slot_id}.raw.html`);
  const metaPath = path.join(vault, `${target.slot_id}.metadata.json`);
  if (!fs.existsSync(rawPath) || !fs.existsSync(metaPath)) { console.log(`${target.slot_id}: AWAITING_RAW_ATTACHMENT`); continue; }
  const raw = fs.readFileSync(rawPath);
  const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
  const hash = crypto.createHash('sha256').update(raw).digest('hex');
  const offset = raw.indexOf(Buffer.from(target.expected_text_span, 'utf8'));
  const headersClean = Object.keys(meta.response_headers || {}).every(key => !blockedHeader.test(key));
  const ok = meta.http_status === 200 && hash === meta.raw_body_sha256 && offset === meta.supporting_text_offset_utf8 && headersClean;
  console.log(`${target.slot_id}: ${ok ? 'EVIDENCE_COMPLETE_INTERNAL_HELD' : 'VALIDATION_FAILED__QUARANTINE'}`);
  if (ok) passed += 1;
}
console.log(`VALIDATED=${passed}/${scope.targets.length}; PUBLIC_APPROVED=0; RENDER_PERMITTED=false`);
process.exitCode = passed === scope.targets.length ? 0 : 1;
