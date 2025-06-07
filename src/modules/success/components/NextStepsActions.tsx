// src/app/order-success/components/NextStepsActions.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Home, PackageSearch } from "lucide-react";
import { Link } from "@tanstack/react-router"; // Gunakan Link dari router Anda

interface NextStepsActionsProps {
  orderId: string;
}

export const NextStepsActions: React.FC<NextStepsActionsProps> = ({
  orderId,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
      <Link to="/user/account" search={{ tab: "orders" }}>
        {" "}
        {/* Contoh navigasi ke riwayat pesanan */}
        <Button variant="outline" className="w-full sm:w-auto">
          <PackageSearch className="mr-2 h-4 w-4" />
          Lihat Riwayat Pesanan
        </Button>
      </Link>
      <Link to="/shop">
        <Button className="w-full sm:w-auto">
          <Home className="mr-2 h-4 w-4" />
          Kembali ke Toko
        </Button>
      </Link>
    </div>
  );
};
