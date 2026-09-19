const fs = require('fs');
const path = require('path');

const targets = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'second_pass_targets_with_lineage_087b.json'), 'utf8')
);

const bySector = {};
targets.forEach(t => {
  if (!bySector[t.sector]) bySector[t.sector] = [];
  bySector[t.sector].push(t);
});

const selected = [];

// Pick top distinct brands within each sector
Object.keys(bySector).forEach(sector => {
  const list = bySector[sector];
  const brandMap = new Map();
  list.forEach(t => {
    if (!brandMap.has(t.brand)) brandMap.set(t.brand, []);
    brandMap.get(t.brand).push(t);
  });

  const sectorSelected = [];
  let added = true;
  let round = 0;
  const maxPerSector = sector === 'CINEMA' ? 6 : sector === 'FNB_FASTFOOD' ? 2 : 6;
  while (sectorSelected.length < maxPerSector && added) {
    added = false;
    for (const [brand, brandTargets] of brandMap.entries()) {
      if (brandTargets[round] && sectorSelected.length < maxPerSector) {
        sectorSelected.push(brandTargets[round]);
        added = true;
      }
    }
    round++;
  }
  selected.push(...sectorSelected);
});

console.log(`🎯 [SELECTOR-087B] Đã chọn ${selected.length} second-pass targets thuần túy từ DOM 087A:`);
const summary = {};
selected.forEach(t => {
  summary[t.sector] = (summary[t.sector] || 0) + 1;
});
console.log(summary);

fs.writeFileSync(
  path.join(__dirname, 'selected_second_pass_targets_087b.json'),
  JSON.stringify(selected, null, 2),
  'utf8'
);
