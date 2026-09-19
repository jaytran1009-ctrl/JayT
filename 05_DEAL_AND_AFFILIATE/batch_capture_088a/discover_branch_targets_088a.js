const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..', '..');
const dir086 = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_086', 'captures');
const dir087a = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_087a', 'captures_087a');
const dir087b = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_087b', 'captures_087b');
const dir088 = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_088', 'captures_088');

const outDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_088a');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

console.log('🔍 [BRANCH-DISCOVERY-088A] Khám phá link branch locator / rạp / cửa hàng từ raw DOM trên đĩa...');

const discoveredBranchTargets = [];
const seenUrls = new Set();

// Gather all HTML files across all capture batches
const searchDirs = [dir086, dir087a, dir087b, dir088];

searchDirs.forEach(baseDir => {
  if (!fs.existsSync(baseDir)) return;

  const entries = fs.readdirSync(baseDir);
  entries.forEach(entry => {
    const itemDir = path.join(baseDir, entry);
    const htmlPath = path.join(itemDir, 'page.html');
    const receiptPath = path.join(itemDir, 'capture_receipt.json');

    if (!fs.existsSync(htmlPath) || !fs.existsSync(receiptPath)) return;

    const receipt = JSON.parse(fs.readFileSync(receiptPath, 'utf8'));
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

      // Exclude static & social
      if (
        cleanLower.endsWith('.css') || cleanLower.endsWith('.js') || cleanLower.endsWith('.png') ||
        cleanLower.endsWith('.jpg') || cleanLower.endsWith('.ico') || cleanLower.endsWith('.svg') ||
        lower.includes('facebook.com') || lower.includes('youtube.com') || lower.includes('zalo.me') ||
        lower.startsWith('#') || lower.startsWith('javascript:')
      ) continue;

      // Filter branch / cinema / store locator links
      const isBranchOrLocation = (
        lower.includes('rap-gia-ve') ||
        lower.includes('he-thong-rap') ||
        lower.includes('rap') ||
        lower.includes('cinox') ||
        lower.includes('theaters') ||
        lower.includes('cinema') ||
        lower.includes('cua-hang') ||
        lower.includes('chi-nhanh') ||
        lower.includes('store') ||
        lower.includes('gioi-thieu') ||
        lower.includes('lien-he') ||
        lower.includes('about')
      );

      if (!isBranchOrLocation) continue;

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
        discoveredBranchTargets.push({
          target_id: `TARGET_088A_BR_${String(discoveredBranchTargets.length + 1).padStart(3, '0')}`,
          brand: receipt.brand || 'UNKNOWN',
          sector: receipt.sector || 'CINEMA',
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

console.log(`📊 Tìm thấy ${discoveredBranchTargets.length} branch/store locator links có DOM lineage!`);
const brandSummary = {};
discoveredBranchTargets.forEach(t => brandSummary[t.brand] = (brandSummary[t.brand] || 0) + 1);
console.log(brandSummary);

fs.writeFileSync(
  path.join(outDir, 'discovered_branch_targets_088a.json'),
  JSON.stringify(discoveredBranchTargets, null, 2),
  'utf8'
);
