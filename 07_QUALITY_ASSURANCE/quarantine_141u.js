const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');

function getSha256(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

const q141uDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'batch_141u_regex_dom_parser');
fs.mkdirSync(q141uDir, { recursive: true });

const filesToQuarantine = [
  { src: '05_DEAL_AND_AFFILIATE/atomic_dom_normalizer_141u.js', dst: 'atomic_dom_normalizer_141u.js' },
  { src: '05_DEAL_AND_AFFILIATE/reprocess_captures_141u.js', dst: 'reprocess_captures_141u.js' },
  { src: '05_DEAL_AND_AFFILIATE/generic_compiler_141u.js', dst: 'generic_compiler_141u.js' },
  { src: '05_DEAL_AND_AFFILIATE/batch_capture_141u_manifest.json', dst: 'batch_capture_141u_manifest.json' },
  { src: '07_QUALITY_ASSURANCE/test_atomic_dom_boundary_141u.js', dst: 'test_atomic_dom_boundary_141u.js' },
  { src: '07_QUALITY_ASSURANCE/test_generic_compiler_141u.js', dst: 'test_generic_compiler_141u.js' },
  { src: '08_RELEASE_VAULT/JAYT_141U_ATOMIC_DOM_REVIEW_PACK.md', dst: 'JAYT_141U_ATOMIC_DOM_REVIEW_PACK.md' }
];

const quarantinedArtifacts = [];

for (const f of filesToQuarantine) {
  const srcPath = path.join(repoRoot, f.src);
  const dstPath = path.join(q141uDir, f.dst);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, dstPath);
    quarantinedArtifacts.push({
      original_path: f.src,
      quarantined_path: path.relative(repoRoot, dstPath).replace(/\\/g, '/'),
      sha256: getSha256(srcPath)
    });
  }
}

// Build Quarantine Manifest 141U
const quarantineManifest141u = {
  manifest_id: 'BATCH_141U_QUARANTINE_MANIFEST',
  directive: 'JAYT-141V — BROWSER-NATIVE DOM PROVENANCE & AUTONOMOUS LOOP READINESS',
  status: 'REGEX_DOM_PARSER_QUARANTINED',
  quarantined_at: '2026-08-27T01:30:00+07:00',
  executive_ruling: 'CEO audit ruled that regex/string-based DOM parsing and synthetic nth-of-type selectors do not guarantee re-verifiable DOM provenance. Migrating to browser-native DOM extraction with selector re-query hash verification.',
  root_causes: [
    {
      cause_id: 'P0_CAUSE_31_REGEX_DOM_AND_SYNTHETIC_SELECTOR_DEFICIT',
      description: '141U parsed HTML with regex stack and generated nth-of-type selectors without browser re-query hash verification.'
    }
  ],
  quarantined_artifacts: quarantinedArtifacts
};

const qManifestPath = path.join(q141uDir, 'BATCH_141U_QUARANTINE_MANIFEST.json');
fs.writeFileSync(qManifestPath, JSON.stringify(quarantineManifest141u, null, 2), 'utf8');

// Build Disclosure Receipt 141V
const disclosureReceipt141v = {
  receipt_id: 'DISCLOSURE_RECEIPT_JAYT_141V_BROWSER_DOM_PROVENANCE',
  directive: 'JAYT-141V — BROWSER-NATIVE DOM PROVENANCE & AUTONOMOUS LOOP READINESS',
  severity: 'P0_BROWSER_DOM_PROVENANCE_MANDATE',
  status: 'REGEX_PARSER_DECOMMISSIONED_BROWSER_DOM_ENFORCED',
  disclosed_at: '2026-08-27T01:30:00+07:00',
  executive_ruling: 'All DOM fragments must be extracted natively via browser DOM with concrete CSS selector, outerHTML SHA-256, selector revalidation check, absolute URL resolution, and field provenance.',
  root_causes: quarantineManifest141u.root_causes,
  quarantine_vault: '05_DEAL_AND_AFFILIATE/quarantine_vault/batch_141u_regex_dom_parser/',
  remediation_architecture: '05_DEAL_AND_AFFILIATE/browser_dom_provenance_141v.js & fresh_source_registry_141v.json'
};

const disclosureReceipt141vPath = path.join(repoRoot, '08_RELEASE_VAULT', 'DISCLOSURE_RECEIPT_JAYT_141V_BROWSER_DOM_PROVENANCE.json');
fs.writeFileSync(disclosureReceipt141vPath, JSON.stringify(disclosureReceipt141v, null, 2), 'utf8');

console.log(`✅ [141V-QUARANTINE] Successfully quarantined ${quarantinedArtifacts.length} files and issued DISCLOSURE_RECEIPT_JAYT_141V.`);
