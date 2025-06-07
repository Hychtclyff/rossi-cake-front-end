import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Edit3 } from "lucide-react";
// import { ShippingAddress } from '@/types/shop'; // Jika tipe dipisah

interface ShippingAddressReviewProps {
  address: ShippingAddress;
  onChangeAddress: () => void;
}

const ShippingAddressReview: React.FC<ShippingAddressReviewProps> = ({
  address,
  onChangeAddress,
}) => {
  return (
    <Card className="shadow-sm dark:border-neutral-700">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-red-500" />
          <CardTitle className="text-lg">Alamat Pengiriman</CardTitle>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={onChangeAddress}
        >
          <Edit3 className="h-3 w-3 mr-1.5" /> Ubah
        </Button>
      </CardHeader>
      <CardContent className="text-sm text-neutral-700 dark:text-neutral-300 space-y-1">
        <p className="font-semibold">
          {address.recipientName} ({address.phone})
        </p>
        <p>{address.addressLine1}</p>
        <p>
          {address.city}, {address.province} {address.postalCode}
        </p>
        {address.isDropshipper && (
          <p className="text-xs text-sky-600 dark:text-sky-400 mt-1">
            Dikirim sebagai dropshipper: {address.dropshipperName}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ShippingAddressReview;
