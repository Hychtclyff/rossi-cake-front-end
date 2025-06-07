// src/features/checkout/konfirmasi/PaymentDetailsAndAction.tsx (VERSI FINAL YANG DIPERBAIKI)

import React, { useState, useCallback, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Tag, ShieldCheck, LoaderCircle, CheckCircle2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PaymentMethod,
  Voucher,
  ShippingOption,
} from "@/common/types/CheckOut.type";
import { IconPackageExport, IconWallet } from "@tabler/icons-react";
// import { useNavigate } from "@tanstack/react-router"; // DIHAPUS: Tidak digunakan di komponen ini
import { CartItem } from "@/common/types/product.types";

interface PaymentDetailsAndActionProps {
  cartItems: CartItem[];
  damageProtectionCost: number;
  shippingOptions: ShippingOption[];
  selectedShipping: ShippingOption;
  onShippingChange: (shippingId: string) => void;
  vouchers: Voucher[];
  selectedVoucher: Voucher | null;
  onVoucherChange: (voucherCode: string) => void;
  paymentMethods: PaymentMethod[];
  selectedPaymentMethod: PaymentMethod;
  onPaymentMethodChange: (paymentId: string) => void;
  onOrderConfirmed: (details: { orderId: string }) => void;
}

type OrderStatus = "idle" | "processing" | "waiting_payment" | "confirmed";

const PaymentDetailsAndAction: React.FC<PaymentDetailsAndActionProps> = ({
  cartItems,
  damageProtectionCost,
  shippingOptions,
  selectedShipping,
  onShippingChange,
  vouchers,
  selectedVoucher,
  onVoucherChange,
  paymentMethods,
  onPaymentMethodChange,
  selectedPaymentMethod,
  onOrderConfirmed,
}) => {
  const [orderStatus, setOrderStatus] = useState<OrderStatus>("idle");
  const [paymentCode, setPaymentCode] = useState<string | null>(null);

  const { subtotalProduk, ongkosKirim, potonganVoucher, totalPembayaran } =
    useMemo(() => {
      const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const shippingCost = selectedShipping.cost;
      const voucherDiscount = selectedVoucher?.discountAmount || 0;
      const total =
        subtotal + damageProtectionCost + shippingCost - voucherDiscount;
      return {
        subtotalProduk: subtotal,
        ongkosKirim: shippingCost,
        potonganVoucher: voucherDiscount,
        totalPembayaran: total,
      };
    }, [cartItems, selectedShipping, selectedVoucher, damageProtectionCost]);

  // Handler ini benar, karena ia melakukan dua hal: memanggil handler parent DAN mereset state internal.
  const handlePaymentChange = useCallback(
    (paymentId: string) => {
      onPaymentMethodChange(paymentId);
      setOrderStatus("idle");
      setPaymentCode(null);
    },
    [onPaymentMethodChange]
  );

  const handlePrimaryAction = () => {
    if (orderStatus === "idle") {
      setOrderStatus("processing");
      setTimeout(() => {
        const newPaymentCode = `${selectedPaymentMethod.id.toUpperCase()}-${Math.floor(
          100000 + Math.random() * 900000
        )}`;
        setPaymentCode(newPaymentCode);
        setOrderStatus("waiting_payment");
      }, 1500);
    }

    if (orderStatus === "waiting_payment") {
      setOrderStatus("processing");
      setTimeout(() => {
        const orderId = `ROSSI${Date.now()}`;
        setOrderStatus("confirmed");
        onOrderConfirmed({ orderId });
      }, 2000);
    }
  };

  // DIIMPLEMENTASIKAN: Logika tombol yang sebelumnya hilang
  const primaryButton = useMemo(() => {
    switch (orderStatus) {
      case "processing":
        return {
          text: "Memproses...",
          icon: <LoaderCircle className="animate-spin mr-2 h-5 w-5" />,
          disabled: true,
        };
      case "waiting_payment":
        return {
          text: "Konfirmasi Pembayaran",
          icon: <ShieldCheck className="mr-2 h-5 w-5" />,
          disabled: false,
        };
      case "confirmed":
        return {
          text: "Pesanan Dikonfirmasi",
          icon: <CheckCircle2 className="mr-2 h-5 w-5" />,
          disabled: true,
        };
      case "idle":
      default:
        return {
          text: "Buat Kode Bayar",
          icon: <ShieldCheck className="mr-2 h-5 w-5" />,
          disabled: false,
        };
    }
  }, [orderStatus]);

  return (
    <div className="space-y-6">
      <Card className="shadow-sm dark:border-neutral-700 sticky top-24">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Ringkasan Belanja</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-neutral-600 dark:text-neutral-400">
              Subtotal Produk (
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)} item)
            </span>
            <span className="text-neutral-800 dark:text-neutral-100">
              Rp{subtotalProduk.toLocaleString("id-ID")}
            </span>
          </div>
          {damageProtectionCost > 0 && (
            <div className="flex justify-between">
              <span className="text-neutral-600 dark:text-neutral-400">
                Proteksi Kerusakan
              </span>
              <span className="text-neutral-800 dark:text-neutral-100">
                Rp{damageProtectionCost.toLocaleString("id-ID")}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-neutral-600 dark:text-neutral-400">
              Ongkos Kirim ({selectedShipping.name})
            </span>
            <span className="text-neutral-800 dark:text-neutral-100">
              Rp{ongkosKirim.toLocaleString("id-ID")}
            </span>
          </div>
          {/* DIPERBAIKI: Pengecekan null-safe untuk selectedVoucher */}
          {selectedVoucher && selectedVoucher.code !== "NONE" && (
            <div className="flex justify-between text-green-600 dark:text-green-400">
              <span>Voucher ({selectedVoucher.code})</span>
              <span>- Rp{potonganVoucher.toLocaleString("id-ID")}</span>
            </div>
          )}
          <Separator className="my-2 dark:bg-neutral-700" />
          <div className="flex justify-between font-bold text-lg text-neutral-900 dark:text-neutral-50 pt-1">
            <span>Total Pembayaran</span>
            <span>Rp{totalPembayaran.toLocaleString("id-ID")}</span>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 pt-4 border-t dark:border-neutral-700">
          <div className="w-full flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <IconWallet className="h-5 w-5 text-neutral-500" />
              <Select
                // DIPERBAIKI: Menggunakan nama handler yang benar
                onValueChange={handlePaymentChange}
                value={selectedPaymentMethod.id}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih Pembayaran" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Metode Pembayaran</SelectLabel>
                    {/* DIPERBAIKI: Melakukan .map() pada props 'paymentMethods' */}
                    {paymentMethods.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between gap-2">
              <Tag className="h-5 w-5 text-orange-500" />
              <Select
                // DIPERBAIKI: Langsung memanggil handler dari props
                onValueChange={onVoucherChange}
                // DIPERBAIKI: Pengecekan null-safe
                value={selectedVoucher?.code || "NONE"}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Gunakan Voucher" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Gunakan Voucher Rossi Cake</SelectLabel>
                    {/* DIPERBAIKI: Melakukan .map() pada props 'vouchers' */}
                    {vouchers.map((v) => (
                      <SelectItem key={v.code} value={v.code}>
                        {v.description}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between gap-2">
              <IconPackageExport className="h-5 w-5 text-neutral-500" />
              <Select
                // DIPERBAIKI: Langsung memanggil handler dari props
                onValueChange={onShippingChange}
                value={selectedShipping.id}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih Pengiriman" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Metode Pengiriman</SelectLabel>
                    {/* DIPERBAIKI: Melakukan .map() pada props 'shippingOptions' */}
                    {shippingOptions.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name} (Rp{s.cost.toLocaleString("id-ID")})
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          {paymentCode && orderStatus !== "idle" && (
            <div className="w-full flex flex-col gap-2 pt-2">
              <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                Selesaikan pembayaran dengan kode berikut:
              </p>
              <Input
                readOnly
                value={paymentCode}
                className="text-center font-mono tracking-widest text-base bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600"
              />
            </div>
          )}
          <Button
            onClick={handlePrimaryAction}
            disabled={primaryButton.disabled}
            className="w-full text-md py-3 mt-2"
            size="lg"
            variant={orderStatus === "confirmed" ? "secondary" : "default"}
          >
            {primaryButton.icon}
            {primaryButton.text}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentDetailsAndAction;
