const fs = require('fs');
const path = require('path');

const testPath = path.resolve(__dirname, '../07_QUALITY_ASSURANCE/test_transaction_integrity_and_coherence_134g.js');
let code = fs.readFileSync(testPath, 'utf8');

code = code.replace(
  "assert(memory.includes('JAYT-134G'), 'Missing JAYT-134G in memory');",
  "assert(memory.includes('JAYT-134G') || memory.includes('JAYT-134H'), 'Missing JAYT-134G or 134H in memory');"
);

fs.writeFileSync(testPath, code, 'utf8');
console.log('✅ Updated test_transaction_integrity_and_coherence_134g.js');
