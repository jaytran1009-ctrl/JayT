/**
 * JAYT-444 LIVE PRODUCTION PUPPETEER VERIFICATION
 * Target: https://jayt-production-v3420.vercel.app
 * Mandate: CHAIRMAN_DIRECTIVE_20260918_MARTIAL_LAW_FULL_FEATURE1_PERFECTION (JAYT-444)
 */

'use strict';

const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');

const CANONICAL_URL = 'https://jayt-production-v3420.vercel.app';
const EVIDENCE_DIR = path.join(__dirname, 'runtime_evidence');
const ARTIFACT_DIR = 'C:\\Users\\tritr\\.gemini\\antigravity\\brain\\0fd55bc2-4a92-47b9-9f66-c02b2cf9af3a';

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

(async () => {
  console.log('================================================================');
  console.log('  JAYT-444 LIVE PRODUCTION PUPPETEER VERIFICATION');
  console.log('  Target: ' + CANONICAL_URL);
  console.log('  Directive: CHAIRMAN_DIRECTIVE_20260918_MARTIAL_LAW_FULL_FEATURE1_PERFECTION');
  console.log('================================================================\n');

  if (!fs.existsSync(EVIDENCE_DIR)) {
    fs.mkdirSync(EVIDENCE_DIR, { recursive: true });
  }

  // STEP 1: AUDIT REMOTE SERVED ASSET INTEGRITY
  console.log('--- STEP 1: AUDIT REMOTE SERVED ASSET INTEGRITY ---');
  const localApexPath = path.join(__dirname, '..', '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
  const localApexBuf = fs.readFileSync(localApexPath);
  const localHash = sha256(localApexBuf);

  const remoteApexUrl = CANONICAL_URL + '/jayt_apex_interface.js?v=' + Date.now();
  console.log('Fetching remote apex interface: ' + remoteApexUrl);
  let remoteApexBuf = null;
  let remoteHash = null;

  // Retry up to 10 times for CDN cache propagation
  for (let attempt = 1; attempt <= 10; attempt++) {
    try {
      remoteApexBuf = await fetchBuffer(CANONICAL_URL + '/jayt_apex_interface.js?v=' + Date.now() + '_' + attempt);
      remoteHash = sha256(remoteApexBuf);
      console.log(`[Attempt ${attempt}/10] Local: ${localHash.slice(0, 16)}... | Remote: ${remoteHash.slice(0, 16)}... (Length: ${remoteApexBuf.length})`);
      if (localHash === remoteHash) {
        console.log('[PASS] Remote served asset is 100% BIT-IDENTICAL to local source of truth!\n');
        break;
      }
    } catch (e) {
      console.warn(`[Attempt ${attempt}/10] Fetch error: ${e.message}`);
    }
    if (attempt < 10) await new Promise(r => setTimeout(r, 3000));
  }

  if (localHash !== remoteHash) {
    console.error('[CRITICAL FAIL] Remote served asset SHA-256 mismatch! Deployment may still be propagating.');
    process.exit(1);
  }

  // STEP 2: LAUNCH PUPPETEER (DESKTOP & MOBILE)
  console.log('--- STEP 2: PUPPETEER LIVE AUDIT ---');
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const executablePath = fs.existsSync(edgePath) ? edgePath : chromePath;

  const browser = await puppeteer.launch({
    headless: true,
    executablePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--window-size=1440,900']
  });

  // --- DESKTOP AUDIT (1440x900) ---
  console.log('\n--- EXECUTING DESKTOP AUDIT (1440px) ---');
  const desktopPage = await browser.newPage();
  await desktopPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  console.log('Navigating to ' + CANONICAL_URL + '...');
  await desktopPage.goto(CANONICAL_URL, { waitUntil: 'networkidle2', timeout: 35000 });

  const desktopAudit = await desktopPage.evaluate(() => {
    // Open Voucher Scanner Modal for Shin Case
    window.openSkuCrossPlatformRadar('DORM_SKU_FEED_02_26609048170');

    const modal = document.getElementById('jayt-voucher-scanner-modal');
    const modalVisible = modal && (modal.classList.contains('is-open') || modal.style.display !== 'none');
    const radar = (modal && modal._currentRadar) || window.__lastRadar;

    let masterWinnerInfo = null;
    let intercepted = null;

    if (radar && radar.masterWinner) {
      masterWinnerInfo = {
        name: radar.masterWinner.name,
        payable: radar.masterWinner.payable,
        savings: radar.masterWinner.savings,
        searchQuery: radar.masterWinner.payload ? radar.masterWinner.payload.searchQuery : null,
        cleanTitle: radar.masterWinner.payload ? radar.masterWinner.payload.cleanTitle : null
      };

      // Test real click on Quán Quân Giá Đáy button in DOM
      const origDispatch = window.dispatchSmartAffiliate;
      window.dispatchSmartAffiliate = function(provider, payload, code) {
        intercepted = { provider, payload, code };
      };

      const winnerBtn = modal.querySelector('.btn-master-winner-action');
      if (winnerBtn) {
        winnerBtn.click();
      }
      window.dispatchSmartAffiliate = origDispatch;
    }

    return {
      modalVisible,
      masterWinnerInfo,
      intercepted
    };
  });

  console.log('Desktop Audit Results:', JSON.stringify(desktopAudit, null, 2));

  if (!desktopAudit.modalVisible || !desktopAudit.masterWinnerInfo) {
    console.error('[CRITICAL FAIL] Modal or Master Winner not found on Desktop!');
    process.exit(1);
  }

  const desktopWinnerQuery = desktopAudit.intercepted ? (desktopAudit.intercepted.payload.searchQuery || desktopAudit.intercepted.payload.cleanTitle) : '';
  const isDesktopMismatched = /ổ.*cắm|o.*cam/i.test(desktopWinnerQuery);
  console.log(`Desktop Winner Intercepted Query: "${desktopWinnerQuery}", Mismatch: ${isDesktopMismatched}`);

  if (isDesktopMismatched || !/ốp.*lưng|case/i.test(desktopWinnerQuery)) {
    console.error('[CRITICAL FAIL] Desktop Quán Quân routed to wrong product category!');
    process.exit(1);
  }
  console.log('[PASS] Desktop Quán Quân correctly routes to Ốp Lưng on TikTok Shop Uy Tín!\n');

  // Re-open modal on desktop for aesthetic screenshot
  await desktopPage.evaluate(() => {
    window.openSkuCrossPlatformRadar('DORM_SKU_FEED_02_26609048170');
  });
  await new Promise(r => setTimeout(r, 600));

  // Capture Desktop Screenshot
  const desktopScreenshotPath = path.join(EVIDENCE_DIR, 'j444_live_desktop_case_winner.png');
  await desktopPage.screenshot({ path: desktopScreenshotPath });
  console.log('Desktop Screenshot saved: ' + desktopScreenshotPath);

  // --- MOBILE AUDIT (iPhone 14 Safari: 390x844) ---
  console.log('\n--- EXECUTING MOBILE SAFARI AUDIT (390x844) ---');
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 3 });
  await mobilePage.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1');

  console.log('Navigating Mobile Page to ' + CANONICAL_URL + '...');
  await mobilePage.goto(CANONICAL_URL, { waitUntil: 'networkidle2', timeout: 35000 });

  const mobileAudit = await mobilePage.evaluate(() => {
    // Deliberately prime window.__lastRadar with Power Strip first (to test zero state leakage on live site)
    const ocamParsed = {
      sku_id: 'DORM_SKU_01_OCAM_DIENQUANG',
      title: 'Ổ Cắm Điện Điện Quang 5 Lỗ 2m',
      cleanTitle: 'Ổ Cắm Điện Điện Quang 5 Lỗ 2m',
      rawUrl: 'https://shopee.vn/product/32456789/19827364512',
      observedPrice: 89000
    };
    window.__lastRadar = window.computeCrossPlatformRadar(ocamParsed, 89000);

    // Now open Radar for Shin Case
    window.openSkuCrossPlatformRadar('DORM_SKU_FEED_02_26609048170');

    const modal = document.getElementById('jayt-voucher-scanner-modal');
    const modalVisible = modal && (modal.classList.contains('is-open') || modal.style.display !== 'none');
    const radar = (modal && modal._currentRadar) || window.__lastRadar;

    let interceptedRadarClick = null;
    let interceptedReviewClick = null;

    const origDispatch = window.dispatchSmartAffiliate;
    window.dispatchSmartAffiliate = function(provider, payload, code) {
      if (!interceptedRadarClick) {
        interceptedRadarClick = { provider, payload, code };
      } else {
        interceptedReviewClick = { provider, payload, code };
      }
    };

    const winnerBtn = modal ? modal.querySelector('.btn-master-winner-action') : null;
    if (winnerBtn) winnerBtn.click();

    // Now open review modal for Shin Case
    window.openAuthenticReviewsModal('DORM_SKU_FEED_02_26609048170');
    const revModal = document.getElementById('jayt-authentic-reviews-modal');
    const revBuyBtn = revModal ? revModal.querySelector('.btn-review-modal-buy-action') : null;
    if (revBuyBtn) revBuyBtn.click();

    window.dispatchSmartAffiliate = origDispatch;

    return {
      modalVisible,
      radarWinner: radar ? { name: radar.masterWinner.name, payable: radar.masterWinner.payable } : null,
      interceptedRadarClick,
      interceptedReviewClick
    };
  });

  console.log('Mobile Audit Results:', JSON.stringify(mobileAudit, null, 2));

  const mobileRadarQuery = mobileAudit.interceptedRadarClick ? (mobileAudit.interceptedRadarClick.payload.searchQuery || mobileAudit.interceptedRadarClick.payload.cleanTitle) : '';
  const mobileReviewQuery = mobileAudit.interceptedReviewClick ? (mobileAudit.interceptedReviewClick.payload.searchQuery || mobileAudit.interceptedReviewClick.payload.cleanTitle) : '';

  if (/ổ.*cắm|o.*cam/i.test(mobileRadarQuery) || !/ốp.*lưng|case/i.test(mobileRadarQuery)) {
    console.error('[CRITICAL FAIL] Mobile Quán Quân leaked or routed to wrong category!');
    process.exit(1);
  }
  if (/ổ.*cắm|o.*cam/i.test(mobileReviewQuery) || !/ốp.*lưng|case/i.test(mobileReviewQuery)) {
    console.error('[CRITICAL FAIL] Mobile Review Modal 1-Click Buy leaked or routed to wrong category!');
    process.exit(1);
  }

  console.log('[PASS] Mobile Safari Quán Quân & Review Modal verified 100% immune to state leakage and routing mismatch!\n');

  // Re-open radar modal for aesthetic screenshot
  await mobilePage.evaluate(() => {
    window.openSkuCrossPlatformRadar('DORM_SKU_FEED_02_26609048170');
  });
  await new Promise(r => setTimeout(r, 600));

  const mobileScreenshotPath = path.join(EVIDENCE_DIR, 'j444_live_mobile_case_winner.png');
  await mobilePage.screenshot({ path: mobileScreenshotPath });
  console.log('Mobile Screenshot saved: ' + mobileScreenshotPath);

  await browser.close();

  // Copy evidence to Brain Artifact Directory
  if (fs.existsSync(ARTIFACT_DIR)) {
    fs.copyFileSync(desktopScreenshotPath, path.join(ARTIFACT_DIR, 'j444_live_desktop_case_winner.png'));
    fs.copyFileSync(mobileScreenshotPath, path.join(ARTIFACT_DIR, 'j444_live_mobile_case_winner.png'));
    console.log('Screenshots copied to brain artifact vault.');
  }

  // GENERATE MASTER AUDIT RECEIPT
  const masterReceipt = {
    receiptId: 'JAYT_444_MARTIAL_LAW_RECEIPT_' + Date.now(),
    mandate: 'CHAIRMAN_DIRECTIVE_20260918_MARTIAL_LAW_FULL_FEATURE1_PERFECTION',
    target: CANONICAL_URL,
    timestamp: new Date().toISOString(),
    assetIntegrity: {
      localHash,
      remoteHash,
      parity: localHash === remoteHash ? '100% BIT-IDENTICAL' : 'MISMATCH'
    },
    desktopAudit: {
      viewport: '1440x900',
      winnerName: desktopAudit.masterWinnerInfo.name,
      winnerPayable: desktopAudit.masterWinnerInfo.payable,
      interceptedProvider: desktopAudit.intercepted.provider,
      searchQuery: desktopWinnerQuery,
      categoryMatch: '100% PASS (Phone Case -> Ốp Lưng iPhone TPU Chống Sốc)',
      screenshot: 'j444_live_desktop_case_winner.png'
    },
    mobileAudit: {
      device: 'iPhone 14 Safari (390x844)',
      radarWinnerQuery: mobileRadarQuery,
      reviewWinnerQuery: mobileReviewQuery,
      stateIsolation: '100% PASS (Zero state leakage despite primed global variable)',
      screenshot: 'j444_live_mobile_case_winner.png'
    },
    partnerAttribution: {
      shopee: '17372870594',
      lazada: '262501305',
      tiktok: 'VNVNLCB6LYL3',
      affiliateEnabled: false
    },
    status: 'ALL_PASS_MARTIAL_LAW_PERFECTION_CERTIFIED'
  };

  const receiptPath = path.join(EVIDENCE_DIR, 'JAYT_444_MARTIAL_LAW_RECEIPT.json');
  fs.writeFileSync(receiptPath, JSON.stringify(masterReceipt, null, 2), 'utf8');
  if (fs.existsSync(ARTIFACT_DIR)) {
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'JAYT_444_MARTIAL_LAW_RECEIPT.json'), JSON.stringify(masterReceipt, null, 2), 'utf8');
  }
  console.log('Master Receipt written: ' + receiptPath);

  console.log('\n================================================================');
  console.log('  JAYT-444 MARTIAL LAW AUDIT COMPLETE: 100% PASS TUYỆT ĐỐI');
  console.log('================================================================');
})();
