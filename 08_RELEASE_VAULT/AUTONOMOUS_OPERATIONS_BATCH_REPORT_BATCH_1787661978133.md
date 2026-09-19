# BÁO CÁO VẬN HÀNH BATCH TỰ ĐỘNG (BATCH_1787661978133)
**Mã Vận Hành**: `BATCH_1787661978133`  
**Thời điểm thực thi**: `2026-08-25T12:46:18.133Z`  
**Trạng thái Pipeline**: `AUTONOMOUS_FRESH_RECAPTURE_SUCCESSFUL`  
**Public Beta Live URL**: [https://deploy-ten-xi-48.vercel.app](https://deploy-ten-xi-48.vercel.app)  

---

## 1. TỔNG HỢP CHỈ SỐ BATCH
- **Tổng số leaf pages quét & phân tích**: **84**
- **Ưu đãi hợp lệ đã đối soát (Active Verified)**: **3**
- **Mục chuyển về Watchlist / Radar (Incomplete/Listing/Menu)**: **36**
- **Mục bị loại trừ (Expired / Duplicate / News / PR / Stopped)**: **45**
- **Trạng thái Deploy Beta**: **ĐÃ DEPLOY BẢN MỚI**
- **Kiểm thử tự động (QA Regression)**: **PASS 100% GREEN**

---

## 2. DANH MỤC ƯU ĐÃI ĐÃ ĐỐI SOÁT TRÊN BETA
### 1. [CGV Cinemas] GIẢM NGAY 30K
- **URL Nguồn**: https://www.cgv.vn/default/newsoffer/uu-dai-online/
- **Thời hạn**: 2026-08-25 đến 2026-08-31
- **Phạm vi**: NATIONWIDE_WITH_CANONICAL_PRESENCE
- **Trạng thái**: ACTIVE_VERIFIED_DEAL (Khớp 4 tiêu chí trong cùng khối)

### 2. [CGV Cinemas] mã: MUA1TANG1
- **URL Nguồn**: https://www.cgv.vn/default/newsoffer/cgv-vnpay-vietin/
- **Thời hạn**: 2026-09-30
- **Phạm vi**: NATIONWIDE_WITH_CANONICAL_PRESENCE
- **Trạng thái**: ACTIVE_VERIFIED_DEAL (Khớp 4 tiêu chí trong cùng khối)

### 3. [Starlight Cinema] mã:
COMBOHE10K
- **URL Nguồn**: https://starlight.vn/uu-dai/%F0%9F%8C%9E-he-ron-rang-deal-10k-san-sang-%F0%9F%8C%9E-1064.html
- **Thời hạn**: 2026-06-16 đến 2026-09-19
- **Phạm vi**: EXPLICIT_DA_NANG
- **Trạng thái**: ACTIVE_VERIFIED_DEAL (Khớp 4 tiêu chí trong cùng khối)


---

## 3. LỊCH CHẠY TIẾP THEO (WINDOWS TASK SCHEDULER)
Lịch vận hành tự động định kỳ 5 mốc mỗi ngày:
- **07:00** — Sáng: Khởi động ngày & quét ưu đãi cà phê / điểm tâm sáng
- **10:45** — Trưa: Quét ưu đãi ăn trưa & F&B giờ cao điểm
- **14:00** — Chiều: Quét ưu đãi cà phê làm việc & di chuyển xe công nghệ
- **17:00** — Tối: Quét ưu đãi rạp phim & giải trí tối
- **20:30** — Đêm: Recheck hạn dùng ưu đãi (TTL) & chuẩn bị dữ liệu ngày hôm sau
