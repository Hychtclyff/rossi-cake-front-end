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

// --- Tipe Data untuk Bahan Baku ---
interface Material {
  id: string;
  name: string;
  supplier?: string;
  stock: number;
  unit: string;
  pricePerUnit: number;
  description?: string;
}

// --- Data Dummy Awal untuk Bahan Baku ---
const initialMaterialsData: Material[] = [
  {
    id: "BB001",
    name: "Tepung Terigu Protein Tinggi",
    supplier: "PT Boga Sari Flour Mills",
    stock: 50,
    unit: "kg",
    pricePerUnit: 12500,
    description: "Tepung terigu berkualitas tinggi, cocok untuk roti dan mie.",
  },
  {
    id: "BB002",
    name: "Gula Pasir Kristal Putih",
    supplier: "CV Gula Manis Nusantara",
    stock: 100,
    unit: "kg",
    pricePerUnit: 16000,
    description: "Gula pasir murni untuk berbagai keperluan.",
  },
  {
    id: "BB003",
    name: "Mentega Tawar (Unsalted Butter)",
    supplier: "PT Dairy Farm Indonesia",
    stock: 25,
    unit: "kg",
    pricePerUnit: 85000,
    description: "Mentega tawar premium untuk baking.",
  },
  {
    id: "BB004",
    name: "Telur Ayam Negeri Omega-3",
    supplier: "Berkah Jaya Farm",
    stock: 500,
    unit: "butir",
    pricePerUnit: 2200,
    description: "Telur ayam segar.",
  },
  {
    id: "BB005",
    name: "Cokelat Bubuk Premium",
    supplier: "CV Cokelat Kita",
    stock: 15,
    unit: "kg",
    pricePerUnit: 95000,
    description: "Cokelat bubuk dengan rasa pekat.",
  },
];

// --- Komponen Form untuk Bahan Baku ---
const MaterialFormFields = ({
  mode,
  initialData,
  onSubmit,
  onCancel,
}: {
  mode: 'create' | 'update';
  initialData?: Material | null;
  onSubmit: (data: Material) => void;
  onCancel: () => void;
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: Material = {
      id: formData.get("id") as string,
      name: formData.get("name") as string,
      supplier: (formData.get("supplier") as string) || "",
      stock: parseFloat(formData.get("stock") as string) || 0,
      unit: formData.get("unit") as string,
      pricePerUnit: parseFloat(formData.get("pricePerUnit") as string) || 0,
      description: (formData.get("description") as string) || "",
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>
          {mode === "update"
            ? `Edit Bahan Baku: ${initialData?.name || ""}`
            : "Tambah Bahan Baku Baru"}
        </DialogTitle>
        <DialogDescription>Lengkapi detail bahan baku di bawah ini.</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="id" className="text-right">
            ID Bahan
          </Label>
          <Input
            id="id"
            name="id"
            defaultValue={initialData?.id ?? ""}
            className="col-span-3"
            readOnly={mode === "update"}
            required
            placeholder="Contoh: BB006"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Nama Bahan
          </Label>
          <Input
            id="name"
            name="name"
            defaultValue={initialData?.name ?? ""}
            className="col-span-3"
            required
            placeholder="Contoh: Pewarna Makanan Merah"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="supplier" className="text-right">
            Supplier
          </Label>
          <Input
            id="supplier"
            name="supplier"
            defaultValue={initialData?.supplier ?? ""}
            className="col-span-3"
            placeholder="Contoh: PT Pemasok Utama"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="stock" className="text-right">
            Stok
          </Label>
          <Input
            id="stock"
            name="stock"
            type="number"
            min="0"
            step="any"
            defaultValue={initialData?.stock ?? ""}
            className="col-span-3"
            required
            placeholder="Contoh: 10.5"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="unit" className="text-right">
            Satuan
          </Label>
          <Input
            id="unit"
            name="unit"
            defaultValue={initialData?.unit ?? ""}
            className="col-span-3"
            required
            placeholder="kg, gr, liter, pcs, botol"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="pricePerUnit" className="text-right">
            Harga/Unit (Rp)
          </Label>
          <Input
            id="pricePerUnit"
            name="pricePerUnit"
            type="number"
            min="0"
            step="any"
            defaultValue={initialData?.pricePerUnit ?? ""}
            className="col-span-3"
            required
            placeholder="Contoh: 25000"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            Deskripsi
          </Label>
          <Textarea
            id="description"
            name="description"
            defaultValue={initialData?.description ?? ""}
            className="col-span-3"
            placeholder="Deskripsi atau catatan tambahan..."
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
        <Button type="submit">{mode === "update" ? "Update Bahan" : "Simpan Bahan"}</Button>
      </DialogFooter>
    </form>
  );
};

// --- Komponen Utama untuk Manajemen Bahan Baku ---
const MaterialManagement: React.FC = () => {
  const [materialsList, setMaterialsList] = useState<Material[]>(initialMaterialsData);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [formMode, setFormMode] = useState<"create" | "update">("create");
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredMaterials = materialsList.filter(
    (material) =>
      material.name.toLowerCase().includes(searchQuery) ||
      material.id.toLowerCase().includes(searchQuery) ||
      (material.supplier && material.supplier.toLowerCase().includes(searchQuery))
  );

  const openCreateForm = () => {
    setEditingMaterial(null);
    setFormMode("create");
    setIsFormOpen(true);
  };

  const openEditForm = (material: Material) => {
    setEditingMaterial(material);
    setFormMode("update");
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: Material) => {
    if (formMode === "create") {
      setMaterialsList((prev) => [
        ...prev,
        { ...data, id: data.id || `BB_NEW_${Date.now().toString().slice(-4)}` },
      ]);
    } else if (formMode === "update" && editingMaterial) {
      setMaterialsList((prev) =>
        prev.map((m) => (m.id === editingMaterial.id ? { ...m, ...data } : m))
      );
    }
    setIsFormOpen(false);
    setEditingMaterial(null);
  };

  const handleDeleteMaterial = (materialId: string) => {
    if (
      window.confirm(
        `Yakin ingin menghapus bahan baku dengan ID: ${materialId}?`
      )
    ) {
      setMaterialsList((prev) => prev.filter((m) => m.id !== materialId));
    }
  };
  
  const totalStockValue = filteredMaterials.reduce((sum, material) => {
    return sum + ( (material.stock || 0) * (material.pricePerUnit || 0) );
  }, 0);

  return (
    <div className="flex flex-col gap-5 p-4 md:p-6 lg:p-8 w-full">
      <div className="flex flex-col gap-3">
        <h1 className="bg-clip-text text-transparent text-start bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-200 dark:to-neutral-400 text-2xl md:text-3xl lg:text-4xl font-sans py-2 md:py-3 relative z-20 font-bold tracking-tight">
          Manajemen Bahan Baku
        </h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Bahan Baku</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 mb-4">
        <div className="relative flex items-center w-full md:max-w-sm">
          <IconSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500 dark:text-neutral-400 pointer-events-none" />
          <Input
            type="search"
            placeholder="Cari (ID, Nama, Supplier)..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 w-full border-neutral-300 dark:border-neutral-700 rounded-md focus:ring-sky-500 focus:border-sky-500 dark:bg-neutral-800 dark:text-neutral-50"
            aria-label="Cari Bahan Baku"
          />
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateForm}>
              <IconPlus size={18} strokeWidth={2.5} className="mr-2" />
              Tambah Bahan Baku
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg md:max-w-xl">
            <MaterialFormFields
              mode={formMode}
              initialData={editingMaterial}
              onSubmit={handleFormSubmit}
              onCancel={() => setIsFormOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <ScrollArea className="h-[calc(100vh-420px)] w-full relative rounded-md border">
        <Table>
          <TableCaption>Daftar bahan baku Anda.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px] text-center sticky top-0 z-10 bg-background dark:bg-neutral-900 shadow-sm">No</TableHead>
              <TableHead className="w-[120px] sticky top-0 z-10 bg-background dark:bg-neutral-900 shadow-sm">ID Bahan</TableHead>
              <TableHead className="sticky top-0 z-10 bg-background dark:bg-neutral-900 shadow-sm">Nama Bahan</TableHead>
              <TableHead className="sticky top-0 z-10 bg-background dark:bg-neutral-900 shadow-sm">Supplier</TableHead>
              <TableHead className="w-[100px] text-right sticky top-0 z-10 bg-background dark:bg-neutral-900 shadow-sm">Stok</TableHead>
              <TableHead className="w-[100px] text-center sticky top-0 z-10 bg-background dark:bg-neutral-900 shadow-sm">Satuan</TableHead>
              <TableHead className="w-[150px] text-right sticky top-0 z-10 bg-background dark:bg-neutral-900 shadow-sm">Harga/Unit</TableHead>
              <TableHead className="w-[100px] text-right sticky top-0 z-10 bg-background dark:bg-neutral-900 shadow-sm">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMaterials.length > 0 ? (
              filteredMaterials.map((material, idx) => (
                <TableRow key={material.id}>
                  <TableCell className="font-medium text-center">{idx + 1}</TableCell>
                  <TableCell className="font-mono">{material.id}</TableCell>
                  <TableCell>{material.name}</TableCell>
                  <TableCell>{material.supplier || "-"}</TableCell>
                  <TableCell className="text-right">{material.stock.toLocaleString('id-ID')}</TableCell>
                  <TableCell className="text-center">{material.unit}</TableCell>
                  <TableCell className="text-right">
                    Rp{material.pricePerUnit.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-x-2">
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => openEditForm(material)} title="Edit">
                        <IconPencil size={16} />
                      </Button>
                      <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => handleDeleteMaterial(material.id)} title="Hapus">
                        <IconTrash size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center h-24"> {/* Disesuaikan menjadi 8 kolom */}
                  {searchQuery
                    ? "Bahan baku tidak ditemukan."
                    : "Belum ada data bahan baku."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={7} className="font-semibold text-right"> {/* Disesuaikan menjadi 7 kolom */}
                Total Estimasi Nilai Stok
              </TableCell>
              <TableCell className="text-right font-semibold">
                Rp{totalStockValue.toLocaleString("id-ID")}
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

export default MaterialManagement;