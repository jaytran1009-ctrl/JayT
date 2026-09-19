const https = require('https');

const headersList = [
  {
    name: 'Mobile Safari',
    headers: {
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7'
    }
  },
  {
    name: 'WhatsApp Bot (often gets full og:tags)',
    headers: {
      'User-Agent': 'WhatsApp/2.21.12.21 A',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
    }
  },
  {
    name: 'Googlebot',
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
    }
  }
];

async function testHeader(config) {
  return new Promise((resolve) => {
    https.get('https://shop.tiktok.com/vn/pdp/1734961837103548126', {
      headers: config.headers,
      timeout: 6000
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        const titleMatch = data.match(/<title[^>]*>([^<]+)<\/title>/i);
        const ogTitle = data.match(/property=["']og:title["']\s+content=["']([^"']+)["']/i) ||
                        data.match(/content=["']([^"']+)["']\s+property=["']og:title["']/i);
        const twitterTitle = data.match(/name=["']twitter:title["']\s+content=["']([^"']+)["']/i) ||
                             data.match(/content=["']([^"']+)["']\s+name=["']twitter:title["']/i);
        resolve({
          name: config.name,
          statusCode: res.statusCode,
          location: res.headers.location,
          dataLen: data.length,
          title: titleMatch ? titleMatch[1] : null,
          ogTitle: ogTitle ? ogTitle[1] : null,
          twitterTitle: twitterTitle ? twitterTitle[1] : null,
          bodySnippet: data.slice(0, 300)
        });
      });
    }).on('error', (err) => {
      resolve({ name: config.name, error: err.message });
    });
  });
}

(async () => {
  for (const h of headersList) {
    const res = await testHeader(h);
    console.log('Result for:', h.name);
    console.log(JSON.stringify(res, null, 2));
  }
})();
