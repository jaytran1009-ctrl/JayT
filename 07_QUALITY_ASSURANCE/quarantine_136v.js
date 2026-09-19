const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');

function getSha256(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

const q136uDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'batch_136u_implicit_whitelist');
fs.mkdirSync(q136uDir, { recursive: true });

const filesToQuarantine = [
  { src: '05_DEAL_AND_AFFILIATE/generic_provenance_compiler_136u.js', dst: 'generic_provenance_compiler_136u.js' },
  { src: '05_DEAL_AND_AFFILIATE/batch_capture_136u_manifest.json', dst: 'batch_capture_136u_manifest.json' },
  { src: '07_QUALITY_ASSURANCE/test_generic_provenance_compiler_136u.js', dst: 'test_generic_provenance_compiler_136u.js' },
  { src: '08_RELEASE_VAULT/JAYT_136U_GENERIC_PROVENANCE_REVIEW_PACK.md', dst: 'JAYT_136U_GENERIC_PROVENANCE_REVIEW_PACK.md' }
];

const quarantinedArtifacts = [];

for (const f of filesToQuarantine) {
  const srcPath = path.join(repoRoot, f.src);
  const dstPath = path.join(q136uDir, f.dst);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, dstPath);
    quarantinedArtifacts.push({
      original_path: f.src,
      quarantined_path: path.relative(repoRoot, dstPath).replace(/\\/g, '/'),
      sha256: getSha256(srcPath)
    });
  }
}

// Build Quarantine Manifest 136U
const quarantineManifest136u = {
  manifest_id: 'BATCH_136U_QUARANTINE_MANIFEST',
  directive: 'JAYT-136V — SCOPE SEMANTICS & LOCALITY PROOF HARDENING',
  status: 'IMPLICIT_WHITELIST_COMPILER_QUARANTINED',
  quarantined_at: '2026-08-26T19:22:00+07:00',
  executive_ruling: 'Batch 136U rejected due to residual implicit venue whitelisting (e.g. Vĩnh Trung Plaza, Helio Center, Co.opmart), unproven scope linkage in Starlight (Quy Nhơn/Đà Nẵng list treated as application), and loose single-keyword locality matching.',
  root_causes: [
    {
      cause_id: 'P0_CAUSE_18_IMPLICIT_VENUE_WHITELISTING',
      description: 'generic_provenance_compiler_136u.js contained specific mall and venue names (vinh trung, helio, co.opmart) in regexes, acting as an implicit whitelist.'
    },
    {
      cause_id: 'P0_CAUSE_19_SCOPE_APPEARS_VS_SCOPE_APPLIES_CONFUSION',
      description: 'Starlight location list (Starlight Quy Nhơn / Starlight Đà Nẵng) was treated as proof of offer application without an enclosing application predicate clause.'
    },
    {
      cause_id: 'P0_CAUSE_20_LOOSE_KEYWORD_LOCALITY_MATCHING',
      description: 'Single keywords (Đà Nẵng, Hải Châu) without full administrative address structure were accepted into LOCALITY_ONLY.'
    }
  ],
  quarantined_artifacts: quarantinedArtifacts
};

const qManifestPath = path.join(q136uDir, 'BATCH_136U_QUARANTINE_MANIFEST.json');
fs.writeFileSync(qManifestPath, JSON.stringify(quarantineManifest136u, null, 2), 'utf8');

// Build Disclosure Receipt 136V
const disclosureReceipt136v = {
  receipt_id: 'DISCLOSURE_RECEIPT_JAYT_136V',
  directive: 'JAYT-136V — SCOPE SEMANTICS & LOCALITY PROOF HARDENING',
  severity: 'P0_SCOPE_SEMANTICS_AND_WHITELIST_DEFICIT',
  status: 'IMPLICIT_WHITELIST_CONTAINED_AND_QUARANTINED',
  disclosed_at: '2026-08-26T19:22:00+07:00',
  executive_ruling: 'Independent CEO audit revealed implicit venue whitelisting in 136U compiler and scope-appears vs scope-applies confusion in Starlight. Batch 136U rejected and quarantined. Starlight demoted to INCOMPLETE_SCOPE_UNPROVEN, CGV held at EVIDENCE_BUNDLE_CANDIDATE.',
  root_causes: quarantineManifest136u.root_causes,
  quarantine_vault: '05_DEAL_AND_AFFILIATE/quarantine_vault/batch_136u_implicit_whitelist/',
  remediation_architecture: '05_DEAL_AND_AFFILIATE/scope_semantics_compiler_136v.js (Pure Structural Scope & Administrative Locality Compiler)'
};

const disclosureReceipt136vPath = path.join(repoRoot, '08_RELEASE_VAULT', 'DISCLOSURE_RECEIPT_JAYT_136V_SCOPE_SEMANTICS_HARDENING.json');
fs.writeFileSync(disclosureReceipt136vPath, JSON.stringify(disclosureReceipt136v, null, 2), 'utf8');

console.log(`✅ [136V-QUARANTINE] Successfully quarantined ${quarantinedArtifacts.length} files and issued DISCLOSURE_RECEIPT_JAYT_136V.`);
