const fs = require('fs');
const path = require('path');

const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
const lines = fs.readFileSync(jsPath, 'utf8').split('\n');

console.log('--- PINPOINTING ALL ESCAPED CLAIMS IN JAYT_APEX_INTERFACE.JS ---');

lines.forEach((line, idx) => {
  const lineNum = idx + 1;
  if (/45\.000₫|39\.000₫|29\.000₫|ĐÁY 90N|Săn Đáy|#JayTAffiliate|Accesstrade CPA|Klook Official Partner|KLOOK_AFFILIATE_ID|dispatchSmartAffiliate|29\.500₫|49\.000₫/i.test(line)) {
    console.log(`[Line ${lineNum}] ${line.trim()}`);
  }
});
