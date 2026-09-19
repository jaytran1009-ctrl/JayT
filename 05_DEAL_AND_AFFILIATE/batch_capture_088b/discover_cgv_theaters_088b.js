const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..', '..');
const outDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_088b');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

console.log('🔍 [CGV-THEATER-DISCOVERY-088B] Khám phá link rạp CGV Đà Nẵng từ DOM CGV trên đĩa...');

const cgvDirs = [
  path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_086', 'captures', 'cgv.vn'),
  path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_087a', 'captures_087a', 'TARGET_087A_134'),
  path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_088', 'captures_088', 'TARGET_088_104'),
  path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_088', 'captures_088', 'TARGET_088_175'),
  path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_088a', 'captures_088a', 'TARGET_088A_BR_107')
];

const discoveredCgvTargets = [];
const seenUrls = new Set();

cgvDirs.forEach(dir => {
  const htmlPath = path.join(dir, 'page.html');
  const receiptPath = path.join(dir, 'capture_receipt.json');
  if (!fs.existsSync(htmlPath) || !fs.existsSync(receiptPath)) return;

  const receipt = JSON.parse(fs.readFileSync(receiptPath, 'utf8'));
  const htmlBuf = fs.readFileSync(htmlPath);
  const htmlStr = htmlBuf.toString('utf8');
  const parentSha = sha256(htmlBuf);
  const relativeParentPath = path.relative(repoRoot, htmlPath).replace(/\\/g, '/');

  const baseDomain = 'https://www.cgv.vn';
  const aTagRegex = /<a\b[^>]*\bhref=["']([^"'>\s]+)["'][^>]*>/gi;
  let match;

  while ((match = aTagRegex.exec(htmlStr)) !== null) {
    const literalHref = match[1];
    const linkOffset = match.index;
    const lower = literalHref.toLowerCase();

    // Check if link mentions theaters or cgv branches
    const isTheaterLink = (
      lower.includes('cinox') ||
      lower.includes('theaters') ||
      lower.includes('rap-cgv') ||
      lower.includes('vincom') ||
      lower.includes('vinh-trung') ||
      lower.includes('da-nang') ||
      lower.includes('danang')
    );

    if (!isTheaterLink) continue;

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
      discoveredCgvTargets.push({
        target_id: `TARGET_088B_CGV_${String(discoveredCgvTargets.length + 1).padStart(3, '0')}`,
        brand: 'CGV Cinemas',
        sector: 'CINEMA',
        resolved_url: resolvedUrl,
        lineage: {
          parent_artifact_path: relativeParentPath,
          parent_artifact_sha256: parentSha,
          literal_href: literalHref,
          link_offset: linkOffset,
          resolution_rule: resolutionRule,
          selection_reason: `Trích xuất từ thẻ <a href="..."> tại offset ${linkOffset} trong DOM của ${receipt.target_id || 'cgv.vn'}`
        }
      });
    }
  }
});

console.log(`📊 Tìm thấy ${discoveredCgvTargets.length} link rạp CGV có DOM lineage!`);
discoveredCgvTargets.forEach(t => console.log(`  + ${t.target_id}: ${t.resolved_url} (Offset: ${t.lineage.link_offset})`));

fs.writeFileSync(
  path.join(outDir, 'discovered_cgv_theaters_088b.json'),
  JSON.stringify(discoveredCgvTargets, null, 2),
  'utf8'
);
