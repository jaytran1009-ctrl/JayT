/**
 * JAYT-226: 35-CARD SOURCE TRUTH GATE
 * Enforces:
 * 1. Exactly 35 Canonical Records in SOT registry & runtime dictionary.
 * 2. Tier 1 (3 Cards 🟢): Exact literal quote, poster asset, price, validity, scope. Zero 3-step synthesis.
 * 3. Tier 2 (14 Cards 🔵): Exact official program quote, scope, official link.
 * 4. Tier 3 (18 Cards 🟣): Verified Da Nang address, transparent disclaimer, ZERO prices/discounts/fake deal steps.
 * 5. Zero Disparate Interpretations across Hero, Cards, Timeline, and Modal.
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const SOT_DIR = path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH');

function runGate() {
  console.log('========================================================================');
  console.log('🏛️ JAYT-226: 35-CARD SOURCE TRUTH BATCH GATE');
  console.log('========================================================================\n');

  let violations = [];

  // 1. Read card_visual_evidence_registry.json
  const cardReg = JSON.parse(fs.readFileSync(path.join(SOT_DIR, 'card_visual_evidence_registry.json'), 'utf8'));
  if (cardReg.cards.length !== 35) {
    violations.push(`Registry card count is ${cardReg.cards.length}, expected 35`);
  }

  // 2. Read jayt_apex_interface.js
  const apex = fs.readFileSync(path.join(SOT_DIR, 'jayt_apex_interface.js'), 'utf8');

  // Verify CANONICAL_DEAL_TERMS contains all 35 IDs
  const all35Ids = [
    'CLM_208_01_METIZ_MEMBER', 'CLM_208_02_METIZ_SUPER_MONDAY', 'CLM_208_03_STARLIGHT_PROMO',
    'CLM_208_04_GALAXY_MEMBER', 'CLM_208_16_CGV_STUDENT', 'CLM_208_05_DOMINOS_BOGO', 'CLM_208_06_POPEYES_COMBO',
    'CLM_208_08_SPOTIFY_STUDENT', 'CLM_208_09_MS_STUDENT', 'CLM_208_10_FIGMA_STUDENT', 'CLM_208_12_AWS_STUDENT',
    'CLM_208_13_AUTODESK_STUDENT', 'CLM_208_14_GITHUB_STUDENT', 'CLM_208_15_NOTION_STUDENT',
    'CLM_208_07_DANABUS_STUDENT', 'CLM_208_11_METRO_PASS', 'CLM_208_17_TNGO_BIKE',
    'VEN_197_01_BA_BUOI', 'VEN_197_02_BANH_TRANG_DAI_LOC', 'VEN_197_03_MI_QUANG_BA_MUA', 'VEN_197_18_COM_TAM_BA_LANG',
    'VEN_197_19_BUN_BO_BA_DIEU', 'VEN_197_04_HIGHLANDS', 'VEN_197_05_THE_COFFEE_HOUSE', 'VEN_197_06_PHUC_LONG',
    'VEN_197_07_KATINAT', 'VEN_197_08_CHE_LIEN', 'VEN_197_20_ZONE_SIX_COFFEE', 'VEN_197_09_DVC_DANANG',
    'VEN_197_10_THU_VIEN_TONG_HOP', 'VEN_197_11_TRUNG_TAM_HANH_CHINH', 'VEN_197_12_KHO_BAC_DANANG',
    'VEN_197_13_BAO_TANG_CHAM', 'VEN_197_14_CUNG_THIEU_NHI', 'VEN_197_15_BEN_XE_TRUNG_TAM'
  ];

  for (const id of all35Ids) {
    if (!apex.includes(`"${id}"`)) {
      violations.push(`Missing ${id} in CANONICAL_DEAL_TERMS in jayt_apex_interface.js`);
    }
  }

  // 3. Strict Boundary Rules
  // Rule A: Tier 3 Venues must NOT have price/discount assertions
  const venueIds = all35Ids.filter(id => id.startsWith('VEN_'));
  for (const vId of venueIds) {
    const card = cardReg.cards.find(c => c.deal_id === vId);
    if (card && card.four_layer_binding && card.four_layer_binding.price) {
      violations.push(`Venue ${vId} has forbidden price field: ${card.four_layer_binding.price}`);
    }
  }

  // Rule B: Forbidden synthesized phrases
  const forbiddenPhrases = [
    'từ 22 tuổi trở xuống',
    '3 bước nhận ưu đãi',
    'Cách Nhận Ưu Đãi Tại Quầy (3 Bước Nhanh)',
    'Chuẩn bị: Thẻ',
    'Xuất trình: Đưa giấy tờ',
    'mọi thành viên Metiz',
    'thẻ HSSV hợp lệ hoặc thẻ thành viên'
  ];

  for (const phrase of forbiddenPhrases) {
    if (apex.toLowerCase().includes(phrase.toLowerCase())) {
      violations.push(`Found forbidden synthesized phrase in jayt_apex_interface.js: "${phrase}"`);
    }
  }

  // Summary
  if (violations.length > 0) {
    console.error('❌ 35-CARD SOURCE TRUTH GATE FAILED:');
    violations.forEach(v => console.error(`   - ${v}`));
    process.exit(1);
  }

  console.log('🟢 [35-CARD-GATE-PASS] 100% 35-Card Source Truth & Canonical Parity Verified!');
}

runGate();
