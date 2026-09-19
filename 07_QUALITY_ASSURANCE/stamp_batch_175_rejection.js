const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const qDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'quarantine_batch_175');

console.log('=== STAMPING REJECTED_DO_NOT_REUSE ON BATCH 175 ===');

if (fs.existsSync(qDir)) {
  const meta = {
    status: 'REJECTED_DO_NOT_REUSE',
    rejected_by: 'CEO_DIRECTIVE_JAYT_176_177',
    rejection_reason: 'Collector used hardcoded deal values and synthetic policy documents when fetch failed; elevated unverified claims to Tier 1.',
    timestamp: new Date().toISOString(),
    governance_mandate: 'Strictly prohibited from referencing, copying, or seeding any data into JAYT-177.'
  };
  fs.writeFileSync(path.join(qDir, 'BATCH_175_REJECTION_NOTICE.json'), JSON.stringify(meta, null, 2), 'utf8');
  console.log('✅ Stamped BATCH_175_REJECTION_NOTICE.json in quarantine directory.');
}

// Clean out old evidence_175_sprint so no script can accidentally reference it
const sDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_175_sprint');
if (fs.existsSync(sDir)) {
  const notice = {
    status: 'DEPRECATED_AND_QUARANTINED',
    redirect: 'See quarantine_batch_175/BATCH_175_REJECTION_NOTICE.json',
    timestamp: new Date().toISOString()
  };
  fs.writeFileSync(path.join(sDir, 'QUARANTINE_REDIRECT.json'), JSON.stringify(notice, null, 2), 'utf8');
  console.log('✅ Stamped QUARANTINE_REDIRECT.json in evidence_175_sprint directory.');
}
