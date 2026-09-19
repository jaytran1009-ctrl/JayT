const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..');
const capturesDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_086', 'captures');
const deepDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_086', 'deep_traces_086t');

const allDirs = [];
if (fs.existsSync(capturesDir)) {
  fs.readdirSync(capturesDir).forEach(d => allDirs.push({ name: d, dir: path.join(capturesDir, d) }));
}
if (fs.existsSync(deepDir)) {
  fs.readdirSync(deepDir).forEach(d => allDirs.push({ name: d, dir: path.join(deepDir, d) }));
}

console.log('Total source capture dirs:', allDirs.length);

const sectorMap = {
  metiz: 'CINEMA',
  lotte: 'CINEMA',
  bhd: 'CINEMA',
  galaxy: 'CINEMA',
  beta: 'CINEMA',
  cgv: 'CINEMA',
  kfc: 'FNB_FASTFOOD',
  jollibee: 'FNB_FASTFOOD',
  lotteria: 'FNB_FASTFOOD',
  dominos: 'FNB_FASTFOOD',
  pizzahut: 'FNB_FASTFOOD',
  pizza: 'FNB_FASTFOOD',
  phuclong: 'COFFEE_TEA',
  phela: 'COFFEE_TEA',
  highlands: 'COFFEE_TEA',
  katinat: 'COFFEE_TEA',
  gongcha: 'COFFEE_TEA',
  coffeehouse: 'COFFEE_TEA',
  trungnguyen: 'COFFEE_TEA',
  shopeefood: 'FOOD_AND_RIDE',
  grab: 'FOOD_AND_RIDE',
  be: 'FOOD_AND_RIDE',
  xanhsm: 'FOOD_AND_RIDE',
  momo: 'ECOMMERCE_WALLETS',
  zalopay: 'ECOMMERCE_WALLETS',
  shopee: 'ECOMMERCE_WALLETS',
  vnpay: 'ECOMMERCE_WALLETS',
  lazada: 'ECOMMERCE_WALLETS'
};

const discoveredTargets = [];

allDirs.forEach(item => {
  const htmlFile = path.join(item.dir, 'page.html');
  if (fs.existsSync(htmlFile)) {
    const html = fs.readFileSync(htmlFile, 'utf8');
    const hrefRegex = /href=["'](https?:\/\/[^"'>\s]+|\/[^"'>\s]+)["']/gi;
    let match;
    const itemLinks = new Set();
    while ((match = hrefRegex.exec(html)) !== null) {
      let link = match[1];
      if (link.startsWith('/')) {
        // Resolve base domain
        if (item.name.includes('metiz')) link = 'https://metiz.vn' + link;
        else if (item.name.includes('lotte')) link = 'https://lottecinemavn.com' + link;
        else if (item.name.includes('bhd')) link = 'https://bhdstar.vn' + link;
        else if (item.name.includes('momo')) link = 'https://momo.vn' + link;
        else if (item.name.includes('zalopay')) link = 'https://zalopay.vn' + link;
        else if (item.name.includes('kfc')) link = 'https://kfcvietnam.com.vn' + link;
        else if (item.name.includes('phuclong')) link = 'https://phuclong.com.vn' + link;
        else if (item.name.includes('phela')) link = 'https://phela.vn' + link;
      }
      if (link.startsWith('http')) {
        const lower = link.toLowerCase();
        if (
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
          lower.includes('article')
        ) {
          if (!itemLinks.has(link) && !link.endsWith('.css') && !link.endsWith('.js') && !link.endsWith('.png') && !link.endsWith('.jpg')) {
            itemLinks.add(link);
          }
        }
      }
    }

    console.log(`- ${item.name}: found ${itemLinks.size} candidate promo/store links`);
    itemLinks.forEach(l => {
      discoveredTargets.push({
        source_dir: item.name,
        url: l
      });
    });
  }
});

console.log(`\nTotal discovered sub-page targets across all captured DOM: ${discoveredTargets.length}`);
fs.writeFileSync(
  path.join(__dirname, 'discovered_subpage_targets_raw.json'),
  JSON.stringify(discoveredTargets, null, 2),
  'utf8'
);
