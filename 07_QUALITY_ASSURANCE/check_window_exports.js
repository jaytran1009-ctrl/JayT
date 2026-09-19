const fs = require('fs');
const path = require('path');

const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
const js = fs.readFileSync(jsPath, 'utf8');

const idx = js.indexOf('window.switchHubSection');
console.log('window.switchHubSection idx:', idx);
if (idx !== -1) {
  console.log(js.substring(idx - 100, idx + 300));
}
