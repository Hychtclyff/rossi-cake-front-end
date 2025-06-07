"use client";

import React from "react";
import {
  IconArchive, // Untuk Produk
  IconBuildingWarehouse, // Untuk Bahan Baku
  IconDiscount2, // Untuk Diskon/Voucher
  IconUsers, // Untuk Pengguna
  IconAlertTriangle, // Untuk Stok Rendah
  IconCash, // Untuk Nilai
  IconCalendarTime, // Untuk Kadaluarsa
  IconUserCheck, // Untuk User Aktif
} from "@tabler/icons-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
// Impor tipe data yang sudah ada
// import { Product } from './path-to-product-type';
// import { Material } from './path-to-material-type';
// import { DiscountVoucher } from './path-to-discount-type';
// import { User } from './path-to-user-type';

// --- Definisi Tipe Data (ulangi jika tidak diimpor) ---
interface Product {
  product: string;
  name: string;
  price: number;
  totalAmount: number;
  imageUrl: string;
  description: string;
}

interface Material {
  id: string;
  name: string;
  supplier?: string;
  stock: number;
  unit: string;
  pricePerUnit: number;
  description?: string;
}

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

interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: "admin" | "staff" | "customer";
  status: "active" | "inactive" | "suspended";
  lastLogin?: string;
}

// --- Data Dummy (gunakan data yang sudah ada atau definisikan di sini) ---
const initialProductsData: Product[] = [
  {
    product: "KUE001",
    name: "Black Forest Klasik",
    price: 250000,
    totalAmount: 5,
    imageUrl: "...",
    description: "...",
  },
  {
    product: "KUE002",
    name: "Red Velvet Cupcakes",
    price: 120000,
    totalAmount: 30,
    imageUrl: "...",
    description: "...",
  },
  {
    product: "KUE003",
    name: "Nastar Premium",
    price: 150000,
    totalAmount: 8,
    imageUrl: "...",
    description: "...",
  },
];

const initialMaterialsData: Material[] = [
  {
    id: "BB001",
    name: "Tepung Terigu",
    supplier: "PT Boga Sari",
    stock: 50,
    unit: "kg",
    pricePerUnit: 12500,
  },
  {
    id: "BB002",
    name: "Gula Pasir",
    supplier: "CV Manis",
    stock: 7,
    unit: "kg",
    pricePerUnit: 16000,
  },
  {
    id: "BB003",
    name: "Mentega Tawar",
    supplier: "PT Dairy Farm",
    stock: 20,
    unit: "kg",
    pricePerUnit: 85000,
  },
];

const initialDiscountsData: DiscountVoucher[] = [
  {
    id: "HEMAT20",
    name: "Diskon Akhir Pekan 20%",
    type: "percentage",
    value: 20,
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
    startDate: "2025-05-01",
    endDate: "2025-06-30",
    status: "active",
  },
  {
    id: "EXPIRED01",
    name: "Promo Lama",
    type: "fixed_amount",
    value: 10000,
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    status: "expired",
  },
];

const initialUsersData: User[] = [
  {
    id: "USR001",
    username: "adminutama",
    fullName: "Admin Utama",
    email: "admin@example.com",
    role: "admin",
    status: "active",
  },
  {
    id: "USR002",
    username: "budisetia",
    fullName: "Budi Setiawan",
    email: "budi@example.com",
    role: "staff",
    status: "active",
  },
  {
    id: "USR003",
    username: "citraayu",
    fullName: "Citra Ayu",
    email: "citra@example.com",
    role: "customer",
    status: "inactive",
  },
];

// --- Komponen Kartu Indikator ---
interface IndicatorCardProps {
  title: string;
  icon: React.ReactNode;
  mainValue: string | number;
  mainLabel: string;
  subValue?: string | number;
  subLabel?: string;
  colorClass?: string; // Kelas warna untuk ikon dan nilai utama
}

const IndicatorCard: React.FC<IndicatorCardProps> = ({
  title,
  icon,
  mainValue,
  mainLabel,
  subValue,
  subLabel,
  colorClass = "text-sky-600 dark:text-sky-400",
}) => {
  return (
    <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300">
          {title}
        </h3>
        <div
          className={`p-2 rounded-full bg-opacity-20 ${colorClass.replace("text-", "bg-").replace("dark:text-", "dark:bg-")}`}
        >
          {React.cloneElement(icon as React.ReactElement, {
            size: 24,
            className: colorClass,
          })}
        </div>
      </div>
      <p className={`text-3xl font-bold ${colorClass}`}>{mainValue}</p>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
        {mainLabel}
      </p>
      {subValue !== undefined && subLabel && (
        <>
          <hr className="my-2 border-neutral-200 dark:border-neutral-700" />
          <p className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
            {subValue}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-500">
            {subLabel}
          </p>
        </>
      )}
    </div>
  );
};

// --- Komponen Utama Dashboard ---
const DashboardOverviewPage: React.FC = () => {
  // Kalkulasi Indikator
  // Produk
  const totalProducts = initialProductsData.length;
  const lowStockProducts = initialProductsData.filter(
    (p) => p.totalAmount < 10
  ).length; // Stok < 10 dianggap rendah
  const totalProductValue = initialProductsData.reduce(
    (sum, p) => sum + p.price * p.totalAmount,
    0
  );

  // Bahan Baku
  const totalRawMaterials = initialMaterialsData.length;
  const lowStockRawMaterials = initialMaterialsData.filter(
    (m) => m.stock < 10
  ).length; // Stok < 10 (kg/liter/dll) dianggap rendah
  const totalRawMaterialValue = initialMaterialsData.reduce(
    (sum, m) => sum + m.stock * m.pricePerUnit,
    0
  );

  // Diskon & Voucher
  const totalDiscounts = initialDiscountsData.length;
  const activeDiscounts = initialDiscountsData.filter(
    (d) => d.status === "active"
  ).length;
  // Contoh: Voucher yang akan kadaluarsa dalam 30 hari dari sekarang (membutuhkan logika tanggal lebih canggih)
  // Untuk sederhana, kita bisa hitung yang expired
  const expiredDiscounts = initialDiscountsData.filter(
    (d) => d.status === "expired"
  ).length;

  // Pengguna
  const totalUsers = initialUsersData.length;
  const activeUsers = initialUsersData.filter(
    (u) => u.status === "active"
  ).length;
  const adminUsers = initialUsersData.filter((u) => u.role === "admin").length;

  return (
    <div className="flex flex-col gap-5 p-4 md:p-6 lg:p-8 w-full">
      <div className="flex flex-col gap-3 mb-2">
        <h1 className="bg-clip-text text-transparent text-start bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-200 dark:to-neutral-400 text-3xl md:text-4xl lg:text-5xl font-sans py-2 md:py-3 relative z-20 font-bold tracking-tight">
          Dashboard Ringkasan
        </h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Grid untuk Kartu Indikator */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <IndicatorCard
          title="Ringkasan Produk"
          icon={<IconArchive />}
          mainValue={totalProducts}
          mainLabel="Total Jenis Produk"
          subValue={
            lowStockProducts > 0
              ? `${lowStockProducts} Produk Stok Rendah`
              : "Stok Produk Aman"
          }
          subLabel={lowStockProducts > 0 ? "Segera restock!" : ""}
          colorClass="text-blue-600 dark:text-blue-400"
        />
        <IndicatorCard
          title="Status Bahan Baku"
          icon={<IconBuildingWarehouse />}
          mainValue={totalRawMaterials}
          mainLabel="Total Jenis Bahan Baku"
          subValue={`Rp${totalRawMaterialValue.toLocaleString("id-ID")}`}
          subLabel="Total Nilai Stok Bahan"
          colorClass="text-green-600 dark:text-green-400"
        />
        <IndicatorCard
          title="Diskon & Voucher"
          icon={<IconDiscount2 />}
          mainValue={activeDiscounts}
          mainLabel="Diskon/Voucher Aktif"
          subValue={`${totalDiscounts} Total Dibuat`}
          subLabel={`${expiredDiscounts} Kadaluarsa`}
          colorClass="text-orange-600 dark:text-orange-400"
        />
        <IndicatorCard
          title="Manajemen Pengguna"
          icon={<IconUsers />}
          mainValue={totalUsers}
          mainLabel="Total Pengguna Terdaftar"
          subValue={`${activeUsers} Pengguna Aktif`}
          subLabel={`${adminUsers} Admin`}
          colorClass="text-purple-600 dark:text-purple-400"
        />
      </div>

      {/* Anda bisa menambahkan bagian lain di sini, seperti:
          - Grafik ringkasan penjualan (membutuhkan data transaksi)
          - Daftar produk terlaris
          - Notifikasi penting
          - Pintasan ke halaman manajemen lainnya
      */}
      <div className="mt-8 p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-neutral-700 dark:text-neutral-300">
          Aktivitas Terbaru (Contoh)
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400">
          Belum ada aktivitas terbaru untuk ditampilkan. Fitur ini dapat
          menampilkan log pesanan baru, pendaftaran pengguna, atau perubahan
          stok penting.
        </p>
        {/* Contoh list aktivitas
        <ul className="space-y-2">
          <li className="text-sm text-neutral-500 dark:text-neutral-400">Produk "Black Forest Klasik" berhasil ditambahkan.</li>
          <li className="text-sm text-neutral-500 dark:text-neutral-400">User "citraayu" mengubah status menjadi aktif.</li>
        </ul>
        */}
      </div>
    </div>
  );
};

export default DashboardOverviewPage;
