// src/types/order.ts

// Tipe untuk ringkasan item produk dalam pesanan
export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

// Tipe untuk detail pesanan yang dikonfirmasi
export interface ConfirmedOrder {
  orderId: string;
  orderDate: string; // Misal: "5 Juni 2025, 22:15 WIB"
  totalAmount: number;
  paymentMethod: string;
  shippingAddress: string; // Alamat lengkap dalam satu string untuk display
  estimatedDelivery: string; // Misal: "8 - 10 Juni 2025"
  items: OrderItem[];
}
