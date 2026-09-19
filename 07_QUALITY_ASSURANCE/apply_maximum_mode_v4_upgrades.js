const fs = require('fs');
const path = require('path');

const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
let code = fs.readFileSync(jsPath, 'utf8');

// 1. Add calls in mount()
const mountTarget = 'injectStyles();';
const mountReplacement = 'injectStyles();\n    applySunSyncAmbient();\n    startFlashCountdownTimer();';

if (code.includes(mountTarget) && !code.includes('applySunSyncAmbient();')) {
  code = code.replace(mountTarget, mountReplacement);
  console.log('✅ Added applySunSyncAmbient and startFlashCountdownTimer to mount()');
}

// 2. Add event listeners
const oldBlock = `    // JAYT-135 Real-Time Arbitrage Engine Slider Listener
    const arbSlider = document.getElementById('arbitrage-price-slider');
    if (arbSlider) {
      arbSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10) || 45000;
        state.arbitrageBasePrice = val;
        updateArbitrageEngine(val);
      });
    }`;

const newBlock = `    // JAYT-135 Real-Time Arbitrage Engine Slider Listener
    const arbSlider = document.getElementById('arbitrage-price-slider');
    if (arbSlider) {
      arbSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10) || 45000;
        state.arbitrageBasePrice = val;
        updateArbitrageEngine(val);
      });
    }

    // MAXIMUM 1: Ma Trận Quick-Pick Chips 1-Chạm Handler
    document.querySelectorAll('[data-action="quick-pick-price"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const amount = parseInt(e.currentTarget.getAttribute('data-amount'), 10) || 45000;
        selectArbitragePreset(amount, e.currentTarget);
      });
    });

    // MAXIMUM 2: Vòng Quay Cứu Đói 1-Chạm (Decision Roulette) Handler
    document.querySelectorAll('[data-action="spin-hunger-roulette"]').forEach(btn => {
      btn.addEventListener('click', () => {
        spinHungerRoulette();
      });
    });`;

if (code.includes(oldBlock)) {
  code = code.replace(oldBlock, newBlock);
  console.log('✅ Added quick-pick and hunger roulette event listeners to JS');
}

fs.writeFileSync(jsPath, code, 'utf8');
console.log('✨ All Maximum Mode v4.0.0 JS code applied successfully!');
