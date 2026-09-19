/**
 * =============================================================================
 * JAYT REAL CHROME BROWSER E2E TEST RUNNER (PLAYWRIGHT-CORE)
 * WORK ORDER: JAYT-UX-INTEGRATION-035B (Self-Contained Dynamic HTTP & Run Isolation)
 * =============================================================================
 */
const { chromium } = require('playwright-core');
const http = require('http');
const net = require('net');
const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const { spawn } = require('child_process');
const { pathToFileURL } = require('url');

console.log('🌐 [JAYT-PLAYWRIGHT-E2E] Khởi động Real Google Chrome kiểm thử E2E (JAYT-UX-INTEGRATION-035B)...');

const repoRoot = path.resolve(__dirname, '../..');
const evidenceDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence');
const runsDir = path.join(evidenceDir, 'runs');
const screenshotsBaseDir = path.join(evidenceDir, 'screenshots');
const baselineScreenshotsDir = path.join(screenshotsBaseDir, 'baseline_empty');
const canonicalResultFile = path.join(evidenceDir, 'browser_e2e_result.json');
const preflightFailureFile = path.join(evidenceDir, 'browser_e2e_preflight_failure.json');
const serverFailureFile = path.join(evidenceDir, 'browser_e2e_server_failure.json');

const runStartTime = new Date().toISOString();
const runId = `run_playwright_e2e_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
const perRunResultFile = path.join(runsDir, `${runId}.json`);

fs.mkdirSync(evidenceDir, { recursive: true });
fs.mkdirSync(runsDir, { recursive: true });
fs.mkdirSync(baselineScreenshotsDir, { recursive: true });

const assertionResults = [];

function recordAssertion(id, description, passed, detail = '') {
  const result = {
    id: id,
    description: description,
    status: passed ? 'PASS' : 'FAIL',
    detail: detail,
    timestamp: new Date().toISOString()
  };
  assertionResults.push(result);
  console.log(`  [${id}] ${description}: [${passed ? 'PASS' : 'FAIL'}]${detail ? ' ' + detail : ''}`);
  if (!passed) {
    throw new Error(`Assertion failed: [${id}] ${description} - ${detail}`);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getFileSha256(filePath) {
  const data = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(data).digest('hex');
}

function getFreePort() {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.listen(0, '127.0.0.1', () => {
      const port = srv.address().port;
      srv.close(() => resolve(port));
    });
    srv.on('error', reject);
  });
}

async function waitForServerReady(port, maxAttempts = 30, intervalMs = 200) {
  for (let i = 1; i <= maxAttempts; i++) {
    try {
      const res = await new Promise((resolve, reject) => {
        const req = http.get(`http://127.0.0.1:${port}/healthz`, { timeout: 1000 }, (r) => {
          let data = '';
          r.on('data', chunk => data += chunk);
          r.on('end', () => {
            if (r.statusCode === 200) {
              try {
                resolve(JSON.parse(data));
              } catch {
                resolve({ status: 'UP' });
              }
            } else {
              reject(new Error(`HTTP status ${r.statusCode}`));
            }
          });
        });
        req.on('error', reject);
        req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
      });
      if (res && (res.status === 'UP' || res.status === 'OK')) {
        return res;
      }
    } catch (e) {
      await sleep(intervalMs);
    }
  }
  throw new Error(`ERR_SERVER_STARTUP_TIMEOUT: Test HTTP server failed to respond to /healthz on port ${port} after ${maxAttempts * intervalMs}ms`);
}

async function runPlaywrightSuite() {
  let pythonExe = null;
  let chromeExe = null;
  let browserContext = null;
  let serverProc = null;
  let serverPort = null;
  let healthInfo = null;
  let isBrowserLaunched = false;
  let serverStderr = '';
  let serverStdout = '';

  const sandboxDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jayt_sb_pw_'));
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jayt_chrome_pw_prof_'));

  const screenshotsData = {
    baseline_empty: {}
  };

  const initialFeedHash = getFileSha256(path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json'));

  try {
    // -------------------------------------------------------------------------
    // 1. PRE-FLIGHT RESOLUTION (PYTHON & CHROME)
    // -------------------------------------------------------------------------
    try {
      const { resolvePythonExecutable } = require('../resolve_python.js');
      pythonExe = resolvePythonExecutable();
      console.log(`  ✓ [CONTRACT] Python Runtime Verified: ${pythonExe}`);
    } catch (e) {
      const pfError = {
        run_id: runId,
        phase: "PREFLIGHT_PYTHON_RESOLUTION",
        error: e.message,
        timestamp: new Date().toISOString()
      };
      fs.writeFileSync(preflightFailureFile, JSON.stringify(pfError, null, 2), 'utf8');
      console.error('❌ [PREFLIGHT-ERROR] Python resolution failed. Wrote to preflight_failure.json (Preserved previous PASS artifact).');
      throw e;
    }

    const chromePaths = [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
    ];
    chromeExe = chromePaths.find(p => fs.existsSync(p));
    if (!chromeExe) {
      const pfError = {
        run_id: runId,
        phase: "PREFLIGHT_CHROME_RESOLUTION",
        error: "ERR_CHROME_NOT_FOUND: Không tìm thấy Google Chrome binary trên hệ thống!",
        timestamp: new Date().toISOString()
      };
      fs.writeFileSync(preflightFailureFile, JSON.stringify(pfError, null, 2), 'utf8');
      throw new Error('ERR_CHROME_NOT_FOUND: Không tìm thấy Google Chrome binary trên hệ thống!');
    }

    const indexPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'index.html');
    const canonicalFileUrl = pathToFileURL(indexPath).href;

    // -------------------------------------------------------------------------
    // 2. SETUP ISOLATED SANDBOX & ALLOCATE DYNAMIC PORT
    // -------------------------------------------------------------------------
    serverPort = await getFreePort();
    console.log(`  ✓ [DYNAMIC-PORT] Allocated dynamic test port: ${serverPort}`);

    const sbSot = path.join(sandboxDir, '03_SOURCE_OF_TRUTH');
    const sbDealsDir = path.join(sandboxDir, '05_DEAL_AND_AFFILIATE');
    fs.mkdirSync(sbSot, { recursive: true });
    fs.mkdirSync(sbDealsDir, { recursive: true });

    for (const fname of ['jayt_production_server.py', 'jayt_apex_interface.js', 'jayt_eligibility_engine.js', 'index.html']) {
      const srcF = path.join(repoRoot, '03_SOURCE_OF_TRUTH', fname);
      if (fs.existsSync(srcF)) fs.copyFileSync(srcF, path.join(sbSot, fname));
    }
    for (const fname of ['deals_feed.json', 'domain_catalog.json', 'evidence_store.json', 'zone_catalog.json']) {
      const srcF = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', fname);
      if (fs.existsSync(srcF)) fs.copyFileSync(srcF, path.join(sbDealsDir, fname));
    }

    const serverScript = path.join(sbSot, 'jayt_production_server.py');

    // Launch self-contained Python HTTP server on dynamic port
    serverProc = spawn(pythonExe, [serverScript], {
      env: {
        ...process.env,
        PORT: String(serverPort),
        JAYT_PORT: String(serverPort),
        JAYT_HMAC_SECRET: 'qa_strict_secret_32_bytes_len_exact_123!'
      },
      cwd: sbSot
    });

    serverProc.stdout.on('data', d => { serverStdout += d.toString(); });
    serverProc.stderr.on('data', d => { serverStderr += d.toString(); });

    console.log(`  ✓ [SERVER-SPAWN] HTTP server spawned with PID: ${serverProc.pid} on port: ${serverPort}`);

    // Poll /healthz until server is 100% ready
    try {
      healthInfo = await waitForServerReady(serverPort, 30, 150);
      console.log(`  ✓ [SERVER-READY] Health probe passed: status=${healthInfo.status}, uptime=${healthInfo.uptime_seconds}s, build=${healthInfo.active_build_id}`);
    } catch (e) {
      const srvError = {
        run_id: runId,
        phase: "SERVER_STARTUP_HEALTHZ",
        port: serverPort,
        pid: serverProc ? serverProc.pid : null,
        error: e.message,
        stdout: serverStdout,
        stderr: serverStderr,
        timestamp: new Date().toISOString()
      };
      fs.writeFileSync(serverFailureFile, JSON.stringify(srvError, null, 2), 'utf8');
      console.error('❌ [SERVER-ERROR] Server startup failed. Output:', serverStderr || serverStdout);
      throw e;
    }

    // -------------------------------------------------------------------------
    // 3. LAUNCH CHROME BROWSER
    // -------------------------------------------------------------------------
    browserContext = await chromium.launchPersistentContext(userDataDir, {
      executablePath: chromeExe,
      headless: true,
      viewport: { width: 1440, height: 900 },
      args: [
        '--disable-gpu',
        '--no-first-run',
        '--no-default-browser-check',
        '--disable-background-networking',
        '--disable-sync',
        '--disable-default-apps'
      ]
    });
    isBrowserLaunched = true;

    const page = browserContext.pages()[0] || await browserContext.newPage();
    console.log(`  ✓ Browser Context Launched successfully.`);

    // [CDP_00] Canonical URL Match
    await page.goto(canonicalFileUrl, { waitUntil: 'load' });
    const currentInPageUrl = page.url();
    const isStrictUrlEqual = new URL(currentInPageUrl).href.toLowerCase() === new URL(canonicalFileUrl).href.toLowerCase();
    recordAssertion('CDP_00_CANONICAL_URL_MATCH', 'Canonical File URL Match', isStrictUrlEqual, `InPage: ${currentInPageUrl}`);

    // [CDP_01] file:// Protocol Safe Isolation
    let fileSafeOk = false;
    for (let i = 0; i < 15; i++) {
      const isCardRendered = await page.evaluate(() => {
        return Boolean(document.getElementById('jayt-apex') && document.querySelector('.apex-safe-card') && document.querySelectorAll('.apex-deal').length === 0);
      });
      if (isCardRendered) {
        fileSafeOk = true;
        break;
      }
      await sleep(150);
    }
    recordAssertion('CDP_01_FILE_PROTOCOL_SAFE_CARD', 'file:// Protocol Safe Isolation (Safe Card shown)', fileSafeOk);

    // Navigate to HTTP server on dynamic port
    const liveHttpUrl = `http://127.0.0.1:${serverPort}/`;
    console.log(`  ↳ Navigating page to live self-contained HTTP server: ${liveHttpUrl}`);
    await page.goto(liveHttpUrl, { waitUntil: 'domcontentloaded' });
    await sleep(800);

    // [CDP_02] HTTP Baseline Honest Empty State
    let emptyStateMsg = '';
    let httpBaselineOk = false;
    for (let i = 0; i < 25; i++) {
      emptyStateMsg = await page.evaluate(() => {
        const el = document.getElementById('apex-honest-msg-text');
        return el ? el.innerText : '';
      });
      if (emptyStateMsg.includes('Hải Châu') && emptyStateMsg.includes('chưa có deal nào được xác minh')) {
        httpBaselineOk = true;
        break;
      }
      await sleep(150);
    }
    recordAssertion('CDP_02_HTTP_BASELINE_HONEST_EMPTY_STATE', 'HTTP Baseline Honest Empty State in Zone 1', httpBaselineOk, `Msg: "${emptyStateMsg}"`);

    // [CDP_03] Context Selector Dynamic Update
    await page.selectOption('#apex-persona-select', 'student');
    await page.selectOption('#apex-district-select', 'Liên Chiểu');
    await page.click('#trigger-lunch');
    await sleep(300);

    const updatedMsg = await page.evaluate(() => {
      const el = document.getElementById('apex-honest-msg-text');
      return el ? el.innerText : '';
    });
    const isContextUpdated = updatedMsg.includes('Liên Chiểu') && updatedMsg.includes('11:05') && updatedMsg.includes('chưa có deal nào được xác minh');
    recordAssertion('CDP_03_CONTEXT_SELECTOR_DYNAMIC_UPDATE', 'Context Selector dynamically updates Honest Empty State without page reload', isContextUpdated, `UpdatedMsg: "${updatedMsg}"`);

    // [CDP_04] 7-Day Calendar Tab Interaction
    await page.click('#tab-calendar, #apex-tab-btn-calendar_7d, [data-tab="calendar_7d"]');
    await sleep(300);
    await page.click('#day-tab-5, #day-pill-5, [data-day="5"]'); // Click Thứ Sáu
    await sleep(300);

    const calContent = await page.evaluate(() => {
      const el = document.getElementById('apex-calendar-day-content');
      return el ? el.innerText : '';
    });
    const isCalDayOk = calContent.includes('Thứ Sáu') && calContent.includes('Chưa có deal nào được phê duyệt');
    recordAssertion('CDP_04_7D_CALENDAR_INTERACTION', '7-Day Calendar Tab switches and displays 0 verified deals per day', isCalDayOk, `CalText: "${calContent.split('\n')[0]}"`);

    // Click "Lên kế hoạch đi chơi Thứ Sáu" -> navigates to share plan
    await page.click('#apex-btn-plan-with-friends');
    await sleep(300);

    const isNavigatedToShare = await page.evaluate(() => {
      return Boolean(document.getElementById('apex-share-plan-zone'));
    });
    recordAssertion('CDP_04b_PLAN_ACTION_NAVIGATES_TO_SHARE', 'Action from 7-day calendar navigates cleanly to Share Plan zone', isNavigatedToShare);

    // [CDP_05] Online Radar Tab Display
    await page.click('#tab-online, #apex-tab-btn-online_radar, [data-tab="online_radar"]');
    await sleep(300);
    const onlineText = await page.evaluate(() => {
      const el = document.getElementById('apex-online-radar-zone');
      return el ? el.innerText : '';
    });
    const isOnlineOk = onlineText.includes('Shopee') && onlineText.includes('Highlands') && (onlineText.includes('Đang chờ xác minh chứng cứ') || onlineText.includes('Chờ mã xác minh'));
    recordAssertion('CDP_05_ONLINE_RADAR_DISPLAY', 'Online & App Deal Radar displays platforms with transparent status', isOnlineOk);

    // [CDP_06] Calculator Interaction and Formula
    await page.click('#tab-calculator, #apex-tab-btn-calculator, [data-tab="calculator"]');
    await sleep(300);

    const badgeExact = await page.evaluate(() => {
      const el = document.getElementById('apex-calc-status-badge');
      return el ? el.innerText : '';
    });
    const isDefaultExact = badgeExact.includes('TỔNG CHÍNH XÁC ĐÃ XÁC MINH');

    // Toggle to estimated
    await page.click('#btn-calc-estimated, #calc-mode-estimate, [data-mode="estimate"]');
    await sleep(300);
    const badgeEstimated = await page.evaluate(() => {
      const el = document.getElementById('apex-calc-status-badge');
      return el ? el.innerText : '';
    });
    const isToggleEstimated = badgeEstimated.includes('DỰ TOÁN') || badgeEstimated.includes('Chưa thể ước tính') || badgeEstimated.includes('ƯỚC TÍNH');

    // Input item price 200,000
    await page.fill('#calc-item-price', '200000');
    await sleep(300);
    const formulaText = await page.evaluate(() => {
      const el = document.getElementById('apex-calc-formula-text');
      return el ? el.innerText : '';
    });
    const isFormulaUpdated = formulaText.includes('200.000đ');
    recordAssertion('CDP_06_CALCULATOR_MODE_AND_INTERACTION', 'Calculator toggles modes (Exact vs Estimated) and computes formula transparently', isDefaultExact && isToggleEstimated && isFormulaUpdated);

    // [CDP_07] Share Plan Generation and Toast
    await page.click('#tab-share, #apex-tab-btn-share_plan, [data-tab="share_plan"]');
    await sleep(300);
    const sharePreview = await page.evaluate(() => {
      const el = document.getElementById('apex-share-text-preview');
      return el ? el.innerText : '';
    });
    const isSharePreviewValid = sharePreview.includes('Điều kiện cần kiểm tra') && (sharePreview.includes('Thứ') || sharePreview.includes('Culture Day') || sharePreview.includes('CGV'));

    // Click Copy button
    await page.click('#apex-btn-copy-plan');
    await sleep(400);
    const toastText = await page.evaluate(() => {
      const el = document.getElementById('apex-toast');
      return el ? el.innerText : '';
    });
    const isToastShown = toastText.includes('Đã sao chép');
    recordAssertion('CDP_07_SHARE_PLAN_GENERATION_AND_COPY', 'Share Plan generates contextual text and copies via clipboard fallback with toast', isSharePreviewValid && isToastShown, `Toast: "${toastText}"`);

    // [CDP_08] Mobile Touch Targets (>= 43.5px on 390px viewport)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.click('#tab-local, #apex-tab-btn-local_savings, [data-tab="local"]');
    await sleep(400);

    const touchTargetViolations = await page.evaluate(() => {
      const controls = Array.from(document.querySelectorAll('button, select, input, .apex-nav-tab, .apex-trigger-pill'));
      const violations = [];
      for (const el of controls) {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          if (rect.width < 43.5 || rect.height < 43.5) {
            violations.push({
              tag: el.tagName,
              text: (el.innerText || el.value || el.id || '').slice(0, 30),
              w: rect.width,
              h: rect.height
            });
          }
        }
      }
      return violations;
    });
    recordAssertion('CDP_08_MOBILE_TOUCH_TARGETS_43_5PX', 'Mobile Touch Target Compliance (width & height >= 43.5px)', touchTargetViolations.length === 0, touchTargetViolations.length === 0 ? 'All 100% compliant' : `Violations: ${JSON.stringify(touchTargetViolations)}`);

    // [CDP_09] Reduced Motion Support
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await sleep(200);
    const isMotionReduced = await page.evaluate(() => {
      const btn = document.querySelector('.apex-nav-tab');
      if (!btn) return true;
      const comp = window.getComputedStyle(btn);
      return comp.transitionDuration === '0.00001s' || comp.transitionDuration === '0.01ms' || comp.animationDuration === '0.00001s' || comp.animationDuration === '0.01ms' || parseFloat(comp.transitionDuration) <= 0.001;
    });
    recordAssertion('CDP_09_REDUCED_MOTION_SUPPORT', 'Reduced Motion Mode enforced (duration <= 0.001s)', isMotionReduced);

    // [CDP_10] Live Feed Immutability Check
    const finalFeedHash = getFileSha256(path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json'));
    const isFeedUnmutated = (initialFeedHash === finalFeedHash && initialFeedHash === '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945');
    recordAssertion('CDP_10_LIVE_FEED_IMMUTABILITY', 'Live deals_feed.json remains strictly immutable [] (0 mutations)', isFeedUnmutated, `SHA-256: ${finalFeedHash}`);

    // Capture Multi-viewport Baseline Screenshots
    const baseMobileShot = path.join(baselineScreenshotsDir, 'screenshot_baseline_mobile_390.png');
    await page.setViewportSize({ width: 390, height: 844 });
    await sleep(300);
    await page.screenshot({ path: baseMobileShot });

    const baseTabletShot = path.join(baselineScreenshotsDir, 'screenshot_baseline_tablet_768.png');
    await page.setViewportSize({ width: 768, height: 1024 });
    await sleep(300);
    await page.screenshot({ path: baseTabletShot });

    const baseDesktopShot = path.join(baselineScreenshotsDir, 'screenshot_baseline_desktop_1440.png');
    await page.setViewportSize({ width: 1440, height: 900 });
    await sleep(300);
    await page.screenshot({ path: baseDesktopShot });

    screenshotsData.baseline_empty.mobile_390 = {
      path: path.relative(repoRoot, baseMobileShot).replace(/\\/g, '/'),
      sha256: getFileSha256(baseMobileShot)
    };
    screenshotsData.baseline_empty.tablet_768 = {
      path: path.relative(repoRoot, baseTabletShot).replace(/\\/g, '/'),
      sha256: getFileSha256(baseTabletShot)
    };
    screenshotsData.baseline_empty.desktop_1440 = {
      path: path.relative(repoRoot, baseDesktopShot).replace(/\\/g, '/'),
      sha256: getFileSha256(baseDesktopShot)
    };
    recordAssertion('CDP_11_MULTI_VIEWPORT_SCREENSHOTS', 'Captured Mobile, Tablet, Desktop screenshots in baseline_empty/', true);

    console.log('\n🟢 [JAYT-PLAYWRIGHT-E2E-SUMMARY] TOÀN BỘ 13/13 ASSERTIONS TRÌNH DUYỆT ĐÃ ĐẠT [PASS]!');

    const completionData = {
      run_id: runId,
      engine: "GOOGLE_CHROME",
      runner: "PLAYWRIGHT_CORE",
      server_info: {
        port: serverPort,
        pid: serverProc ? serverProc.pid : null,
        health_status: healthInfo ? healthInfo.status : null,
        active_build_id: healthInfo ? healthInfo.active_build_id : null
      },
      start_time: runStartTime,
      completed_at: new Date().toISOString(),
      final_status: "PASSED",
      total_assertions: assertionResults.length,
      passed_assertions: assertionResults.filter(a => a.status === 'PASS').length,
      assertions: assertionResults,
      screenshots: screenshotsData
    };

    // 1. Save per-run artifact
    fs.writeFileSync(perRunResultFile, JSON.stringify(completionData, null, 2), 'utf8');

    // 2. Atomically update latest canonical result file on PASS
    fs.writeFileSync(canonicalResultFile, JSON.stringify(completionData, null, 2), 'utf8');

    // 3. Clean any stale failure markers
    for (const f of [preflightFailureFile, serverFailureFile]) {
      if (fs.existsSync(f)) {
        try { fs.unlinkSync(f); } catch {}
      }
    }

  } catch (err) {
    console.error('❌ [RUNNER-ERROR] Suite execution failed:', err.message);
    const failureData = {
      run_id: runId,
      engine: "GOOGLE_CHROME",
      runner: "PLAYWRIGHT_CORE",
      server_info: {
        port: serverPort,
        pid: serverProc ? serverProc.pid : null
      },
      start_time: runStartTime,
      completed_at: new Date().toISOString(),
      final_status: "FAILED",
      error: err.message,
      assertions: assertionResults
    };
    // Save per-run failure artifact only; DO NOT overwrite canonical result file if preflight/server failed
    fs.writeFileSync(perRunResultFile, JSON.stringify(failureData, null, 2), 'utf8');
    process.exit(1);
  } finally {
    if (serverProc) {
      try {
        serverProc.kill();
      } catch {}
    }
    if (browserContext) {
      await browserContext.close();
    }
    try { fs.rmSync(sandboxDir, { recursive: true, force: true }); } catch {}
    try { fs.rmSync(userDataDir, { recursive: true, force: true }); } catch {}
  }
}

runPlaywrightSuite().then(() => {
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
