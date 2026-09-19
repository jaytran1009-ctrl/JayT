const https = require('https');

https.get('https://deploy-ten-xi-48.vercel.app/index.html', (res) => {
  console.log('Status code:', res.statusCode);
  console.log('Headers:', res.headers);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('index.html length:', data.length);
    console.log('Has student-hub-master in index.html?', data.includes('student-hub-master'));
    const matches = data.match(/<script src="([^"]+)">/g);
    console.log('Scripts in index.html:', matches);
  });
});
