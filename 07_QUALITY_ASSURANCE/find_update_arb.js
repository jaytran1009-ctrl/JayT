const fs = require('fs');
const path = require('path');

const sotDir = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH');
const files = fs.readdirSync(sotDir);

files.forEach(file => {
  const filePath = path.join(sotDir, file);
  if (fs.statSync(filePath).isFile()) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    lines.forEach((l, i) => {
      if (l.includes('updateArbitrageEngine') || l.includes('selectArbitragePreset')) {
        console.log(`[${file} L${i+1}]: ${l.trim()}`);
      }
    });
  }
});
