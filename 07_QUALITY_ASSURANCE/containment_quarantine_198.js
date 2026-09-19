const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const quarantineDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'quarantine_198');
if (!fs.existsSync(quarantineDir)) fs.mkdirSync(quarantineDir, { recursive: true });

function sha256File(p) {
  if (!fs.existsSync(p)) return null;
  return crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
}

console.log('========================================================================');
console.log('🚨 JAYT-199: CONTAINMENT & QUARANTINE OF BATCH 198');
console.log('   Timestamp: ' + new Date().toISOString());
console.log('========================================================================\n');

const filesToQuarantine = [
  '05_DEAL_AND_AFFILIATE/generated_tiered_savings_feed_198.json',
  '07_QUALITY_ASSURANCE/generate_clean_feed_198.js',
  '07_QUALITY_ASSURANCE/test_supply_sprint_198.js',
  '07_QUALITY_ASSURANCE/certify_supply_sprint_198.js',
  '08_RELEASE_VAULT/DISCLOSURE_198_REAL_SUPPLY_SPRINT.md'
];

const quarantinedReceipt = {
  quarantine_id: 'QUARANTINE_198_' + Date.now(),
  timestamp: new Date().toISOString(),
  mandate: 'CHỈ THỊ CEO KHẨN — JAYT-199: REJECT 198, RESTORE TRUTH, CONTINUE REAL SUPPLY',
  reason: 'Metiz elevated to green without 5-part verbatim quotes; 4 community records lacked physical image artifacts on disk.',
  quarantined_files: []
};

for (const relPath of filesToQuarantine) {
  const src = path.join(repoRoot, relPath);
  if (fs.existsSync(src)) {
    const baseName = path.basename(src);
    const dest = path.join(quarantineDir, baseName);
    fs.copyFileSync(src, dest);
    const sha = sha256File(src);
    quarantinedReceipt.quarantined_files.push({
      original_path: relPath,
      quarantine_dest: path.relative(repoRoot, dest),
      sha256: sha
    });
    console.log(`  🔒 Quarantined: ${relPath} -> ${path.relative(repoRoot, dest)} (${sha.substring(0, 16)}...)`);
  }
}

const receiptPath = path.join(quarantineDir, 'QUARANTINE_198_RECEIPT.json');
fs.writeFileSync(receiptPath, JSON.stringify(quarantinedReceipt, null, 2), 'utf8');
console.log(`\n📄 Quarantine Receipt saved to: ${path.relative(repoRoot, receiptPath)}`);

// Append Event to Custody Log
const eventLogPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'EVIDENCE_CUSTODY_EVENT_LOG.jsonl');
const custodyEvent = {
  event_id: 'EVENT_CONTAINMENT_198_' + Date.now(),
  timestamp: new Date().toISOString(),
  event_type: 'BATCH_198_REJECTED_AND_CONTAINED',
  work_order: 'JAYT-199',
  details: {
    receipt_file: path.relative(repoRoot, receiptPath),
    total_quarantined_files: quarantinedReceipt.quarantined_files.length
  }
};
fs.appendFileSync(eventLogPath, JSON.stringify(custodyEvent) + '\n', 'utf8');
console.log('✅ Appended Event to Evidence Custody Event Log');
console.log('========================================================================\n');
