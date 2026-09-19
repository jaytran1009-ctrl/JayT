#!/usr/bin/env node
'use strict';

/**
 * JAYT-272: BATCH 03 SCOPED INTAKE COLLECTOR
 * Governing Scope: 06_TRUST_AND_EVIDENCE/JAYT_BATCH_03_INTAKE_SCOPE.json
 *
 * Rules:
 * - 28 targets from JAYT_BATCH_03_INTAKE_SCOPE.json
 * - Vault: 06_TRUST_AND_EVIDENCE/batch_03_intake_vault/
 * - Ledger untouched (assert SHA a4cdd4...)
 * - Deals feed untouched (assert [])
 * - Zero public approval, zero candidates, zero rendering, zero affiliate, zero production deploy
 * - Sanitized metadata (zero cookies/tokens)
 * - Failed/error URLs are quarantined as INTAKE_FAILED__QUARANTINE
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const SCOPE_PATH = path.join(ROOT, '06_TRUST_AND_EVIDENCE/JAYT_BATCH_03_INTAKE_SCOPE.json');
const LEDGER_PATH = path.join(ROOT, 'JAYT_BATCH_03_READINESS_LEDGER.json');
const FEED_PATH = path.join(ROOT, '05_DEAL_AND_AFFILIATE/deals_feed.json');
const VAULT_DIR = path.join(ROOT, '06_TRUST_AND_EVIDENCE/batch_03_intake_vault');
const MANIFEST_PATH = path.join(VAULT_DIR, 'BATCH_03_INTAKE_MANIFEST.json');

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

async function runIntakeCollector() {
  console.log('========================================================================');
  console.log('🚀 JAYT-272 BATCH 03 INTAKE COLLECTOR');
  console.log('   Execution UTC: ' + new Date().toISOString());
  console.log('========================================================================\n');

  // 1. Verify Scope and Timebox
  if (!fs.existsSync(SCOPE_PATH)) {
    throw new Error('Missing scope file: ' + SCOPE_PATH);
  }
  const scope = JSON.parse(fs.readFileSync(SCOPE_PATH, 'utf8'));
  const now = new Date();
  const closesAt = new Date(scope.closes_at_utc);
  console.log('📅 Timebox Verification:');
  console.log('   Current UTC:   ' + now.toISOString());
  console.log('   Closes at UTC: ' + closesAt.toISOString());
  if (now > closesAt) {
    throw new Error('Timebox expired! Now: ' + now.toISOString() + ' > Closes: ' + closesAt.toISOString());
  }
  console.log('   ✅ Within authorized timebox window.\n');

  // 2. Preflight Invariants Check
  console.log('🔒 Preflight Invariant Assertions:');
  const ledgerBytes = fs.readFileSync(LEDGER_PATH);
  const ledgerHash = sha256(ledgerBytes);
  if (ledgerHash !== scope.source_ledger_sha256) {
    throw new Error('Source ledger hash drift! Expected ' + scope.source_ledger_sha256 + ' but got ' + ledgerHash);
  }
  console.log('   ✓ Source ledger hash matches canonical: ' + ledgerHash);

  const feedContent = fs.readFileSync(FEED_PATH, 'utf8').trim();
  if (feedContent !== '[]') {
    throw new Error('deals_feed.json is not empty array []!');
  }
  console.log('   ✓ deals_feed.json is verified empty []\n');

  // 3. Ensure Vault Directory Exists
  if (!fs.existsSync(VAULT_DIR)) {
    fs.mkdirSync(VAULT_DIR, { recursive: true });
    console.log('📁 Created vault directory: ' + VAULT_DIR);
  }

  // 4. Process all 28 targets
  console.log('📥 Executing read-only intake for ' + scope.targets.length + ' targets...\n');
  const results = [];

  for (let i = 0; i < scope.targets.length; i++) {
    const target = scope.targets[i];
    const targetIdx = `[${i + 1}/${scope.targets.length}]`;
    console.log(`${targetIdx} Processing ${target.target_id} (${target.cluster})...`);
    console.log(`     URL: ${target.authorized_source_url}`);

    const captureStart = new Date().toISOString();
    let captureSuccess = false;
    let httpStatus = null;
    let bodyHash = null;
    let byteSize = 0;
    let bodyFileName = null;
    let sanitizedHeaders = {};
    let errorMsg = null;

    try {
      const response = await fetch(target.authorized_source_url, {
        method: 'GET',
        credentials: 'omit',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7'
        },
        signal: AbortSignal.timeout(8000)
      });

      httpStatus = response.status;
      const rawHeaders = Object.fromEntries(response.headers.entries());

      // Sanitize headers: redact any cookies/tokens
      for (const [k, v] of Object.entries(rawHeaders)) {
        const lower = k.toLowerCase();
        if (lower.includes('cookie') || lower.includes('token') || lower.includes('auth')) {
          // Redacted
        } else {
          sanitizedHeaders[lower] = v;
        }
      }

      if (httpStatus >= 200 && httpStatus < 400) {
        const arrayBuf = await response.arrayBuffer();
        const rawBuffer = Buffer.from(arrayBuf);
        byteSize = rawBuffer.length;
        bodyHash = sha256(rawBuffer);
        bodyFileName = `${target.target_id}.raw.html`;

        const bodyFilePath = path.join(VAULT_DIR, bodyFileName);
        fs.writeFileSync(bodyFilePath, rawBuffer);

        captureSuccess = true;
        console.log(`     ✅ INGESTED: HTTP ${httpStatus} | ${byteSize} B | SHA: ${bodyHash.slice(0, 16)}...`);
      } else {
        errorMsg = `HTTP status ${httpStatus}`;
        console.log(`     ⚠️ QUARANTINED: HTTP status ${httpStatus}`);
      }
    } catch (err) {
      errorMsg = err.name === 'TimeoutError' ? 'Request timed out after 8000ms' : err.message;
      console.log(`     ⚠️ QUARANTINED: ${errorMsg}`);
    }

    if (!captureSuccess) {
      // Write quarantine stub
      const quarantineData = {
        target_id: target.target_id,
        cluster: target.cluster,
        source_url: target.authorized_source_url,
        quarantined_at_utc: captureStart,
        http_status: httpStatus,
        reason: errorMsg,
        intake_status: 'INTAKE_FAILED__QUARANTINE',
        candidate_status: 'NOT_A_CANDIDATE',
        public_approved: false
      };
      fs.writeFileSync(
        path.join(VAULT_DIR, `${target.target_id}.quarantine.json`),
        JSON.stringify(quarantineData, null, 2) + '\n',
        'utf8'
      );
    }

    results.push({
      target_id: target.target_id,
      cluster: target.cluster,
      authorized_source_url: target.authorized_source_url,
      evidence_field_contract: target.evidence_field_contract,
      captured_at_utc: captureStart,
      http_status: httpStatus,
      byte_size: byteSize,
      body_file: bodyFileName,
      body_sha256: bodyHash,
      sanitized_headers: sanitizedHeaders,
      intake_status: captureSuccess ? 'AUTHORIZED_FOR_READ_ONLY_CAPTURE_ONLY' : 'INTAKE_FAILED__QUARANTINE',
      candidate_status: 'NOT_A_CANDIDATE',
      public_approved: false,
      error: errorMsg
    });

    console.log('');
  }

  const successCount = results.filter(r => r.intake_status === 'AUTHORIZED_FOR_READ_ONLY_CAPTURE_ONLY').length;
  const quarantineCount = results.filter(r => r.intake_status === 'INTAKE_FAILED__QUARANTINE').length;

  // 5. Verify Post-run Invariants
  console.log('🔒 Post-run Invariant Re-verification:');
  const postLedgerHash = sha256(fs.readFileSync(LEDGER_PATH));
  if (postLedgerHash !== scope.source_ledger_sha256) {
    throw new Error('CRITICAL: Source ledger was mutated during collector run!');
  }
  console.log('   ✓ Source ledger remains bit-identical: ' + postLedgerHash);

  const postFeedContent = fs.readFileSync(FEED_PATH, 'utf8').trim();
  if (postFeedContent !== '[]') {
    throw new Error('CRITICAL: deals_feed.json was mutated during collector run!');
  }
  console.log('   ✓ deals_feed.json remains empty []\n');

  // 6. Write Master Manifest
  const manifest = {
    manifest_id: 'BATCH03_INTAKE_MANIFEST_20260903',
    governing_scope_id: scope.scope_id,
    governing_directive: scope.governing_directive,
    execution_state: 'INTAKE_COMPLETED__NOT_CANDIDATE__NOT_PUBLIC',
    executed_at_utc: new Date().toISOString(),
    closes_at_utc: scope.closes_at_utc,
    timebox_compliant: true,
    total_targets: scope.targets.length,
    captured_success_count: successCount,
    quarantined_count: quarantineCount,
    immutable_rules_compliance: {
      source_ledger_unmutated: true,
      public_approved_count: 0,
      render_enabled: false,
      feed_mutation_occurred: false,
      affiliate_router_active: false,
      production_deploy_occurred: false,
      cookies_redacted: true
    },
    targets_summary: {
      hoa_khanh: {
        total: 7,
        success: results.filter(r => r.cluster === 'HOA_KHANH' && r.intake_status === 'AUTHORIZED_FOR_READ_ONLY_CAPTURE_ONLY').length,
        quarantined: results.filter(r => r.cluster === 'HOA_KHANH' && r.intake_status === 'INTAKE_FAILED__QUARANTINE').length
      },
      an_thuong: {
        total: 7,
        success: results.filter(r => r.cluster === 'AN_THUONG' && r.intake_status === 'AUTHORIZED_FOR_READ_ONLY_CAPTURE_ONLY').length,
        quarantined: results.filter(r => r.cluster === 'AN_THUONG' && r.intake_status === 'INTAKE_FAILED__QUARANTINE').length
      },
      hai_chau: {
        total: 7,
        success: results.filter(r => r.cluster === 'HAI_CHAU' && r.intake_status === 'AUTHORIZED_FOR_READ_ONLY_CAPTURE_ONLY').length,
        quarantined: results.filter(r => r.cluster === 'HAI_CHAU' && r.intake_status === 'INTAKE_FAILED__QUARANTINE').length
      },
      tien_ich_so: {
        total: 7,
        success: results.filter(r => r.cluster === 'TIEN_ICH_SO' && r.intake_status === 'AUTHORIZED_FOR_READ_ONLY_CAPTURE_ONLY').length,
        quarantined: results.filter(r => r.cluster === 'TIEN_ICH_SO' && r.intake_status === 'INTAKE_FAILED__QUARANTINE').length
      }
    },
    results: results
  };

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n', 'utf8');

  console.log('========================================================================');
  console.log('🏛️ BATCH 03 INTAKE EXECUTION COMPLETED');
  console.log('   Manifest Path:      ' + MANIFEST_PATH);
  console.log('   Total Targets:      ' + manifest.total_targets);
  console.log('   Captured Success:   ' + manifest.captured_success_count);
  console.log('   Quarantined:        ' + manifest.quarantined_count);
  console.log('   Execution State:    ' + manifest.execution_state);
  console.log('========================================================================\n');

  return manifest;
}

if (require.main === module) {
  runIntakeCollector().catch(err => {
    console.error('Fatal Collector Error:', err);
    process.exit(1);
  });
}

module.exports = { runIntakeCollector };
