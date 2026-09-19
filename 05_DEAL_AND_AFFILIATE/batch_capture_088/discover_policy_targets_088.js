const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..', '..');
const dir087a = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_087a', 'captures_087a');
const dir087b = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_087b', 'captures_087b');

const manifest087a = JSON.parse(fs.readFileSync(path.join(dir087a, 'batch_manifest_087a.json'), 'utf8'));
const manifest087b = JSON.parse(fs.readFileSync(path.join(dir087b, 'batch_manifest_087b.json'), 'utf8'));

const all66 = [...manifest087a.results, ...manifest087b.results];
console.log(`🔍 [DISCOVERY-088] Khám phá liên kết chính sách định kỳ từ ${all66.length} artifacts...`);

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

const discoveredDeepPolicyTargets = [];
const seenUrls = new Set();
all66.forEach(item => seenUrls.add(item.requested_url));

all66.forEach(parentItem => {
  const baseDir = parentItem.target_id.includes('SP') ? dir087b : dir087a;
  const htmlPath = path.join(baseDir, parentItem.target_id, 'page.html');
  if (!fs.existsSync(htmlPath)) return;

  const htmlBuf = fs.readFileSync(htmlPath);
  const htmlStr = htmlBuf.toString('utf8');
  const parentSha = sha256(htmlBuf);
  const relativeParentPath = path.relative(repoRoot, htmlPath).replace(/\\/g, '/');

  let baseDomain = '';
  try {
    const u = new URL(parentItem.requested_url);
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

    // Filter out static assets & social media
    if (
      cleanLower.endsWith('.css') || cleanLower.endsWith('.js') || cleanLower.endsWith('.png') ||
      cleanLower.endsWith('.jpg') || cleanLower.endsWith('.ico') || cleanLower.endsWith('.svg') ||
      lower.includes('facebook.com') || lower.includes('youtube.com') || lower.includes('zalo.me') ||
      lower.startsWith('#') || lower.startsWith('javascript:')
    ) continue;

    // Filter deep policy / pricing / member / recurring / branch links
    const isPolicyOrPriceOrBranch = (
      lower.includes('gia-ve') ||
      lower.includes('bang-gia') ||
      lower.includes('dieu-khoan') ||
      lower.includes('quy-dinh') ||
      lower.includes('thanh-vien') ||
      lower.includes('member') ||
      lower.includes('thu-2') ||
      lower.includes('thu-3') ||
      lower.includes('thu-4') ||
      lower.includes('happy') ||
      lower.includes('u22') ||
      lower.includes('uu-dai') ||
      lower.includes('khuyen-mai') ||
      lower.includes('rap-gia-ve') ||
      lower.includes('rap') ||
      lower.includes('cinema') ||
      lower.includes('he-thong-rap') ||
      lower.includes('cua-hang') ||
      lower.includes('chi-nhanh')
    );

    if (!isPolicyOrPriceOrBranch) continue;

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
      discoveredDeepPolicyTargets.push({
        target_id: `TARGET_088_${String(discoveredDeepPolicyTargets.length + 1).padStart(3, '0')}`,
        brand: parentItem.brand,
        sector: parentItem.sector,
        resolved_url: resolvedUrl,
        lineage: {
          parent_pass: parentItem.target_id.includes('SP') ? '087B_SECOND_PASS' : '087A_FIRST_PASS',
          parent_target_id: parentItem.target_id,
          parent_artifact_path: relativeParentPath,
          parent_artifact_sha256: parentSha,
          literal_href: literalHref,
          link_offset: linkOffset,
          resolution_rule: resolutionRule,
          selection_reason: `Trích xuất từ thẻ <a href="..."> tại offset ${linkOffset} trong DOM của ${parentItem.target_id}`
        }
      });
    }
  }
});

console.log(`📊 Tìm thấy ${discoveredDeepPolicyTargets.length} targets chính sách / giá vé / chi nhánh có DOM lineage!`);
const summary = {};
discoveredDeepPolicyTargets.forEach(t => summary[t.brand] = (summary[t.brand] || 0) + 1);
console.log(summary);

const outPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_088');
if (!fs.existsSync(outPath)) fs.mkdirSync(outPath, { recursive: true });

fs.writeFileSync(
  path.join(outPath, 'discovered_policy_targets_088.json'),
  JSON.stringify(discoveredDeepPolicyTargets, null, 2),
  'utf8'
);
