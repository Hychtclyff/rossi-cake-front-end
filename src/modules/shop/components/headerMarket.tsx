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
import { Calendar, Minus, Plus, Search, ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CartItem } from "@/common/types/product.types";
import { useNavigate } from "@tanstack/react-router";

interface HeaderMarketProps {
  cartItems: CartItem[];
  onUpdateCartItemQuantity: (productId: string, quantity: number) => void;
  onRemoveCartItem: (productId: string) => void;
  onClearCart: () => void;
}

const HeaderMarket = ({
  cartItems,
  onUpdateCartItemQuantity,
  onRemoveCartItem,
  onClearCart,
}: HeaderMarketProps) => {
  const [openSearch, setOpenSearch] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpenSearch((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCheckout = () => navigate({ to: "/shop/checkout" });

  const totalCartQuantity = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const totalCartPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountAmount = totalCartPrice > 200000 ? 25000 : 0;
  const finalPrice = totalCartPrice - discountAmount;

  return (
    <div className="flex lg:flex-row lg:justify-between flex-col gap-4 p-4 md:p-0">
      <div className="flex justify-between items-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Beranda</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Toko</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-3">
        {/* [FIXED] Search bar sekarang mengambil lebar penuh di mobile */}
        <div className="relative w-full md:max-w-xs lg:max-w-sm">
          <Command className="rounded-lg border shadow-sm h-auto">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <CommandInput
              value={valueSearch}
              onValueChange={setValueSearch}
              onFocus={() => setOpenSearch(true)}
              onBlur={() => setTimeout(() => setOpenSearch(false), 150)}
              placeholder="Cari produk..."
              className="pl-9"
            />
            {/* [FIXED] Daftar pencarian sekarang muncul di atas konten lain */}
            <AnimatePresence>
              {openSearch && valueSearch && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute top-full mt-1 w-full bg-white dark:bg-slate-800 border rounded-md shadow-lg z-50"
                >
                  <CommandList>
                    <CommandEmpty>Tidak ada hasil ditemukan.</CommandEmpty>
                    <CommandGroup heading="Saran">
                      <CommandItem
                        onSelect={() => console.log("Navigasi ke Kalender")}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Kalender Promo</span>
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </motion.div>
              )}
            </AnimatePresence>
          </Command>
        </div>

        {/* [FIXED] Tombol keranjang sekarang di sebelah kanan dan mengambil lebar sisa di mobile */}
        <div className="w-full md:w-auto flex justify-end ">
          <Modal>
            <ModalTrigger>
              <Button variant="outline" className="relative w-full md:w-auto">
                <ShoppingCart size={20} className="mr-2" />
                Keranjang
                {totalCartQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-sky-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalCartQuantity}
                  </span>
                )}
              </Button>
            </ModalTrigger>
            <ModalBody>
              <ModalContent>
                <h4 className="text-lg md:text-2xl text-slate-700 dark:text-slate-200 font-bold text-center mb-6">
                  Keranjang Belanja Anda
                </h4>
                {cartItems.length > 0 ? (
                  <>
                    <ScrollArea className="h-[35vh] pr-3 mb-4 ">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-center py-3 border-b dark:border-slate-700"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="rounded-md h-14 w-14 object-cover"
                            />
                            <div>
                              <h3 className="font-medium text-slate-800 dark:text-slate-200 text-sm">
                                {item.name}
                              </h3>
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                Rp{item.price.toLocaleString("id-ID")}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() =>
                                onUpdateCartItemQuantity(
                                  item.id,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                            >
                              {" "}
                              <Minus size={14} />{" "}
                            </Button>
                            <span className="w-5 text-center text-sm">
                              {item.quantity}
                            </span>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() =>
                                onUpdateCartItemQuantity(
                                  item.id,
                                  item.quantity + 1
                                )
                              }
                            >
                              {" "}
                              <Plus size={14} />{" "}
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-red-500 hover:text-red-600"
                              onClick={() => onRemoveCartItem(item.id)}
                            >
                              {" "}
                              <X size={16} />{" "}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </ScrollArea>
                    <hr className="my-4 dark:border-slate-700" />
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
                  <p className="text-center text-slate-500 dark:text-slate-400 py-10">
                    Keranjang Anda kosong.
                  </p>
                )}
              </ModalContent>
              {cartItems.length > 0 && (
                <ModalFooter className="flex-col sm:flex-row gap-2">
                  <Button
                    variant="outline"
                    onClick={onClearCart}
                    className="w-full sm:w-auto"
                  >
                    Kosongkan Keranjang
                  </Button>
                  <Button
                    className="w-full sm:w-auto bg-sky-600 hover:bg-sky-700"
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
    </div>
  );
};

export default HeaderMarket;
