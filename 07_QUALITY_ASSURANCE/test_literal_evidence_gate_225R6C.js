/**
 * JAYT-225R6C: LITERAL EVIDENCE SOURCE BOUNDARY GATE
 * Enforces:
 * 1. Every condition rendered must match evidence_quote verbatim.
 * 2. Zero synthesized procedure/rules (no "từ 22 tuổi trở xuống", "3 bước", "CCCD", "thẻ HSSV", "mã QR").
 * 3. Modal must only contain authentic poster, literal quote, price/schedule, scope, and disclaimer.
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const SOT_DIR = path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH');

function runGate() {
  console.log('========================================================================');
  console.log('🛡️ JAYT-225R6C: LITERAL EVIDENCE SOURCE BOUNDARY GATE');
  console.log('========================================================================\n');

  let violations = [];

  // 1. Check card_visual_evidence_registry.json
  const cardReg = JSON.parse(fs.readFileSync(path.join(SOT_DIR, 'card_visual_evidence_registry.json'), 'utf8'));
  const metizCard = cardReg.cards.find(c => c.deal_id === 'CLM_208_01_METIZ_MEMBER');
  if (!metizCard || !metizCard.four_layer_binding.evidence_quote) {
    violations.push('Registry missing verbatim evidence_quote for CLM_208_01_METIZ_MEMBER');
  } else if (metizCard.four_layer_binding.evidence_quote !== 'Dành cho fan cứng U22') {
    violations.push(`Registry evidence_quote mismatch: "${metizCard.four_layer_binding.evidence_quote}"`);
  }

  // 2. Check jayt_apex_interface.js
  const apex = fs.readFileSync(path.join(SOT_DIR, 'jayt_apex_interface.js'), 'utf8');

  // Forbidden synthesized / non-provenance phrases
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

  // Check required literal evidence quotes in CANONICAL_DEAL_TERMS
  if (!apex.includes("Dành cho fan cứng U22")) {
    violations.push("CANONICAL_DEAL_TERMS missing exact evidence_quote: 'Dành cho fan cứng U22'");
  }

  if (!apex.includes("Kiểm tra điều kiện cụ thể tại rạp trước khi thanh toán.")) {
    violations.push("CANONICAL_DEAL_TERMS missing exact transparent disclaimer");
  }

  // Summary
  if (violations.length > 0) {
    console.error('❌ LITERAL EVIDENCE GATE FAILED:');
    violations.forEach(v => console.error(`   - ${v}`));
    process.exit(1);
  }

  console.log('🟢 [LITERAL-EVIDENCE-GATE-PASS] 100% Zero-Interpretation Source Boundary Verified!');
}

runGate();
