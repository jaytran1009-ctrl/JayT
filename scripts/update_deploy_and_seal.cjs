const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const rootDir = path.resolve(__dirname, '..');
const ssotPath = path.join(rootDir, '03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
const deployPath = path.join(rootDir, 'deploy/jayt_apex_interface.js');
const deployPublicPath = path.join(rootDir, 'deploy/public/jayt_apex_interface.js');
const sha256Path = path.join(rootDir, 'deploy/jayt_apex_interface.js.sha256');
const sealPath = path.join(rootDir, 'scripts/verify_pipeline_seal.cjs');

const ssotBuf = fs.readFileSync(ssotPath);
const ssotLen = ssotBuf.length;
const ssotHash = crypto.createHash('sha256').update(ssotBuf).digest('hex');

console.log(`SSOT length: ${ssotLen}, SHA-256: ${ssotHash}`);

// 1. Copy to deploy files
fs.copyFileSync(ssotPath, deployPath);
fs.copyFileSync(ssotPath, deployPublicPath);
fs.writeFileSync(sha256Path, ssotHash + '\n', 'utf8');
console.log('Copied SSOT to deploy & deploy/public & wrote sha256 file');

// 2. Update verify_pipeline_seal.cjs
let sealContent = fs.readFileSync(sealPath, 'utf8');
sealContent = sealContent.replace(
  /\['03_SOURCE_OF_TRUTH\/jayt_apex_interface\.js',\s*\d+,\s*'[^']+'\]/,
  `['03_SOURCE_OF_TRUTH/jayt_apex_interface.js', ${ssotLen}, '${ssotHash}']`
);
sealContent = sealContent.replace(
  /\['deploy\/jayt_apex_interface\.js',\s*\d+,\s*'[^']+'\]/,
  `['deploy/jayt_apex_interface.js', ${ssotLen}, '${ssotHash}']`
);
sealContent = sealContent.replace(
  /\['deploy\/public\/jayt_apex_interface\.js',\s*\d+,\s*'[^']+'\]/,
  `['deploy/public/jayt_apex_interface.js', ${ssotLen}, '${ssotHash}']`
);

fs.writeFileSync(sealPath, sealContent, 'utf8');
console.log('Updated scripts/verify_pipeline_seal.cjs with new SSOT seal');
