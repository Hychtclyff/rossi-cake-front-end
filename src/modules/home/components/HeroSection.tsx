import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { heroImages } from "@/data/Banner";

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
                      loading="lazy"
                      className="h-full w-full object-cover object-top md:object-center"
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
