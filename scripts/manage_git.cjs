const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const gitExe = 'C:\\Users\\tritr\\AppData\\Local\\Programs\\Git\\cmd\\git.exe';
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('Usage: node scripts/manage_git.cjs <git-args>');
  process.exit(1);
}

const res = spawnSync(gitExe, args, { stdio: 'inherit', encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
if (res.error) {
  console.error('Git error:', res.error);
  process.exit(1);
}
process.exit(res.status || 0);
