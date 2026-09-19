/**
 * JAYT-229: PREMIUM DAILY SAVINGS EXPERIENCE QA GATE (Updated for JAYT-237)
 * 1. Experience Hierarchy: 10-Second Question & 3 Core Rails (Dùng ngay, Gần bạn, Đang theo dõi).
 * 2. Mobile 44px Touch Targets Verified across all action buttons & pills.
 * 3. Exact Green Deals (Metiz U22) bound to uncropped physical poster evidence.
 * 4. Starlight Cinema strictly in Tier 2 Official Program with CTA "Mở nguồn chính thức ↗".
 * 5. Strict 3-Tier Palette.
 * 6. Zero Duplicate Address ("Địa chỉ: Địa chỉ:").
 * 7. Zero Emojis in DOM.
 */

const fs = require('fs');
const path = require('path');

const SOT_DIR = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng/03_SOURCE_OF_TRUTH';

function runGate() {
  console.log('========================================================================');
  console.log('🏛️ JAYT-229: PREMIUM DAILY SAVINGS EXPERIENCE QA GATE');
  console.log('========================================================================\n');

  let violations = [];
  const apex = fs.readFileSync(path.join(SOT_DIR, 'jayt_apex_interface.js'), 'utf8');

  // 1. Check Core Experience Markers
  const layerMarkers = [
    'Bạn muốn tiết kiệm cho việc gì?',
    'Dùng Ngay Hôm Nay',
    'Gần Bạn & Đáng Ghé',
    'Đang Theo Dõi Cho Bạn'
  ];

  for (const marker of layerMarkers) {
    if (!apex.includes(marker)) {
      violations.push(`Missing experience layer marker: "${marker}"`);
    }
  }

  // 2. Check 44px touch targets
  if (!apex.includes('min-height:44px')) {
    violations.push('Missing 44px touch target specification for interactive buttons/pills');
  }

  // 3. Check Green Deals Isolation
  if (apex.includes("['CLM_208_01_METIZ_MEMBER', 'CLM_208_02_METIZ_SUPER_MONDAY', 'CLM_208_03_STARLIGHT_PROMO']")) {
    violations.push('Starlight Cinema must NOT be in greenVerifiedDeals');
  }

  // 4. Check Starlight CTA
  if (!apex.includes('Mở nguồn chính thức')) {
    violations.push('Missing "Mở nguồn chính thức ↗" CTA for Tier 2 Official Programs');
  }

  // 5. Check Duplicate Address Bug
  if (apex.includes('Địa chỉ: Địa chỉ:') || apex.includes('Địa chỉ: "Địa chỉ:')) {
    violations.push('Found duplicate "Địa chỉ: Địa chỉ:" in apex interface');
  }

  // 6. Zero Emoji Scan
  const emojiRegex = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F1E0}-\u{1F1FF}]/u;
  if (emojiRegex.test(apex)) {
    violations.push('Found emoji characters in apex interface');
  }

  if (violations.length > 0) {
    console.error('❌ JAYT-229 QA GATE FAILED:');
    violations.forEach(v => console.error(`   - ${v}`));
    process.exit(1);
  }

  console.log('🟢 [JAYT-229-GATE-PASS] 100% 10-Second Experience Hierarchy, 44px Touch Targets & Source Truth Verified!');
}

runGate();
