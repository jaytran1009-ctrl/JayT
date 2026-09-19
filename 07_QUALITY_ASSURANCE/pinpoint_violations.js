const fs = require('fs');
const path = require('path');

const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
const lines = fs.readFileSync(jsPath, 'utf8').split('\n');

console.log('--- PINPOINTING VIOLATIONS IN jayt_apex_interface.js ---');

lines.forEach((line, idx) => {
  const lineNum = idx + 1;
  if (line.includes('unsplash.com')) {
    console.log(`[Line ${lineNum}] Unsplash: ${line.trim().substring(0, 100)}`);
  }
  if (line.includes('tel:')) {
    console.log(`[Line ${lineNum}] tel: link: ${line.trim().substring(0, 100)}`);
  }
  if (/0905\d{6}|0935\d{6}/.test(line)) {
    console.log(`[Line ${lineNum}] Fake phone: ${line.trim().substring(0, 100)}`);
  }
  if (/Freeship (0đ|Xtra|0d)/i.test(line)) {
    console.log(`[Line ${lineNum}] Freeship claim: ${line.trim().substring(0, 100)}`);
  }
  if (/Trà đá \+ Canh thêm|Suất no lâu|Miễn phí trà sâm dứa/i.test(line)) {
    console.log(`[Line ${lineNum}] Synthetic perk: ${line.trim().substring(0, 100)}`);
  }
  if (/quat_kep_ktx|den_led_ktx|noi_lau_mini|cake_vpbank|bana_hills_aff/i.test(line)) {
    console.log(`[Line ${lineNum}] Synthetic affiliate: ${line.trim().substring(0, 100)}`);
  }
});
