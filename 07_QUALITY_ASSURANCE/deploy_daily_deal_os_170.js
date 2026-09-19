/**
 * JAYT LIVE DAILY DEAL OS DEPLOYMENT RUNNER (170)
 * Directive: JAYT-170: DAILY DEAL OS — 30–50 DEAL HOT MỖI NGÀY
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');
const puppeteer = require('puppeteer');
const assert = require('assert');

console.log('========================================================================');
console.log('🚀 JAYT-170: DEPLOYING DAILY DEAL OS TO VERCEL (https://deploy-ten-xi-48.vercel.app)');
console.log('========================================================================\n');

const repoRoot = path.resolve(__dirname, '..');
const sotDir = path.join(repoRoot, '03_SOURCE_OF_TRUTH');
const deployDir = path.join(repoRoot, 'deploy');
const deployPublicDir = path.join(deployDir, 'public');
const evidenceDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'screenshots_170');

if (!fs.existsSync(evidenceDir)) {
  fs.mkdirSync(evidenceDir, { recursive: true });
}

function sha256(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(fileBuffer).digest('hex');
}

// 1. Synchronize to both deploy/ and deploy/public/
const filesToSync = [
  'index.html',
  'jayt_apex_interface.js',
  'customer_journey_north_star.json',
  'four_layer_dataset.json',
  'radar_dataset_086u.json',
  'brand_asset_registry.json'
];

console.log('--- 1. SYNCHRONIZING FILES TO DEPLOY ROOT AND DEPLOY/PUBLIC ---');
filesToSync.forEach(file => {
  const src = path.join(sotDir, file);
  if (fs.existsSync(src)) {
    const dest1 = path.join(deployDir, file);
    const dest2 = path.join(deployPublicDir, file);
    fs.copyFileSync(src, dest1);
    fs.copyFileSync(src, dest2);

    const hashSrc = sha256(src);
    const hashDest1 = sha256(dest1);
    const hashDest2 = sha256(dest2);

    if (hashSrc !== hashDest1 || hashSrc !== hashDest2) {
      console.error(`❌ Hash parity mismatch on ${file}!`);
      process.exit(1);
    }
    console.log(`  ✅ Synced & Verified Parity for: ${file} (${hashSrc.substring(0, 16)}...)`);
  }
});

// Also copy inventory files
const extraFiles = [
  { src: path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'daily_deal_os_inventory_170.json'), name: 'daily_deal_os_inventory_170.json' },
  { src: path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'category_hubs_contract_162.json'), name: 'category_hubs_contract_162.json' },
  { src: path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'hybrid_supply_dashboard_162.json'), name: 'hybrid_supply_dashboard_162.json' },
  { src: path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'da_nang_cluster_expansion_manifest_166.json'), name: 'da_nang_cluster_expansion_manifest_166.json' }
];

extraFiles.forEach(f => {
  if (fs.existsSync(f.src)) {
    fs.copyFileSync(f.src, path.join(deployDir, f.name));
    fs.copyFileSync(f.src, path.join(deployPublicDir, f.name));
    console.log(`  ✅ Synced asset: ${f.name}`);
  }
});

console.log('\n--- 2. EXECUTING VERCEL PRODUCTION DEPLOYMENT ---');
try {
  const deployOutput = execSync('npx vercel --prod --yes', {
    cwd: deployDir,
    encoding: 'utf8',
    timeout: 120000
  });
  console.log('Vercel Output:\n', deployOutput);
} catch (err) {
  console.error('❌ Vercel deployment error:', err.message);
  if (err.stdout) console.log('STDOUT:', err.stdout);
  if (err.stderr) console.error('STDERR:', err.stderr);
  process.exit(1);
}

const liveUrl = 'https://deploy-ten-xi-48.vercel.app';
console.log(`\n--- 3. AUDITING LIVE PRODUCTION SITE (${liveUrl}) WITH PUPPETEER ---`);

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // 1. Desktop Light Mode (1440x900)
    await page.setViewport({ width: 1440, height: 900 });
    console.log(`Navigating to ${liveUrl}...`);
    await page.goto(liveUrl, { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1000));

    // Force Light Mode
    await page.evaluate(() => {
      document.body.setAttribute('data-theme', 'light');
    });
    await new Promise(r => setTimeout(r, 500));

    const desktopLightShot = path.join(evidenceDir, 'screenshot_170_live_desktop_light.png');
    await page.screenshot({ path: desktopLightShot, fullPage: false });
    console.log(`  📸 Screenshot saved (Desktop Light): ${desktopLightShot}`);

    // 2. Mobile Light Mode (390x844)
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.reload({ waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1000));

    await page.evaluate(() => {
      document.body.setAttribute('data-theme', 'light');
    });
    await new Promise(r => setTimeout(r, 500));

    const mobileLightShot = path.join(evidenceDir, 'screenshot_170_live_mobile_light.png');
    await page.screenshot({ path: mobileLightShot, fullPage: false });
    console.log(`  📸 Screenshot saved (Mobile Light): ${mobileLightShot}`);

    // 3. Mobile Dark Mode (390x844)
    await page.evaluate(() => {
      document.body.setAttribute('data-theme', 'dark');
    });
    await new Promise(r => setTimeout(r, 500));

    const mobileDarkShot = path.join(evidenceDir, 'screenshot_170_live_mobile_dark.png');
    await page.screenshot({ path: mobileDarkShot, fullPage: false });
    console.log(`  📸 Screenshot saved (Mobile Dark): ${mobileDarkShot}`);

    // 4. Live Visual & DOM Element Verification
    console.log('\n--- 4. VERIFYING LIVE DOM ELEMENTS ---');
    const liveHeaderTitle = await page.$eval('.jayt-positioning-title', el => el.textContent.trim());
    console.log(`  ✅ Live Header Title: "${liveHeaderTitle}"`);
    assert(liveHeaderTitle.includes('Lịch Tiết Kiệm Hằng Ngày Cho Người Đà Nẵng'), 'Live title must match branding');

    const hubButtonsCount = await page.$$eval('.jayt-category-hub-pill', els => els.length);
    console.log(`  ✅ Live 5 Category Hub Pills: ${hubButtonsCount}/5 rendered`);
    assert.strictEqual(hubButtonsCount, 5, 'Must render exactly 5 category hub pills on live site');

    const clusterChipsCount = await page.$$eval('.jayt-cluster-chip', els => els.length);
    console.log(`  ✅ Live 6 Community Cluster Chips: ${clusterChipsCount}/6 rendered`);
    assert.strictEqual(clusterChipsCount, 6, 'Must render exactly 6 cluster chips on live site');

    const providerBoardPresent = await page.$eval('#jayt-provider-board', el => Boolean(el));
    console.log(`  ✅ Live Provider Access Board: ${providerBoardPresent ? 'PRESENT' : 'MISSING'}`);
    assert(providerBoardPresent, 'Provider Access Board must exist on live site');

    await browser.close();
    console.log('\n✨ LIVE DAILY DEAL OS DEPLOYMENT AND VERIFICATION COMPLETED 100% CLEAN!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Puppeteer live site audit failed:', err.message);
    process.exit(1);
  }
})();
