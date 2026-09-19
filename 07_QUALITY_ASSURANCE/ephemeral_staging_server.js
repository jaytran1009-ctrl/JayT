/**
 * EPHEMERAL STAGING PREVIEW SERVER
 * Governing Directive: JAYT-245 Section JAYT-262-CORRECTION-4 (Lines 5691-5704)
 *
 * Dedicated ephemeral server for isolated build-to-serve chain verification.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

let port = 4178;
let serveDir = path.resolve(__dirname, 'ephemeral_deploy_trace');

const args = process.argv.slice(2);
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--port' && args[i + 1]) {
    port = parseInt(args[i + 1], 10);
    i++;
  } else if (args[i] === '--dir' && args[i + 1]) {
    serveDir = path.resolve(args[i + 1]);
    i++;
  }
}

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, 'http://' + req.headers.host);
  const pathname = parsedUrl.pathname;

  if (pathname === '/health') {
    const indexPath = path.join(serveDir, 'index.html');
    let indexSha256 = null;
    if (fs.existsSync(indexPath)) {
      indexSha256 = crypto.createHash('sha256').update(fs.readFileSync(indexPath)).digest('hex');
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'UP',
      server_type: 'EPHEMERAL_STAGING_SERVER',
      port: port,
      serve_dir: serveDir,
      index_file_exists: fs.existsSync(indexPath),
      index_sha256: indexSha256,
      pid: process.pid
    }, null, 2));
    return;
  }

  let filePath = path.join(serveDir, pathname === '/' ? 'index.html' : pathname);
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
    return;
  }

  const content = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  let contentType = 'text/html; charset=utf-8';
  if (ext === '.js') contentType = 'application/javascript; charset=utf-8';
  else if (ext === '.json') contentType = 'application/json; charset=utf-8';
  else if (ext === '.css') contentType = 'text/css; charset=utf-8';

  res.writeHead(200, {
    'Content-Type': contentType,
    'Cache-Control': 'no-store, no-cache, must-revalidate'
  });
  res.end(content);
});

server.listen(port, '127.0.0.1', () => {
  console.log('[EPHEMERAL_SERVER_READY] PID:' + process.pid + ' PORT:' + port + ' DIR:' + serveDir);
});

process.on('SIGTERM', () => {
  server.close(() => process.exit(0));
});
process.on('SIGINT', () => {
  server.close(() => process.exit(0));
});
