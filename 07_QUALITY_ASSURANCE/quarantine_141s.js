const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');

function getSha256(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

const q141sDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'batch_141s_greedy_normalizer');
fs.mkdirSync(q141sDir, { recursive: true });

const filesToQuarantine = [
  { src: '05_DEAL_AND_AFFILIATE/semantic_normalizer_141s.js', dst: 'semantic_normalizer_141s.js' },
  { src: '05_DEAL_AND_AFFILIATE/run_semantic_scheduler_141s.js', dst: 'run_semantic_scheduler_141s.js' },
  { src: '05_DEAL_AND_AFFILIATE/generic_compiler_141s.js', dst: 'generic_compiler_141s.js' },
  { src: '05_DEAL_AND_AFFILIATE/batch_capture_141s_manifest.json', dst: 'batch_capture_141s_manifest.json' },
  { src: '07_QUALITY_ASSURANCE/test_semantic_delta_recovery_141s.js', dst: 'test_semantic_delta_recovery_141s.js' },
  { src: '07_QUALITY_ASSURANCE/test_generic_compiler_141s.js', dst: 'test_generic_compiler_141s.js' },
  { src: '08_RELEASE_VAULT/JAYT_141S_SEMANTIC_DELTA_REVIEW_PACK.md', dst: 'JAYT_141S_SEMANTIC_DELTA_REVIEW_PACK.md' }
];

const quarantinedArtifacts = [];

for (const f of filesToQuarantine) {
  const srcPath = path.join(repoRoot, f.src);
  const dstPath = path.join(q141sDir, f.dst);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, dstPath);
    quarantinedArtifacts.push({
      original_path: f.src,
      quarantined_path: path.relative(repoRoot, dstPath).replace(/\\/g, '/'),
      sha256: getSha256(srcPath)
    });
  }
}

// Build Quarantine Manifest 141S
const quarantineManifest141s = {
  manifest_id: 'BATCH_141S_QUARANTINE_MANIFEST',
  directive: 'JAYT-141T — SEMANTIC INTEGRITY REPAIR BEFORE AUTONOMOUS ACTIVATION',
  status: 'GREEDY_NORMALIZER_QUARANTINED',
  quarantined_at: '2026-08-27T01:20:00+07:00',
  executive_ruling: 'CEO audit identified greedy normalizer defects: greedy div deletion stripped valid offer banners, regex stripped valid operational hours (HH:MM:SS), registry lacked baseline semantic snapshots, and keyword-based delta detection was brittle.',
  root_causes: [
    {
      cause_id: 'P0_CAUSE_28_GREEDY_BANNER_AND_TIME_DELETION',
      description: 'Greedy regex stripped div matching banner/popup and stripped HH:MM:SS operational condition hours.'
    },
    {
      cause_id: 'P0_CAUSE_29_MISSING_STRUCTURED_SEMANTIC_BASELINE_SNAPSHOT',
      description: 'Registry lacked structured semantic snapshot, causing inability to compare structured offer blocks and links.'
    }
  ],
  quarantined_artifacts: quarantinedArtifacts
};

const qManifestPath = path.join(q141sDir, 'BATCH_141S_QUARANTINE_MANIFEST.json');
fs.writeFileSync(qManifestPath, JSON.stringify(quarantineManifest141s, null, 2), 'utf8');

// Build Disclosure Receipt 141T
const disclosureReceipt141t = {
  receipt_id: 'DISCLOSURE_RECEIPT_JAYT_141T_SEMANTIC_INTEGRITY',
  directive: 'JAYT-141T — SEMANTIC INTEGRITY REPAIR BEFORE AUTONOMOUS ACTIVATION',
  severity: 'P0_NORMALIZER_INTEGRITY_DEFICIT',
  status: 'GREEDY_NORMALIZER_CONTAINED_AND_QUARANTINED',
  disclosed_at: '2026-08-27T01:20:00+07:00',
  executive_ruling: 'Contained greedy normalizer. Implementing DOM-aware bounded normalizer preserving banners, operational hours, structured semantic snapshots, and true block diffing.',
  root_causes: quarantineManifest141s.root_causes,
  quarantine_vault: '05_DEAL_AND_AFFILIATE/quarantine_vault/batch_141s_greedy_normalizer/',
  remediation_architecture: '05_DEAL_AND_AFFILIATE/semantic_normalizer_141t.js & fresh_source_registry_141t.json'
};

const disclosureReceipt141tPath = path.join(repoRoot, '08_RELEASE_VAULT', 'DISCLOSURE_RECEIPT_JAYT_141T_SEMANTIC_INTEGRITY.json');
fs.writeFileSync(disclosureReceipt141tPath, JSON.stringify(disclosureReceipt141t, null, 2), 'utf8');

console.log(`✅ [141T-QUARANTINE] Successfully quarantined ${quarantinedArtifacts.length} files and issued DISCLOSURE_RECEIPT_JAYT_141T.`);
