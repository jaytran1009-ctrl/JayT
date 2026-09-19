const fs = require('fs');
const path = require('path');

const managerPath = path.resolve(__dirname, '../07_QUALITY_ASSURANCE/memory_transaction_manager_057.js');
let code = fs.readFileSync(managerPath, 'utf8');

code = code.replace(
  'preMemoryRaw.includes(`Mã chỉ thị`: \\`${workOrder}\\`);',
  'preMemoryRaw.includes(`Mã chỉ thị: \\`${workOrder}\\``);'
);

fs.writeFileSync(managerPath, code, 'utf8');
console.log('✅ Fixed syntax on line 416 of memory_transaction_manager_057.js');
