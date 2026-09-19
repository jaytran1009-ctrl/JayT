const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');

function getSha256(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

const q136tDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'batch_136t_hardcoded_compiler');
fs.mkdirSync(q136tDir, { recursive: true });

const filesToQuarantine = [
  { src: '05_DEAL_AND_AFFILIATE/evidence_bundle_compiler_136t.js', dst: 'evidence_bundle_compiler_136t.js' },
  { src: '05_DEAL_AND_AFFILIATE/batch_capture_136t_manifest.json', dst: 'batch_capture_136t_manifest.json' },
  { src: '07_QUALITY_ASSURANCE/test_evidence_bundle_compiler_136t.js', dst: 'test_evidence_bundle_compiler_136t.js' },
  { src: '08_RELEASE_VAULT/JAYT_136T_EVIDENCE_COMPILER_REVIEW_PACK.md', dst: 'JAYT_136T_EVIDENCE_COMPILER_REVIEW_PACK.md' }
];

const quarantinedArtifacts = [];

for (const f of filesToQuarantine) {
  const srcPath = path.join(repoRoot, f.src);
  const dstPath = path.join(q136tDir, f.dst);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, dstPath);
    quarantinedArtifacts.push({
      original_path: f.src,
      quarantined_path: path.relative(repoRoot, dstPath).replace(/\\/g, '/'),
      sha256: getSha256(srcPath)
    });
  }
}

// Build Quarantine Manifest 136T
const quarantineManifest136t = {
  manifest_id: 'BATCH_136T_QUARANTINE_MANIFEST',
  directive: 'JAYT-136U — REJECT INVALID BUNDLES, REBUILD GENERIC PROVENANCE GATES',
  status: 'HARDCODED_COMPILER_QUARANTINED',
  quarantined_at: '2026-08-26T19:12:00+07:00',
  executive_ruling: 'Batch 136T rejected due to residual brand/voucher hardcoding in compiler patterns, insufficient context window threshold (<200 chars in test), unverified standalone voucher code as offer, out-of-province address leakage into locality, and unauthorized live deployment during data work order.',
  root_causes: [
    {
      cause_id: 'P0_CAUSE_13_RESIDUAL_BRAND_AND_VOUCHER_HARDCODING',
      description: 'evidence_bundle_compiler_136t.js contained specific brand names (cgv, domino, galaxy) and specific voucher codes (COMBOHE10K) in regex patterns and lineage matcher.'
    },
    {
      cause_id: 'P0_CAUSE_14_INSUFFICIENT_CONTEXT_WINDOW_GATE',
      description: 'Test gate accepted context windows of 100 characters instead of enforcing the mandatory >= 200 character minimum.'
    },
    {
      cause_id: 'P0_CAUSE_15_STANDALONE_VOUCHER_CODE_WITHOUT_BENEFIT',
      description: 'Standalone voucher code COMBOHE10K was accepted as offer without extracting the full substantive benefit sentence.'
    },
    {
      cause_id: 'P0_CAUSE_16_OUT_OF_PROVINCE_ADDRESS_LEAKAGE',
      description: 'Loose locality matching accepted addresses without full Da Nang administrative bounding or conflicting provincial context.'
    },
    {
      cause_id: 'P0_CAUSE_17_UNAUTHORIZED_DEPLOYMENT_DURING_DATA_ORDER',
      description: 'Release script was executed to deploy to live CDN during a data collection/compiler evaluation work order.'
    }
  ],
  quarantined_artifacts: quarantinedArtifacts
};

const qManifestPath = path.join(q136tDir, 'BATCH_136T_QUARANTINE_MANIFEST.json');
fs.writeFileSync(qManifestPath, JSON.stringify(quarantineManifest136t, null, 2), 'utf8');

// Build Disclosure Receipt 136U
const disclosureReceipt136u = {
  receipt_id: 'DISCLOSURE_RECEIPT_JAYT_136U',
  directive: 'JAYT-136U — REJECT INVALID BUNDLES, REBUILD GENERIC PROVENANCE GATES',
  severity: 'P0_COMPILER_HARDCODING_AND_PROVENANCE_DEFICIT',
  status: 'HARDCODED_COMPILER_CONTAINED_AND_QUARANTINED',
  disclosed_at: '2026-08-26T19:12:00+07:00',
  executive_ruling: 'Independent CEO audit discovered residual brand/voucher hardcoding in 136T compiler, insufficient context window checks, and standalone voucher code extraction. Entire 136T manifest rejected and quarantined. Zero live deploy permitted.',
  root_causes: quarantineManifest136t.root_causes,
  quarantine_vault: '05_DEAL_AND_AFFILIATE/quarantine_vault/batch_136t_hardcoded_compiler/',
  remediation_architecture: '05_DEAL_AND_AFFILIATE/generic_provenance_compiler_136u.js (Zero-Hardcoding Pure Semantic Provenance Compiler)'
};

const disclosureReceipt136uPath = path.join(repoRoot, '08_RELEASE_VAULT', 'DISCLOSURE_RECEIPT_JAYT_136U_GENERIC_PROVENANCE_REBUILD.json');
fs.writeFileSync(disclosureReceipt136uPath, JSON.stringify(disclosureReceipt136u, null, 2), 'utf8');

console.log(`✅ [136U-QUARANTINE] Successfully quarantined ${quarantinedArtifacts.length} files and issued DISCLOSURE_RECEIPT_JAYT_136U.`);
