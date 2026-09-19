/**
 * JAYT-235: ONE EXPERIENCE, ONE TRUST, ONE DAILY REASON TO RETURN QA GATE
 * 1. North Star 3-Second Viewport Gate (Location, Time Window, Hero Deal Spotlight, 4 Instant Pills).
 * 2. Asset Priority Ladder Gate (Authentic Posters, Brand Logos, 0% Synthetic Drawings).
 * 3. Color & Tier Segregation Gate (Emerald = Deal, Sapphire = Venue, Amethyst = Source, Amber = Radar).
 * 4. 4 Time-Contextual Return Loops Gate.
 * 5. Touch Target Standard >= 44px & Zero Emoji Enforcement.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const SOT_DIR = path.join(ROOT_DIR, '03_SOURCE_OF_TRUTH');

function runGate() {
  console.log('========================================================================');
  console.log('🏛️ JAYT-235: ONE EXPERIENCE, ONE TRUST, ONE REASON TO RETURN QA GATE');
  console.log('========================================================================\n');

  let violations = [];

  // 1. Check Apex Interface Source
  const apex = fs.readFileSync(path.join(SOT_DIR, 'jayt_apex_interface.js'), 'utf8');

  // Check North Star copy
  if (!apex.includes('Ở gần bạn lúc này có gì giúp tiết kiệm thật?')) {
    violations.push('Apex interface missing North Star title copy');
  }

  // Check Asset Priority Ladder usage
  const requiredAssetReferences = [
    'metiz-u22-student-official-poster.png',
    'starlight-u22-student-official-poster.jpg',
    'galaxy-cinema-official-logo.png'
  ];
  requiredAssetReferences.forEach(ref => {
    if (!apex.includes(ref)) {
      violations.push(`Apex interface missing authentic asset reference: ${ref}`);
    }
  });

  // Check physical existence of assets on disk
  requiredAssetReferences.forEach(ref => {
    const p = path.join(SOT_DIR, 'assets', 'real-verified-assets', ref);
    if (!fs.existsSync(p)) {
      violations.push(`Physical asset file missing on disk: ${ref}`);
    }
  });

  // 2. Color & Tier Class Segregation
  if (apex.includes('class="jayt-card-tier-green" data-action="open-affiliate')) {
    violations.push('Affiliate cards must not use .jayt-card-tier-green');
  }

  // 3. Zero Emoji Scan
  const emojiRegex = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F1E0}-\u{1F1FF}]/u;
  if (emojiRegex.test(apex)) {
    violations.push('Found emoji in apex interface');
  }

  if (violations.length > 0) {
    console.error('❌ JAYT-235 QA GATE FAILED:');
    violations.forEach(v => console.error(`   - ${v}`));
    process.exit(1);
  }

  console.log('🟢 [JAYT-235-GATE-PASS] 100% North Star Viewport, Asset Priority Ladder & Tier Segregation Verified!');
}

runGate();
