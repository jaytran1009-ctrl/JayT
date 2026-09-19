/**
 * JAYT 2-HOUR CADENCE AUTOMATION MONITOR
 * Governing Directive: JAYT-245 Section JAYT-268 Mandate 5 (Lines 5847-5855)
 *
 * Checks platform state every 2 hours (or single pass when invoked) and ONLY reports on evidence pass/fail,
 * breach, or when an executive decision is needed.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const FREEZE_STATE_PATH = path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_CONTAMINATION_FREEZE_STATE.json');
const OVERLAY_PATH = path.join(ROOT, '06_TRUST_AND_EVIDENCE/REMEDIATION_OVERLAY_COHORT_15_RETIREMENT.json');
const LOG_PATH = path.join(ROOT, '06_TRUST_AND_EVIDENCE/RUNTIME_FREEZE_TRACE_EVIDENCE.log');
const BATCH03_LEDGER_PATH = path.join(ROOT, '06_TRUST_AND_EVIDENCE/JAYT_BATCH_03_READINESS_LEDGER.json');

const EXPECTED_LOG_SHA256 = '3d9daa923752f41efbcaa2449773a58d8e4b645c5650144d2ad781a5a792c54b';
const EXPECTED_OVERLAY_SHA256 = '4d5baeaa9257ce554360f9b896ce70af75233f1795eaf930373b94a852e540e4';

function runMonitoringPass() {
  const timestamp = new Date().toISOString();
  const breaches = [];

  // 1. Check Freeze State
  try {
    const fState = JSON.parse(fs.readFileSync(FREEZE_STATE_PATH, 'utf8'));
    if (fState.state !== 'ACTIVE') {
      breaches.push('BREACH: Freeze state is not ACTIVE (' + fState.state + ')');
    }
  } catch (err) {
    breaches.push('BREACH: Unable to read freeze state: ' + err.message);
  }

  // 2. Check Remediation Overlay Hash
  try {
    const overlayBytes = fs.readFileSync(OVERLAY_PATH);
    const hash = crypto.createHash('sha256').update(overlayBytes).digest('hex');
    if (hash !== EXPECTED_OVERLAY_SHA256) {
      breaches.push('BREACH: Remediation overlay SHA-256 mismatch (' + hash + ')');
    }
  } catch (err) {
    breaches.push('BREACH: Unable to read remediation overlay: ' + err.message);
  }

  // 3. Check Runtime Trace Log Hash
  try {
    const logBytes = fs.readFileSync(LOG_PATH);
    const hash = crypto.createHash('sha256').update(logBytes).digest('hex');
    if (hash !== EXPECTED_LOG_SHA256) {
      breaches.push('BREACH: Runtime freeze trace log SHA-256 mismatch (' + hash + ')');
    }
  } catch (err) {
    breaches.push('BREACH: Unable to read trace log: ' + err.message);
  }

  // 4. Check Batch 03 Ledger
  try {
    const b03 = JSON.parse(fs.readFileSync(BATCH03_LEDGER_PATH, 'utf8'));
    if (b03.accounting_summary.total_target_proposals !== 28) {
      breaches.push('BREACH: Batch 03 proposal count mismatch (' + b03.accounting_summary.total_target_proposals + ')');
    }
  } catch (err) {
    breaches.push('BREACH: Unable to read Batch 03 ledger: ' + err.message);
  }

  if (breaches.length > 0) {
    console.error('🚨 [CADENCE MONITOR ' + timestamp + '] CRITICAL BREACHES DETECTED:');
    breaches.forEach(b => console.error('   - ' + b));
    return { status: 'BREACH', breaches, timestamp };
  } else {
    console.log('🛡️ [CADENCE MONITOR ' + timestamp + '] 2-Hour Monitoring Pass: All baseline invariants intact. Zero action required.');
    return { status: 'PASS', timestamp };
  }
}

if (require.main === module) {
  runMonitoringPass();
}

module.exports = { runMonitoringPass };
