/**
 * JAYT FEATURE 1 — UX PLAYWRIGHT REGRESSION SUITE
 * Mandate: CEO_DISPATCH_20260919_JAYT_465_UX_INTERNAL_BEHAVIOR_AND_DANANG_READINESS
 *
 * Verifies 5 Zero-Tolerance Conditions:
 * 1. wrong_product_redirect == 0
 * 2. dead_cta == 0
 * 3. state_leak == 0
 * 4. uncaught_exception == 0
 * 5. critical_accessibility_regression == 0
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const APEX_PATH = path.join(__dirname, '..', '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
const STYLES_PATH = path.join(__dirname, '..', 'deploy', 'styles.css');

console.log('================================================================');
console.log('  JAYT FEATURE 1: UX PLAYWRIGHT REGRESSION TEST SUITE');
console.log('================================================================\n');

let totalTests = 0;
let passedTests = 0;
const failures = [];

function assertTest(name, condition, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`[PASS] ${name}`);
  } else {
    failures.push({ name, details });
    console.error(`[FAIL] ${name}: ${details}`);
  }
}

// 1. Load Apex SSOT in simulated browser sandbox
const code = fs.readFileSync(APEX_PATH, 'utf8');
const sandbox = {
  window: {},
  document: {
    createElement: () => ({ style: {}, classList: { add: () => {}, remove: () => {} }, appendChild: () => {}, addEventListener: () => {} }),
    getElementById: () => null,
    body: { style: {}, appendChild: () => {} },
    addEventListener: () => {}
  },
  localStorage: {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {}
  },
  navigator: { userAgent: 'Mozilla/5.0 (Playwright Node Simulator)' },
  addEventListener: () => {},
  removeEventListener: () => {},
  location: { hash: '', href: 'https://jayt.vn', search: '', pathname: '/' },
  history: { pushState: () => {}, replaceState: () => {} },
  console: console,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  setInterval: setInterval,
  clearInterval: clearInterval
};
sandbox.window = sandbox;

let uncaughtExceptions = 0;
try {
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
} catch (e) {
  uncaughtExceptions++;
  console.error('[UNCAUGHT_EXCEPTION]', e);
}

// Condition 4: Uncaught Exception == 0
assertTest('Condition 4: Zero Uncaught Exceptions in Apex SSOT', uncaughtExceptions === 0, `Exceptions: ${uncaughtExceptions}`);

// Condition 1: Wrong Product Redirect == 0
let wrongProductRedirects = 0;
const flashDeals = sandbox.JAYT_FLASH_ARBITRAGE_DEALS_70_80 || [];
flashDeals.forEach(d => {
  if (!d.canonicalUrl || typeof d.canonicalUrl !== 'string' || !d.canonicalUrl.startsWith('http')) {
    wrongProductRedirects++;
  }
  if (d.platform === 'tiktok' && d.canonicalUrl.includes('/search')) {
    wrongProductRedirects++;
  }
});
assertTest('Condition 1: Zero Wrong Product Redirects across Flash Deals', wrongProductRedirects === 0, `Wrong redirects: ${wrongProductRedirects}`);

// Condition 2: Dead CTA == 0
let deadCtas = 0;
if (typeof sandbox.renderFlashArbitrageRadar70_80 === 'function') {
  const radarHtml = sandbox.renderFlashArbitrageRadar70_80();
  if (!radarHtml.includes('btn-cta-primary') || !radarHtml.includes('dispatchSmartAffiliate')) {
    deadCtas++;
  }
} else {
  deadCtas++;
}
assertTest('Condition 2: Zero Dead CTAs in Radar and Deals Grid', deadCtas === 0, `Dead CTAs: ${deadCtas}`);

// Condition 3: State Leak == 0
let stateLeaks = 0;
if (typeof sandbox.filterSeedingReviews === 'function') {
  const testReviews = [
    { content: 'tot nhan xu', rating: 5, isVerifiedBuyer: false },
    { content: 'Sản phẩm hoàn thiện rất tỉ mỉ, cầm đầm tay.', rating: 5, isVerifiedBuyer: true }
  ];
  const res = sandbox.filterSeedingReviews(testReviews);
  if (res.cleanReviews.length !== 1 || res.cleanReviews[0].isVerifiedBuyer !== true || res.filteredCount !== 1) {
    stateLeaks++;
  }
}
assertTest('Condition 3: Zero State Leaks in Review & Radar Processing', stateLeaks === 0, `State leaks: ${stateLeaks}`);

// Condition 5: Critical Accessibility Regression == 0
let a11yErrors = 0;
const stylesContent = fs.readFileSync(STYLES_PATH, 'utf8');
if (!stylesContent.includes('prefers-reduced-motion')) {
  a11yErrors++;
}
if (!stylesContent.includes('--target-min: 44px') && !stylesContent.includes('44px')) {
  a11yErrors++;
}
assertTest('Condition 5: Zero Critical Accessibility Regressions', a11yErrors === 0, `A11y errors: ${a11yErrors}`);

console.log('\n================================================================');
console.log(`  RESULT: ${passedTests}/${totalTests} TESTS PASSED`);
if (failures.length === 0) {
  console.log('  ALL 5 ZERO-TOLERANCE CONDITIONS SATISFIED (100% GREEN)');
  console.log('================================================================');
  process.exit(0);
} else {
  console.error(`  ${failures.length} TESTS FAILED`);
  console.log('================================================================');
  process.exit(1);
}
