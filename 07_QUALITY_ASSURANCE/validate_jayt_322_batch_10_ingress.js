const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const scope = JSON.parse(fs.readFileSync(path.join(ROOT, '06_TRUST_AND_EVIDENCE/JAYT_322_BATCH_10_TARGETED_INGRESS_SCOPE.json'), 'utf8'));
const vault = path.join(ROOT, scope.vault);
const forbiddenHeader = /cookie|token|authorization|set-cookie/i;
const results = [];

for (const target of scope.targets) {
  const rawPath = path.join(vault, `${target.slot_id}.raw.html`);
  const metadataPath = path.join(vault, `${target.slot_id}.headers.json`);
  const result = { slot_id: target.slot_id, candidate_id: target.candidate_id, status: 'AWAITING_OPERATOR_RAW_ATTACHMENT' };

  if (!fs.existsSync(rawPath) || !fs.existsSync(metadataPath)) {
    result.missing = [!fs.existsSync(rawPath) && 'raw body', !fs.existsSync(metadataPath) && 'headers metadata'].filter(Boolean);
    results.push(result);
    continue;
  }

  try {
    const raw = fs.readFileSync(rawPath);
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    const headers = metadata.headers || {};
    const sensitiveHeader = Object.keys(headers).find(key => forbiddenHeader.test(key));
    const body = raw.toString('utf8');
    const spanOffset = Buffer.byteLength(body.slice(0, body.indexOf(target.expected_text_span)), 'utf8');
    const occurrences = body.split(target.expected_text_span).length - 1;

    result.sha256 = crypto.createHash('sha256').update(raw).digest('hex');
    result.http_status = metadata.http_status;
    result.final_url = metadata.final_url;
    result.supporting_text_offset_utf8 = spanOffset;

    if (metadata.http_status !== 200 || metadata.final_url !== target.leaf_url || metadata.headers_redacted !== true || sensitiveHeader || occurrences !== 1) {
      result.status = 'INTAKE_FAILED__QUARANTINE';
      result.reason = sensitiveHeader ? `sensitive header: ${sensitiveHeader}` : 'HTTP, final URL, header-redaction, or exact-span validation failed';
    } else {
      result.status = 'EVIDENCE_COMPLETE_INTERNAL_HELD__AWAITING_CEO_ITEM_APPROVAL';
      result.span_occurrences = occurrences;
    }
  } catch (error) {
    result.status = 'INTAKE_FAILED__QUARANTINE';
    result.reason = error.message;
  }
  results.push(result);
}

const report = {
  report_id: 'JAYT_322_BATCH_10_INGRESS_VALIDATION_REPORT',
  governing_directive: 'JAYT-322',
  fail_closed: true,
  results,
  evidence_complete_internal_held: results.filter(r => r.status.startsWith('EVIDENCE_COMPLETE')).length,
  public_approved: 0,
  render_permitted: false
};
fs.writeFileSync(path.join(ROOT, '06_TRUST_AND_EVIDENCE/JAYT_322_BATCH_10_INGRESS_VALIDATION_REPORT.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
if (report.evidence_complete_internal_held !== scope.targets.length) process.exitCode = 1;
