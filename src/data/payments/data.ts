// src/features/user-account/payments/data.ts
import {
  PaymentHistoryItem,
  SavedPaymentMethod,
} from "../../common/types/types";

export const dummyPaymentHistory: PaymentHistoryItem[] = [
  {
    paymentId: "PAY001",
    orderId: "ORDER001",
    date: "2025-05-28",
    time: "10:30",
    amount: 275000,
    method: "Credit Card",
    status: "Success",
    description: "Pembelian Kue Ultah & Minuman",
  },
  {
    paymentId: "PAYMENT002",
    orderId: "ORDER002",
    date: "2025-05-27",
    time: "14:15",
    amount: 120000,
    method: "GoPay",
    status: "Success",
    description: "Paket Roti Manis",
  },
  {
    paymentId: "PAYMENT003",
    orderId: "ORDER003",
    date: "2025-05-27",
    time: "09:00",
    amount: 85000,
    method: "Bank Transfer",
    status: "Pending",
    description: "Nastar & Kastengel",
  },
  {
    paymentId: "PAYMENT004",
    orderId: "ORDER001",
    date: "2025-05-29",
    time: "11:00",
    amount: 25000,
    method: "Credit Card",
    status: "Refunded",
    description: "Refund partial Pesanan ORDER001",
  },
  {
    paymentId: "PAYMENT005",
    orderId: "ORDER004",
    date: "2025-05-26",
    time: "16:45",
    amount: 180000,
    method: "OVO",
    status: "Failed",
    description: "Pembelian Kue Basah",
  },
];

export const dummySavedMethods: SavedPaymentMethod[] = [
  {
    id: "card_visa_1234",
    type: "Credit Card",
    providerName: "Visa",
    details: "**** **** **** 1234",
    expiryDate: "12/27",
    isDefault: true,
  },
  {
    id: "ewallet_gopay_0812",
    type: "E-Wallet",
    providerName: "GoPay",
    details: "0812-XXXX-XX90",
  },
  {
    id: "card_master_5678",
    type: "Credit Card",
    providerName: "Mastercard",
    details: "**** **** **** 5678",
    expiryDate: "08/26",
  },
];
