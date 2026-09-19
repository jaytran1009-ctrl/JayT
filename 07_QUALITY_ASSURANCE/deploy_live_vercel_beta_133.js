/**
 * DEPLOY & LIVE AUDIT SCRIPT (JAYT-133)
 * Directive: JAYT-133-FIVE-TIER-CANVAS
 * Primary URL: https://deploy-ten-xi-48.vercel.app
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');
const puppeteer = require('puppeteer');

const repoRoot = path.resolve(__dirname, '..');
const sotDir = path.join(repoRoot, '03_SOURCE_OF_TRUTH');
const deployDir = path.join(repoRoot, 'deploy');
const deployPublicDir = path.join(deployDir, 'public');
const evidenceDir = path.join(__dirname, 'runtime_evidence', 'live_beta_133');
const receiptPath = path.join(repoRoot, '08_RELEASE_VAULT', 'DEPLOYMENT_RECEIPT_133.json');

if (!fs.existsSync(evidenceDir)) {
  fs.mkdirSync(evidenceDir, { recursive: true });
}

function sha256File(filePath) {
  const buf = fs.readFileSync(filePath);
  return {
    hash: crypto.createHash('sha256').update(buf).digest('hex'),
    size: buf.length
  };
}

async function fetchLiveFile(url) {
  const res = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } });
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  const ab = await res.arrayBuffer();
  const buf = Buffer.from(ab);
  return {
    hash: crypto.createHash('sha256').update(buf).digest('hex'),
    size: buf.length,
    status: res.status
  };
}

async function runDeployAndAudit() {
  console.log('\n======================================================');
  console.log('🚀 JAYT-133: DEPLOY & LIVE PUPPETEER AUDIT');
  console.log('======================================================\n');

  // 1. Sync SOT to deploy/public
  console.log('1️⃣ Đồng bộ tệp tin từ 03_SOURCE_OF_TRUTH sang deploy/public...');
  const filesToSync = [
    'index.html',
    'jayt_apex_interface.js',
    'customer_journey_north_star.json',
    'four_layer_dataset.json',
    'radar_dataset_086u.json',
    'brand_asset_registry.json',
    'daily_supply_feed_126.json'
  ];

  filesToSync.forEach(file => {
    const src = path.join(sotDir, file);
    const dest = path.join(deployPublicDir, file);
    fs.copyFileSync(src, dest);
    console.log(`  ✓ Synced: ${file}`);
  });

  // 2. Deploy to Vercel
  console.log('\n2️⃣ Triển khai Production lên Vercel...');
  const vercelCmd = 'npx vercel --prod --yes';
  console.log(`  Chạy lệnh: ${vercelCmd}`);
  const deployOutput = execSync(vercelCmd, { cwd: deployDir, encoding: 'utf8' });
  console.log(deployOutput);

  const liveBaseUrl = 'https://deploy-ten-xi-48.vercel.app';
  console.log(`\n🎯 Primary Public Beta URL: ${liveBaseUrl}`);
  console.log('⏳ Chờ 6 giây cho Vercel Edge Network cập nhật...');
  await new Promise(r => setTimeout(r, 6000));

  // 3. Check SHA-256 Parity
  console.log('\n3️⃣ Đối soát SHA-256 byte-for-byte giữa SOT, Deploy và Live:\n');
  const parityAudit = {};
  for (const file of filesToSync) {
    const sotInfo = sha256File(path.join(sotDir, file));
    const deployInfo = sha256File(path.join(deployPublicDir, file));
    const liveInfo = await fetchLiveFile(`${liveBaseUrl}/${file}`);

    const isMatch = (sotInfo.hash === deployInfo.hash && deployInfo.hash === liveInfo.hash);
    console.log(`📄 [FILE] ${file}`);
    console.log(`   - SOT Hash:    ${sotInfo.hash} (${sotInfo.size} bytes)`);
    console.log(`   - Deploy Hash: ${deployInfo.hash} (${deployInfo.size} bytes)`);
    console.log(`   - Live Hash:   ${liveInfo.hash} (${liveInfo.size} bytes, HTTP ${liveInfo.status})`);
    console.log(`   - Byte Parity: ${isMatch ? '✅ 100% MATCH' : '❌ MISMATCH'}\n`);

    parityAudit[file] = {
      sot_sha256: sotInfo.hash,
      live_sha256: liveInfo.hash,
      parity_pass: isMatch,
      size_bytes: liveInfo.size
    };
  }

  // 4. Puppeteer Live E2E Audit
  console.log('4️⃣ Khởi chạy Puppeteer E2E 6 Viewports & 5 Canvas Tiers trên Live URL...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  const viewports = [
    { name: 'desktop_light', width: 1440, height: 900, theme: 'light' },
    { name: 'desktop_dark', width: 1440, height: 900, theme: 'dark' },
    { name: 'tablet_light', width: 768, height: 1024, theme: 'light' },
    { name: 'tablet_dark', width: 768, height: 1024, theme: 'dark' },
    { name: 'mobile_light', width: 390, height: 844, theme: 'light' },
    { name: 'mobile_dark', width: 390, height: 844, theme: 'dark' }
  ];

  const capturedScreenshots = [];

  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto(liveBaseUrl, { waitUntil: 'networkidle0' });
    await page.evaluate((theme) => {
      document.body.setAttribute('data-theme', theme);
    }, vp.theme);
    await new Promise(r => setTimeout(r, 600));

    const shotPath = path.join(evidenceDir, `viewport_${vp.name}.png`);
    await page.screenshot({ path: shotPath, fullPage: false });
    console.log(`📸 [SCREENSHOT] ${vp.name} (${vp.width}x${vp.height}, theme: ${vp.theme}) -> ${shotPath}`);
    capturedScreenshots.push({ name: vp.name, path: shotPath });
  }

  // 5. Audit 5 Tiers on Live DOM
  console.log('\n🔍 Kiểm tra 5 Tiers trên Live DOM...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(liveBaseUrl, { waitUntil: 'networkidle0' });

  const tiersAudit = await page.evaluate(() => {
    return {
      tier1: !!document.querySelector('.apex-tier-1-hero'),
      tier2: !!document.querySelector('.apex-tier-2-hotnow'),
      tier3: !!document.querySelector('.apex-tier-3-planahead'),
      tier4: !!document.querySelector('.apex-tier-4-smartbuy'),
      tier5: !!document.querySelector('.apex-tier-5-voucherwallet')
    };
  });

  console.log('  🏛️ [TIER AUDIT] Tier 1 Hero:', tiersAudit.tier1 ? '✅ PASS' : '❌ FAIL');
  console.log('  🏛️ [TIER AUDIT] Tier 2 Hot Now:', tiersAudit.tier2 ? '✅ PASS' : '❌ FAIL');
  console.log('  🏛️ [TIER AUDIT] Tier 3 Plan Ahead:', tiersAudit.tier3 ? '✅ PASS' : '❌ FAIL');
  console.log('  🏛️ [TIER AUDIT] Tier 4 Smart Buy (Empty):', tiersAudit.tier4 ? '✅ PASS' : '❌ FAIL');
  console.log('  🏛️ [TIER AUDIT] Tier 5 Voucher Wallet (Empty):', tiersAudit.tier5 ? '✅ PASS' : '❌ FAIL');

  await browser.close();

  // 6. Write DEPLOYMENT_RECEIPT_133.json
  console.log('\n5️⃣ Tạo DEPLOYMENT_RECEIPT_133.json...');
  const receipt = {
    receipt_id: 'DEPLOY_133_' + Date.now(),
    directive: 'JAYT-133-FIVE-TIER-CANVAS',
    deployed_at: new Date().toISOString(),
    live_production_url: liveBaseUrl,
    sha256_parity_audit: parityAudit,
    five_tiers_verified: tiersAudit,
    screenshots_captured: capturedScreenshots.length,
    status: 'READY_FOR_CEO_AUDIT'
  };

  fs.writeFileSync(receiptPath, JSON.stringify(receipt, null, 2), 'utf8');
  console.log(`📄 Biên nhận deploy lưu tại: ${receiptPath}`);
  console.log('\n======================================================');
  console.log('🎉 JAYT-133 DEPLOYMENT & LIVE AUDIT HOÀN TẤT!');
  console.log('======================================================\n');
}

runDeployAndAudit().catch(err => {
  console.error('❌ Lỗi khi deploy và audit:', err);
  process.exit(1);
});
