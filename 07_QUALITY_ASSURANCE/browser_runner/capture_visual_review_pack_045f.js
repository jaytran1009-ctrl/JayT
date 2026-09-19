/**
 * JAYT APEX VISUAL REVIEW PACK CAPTURE RUNNER (045F)
 * Captures pixel-perfect screenshots and exact geometry using Chrome DevTools Protocol (CDP).
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawn } = require('child_process');
const repoRoot = path.resolve(__dirname, '..', '..');

const { parseAndVerifyPng } = require('../validate_candidate_evidence');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const targetFile = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'index.html');
const targetUrl = `file:///${targetFile.replace(/\\/g, '/')}`;

const outputDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'visual_pack_045f');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('📸 [JAYT-VISUAL-PACK-045F] Khởi động bộ chụp ảnh & đo đạc hình học Chrome CDP (045F)...');
console.log(`🌐 Target File URL: ${targetUrl}`);
console.log(`🚀 Sử dụng Chrome engine: ${chromePath}`);

async function runCapture() {
  const port = 9222 + Math.floor(Math.random() * 100);
  const chromeProc = spawn(chromePath, [
    '--headless',
    '--disable-gpu',
    '--no-sandbox',
    `--remote-debugging-port=${port}`,
    `--window-size=1440,900`
  ]);

  await new Promise(r => setTimeout(r, 1500));

  const manifest = {
    work_order: 'JAYT-APEX-VISUAL-045F',
    captured_at: new Date().toISOString(),
    theme: 'Light Luxury (Porcelain Base + Deep Forest Pine + Champagne Gold)',
    viewports: []
  };

  let geometryProof = null;

  try {
    const listRes = await fetch(`http://127.0.0.1:${port}/json/version`);
    const ver = await listRes.json();
    const ws = new WebSocket(ver.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    let msgId = 1;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const id = msgId++;
        const handler = (event) => {
          const data = JSON.parse(event.data);
          if (data.id === id) {
            ws.removeEventListener('message', handler);
            resolve(data.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    const targetRes = await send('Target.createTarget', { url: targetUrl, width: 390, height: 844 });
    const targetId = targetRes.targetId;
    const pageWsRes = await fetch(`http://127.0.0.1:${port}/json/list`);
    const pages = await pageWsRes.json();
    const pageObj = pages.find(p => p.id === targetId);

    const pageWs = new WebSocket(pageObj.webSocketDebuggerUrl);
    await new Promise(r => pageWs.onopen = r);

    let pageMsgId = 1;
    function sendPage(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = pageMsgId++;
        const timeout = setTimeout(() => reject(new Error(`CDP command ${method} timed out`)), 10000);
        const handler = (event) => {
          const data = JSON.parse(event.data);
          if (data.id === id) {
            clearTimeout(timeout);
            pageWs.removeEventListener('message', handler);
            resolve(data.result);
          }
        };
        pageWs.addEventListener('message', handler);
        pageWs.send(JSON.stringify({ id, method, params }));
      });
    }

    await sendPage('Page.enable');

    // --- 1. HOME MOBILE 390x844 ---
    await sendPage('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
    await sendPage('Page.navigate', { url: targetUrl });
    await new Promise(r => setTimeout(r, 1200));

    // Measure Geometry
    const homeGeoRes = await sendPage('Runtime.evaluate', {
      expression: `(() => {
        function serializeRect(el) {
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return {
            left: Math.round(r.left * 100) / 100,
            right: Math.round(r.right * 100) / 100,
            top: Math.round(r.top * 100) / 100,
            bottom: Math.round(r.bottom * 100) / 100,
            width: Math.round(r.width * 100) / 100,
            height: Math.round(r.height * 100) / 100
          };
        }

        return {
          viewport: { width: 390, height: 844 },
          htmlClientWidth: document.documentElement.clientWidth,
          bodyClientWidth: document.body.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
          elements: {
            personaButton: serializeRect(document.querySelector('#btn-toggle-persona')),
            districtButton: serializeRect(document.querySelector('#btn-toggle-district')),
            heroCard: serializeRect(document.querySelector('.apex-hero-card')),
            heroTitle: serializeRect(document.querySelector('.apex-hero-title')),
            heroDescription: serializeRect(document.querySelector('.apex-hero-desc')),
            rhythmPill0: serializeRect(document.querySelectorAll('.apex-rhythm-pill')[0]),
            rhythmPill1: serializeRect(document.querySelectorAll('.apex-rhythm-pill')[1]),
            rhythmPill2: serializeRect(document.querySelectorAll('.apex-rhythm-pill')[2]),
            rhythmPill3: serializeRect(document.querySelectorAll('.apex-rhythm-pill')[3]),
            emptyStateCard: serializeRect(document.querySelector('.apex-empty-state-card')),
            emptyStateTitle: serializeRect(document.querySelector('.apex-empty-title')),
            emptyStateDescription: serializeRect(document.querySelector('.apex-empty-desc')),
            emptyStateCta0: serializeRect(document.querySelectorAll('.apex-empty-btn-group button')[0]),
            emptyStateCta1: serializeRect(document.querySelectorAll('.apex-empty-btn-group button')[1]),
            emptyStateCta2: serializeRect(document.querySelectorAll('.apex-empty-btn-group button')[2])
          }
        };
      })()`,
      returnByValue: true
    });

    // Capture Home Screenshot
    const homeShot = await sendPage('Page.captureScreenshot', { format: 'png' });
    const homeShotBuf = Buffer.from(homeShot.data, 'base64');
    const homePath = path.join(outputDir, 'jayt_apex_home_mobile_390.png');
    fs.writeFileSync(homePath, homeShotBuf);

    const homeHash = crypto.createHash('sha256').update(homeShotBuf).digest('hex');
    const homeParsed = parseAndVerifyPng(homeShotBuf);
    if (!homeParsed.ok) throw new Error(`Home PNG verify fail: ${homeParsed.message}`);

    console.log(`  [OK] Chụp thành công Home Mobile (390x844) -> jayt_apex_home_mobile_390.png (${homeShotBuf.length} bytes, SHA-256: ${homeHash.slice(0, 12)}...)`);
    manifest.viewports.push({
      name: 'home_mobile_390',
      description: 'Home Mobile Viewport (iPhone 14 standard 390x844)',
      file: 'jayt_apex_home_mobile_390.png',
      path: homePath,
      width: 390,
      height: 844,
      bytes: homeShotBuf.length,
      sha256: homeHash,
      crc32_zlib_verified: true
    });

    // --- 2. STAGING MOBILE 390x844 ---
    const stagingGeoRes = await sendPage('Runtime.evaluate', {
      expression: `(() => {
        window.ApexApp.navigateTo('staging_review');
        function serializeRect(el) {
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return {
            left: Math.round(r.left * 100) / 100,
            right: Math.round(r.right * 100) / 100,
            top: Math.round(r.top * 100) / 100,
            bottom: Math.round(r.bottom * 100) / 100,
            width: Math.round(r.width * 100) / 100,
            height: Math.round(r.height * 100) / 100
          };
        }

        return {
          elements: {
            stagingCard: serializeRect(document.querySelector('.apex-deal-card')),
            stagingBadge: serializeRect(document.querySelector('.badge-staging')),
            stagingHeadline: serializeRect(document.querySelector('.apex-card-headline')),
            stagingPriceBox: serializeRect(document.querySelector('.apex-card-price-box')),
            stagingConditions: serializeRect(document.querySelector('.apex-conditions-list')),
            stagingHashBox: serializeRect(document.querySelector('.apex-deal-card div[style*="background:var(--bg-app-base)"]'))
          }
        };
      })()`,
      returnByValue: true
    });

    // Capture Staging Screenshot
    const stagingShot = await sendPage('Page.captureScreenshot', { format: 'png' });
    const stagingShotBuf = Buffer.from(stagingShot.data, 'base64');
    const stagingPath = path.join(outputDir, 'jayt_apex_staging_mobile_390.png');
    fs.writeFileSync(stagingPath, stagingShotBuf);

    const stagingHash = crypto.createHash('sha256').update(stagingShotBuf).digest('hex');
    const stagingParsed = parseAndVerifyPng(stagingShotBuf);
    if (!stagingParsed.ok) throw new Error(`Staging PNG verify fail: ${stagingParsed.message}`);

    console.log(`  [OK] Chụp thành công Staging Mobile (390x844) -> jayt_apex_staging_mobile_390.png (${stagingShotBuf.length} bytes, SHA-256: ${stagingHash.slice(0, 12)}...)`);
    manifest.viewports.push({
      name: 'staging_mobile_390',
      description: 'Staging Review Mobile Viewport (iPhone 14 standard 390x844)',
      file: 'jayt_apex_staging_mobile_390.png',
      path: stagingPath,
      width: 390,
      height: 844,
      bytes: stagingShotBuf.length,
      sha256: stagingHash,
      crc32_zlib_verified: true
    });

    // Save consolidated geometry JSON
    geometryProof = {
      work_order: 'JAYT-APEX-VISUAL-045F',
      captured_at: new Date().toISOString(),
      viewport: { width: 390, height: 844 },
      home: homeGeoRes.result.value,
      staging: stagingGeoRes.result.value
    };
    const geoPath = path.join(outputDir, 'mobile_geometry_390.json');
    fs.writeFileSync(geoPath, JSON.stringify(geometryProof, null, 2), 'utf8');
    console.log(`  [OK] Đã lưu chứng cứ hình học thực tế: mobile_geometry_390.json`);

    // --- 3. DESKTOP 1440x900 ---
    await sendPage('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await sendPage('Runtime.evaluate', { expression: `window.ApexApp.navigateTo('dashboard')` });
    await new Promise(r => setTimeout(r, 800));

    const desktopShot = await sendPage('Page.captureScreenshot', { format: 'png' });
    const desktopShotBuf = Buffer.from(desktopShot.data, 'base64');
    const desktopPath = path.join(outputDir, 'jayt_apex_desktop_1440.png');
    fs.writeFileSync(desktopPath, desktopShotBuf);

    const desktopHash = crypto.createHash('sha256').update(desktopShotBuf).digest('hex');
    const desktopParsed = parseAndVerifyPng(desktopShotBuf);
    if (!desktopParsed.ok) throw new Error(`Desktop PNG verify fail: ${desktopParsed.message}`);

    console.log(`  [OK] Chụp thành công Desktop Viewport (1440x900) -> jayt_apex_desktop_1440.png (${desktopShotBuf.length} bytes, SHA-256: ${desktopHash.slice(0, 12)}...)`);
    manifest.viewports.push({
      name: 'desktop_1440',
      description: 'Desktop Viewport (MacBook standard 1440x900)',
      file: 'jayt_apex_desktop_1440.png',
      path: desktopPath,
      width: 1440,
      height: 900,
      bytes: desktopShotBuf.length,
      sha256: desktopHash,
      crc32_zlib_verified: true
    });

    pageWs.close();
    ws.close();
  } finally {
    chromeProc.kill('SIGKILL');
  }

  const manifestPath = path.join(outputDir, 'VISUAL_REVIEW_PACK_MANIFEST.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`\n📦 Visual Review Pack Manifest 045F đã lưu tại: ${manifestPath}`);
  console.log('🟢 [JAYT-VISUAL-PACK-045F] HOÀN TẤT CHỤP BỘ ẢNH KIỂM CHỨNG & HÌNH HỌC THỰC TẾ!\n');
}

runCapture().catch(err => {
  console.error('❌ Lỗi khi thực thi capture 045F:', err);
  process.exit(1);
});
