const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const base = path.resolve(__dirname, '..');
const evidence = path.join(base, '06_TRUST_AND_EVIDENCE', 'j392', 'deals');
const safeKeys = new Set(['content-type', 'date', 'server', 'etag', 'last-modified', 'cache-control']);
const hash = value => crypto.createHash('sha256').update(value).digest('hex');

function redactReceipt(value) {
  if (Array.isArray(value)) return value.map(redactReceipt);
  if (!value || typeof value !== 'object') return value;
  const next = {};
  for (const [key, child] of Object.entries(value)) {
    if (key === 'response_headers' && child && typeof child === 'object') {
      next[key] = Object.fromEntries(Object.entries(child).filter(([header]) => safeKeys.has(header.toLowerCase())));
    } else {
      next[key] = redactReceipt(child);
    }
  }
  return next;
}

const changed = [];
for (const name of fs.readdirSync(evidence)) {
  if (!/r3.*receipt\.json$/i.test(name)) continue;
  const file = path.join(evidence, name);
  const original = fs.readFileSync(file, 'utf8');
  const sanitized = JSON.stringify(redactReceipt(JSON.parse(original)), null, 2) + '\n';
  if (sanitized !== original) {
    fs.writeFileSync(file, sanitized, 'utf8');
    changed.push(name);
  }
}

for (const name of fs.readdirSync(evidence).filter(name => /^JAYT_392_R3_EVIDENCE_SUBMISSION_SUMMARY.*\.json$/i.test(name))) {
  const file = path.join(evidence, name);
  const summary = JSON.parse(fs.readFileSync(file, 'utf8'));
  for (const candidate of Object.values(summary.candidates || {})) {
    if (!candidate.receipt_file) continue;
    const receipt = path.join(base, candidate.receipt_file);
    if (fs.existsSync(receipt)) candidate.receipt_sha256 = hash(fs.readFileSync(receipt));
  }
  fs.writeFileSync(file, JSON.stringify(summary, null, 2) + '\n', 'utf8');
}

console.log(JSON.stringify({ sanitized_receipts: changed }, null, 2));
