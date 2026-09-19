/* JAYT-284 deadline guard: observational only; it cannot fabricate evidence or change authority. */
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const vault = path.join(root, '06_TRUST_AND_EVIDENCE/batch_03b_micro_capture_vault');
const expected = ['BATCH03_HK_04', 'BATCH03_HC_07', 'BATCH03_DS_07'];
const attachmentStatus = expected.map((id) => ({
  target_id: id,
  raw_html_present: fs.existsSync(path.join(vault, `${id}.operator.raw.html`)),
  metadata_present: fs.existsSync(path.join(vault, `${id}.operator.metadata.json`))
}));
const missing = attachmentStatus.filter((item) => !item.raw_html_present || !item.metadata_present);
const result = {
  audit_id: 'JAYT-284-DEADLINE-GUARD',
  checked_at_utc: new Date().toISOString(),
  attachment_status: attachmentStatus,
  outcome: missing.length === 0 ? 'READY_FOR_JAYT_279_VALIDATOR' : 'EXECUTIVE_ESCALATION_REQUIRED__RAW_ATTACHMENT_INCOMPLETE',
  automatic_actions_performed: { public_approval: false, staging_hydrate: false, production_mutation: false },
  next_action: missing.length === 0
    ? 'Run JAYT-279 validator, then obtain item-level CEO PUBLIC_APPROVED before Staging hydration.'
    : 'Lead Operator must provide both raw HTML and metadata attachments for every missing target; no evidence may be synthesized.'
};
console.log(JSON.stringify(result, null, 2));
if (missing.length) process.exitCode = 1;
