const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..', '..');
const outDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_088c');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

console.log('🔍 [SUPPLY-DISCOVERY-088C] Khám phá targets mới từ DOM cha cho Cinema, F&B, Coffee/Tea...');

const searchDirs = [
  path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_086', 'captures'),
  path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_087a', 'captures_087a'),
  path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_087b', 'captures_087b'),
  path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_088', 'captures_088'),
  path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_088a', 'captures_088a'),
  path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_088b', 'captures_088b')
];

const seenUrls = new Set();
// Add all existing captured URLs to prevent duplicate capture
searchDirs.forEach(baseDir => {
  if (!fs.existsSync(baseDir)) return;
  fs.readdirSync(baseDir).forEach(e => {
    const rPath = path.join(baseDir, e, 'capture_receipt.json');
    if (fs.existsSync(rPath)) {
      try {
        const r = JSON.parse(fs.readFileSync(rPath, 'utf8'));
        if (r.requested_url) seenUrls.add(r.requested_url);
        if (r.final_url) seenUrls.add(r.final_url);
      } catch {}
    }
  });
});

const discoveredTargets = [];
const prioritySectors = ['CINEMA', 'FNB_FASTFOOD', 'COFFEE_TEA'];

searchDirs.forEach(baseDir => {
  if (!fs.existsSync(baseDir)) return;

  fs.readdirSync(baseDir).forEach(entry => {
    const itemDir = path.join(baseDir, entry);
    const htmlPath = path.join(itemDir, 'page.html');
    const receiptPath = path.join(itemDir, 'capture_receipt.json');
    if (!fs.existsSync(htmlPath) || !fs.existsSync(receiptPath)) return;

    let receipt;
    try {
      receipt = JSON.parse(fs.readFileSync(receiptPath, 'utf8'));
    } catch {
      return;
    }

    if (!prioritySectors.includes(receipt.sector)) return;

    const htmlBuf = fs.readFileSync(htmlPath);
    const htmlStr = htmlBuf.toString('utf8');
    const parentSha = sha256(htmlBuf);
    const relativeParentPath = path.relative(repoRoot, htmlPath).replace(/\\/g, '/');

    let baseDomain = '';
    try {
      const u = new URL(receipt.requested_url);
      baseDomain = `${u.protocol}//${u.host}`;
    } catch {
      return;
    }

    const aTagRegex = /<a\b[^>]*\bhref=["']([^"'>\s]+)["'][^>]*>/gi;
    let match;

    while ((match = aTagRegex.exec(htmlStr)) !== null) {
      const literalHref = match[1];
      const linkOffset = match.index;
      const lower = literalHref.toLowerCase();
      const cleanLower = lower.split('?')[0].split('#')[0];

      if (
        cleanLower.endsWith('.css') || cleanLower.endsWith('.js') || cleanLower.endsWith('.png') ||
        cleanLower.endsWith('.jpg') || cleanLower.endsWith('.ico') || cleanLower.endsWith('.svg') ||
        lower.includes('facebook.com') || lower.includes('youtube.com') || lower.includes('zalo.me') ||
        lower.includes('instagram.com') || lower.includes('tiktok.com') ||
        lower.startsWith('#') || lower.startsWith('javascript:') || lower.startsWith('tel:') || lower.startsWith('mailto:')
      ) continue;

      let resolvedUrl = '';
      let resolutionRule = '';
      if (literalHref.startsWith('http://') || literalHref.startsWith('https://')) {
        resolvedUrl = literalHref;
        resolutionRule = 'ABSOLUTE_URL_PRESERVED';
      } else if (literalHref.startsWith('/')) {
        resolvedUrl = baseDomain + literalHref;
        resolutionRule = 'RELATIVE_ROOT_RESOLVED_AGAINST_BASE_DOMAIN';
      } else {
        resolvedUrl = baseDomain + '/' + literalHref;
        resolutionRule = 'RELATIVE_PATH_RESOLVED_AGAINST_BASE_DOMAIN';
      }

      if (resolvedUrl.includes('#')) resolvedUrl = resolvedUrl.split('#')[0];

      if (!seenUrls.has(resolvedUrl)) {
        seenUrls.add(resolvedUrl);

        discoveredTargets.push({
          target_id: `TARGET_088C_${String(discoveredTargets.length + 1).padStart(3, '0')}`,
          brand: receipt.brand,
          sector: receipt.sector,
          resolved_url: resolvedUrl,
          lineage: {
            parent_artifact_path: relativeParentPath,
            parent_artifact_sha256: parentSha,
            literal_href: literalHref,
            link_offset: linkOffset,
            resolution_rule: resolutionRule,
            selection_reason: `Trích xuất từ thẻ <a href="..."> tại offset ${linkOffset} trong DOM của ${receipt.target_id || entry}`
          }
        });
      }
    }
  });
});

console.log(`📊 Tìm thấy ${discoveredTargets.length} targets mới chưa từng capture!`);
const sectorSummary = {};
discoveredTargets.forEach(t => sectorSummary[t.sector] = (sectorSummary[t.sector] || 0) + 1);
console.log(sectorSummary);

fs.writeFileSync(
  path.join(outDir, 'discovered_supply_targets_088c.json'),
  JSON.stringify(discoveredTargets, null, 2),
  'utf8'
);
