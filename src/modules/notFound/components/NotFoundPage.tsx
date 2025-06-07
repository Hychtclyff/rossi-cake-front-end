// src/components/pages/NotFoundPage.tsx
import React from "react";
import { Home } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FallenCakeIcon } from "./icons/FallenCakeIcon";
import { Link } from "@tanstack/react-router";

/**
 * Halaman 404 Not Found dengan tema e-commerce kue.
 */
export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950 p-4">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader>
          <FallenCakeIcon className="mx-auto" />
          <CardTitle className="mt-6 text-3xl font-bold tracking-tight text-gray-800 dark:text-gray-100">
            Ups! Kuenya Jatuh!
          </CardTitle>
          <CardDescription className="mt-2 text-base text-gray-600 dark:text-gray-400">
            404 | Halaman Tidak Ditemukan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 dark:text-gray-400">
            Maaf, halaman yang Anda cari tidak ada. Mungkin resepnya hilang atau
            sudah tidak diproduksi lagi.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Kembali ke Beranda
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
