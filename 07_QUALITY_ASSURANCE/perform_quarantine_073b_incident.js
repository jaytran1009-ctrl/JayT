/**
 * JAYT 073B SYNTHETIC FEED & FALSE G4 CONTAINMENT ENGINE
 * Directive: JAYT-073B-INCIDENT — SYNTHETIC FEED AND FALSE G4 CONTAINMENT
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const quarantineDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'batch_073b_synthetic_feed');
fs.mkdirSync(quarantineDir, { recursive: true });

function getSha256(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

const filesToQuarantine = [
  {
    src: path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'feed_gateway', 'provider_docs', 'shopee_affiliate_product_feed_export_raw.csv'),
    filename: 'shopee_affiliate_product_feed_export_raw.csv',
    type: 'SYNTHESIZED_CSV_FILE',
    reason: 'Agent-created CSV transcribed from text/screenshot instead of raw human-provided file export.'
  },
  {
    src: path.join(repoRoot, '07_QUALITY_ASSURANCE', 'process_shopee_product_feed_batch_073b.js'),
    filename: 'process_shopee_product_feed_batch_073b.js',
    type: 'SYNTHETIC_PROCESSOR_SCRIPT',
    reason: 'Hardcoded 7-day schedule and synthesized G4 threshold claims without valid_to/terms.'
  },
  {
    src: path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'SHOPEE_AFFILIATE_BATCH_REVIEW_PACK_073B.md'),
    filename: 'SHOPEE_AFFILIATE_BATCH_REVIEW_PACK_073B.md',
    type: 'INVALID_REVIEW_PACK_MD',
    reason: 'Review pack generated from agent-created CSV and synthetic 7-day schedule.'
  },
  {
    src: path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'SHOPEE_AFFILIATE_BATCH_REVIEW_PACK_073B.json'),
    filename: 'SHOPEE_AFFILIATE_BATCH_REVIEW_PACK_073B.json',
    type: 'INVALID_REVIEW_PACK_JSON',
    reason: 'JSON review pack generated from agent-created CSV.'
  }
];

// Check raw evidence run directory
const runDirName = 'run_shopee_product_feed_1787560615273';
const rawEvidenceRunDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'raw_evidence', runDirName);
if (fs.existsSync(rawEvidenceRunDir)) {
  for (const f of fs.readdirSync(rawEvidenceRunDir)) {
    filesToQuarantine.push({
      src: path.join(rawEvidenceRunDir, f),
      filename: `${runDirName}_${f}`,
      type: 'SYNTHETIC_RAW_EVIDENCE',
      reason: 'Raw payload and receipt minted from agent-created CSV.'
    });
  }
}

const quarantinedEntries = [];
console.log('🔒 [CONTAINMENT-073B] Bắt đầu cô lập các file 073B vào quarantine vault...');

for (const item of filesToQuarantine) {
  if (fs.existsSync(item.src)) {
    const sha = getSha256(item.src);
    const size = fs.statSync(item.src).size;
    const dst = path.join(quarantineDir, item.filename);

    fs.copyFileSync(item.src, dst);
    fs.unlinkSync(item.src);

    const dstSha = getSha256(dst);
    if (sha !== dstSha) {
      throw new Error(`BYTE-FOR-BYTE CORRUPTION ON QUARANTINE: ${item.filename}`);
    }

    quarantinedEntries.push({
      filename: item.filename,
      type: item.type,
      size_bytes: size,
      sha256: sha,
      quarantine_reason: item.reason
    });
    console.log(`  📦 Quarantined: ${item.filename} (${size} B, SHA: ${sha.slice(0, 16)}...)`);
  }
}

// Remove empty raw evidence run dir if empty
if (fs.existsSync(rawEvidenceRunDir) && fs.readdirSync(rawEvidenceRunDir).length === 0) {
  fs.rmdirSync(rawEvidenceRunDir);
}

// Write Quarantine Manifest
const manifest = {
  $schema: 'https://jayt.vn/schemas/quarantine-manifest.v1.json',
  manifest_id: 'QUARANTINE_MANIFEST_BATCH_073B',
  work_order: 'JAYT-073B-INCIDENT',
  quarantine_reason: '073B REJECTED: Agent-created CSV was not a human-provided dashboard export; G4 day coverage was synthetic without valid_to/terms evidence.',
  quarantined_at: new Date().toISOString(),
  snapshot_byte_for_byte_persisted: true,
  total_files_quarantined: quarantinedEntries.length,
  items: quarantinedEntries
};

const manifestPath = path.join(quarantineDir, 'QUARANTINE_MANIFEST_BATCH_073B.json');
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
const manifestSha = getSha256(manifestPath);

console.log(`\n📋 [MANIFEST-SAVED] ${manifestPath}`);
console.log(`   SHA-256: ${manifestSha}`);
console.log(`   Total items quarantined: ${quarantinedEntries.length}`);
