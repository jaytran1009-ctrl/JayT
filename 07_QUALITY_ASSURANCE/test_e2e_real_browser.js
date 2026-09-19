/**
 * =============================================================================
 * JAYT REAL BROWSER E2E TEST ENTRYPOINT
 * WORK ORDER: JAYT-BROWSER-RUNNER-011 (Playwright-Core Baseline)
 * =============================================================================
 * Delegates execution to 07_QUALITY_ASSURANCE/browser_runner/run_playwright_e2e.js
 * =============================================================================
 */
const { spawn } = require('child_process');
const path = require('path');

const runnerScript = path.resolve(__dirname, 'browser_runner', 'run_playwright_e2e.js');
const runnerCwd = path.resolve(__dirname, 'browser_runner');

const proc = spawn(process.execPath, [runnerScript], {
  cwd: runnerCwd,
  stdio: 'inherit',
  env: process.env
});

proc.on('exit', (code, signal) => {
  if (code !== 0) {
    console.error(`❌ Browser E2E Runner exited with code ${code} (signal: ${signal})`);
    process.exit(code || 1);
  }
  process.exit(0);
});
