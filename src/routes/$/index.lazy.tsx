import NotFoundPage from "@/modules/notFound";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/$/")({
  component: NotFoundPage,
});
