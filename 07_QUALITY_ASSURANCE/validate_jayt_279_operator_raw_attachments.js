/* JAYT-279 fail-closed validator. It never downloads, fabricates, or modifies operator evidence. */
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const trust = path.join(root, '06_TRUST_AND_EVIDENCE');
const vault = path.join(trust, 'batch_03b_micro_capture_vault');
const contract = JSON.parse(fs.readFileSync(path.join(trust, 'JAYT_279_OPERATOR_RAW_ATTACHMENT_CONTRACT.json'), 'utf8'));
const ingressPath = path.join(trust, 'JAYT_278_OPERATOR_VERIFIED_INGRESS.json');
const prohibited = /cookie|token|authorization|set-cookie/i;
const hash = (bytes) => crypto.createHash('sha256').update(bytes).digest('hex');

const results = contract.allowed_targets.map((targetId) => {
  const rawPath = path.join(vault, `${targetId}.operator.raw.html`);
  const metadataPath = path.join(vault, `${targetId}.operator.metadata.json`);
  const errors = [];
  if (!fs.existsSync(rawPath)) errors.push('missing raw body attachment');
  if (!fs.existsSync(metadataPath)) errors.push('missing metadata attachment');
  if (errors.length) return { target_id: targetId, state: 'AWAITING_OPERATOR_RAW_ATTACHMENT', errors };
  let metadata;
  try { metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8')); } catch (error) { return { target_id: targetId, state: 'QUARANTINE_INVALID_OPERATOR_ATTACHMENT', errors: [`invalid metadata JSON: ${error.message}`] }; }
  for (const key of contract.metadata_schema.required) if (!(key in metadata)) errors.push(`missing metadata field: ${key}`);
  const raw = fs.readFileSync(rawPath);
  const actualHash = hash(raw);
  if (metadata.raw_body_sha256 !== actualHash) errors.push('raw_body_sha256 mismatch');
  if (metadata.http_status !== 200) errors.push('HTTP status is not 200');
  if (Object.keys(metadata.sanitized_response_headers || {}).some((key) => prohibited.test(key))) errors.push('prohibited secret/session header present');
  const text = raw.toString('utf8');
  if (!Number.isInteger(metadata.supporting_text_offset_utf8) || text.indexOf(metadata.supporting_text_span) !== metadata.supporting_text_offset_utf8) errors.push('supporting text span offset mismatch');
  return { target_id: targetId, state: errors.length ? 'QUARANTINE_INVALID_OPERATOR_ATTACHMENT' : 'EVIDENCE_COMPLETE_INTERNAL_HELD', raw_body_sha256: actualHash, errors };
});
const result = { validator: 'JAYT-279', pass: results.every((item) => item.state === 'EVIDENCE_COMPLETE_INTERNAL_HELD'), results, public_approved: 0, render_permitted: false };
console.log(JSON.stringify(result, null, 2));
if (!result.pass) process.exitCode = 1;
