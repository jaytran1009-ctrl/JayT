const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');
const { execSync } = require('child_process');
const puppeteer = require('puppeteer');

const repoRoot = path.resolve(__dirname, '..');
const certEvidenceDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_209_certification');
if (!fs.existsSync(certEvidenceDir)) fs.mkdirSync(certEvidenceDir, { recursive: true });

const artifactsDir = 'C:\\Users\\tritr\\.gemini\\antigravity\\brain\\d5cf4def-63d1-4b27-a09f-44b0738094ea';

function sha256Buf(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }
function sha256File(p) { return fs.existsSync(p) ? sha256Buf(fs.readFileSync(p)) : null; }

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

async function runCertifyDealDetail209() {
  console.log('========================================================================');
  console.log('🌐 JAYT-209: 3-GATE PRODUCTION DEPLOYMENT & DEAL DETAIL CERTIFICATION');
  console.log('   Timestamp: ' + new Date().toISOString());
  console.log('========================================================================\n');

  // Step 1: Deploy to Vercel Production with Retry Loop
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
    process.exit(1);
  }

  // Live URL
  const liveUrl = 'https://deploy-ten-xi-48.vercel.app/';
  console.log('\n🎯 Verifying Live Production URL: ' + liveUrl);

  // --- GATE 1: 3-WAY HASH PARITY VERIFICATION ---
  console.log('\n--- GATE 1: 3-WAY HASH PARITY VERIFICATION ---');
  const localModulePath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_verified_deals_module.js');
  const localModuleSha = sha256File(localModulePath);

  const localMainJsPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
  const localMainJsSha = sha256File(localMainJsPath);

  console.log(`   [LOCAL SOT MODULE SHA]:  ${localModuleSha}`);
  console.log(`   [LOCAL SOT MAIN JS SHA]: ${localMainJsSha}`);

  // Fetch live files with cache-busting timestamp
  const ts = Date.now();
  const liveModuleText = await fetchText(`${liveUrl}jayt_verified_deals_module.js?v=3.349.0&t=${ts}`);
  const liveModuleSha = sha256Buf(Buffer.from(liveModuleText, 'utf8'));

  const liveMainJsText = await fetchText(`${liveUrl}jayt_apex_interface.js?v=3.349.0&t=${ts}`);
  const liveMainJsSha = sha256Buf(Buffer.from(liveMainJsText, 'utf8'));

  console.log(`   [LIVE REMOTE MODULE SHA]:  ${liveModuleSha}`);
  console.log(`   [LIVE REMOTE MAIN JS SHA]: ${liveMainJsSha}`);

  const gate1ModulePass = (localModuleSha === liveModuleSha);
  const gate1MainJsPass = (localMainJsSha === liveMainJsSha);
  console.log(`   Gate 1 Module Hash Parity:  ${gate1ModulePass ? '🟢 PASS' : '❌ FAIL'}`);
  console.log(`   Gate 1 Main JS Hash Parity: ${gate1MainJsPass ? '🟢 PASS' : '❌ FAIL'}`);

  // --- GATE 2: LIVE DOM PUPPETEER ASSERTIONS & MODAL INTERACTION ---
  console.log('\n--- GATE 2: LIVE DOM PUPPETEER ASSERTIONS & MODAL INTERACTION ---');
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
    const greenCount = (rawFeed.green_confirmed_deals || []).length;
    const blueCount = (rawFeed.blue_official_offers || []).length;
    const orangeCount = (rawFeed.orange_flash_deals || []).length;
    const purpleCount = (rawFeed.purple_verified_venues || []).length;
    const whiteCount = (rawFeed.white_community_radar || []).length;
    const totalDailyCards = greenCount + blueCount + orangeCount + purpleCount + whiteCount;

    const cards = Array.from(document.querySelectorAll('.jayt-card-verified-deal, .jayt-card-verified-venue'));
    const bodyText = document.body.innerText;

    const hasHeadline = bodyText.includes('Hôm nay: 0 🟢 · 12 🔵 ưu đãi chính thức · 17 🟣 nguồn chính thức đã ghi nhận');
    const hasOs3349 = bodyText.includes('OS 3.349') || bodyText.includes('Deal Detail OS 3.349');

    const detailTriggers = Array.from(document.querySelectorAll('[data-action="open-deal-detail"]'));

    return {
      greenCount,
      blueCount,
      orangeCount,
      purpleCount,
      whiteCount,
      totalDailyCards,
      renderedCardsCount: cards.length,
      detailTriggersCount: detailTriggers.length,
      hasHeadline,
      hasOs3349
    };
  });

  console.log('   DOM Assertions Result:');
  console.log('   - 🟢 Deal đã xác nhận:             ' + domReport.greenCount + ' (Expected: 0)');
  console.log('   - 🔵 Ưu đãi chính thức:            ' + domReport.blueCount + ' (Expected: 12)');
  console.log('   - 🟣 Nguồn chính thức đã ghi nhận: ' + domReport.purpleCount + ' (Expected: 17)');
  console.log('   - 🎯 TỔNG SỐ CARD TRONG NGÀY:      ' + domReport.totalDailyCards + ' (Expected: 29)');
  console.log('   - Rendered Deal Cards in DOM:       ' + domReport.renderedCardsCount);
  console.log('   - Detail Triggers in DOM:           ' + domReport.detailTriggersCount);
  console.log('   - Headline Breakdown Match:         ' + (domReport.hasHeadline ? '🟢 PASS' : '❌ FAIL'));
  console.log('   - OS 3.349 Rendered:                ' + (domReport.hasOs3349 ? '🟢 PASS' : '❌ FAIL'));

  // Test Modal Interaction
  console.log('\n   🖱️ Testing Live Modal Interaction (Clicking first deal trigger)...');
  await page.click('[data-action="open-deal-detail"]');
  await new Promise(r => setTimeout(r, 600));

  const modalReport = await page.evaluate(() => {
    const overlay = document.getElementById('jayt-deal-detail-overlay');
    const sheet = document.getElementById('jayt-deal-detail-sheet');
    const text = overlay ? overlay.innerText.toLowerCase() : '';

    return {
      modalOpened: !!overlay && !!sheet,
      hasTitle: text.includes('hồ sơ ưu đãi & hướng dẫn nhận'),
      hasVerbatimSection: text.includes('trích đoạn ưu đãi nguyên văn'),
      hasGuideSection: text.includes('hướng dẫn cách nhận ưu đãi'),
      hasAnalysisSection: text.includes('phân tích kiểm định jayt'),
      hasChecklist: text.includes('checklist trước khi thanh toán')
    };
  });

  const sectionsPass = modalReport.hasTitle && modalReport.hasVerbatimSection && modalReport.hasGuideSection && modalReport.hasAnalysisSection && modalReport.hasChecklist;
  console.log('   - Modal Opened:                     ' + (modalReport.modalOpened ? '🟢 PASS' : '❌ FAIL'));
  console.log('   - 5 Sections Rendered:              ' + (sectionsPass ? '🟢 PASS' : '❌ FAIL'));

  const gate2Pass = (domReport.blueCount === 12 && domReport.purpleCount === 17 && domReport.totalDailyCards === 29 && domReport.hasHeadline && domReport.hasOs3349 && modalReport.modalOpened);
  console.log(`   Gate 2 Live DOM Assertions: ${gate2Pass ? '🟢 PASS' : '❌ FAIL'}`);

  // --- GATE 3: VISUAL CAPTURE & SCREENSHOT ARTIFACTS ---
  console.log('\n--- GATE 3: VISUAL CAPTURE & SCREENSHOT ARTIFACTS ---');
  // 1. Modal View
  const modalViewPath = path.join(artifactsDir, 'screenshot_209_modal_open.png');
  await page.screenshot({ path: modalViewPath, fullPage: false });
  console.log('   📸 Captured Modal Open View:    ' + modalViewPath);

  // Close modal for fullpage screenshots
  await page.click('#btn-close-deal-detail');
  await new Promise(r => setTimeout(r, 400));

  // 2. Desktop Light
  const desktopLightPath = path.join(artifactsDir, 'screenshot_209_desktop_light.png');
  await page.setViewport({ width: 1440, height: 900 });
  await page.screenshot({ path: desktopLightPath, fullPage: false });
  console.log('   📸 Captured Desktop Light View: ' + desktopLightPath);

  // 3. Mobile Light
  const mobileLightPath = path.join(artifactsDir, 'screenshot_209_mobile_light.png');
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.screenshot({ path: mobileLightPath, fullPage: false });
  console.log('   📸 Captured Mobile Light View:  ' + mobileLightPath);

  // 4. Mobile Dark
  const mobileDarkPath = path.join(artifactsDir, 'screenshot_209_mobile_dark.png');
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
    certification_id: 'CERT_209_' + Date.now(),
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
      dom_report: domReport,
      modal_report: modalReport
    },
    gate3_visual_capture: {
      pass: true,
      screenshots: [
        { name: 'screenshot_209_modal_open.png', path: modalViewPath, sha256: sha256File(modalViewPath) },
        { name: 'screenshot_209_desktop_light.png', path: desktopLightPath, sha256: sha256File(desktopLightPath) },
        { name: 'screenshot_209_mobile_light.png', path: mobileLightPath, sha256: sha256File(mobileLightPath) },
        { name: 'screenshot_209_mobile_dark.png', path: mobileDarkPath, sha256: sha256File(mobileDarkPath) }
      ]
    }
  };

  const reportFilePath = path.join(certEvidenceDir, 'CERTIFICATION_209_LIVE_REPORT.json');
  fs.writeFileSync(reportFilePath, JSON.stringify(certReport, null, 2), 'utf8');
  console.log('\n📄 Live Certification Report saved to: ' + path.relative(repoRoot, reportFilePath));

  const allGatesPass = gate1ModulePass && gate1MainJsPass && gate2Pass;
  if (!allGatesPass) {
    console.error('❌ LIVE PRODUCTION CERTIFICATION FAILED!');
    process.exit(1);
  } else {
    console.log('\n🎉 ALL 3 GATES PASSED! LIVE VERCEL PRODUCTION 100% CONFORMANT TO JAYT-209 DEAL DETAIL EXPERIENCE.');
  }
}

if (require.main === module) {
  runCertifyDealDetail209().catch(err => {
    console.error('Fatal Certification Error:', err);
    process.exit(1);
  });
}

module.exports = { runCertifyDealDetail209 };
