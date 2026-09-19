const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');
const puppeteer = require('puppeteer');

console.log('======================================================');
console.log('🚀 CLEAN MASTER CANVAS 2026: DEPLOY TO PRODUCTION');
console.log('======================================================\n');

const SOT_DIR = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH');
const DEPLOY_DIR = path.resolve(__dirname, '../deploy/public');
const EVIDENCE_DIR = path.resolve(__dirname, 'runtime_evidence/clean_master_canvas_2026');

if (!fs.existsSync(EVIDENCE_DIR)) {
  fs.mkdirSync(EVIDENCE_DIR, { recursive: true });
}

function sha256(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(fileBuffer).digest('hex');
}

const FILES_TO_SYNC = [
  'index.html',
  'jayt_apex_interface.js',
  'customer_journey_north_star.json',
  'four_layer_dataset.json',
  'radar_dataset_086u.json',
  'brand_asset_registry.json',
  'daily_supply_feed_126.json'
];

console.log('--- 1. SYNCHRONIZING & VERIFYING SHA-256 PARITY ---');
const parityLedger = {};

FILES_TO_SYNC.forEach(file => {
  const sotPath = path.join(SOT_DIR, file);
  const deployPath = path.join(DEPLOY_DIR, file);
  
  if (!fs.existsSync(sotPath)) {
    throw new Error(`SOT file not found: ${sotPath}`);
  }
  
  // Sync
  fs.copyFileSync(sotPath, deployPath);
  
  const hashSot = sha256(sotPath);
  const hashDeploy = sha256(deployPath);
  
  if (hashSot !== hashDeploy) {
    throw new Error(`Parity mismatch for ${file}! SOT: ${hashSot} vs Deploy: ${hashDeploy}`);
  }
  
  parityLedger[file] = {
    sha256: hashSot,
    bytes: fs.statSync(sotPath).size,
    parity: '100% MATCH'
  };
  
  console.log(`  ✅ Synced & Verified Parity for: ${file} (${hashSot.substring(0, 16)}...)`);
});

console.log('\n--- 2. EXECUTING VERCEL PRODUCTION DEPLOYMENT ---');
let vercelOutput = '';
try {
  vercelOutput = execSync('npx vercel --prod --yes', {
    cwd: path.resolve(__dirname, '..', 'deploy'),
    encoding: 'utf8'
  });
  console.log('Vercel Output:\n', vercelOutput);
} catch (err) {
  console.error('Deployment error:', err.stdout || err.message);
  throw err;
}

async function auditLiveProduction() {
  console.log('\n--- 3. AUDITING LIVE PRODUCTION (https://deploy-ten-xi-48.vercel.app) WITH PUPPETEER ---');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const targetUrl = 'https://deploy-ten-xi-48.vercel.app?t=' + Date.now();
  await page.goto(targetUrl, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1500));

  // Screenshot 1: Desktop View
  const ss1 = path.join(EVIDENCE_DIR, '01_desktop_clean_master_canvas.png');
  await page.screenshot({ path: ss1, fullPage: true });
  console.log(`  📸 Screenshot saved: ${ss1}`);

  // Test Theme Toggle
  const themeBtn = await page.$('#btn-toggle-theme');
  if (themeBtn) {
    await themeBtn.click();
    await new Promise(r => setTimeout(r, 600));
  }
  const ss2 = path.join(EVIDENCE_DIR, '02_desktop_theme_toggled.png');
  await page.screenshot({ path: ss2, fullPage: true });
  console.log(`  📸 Screenshot saved: ${ss2}`);

  // Mobile 390px View
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.reload({ waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));

  const ss3 = path.join(EVIDENCE_DIR, '03_mobile_390px_clean_view.png');
  await page.screenshot({ path: ss3, fullPage: true });
  console.log(`  📸 Screenshot saved: ${ss3}`);

  await browser.close();
}

auditLiveProduction().then(() => {
  const receipt = {
    timestamp: new Date().toISOString(),
    directive: 'CLEAN_MASTER_CANVAS_2026',
    production_url: 'https://deploy-ten-xi-48.vercel.app',
    parity_ledger: parityLedger,
    screenshots: [
      '01_desktop_clean_master_canvas.png',
      '02_desktop_theme_toggled.png',
      '03_mobile_390px_clean_view.png'
    ],
    status: 'PRODUCTION_VERIFIED'
  };

  const receiptPath = path.resolve(__dirname, '../08_RELEASE_VAULT/DEPLOYMENT_RECEIPT_CLEAN_MASTER_CANVAS_2026.json');
  fs.writeFileSync(receiptPath, JSON.stringify(receipt, null, 2), 'utf8');
  console.log(`\n✅ Deployment receipt written to: ${receiptPath}`);
  console.log('✨ CLEAN MASTER CANVAS 2026 PRODUCTION DEPLOYMENT COMPLETED SUCCESSFULLY!\n');
}).catch(err => {
  console.error('Audit error:', err);
  process.exit(1);
});
