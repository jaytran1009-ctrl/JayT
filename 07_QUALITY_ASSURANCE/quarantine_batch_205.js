const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const containmentEvidenceDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_206_containment');
if (!fs.existsSync(containmentEvidenceDir)) fs.mkdirSync(containmentEvidenceDir, { recursive: true });

function sha256Buf(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }
function sha256File(p) { return fs.existsSync(p) ? sha256Buf(fs.readFileSync(p)) : null; }

console.log('========================================================================');
console.log('🚫 JAYT-206: QUARANTINE OF BATCH 205 (UNBOUND LITERAL CLAIMS)');
console.log('   Timestamp: ' + new Date().toISOString());
console.log('========================================================================\n');

const quarantinedFiles = [
  '05_DEAL_AND_AFFILIATE/generated_tiered_savings_feed_205.json',
  '07_QUALITY_ASSURANCE/tiered_content_policy_205.js',
  '07_QUALITY_ASSURANCE/generate_tiered_feed_205.js',
  '07_QUALITY_ASSURANCE/test_tiered_content_policy_205.js',
  '07_QUALITY_ASSURANCE/certify_tiered_content_205.js',
  '08_RELEASE_VAULT/DISCLOSURE_205_TIERED_CONTENT_POLICY.md'
];

const quarantineManifest = {
  quarantine_batch: 'BATCH_205_CONTAINMENT',
  directive: 'CHỈ THỊ CEO KHẨN — JAYT-206: SOURCE-FIRST CARD ENGINE',
  timestamp: new Date().toISOString(),
  decision: 'JAYT-205_REJECTED',
  reason: 'Batch 205 cards were defined with literal text in generator without source-first physical artifact binding and per-record SHA-256 validation.',
  quarantined_assets: []
};

quarantinedFiles.forEach(relPath => {
  const fullPath = path.join(repoRoot, relPath);
  if (fs.existsSync(fullPath)) {
    const sha = sha256File(fullPath);
    quarantineManifest.quarantined_assets.push({
      file: relPath,
      sha256: sha,
      status: 'QUARANTINED_READ_ONLY_AUDIT_TRAIL'
    });
    console.log(`  🔒 Quarantined: ${relPath} (SHA: ${sha ? sha.substring(0, 16) : 'N/A'}...)`);
  }
});

const logPath = path.join(containmentEvidenceDir, 'QUARANTINE_LOG_205.json');
fs.writeFileSync(logPath, JSON.stringify(quarantineManifest, null, 2), 'utf8');
console.log('\n📄 Quarantine Log saved to: ' + path.relative(repoRoot, logPath));
