const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const starPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'raw_evidence', 'batch_069_step1c_starlight', 'starlight_ct_u22_capture.txt');
const text = fs.readFileSync(starPath, 'utf8');

const line35 = text.split('\n').find(l => l.includes('45k/vé'));
console.log('Exact Line 35:', JSON.stringify(line35));
