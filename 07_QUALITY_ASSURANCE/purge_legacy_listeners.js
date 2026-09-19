const fs = require('fs');
const path = require('path');

const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
let js = fs.readFileSync(jsPath, 'utf8');

const oldListenersRegex = /\/\/ JAYT-135 Real-Time Arbitrage Engine Slider Listener[\s\S]*?document\.querySelectorAll\('\.apex-spring-interactive/;

const cleanReplacement = `document.querySelectorAll('.apex-spring-interactive`;

if (oldListenersRegex.test(js)) {
  js = js.replace(oldListenersRegex, cleanReplacement);
  console.log('✅ Purged legacy arbitrage & roulette listeners');
}

fs.writeFileSync(jsPath, js, 'utf8');
