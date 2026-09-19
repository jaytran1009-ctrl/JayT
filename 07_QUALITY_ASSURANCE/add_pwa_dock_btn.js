const fs = require('fs');
const path = require('path');

const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
let jsCode = fs.readFileSync(jsPath, 'utf8');

const dockTarget = '<div class="apex-floating-thumb-dock">';
const dockReplacement = '<div class="apex-floating-thumb-dock">\n        <button type="button" id="pwa-install-dock-btn" class="pwa-install-btn apex-spring-interactive">📲 Cài App</button>';

if (jsCode.includes(dockTarget) && !jsCode.includes('id="pwa-install-dock-btn"')) {
  jsCode = jsCode.replace(dockTarget, dockReplacement);
  fs.writeFileSync(jsPath, jsCode, 'utf8');
  console.log('✅ Added pwa-install-dock-btn to JS floating dock');
}
