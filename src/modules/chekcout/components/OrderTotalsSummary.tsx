import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Package, MessageSquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";
// import { CartItem } from '@/types/shop';

interface OrderedItemsSummaryProps {
  cartItems: CartItem[];
  useDamageProtection: boolean;
  onDamageProtectionChange: (checked: boolean) => void;
  orderNotes: string;
  onOrderNotesChange: (notes: string) => void;
  damageProtectionCostPerItemType: number;
}

const OrderedItemsSummary: React.FC<OrderedItemsSummaryProps> = ({
  cartItems,
  useDamageProtection,
  onDamageProtectionChange,
  orderNotes,
  onOrderNotesChange,
  damageProtectionCostPerItemType,
}) => {
  const totalDamageProtectionCost = useDamageProtection
    ? damageProtectionCostPerItemType * cartItems.length
    : 0;

  return (
    <Card className="shadow-sm dark:border-neutral-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Package size={20} /> Produk Dipesan
        </CardTitle>
      </CardHeader>
      <CardContent>
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 py-3 border-b dark:border-neutral-700 last:border-b-0"
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="h-16 w-16 md:h-20 md:w-20 object-cover rounded-md"
            />
            <div className="flex-grow">
              <p className="font-medium text-sm text-neutral-800 dark:text-neutral-100">
                {item.name}
              </p>
              {item.variant && (
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {item.variant}
                </p>
              )}
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                {item.quantity} x Rp{item.price.toLocaleString("id-ID")}
              </p>
            </div>
            <p className="text-sm font-medium text-neutral-800 dark:text-neutral-100">
              Rp{(item.price * item.quantity).toLocaleString("id-ID")}
            </p>
          </div>
        ))}
        <Separator className="my-3 dark:bg-neutral-700" />
        <div className="space-y-3 text-sm mt-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="damageProtection"
              checked={useDamageProtection}
              onCheckedChange={onDamageProtectionChange}
            />
            <Label
              htmlFor="damageProtection"
              className="font-normal text-neutral-700 dark:text-neutral-300"
            >
              Proteksi Kerusakan Produk (+Rp
              {totalDamageProtectionCost.toLocaleString("id-ID")})
            </Label>
          </div>
          <div className="flex items-start space-x-2">
            <MessageSquare className="h-4 w-4 mt-0.5 text-neutral-500 dark:text-neutral-400 shrink-0" />
            <Textarea
              placeholder="Tinggalkan pesan untuk penjual (opsional)..."
              value={orderNotes}
              onChange={(e) => onOrderNotesChange(e.target.value)}
              className="h-16 text-xs dark:bg-neutral-800 dark:border-neutral-600"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderedItemsSummary;
