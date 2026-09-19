const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const gitExe = 'C:\\Users\\tritr\\AppData\\Local\\Programs\\Git\\cmd\\git.exe';
const ghExe = 'C:\\Users\\tritr\\AppData\\Local\\Programs\\GitHubCLI\\gh.exe';

console.log('--- GIT & GITHUB INSPECTION ---');
console.log('.git directory exists:', fs.existsSync('.git'));

if (fs.existsSync('.git')) {
  try {
    const topLevel = execSync(`"${gitExe}" rev-parse --show-toplevel`).toString().trim();
    console.log('git rev-parse --show-toplevel:', topLevel);
  } catch (e) { console.log('show-toplevel error:', e.message); }

  try {
    const head = execSync(`"${gitExe}" rev-parse HEAD`).toString().trim();
    console.log('git rev-parse HEAD:', head);
  } catch (e) { console.log('rev-parse HEAD error:', e.message); }

  try {
    const branch = execSync(`"${gitExe}" branch --show-current`).toString().trim();
    console.log('git branch --show-current:', branch);
  } catch (e) { console.log('branch error:', e.message); }

  try {
    const remote = execSync(`"${gitExe}" remote get-url origin`).toString().trim();
    console.log('git remote get-url origin:', remote);
  } catch (e) { console.log('remote error:', e.message); }
} else {
  console.log('No git repository initialized at root.');
}

console.log('\n--- GITHUB CLI STATUS ---');
try {
  const ghAuthStatus = execSync(`"${ghExe}" auth status`, { encoding: 'utf8' });
  console.log('gh auth status:\n', ghAuthStatus);
} catch (e) {
  console.log('gh auth status (failed/unauthenticated):\n', e.stdout || e.stderr || e.message);
}
