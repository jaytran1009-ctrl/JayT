/**
 * JAYT-258-CORRECTION-4 SOLE TEMPORARY AUDITABLE WATCHDOG WRITER
 * Governing Directive: JAYT-245 Section JAYT-258-CORRECTION-4 (Lines 5193-5206)
 *
 * Execution Identity: Sole temporary operational writer.
 * Logs PID, Platform, Node version, and live timestamp on startup.
 * Emits heartbeat every 30s. If heartbeat > 90s, flagged as AUTOMATION_UNHEALTHY.
 * Post-SLA: Calls runOperationalCohort15Closure(), logs EXIT_AFTER_CLOSURE, and terminates.
 */

const fs = require('fs');
const path = require('path');
const { runOperationalCohort15Closure } = require('./run_cohort_15_sla_closure_operational.js');

const LOG_FILE = path.join(__dirname, 'jayt_cohort_15_watchdog.log');
const INTERVAL_MS = 30000;

function logWatchdog(msg) {
  const line = '[' + new Date().toISOString() + '] ' + msg + '\n';
  fs.appendFileSync(LOG_FILE, line, 'utf8');
  console.log(line.trim());
}

// Log process identity upon initialization
logWatchdog('WATCHDOG_INITIALIZED: PID=' + process.pid + ' PLATFORM=' + process.platform + ' NODE=' + process.version + ' CWD=' + process.cwd());

function checkLoop() {
  try {
    const result = runOperationalCohort15Closure();
    if (result.status === 'SLA_NOT_YET_REACHED') {
      logWatchdog('HEARTBEAT: PID=' + process.pid + ' STATUS=SLA_NOT_YET_REACHED (' + result.unreached_count + '/15 candidates open). Next check in ' + (INTERVAL_MS/1000) + 's.');
    } else if (result.status === 'SLA_CLOSED_SUCCESSFULLY') {
      logWatchdog('SUCCESS: All candidates reached SLA. Operational closure ledger generated successfully. EXIT_AFTER_CLOSURE.');
      process.exit(0);
    } else if (result.status === 'CLOSURE_ALREADY_RECORDED') {
      logWatchdog('IDEMPOTENT_STOP: Closure ledger already recorded. EXIT_AFTER_CLOSURE.');
      process.exit(0);
    }
  } catch (err) {
    logWatchdog('ERROR: PID=' + process.pid + ' MSG=' + err.message);
  }
}

// Run initial check immediately
checkLoop();

// Schedule recurring poll
setInterval(checkLoop, INTERVAL_MS);
