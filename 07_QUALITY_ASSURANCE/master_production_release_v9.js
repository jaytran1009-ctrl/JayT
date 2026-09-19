// ============================================================================
// 🚨 PREFLIGHT CIRCUIT BREAKER: PERMANENTLY BLOCKED UNDER HARD FREEZE (JAYT-274)
// This script is deprecated and strictly forbidden. It contains vercel --prod
// and has NO rollback capability. For isolated staging rollback, use:
// node 07_QUALITY_ASSURANCE/jayt_staging_rollback_empty_feed.js
// ============================================================================
console.error('❌ FATAL: master_production_release_v9.js is DEPRECATED and STRICTLY FORBIDDEN.');
console.error('   This script attempts npx vercel --prod and has NO rollback mechanism.');
console.error('   Per CEO directive JAYT-274, use jayt_staging_rollback_empty_feed.js for isolated staging rollback.');
process.exit(1);

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');
const puppeteer = require('puppeteer');

console.log('========================================================================');
console.log('🚨 JAYT MASTER PRODUCTION SYNC & DEPLOY — EVIDENCE COMPILER (JAYT-136T)');
console.log('========================================================================\n');

const sotDir = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH');
const deployDir = path.resolve(__dirname, '../deploy');
const deployPublicDir = path.resolve(__dirname, '../deploy/public');
const evidenceDir = path.resolve(__dirname, 'runtime_evidence/evidence_compiler_136t');

if (!fs.existsSync(evidenceDir)) {
  fs.mkdirSync(evidenceDir, { recursive: true });
}

function sha256File(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

console.log('--- 1. SYNCHRONIZING SOT TO BOTH deploy/ AND deploy/public/ ---');

const filesToSync = [
  'index.html',
  'jayt_apex_interface.js',
  'sw.js',
  'customer_journey_north_star.json',
  'four_layer_dataset.json',
  'radar_dataset_086u.json',
  'brand_asset_registry.json',
  'daily_supply_feed_126.json',
  'vercel.json'
];

for (const file of filesToSync) {
  const src = path.join(sotDir, file);
  const dstDeploy = path.join(deployDir, file);
  const dstPublic = path.join(deployPublicDir, file);

  if (!fs.existsSync(src)) {
    console.error(`❌ Source file missing: ${src}`);
    process.exit(1);
  }

  const content = fs.readFileSync(src);
  fs.writeFileSync(dstDeploy, content);
  fs.writeFileSync(dstPublic, content);

  const srcSha = sha256File(src);
  const deploySha = sha256File(dstDeploy);
  const publicSha = sha256File(dstPublic);

  if (srcSha !== deploySha || srcSha !== publicSha) {
    console.error(`❌ Parity failure for ${file}!`);
    process.exit(1);
  }

  console.log(`  ✅ Synced & Verified: ${file} (Size: ${content.length} bytes, SHA: ${srcSha.substring(0, 16)}...)`);
}

console.log('\n--- 2. DEPLOYING TO VERCEL PRODUCTION ---');

try {
  const output = execSync('npx vercel --prod --yes', {
    cwd: deployDir,
    encoding: 'utf8',
    stdio: 'pipe'
  });
  console.log(output);
} catch (err) {
  console.error('❌ Vercel Deployment Failed:');
  console.error(err.stdout || err.message);
  process.exit(1);
}

async function verifyLive() {
  const liveUrl = 'https://deploy-ten-xi-48.vercel.app';
  console.log(`\n--- 3. LIVE PUPPETEER FULL-SCOPE AUDIT ON ${liveUrl} ---`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const consoleLogs = [];
  const pageErrors = [];

  page.on('console', msg => consoleLogs.push(`[${msg.type()}] ${msg.text()}`));
  page.on('pageerror', err => pageErrors.push(err.toString()));

  // 1. Desktop 1440x900
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(liveUrl + '?t=' + Date.now(), { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  const auditResult = await page.evaluate(() => {
    const verifiedCards = Array.from(document.querySelectorAll('.verified-venue-card')).map(c => c.innerText.replace(/\n/g, ' '));
    const allImages = Array.from(document.querySelectorAll('img')).map(img => img.src);
    const unsplashImages = allImages.filter(src => src.includes('unsplash.com'));
    const telLinks = Array.from(document.querySelectorAll('a[href^="tel:"]')).map(a => a.href);
    const fakePhones = Array.from(document.querySelectorAll('*')).filter(el => /0905\d{6}|0935\d{6}/.test(el.innerText));
    const shopeeBuyBtns = Array.from(document.querySelectorAll('a[href^="https://shopee.vn"]')).filter(a => a.innerText.includes('Mua'));
    const day90Badges = Array.from(document.querySelectorAll('.badge-day-90')).filter(b => b.innerText.includes('ĐÁY 90N'));
    const affClaims = Array.from(document.querySelectorAll('*')).filter(el => /#JayTAffiliate|Accesstrade CPA|Klook Official Partner/i.test(el.innerText));
    const fakeVouchers = Array.from(document.querySelectorAll('*')).filter(el => /TIKTOKVIP0D|JAYTSHOPEE50|JAYTBE30/i.test(el.innerText));
    const arbitrageClaims = Array.from(document.querySelectorAll('*')).filter(el => /ShopeeFood rẻ hơn|Freeship 18K/i.test(el.innerText));
    const greenCheckCount = Array.from(document.querySelectorAll('.badge-status-neutral')).filter(b => b.innerText.includes('🟢 ĐÃ ĐỐI SOÁT')).length;
    const blueVerificationBadgeCount = Array.from(document.querySelectorAll('.badge-status-neutral')).filter(b => b.innerText.includes('🔵 ĐỊA ĐIỂM XÁC MINH')).length;

    return {
      verifiedVenueCardsCount: verifiedCards.length,
      verifiedVenueSample: verifiedCards.slice(0, 2),
      blueVerificationBadgeCount,
      greenCheckCount,
      totalImagesCount: allImages.length,
      unsplashImagesCount: unsplashImages.length,
      telLinksCount: telLinks.length,
      fakePhonesCount: fakePhones.length,
      shopeeBuyBtnsCount: shopeeBuyBtns.length,
      day90BadgesCount: day90Badges.length,
      affClaimsCount: affClaims.length,
      fakeVouchersCount: fakeVouchers.length,
      arbitrageClaimsCount: arbitrageClaims.length
    };
  });

  console.log('Live Audit Result:');
  console.log(JSON.stringify(auditResult, null, 2));

  const desktopShot = path.join(evidenceDir, '01_desktop_evidence_compiler_136t.png');
  await page.screenshot({ path: desktopShot, fullPage: false });
  console.log(`  📸 Screenshot saved: ${desktopShot}`);

  // Test District Filter Click
  const hoaKhanhFilter = await page.$('[data-action="filter-verified-district"][data-district="Hòa Khánh / Liên Chiểu"]');
  if (hoaKhanhFilter) {
    await page.click('[data-action="filter-verified-district"][data-district="Hòa Khánh / Liên Chiểu"]');
    await new Promise(r => setTimeout(r, 300));
  }
  const districtShot = path.join(evidenceDir, '02_district_filter_136t.png');
  await page.screenshot({ path: districtShot, fullPage: false });
  console.log(`  📸 Screenshot saved: ${districtShot}`);

  // 2. Mobile 390x844
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.goto(liveUrl + '?t=' + Date.now(), { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));
  const mobileShot = path.join(evidenceDir, '03_mobile_evidence_compiler_136t.png');
  await page.screenshot({ path: mobileShot, fullPage: false });
  console.log(`  📸 Screenshot saved: ${mobileShot}`);

  await browser.close();

  console.log('\n--- CONSOLE LOGS & ERRORS ---');
  console.log('Errors:', pageErrors);
  console.log('Console Logs:', consoleLogs);

  if (
    pageErrors.length > 0 ||
    auditResult.greenCheckCount > 0 ||
    auditResult.unsplashImagesCount > 0 ||
    auditResult.telLinksCount > 0 ||
    auditResult.fakePhonesCount > 0 ||
    auditResult.shopeeBuyBtnsCount > 0 ||
    auditResult.day90BadgesCount > 0 ||
    auditResult.affClaimsCount > 0 ||
    auditResult.fakeVouchersCount > 0 ||
    auditResult.arbitrageClaimsCount > 0
  ) {
    console.error('❌ P0 AUDIT FAILURE DETECTED ON LIVE CDN!');
    process.exit(1);
  }

  console.log('\n✨ JAYT EVIDENCE BUNDLE COMPILER (136T) FULL-SCOPE VERIFIED ON PRODUCTION!');
}

verifyLive().catch(err => {
  console.error('❌ Verification failed:', err);
  process.exit(1);
});
