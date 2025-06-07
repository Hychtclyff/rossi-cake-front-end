import React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GridItem from "@/components/GridItem";
import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { GuestLayouts } from "@/components/Layouts/GuestLayout";
import HomePage from "@/modules/Dashboard";

export const Route = createLazyFileRoute("/")({
  component: HomePage,
});
