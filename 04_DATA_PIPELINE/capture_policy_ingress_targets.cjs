/**
 * 04_DATA_PIPELINE/capture_policy_ingress_targets.cjs
 * 
 * JAYT-329 Batch 13: Controlled Single-Run Policy Ingress Harvester
 * 
 * Council Directives:
 * 1. Strictly captures ONLY the 3 Council-approved URLs from BATCH_13_POLICY_INGRESS_SCOPE.json:
 *    - CGV Membership: https://www.cgv.vn/default/cgv-membership
 *    - Galaxy U22: https://www.galaxycine.vn/u22/
 *    - Jollibee Menu: https://jollibee.com.vn/mon-moi-mon-ngon.html
 * 2. Saves raw responses, sanitized headers, final URLs, HTTP statuses, actual timestamps,
 *    and SHA-256 into a NEW unique run directory under batch_13_policy_ingress_vault.
 *    NEVER overwrites existing evidence.
 * 3. Strict redirect & WAF guards:
 *    - Uses redirect: 'manual'
 *    - On 301/302 redirect: records HTTP status and Location header without following out-of-scope targets.
 *    - On error (403/500/timeout): records and stops that target; ZERO hidden retries or bypass tricks.
 * 4. Staging & Production boundaries:
 *    - public_approved: false
 *    - render_permitted: false
 * 5. Emits unified POLICY_INGRESS_CAPTURE_RECEIPT.json.
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

async function captureTarget(candidate, runDir, timeoutMs = 15000) {
  const { candidate_id, brand_id, brand_name, target_url } = candidate;
  console.log(`\n[INGRESS] Capturing ${brand_id} (${candidate_id})...`);
  console.log(`          Target URL: ${target_url}`);

  const result = {
    candidate_id,
    brand_id,
    brand_name,
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
    const rawFileName = `${brand_id}.raw.html`;
    const headersFileName = `${brand_id}.headers.json`;
    const receiptFileName = `${brand_id}.receipt.json`;

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
      receipt_type: "ITEM_POLICY_INGRESS_RECEIPT",
      candidate_id,
      brand_id,
      brand_name,
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
    console.error(`[FAILURE] Ingress failed for ${brand_id}: ${result.error}`);
  }

  return result;
}

async function runPolicyIngressCapture() {
  console.log('=== STARTING CONTROLLED POLICY INGRESS CAPTURE (BATCH 13) ===');
  
  // 1. Read and validate scope file
  const scopePath = path.resolve('04_DATA_PIPELINE/batch_matrix/BATCH_13_POLICY_INGRESS_SCOPE.json');
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
  if (candidates.length !== 3) {
    throw new Error(`ABORTED: Expected exactly 3 candidates, found ${candidates.length}`);
  }

  // 2. Create unique run directory
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const timestampStr = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}_${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}`;
  const runRandom = crypto.randomBytes(3).toString('hex');
  const runId = `run_${timestampStr}_${runRandom}`;
  
  const vaultBaseDir = path.resolve('06_TRUST_AND_EVIDENCE/batch_13_policy_ingress_vault');
  const runDir = path.join(vaultBaseDir, runId);
  fs.mkdirSync(runDir, { recursive: true });
  console.log(`[VAULT] Created unique run vault directory: ${runDir}`);

  // 3. Capture runner hash
  const runnerScriptPath = __filename;
  const runnerSha = sha256Buffer(fs.readFileSync(runnerScriptPath));

  // 4. Sequentially capture all 3 targets
  const captureResults = [];
  for (const cand of candidates) {
    const res = await captureTarget(cand, runDir);
    captureResults.push(res);
  }

  // 5. Build Unified Policy Ingress Receipt
  const succeededCount = captureResults.filter(r => r.success).length;
  const failedCount = captureResults.filter(r => !r.success).length;

  const unifiedReceipt = {
    receipt_name: "POLICY_INGRESS_CAPTURE_RECEIPT",
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
    staging_guard: {
      public_approved: false,
      render_permitted: false,
      production_deployment_permitted: false
    },
    targets_count: candidates.length,
    targets_succeeded: succeededCount,
    targets_failed: failedCount,
    all_targets_succeeded: succeededCount === candidates.length && failedCount === 0,
    results: captureResults
  };

  const unifiedReceiptPath = path.join(runDir, 'POLICY_INGRESS_CAPTURE_RECEIPT.json');
  fs.writeFileSync(unifiedReceiptPath, JSON.stringify(unifiedReceipt, null, 2), 'utf8');

  // Also write a pointer/latest copy in vaultBaseDir for easy audit reference
  const latestReceiptPath = path.join(vaultBaseDir, 'LATEST_POLICY_INGRESS_RECEIPT.json');
  fs.writeFileSync(latestReceiptPath, JSON.stringify(unifiedReceipt, null, 2), 'utf8');

  console.log('\n=== INGRESS CAPTURE COMPLETED ===');
  console.log(`Succeeded: ${succeededCount}/${candidates.length}`);
  console.log(`Failed:    ${failedCount}/${candidates.length}`);
  console.log(`Unified Receipt saved to: ${unifiedReceiptPath}`);
  console.log(`Latest Pointer saved to:  ${latestReceiptPath}`);

  return unifiedReceipt;
}

if (require.main === module) {
  runPolicyIngressCapture()
    .then((receipt) => {
      if (!receipt.all_targets_succeeded) {
        console.error('One or more ingress targets failed.');
        process.exit(1);
      }
      process.exit(0);
    })
    .catch((err) => {
      console.error('FATAL ERROR during policy ingress capture:', err.message);
      process.exit(1);
    });
}

module.exports = { runPolicyIngressCapture, captureTarget, sanitizeHeaders };
