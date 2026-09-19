const fs = require('fs');
const path = require('path');

const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
let js = fs.readFileSync(jsPath, 'utf8');

const targetOldVault = `<div class="voucher-cat-tabs">
              <button type="button" class="voucher-cat-tab active" data-action="filter-voucher" data-cat="ALL">Tất Cả</button>
              <button type="button" class="voucher-cat-tab" data-action="filter-voucher" data-cat="FOOD">🍔 Ăn Uống</button>
              <button type="button" class="voucher-cat-tab" data-action="filter-voucher" data-cat="RIDE">🛵 Xe/Ship</button>
              <button type="button" class="voucher-cat-tab" data-action="filter-voucher" data-cat="UTILITY">🛒 Đồ KTX</button>
            </div>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:12px;">
              
              <!-- Voucher 1 -->
              <div class="voucher-ticket-neon apex-spring-interactive" data-category="FOOD">
                <div>
                  <div style="font-size:11px; font-weight:800; color:#FB923C;">🟠 SHOPEE: GIẢM 50K TẤT CẢ</div>
                  <div style="font-family:var(--font-mono); font-size:15px; font-weight:900; color:var(--emerald); margin-top:2px;">JAYTSHOPEE50</div>
                  <div style="font-size:10.5px; color:var(--text-muted);">Min spend 150K · Đã đối soát</div>
                </div>
                <button type="button" class="btn-cta-emerald btn-action-primary apex-spring-interactive" data-action="copy-voucher-code" data-code="JAYTSHOPEE50" data-url="https://shopee.vn" style="font-size:11px; height:34px; padding:0 12px;">
                  📋 Sao Chép ↗
                </button>
              </div>

              <!-- Voucher 2 -->
              <div class="voucher-ticket-neon apex-spring-interactive" data-category="UTILITY">
                <div>
                  <div style="font-size:11px; font-weight:800; color:#F43F5E;">🎵 TIKTOK SHOP: HỖ TRỢ VẬN CHUYỂN</div>
                  <div style="font-family:var(--font-mono); font-size:15px; font-weight:900; color:var(--emerald); margin-top:2px;">TIKTOKVIP0D</div>
                  <div style="font-size:10.5px; color:var(--text-muted);">Min spend 0đ · Tự động áp đơn đầu</div>
                </div>
                <button type="button" class="btn-cta-emerald btn-action-primary apex-spring-interactive" data-action="copy-voucher-code" data-code="TIKTOKVIP0D" data-url="https://tiktok.com" style="font-size:11px; height:34px; padding:0 12px;">
                  📋 Sao Chép ↗
                </button>
              </div>

              <!-- Voucher 3 -->
              <div class="voucher-ticket-neon apex-spring-interactive" data-category="RIDE">
                <div>
                  <div style="font-size:11px; font-weight:800; color:#0284C7;">🛵 BE: GIẢM 30% CHUYẾN XE</div>
                  <div style="font-family:var(--font-mono); font-size:15px; font-weight:900; color:var(--emerald); margin-top:2px;">JAYTBE30</div>
                  <div style="font-size:10.5px; color:var(--text-muted);">Áp dụng BeBike & BeCar vùng 43</div>
                </div>
                <button type="button" class="btn-cta-emerald btn-action-primary apex-spring-interactive" data-action="copy-voucher-code" data-code="JAYTBE30" data-url="https://be.com.vn" style="font-size:11px; height:34px; padding:0 12px;">
                  📋 Sao Chép ↗
                </button>
              </div>

            </div>
          </div>



          <div style="font-size:11px; color:var(--text-muted); text-align:center; margin-top:14px; padding-top:8px; border-top:1px dashed var(--border-hairline);">
            <div style="font-size:11px; color:var(--text-muted); text-align:center; margin-top:14px; padding-top:8px; border-top:1px dashed var(--border-hairline);">ℹ️ Bảng mã tham khảo từ các nền tảng chính thức — Vui lòng kiểm tra điều kiện áp dụng tại ứng dụng tương ứng.</div>`;

const newCanonicalVault = `<div class="voucher-cat-tabs">
              <button type="button" class="voucher-cat-tab active" data-action="filter-voucher" data-cat="ALL">Tất Cả</button>
              <button type="button" class="voucher-cat-tab" data-action="filter-voucher" data-cat="CINEMA">🎬 Rạp Chiếu Phim</button>
              <button type="button" class="voucher-cat-tab" data-action="filter-voucher" data-cat="TRANSIT">🚌 Giao Thông Công Cộng</button>
            </div>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:12px;">
              
              <!-- Canonical Item 1: CGV Culture Day -->
              <div class="voucher-ticket-neon apex-spring-interactive" data-category="CINEMA">
                <div>
                  <div style="font-size:11px; font-weight:800; color:#EF4444;">🎬 CGV CINEMA: CULTURE DAY</div>
                  <div style="font-family:var(--font-mono); font-size:13.5px; font-weight:900; color:var(--text-main); margin-top:2px;">ĐỒNG GIÁ VÉ THỨ TƯ CUỐI THÁNG</div>
                  <div style="font-size:10.5px; color:var(--text-muted);">Áp dụng toàn quốc · Đối soát tại: <code>05_DEAL_AND_AFFILIATE/batch_capture_088a/</code></div>
                </div>
                <a href="https://www.cgv.vn" target="_blank" rel="noopener noreferrer" class="btn-cta-emerald btn-action-primary apex-spring-interactive" style="font-size:11px; height:34px; padding:0 12px; text-decoration:none; display:flex; align-items:center;">
                  Xem Nguồn ↗
                </a>
              </div>

              <!-- Canonical Item 2: Metiz U22 -->
              <div class="voucher-ticket-neon apex-spring-interactive" data-category="CINEMA">
                <div>
                  <div style="font-size:11px; font-weight:800; color:#0284C7;">🎬 METIZ CINEMA: CHÍNH SÁCH U22</div>
                  <div style="font-family:var(--font-mono); font-size:13.5px; font-weight:900; color:var(--text-main); margin-top:2px;">ƯU ĐÃI THÀNH VIÊN DƯỚI 22 TUỔI</div>
                  <div style="font-size:10.5px; color:var(--text-muted);">Yêu cầu CCCD / Thẻ HSSV · Đối soát: <code>05_DEAL_AND_AFFILIATE/batch_capture_088a/</code></div>
                </div>
                <a href="https://metiz.vn" target="_blank" rel="noopener noreferrer" class="btn-cta-emerald btn-action-primary apex-spring-interactive" style="font-size:11px; height:34px; padding:0 12px; text-decoration:none; display:flex; align-items:center;">
                  Xem Nguồn ↗
                </a>
              </div>

              <!-- Canonical Item 3: DanaBus Public Transit -->
              <div class="voucher-ticket-neon apex-spring-interactive" data-category="TRANSIT">
                <div>
                  <div style="font-size:11px; font-weight:800; color:#10B981;">🚌 XE BUÝT ĐÀ NẴNG: DANABUS</div>
                  <div style="font-family:var(--font-mono); font-size:13.5px; font-weight:900; color:var(--text-main); margin-top:2px;">TRỢ GIÁ XE BUÝT NỘI ĐÔ VÙNG 43</div>
                  <div style="font-size:10.5px; color:var(--text-muted);">Theo biểu giá Sở GTVT Đà Nẵng · Đối soát: <code>four_layer_dataset.json</code></div>
                </div>
                <a href="https://danangbus.vn" target="_blank" rel="noopener noreferrer" class="btn-cta-emerald btn-action-primary apex-spring-interactive" style="font-size:11px; height:34px; padding:0 12px; text-decoration:none; display:flex; align-items:center;">
                  Xem Nguồn ↗
                </a>
              </div>

            </div>
          </div>
          <div style="font-size:11px; color:var(--text-muted); text-align:center; margin-top:14px; padding-top:8px; border-top:1px dashed var(--border-hairline);">
            ℹ️ Danh mục chính sách đối soát từ nguồn công khai — Vui lòng kiểm tra điều kiện áp dụng tại nguồn chính thức.`;

if (js.includes(targetOldVault.trim()) || js.includes('TIKTOKVIP0D')) {
  // Replace the entire voucher vault grid cleanly
  const startIdx = js.indexOf('<div class="voucher-cat-tabs">');
  const endIdx = js.indexOf('</section>\n\n        <!-- PHÂN KHU STUDENT HUB');
  if (startIdx !== -1 && endIdx !== -1) {
    js = js.substring(0, startIdx) + newCanonicalVault + js.substring(endIdx);
    console.log('✅ Replaced entire Voucher Vault with canonical policy directory');
  }
}

fs.writeFileSync(jsPath, js, 'utf8');
console.log('✨ Cleaned Voucher Vault completely!');
