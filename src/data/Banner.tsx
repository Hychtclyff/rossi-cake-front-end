import { GridItemData } from "@/common/types/Banner.type";
import { ProductProops } from "@/common/types/product.types";
import { Products } from "./products";
import { Box, Lock, Sparkles } from "lucide-react";

// Tipe data untuk GridItem

export const categoryData: GridItemData[] = [
  {
    title: "Kue Spesial",
    description: "Kue tart, kue ulang tahun, dan kreasi istimewa lainnya.",
    imageUrl:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1080&q=80",
    className: "md:col-span-6 md:row-span-2",
  },
  {
    title: "Snack & Kue Kering",
    description: "Pilihan camilan lezat dari klasik hingga modern.",
    imageUrl:
      "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80",
    className: "md:col-span-5",
  },
  {
    title: "Minuman Segar",
    description: "Temani kue Anda dengan kopi, teh, dan racikan segar kami.",
    imageUrl:
      "https://images.unsplash.com/photo-1582719478170-2f0d8b3c6f7f?auto=format&fit=crop&w=800&q=80",
    className: "md:col-span-5",
  },
];

export const newArrivals = (limit: number = 4): ProductProops[] => {
  // Buat salinan array agar tidak mengubah data asli
  const sortedProducts = [...Products].sort((a, b) => {
    // Urutkan dari tanggal terbaru ke terlama
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Ambil produk sejumlah 'limit'
  return sortedProducts.slice(0, limit);
};

export const featuresData: GridItemData[] = [
  {
    title: "Produk Rossi Cake",
    description: "Dibuat dari bahan-bahan pilihan berkualitas terbaik.",
    className: "md:[grid-area:1/1/1/7] xl:[grid-area:1/1/6/8]",
    icon: <Box className="h-6 w-6 text-neutral-800 dark:text-neutral-300" />,
  },
  {
    title: "Transaksi Aman",
    description: "Pembayaran terjamin aman dengan berbagai metode.",
    className: "md:[grid-area:2/1/2/7] xl:[grid-area:1/8/3/13]",
    icon: <Lock className="h-6 w-6 text-neutral-800 dark:text-neutral-300" />,
  },
  {
    title: "Penuh Kejutan",
    description: "Dapatkan bonus dan promo menarik setiap minggunya.",
    className: "md:[grid-area:1/7/3/12] xl:[grid-area:3/8/6/13]",
    icon: (
      <Sparkles className="h-6 w-6 text-neutral-800 dark:text-neutral-300" />
    ),
  },
];

export const promotionsData = [
  {
    id: 1,
    productName: "Rossi Cake Special",
    imageUrl: "/img/diskon.jpg",
    imageAlt: "Special discount",
    promoTitle: "Diskon 50% Akhir Pekan",
    description:
      "Nikmati semua varian kue spesial dengan potongan setengah harga.",
  },
  {
    id: 2,
    productName: "Weekend Bakery Delight",
    imageUrl: "/img/promo-bakery.jpg",
    imageAlt: "Weekend bakery promotion",
    promoTitle: "Beli 1 Gratis 1",
    description: "Pilih pastry favoritmu dan dapatkan satu lagi gratis.",
  },
  {
    id: 3,
    productName: "New Coffee Blend",
    imageUrl: "/img/coffee-promo.jpg",
    imageAlt: "New coffee blend promotion",
    promoTitle: "Harga Perkenalan!",
    description: "Coba perpaduan kopi terbaru kami dengan harga spesial.",
  },
];

export const heroImages = [
  { id: "hero-1", src: "/img/promo-lebaran.jpg", alt: "Promo Lebaran" },
  { id: "hero-2", src: "/img/lebaran-cake.jpg", alt: "Kue Lebaran" },
  { id: "hero-3", src: "/img/promo-sidang.jpg", alt: "Promo Kue Sidang" },
];
