const fs = require('fs');
const path = require('path');

const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
const js = fs.readFileSync(jsPath, 'utf8');

console.log('--- INSPECTING REALTIME ENGINES IN JS ---');
const tickerMatches = js.match(/setInterval[\s\S]*?\)/g);
console.log('Total setInterval calls in JS:', tickerMatches ? tickerMatches.length : 0);

const countdownIdx = js.indexOf('startFlashCountdownTimer');
if (countdownIdx !== -1) {
  console.log('startFlashCountdownTimer snippet:');
  console.log(js.substring(countdownIdx, countdownIdx + 400));
}
