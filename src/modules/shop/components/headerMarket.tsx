import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IconSearch, IconShoppingCart, IconX } from "@tabler/icons-react"; // Tambahkan IconShoppingCart
import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { CartItem, Product } from "@/types/product.types";
import { useNavigate } from "@tanstack/react-router";

interface HeaderMarketProps {
  cartItems: CartItem[];
  onUpdateCartItemQuantity: (productId: string, quantity: number) => void;
  onRemoveCartItem: (productId: string) => void;
  onClearCart: () => void; // Untuk mengosongkan keranjang
}

const HeaderMarket = ({
  cartItems,
  onUpdateCartItemQuantity,
  onRemoveCartItem,
  onClearCart,
}: HeaderMarketProps) => {
  const [openSearch, setOpenSearch] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const navigate = useNavigate  ();
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpenSearch((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSearchChange = (val: string) => {
    setValueSearch(val);
    // Logika untuk menampilkan hasil pencarian bisa lebih kompleks,
    // untuk sekarang, CommandList akan tetap statis atau bisa diisi dari 'val' jika ada data.
    setOpenSearch(val.trim().length > 0);
  };

  const handleCheckout = () => {
    // Navigasi ke halaman checkout
    navigate({ to: "/shop/checkout" }); // Sesuaikan dengan path halaman checkout Anda
  };

  const totalCartQuantity = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const totalCartPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  // Asumsi diskon sederhana, bisa lebih kompleks
  const discountAmount = totalCartPrice > 200000 ? 25000 : 0; // Contoh: diskon 25rb jika total > 200rb
  const finalPrice = totalCartPrice - discountAmount;

  return (
    <>
      <div className="header flex flex-col md:flex-row flex-wrap items-center justify-between gap-5 mb-6">
        <div className="path">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Beranda</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>Toko</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* Search Command */}
          <div className="flex-grow md:flex-grow-0 relative md:w-1/2 min-w-[200px] md:min-w-[350px] max-w-lg">
            <Command className="rounded-lg border shadow-md h-auto">
              <IconSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
              <CommandInput
                value={valueSearch}
                onValueChange={handleSearchChange}
                placeholder="Cari produk atau perintah..."
                className="pl-9"
              />
              <CommandList
                className={`${openSearch ? "block" : "hidden"} absolute top-full mt-1 w-full bg-white dark:bg-neutral-800 border rounded-md shadow-lg z-50`}
              >
                <CommandEmpty>Tidak ada hasil ditemukan.</CommandEmpty>
                {/* Command items bisa diisi dinamis berdasarkan hasil pencarian atau tetap statis */}
                <CommandGroup heading="Saran">
                  <CommandItem
                    onSelect={() => console.log("Navigasi ke Kalender")}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Kalender Promo</span>
                  </CommandItem>
                  {/* ... item lainnya ... */}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>

          {/* Cart Modal Trigger */}
          <Modal open={isCartModalOpen} onOpenChange={setIsCartModalOpen}>
            <ModalTrigger asChild>
              <Button variant="outline" className="relative">
                <IconShoppingCart size={20} className="mr-2" />
                Keranjang
                {totalCartQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-sky-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalCartQuantity}
                  </span>
                )}
              </Button>
            </ModalTrigger>
            <ModalBody className="overflow-y-auto">
              {" "}
              {/* Ganti ModalBody agar bisa di-scroll jika konten panjang */}
              <ModalContent>
                <h4 className="text-lg md:text-2xl text-neutral-700 dark:text-neutral-200 font-bold text-center mb-6">
                  Keranjang Belanja Anda
                </h4>
                {cartItems.length > 0 ? (
                  <>
                    <ScrollArea className="h-[20rem] md:h-[25rem] pr-3 mb-4">
                      {" "}
                      {/* ScrollArea untuk daftar item */}
                      {cartItems.map((item) => (
                        <motion.div // Menggunakan framer-motion
                          layout // Untuk animasi saat item ditambah/dihapus
                          key={item.id}
                          className="p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl mb-3 border-b dark:border-neutral-700 last:border-b-0"
                        >
                          <div className="flex items-center gap-3 mb-2 sm:mb-0">
                            <div className="relative h-14 w-14">
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="rounded-md"
                              />
                            </div>
                            <div>
                              <h3 className="font-medium text-neutral-800 dark:text-neutral-200 text-sm">
                                {item.name}
                              </h3>
                              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                Rp{item.price.toLocaleString("id-ID")}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-7 w-7"
                              onClick={() =>
                                onUpdateCartItemQuantity(
                                  item.id,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                            >
                              -
                            </Button>
                            <Input
                              value={item.quantity}
                              readOnly
                              className="text-center w-10 h-7 p-0"
                            />
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-7 w-7"
                              onClick={() =>
                                onUpdateCartItemQuantity(
                                  item.id,
                                  item.quantity + 1
                                )
                              }
                            >
                              +
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-7 w-7 text-red-500 hover:text-red-600"
                              onClick={() => onRemoveCartItem(item.id)}
                            >
                              <IconX size={16} />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </ScrollArea>
                    <hr className="my-4 dark:border-neutral-700" />
                    {/* Ringkasan Keranjang */}
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal ({totalCartQuantity} item)</span>
                        <span>Rp{totalCartPrice.toLocaleString("id-ID")}</span>
                      </div>
                      {discountAmount > 0 && (
                        <div className="flex justify-between text-green-600 dark:text-green-400">
                          <span>Diskon</span>
                          <span>
                            - Rp{discountAmount.toLocaleString("id-ID")}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between font-semibold text-base">
                        <span>Total</span>
                        <span>Rp{finalPrice.toLocaleString("id-ID")}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-center text-neutral-500 dark:text-neutral-400 py-10">
                    Keranjang Anda kosong.
                  </p>
                )}
              </ModalContent>
              {cartItems.length > 0 && (
                <ModalFooter className="gap-3 pt-6">
                  <Button variant="outline" onClick={onClearCart}>
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
        </div>
      </div>
    </>
  );
};

export default HeaderMarket;
