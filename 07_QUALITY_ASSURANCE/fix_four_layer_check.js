const fs = require('fs');
const path = require('path');

const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
let js = fs.readFileSync(jsPath, 'utf8');

js = js.replace(
  'if (dataset && (dataset.layer_1_pending_candidates || dataset.layer_1_verified_offers))',
  'if (dataset && (dataset.layer_2_watchlist || dataset.layer_1_pending_candidates || dataset.layer_1_verified_offers))'
);

fs.writeFileSync(jsPath, js, 'utf8');
console.log('✅ Updated loadFourLayerDataset validation');
