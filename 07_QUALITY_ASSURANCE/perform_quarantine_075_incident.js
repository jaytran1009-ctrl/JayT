/**
 * JAYT 075 RELEASE DRILL SIDE-EFFECT CONTAINMENT ENGINE
 * Directive: JAYT-075R-RELEASE-DRILL-CONTAINMENT
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const quarantineDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'batch_075_unauthorized_build_side_effects');
fs.mkdirSync(quarantineDir, { recursive: true });

function getSha256(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

const filesToQuarantine = [
  {
    src: path.join(repoRoot, '08_RELEASE_VAULT', 'JAYT_PUBLIC_BETA_RELEASE_PACK_075.md'),
    filename: 'JAYT_PUBLIC_BETA_RELEASE_PACK_075.md',
    type: 'UNAUTHORIZED_RELEASE_PACK_MD',
    reason: 'Release pack generated automatically during test execution instead of human approval.'
  },
  {
    src: path.join(repoRoot, '08_RELEASE_VAULT', 'JAYT_PUBLIC_BETA_RELEASE_PACK_075.json'),
    filename: 'JAYT_PUBLIC_BETA_RELEASE_PACK_075.json',
    type: 'UNAUTHORIZED_RELEASE_PACK_JSON',
    reason: 'Release pack JSON generated automatically during test execution.'
  }
];

// Add backups
const backupsDir = path.join(repoRoot, '08_RELEASE_VAULT', 'backups');
if (fs.existsSync(backupsDir)) {
  const bFiles = fs.readdirSync(backupsDir).filter(f => f.startsWith('BACKUP-BETA-075'));
  for (const b of bFiles) {
    filesToQuarantine.push({
      src: path.join(backupsDir, b),
      filename: b,
      type: 'UNAUTHORIZED_BACKUP_SNAPSHOT',
      reason: 'Backup JSON generated automatically during test execution.'
    });
  }
}

// Add sealed builds
const releasesDir = path.join(repoRoot, '08_RELEASE_VAULT', 'releases');
const targetBuildIds = [
  'BUILD-SEALED-047-1787562493234',
  'BUILD-SEALED-047-1787562513230',
  'BUILD-SEALED-047-1787562545086',
  'BUILD-SEALED-047-1787562739559'
];

for (const buildId of targetBuildIds) {
  const bDir = path.join(releasesDir, buildId);
  if (fs.existsSync(bDir)) {
    const bFiles = fs.readdirSync(bDir);
    for (const bf of bFiles) {
      filesToQuarantine.push({
        src: path.join(bDir, bf),
        filename: `${buildId}_${bf}`,
        type: 'UNAUTHORIZED_SEALED_BUILD_ARTIFACT',
        reason: 'Sealed build artifact generated as test side-effect.'
      });
    }
  }
}

const quarantinedEntries = [];
console.log('🔒 [CONTAINMENT-075] Bắt đầu cô lập các file side-effect 075 vào quarantine vault...');

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

// Clean up empty build directories in releasesDir
for (const buildId of targetBuildIds) {
  const bDir = path.join(releasesDir, buildId);
  if (fs.existsSync(bDir) && fs.readdirSync(bDir).length === 0) {
    fs.rmdirSync(bDir);
  }
}

// Write Quarantine Manifest
const manifest = {
  $schema: 'https://jayt.vn/schemas/quarantine-manifest.v1.json',
  manifest_id: 'QUARANTINE_MANIFEST_BATCH_075',
  work_order: 'JAYT-075R-RELEASE-DRILL-CONTAINMENT',
  quarantine_reason: '075 REJECTED: Automated test perform_public_beta_release_075.js had state-mutating side effects (auto sealed builds, backups, release pack creation).',
  quarantined_at: new Date().toISOString(),
  snapshot_byte_for_byte_persisted: true,
  total_files_quarantined: quarantinedEntries.length,
  items: quarantinedEntries
};

const manifestPath = path.join(quarantineDir, 'QUARANTINE_MANIFEST_BATCH_075.json');
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
const manifestSha = getSha256(manifestPath);

console.log(`\n📋 [MANIFEST-SAVED] ${manifestPath}`);
console.log(`   SHA-256: ${manifestSha}`);
console.log(`   Total items quarantined: ${quarantinedEntries.length}`);
