"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  IconPencil,
  IconPlus,
  IconSearch,
  IconTrash,
} from "@tabler/icons-react";
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
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// --- Tipe Data untuk Produk ---
interface Product {
  product: string; // ID unik produk
  name: string;
  price: number;
  totalAmount: number; // Jumlah stok
  imageUrl: string;
  description: string;
}

// --- Data Dummy Awal untuk Produk ---
const initialProductsData: Product[] = [
  {
    product: "KUE001",
    name: "Black Forest Klasik",
    price: 250000,
    totalAmount: 15,
    imageUrl: "https://placehold.co/100x100/E8D2A6/4A3F35?text=Black+Forest",
    description:
      "Kue black forest dengan lapisan krim segar dan serutan cokelat premium.",
  },
  {
    product: "KUE002",
    name: "Red Velvet Cupcakes (6 pcs)",
    price: 120000,
    totalAmount: 30,
    imageUrl: "https://placehold.co/100x100/C9A6A6/7D4F50?text=Red+Velvet",
    description:
      "Cupcake red velvet lembut dengan topping cream cheese frosting.",
  },
  {
    product: "KUE003",
    name: "Cheesecake Lumer Original",
    price: 180000,
    totalAmount: 20,
    imageUrl: "https://placehold.co/100x100/F5F5DC/707070?text=Cheesecake",
    description:
      "Cheesecake panggang dengan tekstur lembut dan rasa keju yang kaya.",
  },
  {
    product: "KUE004",
    name: "Donat Aneka Topping (1 lusin)",
    price: 95000,
    totalAmount: 50,
    imageUrl: "https://placehold.co/100x100/D2B48C/A0522D?text=Donat",
    description:
      "Satu lusin donat empuk dengan berbagai pilihan topping menarik.",
  },
  {
    product: "KUE005",
    name: "Nastar Premium Wisman",
    price: 150000,
    totalAmount: 40,
    imageUrl: "https://placehold.co/100x100/FFDEAD/8B4513?text=Nastar",
    description:
      "Kue nastar klasik dengan isian selai nanas homemade dan mentega Wisman.",
  },
];

// --- Komponen Form untuk Produk ---
const ProductFormFields = ({
  mode,
  initialData,
  onSubmit,
  onCancel,
}: {
  mode: "create" | "update";
  initialData?: Product | null;
  onSubmit: (data: Product) => void;
  onCancel: () => void;
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: Product = {
      product: formData.get("product") as string,
      name: formData.get("name") as string,
      price: parseFloat(formData.get("price") as string) || 0,
      totalAmount: parseInt(formData.get("totalAmount") as string, 10) || 0,
      imageUrl: (formData.get("imageUrl") as string) || "",
      description: (formData.get("description") as string) || "",
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>
          {mode === "update"
            ? `Edit Produk: ${initialData?.name || ""}`
            : "Tambah Produk Baru"}
        </DialogTitle>
        <DialogDescription>
          Lengkapi detail produk di bawah ini.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="product-id" className="text-right">
            ID Produk
          </Label>
          <Input
            id="product-id"
            name="product"
            defaultValue={initialData?.product ?? ""}
            className="col-span-3"
            readOnly={mode === "update"}
            required
            placeholder="Contoh: KUE007"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="product-name" className="text-right">
            Nama Produk
          </Label>
          <Input
            id="product-name"
            name="name"
            defaultValue={initialData?.name ?? ""}
            className="col-span-3"
            required
            placeholder="Contoh: Brownies Cokelat"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="product-price" className="text-right">
            Harga (Rp)
          </Label>
          <Input
            id="product-price"
            name="price"
            type="number"
            min="0"
            defaultValue={initialData?.price ?? ""}
            className="col-span-3"
            required
            placeholder="Contoh: 50000"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="product-stock" className="text-right">
            Stok (pcs)
          </Label>
          <Input
            id="product-stock"
            name="totalAmount"
            type="number"
            min="0"
            defaultValue={initialData?.totalAmount ?? ""}
            className="col-span-3"
            required
            placeholder="Contoh: 20"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="product-imageUrl" className="text-right">
            URL Gambar
          </Label>
          <Input
            id="product-imageUrl"
            name="imageUrl"
            type="url"
            defaultValue={initialData?.imageUrl ?? ""}
            className="col-span-3"
            placeholder="https://..."
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="product-description" className="text-right">
            Deskripsi
          </Label>
          <Textarea
            id="product-description"
            name="description"
            defaultValue={initialData?.description ?? ""}
            className="col-span-3"
            placeholder="Deskripsi singkat produk..."
            rows={3}
          />
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline" onClick={onCancel}>
            Batal
          </Button>
        </DialogClose>
        <Button type="submit">
          {mode === "update" ? "Update Produk" : "Simpan Produk"}
        </Button>
      </DialogFooter>
    </form>
  );
};

// --- Komponen Utama untuk Manajemen Produk ---
const ProductsPage: React.FC = () => {
  const [productsList, setProductsList] =
    useState<Product[]>(initialProductsData);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [formMode, setFormMode] = useState<"create" | "update">("create");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredProducts = productsList.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery) ||
      product.product.toLowerCase().includes(searchQuery)
  );

  const openCreateForm = () => {
    setEditingProduct(null);
    setFormMode("create");
    setIsFormOpen(true);
  };

  const openEditForm = (product: Product) => {
    setEditingProduct(product);
    setFormMode("update");
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: Product) => {
    if (formMode === "create") {
      setProductsList((prev) => [
        ...prev,
        {
          ...data,
          product: data.product || `KUE_NEW_${Date.now().toString().slice(-4)}`,
        },
      ]);
    } else if (formMode === "update" && editingProduct) {
      setProductsList((prev) =>
        prev.map((p) =>
          p.product === editingProduct.product ? { ...p, ...data } : p
        )
      );
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId: string) => {
    if (
      window.confirm(`Yakin ingin menghapus produk dengan ID: ${productId}?`)
    ) {
      setProductsList((prev) => prev.filter((p) => p.product !== productId));
    }
  };

  const totalProductValue = filteredProducts.reduce((sum, product) => {
    return sum + (product.price || 0) * (product.totalAmount || 0);
  }, 0);

  return (
    <div className="flex flex-col gap-5 p-4 md:p-6 lg:p-8 w-full">
      <div className="flex flex-col gap-3">
        <h1 className="bg-clip-text text-transparent text-start bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-200 dark:to-neutral-400 text-2xl md:text-3xl lg:text-4xl font-sans py-2 md:py-3 relative z-20 font-bold tracking-tight">
          Manajemen Produk Kue
        </h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Produk Kue</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 mb-4">
        <div className="relative flex items-center w-full md:max-w-sm">
          <IconSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500 dark:text-neutral-400 pointer-events-none" />
          <Input
            type="search"
            placeholder="Cari produk (ID, Nama)..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 w-full border-neutral-300 dark:border-neutral-700 rounded-md focus:ring-sky-500 focus:border-sky-500 dark:bg-neutral-800 dark:text-neutral-50"
            aria-label="Cari Produk"
          />
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateForm}>
              <IconPlus size={18} strokeWidth={2.5} className="mr-2" />
              Tambah Produk Baru
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg md:max-w-xl">
            <ProductFormFields
              mode={formMode}
              initialData={editingProduct}
              onSubmit={handleFormSubmit}
              onCancel={() => setIsFormOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <ScrollArea className="h-[calc(100vh-420px)] w-full relative rounded-md border">
        <Table>
          <TableCaption>Daftar produk kue Anda.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px] text-center sticky top-0 z-10 bg-background dark:bg-neutral-900 shadow-sm">
                No
              </TableHead>
              <TableHead className="w-[100px] sticky top-0 z-10 bg-background dark:bg-neutral-900 shadow-sm">
                Gambar
              </TableHead>
              <TableHead className="sticky top-0 z-10 bg-background dark:bg-neutral-900 shadow-sm">
                Nama Produk
              </TableHead>
              <TableHead className="w-[150px] text-right sticky top-0 z-10 bg-background dark:bg-neutral-900 shadow-sm">
                Harga
              </TableHead>
              <TableHead className="w-[100px] text-right sticky top-0 z-10 bg-background dark:bg-neutral-900 shadow-sm">
                Stok
              </TableHead>
              <TableHead className="w-[100px] text-right sticky top-0 z-10 bg-background dark:bg-neutral-900 shadow-sm">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, idx) => (
                <TableRow key={product.product}>
                  <TableCell className="font-medium text-center">
                    {idx + 1}
                  </TableCell>
                  <TableCell className="p-1">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-14 w-14 object-cover rounded-md shadow-sm" // Ukuran gambar disesuaikan
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell className="text-right">
                    Rp{product.price.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell className="text-right">
                    {product.totalAmount} pcs
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => openEditForm(product)}
                        title="Edit"
                      >
                        <IconPencil size={16} />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleDeleteProduct(product.product)}
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
                  {" "}
                  {/* Disesuaikan menjadi 6 kolom */}
                  {searchQuery
                    ? "Produk tidak ditemukan."
                    : "Belum ada produk."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5} className="font-semibold text-right">
                {" "}
                {/* Disesuaikan menjadi 5 kolom */}
                Total Estimasi Nilai Produk
              </TableCell>
              <TableCell className="text-right font-semibold">
                Rp{totalProductValue.toLocaleString("id-ID")}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <ScrollBar orientation="vertical" />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default ProductsPage;
