"use client";

import { createLazyFileRoute } from "@tanstack/react-router";
import Admin from "@/modules/Admin";

export const Route = createLazyFileRoute("/admin/")({
  component: Admin,
});

