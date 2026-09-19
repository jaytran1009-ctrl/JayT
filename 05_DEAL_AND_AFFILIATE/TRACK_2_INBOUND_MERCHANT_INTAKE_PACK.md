# JAYT TRACK 2 INBOUND MERCHANT INTAKE PACK (BỘ TIẾP NHẬN ĐỐI TÁC TRỰC TIẾP)

**Mã văn kiện**: \`JAYT-TRACK2-INTAKE-PACK-071A\`  
**Đơn vị vận hành**: Nền tảng Tìm Kiếm & Định Danh Giá Trị Cộng Đồng JayT (Đà Nẵng)  
**Phạm vi áp dụng**: Luồng tiếp nhận dữ liệu ưu đãi trực tiếp từ thương nhân/đối tác địa phương (Track 2 Inbound Path).

---

## 1. NGUYÊN TẮC BẢO TOÀN SỰ THẬT NGUỒN CỦA JAYT (INBOUND TRUTH PRINCIPLES)

JayT hoạt động dựa trên nguyên tắc **Fail-Closed & 100% Source-Bound Lineage**. Chúng tôi không sử dụng dữ liệu suy diễn, không tổng hợp ước lượng và không hiển thị thông tin ưu đãi nếu chưa có văn bản/chứng từ xác thực từ chính đối tác thương nhân.

- **0 Affiliate / 0 Quảng cáo ẩn**: Ưu đãi hiển thị đến cộng đồng là ưu đãi trực tiếp (\`DIRECT_DEAL\`), không chèn liên kết trung gian thương mại.
- **Minh bạch trọn vẹn**: Giá gốc, giá ưu đãi, phụ thu (nếu có), và điều kiện áp dụng phải được nêu rõ ràng trước khi người dân đến sử dụng.

---

## 2. CHECKLIST 5 MẢNH CHỨNG CỨ BẮT BUỘC (MANDATORY 5-PIECE BUNDLE)

Mỗi hồ sơ ưu đãi gửi về JayT bắt buộc phải thỏa mãn trọn vẹn 5 thành phần sau để vượt qua cổng kiểm duyệt tự động (`merchant_intake_validator`):

| # | Mảnh Chứng Cứ | Tiêu Chuẩn Thẩm Định Kỹ Thuật | Yêu Cầu Bắt Buộc |
|---|---|---|---|
| 1 | **Mức Giá Cụ Thể (`pricing`)** | Cả `base_price` (giá gốc) và `promotional_price` (giá ưu đãi) phải là số nguyên dương $> 0$. Giá ưu đãi $\le$ Giá gốc. | Không chấp nhận giá tượng trưng `0đ` hoặc để trống. |
| 2 | **Điều Kiện Áp Dụng (`transparent_conditions`)** | Danh sách điều kiện áp dụng cụ thể (ví dụ: áp dụng ăn tại chỗ/mang về, khung giờ, ngày trong tuần, điều kiện thẻ thành viên, phụ thu lễ tết nếu có). | Phải nằm cùng khối ngữ cảnh với mức giá, không mâu thuẫn. |
| 3 | **Thời Hạn Hiệu Lực Tường Minh (`validity`)** | `valid_from` và `valid_to` định dạng ISO-8601 (`YYYY-MM-DD`). Phải có ngày kết thúc hiệu lực cụ thể hoặc quy định chu kỳ rõ ràng. | Không chấp nhận thời hạn vô định hoặc năm rời rạc không mốc kết thúc. |
| 4 | **Bằng Chứng Địa Bàn Đà Nẵng (`danang_branches`)** | Danh sách chi nhánh cụ thể tại Đà Nẵng bao gồm: tên chi nhánh, địa chỉ số nhà/tên đường (`street_address`), và quận/huyện (`district`). | Phải có ít nhất 1 chi nhánh đang hoạt động thực tế tại Đà Nẵng. |
| 5 | **Chứng Từ / Văn Bản Xác Nhận Kèm SHA-256 (`written_proof`)** | Văn bản xác nhận có ký tên/đóng dấu của người đại diện hoặc thông cáo báo chí/văn bản PDF/ảnh chụp menu niêm yết chính thức kèm mã băm SHA-256. | Mã băm SHA-256 của tệp đính kèm phải khớp 100% với tệp vật lý. |

---

## 3. QUY TRÌNH KÝ & XÁC NHẬN TỪ ĐỐI TÁC (MERCHANT AUTHORIZATION)

1. **Thông tin Người Đại Diện (`contact_person`)**:
   - Họ và tên người đại diện pháp lý hoặc quản lý cơ sở.
   - Chức danh / vai trò tại cơ sở.
   - Email hoặc số điện thoại liên hệ chính thức dùng cho đối soát.
2. **Hình thức Chứng từ Hợp Lệ**:
   - Công văn/Thư xác nhận chương trình ưu đãi gửi Ban Quản Trị JayT; HOẶC
   - Quyết định/Thông báo nội bộ ban hành chương trình có chữ ký/con dấu; HOẶC
   - Ảnh chụp menu/bảng giá niêm yết tại quầy chi nhánh Đà Nẵng cùng xác nhận văn bản từ email domain của thương hiệu.

---

## 4. HƯỚNG DẪN TẠO MÃ BĂM SHA-256 ARTIFACT ĐỐI SOÁT

Để đảm bảo tính bất biến và chống giả mạo, mỗi tệp chứng từ gửi kèm (PDF, PNG, JPG, DOCX) phải được đối soát mã băm SHA-256:

### Cách 1: Sử dụng PowerShell (Windows)
```powershell
Get-FileHash -Algorithm SHA256 "duong_dan_tep_chung_tu.pdf"
```

### Cách 2: Sử dụng Command Line Node.js / Linux
```bash
# Node.js
node -e "console.log(require('crypto').createHash('sha256').update(require('fs').readFileSync('duong_dan_tep_chung_tu.pdf')).digest('hex'))"

# Linux / MacOS
sha256sum duong_dan_tep_chung_tu.pdf
```

---

## 5. CHU KỲ KIỂM SOÁT & SLA RECHECK ĐỊNH KỲ

- **Chương trình theo tuần / tháng**: Đội ngũ kỹ thuật thực hiện recheck tự động và đối soát trạng thái định kỳ mỗi **7 ngày**.
- **Chương trình cố định năm**: Thực hiện recheck định kỳ mỗi **30 ngày** hoặc khi có thông báo thay đổi giá từ đối tác.
- **Trường hợp tạm dừng / thay đổi**: Đối tác thông báo trước tối thiểu **24 giờ** để hệ thống cập nhật hoặc gỡ bỏ khỏi feed an toàn.

---

## 6. BIỂU MẪU TIẾP NHẬN CHUẨN (BLANK INTAKE PAYLOAD)

Được lưu trữ tại: [`05_DEAL_AND_AFFILIATE/merchant_intake/blank_merchant_intake_template.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/05_DEAL_AND_AFFILIATE/merchant_intake/blank_merchant_intake_template.json)

```json
{
  "$schema": "https://jayt.vn/schemas/merchant-intake-form.v1.json",
  "intake_id": "INTAKE_DNG_<BRAND_CODE>_<YYYYMMDD>",
  "merchant_name": "",
  "brand_id": "",
  "danang_branches": [
    {
      "branch_name": "",
      "street_address": "",
      "district": ""
    }
  ],
  "contact_person": {
    "full_name": "",
    "role": "",
    "email_or_phone": ""
  },
  "written_proof": {
    "proof_type": "OFFICIAL_LETTER_OR_ANNOUNCEMENT",
    "document_title": "",
    "document_sha256": "",
    "signed_date": "YYYY-MM-DD"
  },
  "deal_name": "",
  "base_price": null,
  "promotional_price": null,
  "applicable_surcharges": [],
  "transparent_conditions": [],
  "valid_from": "YYYY-MM-DD",
  "valid_to": "YYYY-MM-DD",
  "channel_type": "DIRECT_DEAL",
  "no_affiliate": true,
  "intake_status": "PENDING_INTERNAL_REVIEW"
}
```

---

## 7. RANH GIỚI THẨM QUYỀN QUẢN TRỊ (GOVERNANCE BOUNDARY)

> [!IMPORTANT]
> **PHÂN ĐỊNH THẨM QUYỀN VẬN HÀNH**:
> 1. **Antigravity (AI Kỹ Thuật Nội Bộ)**: Chỉ có quyền tiếp nhận hồ sơ, chạy `merchant_intake_validator.js` để thẩm định 5 mảnh chứng cứ, xác thực mã băm SHA-256 và chuyển trạng thái kỹ thuật (`READY_FOR_CANDIDATE_GATE` hoặc `REJECTED_INCOMPLETE`). Antigravity **tuyệt đối KHÔNG có quyền tự ý chủ động liên hệ/gửi văn bản cho merchant bên ngoài**.
> 2. **CEO & Đội Ngũ Đối Ngoại (Human Operator)**: Là bên duy nhất có thẩm quyền tiếp xúc, đàm phán, chuyển giao Intake Pack và ký duyệt tiếp nhận hồ sơ thực tế từ thương nhân tại Đà Nẵng.
