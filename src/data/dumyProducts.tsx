import { Product } from "@/types/product.types";

// Data dummy produk Anda
const dummyProducts: Product[] = [
  {
    id: "prod1",
    name: "Kue Nastar Premium",
    price: 75000,
    imageUrl: "/images/kue/nastar.jpg", // Ganti dengan path gambar Anda di folder public
    category: "Kue Kering",
    description: "Nastar lembut dengan isian nanas pilihan dan mentega wisman.",
  },
  {
    id: "prod2",
    name: "Red Velvet Cake Slice",
    price: 35000,
    imageUrl: "/images/kue/red-velvet.jpg",
    category: "Kue Potong",
    description:
      "Potongan kue red velvet dengan cream cheese frosting yang mewah.",
  },
  {
    id: "prod3",
    name: "Roti Sobek Cokelat Keju",
    price: 45000,
    imageUrl: "/images/kue/roti-sobek.jpg",
    category: "Roti",
    description: "Roti sobek empuk dengan isian cokelat dan keju melimpah.",
  },
  {
    id: "prod4",
    name: "Paket Donat Klasik (6 pcs)",
    price: 60000,
    imageUrl: "/images/kue/donat.jpg",
    category: "Donat",
    description: "Donat klasik dengan topping gula halus dan meses cokelat.",
  },
  {
    id: "prod5",
    name: "Cheesecake Blueberry",
    price: 40000,
    imageUrl: "/images/kue/cheesecake.jpg",
    category: "Kue Potong",
    description: "Cheesecake lembut dengan selai blueberry segar.",
  },
  {
    id: "prod6",
    name: "Kopi Susu Gula Aren",
    price: 22000,
    imageUrl: "/images/minuman/kopi-susu.jpg",
    category: "Minuman",
    description: "Es kopi susu dengan manisnya gula aren asli.",
  },
];

export const generateMoreProducts = (
  baseProducts: Product[],
  targetCount: number
): Product[] => {
  const extendedProducts = [...baseProducts];
  let i = 0;
  while (extendedProducts.length < targetCount) {
    const originalProduct = baseProducts[i % baseProducts.length];
    extendedProducts.push({
      ...originalProduct,
      id: `prod_ext_${extendedProducts.length + 1}`,
      name: `${originalProduct.name} (Varian ${Math.floor(extendedProducts.length / baseProducts.length) + 1})`,
    });
    i++;
  }
  return extendedProducts.slice(0, targetCount);
};

export const shopProducts: Product[] = generateMoreProducts(dummyProducts, 25);

