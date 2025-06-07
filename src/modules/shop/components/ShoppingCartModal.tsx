// src/components/shop/ShoppingCartModal.tsx (Contoh path)
"use client";

import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal"; // Asumsi path benar
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Dialog,
} from "@/components/ui/dialog"; // Bisa pakai komponen Dialog untuk header
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { IconShoppingCart, IconX } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router"; // Atau dari next/navigation
import { CartItem } from "@/common/types/product.types"; // Asumsi path benar

interface ShoppingCartModalProps {
  cartItems: CartItem[];
  onUpdateCartItemQuantity: (productId: string, newQuantity: number) => void;
  onRemoveCartItem: (productId: string) => void;
  onClearCart: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ShoppingCartModal: React.FC<ShoppingCartModalProps> = ({
  cartItems,
  onUpdateCartItemQuantity,
  onRemoveCartItem,
  onClearCart,
  open,
  onOpenChange,
}) => {
  const navigate = useNavigate(); // Hook untuk navigasi

  const totalCartQuantity = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const subtotalCartPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountAmount = subtotalCartPrice > 200000 ? 25000 : 0;
  const finalTotalPrice = subtotalCartPrice - discountAmount;

  const handleCheckout = () => {
    // Menutup modal sebelum navigasi
    onOpenChange(false);
    // Navigasi ke halaman checkout
    navigate({ to: "/shop/checkout/konfirmasi" }); // Sesuaikan dengan path halaman checkout Anda
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalTrigger asChild>
        <Button variant="outline" className="relative h-10">
          <IconShoppingCart size={18} className="mr-1.5" />
          <span className="hidden sm:inline">Keranjang</span>
          {totalCartQuantity > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-sky-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalCartQuantity}
            </span>
          )}
        </Button>
      </ModalTrigger>
      <ModalBody>
        {" "}
        {/* ModalBody akan otomatis mengatur max-height dan overflow */}
        <ModalContent>
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl md:text-2xl font-bold text-center">
              Keranjang Belanja Anda
            </DialogTitle>
            {cartItems.length === 0 && (
              <DialogDescription className="text-center pt-2">
                Keranjang Anda masih kosong.
              </DialogDescription>
            )}
          </DialogHeader>

          {cartItems.length > 0 ? (
            <>
              <ScrollArea className="h-[40vh] pr-3 mb-4">
                {" "}
                {/* Menggunakan viewport height untuk tinggi dinamis */}
                {cartItems.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={item.id}
                    className="py-3 flex justify-between items-center border-b dark:border-neutral-700 last:border-b-0"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-14 w-14 object-cover rounded-md"
                      />
                      <div>
                        <h3 className="font-medium text-neutral-800 dark:text-neutral-200 text-sm leading-tight">
                          {item.name}
                        </h3>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          Rp{item.price.toLocaleString("id-ID")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7 rounded-full"
                        onClick={() =>
                          onUpdateCartItemQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                      >
                        -
                      </Button>
                      <span className="text-sm font-medium w-6 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7 rounded-full"
                        onClick={() =>
                          onUpdateCartItemQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full"
                        onClick={() => onRemoveCartItem(item.id)}
                      >
                        <IconX size={14} />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </ScrollArea>
              <Separator className="my-2 dark:bg-neutral-700" />
              <div className="space-y-1.5 text-sm text-neutral-700 dark:text-neutral-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rp{subtotalCartPrice.toLocaleString("id-ID")}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Diskon</span>
                    <span>- Rp{discountAmount.toLocaleString("id-ID")}</span>
                  </div>
                )}
                <div className="flex justify-between font-semibold text-base text-neutral-800 dark:text-neutral-100 pt-1">
                  <span>Total</span>
                  <span>Rp{finalTotalPrice.toLocaleString("id-ID")}</span>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-10 text-neutral-500">
              <IconShoppingCart size={40} className="mx-auto mb-2" />
              <p>Mulai belanja dan isi keranjang Anda!</p>
            </div>
          )}
        </ModalContent>
        {cartItems.length > 0 && (
          <ModalFooter className="gap-3 pt-6 sm:flex-row flex-col-reverse">
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => {
                onClearCart();
                onOpenChange(false);
              }}
            >
              Kosongkan Keranjang
            </Button>
            <Button
              className="w-full sm:w-auto flex-grow bg-sky-600 hover:bg-sky-700"
              onClick={handleCheckout}
            >
              Lanjut ke Pembayaran
            </Button>
          </ModalFooter>
        )}
      </ModalBody>
    </Modal>
  );
};

export default ShoppingCartModal;
