const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..');
const htmlPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_088a', 'captures_088a', 'TARGET_088A_BR_107', 'page.html');
const html = fs.readFileSync(htmlPath, 'utf8');

const idx = html.indexOf('cgv-vincom-da-nang');
console.log('Index:', idx);
if (idx !== -1) {
  console.log(html.slice(Math.max(0, idx - 200), Math.min(html.length, idx + 400)));
}
