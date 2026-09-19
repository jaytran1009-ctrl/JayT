const fs = require('fs');
const path = require('path');

const targets = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'discovered_paired_targets_088d.json'), 'utf8')
);

// Score targets: prioritize Da Nang mentions, then branch locators, then promo/deals
function scoreTarget(t) {
  let s = 0;
  const l = t.resolved_url.toLowerCase();
  if (l.includes('da-nang') || l.includes('danang') || l.includes('hai-chau') || l.includes('vincom') || l.includes('vinh-trung')) s += 50;
  if (t.target_type === 'BRANCH_LOCATOR') s += 20;
  if (t.target_type === 'POLICY_OR_PROMO') s += 20;
  if (l.includes('khuyen-mai') || l.includes('uu-dai') || l.includes('deal') || l.includes('store') || l.includes('cua-hang')) s += 15;
  return s;
}

targets.sort((a, b) => scoreTarget(b) - scoreTarget(a));

const selectedByBrand = {};
const finalBatch = [];

// Ensure we get both BRANCH_LOCATOR and POLICY_OR_PROMO for each brand
targets.forEach(t => {
  if (finalBatch.length >= 32) return;
  const brandList = selectedByBrand[t.brand] || [];
  if (brandList.length < 5) {
    brandList.push(t);
    selectedByBrand[t.brand] = brandList;
    finalBatch.push(t);
  }
});

console.log(`🎯 [SELECTOR-088D] Đã chọn ${finalBatch.length} targets theo cặp cho batch 088D:`);
const summary = {};
finalBatch.forEach(t => {
  const key = `${t.brand} (${t.target_type})`;
  summary[key] = (summary[key] || 0) + 1;
});
console.log(summary);

finalBatch.forEach((t, i) => console.log(`  ${i + 1}. [${t.target_type}] ${t.brand} -> ${t.resolved_url}`));

fs.writeFileSync(
  path.join(__dirname, 'selected_paired_targets_088d.json'),
  JSON.stringify(finalBatch, null, 2),
  'utf8'
);
