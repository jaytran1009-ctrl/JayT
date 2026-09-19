const { execSync } = require('child_process');

try {
  const out = execSync('schtasks /query /fo LIST /v', { encoding: 'utf8' });
  const tasks = out.split('\n\n').filter(t => t.toLowerCase().includes('jayt'));
  console.log(`Found ${tasks.length} JAYT task(s):`);
  tasks.forEach(t => console.log('-------------------\n' + t.trim()));
} catch (e) {
  console.error('Error querying schtasks:', e.message);
}
