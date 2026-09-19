const fs = require('fs');
const path = require('path');

const htmlPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/index.html');
const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');

const html = fs.readFileSync(htmlPath, 'utf8');
const js = fs.readFileSync(jsPath, 'utf8');

console.log('--- INDEX.HTML INSPECTION ---');
console.log('Length:', html.length);
console.log('Contains student-hub-master in HTML file itself?', html.includes('student-hub-master'));
console.log('Contains student-hub-container in HTML file itself?', html.includes('student-hub-container'));

// Let's see what is inside <body> in index.html
const bodyStart = html.indexOf('<body');
const bodyEnd = html.indexOf('</body>');
console.log('Body length:', bodyEnd - bodyStart);
console.log('Body snippet (first 1000 chars):');
console.log(html.substring(bodyStart, bodyStart + 1000));

console.log('\n--- JAYT APEX INTERFACE INSPECTION ---');
console.log('How is JS mounted?');
const mountIdx = js.indexOf('mount(');
if (mountIdx !== -1) {
  console.log(js.substring(mountIdx - 200, mountIdx + 400));
}

// Let's check how index.html loads jayt_apex_interface.js
const scriptIdx = html.lastIndexOf('<script');
console.log('\nLast script tag in index.html:');
console.log(html.substring(scriptIdx));
