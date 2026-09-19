const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const gitExe = 'C:\\Users\\tritr\\AppData\\Local\\Programs\\Git\\cmd\\git.exe';
const ghExe = 'C:\\Users\\tritr\\AppData\\Local\\Programs\\GitHubCLI\\gh.exe';
const repoUrl = 'https://github.com/jaytran1009-ctrl/JayT.git';

console.log('--- STEP 1: CONFIGURE GIT CREDENTIALS VIA GH ---');
// Get GH token securely in memory
const tokenRes = spawnSync(ghExe, ['auth', 'token'], { encoding: 'utf8' });
if (!tokenRes.stdout || !tokenRes.stdout.trim()) {
  console.error('Failed to get gh token:', tokenRes.stderr);
  process.exit(1);
}
const token = tokenRes.stdout.trim();
console.log('GitHub Token present and valid in memory (length: ' + token.length + ')');

// Configure git credential helper
spawnSync(gitExe, ['config', 'credential.helper', ''], { stdio: 'inherit' });
spawnSync(gitExe, ['config', '--add', 'credential.helper', `!"${ghExe}" auth git-credential`], { stdio: 'inherit' });

console.log('\n--- STEP 2: CONFIGURE REMOTE ORIGIN ---');
// Check existing remotes
const remoteRes = spawnSync(gitExe, ['remote', '-v'], { encoding: 'utf8' });
console.log('Existing remotes:\n', remoteRes.stdout || '(none)');

if (remoteRes.stdout.includes('origin')) {
  spawnSync(gitExe, ['remote', 'set-url', 'origin', repoUrl], { stdio: 'inherit' });
} else {
  spawnSync(gitExe, ['remote', 'add', 'origin', repoUrl], { stdio: 'inherit' });
}
console.log('Origin set to:', repoUrl);

console.log('\n--- STEP 3: PROBE REMOTE WITH LS-REMOTE ---');
const lsRes = spawnSync(gitExe, ['ls-remote', 'origin'], { encoding: 'utf8' });
console.log('ls-remote output:\n', lsRes.stdout || '(empty remote)');
if (lsRes.stderr) console.log('ls-remote stderr:', lsRes.stderr);
