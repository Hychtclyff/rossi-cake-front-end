// src/features/checkout/konfirmasi/CheckoutConfirmationPage.tsx
"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { Button } from "@/components/ui/button"; // Digunakan di sub-komponen
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  AlertCircle,
  ChevronLeft,
  LoaderCircle,
  ShoppingCart as ShoppingCartIcon,
} from "lucide-react";
import { GuestLayouts } from "@/components/Layouts/GuestLayout"; // Pastikan path benar
import { useRouter } from "@tanstack/react-router";
import ShippingAddressReview from "./ShippingAddressReview";
import OrderedItemsSummary from "./OrderTotalsSummary";
import PaymentDetailsAndAction from "./PaymentDetailsAndAction";

// Impor sub-komponen yang telah dibuat
// Asumsikan path relatif jika file ada di ./components/

// Impor tipe (jika dari file terpisah, misal @/types/shop)
interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  weight?: number;
}
interface CartItem extends Product {
  quantity: number;
  variant?: string;
}
interface ShippingAddress {
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
interface ShippingOption {
  id: string;
  name: string;
  estimatedDelivery: string;
  cost: number;
}
interface PaymentMethod {
  id: string;
  name: string;
  icon?: React.ReactNode;
  description?: string;
}
interface Voucher {
  code: string;
  discountAmount: number;
  description: string;
}

const CheckoutConfirmationPage: React.FC = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [shippingAddress, setShippingAddress] =
    useState<ShippingAddress | null>(null);
  const [selectedShipping, setSelectedShipping] =
    useState<ShippingOption | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod | null>(null);
  const [orderNotes, setOrderNotes] = useState("");
  const [useDamageProtection, setUseDamageProtection] = useState(false);
  const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const DAMAGE_PROTECTION_COST_PER_ITEM_TYPE = 5200; // Contoh biaya

  useEffect(() => {
    // Simulasi pengambilan data dari localStorage atau state global
    const loadedCart = localStorage.getItem("shopCart");
    if (loadedCart) {
      try {
        const parsedCart: CartItem[] = JSON.parse(loadedCart);
        if (Array.isArray(parsedCart) && parsedCart.length > 0) {
          setCartItems(parsedCart);
        } else {
          // Arahkan jika keranjang kosong
          // router.replace('/shop/cart');
          // return;
        }
      } catch (e) {
        console.error("Error parsing cart from localStorage", e);
      }
    } else {
      // router.replace('/shop/cart');
      // return;
    }

    // Simulasi data lain yang dipilih di langkah checkout sebelumnya
    setShippingAddress({
      recipientName: "Budi Santoso",
      phone: "(+62) 812 3456 7890",
      addressLine1:
        "Jl. Kenangan Indah No. 42, Komplek Harmoni Sejahtera Blok C7",
      city: "Kota Jakarta Selatan",
      province: "DKI Jakarta",
      postalCode: "12345",
    });
    setSelectedShipping({
      id: "jne_reg",
      name: "JNE Regular",
      estimatedDelivery: "2-3 Hari Kerja",
      cost: 18000,
    });
    setSelectedPaymentMethod({
      id: "bca_va",
      name: "BCA Virtual Account",
      description: "Bayar melalui Virtual Account BCA Anda.",
    });
    // setAppliedVoucher({ code: "ROSSIHEMAT", discountAmount: 10000, description: "Diskon pelanggan setia." });
    setDataLoaded(true);
  }, [router]);

  const handlePlaceOrder = async () => {
    if (!selectedPaymentMethod || cartItems.length === 0 || !shippingAddress) {
      alert(
        "Pastikan semua informasi sudah benar dan metode pembayaran dipilih."
      );
      return;
    }
    setIsLoading(true);
    const subtotalProduk = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const biayaProteksi = useDamageProtection
      ? DAMAGE_PROTECTION_COST_PER_ITEM_TYPE * cartItems.length
      : 0;
    const ongkosKirim = selectedShipping?.cost || 0;
    const potonganVoucher = appliedVoucher?.discountAmount || 0;
    const totalPembayaran =
      subtotalProduk + biayaProteksi + ongkosKirim - potonganVoucher;

    console.log("FINAL ORDER DETAILS:", {
      cartItems,
      shippingAddress,
      selectedShipping,
      selectedPaymentMethod,
      orderNotes,
      useDamageProtection,
      appliedVoucher,
      totalPembayaran,
    });
    await new Promise((resolve) => setTimeout(resolve, 2000));

    localStorage.removeItem("shopCart");
    setIsLoading(false);
    router.navigate({ to: `/shop/checkout/order-success/ROSSI${Date.now()}` });
  };

  const handleChangeAddress = () => {
    // Arahkan pengguna kembali ke halaman/langkah pemilihan alamat
    // router.push('/shop/checkout/address'); // Contoh
    alert("Fungsi ubah alamat belum diimplementasikan.");
  };

  const handleSelectVoucher = () => {
    // Buka modal atau arahkan ke halaman pemilihan voucher
    alert("Fungsi pilih voucher belum diimplementasikan.");
    // Contoh: setAppliedVoucher({ code: "HEMATLAGI", discountAmount: 15000, description: "Voucher spesial"});
  };

  if (!dataLoaded) {
    return (
      <GuestLayouts>
        <div className="container mx-auto flex justify-center items-center min-h-[calc(100vh-10rem)]">
          <LoaderCircle className="h-12 w-12 animate-spin text-sky-600" />
        </div>
      </GuestLayouts>
    );
  }

  if (cartItems.length === 0 && dataLoaded) {
    return (
      <GuestLayouts>
        <div className="container mx-auto px-4 py-20 text-center">
          <ShoppingCartIcon className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-semibold mb-2">Keranjang Anda Kosong</h1>
          <p className="text-muted-foreground mb-6">
            Silakan kembali ke toko untuk memilih produk.
          </p>
          <Button onClick={() => router.history.back()}>Kembali ke Toko</Button>
        </div>
      </GuestLayouts>
    );
  }

  return (
    <GuestLayouts>
      <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-6 overflow-y-scroll">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.history.back()}
                className="text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft size={16} className="mr-1.5" />
                Kembali
              </Button>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/shop">Toko</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/shop/cart">Keranjang</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Konfirmasi Pembayaran</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 mb-6 md:mb-8">
          Konfirmasi Pesanan & Pembayaran
        </h1>

        {/* Hanya render jika semua data penting sudah ada */}
        {shippingAddress && selectedShipping && selectedPaymentMethod && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12 items-start">
            <div className="lg:col-span-2 space-y-6">
              <ShippingAddressReview
                address={shippingAddress}
                onChangeAddress={handleChangeAddress}
              />
              <OrderedItemsSummary
                cartItems={cartItems}
                useDamageProtection={useDamageProtection}
                onDamageProtectionChange={setUseDamageProtection}
                orderNotes={orderNotes}
                onOrderNotesChange={setOrderNotes}
                damageProtectionCostPerItemType={
                  DAMAGE_PROTECTION_COST_PER_ITEM_TYPE
                }
              />
            </div>

            <div className="lg:col-span-1">
              <PaymentDetailsAndAction
                cartItems={cartItems}
                shippingOption={selectedShipping}
                appliedVoucher={appliedVoucher}
                paymentMethod={selectedPaymentMethod}
                damageProtectionCost={
                  useDamageProtection
                    ? DAMAGE_PROTECTION_COST_PER_ITEM_TYPE * cartItems.length
                    : 0
                }
                onPlaceOrder={handlePlaceOrder}
                isLoading={isLoading}
                onSelectVoucher={handleSelectVoucher}
              />
            </div>
          </div>
        )}
      </div>
    </GuestLayouts>
  );
};

// TanStack Router Route Definition (dalam file route terpisah, misal index.tsx atau checkout-konfirmasi.route.tsx)
// export const Route = createLazyFileRoute("/shop/checkout/konfirmasi")({
//   component: CheckoutConfirmationPage,
// });

export default CheckoutConfirmationPage;
