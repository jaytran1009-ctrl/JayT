/**
 * JAYT DETACHED TELEGRAM CONTROL PLANE LAUNCHER
 * Spawns telegram_bot_control_plane.cjs as a detached background process.
 * Logs output directly to 07_QUALITY_ASSURANCE/runtime_evidence/TELEGRAM_CONTROL_PLANE.log
 * Exits cleanly in <100ms, preventing stream buffer stalls.
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const daemonScript = path.join(__dirname, 'telegram_bot_control_plane.cjs');
const evidenceDir = path.join(__dirname, '..', '07_QUALITY_ASSURANCE', 'runtime_evidence');

if (!fs.existsSync(evidenceDir)) {
  fs.mkdirSync(evidenceDir, { recursive: true });
}

const logFile = path.join(evidenceDir, 'TELEGRAM_CONTROL_PLANE.log');
const out = fs.openSync(logFile, 'a');

const child = spawn(process.execPath, [daemonScript, '--daemon'], {
  detached: true,
  stdio: ['ignore', out, out],
  windowsHide: true,
  env: process.env
});

fs.writeSync(out, Buffer.from(`[${new Date().toISOString()}] Detached launcher spawned child PID ${child.pid}\n`));
fs.closeSync(out);

child.unref();

console.log('[OK] Detached Telegram Bot Control Plane daemon successfully spawned.');
console.log('PID:', child.pid);
console.log('Log destination:', logFile);
process.exit(0);