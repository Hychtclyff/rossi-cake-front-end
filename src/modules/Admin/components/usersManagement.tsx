"use client";

import React, { useState, useEffect } from "react";
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
  IconUserShield, // Contoh ikon untuk peran admin
  IconUser, // Contoh ikon untuk peran staff/customer
  IconMail,
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
// Textarea mungkin tidak terlalu dibutuhkan untuk form user sederhana, tapi bisa disimpan jika ada field catatan
// import { Textarea } from "@/components/ui/textarea";

// --- Tipe Data untuk Pengguna ---
interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: "admin" | "staff" | "customer";
  status: "active" | "inactive" | "suspended";
  lastLogin?: string;
  password?: string; // Hanya untuk form, JANGAN disimpan di state list utama
}

// --- Data Dummy Awal untuk Pengguna (didefinisikan di atas atau impor) ---
const initialUsersData: User[] = [
  {
    id: "USR001",
    username: "adminutama",
    fullName: "Admin Utama Sistem",
    email: "admin@example.com",
    role: "admin",
    status: "active",
    lastLogin: "2025-06-02 10:00:00",
  },
  {
    id: "USR002",
    username: "budisetiawan",
    fullName: "Budi Setiawan",
    email: "budi.s@example.com",
    role: "staff",
    status: "active",
    lastLogin: "2025-06-01 15:30:00",
  },
  {
    id: "USR003",
    username: "citraayu",
    fullName: "Citra Ayu Lestari",
    email: "citra.ayu@example.net",
    role: "customer",
    status: "inactive",
    lastLogin: "2025-05-20 08:20:00",
  },
  {
    id: "USR004",
    username: "dewisartika",
    fullName: "Dewi Sartika",
    email: "dewi.s@example.com",
    role: "staff",
    status: "suspended",
    lastLogin: "2025-04-10 11:00:00",
  },
  {
    id: "USR005",
    username: "ekapratama",
    fullName: "Eka Pratama",
    email: "eka.p@example.org",
    role: "customer",
    status: "active",
    lastLogin: "2025-06-02 09:15:00",
  },
];

// --- Komponen Form untuk Pengguna ---
const UserFormFields = ({
  mode,
  initialData,
  onSubmit,
  onCancel,
}: {
  mode: "create" | "update";
  initialData?: User | null;
  onSubmit: (data: Partial<User>) => void; // Partial<User> karena password mungkin tidak selalu ada/diubah
  onCancel: () => void;
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: Partial<User> = {
      // Menggunakan Partial<User> karena beberapa field mungkin opsional saat update
      id: formData.get("id") as string,
      username: formData.get("username") as string,
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      role: formData.get("role") as User["role"],
      status: formData.get("status") as User["status"],
    };
    const password = formData.get("password") as string;
    if (password) {
      // Hanya sertakan password jika diisi (untuk create atau ganti password)
      data.password = password;
    }
    // Validasi konfirmasi password jika ada fieldnya
    // const confirmPassword = formData.get("confirmPassword") as string;
    // if (password && password !== confirmPassword) {
    //   alert("Password dan konfirmasi password tidak cocok!");
    //   return;
    // }
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>
          {mode === "update"
            ? `Edit Pengguna: ${initialData?.username || ""}`
            : "Tambah Pengguna Baru"}
        </DialogTitle>
        <DialogDescription>
          Lengkapi detail pengguna di bawah ini.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="id" className="text-right">
            ID Pengguna
          </Label>
          <Input
            id="id"
            name="id"
            defaultValue={initialData?.id ?? ""}
            className="col-span-3"
            readOnly={mode === "update"}
            required
            placeholder="Contoh: USR006"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Username
          </Label>
          <Input
            id="username"
            name="username"
            defaultValue={initialData?.username ?? ""}
            className="col-span-3"
            required
            placeholder="Username untuk login"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="fullName" className="text-right">
            Nama Lengkap
          </Label>
          <Input
            id="fullName"
            name="fullName"
            defaultValue={initialData?.fullName ?? ""}
            className="col-span-3"
            required
            placeholder="Nama lengkap pengguna"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={initialData?.email ?? ""}
            className="col-span-3"
            required
            placeholder="email@example.com"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="password" className="text-right">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            className="col-span-3"
            placeholder={
              mode === "update" ? "Isi untuk ganti password" : "Password baru"
            }
          />
        </div>
        {/* Anda bisa menambahkan field "Konfirmasi Password" di sini jika diperlukan */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="role" className="text-right">
            Peran
          </Label>
          <select
            id="role"
            name="role"
            defaultValue={initialData?.role ?? "customer"}
            className="col-span-3 p-2 border rounded-md dark:bg-neutral-800"
          >
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
            <option value="customer">Customer</option>
          </select>
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
            <option value="suspended">Ditangguhkan</option>
          </select>
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline" onClick={onCancel}>
            Batal
          </Button>
        </DialogClose>
        <Button type="submit">
          {mode === "update" ? "Update Pengguna" : "Simpan Pengguna"}
        </Button>
      </DialogFooter>
    </form>
  );
};

// --- Komponen Utama untuk Manajemen Pengguna ---
const UserManagement: React.FC = () => {
  const [usersList, setUsersList] = useState<User[]>(initialUsersData);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [formMode, setFormMode] = useState<"create" | "update">("create");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredUsers = usersList.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery) ||
      user.fullName.toLowerCase().includes(searchQuery) ||
      user.email.toLowerCase().includes(searchQuery) ||
      user.role.toLowerCase().includes(searchQuery)
  );

  const openCreateForm = () => {
    setEditingUser(null);
    setFormMode("create");
    setIsFormOpen(true);
  };

  const openEditForm = (user: User) => {
    // Jangan teruskan password ke form edit untuk pre-fill
    const { password, ...userWithoutPassword } = user;
    setEditingUser(userWithoutPassword);
    setFormMode("update");
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: Partial<User>) => {
    if (formMode === "create") {
      // Asumsikan password sudah di-hash di backend atau sebelum dikirim
      const newUser: User = {
        ...data,
        id: data.id || `USR_NEW_${Date.now().toString().slice(-4)}`,
        username: data.username!,
        fullName: data.fullName!,
        email: data.email!,
        role: data.role || "customer",
        status: data.status || "inactive",
        // password TIDAK disimpan di list client-side, hanya dikirim ke backend
      };
      setUsersList((prev) => [...prev, newUser]);
      console.log("Membuat pengguna baru:", newUser);
    } else if (formMode === "update" && editingUser) {
      // Jika password diubah, backend yang akan meng-hash
      setUsersList((prev) =>
        prev.map((u) =>
          u.id === editingUser.id ? { ...u, ...data, id: editingUser.id } : u
        )
      );
      console.log("Mengupdate pengguna:", editingUser.id, data);
    }
    setIsFormOpen(false);
    setEditingUser(null);
  };

  const handleDeleteUser = (userId: string) => {
    if (
      window.confirm(`Yakin ingin menghapus pengguna dengan ID: ${userId}?`)
    ) {
      setUsersList((prev) => prev.filter((u) => u.id !== userId));
      console.log("Menghapus pengguna:", userId);
    }
  };

  const activeUsersCount = filteredUsers.filter(
    (user) => user.status === "active"
  ).length;

  return (
    <div className="flex flex-col gap-5 p-4 md:p-6 lg:p-8 w-full">
      <div className="flex flex-col gap-3">
        <h1 className="bg-clip-text text-transparent text-start bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-200 dark:to-neutral-400 text-2xl md:text-3xl lg:text-4xl font-sans py-2 md:py-3 relative z-20 font-bold tracking-tight">
          Manajemen Pengguna
        </h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Pengguna</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 mb-4">
        <div className="relative flex items-center w-full md:max-w-sm">
          <IconSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500 dark:text-neutral-400 pointer-events-none" />
          <Input
            type="search"
            placeholder="Cari (Username, Nama, Email, Peran)..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 w-full border-neutral-300 dark:border-neutral-700 rounded-md focus:ring-sky-500 focus:border-sky-500 dark:bg-neutral-800 dark:text-neutral-50"
            aria-label="Cari Pengguna"
          />
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateForm}>
              <IconPlus size={18} strokeWidth={2.5} className="mr-2" />
              Tambah Pengguna Baru
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg md:max-w-xl">
            <UserFormFields
              mode={formMode}
              initialData={editingUser}
              onSubmit={handleFormSubmit}
              onCancel={() => setIsFormOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <ScrollArea className="h-[calc(100vh-420px)] w-full relative rounded-md border">
        <Table>
          <TableCaption>Daftar pengguna sistem.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px] text-center sticky top-0 z-10 bg-background dark:bg-neutral-900 shadow-sm">
                No
              </TableHead>
              <TableHead className="w-[120px] sticky top-0 z-10 bg-background dark:bg-neutral-900 shadow-sm">
                ID User
              </TableHead>
              <TableHead className="sticky top-0 z-10 bg-background dark:bg-neutral-900 shadow-sm">
                Username
              </TableHead>
              <TableHead className="sticky top-0 z-10 bg-background dark:bg-neutral-900 shadow-sm">
                Nama Lengkap
              </TableHead>
              <TableHead className="sticky top-0 z-10 bg-background dark:bg-neutral-900 shadow-sm">
                Email
              </TableHead>
              <TableHead className="w-[100px] text-center sticky top-0 z-10 bg-background dark:bg-neutral-900 shadow-sm">
                Peran
              </TableHead>
              <TableHead className="w-[120px] text-center sticky top-0 z-10 bg-background dark:bg-neutral-900 shadow-sm">
                Status
              </TableHead>
              <TableHead className="w-[100px] text-right sticky top-0 z-10 bg-background dark:bg-neutral-900 shadow-sm">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, idx) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium text-center">
                    {idx + 1}
                  </TableCell>
                  <TableCell className="font-mono">{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-700 dark:bg-purple-700 dark:text-purple-100"
                          : user.role === "staff"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-blue-100"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100" // customer
                      }`}
                    >
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === "active"
                          ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100"
                          : user.status === "inactive"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100"
                            : "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100" // suspended
                      }`}
                    >
                      {user.status.charAt(0).toUpperCase() +
                        user.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => openEditForm(user)}
                        title="Edit"
                      >
                        <IconPencil size={16} />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleDeleteUser(user.id)}
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
                <TableCell colSpan={8} className="text-center h-24">
                  {" "}
                  {/* Disesuaikan menjadi 8 kolom */}
                  {searchQuery
                    ? "Pengguna tidak ditemukan."
                    : "Belum ada data pengguna."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={7} className="font-semibold text-right">
                {" "}
                {/* Disesuaikan menjadi 7 kolom */}
                Total Pengguna Aktif
              </TableCell>
              <TableCell className="text-right font-semibold">
                {activeUsersCount}
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

export default UserManagement;
