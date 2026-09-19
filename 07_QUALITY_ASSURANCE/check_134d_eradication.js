const fs = require('fs');
const js = fs.readFileSync('03_SOURCE_OF_TRUTH/jayt_apex_interface.js', 'utf8');

console.log('1. has TIKTOKVIP0D:', js.includes('TIKTOKVIP0D'));
console.log('2. has JAYTSHOPEE50:', js.includes('JAYTSHOPEE50'));
console.log('3. has JAYTBE30:', js.includes('JAYTBE30'));
console.log('4. has -8.500₫:', js.includes('-8.500₫'));
console.log('5. has -15.000₫:', js.includes('-15.000₫'));
console.log('6. has -21.000₫:', js.includes('-21.000₫'));
console.log('7. has Thực Trả Đáy 40.500₫:', js.includes('Thực Trả Đáy 40.500₫'));
console.log('8. has Cơm Tấm Sườn Cay in roulette:', js.includes('Cơm Tấm Sườn Cay (Ngô Văn Sở)'));
console.log('9. has Metiz fallback in export pass:', js.includes("venue || 'Metiz Cinema Helio'"));
console.log('10. has Cứu Đói ≤ 25K:', js.includes('Cứu Đói ≤ 25K'));
console.log('11. has Đặc Quyền .edu.vn (0đ):', js.includes('Đặc Quyền .edu.vn (0đ)'));
console.log('12. has Săn Đồ KTX Xếp Mã:', js.includes('Săn Đồ KTX Xếp Mã'));
