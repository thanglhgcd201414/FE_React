enum EOrderStatus {
  PROCESSING = 'PROCESSING',
  SHIPPING = 'SHIPPING',
  DELIVERED = 'DELIVERED',
  // Đã loại bỏ trạng thái CANCELLED vì không hỗ trợ hủy đơn hàng PayPal
}

enum EPaymentStatus {
  PAID = 'PAID',
  UNPAID = 'UNPAID',
}

enum EPaymentMethod {
  PAYPAL = 'PAYPAL',
}

export { EOrderStatus, EPaymentStatus, EPaymentMethod };
