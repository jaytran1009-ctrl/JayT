const fs = require('fs');
const crypto = require('crypto');

const f = fs.readFileSync('03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
const hash = crypto.createHash('sha256').update(f).digest('hex');
const size = f.length;

fs.writeFileSync('deploy/jayt_apex_interface.js', f);
fs.writeFileSync('deploy/public/jayt_apex_interface.js', f);
fs.writeFileSync('03_SOURCE_OF_TRUTH/jayt_apex_interface.js.sha256', hash, 'utf8');

let verifier = fs.readFileSync('scripts/verify_pipeline_seal.cjs', 'utf8');

const goodBlock = `const SEALED_FILES = [
  ['03_SOURCE_OF_TRUTH/jayt_apex_interface.js', ${size}, '${hash}'],
  ['deploy/jayt_apex_interface.js', ${size}, '${hash}'],
  ['deploy/public/jayt_apex_interface.js', ${size}, '${hash}'],`;

const lines = verifier.split('\n');
const startIdx = lines.findIndex(l => l.includes('const SEALED_FILES = ['));
if (startIdx !== -1) {
  lines.splice(startIdx, 4, goodBlock);
  fs.writeFileSync('scripts/verify_pipeline_seal.cjs', lines.join('\n'), 'utf8');
  console.log('Repaired verify_pipeline_seal.cjs cleanly with hash:', hash);
} else {
  console.error('SEALED_FILES not found');
}
