"use client";

import React from "react";
import {
  IconArchive,          // Untuk Total Jenis
  IconAlertTriangle,    // Untuk Stok Rendah & Status Perhatian
  IconBuildingWarehouse,// Untuk Judul Panel
  IconCash,             // Untuk Nilai Stok
  IconUsers,            // Untuk Supplier
  IconCircleCheck,      // Untuk Status Aman
  IconAlertOctagon,     // Untuk Status Kritis (jika diperlukan)
} from "@tabler/icons-react";
import { cn } from "@/lib/utils"; // Asumsi Anda menggunakan cn dari Shadcn UI/utils

// Definisi Tipe Data Material (jika belum diimpor)
interface Material {
  id: string;
  name: string;
  supplier?: string;
  stock: number;
  unit: string;
  pricePerUnit: number;
  description?: string;
}

interface RawMaterialStatusPanelProps {
  materials: Material[];
}

const RawMaterialStatusPanel: React.FC<RawMaterialStatusPanelProps> = ({ materials }) => {
  const LOW_STOCK_THRESHOLD = 10; // Batas stok dianggap rendah

  const totalTypes = materials.length;
  const lowStockItems = materials.filter(m => m.stock < LOW_STOCK_THRESHOLD);
  const lowStockCount = lowStockItems.length;
  const totalValue = materials.reduce((sum, m) => sum + (m.stock * m.pricePerUnit), 0);
  const uniqueSuppliers = new Set(materials.map(m => m.supplier).filter(Boolean)).size;

  let statusText = "Stok Aman";
  let StatusIcon = IconCircleCheck;
  let statusColorClass = "text-green-400"; // Warna untuk status aman
  let panelBorderClass = "border-green-500/50";

  if (lowStockCount > 0) {
    if (lowStockCount <= 2 && totalTypes > 0) { // Misal, 1-2 item stok rendah dianggap "Perhatian"
      statusText = "Perlu Perhatian";
      StatusIcon = IconAlertTriangle;
      statusColorClass = "text-yellow-400";
      panelBorderClass = "border-yellow-500/50";
    } else { // Lebih dari 2 item stok rendah dianggap "Kritis"
      statusText = "Stok Kritis";
      StatusIcon = IconAlertOctagon; // Atau tetap IconAlertTriangle dengan warna merah
      statusColorClass = "text-red-400";
      panelBorderClass = "border-red-500/50";
    }
  } else if (totalTypes === 0) {
    statusText = "Data Kosong";
    StatusIcon = IconArchive; // Atau ikon lain yang sesuai
    statusColorClass = "text-neutral-400";
    panelBorderClass = "border-neutral-500/50";
  }


  const StatItem: React.FC<{ icon: React.ElementType; value: string | number; label?: string; itemColorClass?: string }> = ({ icon: Icon, value, label, itemColorClass }) => (
    <div className={cn("flex items-center gap-1.5", itemColorClass || "text-neutral-200")}>
      <Icon size={16} strokeWidth={1.5} />
      <span className="text-sm font-medium">{value}</span>
      {label && <span className="text-xs text-neutral-400">{label}</span>}
    </div>
  );

  return (
    <div className={cn(
        "p-3 rounded-lg shadow-md w-full max-w-2xl mx-auto",
        "bg-neutral-800/80 dark:bg-neutral-900/90 backdrop-blur-sm border",
        panelBorderClass // Border dinamis berdasarkan status
      )}
    >
      {/* Baris Status Utama */}
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-neutral-700/50">
        <div className="flex items-center gap-2 text-neutral-100">
          <IconBuildingWarehouse size={20} />
          <h3 className="font-semibold text-md">Status Bahan Baku</h3>
        </div>
        <div className={cn("flex items-center gap-1.5 font-medium text-sm", statusColorClass)}>
          <StatusIcon size={18} strokeWidth={2} />
          <span>{statusText}</span>
        </div>
      </div>

      {/* Baris Detail Indikator */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-3 gap-y-2">
        <StatItem icon={IconArchive} value={totalTypes} label="Jenis" />
        <StatItem 
          icon={IconAlertTriangle} 
          value={lowStockCount} 
          label="Stok Rendah" 
          itemColorClass={lowStockCount > 0 ? (lowStockCount <=2 ? "text-yellow-400" : "text-red-400") : "text-green-400"}
        />
        <StatItem icon={IconCash} value={`Rp${totalValue.toLocaleString('id-ID')}`} label="Nilai Stok" />
        <StatItem icon={IconUsers} value={uniqueSuppliers} label="Supplier" />
      </div>

      {/* Peringatan Stok Rendah (jika ada) */}
      {lowStockCount > 0 && (
        <div className={cn("mt-2 pt-2 border-t border-neutral-700/50 text-xs", statusColorClass === "text-red-400" ? "text-red-400" : "text-yellow-400")}>
          <p className="font-semibold">Peringatan: Terdapat {lowStockCount} bahan baku dengan stok di bawah {LOW_STOCK_THRESHOLD} unit.</p>
          <ul className="list-disc list-inside pl-1 max-h-20 overflow-y-auto">
            {lowStockItems.slice(0,3).map(item => ( // Tampilkan beberapa item pertama
              <li key={item.id}>{item.name} (Stok: {item.stock} {item.unit})</li>
            ))}
            {lowStockItems.length > 3 && <li>dan lainnya...</li>}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RawMaterialStatusPanel;