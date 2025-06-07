// src/types/index.ts (atau src/types/product.types.ts)

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  description?: string;
}

// Anda juga bisa menambahkan tipe lain yang relevan di sini, misalnya CartItem
export interface CartItem extends Product {
  quantity: number;
}

// Jika Anda membuat file terpisah seperti product.types.ts, maka hanya Product yang ada di sini.
// Lalu di src/types/index.ts Anda bisa re-export: export * from './product.types';
