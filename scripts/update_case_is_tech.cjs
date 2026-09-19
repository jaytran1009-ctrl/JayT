const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
let content = fs.readFileSync(file, 'utf8');

// 1. Remove ốp lưng and case from TECH regex in extractSmartProductMeta
content = content.replaceAll(
  'cáp|sạc|chuột|tai nghe|bàn phím|hub|quạt|adapter|pin|ốp lưng|điện thoại|case|iphone|type-c',
  'cáp|sạc|chuột|tai nghe|bàn phím|hub|quạt|adapter|pin|điện thoại|type-c'
);

// 2. Add ốp lưng and case to PERSONAL regex in extractSmartProductMeta
content = content.replaceAll(
  '/balo|túi|ô|dù|áo mưa|mũ|kính|ví|dép/',
  '/balo|túi|ô|dù|áo mưa|mũ|kính|ví|dép|ốp lưng|op lung|case|ốp/'
);

// 3. Update isTech definition in computeCrossPlatformRadar
const oldIsTechStr = `  const categoryCode = (parsed && parsed.categoryCode) ? parsed.categoryCode : 'HOME';
  const isTech = categoryCode === 'TECH' || (parsed && /cáp|sạc|chuột|pin|tai nghe|loa|ổ cắm|laptop|điện thoại|baseus|ugreen|logitech|anker/i.test((parsed.title || '') + ' ' + (parsed.brand || '')));`;

const newIsTechStr = `  const categoryCode = (parsed && parsed.categoryCode) ? parsed.categoryCode : 'HOME';
  const isAccessoryOrConsumable = /ốp lưng|op lung|case|ốp|khăn|giấy|bình|hộp|mì|bánh|áo|quần|cardigan|dép|vớ|tất/i.test(((parsed && parsed.title) || '') + ' ' + ((parsed && parsed.cleanTitle) || ''));
  const isTech = !isAccessoryOrConsumable && (categoryCode === 'TECH' || (parsed && /cáp|sạc|chuột|pin dự phòng|tai nghe|loa|laptop|điện thoại|baseus|ugreen|logitech|anker|mỹ phẩm|son/i.test(((parsed && parsed.title) || '') + ' ' + ((parsed && parsed.brand) || ''))));`;

if (content.includes(oldIsTechStr)) {
  content = content.replace(oldIsTechStr, newIsTechStr);
  console.log('Replaced oldIsTechStr successfully.');
} else {
  console.warn('Could not find oldIsTechStr!');
}

fs.writeFileSync(file, content, 'utf8');
console.log('Updated isTech and categorization.');
