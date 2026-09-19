const fs = require('fs');
const content = fs.readFileSync('03_SOURCE_OF_TRUTH/jayt_apex_interface.js', 'utf8');

// Parse triplets
const tripletMatch = content.match(/const CROSS_PLATFORM_SKU_TRIPLETS = Object\.freeze\(\[([\s\S]*?)\n\]\);/);
const triplets = eval('[' + tripletMatch[1] + ']');

// Parse dorms
const lines = content.split('\n');
let inside = false;
let jsonStr = '';
for (let i = 0; i < lines.length; i++) {
  if (lines[i].startsWith('const J387_DORM_SKUS = [')) {
    inside = true;
    jsonStr += '[\n';
    continue;
  }
  if (inside) {
    if (lines[i].startsWith('];')) {
      jsonStr += ']\n';
      break;
    }
    jsonStr += lines[i] + '\n';
  }
}
const dorms = JSON.parse(jsonStr);

console.log('--- 20 DORM SKUS ---');
dorms.forEach((d, i) => {
  console.log(`[${i}] ${d.sku_id} | ${d.variant_id} | ${d.product_name.substring(0, 35)}`);
});

console.log('\n--- 10 TRIPLETS ---');
triplets.forEach((t, i) => {
  console.log(`[${i}] ${t.id} | ${t.title.substring(0, 35)} | matchKeys: ${JSON.stringify(t.matchKeys)}`);
});
