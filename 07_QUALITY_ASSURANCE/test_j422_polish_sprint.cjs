const http=require('http');
const fs=require('fs');
const path=require('path');
const puppeteer=require('puppeteer');
const assert=require('assert');
const root=path.resolve(__dirname,'../deploy');
const port=4183;
const mime={'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.json':'application/json'};
const server=http.createServer((req,res)=>{const clean=req.url.split('?')[0]==='/'?'/index.html':req.url.split('?')[0];const file=path.join(root,clean);if(fs.existsSync(file)&&fs.statSync(file).isFile()){res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'});fs.createReadStream(file).pipe(res)}else{res.writeHead(404);res.end('Not found')}});

(async()=>{
  await new Promise(resolve=>server.listen(port,'127.0.0.1',resolve));
  const browser=await puppeteer.launch({headless:true,args:['--no-sandbox']});
  try{
    for(const vp of [{width:360,height:800},{width:375,height:812},{width:390,height:844},{width:1440,height:900}]){
      const page=await browser.newPage();const errors=[];
      page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});page.on('pageerror',e=>errors.push(e.message));
      await page.setViewport({...vp,deviceScaleFactor:1});const response=await page.goto(`http://127.0.0.1:${port}/`,{waitUntil:'networkidle2'});assert.strictEqual(response.status(),200);
      const m=await page.evaluate(()=>{const buttons=[...document.querySelectorAll('.j411-quick-grid button')];const rects=buttons.map(b=>b.getBoundingClientRect());const grid=document.querySelector('.j411-quick-grid');const title=document.querySelector('.j411-radar .j406-title');return{version:document.querySelector('[data-version]')?.dataset.version,fontSize:parseFloat(getComputedStyle(title).fontSize),lineHeight:parseFloat(getComputedStyle(title).lineHeight),gridDisplay:getComputedStyle(grid).display,columns:getComputedStyle(grid).gridTemplateColumns,rects:rects.map(r=>({x:r.x,y:r.y,width:r.width,height:r.height})),overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth,undefinedText:/\bundefined\b/i.test(document.body.innerText),affiliateLeak:document.documentElement.innerHTML.includes('affiliate_enabled: true'),modules:['#campus-dock-section','#cinema-schedule-container','#lunch-arbitrage-module','#split-bill-module','#dorm-shopping-module'].every(s=>document.querySelector(s))};});
      assert.strictEqual(m.version,'v3.466.0-j422');assert(!m.overflow&&!m.undefinedText&&!m.affiliateLeak&&m.modules);assert.strictEqual(errors.length,0,errors.join('\n'));
      if(vp.width<=760){assert(m.fontSize<=33&&m.fontSize>=28);assert.strictEqual(m.gridDisplay,'grid');assert.strictEqual(m.rects.length,4);assert(m.rects[0].width>m.rects[1].width*2.8);assert(Math.abs(m.rects[1].y-m.rects[2].y)<1&&Math.abs(m.rects[2].y-m.rects[3].y)<1);assert(Math.abs(m.rects[1].width-m.rects[2].width)<1&&Math.abs(m.rects[2].width-m.rects[3].width)<1);}
      const hud=await page.evaluate(()=>{const t=performance.now();openCashierQuickCard('highlands_coffee');return performance.now()-t});assert(hud<30);
      console.log(`J422 ${vp.width}px PASS | title ${m.fontSize}px | HUD ${hud.toFixed(2)}ms | 0 errors`);await page.close();
    }
  }finally{await browser.close();server.close()}
})().catch(e=>{console.error(e);server.close();process.exit(1)});
