import CheckoutConfirmationPage from "@/modules/chekcout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/shop/checkout/")({
  component: CheckoutConfirmationPage,
});
