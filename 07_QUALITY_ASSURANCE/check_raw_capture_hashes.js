const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function sha256(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

const root = path.resolve(__dirname, '..');

const metizU22Path = path.join(root, '05_DEAL_AND_AFFILIATE', 'raw_evidence', 'batch_069_step2_metiz', 'metiz_u22_capture.txt');
const metizMonPath = path.join(root, '05_DEAL_AND_AFFILIATE', 'raw_evidence', 'batch_069_step2_metiz', 'metiz_super_monday_capture.txt');
const starlightPath = path.join(root, '05_DEAL_AND_AFFILIATE', 'raw_evidence', 'batch_069_step1c_starlight', 'starlight_ct_u22_capture.txt');

console.log('Metiz U22 SHA:', sha256(metizU22Path));
console.log('Metiz Super Mon SHA:', sha256(metizMonPath));
console.log('Starlight U22 SHA:', sha256(starlightPath));

const u22Text = fs.readFileSync(metizU22Path, 'utf8');
console.log('\nMetiz U22 Sample Quote match:', u22Text.includes('Áp dụng giá vé 2D chỉ 55.000đ cho thành viên Metiz Cinema từ 22 tuổi trở xuống'));

const monText = fs.readFileSync(metizMonPath, 'utf8');
console.log('Metiz Super Mon Sample Quote match:', monText.includes('Đồng giá 55k mọi suất chiếu'));

const starText = fs.readFileSync(starlightPath, 'utf8');
console.log('Starlight U22 Sample Quote match:', starText.includes('Đồng giá vé 45k/vé khi mua tại quầy từ thứ 2 đến thứ 5!'));
