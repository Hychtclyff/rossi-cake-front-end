// src/app/user/account/components/DisplayVoucher.tsx
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Ticket, CheckCircle } from "lucide-react"; // Menggunakan ikon dari lucide-react
import { Button } from "@/components/ui/button"; // Jika ada tombol aksi

// Tipe untuk Voucher
interface VoucherItem {
  id: string;
  title: string;
  message: string;
  createdAt: string; // Atau Date
  isUsed: boolean;
  code?: string; // Kode voucher jika ada
  expiryDate?: string;
}

const DisplayVoucher = () => {
  const dummyVouchers: VoucherItem[] = [
    {
      id: "voucher-1",
      title: "Diskon 30% Hotel",
      message: "Min. Rp 500.000",
      createdAt: "Berlaku s/d 2025-07-30",
      isUsed: false,
      code: "HOTEL30",
    },
    {
      id: "voucher-2",
      title: "Cashback Rp 50.000",
      message: "Pembayaran dengan e-wallet",
      createdAt: "Berlaku s/d 2025-08-15",
      isUsed: true,
      code: "GOPAYCB50",
    },
    {
      id: "voucher-3",
      title: "Gratis Ongkir Toko Kue",
      message: "Tanpa minimum pembelian",
      createdAt: "Berlaku s/d 2025-06-30",
      isUsed: false,
      code: "FREECAKE",
    },
  ];

  const [vouchers, setVouchers] = useState(dummyVouchers);
  // Logika untuk filter voucher (misal: aktif, sudah dipakai) bisa ditambahkan

  return (
    <>
      <CardHeader>
        <CardTitle>Voucher Saya</CardTitle>
        <CardDescription>
          Gunakan voucher untuk mendapatkan diskon dan penawaran spesial!
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[calc(100vh-20rem)] md:h-[calc(100vh-18rem)] overflow-y-auto pr-1 space-y-3">
        {vouchers.length > 0 ? (
          vouchers.map((voucher) => (
            <Card
              key={voucher.id}
              className={`w-full p-4 rounded-lg transition-all duration-300 ease-in-out relative border dark:border-neutral-700 ${voucher.isUsed ? "opacity-60 bg-muted/30 dark:bg-muted/20" : "bg-background dark:bg-neutral-800 hover:shadow-md"}`}
            >
              <div className="flex items-start justify-between w-full">
                <div className="flex gap-3 items-start">
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${voucher.isUsed ? "bg-neutral-400 dark:bg-neutral-600" : "bg-amber-500"}`}
                  >
                    <Ticket className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span
                      className={`text-base font-semibold ${voucher.isUsed ? "text-neutral-600 dark:text-neutral-400 line-through" : "text-neutral-900 dark:text-neutral-100"}`}
                    >
                      {voucher.title}
                    </span>
                    <span
                      className={`text-xs mt-0.5 ${voucher.isUsed ? "text-neutral-500 dark:text-neutral-500" : "text-neutral-600 dark:text-neutral-300"}`}
                    >
                      {voucher.message}
                    </span>
                    {voucher.code && (
                      <span className="mt-1 text-xs font-mono p-1 bg-muted dark:bg-muted/30 rounded w-fit">
                        Kode:{" "}
                        <span className="font-semibold text-amber-600 dark:text-amber-400">
                          {voucher.code}
                        </span>
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex-shrink-0 text-xs text-neutral-500 dark:text-neutral-400 text-right">
                  <p>{voucher.createdAt}</p>
                  {voucher.isUsed ? (
                    <p className="text-red-500 font-medium">Sudah Dipakai</p>
                  ) : (
                    <p className="text-green-600 font-medium">Tersedia</p>
                  )}
                </div>
              </div>
              {!voucher.isUsed && (
                <div className="mt-3 pt-3 border-t dark:border-neutral-700 flex justify-end">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-amber-500 text-amber-600 hover:bg-amber-50 hover:text-amber-700 dark:border-amber-400 dark:text-amber-400 dark:hover:bg-amber-900/30"
                  >
                    Gunakan Voucher
                  </Button>
                </div>
              )}
            </Card>
          ))
        ) : (
          <p className="text-center text-neutral-500 dark:text-neutral-400 py-10">
            Anda belum memiliki voucher.
          </p>
        )}
      </CardContent>
    </>
  );
};
export default DisplayVoucher;
