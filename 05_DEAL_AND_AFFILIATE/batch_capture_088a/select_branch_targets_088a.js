const fs = require('fs');
const path = require('path');

const targets = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'discovered_branch_targets_088a.json'), 'utf8')
);

// Target specific high-priority brands
const targetBrands = ['Metiz Cinema', 'CGV Cinemas', 'Lotte Cinema', 'Gong Cha Vietnam', 'Phê La', 'Jollibee Vietnam', 'Highlands Coffee'];

const selected = [];
const brandCount = {};

// Sort by relevance score
targets.sort((a, b) => {
  const score = (url) => {
    let s = 0;
    const l = url.toLowerCase();
    if (l.includes('danang') || l.includes('da-nang') || l.includes('7001')) s += 20;
    if (l.includes('cinox') || l.includes('theaters') || l.includes('rap')) s += 15;
    if (l.includes('cua-hang') || l.includes('chi-nhanh') || l.includes('store')) s += 12;
    if (l.includes('about') || l.includes('gioi-thieu') || l.includes('contact') || l.includes('lien-he')) s += 10;
    return s;
  };
  return score(b.resolved_url) - score(a.resolved_url);
});

targets.forEach(t => {
  if (!targetBrands.includes(t.brand)) return;
  const count = brandCount[t.brand] || 0;
  const maxPerBrand = t.brand === 'CGV Cinemas' ? 5 : t.brand === 'Metiz Cinema' ? 4 : 3;
  if (count < maxPerBrand) {
    brandCount[t.brand] = count + 1;
    selected.push(t);
  }
});

console.log(`🎯 [SELECTOR-088A] Đã chọn ${selected.length} branch locator targets ưu tiên:`);
selected.forEach((t, i) => console.log(`  ${i + 1}. [${t.brand}] -> ${t.resolved_url}`));

fs.writeFileSync(
  path.join(__dirname, 'selected_branch_targets_088a.json'),
  JSON.stringify(selected, null, 2),
  'utf8'
);
