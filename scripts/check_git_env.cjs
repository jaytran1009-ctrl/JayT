const fs = require('fs');
const path = require('path');
const os = require('os');

const home = os.homedir();
const sshDir = path.join(home, '.ssh');
const gitConfig = path.join(home, '.gitconfig');

console.log('--- CREDENTIAL & CONFIG CHECK (BOOLEAN ONLY) ---');
console.log('GITHUB_TOKEN present in env:', !!process.env.GITHUB_TOKEN);
console.log('GH_TOKEN present in env:', !!process.env.GH_TOKEN);
console.log('GITHUB_PAT present in env:', !!process.env.GITHUB_PAT);

if (fs.existsSync(gitConfig)) {
  console.log('.gitconfig exists: true');
  try {
    const lines = fs.readFileSync(gitConfig, 'utf8').split('\n');
    lines.forEach(l => {
      if (l.includes('name =') || l.includes('email =')) {
        console.log('  git config user info:', l.trim());
      }
    });
  } catch (e) {}
} else {
  console.log('.gitconfig exists: false');
}

if (fs.existsSync(sshDir)) {
  const files = fs.readdirSync(sshDir);
  console.log('~/.ssh directory contents (filenames only):', files);
} else {
  console.log('~/.ssh directory exists: false');
}
