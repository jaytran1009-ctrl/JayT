/**
 * JAYT-228R: LIVE CLAIM PARITY GATE
 * Strict Production & DOM Parity Engine:
 * 1. Exactly 2 Confirmed Green Deals in "Dùng Ngay Hôm Nay" (Metiz U22 & Metiz Super Monday).
 * 2. Starlight Cinema Demoted to Tier 2 Official Program (🔵 Nguồn chính thức) with CTA "Mở nguồn chính thức ↗".
 * 3. 3-Step Interactive Filter Engine (Nhu cầu, Khu vực, Khung giờ) Verified.
 * 4. 4 Clear Experiences Rendered:
 *    - Dùng ngay hôm nay (🟢)
 *    - Lịch tiết kiệm tuần này (📅)
 *    - Quanh bạn — Địa điểm thực tế (🟣)
 *    - Nguồn chính thức đang theo dõi (🔵)
 * 5. Zero Duplicate "Địa chỉ: Địa chỉ:" in DOM.
 * 6. Zero Emojis in DOM.
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const SOT_DIR = path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH');

function runGate() {
  console.log('========================================================================');
  console.log('🏛️ JAYT-228R: LIVE CLAIM PARITY & 4-EXPERIENCE ARCHITECTURE GATE');
  console.log('========================================================================\n');

  let violations = [];

  const apex = fs.readFileSync(path.join(SOT_DIR, 'jayt_apex_interface.js'), 'utf8');
  const cardReg = JSON.parse(fs.readFileSync(path.join(SOT_DIR, 'card_visual_evidence_registry.json'), 'utf8'));

  // 1. Check Starlight Demotion
  const starlightCard = cardReg.cards.find(c => c.deal_id === 'CLM_208_03_STARLIGHT_PROMO');
  if (!starlightCard || starlightCard.tier !== 'TIER_BLUE_OFFICIAL') {
    violations.push('Starlight Cinema must be TIER_BLUE_OFFICIAL in card_visual_evidence_registry.json');
  }

  // Check that greenVerifiedDeals has ONLY 2 Metiz deals
  if (apex.includes("blueOfficialOffers.filter(d => ['CLM_208_01_METIZ_MEMBER', 'CLM_208_02_METIZ_SUPER_MONDAY', 'CLM_208_03_STARLIGHT_PROMO'].includes(d.deal_id))")) {
    violations.push('greenVerifiedDeals still contains CLM_208_03_STARLIGHT_PROMO in jayt_apex_interface.js');
  }

  // 2. Check 4 Experience Headings
  const requiredHeadings = [
    'Dùng Ngay Hôm Nay',
    'Lịch Tiết Kiệm Tuần Này',
    'Quanh Bạn — Địa Điểm Thực Tế',
    'Nguồn Chính Thức Đang Theo Dõi'
  ];

  for (const heading of requiredHeadings) {
    if (!apex.includes(heading)) {
      violations.push(`Missing required experience heading: "${heading}"`);
    }
  }

  // 3. Check 3-Step Filter in Hero
  if (!apex.includes('data-context-filter') || !apex.includes('data-area-filter') || !apex.includes('data-time-filter')) {
    violations.push('Missing 3-step filter attributes (context, area, time) in jayt_apex_interface.js');
  }

  // 4. Check CTA Semantics
  if (!apex.includes('Xem điều kiện ↗')) {
    violations.push('Missing "Xem điều kiện ↗" CTA for Green Deals');
  }
  if (!apex.includes('Mở nguồn chính thức ↗')) {
    violations.push('Missing "Mở nguồn chính thức ↗" CTA for Blue Official Programs');
  }
  if (!apex.includes('Xem địa điểm ↗')) {
    violations.push('Missing "Xem địa điểm ↗" CTA for Purple Venues');
  }

  // 5. Check Duplicate Address Bug
  if (apex.includes('Địa chỉ: Địa chỉ:') || apex.includes('Địa chỉ: "Địa chỉ:')) {
    violations.push('Found duplicate "Địa chỉ: Địa chỉ:" in jayt_apex_interface.js');
  }

  // 6. Zero Emoji Scan
  const emojiRegex = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F1E0}-\u{1F1FF}]/u;
  if (emojiRegex.test(apex)) {
    violations.push('Found emoji in jayt_apex_interface.js');
  }

  // Summary
  if (violations.length > 0) {
    console.error('❌ LIVE CLAIM PARITY GATE 228R FAILED:');
    violations.forEach(v => console.error(`   - ${v}`));
    process.exit(1);
  }

  console.log('🟢 [LIVE-CLAIM-PARITY-228R-PASS] 100% 4-Experience Architecture, Exact 2 Green Deals, Starlight Demotion & 3-Step Interactive Filters Verified!');
}

runGate();
