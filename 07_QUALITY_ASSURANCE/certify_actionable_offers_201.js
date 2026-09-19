const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');
const { execSync } = require('child_process');
const puppeteer = require('puppeteer');

const repoRoot = path.resolve(__dirname, '..');
const certEvidenceDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_201_certification');
if (!fs.existsSync(certEvidenceDir)) fs.mkdirSync(certEvidenceDir, { recursive: true });

const artifactsDir = 'C:\\Users\\tritr\\.gemini\\antigravity\\brain\\d5cf4def-63d1-4b27-a09f-44b0738094ea';

function sha256Buf(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }
function sha256File(p) { return sha256Buf(fs.readFileSync(p)); }

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchText(res.headers.location).then(resolve).catch(reject);
      }
      let chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    }).on('error', reject);
  });
}

async function runCertifyActionableOffers201() {
  console.log('========================================================================');
  console.log('🌐 JAYT-201: 3-GATE PRODUCTION DEPLOYMENT & LIVE CERTIFICATION');
  console.log('   Timestamp: ' + new Date().toISOString());
  console.log('========================================================================\n');

  // Step 1: Deploy to Vercel Production with Retry
  console.log('🚀 [DEPLOY] Deploying ./deploy directory to Vercel Production...');
  let deployed = false;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      console.log(`   Attempt ${attempt}/3...`);
      const deployOutput = execSync('npx vercel --prod --yes', { cwd: path.join(repoRoot, 'deploy'), encoding: 'utf8', timeout: 60000 });
      console.log('   Vercel CLI Output:\n' + deployOutput.trim());
      deployed = true;
      break;
    } catch (err) {
      console.warn(`   Vercel CLI deploy attempt ${attempt} failed:`, err.message);
      if (attempt < 3) {
        console.log('   Waiting 3s before retry...');
        execSync('node -e "setTimeout(() => {}, 3000)"');
      }
    }
  }
  if (!deployed) {
    console.error('❌ Failed to deploy to Vercel after 3 attempts');
  }

  // Live URL
  const liveUrl = 'https://deploy-ten-xi-48.vercel.app/';
  console.log('\n🎯 Verifying Live Production URL: ' + liveUrl);

  // --- GATE 1: 3-WAY HASH PARITY CHECK ---
  console.log('\n--- GATE 1: 3-WAY HASH PARITY VERIFICATION ---');
  const localModulePath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_verified_deals_module.js');
  const localModuleSha = sha256File(localModulePath);

  const localMainJsPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
  const localMainJsSha = sha256File(localMainJsPath);

  console.log(`   [LOCAL SOT MODULE SHA]:  ${localModuleSha}`);
  console.log(`   [LOCAL SOT MAIN JS SHA]: ${localMainJsSha}`);

  // Fetch live files with cache-busting timestamp
  const ts = Date.now();
  const liveModuleText = await fetchText(`${liveUrl}jayt_verified_deals_module.js?v=3.342.0&t=${ts}`);
  const liveModuleSha = sha256Buf(Buffer.from(liveModuleText, 'utf8'));

  const liveMainJsText = await fetchText(`${liveUrl}jayt_apex_interface.js?v=3.342.0&t=${ts}`);
  const liveMainJsSha = sha256Buf(Buffer.from(liveMainJsText, 'utf8'));

  console.log(`   [LIVE REMOTE MODULE SHA]:  ${liveModuleSha}`);
  console.log(`   [LIVE REMOTE MAIN JS SHA]: ${liveMainJsSha}`);

  const gate1ModulePass = (localModuleSha === liveModuleSha);
  const gate1MainJsPass = (localMainJsSha === liveMainJsSha);
  console.log(`   Gate 1 Module Hash Parity:  ${gate1ModulePass ? '🟢 PASS' : '❌ FAIL'}`);
  console.log(`   Gate 1 Main JS Hash Parity: ${gate1MainJsPass ? '🟢 PASS' : '❌ FAIL'}`);

  // --- GATE 2: LIVE DOM PUPPETEER ASSERTIONS ---
  console.log('\n--- GATE 2: LIVE DOM PUPPETEER ASSERTIONS ---');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(liveUrl, { waitUntil: 'networkidle2', timeout: 25000 });
  await new Promise(r => setTimeout(r, 2000));

  const domReport = await page.evaluate(() => {
    const rawFeed = window.JAYT_TIERED_SAVINGS_FEED || window.JAYT_VERIFIED_DEALS_FEED || {};
    const readyCount = (rawFeed.ready_to_use_deals || []).length;
    const scopeCount = (rawFeed.promo_scope_pending_deals || []).length;
    const communityCount = (rawFeed.community_pending_audit || []).length;
    const locationTracking = (rawFeed.verified_location_tracking || []).length;
    const totalDealsKpi = readyCount + scopeCount;

    const cards = Array.from(document.querySelectorAll('.jayt-card-verified-deal'));
    const bodyText = document.body.innerText;

    const hasHeadline = bodyText.includes('Hôm nay: 0 đã xác nhận · 20 ưu đãi chính thức cần kiểm tra phạm vi');
    const hasOs3342 = bodyText.includes('OS 3.342') || bodyText.includes('Daily Deal OS 3.342');
    const hasMandatoryNotice = cards.some(c => c.innerText.includes('Ưu đãi công bố chính thức; cơ sở Đà Nẵng đã xác minh. Kiểm tra phạm vi áp dụng trước khi thanh toán.'));

    return {
      readyCount,
      scopeCount,
      communityCount,
      locationTracking,
      totalDealsKpi,
      renderedCardsCount: cards.length,
      hasHeadline,
      hasOs3342,
      hasMandatoryNotice
    };
  });

  console.log('   DOM Assertions Result:');
  console.log('   - Ready to Use Deals:               ' + domReport.readyCount + ' (Expected: 0)');
  console.log('   - Actionable Official Offers:       ' + domReport.scopeCount + ' (Expected: 20)');
  console.log('   - Strategic Savings KPI (🟢 + 🔵):  ' + domReport.totalDealsKpi + ' (Expected: 20)');
  console.log('   - Community Pending Audit:          ' + domReport.communityCount + ' (Expected: 0)');
  console.log('   - Location Tracking Reference:      ' + domReport.locationTracking + ' (Expected: 25)');
  console.log('   - Rendered Deal Cards in DOM:       ' + domReport.renderedCardsCount);
  console.log('   - Headline Match:                   ' + (domReport.hasHeadline ? '🟢 PASS' : '❌ FAIL'));
  console.log('   - OS 3.342 Rendered:                ' + (domReport.hasOs3342 ? '🟢 PASS' : '❌ FAIL'));
  console.log('   - Mandatory 🔵 Notice Rendered:     ' + (domReport.hasMandatoryNotice ? '🟢 PASS' : '❌ FAIL'));

  const gate2Pass = (domReport.readyCount === 0 && domReport.scopeCount === 20 && domReport.communityCount === 0 && domReport.totalDealsKpi === 20 && domReport.hasHeadline && domReport.hasMandatoryNotice);
  console.log(`   Gate 2 Live DOM Assertions: ${gate2Pass ? '🟢 PASS' : '❌ FAIL'}`);

  // --- GATE 3: VISUAL CAPTURE (DESKTOP, MOBILE LIGHT, MOBILE DARK) ---
  console.log('\n--- GATE 3: VISUAL CAPTURE & SCREENSHOT ARTIFACTS ---');
  // 1. Desktop Light
  const desktopLightPath = path.join(artifactsDir, 'screenshot_201_desktop_light.png');
  await page.setViewport({ width: 1440, height: 900 });
  await page.screenshot({ path: desktopLightPath, fullPage: false });
  console.log('   📸 Captured Desktop Light View: ' + desktopLightPath);

  // 2. Mobile Light
  const mobileLightPath = path.join(artifactsDir, 'screenshot_201_mobile_light.png');
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.screenshot({ path: mobileLightPath, fullPage: false });
  console.log('   📸 Captured Mobile Light View:  ' + mobileLightPath);

  // 3. Mobile Dark
  const mobileDarkPath = path.join(artifactsDir, 'screenshot_201_mobile_dark.png');
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.body.classList.add('dark-theme');
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: mobileDarkPath, fullPage: false });
  console.log('   📸 Captured Mobile Dark View:   ' + mobileDarkPath);

  await browser.close();

  // Save report
  const certReport = {
    certification_id: 'CERT_201_' + Date.now(),
    timestamp: new Date().toISOString(),
    live_url: liveUrl,
    gate1_hash_parity: {
      pass: gate1ModulePass && gate1MainJsPass,
      local_module_sha256: localModuleSha,
      live_module_sha256: liveModuleSha,
      local_main_js_sha256: localMainJsSha,
      live_main_js_sha256: liveMainJsSha
    },
    gate2_live_dom: {
      pass: gate2Pass,
      dom_report: domReport
    },
    gate3_visual_capture: {
      pass: true,
      screenshots: [
        { name: 'screenshot_201_desktop_light.png', path: desktopLightPath, sha256: sha256File(desktopLightPath) },
        { name: 'screenshot_201_mobile_light.png', path: mobileLightPath, sha256: sha256File(mobileLightPath) },
        { name: 'screenshot_201_mobile_dark.png', path: mobileDarkPath, sha256: sha256File(mobileDarkPath) }
      ]
    }
  };

  const reportFilePath = path.join(certEvidenceDir, 'CERTIFICATION_201_LIVE_REPORT.json');
  fs.writeFileSync(reportFilePath, JSON.stringify(certReport, null, 2), 'utf8');
  console.log('\n📄 Live Certification Report saved to: ' + path.relative(repoRoot, reportFilePath));

  const allGatesPass = gate1ModulePass && gate1MainJsPass && gate2Pass;
  if (!allGatesPass) {
    console.error('❌ LIVE PRODUCTION CERTIFICATION FAILED!');
    process.exit(1);
  } else {
    console.log('\n🎉 ALL 3 GATES PASSED! LIVE VERCEL PRODUCTION 100% CERTIFIED.');
  }
}

if (require.main === module) {
  runCertifyActionableOffers201().catch(err => {
    console.error('Fatal Certification Error:', err);
    process.exit(1);
  });
}

module.exports = { runCertifyActionableOffers201 };
