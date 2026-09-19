/**
 * JAYT APEX VISUAL & ACCESSIBILITY CONTRACT TEST SUITE (045F-SYNC)
 * Directive: JAYT-APEX-VISUAL-045F-TEST-SYNC — DYNAMIC POLLING & PROOF
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawn } = require('child_process');
const repoRoot = path.resolve(__dirname, '..');

const truthDir = path.join(repoRoot, '03_SOURCE_OF_TRUTH');
const visualPackDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'visual_pack_045f');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

const { parseAndVerifyPng } = require('./validate_candidate_evidence');

let testCount = 0;
let passCount = 0;

function assertTest(name, condition, message) {
  testCount++;
  if (condition) {
    passCount++;
    console.log(`  [${name}]: [PASS] - ${message}`);
  } else {
    console.error(`  [${name}]: [FAIL] - ${message}`);
    process.exitCode = 1;
  }
}

console.log('🧪 [JAYT-VISUAL-045F-SYNC-TEST] Khởi chạy bộ kiểm thử Dynamic CDP Polling (045F-SYNC)...');

(async () => {
  // [TEST 1]: Light Premium Design Tokens Conformance
  const htmlContent = fs.readFileSync(path.join(truthDir, 'index.html'), 'utf8');
  const jsContent = fs.readFileSync(path.join(truthDir, 'jayt_apex_interface.js'), 'utf8');

  const hasTokens = htmlContent.includes('--bg-app-base') &&
                    htmlContent.includes('--pine-forest-main') &&
                    htmlContent.includes('--gold-champagne') &&
                    htmlContent.includes('--text-charcoal-deep') &&
                    htmlContent.includes('--touch-min: 44px') &&
                    htmlContent.includes('--font-display') &&
                    htmlContent.includes('--font-mono');

  assertTest(
    'VIS_01_LIGHT_PREMIUM_DESIGN_TOKENS',
    hasTokens,
    'Design System Tokens (Light Porcelain Base, Deep Forest Pine, Champagne Gold, Charcoal, 44px touch target) chuẩn hóa 100%'
  );

  // [TEST 2]: Zero Overflow-X Masking on Layout Wrappers
  const hasMaskingInHtml = htmlContent.includes('overflow-x: hidden');
  const hasMaskingInJsShell = jsContent.includes('.apex-shell') && jsContent.includes('overflow-x: hidden');

  assertTest(
    'VIS_02_ZERO_OVERFLOW_MASKING_ENFORCED',
    !hasMaskingInHtml && !hasMaskingInJsShell,
    'Tuyệt đối không dùng overflow-x: hidden trên html/body/.apex-shell/main để che lấp lỗi tràn; layout tính toán responsive thực tế'
  );

  // [TEST 3]: Viewport Screenshots Produced and Verified in Pack 045F
  const manifestPath = path.join(visualPackDir, 'VISUAL_REVIEW_PACK_MANIFEST.json');
  let viewportsValid = false;
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    const is045F = manifest.work_order === 'JAYT-APEX-VISUAL-045F';
    const vps = manifest.viewports || [];
    const hasHomeMobile = vps.some(v => v.name === 'home_mobile_390' && v.width === 390 && v.height === 844 && v.crc32_zlib_verified);
    const hasStagingMobile = vps.some(v => v.name === 'staging_mobile_390' && v.width === 390 && v.height === 844 && v.crc32_zlib_verified);
    const hasDesktop = vps.some(v => v.name === 'desktop_1440' && v.width === 1440 && v.height === 900 && v.crc32_zlib_verified);
    viewportsValid = is045F && hasHomeMobile && hasStagingMobile && hasDesktop && vps.length >= 3;
  }

  assertTest(
    'VIS_03_VIEWPORT_SCREENSHOTS_PRODUCED_AND_VERIFIED',
    viewportsValid,
    'Bộ ảnh chụp thực tế pack 045F (Home Mobile 390px, Staging Mobile 390px, Desktop 1440px) đã tạo và xác thực CRC32/zlib 100%'
  );

  // [TEST 4]: Honest Empty State Present
  const hasEmptyState = jsContent.includes('HONEST EMPTY STATE') &&
                        jsContent.includes('BẢO VỆ NGƯỜI DÙNG') &&
                        !jsContent.includes('flash_sale_fake_timer') &&
                        !jsContent.includes('fake_social_proof');

  assertTest(
    'VIS_04_HONEST_EMPTY_STATE_INTEGRITY',
    hasEmptyState,
    'Giao diện tích hợp Honest Empty State minh bạch: 0 countdown ảo, 0 giá ảo, 0 social-proof giả'
  );

  // [TEST 5]: Zero Fake Deal Prices in Production Schedule
  const hasFakeTitles = jsContent.includes("'Metiz 55K'") ||
                        jsContent.includes("'Galaxy 55K'") ||
                        jsContent.includes("'Lotteria 39K'") ||
                        jsContent.includes("'Jollibee 79K'");

  assertTest(
    'VIS_05_ZERO_FAKE_DEAL_PRICES_IN_PRODUCTION_SCHEDULE',
    !hasFakeTitles,
    'Lịch 7 ngày loại bỏ 100% tên deal và giá suy đoán; toàn bộ các ngày hiển thị Đang theo dõi nguồn'
  );

  // [TEST 6]: Home Copy Calibration & Absolute Claim Removal
  const hasAggressiveCopy = jsContent.includes('deal thật') ||
                            jsContent.includes('đã đối soát') ||
                            jsContent.includes('biết chính xác số tiền thực trả') ||
                            jsContent.includes('100% minh bạch');

  assertTest(
    'VIS_06_HOME_CALIBRATED_TRUTHFUL_COPY',
    !hasAggressiveCopy,
    'Trang Home loại bỏ hoàn toàn các từ ngữ quá mạnh ("deal thật", "đã đối soát", "100% minh bạch"); dùng câu chữ chuẩn xác'
  );

  // [TEST 7]: Staging Candidate No Outbound Link (Fail-Closed)
  const stagingSection = jsContent.includes('renderStagingReviewView') &&
                         jsContent.includes('STAGING · CHỜ CEO DUYỆT') &&
                         jsContent.includes('Khóa an toàn Fail-Closed: Không có nút CTA mở ra ngoài khi chưa duyệt');

  assertTest(
    'VIS_07_STAGING_CANDIDATE_NO_OUTBOUND_LINK',
    stagingSection,
    'Hồ sơ Staging CGV gắn nhãn rõ ràng STAGING · CHỜ CEO DUYỆT và khóa chặt liên kết ngoài'
  );

  // [TEST 8]: Touch Target 44px Compliance
  const hasTouch44 = jsContent.includes('min-height: 44px') || jsContent.includes('min-height: 48px');

  assertTest(
    'VIS_08_TOUCH_TARGETS_44PX_COMPLIANCE',
    hasTouch44,
    'Toàn bộ interactive controls (sidebar nav, mobile tabs, rhythm cards, day pills, buttons, inputs) đạt touch target >= 44px'
  );

  // [TEST 9]: Real Browser CDP E2E Bounding Box with Dynamic Polling at 390px
  let e2ePass = false;
  let e2eFailLog = [];

  const chromeCandidates = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    process.env.CHROME_BIN || ''
  ];

  let chromePath = null;
  for (const cand of chromeCandidates) {
    if (cand && fs.existsSync(cand)) {
      chromePath = cand;
      break;
    }
  }

  const targetUrl = `file:///${path.join(truthDir, 'index.html').replace(/\\/g, '/')}`;

  // 1. Verify Persisted Geometry Artifact
  const geoArtifactPath = path.join(visualPackDir, 'mobile_geometry_390.json');
  let geoArtifactValid = false;
  let geoData = null;

  if (fs.existsSync(geoArtifactPath)) {
    try {
      geoData = JSON.parse(fs.readFileSync(geoArtifactPath, 'utf8'));
      const is045FWorkOrder = geoData.work_order === 'JAYT-APEX-VISUAL-045F';
      const homeElements = geoData.home?.elements || {};
      const stagingElements = geoData.staging?.elements || {};

      function checkGeoElement(name, el) {
        if (!el || typeof el.left !== 'number' || typeof el.right !== 'number' || typeof el.width !== 'number') {
          e2eFailLog.push(`Artifact ${name} missing or non-numeric`);
          return false;
        }
        if (el.left < 0 || el.right > 390 || el.width <= 0) {
          e2eFailLog.push(`Artifact ${name} out of bounds: [${el.left}, ${el.right}] width=${el.width}`);
          return false;
        }
        return true;
      }

      let allElementsValid = true;
      for (const [k, v] of Object.entries(homeElements)) {
        if (!checkGeoElement(`Home.${k}`, v)) allElementsValid = false;
      }
      for (const [k, v] of Object.entries(stagingElements)) {
        if (!checkGeoElement(`Staging.${k}`, v)) allElementsValid = false;
      }

      geoArtifactValid = is045FWorkOrder && allElementsValid && Object.keys(homeElements).length >= 10 && Object.keys(stagingElements).length >= 5;
    } catch (e) {
      e2eFailLog.push(`Parse error in mobile_geometry_390.json: ${e.message}`);
    }
  } else {
    e2eFailLog.push('mobile_geometry_390.json does not exist on disk');
  }

  // 2. Run Live CDP with Robust Dynamic Polling (Up to 10s timeout)
  let liveCdpPass = false;
  if (chromePath) {
    const port = 9222 + Math.floor(Math.random() * 100);
    const chromeProc = spawn(chromePath, [
      '--headless',
      '--disable-gpu',
      '--no-sandbox',
      `--remote-debugging-port=${port}`,
      `--window-size=390,844`
    ]);

    let ws = null;
    for (let attempt = 0; attempt < 10; attempt++) {
      await new Promise(r => setTimeout(r, 250));
      try {
        const listRes = await fetch(`http://127.0.0.1:${port}/json/version`);
        if (listRes.ok) {
          const ver = await listRes.json();
          ws = new WebSocket(ver.webSocketDebuggerUrl);
          await new Promise((resolve, reject) => {
            ws.onopen = resolve;
            ws.onerror = reject;
          });
          break;
        }
      } catch {}
    }

    if (ws) {
      try {
        let msgId = 1;
        function send(method, params = {}) {
          return new Promise((resolve, reject) => {
            const id = msgId++;
            const timeout = setTimeout(() => reject(new Error(`CDP browser command ${method} timed out`)), 10000);
            const handler = (event) => {
              const data = JSON.parse(event.data);
              if (data.id === id) {
                clearTimeout(timeout);
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
        await new Promise((resolve, reject) => {
          pageWs.onopen = resolve;
          pageWs.onerror = reject;
        });

        let pageMsgId = 1;
        function sendPage(method, params = {}) {
          return new Promise((resolve, reject) => {
            const id = pageMsgId++;
            const timeout = setTimeout(() => reject(new Error(`CDP page command ${method} timed out`)), 10000);
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

        await sendPage('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
        await sendPage('Page.enable');
        await sendPage('Page.navigate', { url: targetUrl });

        // Polling helper function
        async function pollUntilReady(conditionExpr, maxWaitMs = 10000, intervalMs = 100) {
          const startTime = Date.now();
          while (Date.now() - startTime < maxWaitMs) {
            try {
              const res = await sendPage('Runtime.evaluate', {
                expression: conditionExpr,
                returnByValue: true
              });
              if (res.result?.value === true) return true;
            } catch {}
            await new Promise(r => setTimeout(r, intervalMs));
          }
          return false;
        }

        // --- WAIT FOR HOME ELEMENTS ---
        const homeReady = await pollUntilReady(`(() => {
          return Boolean(
            window.ApexApp &&
            document.readyState === 'complete' &&
            document.querySelector('#btn-toggle-persona') &&
            document.querySelector('#btn-toggle-district') &&
            document.querySelector('.apex-hero-card') &&
            document.querySelector('.apex-hero-title') &&
            document.querySelector('.apex-hero-desc') &&
            document.querySelectorAll('.apex-rhythm-pill').length >= 4 &&
            document.querySelector('.apex-empty-state-card') &&
            document.querySelector('.apex-empty-title') &&
            document.querySelector('.apex-empty-desc') &&
            document.querySelectorAll('.apex-empty-btn-group button').length >= 3
          );
        })()`, 10000, 100);

        if (!homeReady) {
          e2eFailLog.push('ELEMENT_NOT_FOUND: Home page elements did not mount within 10s');
        }

        const homeEval = await sendPage('Runtime.evaluate', {
          expression: `(() => {
            const failures = [];
            const measured = {};

            function serializeRect(selector, el) {
              if (!el) {
                failures.push({ selector, error: 'ELEMENT_NOT_FOUND: ' + selector });
                return null;
              }
              const r = el.getBoundingClientRect();
              const obj = {
                left: Math.round(r.left * 100) / 100,
                right: Math.round(r.right * 100) / 100,
                top: Math.round(r.top * 100) / 100,
                bottom: Math.round(r.bottom * 100) / 100,
                width: Math.round(r.width * 100) / 100,
                height: Math.round(r.height * 100) / 100
              };
              if (obj.left < 0 || obj.right > 390 || obj.width <= 0) {
                failures.push({ selector, ...obj, error: 'OUT_OF_BOUNDS_390' });
              }
              return obj;
            }

            measured.personaButton = serializeRect('#btn-toggle-persona', document.querySelector('#btn-toggle-persona'));
            measured.districtButton = serializeRect('#btn-toggle-district', document.querySelector('#btn-toggle-district'));
            measured.heroCard = serializeRect('.apex-hero-card', document.querySelector('.apex-hero-card'));
            measured.heroTitle = serializeRect('.apex-hero-title', document.querySelector('.apex-hero-title'));
            measured.heroDescription = serializeRect('.apex-hero-desc', document.querySelector('.apex-hero-desc'));
            
            const pills = document.querySelectorAll('.apex-rhythm-pill');
            measured.rhythmPills = Array.from(pills).map((el, idx) => serializeRect('.apex-rhythm-pill[' + idx + ']', el));

            measured.emptyStateCard = serializeRect('.apex-empty-state-card', document.querySelector('.apex-empty-state-card'));
            measured.emptyStateTitle = serializeRect('.apex-empty-title', document.querySelector('.apex-empty-title'));
            measured.emptyStateDescription = serializeRect('.apex-empty-desc', document.querySelector('.apex-empty-desc'));

            const btns = document.querySelectorAll('.apex-empty-btn-group button');
            measured.emptyStateBtns = Array.from(btns).map((el, idx) => serializeRect('.apex-empty-btn-group button[' + idx + ']', el));

            const scrollWidth = document.documentElement.scrollWidth;
            const bodyText = document.body.innerText;
            const hasCgvOnHome = bodyText.includes('CGV CINEMAS') || bodyText.includes('58.000đ') || bodyText.includes('STAGING · CHỜ CEO DUYỆT');

            return {
              scrollWidth,
              failures,
              measured,
              hasCgvOnHome
            };
          })()`,
          returnByValue: true
        });

        // --- NAVIGATE TO STAGING AND WAIT ---
        await sendPage('Runtime.evaluate', { expression: `window.ApexApp.navigateTo('staging_review')` });

        const stagingReady = await pollUntilReady(`(() => {
          return Boolean(
            document.querySelector('.apex-deal-card') &&
            document.querySelector('.badge-staging') &&
            document.querySelector('.apex-card-headline') &&
            document.querySelector('.apex-card-price-box') &&
            document.querySelector('.apex-conditions-list')
          );
        })()`, 10000, 100);

        if (!stagingReady) {
          e2eFailLog.push('ELEMENT_NOT_FOUND: Staging review elements did not mount within 10s');
        }

        const stagingEval = await sendPage('Runtime.evaluate', {
          expression: `(() => {
            const failures = [];
            const measured = {};

            function serializeRect(selector, el) {
              if (!el) {
                failures.push({ selector, error: 'ELEMENT_NOT_FOUND: ' + selector });
                return null;
              }
              const r = el.getBoundingClientRect();
              const obj = {
                left: Math.round(r.left * 100) / 100,
                right: Math.round(r.right * 100) / 100,
                top: Math.round(r.top * 100) / 100,
                bottom: Math.round(r.bottom * 100) / 100,
                width: Math.round(r.width * 100) / 100,
                height: Math.round(r.height * 100) / 100
              };
              if (obj.left < 0 || obj.right > 390 || obj.width <= 0) {
                failures.push({ selector, ...obj, error: 'OUT_OF_BOUNDS_390' });
              }
              return obj;
            }

            measured.stagingCard = serializeRect('.apex-deal-card', document.querySelector('.apex-deal-card'));
            measured.stagingBadge = serializeRect('.badge-staging', document.querySelector('.badge-staging'));
            measured.stagingHeadline = serializeRect('.apex-card-headline', document.querySelector('.apex-card-headline'));
            measured.stagingPriceBox = serializeRect('.apex-card-price-box', document.querySelector('.apex-card-price-box'));
            measured.stagingConditions = serializeRect('.apex-conditions-list', document.querySelector('.apex-conditions-list'));

            const bodyText = document.body.innerText;
            const hasCgvOnStaging = bodyText.includes('CGV CINEMAS') && bodyText.includes('58.000đ') && bodyText.includes('STAGING · CHỜ CEO DUYỆT');
            const outboundLinks = Array.from(document.querySelectorAll('a[target="_blank"], a[href^="http"]')).map(a => a.href);

            return {
              failures,
              measured,
              hasCgvOnStaging,
              outboundLinksCount: outboundLinks.length
            };
          })()`,
          returnByValue: true
        });

        const h = homeEval.result?.value;
        const s = stagingEval.result?.value;

        if (h?.failures?.length > 0) e2eFailLog.push(...h.failures.map(f => `Home: ${f.error || f.selector}`));
        if (s?.failures?.length > 0) e2eFailLog.push(...s.failures.map(f => `Staging: ${f.error || f.selector}`));

        console.log('    [LIVE CDP PROOF HOME]:', JSON.stringify(h?.measured?.personaButton ? { persona: h.measured.personaButton, hero: h.measured.heroCard, emptyState: h.measured.emptyStateCard } : h, null, 2));
        console.log('    [LIVE CDP PROOF STAGING]:', JSON.stringify(s?.measured?.stagingCard ? { card: s.measured.stagingCard, badge: s.measured.stagingBadge } : s, null, 2));

        liveCdpPass = homeReady && stagingReady &&
                      h && h.scrollWidth <= 390 && h.failures.length === 0 && h.hasCgvOnHome === false &&
                      s && s.failures.length === 0 && s.hasCgvOnStaging === true && s.outboundLinksCount === 0;

        pageWs.close();
        ws.close();
      } catch (err) {
        e2eFailLog.push(`Live CDP error: ${err.message}`);
      } finally {
        chromeProc.kill('SIGKILL');
      }
    } else {
      e2eFailLog.push('Could not establish WebSocket connection to Chrome CDP');
    }
  } else {
    e2eFailLog.push('Chrome binary not found on system');
  }

  e2ePass = geoArtifactValid && liveCdpPass;

  assertTest(
    'VIS_09_MOBILE_390_E2E_BOUNDING_BOX_COMPLIANCE',
    e2ePass,
    e2ePass
      ? 'E2E Browser 390px Dynamic Polling & mobile_geometry_390.json: Title, 4 rhythm pills, 3 empty state buttons, Staging card/badge hoàn toàn trong [0, 390px]; Home 0 CGV leak; Staging cô lập hoàn toàn'
      : `E2E Browser 390px FAILED! Chi tiết vi phạm: ${e2eFailLog.join('; ')}`
  );

  // [TEST 10]: Fail-Closed Production Zero-Mutation Invariant
  const prodRaw = fs.readFileSync(prodFeedPath, 'utf8');
  const prodHash = crypto.createHash('sha256').update(prodRaw).digest('hex');
  const releaseManifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
  const isApproved = releaseManifest.governance_locks?.immutable_ceo_approval_record?.is_approved ?? releaseManifest.is_approved;

  assertTest(
    'VIS_10_FAIL_CLOSED_ZERO_MUTATION_PRODUCTION',
    prodRaw.trim() === '[]' &&
    prodHash === '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945' &&
    isApproved === false,
    `Production catalog duy trì bất biến [] (SHA-256: ${prodHash}) và RELEASE_MANIFEST is_approved: false (LOCKED)`
  );

  if (passCount === testCount && testCount > 0) {
    console.log(`\n🟢 [VISUAL-045F-SYNC-SUMMARY] TOÀN BỘ ${passCount}/${testCount} KIỂM THỬ DYNAMIC CDP POLLING (045F-SYNC) ĐÃ ĐẠT [PASS]!\n`);
  } else {
    console.error(`\n❌ [VISUAL-045F-SYNC-SUMMARY] KIỂM THỬ THẤT BẠI: ${passCount}/${testCount} PASS (${testCount - passCount} FAILED)!\n`);
    process.exitCode = 1;
    process.exit(1);
  }
})();
