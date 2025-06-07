// src/types/index.ts (atau src/types/product.types.ts)

export type ProductProops = {
  id: string;
  name: string;
  price: number;
  totalAmount: number; // Jumlah stok produk
  imageUrl: string;
  category: string;
  description: string;
  createdAt: string; // Kapan produk ini pertama kali dibuat
  updatedAt: string; // Kapan produk ini terakhir kali diubah
};
export interface CartItem extends Product {
  quantity: number;
}

// Jika Anda membuat file terpisah seperti product.types.ts, maka hanya Product yang ada di sini.
// Lalu di src/types/index.ts Anda bisa re-export: export * from './product.types';
