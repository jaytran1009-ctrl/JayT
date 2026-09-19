const fs = require('fs');
const path = require('path');

const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
const htmlPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/index.html');

const js = fs.readFileSync(jsPath, 'utf8');
const html = fs.readFileSync(htmlPath, 'utf8');

const jsLines = js.split('\n');
const htmlLines = html.split('\n');

console.log('=== AUDITING JAYT_APEX_INTERFACE.JS FOR SUPER-APP RENDERERS & HARDCODED CLAIMS ===');

const patterns = [
  { name: 'ShopeeFood / Grab / Be delivery arbitrage', regex: /ShopeeFood|GrabFood|Befood|rẻ hơn|Freeship 18K|so sánh giá/i },
  { name: 'Cinema 7-day schedule / pricing', regex: /Culture Day|Happy Day|Vé U22|Vé SV|renderCinemaSchedule|cinemaSchedule/i },
  { name: 'Voucher / Countdown / Deals', regex: /countdown|voucher-ticket|Voucher|Mã Giảm|giảm 30%|giảm 50%/i },
  { name: 'Jollibee / Lotte / Food brands with promos', regex: /Jollibee Ngày Hội Viên|Lotte|Combo Sinh Viên/i },
  { name: 'Roulette / Hangout pass with addresses / prices', regex: /launchKineticRoulette|exportGroupHangoutPass|syncRouletteToSplitEngine/i },
  { name: 'Google Maps / ShopeeFood external deep links', regex: /google\.com\/maps|shopeefood\.vn|food\.grab\.com/i },
  { name: 'Distance / Peak hours / Amenities', regex: /\b\d+(\.\d+)?km\b|\b\d+:\d+\s*-\s*\d+:\d+\b|giờ cao điểm|đông khách/i }
];

patterns.forEach(p => {
  console.log(`\n--- Pattern: ${p.name} ---`);
  let matchCount = 0;
  jsLines.forEach((line, idx) => {
    if (p.regex.test(line)) {
      matchCount++;
      if (matchCount <= 5) {
        console.log(`  [JS L${idx + 1}]: ${line.trim().substring(0, 120)}`);
      }
    }
  });
  console.log(`  Total matches in JS: ${matchCount}`);
});

console.log('\n=== AUDITING INDEX.HTML FOR HARDCODED SUPER-APP SECTIONS ===');
patterns.forEach(p => {
  let matchCount = 0;
  htmlLines.forEach((line, idx) => {
    if (p.regex.test(line)) {
      matchCount++;
      if (matchCount <= 5) {
        console.log(`  [HTML L${idx + 1}]: ${line.trim().substring(0, 120)}`);
      }
    }
  });
  if (matchCount > 0) {
    console.log(`  Total matches in HTML for ${p.name}: ${matchCount}`);
  }
});
