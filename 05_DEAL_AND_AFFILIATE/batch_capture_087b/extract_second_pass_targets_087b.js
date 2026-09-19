const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..', '..');
const captures087aDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_087a', 'captures_087a');
const manifest087aPath = path.join(captures087aDir, 'batch_manifest_087a.json');
const manifest087a = JSON.parse(fs.readFileSync(manifest087aPath, 'utf8'));

const outDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_087b');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

console.log('🔍 [SECOND-PASS-EXTRACTOR-087B] Đang trích xuất link con trực tiếp từ 40 captures 087A...');

const secondPassTargets = [];
const seenUrls = new Set();

// Also include all original 087A URLs to avoid re-capturing exact same pages
manifest087a.results.forEach(r => seenUrls.add(r.requested_url));

manifest087a.results.forEach(parentItem => {
  if (parentItem.http_status !== 200) return;

  const parentHtmlPath = path.join(captures087aDir, parentItem.target_id, 'page.html');
  if (!fs.existsSync(parentHtmlPath)) return;

  const htmlBuf = fs.readFileSync(parentHtmlPath);
  const htmlStr = htmlBuf.toString('utf8');
  const parentSha = sha256(htmlBuf);
  const relativeParentPath = path.relative(repoRoot, parentHtmlPath).replace(/\\/g, '/');

  // Determine base domain from parentItem.requested_url
  let baseDomain = '';
  try {
    const u = new URL(parentItem.requested_url);
    baseDomain = `${u.protocol}//${u.host}`;
  } catch {
    return;
  }

  // Extract <a href="...">
  const aTagRegex = /<a\b[^>]*\bhref=["']([^"'>\s]+)["'][^>]*>/gi;
  let match;
  let countForParent = 0;

  while ((match = aTagRegex.exec(htmlStr)) !== null) {
    const literalHref = match[1];
    const linkOffset = match.index;

    const lower = literalHref.toLowerCase();
    const cleanLower = lower.split('?')[0].split('#')[0];

    // Exclude static assets
    if (
      cleanLower.endsWith('.css') ||
      cleanLower.endsWith('.js') ||
      cleanLower.endsWith('.png') ||
      cleanLower.endsWith('.jpg') ||
      cleanLower.endsWith('.jpeg') ||
      cleanLower.endsWith('.gif') ||
      cleanLower.endsWith('.ico') ||
      cleanLower.endsWith('.svg') ||
      cleanLower.endsWith('.woff') ||
      cleanLower.endsWith('.woff2') ||
      cleanLower.endsWith('.ttf') ||
      cleanLower.endsWith('.json')
    ) {
      continue;
    }

    // Exclude social media & api endpoints
    if (
      lower.includes('facebook.com') ||
      lower.includes('youtube.com') ||
      lower.includes('instagram.com') ||
      lower.includes('tiktok.com') ||
      lower.includes('twitter.com') ||
      lower.includes('zalo.me') ||
      lower.includes('/wp-json/') ||
      lower.includes('oembed') ||
      lower.includes('javascript:') ||
      lower.startsWith('#') ||
      lower.startsWith('tel:') ||
      lower.startsWith('mailto:')
    ) {
      continue;
    }

    // Filter deep promo / terms / discount / store / combo links
    const isDeepTarget = (
      lower.includes('khuyen-mai') ||
      lower.includes('uu-dai') ||
      lower.includes('dieu-khoan') ||
      lower.includes('quy-dinh') ||
      lower.includes('chi-nhanh') ||
      lower.includes('cua-hang') ||
      lower.includes('rap') ||
      lower.includes('combo') ||
      lower.includes('gia-ve') ||
      lower.includes('the-le')
    );

    if (!isDeepTarget) continue;

    // Resolve URL deterministically
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

    if (resolvedUrl.includes('#')) {
      resolvedUrl = resolvedUrl.split('#')[0];
    }

    if (!seenUrls.has(resolvedUrl)) {
      seenUrls.add(resolvedUrl);
      countForParent++;

      secondPassTargets.push({
        target_id: `TARGET_087B_SP_${String(secondPassTargets.length + 1).padStart(3, '0')}`,
        brand: parentItem.brand,
        sector: parentItem.sector,
        resolved_url: resolvedUrl,
        lineage: {
          parent_pass: '087A_CAPTURE',
          parent_target_id: parentItem.target_id,
          parent_artifact_path: relativeParentPath,
          parent_artifact_sha256: parentSha,
          literal_href: literalHref,
          link_offset: linkOffset,
          resolution_rule: resolutionRule,
          selection_reason: `Trích xuất từ thẻ <a href="..."> tại offset ${linkOffset} trong 087A capture HTML (${parentItem.target_id})`
        }
      });
    }
  }

  if (countForParent > 0) {
    console.log(`  + [087A: ${parentItem.target_id}] ${parentItem.brand}: tìm thấy ${countForParent} deep links hợp lệ`);
  }
});

console.log(`\n📊 Tổng số targets deep second-pass được phát hiện thuần túy từ DOM: ${secondPassTargets.length}`);

// Group by sector
const cohortSummary = {};
secondPassTargets.forEach(t => {
  cohortSummary[t.sector] = (cohortSummary[t.sector] || 0) + 1;
});
console.log('Phân bố theo 5 nhóm ngành:');
console.log(cohortSummary);

const targetsFile = path.join(outDir, 'second_pass_targets_with_lineage_087b.json');
fs.writeFileSync(targetsFile, JSON.stringify(secondPassTargets, null, 2), 'utf8');
console.log(`\n💾 Đã lưu danh sách second-pass targets tại: ${targetsFile}`);
