const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');

function getSha256(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

const q140Dir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'batch_140_synthetic_loop_provenance');
fs.mkdirSync(q140Dir, { recursive: true });

const filesToQuarantine = [
  { src: '05_DEAL_AND_AFFILIATE/fresh_source_registry_140.json', dst: 'fresh_source_registry_140.json' },
  { src: '05_DEAL_AND_AFFILIATE/community_signal_queue_140.json', dst: 'community_signal_queue_140.json' },
  { src: '05_DEAL_AND_AFFILIATE/inbound_evidence_intake_140.json', dst: 'inbound_evidence_intake_140.json' },
  { src: '05_DEAL_AND_AFFILIATE/generic_compiler_140.js', dst: 'generic_compiler_140.js' },
  { src: '05_DEAL_AND_AFFILIATE/batch_capture_140_manifest.json', dst: 'batch_capture_140_manifest.json' },
  { src: '07_QUALITY_ASSURANCE/test_generic_compiler_140.js', dst: 'test_generic_compiler_140.js' },
  { src: '08_RELEASE_VAULT/JAYT_140_FRESH_SUPPLY_REVIEW_PACK.md', dst: 'JAYT_140_FRESH_SUPPLY_REVIEW_PACK.md' }
];

const quarantinedArtifacts = [];

for (const f of filesToQuarantine) {
  const srcPath = path.join(repoRoot, f.src);
  const dstPath = path.join(q140Dir, f.dst);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, dstPath);
    quarantinedArtifacts.push({
      original_path: f.src,
      quarantined_path: path.relative(repoRoot, dstPath).replace(/\\/g, '/'),
      sha256: getSha256(srcPath)
    });
  }
}

// Build Quarantine Manifest 140
const quarantineManifest140 = {
  manifest_id: 'BATCH_140_QUARANTINE_MANIFEST',
  directive: 'JAYT-140R — OPERATING-LOOP PROVENANCE RECOVERY & NO-SYNTHETIC-INPUT ENFORCEMENT',
  status: 'SYNTHETIC_LOOP_PROVENANCE_QUARANTINED',
  quarantined_at: '2026-08-27T01:00:00+07:00',
  executive_ruling: 'CEO audit rejected Batch 140 output: pattern/placeholder hashes in fresh registry, seeded synthetic community signals with simulated user descriptions, and compiler reading historic 139 corpus instead of authentic fresh loop run.',
  root_causes: [
    {
      cause_id: 'P0_CAUSE_24_SYNTHETIC_HASH_PATTERNS_IN_REGISTRY',
      description: 'Fresh source registry contained repeated hex pattern hashes instead of hashes calculated from authentic physical capture artifacts on disk.'
    },
    {
      cause_id: 'P0_CAUSE_25_SEEDED_MOCK_COMMUNITY_SIGNALS',
      description: 'Community signal queue contained pre-seeded mock submissions with simulated submitters, timestamps, and deal descriptions without authentic physical intake receipts.'
    },
    {
      cause_id: 'P0_CAUSE_26_HISTORIC_CORPUS_CONFUSION',
      description: 'Compiler evaluated historic 139 corpus instead of executing an authentic fresh capture differential run.'
    }
  ],
  quarantined_artifacts: quarantinedArtifacts
};

const qManifestPath = path.join(q140Dir, 'BATCH_140_QUARANTINE_MANIFEST.json');
fs.writeFileSync(qManifestPath, JSON.stringify(quarantineManifest140, null, 2), 'utf8');

// Build Disclosure Receipt 140R
const disclosureReceipt140r = {
  receipt_id: 'DISCLOSURE_RECEIPT_JAYT_140R_PROVENANCE_RECOVERY',
  directive: 'JAYT-140R — OPERATING-LOOP PROVENANCE RECOVERY & NO-SYNTHETIC-INPUT ENFORCEMENT',
  severity: 'P0_OPERATING_LOOP_PROVENANCE_DEFICIT',
  status: 'SYNTHETIC_LOOP_CONTAINED_AND_QUARANTINED',
  disclosed_at: '2026-08-27T01:00:00+07:00',
  executive_ruling: 'Contained all synthetic registry hashes, seeded community signals, and historic corpus confusion. Established authentic fresh differential runner with physical receipts.',
  root_causes: quarantineManifest140.root_causes,
  quarantine_vault: '05_DEAL_AND_AFFILIATE/quarantine_vault/batch_140_synthetic_loop_provenance/',
  remediation_architecture: '05_DEAL_AND_AFFILIATE/run_fresh_source_loop_140r.js & generic_compiler_140r.js'
};

const disclosureReceipt140rPath = path.join(repoRoot, '08_RELEASE_VAULT', 'DISCLOSURE_RECEIPT_JAYT_140R_PROVENANCE_RECOVERY.json');
fs.writeFileSync(disclosureReceipt140rPath, JSON.stringify(disclosureReceipt140r, null, 2), 'utf8');

console.log(`✅ [140R-QUARANTINE] Successfully quarantined ${quarantinedArtifacts.length} files and issued DISCLOSURE_RECEIPT_JAYT_140R.`);
