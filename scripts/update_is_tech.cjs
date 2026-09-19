const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
let content = fs.readFileSync(file, 'utf8');

const oldIsTech = /const isTech = \(parsed && \(parsed\.categoryCode === 'TECH' \|\| \/cáp[\s\S]*?\)\)\);/;
const newIsTech = `const isAccessoryOrConsumable = /ốp lưng|op lung|khăn|giấy|bình|hộp|mì|bánh|áo|quần|cardigan|dép|vớ|tất/i.test(((parsed && parsed.title) || '') + ' ' + ((parsed && parsed.cleanTitle) || ''));
  const isTech = !isAccessoryOrConsumable && (parsed && (parsed.categoryCode === 'TECH' || /cáp|sạc|chuột|tai nghe|bàn phím|hub|quạt tích điện|adapter|pin dự phòng|củ sạc|máy tính|loa|mỹ phẩm|son|kem dưỡng|nước hoa|baseus|ugreen|logitech|anker/i.test(((parsed && parsed.title) || '') + ' ' + ((parsed && parsed.brand) || ''))));`;

if (oldIsTech.test(content)) {
  content = content.replace(oldIsTech, newIsTech);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Updated isTech definition successfully.');
} else {
  console.warn('Could not find oldIsTech pattern!');
}
