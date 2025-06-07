"use client";

import React, { useState } from "react";
// Mengimpor data dummy dan tipe data
import { Products } from "@/data/products"; // Ganti nama impor agar lebih jelas
import { ProductProops } from "@/common/types/product.types"; // Ganti nama impor agar konsisten

// Mengimpor komponen UI dari shadcn/ui
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mengimpor ikon dari @tabler/icons-react
import {
  IconPencil,
  IconPlus,
  IconSearch,
  IconTrash,
  IconAlertTriangle, // Ikon untuk dialog konfirmasi
} from "@tabler/icons-react";

// Komponen Form terpisah (seperti yang Anda miliki)
import { ProductFormFields } from "./ProductFormFields";

const ProductsPage: React.FC = () => {
  // State utama
  const [productsList, setProductsList] = useState<ProductProops[]>(Products);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // State untuk mengelola dialog form (create/update)
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [formMode, setFormMode] = useState<"create" | "update">("create");
  const [editingProduct, setEditingProduct] = useState<ProductProops | null>(
    null
  );

  // State untuk mengelola dialog konfirmasi hapus
  const [productToDelete, setProductToDelete] = useState<ProductProops | null>(
    null
  );

  // --- LOGIKA UTAMA ---

  // Mencari produk berdasarkan query
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredProducts = productsList.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery) ||
      product.id.toLowerCase().includes(searchQuery)
  );

  // Membuka form untuk membuat produk baru
  const openCreateForm = () => {
    setEditingProduct(null);
    setFormMode("create");
    setIsFormOpen(true);
  };

  // Membuka form untuk mengedit produk yang ada
  const openEditForm = (productId: string) => {
    // [FIXED] Logika find diperbaiki dari `!==` menjadi `===`
    const productToEdit = productsList.find((p) => p.id === productId);
    if (productToEdit) {
      setEditingProduct(productToEdit);
      setFormMode("update");
      setIsFormOpen(true);
    }
  };

  // Menangani submit dari form (create atau update)
  const handleFormSubmit = (
    formData: Omit<ProductProops, "createdAt" | "updatedAt" | "category">
  ) => {
    const now = new Date().toISOString();

    if (formMode === "create") {
      // [REFACTORED] Logika pembuatan produk baru lebih bersih dan lengkap
      const newProduct: ProductProops = {
        ...formData,
        id: formData.id || `prod_${Date.now()}`, // Pastikan ID unik
        category: "Aneka Kue", // Nilai default atau bisa dari form
        createdAt: now,
        updatedAt: now,
      };
      setProductsList((prev) => [newProduct, ...prev]); // Tambahkan di awal agar terlihat
    } else if (formMode === "update" && editingProduct) {
      // [REFACTORED] Logika update sekarang juga memperbarui `updatedAt`
      const updatedProduct: ProductProops = {
        ...editingProduct,
        ...formData,
        updatedAt: now,
      };
      setProductsList((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? updatedProduct : p))
      );
    }

    // Reset state form setelah submit
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  // Menangani proses hapus produk
  const confirmDeleteProduct = () => {
    if (!productToDelete) return;
    setProductsList((prev) => prev.filter((p) => p.id !== productToDelete.id));
    setProductToDelete(null); // Tutup dialog konfirmasi
  };

  // Menghitung total nilai produk
  const totalProductValue = filteredProducts.reduce((sum, product) => {
    return sum + (product.price || 0) * (product.totalAmount || 0);
  }, 0);

  // --- RENDER KOMPONEN ---

  return (
    <div className="flex flex-col gap-5 p-4 md:p-6 lg:p-8 w-full">
      {/* Header Halaman */}
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
          Manajemen Produk
        </h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Produk</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Kontrol dan Aksi */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
        <div className="relative flex items-center w-full md:max-w-sm">
          <IconSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500" />
          <Input
            type="search"
            placeholder="Cari produk (ID, Nama)..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10"
            aria-label="Cari Produk"
          />
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateForm} className="w-full md:w-auto">
              <IconPlus size={18} className="mr-2" />
              Tambah Produk
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-xl">
            {/* Menggunakan komponen form yang sudah ada */}
            <ProductFormFields
              mode={formMode}
              initialData={editingProduct}
              onSubmit={handleFormSubmit}
              onCancel={() => setIsFormOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabel Produk */}
      <ScrollArea className="w-full border rounded-md">
        <div className="h-[calc(100vh-420px)]">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-background shadow-sm">
              <TableRow>
                <TableHead className="w-[60px] text-center">No</TableHead>
                <TableHead className="w-[100px]">Gambar</TableHead>
                <TableHead>Nama Produk</TableHead>
                <TableHead className="w-[150px] text-right">Harga</TableHead>
                <TableHead className="w-[100px] text-right">Stok</TableHead>
                <TableHead className="w-[120px] text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, idx) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium text-center">
                      {idx + 1}
                    </TableCell>
                    <TableCell className="p-1">
                      <img
                        src={
                          product.imageUrl ||
                          "https://placehold.co/100x100/e2e8f0/e2e8f0?text=."
                        }
                        alt={product.name}
                        className="h-14 w-14 object-cover rounded-md"
                      />
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell className="text-right">
                      Rp{product.price.toLocaleString("id-ID")}
                    </TableCell>
                    <TableCell className="text-right">
                      {product.totalAmount} pcs
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => openEditForm(product.id)}
                          title="Edit"
                        >
                          <IconPencil size={16} />
                        </Button>
                        {/* [REFACTORED] Tombol hapus sekarang membuka dialog konfirmasi */}
                        <Button
                          variant="destructive"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setProductToDelete(product)}
                          title="Hapus"
                        >
                          <IconTrash size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24">
                    {searchQuery
                      ? "Produk tidak ditemukan."
                      : "Belum ada produk."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
      <div className="flex justify-end font-semibold p-4 border-t">
        Total Estimasi Nilai Produk: Rp
        {totalProductValue.toLocaleString("id-ID")}
      </div>

      {/* [NEW] Dialog Konfirmasi Hapus */}
      <Dialog
        open={!!productToDelete}
        onOpenChange={() => setProductToDelete(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <IconAlertTriangle className="text-red-500" />
              Konfirmasi Hapus
            </DialogTitle>
            <DialogDescription>
              Anda yakin ingin menghapus produk{" "}
              <strong>"{productToDelete?.name}"</strong>? Tindakan ini tidak
              dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Batal</Button>
            </DialogClose>
            <Button variant="destructive" onClick={confirmDeleteProduct}>
              Ya, Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsPage;
