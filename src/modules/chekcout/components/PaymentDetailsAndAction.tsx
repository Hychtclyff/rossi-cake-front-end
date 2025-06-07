import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tag,
  CreditCard as CreditCardIcon,
  Landmark as LandmarkIcon,
  Wallet as WalletIcon,
  ShieldCheck,
  LoaderCircle,
} from "lucide-react"; // Menggunakan alias untuk CreditCard
import { CartItem } from "@/types/product.types";
// import { CartItem, ShippingOption, PaymentMethod, Voucher } from '@/types/shop';

interface PaymentDetailsAndActionProps {
  cartItems: CartItem[];
  shippingOption: ShippingOption;
  appliedVoucher?: Voucher | null;
  paymentMethod: PaymentMethod;
  damageProtectionCost: number;
  onPlaceOrder: () => void;
  isLoading: boolean;
  onSelectVoucher: () => void;
}

const PaymentDetailsAndAction: React.FC<PaymentDetailsAndActionProps> = ({
  cartItems,
  shippingOption,
  appliedVoucher,
  paymentMethod,
  damageProtectionCost,
  onPlaceOrder,
  isLoading,
  onSelectVoucher,
}) => {
  const subtotalProduk = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const ongkosKirim = shippingOption.cost;
  const potonganVoucher = appliedVoucher?.discountAmount || 0;
  const totalPembayaran =
    subtotalProduk + damageProtectionCost + ongkosKirim - potonganVoucher;

  const getPaymentMethodIcon = (pm: PaymentMethod) => {
    // Logika ini bisa diperluas atau dipindah ke komponen PaymentMethodIcon jika lebih kompleks
    if (
      pm.name.toLowerCase().includes("bca") ||
      pm.name.toLowerCase().includes("mandiri") ||
      pm.name.toLowerCase().includes("transfer")
    ) {
      return (
        <LandmarkIcon
          size={18}
          className="text-neutral-600 dark:text-neutral-400"
        />
      );
    }
    if (
      pm.name.toLowerCase().includes("gopay") ||
      pm.name.toLowerCase().includes("ovo")
    ) {
      return (
        <WalletIcon
          size={18}
          className="text-neutral-600 dark:text-neutral-400"
        />
      );
    }
    return (
      <CreditCardIcon
        size={18}
        className="text-neutral-600 dark:text-neutral-400"
      />
    );
  };

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
              Ongkos Kirim ({shippingOption.name})
            </span>
            <span className="text-neutral-800 dark:text-neutral-100">
              Rp{ongkosKirim.toLocaleString("id-ID")}
            </span>
          </div>
          {appliedVoucher && (
            <div className="flex justify-between text-green-600 dark:text-green-400">
              <span>Voucher ({appliedVoucher.code})</span>
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
          <div className="w-full">
            <p className="text-xs font-medium mb-1 text-neutral-700 dark:text-neutral-300">
              Metode Pembayaran Dipilih:
            </p>
            <div className="flex items-center gap-2 p-2.5 border rounded-md dark:border-neutral-600 bg-muted/30 dark:bg-neutral-800/50">
              {getPaymentMethodIcon(paymentMethod)}
              <span className="text-sm font-medium text-neutral-800 dark:text-neutral-100">
                {paymentMethod.name}
              </span>
            </div>
          </div>
          <Button
            onClick={onPlaceOrder}
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
          >
            {isLoading ? (
              <LoaderCircle className="animate-spin mr-2 h-5 w-5" />
            ) : (
              <ShieldCheck className="mr-2 h-5 w-5" />
            )}
            {isLoading ? "Memproses..." : "Konfirmasi & Bayar"}
          </Button>
        </CardFooter>
      </Card>

      <Card className="shadow-sm dark:border-neutral-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-orange-500" />
              <span className="text-sm font-medium text-neutral-800 dark:text-neutral-100">
                {appliedVoucher
                  ? `Voucher Terpasang: ${appliedVoucher.code}`
                  : "Gunakan Voucher Rossi Cake"}
              </span>
            </div>
            <Button
              variant="link"
              size="sm"
              className="text-xs text-sky-600 dark:text-sky-400 p-0 h-auto"
              onClick={onSelectVoucher}
            >
              {appliedVoucher ? "Ganti" : "Pilih Voucher"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentDetailsAndAction;
