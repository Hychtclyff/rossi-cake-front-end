// src/app/order-success/components/OrderSummaryCard.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ConfirmedOrder } from "@/types/order"; // Sesuaikan path

interface OrderSummaryCardProps {
  order: ConfirmedOrder;
}

export const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({
  order,
}) => {
  return (
    <Card className="w-full max-w-2xl mx-auto dark:bg-neutral-800/50 dark:border-neutral-700">
      <CardHeader>
        <CardTitle className="text-lg">Detail Pesanan Anda</CardTitle>
      </CardHeader>
      <CardContent className="text-sm space-y-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Nomor Pesanan</span>
          <span className="font-mono font-medium">{order.orderId}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tanggal Pesanan</span>
          <span className="font-medium">{order.orderDate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Metode Pembayaran</span>
          <span className="font-medium">{order.paymentMethod}</span>
        </div>
        <Separator className="my-2 dark:bg-neutral-700" />
        <div className="flex justify-between text-base font-semibold">
          <span>TOTAL PEMBAYARAN</span>
          <span>Rp{order.totalAmount.toLocaleString("id-ID")}</span>
        </div>
        <Separator className="my-2 dark:bg-neutral-700" />
        <div>
          <h4 className="font-semibold mb-2">Item yang Dipesan:</h4>
          <div className="space-y-2">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between text-xs"
              >
                <p className="text-muted-foreground">
                  {item.name}{" "}
                  <span className="font-medium">x{item.quantity}</span>
                </p>
                <p className="font-medium">
                  Rp{(item.price * item.quantity).toLocaleString("id-ID")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
