const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const src = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
const data = fs.readFileSync(src);
const hash = crypto.createHash('sha256').update(data).digest('hex');
console.log('New Size:', data.length);
console.log('New SHA256:', hash);

fs.copyFileSync(src, path.resolve(__dirname, '../deploy/jayt_apex_interface.js'));
fs.copyFileSync(src, path.resolve(__dirname, '../deploy/public/jayt_apex_interface.js'));
console.log('Synced to deploy/ and deploy/public/');

fs.writeFileSync(path.resolve(__dirname, '../deploy/jayt_apex_interface.js.sha256'), hash, 'utf8');

const sealFile = path.resolve(__dirname, 'verify_pipeline_seal.cjs');
let sealCode = fs.readFileSync(sealFile, 'utf8');
sealCode = sealCode.replace(
  /\['03_SOURCE_OF_TRUTH\/jayt_apex_interface\.js', \d+, '[a-f0-9]+'\]/,
  `['03_SOURCE_OF_TRUTH/jayt_apex_interface.js', ${data.length}, '${hash}']`
);
sealCode = sealCode.replace(
  /\['deploy\/jayt_apex_interface\.js', \d+, '[a-f0-9]+'\]/,
  `['deploy/jayt_apex_interface.js', ${data.length}, '${hash}']`
);
sealCode = sealCode.replace(
  /\['deploy\/public\/jayt_apex_interface\.js', \d+, '[a-f0-9]+'\]/,
  `['deploy/public/jayt_apex_interface.js', ${data.length}, '${hash}']`
);
fs.writeFileSync(sealFile, sealCode, 'utf8');
console.log('Updated verify_pipeline_seal.cjs');
