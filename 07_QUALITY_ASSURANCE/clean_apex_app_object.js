const fs = require('fs');
const path = require('path');

const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
let js = fs.readFileSync(jsPath, 'utf8');

const targetApexApp = `  window.CanonicalRenderGate = CanonicalRenderGate;
  window.ApexApp = {
    state,
    mount,
    loadRadarDataset,
    fetchRadarDataset,
    loadFourLayerDataset,
    fetchFourLayerDataset,
    sanitizeCommunitySignalText,
    calculate: calculatePaymentBreakdown,
    calculatePaymentBreakdown,
    getVoucherStatus,
    updateArbitrageEngine,
    copyVoucherAndOpenApp,
    initBiologicalTheme,
    generateBoardingPassTicketCanvas,
    copyZaloGroupPlanPass,
    navigateTo: function(navId) {
      state.activeNav = navId;
      window.location.hash = navId;
      mount();
    }
  };`;

const cleanApexApp = `  window.CanonicalRenderGate = CanonicalRenderGate;
  window.ApexApp = {
    state,
    mount,
    loadRadarDataset,
    fetchRadarDataset,
    loadFourLayerDataset,
    fetchFourLayerDataset,
    sanitizeCommunitySignalText,
    calculate: calculatePaymentBreakdown,
    calculatePaymentBreakdown,
    getVoucherStatus,
    initBiologicalTheme,
    navigateTo: function(navId) {
      state.activeNav = navId;
      window.location.hash = navId;
      mount();
    }
  };`;

if (js.includes(targetApexApp)) {
  js = js.replace(targetApexApp, cleanApexApp);
  console.log('✅ Cleaned window.ApexApp object');
} else {
  // Replace via regex
  const regex = /window\.ApexApp\s*=\s*\{[\s\S]*?navigateTo:/;
  const replacement = `window.ApexApp = {
    state,
    mount,
    loadRadarDataset,
    fetchRadarDataset,
    loadFourLayerDataset,
    fetchFourLayerDataset,
    sanitizeCommunitySignalText,
    calculate: calculatePaymentBreakdown,
    calculatePaymentBreakdown,
    getVoucherStatus,
    initBiologicalTheme,
    navigateTo:`;
  js = js.replace(regex, replacement);
  console.log('✅ Cleaned window.ApexApp object via regex');
}

fs.writeFileSync(jsPath, js, 'utf8');
