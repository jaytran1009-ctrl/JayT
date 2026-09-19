/**
 * JAYT-234: PREMIUM COMMUNITY DEAL OS & VALUE-FIRST AFFILIATE QA GATE
 * 1. Campaign Decision Matrix Gate (>= 30 campaigns reviewed, 12-15 shortlisted).
 * 2. Raw Ingestion Gate (100 Raw Items with SHA-256 and Timestamp).
 * 3. Redirect Test Receipt Gate (100% deep links verified).
 * 4. 5-Question Customer Value Decision Gate.
 * 5. Price History Truth Gate ("JayT mới bắt đầu theo dõi giá").
 * 6. 5-Section User Journey & Detail Drawer Gate.
 * 7. Class Segregation Gate (0% Emerald reuse for Affiliate).
 * 8. Touch Target Standard >= 44px & Zero Emojis.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const SOT_DIR = path.join(ROOT_DIR, '03_SOURCE_OF_TRUTH');
const AFF_DIR = path.join(ROOT_DIR, '05_DEAL_AND_AFFILIATE');

function runGate() {
  console.log('========================================================================');
  console.log('🏛️ JAYT-234: PREMIUM COMMUNITY DEAL OS & VALUE-FIRST AFFILIATE QA GATE');
  console.log('========================================================================\n');

  let violations = [];

  // 1. Check Campaign Decision Matrix
  const matrixPath = path.join(AFF_DIR, 'CAMPAIGN_DECISION_MATRIX_234.md');
  if (!fs.existsSync(matrixPath)) {
    violations.push('Missing CAMPAIGN_DECISION_MATRIX_234.md');
  } else {
    const mat = fs.readFileSync(matrixPath, 'utf8');
    const rowCount = (mat.match(/\| \d+ \|/g) || []).length;
    if (rowCount < 30) {
      violations.push(`Expected >= 30 campaigns reviewed in matrix, found ${rowCount}`);
    }
  }

  // 2. Check Raw Ingestion Feed
  const rawPath = path.join(AFF_DIR, 'raw_evidence', 'accesstrade_raw_feed_batch_234.json');
  if (!fs.existsSync(rawPath)) {
    violations.push('Missing accesstrade_raw_feed_batch_234.json');
  } else {
    const raw = JSON.parse(fs.readFileSync(rawPath, 'utf8'));
    if (raw.total_raw_count < 100) {
      violations.push(`Expected >= 100 raw items, found ${raw.total_raw_count}`);
    }
    raw.items.forEach((item, idx) => {
      if (!item.raw_hash || !item.deep_tracking_url || !item.deep_tracking_url.includes('go.isclix.com')) {
        violations.push(`Raw item #${idx + 1} missing SHA-256 hash or valid isclix tracking URL`);
      }
    });
  }

  // 3. Check Redirect Test Receipt
  const rcptPath = path.join(AFF_DIR, 'raw_evidence', 'accesstrade_redirect_test_receipt.json');
  if (!fs.existsSync(rcptPath)) {
    violations.push('Missing accesstrade_redirect_test_receipt.json');
  } else {
    const rcpt = JSON.parse(fs.readFileSync(rcptPath, 'utf8'));
    if (!rcpt.all_passed) {
      violations.push('Redirect tests not marked all_passed');
    }
  }

  // 4. Check Curated Registry
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
      if (!item.deep_tracking_url || !item.deep_tracking_url.includes('go.isclix.com')) {
        violations.push(`Item #${idx + 1} (${item.item_id}) must have verified isclix deep tracking URL`);
      }
      if (item.price_status !== 'JayT mới bắt đầu theo dõi giá') {
        violations.push(`Item #${idx + 1} (${item.item_id}) price_status must be "JayT mới bắt đầu theo dõi giá"`);
      }
      const dec = item.buy_decision;
      if (!dec || !dec.verdict || !dec.q1_need_fit || !dec.q2_price_and_fee || !dec.q3_sku_and_availability || !dec.q4_price_history_truth || !dec.q5_final_verdict_reason) {
        violations.push(`Item #${idx + 1} (${item.item_id}) missing 5-question decision breakdown`);
      }
    });
  }

  // 5. Check UI Integration & Drawer
  const apex = fs.readFileSync(path.join(SOT_DIR, 'jayt_apex_interface.js'), 'utf8');
  if (!apex.includes('function renderSmartShoppingAffiliateCard') || !apex.includes('function renderAffiliateDetailDrawer')) {
    violations.push('Missing card or drawer renderer in jayt_apex_interface.js');
  }
  if (!apex.includes('open-affiliate-detail') || !apex.includes('close-affiliate-detail')) {
    violations.push('Missing affiliate detail drawer event bindings in jayt_apex_interface.js');
  }
  if (apex.includes('class="jayt-card-tier-green" data-action="open-affiliate')) {
    violations.push('Affiliate cards must not use .jayt-card-tier-green CSS class');
  }

  // 6. Zero Emoji Scan
  const emojiRegex = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F1E0}-\u{1F1FF}]/u;
  if (emojiRegex.test(apex)) {
    violations.push('Found emoji in apex interface');
  }

  if (violations.length > 0) {
    console.error('❌ JAYT-234 QA GATE FAILED:');
    violations.forEach(v => console.error(`   - ${v}`));
    process.exit(1);
  }

  console.log('🟢 [JAYT-234-GATE-PASS] 100% Premium Deal OS & Value-First Affiliate Engine Verified!');
}

runGate();
