// src/app/user/account/RouteComponent.tsx
"use client"; // Jika menggunakan Next.js App Router

import React, { JSX, ReactNode } from "react"; // useState tidak lagi dibutuhkan di sini jika default tab sudah cukup
import { GuestLayouts } from "@/components/Layouts/GuestLayout";
import { FloatingDock } from "@/components/ui/floating-dock"; // Asumsi path ini benar
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import AccountNavigation from "./AccountNavigation";
import DisplayEditProfile from "./DisplayEditProfile";
import DisplayBooking from "./DisplayBooking";
import DisplayNotification from "./DisplayNotification";
import DisplayVoucher from "./DisplayVoucher";
import {
  IconBasket,
  IconDiscount,
  IconNotification,
  IconUser,
} from "@tabler/icons-react";
// Impor komponen-komponen yang sudah dipisah

// Definisikan tipe untuk link jika belum ada secara global
interface NavLinkItem {
  title: string;
  value: string; // Digunakan untuk TabsTrigger dan TabsContent value
  icon: JSX.Element;
  href?: string; // Opsional, mungkin tidak digunakan jika Tabs yang mengontrol navigasi
}

// Komponen wrapper sederhana untuk konten Tab, bisa juga di-inline
const DisplayWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Card className="h-full w-full shadow-none border-0 md:border md:shadow-sm dark:border-neutral-700">
      {children}
    </Card>
  );
};

const Users = () => {
  // Data links sekarang didefinisikan di sini agar bisa di-pass
  const accountLinks: NavLinkItem[] = [
    {
      title: "Profil Saya",
      value: "editProfile",
      icon: <IconUser />,
    },
    {
      title: "Pesanan Saya",
      value: "orders",
      icon: <IconBasket />,
    },
    {
      title: "Notifikasi",
      value: "notifications",
      icon: <IconNotification />,
    },
    {
      title: "Voucher Saya",
      value: "voucher",
      icon: <IconDiscount />,
    },
  ];

  // Contoh data pengguna untuk AccountNavigation
  const currentUserData = {
    name: "Budi Perkasa",
    address: "Jl. Merdeka No. 17, Jakarta",
    avatarUrl: "https://github.com/shadcn.png", // Ganti dengan URL avatar pengguna
  };

  const handleUserLogout = () => {
    console.log("User logged out");
    // Implementasi logika logout (hapus token, redirect ke login, dll.)
  };

  return (
    <GuestLayouts>
      <div className="container mt-10 md:mt-12 mx-auto px-2 sm:px-4 md:px-8 lg:px-12 py-8 md:py-10">
        <Tabs
          defaultValue="editProfile"
          className="w-full relative flex flex-col md:flex-row gap-4 lg:gap-6"
        >
          {/* Navigasi Desktop (Sidebar) */}
          <div className="navigation hidden md:block md:w-1/4 lg:w-1/5 shrink-0">
            <AccountNavigation
              links={accountLinks}
              userData={currentUserData}
              onLogout={handleUserLogout}
            />
          </div>

          {/* Konten Tab */}
          <div className="display w-full md:w-3/4 lg:w-4/5 h-auto md:min-h-[calc(100vh-10rem)]">
            {" "}
            {/* min-h untuk desktop */}
            <DisplayWrapper>
              {" "}
              {/* Wrapper Card untuk semua TabsContent */}
              <TabsContent value="editProfile" className="mt-0">
                <DisplayEditProfile />
              </TabsContent>
              <TabsContent value="orders" className="mt-0">
                <DisplayBooking />
              </TabsContent>
              <TabsContent value="notifications" className="mt-0">
                <DisplayNotification />
              </TabsContent>
              <TabsContent value="voucher" className="mt-0">
                <DisplayVoucher />
              </TabsContent>
            </DisplayWrapper>
          </div>

          {/* Navigasi Mobile (Floating Dock) */}
          {/* FloatingDock muncul di bagian bawah pada layar kecil */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 h-20 pb-envSafe flex items-center justify-center z-50">
            {/* Background untuk area FloatingDock agar tidak transparan */}
            <div className="absolute bottom-0 left-0 right-0 h-full bg-background/80 dark:bg-neutral-900/80 backdrop-blur-sm border-t dark:border-neutral-700"></div>
            <FloatingDock
              items={accountLinks.map((link) => ({
                // FloatingDock mungkin perlu format item berbeda
                label: link.title,
                icon: React.cloneElement(link.icon, { className: "w-5 h-5" }), // Sesuaikan styling ikon untuk dock
                value: link.value, // Pastikan FloatingDock menggunakan ini untuk TabsTrigger
                // onClick: () => {} // Jika FloatingDock tidak otomatis trigger Tabs
              }))}
              // Anda mungkin perlu TabsList dan TabsTrigger di sini jika FloatingDock tidak menanganinya
              // Contoh: Ganti FloatingDock dengan TabsList horizontal sederhana untuk mobile
              className="relative z-10" // className untuk FloatingDock itu sendiri
            />
            {/* Jika FloatingDock tidak terintegrasi dengan Tabs, Anda perlu TabsList di sini:
            <TabsList className="flex justify-around items-center p-1 bg-transparent h-full w-full max-w-md mx-auto relative z-10">
                {accountLinks.map(link => (
                    <TabsTrigger key={link.value} value={link.value} className="flex flex-col items-center justify-center h-full p-1 data-[state=active]:text-primary">
                        {React.cloneElement(link.icon, {className: "w-5 h-5 mb-0.5"})}
                        <span className="text-xs">{link.title}</span>
                    </TabsTrigger>
                ))}
            </TabsList>
            */}
          </div>
        </Tabs>
      </div>
    </GuestLayouts>
  );
};

export default Users; // Ekspor default jika ini file RouteComponent.tsx
