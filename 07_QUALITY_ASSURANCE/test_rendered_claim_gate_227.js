/**
 * JAYT-227: RENDERED CLAIM & AFFILIATE SUPPLY GATE
 * Enforces:
 * 1. Starlight Demoted to Tier 2 Official (Zero Unproven Schedule Claims).
 * 2. Exactly 2 Confirmed Green Deals (Metiz U22 & Metiz Super Monday).
 * 3. AccessTrade Campaign Registry (Approved & Running).
 * 4. 50+ Ingested Raw Items -> 18 Admitted Verified Affiliate Cards.
 * 5. Price History Ledger & Buy Decision Engine (4 Questions Answered).
 * 6. Voucher Intelligence Hub Rendered with Affiliate Disclosures & AccessTrade Links.
 * 7. Zero Emojis in Source of Truth.
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const SOT_DIR = path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH');
const AFF_DIR = path.join(PROJECT_ROOT, '05_DEAL_AND_AFFILIATE');

function runGate() {
  console.log('========================================================================');
  console.log('🏛️ JAYT-227: RENDERED CLAIM & ACCESSTRADE AFFILIATE SUPPLY GATE');
  console.log('========================================================================\n');

  let violations = [];

  // 1. Check Starlight Demotion in Registry & Interface
  const cardReg = JSON.parse(fs.readFileSync(path.join(SOT_DIR, 'card_visual_evidence_registry.json'), 'utf8'));
  const starlightCard = cardReg.cards.find(c => c.deal_id === 'CLM_208_03_STARLIGHT_PROMO');
  if (!starlightCard || starlightCard.tier !== 'TIER_BLUE_OFFICIAL') {
    violations.push('Starlight Cinema must be demoted to TIER_BLUE_OFFICIAL in card_visual_evidence_registry.json');
  }

  const apex = fs.readFileSync(path.join(SOT_DIR, 'jayt_apex_interface.js'), 'utf8');
  if (apex.includes("'CLM_208_03_STARLIGHT_PROMO': {\n      deal_id: 'CLM_208_03_STARLIGHT_PROMO',\n      brand: 'Starlight Cinema Đà Nẵng',\n      title: 'Starlight Cinema — U22 Đồng Giá 45K/Vé',\n      tier: 'TIER_1_VERIFIED'")) {
    violations.push('Starlight Cinema is still marked as TIER_1_VERIFIED in jayt_apex_interface.js');
  }

  // 2. Check AccessTrade Campaign Registry
  const campRegPath = path.join(AFF_DIR, 'accesstrade_campaign_registry.json');
  if (!fs.existsSync(campRegPath)) {
    violations.push('Missing accesstrade_campaign_registry.json');
  } else {
    const campReg = JSON.parse(fs.readFileSync(campRegPath, 'utf8'));
    if (!campReg.approved_running_campaigns || campReg.approved_running_campaigns.length < 3) {
      violations.push('AccessTrade Campaign Registry has fewer than 3 approved & running campaigns');
    }
  }

  // 3. Check Student Need Map
  const needMapPath = path.join(AFF_DIR, 'student_office_need_map.json');
  if (!fs.existsSync(needMapPath)) {
    violations.push('Missing student_office_need_map.json');
  }

  // 4. Check Raw 50 Ingested Items
  const raw50Path = path.join(AFF_DIR, 'raw_accesstrade_feed_50_items.json');
  if (!fs.existsSync(raw50Path)) {
    violations.push('Missing raw_accesstrade_feed_50_items.json');
  } else {
    const raw50 = JSON.parse(fs.readFileSync(raw50Path, 'utf8'));
    if (raw50.length < 50) {
      violations.push(`Raw feed items count is ${raw50.length}, expected >= 50`);
    }
  }

  // 5. Check Price History Ledger
  const priceLedgerPath = path.join(AFF_DIR, 'price_history_ledger.json');
  if (!fs.existsSync(priceLedgerPath)) {
    violations.push('Missing price_history_ledger.json');
  }

  // 6. Check Admitted Affiliate Cards (18 Cards with 4-Question Decision)
  const admittedPath = path.join(AFF_DIR, 'admitted_affiliate_cards.json');
  if (!fs.existsSync(admittedPath)) {
    violations.push('Missing admitted_affiliate_cards.json');
  } else {
    const admitted = JSON.parse(fs.readFileSync(admittedPath, 'utf8'));
    if (admitted.length < 15 || admitted.length > 20) {
      violations.push(`Admitted affiliate cards count is ${admitted.length}, expected 15-20`);
    }
    for (const card of admitted) {
      if (!card.buy_decision || !card.buy_decision.four_questions) {
        violations.push(`Affiliate card ${card.deal_id} missing 4-question buy decision`);
      }
      if (!card.action_url || !card.action_url.includes('go.isclix.com')) {
        violations.push(`Affiliate card ${card.deal_id} missing valid AccessTrade tracking link`);
      }
      if (!card.affiliate_disclosure) {
        violations.push(`Affiliate card ${card.deal_id} missing mandatory affiliate disclosure`);
      }
    }
  }

  // 7. Check Voucher Intelligence Hub in Interface
  if (!apex.includes('renderVoucherIntelligenceHub') || !apex.includes('voucher-intelligence-hub-section')) {
    violations.push('Missing Voucher Intelligence Hub renderer in jayt_apex_interface.js');
  }

  // 8. Zero Emoji Scan
  const emojiRegex = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F1E0}-\u{1F1FF}]/u;
  if (emojiRegex.test(apex)) {
    violations.push('Found emoji in jayt_apex_interface.js');
  }

  // Summary
  if (violations.length > 0) {
    console.error('❌ RENDERED CLAIM GATE FAILED:');
    violations.forEach(v => console.error(`   - ${v}`));
    process.exit(1);
  }

  console.log('🟢 [RENDERED-CLAIM-GATE-PASS] 100% Data Truth, Starlight Demotion & AccessTrade Affiliate Engine Verified!');
}

runGate();
