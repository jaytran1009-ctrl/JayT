/**
 * JAYT CLUSTER EXPANSION INTEGRATION SCRIPT (166)
 * Directive: JAYT-166: ĐÀ NẴNG STUDENT SUPPLY EXPANSION BATCH
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const jsSotPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
const jsDeployPath = path.join(repoRoot, 'deploy', 'jayt_apex_interface.js');
const manifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'da_nang_cluster_expansion_manifest_166.json');
const dashboardPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'hybrid_supply_dashboard_162.json');

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const dashboard = JSON.parse(fs.readFileSync(dashboardPath, 'utf8'));

console.log('=== APPLYING 75-TARGET CLUSTER EXPANSION TO JAYT INTERFACE (166) ===');

// Flatten all targets with cluster_id & hub_id
let registry166Items = [];
manifest.clusters.forEach(c => {
  c.targets.forEach(t => {
    registry166Items.push({
      item_id: t.id,
      cluster_id: c.cluster_id,
      cluster_name: c.name,
      hub_id: t.hub,
      brand_name: t.name,
      category: t.category,
      address: t.address,
      url: t.url,
      reliability_tier: t.tier,
      locator_evidence: t.locator_evidence,
      last_checked_at: '2026-08-27T13:29:00.000Z'
    });
  });
});

console.log(`Prepared ${registry166Items.length} registry items across 5 clusters.`);

let jsContent = fs.readFileSync(jsSotPath, 'utf8');

// Replace CATEGORY_HUBS_REGISTRY_163 with CATEGORY_HUBS_REGISTRY_166
const startReg = jsContent.indexOf('const CATEGORY_HUBS_REGISTRY_163 =');
const endReg = jsContent.indexOf('const HYBRID_SUPPLY_DASHBOARD_163 =');

if (startReg !== -1 && endReg !== -1) {
  const newRegistryBlock = `const CATEGORY_HUBS_REGISTRY_163 = ${JSON.stringify(registry166Items, null, 2)};\n  `;
  jsContent = jsContent.substring(0, startReg) + newRegistryBlock + jsContent.substring(endReg);
  console.log('✅ Replaced CATEGORY_HUBS_REGISTRY_163 with 75 expansion targets.');
} else {
  console.error('❌ Could not find registry block to replace!');
}

// Update HYBRID_SUPPLY_DASHBOARD_163
const startDash = jsContent.indexOf('const HYBRID_SUPPLY_DASHBOARD_163 =');
const endDash = jsContent.indexOf('// --- CARD RENDERERS (4 TIERS) ---');

if (startDash !== -1 && endDash !== -1) {
  const newDashBlock = `const HYBRID_SUPPLY_DASHBOARD_163 = ${JSON.stringify(dashboard, null, 2)};\n\n  `;
  jsContent = jsContent.substring(0, startDash) + newDashBlock + jsContent.substring(endDash);
  console.log('✅ Updated HYBRID_SUPPLY_DASHBOARD_163.');
}

// Update tier3 filter to filter by cluster if not ALL
const oldTier3Filter = `const tier3Sources = hubItems.filter(item => item.reliability_tier === 'TIER_3_TRACKED_SOURCE' || item.reliability_tier === 'TIER_3_TRACKED_SOURCE_SIGNAL');`;
const newTier3Filter = `let tier3Sources = hubItems.filter(item => item.reliability_tier === 'TIER_3_TRACKED_SOURCE' || item.reliability_tier === 'TIER_3_TRACKED_SOURCE_SIGNAL');
    if (currentClusterId !== 'ALL') {
      tier3Sources = tier3Sources.filter(s => s.cluster_id === currentClusterId);
    }`;

if (jsContent.includes(oldTier3Filter)) {
  jsContent = jsContent.replace(oldTier3Filter, newTier3Filter);
  console.log('✅ Updated Tier 3 filtering logic for community clusters.');
}

fs.writeFileSync(jsSotPath, jsContent, 'utf8');
fs.writeFileSync(jsDeployPath, jsContent, 'utf8');
console.log('✅ Synchronized 03_SOURCE_OF_TRUTH/jayt_apex_interface.js and deploy/jayt_apex_interface.js with 100% parity.');
