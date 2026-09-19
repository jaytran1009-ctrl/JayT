/**
 * JAYT PROMO LINK EXTRACTOR (109)
 * Directive: JAYT-109-OFFICIAL-OFFER-LEAF-EXTRACTION
 * Extracts promo/event/deal/membership links from the 26 successfully captured sources using zero external dependencies.
 */

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const capturesBase = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_108', 'captures_108');
const summaryPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_108', 'batch_108_capture_summary.json');

const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
const capturedTargets = summary.results.filter(r => r.status === 'CAPTURED_SUCCESS');

console.log(`🔍 Tìm thấy ${capturedTargets.length} captured targets để trích xuất child promo links...`);

const promoKeywords = [
  'khuyen-mai', 'khuyenmai', 'uu-dai', 'uudai', 'promo', 'promotion', 'promotions',
  'deal', 'deals', 'voucher', 'tin-tuc', 'news', 'event', 'su-kien', 'special',
  'combo', 'thanh-vien', 'member', 'membership', 'gia-ve', 'ticket', 'menu', 'thuc-don'
];

const extractedLeaves = [];

capturedTargets.forEach(target => {
  const targetDir = path.join(capturesBase, target.target_id);
  const htmlPath = path.join(targetDir, 'page.html');
  if (!fs.existsSync(htmlPath)) return;

  const html = fs.readFileSync(htmlPath, 'utf8');

  // Regex extract all href links
  const hrefRegex = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  const seenUrls = new Set();
  const targetLeaves = [];

  while ((match = hrefRegex.exec(html)) !== null) {
    const href = match[1].trim();
    const rawText = match[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

    if (!href || href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('tel:') || href.startsWith('mailto:')) continue;

    let absoluteUrl = '';
    try {
      absoluteUrl = new URL(href, target.final_url).href;
    } catch {
      continue;
    }

    try {
      const parsed = new URL(absoluteUrl);
      const baseDomain = new URL(target.final_url).hostname.replace(/^www\./, '');
      if (!parsed.hostname.includes(baseDomain) && !baseDomain.includes(parsed.hostname.replace(/^www\./, ''))) {
        continue;
      }
      if (parsed.pathname === '/' || parsed.pathname === '') continue;
    } catch {
      continue;
    }

    const lowerUrl = absoluteUrl.toLowerCase();
    const lowerText = rawText.toLowerCase();

    const isPromoLink = promoKeywords.some(kw => lowerUrl.includes(kw) || lowerText.includes(kw));

    if (isPromoLink && !seenUrls.has(absoluteUrl)) {
      seenUrls.add(absoluteUrl);
      targetLeaves.push({
        leaf_id: `${target.target_id}_LEAF_${String(targetLeaves.length + 1).padStart(2, '0')}`,
        source_target_id: target.target_id,
        brand: target.brand,
        category: target.category,
        source_url: target.source_url,
        leaf_url: absoluteUrl,
        anchor_text: rawText.substring(0, 100)
      });
      if (targetLeaves.length >= 5) break;
    }
  }

  console.log(`[${target.target_id}] Trích xuất được ${targetLeaves.length} promo candidate links`);
  extractedLeaves.push(...targetLeaves);
});

const outPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_109', 'extracted_candidate_leaves.json');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify({
  manifest_id: 'EXTRACTED_CANDIDATE_LEAVES_109',
  generated_at: new Date().toISOString(),
  total_candidates: extractedLeaves.length,
  leaves: extractedLeaves
}, null, 2), 'utf8');

console.log(`\n✅ Đã trích xuất tổng cộng ${extractedLeaves.length} leaf URLs. Lưu tại: ${outPath}`);
