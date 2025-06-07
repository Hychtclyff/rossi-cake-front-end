import OrderSuccessPage from "@/modules/success";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/shop/checkout/order-success/$orderId"
)({
  component: OrderSuccessPage,
});
