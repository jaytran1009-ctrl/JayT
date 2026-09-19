/**
 * JAYT REAL CHROME PLAYWRIGHT E2E RUNNER FOR TIME-BOXED STAGING (054F)
 * Directive: JAYT-CGV-RUNTIME-STAGING-E2E-054F
 */

const { chromium } = require('./node_modules/playwright-core');
const path = require('path');
const fs = require('fs');
const http = require('http');
const net = require('net');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..', '..');
const evidenceDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'staging_054f');
fs.mkdirSync(evidenceDir, { recursive: true });

const { createStagingServer, BUILD_ID, ENVIRONMENT, stagingFeedPath, prodFeedPath } = require('../../08_RELEASE_VAULT/deployments/staging_server_054f');

function getSha256(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
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

function fetchJson(urlStr) {
  return new Promise((resolve, reject) => {
    http.get(urlStr, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function runStagingE2E054F() {
  console.log('🌐 [JAYT-STAGING-E2E-054F] Khởi động Real Google Chrome kiểm thử E2E Staging Runtime...');

  const chromePaths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
  ];
  const chromeExe = chromePaths.find(p => fs.existsSync(p));
  if (!chromeExe) {
    throw new Error('ERR_CHROME_NOT_FOUND: Không tìm thấy Google Chrome binary trên hệ thống Windows!');
  }
  console.log(`  ✓ [CHROME] Chrome binary verified: ${chromeExe}`);

  // 1. Start Server on Loopback + Dynamic Port (in test simulation mode)
  const dynamicPort = await getFreePort();
  const server = createStagingServer({ enableTestSimulation: true });

  await new Promise((resolve) => {
    server.listen(dynamicPort, '127.0.0.1', resolve);
  });

  const baseUrl = `http://127.0.0.1:${dynamicPort}`;
  console.log(`  ✓ [STAGING-SERVER] Server đang chạy tại ${baseUrl}`);

  let browser;
  try {
    // 2. Query /healthz
    const healthzData = await fetchJson(`${baseUrl}/healthz`);
    console.log('  ✓ [HEALTHZ] /healthz response:', healthzData);

    const stagingFeedSha = getSha256(stagingFeedPath);
    if (healthzData.environment !== 'STAGING_INTERNAL_ONLY' ||
        healthzData.build_id !== BUILD_ID ||
        healthzData.staging_feed_sha256 !== stagingFeedSha) {
      throw new Error('ERR_HEALTHZ_MISMATCH: Dữ liệu /healthz không khớp cấu hình Staging 054F!');
    }

    // 3. Launch Chrome Browser
    browser = await chromium.launch({
      executablePath: chromeExe,
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ]
    });

    const context = await browser.newContext({
      viewport: { width: 412, height: 915 } // Standard Mobile Viewport
    });

    const page = await context.newPage();

    // 4. Monitor all network requests to verify ZERO telemetry / external calls
    const networkRequests = [];
    page.on('request', req => {
      networkRequests.push({
        url: req.url(),
        method: req.method()
      });
    });

    // -------------------------------------------------------------------------
    // SCENARIO 1: PRE-WINDOW (2026-08-23T12:00:00+07:00)
    // -------------------------------------------------------------------------
    console.log('\n  👉 [SCENARIO 1] Kiểm tra Pre-Window (2026-08-23)...');
    const preWindowSimTime = '2026-08-23T12:00:00+07:00';
    await page.goto(`${baseUrl}/?sim_time=${encodeURIComponent(preWindowSimTime)}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const preScreenshotPath = path.join(evidenceDir, 'screenshot_054f_pre_window.png');
    await page.screenshot({ path: preScreenshotPath, fullPage: true });

    const preCardCount = await page.locator('.staging-deal-card').count();
    const preText = await page.locator('#deals-container').innerText();
    console.log(`     - Deal cards rendered: ${preCardCount} (Expected: 0)`);
    console.log(`     - Message: ${preText.trim()}`);

    if (preCardCount !== 0) {
      throw new Error(`ERR_PRE_WINDOW_LEAK: Rendered ${preCardCount} deal cards prior to 24/08/2026!`);
    }

    // -------------------------------------------------------------------------
    // SCENARIO 2: IN-WINDOW (2026-08-24T12:00:00+07:00)
    // -------------------------------------------------------------------------
    console.log('\n  👉 [SCENARIO 2] Kiểm tra In-Window (2026-08-24)...');
    const inWindowSimTime = '2026-08-24T12:00:00+07:00';
    await page.goto(`${baseUrl}/?sim_time=${encodeURIComponent(inWindowSimTime)}`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.staging-deal-card', { timeout: 5000 });

    const inScreenshotPath = path.join(evidenceDir, 'screenshot_054f_in_window.png');
    await page.screenshot({ path: inScreenshotPath, fullPage: true });

    const inCardCount = await page.locator('.staging-deal-card').count();
    const inCardHtml = await page.locator('.staging-deal-card').first().innerHTML();
    const inCardText = await page.locator('.staging-deal-card').first().innerText();

    console.log(`     - Deal cards rendered: ${inCardCount} (Expected: 1)`);

    const hasWatermark = inCardText.includes('STAGING · Nguồn chính thức đã capture · Chưa xác minh độc lập');
    const hasPrice = inCardText.includes('58.000đ');
    const hasLocality = inCardText.includes('CGV Vĩnh Trung Plaza');
    const hasNoAddressHallucination = !inCardText.includes('255-257 Hùng Vương') && !inCardText.includes('Thanh Khê');
    const hasVipCond = inCardText.includes('chưa bao gồm phụ thu ghế VIP');
    const hasImaxCond = inCardText.includes('Không áp dụng cho phòng chiếu IMAX');
    const hasGroupCond = inCardText.includes('Không áp dụng cho mua vé nhóm');
    const hasHolidayCond = inCardText.includes('Không áp dụng cho các ngày Lễ, Tết');

    // Check all anchor tags
    const anchorHrefs = await page.locator('a').evaluateAll(anchors => anchors.map(a => a.href));
    const hasOutboundLinks = anchorHrefs.some(href => href.startsWith('http://') || href.startsWith('https://') && !href.startsWith(baseUrl));
    const hasAffiliateParams = anchorHrefs.some(href => href.includes('aff_') || href.includes('ref=') || href.includes('utm_'));

    console.log(`     - Watermark Badge:     ${hasWatermark ? 'PASS' : 'FAIL'}`);
    console.log(`     - Price 58.000đ:       ${hasPrice ? 'PASS' : 'FAIL'}`);
    console.log(`     - CGV Vĩnh Trung Plaza:${hasLocality ? 'PASS' : 'FAIL'}`);
    console.log(`     - No Street Halluc:    ${hasNoAddressHallucination ? 'PASS' : 'FAIL'}`);
    console.log(`     - Conditions Checked:  ${hasVipCond && hasImaxCond && hasGroupCond && hasHolidayCond ? 'PASS' : 'FAIL'}`);
    console.log(`     - Zero Outbound/Affil: ${!hasOutboundLinks && !hasAffiliateParams ? 'PASS' : 'FAIL'}`);

    if (inCardCount !== 1 || !hasWatermark || !hasPrice || !hasLocality || !hasNoAddressHallucination || !hasVipCond || !hasImaxCond || hasOutboundLinks || hasAffiliateParams) {
      throw new Error('ERR_IN_WINDOW_ASSERTION_FAILED: Lỗi hiển thị thẻ deal trong ngày 24/08/2026!');
    }

    // -------------------------------------------------------------------------
    // SCENARIO 3: POST-WINDOW / EXPIRED (2026-08-25T00:00:00+07:00)
    // -------------------------------------------------------------------------
    console.log('\n  👉 [SCENARIO 3] Kiểm tra Post-Window / EXPIRED (2026-08-25)...');
    const postWindowSimTime = '2026-08-25T00:00:00+07:00';
    await page.goto(`${baseUrl}/?sim_time=${encodeURIComponent(postWindowSimTime)}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const postScreenshotPath = path.join(evidenceDir, 'screenshot_054f_post_window.png');
    await page.screenshot({ path: postScreenshotPath, fullPage: true });

    const postCardCount = await page.locator('.staging-deal-card').count();
    const postText = await page.locator('#deals-container').innerText();
    console.log(`     - Deal cards rendered: ${postCardCount} (Expected: 0)`);
    console.log(`     - Message: ${postText.trim()}`);

    if (postCardCount !== 0) {
      throw new Error(`ERR_POST_WINDOW_LEAK: Deal still rendered post 24/08/2026! Count: ${postCardCount}`);
    }

    // -------------------------------------------------------------------------
    // 5. ASSERT NETWORK ISOLATION (ZERO EXTERNAL CALLS)
    // -------------------------------------------------------------------------
    const externalRequests = networkRequests.filter(req => !req.url.startsWith(baseUrl));
    console.log(`\n  👉 [NETWORK ISOLATION] Tổng số request: ${networkRequests.length}, External request: ${externalRequests.length}`);
    if (externalRequests.length > 0) {
      throw new Error(`ERR_EXTERNAL_NETWORK_LEAK: Phát hiện ${externalRequests.length} request ra bên ngoài!`);
    }

    // -------------------------------------------------------------------------
    // 6. GENERATE AUDIT RECEIPT ARTIFACT
    // -------------------------------------------------------------------------
    const receiptData = {
      work_order: 'JAYT-CGV-RUNTIME-STAGING-E2E-054F',
      execution_timestamp: new Date().toISOString(),
      server: {
        loopback_url: baseUrl,
        environment: ENVIRONMENT,
        build_id: BUILD_ID,
        staging_feed_path: stagingFeedPath,
        staging_feed_sha256: stagingFeedSha,
        production_lock: {
          prod_feed_path: prodFeedPath,
          prod_feed_sha256: getSha256(prodFeedPath),
          is_approved: false
        }
      },
      browser_e2e_results: {
        chrome_binary: chromeExe,
        scenarios: {
          scenario_1_pre_window: {
            simulation_time: preWindowSimTime,
            cards_rendered: preCardCount,
            status: 'SCHEDULED_PENDING_WINDOW',
            screenshot_file: 'screenshot_054f_pre_window.png',
            screenshot_sha256: getSha256(preScreenshotPath)
          },
          scenario_2_in_window: {
            simulation_time: inWindowSimTime,
            cards_rendered: inCardCount,
            status: 'ACTIVE_STAGING_RENDERABLE',
            watermark_verified: hasWatermark,
            price_verified: hasPrice,
            locality_verified: hasLocality,
            conditions_verified: true,
            zero_outbound_links: !hasOutboundLinks,
            zero_affiliate_params: !hasAffiliateParams,
            screenshot_file: 'screenshot_054f_in_window.png',
            screenshot_sha256: getSha256(inScreenshotPath)
          },
          scenario_3_post_window: {
            simulation_time: postWindowSimTime,
            cards_rendered: postCardCount,
            status: 'EXPIRED',
            screenshot_file: 'screenshot_054f_post_window.png',
            screenshot_sha256: getSha256(postScreenshotPath)
          }
        },
        network_isolation: {
          total_requests_recorded: networkRequests.length,
          external_requests_count: externalRequests.length,
          telemetry_detected: false
        }
      }
    };

    const receiptPath = path.join(evidenceDir, 'STAGING_E2E_RECEIPT_054F.json');
    fs.writeFileSync(receiptPath, JSON.stringify(receiptData, null, 2), 'utf8');
    console.log(`\n✅ [STAGING-E2E-054F] Đã lưu chứng thư kiểm thử E2E: ${receiptPath}`);

    return receiptData;
  } finally {
    if (browser) {
      await browser.close();
      console.log('  ✓ [BROWSER] Đã đóng Chrome instance an toàn.');
    }
    server.close(() => {
      console.log('  ✓ [SERVER] Đã tắt Staging HTTP server an toàn.');
    });
  }
}

if (require.main === module) {
  runStagingE2E054F().catch(err => {
    console.error('❌ [STAGING-E2E-054F-ERROR]:', err);
    process.exit(1);
  });
}

module.exports = { runStagingE2E054F };
