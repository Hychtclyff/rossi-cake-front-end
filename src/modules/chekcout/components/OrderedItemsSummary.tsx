import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";

export const OrderedItemsSummary = ({
  cartItems,
}: {
  cartItems: CartItem[];
}) => (
  <Card>
    <CardHeader>
      <CardTitle>
        <Package size={20} className="text-sky-600" />
        Ringkasan Pesanan
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-start gap-4">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="h-16 w-16 rounded-md object-cover flex-shrink-0"
            />
            <div className="flex-grow">
              <p className="font-semibold text-sm leading-snug">{item.name}</p>
              <p className="text-xs text-slate-500">Jumlah: {item.quantity}</p>
            </div>
            <p className="text-sm font-medium text-right">
              Rp{(item.price * item.quantity).toLocaleString("id-ID")}
            </p>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);
