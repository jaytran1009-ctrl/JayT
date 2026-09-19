const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const jsSotPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
let js = fs.readFileSync(jsSotPath, 'utf8');

console.log('=== APPLYING JAYT-176 INCIDENT CONTAINMENT ===\n');

// 1. Replace SPRINT_175_VERIFIED_DEALS with clean empty array / containment state
const containmentDeals = [
  { id: 'DEAL_B_01', brand: 'GitHub Education', title: 'Kiểm tra điều kiện và quyền lợi tại nguồn chính thức', category: 'STUDENT_BENEFIT', hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES', action_url: 'https://education.github.com/pack', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL' },
  { id: 'DEAL_B_02', brand: 'JetBrains', title: 'Kiểm tra điều kiện và quyền lợi tại nguồn chính thức', category: 'STUDENT_BENEFIT', hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES', action_url: 'https://www.jetbrains.com/community/education/#students', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL' },
  { id: 'DEAL_B_03', brand: 'Spotify Vietnam', title: 'Kiểm tra điều kiện và quyền lợi tại nguồn chính thức', category: 'STUDENT_BENEFIT', hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES', action_url: 'https://www.spotify.com/vn-vi/student/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL' },
  { id: 'DEAL_B_04', brand: 'Notion', title: 'Kiểm tra điều kiện và quyền lợi tại nguồn chính thức', category: 'STUDENT_BENEFIT', hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES', action_url: 'https://www.notion.so/product/notion-for-education', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL' },
  { id: 'DEAL_B_05', brand: 'Canva', title: 'Kiểm tra điều kiện và quyền lợi tại nguồn chính thức', category: 'STUDENT_BENEFIT', hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES', action_url: 'https://www.canva.com/education/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL' },
  { id: 'DEAL_B_06', brand: 'YouTube Premium', title: 'Kiểm tra điều kiện và quyền lợi tại nguồn chính thức', category: 'STUDENT_BENEFIT', hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES', action_url: 'https://www.youtube.com/premium/student', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL' }
];

const startMarker = 'const SPRINT_175_VERIFIED_DEALS = ';
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
  console.log('✅ Replaced SPRINT_175_VERIFIED_DEALS with containment ACTIVE_VERIFIED_DEALS_170 (TIER_3 only, zero claims).');
}

// 2. Lock tier1Deals in renderCategoryHubsCenter163 to pure empty or strict feed check
const tier1Injection = `let tier1Deals = SPRINT_175_VERIFIED_DEALS.filter(d => d.hub_id === currentHubId);
    if (tier1Deals.length === 0 && state.feed && Array.isArray(state.feed.deals)) {
      tier1Deals = state.feed.deals.filter(d => d.hub_id === currentHubId);
    }`;

const cleanTier1 = `const tier1Deals = (state.feed && Array.isArray(state.feed.deals)) ? state.feed.deals.filter(d => d.hub_id === currentHubId) : [];`;

if (js.includes(tier1Injection)) {
  js = js.replace(tier1Injection, cleanTier1);
  console.log('✅ Removed SPRINT_175_VERIFIED_DEALS from Tier 1 renderer (tier1Deals locked to []).');
}

// 3. Restore Daily Board overview card
js = js.replace('10 Deal Đã Đối Soát', '0 Deal Đã Đối Soát');
js = js.replace('Đã xác thực chứng từ', 'Chờ evidence pack thật');
js = js.replace('100 Điểm Hẹn Tiết Kiệm', '32 Cơ Sở Khảo Sát');
js = js.replace('30+ Nguồn Chính Thức', '78 Nguồn Chính Thức');

// 4. Update version badge to Daily Deal OS 3.317
js = js.replace(/Daily Deal OS 3\.\d+/g, 'Daily Deal OS 3.317');
console.log('✅ Updated version badge to Daily Deal OS 3.317.');

// 5. Write to SOT, deploy/, and deploy/public/
fs.writeFileSync(jsSotPath, js, 'utf8');
fs.writeFileSync(path.join(repoRoot, 'deploy', 'jayt_apex_interface.js'), js, 'utf8');
fs.writeFileSync(path.join(repoRoot, 'deploy', 'public', 'jayt_apex_interface.js'), js, 'utf8');

console.log('✅ Saved containment JS across all 3 locations.');
