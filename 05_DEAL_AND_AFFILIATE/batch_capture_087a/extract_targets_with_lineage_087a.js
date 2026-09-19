const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..', '..');
const capturesDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_086', 'captures');
const outDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_087a');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

const parentFolders = [
  // CINEMA
  { dir: path.join(capturesDir, 'metiz.vn'), brand: 'Metiz Cinema', sector: 'CINEMA', baseDomain: 'https://metiz.vn' },
  { dir: path.join(capturesDir, 'lottecinemavn.com'), brand: 'Lotte Cinema', sector: 'CINEMA', baseDomain: 'https://lottecinemavn.com' },
  { dir: path.join(capturesDir, 'bhdstar.vn'), brand: 'BHD Star Cineplex', sector: 'CINEMA', baseDomain: 'https://bhdstar.vn' },
  { dir: path.join(capturesDir, 'galaxycine.vn'), brand: 'Galaxy Cinema', sector: 'CINEMA', baseDomain: 'https://galaxycine.vn' },
  { dir: path.join(capturesDir, 'cgv.vn'), brand: 'CGV Cinemas', sector: 'CINEMA', baseDomain: 'https://www.cgv.vn' },
  { dir: path.join(capturesDir, 'betacinemas.vn'), brand: 'Beta Cinemas', sector: 'CINEMA', baseDomain: 'https://betacinemas.vn' },
  
  // FNB_FASTFOOD
  { dir: path.join(capturesDir, 'kfcvietnam.com.vn'), brand: 'KFC Vietnam', sector: 'FNB_FASTFOOD', baseDomain: 'https://kfcvietnam.com.vn' },
  { dir: path.join(capturesDir, 'lotteria.vn'), brand: 'Lotteria Vietnam', sector: 'FNB_FASTFOOD', baseDomain: 'https://lotteria.vn' },
  { dir: path.join(capturesDir, 'jollibee.com.vn'), brand: 'Jollibee Vietnam', sector: 'FNB_FASTFOOD', baseDomain: 'https://jollibee.com.vn' },
  { dir: path.join(capturesDir, 'dominos.vn'), brand: "Domino's Pizza", sector: 'FNB_FASTFOOD', baseDomain: 'https://dominos.vn' },
  { dir: path.join(capturesDir, 'thepizzacompany.vn'), brand: 'The Pizza Company', sector: 'FNB_FASTFOOD', baseDomain: 'https://thepizzacompany.vn' },
  { dir: path.join(capturesDir, 'pizzahut.vn'), brand: 'Pizza Hut', sector: 'FNB_FASTFOOD', baseDomain: 'https://pizzahut.vn' },

  // COFFEE_TEA
  { dir: path.join(capturesDir, 'phela.vn'), brand: 'Phê La', sector: 'COFFEE_TEA', baseDomain: 'https://phela.vn' },
  { dir: path.join(capturesDir, 'phuclong.com.vn'), brand: 'Phúc Long Coffee & Tea', sector: 'COFFEE_TEA', baseDomain: 'https://phuclong.com.vn' },
  { dir: path.join(capturesDir, 'highlandscoffee.com.vn'), brand: 'Highlands Coffee', sector: 'COFFEE_TEA', baseDomain: 'https://www.highlandscoffee.com.vn' },
  { dir: path.join(capturesDir, 'katinat.vn'), brand: 'Katinat Saigon Kafe', sector: 'COFFEE_TEA', baseDomain: 'https://katinat.vn' },
  { dir: path.join(capturesDir, 'gongcha.com.vn'), brand: 'Gong Cha Vietnam', sector: 'COFFEE_TEA', baseDomain: 'https://gongcha.com.vn' },
  { dir: path.join(capturesDir, 'thecoffeehouse.com'), brand: 'The Coffee House', sector: 'COFFEE_TEA', baseDomain: 'https://thecoffeehouse.com' },
  { dir: path.join(capturesDir, 'trungnguyenlegend.com'), brand: 'Trung Nguyên Legend', sector: 'COFFEE_TEA', baseDomain: 'https://trungnguyenlegend.com' },

  // FOOD_AND_RIDE
  { dir: path.join(capturesDir, 'be.com.vn'), brand: 'Be Group', sector: 'FOOD_AND_RIDE', baseDomain: 'https://be.com.vn' },
  { dir: path.join(capturesDir, 'grab.com'), brand: 'Grab Vietnam', sector: 'FOOD_AND_RIDE', baseDomain: 'https://grab.com' },
  { dir: path.join(capturesDir, 'shopeefood.vn'), brand: 'ShopeeFood Vietnam', sector: 'FOOD_AND_RIDE', baseDomain: 'https://shopeefood.vn' },
  { dir: path.join(capturesDir, 'xanhsm.com'), brand: 'Xanh SM', sector: 'FOOD_AND_RIDE', baseDomain: 'https://xanhsm.com' },

  // ECOMMERCE_WALLETS
  { dir: path.join(capturesDir, 'momo.vn'), brand: 'Ví MoMo', sector: 'ECOMMERCE_WALLETS', baseDomain: 'https://momo.vn' },
  { dir: path.join(capturesDir, 'zalopay.vn'), brand: 'Ví ZaloPay', sector: 'ECOMMERCE_WALLETS', baseDomain: 'https://zalopay.vn' },
  { dir: path.join(capturesDir, 'vnpay.vn'), brand: 'VNPAY', sector: 'ECOMMERCE_WALLETS', baseDomain: 'https://vnpay.vn' },
  { dir: path.join(capturesDir, 'shopee.vn'), brand: 'Shopee Vietnam', sector: 'ECOMMERCE_WALLETS', baseDomain: 'https://shopee.vn' },
  { dir: path.join(capturesDir, 'lazada.vn'), brand: 'Lazada Vietnam', sector: 'ECOMMERCE_WALLETS', baseDomain: 'https://lazada.vn' }
];

console.log('🔍 [LINEAGE-EXTRACTOR-087A] Đang trích xuất target thuần túy từ thẻ <a> trong raw DOM trên đĩa...');

const discoveredList = [];
const seenUrls = new Set();

parentFolders.forEach(parent => {
  const htmlFile = path.join(parent.dir, 'page.html');
  if (!fs.existsSync(htmlFile)) {
    console.log(`  - Bỏ qua ${parent.brand}: không tìm thấy ${htmlFile}`);
    return;
  }

  const htmlBuf = fs.readFileSync(htmlFile);
  const htmlStr = htmlBuf.toString('utf8');
  const parentSha = sha256(htmlBuf);
  const relativeParentPath = path.relative(repoRoot, htmlFile).replace(/\\/g, '/');

  // Match only <a ... href="..." tags
  const aTagRegex = /<a\b[^>]*\bhref=["']([^"'>\s]+)["'][^>]*>/gi;
  let match;
  let localCount = 0;

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

    // Filter relevant promo / store / menu / event links
    const isPromoOrStoreLink = (
      lower.includes('khuyen-mai') ||
      lower.includes('uu-dai') ||
      lower.includes('event') ||
      lower.includes('tin-tuc') ||
      lower.includes('combo') ||
      lower.includes('menu') ||
      lower.includes('he-thong') ||
      lower.includes('cua-hang') ||
      lower.includes('cinema') ||
      lower.includes('rap') ||
      lower.includes('article') ||
      lower.includes('dich-vu') ||
      lower.includes('san-pham') ||
      lower.includes('blog') ||
      lower.includes('phim') ||
      lower.includes('movie')
    );

    if (!isPromoOrStoreLink) continue;

    // Resolve URL deterministically
    let resolvedUrl = '';
    let resolutionRule = '';
    if (literalHref.startsWith('http://') || literalHref.startsWith('https://')) {
      resolvedUrl = literalHref;
      resolutionRule = 'ABSOLUTE_URL_PRESERVED';
    } else if (literalHref.startsWith('/')) {
      resolvedUrl = parent.baseDomain + literalHref;
      resolutionRule = 'RELATIVE_ROOT_RESOLVED_AGAINST_BASE_DOMAIN';
    } else {
      resolvedUrl = parent.baseDomain + '/' + literalHref;
      resolutionRule = 'RELATIVE_PATH_RESOLVED_AGAINST_BASE_DOMAIN';
    }

    // Clean hash
    if (resolvedUrl.includes('#')) {
      resolvedUrl = resolvedUrl.split('#')[0];
    }

    if (!seenUrls.has(resolvedUrl)) {
      seenUrls.add(resolvedUrl);
      localCount++;

      discoveredList.push({
        target_id: `TARGET_087A_${String(discoveredList.length + 1).padStart(3, '0')}`,
        brand: parent.brand,
        sector: parent.sector,
        resolved_url: resolvedUrl,
        lineage: {
          parent_artifact_path: relativeParentPath,
          parent_artifact_sha256: parentSha,
          literal_href: literalHref,
          link_offset: linkOffset,
          resolution_rule: resolutionRule,
          selection_reason: `Trích xuất trực tiếp từ thẻ <a href="..."> tại offset ${linkOffset} trong parent DOM`
        }
      });
    }
  }
  console.log(`  + ${parent.brand} (${parent.sector}): ${localCount} targets có lineage chuẩn`);
});

console.log(`\n📊 Tổng số target HTML sạch có lineage 100% từ parent DOM: ${discoveredList.length}`);

// Group by sector
const cohortSummary = {};
discoveredList.forEach(t => {
  cohortSummary[t.sector] = (cohortSummary[t.sector] || 0) + 1;
});
console.log('Phân bố theo 5 nhóm ngành:');
console.log(cohortSummary);

const targetsFile = path.join(outDir, 'dom_derived_targets_with_lineage_087a.json');
fs.writeFileSync(targetsFile, JSON.stringify(discoveredList, null, 2), 'utf8');
console.log(`\n💾 Đã lưu danh sách target lineage tại: ${targetsFile}`);
