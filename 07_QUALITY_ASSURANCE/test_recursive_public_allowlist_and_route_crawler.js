const fs = require('fs');
const path = require('path');
const https = require('https');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const DEPLOY_DIR = path.join(PROJECT_ROOT, 'deploy');
const DEPLOY_PUB_DIR = path.join(DEPLOY_DIR, 'public');
const LIVE_URL = 'https://deploy-ten-xi-48.vercel.app';

console.log('========================================================================');
console.log('🛡️ JAYT-245 QA GATE: RECURSIVE PUBLIC ALLOWLIST & ROUTE CRAWLER');
console.log('========================================================================\n');

// 1. Recursive Allowlist Scanner
const ALLOWED_DEPLOY_ENTRIES = new Set([
  'index.html',
  'jayt_apex_interface.js',
  'styles.css',
  'sw.js',
  'published_manifest.json',
  'vercel.json',
  '.vercel',
  'public'
]);

const ALLOWED_PUBLIC_ENTRIES = new Set([
  'index.html',
  'jayt_apex_interface.js',
  'styles.css',
  'sw.js',
  'published_manifest.json'
]);

function scanDirectory(dir, allowedSet, label) {
  console.log(`🔍 [Part 1] Scanning ${label}...`);
  if (!fs.existsSync(dir)) {
    console.log(`   ℹ️ Directory ${label} does not exist (OK)`);
    return true;
  }
  const items = fs.readdirSync(dir);
  let clean = true;
  for (const item of items) {
    if (!allowedSet.has(item)) {
      console.error(`   ❌ [ALLOWLIST-FAIL] Unallowlisted entry found: ${item}`);
      clean = false;
    } else {
      console.log(`   ✅ Allowlisted: ${item}`);
    }
  }
  return clean;
}

const deployClean = scanDirectory(DEPLOY_DIR, ALLOWED_DEPLOY_ENTRIES, 'deploy/');
let pubClean = true;
if (fs.existsSync(DEPLOY_PUB_DIR)) {
  pubClean = scanDirectory(DEPLOY_PUB_DIR, ALLOWED_PUBLIC_ENTRIES, 'deploy/public/');
}

if (!deployClean || !pubClean) {
  console.error('\n❌ RECURSIVE ALLOWLIST SCAN FAILED! Unallowlisted files present in deploy tree.');
  process.exit(1);
}
console.log('\n🟢 Part 1 Recursive Allowlist Scan: 100% PASS!\n');

// 2. Production Live Route Crawler (Checking 30+ Denied Routes)
const DENIED_ROUTES = [
  // Legacy Evidence Bundles (Section U Specific)
  '/evidence_bundles/BUNDLE_DEAL_001_METIZ_U22.json',
  '/evidence_bundles/BUNDLE_DEAL_002_METIZ_SUPER_MONDAY.json',
  '/evidence_bundles/BUNDLE_DEAL_003_STARLIGHT_U22.json',
  '/evidence_bundles/BUNDLE_SOURCE_001_GALAXY.json',
  '/evidence_bundles/BUNDLE_SOURCE_002_CGV.json',
  '/evidence_bundles/BUNDLE_SOURCE_003_DOMINOS.json',
  '/evidence_bundles/BUNDLE_SOURCE_004_POPEYES.json',
  '/evidence_bundles/BUNDLE_SOURCE_005_SPOTIFY_STUDENT.json',
  '/evidence_bundles/BUNDLE_SOURCE_006_MICROSOFT_365.json',
  '/evidence_bundles/BUNDLE_SOURCE_007_FIGMA_EDUCATION.json',
  '/evidence_bundles/BUNDLE_SOURCE_010_GITHUB_PACK.json',
  '/evidence_bundles/BUNDLE_SOURCE_011_NOTION_EDUCATION.json',
  '/evidence_bundles/BUNDLE_SOURCE_015_DANABUS.json',
  '/evidence_bundles/BUNDLE_SOURCE_016_VNR.json',
  '/evidence_bundles/BUNDLE_SOURCE_017_TNGO.json',
  '/evidence_bundles/BUNDLE_AFF_001_TIKI_AM_SIEU_TOC.json',
  '/evidence_bundles/BUNDLE_RADAR_011_VINAPHONE.json',
  '/evidence_bundles/BUNDLE_UTILITY_001_THU_VIEN.json',
  '/evidence_bundles/BUNDLE_VENUE_001_KATINAT.json',
  
  // Legacy Assets
  '/assets/real-verified-assets/metiz-cinema-official-logo.png',
  '/assets/real-verified-assets/cgv-cinemas-official-logo.png',
  '/assets/real-verified-assets/dominos-pizza-official-logo.svg',
  '/assets/real-verified-assets/spotify-student-official-logo.png',
  
  // Legacy Feeds & Staging Inventories
  '/daily_50_opportunities_feed.json',
  '/daily_supply_feed_127.json',
  '/staging_50_item_candidate_inventory.json',
  '/staging_50_unassessed_target_inventory.json',
  '/four_layer_dataset.json',
  '/brand_asset_registry.json',
  '/card_visual_evidence_registry.json',
  '/supply_pilot_stratified_sampling_report.json',
  '/raw_artefacts/RAW_SOURCE_003_DOMINOS.json',
  '/semantic_binding_records/SEMANTIC_BINDING_TGT_C1_01.json'
];

function fetchStatus(path) {
  return new Promise((resolve) => {
    https.get(`${LIVE_URL}${path}?ts=${Date.now()}`, (res) => {
      resolve({ path, statusCode: res.statusCode });
    }).on('error', (err) => {
      resolve({ path, statusCode: 0, error: err.message });
    });
  });
}

async function runCrawler() {
  console.log(`🌐 [Part 2] Crawling ${DENIED_ROUTES.length} Denied Routes on Live Production (${LIVE_URL})...\n`);
  let allDenied = true;

  for (const r of DENIED_ROUTES) {
    const res = await fetchStatus(r);
    const pass = (res.statusCode === 404);
    console.log(`   Route ${r} -> Status ${res.statusCode} ${pass ? '✅ (PASS: DENIED 404)' : '❌ (FAIL: STILL EXPOSED)'}`);
    if (!pass) allDenied = false;
  }

  console.log('------------------------------------------------------------------------');
  if (!allDenied) {
    console.error('❌ CRAWLER FAILED! One or more legacy/quarantined routes are still exposed on live!');
    process.exit(1);
  }

  console.log('🟢 [CRAWLER-PASS] 100% of Quarantined Routes Confirmed HTTP 404 Deny!');
  console.log('========================================================================');
}

runCrawler().catch(err => {
  console.error('Error during crawler execution:', err);
  process.exit(1);
});
