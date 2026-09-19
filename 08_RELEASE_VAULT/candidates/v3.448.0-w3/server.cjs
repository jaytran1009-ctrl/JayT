const http=require('http'),fs=require('fs'),path=require('path');
const root=__dirname;
http.createServer((req,res)=>{try{
 if(req.method!=='GET'){res.writeHead(405);return res.end();}
 const name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 const file=path.resolve(root,'.'+(name==='/'?'/index.html':name));
 if(!file.startsWith(root+path.sep)||name.includes('/.')){res.writeHead(403);return res.end();}
 let body=fs.readFileSync(file);const ext=path.extname(file);
 if(ext==='.html')body=Buffer.from(body.toString().replace('</head>','<link rel="stylesheet" href="/search.css"></head>').replace('</body>','<script src="/search.js"></script></body>'));
 res.writeHead(200,{'Content-Type':({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json'})[ext]||'application/octet-stream','Cache-Control':'no-store'});res.end(body);
 }catch{res.writeHead(404);res.end('Not found');}
}).listen(4177,'127.0.0.1',()=>console.log('Staging only http://127.0.0.1:4177'));
