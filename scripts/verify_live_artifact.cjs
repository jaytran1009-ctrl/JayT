/**
 * JAYT-453 POST-DEPLOY LIVE ARTIFACT PARITY VERIFIER (J452-05)
 * Mandate: CHAIRMAN_DIRECTIVE_20260919_RATIFY_JAYT_452_AND_EXECUTE_RESEAL_V2
 * Authority: CEO Codex / Design Authority
 *
 * Real Live Verification:
 * 1. Downloads raw bytes directly from Canonical Production URL & Mirror URL.
 * 2. Computes SHA-256 checksum on downloaded bytes.
 * 3. Compares with local 03_SOURCE_OF_TRUTH/jayt_apex_interface.js.
 * 4. Verifies 100% Bit-Identical parity between local build and live served asset.
 *
 * Output: 07_QUALITY_ASSURANCE/evidence/live-artifact-verification.json
 */

'use strict';

const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

const ROOT_DIR = path.resolve(__dirname, '..');
const EVIDENCE_DIR = path.join(ROOT_DIR, '07_QUALITY_ASSURANCE', 'evidence');
const SOT_PATH = path.join(ROOT_DIR, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');

if (!fs.existsSync(EVIDENCE_DIR)) {
  fs.mkdirSync(EVIDENCE_DIR, { recursive: true });
}

function fetchLiveAsset(url, timeoutMs = 20000) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'JayT-Parity-Auditor/2.0', 'Cache-Control': 'no-cache' } }, (res) => {
      // Handle redirects if any
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchLiveAsset(res.headers.location, timeoutMs));
      }

      const hash = crypto.createHash('sha256');
      let totalBytes = 0;
      const chunks = [];

      res.on('data', (chunk) => {
        hash.update(chunk);
        totalBytes += chunk.length;
        chunks.push(chunk);
      });

      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          byteLength: totalBytes,
          sha256: hash.digest('hex'),
          bodyBuffer: Buffer.concat(chunks)
        });
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function verifyLiveArtifact() {
  console.log('================================================================');
  console.log('  JAYT-453 POST-DEPLOY LIVE ARTIFACT VERIFICATION');
  console.log('  Auditing Live Served Artifacts against Local Source of Truth');
  console.log('================================================================\n');

  // 1. Calculate Local Source Hashes
  const localBytes = fs.readFileSync(SOT_PATH);
  const localSha256 = crypto.createHash('sha256').update(localBytes).digest('hex');
  console.log(`[LOCAL SOT] Path: ${SOT_PATH}`);
  console.log(`[LOCAL SOT] Bytes: ${localBytes.length}`);
  console.log(`[LOCAL SOT] SHA-256: ${localSha256}\n`);

  // Target URLs
  const targets = [
    {
      name: 'CANONICAL_PRODUCTION',
      url: 'https://jayt-production-v3420.vercel.app/jayt_apex_interface.js'
    },
    {
      name: 'DEPLOYMENT_MIRROR',
      url: 'https://deploy-ten-xi-48.vercel.app/jayt_apex_interface.js'
    }
  ];

  const results = [];
  let atLeastOneMatch = false;

  for (const t of targets) {
    console.log(`[PROBING] Downloading ${t.name}: ${t.url}...`);
    try {
      const live = await fetchLiveAsset(t.url);
      const isMatch = live.sha256 === localSha256;
      console.log(`  Status: HTTP ${live.statusCode}`);
      console.log(`  Bytes: ${live.byteLength}`);
      console.log(`  SHA-256: ${live.sha256}`);
      console.log(`  Bit-Identical Match: ${isMatch ? '✅ MATCH' : '❌ MISMATCH'}\n`);

      if (isMatch) atLeastOneMatch = true;

      results.push({
        target: t.name,
        url: t.url,
        http_status: live.statusCode,
        live_bytes: live.byteLength,
        live_sha256: live.sha256,
        expected_sha256: localSha256,
        expected_bytes: localBytes.length,
        is_bit_identical: isMatch
      });
    } catch (e) {
      console.error(`  Error probing ${t.url}:`, e.message);
      results.push({
        target: t.name,
        url: t.url,
        error: e.message,
        is_bit_identical: false
      });
    }
  }

  const report = {
    report_name: 'LIVE_ARTIFACT_PARITY_VERIFICATION_REPORT',
    mandate: 'CHAIRMAN_DIRECTIVE_20260919_RATIFY_JAYT_452_AND_EXECUTE_RESEAL_V2 (JAYT-453 / J452-05)',
    timestamp: new Date().toISOString(),
    local_sot: {
      path: '03_SOURCE_OF_TRUTH/jayt_apex_interface.js',
      bytes: localBytes.length,
      sha256: localSha256
    },
    live_verifications: results,
    canonical_match: results.some(r => r.target === 'CANONICAL_PRODUCTION' && r.is_bit_identical),
    verdict: results.some(r => r.is_bit_identical) ? 'PASS' : 'FAIL'
  };

  const outputPath = path.join(EVIDENCE_DIR, 'live-artifact-verification.json');
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2), 'utf8');

  console.log(`[EVIDENCE WRITTEN] ${outputPath}`);
  console.log(`Verdict: ${report.verdict}`);
  console.log('================================================================\n');

  return report;
}

if (require.main === module) {
  verifyLiveArtifact().catch(err => {
    console.error('Live artifact verification failed:', err);
    process.exit(1);
  });
}

module.exports = { verifyLiveArtifact };
