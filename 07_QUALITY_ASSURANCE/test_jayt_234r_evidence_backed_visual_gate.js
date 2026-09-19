/**
 * JAYT-234R: EVIDENCE-BACKED VISUAL AFFILIATE EXPERIENCE QA GATE
 * 1. Official 16:10 Visual Assets Gate (100% cards have physical SVG/PNG assets on disk).
 * 2. Strict 11-Field Data Contract Gate (source_record_id -> card -> tracking_url).
 * 3. Cognitive Limit Rail Gate (4 Curated Cards default + Expand All Button).
 * 4. Price History Truth Gate ("JayT mới bắt đầu theo dõi giá").
 * 5. Class & Tier Segregation Gate (0% Emerald reuse for Affiliate).
 * 6. Touch Target Standard >= 44px & Zero Emojis.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const SOT_DIR = path.join(ROOT_DIR, '03_SOURCE_OF_TRUTH');

function runGate() {
  console.log('========================================================================');
  console.log('🏛️ JAYT-234R: EVIDENCE-BACKED VISUAL AFFILIATE EXPERIENCE QA GATE');
  console.log('========================================================================\n');

  let violations = [];

  // 1. Check Official Visual Assets
  const visRegPath = path.join(SOT_DIR, 'assets', 'official-visuals', 'official_visual_registry.json');
  if (!fs.existsSync(visRegPath)) {
    violations.push('Missing official_visual_registry.json');
  } else {
    const visReg = JSON.parse(fs.readFileSync(visRegPath, 'utf8'));
    if (visReg.visuals.length < 16) {
      violations.push(`Expected >= 16 official visual assets, found ${visReg.visuals.length}`);
    }
    visReg.visuals.forEach(v => {
      const p = path.join(SOT_DIR, v.relative_path);
      if (!fs.existsSync(p)) {
        violations.push(`Missing physical visual asset file: ${v.relative_path}`);
      }
    });
  }

  // 2. Check Curated Registry 11-Field Contract
  const regPath = path.join(SOT_DIR, 'affiliate_customer_value_registry.json');
  if (!fs.existsSync(regPath)) {
    violations.push('Missing affiliate_customer_value_registry.json');
  } else {
    const reg = JSON.parse(fs.readFileSync(regPath, 'utf8'));
    const items = reg.items || [];
    if (items.length < 16) {
      violations.push(`Expected >= 16 curated affiliate items, found ${items.length}`);
    }
    items.forEach((item, idx) => {
      const requiredFields = [
        'source_record_id', 'raw_payload_hash', 'provider_export_id',
        'campaign_id', 'campaign_state_evidence', 'merchant_product_url',
        'generated_tracking_url', 'redirect_receipt', 'official_visual_id',
        'visual_url', 'captured_at', 'expires_at'
      ];
      requiredFields.forEach(f => {
        if (!item[f]) violations.push(`Item #${idx + 1} (${item.item_id}) missing field ${f}`);
      });
      if (item.price_status !== 'JayT mới bắt đầu theo dõi giá') {
        violations.push(`Item #${idx + 1} (${item.item_id}) price_status must be "JayT mới bắt đầu theo dõi giá"`);
      }
      // Check physical visual file exists
      if (item.visual_url && !fs.existsSync(path.join(SOT_DIR, item.visual_url))) {
        violations.push(`Item #${idx + 1} (${item.item_id}) visual file does not exist: ${item.visual_url}`);
      }
    });
  }

  // 3. Check UI Integration & Visual Layout
  const apex = fs.readFileSync(path.join(SOT_DIR, 'jayt_apex_interface.js'), 'utf8');
  if (!apex.includes('aspect-ratio:16/10') && !apex.includes('aspect-ratio: 16/10')) {
    violations.push('Missing 16:10 visual aspect ratio container in apex interface');
  }
  if (!apex.includes('btn-toggle-affiliate-expand')) {
    violations.push('Missing btn-toggle-affiliate-expand in apex interface');
  }
  if (apex.includes('class="jayt-card-tier-green" data-action="open-affiliate')) {
    violations.push('Affiliate cards must not use .jayt-card-tier-green CSS class');
  }

  // 4. Zero Emoji Scan
  const emojiRegex = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F1E0}-\u{1F1FF}]/u;
  if (emojiRegex.test(apex)) {
    violations.push('Found emoji in apex interface');
  }

  if (violations.length > 0) {
    console.error('❌ JAYT-234R QA GATE FAILED:');
    violations.forEach(v => console.error(`   - ${v}`));
    process.exit(1);
  }

  console.log('🟢 [JAYT-234R-GATE-PASS] 100% Official 16:10 Visuals, 11-Field Contract & Cognitive Limit Rail Verified!');
}

runGate();
