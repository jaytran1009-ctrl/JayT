const fs = require('fs');

const content = fs.readFileSync('03_SOURCE_OF_TRUTH/jayt_apex_interface.js', 'utf8');
const lazMatches = content.match(/https:\/\/www\.lazada\.vn\/products\/[^\s"'<>]+/g);
console.log('Lazada matches count in SOT:', lazMatches ? lazMatches.length : 0);
if (lazMatches) {
  lazMatches.forEach((m, idx) => console.log(`${idx + 1}: ${m}`));
}

const ttMatches = content.match(/https:\/\/shop\.tiktok\.com\/view\/product\/[^\s"'<>]+/g);
console.log('TikTok matches count in SOT:', ttMatches ? ttMatches.length : 0);
if (ttMatches) {
  ttMatches.forEach((m, idx) => console.log(`${idx + 1}: ${m}`));
}
