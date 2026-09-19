const fs = require('fs');
const path = require('path');

const targets = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'dom_derived_targets_with_lineage_087a.json'), 'utf8')
);

// Deterministically pick diverse targets per cohort directly from the 291 DOM-derived list
const byCohort = {
  CINEMA: [],
  FNB_FASTFOOD: [],
  COFFEE_TEA: [],
  FOOD_AND_RIDE: [],
  ECOMMERCE_WALLETS: []
};

targets.forEach(t => {
  if (byCohort[t.sector]) {
    byCohort[t.sector].push(t);
  }
});

const selected = [];

// Pick up to 8 per cohort
Object.keys(byCohort).forEach(sector => {
  const list = byCohort[sector];
  // Pick distinct brands within cohort
  const brandMap = new Map();
  list.forEach(t => {
    if (!brandMap.has(t.brand)) brandMap.set(t.brand, []);
    brandMap.get(t.brand).push(t);
  });

  const sectorSelected = [];
  // Round-robin pick from each brand in cohort
  let added = true;
  let round = 0;
  while (sectorSelected.length < 8 && added) {
    added = false;
    for (const [brand, brandTargets] of brandMap.entries()) {
      if (brandTargets[round] && sectorSelected.length < 8) {
        sectorSelected.push(brandTargets[round]);
        added = true;
      }
    }
    round++;
  }
  selected.push(...sectorSelected);
});

console.log(`🎯 [SELECTOR-087A] Đã chọn ${selected.length} targets thuần túy từ DOM lineage:`);
const summary = {};
selected.forEach(t => {
  summary[t.sector] = (summary[t.sector] || 0) + 1;
});
console.log(summary);

fs.writeFileSync(
  path.join(__dirname, 'selected_batch_targets_087a.json'),
  JSON.stringify(selected, null, 2),
  'utf8'
);
