const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const dealDir = path.resolve(__dirname, '..', '05_DEAL_AND_AFFILIATE');

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

const danangResults = [];

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      scanDir(full);
    } else if (ent.name === 'page.txt') {
      const content = fs.readFileSync(full, 'utf8');
      if (content.toLowerCase().includes('đà nẵng') || content.toLowerCase().includes('da nang')) {
        const receiptFile = path.join(dir, 'capture_receipt.json');
        let receipt = {};
        if (fs.existsSync(receiptFile)) {
          try { receipt = JSON.parse(fs.readFileSync(receiptFile, 'utf8')); } catch (e) {}
        }
        const relPath = path.relative(path.resolve(__dirname, '..'), full);
        danangResults.push({
          artifact_path: relPath.replace(/\\/g, '/'),
          sha256: sha256(fs.readFileSync(full)),
          url: receipt.target_url || receipt.url || '',
          brand: receipt.brand_name || receipt.brand || path.basename(path.dirname(full)),
          content_preview: content.slice(0, 300)
        });
      }
    }
  }
}

scanDir(dealDir);
console.log(`Tìm thấy ${danangResults.length} artifact chứa địa chỉ Đà Nẵng:\n`);
danangResults.forEach((r, idx) => {
  console.log(`[${idx + 1}] ${r.artifact_path} (URL: ${r.url})`);
  console.log(`    Brand: ${r.brand}`);
  console.log(`    Snippet: ${r.content_preview.replace(/\n/g, ' ')}\n`);
});
