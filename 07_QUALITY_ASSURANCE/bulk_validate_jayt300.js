/* JAYT-300 read-only bulk validator: it never downloads, alters, or approves evidence. */
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const trust = path.join(root, '06_TRUST_AND_EVIDENCE');
const registry = JSON.parse(fs.readFileSync(path.join(trust, 'JAYT_300_16_LEAF_PAGE_REGISTRY.json'), 'utf8'));
const vault = path.join(trust, 'batch_03_full_ingress_vault');
const digest = (bytes) => crypto.createHash('sha256').update(bytes).digest('hex');
const forbidden = /cookie|token|authorization|set-cookie/i;
const results = registry.entries.map((item) => {
  const raw = path.join(vault, `${item.id}.raw.html`);
  const meta = path.join(vault, `${item.id}.metadata.json`);
  if (!item.capture_authorized) return {id:item.id,state:'NOT_AUTHORIZED_FOR_CAPTURE'};
  if (!fs.existsSync(raw) || !fs.existsSync(meta)) return {id:item.id,state:'AWAITING_OPERATOR_RAW_ATTACHMENT'};
  try {
    const m=JSON.parse(fs.readFileSync(meta,'utf8')), bytes=fs.readFileSync(raw), text=bytes.toString('utf8');
    const fail=[];
    if(m.http_status!==200) fail.push('HTTP status is not 200');
    if(m.raw_body_sha256!==digest(bytes)) fail.push('SHA-256 mismatch');
    if(Object.keys(m.sanitized_response_headers||{}).some(k=>forbidden.test(k))) fail.push('secret/session header present');
    const at=text.indexOf(m.supporting_text_span||'');
    if(at<0||!Number.isInteger(m.supporting_text_offset_utf8)||Buffer.byteLength(text.slice(0,at),'utf8')!==m.supporting_text_offset_utf8) fail.push('UTF-8 span offset mismatch');
    return {id:item.id,state:fail.length?'QUARANTINE_INVALID_OPERATOR_ATTACHMENT':'EVIDENCE_COMPLETE_INTERNAL_HELD',errors:fail};
  } catch(error) { return {id:item.id,state:'QUARANTINE_INVALID_OPERATOR_ATTACHMENT',errors:[String(error.message)]}; }
});
const report={report_id:'JAYT_300_AUTOMATED_AUDIT_REPORT',generated_at_utc:new Date().toISOString(),results,summary:{total:results.length,evidence_complete:results.filter(r=>r.state==='EVIDENCE_COMPLETE_INTERNAL_HELD').length,public_approved:0,render_permitted:false}};
fs.writeFileSync(path.join(trust,'JAYT_300_AUTOMATED_AUDIT_REPORT.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
if(report.summary.evidence_complete!==registry.entries.filter(x=>x.capture_authorized).length)process.exitCode=1;
