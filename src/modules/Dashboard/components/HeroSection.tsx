import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { heroImages } from "@/data/home/data";

export const HeroSection = () => {
  return (
    <div className="w-full ">
      <Carousel className="w-full  ">
        <CarouselContent>
          {heroImages.map((item, index) => (
            <CarouselItem key={index}>
              <div className="">
                <Card className=" overflow-hidden">
                  <CardContent className="  flex h-[35rem]  items-center justify-center p-0 rounded-none">
                    <img
                      src={item.src}
                      alt={item.alt || "Gambar hero section Rossi Cake"}
                      loading="lazy" // Tambahkan ini untuk performa yang lebih baik
                      className="  h-full w-full object-cover"
                      // 'absolute inset-0' -> position: absolute; top:0; right:0; bottom:0; left:0;
                      // 'h-full w-full' -> height: 100%; width: 100%;
                      // 'object-cover' -> object-fit: cover;
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
