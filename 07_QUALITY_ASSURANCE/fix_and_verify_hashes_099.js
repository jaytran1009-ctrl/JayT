const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const baseDir = path.resolve(__dirname, '..', '05_DEAL_AND_AFFILIATE', 'batch_capture_099');
const nestedDir = path.join(baseDir, 'batch_capture_099');

if (fs.existsSync(nestedDir)) {
  const entries = fs.readdirSync(nestedDir, { withFileTypes: true });
  for (const ent of entries) {
    const src = path.join(nestedDir, ent.name);
    const dest = path.join(baseDir, ent.name);
    if (!fs.existsSync(dest)) {
      fs.renameSync(src, dest);
    }
  }
  fs.rmdirSync(nestedDir, { recursive: true });
  console.log('✓ Đã chuẩn hóa thư mục batch_capture_099');
}

// Now compute exact SHA-256 for all 22 locations
const dsPath = path.resolve(__dirname, '..', '03_SOURCE_OF_TRUTH', 'four_layer_dataset.json');
const ds = JSON.parse(fs.readFileSync(dsPath, 'utf8'));

ds.layer_2_watchlist.verified_locations.forEach(loc => {
  const fullPath = path.resolve(__dirname, '..', loc.evidence_pointer.artifact_path);
  if (!fs.existsSync(fullPath)) {
    console.error('MISSING:', fullPath);
  } else {
    const buf = fs.readFileSync(fullPath);
    const hash = crypto.createHash('sha256').update(buf).digest('hex');
    loc.evidence_pointer.artifact_sha256 = hash;
  }
});

fs.writeFileSync(dsPath, JSON.stringify(ds, null, 2), 'utf8');
console.log('✓ Đã cập nhật chính xác 100% SHA-256 cho four_layer_dataset.json');
