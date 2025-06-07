// src/features/checkout/konfirmasi/CheckoutConfirmationPage.tsx (VERSI FINAL)
"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  ChevronLeft,
  LoaderCircle,
  ShoppingCart as ShoppingCartIcon,
} from "lucide-react";
import { GuestLayouts } from "@/components/Layouts/GuestLayout";
import { useRouter, useNavigate } from "@tanstack/react-router"; // Import useNavigate
import ShippingAddressReview from "./ShippingAddressReview";
import OrderedItemsSummary from "./OrderTotalsSummary";
import PaymentDetailsAndAction from "./PaymentDetailsAndAction";
import { CartItem } from "@/common/types/product.types";
import {
  PaymentMethod,
  ShippingAddress,
  ShippingOption,
  Voucher,
} from "@/common/types/CheckOut.type";

// --- SIMULASI DATA MASTER (seharusnya dari API) ---
const dummyPaymentMethods: PaymentMethod[] = [
  { id: "bca_va", name: "BCA Virtual Account" },
  { id: "gopay", name: "GoPay" },
  { id: "cc", name: "Kartu Kredit/Debit" },
];

const dummyVouchers: Voucher[] = [
  { code: "NONE", discountAmount: 0, description: "Tidak ada voucher" },
  {
    code: "ROSSIHEMAT10K",
    discountAmount: 10000,
    description: "Diskon Rp 10.000",
  },
  {
    code: "KIRIMGRATIS",
    discountAmount: 18000,
    description: "Potongan ongkir",
  },
];

const dummyShippingOptions: ShippingOption[] = [
  {
    id: "sicepat_reg",
    name: "SiCepat REG",
    estimatedDelivery: "2-4 Hari",
    cost: 15000,
  },
  {
    id: "jne_reg",
    name: "JNE Regular",
    estimatedDelivery: "2-3 Hari",
    cost: 18000,
  },
  {
    id: "jnt_express",
    name: "J&T Express",
    estimatedDelivery: "1-3 Hari",
    cost: 20000,
  },
];

const CheckoutConfirmationPage: React.FC = () => {
  const router = useRouter();
  const navigate = useNavigate(); // Gunakan useNavigate untuk navigasi

  // --- STATE MANAGEMENT ---
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [shippingAddress, setShippingAddress] =
    useState<ShippingAddress | null>(null);
  const [orderNotes, setOrderNotes] = useState("");
  const [useDamageProtection, setUseDamageProtection] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  // State yang akan dikontrol oleh parent dan di-pass ke child
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption>(
    dummyShippingOptions[1]
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod>(dummyPaymentMethods[0]);
  const [appliedVoucher, setAppliedVoucher] = useState<Voucher>(
    dummyVouchers[0]
  );

  const DAMAGE_PROTECTION_COST_PER_ITEM_TYPE = 5200;

  useEffect(() => {
    // Simulasi pengambilan data dari localStorage
    const loadedCart = localStorage.getItem("shopCart");
    if (loadedCart) {
      try {
        const parsedCart: CartItem[] = JSON.parse(loadedCart);
        if (Array.isArray(parsedCart) && parsedCart.length > 0) {
          setCartItems(parsedCart);
        }
      } catch (e) {
        console.error("Error parsing cart from localStorage", e);
      }
    }

    setShippingAddress({
      recipientName: "Budi Santoso",
      phone: "(+62) 812 3456 7890",
      addressLine1:
        "Jl. Kenangan Indah No. 42, Komplek Harmoni Sejahtera Blok C7",
      city: "Kota Jakarta Selatan",
      province: "DKI Jakarta",
      postalCode: "12345",
    });

    setDataLoaded(true);
  }, []);

  // --- HANDLERS UNTUK DI-PASS KE CHILD ---
  const handleShippingChange = useCallback((shippingId: string) => {
    const newShipping = dummyShippingOptions.find(
      (opt) => opt.id === shippingId
    );
    if (newShipping) setSelectedShipping(newShipping);
  }, []);

  const handleVoucherChange = useCallback((voucherCode: string) => {
    const newVoucher = dummyVouchers.find((v) => v.code === voucherCode);
    if (newVoucher) setAppliedVoucher(newVoucher);
  }, []);

  const handlePaymentMethodChange = useCallback((paymentId: string) => {
    const newPayment = dummyPaymentMethods.find((p) => p.id === paymentId);
    if (newPayment) setSelectedPaymentMethod(newPayment);
  }, []);

  // --- FUNGSI FINAL SETELAH KONFIRMASI DARI CHILD ---
  const handleOrderConfirmed = useCallback(
    async ({ orderId }: { orderId: string }) => {
      console.log("FINAL ORDER CONFIRMED with ID:", orderId);
      console.log("DETAILS:", {
        cartItems,
        shippingAddress,
        selectedShipping,
        selectedPaymentMethod,
        orderNotes,
        useDamageProtection,
        appliedVoucher,
      });

      // Hapus keranjang dan arahkan pengguna
      localStorage.removeItem("shopCart");
      await new Promise((resolve) => setTimeout(resolve, 300)); // Sedikit delay untuk UX
      navigate({ to: `/shop/checkout/order-success/${orderId}` });
    },
    [
      navigate,
      cartItems,
      shippingAddress,
      selectedShipping,
      selectedPaymentMethod,
      orderNotes,
      useDamageProtection,
      appliedVoucher,
    ]
  );

  const handleChangeAddress = () => {
    alert("Fungsi ubah alamat belum diimplementasikan.");
  };

  const damageProtectionCost = useMemo(
    () =>
      useDamageProtection
        ? DAMAGE_PROTECTION_COST_PER_ITEM_TYPE * cartItems.length
        : 0,
    [useDamageProtection, cartItems.length]
  );

  // Tampilan Loading dan Keranjang Kosong (tetap sama)
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
          <Button onClick={() => router.history.go(-1)}>Kembali ke Toko</Button>
        </div>
      </GuestLayouts>
    );
  }

  return (
    <GuestLayouts>
      <div className="container mx-auto px-2 sm:px-4 py-6">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.history.go(-1)}
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
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">
          Konfirmasi Pesanan & Pembayaran
        </h1>
        {shippingAddress && (
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
                damageProtectionCost={damageProtectionCost}
                // Teruskan data dan handler ke child
                shippingOptions={dummyShippingOptions}
                selectedShipping={selectedShipping}
                onShippingChange={handleShippingChange}
                vouchers={dummyVouchers}
                selectedVoucher={appliedVoucher}
                onVoucherChange={handleVoucherChange}
                paymentMethods={dummyPaymentMethods}
                selectedPaymentMethod={selectedPaymentMethod}
                onPaymentMethodChange={handlePaymentMethodChange}
                // Teruskan callback final
                onOrderConfirmed={handleOrderConfirmed}
              />
            </div>
          </div>
        )}
      </div>
    </GuestLayouts>
  );
};

export default CheckoutConfirmationPage;
