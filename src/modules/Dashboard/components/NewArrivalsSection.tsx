// src/features/home/NewArrivalsSection.tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { newArrivalsData } from "@/data/home/data";
import { ProductCard } from "./ProductCard";
import { CardContent } from "@/components/ui/card";

export const NewArrivalsSection = () => {
  return (
    <div className="flex flex-col gap-6 items-center py-10">
      <h2 className="text-center font-bold text-4xl text-neutral-800 dark:text-neutral-100">
        Produk Baru Kami
      </h2>
      <Carousel
        opts={{ align: "start" }}
        className="w-full max-w-6xl overflow-hidden  "
      >
        <CarouselContent className="-ml-4 ">
          {newArrivalsData.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-4 md:basis-1/2 lg:basis-1/3 "
            >
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-2 md:ml-0" />
        <CarouselNext className="mr-2 md:mr-0" />
      </Carousel>
    </div>
  );
};
