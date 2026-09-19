const fs = require('fs');
const path = require('path');

const newFn = `function isGibberishText(str) {
  if (!str || typeof str !== 'string') return true;
  const s = str.trim();
  if (s.length < 3) return true;
  if (/ZS[0-9A-Za-z_-]{6,}/i.test(s)) return true;
  if (/^[0-9a-zA-Z_-]{8,}$/.test(s) && !/[aeiouyAEIOUYàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹ]/.test(s)) return true;
  if (/\\s+/.test(s)) {
    const words = s.split(/\\s+/).filter(Boolean);
    if (words.some(w => /ZS[0-9A-Za-z_-]{6,}/i.test(w))) return true;
    const recognizedWords = words.filter(w => /[aeiouyàáạảãâèéẹẻẽêìíịỉĩòóọỏõôùúụủũưỳýỵỷỹ]/i.test(w) && w.length >= 2);
    if (recognizedWords.length === 0) return true;
    return false;
  }
  return false;
}`;

function updateFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  const oldFnRegex = /function isGibberishText\(str\) \{[\s\S]*?\n\}/;
  if (oldFnRegex.test(content)) {
    content = content.replace(oldFnRegex, newFn);
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated isGibberishText in', file);
  } else {
    console.warn('Could not match isGibberishText in', file);
  }
}

updateFile(path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js'));
updateFile(path.resolve(__dirname, '../deploy/api/resolve-link.js'));
updateFile(path.resolve(__dirname, '../api/resolve-link.js'));
