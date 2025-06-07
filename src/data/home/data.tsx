// src/features/home/data.ts
import { Box, Lock, Sparkles } from "lucide-react";

// Tipe data untuk GridItem
export interface GridItemData {
  title: string;
  description: string;
  className: string; // Konsisten menggunakan className untuk layout grid
  imageUrl?: string; // Opsional
  icon?: React.ReactNode; // Opsional
}

// Tipe data untuk ProductCard
export interface ProductData {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export const heroImages = [
  { id: "hero-1", src: "/img/promo-lebaran.jpg", alt: "Promo Lebaran" },
  { id: "hero-2", src: "/img/lebaran-cake.jpg", alt: "Kue Lebaran" },
  { id: "hero-3", src: "/img/promo-sidang.jpg", alt: "Promo Kue Sidang" },
];

export const categoryData: GridItemData[] = [
  {
    title: "Kue Spesial",
    description: "Kue tart, kue ulang tahun, dan kreasi istimewa lainnya.",
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1080&q=80",
    className: "md:col-span-6 md:row-span-2",
  },
  {
    title: "Snack & Kue Kering",
    description: "Pilihan camilan lezat dari klasik hingga modern.",
    imageUrl: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80",
    className: "md:col-span-5",
  },
  {
    title: "Minuman Segar",
    description: "Temani kue Anda dengan kopi, teh, dan racikan segar kami.",
    imageUrl: "https://images.unsplash.com/photo-1582719478170-2f0d8b3c6f7f?auto=format&fit=crop&w=800&q=80",
    className: "md:col-span-5",
  },
];

export const newArrivalsData: ProductData[] = [
    { id: 1, name: "Seven Element Coffee", description: "Perpaduan 7 elemen kopi premium dari seluruh nusantara.", price: 95000, imageUrl: "/img/sevel.png" },
    { id: 2, name: "Red Velvet Cake", description: "Kue red velvet klasik dengan cream cheese frosting yang lembut.", price: 150000, imageUrl: "/img/red-velvet.png" },
    { id: 3, name: "Matcha Croissant", description: "Croissant renyah dengan isian krim matcha asli dari Jepang.", price: 45000, imageUrl: "/img/matcha-croissant.png" },
    { id: 4, name: "Brown Sugar Boba", description: "Minuman boba kekinian dengan manisnya brown sugar asli.", price: 25000, imageUrl: "/img/boba.png" },
    { id: 5, name: "Tiramisu Delight", description: "Dessert box tiramisu dengan cita rasa kopi yang otentik.", price: 75000, imageUrl: "/img/tiramisu.png" },
];

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
    icon: <Sparkles className="h-6 w-6 text-neutral-800 dark:text-neutral-300" />,
  },
];

export const promotionsData = [
  { id: 1, productName: "Rossi Cake Special", imageUrl: "/img/diskon.jpg", imageAlt: "Special discount", promoTitle: "Diskon 50% Akhir Pekan", description: "Nikmati semua varian kue spesial dengan potongan setengah harga." },
  { id: 2, productName: "Weekend Bakery Delight", imageUrl: "/img/promo-bakery.jpg", imageAlt: "Weekend bakery promotion", promoTitle: "Beli 1 Gratis 1", description: "Pilih pastry favoritmu dan dapatkan satu lagi gratis." },
  { id: 3, productName: "New Coffee Blend", imageUrl: "/img/coffee-promo.jpg", imageAlt: "New coffee blend promotion", promoTitle: "Harga Perkenalan!", description: "Coba perpaduan kopi terbaru kami dengan harga spesial." },
];