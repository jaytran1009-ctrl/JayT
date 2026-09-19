/**
 * JAYT-420: PHASE 3 - SANITIZE SEARCH QUERY IN DISPATCH SMART AFFILIATE
 */

const fs = require('fs');
const path = require('path');

const APEX_PATH = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
let code = fs.readFileSync(APEX_PATH, 'utf8');

const targetLine = `  const searchQuery = isObjectPayload ? (targetPayload.searchQuery || 'sản phẩm') : (typeof offerPayload === 'string' ? offerPayload : 'sản phẩm');`;

const replacement = `  let searchQuery = isObjectPayload ? (targetPayload.searchQuery || 'sản phẩm') : (typeof offerPayload === 'string' ? offerPayload : 'sản phẩm');
  if (typeof isGibberishText === 'function' && isGibberishText(searchQuery)) {
    if (isObjectPayload && targetPayload.cleanTitle && !isGibberishText(targetPayload.cleanTitle)) {
      searchQuery = targetPayload.cleanTitle;
    } else if (isObjectPayload && targetPayload.brand && targetPayload.brand !== 'Chính Hãng') {
      searchQuery = targetPayload.brand + ' ' + (targetPayload.category || 'sản phẩm');
    } else {
      searchQuery = 'sản phẩm chính hãng';
    }
  }`;

if (code.includes(targetLine)) {
  code = code.replace(targetLine, replacement);
  console.log('Sanitized searchQuery in dispatchSmartAffiliate.');
  fs.writeFileSync(APEX_PATH, code, 'utf8');
} else {
  console.warn('Could not find targetLine in dispatchSmartAffiliate!');
}
