const fs = require('fs');
const path = require('path');

const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
const js = fs.readFileSync(jsPath, 'utf8');

const lines = js.split('\n');
lines.forEach((l, i) => {
  if (l.includes('renderFiveTierDailyDealCanvas')) {
    console.log(`Line ${i + 1}: ${l}`);
  }
});
