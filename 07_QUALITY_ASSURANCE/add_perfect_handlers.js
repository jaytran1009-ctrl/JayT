const fs = require('fs');
const path = require('path');

const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
let js = fs.readFileSync(jsPath, 'utf8');

const handlersCode = `
  // --- JAYT HUB & UI GLOBAL CONTROLLERS v9.0.0 ---
  function switchHubSection(tabId, btn) {
    playHapticTick();
    document.querySelectorAll('.hub-btn-tab, .hub-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.hub-panel, .hub-tab-content').forEach(p => p.classList.remove('active'));

    if (btn) btn.classList.add('active');

    const tabMap = {
      'FOOD_25K': ['hub-tab-food', 'tab-cuu-doi'],
      'CUU_DOI': ['hub-tab-food', 'tab-cuu-doi'],
      'EDU_FREE': ['hub-tab-edu', 'tab-edu-perks'],
      'EDU_PERKS': ['hub-tab-edu', 'tab-edu-perks'],
      'KTX_STACK': ['hub-tab-ktx', 'tab-ktx-stack']
    };

    const targetIds = tabMap[tabId] || ['hub-tab-food'];
    targetIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.add('active');
    });
  }
  const switchStudentTab = switchHubSection;

  if (typeof window !== 'undefined') {
    window.switchHubSection = switchHubSection;
    window.switchStudentTab = switchHubSection;
    window.renderCampusDeals = renderCampusDealsV9;
    window.renderCampusDealsV9 = renderCampusDealsV9;
    window.filterCampus = renderCampusDealsV9;
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

// Insert right before `function mount()`
if (!js.includes('window.switchHubSection = switchHubSection;')) {
  const mountAnchor = '  function mount() {';
  js = js.replace(mountAnchor, handlersCode + '\n' + mountAnchor);
  fs.writeFileSync(jsPath, js, 'utf8');
  console.log('✅ Injected perfect global handlers and window exports right before mount()');
}
