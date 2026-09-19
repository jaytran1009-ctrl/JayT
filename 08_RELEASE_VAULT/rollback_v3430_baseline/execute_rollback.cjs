/**
 * JAYT-370 Rollback Execution Script
 * Restores verified v3.430.0 baseline payload to jayt-production-v3420 in emergency.
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ws1 = path.resolve(__dirname, '../../');
const rollbackDir = __dirname;
const targetDeployDir = path.join(ws1, 'deploy_personal_v3420');

console.log('=== INITIATING JAYT-370 EMERGENCY ROLLBACK TO V3.430.0 ===');

const filesToRestore = [
  'index.html',
  'styles.css',
  'jayt_storefront_sprint_b.js',
  'deals_feed.json',
  'registry.json'
];

for (const f of filesToRestore) {
  const src = path.join(rollbackDir, f);
  const dest = path.join(targetDeployDir, f);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log('[RESTORED] ' + f + ' -> ' + dest);
  } else {
    console.error('[MISSING] Rollback asset missing: ' + src);
    process.exit(1);
  }
}

console.log('Publishing rollback payload to jayt-production-v3420...');
try {
  const out = execSync('npx vercel --prod --yes', { cwd: targetDeployDir, encoding: 'utf8' });
  console.log('Rollback deployed successfully:\n', out);
} catch (e) {
  console.error('Rollback deployment failed:', e.message);
  process.exit(1);
}
