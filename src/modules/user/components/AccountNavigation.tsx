// src/app/user/account/components/AccountNavigation.tsx
import React, { JSX } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

// Tipe untuk item link bisa didefinisikan di sini atau diimpor dari file types
interface NavLinkItem {
  title: string;
  value: string;
  icon: JSX.Element;
  href?: string; // href opsional
}

interface AccountNavigationProps {
  links: NavLinkItem[];
  // Anda mungkin ingin menambahkan props lain seperti data user untuk ditampilkan
  userData?: {
    name: string;
    address: string;
    avatarUrl: string;
  };
  onLogout: () => void; // Fungsi untuk menangani logout
}

const AccountNavigation: React.FC<AccountNavigationProps> = ({
  links,
  userData,
  onLogout,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-3 items-center">
          <Avatar>
            <AvatarImage
              src={userData?.avatarUrl || "https://github.com/shadcn.png"}
            />
            <AvatarFallback>
              {userData?.name
                ? userData.name.substring(0, 2).toUpperCase()
                : "US"}
            </AvatarFallback>
          </Avatar>
          <h3>{userData?.name || "Pengguna"}</h3>
        </CardTitle>
        <CardDescription>
          {userData?.address || "Alamat belum diatur."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TabsList className="flex flex-col gap-2 justify-start items-start h-auto bg-transparent p-0">
          {links.map((link) => (
            <TabsTrigger
              key={link.value}
              value={link.value}
              className="flex gap-3 items-center justify-start w-full px-3 py-2 data-[state=active]:bg-muted data-[state=active]:shadow-sm hover:bg-muted/50"
              // Styling di atas adalah contoh, sesuaikan dengan tema Anda
            >
              {React.cloneElement(link.icon, {
                className:
                  "w-5 h-5 text-muted-foreground group-data-[state=active]:text-foreground",
              })}
              <span>{link.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </CardContent>
      <CardFooter className="border-t pt-4 mt-4 flex justify-end">
        <button
          onClick={onLogout}
          className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md transition duration-200 shadow-sm"
        >
          Log Out
        </button>
      </CardFooter>
    </Card>
  );
};

export default AccountNavigation;
