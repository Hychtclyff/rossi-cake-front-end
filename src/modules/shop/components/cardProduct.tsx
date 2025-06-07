// CardProduct.tsx (atau di dalam file yang sama jika lebih sederhana)
// Gunakan next/image untuk optimasi

import { Button } from "@/components/ui/button";
import { Product } from "@/types/product.types";



interface CardProductProps {
  product: Product;
  onAddToCart: (product: Product) => void; // Fungsi untuk menambah ke keranjang
}

const CardProduct = ({ product, onAddToCart }: CardProductProps) => {
  return (
    <div className="rounded-[22px] max-w-sm p-4 sm:p-6 bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-neutral-700 flex flex-col justify-between h-full">
      <div className="aspect-square w-full relative mb-4">
        <img src={product.imageUrl} alt={product.name} className="rounded-md" />
      </div>
      <div>
        <h3
          className="text-base sm:text-lg font-semibold text-black dark:text-neutral-200 mb-1 truncate"
          title={product.name}
        >
          {product.name}
        </h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">
          {product.category}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold text-sky-600 dark:text-sky-400">
            Rp{product.price.toLocaleString("id-ID")}
          </p>
          <Button
            size="sm"
            onClick={() => onAddToCart(product)}
            className="rounded-full"
          >
            Tambah
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
