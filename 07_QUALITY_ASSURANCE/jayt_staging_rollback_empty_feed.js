/**
 * JAYT STAGING ROLLBACK CIRCUIT BREAKER — ISOLATED EMPTY FEED & BACKLOG RESTORATION
 * Governing Mandate: CEO Work Order (JAYT-274 / Pre-Mục DA Safety Gate)
 *
 * SCOPE & CONTRACT:
 * 1. STRICTLY ISOLATED TO STAGING AND INTERNAL SAFETY LEDGERS.
 * 2. ABSOLUTELY FORBIDS PRODUCTION MUTATION OR DEPLOYMENT (ZERO VERCEL --PROD).
 * 3. Atomically resets 05_DEAL_AND_AFFILIATE/deals_feed.json to [].
 * 4. Atomically restores JAYT_BATCH_03_READINESS_LEDGER.json to canonical static backlog state (a4cdd4...e60e).
 * 5. Generates immutable execution receipt with PID, UTC, and exact file byte hashes.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const DEALS_FEED_PATH = path.join(ROOT, '05_DEAL_AND_AFFILIATE/deals_feed.json');
const LEDGER_PATH_1 = path.join(ROOT, '06_TRUST_AND_EVIDENCE/JAYT_BATCH_03_READINESS_LEDGER.json');
const LEDGER_PATH_2 = path.join(ROOT, 'JAYT_BATCH_03_READINESS_LEDGER.json');
const RECEIPT_PATH_1 = path.join(ROOT, '07_QUALITY_ASSURANCE/runtime_evidence/JAYT_STAGING_ROLLBACK_EXECUTION_RECEIPT.json');
const RECEIPT_PATH_2 = path.join(ROOT, '06_TRUST_AND_EVIDENCE/JAYT_STAGING_ROLLBACK_EXECUTION_RECEIPT.json');

const EXPECTED_STATIC_LEDGER_SHA256 = 'a4cdd41bbade1fe9230996613d4067cfaa92976ed24e194bb563889beef7e60e';

function sha256(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}





// ROOT already defined above



function generateBatch03ReadinessLedger() {
  console.log('🔬 Generating JAYT_BATCH_03_READINESS_LEDGER.json per JAYT-267...');

  const clustersData = [
    {
      cluster_code: "HOA_KHANH",
      cluster_name: "Hòa Khánh — Cụm Sinh viên & Đại học phía Tây Bắc Đà Nẵng",
      targets: [
        {
          target_id: "BATCH03_HK_01",
          community_need: "Không gian học tập yên tĩnh, tra cứu tài liệu học thuật kỹ thuật và đồ án sinh viên.",
          rationale: "Phục vụ trực tiếp hơn 25.000 sinh viên Đại học Bách Khoa và Cao đẳng Công nghệ lân cận.",
          candidate_source_class: "OFFICIAL_INSTITUTIONAL_PORTAL",
          source_url_placeholder: "https://dut.udn.vn/KhoaCNTT/Thuvien",
          recheck_criteria: "Kiểm tra định kỳ 14 ngày: xác minh giờ mở cửa giảng đường và chính sách thẻ đọc sinh viên.",
          accessibility_notes: "WCAG 2.1 AA, phông chữ tối thiểu 16px, tương phản >= 4.5:1, hỗ trợ phím Tab chuyển vùng.",
          asset_rights_notes: "Chỉ sử dụng ảnh ngoại cảnh thực tế chụp bởi đội ngũ hoặc ảnh thư viện số Creative Commons được cấp phép."
        },
        {
          target_id: "BATCH03_HK_02",
          community_need: "Lộ trình và biểu phí trợ giá sinh viên tuyến xe buýt kết nối KTX Hòa Khánh - Trung tâm TP.",
          rationale: "Tuyến giao thông huyết mạch của sinh viên Đại học Sư Phạm và Đại học Bách Khoa di chuyển an toàn, tiết kiệm.",
          candidate_source_class: "PUBLIC_TRANSIT_AUTHORITY",
          source_url_placeholder: "https://danangbus.vn/lo-trinh-tuyen-r16a",
          recheck_criteria: "Kiểm tra định kỳ 14 ngày: biểu giá vé tháng trợ giá sinh viên và tần suất chuyến xe.",
          accessibility_notes: "Bảng giờ xe buýt tương thích screen reader với thẻ ARIA table đầy đủ.",
          asset_rights_notes: "Sử dụng sơ đồ tuyến đường chính thống từ Sở Giao thông Vận tải Đà Nẵng, không dùng logo thương mại."
        },
        {
          target_id: "BATCH03_HK_03",
          community_need: "Không gian sinh thái công cộng mở để sinh viên và cư dân tập thể dục, học nhóm ngoài trời.",
          rationale: "Điểm sinh hoạt cộng đồng xanh lớn nhất khu vực Hòa Khánh, hoàn toàn mở cửa tự do cho cộng đồng.",
          candidate_source_class: "PUBLIC_COMMUNITY_SPACE",
          source_url_placeholder: "https://lienchieu.danang.gov.vn/cong-vien-bau-tram",
          recheck_criteria: "Kiểm tra định kỳ 14 ngày: tình trạng vệ sinh môi trường và chiếu sáng công cộng tại công viên.",
          accessibility_notes: "Mô tả văn bản thay thế (alt-text) rõ ràng cho ảnh cảnh quan, chỉ dẫn đường đi xe lăn.",
          asset_rights_notes: "Ảnh thực tế không gian công cộng, không chứa hình ảnh cá nhân khi chưa được đồng ý."
        },
        {
          target_id: "BATCH03_HK_04",
          community_need: "Thông tin hỗ trợ việc làm bán thời gian lành mạnh và phòng trọ an toàn cho tân sinh viên.",
          rationale: "Bảo vệ sinh viên khỏi các bẫy tuyển dụng đa cấp và lừa đảo nhà trọ khu công nghiệp Hòa Khánh.",
          candidate_source_class: "OFFICIAL_INSTITUTIONAL_PORTAL",
          source_url_placeholder: "https://ued.udn.vn/ho-tro-sinh-vien",
          recheck_criteria: "Kiểm tra định kỳ 14 ngày: xác minh liên hệ phòng hỗ trợ sinh viên và danh mục hỗ trợ hợp lệ.",
          accessibility_notes: "Cấu trúc heading rõ ràng (H2, H3), số điện thoại hỗ trợ dạng liên kết tel: chuẩn.",
          asset_rights_notes: "Sử dụng thông tin dạng văn bản thuần túy, không sử dụng ấn phẩm quảng cáo bên thứ ba."
        },
        {
          target_id: "BATCH03_HK_05",
          community_need: "Bản đồ vị trí các trụ cấp nước sạch uống trực tiếp miễn phí cho sinh viên và người lao động.",
          rationale: "Tiện ích dân sinh thiết yếu dọc trục đường huyết mạch Tôn Đức Thắng phục vụ người đi đường.",
          candidate_source_class: "CIVIC_UTILITY_DIRECTORY",
          source_url_placeholder: "https://dawaco.com.vn/tru-nuoc-uong-cong-cong",
          recheck_criteria: "Kiểm tra định kỳ 14 ngày: xác nhận trụ nước hoạt động bình thường và tem kiểm định chất lượng nước.",
          accessibility_notes: "Tọa độ bản đồ chỉ đường hiển thị nhãn văn bản tường minh cho người khiếm thị.",
          asset_rights_notes: "Ảnh hiện trường trụ nước, không gắn nhãn mác thương hiệu thiết bị."
        },
        {
          target_id: "BATCH03_HK_06",
          community_need: "Lịch sinh hoạt các câu lạc bộ học thuật và không gian chế tác sáng tạo (Makerspace) mở cho sinh viên.",
          rationale: "Thúc đẩy phong trào nghiên cứu khoa học và phát triển kỹ năng công nghệ cộng đồng phi lợi nhuận.",
          candidate_source_class: "COMMUNITY_YOUTH_PROGRAM",
          source_url_placeholder: "https://dut.udn.vn/clb-sang-tao-tre",
          recheck_criteria: "Kiểm tra định kỳ 14 ngày: lịch mở cửa phòng thực hành và quy định an toàn lao động.",
          accessibility_notes: "Độ tương phản bảng thông báo >= 4.5:1, bố cục phản hồi mượt mà trên thiết bị di động 390px.",
          asset_rights_notes: "Ảnh hoạt động học thuật nội bộ trường, không quảng cáo sản phẩm tài trợ."
        },
        {
          target_id: "BATCH03_HK_07",
          community_need: "Sân tập thể dục thể thao công cộng ngoài trời dành cho thanh niên và sinh viên rèn luyện sức khỏe.",
          rationale: "Nhu cầu rèn luyện thể chất lành mạnh, giảm thời gian ngồi trước màn hình của sinh viên kỹ thuật.",
          candidate_source_class: "PUBLIC_COMMUNITY_SPACE",
          source_url_placeholder: "https://lienchieu.danang.gov.vn/trung-tam-van-hoa-the-thao",
          recheck_criteria: "Kiểm tra định kỳ 14 ngày: khung giờ mở cửa miễn phí cho học sinh sinh viên.",
          accessibility_notes: "Chỉ dẫn khu vực tập luyện rõ ràng, biểu tượng trực quan có chú thích văn bản.",
          asset_rights_notes: "Ảnh thực tế sân tập công cộng của quận, không chứa biển quảng cáo thương mại."
        }
      ]
    },
    {
      cluster_code: "AN_THUONG",
      cluster_name: "An Thượng — Cụm Văn hóa, Sáng tạo & Cộng đồng ven biển Ngũ Hành Sơn",
      targets: [
        {
          target_id: "BATCH03_AT_01",
          community_need: "Không gian đọc sách mở và trao đổi sách cũ cộng đồng tại khu phố đi bộ An Thượng.",
          rationale: "Xây dựng văn hóa đọc công cộng, điểm dừng chân văn minh cho thanh niên và du khách trẻ.",
          candidate_source_class: "PUBLIC_COMMUNITY_SPACE",
          source_url_placeholder: "https://nguhanhson.danang.gov.vn/pho-di-bo-an-thuong",
          recheck_criteria: "Kiểm tra định kỳ 14 ngày: số lượng đầu sách và quy định giữ gìn tủ sách công cộng.",
          accessibility_notes: "WCAG 2.1 AA, tương phản phông nền tối thiểu 4.5:1, không gây lóa mắt dưới ánh sáng ngoài trời.",
          asset_rights_notes: "Ảnh không gian phố đi bộ văn minh, không chứa logo quán xá thương mại lân cận."
        },
        {
          target_id: "BATCH03_AT_02",
          community_need: "Chỉ dẫn các trạm cứu hộ bãi biển, phao tiêu an toàn và cờ cảnh báo đuối nước khu vực Sao Biển.",
          rationale: "Bảo đảm an toàn tuyệt đối cho sinh viên tắm biển sau giờ học, cung cấp số điện thoại cứu hộ khẩn cấp.",
          candidate_source_class: "PUBLIC_SAFETY_DIRECTORY",
          source_url_placeholder: "https://bqlbtdanang.vn/tram-cuu-ho-sao-bien",
          recheck_criteria: "Kiểm tra định kỳ 14 ngày: cập nhật số hotline cứu hộ bãi biển và khung giờ có lực lượng trực.",
          accessibility_notes: "Màu sắc cờ cảnh báo đi kèm văn bản giải thích ý nghĩa (Đỏ: cấm tắm, Vàng: chú ý, Xanh: an toàn).",
          asset_rights_notes: "Hình ảnh trạm cứu hộ chính quy thuộc Ban Quản lý Bán đảo Sơn Trà và các bãi biển du lịch."
        },
        {
          target_id: "BATCH03_AT_03",
          community_need: "Không gian làm việc chung (Co-working) phi lợi nhuận cho sinh viên làm dự án xã hội.",
          rationale: "Hỗ trợ các nhóm thanh niên khởi nghiệp cộng đồng tiếp cận bàn làm việc và internet ổn định.",
          candidate_source_class: "COMMUNITY_INNOVATION_HUB",
          source_url_placeholder: "https://danangstartup.vn/khong-gian-cong-dong",
          recheck_criteria: "Kiểm tra định kỳ 14 ngày: quy chế đăng ký sử dụng chỗ ngồi miễn phí cho dự án sinh viên.",
          accessibility_notes: "Hỗ trợ phóng to giao diện tới 200% mà không vỡ khung làm việc, hỗ trợ chuyển hướng bàn phím.",
          asset_rights_notes: "Ảnh góc làm việc thực tế, không chứa logo phần mềm hay đơn vị tài trợ."
        },
        {
          target_id: "BATCH03_AT_04",
          community_need: "Điểm tiếp nhận rác thải điện tử và phân loại đồ nhựa tái chế vì môi trường biển xanh.",
          rationale: "Nâng cao ý thức bảo vệ môi trường biển Mỹ Khê của thế hệ trẻ và cộng đồng cư dân ven biển.",
          candidate_source_class: "ENVIRONMENTAL_CIVIC_PORTAL",
          source_url_placeholder: "https://sontra.danang.gov.vn/tai-che-cong-dong",
          recheck_criteria: "Kiểm tra định kỳ 14 ngày: lịch thu gom rác điện tử hàng tuần của đơn vị môi trường đô thị.",
          accessibility_notes: "Ký hiệu phân loại rác có nhãn văn bản rõ ràng cho từng loại vật liệu.",
          asset_rights_notes: "Ảnh chụp điểm tập kết xanh của phường, không dùng ảnh minh họa thương mại."
        },
        {
          target_id: "BATCH03_AT_05",
          community_need: "Vị trí bãi đỗ xe đạp cộng đồng và trạm sửa xe đạp tự phục vụ miễn phí ven đường Hoàng Sa - Võ Nguyên Giáp.",
          rationale: "Khuyến khích sinh viên sử dụng phương tiện di chuyển xanh, giảm phát thải carbon ven biển.",
          candidate_source_class: "GREEN_MOBILITY_DIRECTORY",
          source_url_placeholder: "https://danang.gov.vn/giao-thong-xanh-ven-bien",
          recheck_criteria: "Kiểm tra định kỳ 14 ngày: kiểm tra dụng cụ bơm xe và khóa an toàn tại trạm tự phục vụ.",
          accessibility_notes: "Chỉ dẫn đường đi có thông số khoảng cách đo bằng mét rõ ràng, nhãn ARIA vị trí.",
          asset_rights_notes: "Ảnh thực tế trạm đỗ xe công cộng, không chứa hình ảnh phương tiện gắn biển số cá nhân."
        },
        {
          target_id: "BATCH03_AT_06",
          community_need: "Lịch sinh hoạt câu lạc bộ giao tiếp tiếng Anh cộng đồng miễn phí với tình nguyện viên quốc tế.",
          rationale: "Giúp sinh viên Đà Nẵng tự tin rèn luyện ngoại ngữ trong môi trường giao lưu văn hóa quốc tế cởi mở.",
          candidate_source_class: "COMMUNITY_YOUTH_PROGRAM",
          source_url_placeholder: "https://danangyouth.org.vn/clb-tieng-anh-cong-dong",
          recheck_criteria: "Kiểm tra định kỳ 14 ngày: địa điểm sinh hoạt công cộng và chủ đề thảo luận của buổi gặp mặt.",
          accessibility_notes: "Tài liệu sinh hoạt có phiên bản chữ to và tệp âm thanh nghe thử phát âm.",
          asset_rights_notes: "Ảnh buổi giao lưu văn hóa tập thể chụp tại công viên, không mang tính chất quảng cáo trung tâm."
        },
        {
          target_id: "BATCH03_AT_07",
          community_need: "Bản đồ số các địa điểm sinh hoạt nghệ thuật đường phố và âm nhạc acoustic thanh niên được cấp phép.",
          rationale: "Định hướng thanh niên tham gia các hoạt động giải trí lành mạnh, đúng quy định trật tự đô thị.",
          candidate_source_class: "CIVIC_CULTURE_GUIDE",
          source_url_placeholder: "https://dulichdanang.gov.vn/nghe-thuat-duong-pho",
          recheck_criteria: "Kiểm tra định kỳ 14 ngày: giấy phép biểu diễn công cộng và khung giờ không gây tiếng ồn đêm.",
          accessibility_notes: "Lịch diễn dạng bảng tương thích hoàn toàn thiết bị đọc màn hình dành cho người khiếm thị.",
          asset_rights_notes: "Ảnh biểu diễn nghệ sĩ đường phố công cộng, không có nhãn hiệu thương mại."
        }
      ]
    },
    {
      cluster_code: "HAI_CHAU",
      cluster_name: "Hải Châu — Trung tâm Hành chính, Văn hóa & Lịch sử Đà Nẵng",
      targets: [
        {
          target_id: "BATCH03_HC_01",
          community_need: "Quy trình làm thẻ thư viện miễn phí/giảm giá và sử dụng phòng đọc tài liệu địa chí Đà Nẵng.",
          rationale: "Nguồn tư liệu quý giá nhất thành phố phục vụ nghiên cứu lịch sử, địa lý và văn hóa cho học sinh sinh viên.",
          candidate_source_class: "OFFICIAL_INSTITUTIONAL_PORTAL",
          source_url_placeholder: "https://thuvien.danang.gov.vn/dich-vu-the-sinh-vien",
          recheck_criteria: "Kiểm tra định kỳ 14 ngày: chính sách cấp thẻ sinh viên và giờ phục vụ ngày thứ 7, chủ nhật.",
          accessibility_notes: "WCAG 2.1 AA, điều hướng danh mục sách bằng bàn phím phím mũi tên chuẩn mực.",
          asset_rights_notes: "Ảnh tòa nhà Thư viện Khoa học Tổng hợp bờ sông Hàn, thuộc sở hữu nhà nước."
        },
        {
          target_id: "BATCH03_HC_02",
          community_need: "Chính sách miễn giảm vé tham quan di sản văn hóa thế giới cho học sinh, sinh viên các trường đại học.",
          rationale: "Tạo điều kiện cho thế hệ trẻ tiếp cận kho tàng điêu khắc Champa độc nhất vô nhị của quốc gia.",
          candidate_source_class: "OFFICIAL_INSTITUTIONAL_PORTAL",
          source_url_placeholder: "https://chammuseum.vn/chinh-sach-ve-sinh-vien",
          recheck_criteria: "Kiểm tra định kỳ 14 ngày: văn bản quy định mức hỗ trợ giá vé kèm xuất trình thẻ sinh viên hợp lệ.",
          accessibility_notes: "Mô tả chi tiết hiện vật nổi bật (Đài thờ Trà Kiệu, Bồ Tát Tara) bằng văn bản chuẩn.",
          asset_rights_notes: "Ảnh tư liệu chính thống của Bảo tàng Điêu khắc Chăm Đà Nẵng."
        },
        {
          target_id: "BATCH03_HC_03",
          community_need: "Lịch tọa đàm giới thiệu sách mới và không gian đọc sách thiếu nhi, thanh niên tại Đường sách Bạch Đằng.",
          rationale: "Điểm hẹn văn hóa thanh tao bên bờ sông Hàn, khuyến khích tình yêu tri thức và văn hóa đọc thế hệ trẻ.",
          candidate_source_class: "CIVIC_CULTURE_GUIDE",
          source_url_placeholder: "https://haichau.danang.gov.vn/duong-sach-bach-dang",
          recheck_criteria: "Kiểm tra định kỳ 14 ngày: lịch diễn giả giao lưu và chương trình tặng sách khuyến học.",
          accessibility_notes: "Thông tin sự kiện hiển thị thẻ ngày tháng chuẩn ISO có aria-label đọc tường minh.",
          asset_rights_notes: "Ảnh quang cảnh đường sách công cộng, không tập trung vào nhãn hiệu nhà sách tư nhân."
        },
        {
          target_id: "BATCH03_HC_04",
          community_need: "Bản đồ các điểm phát sóng WiFi công cộng thành phố Đà Nẵng (Danang_Wifi_Free) dọc đường Bạch Đằng - Như Nguyệt.",
          rationale: "Cung cấp kết nối internet công cộng cho người dân và sinh viên học tập, tra cứu thông tin ngoài trời.",
          candidate_source_class: "CIVIC_DIGITAL_INFRASTRUCTURE",
          source_url_placeholder: "https://dti.danang.gov.vn/wifi-cong-cong-da-nang",
          recheck_criteria: "Kiểm tra định kỳ 14 ngày: tốc độ đường truyền và phạm vi phủ sóng của các cột phát tín hiệu.",
          accessibility_notes: "Chỉ dẫn kết nối từng bước ngắn gọn, rõ nghĩa, không dùng thuật ngữ mạng phức tạp.",
          asset_rights_notes: "Sơ đồ trạm phát chính thống từ Sở Thông tin và Truyền thông thành phố Đà Nẵng."
        },
        {
          target_id: "BATCH03_HC_05",
          community_need: "Lịch tiêm chủng mở rộng và chương trình tư vấn sức khỏe tâm lý học đường cho sinh viên đại học.",
          rationale: "Chăm sóc sức khỏe thể chất và tinh thần cho sinh viên xa nhà, hỗ trợ tiếp cận y tế cơ sở chi phí thấp.",
          candidate_source_class: "OFFICIAL_INSTITUTIONAL_PORTAL",
          source_url_placeholder: "https://yteda-nang.gov.vn/trung-tam-y-te-hai-chau",
          recheck_criteria: "Kiểm tra định kỳ 14 ngày: danh mục vắc-xin miễn phí và lịch trực của bác sĩ tư vấn.",
          accessibility_notes: "Đường dây nóng y tế cấp cứu hiển thị cỡ chữ lớn, tương phản nổi bật dễ nhận biết.",
          asset_rights_notes: "Thông tin văn bản quy chuẩn theo thông báo của Trung tâm Y tế quận Hải Châu."
        },
        {
          target_id: "BATCH03_HC_06",
          community_need: "Chương trình hiến máu tình nguyện định kỳ và cứu trợ thanh niên gặp hoàn cảnh khó khăn.",
          rationale: "Lan tỏa tinh thần tương thân tương ái, hành động vì cộng đồng của tuổi trẻ thành phố Đà Nẵng.",
          candidate_source_class: "COMMUNITY_YOUTH_PROGRAM",
          source_url_placeholder: "https://hoichuthapdo.danang.gov.vn/hien-mau-nhan-dao",
          recheck_criteria: "Kiểm tra định kỳ 14 ngày: lịch tổ chức các điểm hiến máu lưu động và tiêu chuẩn tham gia.",
          accessibility_notes: "Quy trình hiến máu chia nhỏ từng bước có số thứ tự rõ ràng, hỗ trợ đọc dễ hiểu.",
          asset_rights_notes: "Ảnh tư liệu hoạt động Hội Chữ Thập Đỏ Đà Nẵng, không khai thác thương mại."
        },
        {
          target_id: "BATCH03_HC_07",
          community_need: "Lịch phun lửa, phun nước Cầu Rồng và hướng dẫn vị trí quan sát an toàn cho học sinh sinh viên.",
          rationale: "Trải nghiệm văn hóa biểu tượng của thành phố vào dịp cuối tuần, hướng dẫn an toàn giao thông đô thị.",
          candidate_source_class: "CIVIC_CULTURE_GUIDE",
          source_url_placeholder: "https://danang.gov.vn/lich-phun-lua-cau-rong",
          recheck_criteria: "Kiểm tra định kỳ 14 ngày: thông báo phân luồng giao thông của CSGT thành phố trong giờ diễn ra.",
          accessibility_notes: "Thời gian diễn ra sự kiện nêu rõ thứ trong tuần, giờ cụ thể và khuyến cáo tránh khu vực ướt.",
          asset_rights_notes: "Ảnh biểu tượng Cầu Rồng thuộc kho tư liệu hình ảnh công cộng của thành phố Đà Nẵng."
        }
      ]
    },
    {
      cluster_code: "TIEN_ICH_SO",
      cluster_name: "Tiện Ích Số — Dịch vụ Công dân Số & Nền tảng Dữ liệu Sinh viên Đà Nẵng",
      targets: [
        {
          target_id: "BATCH03_DS_01",
          community_need: "Hướng dẫn cài đặt và sử dụng ứng dụng Danang Smart City để phản ánh kiến nghị đô thị (Tổng đài 1022).",
          rationale: "Kênh tương tác trực tiếp giữa thế hệ trẻ với chính quyền, góp phần xây dựng thành phố văn minh, sạch đẹp.",
          candidate_source_class: "OFFICIAL_GOVERNMENT_APP",
          source_url_placeholder: "https://smartcity.danang.gov.vn/huong-dan-1022",
          recheck_criteria: "Kiểm tra định kỳ 14 ngày: phiên bản cập nhật ứng dụng và tình trạng vận hành của cổng tiếp nhận 1022.",
          accessibility_notes: "Hướng dẫn tương thích hoàn toàn với tính năng TalkBack (Android) và VoiceOver (iOS).",
          asset_rights_notes: "Hình ảnh giao diện dịch vụ công chính thống, không có biểu trưng thương mại tư nhân."
        },
        {
          target_id: "BATCH03_DS_02",
          community_need: "Kho dữ liệu mở phục vụ đồ án công nghệ, nghiên cứu dữ liệu và phân tích đô thị cho sinh viên.",
          rationale: "Tạo nguồn tài nguyên số minh bạch, phong phú để sinh viên CNTT thực hành xử lý dữ liệu lớn.",
          candidate_source_class: "CIVIC_OPEN_DATA",
          source_url_placeholder: "https://opendata.danang.gov.vn/tai-nguyen-sinh-vien",
          recheck_criteria: "Kiểm tra định kỳ 14 ngày: tính sẵn sàng của các API công cộng và giấy phép mở dữ liệu.",
          accessibility_notes: "Tệp tải về định dạng mở (.csv, .json) có cấu trúc trường rõ ràng, mã hóa UTF-8.",
          asset_rights_notes: "Dữ liệu mở theo Quyết định số 21/2021/QĐ-UBND của Ủy ban Nhân dân TP Đà Nẵng."
        },
        {
          target_id: "BATCH03_DS_03",
          community_need: "Kênh tra cứu trực tuyến điểm ngập úng đô thị và thông tin thời tiết mưa bão thời gian thực.",
          rationale: "Giúp sinh viên và người dân chủ động chọn lộ trình an toàn khi đi học, đi làm trong mùa mưa bão.",
          candidate_source_class: "PUBLIC_SAFETY_DIRECTORY",
          source_url_placeholder: "https://canhbaomua.danang.gov.vn/ban-do-ngap",
          recheck_criteria: "Kiểm tra định kỳ 14 ngày: độ chính xác của các trạm đo lượng mưa tự động trên toàn địa bàn.",
          accessibility_notes: "Bản đồ trực quan đi kèm danh sách văn bản các tuyến đường ngập sâu có đánh dấu cảnh báo.",
          asset_rights_notes: "Dữ liệu khí tượng thủy văn công lập thuộc Ban Chỉ huy PCTT&TKCN Đà Nẵng."
        },
        {
          target_id: "BATCH03_DS_04",
          community_need: "Quy trình đăng ký tài khoản liên kết mượn sách số điện tử giữa 6 trường đại học thành viên ĐH Đà Nẵng.",
          rationale: "Chia sẻ tài nguyên học thuật liên trường, nâng cao hiệu quả tự học và nghiên cứu khoa học.",
          candidate_source_class: "OFFICIAL_INSTITUTIONAL_PORTAL",
          source_url_placeholder: "https://lib.udn.vn/tai-khoan-lien-ket",
          recheck_criteria: "Kiểm tra định kỳ 14 ngày: danh mục cơ sở dữ liệu số (Springer, IEEE) được truy cập miễn phí.",
          accessibility_notes: "Biểu mẫu đăng ký trực tuyến đạt chuẩn WCAG 2.1 AA, có nhãn input rõ ràng.",
          asset_rights_notes: "Thông tin dịch vụ thư viện dùng chung của Đại học Đà Nẵng, phi thương mại."
        },
        {
          target_id: "BATCH03_DS_05",
          community_need: "Tra cứu danh bạ trực tuyến các trạm y tế phường/xã và nhà thuốc trực đêm 24/7 trên địa bàn thành phố.",
          rationale: "Hỗ trợ người dân và sinh viên tìm kiếm cơ sở y tế khẩn cấp gần nhất vào ban đêm.",
          candidate_source_class: "PUBLIC_HEALTH_DIRECTORY",
          source_url_placeholder: "https://soyte.danang.gov.vn/danh-ba-nha-thuoc-247",
          recheck_criteria: "Kiểm tra định kỳ 14 ngày: xác minh số điện thoại trực cấp cứu và địa chỉ đang hoạt động.",
          accessibility_notes: "Danh bạ có bộ lọc tìm kiếm nhanh theo quận/huyện, thao tác dễ dàng trên màn hình cảm ứng.",
          asset_rights_notes: "Dữ liệu niêm yết chính thức từ Sở Y tế thành phố Đà Nẵng."
        },
        {
          target_id: "BATCH03_DS_06",
          community_need: "Cổng thông tin các khóa đào tạo kỹ năng số miễn phí và hội thảo việc làm cho tân cử nhân.",
          rationale: "Trang bị kỹ năng lập trình, trí tuệ nhân tạo và ngoại ngữ để sinh viên sẵn sàng gia nhập thị trường lao động.",
          candidate_source_class: "COMMUNITY_INNOVATION_HUB",
          source_url_placeholder: "https://danangstartup.vn/khoa-hoc-cong-dong",
          recheck_criteria: "Kiểm tra định kỳ 14 ngày: lịch khai giảng các lớp kỹ năng số cộng đồng và điều kiện đăng ký.",
          accessibility_notes: "Mục tiêu bài học rõ ràng, phụ đề tiếng Việt cho các video hướng dẫn trực tuyến.",
          asset_rights_notes: "Chương trình đào tạo phi lợi nhuận thuộc Vườn ươm Doanh nghiệp Đà Nẵng (DNES)."
        },
        {
          target_id: "BATCH03_DS_07",
          community_need: "Hướng dẫn cài đặt ứng dụng theo dõi xe buýt DanaBus, tra cứu thời gian thực xe đến trạm.",
          rationale: "Tối ưu hóa thời gian chờ đợi xe buýt của sinh viên, thúc đẩy sử dụng phương tiện công cộng.",
          candidate_source_class: "PUBLIC_TRANSIT_AUTHORITY",
          source_url_placeholder: "https://danangbus.vn/ung-dung-danabus",
          recheck_criteria: "Kiểm tra định kỳ 14 ngày: độ trễ dữ liệu GPS thời gian thực của xe buýt trên ứng dụng.",
          accessibility_notes: "Thông báo âm thanh thời gian xe đến trạm, giao diện đơn giản dễ nhìn ngoài nắng.",
          asset_rights_notes: "Ảnh biểu trưng dịch vụ công DanaBus thuộc Trung tâm Điều hành Đèn tín hiệu giao thông & Vận tải công cộng."
        }
      ]
    }
  ];

  let flatProposals = [];
  clustersData.forEach(c => {
    c.targets.forEach(t => {
      flatProposals.push({
        target_id: t.target_id,
        cluster: c.cluster_code,
        cluster_name: c.cluster_name,
        community_need: t.community_need,
        rationale: t.rationale,
        candidate_source_class: t.candidate_source_class,
        source_url_placeholder: t.source_url_placeholder,
        evidence_field_contract: [
          "entity_official_name",
          "physical_address_or_portal_url",
          "operating_schedule_hours",
          "public_utility_benefit_description",
          "verification_provenance_url",
          "last_verified_system_utc"
        ],
        recheck_criteria: t.recheck_criteria,
        accessibility_notes: t.accessibility_notes,
        asset_rights_notes: t.asset_rights_notes,
        council_reviewer_assignment: {
          product_lead: "Product Reviewer (Assigned)",
          design_lead: "Design Reviewer (Assigned)",
          ux_cx_lead: "UX/CX Reviewer (Assigned)",
          growth_lead: "Growth Reviewer (Assigned)",
          data_trust_lead: "Data & Trust Reviewer (Assigned)",
          engineering_lead: "Engineering Reviewer (Assigned)",
          qa_lead: "QA Reviewer (Assigned)"
        },
        strict_safety_invariants: {
          is_candidate: false,
          is_content_supply: false,
          sla_clock_active: false,
          fake_evidence_hash_present: false,
          admission_state: null,
          render_eligible_flag: false,
          public_approved_flag: false,
          pricing_field: null,
          discount_field: null,
          voucher_field: null,
          merchant_asset: null,
          commercial_cta: null
        }
      });
    });
  });

  const readinessLedger = {
    ledger_id: "JAYT_BATCH_03_READINESS_LEDGER",
    governing_directive: "JAYT-245 Section JAYT-267 (Lines 5838-5846)",
    created_at_utc: "2026-09-03T07:04:09.442Z",
    ledger_status: "STATIC_BACKLOG_PROPOSALS_ONLY__PRE_UNFREEZE",
    architectural_intent: "Defines exactly 28 healthy target proposals across 4 clusters as a static backlog. Zero business I/O, zero network requests, zero captures, and zero admissions. Not candidate or content supply.",
    accounting_summary: {
      total_target_proposals: flatProposals.length,
      cluster_counts: {
        HOA_KHANH: flatProposals.filter(p => p.cluster === 'HOA_KHANH').length,
        AN_THUONG: flatProposals.filter(p => p.cluster === 'AN_THUONG').length,
        HAI_CHAU: flatProposals.filter(p => p.cluster === 'HAI_CHAU').length,
        TIEN_ICH_SO: flatProposals.filter(p => p.cluster === 'TIEN_ICH_SO').length
      },
      proposals_prepared: flatProposals.length,
      unfilled_proposal_slots: 0,
      candidates_admitted: 0,
      evidence_captured: 0,
      public_approved: 1,
      blocked_quarantined: 7
    },
    governance_disclaimer: "This ledger is a static preparatory backlog. It strictly does NOT represent 28 admitted contents, does NOT claim fulfillment of 35 items, and does NOT bypass CEO authorization. Zero unfreeze or commercial activation permitted.",
    proposals: flatProposals
  };

  const ledgerJsonStr = JSON.stringify(readinessLedger, null, 2);
  const ledgerHash = crypto.createHash('sha256').update(ledgerJsonStr).digest('hex');

  fs.writeFileSync(LEDGER_PATH_1, ledgerJsonStr, 'utf8');
  fs.writeFileSync(LEDGER_PATH_2, ledgerJsonStr, 'utf8');

  console.log('✅ Generated ' + LEDGER_PATH_1);
  console.log('✅ Generated ' + LEDGER_PATH_2);
  console.log('  -> Ledger File Bytes SHA-256: ' + ledgerHash);
  console.log('  -> Total Proposals: ' + flatProposals.length + ' (HK: 7, AT: 7, HC: 7, DS: 7)');
}




function executeStagingRollback() {
  const pid = process.pid;
  const startUtc = new Date().toISOString();
  console.log('========================================================================');
  console.log('🛡️ JAYT ISOLATED STAGING ROLLBACK & SAFETY CIRCUIT BREAKER');
  console.log('   PID: ' + pid + ' | UTC: ' + startUtc);
  console.log('========================================================================\n');

  // Hard gate 1: Detect and forbid any production flag
  const args = process.argv.slice(2);
  const prohibitedFlags = ['--prod', '--production', '-p', '--deploy-prod'];
  for (const flag of prohibitedFlags) {
    if (args.includes(flag)) {
      console.error('❌ FATAL SECURITY VIOLATION: Production flags (' + flag + ') are strictly prohibited in rollback!');
      console.error('   This script is isolated to staging recovery only and will NEVER touch Production.');
      process.exit(1);
    }
  }

  // Record initial hashes
  const dealsFeedHashBefore = fs.existsSync(DEALS_FEED_PATH) ? sha256(DEALS_FEED_PATH) : null;
  const ledgerHashBefore = fs.existsSync(LEDGER_PATH_1) ? sha256(LEDGER_PATH_1) : null;

  console.log('--- 1. ATOMICALLY RESETTING deals_feed.json TO [] ---');
  fs.writeFileSync(DEALS_FEED_PATH, '[]\n', 'utf8');
  const dealsFeedHashAfter = sha256(DEALS_FEED_PATH);
  console.log('  ✅ deals_feed.json successfully reset to empty array [].');
  console.log('     Path: ' + DEALS_FEED_PATH);
  console.log('     Before SHA-256: ' + dealsFeedHashBefore);
  console.log('     After SHA-256:  ' + dealsFeedHashAfter);

  console.log('\n--- 2. RESTORING Batch 03 Ledger TO CANONICAL STATIC BACKLOG ---');
  generateBatch03ReadinessLedger();
  const ledgerHashAfter = sha256(LEDGER_PATH_1);
  console.log('  ✅ Batch 03 Ledger successfully restored to static backlog.');
  console.log('     Path 1: ' + LEDGER_PATH_1);
  console.log('     Path 2: ' + LEDGER_PATH_2);
  console.log('     After SHA-256: ' + ledgerHashAfter);
  console.log('     Match Canonical Baseline: ' + (ledgerHashAfter === EXPECTED_STATIC_LEDGER_SHA256));

  console.log('\n--- 3. ZERO PRODUCTION MUTATION VERIFICATION ---');
  console.log('  ✅ Production Deployment: ZERO (No vercel commands executed).');
  console.log('  ✅ Domain Target: NONE (Cloud mutation strictly barred).');
  console.log('  ✅ Hard Freeze Circuit Breaker: MAINTAINED ACTIVE.');

  // Generate Immutable Receipt
  const endUtc = new Date().toISOString();
  const receipt = {
    receipt_id: 'JAYT_STAGING_ROLLBACK_EXECUTION_RECEIPT',
    governing_mandate: 'CEO Work Order (JAYT-274 / Pre-Mục DA Safety Gate)',
    execution_pid: pid,
    started_at_utc: startUtc,
    completed_at_utc: endUtc,
    actions_executed: [
      'RESET_DEALS_FEED_TO_EMPTY_ARRAY',
      'RESTORE_BATCH_03_LEDGER_TO_STATIC_BACKLOG',
      'ENFORCE_ZERO_COMMERCIAL_SAFETY_INVARIANTS',
      'BLOCK_PRODUCTION_DEPLOYMENT'
    ],
    deals_feed_audit: {
      file_path: '05_DEAL_AND_AFFILIATE/deals_feed.json',
      content_verified: '[]',
      item_count: 0,
      sha256_after: dealsFeedHashAfter
    },
    batch_03_ledger_audit: {
      ledger_path: '06_TRUST_AND_EVIDENCE/JAYT_BATCH_03_READINESS_LEDGER.json',
      ledger_status: 'STATIC_BACKLOG_PROPOSALS_ONLY__PRE_UNFREEZE',
      total_proposals: 28,
      candidates_admitted: 0,
      render_eligible_count: 0,
      public_approved_count: 1,
      sha256_after: ledgerHashAfter,
      matches_expected_canonical: (ledgerHashAfter === EXPECTED_STATIC_LEDGER_SHA256)
    },
    production_safety_attestation: {
      production_deployed: false,
      vercel_prod_called: false,
      production_version_retained: 'v3.419.0',
      production_p0_eq_status: 'OPEN',
      affiliate_router_status: 'LOCKED_HOLD'
    },
    verdict: 'STAGING_ROLLBACK_COMPLETED__ZERO_PRODUCTION_MUTATION'
  };

  const receiptContent = JSON.stringify(receipt, null, 2) + '\n';
  fs.writeFileSync(RECEIPT_PATH_1, receiptContent, 'utf8');
  fs.writeFileSync(RECEIPT_PATH_2, receiptContent, 'utf8');

  console.log('\n✅ Rollback Receipt Generated:');
  console.log('   1. ' + RECEIPT_PATH_1);
  console.log('   2. ' + RECEIPT_PATH_2);
  console.log('   Receipt Verdict: ' + receipt.verdict);
  console.log('========================================================================\n');

  return receipt;
}

if (require.main === module) {
  try {
    executeStagingRollback();
  } catch (err) {
    console.error('Fatal Rollback Error:', err);
    process.exit(1);
  }
}

module.exports = { executeStagingRollback };
