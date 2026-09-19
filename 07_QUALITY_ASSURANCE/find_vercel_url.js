const fs = require('fs');
const path = require('path');

function searchDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name !== 'node_modules' && ent.name !== '.git') searchDir(full);
    } else if (ent.name.endsWith('.md') || ent.name.endsWith('.json') || ent.name.endsWith('.js')) {
      const txt = fs.readFileSync(full, 'utf8');
      if (txt.includes('vercel.app')) {
        const matches = txt.match(/https?:\/\/[a-zA-Z0-9\-_.]+\.vercel\.app[^\s)"'`]*/g);
        if (matches) {
          console.log(full, '->', matches);
        }
      }
    }
  }
}

searchDir('08_RELEASE_VAULT');
searchDir('deploy');
searchDir('07_QUALITY_ASSURANCE');
searchDir('05_DEAL_AND_AFFILIATE');
