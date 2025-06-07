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
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  // Asumsikan DiscountVoucherFormFields akan mengimpor DialogHeader, Footer, dll.
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Impor form yang sudah disesuaikan untuk Diskon/Voucher
// import DiscountVoucherFormFields from "./DiscountVoucherFormFields"; // Buat file ini

// --- Placeholder untuk DiscountVoucherFormFields ---
// (Implementasi sebenarnya akan mirip ProductFormFields, tapi dengan field diskon/voucher)
const DiscountVoucherFormFields = ({
  mode,
  initialData,
  onSubmit,
  onCancel,
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // Ekstrak data dari formData dan panggil onSubmit
    const data = {
      id: formData.get("id") as string,
      name: formData.get("name") as string,
      type: formData.get("type") as
        | "percentage"
        | "fixed_amount"
        | "free_shipping",
      value: parseFloat(formData.get("value") as string),
      description: (formData.get("description") as string) || "",
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
      status: formData.get("status") as "active" | "inactive" | "expired",
      minPurchase: formData.get("minPurchase")
        ? parseFloat(formData.get("minPurchase") as string)
        : undefined,
    };
    onSubmit(data);
  };
  // JSX Form untuk diskon/voucher (Kode, Nama, Tipe, Nilai, Tgl Mulai, Tgl Selesai, Status, dll.)
  // Untuk mempersingkat, ini hanya contoh, Anda perlu membuat field input yang lengkap.
  return (
    <form onSubmit={handleSubmit}>

      <DialogHeader>
        <DialogTitle>
          {mode === "update"
            ? "Edit Diskon/Voucher"
            : "Tambah Diskon/Voucher Baru"}
        </DialogTitle>
        <DialogDescription>Lengkapi detail di bawah ini.</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="id" className="text-right">
            Kode/ID
          </Label>
          <Input
            id="id"
            name="id"
            defaultValue={initialData?.id ?? ""}
            className="col-span-3"
            readOnly={mode === "update"}
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Nama
          </Label>
          <Input
            id="name"
            name="name"
            defaultValue={initialData?.name ?? ""}
            className="col-span-3"
            required
          />
        </div>
        {/* Tambahkan field lain: type (select), value (number), startDate (date), endDate (date), status (select), etc. */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="type" className="text-right">
            Tipe
          </Label>
          <select
            id="type"
            name="type"
            defaultValue={initialData?.type ?? "percentage"}
            className="col-span-3 p-2 border rounded-md dark:bg-neutral-800"
          >
            <option value="percentage">Persentase (%)</option>
            <option value="fixed_amount">Jumlah Tetap (Rp)</option>
            <option value="free_shipping">Gratis Ongkir</option>
          </select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="value" className="text-right">
            Nilai
          </Label>
          <Input
            id="value"
            name="value"
            type="number"
            defaultValue={initialData?.value ?? 0}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="startDate" className="text-right">
            Tgl Mulai
          </Label>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            defaultValue={initialData?.startDate ?? ""}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="endDate" className="text-right">
            Tgl Selesai
          </Label>
          <Input
            id="endDate"
            name="endDate"
            type="date"
            defaultValue={initialData?.endDate ?? ""}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="status" className="text-right">
            Status
          </Label>
          <select
            id="status"
            name="status"
            defaultValue={initialData?.status ?? "inactive"}
            className="col-span-3 p-2 border rounded-md dark:bg-neutral-800"
          >
            <option value="active">Aktif</option>
            <option value="inactive">Tidak Aktif</option>
            <option value="expired">Kadaluarsa</option>
          </select>
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
            placeholder="Deskripsi singkat..."
          />
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline" onClick={onCancel}>
            Batal
          </Button>
        </DialogClose>
        <Button type="submit">{mode === "update" ? "Update" : "Simpan"}</Button>
      </DialogFooter>
    </form>
  );
};
// --- Akhir Placeholder ---

interface DiscountVoucher {
  id: string;
  name: string;
  type: "percentage" | "fixed_amount" | "free_shipping";
  value: number;
  description?: string;
  startDate: string;
  endDate: string;
  status: "active" | "inactive" | "expired";
  minPurchase?: number;
}

const initialDiscountsData: DiscountVoucher[] = [
  // ... (data dummy dari atas) ...
  {
    id: "HEMAT20",
    name: "Diskon Akhir Pekan 20%",
    type: "percentage",
    value: 20,
    description: "Nikmati diskon 20% untuk semua produk setiap akhir pekan.",
    startDate: "2025-06-01",
    endDate: "2025-12-31",
    status: "active",
    minPurchase: 100000,
  },
  {
    id: "ONGKIRGRATIS",
    name: "Voucher Gratis Ongkir",
    type: "free_shipping",
    value: 0,
    description: "Gratis ongkir tanpa minimum pembelian.",
    startDate: "2025-05-01",
    endDate: "2025-06-30",
    status: "active",
  },
  {
    id: "POTONGAN15RB",
    name: "Potongan Langsung Rp15.000",
    type: "fixed_amount",
    value: 15000,
    description: "Dapatkan potongan Rp15.000 untuk pembelian di atas Rp75.000.",
    startDate: "2025-06-10",
    endDate: "2025-07-10",
    status: "inactive",
    minPurchase: 75000,
  },
  {
    id: "RAMADANHEMAT",
    name: "Promo Spesial Ramadan",
    type: "percentage",
    value: 15,
    description: "Diskon 15% untuk kue kering selama bulan Ramadan.",
    startDate: "2025-03-01",
    endDate: "2025-03-30",
    status: "expired",
  },
  {
    id: "BARUDAFTAR",
    name: "Diskon Pengguna Baru",
    type: "fixed_amount",
    value: 25000,
    description: "Potongan Rp25.000 khusus untuk pendaftaran pertama.",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    status: "active",
    minPurchase: 50000,
  },
];

const DiscountVoucherManagement: React.FC = () => {
  const [discountsList, setDiscountsList] =
    useState<DiscountVoucher[]>(initialDiscountsData);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [formMode, setFormMode] = useState<"create" | "update">("create");
  const [editingDiscount, setEditingDiscount] =
    useState<DiscountVoucher | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredDiscounts = discountsList.filter(
    (discount) =>
      discount.name.toLowerCase().includes(searchQuery) ||
      discount.id.toLowerCase().includes(searchQuery) ||
      discount.type.toLowerCase().includes(searchQuery)
  );

  const openCreateForm = () => {
    setEditingDiscount(null);
    setFormMode("create");
    setIsFormOpen(true);
  };

  const openEditForm = (discount: DiscountVoucher) => {
    setEditingDiscount(discount);
    setFormMode("update");
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: DiscountVoucher) => {
    if (formMode === "create") {
      setDiscountsList((prev) => [
        ...prev,
        { ...data, id: data.id || `VC_NEW_${Date.now().toString().slice(-4)}` },
      ]);
    } else if (formMode === "update" && editingDiscount) {
      setDiscountsList((prev) =>
        prev.map((d) => (d.id === editingDiscount.id ? { ...d, ...data } : d))
      );
    }
    setIsFormOpen(false);
    setEditingDiscount(null);
  };

  const handleDeleteDiscount = (discountId: string) => {
    if (
      window.confirm(
        `Yakin ingin menghapus diskon/voucher dengan ID: ${discountId}?`
      )
    ) {
      setDiscountsList((prev) => prev.filter((d) => d.id !== discountId));
    }
  };

  const formatDiscountValue = (
    type: DiscountVoucher["type"],
    value: number
  ) => {
    if (type === "percentage") return `${value}%`;
    if (type === "fixed_amount") return `Rp${value.toLocaleString("id-ID")}`;
    if (type === "free_shipping") return "Gratis";
    return value;
  };

  return (
    <div className="flex flex-col gap-5 p-4 md:p-6 lg:p-8 w-full">
      <div className="flex flex-col gap-3">
        <h1 className="bg-clip-text text-transparent text-start bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-200 dark:to-neutral-400 text-2xl md:text-3xl lg:text-4xl font-sans py-2 md:py-3 relative z-20 font-bold tracking-tight">
          Manajemen Diskon & Voucher
        </h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Diskon & Voucher</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 mb-4">
        <div className="relative flex items-center w-full md:max-w-sm">
          <IconSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500 dark:text-neutral-400 pointer-events-none" />
          <Input
            type="search"
            placeholder="Cari (Kode, Nama, Tipe)..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 w-full border-neutral-300 dark:border-neutral-700 rounded-md focus:ring-sky-500 focus:border-sky-500 dark:bg-neutral-800 dark:text-neutral-50"
            aria-label="Cari Diskon atau Voucher"
          />
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateForm}>
              <IconPlus size={18} strokeWidth={2.5} className="mr-2" />
              Tambah Baru
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg md:max-w-xl">
            <DiscountVoucherFormFields
              mode={formMode}
              initialData={editingDiscount}
              onSubmit={handleFormSubmit}
              onCancel={() => setIsFormOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <ScrollArea className="h-[calc(100vh-420px)] w-full relative rounded-md border">
        <Table>
          <TableCaption>Daftar diskon dan voucher Anda.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px] text-center sticky top-0 z-10 bg-background dark:bg-neutral-900 shadow-sm">
                No
              </TableHead>
              <TableHead className="w-[150px] sticky top-0 z-10 bg-background dark:bg-neutral-900 shadow-sm">
                Kode/ID
              </TableHead>
              <TableHead className="sticky top-0 z-10 bg-background dark:bg-neutral-900 shadow-sm">
                Nama
              </TableHead>
              <TableHead className="w-[120px] sticky top-0 z-10 bg-background dark:bg-neutral-900 shadow-sm">
                Tipe
              </TableHead>
              <TableHead className="w-[120px] text-right sticky top-0 z-10 bg-background dark:bg-neutral-900 shadow-sm">
                Nilai
              </TableHead>
              <TableHead className="w-[120px] text-center sticky top-0 z-10 bg-background dark:bg-neutral-900 shadow-sm">
                Mulai
              </TableHead>
              <TableHead className="w-[120px] text-center sticky top-0 z-10 bg-background dark:bg-neutral-900 shadow-sm">
                Selesai
              </TableHead>
              <TableHead className="w-[100px] text-center sticky top-0 z-10 bg-background dark:bg-neutral-900 shadow-sm">
                Status
              </TableHead>
              <TableHead className="w-[120px] text-right sticky top-0 z-10 bg-background dark:bg-neutral-900 shadow-sm">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDiscounts.length > 0 ? (
              filteredDiscounts.map((discount, idx) => (
                <TableRow key={discount.id}>
                  <TableCell className="font-medium text-center">
                    {idx + 1}
                  </TableCell>
                  <TableCell className="font-mono">{discount.id}</TableCell>
                  <TableCell>{discount.name}</TableCell>
                  <TableCell>
                    {discount.type === "percentage"
                      ? "Persentase"
                      : discount.type === "fixed_amount"
                        ? "Jumlah Tetap"
                        : "Gratis Ongkir"}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatDiscountValue(discount.type, discount.value)}
                  </TableCell>
                  <TableCell className="text-center">
                    {discount.startDate}
                  </TableCell>
                  <TableCell className="text-center">
                    {discount.endDate}
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        discount.status === "active"
                          ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100"
                          : discount.status === "inactive"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100"
                            : "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100"
                      }`}
                    >
                      {discount.status.charAt(0).toUpperCase() +
                        discount.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => openEditForm(discount)}
                        title="Edit"
                      >
                        <IconPencil size={16} />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleDeleteDiscount(discount.id)}
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
                <TableCell colSpan={9} className="text-center h-24">
                  {" "}
                  {/* Sesuaikan colSpan */}
                  {searchQuery
                    ? "Diskon/voucher tidak ditemukan."
                    : "Belum ada diskon atau voucher."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={8} className="font-semibold text-right">
                Total Diskon/Voucher Aktif
              </TableCell>
              <TableCell className="text-right font-semibold">
                {filteredDiscounts.filter((d) => d.status === "active").length}
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

export default DiscountVoucherManagement;
