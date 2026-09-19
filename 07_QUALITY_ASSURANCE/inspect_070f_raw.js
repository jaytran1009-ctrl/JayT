const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const dir = path.resolve(__dirname, '..', '05_DEAL_AND_AFFILIATE', 'raw_evidence', 'run_070f_deep_sweep_1787556559654');
const files = fs.readdirSync(dir);
const receipts = files.filter(f => f.startsWith('receipt_') && f.endsWith('.json'));

console.log('Total files in run dir:', files.length);
console.log('Total receipts in run dir:', receipts.length);

receipts.forEach((r, idx) => {
  const full = path.join(dir, r);
  const data = JSON.parse(fs.readFileSync(full, 'utf8'));
  const sha = crypto.createHash('sha256').update(fs.readFileSync(full)).digest('hex');
  console.log((idx + 1) + '. [' + r + '] target_id: ' + data.target_id + ' | brand: ' + data.brand + ' | final_url: ' + data.final_url + ' | SHA: ' + sha);
});
