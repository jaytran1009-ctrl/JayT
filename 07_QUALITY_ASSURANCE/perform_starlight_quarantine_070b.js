/**
 * JAYT STARLIGHT CANDIDATE QUARANTINE ENGINE (070B)
 * Directive: JAYT-070B
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const quarantineDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'batch_070b_starlight_unsupported');
const pendingDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'candidates', 'pending_review');

fs.mkdirSync(quarantineDir, { recursive: true });

function getSha256(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

const filesToQuarantine = [
  'candidate_46_CAND-DNG-STARLIGHT-U22-2026.json',
  'dossier_CAND-DNG-STARLIGHT-U22-2026.md',
  'candidate_47_CAND-DNG-STARLIGHT-THU3-PHIM-VIET-2026.json',
  'dossier_CAND-DNG-STARLIGHT-THU3-PHIM-VIET-2026.md'
];

const quarantinedEntries = [];

for (const f of filesToQuarantine) {
  const src = path.join(pendingDir, f);
  const dst = path.join(quarantineDir, f);

  if (fs.existsSync(src)) {
    const sha = getSha256(src);
    const size = fs.statSync(src).size;
    fs.copyFileSync(src, dst);
    fs.unlinkSync(src);

    const dstSha = getSha256(dst);
    if (sha !== dstSha) {
      throw new Error(`BYTE-FOR-BYTE CORRUPTION ON QUARANTINE: ${f}`);
    }

    quarantinedEntries.push({
      filename: f,
      size_bytes: size,
      sha256: sha,
      quarantine_reason: 'Canonical URL and annual validity are unsupported on raw capture.'
    });
    console.log(`📦 Quarantined: ${f} (${size} B, SHA: ${sha.slice(0, 16)}...)`);
  }
}

const manifest = {
  $schema: 'https://jayt.vn/schemas/quarantine-manifest.v1.json',
  manifest_id: 'QUARANTINE_MANIFEST_070B_STARLIGHT',
  work_order: 'JAYT-070B',
  quarantine_reason: 'Canonical URL and annual validity unsupported',
  quarantined_at: new Date().toISOString(),
  snapshot_byte_for_byte_persisted: true,
  items: quarantinedEntries
};

const manifestPath = path.join(quarantineDir, 'QUARANTINE_MANIFEST_070B.json');
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
console.log(`✅ Starlight Quarantine Manifest Minted: ${manifestPath}`);
