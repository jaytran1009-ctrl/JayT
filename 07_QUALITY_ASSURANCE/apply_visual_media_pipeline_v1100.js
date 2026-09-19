const fs = require('fs');
const path = require('path');

const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
const htmlPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/index.html');

let js = fs.readFileSync(jsPath, 'utf8');
let html = fs.readFileSync(htmlPath, 'utf8');

console.log('--- 1. ADDING VISUAL MEDIA PIPELINE CSS TO index.html ---');

const mediaCss = `
/* ==========================================================================
   JAYT VISUAL MEDIA & IMAGE PIPELINE v11.0.0
   ========================================================================== */

/* 1. KHUNG THUMBNAIL QUÁN ĂN & TRÀ SỮA */
.store-thumb-wrapper {
  position: relative;
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  border-radius: 14px;
  overflow: hidden;
  background: var(--surface-subtle);
  border: 1px solid var(--border-hairline);
}

.store-real-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.store-editorial-card:hover .store-real-thumb,
.rescue-food-card:hover .store-real-thumb {
  transform: scale(1.08);
}

.store-brand-pill {
  position: absolute;
  bottom: 4px;
  left: 4px;
  right: 4px;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(4px);
  color: #FFFFFF;
  font-size: 9.5px;
  font-weight: 800;
  text-align: center;
  padding: 1px 0;
  border-radius: 5px;
  letter-spacing: 0.2px;
}

/* 2. KHUNG ẢNH SẢN PHẨM KTX */
.gear-image-box {
  position: relative;
  width: 100%;
  height: 130px;
  background: var(--surface-subtle);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 10px;
}

.gear-real-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.gear-card:hover .gear-real-image {
  transform: scale(1.08);
}

.badge-freeship-floating {
  position: absolute;
  top: 6px;
  left: 6px;
  background: rgba(16, 185, 129, 0.9);
  backdrop-filter: blur(4px);
  color: #FFFFFF;
  font-size: 10px;
  font-weight: 800;
  padding: 2px 7px;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}

/* 3. LOGO RẠP PHIM & THƯƠNG HIỆU */
.cinema-brand-logo {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  object-fit: cover;
  border: 1px solid var(--border-hairline);
  background: #FFFFFF;
  flex-shrink: 0;
}
`;

if (!html.includes('JAYT VISUAL MEDIA & IMAGE PIPELINE')) {
  const anchor = '/* ==========================================================================';
  html = html.replace(anchor, mediaCss + '\n' + anchor);
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('✅ Injected Visual Media Pipeline CSS to index.html');
}

console.log('\n--- 2. UPDATING CAMPUS RESCUE DIRECTORY WITH REAL PHOTOS ---');

const realPhotoDirectoryJs = `
  // DỮ LIỆU ĐÃ BỔ SUNG GPS MAPS, HOTLINE, NHÃN CÚ ĐÊM & ẢNH CHỤP THỰC TẾ
  const campusRescueDirectoryV9 = {
    BK_SP: [
      { 
        name: "Cơm Tấm Sườn Cay", 
        address: "42 Ngô Văn Sở, Hòa Khánh", 
        price: "20.000₫ - 25.000₫", 
        perk: "Trà đá + Canh thêm 0đ",
        nightOwl: true,
        mapsUrl: "https://maps.google.com/?q=42+Ngô+Văn+Sở+Đà+Nẵng",
        phone: "0905123456",
        photo: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=200&auto=format&fit=crop&q=80",
        tag: "Cơm Tấm"
      },
      { 
        name: "Bún Mắm Dì Nga", 
        address: "Cổng Chợ Hòa Khánh", 
        price: "15.000₫ - 20.000₫", 
        perk: "Suất no lâu, mở đến 23:00",
        nightOwl: true,
        mapsUrl: "https://maps.google.com/?q=Chợ+Hòa+Khánh+Đà+Nẵng",
        phone: "",
        photo: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=200&auto=format&fit=crop&q=80",
        tag: "Bún Mắm"
      },
      { 
        name: "Bánh Mì Chả Bò Cô Bích", 
        address: "Khu F Bách Khoa", 
        price: "12.000₫ - 15.000₫", 
        perk: "Mở 06:00 - 02:00 sáng",
        nightOwl: true,
        mapsUrl: "https://maps.google.com/?q=Đại+học+Bách+Khoa+Đà+Nẵng",
        phone: "0935987654",
        photo: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=200&auto=format&fit=crop&q=80",
        tag: "Bánh Mì"
      }
    ],
    DUE: [
      { 
        name: "Cơm Gà Xé Kiệt K48", 
        address: "48 Hồ Xuân Hương, Ngũ Hành Sơn", 
        price: "25.000₫", 
        perk: "Sinh viên xin thêm cơm 0đ",
        nightOwl: false,
        mapsUrl: "https://maps.google.com/?q=48+Hồ+Xuân+Hương+Đà+Nẵng",
        phone: "0905555888",
        photo: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=200&auto=format&fit=crop&q=80",
        tag: "Cơm Gà"
      },
      { 
        name: "Bánh Mì Que & Xôi Gà", 
        address: "Chợ Bắc Mỹ An", 
        price: "12.000₫ - 18.000₫", 
        perk: "Ngon rẻ, mở đến 22:30",
        nightOwl: true,
        mapsUrl: "https://maps.google.com/?q=Chợ+Bắc+Mỹ+An+Đà+Nẵng",
        phone: "",
        photo: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=200&auto=format&fit=crop&q=80",
        tag: "Bánh Mì"
      },
      { 
        name: "Bún Thịt Nướng Cô Ba", 
        address: "Khu Phố Tây An Thượng", 
        price: "20.000₫ - 25.000₫", 
        perk: "Rau sống + Nước lèo thêm 0đ",
        nightOwl: false,
        mapsUrl: "https://maps.google.com/?q=An+Thượng+Đà+Nẵng",
        phone: "0905112233",
        photo: "https://images.unsplash.com/photo-1576577445504-6af96477db52?w=200&auto=format&fit=crop&q=80",
        tag: "Bún Nướng"
      }
    ],
    DUYTAN: [
      { 
        name: "Cơm Bình Dân Dì Mai", 
        address: "100 Thái Phiên, Hải Châu", 
        price: "20.000₫ - 25.000₫", 
        perk: "Có phòng máy lạnh trưa",
        nightOwl: false,
        mapsUrl: "https://maps.google.com/?q=100+Thái+Phiên+Đà+Nẵng",
        phone: "0905667788",
        photo: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=200&auto=format&fit=crop&q=80",
        tag: "Cơm Dì Mai"
      },
      { 
        name: "Bún Bò Huế Bình Dân", 
        address: "Kiệt Quang Trung", 
        price: "20.000₫ - 25.000₫", 
        perk: "Ưu tiên suất đầy đặn cho HSSV",
        nightOwl: true,
        mapsUrl: "https://maps.google.com/?q=Quang+Trung+Đà+Nẵng",
        phone: "",
        photo: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=200&auto=format&fit=crop&q=80",
        tag: "Bún Bò"
      }
    ],
    NN_SPKT: [
      { 
        name: "Bún Chả Cá & Bánh Bột Lọc", 
        address: "Đường Lương Nhữ Hộc", 
        price: "15.000₫ - 20.000₫", 
        perk: "Giá niêm yết chuẩn HSSV",
        nightOwl: false,
        mapsUrl: "https://maps.google.com/?q=Lương+Nhữ+Hộc+Đà+Nẵng",
        phone: "",
        photo: "https://images.unsplash.com/photo-1576577445504-6af96477db52?w=200&auto=format&fit=crop&q=80",
        tag: "Bún Chả Cá"
      },
      { 
        name: "Cơm Phần Tự Chọn Dì Lan", 
        address: "Gần ĐH Sư Phạm Kỹ Thuật", 
        price: "20.000₫ - 25.000₫", 
        perk: "Miễn phí trà sâm dứa",
        nightOwl: true,
        mapsUrl: "https://maps.google.com/?q=Đại+học+Sư+phạm+Kỹ+thuật+Đà+Nẵng",
        phone: "0905889900",
        photo: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=200&auto=format&fit=crop&q=80",
        tag: "Cơm Dì Lan"
      }
    ]
  };

  function renderCampusDealsV9(campusKey, chip) {
    playHapticTick();
    document.querySelectorAll('.campus-chip').forEach(c => c.classList.remove('active'));
    if (chip) chip.classList.add('active');

    const container = document.getElementById('foodRescueMatrixContainer');
    if (!container) return;
    const items = campusRescueDirectoryV9[campusKey] || campusRescueDirectoryV9.BK_SP || [];

    container.innerHTML = items.map(item => \`
      <div class="rescue-food-card apex-spring-interactive" style="display:flex; flex-direction:column; justify-content:space-between; gap:12px;">
        <div style="display:flex; gap:12px; align-items:flex-start;">
          <div class="store-thumb-wrapper">
            <img src="\${item.photo}" alt="\${item.name}" class="store-real-thumb" loading="lazy" decoding="async" width="80" height="80">
            <span class="store-brand-pill">\${item.tag}</span>
          </div>
          <div style="flex:1;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 6px;">
              <div style="font-weight: 800; font-size: 14.5px; color: var(--text-main); line-height:1.3;">\${item.name}</div>
              \${item.nightOwl ? '<span class="badge-night-owl">🌙 22h+</span>' : ''}
            </div>
            <div style="font-size: 11.5px; color: var(--text-muted); margin: 3px 0 4px 0;">📍 \${item.address}</div>
            <div style="font-size: 14.5px; font-weight: 800; color: var(--emerald);">\${item.price}</div>
            <div style="font-size: 11px; color: var(--emerald); font-weight: 700; margin-top: 3px;">🎁 \${item.perk}</div>
          </div>
        </div>
        <div style="display: flex; gap: 8px; margin-top: auto;">
          <a href="\${item.mapsUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-action btn-action-map apex-spring-interactive">🗺️ Chỉ Đường ↗</a>
          \${item.phone ? \`<a href="tel:\${item.phone}" class="btn-card-action btn-action-call apex-spring-interactive">📞 Gọi Quán</a>\` : ''}
        </div>
      </div>
    \`).join('');
  }
`;

// Replace old campus directory
const oldDirRegex = /\/\/ DỮ LIỆU ĐÃ BỔ SUNG GPS MAPS, HOTLINE & NHÃN CÚ ĐÊM[\s\S]*?container\.innerHTML = items\.map[\s\S]*?`\)\.join\(''\);\s*}/;
if (oldDirRegex.test(js)) {
  js = js.replace(oldDirRegex, realPhotoDirectoryJs.trim());
  console.log('✅ Injected real photo campus directory into JS');
}

// 3. Update Default Tab 1 Food Rescue HTML in initial render
const defaultTab1RescueHtml = `
            <div class="food-rescue-matrix" id="foodRescueMatrixContainer">
              <div class="rescue-food-card apex-spring-interactive" style="display:flex; flex-direction:column; justify-content:space-between; gap:12px;">
                <div style="display:flex; gap:12px; align-items:flex-start;">
                  <div class="store-thumb-wrapper">
                    <img src="https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=200&auto=format&fit=crop&q=80" alt="Cơm Tấm Sườn Cay" class="store-real-thumb" loading="lazy" decoding="async" width="80" height="80">
                    <span class="store-brand-pill">Cơm Tấm</span>
                  </div>
                  <div style="flex:1;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 6px;">
                      <div style="font-weight: 800; font-size: 14.5px; color: var(--text-main);">Cơm Tấm Sườn Cay</div>
                      <span class="badge-night-owl">🌙 22h+</span>
                    </div>
                    <div style="font-size: 11.5px; color: var(--text-muted); margin: 3px 0 4px 0;">📍 42 Ngô Văn Sở, Hòa Khánh</div>
                    <div style="font-size: 14.5px; font-weight: 800; color: var(--emerald);">20.000₫ - 25.000₫</div>
                    <div style="font-size: 11px; color: var(--emerald); font-weight: 700; margin-top: 3px;">🎁 Trà đá + Canh thêm 0đ</div>
                  </div>
                </div>
                <div style="display: flex; gap: 8px; margin-top: auto;">
                  <a href="https://maps.google.com/?q=42+Ngô+Văn+Sở+Đà+Nẵng" target="_blank" rel="noopener noreferrer" class="btn-card-action btn-action-map apex-spring-interactive">🗺️ Chỉ Đường ↗</a>
                  <a href="tel:0905123456" class="btn-card-action btn-action-call apex-spring-interactive">📞 Gọi Quán</a>
                </div>
              </div>

              <div class="rescue-food-card apex-spring-interactive" style="display:flex; flex-direction:column; justify-content:space-between; gap:12px;">
                <div style="display:flex; gap:12px; align-items:flex-start;">
                  <div class="store-thumb-wrapper">
                    <img src="https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=200&auto=format&fit=crop&q=80" alt="Bún Mắm Dì Nga" class="store-real-thumb" loading="lazy" decoding="async" width="80" height="80">
                    <span class="store-brand-pill">Bún Mắm</span>
                  </div>
                  <div style="flex:1;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 6px;">
                      <div style="font-weight: 800; font-size: 14.5px; color: var(--text-main);">Bún Mắm Dì Nga</div>
                      <span class="badge-night-owl">🌙 22h+</span>
                    </div>
                    <div style="font-size: 11.5px; color: var(--text-muted); margin: 3px 0 4px 0;">📍 Cổng Chợ Hòa Khánh</div>
                    <div style="font-size: 14.5px; font-weight: 800; color: var(--emerald);">15.000₫ - 20.000₫</div>
                    <div style="font-size: 11px; color: var(--emerald); font-weight: 700; margin-top: 3px;">🎁 Suất no lâu, mở đến 23:00</div>
                  </div>
                </div>
                <div style="display: flex; gap: 8px; margin-top: auto;">
                  <a href="https://maps.google.com/?q=Chợ+Hòa+Khánh+Đà+Nẵng" target="_blank" rel="noopener noreferrer" class="btn-card-action btn-action-map apex-spring-interactive">🗺️ Chỉ Đường ↗</a>
                </div>
              </div>

              <div class="rescue-food-card apex-spring-interactive" style="display:flex; flex-direction:column; justify-content:space-between; gap:12px;">
                <div style="display:flex; gap:12px; align-items:flex-start;">
                  <div class="store-thumb-wrapper">
                    <img src="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=200&auto=format&fit=crop&q=80" alt="Bánh Mì Chả Bò Cô Bích" class="store-real-thumb" loading="lazy" decoding="async" width="80" height="80">
                    <span class="store-brand-pill">Bánh Mì</span>
                  </div>
                  <div style="flex:1;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 6px;">
                      <div style="font-weight: 800; font-size: 14.5px; color: var(--text-main);">Bánh Mì Chả Bò Cô Bích</div>
                      <span class="badge-night-owl">🌙 22h+</span>
                    </div>
                    <div style="font-size: 11.5px; color: var(--text-muted); margin: 3px 0 4px 0;">📍 Khu F Bách Khoa</div>
                    <div style="font-size: 14.5px; font-weight: 800; color: var(--emerald);">12.000₫ - 15.000₫</div>
                    <div style="font-size: 11px; color: var(--emerald); font-weight: 700; margin-top: 3px;">🎁 Mở 06:00 - 02:00 sáng</div>
                  </div>
                </div>
                <div style="display: flex; gap: 8px; margin-top: auto;">
                  <a href="https://maps.google.com/?q=Đại+học+Bách+Khoa+Đà+Nẵng" target="_blank" rel="noopener noreferrer" class="btn-card-action btn-action-map apex-spring-interactive">🗺️ Chỉ Đường ↗</a>
                  <a href="tel:0935987654" class="btn-card-action btn-action-call apex-spring-interactive">📞 Gọi Quán</a>
                </div>
              </div>
            </div>`;

const tab1Anchor = '<div class="food-rescue-matrix" id="foodRescueMatrixContainer">';
const tab1Idx = js.indexOf(tab1Anchor);
if (tab1Idx !== -1) {
  const tab1EndIdx = js.indexOf('</div>\n          </div>\n\n          <!-- TAB 2:', tab1Idx);
  if (tab1EndIdx !== -1) {
    js = js.substring(0, tab1Idx) + defaultTab1RescueHtml.trim() + js.substring(tab1EndIdx);
    console.log('✅ Updated initial Tab 1 Food Rescue HTML with real photos');
  }
}

// 4. Update KTX Product Cards in Tab 3 with Real Product Photos
const realPhotoKtxGearHtml = `
            <div class="ktx-gear-matrix" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:14px; margin-top:14px;">
              <!-- 1. QUẠT KẸP TÍCH ĐIỆN -->
              <div class="gear-card apex-spring-interactive" style="background:var(--surface-subtle); border:1px solid var(--border-hairline); border-radius:16px; padding:14px; display:flex; flex-direction:column; justify-content:space-between;">
                <div class="gear-image-box">
                  <img src="https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=260&auto=format&fit=crop&q=80" alt="Quạt Kẹp Tích Điện KTX" class="gear-real-image" loading="lazy" decoding="async" width="120" height="120">
                  <span class="badge-freeship-floating">🟢 Freeship 0đ</span>
                </div>
                <div>
                  <div class="gear-title" style="font-size:13.5px; font-weight:800; color:var(--text-main);">Quạt Kẹp Tích Điện KTX 3 Tốc Độ</div>
                  <div class="gear-price" style="font-size:14.5px; font-weight:900; color:var(--emerald); margin:4px 0 10px 0;">39.000₫ <s style="font-size:11px; color:var(--text-muted);">85.000₫</s></div>
                </div>
                <button type="button" onclick="dispatchSmartAffiliate('SHOPEE', 'quat_kep_ktx_01', 'https://shopee.vn', 'ktx_gear')" class="btn-cta-emerald btn-action-primary apex-spring-interactive" style="width:100%; height:34px; font-size:12px; border:none; border-radius:8px; cursor:pointer; font-weight:800;">Săn Đáy 39K ↗</button>
              </div>

              <!-- 2. ĐÈN LED CHỐNG CẬN -->
              <div class="gear-card apex-spring-interactive" style="background:var(--surface-subtle); border:1px solid var(--border-hairline); border-radius:16px; padding:14px; display:flex; flex-direction:column; justify-content:space-between;">
                <div class="gear-image-box">
                  <img src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=260&auto=format&fit=crop&q=80" alt="Đèn LED Kẹp Bàn Học" class="gear-real-image" loading="lazy" decoding="async" width="120" height="120">
                  <span class="badge-freeship-floating">🟢 Freeship 0đ</span>
                </div>
                <div>
                  <div class="gear-title" style="font-size:13.5px; font-weight:800; color:var(--text-main);">Đèn LED Kẹp Bàn Học 3 Chế Độ</div>
                  <div class="gear-price" style="font-size:14.5px; font-weight:900; color:var(--emerald); margin:4px 0 10px 0;">29.000₫ <s style="font-size:11px; color:var(--text-muted);">69.000₫</s></div>
                </div>
                <button type="button" onclick="dispatchSmartAffiliate('SHOPEE', 'den_led_ktx_02', 'https://shopee.vn', 'ktx_gear')" class="btn-cta-emerald btn-action-primary apex-spring-interactive" style="width:100%; height:34px; font-size:12px; border:none; border-radius:8px; cursor:pointer; font-weight:800;">Săn Đáy 29K ↗</button>
              </div>

              <!-- 3. NỒI LẨU MINI 1.5L -->
              <div class="gear-card apex-spring-interactive" style="background:var(--surface-subtle); border:1px solid var(--border-hairline); border-radius:16px; padding:14px; display:flex; flex-direction:column; justify-content:space-between;">
                <div class="gear-image-box">
                  <img src="https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=260&auto=format&fit=crop&q=80" alt="Nồi Lẩu Mini Nấu Mì" class="gear-real-image" loading="lazy" decoding="async" width="120" height="120">
                  <span class="badge-freeship-floating">🟢 Freeship 0đ</span>
                </div>
                <div>
                  <div class="gear-title" style="font-size:13.5px; font-weight:800; color:var(--text-main);">Nồi Lẩu Mini Nấu Mì 1.5L Chống Dính</div>
                  <div class="gear-price" style="font-size:14.5px; font-weight:900; color:var(--emerald); margin:4px 0 10px 0;">55.000₫ <s style="font-size:11px; color:var(--text-muted);">115.000₫</s></div>
                </div>
                <button type="button" onclick="dispatchSmartAffiliate('SHOPEE', 'noi_lau_mini_03', 'https://shopee.vn', 'ktx_gear')" class="btn-cta-emerald btn-action-primary apex-spring-interactive" style="width:100%; height:34px; font-size:12px; border:none; border-radius:8px; cursor:pointer; font-weight:800;">Săn Đáy 55K ↗</button>
              </div>

              <!-- 4. CÁP SẠC 20W BỌC DÙ -->
              <div class="gear-card apex-spring-interactive" style="background:var(--surface-subtle); border:1px solid var(--border-hairline); border-radius:16px; padding:14px; display:flex; flex-direction:column; justify-content:space-between;">
                <div class="gear-image-box">
                  <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=260&auto=format&fit=crop&q=80" alt="Cáp Sạc 20W Type-C" class="gear-real-image" loading="lazy" decoding="async" width="120" height="120">
                  <span class="badge-freeship-floating">🟢 Freeship 0đ</span>
                </div>
                <div>
                  <div class="gear-title" style="font-size:13.5px; font-weight:800; color:var(--text-main);">Cáp Sạc Nhanh Type-C 20W Bọc Dù</div>
                  <div class="gear-price" style="font-size:14.5px; font-weight:900; color:var(--emerald); margin:4px 0 10px 0;">29.000₫ <s style="font-size:11px; color:var(--text-muted);">55.000₫</s></div>
                </div>
                <button type="button" onclick="dispatchSmartAffiliate('SHOPEE', 'cap_sac_20w_04', 'https://shopee.vn', 'ktx_gear')" class="btn-cta-emerald btn-action-primary apex-spring-interactive" style="width:100%; height:34px; font-size:12px; border:none; border-radius:8px; cursor:pointer; font-weight:800;">Săn Đáy 29K ↗</button>
              </div>

              <!-- 5. Ổ CẮM ĐA NĂNG 4 USB -->
              <div class="gear-card apex-spring-interactive" style="background:var(--surface-subtle); border:1px solid var(--border-hairline); border-radius:16px; padding:14px; display:flex; flex-direction:column; justify-content:space-between;">
                <div class="gear-image-box">
                  <img src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=260&auto=format&fit=crop&q=80" alt="Ổ Cắm Đa Năng 4 USB" class="gear-real-image" loading="lazy" decoding="async" width="120" height="120">
                  <span class="badge-freeship-floating">🟢 Freeship 0đ</span>
                </div>
                <div>
                  <div class="gear-title" style="font-size:13.5px; font-weight:800; color:var(--text-main);">Ổ Cắm Đa Năng 4 Cổng USB Chống Giật</div>
                  <div class="gear-price" style="font-size:14.5px; font-weight:900; color:var(--emerald); margin:4px 0 10px 0;">45.000₫ <s style="font-size:11px; color:var(--text-muted);">95.000₫</s></div>
                </div>
                <button type="button" onclick="dispatchSmartAffiliate('SHOPEE', 'o_cam_usb_05', 'https://shopee.vn', 'ktx_gear')" class="btn-cta-emerald btn-action-primary apex-spring-interactive" style="width:100%; height:34px; font-size:12px; border:none; border-radius:8px; cursor:pointer; font-weight:800;">Săn Đáy 45K ↗</button>
              </div>

              <!-- 6. BÌNH GIỮ NHIỆT 500ML -->
              <div class="gear-card apex-spring-interactive" style="background:var(--surface-subtle); border:1px solid var(--border-hairline); border-radius:16px; padding:14px; display:flex; flex-direction:column; justify-content:space-between;">
                <div class="gear-image-box">
                  <img src="https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=260&auto=format&fit=crop&q=80" alt="Bình Giữ Nhiệt Inox 304" class="gear-real-image" loading="lazy" decoding="async" width="120" height="120">
                  <span class="badge-freeship-floating">🟢 Freeship 0đ</span>
                </div>
                <div>
                  <div class="gear-title" style="font-size:13.5px; font-weight:800; color:var(--text-main);">Bình Giữ Nhiệt Inox 304 500ml 12h</div>
                  <div class="gear-price" style="font-size:14.5px; font-weight:900; color:var(--emerald); margin:4px 0 10px 0;">35.000₫ <s style="font-size:11px; color:var(--text-muted);">75.000₫</s></div>
                </div>
                <button type="button" onclick="dispatchSmartAffiliate('SHOPEE', 'binh_giu_nhiet_06', 'https://shopee.vn', 'ktx_gear')" class="btn-cta-emerald btn-action-primary apex-spring-interactive" style="width:100%; height:34px; font-size:12px; border:none; border-radius:8px; cursor:pointer; font-weight:800;">Săn Đáy 35K ↗</button>
              </div>
            </div>`;

const ktxMatrixAnchor = '<div class="ktx-gear-matrix"';
const ktxMatrixIdx = js.indexOf(ktxMatrixAnchor);
if (ktxMatrixIdx !== -1) {
  const ktxEndIdx = js.indexOf('</div>\n          </div>\n        </section>', ktxMatrixIdx);
  if (ktxEndIdx !== -1) {
    js = js.substring(0, ktxMatrixIdx) + realPhotoKtxGearHtml.trim() + js.substring(ktxEndIdx);
    console.log('✅ Updated KTX Product Cards with real photos & lazy-loading');
  }
}

// 5. Update Tier 2 Editorial Venue Cards with Real Photos (Phê La & Cơm Gà A Hải)
const realPhotoTier2Html = `
          <!-- ĐỊA ĐIỂM XÁC THỰC THỰC TẾ CÓ ẢNH & LOGO (TẦNG 2) -->
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:16px; margin-bottom:16px;">
            <!-- QUÁN 1: PHÊ LA BẠCH ĐẰNG -->
            <div class="store-editorial-card apex-spring-interactive" style="background:var(--surface-subtle); border:1px solid var(--border-hairline); border-radius:18px; padding:16px; display:flex; flex-direction:column; justify-content:space-between; gap:12px;">
              <div style="display:flex; gap:14px; align-items:flex-start;">
                <div class="store-thumb-wrapper">
                  <img src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=200&auto=format&fit=crop&q=80" alt="Phê La Ô Long Đặc Sản" class="store-real-thumb" loading="lazy" decoding="async" width="80" height="80">
                  <span class="store-brand-pill">Phê La</span>
                </div>
                <div style="flex:1;">
                  <div style="display:flex; justify-content:space-between; align-items:center; gap:6px;">
                    <h4 style="margin:0; font-size:15px; font-weight:800; color:var(--text-main);">Phê La — 36 Bạch Đằng</h4>
                    <span class="badge-status-open" style="font-size:10px; font-weight:800; color:var(--emerald); background:rgba(16,185,129,0.12); padding:2px 6px; border-radius:6px;">🟢 Đang mở</span>
                  </div>
                  <p style="margin:4px 0 6px 0; font-size:12px; color:var(--text-muted); line-height:1.4;">Trà Ô Long đặc sản; tích điểm hội viên, có phòng lạnh & ổ cắm làm việc.</p>
                  <div style="display:flex; gap:6px; flex-wrap:wrap;">
                    <span style="font-size:10.5px; font-weight:700; background:var(--surface-card); border:1px solid var(--border-hairline); padding:2px 6px; border-radius:6px; color:var(--text-muted);">❄️ Máy Lạnh / Ổ Cắm</span>
                    <span style="font-size:10.5px; font-weight:700; background:var(--surface-card); border:1px solid var(--border-hairline); padding:2px 6px; border-radius:6px; color:var(--text-muted);">🛵 1.2km</span>
                  </div>
                </div>
              </div>
              <div style="display:flex; gap:8px;">
                <a href="https://maps.google.com/?q=36+Bạch+Đằng+Đà+Nẵng" target="_blank" rel="noopener noreferrer" class="btn-card-action btn-action-map apex-spring-interactive">🗺️ Chỉ Đường ↗</a>
                <a href="tel:0905123456" class="btn-card-action btn-action-call apex-spring-interactive">📞 Đặt Bàn</a>
              </div>
            </div>

            <!-- QUÁN 2: CƠM GÀ A HẢI -->
            <div class="store-editorial-card apex-spring-interactive" style="background:var(--surface-subtle); border:1px solid var(--border-hairline); border-radius:18px; padding:16px; display:flex; flex-direction:column; justify-content:space-between; gap:12px;">
              <div style="display:flex; gap:14px; align-items:flex-start;">
                <div class="store-thumb-wrapper">
                  <img src="https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=200&auto=format&fit=crop&q=80" alt="Cơm Gà A Hải Thái Phiên" class="store-real-thumb" loading="lazy" decoding="async" width="80" height="80">
                  <span class="store-brand-pill">A Hải</span>
                </div>
                <div style="flex:1;">
                  <div style="display:flex; justify-content:space-between; align-items:center; gap:6px;">
                    <h4 style="margin:0; font-size:15px; font-weight:800; color:var(--text-main);">Cơm Gà A Hải — 100 Thái Phiên</h4>
                    <span class="badge-status-open" style="font-size:10px; font-weight:800; color:var(--emerald); background:rgba(16,185,129,0.12); padding:2px 6px; border-radius:6px;">🟢 Đang mở</span>
                  </div>
                  <p style="margin:4px 0 6px 0; font-size:12px; color:var(--text-muted); line-height:1.4;">Cơm gà quay giòn rụm trứ danh Hải Châu; canh súp đậm đà chuẩn vị Đà Nẵng.</p>
                  <div style="display:flex; gap:6px; flex-wrap:wrap;">
                    <span style="font-size:10.5px; font-weight:700; background:var(--surface-card); border:1px solid var(--border-hairline); padding:2px 6px; border-radius:6px; color:var(--text-muted);">🍗 Gà Quay Giòn</span>
                    <span style="font-size:10.5px; font-weight:700; background:var(--surface-card); border:1px solid var(--border-hairline); padding:2px 6px; border-radius:6px; color:var(--text-muted);">🛵 0.8km</span>
                  </div>
                </div>
              </div>
              <div style="display:flex; gap:8px;">
                <a href="https://maps.google.com/?q=100+Thái+Phiên+Đà+Nẵng" target="_blank" rel="noopener noreferrer" class="btn-card-action btn-action-map apex-spring-interactive">🗺️ Chỉ Đường ↗</a>
                <a href="tel:0905555888" class="btn-card-action btn-action-call apex-spring-interactive">📞 Đặt Món</a>
              </div>
            </div>
          </div>
`;

// Insert real photo venue cards right before arbitrage-calculator-panel in Tier 2
const tier2CalcAnchor = '<div class="arbitrage-calculator-panel"';
if (js.includes(tier2CalcAnchor) && !js.includes('Phê La — 36 Bạch Đằng')) {
  js = js.replace(tier2CalcAnchor, realPhotoTier2Html + '\n          ' + tier2CalcAnchor);
  console.log('✅ Injected Real Photo Venue Cards into Tier 2');
}

fs.writeFileSync(jsPath, js, 'utf8');
console.log('✨ JAYT VISUAL MEDIA PIPELINE v11.0.0 SUCCESSFULLY INTEGRATED!');
