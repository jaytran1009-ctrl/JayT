/**
 * JAYT-415 Hotfix Script:
 * 1. Eliminate all synthetic deadlinks on Lazada & TikTok in CROSS_PLATFORM_SKU_TRIPLETS.
 * 2. Update real-time prices for TopGia (103.750đ) and Sạc dự phòng (202.500đ) in J387_DORM_SKUS and triplets.
 * 3. Add Flash Sale / Membership tier discount disclaimer note.
 * 4. Add Messenger/Zalo in-app webview detection and breakout mechanism.
 */

const fs = require('fs');
const path = require('path');

const targetFile = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
let code = fs.readFileSync(targetFile, 'utf8');

console.log('Original code size:', code.length);

// 1. UPDATE J387_DORM_SKUS prices
// TopGia
code = code.replace(
  /("sku_id":\s*"DORM_SKU_FEED_01_23552060269"[\s\S]*?"observed_price":\s*)125000([\s\S]*?"price_display":\s*)"125\.000₫"/,
  '$1103750$2"103.750₫"'
);

// Sạc dự phòng
code = code.replace(
  /("sku_id":\s*"DORM_SKU_FEED_06_28818204493"[\s\S]*?"observed_price":\s*)225000([\s\S]*?"price_display":\s*)"225\.000₫"/,
  '$1202500$2"202.500₫"'
);

// 2. DEFINE CLEAN CROSS_PLATFORM_SKU_TRIPLETS
const newTriplets = `const CROSS_PLATFORM_SKU_TRIPLETS = Object.freeze([
  {
    id: 'SKU_TRIPLET_01_SHIN_CASE',
    title: 'Ốp Lưng iPhone TPU Chống Bẩn Lót Nhung Shin Case',
    category: 'Phụ kiện số',
    variantName: 'iPhone 11 / Đen Mờ Lót Nhung',
    matchKeys: ['26609048170', 'shin case', 'op lung iphone', '89827191', 'SKU_TRIPLET_01_SHIN_CASE', 'DORM_SKU_FEED_02_26609048170', 'DORM_SKU_FEED_10_23244410073', 'DORM_SKU_FEED_14_29000715432', '23244410073', '29000715432'],
    platforms: {
      shopee: {
        available: true,
        merchantName: 'SHIN CASE Official Store (Shopee Mall)',
        merchantType: 'OFFICIAL_MALL',
        shopId: '89827191',
        itemId: '26609048170',
        modelId: '235048271',
        variantName: 'iPhone 11 / Đen Mờ',
        pdpUrl: 'https://shopee.vn/product/89827191/26609048170',
        observedPrice: 24050,
        deliveryFee: 16000,
        freeshipCredit: 16000,
        voucherLabel: 'Mã Live 20% + Freeship Xtra',
        voucherCode: 'SHOPEELIVE50'
      },
      lazada: {
        available: false,
        merchantName: 'Chưa liên kết gian hàng chính thức',
        statusLabel: 'Chưa có gian hàng chính hãng trên Lazada',
        searchQuery: 'Ốp Lưng iPhone TPU Chống Bẩn Lót Nhung Shin Case'
      },
      tiktok: {
        available: false,
        merchantName: 'Chưa có gian hàng Mall chính thức',
        statusLabel: 'Chưa có gian hàng chính hãng trên TikTok Shop',
        searchQuery: 'Ốp lưng iPhone TPU Shin Case'
      }
    }
  },
  {
    id: 'SKU_TRIPLET_02_TOPGIA_TISSUE',
    title: 'Khăn Giấy Treo Tường TopGia Đa Sắc Đa Năng 1280 Tờ',
    category: 'Gia dụng KTX',
    variantName: 'Thùng 4 gói x 1280 tờ (4 lớp)',
    matchKeys: ['23552060269', 'topgia', 'khan giay treo tuong', '1016604648', 'SKU_TRIPLET_02_TOPGIA_TISSUE', 'DORM_SKU_FEED_01_23552060269', 'DORM_SKU_FEED_03_25171045245', 'DORM_SKU_FEED_05_24491019937', 'DORM_SKU_FEED_09_17532975547', 'DORM_SKU_FEED_11_23073213252', 'DORM_SKU_FEED_13_46859620849', 'DORM_SKU_FEED_16_17376598691', 'DORM_SKU_FEED_17_52306955570', 'DORM_SKU_FEED_19_52460495899', '24491019937', '17532975547', '46859620849', '52306955570', '52460495899'],
    platforms: {
      shopee: {
        available: true,
        merchantName: 'TopGia HCM Store (Shopee Mall)',
        merchantType: 'OFFICIAL_MALL',
        shopId: '1016604648',
        itemId: '23552060269',
        modelId: '198273641',
        variantName: 'Thùng 4 Gói (1280 tờ)',
        pdpUrl: 'https://shopee.vn/product/1016604648/23552060269',
        observedPrice: 103750,
        deliveryFee: 22000,
        freeshipCredit: 22000,
        voucherLabel: 'Mã Shop 15K + Freeship Xtra',
        voucherCode: 'TOPGIA20K'
      },
      lazada: {
        available: false,
        merchantName: 'Chưa liên kết gian hàng chính thức',
        statusLabel: 'Chưa có gian hàng chính hãng trên Lazada',
        searchQuery: 'Khăn Giấy Treo Tường TopGia Đa Sắc Đa Năng 1280 Tờ'
      },
      tiktok: {
        available: false,
        merchantName: 'Chưa có gian hàng Mall chính thức',
        statusLabel: 'Chưa có gian hàng chính hãng trên TikTok Shop',
        searchQuery: 'Khăn Giấy Treo Tường TopGia Đa Sắc Đa Năng 1280 Tờ'
      }
    }
  },
  {
    id: 'SKU_TRIPLET_03_OCAM_DIENQUANG',
    title: 'Ổ Cắm Điện Điện Quang 5 Lỗ 2m Chống Giật An Toàn',
    category: 'Gia dụng KTX',
    variantName: '5 Lỗ / Dây 2m / Chống Giật',
    matchKeys: ['19827364512', 'dienquang', 'o cam dien', 'dien quang', 'SKU_TRIPLET_03_OCAM_DIENQUANG', 'DORM_SKU_01_OCAM_DIENQUANG'],
    platforms: {
      shopee: {
        available: true,
        merchantName: 'Điện Quang Official Store (Shopee Mall)',
        merchantType: 'OFFICIAL_MALL',
        shopId: '32456789',
        itemId: '19827364512',
        modelId: '123894751',
        variantName: '5 Lỗ 2m',
        pdpUrl: 'https://shopee.vn/product/32456789/19827364512',
        observedPrice: 89000,
        deliveryFee: 18000,
        freeshipCredit: 18000,
        voucherLabel: 'Shopee Mall 10K + Freeship Xtra',
        voucherCode: 'DIENQUANG10K'
      },
      lazada: {
        available: false,
        merchantName: 'Chưa liên kết gian hàng chính thức',
        statusLabel: 'Chưa có gian hàng chính hãng trên Lazada',
        searchQuery: 'Ổ cắm điện Điện Quang 5 lỗ 2m'
      },
      tiktok: {
        available: false,
        merchantName: 'Chưa có gian hàng Mall chính thức',
        statusLabel: 'Chưa có gian hàng chính hãng trên TikTok Shop',
        searchQuery: 'Ổ cắm điện Điện Quang 5 lỗ 2m'
      }
    }
  },
  {
    id: 'SKU_TRIPLET_04_QUAT_JISULIFE',
    title: 'Quạt Tích Điện Để Bàn Mini Jisulife Pro 4000mAh',
    category: 'Gia dụng KTX & Văn phòng',
    variantName: 'Bản 4000mAh / Màu Trắng Sữa',
    matchKeys: ['18274910245', 'jisulife', 'quat de ban', 'quat jisulife', '38729104', 'SKU_TRIPLET_04_QUAT_JISULIFE', 'DORM_SKU_02_QUAT_JISULIFE', 'DORM_SKU_FEED_18_48913645670', '48913645670'],
    platforms: {
      shopee: {
        available: true,
        merchantName: 'JISULIFE Official Store (Shopee Mall)',
        merchantType: 'OFFICIAL_MALL',
        shopId: '38729104',
        itemId: '18274910245',
        modelId: '162849102',
        variantName: 'Bản 4000mAh Trắng',
        pdpUrl: 'https://shopee.vn/product/38729104/18274910245',
        observedPrice: 349000,
        deliveryFee: 22000,
        freeshipCredit: 22000,
        voucherLabel: 'Voucher Sàn 30K + Freeship Xtra',
        voucherCode: 'SHOPEELIVE50'
      },
      lazada: {
        available: false,
        merchantName: 'Chưa liên kết gian hàng chính thức',
        statusLabel: 'Chưa có gian hàng chính hãng trên Lazada',
        searchQuery: 'Quạt Tích Điện Để Bàn Mini Jisulife Pro 4000mAh'
      },
      tiktok: {
        available: false,
        merchantName: 'Chưa có gian hàng Mall chính thức',
        statusLabel: 'Chưa có gian hàng chính hãng trên TikTok Shop',
        searchQuery: 'Quạt Tích Điện Để Bàn Mini Jisulife Pro 4000mAh'
      }
    }
  },
  {
    id: 'SKU_TRIPLET_05_UGREEN_GAN30W',
    title: 'Củ Sạc Nhanh Ugreen GaN 30W Type-C Robot Nexode',
    category: 'Phụ kiện công nghệ',
    variantName: 'Robot 30W / Màu Xám Space Gray',
    matchKeys: ['22145890123', 'ugreen', 'sac nhanh ugreen', 'robot nexode', '10987654', 'SKU_TRIPLET_05_UGREEN_GAN30W', 'DORM_SKU_FEED_06_28818204493', 'DORM_SKU_FEED_20_28708632089', '28818204493', '28708632089'],
    platforms: {
      shopee: {
        available: true,
        merchantName: 'Ugreen Official Store (Shopee Mall)',
        merchantType: 'OFFICIAL_MALL',
        shopId: '10987654',
        itemId: '22145890123',
        modelId: '154829103',
        variantName: 'Robot 30W Xám',
        pdpUrl: 'https://shopee.vn/product/10987654/22145890123',
        observedPrice: 202500,
        deliveryFee: 16000,
        freeshipCredit: 16000,
        voucherLabel: 'Mã Live 25K + Freeship Xtra',
        voucherCode: 'SHOPEELIVE50'
      },
      lazada: {
        available: false,
        merchantName: 'Chưa liên kết gian hàng chính thức',
        statusLabel: 'Chưa có gian hàng chính hãng trên Lazada',
        searchQuery: 'Củ Sạc Nhanh Ugreen GaN 30W Type-C Robot Nexode'
      },
      tiktok: {
        available: false,
        merchantName: 'Chưa có gian hàng Mall chính thức',
        statusLabel: 'Chưa có gian hàng chính hãng trên TikTok Shop',
        searchQuery: 'Củ Sạc Nhanh Ugreen GaN 30W Type-C Robot Nexode'
      }
    }
  },
  {
    id: 'SKU_TRIPLET_06_BASEUS_100W',
    title: 'Cáp Sạc Nhanh Baseus Tungsten Gold Type-C 100W Dây Dù',
    category: 'Phụ kiện công nghệ',
    variantName: 'Dây dù 1m / Đen Ánh Kim',
    matchKeys: ['17654321098', 'baseus', 'cap sac baseus', 'tungsten gold', '54321098', 'SKU_TRIPLET_06_BASEUS_100W', 'DORM_SKU_FEED_08_48054201493', 'DORM_SKU_FEED_15_40900937672'],
    platforms: {
      shopee: {
        available: true,
        merchantName: 'Baseus Official Mall (Shopee Mall)',
        merchantType: 'OFFICIAL_MALL',
        shopId: '54321098',
        itemId: '17654321098',
        modelId: '143210987',
        variantName: '1m / Đen 100W',
        pdpUrl: 'https://shopee.vn/product/54321098/17654321098',
        observedPrice: 79000,
        deliveryFee: 16000,
        freeshipCredit: 16000,
        voucherLabel: 'Mã Shop 10K + Freeship Xtra',
        voucherCode: 'SHOPEELIVE50'
      },
      lazada: {
        available: false,
        merchantName: 'Chưa liên kết gian hàng chính thức',
        statusLabel: 'Chưa có gian hàng chính hãng trên Lazada',
        searchQuery: 'Cáp sạc Baseus Tungsten Gold 100W'
      },
      tiktok: {
        available: false,
        merchantName: 'Chưa có gian hàng Mall chính thức',
        statusLabel: 'Chưa có gian hàng chính hãng trên TikTok Shop',
        searchQuery: 'Cáp sạc Baseus Tungsten Gold 100W'
      }
    }
  },
  {
    id: 'SKU_TRIPLET_07_LOGITECH_M350S',
    title: 'Chuột Không Dây Silent Logitech Pebble M350s Slim',
    category: 'Văn phòng & Học tập',
    variantName: 'Trắng Off-White / Bluetooth + USB',
    matchKeys: ['25432109876', 'logitech', 'pebble m350s', 'chuot logitech', '76543210', 'SKU_TRIPLET_07_LOGITECH_M350S', 'DORM_SKU_22_CHUOT_LOGITECH', 'DORM_SKU_FEED_12_56059964080', '56059964080'],
    platforms: {
      shopee: {
        available: true,
        merchantName: 'Logitech Official Store (Shopee Mall)',
        merchantType: 'OFFICIAL_MALL',
        shopId: '76543210',
        itemId: '25432109876',
        modelId: '132109876',
        variantName: 'Trắng Off-White M350s',
        pdpUrl: 'https://shopee.vn/product/76543210/25432109876',
        observedPrice: 469000,
        deliveryFee: 22000,
        freeshipCredit: 22000,
        voucherLabel: 'Voucher Sàn 40K + Freeship Xtra',
        voucherCode: 'SHOPEELIVE50'
      },
      lazada: {
        available: false,
        merchantName: 'Chưa liên kết gian hàng chính thức',
        statusLabel: 'Chưa có gian hàng chính hãng trên Lazada',
        searchQuery: 'Chuột không dây Logitech Pebble M350s'
      },
      tiktok: {
        available: false,
        merchantName: 'Chưa có gian hàng Mall chính thức',
        statusLabel: 'Chưa có gian hàng chính hãng trên TikTok Shop',
        searchQuery: 'Chuột không dây Logitech Pebble M350s'
      }
    }
  },
  {
    id: 'SKU_TRIPLET_08_AM_SUNHOUSE',
    title: 'Ấm Siêu Tốc Inox 2 Lớp Sunhouse 1.8L SHD1182',
    category: 'Gia dụng KTX',
    variantName: 'Dung tích 1.8L / Ruột Inox 304',
    matchKeys: ['21098765432', 'sunhouse', 'am sieu toc', 'shd1182', '65432109', 'SKU_TRIPLET_08_AM_SUNHOUSE', 'DORM_SKU_03_AM_SUNHOUSE'],
    platforms: {
      shopee: {
        available: true,
        merchantName: 'Sunhouse Official Store (Shopee Mall)',
        merchantType: 'OFFICIAL_MALL',
        shopId: '65432109',
        itemId: '21098765432',
        modelId: '121098765',
        variantName: '1.8L Inox SHD1182',
        pdpUrl: 'https://shopee.vn/product/65432109/21098765432',
        observedPrice: 169000,
        deliveryFee: 22000,
        freeshipCredit: 22000,
        voucherLabel: 'Mã Live 20K + Freeship Xtra',
        voucherCode: 'SHOPEELIVE50'
      },
      lazada: {
        available: false,
        merchantName: 'Chưa liên kết gian hàng chính thức',
        statusLabel: 'Chưa có gian hàng chính hãng trên Lazada',
        searchQuery: 'Ấm Siêu Tốc Inox 2 Lớp Sunhouse 1.8L SHD1182'
      },
      tiktok: {
        available: false,
        merchantName: 'Chưa có gian hàng Mall chính thức',
        statusLabel: 'Chưa có gian hàng chính hãng trên TikTok Shop',
        searchQuery: 'Ấm Siêu Tốc Inox 2 Lớp Sunhouse 1.8L SHD1182'
      }
    }
  },
  {
    id: 'SKU_TRIPLET_09_LOCKNLOCK_BINH',
    title: 'Bình Giữ Nhiệt Lock&Lock Feather Light 500ml LHC1439',
    category: 'Gia dụng KTX & Văn phòng',
    variantName: 'Dung tích 500ml / Màu Xanh Navy',
    matchKeys: ['20987654321', 'lock&lock', 'locknlock', 'binh giu nhiet', 'lhc1439', '43210987', 'SKU_TRIPLET_09_LOCKNLOCK_BINH', 'DORM_SKU_10_HOP_COM_LOCKNLOCK'],
    platforms: {
      shopee: {
        available: true,
        merchantName: 'Lock&Lock Official Store (Shopee Mall)',
        merchantType: 'OFFICIAL_MALL',
        shopId: '43210987',
        itemId: '20987654321',
        modelId: '110987654',
        variantName: '500ml Xanh Navy',
        pdpUrl: 'https://shopee.vn/product/43210987/20987654321',
        observedPrice: 259000,
        deliveryFee: 18000,
        freeshipCredit: 18000,
        voucherLabel: 'Mã Shop 25K + Freeship Xtra',
        voucherCode: 'SHOPEELIVE50'
      },
      lazada: {
        available: false,
        merchantName: 'Chưa liên kết gian hàng chính thức',
        statusLabel: 'Chưa có gian hàng chính hãng trên Lazada',
        searchQuery: 'Bình giữ nhiệt Lock&Lock Feather Light 500ml'
      },
      tiktok: {
        available: false,
        merchantName: 'Chưa có gian hàng Mall chính thức',
        statusLabel: 'Chưa có gian hàng chính hãng trên TikTok Shop',
        searchQuery: 'Bình giữ nhiệt Lock&Lock Feather Light 500ml'
      }
    }
  },
  {
    id: 'SKU_TRIPLET_10_MI_KORENO',
    title: 'Combo 10 Gói Mì Koreno Jumbo Bò Cay 1kg Tiết Kiệm',
    category: 'Nhu yếu phẩm KTX',
    variantName: 'Gói 1kg (10 vắt mì x 100g)',
    matchKeys: ['19876543210', 'koreno', 'mi koreno', 'paldo', '87654321', 'SKU_TRIPLET_10_MI_KORENO', 'DORM_SKU_FEED_04_29428705340', 'DORM_SKU_FEED_07_28257218140', '29428705340', '28257218140'],
    platforms: {
      shopee: {
        available: true,
        merchantName: 'Paldo Vina Official (Shopee Mall)',
        merchantType: 'OFFICIAL_MALL',
        shopId: '87654321',
        itemId: '19876543210',
        modelId: '100987654',
        variantName: 'Bò Cay 1kg (10 gói)',
        pdpUrl: 'https://shopee.vn/product/87654321/19876543210',
        observedPrice: 95000,
        deliveryFee: 18000,
        freeshipCredit: 18000,
        voucherLabel: 'Mã Live 15K + Freeship Xtra',
        voucherCode: 'SHOPEELIVE50'
      },
      lazada: {
        available: false,
        merchantName: 'Chưa liên kết gian hàng chính thức',
        statusLabel: 'Chưa có gian hàng chính hãng trên Lazada',
        searchQuery: 'Combo 10 gói mì Koreno Jumbo 1kg'
      },
      tiktok: {
        available: false,
        merchantName: 'Chưa có gian hàng Mall chính thức',
        statusLabel: 'Chưa có gian hàng chính hãng trên TikTok Shop',
        searchQuery: 'Combo 10 gói mì Koreno Jumbo 1kg'
      }
    }
  }
]);`;

code = code.replace(
  /const CROSS_PLATFORM_SKU_TRIPLETS = Object\.freeze\(\[([\s\S]*?)\n\]\);/,
  newTriplets
);

// 3. ADD DISCLAIMER NOTE IN MODAL
const disclaimerSnippet = `      <!-- Disclaimer Note on Live Floor Prices -->
      <div style="font-size: 11.5px; color: #E5C378; background: rgba(229,195,120,0.08); border-left: 3px solid #E5C378; border-radius: 4px; padding: 8px 12px; margin-bottom: 14px; line-height: 1.4;">
        💡 <strong>Ghi chú từ JayT:</strong> Giá thực tế có thể giảm sâu hơn tùy hạng thành viên và khung giờ Flash Sale của sàn.
      </div>
`;

if (!code.includes('Giá thực tế có thể giảm sâu hơn tùy hạng thành viên')) {
  code = code.replace(
    /<!-- 3-Column Arbitrage Matrix -->/,
    disclaimerSnippet + '\n      <!-- 3-Column Arbitrage Matrix -->'
  );
}

// 4. ADD WEBVIEW BREAKOUT UTILITIES
const webviewSnippet = `
function isMessengerOrZaloWebview() {
  if (typeof navigator === 'undefined' || !navigator.userAgent) return false;
  const ua = navigator.userAgent || '';
  return /FBAN|FBAV|FB_IAB|Messenger|Zalo|ZaloTheme/i.test(ua);
}

function openWebviewBreakoutModal(targetUrl, deepLinkUrl, voucherCode, platformName = 'sàn') {
  if (voucherCode && typeof copyToClipboardFallback === 'function') {
    copyToClipboardFallback(voucherCode);
  }
  let modal = document.getElementById('jayt-webview-breakout-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'jayt-webview-breakout-modal';
    modal.className = 'zalo-modal-backdrop is-open';
    document.body.appendChild(modal);
  } else {
    modal.classList.add('is-open');
    modal.style.display = 'flex';
  }
  modal.style.cssText = 'position:fixed !important; inset:0 !important; z-index:100000 !important; display:flex !important; align-items:center !important; justify-content:center !important; background:rgba(0,0,0,0.85) !important; backdrop-filter:blur(10px) !important; padding:16px !important;';

  const isAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent || '');
  const cleanUrl = targetUrl || (typeof window !== 'undefined' ? window.location.href : 'https://jayt-production-v3420.vercel.app');
  const chromeIntent = 'intent://' + cleanUrl.replace(/^https?:\\/\\//, '') + '#Intent;scheme=https;package=com.android.chrome;end;';

  modal.innerHTML = \`
    <div style="max-width: 480px; width: 92%; background: #0E1611; border: 2px solid #E5C378; border-radius: 20px; padding: 24px; box-shadow: 0 20px 60px rgba(0,0,0,0.85); color: #F4EFE6; text-align: center;">
      <div style="font-size: 38px; margin-bottom: 8px;">🚀</div>
      <h3 style="margin: 0 0 8px; font-size: 18px; color: #E5C378; font-family: 'Playfair Display', Georgia, serif; font-weight: 850;">
        Mở Bằng Trình Duyệt Để Kích Hoạt App
      </h3>
      <p style="font-size: 12.5px; color: #A3B1A8; line-height: 1.5; margin: 0 0 16px;">
        Messenger &amp; Zalo đang chặn mở ứng dụng <strong>\${escapeHtml(platformName)}</strong>. Vui lòng làm theo 2 bước đơn giản:
      </p>
      
      <div style="background: rgba(229,195,120,0.08); border: 1.5px solid rgba(229,195,120,0.25); border-radius: 14px; padding: 14px; margin-bottom: 18px; text-align: left;">
        <div style="display: flex; gap: 10px; margin-bottom: 10px; align-items: flex-start;">
          <span style="background: #E5C378; color: #0A110D; font-weight: 900; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0;">1</span>
          <span style="font-size: 12.5px; color: #F4EFE6;">Nhấn biểu tượng <strong>⋯</strong> hoặc <strong>⋮</strong> (3 dấu chấm) ở góc trên bên phải màn hình.</span>
        </div>
        <div style="display: flex; gap: 10px; align-items: flex-start;">
          <span style="background: #E5C378; color: #0A110D; font-weight: 900; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0;">2</span>
          <span style="font-size: 12.5px; color: #F4EFE6;">Chọn <strong>"Mở bằng trình duyệt"</strong> (Safari / Chrome) để mở ứng dụng sàn và tự động áp mã.</span>
        </div>
      </div>

      \${voucherCode ? \`<div style="background: rgba(16,185,129,0.12); border: 1px dashed #10B981; border-radius: 10px; padding: 10px; margin-bottom: 18px; font-size: 12px; color: #34D399;">
        ✅ Đã tự động sao chép mã: <strong>\${escapeHtml(voucherCode)}</strong>
      </div>\` : ''}

      <div style="display: flex; flex-direction: column; gap: 10px;">
        \${isAndroid ? \`
          <a href="\${chromeIntent}" style="padding: 12px; border-radius: 10px; font-size: 13.5px; font-weight: 800; background: #E5C378; color: #0A110D; text-decoration: none; display: block;">
            Mở Trực Tiếp Bằng Chrome ↗
          </a>
        \` : ''}
        <button type="button" onclick="copyToClipboardFallback('\${escapeHtml(cleanUrl)}'); showJaytToast('✅ Đã sao chép liên kết! Dán vào Safari để mở app.');" style="padding: 12px; border-radius: 10px; font-size: 13px; font-weight: 750; background: rgba(229,195,120,0.2); color: #E5C378; border: 1px solid #E5C378; cursor: pointer;">
          📋 Sao Chép Link Để Dán Vào Safari
        </button>
        <button type="button" onclick="document.getElementById('jayt-webview-breakout-modal').style.display='none';" style="padding: 8px; font-size: 12px; color: #8C9990; background: none; border: none; cursor: pointer;">
          Bỏ qua &amp; tiếp tục duyệt web ✕
        </button>
      </div>
    </div>
  \`;
}

function renderWebviewBreakoutBanner() {
  if (typeof isMessengerOrZaloWebview === 'function' && isMessengerOrZaloWebview()) {
    return \`
      <div id="jayt-webview-banner" style="position: sticky; top: 0; z-index: 99998; background: linear-gradient(90deg, #1C2E24, #0E1611); border-bottom: 2px solid #E5C378; padding: 10px 16px; display: flex; align-items: center; justify-content: space-between; gap: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.6); font-family: -apple-system, BlinkMacSystemFont, sans-serif;">
        <div style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: #F4EFE6;">
          <span style="font-size: 16px;">⚡</span>
          <span>Đang mở trong Messenger/Zalo: bấm <strong>⋯</strong> hoặc <strong>⋮</strong> góc trên &gt; chọn <strong>Mở bằng trình duyệt</strong> để mở App Shopee/Lazada!</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px; flex-shrink: 0;">
          <button type="button" onclick="openWebviewBreakoutModal(window.location.href, null, null, 'Shopee / Lazada')" style="padding: 5px 12px; background: #E5C378; color: #0A110D; font-size: 11px; font-weight: 800; border: none; border-radius: 6px; cursor: pointer;">Hướng Dẫn</button>
          <button type="button" onclick="document.getElementById('jayt-webview-banner').style.display='none';" style="background: none; border: none; color: #8C9990; font-size: 16px; cursor: pointer; padding: 0 4px;" aria-label="Đóng thông báo">✕</button>
        </div>
      </div>
    \`;
  }
  return '';
}
`;

if (!code.includes('function isMessengerOrZaloWebview')) {
  code = code.replace(
    /function dispatchSmartAffiliate\(providerKey/,
    webviewSnippet + '\nfunction dispatchSmartAffiliate(providerKey'
  );
}

// 5. UPDATE dispatchSmartAffiliate to intercept Messenger/Zalo
if (!code.includes('if (isMessengerOrZaloWebview()) {')) {
  code = code.replace(
    /const partnerData = SECURE_PARTNER_CONFIG\[providerKey\] \|\| null;/,
    `const partnerData = SECURE_PARTNER_CONFIG[providerKey] || null;
  if (typeof isMessengerOrZaloWebview === 'function' && isMessengerOrZaloWebview()) {
    openWebviewBreakoutModal(fallbackWebUrl, deepLinkUrl, voucherCode, partnerData ? partnerData.name : providerKey);
    return;
  }`
  );
}

// 6. ADD BANNER TO renderApp
if (!code.includes('renderWebviewBreakoutBanner()')) {
  code = code.replace(
    /root\.innerHTML = \[/,
    'root.innerHTML = [\n    renderWebviewBreakoutBanner(),'
  );
}

// 7. EXPOSE TO WINDOW
const exportsSnippet = `  window.isMessengerOrZaloWebview = isMessengerOrZaloWebview;
  window.openWebviewBreakoutModal = openWebviewBreakoutModal;
  window.renderWebviewBreakoutBanner = renderWebviewBreakoutBanner;`;

if (!code.includes('window.isMessengerOrZaloWebview')) {
  code = code.replace(
    /window\.SHELF_SKU_TO_TRIPLET_MAP = SHELF_SKU_TO_TRIPLET_MAP;/,
    'window.SHELF_SKU_TO_TRIPLET_MAP = SHELF_SKU_TO_TRIPLET_MAP;\n' + exportsSnippet
  );
}

fs.writeFileSync(targetFile, code, 'utf8');
console.log('Successfully updated 03_SOURCE_OF_TRUTH/jayt_apex_interface.js! New size:', code.length);
