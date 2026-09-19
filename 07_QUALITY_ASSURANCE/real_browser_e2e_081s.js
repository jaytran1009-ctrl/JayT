/**
 * JAYT REAL BROWSER CDP E2E & GEOMETRY GATE (081S)
 * Launches real headless Chrome / Edge via Chrome DevTools Protocol (CDP).
 * Tests exact 390px mobile viewport, scrollWidth <= 390px, touch targets >= 44px,
 * real CTA clicking workflow, and captures physical screenshots.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const deployPublicDir = path.join(repoRoot, 'deploy', 'public');
const evidenceDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'e2e_081s');

if (!fs.existsSync(evidenceDir)) {
  fs.mkdirSync(evidenceDir, { recursive: true });
}

// Find browser binary
const possibleBrowserPaths = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
];

let browserPath = null;
for (const p of possibleBrowserPaths) {
  if (fs.existsSync(p)) {
    browserPath = p;
    break;
  }
}

if (!browserPath) {
  console.error('❌ [ERROR] Không tìm thấy Chrome hoặc Edge trên máy!');
  process.exit(1);
}

console.log(`🌐 [REAL-BROWSER-081S] Tìm thấy trình duyệt: ${browserPath}`);

// 1. Static HTTP Server
function startStaticServer(port) {
  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png'
  };

  const server = http.createServer((req, res) => {
    let reqPath = req.url.split('?')[0];
    if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
    const filePath = path.join(deployPublicDir, reqPath);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath);
      const mime = mimeTypes[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': mime });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  });

  return new Promise((resolve) => {
    server.listen(port, '127.0.0.1', () => {
      console.log(`📡 [STATIC-SERVER] Máy chủ local chạy tại http://127.0.0.1:${port}`);
      resolve(server);
    });
  });
}

// 2. CDP Client helper
class CdpClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.msgId = 1;
    this.callbacks = new Map();
    this.events = new Map();
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = () => resolve();
      this.ws.onerror = (err) => reject(err);
      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.id && this.callbacks.has(data.id)) {
          const cb = this.callbacks.get(data.id);
          this.callbacks.delete(data.id);
          if (data.error) cb.reject(data.error);
          else cb.resolve(data.result);
        } else if (data.method) {
          const listeners = this.events.get(data.method) || [];
          listeners.forEach(fn => fn(data.params));
        }
      };
    });
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.msgId++;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  on(event, fn) {
    if (!this.events.has(event)) this.events.set(event, []);
    this.events.get(event).push(fn);
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runRealBrowserSuite() {
  const port = 8089;
  const cdpPort = 9223;
  const server = await startStaticServer(port);

  // Launch headless browser with mobile window size
  const browserProc = spawn(browserPath, [
    '--headless=new',
    `--remote-debugging-port=${cdpPort}`,
    '--disable-gpu',
    '--no-sandbox',
    '--disable-extensions',
    '--window-size=390,844',
    '--user-data-dir=' + path.join(evidenceDir, 'temp_profile_' + Date.now())
  ]);

  let browserClosed = false;
  browserProc.on('exit', () => { browserClosed = true; });

  const cleanup = () => {
    if (!browserClosed) {
      try { browserProc.kill(); } catch (e) {}
    }
    server.close();
  };

  try {
    // Wait for CDP endpoint
    let targetWsUrl = null;
    for (let i = 0; i < 20; i++) {
      await wait(300);
      try {
        const listRes = await new Promise((resolve, reject) => {
          http.get(`http://127.0.0.1:${cdpPort}/json/list`, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => resolve(JSON.parse(body)));
          }).on('error', reject);
        });

        if (Array.isArray(listRes) && listRes.length > 0) {
          const pageTarget = listRes.find(t => t.type === 'page');
          if (pageTarget) {
            targetWsUrl = pageTarget.webSocketDebuggerUrl;
            break;
          }
        }
      } catch (e) {}
    }

    if (!targetWsUrl) {
      throw new Error('Không thể kết nối đến CDP endpoint của trình duyệt!');
    }

    console.log(`🔌 [CDP] Đã kết nối CDP WebSocket: ${targetWsUrl}`);
    const cdp = new CdpClient(targetWsUrl);
    await cdp.connect();

    cdp.on('Runtime.exceptionThrown', (params) => {
      console.error('🚨 [BROWSER-EXCEPTION]:', JSON.stringify(params.exceptionDetails));
    });
    cdp.on('Runtime.consoleAPICalled', (params) => {
      console.log('📝 [BROWSER-CONSOLE]:', params.type, params.args.map(a => a.value || a.description).join(' '));
    });

    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');
    await cdp.send('DOM.enable');

    let pass = 0;
    let fail = 0;

    function assertCheck(name, cond, msg) {
      if (cond) {
        console.log(`  [${name}]: [PASS] - ${msg}`);
        pass++;
      } else {
        console.error(`  [${name}]: [FAIL] - ${msg}`);
        fail++;
      }
    }

    // --- 1. SET MOBILE VIEWPORT 390x844 & NAVIGATE ---
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 3,
      mobile: true,
      screenOrientation: { angle: 0, type: 'portraitPrimary' }
    });
    await cdp.send('Emulation.setUserAgentOverride', {
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
    });

    console.log(`📱 [MOBILE-390PX] Điều hướng tới http://127.0.0.1:${port}/index.html ...`);
    await cdp.send('Page.navigate', { url: `http://127.0.0.1:${port}/index.html` });

    // Wait for App DOM to mount
    let appMounted = false;
    for (let i = 0; i < 30; i++) {
      await wait(150);
      const chk = await cdp.send('Runtime.evaluate', {
        expression: `({
          url: window.location.href,
          readyState: document.readyState,
          bodyHtml: document.body ? document.body.innerHTML : '',
          hasShell: !!document.querySelector('.apex-shell')
        })`,
        returnByValue: true
      });
      if (chk.result && chk.result.value && chk.result.value.hasShell) {
        appMounted = true;
        break;
      }
      if (i === 29) {
        console.log('🔍 [DIAGNOSTIC-DOM]:', JSON.stringify(chk.result ? chk.result.value : chk));
      }
    }

    if (!appMounted) {
      throw new Error('Ứng dụng JayT không thể mount trên DOM (.apex-shell không xuất hiện)!');
    }

    await wait(300);

    // --- 2. MEASURE VIEWPORT & SCROLLWIDTH ---
    const viewportMetrics = await cdp.send('Runtime.evaluate', {
      expression: `({
        innerWidth: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        bodyScrollWidth: document.body.scrollWidth,
        hasHorizontalScroll: document.documentElement.scrollWidth > window.innerWidth
      })`,
      returnByValue: true
    });

    const vMetrics = viewportMetrics.result.value;
    assertCheck('CHECK_01_MOBILE_390PX_NO_HORIZONTAL_OVERFLOW',
      vMetrics.scrollWidth <= 390 && !vMetrics.hasHorizontalScroll,
      `Khung hình 390px: window.innerWidth=${vMetrics.innerWidth}px, scrollWidth=${vMetrics.scrollWidth}px (Không tràn ngang).`
    );

    // --- 3. GEOMETRY AUDIT: ALL VISIBLE BUTTONS, INPUTS, TOUCH TARGETS >= 44PX ---
    const geometryAudit = await cdp.send('Runtime.evaluate', {
      expression: `(() => {
        const interactiveElements = Array.from(document.querySelectorAll('button, input, select, a, .apex-step-pill, .apex-m-tab-btn, .apex-nav-btn'));
        const visibleElements = interactiveElements.filter(el => {
          const rect = el.getBoundingClientRect();
          const style = window.getComputedStyle(el);
          return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
        });

        const items = visibleElements.map(el => {
          const rect = el.getBoundingClientRect();
          const tag = el.tagName.toLowerCase();
          const text = (el.textContent || el.value || el.getAttribute('aria-label') || el.placeholder || '').trim().substring(0, 30);
          const id = el.id || '';
          const cls = el.className || '';
          return {
            tag, id, cls, text,
            width: Math.round(rect.width * 10) / 10,
            height: Math.round(rect.height * 10) / 10,
            top: Math.round(rect.top * 10) / 10,
            left: Math.round(rect.left * 10) / 10,
            meets44px: rect.height >= 43.5 // tolerate 0.5px subpixel rounding
          };
        });

        const violations = items.filter(i => !i.meets44px);
        return {
          totalVisible: items.length,
          violationsCount: violations.length,
          violations: violations,
          items: items
        };
      })()`,
      returnByValue: true
    });

    const geoResult = geometryAudit.result.value;
    assertCheck('CHECK_02_ALL_TOUCH_TARGETS_MIN_44PX',
      geoResult.violationsCount === 0,
      `Đo lường hình học thực tế: ${geoResult.totalVisible} phần tử tương tác hiển thị đạt chuẩn chiều cao >= 44px (${geoResult.violationsCount} vi phạm).`
    );

    // --- 4. REAL CTA CLICK WORKFLOW ---
    console.log('🖱️ [REAL-CTA-FLOW] Bắt đầu thực thi luồng tương tác thực tế...');

    // Click Need 'food'
    await cdp.send('Runtime.evaluate', {
      expression: `document.querySelector('[data-need-id="food"]').click();`
    });
    await wait(200);

    // Click Next to Step 2
    await cdp.send('Runtime.evaluate', {
      expression: `document.querySelector('.btn-next-step[data-next="2"]').click();`
    });
    await wait(300);

    // Fill personal voucher
    const fillResult = await cdp.send('Runtime.evaluate', {
      expression: `(() => {
        const codeIn = document.getElementById('quick-v-code');
        const discIn = document.getElementById('quick-v-discount');
        const minIn = document.getElementById('quick-v-minspend');
        if (!codeIn || !discIn || !minIn) return { success: false, reason: 'Inputs not found' };

        codeIn.value = 'REAL_USER_VOUCHER_25K';
        discIn.value = '25000';
        minIn.value = '60000';

        document.getElementById('btn-quick-save-voucher').click();
        return { success: true };
      })()`,
      returnByValue: true
    });

    await wait(400);

    // Check LocalStorage, DOM labels, and separation
    const stateCheck = await cdp.send('Runtime.evaluate', {
      expression: `(() => {
        const raw = localStorage.getItem('jayt_user_vouchers_080');
        const list = raw ? JSON.parse(raw) : [];
        const savedItem = list.find(v => v.code === 'REAL_USER_VOUCHER_25K');

        // Check DOM rendered badge
        const badgeEl = Array.from(document.querySelectorAll('.apex-badge')).find(b => b.textContent.includes('Tự nhập'));
        const hasNeutralBadge = !!badgeEl && badgeEl.classList.contains('badge-user-entered');

        // Check that personal voucher does NOT appear in verified chip
        const verifiedChipText = document.querySelector('.apex-verified-chip')?.textContent || '';
        const isLeakedToVerified = verifiedChipText.includes('REAL_USER_VOUCHER_25K');

        // Click apply voucher to calc
        const applyBtn = document.querySelector('.btn-apply-voucher-to-calc[data-v-idx="0"]');
        let applySuccess = false;
        if (applyBtn) {
          applyBtn.click();
          applySuccess = true;
        }

        return {
          hasSavedItem: !!savedItem,
          savedItemDiscount: savedItem ? savedItem.discountAmount : 0,
          hasNeutralBadge,
          isLeakedToVerified,
          applySuccess
        };
      })()`,
      returnByValue: true
    });

    await wait(400);

    // Check calculator step after apply
    const calcCheck = await cdp.send('Runtime.evaluate', {
      expression: `(() => {
        const discInput = document.getElementById('step-calc-voucher') || document.getElementById('c-voucher');
        const minInput = document.getElementById('step-calc-minspend') || document.getElementById('c-minspend');
        const calcVal = discInput ? Number(discInput.value) : 0;
        const minVal = minInput ? Number(minInput.value) : 0;
        const isStep3Active = !!document.querySelector('.apex-step-pill.active[data-step="3"]');

        return {
          calcVal,
          minVal,
          isStep3Active
        };
      })()`,
      returnByValue: true
    });

    const sCheck = stateCheck.result ? stateCheck.result.value : {};
    const cCheck = calcCheck.result ? calcCheck.result.value : {};

    assertCheck('CHECK_03_USER_VOUCHER_SAVED_WITH_NEUTRAL_LABEL',
      sCheck.hasSavedItem && sCheck.hasNeutralBadge && sCheck.savedItemDiscount === 25000,
      `Luồng CTA thực tế: Voucher cá nhân 'REAL_USER_VOUCHER_25K' lưu vào localStorage và hiển thị nhãn trung tính USER_ENTERED (Tự nhập).`
    );

    assertCheck('CHECK_04_NO_LEAK_TO_VERIFIED_DEALS_AREA',
      !sCheck.isLeakedToVerified,
      'Ranh giới dữ liệu tuyệt đối: Voucher cá nhân không xuất hiện trong khu vực ưu đãi đã xác thực.'
    );

    assertCheck('CHECK_05_APPLIED_TO_CALCULATOR_STEP_3',
      sCheck.applySuccess && cCheck.isStep3Active && cCheck.calcVal === 25000 && cCheck.minVal === 60000,
      `1-Click áp mã vào Máy Tính: Tự động chuyển Step 3, nạp mức giảm 25.000đ và đơn tối thiểu 60.000đ vào ô tính tiền.`
    );

    // --- 5. CAPTURE MOBILE SCREENSHOT 390x844 ---
    const mobileShot = await cdp.send('Page.captureScreenshot', { format: 'png' });
    const mobileShotPath = path.join(evidenceDir, 'screenshot_mobile_390x844.png');
    fs.writeFileSync(mobileShotPath, Buffer.from(mobileShot.data, 'base64'));
    console.log(`📸 [SCREENSHOT] Đã lưu ảnh chụp màn hình Mobile tại: ${mobileShotPath}`);

    // --- 6. SWITCH TO DESKTOP 1280x800 & CAPTURE DESKTOP SCREENSHOT ---
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 800,
      deviceScaleFactor: 1,
      mobile: false,
      fitWindow: false
    });
    await cdp.send('Emulation.setUserAgentOverride', { userAgent: '' });
    await wait(500);

    const desktopShot = await cdp.send('Page.captureScreenshot', { format: 'png' });
    const desktopShotPath = path.join(evidenceDir, 'screenshot_desktop_1280x800.png');
    fs.writeFileSync(desktopShotPath, Buffer.from(desktopShot.data, 'base64'));
    console.log(`📸 [SCREENSHOT] Đã lưu ảnh chụp màn hình Desktop tại: ${desktopShotPath}`);

    // Save full JSON audit
    const fullAuditReport = {
      timestamp: new Date().toISOString(),
      directive: 'JAYT-081S-REAL-BROWSER-GATE',
      browser: browserPath,
      mobileMetrics: vMetrics,
      geometryAudit: geoResult,
      ctaFlowResults: { ...sCheck, ...cCheck },
      screenshotMobile: path.relative(repoRoot, mobileShotPath),
      screenshotDesktop: path.relative(repoRoot, desktopShotPath),
      verdict: pass > 0 && fail === 0 ? 'ALL_BROWSER_E2E_CHECKS_PASS' : 'FAIL'
    };

    const auditJsonPath = path.join(evidenceDir, 'BROWSER_GEOMETRY_E2E_AUDIT.json');
    fs.writeFileSync(auditJsonPath, JSON.stringify(fullAuditReport, null, 2), 'utf8');

    assertCheck('CHECK_06_AUDIT_REPORT_SAVED',
      fs.existsSync(auditJsonPath),
      `Đã xuất bản báo cáo kiểm toán E2E hình học: ${path.relative(repoRoot, auditJsonPath)}`
    );

    console.log(`\n======================================================`);
    console.log(`🟢 [REAL-BROWSER-081S-SUMMARY] Kết quả kiểm thử trình duyệt thật: ${pass}/${pass + fail} PASS!\n`);

    cdp.close();
    cleanup();

    if (fail > 0) process.exit(1);
  } catch (err) {
    console.error('❌ [ERROR] Lỗi khi chạy real browser E2E:', err);
    cleanup();
    process.exit(1);
  }
}

runRealBrowserSuite();
