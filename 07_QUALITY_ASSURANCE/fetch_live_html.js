const https = require('https');

https.get('https://deploy-ten-xi-48.vercel.app/index.html?v=' + Date.now(), {
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  }
}, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('Uncompressed body length:', body.length);
    console.log('Includes student-hub-master in CSS of index.html?', body.includes('student-hub-master'));
    console.log('Includes #arbitrage-price-slider in CSS?', body.includes('#arbitrage-price-slider'));
    console.log('Script tag in index.html:', body.match(/<script[^>]*>/g));
  });
});
