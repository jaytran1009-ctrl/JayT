const fs = require('fs');
const path = require('path');

const targets = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'discovered_policy_targets_088.json'), 'utf8')
);

// Focus on high-yield brands in Cinema, F&B, Coffee/Tea
const targetBrands = ['Metiz Cinema', 'Lotte Cinema', 'Galaxy Cinema', 'CGV Cinemas', 'Phê La', 'Gong Cha Vietnam', 'Be Group', 'Grab Vietnam', 'Ví MoMo', 'Ví ZaloPay'];

const selected = [];
const brandCount = {};

// Prioritize pricing, member, terms, and branch keywords
targets.sort((a, b) => {
  const score = (url) => {
    let s = 0;
    const l = url.toLowerCase();
    if (l.includes('gia-ve') || l.includes('bang-gia')) s += 10;
    if (l.includes('thanh-vien') || l.includes('member')) s += 8;
    if (l.includes('dieu-khoan') || l.includes('quy-dinh')) s += 6;
    if (l.includes('chi-nhanh') || l.includes('cua-hang') || l.includes('rap')) s += 5;
    if (l.includes('khuyen-mai') || l.includes('uu-dai')) s += 4;
    return s;
  };
  return score(b.resolved_url) - score(a.resolved_url);
});

targets.forEach(t => {
  const count = brandCount[t.brand] || 0;
  const maxPerBrand = t.sector === 'CINEMA' ? 4 : 2;
  if (count < maxPerBrand) {
    brandCount[t.brand] = count + 1;
    selected.push(t);
  }
});

console.log(`🎯 [SELECTOR-088] Đã chọn ${selected.length} policy targets có thứ hạng ưu tiên cao nhất:`);
selected.forEach((t, i) => console.log(`  ${i + 1}. [${t.sector}] ${t.brand} -> ${t.resolved_url}`));

fs.writeFileSync(
  path.join(__dirname, 'selected_policy_targets_088.json'),
  JSON.stringify(selected, null, 2),
  'utf8'
);
