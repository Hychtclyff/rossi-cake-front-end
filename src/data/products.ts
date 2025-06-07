import { ProductProops } from "@/common/types/product.types";

export const Products: ProductProops[] = [
  {
    id: "prod6",
    name: "Kopi Susu Gula Aren",
    price: 22000,
    totalAmount: 50,
    imageUrl: "/images/minuman/kopi-susu.jpg",
    category: "Minuman",
    description: "Es kopi susu dengan manisnya gula aren asli.",
    // Produk ini adalah yang paling baru.
    createdAt: "2025-06-07T10:00:00.000Z",
    updatedAt: "2025-06-07T10:00:00.000Z",
  },
  {
    id: "prod5",
    name: "Cheesecake Blueberry",
    price: 40000,
    totalAmount: 15,
    imageUrl: "/images/kue/cheesecake.jpg",
    category: "Kue Potong",
    description: "Cheesecake lembut dengan selai blueberry segar.",
    createdAt: "2025-06-05T11:30:00.000Z",
    updatedAt: "2025-06-05T11:30:00.000Z",
  },
  {
    id: "prod1",
    name: "Kue Nastar Premium",
    price: 75000,
    totalAmount: 25,
    imageUrl: "/images/kue/nastar.jpg",
    category: "Kue Kering",
    description: "Nastar lembut dengan isian nanas pilihan dan mentega wisman.",
    // Produk lama tapi baru diupdate.
    createdAt: "2025-05-08T09:00:00.000Z",
    updatedAt: "2025-06-06T14:00:00.000Z",
  },
  {
    id: "prod2",
    name: "Red Velvet Cake Slice",
    price: 35000,
    totalAmount: 18,
    imageUrl: "/images/kue/red-velvet.jpg",
    category: "Kue Potong",
    description:
      "Potongan kue red velvet dengan cream cheese frosting yang mewah.",
    createdAt: "2025-05-31T15:20:00.000Z",
    updatedAt: "2025-05-31T15:20:00.000Z",
  },
  {
    id: "prod4",
    name: "Paket Donat Klasik (6 pcs)",
    price: 60000,
    totalAmount: 30,
    imageUrl: "/images/kue/donat.jpg",
    category: "Donat",
    description: "Donat klasik dengan topping gula halus dan meses cokelat.",
    createdAt: "2025-05-24T08:45:00.000Z",
    updatedAt: "2025-05-24T08:45:00.000Z",
  },
  {
    id: "prod3",
    name: "Roti Sobek Cokelat Keju",
    price: 45000,
    totalAmount: 20,
    imageUrl: "/images/kue/roti-sobek.jpg",
    category: "Roti",
    description: "Roti sobek empuk dengan isian cokelat dan keju melimpah.",
    // Produk paling lama.
    createdAt: "2025-04-23T12:00:00.000Z",
    updatedAt: "2025-04-23T12:00:00.000Z",
  },
];
