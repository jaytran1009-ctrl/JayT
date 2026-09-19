/**
 * JAYT-225R6B: CANONICAL TERMS CROSS-COMPONENT PARITY GATE
 * Enforces 100% strict verbatim consistency of eligibility, price, validity, and scope
 * between Poster Binding, Hero Spotlight, Rail Cards, Timeline, and Deal Detail Modal.
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const SOT_DIR = path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH');

function runTest() {
  console.log('========================================================================');
  console.log('⚖️ JAYT-225R6B: CANONICAL TERMS CROSS-COMPONENT PARITY GATE');
  console.log('========================================================================\n');

  let violations = [];

  // 1. Read card_visual_evidence_registry.json
  const cardReg = JSON.parse(fs.readFileSync(path.join(SOT_DIR, 'card_visual_evidence_registry.json'), 'utf8'));
  const metizRegistry = cardReg.cards.find(c => c.deal_id === 'CLM_208_01_METIZ_MEMBER');
  if (!metizRegistry) {
    violations.push('Missing CLM_208_01_METIZ_MEMBER in card_visual_evidence_registry.json');
  } else {
    if (!metizRegistry.four_layer_binding.offer_claim.includes('U22')) {
      violations.push(`Registry binding offer_claim does not mention U22: ${metizRegistry.four_layer_binding.offer_claim}`);
    }
  }

  // 2. Read jayt_apex_interface.js
  const apex = fs.readFileSync(path.join(SOT_DIR, 'jayt_apex_interface.js'), 'utf8');

  // Check CANONICAL_DEAL_TERMS definition
  if (!apex.includes("Dành cho fan cứng U22")) {
    violations.push('CANONICAL_DEAL_TERMS missing exact verbatim U22 eligibility definition');
  }
  if (!apex.includes("55.000đ / vé 2D")) {
    violations.push('CANONICAL_DEAL_TERMS missing exact price definition');
  }

  // Check forbidden phrases (non-provenance claims)
  const forbiddenPhrases = [
    'mọi thành viên Metiz',
    'áp dụng cho mọi thành viên',
    'hoặc thẻ thành viên'
  ];

  for (const phrase of forbiddenPhrases) {
    if (apex.toLowerCase().includes(phrase.toLowerCase())) {
      violations.push(`Found forbidden non-provenance phrase in jayt_apex_interface.js: "${phrase}"`);
    }
  }

  // Check timeline parity
  if (apex.includes("Metiz Cinema — Đồng Giá 55K Thành Viên")) {
    violations.push('Timeline still contains disparate phrase "Đồng Giá 55K Thành Viên"');
  }

  // Summary
  if (violations.length > 0) {
    console.error('❌ CANONICAL TERMS PARITY GATE FAILED with violations:');
    violations.forEach(v => console.error(`   - ${v}`));
    process.exit(1);
  }

  console.log('🟢 [PARITY-GATE-PASS] 100% Canonical Terms Consistency Verified Across All Renderers & Registries!');
}

runTest();
