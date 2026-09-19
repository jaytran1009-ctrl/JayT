const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const { TIER_DEFINITIONS, validateCardByTier } = require('./tiered_content_policy_205');

const repoRoot = path.resolve(__dirname, '..');

function sha256Buf(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }
function sha256File(p) { return fs.existsSync(p) ? sha256Buf(fs.readFileSync(p)) : null; }

function runTieredTests205() {
  console.log('========================================================================');
  console.log('🧪 JAYT-205: TIERED CONTENT POLICY (30-50 DAILY CARDS) TEST SUITE');
  console.log('   Timestamp: ' + new Date().toISOString());
  console.log('========================================================================\n');

  const tests = [];
  function record(name, pass, details) {
    tests.push({ name, pass, details });
    console.log((pass ? '  ✅ PASS: ' : '  ❌ FAIL: ') + name + '\n     ' + details);
  }

  const feed205Path = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'generated_tiered_savings_feed_205.json');
  assert(fs.existsSync(feed205Path), 'Feed 205 not found');
  const feed = JSON.parse(fs.readFileSync(feed205Path, 'utf8'));

  const green = feed.green_confirmed_deals || [];
  const blue = feed.blue_official_offers || [];
  const orange = feed.orange_flash_deals || [];
  const purple = feed.purple_verified_venues || [];
  const white = feed.white_community_radar || [];
  const total = green.length + blue.length + orange.length + purple.length + white.length;

  // --- TEST 1: TOTAL CARDS COUNT IN 30-50 TARGET RANGE ---
  try {
    assert(total >= 30 && total <= 50, `Total cards (${total}) must be between 30 and 50`);
    record('TEST_01_TOTAL_DAILY_CARDS_IN_RANGE', true, `Total daily cards = ${total} (Target: 30-50). KPI Achieved!`);
  } catch (err) {
    record('TEST_01_TOTAL_DAILY_CARDS_IN_RANGE', false, err.message);
  }

  // --- TEST 2: 5-TIER TARGET DISTRIBUTION ACCURACY ---
  try {
    assert(green.length >= 5 && green.length <= 10, `Green count ${green.length} not in 5-10`);
    assert(blue.length >= 10 && blue.length <= 15, `Blue count ${blue.length} not in 10-15`);
    assert(orange.length >= 5 && orange.length <= 10, `Orange count ${orange.length} not in 5-10`);
    assert(purple.length >= 10 && purple.length <= 15, `Purple count ${purple.length} not in 10-15`);
    assert(white.length <= 5, `White count ${white.length} exceeds 5`);
    record('TEST_02_5_TIER_TARGET_DISTRIBUTION', true, `Distribution: ${green.length} 🟢, ${blue.length} 🔵, ${orange.length} 🟠, ${purple.length} 🟣, ${white.length} ⚪. 100% Target Met!`);
  } catch (err) {
    record('TEST_02_5_TIER_TARGET_DISTRIBUTION', false, err.message);
  }

  // --- TEST 3: PER-TIER SCHEMA & VALIDATION CONFORMITY ---
  try {
    let invalidCount = 0;
    const allCards = [...green, ...blue, ...orange, ...purple, ...white];
    for (const card of allCards) {
      const val = validateCardByTier(card);
      if (!val.valid) {
        invalidCount++;
        throw new Error(`Card ${card.deal_id || card.venue_id || card.signal_id} failed tier validation: ${val.reason}`);
      }
    }
    assert.strictEqual(invalidCount, 0, 'All cards must pass tier-specific validation');
    record('TEST_03_PER_TIER_SCHEMA_CONFORMITY', true, `All ${allCards.length} cards strictly adhere to their respective tier policy definitions.`);
  } catch (err) {
    record('TEST_03_PER_TIER_SCHEMA_CONFORMITY', false, err.message);
  }

  // --- TEST 4: LIFECYCLE TTL & FRESHNESS METADATA ---
  try {
    for (const d of orange) {
      assert(d.captured_at && d.freshness_ttl_hours === 24, `Orange deal ${d.deal_id} missing 24h freshness TTL`);
    }
    for (const v of purple) {
      assert(v.freshness_ttl_days === 30, `Purple venue ${v.venue_id} missing 30d TTL`);
    }
    for (const w of white) {
      assert(w.ttl_hours === 72, `White signal ${w.signal_id} missing 72h TTL`);
    }
    record('TEST_04_LIFECYCLE_TTL_AND_FRESHNESS', true, 'Lifecycle rules validated: 🟠 24h auto-hide, 🟣 30d recheck, ⚪ 72h intake TTL.');
  } catch (err) {
    record('TEST_04_LIFECYCLE_TTL_AND_FRESHNESS', false, err.message);
  }

  // --- TEST 5: HEADLINE BREAKDOWN EXACT MATCH ---
  try {
    const expectedHeadline = `Hôm nay: ${green.length} 🟢 đã xác nhận · ${blue.length} 🔵 ưu đãi chính thức · ${orange.length} 🟠 flash deal · ${purple.length} 🟣 điểm hẹn · ${white.length} ⚪ radar`;
    assert.strictEqual(feed.strategic_kpi_summary.headline_kpi_string, expectedHeadline, 'Headline string in feed mismatch');
    
    const uiCode = fs.readFileSync(path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js'), 'utf8');
    assert(uiCode.includes('${totalGreen} 🟢 đã xác nhận · ${totalBlue} 🔵 ưu đãi chính thức · ${totalOrange} 🟠 flash deal · ${totalPurple} 🟣 điểm hẹn · ${totalWhite} ⚪ radar'), 'UI template missing headline format');
    record('TEST_05_HEADLINE_BREAKDOWN_EXACT_MATCH', true, `Headline matches: "${expectedHeadline}"`);
  } catch (err) {
    record('TEST_05_HEADLINE_BREAKDOWN_EXACT_MATCH', false, err.message);
  }

  console.log('\n========================================================================');
  const allPassed = tests.every(t => t.pass);
  if (!allPassed) {
    console.error('❌ JAYT-205 TEST SUITE FAILED!');
    process.exit(1);
  } else {
    console.log(`🎉 ALL ${tests.length}/${tests.length} JAYT-205 TESTS PASSED [100% EXCELLENCE]`);
  }
}

if (require.main === module) {
  runTieredTests205();
}

module.exports = { runTieredTests205 };
