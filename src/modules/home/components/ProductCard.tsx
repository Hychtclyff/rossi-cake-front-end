// src/components/shared/ProductCard.tsx
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { ProductData } from "@/data/home/data";

interface ProductCardProps {
  product: ProductData;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <BackgroundGradient className="rounded-[22px] p-4 sm:p-6 bg-white dark:bg-zinc-900 ">
      <img
        src={product.imageUrl}
        alt={product.name}
        height="400"
        width="400"
        className="object-contain h-48 w-full"
        loading="lazy"
      />
      <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
        {product.name}
      </p>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3">
        {product.description}
      </p>
      <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
        <span>Beli</span>
        <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(product.price)}
        </span>
      </button>
    </BackgroundGradient>
  );
}
