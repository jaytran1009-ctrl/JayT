const fs = require('fs');
const path = require('path');

const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
let js = fs.readFileSync(jsPath, 'utf8');

const windowExports = `
  // --- ATTACH GLOBAL HANDLERS TO WINDOW FOR INLINE HTML ATTRIBUTES ---
  if (typeof window !== 'undefined') {
    window.switchHubSection = switchHubSection;
    window.renderCampusDeals = renderCampusDealsV9;
    window.renderCampusDealsV9 = renderCampusDealsV9;
    window.calculateDynamicStack = calculateDynamicStack;
    window.triggerMicroConfetti = triggerMicroConfetti;
    window.showToast = showToast;
    window.playHapticTick = playHapticTick;
    window.launchKineticRoulette = launchKineticRoulette;
    window.calculateSplitAndGeneratePass = calculateSplitAndGeneratePass;
    window.liveSearchVoucher = liveSearchVoucher;
    window.filterVoucherCategory = filterVoucherCategory;
  }
`;

if (!js.includes('window.switchHubSection = switchHubSection;')) {
  const anchor = '  // Public API';
  js = js.replace(anchor, windowExports + '\n' + anchor);
  fs.writeFileSync(jsPath, js, 'utf8');
  console.log('✅ Exported all UI interaction handlers to window object');
}
