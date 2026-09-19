# SHOPEE AFFILIATE OPEN API TECHNICAL SPECIFICATION (VIETNAM REGION)

**Mã tài liệu**: `SHOPEE-AFFILIATE-OPEN-API-VN-SPEC-V1`  
**Nhà cung cấp**: Shopee Vietnam Open Platform (`affiliate.shopee.vn`)  
**Giao thức**: GraphQL over HTTPS (POST)  
**Endpoint chính thức**: `https://open-api.affiliate.shopee.vn/graphql`

---

## 1. CẤU TRÚC XÁC THỰC & CHỮ KÝ (AUTHENTICATION & SIGNATURE)

### Header Bắt Buộc:
```http
POST /graphql HTTP/1.1
Host: open-api.affiliate.shopee.vn
Content-Type: application/json
Authorization: SHA256 Credential={app_id}, Signature={signature}, Timestamp={timestamp}
```

### Thuật toán Ký (HMAC-SHA256 Base String):
1. **Timestamp**: Unix timestamp tính bằng giây (`Math.floor(Date.now() / 1000)`). Thời hạn hợp lệ thông thường: $\pm 300$ giây (5 phút).
2. **Chuỗi Cơ Sở (Base String)**:
   ```text
   base_string = app_id + timestamp + payload + secret_key
   ```
   *Trong đó `payload` là chuỗi JSON body chính xác gửi đi (`JSON.stringify(body)`).*
3. **Chữ ký (Signature)**:
   ```text
   signature = HMAC_SHA256(key=secret_key, data=base_string).toHex()
   ```

---

## 2. CÁC SCHEMA TRUY VẤN GRAPHQL CHÍNH

### A. Mutation: `generateShortLink` (Tạo Liên Kết Theo Dõi Rút Gọn)
```graphql
mutation GenerateLink($originUrl: String!, $subIds: [String]) {
  generateShortLink(input: {
    originUrl: $originUrl,
    subIds: $subIds
  }) {
    shortLink
  }
}
```

### B. Query: `productOfferV2` (Danh Sách Ưu Đãi Sản Phẩm & Chiết Khấu)
```graphql
query GetProductOffers($page: Int, $limit: Int, $keyword: String, $sortType: Int) {
  productOfferV2(page: $page, limit: $limit, keyword: $keyword, sortType: $sortType) {
    nodes {
      itemId
      productName
      price
      discountRate
      commissionRate
      productLink
      offerLink
      shopId
      shopName
    }
  }
}
```

### C. Query: `shopOfferV2` (Danh Sách Cửa Hàng / Thương Hiệu Ưu Đãi)
```graphql
query GetShopOffers($page: Int, $limit: Int) {
  shopOfferV2(page: $page, limit: $limit) {
    nodes {
      shopId
      shopName
      commissionRate
      shopLink
      offerLink
    }
  }
}
```

---

## 3. DETERMINISTIC TEST VECTOR (CHUẨN KIỂM THỬ KHÔNG MẠNG)

- **Test App ID**: `17372870594`
- **Test Secret Key**: `mock_secret_key_for_deterministic_test_072b`
- **Test Timestamp**: `1787558400`
- **Test Payload**: `{"query":"{ shopOfferV2(page: 0, limit: 1) { nodes { shopId } } }"}`
- **Test Base String**: `173728705941787558400{"query":"{ shopOfferV2(page: 0, limit: 1) { nodes { shopId } } }"}mock_secret_key_for_deterministic_test_072b`
- **Expected HMAC-SHA256 Signature**: `28938ce105d15cb61858a74134fb33767cb402b8d009b615967b57b989f8d167`
