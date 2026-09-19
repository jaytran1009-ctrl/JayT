const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');

function getSha256(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

const q143Dir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'batch_143_synthetic_receipt_quarantine');
fs.mkdirSync(q143Dir, { recursive: true });

const filesToQuarantine = [
  { src: '05_DEAL_AND_AFFILIATE/browser_capture_harness_143.js', dst: 'browser_capture_harness_143.js' },
  { src: '05_DEAL_AND_AFFILIATE/strict_receipt_truth_verifier_143.js', dst: 'strict_receipt_truth_verifier_143.js' },
  { src: '05_DEAL_AND_AFFILIATE/strict_semantic_root_dom_parser_143.js', dst: 'strict_semantic_root_dom_parser_143.js' },
  { src: '05_DEAL_AND_AFFILIATE/address_unit_locality_verifier_143.js', dst: 'address_unit_locality_verifier_143.js' },
  { src: '05_DEAL_AND_AFFILIATE/process_batch_143.js', dst: 'process_batch_143.js' },
  { src: '05_DEAL_AND_AFFILIATE/generic_compiler_143.js', dst: 'generic_compiler_143.js' },
  { src: '05_DEAL_AND_AFFILIATE/brand_locality_registry_143.json', dst: 'brand_locality_registry_143.json' },
  { src: '05_DEAL_AND_AFFILIATE/batch_capture_143_table.json', dst: 'batch_capture_143_table.json' },
  { src: '05_DEAL_AND_AFFILIATE/batch_capture_143_manifest.json', dst: 'batch_capture_143_manifest.json' },
  { src: '07_QUALITY_ASSURANCE/test_fresh_capture_143.js', dst: 'test_fresh_capture_143.js' },
  { src: '08_RELEASE_VAULT/JAYT_143_FRESH_CAPTURE_PACK.md', dst: 'JAYT_143_FRESH_CAPTURE_PACK.md' }
];

const quarantinedArtifacts = [];

for (const f of filesToQuarantine) {
  const srcPath = path.join(repoRoot, f.src);
  const dstPath = path.join(q143Dir, f.dst);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, dstPath);
    quarantinedArtifacts.push({
      original_path: f.src,
      quarantined_path: path.relative(repoRoot, dstPath).replace(/\\/g, '/'),
      sha256: getSha256(srcPath)
    });
  }
}

// Quarantine Manifest 143
const quarantineManifest143 = {
  manifest_id: 'BATCH_143_QUARANTINE_MANIFEST',
  directive: 'JAYT-143R: CAPTURE-PROVENANCE INCIDENT, HARNESS CERTIFICATION & SCHEDULER FREEZE',
  status: 'REJECTED_FOR_SYNTHETIC_RECEIPT_FALLBACKS',
  quarantined_at: new Date().toISOString(),
  executive_ruling: 'CEO audit revealed that browser_capture_harness_143.js contained synthetic fallbacks (defaulting to HTTP 200 or 504 on missing response, synthesizing redirect_chain arrays, and launching with insecure flags --disable-web-security and --ignore-certificate-errors). Quarantining derived 143 files. Freezing autonomous scheduler pending local harness certification.',
  root_causes: [
    {
      cause_id: 'P0_CAUSE_40_SYNTHETIC_RECEIPT_STATUS_AND_REDIRECT_FALLBACK',
      description: 'Permitted ternary fallbacks (resolvedStatus = ... ? ... : (networkError ? 504 : 200); redirect_chain = ... ? actual : [{ finalUrl, resolvedStatus }]) synthesizing receipt fields when no browser network event was observed.'
    },
    {
      cause_id: 'P0_CAUSE_41_INSECURE_BROWSER_LAUNCH_FLAGS',
      description: 'Used --disable-web-security and --ignore-certificate-errors flags during browser launch.'
    }
  ],
  quarantined_artifacts: quarantinedArtifacts
};

fs.writeFileSync(path.join(q143Dir, 'BATCH_143_QUARANTINE_MANIFEST.json'), JSON.stringify(quarantineManifest143, null, 2), 'utf8');

// Build Disclosure Receipt 143R
const disclosureReceipt143r = {
  receipt_id: 'DISCLOSURE_RECEIPT_JAYT_143R_CAPTURE_PROVENANCE_INCIDENT',
  directive: 'JAYT-143R: CAPTURE-PROVENANCE INCIDENT, HARNESS CERTIFICATION & SCHEDULER FREEZE',
  severity: 'P0_CAPTURE_PROVENANCE_INCIDENT',
  status: 'HARNESS_CERTIFICATION_MANDATED_SCHEDULER_FROZEN',
  disclosed_at: new Date().toISOString(),
  executive_ruling: 'Freezing scheduler, isolating synthetic 143 receipt outputs, building local test-server certification for capture harness, and requiring byte-level provenance verification before re-crawling live targets.',
  root_causes: quarantineManifest143.root_causes,
  quarantine_vault: '05_DEAL_AND_AFFILIATE/quarantine_vault/batch_143_synthetic_receipt_quarantine/'
};

const disclosureReceipt143rPath = path.join(repoRoot, '08_RELEASE_VAULT', 'DISCLOSURE_RECEIPT_JAYT_143R_CAPTURE_PROVENANCE_INCIDENT.json');
fs.writeFileSync(disclosureReceipt143rPath, JSON.stringify(disclosureReceipt143r, null, 2), 'utf8');

console.log(`✅ [143R-QUARANTINE] Quarantined ${quarantinedArtifacts.length} files and issued DISCLOSURE_RECEIPT_JAYT_143R_CAPTURE_PROVENANCE_INCIDENT.`);
