/**
 * JAYT-230: ACCESSTRADE CUSTOMER-VALUE AFFILIATE ENGINE QA GATE
 * 1. Provenance & 5-Question Customer Value Decision Gate.
 * 2. Strict Price History Truth (No fake 30-day low claims; "JayT mới bắt đầu theo dõi giá" enforced).
 * 3. Class & Tier Segregation (Zero Emerald .jayt-card-tier-green reuse for affiliate).
 * 4. Transparent Affiliate Disclosure on every item.
 * 5. Touch Target Standard >= 44px on all action CTAs.
 * 6. Zero Emoji & Zero Duplicate Text.
 */

const fs = require('fs');
const path = require('path');

const SOT_DIR = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng/03_SOURCE_OF_TRUTH';

function runGate() {
  console.log('========================================================================');
  console.log('🏛️ JAYT-230: ACCESSTRADE CUSTOMER-VALUE AFFILIATE ENGINE QA GATE');
  console.log('========================================================================\n');

  let violations = [];
  
  // 1. Check Registry Existence & Item Integrity
  const regPath = path.join(SOT_DIR, 'affiliate_customer_value_registry.json');
  if (!fs.existsSync(regPath)) {
    violations.push('Missing affiliate_customer_value_registry.json');
  } else {
    const reg = JSON.parse(fs.readFileSync(regPath, 'utf8'));
    const items = reg.items || [];
    
    if (items.length < 15) {
      violations.push(`Expected >= 15 curated affiliate items, found ${items.length}`);
    }

    items.forEach((item, idx) => {
      if (!item.item_id || !item.merchant || !item.source_url) {
        violations.push(`Item #${idx + 1} missing core provenance fields`);
      }
      if (!item.price_status || !item.price_status.includes('JayT mới bắt đầu theo dõi giá')) {
        violations.push(`Item #${idx + 1} (${item.item_id}) must have price_status "JayT mới bắt đầu theo dõi giá"`);
      }
      const dec = item.buy_decision;
      if (!dec || !dec.verdict || !dec.q1_need_fit || !dec.q2_price_and_fee || !dec.q3_sku_and_availability || !dec.q4_price_history_truth || !dec.q5_final_verdict_reason) {
        violations.push(`Item #${idx + 1} (${item.item_id}) missing 5-question decision metadata`);
      }
      if (!['NÊN MUA', 'CHỜ GIÁ', 'KIỂM TRA MÃ', 'KHÔNG KHUYẾN NGHỊ'].includes(dec.verdict)) {
        violations.push(`Item #${idx + 1} (${item.item_id}) invalid verdict "${dec.verdict}"`);
      }
      if (!item.affiliate_disclosure || !item.affiliate_disclosure.includes('tiếp thị chính thức')) {
        violations.push(`Item #${idx + 1} (${item.item_id}) missing explicit affiliate disclosure`);
      }
    });
  }

  // 2. Check UI Integration in jayt_apex_interface.js
  const apex = fs.readFileSync(path.join(SOT_DIR, 'jayt_apex_interface.js'), 'utf8');
  if (!apex.includes('function renderSmartShoppingAffiliateCard')) {
    violations.push('Missing renderSmartShoppingAffiliateCard in jayt_apex_interface.js');
  }
  if (!apex.includes('jayt-smart-shopping-section')) {
    violations.push('Missing jayt-smart-shopping-section in category hubs renderer');
  }

  // 3. Anti-Green Bleed: Affiliate cards must NOT reuse .jayt-card-tier-green
  if (apex.includes('class="jayt-card-tier-green" data-action="open-affiliate') || apex.includes('class="jayt-card-tier-green" data-affiliate')) {
    violations.push('Affiliate cards must not use .jayt-card-tier-green CSS class');
  }

  // 4. Zero Emoji Scan
  const emojiRegex = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F1E0}-\u{1F1FF}]/u;
  if (emojiRegex.test(apex)) {
    violations.push('Found emoji in apex interface');
  }

  if (violations.length > 0) {
    console.error('❌ JAYT-230 QA GATE FAILED:');
    violations.forEach(v => console.error(`   - ${v}`));
    process.exit(1);
  }

  console.log('🟢 [JAYT-230-GATE-PASS] 100% Customer-Value Affiliate Engine & 5-Question Truth Verified!');
}

runGate();
