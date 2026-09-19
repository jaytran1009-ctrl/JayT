const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const sotVisualsDir = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'assets', 'official-visuals');
const deployVisualsDir = path.join(repoRoot, 'deploy', 'assets', 'official-visuals');
const deployPublicVisualsDir = path.join(repoRoot, 'deploy', 'public', 'assets', 'official-visuals');
const stagingVisualsDir = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '03_SOURCE_OF_TRUTH', 'assets', 'official-visuals');

const quarantineDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'quarantine', 'synthetic_visuals_215_quarantine');
if (!fs.existsSync(quarantineDir)) fs.mkdirSync(quarantineDir, { recursive: true });

function sha256Buf(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }

function quarantineAssets() {
  console.log('========================================================================');
  console.log('🛑 JAYT-216: SYNTHETIC VISUAL CLAIM CONTAINMENT & QUARANTINE');
  console.log('========================================================================\n');

  const quarantineManifest = {
    containment_id: 'QUARANTINE_216_' + Date.now(),
    work_order: 'JAYT-216-SYNTHETIC-VISUAL-CLAIM-CONTAINMENT',
    timestamp: new Date().toISOString(),
    rationale: 'Quarantine 24 generated PNG graphics from JAYT-215 containing synthetic provenance claims ("OFFICIAL PROVENANCE ASSET · JAYT-215"). Hash alone is not provenance.',
    quarantined_files: []
  };

  if (fs.existsSync(sotVisualsDir)) {
    const files = fs.readdirSync(sotVisualsDir);
    for (const f of files) {
      const srcPath = path.join(sotVisualsDir, f);
      const destPath = path.join(quarantineDir, f);
      const buf = fs.readFileSync(srcPath);
      const hash = sha256Buf(buf);
      
      fs.copyFileSync(srcPath, destPath);
      fs.unlinkSync(srcPath);

      quarantineManifest.quarantined_files.push({
        file_name: f,
        sha256: hash,
        size_bytes: buf.length,
        quarantine_dest: path.relative(repoRoot, destPath)
      });
      console.log(`  🔒 Quarantined: ${f} (SHA: ${hash.substring(0, 16)}...)`);
    }
  }

  // Clean deploy directories
  [deployVisualsDir, deployPublicVisualsDir, stagingVisualsDir].forEach(dir => {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      for (const f of files) {
        fs.unlinkSync(path.join(dir, f));
      }
    }
  });

  const manifestPath = path.join(quarantineDir, 'SYNTHETIC_VISUAL_QUARANTINE_MANIFEST_216.json');
  fs.writeFileSync(manifestPath, JSON.stringify(quarantineManifest, null, 2), 'utf8');

  // Also save in QA runtime evidence
  const qaManifestPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'SYNTHETIC_VISUAL_QUARANTINE_MANIFEST_216.json');
  fs.writeFileSync(qaManifestPath, JSON.stringify(quarantineManifest, null, 2), 'utf8');

  console.log('\n📄 Quarantine Manifest saved to: ' + path.relative(repoRoot, manifestPath));
  console.log(`✅ Successfully quarantined ${quarantineManifest.quarantined_files.length} synthetic visual files.`);
}

if (require.main === module) {
  quarantineAssets();
}

module.exports = { quarantineAssets };
