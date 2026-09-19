const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const jsSotPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
let js = fs.readFileSync(jsSotPath, 'utf8');

// 1. Replace ACTIVE_VERIFIED_DEALS_170 with containment version — TIER_3, no prices/claims
const containmentDeals = [
  { id: 'DEAL_B_01', brand: 'GitHub Education', title: 'Kiểm tra điều kiện và quyền lợi tại nguồn chính thức', category: 'STUDENT_BENEFIT', hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES', action_url: 'https://education.github.com/pack', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL' },
  { id: 'DEAL_B_02', brand: 'JetBrains', title: 'Kiểm tra điều kiện và quyền lợi tại nguồn chính thức', category: 'STUDENT_BENEFIT', hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES', action_url: 'https://www.jetbrains.com/community/education/#students', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL' },
  { id: 'DEAL_B_03', brand: 'Spotify Vietnam', title: 'Kiểm tra điều kiện và quyền lợi tại nguồn chính thức', category: 'STUDENT_BENEFIT', hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES', action_url: 'https://www.spotify.com/vn-vi/student/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL' },
  { id: 'DEAL_B_04', brand: 'Notion', title: 'Kiểm tra điều kiện và quyền lợi tại nguồn chính thức', category: 'STUDENT_BENEFIT', hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES', action_url: 'https://www.notion.so/product/notion-for-education', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL' },
  { id: 'DEAL_B_05', brand: 'Canva', title: 'Kiểm tra điều kiện và quyền lợi tại nguồn chính thức', category: 'STUDENT_BENEFIT', hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES', action_url: 'https://www.canva.com/education/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL' },
  { id: 'DEAL_B_06', brand: 'YouTube Premium', title: 'Kiểm tra điều kiện và quyền lợi tại nguồn chính thức', category: 'STUDENT_BENEFIT', hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES', action_url: 'https://www.youtube.com/premium/student', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL' }
];

const startMarker = 'const ACTIVE_VERIFIED_DEALS_170 = ';
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
  const replacement = 'const ACTIVE_VERIFIED_DEALS_170 = ' + JSON.stringify(containmentDeals, null, 2) + ';';
  js = js.substring(0, startIdx) + replacement + js.substring(endIdx);
  console.log('✅ Replaced ACTIVE_VERIFIED_DEALS_170 with containment version (TIER_3, zero prices/claims).');
} else {
  console.log('⚠️ ACTIVE_VERIFIED_DEALS_170 not found — skipping.');
}

// 2. Remove injection of these deals into Tier 1 renderer
const oldTier1 = `let tier1Deals = ACTIVE_VERIFIED_DEALS_170.filter(item => item.hub_id === currentHubId);
    if (tier1Deals.length === 0) {
      tier1Deals = hubItems.filter(item => item.reliability_tier === 'TIER_1_VERIFIED_PROOF' || item.reliability_tier === 'TIER_1_VERIFIED_PROOF_DEAL');
    }`;
const newTier1 = `const tier1Deals = hubItems.filter(item => item.reliability_tier === 'TIER_1_VERIFIED_PROOF' || item.reliability_tier === 'TIER_1_VERIFIED_PROOF_DEAL');`;

if (js.includes(oldTier1)) {
  js = js.replace(oldTier1, newTier1);
  console.log('✅ Removed ACTIVE_VERIFIED_DEALS_170 from Tier 1 renderer — cards no longer appear as verified deals.');
} else {
  console.log('⚠️ Old Tier 1 injection pattern not found — checking if already fixed.');
}

// 3. Update version badge
js = js.replace(/Daily Deal OS 3\.\d+/g, 'Daily Deal OS 3.314');
console.log('✅ Updated version badge to Daily Deal OS 3.314.');

// 4. Update "Hôm nay trên JayT" — make honest about 0 verified deals
js = js.replace('0 Deal Trực Tiếp', '0 Deal Đã Đối Soát');
js = js.replace('Đang chuẩn bị thẩm định', 'Chờ evidence pack thật');
console.log('✅ Updated "Hôm Nay Trên JayT" to reflect 0 verified deals honestly.');

// 5. Write to all 3 locations
fs.writeFileSync(jsSotPath, js, 'utf8');
fs.writeFileSync(path.join(repoRoot, 'deploy', 'jayt_apex_interface.js'), js, 'utf8');
fs.writeFileSync(path.join(repoRoot, 'deploy', 'public', 'jayt_apex_interface.js'), js, 'utf8');
console.log('✅ Saved containment JS to SOT, deploy/ and deploy/public/.');
console.log('Total JS size:', js.length, 'bytes');
