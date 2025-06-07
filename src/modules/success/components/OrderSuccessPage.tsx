// src/app/order-success/OrderSuccessPage.tsx

"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "@tanstack/react-router"; // Hook untuk mengambil query param
import { GuestLayouts } from "@/components/Layouts/GuestLayout";
import { LoaderCircle } from "lucide-react";
import { SuccessHeader } from "./SuccessHeader";
import { OrderSummaryCard } from "./OrderSummaryCard";
import { NextStepsActions } from "./NextStepsActions";

// Impor komponen-komponen yang telah dibuat

// Impor tipe (atau definisikan di sini jika belum)
// import { ConfirmedOrder } from '@/types/order';

// --- Placeholder untuk tipe ---
interface ConfirmedOrder {
  orderId: string;
  orderDate: string;
  totalAmount: number;
  paymentMethod: string;
  shippingAddress: string;
  estimatedDelivery: string;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    imageUrl: string;
  }[];
}
// ---

// Simulasi fungsi untuk mengambil detail pesanan dari backend
const fetchOrderDetails = async (orderId: string): Promise<ConfirmedOrder> => {
  console.log(`Mengambil detail untuk pesanan: ${orderId}...`);
  // Dalam aplikasi nyata, ini akan menjadi panggilan API:
  // const response = await fetch(`/api/orders/${orderId}`);
  // const data = await response.json();
  // return data.data;

  // Simulasi delay API
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Mengembalikan data dummy
  return {
    orderId: orderId,
    orderDate: "6 Juni 2025, 22:15 WIB",
    totalAmount: 733000,
    paymentMethod: "BCA Virtual Account",
    shippingAddress:
      "Budi Santoso, Jl. Kenangan Indah No. 42, Jakarta Selatan, DKI Jakarta, 12345",
    estimatedDelivery: "8 - 10 Juni 2025",
    items: [
      {
        id: "cake001",
        name: "Rossi's Signature Chocolate Fudge Cake",
        quantity: 1,
        price: 280000,
        imageUrl: "",
      },
      {
        id: "cake002",
        name: "Red Velvet Cream Cheese Cupcakes (Box isi 6)",
        quantity: 2,
        price: 150000,
        imageUrl: "",
      },
    ],
  };
};

const OrderSuccessPage: React.FC = () => {
  // Ambil orderId dari URL, contoh: /order-success?orderId=ROSSI12345XYZ

  const { orderId } = useParams({
    from: "/shop/checkout/order-success/$orderId",
  });
  const [order, setOrder] = useState<ConfirmedOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId || typeof orderId !== "string") {
      setError("Nomor pesanan tidak valid atau tidak ditemukan.");
      setIsLoading(false);
      return;
    }

    const loadOrder = async () => {
      try {
        const orderData = await fetchOrderDetails(orderId);
        setOrder(orderData);
      } catch (err) {
        setError("Gagal memuat detail pesanan. Silakan coba lagi nanti.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrder();
  }, [orderId]);

  return (
    <GuestLayouts>
      <div className="container mx-auto px-4 py-12 md:py-20 flex flex-col items-center">
        {isLoading && (
          <div className="flex flex-col items-center text-center">
            <LoaderCircle className="h-16 w-16 text-sky-600 animate-spin mb-4" />
            <h2 className="text-xl font-semibold">
              Memuat Detail Pesanan Anda...
            </h2>
          </div>
        )}

        {error && (
          <div className="text-center text-red-600">
            <h2 className="text-xl font-semibold">Terjadi Kesalahan</h2>
            <p>{error}</p>
          </div>
        )}

        {!isLoading && !error && order && (
          <div className="w-full flex flex-col items-center gap-8">
            <SuccessHeader
              title="Pembayaran Berhasil!"
              message={`Terima kasih atas pesanan Anda. Kami telah menerima pembayaran Anda dan pesanan sedang kami proses.`}
            />
            <OrderSummaryCard order={order} />
            <NextStepsActions orderId={order.orderId} />
          </div>
        )}
      </div>
    </GuestLayouts>
  );
};

export default OrderSuccessPage;
