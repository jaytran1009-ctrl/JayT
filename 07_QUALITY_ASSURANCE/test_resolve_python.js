/**
 * =============================================================================
 * JAYT PORTABLE PYTHON RESOLVER CONTRACT TEST
 * WORK ORDER: JAYT-UX-INTEGRATION-035C (Execution Verification Suite)
 * =============================================================================
 */
const { resolvePythonExecutable, probeExecutable } = require('./resolve_python.js');
const fs = require('fs');
const path = require('path');
const os = require('os');

console.log('🧪 [JAYT-PYTHON-RESOLVER-TEST] Khởi chạy bộ kiểm thử Portable Python Resolver (035C)...');

let testCount = 0;
let passCount = 0;

function assertTest(id, passed, detail) {
  testCount++;
  if (passed) {
    passCount++;
    console.log(`  [${id}]: [PASS] - ${detail}`);
  } else {
    console.error(`  [${id}]: [FAIL] - ${detail}`);
    process.exit(1);
  }
}

// 1. Real Python Resolver Probe Test
try {
  const verifiedPython = resolvePythonExecutable();
  assertTest(
    'PY_RES_01_REAL_PYTHON_VERIFIED',
    Boolean(verifiedPython && fs.existsSync(verifiedPython)),
    `Resolved executable is valid and exists on disk: ${verifiedPython}`
  );
} catch (e) {
  assertTest('PY_RES_01_REAL_PYTHON_VERIFIED', false, `Failed to resolve real python: ${e.message}`);
}

// 2. Negative Probe: Non-existent file fails probe cleanly
const nonExistentProbe = probeExecutable('C:\\non_existent_dir\\dummy_python.exe');
assertTest(
  'PY_RES_02_NON_EXISTENT_PROBE_FAILS',
  nonExistentProbe === null,
  'Non-existent executable candidate returned null as expected.'
);

// 3. Negative Probe: Broken stub / dummy script returning error is skipped
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jayt_stub_test_'));
const stubCmd = path.join(tempDir, 'fake_py_launcher.bat');
fs.writeFileSync(stubCmd, '@echo off\necho No installed Python found!\nexit /b 103\n', 'utf8');

const stubProbeResult = probeExecutable(stubCmd);
assertTest(
  'PY_RES_03_BROKEN_LAUNCHER_STUB_SKIPPED',
  stubProbeResult === null,
  'Broken launcher stub emitting "No installed Python" and exit code 103 returned null as expected.'
);

// 4. Probe Probe Functionality with Real Binary
const knownPython = resolvePythonExecutable();
const directProbe = probeExecutable(knownPython);
assertTest(
  'PY_RES_04_KNOWN_BINARY_PROBE_PASSES',
  Boolean(directProbe && fs.existsSync(directProbe)),
  `Direct probe returned valid executable: ${directProbe}`
);

// Cleanup
try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch {}

console.log(`\n🟢 [PYTHON-RESOLVER-SUMMARY] TOÀN BỘ ${passCount}/${testCount} KIỂM THỬ RESOLVER ĐÃ ĐẠT [PASS]!\n`);
