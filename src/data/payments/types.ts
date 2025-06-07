// Asumsikan tipe ini sudah ada atau diimpor
interface Product { id: string; name: string; price: number; imageUrl: string; weight?: number; }
interface CartItem extends Product { quantity: number; variant?: string; }
interface ShippingAddress {
  recipientName: string; phone: string; addressLine1: string; city: string;
  province: string; postalCode: string; isDropshipper?: boolean;
  dropshipperName?: string; dropshipperPhone?: string;
}
interface ShippingOption { id: string; name: string; estimatedDelivery: string; cost: number; }
interface PaymentMethod { id: string; name: string; icon?: React.ReactNode; description?: string; }
interface Voucher { code: string; discountAmount: number; description: string; }