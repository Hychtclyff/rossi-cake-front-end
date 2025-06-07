import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { promotionsData } from "@/data/home/data";

export const PromotionsSection = () => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center py-10">
      {" "}
      {/* Added some vertical padding to the section */}
      <h1 className="text-center font-semibold text-3xl">Promo</h1>
      <Carousel
        opts={{
          align: "start",
          loop: true, // Added loop for a better carousel experience
        }}
        className="w-full max-w-6xl px-4" // Added max-width and horizontal padding for better responsiveness
      >
        <CarouselContent className="border-none">
          {promotionsData.map((item) => (
            <CarouselItem
              key={item.id}
              className="md:basis-1/2 lg:basis-1/3 border-none py-10"
            >
              <div className="p-1 h-full">
                {" "}
                {/* Added h-full to ensure consistent card height if needed */}
                <Card className="h-full flex flex-col">
                  {" "}
                  {/* Added h-full and flex structure for consistent card height */}
                  <CardHeader className="p-4">
                    {" "}
                    {/* Adjusted padding */}
                    <CardTitle className="text-xl">
                      {item.productName}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 flex-grow flex flex-col md:flex-row gap-4 items-center">
                    {" "}
                    {/* Adjusted padding and flex-grow */}
                    <div className="md:w-2/5 w-full flex-shrink-0">
                      <img
                        src={item.imageUrl}
                        alt={item.imageAlt}
                        className="w-full h-48 md:h-full object-cover rounded-md" // Adjusted height and object-fit
                      />
                    </div>
                    <div className="md:w-3/5 w-full flex flex-col gap-3 items-start justify-center">
                      <h3 className="font-semibold text-lg text-blue-600 dark:text-blue-400">
                        {item.promoTitle}
                      </h3>{" "}
                      {/* Example: Emphasized promo title */}
                      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                        {" "}
                        {/* Example: line-clamp for consistent text length */}
                        {item.description}
                      </p>
                      <button className="mt-auto bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block">
                        <span className="absolute inset-0 overflow-hidden rounded-full">
                          <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        </span>
                        <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-2 px-4 ring-1 ring-white/10">
                          {" "}
                          {/* Adjusted padding for button */}
                          <span>Claim Sekarang</span>
                          <svg
                            fill="none"
                            height="16"
                            viewBox="0 0 24 24"
                            width="16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.75 8.75L14.25 12L10.75 15.25"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                            />
                          </svg>
                        </div>
                        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-2 md:ml-0" />{" "}
        {/* Adjusted positioning for smaller screens */}
        <CarouselNext className="mr-2 md:mr-0" />{" "}
        {/* Adjusted positioning for smaller screens */}
      </Carousel>
    </div>
  );
};
