const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');

function getSha256(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

const q141Dir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'batch_141_static_scheduler');
fs.mkdirSync(q141Dir, { recursive: true });

const filesToQuarantine = [
  { src: '05_DEAL_AND_AFFILIATE/run_freshness_scheduler_141.js', dst: 'run_freshness_scheduler_141.js' },
  { src: '05_DEAL_AND_AFFILIATE/generic_compiler_141.js', dst: 'generic_compiler_141.js' },
  { src: '05_DEAL_AND_AFFILIATE/batch_capture_141_manifest.json', dst: 'batch_capture_141_manifest.json' },
  { src: '07_QUALITY_ASSURANCE/test_generic_compiler_141.js', dst: 'test_generic_compiler_141.js' },
  { src: '08_RELEASE_VAULT/JAYT_141_FRESHNESS_SCHEDULER_REVIEW_PACK.md', dst: 'JAYT_141_FRESHNESS_SCHEDULER_REVIEW_PACK.md' }
];

const quarantinedArtifacts = [];

for (const f of filesToQuarantine) {
  const srcPath = path.join(repoRoot, f.src);
  const dstPath = path.join(q141Dir, f.dst);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, dstPath);
    quarantinedArtifacts.push({
      original_path: f.src,
      quarantined_path: path.relative(repoRoot, dstPath).replace(/\\/g, '/'),
      sha256: getSha256(srcPath)
    });
  }
}

// Build Quarantine Manifest 141
const quarantineManifest141 = {
  manifest_id: 'BATCH_141_QUARANTINE_MANIFEST',
  directive: 'JAYT-141R — REAL DELTA SCHEDULER EXECUTION & RECOVERY-TEST CERTIFICATION',
  status: 'STATIC_SCHEDULER_QUARANTINED',
  quarantined_at: '2026-08-27T01:10:00+07:00',
  executive_ruling: 'CEO audit rejected Batch 141 runner: runner performed static inspection rather than real delta scheduling (did not capture due sources, did not compare new vs old hashes, and did not transition state to UNCHANGED or CHANGED).',
  root_causes: [
    {
      cause_id: 'P0_CAUSE_27_STATIC_SCHEDULER_INSPECTION_ONLY',
      description: 'Runner read baseline registry without executing real live delta captures on scheduled sources or computing delta hash differences.'
    }
  ],
  quarantined_artifacts: quarantinedArtifacts
};

const qManifestPath = path.join(q141Dir, 'BATCH_141_QUARANTINE_MANIFEST.json');
fs.writeFileSync(qManifestPath, JSON.stringify(quarantineManifest141, null, 2), 'utf8');

// Build Disclosure Receipt 141R
const disclosureReceipt141r = {
  receipt_id: 'DISCLOSURE_RECEIPT_JAYT_141R_DELTA_SCHEDULER_CERTIFICATION',
  directive: 'JAYT-141R — REAL DELTA SCHEDULER EXECUTION & RECOVERY-TEST CERTIFICATION',
  severity: 'P0_SCHEDULER_EXECUTION_DEFICIT',
  status: 'STATIC_SCHEDULER_CONTAINED_AND_QUARANTINED',
  disclosed_at: '2026-08-27T01:10:00+07:00',
  executive_ruling: 'Contained static scheduler. Implementing authentic delta execution engine with recovery-test certification suite and atomic state updates.',
  root_causes: quarantineManifest141.root_causes,
  quarantine_vault: '05_DEAL_AND_AFFILIATE/quarantine_vault/batch_141_static_scheduler/',
  remediation_architecture: '05_DEAL_AND_AFFILIATE/run_delta_scheduler_141r.js & test_delta_scheduler_recovery_141r.js'
};

const disclosureReceipt141rPath = path.join(repoRoot, '08_RELEASE_VAULT', 'DISCLOSURE_RECEIPT_JAYT_141R_DELTA_SCHEDULER_CERTIFICATION.json');
fs.writeFileSync(disclosureReceipt141rPath, JSON.stringify(disclosureReceipt141r, null, 2), 'utf8');

console.log(`✅ [141R-QUARANTINE] Successfully quarantined ${quarantinedArtifacts.length} files and issued DISCLOSURE_RECEIPT_JAYT_141R.`);
