/**
 * JAYT-434: AUTOMATED MEDIA ASSET VERIFICATION GATE
 * Mandate: CHAIRMAN_DIRECTIVE_20260918_AUTOMATED_MEDIA_PIPELINE_AND_ZERO_BUG_POLICY
 *
 * Checks:
 * 1. Image Uniqueness: No two distinct products share the same image URL.
 * 2. Distinct Identity: Deal 1 (Móc dán tường), Deal 2 (Hộp đựng giày), Deal 3 (Khăn giấy) must have distinct URLs.
 * 3. Zero Fallback Bleed: No onerror or fallback constant points to TopGia tissue.
 * 4. CDN Reachability: All product images must return HTTP 200 OK.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const APEX_PATH = path.join(__dirname, '..', '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');

if (!fs.existsSync(APEX_PATH)) {
  console.error(`[MEDIA_GATE_FAIL] Apex interface file not found: ${APEX_PATH}`);
  process.exit(1);
}

const content = fs.readFileSync(APEX_PATH, 'utf8');

console.log('================================================================');
console.log('  JAYT-434: AUTOMATED MEDIA ASSET VERIFICATION GATE');
console.log('================================================================');

let passed = true;
const failures = [];

// Helper: HTTP check
async function checkHttp200(url, timeoutMs = 8000) {
  if (url.startsWith('data:')) {
    return { status: 200, isDataUri: true };
  }
  return new Promise((resolve) => {
    try {
      const client = url.startsWith('https') ? https : http;
      const req = client.request(url, {
        method: 'HEAD',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
          'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
        }
      }, (res) => {
        // Follow redirect once if 301/302
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const redirectUrl = res.headers.location;
          const redirectClient = redirectUrl.startsWith('https') ? https : http;
          const req2 = redirectClient.request(redirectUrl, {
            method: 'HEAD',
            headers: { 'User-Agent': 'Mozilla/5.0' }
          }, (res2) => {
            resolve({ status: res2.statusCode, redirected: true });
          });
          req2.on('error', (e) => resolve({ status: 500, error: e.message }));
          req2.setTimeout(timeoutMs, () => { req2.destroy(); resolve({ status: 408, error: 'TIMEOUT' }); });
          req2.end();
        } else {
          resolve({ status: res.statusCode });
        }
      });
      req.on('error', (e) => resolve({ status: 500, error: e.message }));
      req.setTimeout(timeoutMs, () => { req.destroy(); resolve({ status: 408, error: 'TIMEOUT' }); });
      req.end();
    } catch (err) {
      resolve({ status: 500, error: err.message });
    }
  });
}

// 1. EXTRACT FLASH DEALS
let flashMatch = content.match(/const JAYT_FLASH_ARBITRAGE_DEALS_70_80 = (?:Object\.freeze\()?\[([\s\S]*?)\n\]\)?;?/);
if (!flashMatch) {
  console.error('[GATE 1 FAIL] JAYT_FLASH_ARBITRAGE_DEALS_70_80 not found in apex interface!');
  process.exit(1);
}

let flashDeals = [];
try {
  flashDeals = eval('[' + flashMatch[1] + ']');
} catch (e) {
  console.error('[GATE 1 FAIL] Failed to parse JAYT_FLASH_ARBITRAGE_DEALS_70_80:', e.message);
  process.exit(1);
}

console.log(`[EXTRACT] Extracted ${flashDeals.length} Flash Arbitrage Deals.`);

// 2. EXTRACT DORM SKUS & OFFICIAL SHOPEE CDN ASSETS
const cdnMatch = content.match(/const SHOPEE_OFFICIAL_CDN_ASSETS = \{([\s\S]*?)\};/);
if (!cdnMatch) {
  console.error('[GATE 1 FAIL] SHOPEE_OFFICIAL_CDN_ASSETS not found in apex interface!');
  process.exit(1);
}

let cdnAssets = {};
try {
  cdnAssets = eval('({' + cdnMatch[1] + '})');
} catch (e) {
  console.error('[GATE 1 FAIL] Failed to parse SHOPEE_OFFICIAL_CDN_ASSETS:', e.message);
  process.exit(1);
}

console.log(`[EXTRACT] Extracted ${Object.keys(cdnAssets).length} Official Shopee CDN Assets.`);

(async () => {
  console.log('\n--- GATE 1: FLASH ARBITRAGE IMAGE UNIQUENESS ---');
  const seenUrls = new Map();
  for (let i = 0; i < flashDeals.length; i++) {
    const deal = flashDeals[i];
    const url = deal.imageUrl;
    if (!url || typeof url !== 'string' || !url.startsWith('http')) {
      failures.push(`Flash Deal ${i + 1} [${deal.id}] has invalid imageUrl: ${url}`);
      passed = false;
      continue;
    }
    if (seenUrls.has(url)) {
      const prev = seenUrls.get(url);
      failures.push(`DUPLICATE IMAGE URL: Deal "${deal.cleanTitle}" [${deal.id}] duplicates image of "${prev.cleanTitle}" [${prev.id}]: ${url}`);
      passed = false;
    } else {
      seenUrls.set(url, deal);
    }
  }

  if (seenUrls.size === flashDeals.length) {
    console.log(`[PASS] 100% Unique Images: All ${flashDeals.length} flash deals have distinct, dedicated URLs.`);
  } else {
    console.error(`[FAIL] Duplicates detected! ${flashDeals.length - seenUrls.size} duplicate image references found.`);
  }

  console.log('\n--- GATE 2: DEAL 1 / 2 / 3 IDENTITY VERIFICATION ---');
  const deal1 = flashDeals.find(d => d.id === 'FLASH_DEAL_01_MOC_DAN_TUONG');
  const deal2 = flashDeals.find(d => d.id === 'FLASH_DEAL_02_HOP_GIAY_TRONG_SUOT');
  const deal3 = flashDeals.find(d => d.id === 'FLASH_DEAL_03_TOPGIA_TISSUE_MINI');

  if (!deal1 || !deal2 || !deal3) {
    failures.push('One or more of Deal 1, 2, 3 not found in flash deals!');
    passed = false;
  } else {
    const d1_url = deal1.imageUrl;
    const d2_url = deal2.imageUrl;
    const d3_url = deal3.imageUrl;

    const TOPGIA_CDN = 'https://down-vn.img.susercontent.com/file/sg-11134253-824iq-mej832cqxtza25';

    if (d1_url === TOPGIA_CDN) {
      failures.push('CRITICAL BUG: Deal 1 (Móc dán tường) is erroneously using TopGia Tissue image URL!');
      passed = false;
    }
    if (d2_url === TOPGIA_CDN) {
      failures.push('CRITICAL BUG: Deal 2 (Hộp đựng giày) is erroneously using TopGia Tissue image URL!');
      passed = false;
    }
    if (d1_url === d2_url) {
      failures.push('CRITICAL BUG: Deal 1 and Deal 2 have identical image URLs!');
      passed = false;
    }
    if (d3_url !== TOPGIA_CDN) {
      failures.push(`Deal 3 (TopGia Tissue) expected TopGia CDN URL but got: ${d3_url}`);
      passed = false;
    }

    if (d1_url !== TOPGIA_CDN && d2_url !== TOPGIA_CDN && d1_url !== d2_url && d3_url === TOPGIA_CDN) {
      console.log('[PASS] Deal 1 (Móc dán tường) has authentic, distinct image URL.');
      console.log('[PASS] Deal 2 (Hộp đựng giày) has authentic, distinct image URL.');
      console.log('[PASS] Deal 3 (Khăn giấy TopGia) correctly uses authentic TopGia image URL.');
    }
  }

  console.log('\n--- GATE 3: ZERO TOPGIA FALLBACK / ONERROR BLEED ---');
  const lines = content.split('\n');
  const TOPGIA_CDN_HASH = 'sg-11134253-824iq-mej832cqxtza25';
  let invalidBleedCount = 0;

  lines.forEach((line, idx) => {
    const lineNum = idx + 1;
    if (line.includes('onerror') && line.includes(TOPGIA_CDN_HASH)) {
      failures.push(`Bleed in onerror at line ${lineNum}: ${line.trim()}`);
      invalidBleedCount++;
      passed = false;
    }
    if (line.includes('SHOPEE_CDN_FALLBACK_DEFAULT') && line.includes(TOPGIA_CDN_HASH)) {
      failures.push(`Bleed in SHOPEE_CDN_FALLBACK_DEFAULT at line ${lineNum}: ${line.trim()}`);
      invalidBleedCount++;
      passed = false;
    }
  });

  if (invalidBleedCount === 0) {
    console.log('[PASS] Zero TopGia fallback / onerror bleed detected across codebase.');
  } else {
    console.error(`[FAIL] Detected ${invalidBleedCount} lines with TopGia fallback bleed!`);
  }

  console.log('\n--- GATE 4: HTTP 200 REACHABILITY ON CDN (12 FLASH DEALS) ---');
  let flashOkCount = 0;
  for (let i = 0; i < flashDeals.length; i++) {
    const deal = flashDeals[i];
    const res = await checkHttp200(deal.imageUrl);
    if (res.status === 200) {
      flashOkCount++;
      console.log(`  [200 OK] Deal ${String(i + 1).padStart(2, '0')}: [${deal.id}] -> ${deal.imageUrl.substring(0, 70)}`);
    } else {
      failures.push(`HTTP FAIL on Deal ${deal.id} (${deal.cleanTitle}): status ${res.status} on ${deal.imageUrl}`);
      passed = false;
      console.error(`  [FAIL ${res.status}] Deal ${deal.id}: ${deal.imageUrl}`);
    }
  }
  console.log(`[SUMMARY] Flash Deals HTTP 200: ${flashOkCount}/${flashDeals.length}`);

  console.log('\n--- GATE 5: HTTP 200 REACHABILITY ON CDN (20 DORM SKUS) ---');
  const cdnKeys = Object.keys(cdnAssets);
  let cdnOkCount = 0;
  for (let i = 0; i < cdnKeys.length; i++) {
    const key = cdnKeys[i];
    const url = cdnAssets[key];
    const res = await checkHttp200(url);
    if (res.status === 200) {
      cdnOkCount++;
      console.log(`  [200 OK] Dorm SKU ${String(i + 1).padStart(2, '0')}: [${key}] -> ${url.substring(0, 70)}`);
    } else {
      failures.push(`HTTP FAIL on Dorm SKU ${key}: status ${res.status} on ${url}`);
      passed = false;
      console.error(`  [FAIL ${res.status}] Dorm SKU ${key}: ${url}`);
    }
  }
  console.log(`[SUMMARY] Dorm SKUs HTTP 200: ${cdnOkCount}/${cdnKeys.length}`);

  console.log('\n--- GATE 6: REAL PHOTO GALLERY VERIFICATION & REACHABILITY ---');
  const reviewDbMatch = content.match(/const JAYT_AUTHENTIC_PRODUCT_REVIEWS = Object\.freeze\(\{([\s\S]*?)\n\}\);/);
  if (!reviewDbMatch) {
    failures.push('JAYT_AUTHENTIC_PRODUCT_REVIEWS not found in apex interface!');
    passed = false;
  } else {
    let reviewsDb = {};
    try {
      reviewsDb = eval('({' + reviewDbMatch[1] + '})');
    } catch (e) {
      failures.push('Failed to parse JAYT_AUTHENTIC_PRODUCT_REVIEWS: ' + e.message);
      passed = false;
    }

    const reviewKeys = Object.keys(reviewsDb);
    let galleryPhotoCount = 0;
    let galleryHttpOk = 0;
    const checkedUrls = new Map();

    for (const rk of reviewKeys) {
      const rev = reviewsDb[rk];
      if (!rev.realPhotos || !Array.isArray(rev.realPhotos) || rev.realPhotos.length < 4) {
        failures.push(`Review [${rk}] has fewer than 4 real photos!`);
        passed = false;
      }
      for (let pIdx = 0; pIdx < rev.realPhotos.length; pIdx++) {
        const p = rev.realPhotos[pIdx];
        galleryPhotoCount++;
        if (p.icon && !p.url) {
          failures.push(`Mockup emoji detected in [${rk}] photo ${pIdx + 1}!`);
          passed = false;
        }
        if (!p.url || typeof p.url !== 'string' || !p.url.startsWith('http')) {
          failures.push(`Invalid photo URL in [${rk}] photo ${pIdx + 1}: ${p.url}`);
          passed = false;
          continue;
        }
        if (!checkedUrls.has(p.url)) {
          const res = await checkHttp200(p.url);
          checkedUrls.set(p.url, res.status);
          if (res.status === 200) {
            galleryHttpOk++;
            console.log(`  [200 OK] Gallery [${rk}] #${pIdx + 1}: ${p.url.substring(0, 65)}`);
          } else {
            failures.push(`Gallery HTTP FAIL on [${rk}] photo ${pIdx + 1}: status ${res.status} on ${p.url}`);
            passed = false;
            console.error(`  [FAIL ${res.status}] Gallery [${rk}]: ${p.url}`);
          }
        } else {
          const prevStatus = checkedUrls.get(p.url);
          if (prevStatus === 200) galleryHttpOk++;
        }
      }
    }
    console.log(`[SUMMARY] Real Photo Gallery: ${galleryHttpOk}/${galleryPhotoCount} photos HTTP 200, ZERO emoji mockups.`);
  }

  console.log('\n================================================================');
  if (passed && failures.length === 0) {
    console.log('  RESULT: 100% ALL MEDIA VERIFICATION GATES PASSED (BUILD GREEN)');
    console.log('================================================================');
    process.exit(0);
  } else {
    console.error('  RESULT: MEDIA VERIFICATION GATE FAILED (BUILD BREAK)');
    console.error('================================================================');
    failures.forEach((f, idx) => console.error(`  ${idx + 1}. ${f}`));
    process.exit(1);
  }
})();
