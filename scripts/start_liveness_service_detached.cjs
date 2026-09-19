/**
 * JAYT DETACHED LIVENESS SERVICE LAUNCHER
 * Spawns danang_flash_sale_liveness_daemon.cjs as a detached OS process
 * Writes stdout/stderr directly to DANANG_FLASH_SALE_LIVENESS_HEARTBEAT.log
 * Exits cleanly in <100ms, preventing stream buffer stalls or console interruptions.
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const daemonScript = path.join(__dirname, 'danang_flash_sale_liveness_daemon.cjs');
const evidenceDir = path.join(__dirname, '..', '07_QUALITY_ASSURANCE', 'runtime_evidence');

if (!fs.existsSync(evidenceDir)) {
  fs.mkdirSync(evidenceDir, { recursive: true });
}

const logFile = path.join(evidenceDir, 'DANANG_FLASH_SALE_LIVENESS_HEARTBEAT.log');
const out = fs.openSync(logFile, 'a');

const child = spawn(process.execPath, [daemonScript], {
  detached: true,
  stdio: ['ignore', out, out],
  windowsHide: true
});

child.unref();

console.log('[OK] Detached Background Liveness Service successfully spawned.');
console.log('PID:', child.pid);
console.log('Log destination:', logFile);
process.exit(0);
