const fs = require('fs');
const path = require('path');

const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
let js = fs.readFileSync(jsPath, 'utf8');

const brokenLine = "{ id: 'GROUP', icon: '👥', title: 'Kèo Nh  // --- JAYT MAXIMUM LEVEL ENGINE v4.0.0 — ACCELERATED RUNTIME ---";
const fixedBlock = `{ id: 'GROUP', icon: '👥', title: 'Kèo Nhóm Bạn', badge: 'Lập Lịch Rủ Đi', desc: 'Chọn giờ, chọn địa điểm, xuất Boarding Pass 1-chạm' }
    ];
  }

  // --- JAYT MAXIMUM LEVEL ENGINE v4.0.0 — ACCELERATED RUNTIME ---`;

if (js.includes(brokenLine)) {
  js = js.replace(brokenLine, fixedBlock);
  fs.writeFileSync(jsPath, js, 'utf8');
  console.log('✅ Fixed syntax error at line 4322');
} else {
  console.log('Searching for broken pattern...');
  const idx = js.indexOf("title: 'Kèo Nh");
  if (idx !== -1) {
    console.log('Found substring:', js.substring(idx, idx + 100));
    const nextLineIdx = js.indexOf('\n', idx);
    js = js.substring(0, idx) + fixedBlock + js.substring(nextLineIdx);
    fs.writeFileSync(jsPath, js, 'utf8');
    console.log('✅ Replaced broken substring');
  }
}
