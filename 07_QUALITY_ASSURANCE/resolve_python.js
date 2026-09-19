/**
 * =============================================================================
 * JAYT PORTABLE PYTHON RUNTIME RESOLVER (PROBE-VERIFIED)
 * WORK ORDER: JAYT-UX-INTEGRATION-035C (Execution Verification Contract)
 * =============================================================================
 * Resolution Contract:
 * 1. Probing Gate: Every candidate MUST pass active execution probe
 *    `-c "import sys; print(sys.executable)"` with exit code 0.
 * 2. Launcher Safety: Dummy/broken launchers (e.g. py.exe with "No installed Python")
 *    are automatically detected and skipped.
 * 3. Multi-tier Discovery:
 *    - Explicit JAYT_PYTHON environment variable
 *    - System PATH discovery (where/which)
 *    - User LocalAppData/Programs/Python dynamic tree search
 *    - System root installations (C:\Python3*, Program Files)
 *    - Windows Py Launcher with verified runtime
 * 4. Returns canonical verified executable path reported by sys.executable.
 * =============================================================================
 */
const fs = require('fs');
const path = require('path');
const { execSync, spawnSync } = require('child_process');

function probeExecutable(candidatePath, args = ['-c', 'import sys; print(sys.executable)']) {
  if (!candidatePath) return null;
  try {
    const res = spawnSync(candidatePath, args, {
      timeout: 3000,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe']
    });

    if (res.status === 0 && res.stdout) {
      const output = res.stdout.trim();
      const firstLine = output.split(/[\r\n]+/)[0].trim();
      // Ensure output is a real path and not an error string
      if (firstLine && !firstLine.toLowerCase().includes('no installed python') && fs.existsSync(firstLine)) {
        return firstLine;
      }
      // If output itself is not a path but candidatePath exists and exited 0
      if (fs.existsSync(candidatePath)) {
        return candidatePath;
      }
    }
  } catch {}
  return null;
}

function resolvePythonExecutable() {
  const candidateList = [];

  // 1. Explicit Environment Variable
  if (process.env.JAYT_PYTHON) {
    candidateList.push({ path: process.env.JAYT_PYTHON, args: ['-c', 'import sys; print(sys.executable)'] });
  }

  // 2. Dynamic Discovery via system path (where / which)
  const commands = ['where python', 'where py', 'where python3', 'which python3', 'which python'];
  for (const cmd of commands) {
    try {
      const out = execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
      const lines = out.split(/[\r\n]+/).map(s => s.trim()).filter(Boolean);
      for (const line of lines) {
        if (line.toLowerCase().includes('windowsapps')) continue; // Skip WindowsApps redirect stubs
        if (line.toLowerCase().endsWith('py.exe')) {
          candidateList.push({ path: line, args: ['-3', '-c', 'import sys; print(sys.executable)'] });
          candidateList.push({ path: line, args: ['-c', 'import sys; print(sys.executable)'] });
        } else {
          candidateList.push({ path: line, args: ['-c', 'import sys; print(sys.executable)'] });
        }
      }
    } catch {}
  }

  // 3. User directories (LocalAppData, Roaming, UserProfile)
  const userProfile = process.env.USERPROFILE || process.env.HOME || '';
  const localAppData = process.env.LOCALAPPDATA || (userProfile ? path.join(userProfile, 'AppData', 'Local') : '');
  const appData = process.env.APPDATA || (userProfile ? path.join(userProfile, 'AppData', 'Roaming') : '');

  const searchBases = [
    localAppData ? path.join(localAppData, 'Python') : null,
    localAppData ? path.join(localAppData, 'Programs', 'Python') : null,
    appData ? path.join(appData, 'Python') : null,
    'C:\\Python314',
    'C:\\Python313',
    'C:\\Python312',
    'C:\\Python311',
    'C:\\Python310',
    'C:\\Program Files\\Python314',
    'C:\\Program Files\\Python313',
    'C:\\Program Files\\Python312'
  ].filter(Boolean);

  for (const base of searchBases) {
    if (!fs.existsSync(base)) continue;
    const directExe = path.join(base, 'python.exe');
    if (fs.existsSync(directExe)) {
      candidateList.push({ path: directExe, args: ['-c', 'import sys; print(sys.executable)'] });
    }

    try {
      const subdirs = fs.readdirSync(base);
      for (const sub of subdirs) {
        const subExe = path.join(base, sub, 'python.exe');
        if (fs.existsSync(subExe)) {
          candidateList.push({ path: subExe, args: ['-c', 'import sys; print(sys.executable)'] });
        }
        const binExe = path.join(base, sub, 'bin', 'python.exe');
        if (fs.existsSync(binExe)) {
          candidateList.push({ path: binExe, args: ['-c', 'import sys; print(sys.executable)'] });
        }
      }
    } catch {}
  }

  // 4. Default Py launcher fallback
  const pyLauncher = 'C:\\Windows\\py.exe';
  if (fs.existsSync(pyLauncher)) {
    candidateList.push({ path: pyLauncher, args: ['-3', '-c', 'import sys; print(sys.executable)'] });
    candidateList.push({ path: pyLauncher, args: ['-c', 'import sys; print(sys.executable)'] });
  }

  // 5. Test each candidate through the Probe Execution Gate
  for (const item of candidateList) {
    const verified = probeExecutable(item.path, item.args);
    if (verified) {
      return verified;
    }
  }

  throw new Error('ERR_JAYT_PYTHON_PROBE_FAILED: Không tìm thấy Python runtime có thể thực thi được. Đã kiểm tra các ứng viên nhưng tất cả đều thất bại khi thăm dò (--version / sys.executable).');
}

module.exports = { resolvePythonExecutable, probeExecutable };
