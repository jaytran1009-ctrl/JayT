const fs = require('fs');
const path = require('path');

const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
const js = fs.readFileSync(jsPath, 'utf8');

const targets = [
  'ShopeeFood rẻ hơn',
  'Freeship 18K',
  'Lotte Cinema Đà Nẵng HSSV',
  'Jollibee Ngày Hội Viên',
  'Radar Cao Điểm',
  'Cước Xe Mưa Lớn',
  'shopeefood.vn',
  'maps.google.com',
  'diffGrab',
  'arbitrageBasePrice',
  'mono-phela',
  'mono-ahai',
  'mono-lotte',
  'mono-jollibee',
  'mono-metiz',
  'TIKTOKVIP0D',
  'JAYTSHOPEE50',
  'JAYTBE30',
  '-8.500₫',
  'Thực Trả Đáy 40.500₫'
];

console.log('=== CHECKING RESIDUAL COMMERCIAL CLAIMS IN JAYT_APEX_INTERFACE.JS ===');
targets.forEach(t => {
  const found = js.includes(t);
  console.log(`- "${t}": ${found ? '❌ FOUND' : '✅ CLEAN'}`);
});
