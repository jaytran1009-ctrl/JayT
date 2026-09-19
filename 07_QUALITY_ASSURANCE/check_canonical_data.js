const fs = require('fs');
const path = require('path');

const fourLayerPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/four_layer_dataset.json');
const fourLayer = JSON.parse(fs.readFileSync(fourLayerPath, 'utf8'));

console.log('--- CANONICAL DATASET STRUCTURE ---');
console.log('Keys:', Object.keys(fourLayer));
if (fourLayer.layer_2_watchlist) {
  console.log('Layer 2 Watchlist count:', fourLayer.layer_2_watchlist.length);
  fourLayer.layer_2_watchlist.forEach((w, i) => {
    console.log(`[Watchlist ${i+1}] ${w.name || w.brand_name} | Area: ${w.area || w.locality || w.address} | Status: ${w.status || w.category}`);
  });
}
if (fourLayer.layer_1_emerald_deals) {
  console.log('Layer 1 Emerald Deals count:', fourLayer.layer_1_emerald_deals.length);
  fourLayer.layer_1_emerald_deals.forEach((d, i) => {
    console.log(`[Emerald ${i+1}] ${d.title} | Brand: ${d.brand_name} | Verified at: ${d.verified_at}`);
  });
}
