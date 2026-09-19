const fs = require('fs');
const https = require('https');

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      let html = '';
      res.on('data', c => html += c);
      res.on('end', () => resolve(html));
    }).on('error', reject);
  });
}

async function checkMetiz() {
  const html = await fetchHtml('https://metiz.vn/tin-va-khuyen-mai.html');
  const imgRegex = /src=["']([^"']+)["']/gi;
  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    if (match[1].includes('Fileuploads') || match[1].includes('images')) {
      console.log('Metiz Image:', match[1]);
    }
  }
}

checkMetiz().catch(console.error);
