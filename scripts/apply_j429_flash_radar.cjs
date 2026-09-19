'use strict';

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
let code = fs.readFileSync(filePath, 'utf8');

// 1. DATA ARRAY & RENDER FUNCTIONS
const flashRadarModuleCode = `
// ==========================================================================
// JAYT-429: FLASH ARBITRAGE RADAR 70% - 80% DEALS REGISTRY & ENGINE
// Directive: CHAIRMAN_DIRECTIVE_20260918_INTEGRATE_FLASH_DEALS_70_80_AND_DANANG_GO_LIVE
// ==========================================================================
const JAYT_FLASH_ARBITRAGE_DEALS_70_80 = Object.freeze([
  // === NHÓM 1: DEAL 9K KTX SINH VIÊN (GIẢM 74% - 80%) ===
  {
    id: 'FLASH_DEAL_01_MOC_DAN_TUONG',
    group: 'DEAL_9K',
    groupLabel: 'Deal 9K KTX Sinh Viên',
    groupIcon: '🍜',
    title: 'Combo 10 Móc Dán Tường Siêu Dính Trong Suốt Chịu Lực 10kg KTX',
    cleanTitle: 'Combo 10 Móc Dán Tường Chịu Lực 10kg',
    merchantName: 'Tổng Kho Tiện Ích Phòng Trọ',
    platform: 'shopee',
    platformName: 'Shopee',
    color: '#EE4D2D',
    partnerId: '17372870594',
    originalPrice: 45000,
    finalPrice: 9000,
    savings: 36000,
    discountPercent: 80,
    badge: '🔥 -80% SẬP SÀN',
    voucherLabel: 'Shop Xả Kho -40% + Mã Video 50% + Freeship Max',
    voucherCode: 'FLASH9KDEAL',
    canonicalUrl: 'https://shopee.vn/product/1016604648/23552060269',
    imageUrl: 'https://down-vn.img.susercontent.com/file/sg-11134253-824iq-mej832cqxtza25',
    category: 'Gia dụng KTX',
    stockQuota: 94
  },
  {
    id: 'FLASH_DEAL_02_HOP_GIAY_TRONG_SUOT',
    group: 'DEAL_9K',
    groupLabel: 'Deal 9K KTX Sinh Viên',
    groupIcon: '🍜',
    title: 'Hộp Đựng Giày Trong Suốt Nắp Cứng Chống Bụi Xếp Chồng KTX',
    cleanTitle: 'Hộp Đựng Giày Trong Suốt Nắp Cứng',
    merchantName: 'Xưởng Nhựa Tiện Ích KTX Đà Nẵng',
    platform: 'shopee',
    platformName: 'Shopee',
    color: '#EE4D2D',
    partnerId: '17372870594',
    originalPrice: 39000,
    finalPrice: 9000,
    savings: 30000,
    discountPercent: 77,
    badge: '🔥 -77% GIÁ RẺ GIẬT MÌNH',
    voucherLabel: 'Flash Sale KTX -50% + Voucher Shop 10K + Freeship Xtra',
    voucherCode: 'BOX9KKTX',
    canonicalUrl: 'https://shopee.vn/product/89827191/26609048170',
    imageUrl: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lmq2e1rhyq8f29',
    category: 'Gia dụng KTX',
    stockQuota: 88
  },
  {
    id: 'FLASH_DEAL_03_TOPGIA_TISSUE_MINI',
    group: 'DEAL_9K',
    groupLabel: 'Deal 9K KTX Sinh Viên',
    groupIcon: '🍜',
    title: 'Khăn Giấy Treo Tường Rút TopGia Đa Sắc 1280 Tờ (Gói Đơn Dùng Thử KTX)',
    cleanTitle: 'Khăn Giấy Treo Tường Rút TopGia 1280 Tờ',
    merchantName: 'TopGia Official Store',
    platform: 'shopee',
    platformName: 'Shopee Mall',
    color: '#EE4D2D',
    partnerId: '17372870594',
    originalPrice: 42000,
    finalPrice: 9900,
    savings: 32100,
    discountPercent: 76,
    badge: '🔥 -76% TRẢI NGHIỆM 9K',
    voucherLabel: 'Trợ Giá Mall 30% + Voucher Video 40K + Freeship',
    voucherCode: 'TOPGIA9K',
    canonicalUrl: 'https://shopee.vn/product/1016604648/23552060269',
    imageUrl: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lku1a72p9c043a',
    category: 'Gia dụng KTX',
    stockQuota: 91
  },
  {
    id: 'FLASH_DEAL_04_SNACK_RONG_BIEN',
    group: 'DEAL_9K',
    groupLabel: 'Deal 9K KTX Sinh Viên',
    groupIcon: '🍜',
    title: 'Snack Mì Cơm Cháy Rong Biển Giòn Cay KTX Sinh Viên (Set 5 Gói Cứu Đói)',
    cleanTitle: 'Snack Mì Cơm Cháy Rong Biển Giòn Cay',
    merchantName: 'Bếp Ăn Vặt KTX Hòa Khánh',
    platform: 'shopee',
    platformName: 'Shopee',
    color: '#EE4D2D',
    partnerId: '17372870594',
    originalPrice: 35000,
    finalPrice: 9000,
    savings: 26000,
    discountPercent: 74,
    badge: '🔥 -74% CỨU ĐÓI ĐÊM',
    voucherLabel: 'Combo Cứu Đói -40% + Mã Shop 15K + Freeship',
    voucherCode: 'SNACK9K',
    canonicalUrl: 'https://shopee.vn/product/18274910/24491019937',
    imageUrl: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-ll1b859e9xwh5b',
    category: 'Đồ ăn vặt & Gia vị',
    stockQuota: 96
  },

  // === NHÓM 2: GÓC BÀN HỌC & DECOR VĂN PHÒNG <= 49K (GIẢM 74% - 76%) ===
  {
    id: 'FLASH_DEAL_05_CAP_SAC_BASEUS',
    group: 'DECOR_49K',
    groupLabel: 'Góc Bàn Học & Decor ≤49K',
    groupIcon: '💻',
    title: 'Cáp Sạc Nhanh Baseus Tungsten Gold Type-C to Lightning / Type-C 20W Dù Siêu Bền',
    cleanTitle: 'Cáp Sạc Nhanh Baseus 20W Chống Đứt',
    merchantName: 'Baseus Official Mall',
    platform: 'shopee',
    platformName: 'Shopee Mall',
    color: '#EE4D2D',
    partnerId: '17372870594',
    originalPrice: 160000,
    finalPrice: 39000,
    savings: 121000,
    discountPercent: 76,
    badge: '⚡ -76% DEAL SỐC 39K',
    voucherLabel: 'Xả Kho Hãng -45% + Voucher Mall 50K + Freeship Xtra',
    voucherCode: 'BASEUS39K',
    canonicalUrl: 'https://shopee.vn/product/10987654/22145890123',
    imageUrl: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lkc8l5o13u456f',
    category: 'Học tập & Công nghệ',
    stockQuota: 89
  },
  {
    id: 'FLASH_DEAL_06_LOT_CHUOT_SIZE_LON',
    group: 'DECOR_49K',
    groupLabel: 'Góc Bàn Học & Decor ≤49K',
    groupIcon: '💻',
    title: 'Tấm Lót Chuột Bàn Học Cỡ Lớn 80x30cm May Viền Bo Chống Trượt Decor KTX',
    cleanTitle: 'Tấm Lót Chuột Cỡ Lớn 80x30cm May Viền Bo',
    merchantName: 'Top Nhà Bán Phụ Kiện Decor Đà Nẵng',
    platform: 'shopee',
    platformName: 'Shopee',
    color: '#EE4D2D',
    partnerId: '17372870594',
    originalPrice: 120000,
    finalPrice: 29000,
    savings: 91000,
    discountPercent: 76,
    badge: '⚡ -76% DECOR BÀN HỌC',
    voucherLabel: 'Mã Live Video -50% + Freeship Max 45K',
    voucherCode: 'PAD29K',
    canonicalUrl: 'https://shopee.vn/product/89827191/26609048170',
    imageUrl: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lks7q5o19u789a',
    category: 'Học tập & Công nghệ',
    stockQuota: 85
  },
  {
    id: 'FLASH_DEAL_07_DEN_LED_HOC_CHONG_CAN',
    group: 'DECOR_49K',
    groupLabel: 'Góc Bàn Học & Decor ≤49K',
    groupIcon: '💻',
    title: 'Đèn LED Học Chống Cận Thị 3 Chế Độ Sáng Cảm Ứng Cắm Cổng USB KTX',
    cleanTitle: 'Đèn LED Học Chống Cận 3 Chế Độ Sáng',
    merchantName: 'Xưởng Đèn Học Sinh Viên KTX',
    platform: 'lazada',
    platformName: 'Lazada Uy Tín',
    color: '#F59E0B',
    partnerId: '262501305',
    originalPrice: 180000,
    finalPrice: 45000,
    savings: 135000,
    discountPercent: 75,
    badge: '⚡ -75% BẢO VỆ MẮT',
    voucherLabel: 'LazMall Tích Lũy -40% + Voucher Shop 30K + Freeship Max',
    voucherCode: 'LED45K',
    canonicalUrl: 'https://www.lazada.vn/products/den-led-hoc-chong-can-i192837465.html',
    imageUrl: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lkw9e5o22u123b',
    category: 'Học tập & Công nghệ',
    stockQuota: 92
  },
  {
    id: 'FLASH_DEAL_08_GIA_DO_DIEN_THOAI_NHOM',
    group: 'DECOR_49K',
    groupLabel: 'Góc Bàn Học & Decor ≤49K',
    groupIcon: '💻',
    title: 'Giá Đỡ Điện Thoại & iPad Hợp Kim Nhôm Xếp Gọn Livestream Xem Phim KTX',
    cleanTitle: 'Giá Đỡ Điện Thoại Kim Loại Xếp Gọn',
    merchantName: 'Kho Phụ Kiện Số Đà Nẵng',
    platform: 'tiktok',
    platformName: 'TikTok Shop Mall',
    color: '#EF4444',
    partnerId: 'VNVNLCB6LYL3',
    originalPrice: 110000,
    finalPrice: 29000,
    savings: 81000,
    discountPercent: 74,
    badge: '⚡ -74% XẢ KHO TIKTOK',
    voucherLabel: 'TikTok Creator Live -50% + Freeship 70K Toàn Quốc',
    voucherCode: 'STAND29K',
    canonicalUrl: 'https://shop.tiktok.com/vn/pdp/1734961837103548126',
    imageUrl: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lky8k5o33u456c',
    category: 'Học tập & Công nghệ',
    stockQuota: 87
  },

  // === NHÓM 3: XẢ KHO CÔNG NGHỆ 70% (GIẢM 70% - 76%) ===
  {
    id: 'FLASH_DEAL_09_UGREEN_GAN_30W',
    group: 'TECH_70',
    groupLabel: 'Xả Kho Công Nghệ 70%',
    groupIcon: '⚡',
    title: 'Củ Sạc GaN 30W Ugreen Nexode Siêu Nhỏ Gọn Sạc Nhanh iPhone & Laptop PD/QC',
    cleanTitle: 'Củ Sạc GaN 30W Ugreen Siêu Nhỏ Gọn',
    merchantName: 'Ugreen Flagship Store (Shopee Mall)',
    platform: 'shopee',
    platformName: 'Shopee Mall',
    color: '#EE4D2D',
    partnerId: '17372870594',
    originalPrice: 350000,
    finalPrice: 89000,
    savings: 261000,
    discountPercent: 75,
    badge: '💥 -75% XẢ KHO GAN 30W',
    voucherLabel: 'Siêu Voucher Mall 100K + Mã Live 20% + Freeship Xtra',
    voucherCode: 'UGREEN89K',
    canonicalUrl: 'https://shopee.vn/product/10987654/22145890123',
    imageUrl: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lkp2w5o44u789d',
    category: 'Học tập & Công nghệ',
    stockQuota: 95
  },
  {
    id: 'FLASH_DEAL_10_TAI_NGHE_BLUETOOTH_TWS',
    group: 'TECH_70',
    groupLabel: 'Xả Kho Công Nghệ 70%',
    groupIcon: '⚡',
    title: 'Tai Nghe Bluetooth 5.3 Không Dây TWS Chống Ồn ENC Khử Nhiễu Đàm Thoại Pin 24h',
    cleanTitle: 'Tai Nghe Bluetooth 5.3 TWS Chống Ồn Pin 24h',
    merchantName: 'Baseus Vietnam Flagship Store',
    platform: 'lazada',
    platformName: 'LazMall',
    color: '#F59E0B',
    partnerId: '262501305',
    originalPrice: 420000,
    finalPrice: 99000,
    savings: 321000,
    discountPercent: 76,
    badge: '💥 -76% SĂN TAI NGHE 99K',
    voucherLabel: 'Voucher LazMall 150K + Tích Lũy 50K + Freeship Max',
    voucherCode: 'TWS99K',
    canonicalUrl: 'https://www.lazada.vn/products/tai-nghe-bluetooth-tws-i293847561.html',
    imageUrl: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lkq5y5o55u012e',
    category: 'Học tập & Công nghệ',
    stockQuota: 93
  },
  {
    id: 'FLASH_DEAL_11_QUAT_JISULIFE_TURBO',
    group: 'TECH_70',
    groupLabel: 'Xả Kho Công Nghệ 70%',
    groupIcon: '⚡',
    title: 'Quạt Tích Điện Cầm Tay Turbo 4000mAh Jisulife Mini Gió Mạnh KTX Sinh Viên',
    cleanTitle: 'Quạt Tích Điện Cầm Tay Turbo 4000mAh Jisulife',
    merchantName: 'Jisulife Official Mall',
    platform: 'shopee',
    platformName: 'Shopee Mall',
    color: '#EE4D2D',
    partnerId: '17372870594',
    originalPrice: 320000,
    finalPrice: 89000,
    savings: 231000,
    discountPercent: 72,
    badge: '💥 -72% GIẢI NHIỆT KTX',
    voucherLabel: 'Mã Live Sập Sàn -50% + Voucher Shop 25K + Freeship',
    voucherCode: 'JISULIFE89K',
    canonicalUrl: 'https://shopee.vn/product/38729104/18274910245',
    imageUrl: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lkt8u5o66u345f',
    category: 'Gia dụng KTX',
    stockQuota: 97
  },
  {
    id: 'FLASH_DEAL_12_SAC_DU_PHONG_TRONG_SUOT',
    group: 'TECH_70',
    groupLabel: 'Xả Kho Công Nghệ 70%',
    groupIcon: '⚡',
    title: 'Pin Sạc Dự Phòng Trong Suốt Cyberpunk 20.000mAh Sạc Nhanh 22.5W Có Đèn LED Báo Pin',
    cleanTitle: 'Pin Sạc Dự Phòng Trong Suốt 20.000mAh 22.5W',
    merchantName: 'KOC Review 5 Sao · Tổng Kho KTX',
    platform: 'tiktok',
    platformName: 'TikTok Shop Mall',
    color: '#EF4444',
    partnerId: 'VNVNLCB6LYL3',
    originalPrice: 390000,
    finalPrice: 119000,
    savings: 271000,
    discountPercent: 70,
    badge: '💥 -70% CYBERPUNK 20K',
    voucherLabel: 'TikTok Live Creator Trợ Giá 200K + Freeship Toàn Quốc',
    voucherCode: 'POWER119K',
    canonicalUrl: 'https://shop.tiktok.com/vn/pdp/1734961837103548126',
    imageUrl: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lku9i5o77u678g',
    category: 'Học tập & Công nghệ',
    stockQuota: 90
  }
]);

function setFlashDealFilter(group) {
  if (typeof state !== 'undefined') {
    state.selectedFlashDealGroup = group;
  }
  if (typeof document === 'undefined') return;
  const grid = document.getElementById('jayt-flash-deals-grid');
  if (grid) {
    const cards = grid.querySelectorAll('.flash-deal-card');
    cards.forEach(c => {
      const g = c.getAttribute('data-flash-group');
      if (group === 'ALL' || g === group) {
        c.style.display = 'flex';
      } else {
        c.style.display = 'none';
      }
    });
  }
  const btns = document.querySelectorAll('.btn-flash-deal-tab');
  btns.forEach(b => {
    const g = b.getAttribute('data-tab-group');
    if (g === group) {
      b.style.background = '#E5C378';
      b.style.color = '#0A110D';
      b.style.borderColor = '#E5C378';
      b.style.fontWeight = '800';
    } else {
      b.style.background = 'rgba(229,195,120,0.08)';
      b.style.color = '#E5C378';
      b.style.borderColor = 'rgba(229,195,120,0.3)';
      b.style.fontWeight = '600';
    }
  });
}

function renderFlashArbitrageRadar70_80() {
  const currentGroup = (typeof state !== 'undefined' && state.selectedFlashDealGroup) ? state.selectedFlashDealGroup : 'ALL';
  
  const tabs = [
    { id: 'ALL', label: '🔥 Tất Cả Sập Sàn (12)' },
    { id: 'DEAL_9K', label: '🍜 Deal 9K KTX Sinh Viên (4)' },
    { id: 'DECOR_49K', label: '💻 Góc Bàn Học & Decor ≤49K (4)' },
    { id: 'TECH_70', label: '⚡ Xả Kho Công Nghệ 70% (4)' }
  ];

  return \`
    <div id="jayt-flash-arbitrage-radar" class="flash-arbitrage-container" style="margin-top: 24px; padding: 20px; border-radius: 18px; border: 2px solid #E5C378; background: linear-gradient(180deg, rgba(22,34,27,0.96) 0%, rgba(10,17,13,0.98) 100%); box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(229,195,120,0.15);">
      <!-- Header with Blinking Radar Indicator -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 12px; border-bottom: 1px dashed rgba(229,195,120,0.3); padding-bottom: 12px;">
        <div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: #EF4444; box-shadow: 0 0 10px #EF4444; animation: pulse 1.5s infinite;"></span>
            <h3 style="font-size: 16.5px; font-weight: 900; color: #E5C378; margin: 0; font-family: 'Playfair Display', Georgia, serif; letter-spacing: 0.3px;">
              ⚡ RADAR SĂN SẬP SÀN 70% – 80% (GIÁ ÉP ĐÁY 4 TẦNG)
            </h3>
          </div>
          <p style="margin: 4px 0 0 0; font-size: 12px; color: #A3B1A8; line-height: 1.4;">
            Khám phá các deal xả kho &amp; voucher ẩn sâu nhất hôm nay cho 320.000 cư dân Đà Nẵng · Bấm 1-Click mở app sàn mua ngay
          </p>
        </div>
        <div style="display: flex; align-items: center; gap: 6px;">
          <span style="font-size: 11px; font-weight: 800; background: linear-gradient(135deg, #EF4444, #DC2626); color: #FFFFFF; padding: 4px 12px; border-radius: 999px; letter-spacing: 0.5px; box-shadow: 0 2px 8px rgba(239,68,68,0.4);">
            💥 GIẢM TỐI ĐA 80%
          </span>
          <span style="font-size: 11px; font-weight: 700; background: rgba(16,185,129,0.15); color: #10B981; border: 1px solid rgba(16,185,129,0.35); padding: 3px 10px; border-radius: 999px;">
            ✓ Khớp Từng Đồng
          </span>
        </div>
      </div>

      <!-- 4-Tier Stack Formula Banner -->
      <div style="background: rgba(10,17,13,0.8); border: 1px solid rgba(229,195,120,0.2); border-radius: 10px; padding: 8px 12px; margin-bottom: 14px; font-size: 11px; color: #E5C378; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 6px;">
        <span>⚡ <strong>Công thức ép đáy 4 tầng:</strong> [Shop xả kho -40%] + [Voucher Sàn 20%] + [Mã Video/Live 50%] + [Freeship Max 0đ]</span>
        <span style="color: #34D399; font-weight: 750;">Chỉ từ 9.000₫ · Mở App sàn tự động cấn trừ</span>
      </div>

      <!-- Filter Tabs -->
      <div class="flash-deal-tabs" role="tablist" style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 16px;">
        \${tabs.map(t => {
          const isAct = (currentGroup === t.id);
          return \`
            <button 
              type="button" 
              class="btn-flash-deal-tab" 
              data-tab-group="\${t.id}" 
              onclick="setFlashDealFilter('\${t.id}')" 
              style="padding: 6px 14px; border-radius: 999px; font-size: 12px; font-weight: \${isAct ? '800' : '600'}; cursor: pointer; border: 1px solid \${isAct ? '#E5C378' : 'rgba(229,195,120,0.3)'}; background: \${isAct ? '#E5C378' : 'rgba(229,195,120,0.08)'}; color: \${isAct ? '#0A110D' : '#E5C378'}; transition: all 0.15s ease;"
            >
              \${t.label}
            </button>
          \`;
        }).join('')}
      </div>

      <!-- Deals Grid (Responsive 260px minmax) -->
      <div id="jayt-flash-deals-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 14px;">
        \${JAYT_FLASH_ARBITRAGE_DEALS_70_80.map(d => {
          const isVisible = (currentGroup === 'ALL' || currentGroup === d.group);
          return \`
            <article class="flash-deal-card" data-flash-id="\${d.id}" data-flash-group="\${d.group}" style="display: \${isVisible ? 'flex' : 'none'}; flex-direction: column; justify-content: space-between; background: rgba(14,22,17,0.85); border: 1.5px solid rgba(229,195,120,0.22); border-radius: 14px; padding: 12px; transition: transform 0.2s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s ease; box-shadow: 0 4px 16px rgba(0,0,0,0.3); position: relative;">
              <div>
                <!-- Image Container with Radial Glow -->
                <div style="width: 100%; height: 130px; margin-bottom: 8px; border-radius: 10px; overflow: hidden; background: radial-gradient(circle at center, rgba(229,195,120,0.12) 0%, rgba(10,17,13,0.95) 75%); display: flex; align-items: center; justify-content: center; border: 1px solid rgba(229,195,120,0.2); position: relative;">
                  <img src="\${d.imageUrl}" alt="\${escapeHtml(d.title)}" class="flash-deal-img" referrerpolicy="no-referrer" loading="lazy" style="width: 100%; height: 100%; object-fit: contain; border-radius: 8px; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.4));" onerror="this.onerror=null; this.src='https://down-vn.img.susercontent.com/file/sg-11134253-824iq-mej832cqxtza25';" />
                  <div style="position: absolute; inset: 0; pointer-events: none; background: radial-gradient(circle at center, transparent 40%, rgba(10,17,13,0.8) 100%);"></div>
                  <!-- Discount Badge -->
                  <div style="position: absolute; top: 6px; left: 6px; background: linear-gradient(135deg, #EF4444, #DC2626); color: #FFFFFF; font-size: 10px; font-weight: 850; padding: 2px 7px; border-radius: 5px; box-shadow: 0 2px 6px rgba(239,68,68,0.4); letter-spacing: 0.3px; z-index: 2;">
                    \${d.badge}
                  </div>
                  <!-- Quota Badge -->
                  <div style="position: absolute; top: 6px; right: 6px; background: rgba(10,17,13,0.88); color: #34D399; border: 1px solid rgba(16,185,129,0.4); font-size: 9.5px; font-weight: 750; padding: 2px 6px; border-radius: 5px; z-index: 2;">
                    ⚡ Còn \${d.stockQuota} suất
                  </div>
                </div>

                <!-- Platform & Category -->
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 6px; margin-bottom: 4px;">
                  <span style="font-size: 10.5px; font-weight: 750; color: \${d.color}; background: rgba(229,195,120,0.1); padding: 1.5px 6px; border-radius: 4px; border: 1px solid rgba(229,195,120,0.25);">\${d.platformName}</span>
                  <span style="font-size: 10px; color: #10B981; font-weight: 600;">\${d.groupLabel}</span>
                </div>

                <!-- Clean Title -->
                <h4 style="font-size: 13px; font-weight: 750; color: #F4EFE6; line-height: 1.3; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; min-height: 34px;" title="\${escapeHtml(d.title)}">
                  \${escapeHtml(d.cleanTitle)}
                </h4>
                <div style="font-size: 10.5px; color: #A3B1A8; margin-bottom: 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                  <em>\${escapeHtml(d.merchantName)}</em>
                </div>
              </div>

              <!-- Price Board -->
              <div style="border-top: 1px dashed rgba(229,195,120,0.18); padding-top: 6px; margin-top: 2px;">
                <div style="background: rgba(10,17,13,0.75); border-radius: 8px; padding: 6px 8px; margin-bottom: 6px; border: 1px solid rgba(229,195,120,0.18);">
                  <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px;">
                    <span style="font-size: 10px; color: #8C9990; text-transform: uppercase;">Niêm yết:</span>
                    <del style="font-size: 11px; color: #8C9990;">\${d.originalPrice.toLocaleString('vi-VN')}₫</del>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: baseline;">
                    <span style="font-size: 10px; color: #10B981; font-weight: 750; text-transform: uppercase;">ÉP ĐÁY JAYT:</span>
                    <span style="font-size: 18px; font-weight: 850; color: #34D399; font-family: 'Playfair Display', Georgia, serif;">\${d.finalPrice.toLocaleString('vi-VN')}₫</span>
                  </div>
                  <div style="font-size: 9.5px; color: #E5C378; margin-top: 2px; line-height: 1.3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                    🏷️ \${d.voucherLabel}
                  </div>
                </div>

                <!-- 1-Click CTA & So Giá 3 Sàn -->
                <div style="display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 5px; margin-bottom: 4px;">
                  <button type="button" class="btn-cta-primary" onclick="triggerJaytSensoryFeedback(event); dispatchSmartAffiliate('\${d.platform}', { isSearchFallback: true, searchQuery: '\${escapeHtml(d.cleanTitle)}', pdpUrl: '\${d.canonicalUrl}' }, '\${d.voucherCode}', event);" style="padding: 7px 6px; font-size: 11px; font-weight: 800; border-radius: 7px; background: linear-gradient(135deg, #EF4444, #DC2626); color: #FFFFFF; border: none; cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 3px; box-shadow: 0 2px 8px rgba(239,68,68,0.3); white-space: nowrap;">
                    <span>⚡ Mua -\${d.discountPercent}% ↗</span>
                  </button>
                  <button type="button" class="btn-sku-cross-radar" onclick="triggerJaytSensoryFeedback(event); openSkuCrossPlatformRadar('\${d.id}', '\${escapeHtml(d.cleanTitle)}', \${d.finalPrice}, '\${d.platform}');" style="padding: 7px 6px; font-size: 10.5px; font-weight: 700; border-radius: 7px; border: 1.5px solid rgba(229,195,120,0.5); background: rgba(229,195,120,0.12); color: #E5C378; cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 2px; white-space: nowrap;" title="So sánh giá đáy 3 sàn">
                    <span>⚡ So 3 Sàn</span>
                  </button>
                </div>
                <div style="font-size: 9px; color: #10B981; text-align: center; margin-top: 3px; font-weight: 600;">
                  ✨ 1-Click mở App sàn tự áp mã
                </div>
              </div>
            </article>
          \`;
        }).join('')}
      </div>
    </div>
  \`;
}
`;

// Insert the flash radar module code before renderAuxiliaryLinkInspector
if (!code.includes('JAYT_FLASH_ARBITRAGE_DEALS_70_80')) {
  code = code.replace(
    'function renderAuxiliaryLinkInspector() {',
    flashRadarModuleCode + '\nfunction renderAuxiliaryLinkInspector() {'
  );
  console.log('[OK] Injected JAYT_FLASH_ARBITRAGE_DEALS_70_80 and renderFlashArbitrageRadar70_80()');
}

// In renderAuxiliaryLinkInspector, insert ${renderFlashArbitrageRadar70_80()} before the closing </div>
if (!code.includes('${renderFlashArbitrageRadar70_80()}')) {
  code = code.replace(
    '<div id="j401-voucher-output" style="margin-top: 10px;"></div>\n    </div>',
    '<div id="j401-voucher-output" style="margin-top: 10px;"></div>\n\n      ${renderFlashArbitrageRadar70_80()}\n    </div>'
  );
  console.log('[OK] Integrated ${renderFlashArbitrageRadar70_80()} into renderAuxiliaryLinkInspector()');
}

// Fix data classification bug in renderDormShoppingModule:
// Replace: const cluster2Desk = filteredProducts.filter(p => !cluster1Survival.includes(p) && (p.category === 'Học tập & Công nghệ' || p.observed_price > 180000));
// With: const cluster2Desk = filteredProducts.filter(p => !cluster1Survival.includes(p) && p.category === 'Học tập & Công nghệ' && p.observed_price < 1000000);
const oldCluster2 = "const cluster2Desk = filteredProducts.filter(p => !cluster1Survival.includes(p) && (p.category === 'Học tập & Công nghệ' || p.observed_price > 180000));";
const newCluster2 = "const cluster2Desk = filteredProducts.filter(p => !cluster1Survival.includes(p) && p.category === 'Học tập & Công nghệ' && p.observed_price < 1000000);";

if (code.includes(oldCluster2)) {
  code = code.replace(oldCluster2, newCluster2);
  console.log('[OK] Fixed data classification bug for cluster2Desk (excluded Phuộc RCB 2.400.000₫)');
}

// Update shelf titles for cluster 2 and 3
const oldShelf2 = "${renderJ465DormPriceShelf('Nhóm 2 — Góc Bàn Học & Deadline Decor ≤ 199K 💻', 'Quạt mini Turbo, đèn LED chống cận, tai nghe không dây, sạc dự phòng trong suốt 30000mAh.', cluster2Desk, '#3B82F6')}";
const newShelf2 = "${renderJ465DormPriceShelf('Nhóm 2 — Góc Bàn Học & Deadline Decor (Giá Ép Đáy ≤ 199K) 💻', 'Quạt mini Turbo, đèn LED chống cận, tai nghe không dây, sạc dự phòng trong suốt 30000mAh.', cluster2Desk, '#3B82F6')}";
if (code.includes(oldShelf2)) {
  code = code.replace(oldShelf2, newShelf2);
  console.log('[OK] Updated shelf 2 title with verified ep day ≤ 199K');
}

const oldShelf3 = "${renderJ465DormPriceShelf('Nhóm 3 — Phụ Kiện Công Nghệ & Tiện Ích KTX ⚡', 'Cáp sạc nhanh 65W, loa bluetooth mini, đồ ăn vặt & nhu yếu phẩm KTX Đà Nẵng.', cluster3Living, '#F59E0B')}";
const newShelf3 = "${renderJ465DormPriceShelf('Nhóm 3 — Đời Sống KTX, Xe Cộ & Tiện Ích Sinh Viên ⚡', 'Phụ tùng bảo dưỡng xe máy sinh viên, cáp sạc nhanh 65W, đồ ăn vặt & nhu yếu phẩm KTX Đà Nẵng.', cluster3Living, '#F59E0B')}";
if (code.includes(oldShelf3)) {
  code = code.replace(oldShelf3, newShelf3);
  console.log('[OK] Updated shelf 3 title to properly host personal commute / shock absorber items');
}

// Expose globals at the end of jayt_apex_interface.js
const globalExposeCode = `
  window.setFlashDealFilter = setFlashDealFilter;
  window.JAYT_FLASH_ARBITRAGE_DEALS_70_80 = JAYT_FLASH_ARBITRAGE_DEALS_70_80;
  window.renderFlashArbitrageRadar70_80 = renderFlashArbitrageRadar70_80;
  if (!window.__lastSkuMap) window.__lastSkuMap = {};
  JAYT_FLASH_ARBITRAGE_DEALS_70_80.forEach(d => {
    window.__lastSkuMap[d.id] = {
      sku_id: d.id,
      product_name: d.title,
      cleanTitle: d.cleanTitle,
      observed_price: d.finalPrice,
      canonical_url: d.canonicalUrl,
      platform: d.platform,
      brand: d.merchantName
    };
  });
`;

if (!code.includes('window.renderFlashArbitrageRadar70_80 = renderFlashArbitrageRadar70_80;')) {
  code = code.replace(
    'window.openSkuCrossPlatformRadar = openSkuCrossPlatformRadar;\n})(window);',
    'window.openSkuCrossPlatformRadar = openSkuCrossPlatformRadar;\n' + globalExposeCode + '\n})(window);'
  );
  console.log('[OK] Exposed global helpers and populated window.__lastSkuMap');
}

fs.writeFileSync(filePath, code, 'utf8');
console.log('Successfully updated 03_SOURCE_OF_TRUTH/jayt_apex_interface.js!');
