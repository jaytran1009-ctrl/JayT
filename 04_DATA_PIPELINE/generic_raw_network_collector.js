const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const crypto = require('crypto');

/**
 * GENERIC FAIL-CLOSED RAW NETWORK COLLECTOR (JAYT-245 SECTION AG ARCHITECTURE)
 * Complete deletion of sensitive header keys (P0 Data Minimization & Privacy Stripping).
 */

const FORBIDDEN_SENSITIVE_HEADERS = new Set([
  'set-cookie',
  'cookie',
  'authorization',
  'proxy-authorization',
  'x-amz-security-token',
  'x-csrf-token',
  'x-xsrf-token',
  'session',
  'token',
  'www-authenticate'
]);

function pruneSensitiveHeaders(headers) {
  if (!headers || typeof headers !== 'object') return {};
  const cleaned = {};
  for (const [k, v] of Object.entries(headers)) {
    const lowerKey = k.toLowerCase();
    if (!FORBIDDEN_SENSITIVE_HEADERS.has(lowerKey)) {
      cleaned[lowerKey] = v;
    }
  }
  return cleaned;
}

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

function fetchWithRedirects(initialUrl, maxRedirects = 5, redirectChain = []) {
  return new Promise((resolve, reject) => {
    if (redirectChain.length >= maxRedirects) {
      return reject(new Error('Max redirect limit reached'));
    }

    const urlObj = new URL(initialUrl);
    const client = urlObj.protocol === 'https:' ? https : http;

    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      headers: {
        'User-Agent': 'JayT-Provenance-Collector/3.416 (Danang Community Project; Read-Only Audit)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    };

    const req = client.request(options, (res) => {
      redirectChain.push({
        url: initialUrl,
        statusCode: res.statusCode,
        headers: pruneSensitiveHeaders(res.headers),
        timestamp: new Date().toISOString()
      });

      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const nextUrl = new URL(res.headers.location, initialUrl).href;
        res.resume();
        return resolve(fetchWithRedirects(nextUrl, maxRedirects, redirectChain));
      }

      let chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        resolve({
          finalUrl: initialUrl,
          statusCode: res.statusCode,
          headers: pruneSensitiveHeaders(res.headers),
          bodyBuffer: buffer,
          redirectChain: redirectChain
        });
      });
    });

    req.on('error', reject);
    req.setTimeout(12000, () => {
      req.destroy();
      reject(new Error('Request timed out'));
    });
    req.end();
  });
}

async function captureTarget(targetId, targetUrl, outputVaultDir) {
  const startTime = Date.now();
  const startTimeIso = new Date(startTime).toISOString();

  if (!fs.existsSync(outputVaultDir)) {
    fs.mkdirSync(outputVaultDir, { recursive: true });
  }

  console.log(`🌐 [COLLECTOR] Starting raw capture for ${targetId} -> ${targetUrl}`);

  try {
    const result = await fetchWithRedirects(targetUrl);
    const endTime = Date.now();
    const endTimeIso = new Date(endTime).toISOString();

    if (result.statusCode !== 200) {
      throw new Error(`Non-200 HTTP status: ${result.statusCode}`);
    }

    if (!result.bodyBuffer || result.bodyBuffer.length === 0) {
      throw new Error('Empty response body received');
    }

    const hash = sha256(result.bodyBuffer);

    // Save immutable raw bytes payload
    const rawFileName = `RAW_VAULT_${targetId}_${Date.now()}.html`;
    const rawFilePath = path.join(outputVaultDir, rawFileName);
    fs.writeFileSync(rawFilePath, result.bodyBuffer);

    // Save capture receipt with pruned headers (100% stripped of sensitive keys)
    const receipt = {
      receipt_id: `RCPT_RAW_CAPT_${targetId}_${Date.now()}`,
      target_id: targetId,
      target_url: targetUrl,
      final_canonical_url: result.finalUrl,
      collector_clock_start_iso: startTimeIso,
      collector_clock_end_iso: endTimeIso,
      duration_ms: endTime - startTime,
      http_status: result.statusCode,
      content_type: result.headers['content-type'] || 'unknown',
      content_length_bytes: result.bodyBuffer.length,
      raw_sha256: hash,
      raw_artifact_file: rawFileName,
      redirect_chain_steps: result.redirectChain.length,
      redirect_chain: result.redirectChain,
      collector_version: 'v3.416.0',
      privacy_redaction_policy: 'SENSITIVE_HEADERS_COMPLETELY_PRUNED_AG',
      verdict: 'FAIL_CLOSED_RAW_CAPTURE_SUCCESS'
    };

    const receiptFileName = `RECEIPT_CAPT_${targetId}.json`;
    const receiptFilePath = path.join(outputVaultDir, receiptFileName);
    fs.writeFileSync(receiptFilePath, JSON.stringify(receipt, null, 2), 'utf8');

    console.log(`   ✅ Success: ${result.bodyBuffer.length} bytes captured | SHA-256: ${hash}`);
    console.log(`   📄 Saved raw payload -> ${rawFilePath}`);
    console.log(`   📄 Saved pruned receipt -> ${receiptFilePath}`);

    return receipt;
  } catch (err) {
    console.error(`   ❌ Failed capture for ${targetId}: ${err.message}`);
    return {
      target_id: targetId,
      target_url: targetUrl,
      collector_clock_start_iso: startTimeIso,
      collector_clock_end_iso: new Date().toISOString(),
      error: err.message,
      verdict: 'FAIL_CLOSED_CAPTURE_ERROR'
    };
  }
}

module.exports = { captureTarget, fetchWithRedirects, pruneSensitiveHeaders, FORBIDDEN_SENSITIVE_HEADERS };
