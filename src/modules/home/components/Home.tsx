// src/features/home/HomePage.tsx

import { GuestLayouts } from "@/components/Layouts/GuestLayout";
import { HeroSection } from "./HeroSection";
import { CategoriesSection } from "./CategoriesSection";
import { NewArrivalsSection } from "./NewArrivalsSection";
import { FeaturesSection } from "./FeaturesSection";
import { PromotionsSection } from "./PromotionsSection";

export function HomePage() {
  return (
    <GuestLayouts>
      <div className="container mx-auto px-4 sm:px-10 lg:px-28 pt-24 flex flex-col gap-10 m">
        <HeroSection />
        <CategoriesSection />
        <NewArrivalsSection />
        <FeaturesSection />
        <PromotionsSection />
      </div>
    </GuestLayouts>
  );
}
