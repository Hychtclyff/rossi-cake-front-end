export interface ShippingAddress {
  recipientName: string;
  phone: string;
  addressLine1: string;
  city: string;
  province: string;
  postalCode: string;
  isDropshipper?: boolean;
  dropshipperName?: string;
  dropshipperPhone?: string;
}
export interface ShippingOption {
  id: string;
  name: string;
  estimatedDelivery: string;
  cost: number;
}
export interface PaymentMethod {
  id: string;
  name: string;
  icon?: React.ReactNode;
  description?: string;
}
export interface Voucher {
  code: string;
  discountAmount: number;
  description: string;
}
