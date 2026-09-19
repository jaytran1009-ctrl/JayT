const fs = require('fs');
const path = require('path');

const targets = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'discovered_supply_targets_088c.json'), 'utf8')
);

// Score targets by promo/deal keyword relevance
function scoreTarget(t) {
  let s = 0;
  const l = t.resolved_url.toLowerCase();
  if (l.includes('khuyen-mai') || l.includes('uu-dai') || l.includes('deal') || l.includes('promotion')) s += 30;
  if (l.includes('gia-ve') || l.includes('combo') || l.includes('menu') || l.includes('thuc-don')) s += 20;
  if (l.includes('thanh-vien') || l.includes('member') || l.includes('event')) s += 15;
  if (l.includes('tin-tuc') || l.includes('news')) s += 10;
  return s;
}

targets.sort((a, b) => scoreTarget(b) - scoreTarget(a));

const selectedBySector = {
  CINEMA: [],
  FNB_FASTFOOD: [],
  COFFEE_TEA: []
};

const brandCount = {};

targets.forEach(t => {
  const sectorList = selectedBySector[t.sector];
  if (!sectorList || sectorList.length >= 8) return;

  const count = brandCount[t.brand] || 0;
  if (count < 3) {
    brandCount[t.brand] = count + 1;
    sectorList.push(t);
  }
});

const finalBatch = [
  ...selectedBySector.CINEMA,
  ...selectedBySector.FNB_FASTFOOD,
  ...selectedBySector.COFFEE_TEA
];

console.log(`🎯 [SELECTOR-088C] Đã chọn ${finalBatch.length} targets mới cho batch 088C:`);
const summary = {};
finalBatch.forEach(t => summary[t.sector] = (summary[t.sector] || 0) + 1);
console.log(summary);

finalBatch.forEach((t, i) => console.log(`  ${i + 1}. [${t.sector}] ${t.brand} -> ${t.resolved_url}`));

fs.writeFileSync(
  path.join(__dirname, 'selected_supply_targets_088c.json'),
  JSON.stringify(finalBatch, null, 2),
  'utf8'
);
