"use client"; // Diperlukan untuk useState dan useEffect di Next.js App Router

import React, { useState, useEffect } from "react"; // Impor useEffect
import { GuestLayouts } from "@/components/Layouts/GuestLayout";
import HeaderMarket from "./headerMarket";
import ListProduct from "./listProduct";
import { CartItem, Product } from "@/types/product.types";
import { shopProducts } from "@/data/dumyProducts";

const ShopPage = () => { // Mengganti nama komponen menjadi PascalCase (praktik umum)
  const [products, setProducts] = useState<Product[]>(shopProducts);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // --- EFEK UNTUK MEMUAT KERANJANG DARI LOCALSTORAGE ---
  // Berjalan hanya sekali saat komponen pertama kali di-mount.
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("shopCart");
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart);
        }
      }
    } catch (error) {
      console.error("Gagal memuat keranjang dari localStorage:", error);
      // Jika data korup, hapus data yang salah dari localStorage
      localStorage.removeItem("shopCart");
    }
  }, []); // Dependency array kosong berarti efek ini hanya berjalan sekali.

  // --- EFEK UNTUK MENYIMPAN KERANJANG KE LOCALSTORAGE ---
  // Berjalan setiap kali state `cartItems` berubah.
  useEffect(() => {
    // Kita bisa menambahkan pengecekan agar tidak menyimpan array kosong saat awal render,
    // tapi menyimpan setiap perubahan (termasuk menjadi kosong) adalah pola yang aman dan sederhana.
    try {
      localStorage.setItem("shopCart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Gagal menyimpan keranjang ke localStorage:", error);
    }
  }, [cartItems]); // Dependency array berisi `cartItems`.

  // Fungsi untuk menangani penambahan ke keranjang
  const handleAddToCart = (productToAdd: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === productToAdd.id
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...productToAdd, quantity: 1 }];
    });
  };

  // Fungsi untuk update kuantitas item di keranjang
  const handleUpdateCartItemQuantity = (
    productId: string,
    newQuantity: number
  ) => {
    setCartItems(
      (prevItems) =>
        prevItems
          .map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item))
          .filter((item) => item.quantity > 0) // Hapus jika kuantitas jadi 0 atau kurang
    );
  };

  // Fungsi untuk menghapus item dari keranjang
  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  // Fungsi untuk mengosongkan keranjang
  const handleClearCart = () => {
    setCartItems([]);
    // Menghapus item dari localStorage secara eksplisit juga merupakan praktik yang baik.
    // Meskipun useEffect di atas akan menyimpan array kosong, removeItem lebih jelas.
    localStorage.removeItem("shopCart");
  };

  return (
    <GuestLayouts>
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-20 md:pt-24">
        <HeaderMarket
          cartItems={cartItems}
          onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
          onRemoveCartItem={handleRemoveCartItem}
          onClearCart={handleClearCart}
        />
        <ListProduct products={products} onAddToCart={handleAddToCart} />
      </div>
    </GuestLayouts>
  );
};

export default ShopPage; // Mengganti nama ekspor menjadi PascalCase