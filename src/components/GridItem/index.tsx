import React from 'react';
import { GlowingEffect } from "../ui/glowing-effect"; // Path ke GlowingEffect Anda

// 1. Interface props diubah: `icon` diganti dengan `imageUrl`
interface GridItemProps {
  area: string; // Prop 'area' untuk layout grid tetap dipertahankan
  imageUrl: string; // Prop baru untuk URL gambar
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, imageUrl, title, description }: GridItemProps) => {
  return (
    // Gunakan 'group' untuk efek hover pada elemen anak
    <li className={`group min-h-[14rem] list-none rounded-2.5xl md:rounded-3xl overflow-hidden ${area}`}>
      {/* Container utama sekarang menjadi 'relative' untuk menampung gambar absolut.
        Padding dan border yang sebelumnya ada di div dalam sekarang dipindahkan ke sini jika diperlukan,
        atau kita buat gambar mengisi penuh hingga ke sudut. Untuk efek terbaik, kita akan buat gambar mengisi penuh.
      */}
      <div className="relative h-full w-full">

        {/* Efek glow tetap ada dan akan bekerja di atas seluruh area item */}
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />

        {/* Gambar sebagai Latar Belakang */}
        <img
          src={imageUrl}
          alt={title}
          loading="lazy" // Penting untuk performa
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" // Efek zoom saat hover
        />

        {/* Overlay gradien gelap untuk memastikan teks mudah dibaca */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

        {/* Konten Teks di Atas Gambar dan Overlay */}
        <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8 text-white">
          {/* Ikon yang sebelumnya ada di atas sekarang dihilangkan, diganti gambar. */}
          <div className="space-y-2">
            <h3 className="pt-0.5 text-2xl/[1.3] font-bold font-sans -tracking-wide md:text-3xl/[1.2] text-balance shadow-md">
              {title}
            </h3>
            <div className="font-sans text-base/[1.5] text-neutral-200 max-w-sm">
              {description}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default GridItem;