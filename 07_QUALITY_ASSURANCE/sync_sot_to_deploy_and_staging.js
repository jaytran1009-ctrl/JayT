const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');

const filesToSync = [
  'index.html',
  'jayt_brand_assets_221.js',
  'jayt_apex_interface.js',
  'jayt_verified_deals_module.js',
  'customer_journey_north_star.json',
  'four_layer_dataset.json',
  'radar_dataset_086u.json',
  'brand_asset_registry.json',
  'daily_supply_feed_126.json',
  'sw.js',
  'vercel.json'
];

const targets = [
  path.join(repoRoot, 'deploy'),
  path.join(repoRoot, 'deploy', 'public'),
  path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '03_SOURCE_OF_TRUTH')
];

function getSha256(content) {
  return crypto.createHash('sha256').update(content).digest('hex');
}

console.log('🔄 [SYNC-096] Đồng bộ hóa byte-for-byte từ 03_SOURCE_OF_TRUTH sang deploy/public và staging_instance...\n');

for (const file of filesToSync) {
  const sotPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', file);
  if (!fs.existsSync(sotPath)) {
    console.error(`❌ Source of Truth missing file: ${file}`);
    continue;
  }
  const sotBuffer = fs.readFileSync(sotPath);
  const sotHash = getSha256(sotBuffer);
  console.log(`📄 [SOT] ${file}: ${sotBuffer.length} bytes (SHA-256: ${sotHash.slice(0, 16)}...)`);

  for (const targetDir of targets) {
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    const destPath = path.join(targetDir, file);
    fs.writeFileSync(destPath, sotBuffer);
    const destHash = getSha256(fs.readFileSync(destPath));
    if (destHash === sotHash) {
      console.log(`  -> Synced to ${path.relative(repoRoot, destPath)}: OK`);
    } else {
      console.error(`  -> Mismatch at ${destPath}!`);
    }
  }
}

// Recursive sync for assets directory
const sotAssetsDir = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'assets');
if (fs.existsSync(sotAssetsDir)) {
  function syncDirRecursive(srcDir, relativeSubdir = '') {
    const currentSrc = path.join(srcDir, relativeSubdir);
    const entries = fs.readdirSync(currentSrc, { withFileTypes: true });

    for (const ent of entries) {
      const relPath = path.join(relativeSubdir, ent.name);
      if (ent.isDirectory()) {
        for (const targetDir of targets) {
          const destSubdir = path.join(targetDir, 'assets', relPath);
          fs.mkdirSync(destSubdir, { recursive: true });
        }
        syncDirRecursive(srcDir, relPath);
      } else if (ent.isFile()) {
        const fileBuf = fs.readFileSync(path.join(currentSrc, ent.name));
        const fileHash = getSha256(fileBuf);
        console.log(`🖼️ [ASSET] assets/${relPath.replace(/\\/g, '/')}: ${fileBuf.length} bytes`);
        for (const targetDir of targets) {
          const destFilePath = path.join(targetDir, 'assets', relPath);
          fs.mkdirSync(path.dirname(destFilePath), { recursive: true });
          fs.writeFileSync(destFilePath, fileBuf);
        }
      }
    }
  }

  syncDirRecursive(sotAssetsDir);
}

console.log('\n✅ Đồng bộ 100% hoàn tất!');
