// ListProduct.tsx (atau di dalam file yang sama)
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"; // Asumsi path ini benar
import CardProduct from "./cardProduct";
import { useState } from "react";
import { Product } from "@/types/product.types";

interface ListProductProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ListProduct = ({ products, onAddToCart }: ListProductProps) => {
  const categories = [
    "Semua",
    "Kue Kering",
    "Kue Potong",
    "Roti",
    "Donat",
    "Minuman",
  ]; 
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const filteredProducts =
    selectedCategory === "Semua"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <>
      <div className="categories pt-10 flex justify-between items-center flex-wrap mb-6">
        <div className="flex justify-start flex-wrap text-center gap-2">
          {categories.map((category) => (
            <HoverBorderGradient
              key={category}
              containerClassName="rounded-full"
              as="button"
              onClick={() => setSelectedCategory(category)}
              className={`dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 ${selectedCategory === category ? "border-sky-500" : ""}`}
            >
              <span>{category}</span>
            </HoverBorderGradient>
          ))}
        </div>
      </div>
      {filteredProducts.length > 0 ? (
        <div className="listProducts grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 my-10">
          {filteredProducts.map((product) => (
            <CardProduct
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        <p className="text-center my-10 text-neutral-500 dark:text-neutral-400">
          Produk tidak ditemukan untuk kategori &quot;{selectedCategory}&quot;.
        </p>
      )}
    </>
  );
};

export default ListProduct;
