const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const feed208Path = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'generated_promoted_savings_feed_208.json');
const feed207Path = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'generated_claim_safe_feed_207.json');
const feed206Path = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'generated_source_first_feed_206.json');

const feedPath = fs.existsSync(feed208Path) ? feed208Path : (fs.existsSync(feed207Path) ? feed207Path : feed206Path);
const targetModulePath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_verified_deals_module.js');

const harvestDirs = [
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_179_harvest'),
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_181_harvest'),
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_184_harvest'),
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_185_harvest'),
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_186_harvest'),
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_187_harvest'),
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_188_harvest'),
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_190_harvest'),
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_192_harvest'),
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_193_harvest'),
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_194_harvest'),
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_195_harvest'),
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_196_containment'),
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_197_harvest'),
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_198_leaf_harvest'),
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_200_autopilot_harvest'),
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_201_actionable_harvest')
];

function sha256Buf(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }
function sha256Str(str) { return crypto.createHash('sha256').update(str, 'utf8').digest('hex'); }
function sha256File(p) { return sha256Buf(fs.readFileSync(p)); }

function normalizeHtmlText(html) {
  if (!html) return '';
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildVerifiedDealsModule() {
  console.log('========================================================================');
  console.log('🏗️ JAYT-205: TIERED CONTENT POLICY BUILD ENGINE');
  console.log('   Timestamp: ' + new Date().toISOString());
  console.log('========================================================================\n');

  if (!fs.existsSync(feedPath)) {
    throw new Error('BUILD_FAILED: Feed does not exist at ' + feedPath);
  }

  const rawFeed = fs.readFileSync(feedPath, 'utf8');
  const inputFeedSha = sha256Str(rawFeed);
  const feed = JSON.parse(rawFeed);

  const greenConfirmed = feed.green_confirmed_deals || feed.ready_to_use_deals || [];
  const blueOfficial = feed.blue_official_offers || feed.promo_scope_pending_deals || [];
  const orangeFlash = feed.orange_flash_deals || [];
  const purpleVenues = feed.purple_verified_venues || feed.verified_location_tracking || [];
  const whiteRadar = feed.white_community_radar || feed.community_pending_audit || [];

  console.log('  Input Feed:                   ' + path.relative(repoRoot, feedPath));
  console.log('  Input Feed SHA-256:           ' + inputFeedSha);
  console.log('  🟢 Green Confirmed Deals:     ' + greenConfirmed.length);
  console.log('  🔵 Blue Official Offers:      ' + blueOfficial.length);
  console.log('  🟠 Orange Flash Deals:        ' + orangeFlash.length);
  console.log('  🟣 Purple Verified Venues:    ' + purpleVenues.length);
  console.log('  ⚪ White Community Radar:     ' + whiteRadar.length);
  console.log('  🎯 Total Daily Cards:         ' + (greenConfirmed.length + blueOfficial.length + orangeFlash.length + purpleVenues.length + whiteRadar.length) + '\n');

  // Verify each tier
  for (const d of greenConfirmed) {
    if (!d.offer_quote || !d.danang_address) {
      throw new Error(`BUILD_FAILED: Green deal ${d.deal_id} missing required offer quote or Da Nang address`);
    }
  }

  for (const d of blueOfficial) {
    if (!d.offer_quote || !d.source_url) {
      throw new Error(`BUILD_FAILED: Blue offer ${d.deal_id} missing required offer quote or source URL`);
    }
  }

  for (const d of orangeFlash) {
    if (!d.offer_quote || !d.captured_at) {
      throw new Error(`BUILD_FAILED: Orange flash deal ${d.deal_id} missing offer quote or capture timestamp`);
    }
  }

  for (const v of purpleVenues) {
    if (!v.title && !v.brand) {
      throw new Error(`BUILD_FAILED: Purple venue ${v.deal_id || v.venue_id || v.tracking_id} missing title or brand`);
    }
  }

  // Assemble Deterministic SOT Data Module
  const moduleCode = `/**
 * JAYT VERIFIED SAVINGS DATA MODULE (SOT / UI RUNTIME BINDING)
 * AUTO-GENERATED BY: build_ui_bundle_181.js (JAYT-205 TIERED CONTENT POLICY)
 * Generated at: ${new Date().toISOString()}
 * Input Feed SHA-256: ${inputFeedSha}
 * 
 * 5-Tier Content Architecture (30-50 Daily Cards):
 * - 🟢 Green Confirmed: ${greenConfirmed.length} deals
 * - 🔵 Blue Official: ${blueOfficial.length} offers
 * - 🟠 Orange Flash: ${orangeFlash.length} deals
 * - 🟣 Purple Venues: ${purpleVenues.length} points of interest
 * - ⚪ White Radar: ${whiteRadar.length} signals
 * Total Daily Cards: ${greenConfirmed.length + blueOfficial.length + orangeFlash.length + purpleVenues.length + whiteRadar.length}
 */

(function(root) {
  'use strict';

  var TIERED_SAVINGS_FEED = ${JSON.stringify(feed, null, 2)};

  if (typeof window !== 'undefined') {
    window.JAYT_TIERED_SAVINGS_FEED = TIERED_SAVINGS_FEED;
    window.JAYT_VERIFIED_DEALS_FEED = TIERED_SAVINGS_FEED;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = TIERED_SAVINGS_FEED;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);
`;

  fs.writeFileSync(targetModulePath, moduleCode, 'utf8');
  const outputModuleSha = sha256Str(moduleCode);

  console.log('\n  ✅ Generated UI Data Module: ' + path.relative(repoRoot, targetModulePath));
  console.log('  Output Module SHA-256:       ' + outputModuleSha);

  // Write build manifest
  const manifestPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'BUILD_MANIFEST_181.json');
  fs.writeFileSync(manifestPath, JSON.stringify({
    build_id: 'BUILD_205_' + Date.now(),
    timestamp: new Date().toISOString(),
    input_feed_file: path.relative(repoRoot, feedPath),
    input_feed_sha256: inputFeedSha,
    output_module_file: path.relative(repoRoot, targetModulePath),
    output_module_sha256: outputModuleSha,
    green_confirmed_count: greenConfirmed.length,
    blue_official_count: blueOfficial.length,
    orange_flash_count: orangeFlash.length,
    purple_venue_count: purpleVenues.length,
    white_radar_count: whiteRadar.length,
    total_daily_cards: greenConfirmed.length + blueOfficial.length + orangeFlash.length + purpleVenues.length + whiteRadar.length
  }, null, 2), 'utf8');

  console.log('  📄 Build Manifest saved to:   ' + path.relative(repoRoot, manifestPath) + '\n');
}

if (require.main === module) {
  try {
    buildVerifiedDealsModule();
  } catch (err) {
    console.error('\n❌ BUILD FAILED:', err.message);
    process.exit(1);
  }
}

module.exports = { buildVerifiedDealsModule, normalizeHtmlText };
