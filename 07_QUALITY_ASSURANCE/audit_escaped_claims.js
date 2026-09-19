const fs = require('fs');
const path = require('path');

const sotDir = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH');
const files = fs.readdirSync(sotDir);

console.log('========================================================================');
console.log('🔍 FULL-SURFACE AUDIT FOR ESCAPED CLAIMS ACROSS 03_SOURCE_OF_TRUTH');
console.log('========================================================================\n');

const escapedPatterns = [
  { name: 'KTX price claims (e.g. 45.000₫, 39.000₫, 29.000₫)', regex: /\b(29|35|39|45|55)\.000₫/g },
  { name: 'ĐÁY 90N / Săn Đáy / Đáy Giá', regex: /ĐÁY 90N|Săn Đáy|Đáy Giá/gi },
  { name: 'Affiliate & Partner claims (#JayTAffiliate, Klook Partner, Accesstrade CPA)', regex: /#JayTAffiliate|Accesstrade CPA|Klook Official Partner|KLOOK_AFFILIATE_ID|dispatchSmartAffiliate/gi },
  { name: 'Edu Perk price/discount claims (29.500₫, 49.000₫, 0đ/tháng, Tiết kiệm)', regex: /29\.500₫|49\.000₫|\b0đ\/tháng\b|Tiết kiệm \d+%/gi },
  { name: 'Freeship / 0đ badges', regex: /Freeship|0đ|0d/gi },
  { name: 'Direct Purchase CTAs (Mua, Săn Ngay, Mở Thẻ)', regex: /data-action="route-affiliate"|onclick="dispatchSmartAffiliate"|Săn Đáy|Săn Ngay/gi }
];

for (const file of files) {
  const filePath = path.join(sotDir, file);
  if (fs.statSync(filePath).isFile()) {
    const content = fs.readFileSync(filePath, 'utf8');
    console.log(`\nScanning: ${file} (${content.length} chars)`);
    for (const p of escapedPatterns) {
      const matches = content.match(p.regex);
      if (matches) {
        console.log(`  ❌ FOUND [${p.name}]: ${matches.length} occurrences (Sample: ${matches.slice(0, 3).join(', ')})`);
      }
    }
  }
}
