const https = require('https');
const http = require('http');
const { URL } = require('url');

function follow(urlString, hops = 0) {
  if (hops > 5) {
    console.log('Max hops reached');
    return;
  }
  console.log(`[Hop ${hops}] Fetching: ${urlString}`);
  const parsed = new URL(urlString);
  const client = parsed.protocol === 'https:' ? https : http;
  
  const req = client.get(urlString, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7'
    }
  }, (res) => {
    console.log(`[Hop ${hops}] Status: ${res.statusCode}`);
    if (res.headers.location) {
      console.log(`[Hop ${hops}] Location: ${res.headers.location}`);
      const nextUrl = new URL(res.headers.location, urlString).href;
      follow(nextUrl, hops + 1);
      return;
    }

    let chunks = [];
    res.on('data', c => chunks.push(c));
    res.on('end', () => {
      const body = Buffer.concat(chunks).toString('utf8');
      console.log(`[Hop ${hops}] Body length: ${body.length}`);
      
      const titleMatch = body.match(/<title[^>]*>([^<]+)<\/title>/i);
      console.log('Title:', titleMatch ? titleMatch[1] : 'No <title>');
      
      const ogTitle = body.match(/property=["']og:title["']\s+content=["']([^"']+)["']/i) ||
                      body.match(/content=["']([^"']+)["']\s+property=["']og:title["']/i);
      console.log('OG Title:', ogTitle ? ogTitle[1] : 'No og:title');

      const ogDesc = body.match(/property=["']og:description["']\s+content=["']([^"']+)["']/i) ||
                     body.match(/content=["']([^"']+)["']\s+property=["']og:description["']/i);
      console.log('OG Desc:', ogDesc ? ogDesc[1] : 'No og:description');

      const ogUrl = body.match(/property=["']og:url["']\s+content=["']([^"']+)["']/i) ||
                    body.match(/content=["']([^"']+)["']\s+property=["']og:url["']/i);
      console.log('OG URL:', ogUrl ? ogUrl[1] : 'No og:url');

      // Let's also check canonical link
      const canonical = body.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
      console.log('Canonical:', canonical ? canonical[1] : 'No canonical');

      // Search for product title in json-ld or window state
      const jsonLd = body.match(/<script\s+type=["']application\/ld\+json["']>([^<]+)<\/script>/i);
      if (jsonLd) {
        console.log('Found JSON-LD:', jsonLd[1].slice(0, 300));
      }
    });
  });

  req.on('error', (err) => console.error('Req error:', err.message));
}

follow('https://vt.tiktok.com/ZS9AJ7tbWDtcs-yOIvD/');
