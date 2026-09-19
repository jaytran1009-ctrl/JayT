const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
let content = fs.readFileSync(file, 'utf8');

const targetStart = `'<!-- JayT Smart Verdict Block -->' +`;
const startIdx = content.indexOf(targetStart);
if (startIdx !== -1) {
  const endMarker = `(radar.smartVerdict ? ('<div style="background:linear-gradient`;
  const endBlockMarker = `'</div>') : '') +`;
  const endIdx = content.indexOf(endBlockMarker, startIdx);
  if (endIdx !== -1) {
    const chunkToReplace = content.slice(startIdx, endIdx + endBlockMarker.length);
    const replacement = `'<!-- JayT 5-Standard Deep Verdict Matrix -->' +\n      renderDeepVerdictTableHtml(radar, money) +`;
    content = content.replace(chunkToReplace, replacement);
    fs.writeFileSync(file, content, 'utf8');
    console.log('Replaced inline verdict with renderDeepVerdictTableHtml successfully!');
  } else {
    console.warn('Could not find endBlockMarker!');
  }
} else {
  console.warn('Could not find targetStart!');
}
