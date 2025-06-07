import { createLazyFileRoute } from "@tanstack/react-router";

import ShopPage from "@/modules/shop";

export const Route = createLazyFileRoute("/shop/")({
  component: ShopPage,
});
