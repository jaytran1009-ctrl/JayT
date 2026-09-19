const { spawnSync } = require('child_process');
const gitExe = 'C:\\Users\\tritr\\AppData\\Local\\Programs\\Git\\cmd\\git.exe';
const res = spawnSync(gitExe, ['grep', '-i', 'github.com/'], { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
if (res.stdout) {
  const lines = res.stdout.split('\n')
    .filter(l => !l.includes('/actions/') && !l.includes('git-for-windows') && !l.includes('cli/cli') && !l.includes('setup-node'));
  console.log(lines.slice(0, 30).join('\n'));
} else {
  console.log('No relevant github.com matches found.');
}
