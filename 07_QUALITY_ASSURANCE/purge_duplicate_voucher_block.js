const fs = require('fs');
const path = require('path');

const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
let js = fs.readFileSync(jsPath, 'utf8');

// Replace the duplicate voucher block right before apex-floating-thumb-dock
const targetDupRegex = /<!-- Lưới Voucher Neon -->[\s\S]*?<\/section>\s*<\/div>\s*<!-- HAPTIC FLOATING THUMB-BAR/;
const replacement = `</div>\n\n      <!-- HAPTIC FLOATING THUMB-BAR`;

if (targetDupRegex.test(js)) {
  js = js.replace(targetDupRegex, replacement);
  console.log('✅ Purged duplicate voucher neon block');
}

// Clean any remaining TIKTOKVIP0D or JAYTSHOPEE50
js = js.replace(/TIKTOKVIP0D/g, 'CANONICAL_POLICY_01');
js = js.replace(/JAYTSHOPEE50/g, 'CANONICAL_POLICY_02');
js = js.replace(/JAYTBE30/g, 'CANONICAL_POLICY_03');

fs.writeFileSync(jsPath, js, 'utf8');
console.log('✨ Purged all duplicate voucher references!');
