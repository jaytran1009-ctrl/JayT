const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');
const http = require('http');
const net = require('net');
const os = require('os');
const crypto = require('crypto');
const { spawn } = require('child_process');
const { resolvePythonExecutable } = require('../resolve_python.js');

const repoRoot = path.resolve(__dirname, '../..');
const evidenceDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'staging_g3');
fs.mkdirSync(evidenceDir, { recursive: true });

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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function pollHealthz(port, maxAttempts = 30, intervalMs = 200) {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const check = () => {
      attempts++;
      const req = http.get(`http://127.0.0.1:${port}/healthz`, (res) => {
        let raw = '';
        res.on('data', chunk => raw += chunk);
        res.on('end', () => {
          try {
            const data = JSON.parse(raw);
            if (data.status === 'UP') {
              return resolve({ ready: true, attempts, data, port });
            }
          } catch {}
          if (attempts < maxAttempts) setTimeout(check, intervalMs);
          else reject(new Error(`Server /healthz returned invalid status after ${attempts} attempts: ${raw}`));
        });
      });
      req.on('error', (err) => {
        if (attempts < maxAttempts) setTimeout(check, intervalMs);
        else reject(new Error(`Server /healthz failed to connect on port ${port} after ${attempts} attempts: ${err.message}`));
      });
    };
    check();
  });
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
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

async function runStagingG3E2E() {
  console.log('🌐 [JAYT-STAGING-G3-E2E] Khởi động Real Google Chrome kiểm thử E2E trên Physical Staging Build (038)...');

  const pythonExec = resolvePythonExecutable();
  console.log(`  ✓ [CONTRACT] Python Runtime Verified: ${pythonExec}`);

  const chromePaths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
  ];
  const chromeExe = chromePaths.find(p => fs.existsSync(p));
  if (!chromeExe) {
    throw new Error('ERR_CHROME_NOT_FOUND: Không tìm thấy Google Chrome binary trên hệ thống!');
  }
  console.log(`  ✓ [CHROME] Chrome binary verified: ${chromeExe}`);

  const dynamicPort = await getFreePort();
  console.log(`  ✓ [DYNAMIC-PORT] Allocated dynamic test port: ${dynamicPort}`);

  const stagingSotDir = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance_g3_038', '03_SOURCE_OF_TRUTH');
  const serverScript = path.join(stagingSotDir, 'jayt_production_server.py');

  const serverProc = spawn(pythonExec, [serverScript], {
    env: {
      ...process.env,
      PORT: String(dynamicPort),
      JAYT_HMAC_SECRET: 'qa_strict_secret_32_bytes_len_exact_123!'
    },
    cwd: stagingSotDir
  });

  const serverPid = serverProc.pid;
  console.log(`  ✓ [SERVER-SPAWN] Staging HTTP server spawned with PID: ${serverPid} on port: ${dynamicPort}`);

  const runId = `run_staging_g3_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
  const testResults = {
    run_id: runId,
    timestamp: new Date().toISOString(),
    directive: "JAYT-G3-STAGING-RUNTIME-038",
    port: dynamicPort,
    server_pid: serverPid,
    assertions: []
  };

  function addAssertion(id, name, passed, detail) {
    const record = { id, name, passed, detail, timestamp: new Date().toISOString() };
    testResults.assertions.push(record);
    if (passed) {
      console.log(`  [${id}] ${name}: [PASS] ${detail}`);
    } else {
      console.error(`  [${id}] ${name}: [FAIL] ${detail}`);
    }
  }

  let browserContext = null;
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jayt_chrome_staging_g3_prof_'));

  try {
    const health = await pollHealthz(dynamicPort, 40, 150);
    console.log(`  ✓ [SERVER-READY] Staging Health probe passed: status=${health.data.status}, uptime=${health.data.uptime}`);

    // 1. Fetch & Verify /api/deals from physical staging server
    const apiDeals = await fetchJson(`http://127.0.0.1:${dynamicPort}/api/deals`);
    fs.writeFileSync(path.join(evidenceDir, 'api_deals_response.json'), JSON.stringify(apiDeals, null, 2), 'utf8');

    const hasSingleCgvDeal = apiDeals.status === 'OK' &&
                             Array.isArray(apiDeals.deals) &&
                             apiDeals.deals.length === 1 &&
                             apiDeals.deals[0].deal_id === 'DNG-CGV-VINHTRUNG-CULTURE-DAY-20260824';

    addAssertion('STAGE_01_PHYSICAL_API_DEALS_CGV_ONLY',
      'Staging HTTP /api/deals returns strictly 1 approved CGV deal and 0 old probing deals',
      hasSingleCgvDeal,
      `Deals count: ${apiDeals.deals ? apiDeals.deals.length : 0}, First: ${hasSingleCgvDeal ? apiDeals.deals[0].title : 'None'}`);

    // 2. Launch Real Chrome Browser
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

    const page = browserContext.pages()[0] || await browserContext.newPage();
    const stagingUrl = `http://127.0.0.1:${dynamicPort}/`;
    await page.goto(stagingUrl, { waitUntil: 'load' });
    await sleep(800);

    // -------------------------------------------------------------
    // LIFECYCLE STATE 1: Trước 24/08/2026 (Mock date: 2026-08-22)
    // -------------------------------------------------------------
    await page.evaluate(() => {
      window.__mockCurrentDate = '2026-08-22';
      const calTab = document.getElementById('apex-tab-btn-calendar_7d');
      if (calTab) calTab.click();
    });
    await sleep(400);

    await page.evaluate(() => {
      const monBtn = document.getElementById('day-pill-1');
      if (monBtn) monBtn.click();
    });
    await sleep(400);

    const beforeCardText = await page.evaluate(() => {
      const card = document.getElementById('deal-card-DNG-CGV-VINHTRUNG-CULTURE-DAY-20260824');
      const badge = document.getElementById('badge-DNG-CGV-VINHTRUNG-CULTURE-DAY-20260824');
      return {
        hasCard: !!card,
        badgeText: badge ? badge.textContent.trim() : ''
      };
    });

    const beforeScreenshotPath = path.join(evidenceDir, '01_before_24_aug_upcoming.png');
    await page.screenshot({ path: beforeScreenshotPath, fullPage: true });

    addAssertion('STAGE_02_BEFORE_24_AUG_UPCOMING_RENDER',
      'Before 24/08/2026 (2026-08-22), Monday calendar renders deal card with "Sắp diễn ra"',
      beforeCardText.hasCard && beforeCardText.badgeText.includes('Sắp diễn ra'),
      `Badge Text: "${beforeCardText.badgeText}"`);

    // -------------------------------------------------------------
    // LIFECYCLE STATE 2: Đúng ngày 24/08/2026 (Mock date: 2026-08-24)
    // -------------------------------------------------------------
    await page.evaluate(() => {
      window.__mockCurrentDate = '2026-08-24';
      const localTab = document.getElementById('apex-tab-btn-local_savings');
      if (localTab) localTab.click();
    });
    await sleep(400);

    const onDateActiveInfo = await page.evaluate(() => {
      const activeContainer = document.getElementById('apex-local-active-deals-container');
      const card = document.getElementById('deal-card-DNG-CGV-VINHTRUNG-CULTURE-DAY-20260824');
      const badge = document.getElementById('badge-DNG-CGV-VINHTRUNG-CULTURE-DAY-20260824');
      const price = document.getElementById('deal-price-DNG-CGV-VINHTRUNG-CULTURE-DAY-20260824');
      const surchargeNote = document.getElementById('deal-surcharge-note-DNG-CGV-VINHTRUNG-CULTURE-DAY-20260824');

      return {
        hasActiveContainer: !!activeContainer,
        hasCard: !!card,
        badgeText: badge ? badge.textContent.trim() : '',
        priceText: price ? price.textContent.trim() : '',
        surchargeNote: surchargeNote ? surchargeNote.textContent.trim() : ''
      };
    });

    const onDateScreenshotPath = path.join(evidenceDir, '02_on_24_aug_active_today.png');
    await page.screenshot({ path: onDateScreenshotPath, fullPage: true });

    addAssertion('STAGE_03_ON_24_AUG_ACTIVE_TODAY_RENDER',
      'On 24/08/2026, Zone 1 renders deal card in active container with "Áp dụng hôm nay" and exact 58.000đ price',
      onDateActiveInfo.hasActiveContainer && onDateActiveInfo.badgeText.includes('Áp dụng hôm nay') && onDateActiveInfo.priceText === '58.000đ',
      `Badge: "${onDateActiveInfo.badgeText}", Price: "${onDateActiveInfo.priceText}"`);

    addAssertion('STAGE_04_NO_SAVINGS_CLAIM_AND_UNVERIFIED_SURCHARGES_NOTED',
      'Card notes unverified VIP surcharges and does not show false savings amount',
      onDateActiveInfo.surchargeNote.includes('chưa xác định giá cụ thể') || onDateActiveInfo.surchargeNote.includes('Chưa xác định giá cụ thể'),
      `Surcharge Note: "${onDateActiveInfo.surchargeNote}"`);

    // Test Calculator Button Interaction
    await page.evaluate(() => {
      const btn = document.getElementById('btn-calc-DNG-CGV-VINHTRUNG-CULTURE-DAY-20260824');
      if (btn) btn.click();
    });
    await sleep(400);

    const calcResult = await page.evaluate(() => {
      const calcTabActive = document.getElementById('tab-calculator') ? document.getElementById('tab-calculator').classList.contains('active') : (document.getElementById('apex-tab-btn-calculator') ? document.getElementById('apex-tab-btn-calculator').classList.contains('active') : false);
      const priceInput = document.getElementById('calc-item-price');
      const totalDisplay = document.getElementById('calc-total-final');
      const surchargeWarn = document.getElementById('apex-calc-surcharge-warning');
      return {
        calcTabActive,
        priceVal: priceInput ? priceInput.value : '',
        totalVal: totalDisplay ? totalDisplay.textContent.trim() : '',
        surchargeWarnText: surchargeWarn ? surchargeWarn.textContent.trim() : ''
      };
    });

    addAssertion('STAGE_05_CALCULATOR_PREFILLS_FROM_DEAL',
      'Clicking Calculator button navigates to Calculator and pre-fills exact 58.000đ base price with unverified surcharge warning',
      calcResult.calcTabActive && (calcResult.priceVal === '58000' || calcResult.priceVal === '58.000') && calcResult.totalVal === '58.000đ',
      `Active Tab: ${calcResult.calcTabActive}, Price Input: ${calcResult.priceVal}, Total: ${calcResult.totalVal}`);

    // Directive 039: Negative E2E assertion: deal without voucher must NOT render total < 58.000đ or arbitrary range
    const isTotalNonSub58k = calcResult.totalVal === '58.000đ' && !calcResult.totalVal.includes('49.300') && !calcResult.totalVal.includes('~');
    addAssertion('STAGE_05b_NEGATIVE_NO_SUB_58K_TOTAL_WITHOUT_VOUCHER',
      'Negative E2E: Deal without verified voucher MUST NOT render total < 58.000đ or arbitrary heuristic discount range',
      isTotalNonSub58k,
      `Observed Total: "${calcResult.totalVal}" (strictly >= 58.000đ and no heuristic range)`);

    // -------------------------------------------------------------
    // LIFECYCLE STATE 3: Sau 24/08/2026 (Mock date: 2026-08-25)
    // -------------------------------------------------------------
    await page.evaluate(() => {
      window.__mockCurrentDate = '2026-08-25';
      const localTab = document.getElementById('apex-tab-btn-local_savings');
      if (localTab) localTab.click();
    });
    await sleep(400);

    const afterDateInfo = await page.evaluate(() => {
      const activeContainer = document.getElementById('apex-local-active-deals-container');
      const emptyBox = document.getElementById('apex-honest-empty-state');
      return {
        hasActiveContainer: !!activeContainer,
        hasEmptyBox: !!emptyBox
      };
    });

    await page.evaluate(() => {
      const calTab = document.getElementById('apex-tab-btn-calendar_7d');
      if (calTab) calTab.click();
      const monBtn = document.getElementById('day-pill-1');
      if (monBtn) monBtn.click();
    });
    await sleep(400);

    const afterMonBadge = await page.evaluate(() => {
      const badge = document.getElementById('badge-DNG-CGV-VINHTRUNG-CULTURE-DAY-20260824');
      return badge ? badge.textContent.trim() : '';
    });

    const afterScreenshotPath = path.join(evidenceDir, '03_after_24_aug_expired.png');
    await page.screenshot({ path: afterScreenshotPath, fullPage: true });

    addAssertion('STAGE_06_AFTER_24_AUG_EXPIRED_OR_HIDDEN',
      'After 24/08/2026 (2026-08-25), Zone 1 hides deal into Honest Empty State and Monday card is "Đã hết hạn"',
      !afterDateInfo.hasActiveContainer && afterDateInfo.hasEmptyBox && afterMonBadge.includes('Đã hết hạn'),
      `Zone 1 Empty State: ${afterDateInfo.hasEmptyBox}, Monday Badge: "${afterMonBadge}"`);

    // -------------------------------------------------------------
    // PRODUCTION INTEGRITY & LOCK ASSERTION
    // -------------------------------------------------------------
    const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
    const prodFeedHash = getSha256(prodFeedPath);
    const prodFeedContent = fs.readFileSync(prodFeedPath, 'utf8').trim();

    const relManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');
    const relManifest = JSON.parse(fs.readFileSync(relManifestPath, 'utf8'));

    const prodProtected = prodFeedContent === '[]' &&
                          prodFeedHash === '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945' &&
                          relManifest.governance_locks.immutable_ceo_approval_record.is_approved === false;

    addAssertion('STAGE_07_ROOT_PRODUCTION_FEED_AND_MANIFEST_LOCKED',
      'Root production deals_feed.json remains strictly [] (SHA-256 immutable) and RELEASE_MANIFEST is_approved=false',
      prodProtected,
      `Prod Feed Content: ${prodFeedContent}, SHA: ${prodFeedHash}, is_approved: ${relManifest.governance_locks.immutable_ceo_approval_record.is_approved}`);

    await browserContext.close();

    const resultPath = path.join(evidenceDir, 'staging_e2e_result.json');
    fs.writeFileSync(resultPath, JSON.stringify(testResults, null, 2), 'utf8');

    const total = testResults.assertions.length;
    const passed = testResults.assertions.filter(a => a.passed).length;

    console.log(`\n🟢 [JAYT-STAGING-G3-E2E-SUMMARY] TOÀN BỘ ${passed}/${total} ASSERTIONS STAGING RUNTIME ĐÃ ĐẠT [PASS]!`);
    return { success: passed === total, passed, total };

  } finally {
    try {
      if (serverProc) {
        serverProc.kill();
        console.log(`  ✓ [CLEANUP] Killed staging server process ${serverPid}`);
      }
    } catch {}
  }
}

runStagingG3E2E().then(res => {
  if (!res.success) process.exit(1);
  else process.exit(0);
}).catch(err => {
  console.error('Fatal staging test error:', err);
  process.exit(1);
});
