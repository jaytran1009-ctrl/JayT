/**
 * 04_DATA_PIPELINE/capture_jollibee_combos.cjs
 * 
 * JAYT-329 Batch 13: Controlled Single-Run Harvester for 5 Jollibee Combo Leaf Pages
 * 
 * Council Directives:
 * 1. Strictly captures ONLY the 5 Council-approved URLs from BATCH_13_JOLLIBEE_PRODUCTS_SCOPE.json:
 *    - PROD_JOLLIBEE_COMBO_01: https://jollibee.com.vn/cang-cay-cang-m.html
 *    - PROD_JOLLIBEE_COMBO_02: https://jollibee.com.vn/m-t-minh-hit-ha.html
 *    - PROD_JOLLIBEE_COMBO_03: https://jollibee.com.vn/mi-y-so-t-bo-ba-m-1-mie-ng-ga-ra-n-nuo-c-ngo-t.html
 *    - PROD_JOLLIBEE_COMBO_04: https://jollibee.com.vn/combo-an-ngon-th-ga-cho-khu-v-c-mi-n-b-c-1.html
 *    - PROD_JOLLIBEE_COMBO_05: https://jollibee.com.vn/combo-179.html
 * 2. Saves raw response, sanitized headers, HTTP status, actual timestamp, and SHA-256
 *    into a NEW unique run directory under batch_13_policy_ingress_vault. NEVER overwrites old evidence.
 * 3. Strict redirect & challenge guards:
 *    - Uses redirect: 'manual'.
 *    - On 301/302: records Location header and stops; no redirect following.
 *    - On challenge / 403 / 500 / timeout: records error and stops that target; ZERO retries or bypass tricks.
 * 4. Staging & Production boundaries:
 *    - public_approved: false
 *    - render_permitted: false
 * 5. Emits unified JOLLIBEE_COMBOS_CAPTURE_RECEIPT.json.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function sha256Buffer(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

function sanitizeHeaders(rawHeaders) {
  const clean = {};
  if (!rawHeaders) return clean;
  const sensitiveKeys = ['set-cookie', 'authorization', 'cookie', 'x-auth-token', 'proxy-authorization'];
  
  const entries = rawHeaders.entries ? Array.from(rawHeaders.entries()) : Object.entries(rawHeaders);
  for (const [k, v] of entries) {
    const lowerK = k.toLowerCase();
    if (!sensitiveKeys.includes(lowerK)) {
      clean[lowerK] = v;
    } else {
      clean[lowerK] = '[REDACTED_SANITIZED]';
    }
  }
  return clean;
}

async function captureProductPage(candidate, runDir, timeoutMs = 15000) {
  const { candidate_id, item_name, target_url, product_item_id, catalog_product_id } = candidate;
  console.log(`\n[COMBO_CAPTURE] Capturing ${candidate_id} (${item_name})...`);
  console.log(`                Target URL: ${target_url}`);

  const result = {
    candidate_id,
    item_name,
    product_item_id,
    catalog_product_id,
    requested_url: target_url,
    final_url: target_url,
    http_status: null,
    status_text: null,
    is_redirect: false,
    redirect_location: null,
    raw_file: null,
    headers_file: null,
    receipt_file: null,
    raw_sha256: null,
    raw_bytes: 0,
    started_at_utc: new Date().toISOString(),
    captured_at_utc: null,
    success: false,
    error: null
  };

  const controller = new AbortController();
  const timeoutTimer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(target_url, {
      method: 'GET',
      redirect: 'manual', // DO NOT automatically follow arbitrary redirects
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7'
      }
    });

    clearTimeout(timeoutTimer);
    result.captured_at_utc = new Date().toISOString();
    result.http_status = res.status;
    result.status_text = res.statusText;

    const sanitizedHdrs = sanitizeHeaders(res.headers);
    const rawBuffer = Buffer.from(await res.arrayBuffer());
    result.raw_bytes = rawBuffer.length;
    result.raw_sha256 = sha256Buffer(rawBuffer);

    // Check for redirect (3xx)
    if (res.status >= 300 && res.status < 400) {
      result.is_redirect = true;
      result.redirect_location = res.headers.get('location') || null;
      console.log(`[REDIRECT] Status ${res.status} detected. Location: ${result.redirect_location}`);
      console.log(`[GUARD] Strict boundary: will NOT follow redirect to out-of-scope targets.`);
    }

    // Check for server or client errors (4xx, 5xx)
    if (res.status >= 400) {
      result.error = `HTTP_${res.status}: ${res.statusText}`;
      console.error(`[ERROR] Server returned error status: ${result.error}`);
    } else {
      result.success = true;
    }

    // Write files to unique run directory
    const rawFileName = `${candidate_id}.raw.html`;
    const headersFileName = `${candidate_id}.headers.json`;
    const receiptFileName = `${candidate_id}.receipt.json`;

    const rawFilePath = path.join(runDir, rawFileName);
    const headersFilePath = path.join(runDir, headersFileName);
    const receiptFilePath = path.join(runDir, receiptFileName);

    fs.writeFileSync(rawFilePath, rawBuffer);
    fs.writeFileSync(headersFilePath, JSON.stringify(sanitizedHdrs, null, 2), 'utf8');

    result.raw_file = path.relative(process.cwd(), rawFilePath).replace(/\\/g, '/');
    result.headers_file = path.relative(process.cwd(), headersFilePath).replace(/\\/g, '/');
    result.receipt_file = path.relative(process.cwd(), receiptFilePath).replace(/\\/g, '/');

    // Item-level capture receipt
    const itemReceipt = {
      receipt_type: "ITEM_COMBO_CAPTURE_RECEIPT",
      candidate_id,
      item_name,
      product_item_id,
      catalog_product_id,
      target_url,
      http_status: result.http_status,
      is_redirect: result.is_redirect,
      redirect_location: result.redirect_location,
      raw_file: result.raw_file,
      raw_sha256: result.raw_sha256,
      raw_bytes: result.raw_bytes,
      headers_file: result.headers_file,
      started_at_utc: result.started_at_utc,
      captured_at_utc: result.captured_at_utc,
      public_approved: false,
      render_permitted: false,
      success: result.success,
      error: result.error
    };
    fs.writeFileSync(receiptFilePath, JSON.stringify(itemReceipt, null, 2), 'utf8');

    console.log(`[SAVED] Raw body: ${rawFileName} (${result.raw_bytes} bytes, SHA-256: ${result.raw_sha256.slice(0, 16)}...)`);
    console.log(`[SAVED] Sanitized headers: ${headersFileName}`);
    console.log(`[SAVED] Item receipt: ${receiptFileName}`);
  } catch (err) {
    clearTimeout(timeoutTimer);
    result.captured_at_utc = new Date().toISOString();
    result.error = err.name === 'AbortError' ? 'TIMEOUT_15S' : `FETCH_ERROR: ${err.message}`;
    console.error(`[FAILURE] Capture failed for ${candidate_id}: ${result.error}`);
  }

  return result;
}

async function runJollibeeCombosCapture() {
  console.log('=== STARTING CONTROLLED JOLLIBEE COMBOS INGRESS CAPTURE (5 TARGETS) ===');

  const scopePath = path.resolve('04_DATA_PIPELINE/batch_matrix/BATCH_13_JOLLIBEE_PRODUCTS_SCOPE.json');
  if (!fs.existsSync(scopePath)) {
    throw new Error(`Scope file missing at ${scopePath}`);
  }
  const scopeRaw = fs.readFileSync(scopePath);
  const scopeSha = sha256Buffer(scopeRaw);
  const scope = JSON.parse(scopeRaw.toString('utf8'));

  if (!scope.capture_authorized) {
    throw new Error('ABORTED: capture_authorized is false in scope file. Council authorization required.');
  }
  if (scope.public_approved !== false || scope.render_permitted !== false) {
    throw new Error('ABORTED: public_approved or render_permitted must be false.');
  }

  const candidates = scope.candidates || [];
  if (candidates.length !== 5) {
    throw new Error(`ABORTED: Expected exactly 5 candidates, found ${candidates.length}`);
  }

  // Create unique run directory
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const timestampStr = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}_${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}`;
  const runRandom = crypto.randomBytes(3).toString('hex');
  const runId = `run_jollibee_combos_${timestampStr}_${runRandom}`;

  const vaultBaseDir = path.resolve('06_TRUST_AND_EVIDENCE/batch_13_policy_ingress_vault');
  const runDir = path.join(vaultBaseDir, runId);
  fs.mkdirSync(runDir, { recursive: true });
  console.log(`[VAULT] Created unique run vault directory: ${runDir}`);

  const runnerScriptPath = __filename;
  const runnerSha = sha256Buffer(fs.readFileSync(runnerScriptPath));

  // Sequentially capture all 5 targets
  const captureResults = [];
  for (const cand of candidates) {
    const res = await captureProductPage(cand, runDir);
    captureResults.push(res);
  }

  const succeededCount = captureResults.filter(r => r.success).length;
  const failedCount = captureResults.filter(r => !r.success).length;

  const unifiedReceipt = {
    receipt_name: "JOLLIBEE_COMBOS_CAPTURE_RECEIPT",
    run_id: runId,
    vault_directory: path.relative(process.cwd(), runDir).replace(/\\/g, '/'),
    executed_at_utc: now.toISOString(),
    runner: {
      file: path.relative(process.cwd(), runnerScriptPath).replace(/\\/g, '/'),
      sha256: runnerSha
    },
    scope: {
      file: path.relative(process.cwd(), scopePath).replace(/\\/g, '/'),
      sha256: scopeSha,
      version: scope.version
    },
    three_state_guards: {
      response_saved: succeededCount === candidates.length && failedCount === 0,
      policy_content_verified: false,
      publication_approved: false
    },
    targets_count: candidates.length,
    targets_succeeded: succeededCount,
    targets_failed: failedCount,
    all_targets_succeeded: succeededCount === candidates.length && failedCount === 0,
    results: captureResults
  };

  const unifiedReceiptPath = path.join(runDir, 'JOLLIBEE_COMBOS_CAPTURE_RECEIPT.json');
  fs.writeFileSync(unifiedReceiptPath, JSON.stringify(unifiedReceipt, null, 2), 'utf8');

  // Pointer in vaultBaseDir
  const latestReceiptPath = path.join(vaultBaseDir, 'LATEST_JOLLIBEE_COMBOS_CAPTURE_RECEIPT.json');
  fs.writeFileSync(latestReceiptPath, JSON.stringify(unifiedReceipt, null, 2), 'utf8');

  console.log('\n=== JOLLIBEE COMBOS INGRESS CAPTURE COMPLETED ===');
  console.log(`Succeeded: ${succeededCount}/${candidates.length}`);
  console.log(`Failed:    ${failedCount}/${candidates.length}`);
  console.log(`Unified Receipt saved to: ${unifiedReceiptPath}`);
  console.log(`Latest Pointer saved to:  ${latestReceiptPath}`);

  return unifiedReceipt;
}

if (require.main === module) {
  runJollibeeCombosCapture()
    .then((receipt) => {
      if (!receipt.all_targets_succeeded) {
        console.error('One or more combo captures failed.');
        process.exit(1);
      }
      process.exit(0);
    })
    .catch((err) => {
      console.error('FATAL ERROR during Jollibee combos capture:', err.message);
      process.exit(1);
    });
}

module.exports = { runJollibeeCombosCapture, captureProductPage };
