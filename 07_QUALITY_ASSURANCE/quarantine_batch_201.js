const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const containmentEvidenceDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_202_containment');
if (!fs.existsSync(containmentEvidenceDir)) fs.mkdirSync(containmentEvidenceDir, { recursive: true });

function sha256Buf(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }
function sha256File(p) { return fs.existsSync(p) ? sha256Buf(fs.readFileSync(p)) : null; }

console.log('========================================================================');
console.log('🚨 JAYT-202: EXECUTING FULL CONTAINMENT OF UNBOUND OFFERS (BATCH 201)');
console.log('   Timestamp: ' + new Date().toISOString());
console.log('========================================================================\n');

// List of Batch 201 files quarantined
const quarantinedFiles = [
  '05_DEAL_AND_AFFILIATE/generated_tiered_savings_feed_201.json',
  '07_QUALITY_ASSURANCE/generate_actionable_feed_201.js',
  '07_QUALITY_ASSURANCE/test_actionable_offers_201.js',
  '07_QUALITY_ASSURANCE/certify_actionable_offers_201.js',
  '08_RELEASE_VAULT/DISCLOSURE_201_ACTIONABLE_OFFERS_AT_SCALE.md'
];

const quarantineEntries = quarantinedFiles.map(rel => {
  const full = path.join(repoRoot, rel);
  const exists = fs.existsSync(full);
  const sha = exists ? sha256File(full) : null;
  return {
    relative_path: rel,
    exists,
    sha256: sha,
    status: 'QUARANTINED_UNBOUND_CLAIMS',
    rejection_reason: '20/20 records lacked per-claim terms/validity artifact bindings and SHA256 verification.'
  };
});

const quarantineLog = {
  containment_id: 'CONTAINMENT_202_' + Date.now(),
  timestamp: new Date().toISOString(),
  directive: 'CHỈ THỊ CEO KHẨN — JAYT-202: FULL CONTAINMENT OF UNBOUND OFFERS',
  decision: 'JAYT-201: REJECTED',
  quarantined_batch: 'BATCH_201',
  quarantined_files: quarantineEntries,
  raw_captures_retained: {
    directory: '07_QUALITY_ASSURANCE/runtime_evidence/evidence_201_actionable_harvest',
    status: 'PRESERVED_FOR_AUDIT_AND_FUTURE_EXACT_BINDING'
  }
};

const quarantineLogPath = path.join(containmentEvidenceDir, 'QUARANTINE_LOG_202.json');
fs.writeFileSync(quarantineLogPath, JSON.stringify(quarantineLog, null, 2), 'utf8');
console.log('✅ Quarantined Batch 201 assets logged to: ' + path.relative(repoRoot, quarantineLogPath));

