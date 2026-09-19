const fs = require('fs');
const path = require('path');

const memoryPath = path.resolve(__dirname, '../PROJECT_MEMORY.md');
const lines = fs.readFileSync(memoryPath, 'utf8').split('\n');

let count = 0;
lines.forEach((l, i) => {
  if (l.includes('Current Lifecycle State')) {
    count++;
    console.log(`Line ${i + 1}: ${l.trim()}`);
  }
});

console.log(`\nTotal occurrences of "Current Lifecycle State": ${count}`);
if (count === 1) {
  console.log('✅ Exactly ONE Canonical Current Lifecycle State header exists in PROJECT_MEMORY.md!');
} else {
  console.error('❌ Multiple Current Lifecycle State headers found!');
  process.exit(1);
}
