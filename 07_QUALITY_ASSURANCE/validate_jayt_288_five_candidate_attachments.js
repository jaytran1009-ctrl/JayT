/* JAYT-288 fail-closed validator. It never downloads, fabricates, or alters evidence. */
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const trust = path.join(root, '06_TRUST_AND_EVIDENCE');
const scope = JSON.parse(fs.readFileSync(path.join(trust, 'JAYT_288_FIVE_CANDIDATE_INGRESS_SCOPE.json'), 'utf8'));
const vault = path.join(root, scope.vault);
const prohibited = /cookie|token|authorization|set-cookie/i;
const allowedHosts = new Set(['ued.udn.vn', 'dut.udn.vn', 'www.danangbus.vn', 'danangbus.vn']);
const sha256 = (bytes) => crypto.createHash('sha256').update(bytes).digest('hex');
const utf8Offset = (text, needle) => Buffer.from(text.slice(0, text.indexOf(needle)), 'utf8').length;

const results = scope.allowed_targets.map((target) => {
  const rawPath = path.join(vault, `${target.id}.operator.raw.html`);
  const metadataPath = path.join(vault, `${target.id}.operator.metadata.json`);
  const errors = [];
  if (!fs.existsSync(rawPath)) errors.push('missing raw body attachment');
  if (!fs.existsSync(metadataPath)) errors.push('missing metadata attachment');
  if (errors.length) return { target_id: target.id, state: 'AWAITING_OPERATOR_RAW_ATTACHMENT', errors };
  let metadata;
  try { metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8')); } catch (error) { return { target_id: target.id, state: 'QUARANTINE_INVALID_OPERATOR_ATTACHMENT', errors: [`invalid metadata JSON: ${error.message}`] }; }
  for (const field of scope.attachment_contract.required_metadata) if (!(field in metadata)) errors.push(`missing metadata field: ${field}`);
  const raw = fs.readFileSync(rawPath);
  if (metadata.raw_body_sha256 !== sha256(raw)) errors.push('raw_body_sha256 mismatch');
  if (metadata.http_status !== 200) errors.push('HTTP status is not 200');
  let finalUrl;
  try { finalUrl = new URL(metadata.final_url); if (!allowedHosts.has(finalUrl.hostname)) errors.push('final URL host is outside allowlist'); } catch { errors.push('invalid final_url'); }
  if (Object.keys(metadata.sanitized_response_headers || {}).some((key) => prohibited.test(key))) errors.push('prohibited secret/session header present');
  const text = raw.toString('utf8');
  if (typeof metadata.supporting_text_span !== 'string' || text.indexOf(metadata.supporting_text_span) < 0) errors.push('supporting text span not found');
  else if (!Number.isInteger(metadata.supporting_text_offset_utf8) || utf8Offset(text, metadata.supporting_text_span) !== metadata.supporting_text_offset_utf8) errors.push('supporting text span UTF-8 offset mismatch');
  return { target_id: target.id, state: errors.length ? 'QUARANTINE_INVALID_OPERATOR_ATTACHMENT' : 'EVIDENCE_COMPLETE_INTERNAL_HELD', raw_body_sha256: sha256(raw), errors };
});
const result = { validator: 'JAYT-288', pass: results.every((item) => item.state === 'EVIDENCE_COMPLETE_INTERNAL_HELD'), results, public_approved: 0, render_permitted: false };
console.log(JSON.stringify(result, null, 2));
if (!result.pass) process.exitCode = 1;
