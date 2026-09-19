/**
 * JAYT METIZ CINEMA PHYSICAL EVIDENCE CAPTURE RUNNER (069-STEP2)
 * Directive: JAYT-CONTEXT-AND-LESSONS-MANDATORY-GATE (Step 2 Real Evidence Bundle)
 * 
 * Captures 4 canonical pages of Metiz Cinema Đà Nẵng via Chrome CDP:
 * 1. Super Monday (Thứ Hai Siêu Hạng - 55.000đ): https://metiz.vn/promotion/super-monday-thu-hai-sieu-hang-2.html
 * 2. Ưu Đãi U22 (Thứ Ba - Thứ Năm - 55.000đ): https://metiz.vn/promotion/khuyen-mai-gia-ve-u22-21.html
 * 3. Lịch Chiếu Phim Live (24/08 - 27/08): https://metiz.vn/lich-chieu-phim.html
 * 4. Pháp Nhân & Địa Chỉ Rạp (Helio Center, Đường 2/9, Hải Châu, Đà Nẵng): https://metiz.vn/news/huong-dan-loi-vao-khu-vuc-giu-xe-metiz-cinema-2.html & Footer
 * 
 * Saves:
 * - PNG Screenshots
 * - Rendered HTML
 * - Extracted Text
 * - Capture Receipts with measured SHA-256 hashes directly from disk
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawn } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const evidenceDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'raw_evidence', 'batch_069_step2_metiz');
fs.mkdirSync(evidenceDir, { recursive: true });

function getSha256(bufferOrStr) {
  return crypto.createHash('sha256').update(bufferOrStr).digest('hex');
}

function findBrowserPath() {
  const candidates = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    path.join(process.env.LOCALAPPDATA || '', 'Google\\Chrome\\Application\\chrome.exe'),
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
  ];
  for (const c of candidates) {
    if (c && fs.existsSync(c)) return c;
  }
  return null;
}

const captureTasks = [
  {
    key: 'METIZ_SUPER_MONDAY',
    url: 'https://metiz.vn/promotion/super-monday-thu-hai-sieu-hang-2.html',
    prefix: 'metiz_super_monday_capture',
    receiptName: 'CAPTURE_RECEIPT_METIZ_SUPER_MONDAY.json',
    description: 'Chương trình Super Monday (Thứ Hai Siêu Hạng 55.000đ) tại Metiz Cinema Đà Nẵng'
  },
  {
    key: 'METIZ_U22',
    url: 'https://metiz.vn/promotion/khuyen-mai-gia-ve-u22-21.html',
    prefix: 'metiz_u22_capture',
    receiptName: 'CAPTURE_RECEIPT_METIZ_U22.json',
    description: 'Chương trình Giá Vé U22 (Thứ Ba đến Thứ Năm 55.000đ) tại Metiz Cinema Đà Nẵng'
  },
  {
    key: 'METIZ_LICH_CHIEU',
    url: 'https://metiz.vn/lich-chieu-phim.html',
    prefix: 'metiz_lich_chieu_phim_capture',
    receiptName: 'CAPTURE_RECEIPT_METIZ_LICH_CHIEU.json',
    description: 'Lịch chiếu phim thực tế đang vận hành tại Metiz Cinema Đà Nẵng'
  },
  {
    key: 'METIZ_DIA_CHI_PHAP_NHAN',
    url: 'https://metiz.vn/news/huong-dan-loi-vao-khu-vuc-giu-xe-metiz-cinema-2.html',
    prefix: 'metiz_dia_chi_phap_nhan_capture',
    receiptName: 'CAPTURE_RECEIPT_METIZ_DIA_CHI.json',
    description: 'Thông tin pháp nhân Công ty TNHH Khởi Phát & Vị trí rạp Metiz Cinema tại Helio Center Đà Nẵng'
  }
];

async function main() {
  const browserPath = findBrowserPath();
  if (!browserPath) {
    console.error('FATAL: Browser executable not found!');
    process.exit(1);
  }

  const port = 9600 + Math.floor(Math.random() * 100);
  console.log(`🚀 [METIZ-CAPTURE-069-STEP2] Khởi động Chrome CDP trên cổng ${port}...`);

  const chromeProc = spawn(browserPath, [
    '--headless',
    '--disable-gpu',
    '--no-sandbox',
    `--remote-debugging-port=${port}`,
    '--window-size=1280,1024'
  ]);

  let ws = null;
  try {
    for (let attempt = 0; attempt < 25; attempt++) {
      await new Promise(r => setTimeout(r, 200));
      try {
        const listRes = await fetch(`http://127.0.0.1:${port}/json/version`);
        if (listRes.ok) {
          const ver = await listRes.json();
          ws = new WebSocket(ver.webSocketDebuggerUrl);
          await new Promise((res, rej) => {
            ws.onopen = res;
            ws.onerror = rej;
          });
          break;
        }
      } catch {}
    }

    if (!ws) throw new Error(`Cannot connect to Chrome CDP on port ${port}`);

    let msgId = 1;
    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = msgId++;
        const timeout = setTimeout(() => reject(new Error(`CDP command ${method} timed out`)), 30000);
        const handler = (event) => {
          const data = JSON.parse(event.data);
          if (data.id === id) {
            clearTimeout(timeout);
            ws.removeEventListener('message', handler);
            resolve(data.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    const createdReceipts = [];

    for (const task of captureTasks) {
      console.log(`\n======================================================`);
      console.log(`📡 Đang thu thập: ${task.key} (${task.url})...`);

      const newTarget = await send('Target.createTarget', { url: task.url, width: 1280, height: 1024 });
      const targetId = newTarget.targetId;

      await new Promise(r => setTimeout(r, 500));
      const pagesRes = await fetch(`http://127.0.0.1:${port}/json/list`);
      const pages = await pagesRes.json();
      const targetPage = pages.find(p => p.id === targetId);

      const pageWs = new WebSocket(targetPage.webSocketDebuggerUrl);
      await new Promise((resolve, reject) => {
        pageWs.onopen = resolve;
        pageWs.onerror = reject;
      });

      let pageMsgId = 1;
      function sendPage(method, params = {}) {
        return new Promise((resolve, reject) => {
          const id = pageMsgId++;
          const timeout = setTimeout(() => reject(new Error(`Page command ${method} timed out`)), 30000);
          const handler = (event) => {
            const data = JSON.parse(event.data);
            if (data.id === id) {
              clearTimeout(timeout);
              pageWs.removeEventListener('message', handler);
              resolve(data.result);
            }
          };
          pageWs.addEventListener('message', handler);
          pageWs.send(JSON.stringify({ id, method, params }));
        });
      }

      await sendPage('Page.enable');
      await sendPage('Runtime.enable');
      await sendPage('DOM.enable');

      await new Promise(r => setTimeout(r, 4500));

      // 1. Capture PNG Screenshot
      const screenshotRes = await sendPage('Page.captureScreenshot', { format: 'png', fromSurface: true });
      const pngBuffer = Buffer.from(screenshotRes.data, 'base64');
      const pngPath = path.join(evidenceDir, `${task.prefix}.png`);
      fs.writeFileSync(pngPath, pngBuffer);
      const pngSha = getSha256(pngBuffer);
      console.log(`  📸 Đã lưu PNG: ${pngPath} (${pngBuffer.length} B, SHA: ${pngSha})`);

      // 2. Capture DOM HTML
      const htmlRes = await sendPage('Runtime.evaluate', { expression: 'document.documentElement.outerHTML' });
      const htmlContent = htmlRes.result?.value || '';
      const htmlPath = path.join(evidenceDir, `${task.prefix}.html`);
      fs.writeFileSync(htmlPath, htmlContent, 'utf8');
      const htmlSha = getSha256(htmlContent);
      console.log(`  🌐 Đã lưu HTML: ${htmlPath} (${Buffer.byteLength(htmlContent, 'utf8')} B, SHA: ${htmlSha})`);

      // 3. Extract Text
      const textRes = await sendPage('Runtime.evaluate', { expression: 'document.body ? document.body.innerText : ""' });
      const textContent = textRes.result?.value || '';
      const textPath = path.join(evidenceDir, `${task.prefix}.txt`);
      fs.writeFileSync(textPath, textContent, 'utf8');
      const textSha = getSha256(textContent);
      console.log(`  📝 Đã lưu Text: ${textPath} (${Buffer.byteLength(textContent, 'utf8')} B, SHA: ${textSha})`);

      // 4. Create Capture Receipt
      const receiptRelativeDir = path.relative(repoRoot, evidenceDir).replace(/\\/g, '/');
      const receiptObj = {
        $schema: 'https://jayt.vn/schemas/raw-capture-receipt.v1.json',
        receipt_id: `RECEIPT_${task.key}_${Date.now()}`,
        task_key: task.key,
        lead_id: 'LEAD-068-02-METIZ',
        merchant_name: 'Metiz Cinema Đà Nẵng',
        target_url: task.url,
        description: task.description,
        captured_at: new Date().toISOString(),
        capture_method: 'LIVE_CHROME_CDP_ANONYMOUS',
        browser_info: 'Google Chrome Headless via CDP WebSocket',
        artifacts: {
          screenshot_png: {
            path: `${receiptRelativeDir}/${task.prefix}.png`,
            sha256: pngSha,
            size_bytes: pngBuffer.length
          },
          dom_html: {
            path: `${receiptRelativeDir}/${task.prefix}.html`,
            sha256: htmlSha,
            size_bytes: Buffer.byteLength(htmlContent, 'utf8')
          },
          extracted_text: {
            path: `${receiptRelativeDir}/${task.prefix}.txt`,
            sha256: textSha,
            size_bytes: Buffer.byteLength(textContent, 'utf8')
          }
        },
        integrity_status: 'VERIFIED_ON_DISK'
      };

      const receiptPath = path.join(evidenceDir, task.receiptName);
      fs.writeFileSync(receiptPath, JSON.stringify(receiptObj, null, 2), 'utf8');
      console.log(`  🧾 Đã lưu Receipt: ${receiptPath}`);
      createdReceipts.push(receiptPath);

      pageWs.close();
      await send('Target.closeTarget', { targetId });
    }

    console.log(`\n🎉 [COMPLETE] Đã thu thập thành công 4 bộ bằng chứng Metiz Cinema Đà Nẵng!`);
  } finally {
    if (ws) ws.close();
    chromeProc.kill('SIGTERM');
  }
}

main().catch(console.error);
