const fs = require('fs');
const path = require('path');

const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
const htmlPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/index.html');

let js = fs.readFileSync(jsPath, 'utf8');
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. In index.html: clean all arbitrage references
html = html.replace(/\/\* 1\. THẺ TRỌNG TÀI GIỎ HÀNG WINNER CARD \*\//g, '/* 1. THẺ ĐỐI SOÁT ĐỊA ĐIỂM */');
html = html.replace(/arbitrage-winner-card/g, 'verified-truth-card');
html = html.replace(/TRỌNG TÀI GIỎ HÀNG/g, 'ĐỐI SOÁT CHỨNG TỪ');

// 2. In jayt_apex_interface.js: ensure ensureFourLayerDatasetLoaded() is called in renderCanonicalTruthCenter
const oldTruthCenterHeader = `function renderCanonicalTruthCenter() {
    const verifiedLocations = (state.fourLayerData && state.fourLayerData.layer_2_watchlist && state.fourLayerData.layer_2_watchlist.verified_locations) || [];`;

const newTruthCenterHeader = `function renderCanonicalTruthCenter() {
    ensureFourLayerDatasetLoaded();
    const verifiedLocations = (state.fourLayerData && state.fourLayerData.layer_2_watchlist && state.fourLayerData.layer_2_watchlist.verified_locations) || [];`;

js = js.replace(oldTruthCenterHeader, newTruthCenterHeader);

// Ensure ensureFourLayerDatasetLoaded helper exists
if (!js.includes('function ensureFourLayerDatasetLoaded()')) {
  js = js.replace('function fetchFourLayerDataset() {', `function ensureFourLayerDatasetLoaded() {
    if (!hasInitiatedFourLayerFetch) {
      hasInitiatedFourLayerFetch = true;
      fetchFourLayerDataset();
    }
  }

  function fetchFourLayerDataset() {`);
}

// Clean any handleArbitrageSliderChange in window.ApexApp
js = js.replace(/handleArbitrageSliderChange,\s*/g, '');

fs.writeFileSync(jsPath, js, 'utf8');
fs.writeFileSync(htmlPath, html, 'utf8');

console.log('✨ Finalized truth cleanups in JS and HTML!');
