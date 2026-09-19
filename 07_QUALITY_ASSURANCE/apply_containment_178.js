const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const jsSotPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
let js = fs.readFileSync(jsSotPath, 'utf8');

console.log('=== APPLYING JAYT-178 IMMEDIATE CONTAINMENT ===\n');

// 1. Demote all 7 items from 177 to clean empty Tier 1 deals array
const emptyDealsDeclaration = `
  // =========================================================================
  // JAYT-178: EVIDENCE PREDICATE LOCK — TIER 1 PURE CONTAINMENT (0 DEALS)
  // Strict 4-quote verification required before any item can enter Tier 1.
  // =========================================================================
  const REAL_VERIFIED_DEALS_177 = [];
`;

const startMarker = 'const REAL_VERIFIED_DEALS_177 = ';
const startIdx = js.indexOf(startMarker);
if (startIdx !== -1) {
  let depth = 0;
  let endIdx = startIdx + startMarker.length;
  let foundStart = false;
  for (let i = endIdx; i < js.length; i++) {
    if (js[i] === '[') { depth++; foundStart = true; }
    if (js[i] === ']') { depth--; }
    if (foundStart && depth === 0) {
      endIdx = i + 1;
      if (js[endIdx] === ';') endIdx++;
      break;
    }
  }
  js = js.substring(0, startIdx) + emptyDealsDeclaration + js.substring(endIdx);
  console.log('✅ Locked REAL_VERIFIED_DEALS_177 to [] (0 deals).');
}

// 2. Lock tier1Deals logic in renderCategoryHubsCenter163
const tier1Snippet = `let tier1Deals = REAL_VERIFIED_DEALS_177.filter(d => d.hub_id === currentHubId);
    if (tier1Deals.length === 0 && state.feed && Array.isArray(state.feed.deals)) {
      tier1Deals = state.feed.deals.filter(d => d.hub_id === currentHubId);
    }`;
const cleanTier1 = `const tier1Deals = (state.feed && Array.isArray(state.feed.deals)) ? state.feed.deals.filter(d => d.hub_id === currentHubId) : [];`;

if (js.includes(tier1Snippet)) {
  js = js.replace(tier1Snippet, cleanTier1);
  console.log('✅ Reset tier1Deals renderer to read state.feed.deals ONLY (currently []).');
}

// 3. Update Daily Board overview card to 0 Deal Đã Đối Soát
js = js.replace('7 Deal Đã Đối Soát', '0 Deal Đã Đối Soát');
js = js.replace('Bằng chứng trích xuất live', 'Chờ evidence pack 4 quote');
js = js.replace('100 Điểm Hẹn Tiết Kiệm', '32 Cơ Sở Khảo Sát');
js = js.replace('30+ Nguồn Chính Thức', '78 Nguồn Chính Thức');

// 4. Update version badge to Daily Deal OS 3.319
js = js.replace(/Daily Deal OS 3\.\d+/g, 'Daily Deal OS 3.319');
console.log('✅ Updated version badge to Daily Deal OS 3.319.');

// 5. Write to SOT, deploy/, and deploy/public/
fs.writeFileSync(jsSotPath, js, 'utf8');
fs.writeFileSync(path.join(repoRoot, 'deploy', 'jayt_apex_interface.js'), js, 'utf8');
fs.writeFileSync(path.join(repoRoot, 'deploy', 'public', 'jayt_apex_interface.js'), js, 'utf8');

console.log('✅ Saved containment JS across SOT, deploy, deploy/public.');
