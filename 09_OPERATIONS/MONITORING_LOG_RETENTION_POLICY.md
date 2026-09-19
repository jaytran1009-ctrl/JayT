# 🔒 MONITORING & 30-DAY LOG RETENTION POLICY
- **Log Location:** logs/jayt_runtime_access.log
- **Rotation Engine:** TimedRotatingFileHandler(when='midnight', interval=1, backupCount=30)
- **Data Retention Limit:** Đúng 30 ngày (Tự động xóa bản ghi > 30 ngày)
- **Zero PII Rule:** Không lưu trữ IP, Query token bí mật, hoặc thông tin định danh người dùng.
