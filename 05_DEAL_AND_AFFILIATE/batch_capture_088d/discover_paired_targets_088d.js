const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..', '..');
const outDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_088d');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

console.log('🔍 [PAIRED-TARGET-DISCOVERY-088D] Khám phá các cặp Policy + Branch Locator từ DOM cha...');

const searchDirs = [
  path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_086', 'captures'),
  path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_087a', 'captures_087a'),
  path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_087b', 'captures_087b'),
  path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_088', 'captures_088'),
  path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_088a', 'captures_088a'),
  path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_088b', 'captures_088b'),
  path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_088c', 'captures_088c')
];

const seenUrls = new Set();
// Record existing URLs to avoid duplicate captures
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

const discoveredPairs = [];
const priorityBrands = [
  "Domino's Pizza",
  "Jollibee Vietnam",
  "Galaxy Cinema",
  "Highlands Coffee",
  "Phê La",
  "Gong Cha Vietnam",
  "Lotte Cinema",
  "Metiz Cinema",
  "CGV Cinemas"
];

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

    if (!priorityBrands.includes(receipt.brand)) return;

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

      let targetType = 'OTHER';
      if (
        lower.includes('store') || lower.includes('cua-hang') || lower.includes('dealer') ||
        lower.includes('chi-nhanh') || lower.includes('he-thong') || lower.includes('location') ||
        lower.includes('rap-gia-ve') || lower.includes('cinox/site') || lower.includes('cinema')
      ) {
        targetType = 'BRANCH_LOCATOR';
      } else if (
        lower.includes('khuyen-mai') || lower.includes('uu-dai') || lower.includes('deal') ||
        lower.includes('promotion') || lower.includes('voucher') || lower.includes('combo') ||
        lower.includes('gia-ve') || lower.includes('thanh-vien') || lower.includes('member')
      ) {
        targetType = 'POLICY_OR_PROMO';
      }

      if (targetType === 'OTHER') continue;

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

        discoveredPairs.push({
          target_id: `TARGET_088D_${String(discoveredPairs.length + 1).padStart(3, '0')}`,
          brand: receipt.brand,
          sector: receipt.sector,
          target_type: targetType,
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

console.log(`📊 Tìm thấy ${discoveredPairs.length} targets Policy / Store Locator mới!`);
const typeSummary = {};
discoveredPairs.forEach(t => typeSummary[`${t.brand} [${t.target_type}]`] = (typeSummary[`${t.brand} [${t.target_type}]`] || 0) + 1);
console.log(typeSummary);

fs.writeFileSync(
  path.join(outDir, 'discovered_paired_targets_088d.json'),
  JSON.stringify(discoveredPairs, null, 2),
  'utf8'
);
