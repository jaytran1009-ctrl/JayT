const fs = require('fs');
const path = require('path');

const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
let js = fs.readFileSync(jsPath, 'utf8');

// 1. Remove old event listeners in mount
js = js.replace(/const arbSlider = document\.getElementById\('arbitrage-price-slider'\);[\s\S]*?updateArbitrageEngine\(val\);\s*\}\s*\}/, '// Arbitrage slider: PURGED UNDER JAYT-134E');
js = js.replace(/document\.querySelectorAll\('\[data-action="quick-pick-price"\]'\)[\s\S]*?\}\);\s*\}\);/, '// Arbitrage quick-pick: PURGED UNDER JAYT-134E');
js = js.replace(/document\.querySelectorAll\('\[data-action="generate-boarding-pass"\]'\)[\s\S]*?\}\);\s*\}\);/, '// Boarding pass listener: PURGED UNDER JAYT-134E');
js = js.replace(/document\.querySelectorAll\('\[data-action="social-pass-zalo"\]'\)[\s\S]*?\}\);\s*\}\);/, '// Zalo pass listener: PURGED UNDER JAYT-134E');
js = js.replace(/document\.querySelectorAll\('\[data-action="select-canvas-day"\]'\)[\s\S]*?\}\);\s*\}\);/, '// Canvas day listener: PURGED UNDER JAYT-134E');
js = js.replace(/document\.querySelectorAll\('\[data-action="copy-voucher-code"\]'\)[\s\S]*?\}\);\s*\}\);/, '// Copy voucher listener: PURGED UNDER JAYT-134E');
js = js.replace(/document\.querySelectorAll\('\[data-action="scroll-to-arbitrage"\]'\)[\s\S]*?\}\);\s*\}\);/, '// Scroll to arbitrage: PURGED UNDER JAYT-134E');
js = js.replace(/document\.querySelectorAll\('\[data-action="scroll-to-cinema"\]'\)[\s\S]*?\}\);\s*\}\);/, '// Scroll to cinema: PURGED UNDER JAYT-134E');
js = js.replace(/document\.querySelectorAll\('\[data-action="open-vouchers-tab"\]'\)[\s\S]*?\}\);\s*\}\);/, '// Open vouchers tab: PURGED UNDER JAYT-134E');

// Add safe event listeners for user split bill calculator & district filters
const safeListeners = `
    // User Split Bill Calculator (Pure Local JS Math - Zero Commercial Presets)
    const userBillInput = document.getElementById('userBillInput');
    const userPeopleInput = document.getElementById('userPeopleCount');
    const userSplitDisplay = document.getElementById('userSplitResult');
    
    function updateUserSplit() {
      if (!userBillInput || !userPeopleInput || !userSplitDisplay) return;
      const bill = Math.max(0, parseInt(userBillInput.value, 10) || 0);
      const people = Math.max(1, parseInt(userPeopleInput.value, 10) || 1);
      const split = Math.round(bill / people);
      userSplitDisplay.innerText = split.toLocaleString('vi-VN') + '₫';
    }

    if (userBillInput) userBillInput.addEventListener('input', updateUserSplit);
    if (userPeopleInput) userPeopleInput.addEventListener('input', updateUserSplit);

    // District Filter on Verified Watchlist
    document.querySelectorAll('[data-action="filter-verified-district"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        playHapticTick();
        document.querySelectorAll('[data-action="filter-verified-district"]').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const district = e.currentTarget.getAttribute('data-district') || 'ALL';
        const grid = document.getElementById('verifiedLocationsGrid');
        if (!grid) return;
        const verifiedLocations = (state.fourLayerData && state.fourLayerData.layer_2_watchlist && state.fourLayerData.layer_2_watchlist.verified_locations) || [];
        const filtered = district === 'ALL' ? verifiedLocations : verifiedLocations.filter(loc => loc.district === district || (loc.locality && loc.locality.district === district));
        grid.innerHTML = filtered.filter(l => CanonicalRenderGate.validateLocation(l)).map(l => CanonicalRenderGate.renderLocationCard(l)).join('');
      });
    });

    document.querySelectorAll('[data-action="scroll-to-watchlist"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const el = document.getElementById('verifiedLocationsGrid');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      });
    });

    document.querySelectorAll('[data-action="scroll-to-calculator"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const el = document.getElementById('userBillInput');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      });
    });
`;

js = js.replace('// --- JAYT MASTER DIRECTIVE 2026: CORE ARBITRAGE & AFFILIATE LOGIC ---', safeListeners + '\n  // --- JAYT MASTER DIRECTIVE 2026: PURGED LEGACY ENGINES ---');

// 2. Remove handleArbitrageSliderChange, generateBoardingPassTicketCanvas, copyZaloGroupPlanPass
const oldEnginesRegex = /\/\/ --- JAYT MASTER DIRECTIVE 2026: PURGED LEGACY ENGINES ---[\s\S]*?window\.ApexApp = \{/;
const cleanEnginesReplacement = `// --- JAYT MASTER DIRECTIVE 2026: PURGED LEGACY ENGINES ---
  function initBiologicalTheme() {
    const hour = new Date().getHours();
    const isNight = hour < 6 || hour >= 17;
    const targetTheme = isNight ? "dark" : "light";
    state.theme = targetTheme;
    if (typeof document !== 'undefined' && document.body) {
      document.body.setAttribute("data-theme", targetTheme);
      document.documentElement.setAttribute("data-theme", targetTheme);
    }
  }

  window.CanonicalRenderGate = CanonicalRenderGate;
  window.ApexApp = {`;

if (oldEnginesRegex.test(js)) {
  js = js.replace(oldEnginesRegex, cleanEnginesReplacement);
  console.log('✅ Purged old arbitrage, boarding pass, and Zalo pass generator functions');
}

// Clean window.ApexApp properties
js = js.replace(/handleArbitrageSliderChange,\s*updateArbitrageEngine,\s*copyVoucherAndOpenApp,\s*generateBoardingPassTicketCanvas,\s*copyZaloGroupPlanPass,/g, 'CanonicalRenderGate,');

fs.writeFileSync(jsPath, js, 'utf8');
console.log('✨ Cleaned all arbitrage and pass engines from JS!');
