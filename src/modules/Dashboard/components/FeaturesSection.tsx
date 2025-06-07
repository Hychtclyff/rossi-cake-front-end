import GridItem from "@/components/GridItem";
import { Box, Lock, Sparkles } from "lucide-react";

export const FeaturesSection = () => {
  return (
    <>
      <div className="flex flex-col gap-5 justify-center items-center">
        <div className="list-categories ">
          <ul className="grid grid-cols-1 grid-rows-4 gap-4  md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem]  xl:grid-rows-2   ">
            <GridItem
              // area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
              area="md:[grid-area:1/1/1/7] xl:[grid-area:1/1/6/8]   "
              icon={
                <Box className="h-4 w-4 text-black dark:text-neutral-400" />
              }
              title="Produk Rossi CAke"
              description="Running out of copy so I'll write anything."
            />

            <GridItem
              area="md:[grid-area:2/1/2/7] xl:[grid-area:1/8/3/13]    "
              icon={
                <Lock className="h-4 w-4 text-black dark:text-neutral-400" />
              }
              title="Rossi Cake"
              description="It's the best money you'll ever spend"
            />

            <GridItem
              // area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
              area="md:[grid-area:1/7/3/12] xl:[grid-area:3/8/6/13]   "
              icon={
                <Sparkles className="h-4 w-4 text-black dark:text-neutral-400" />
              }
              title="Rossi Drinks"
              description="I'm not even kidding. Ask my mom if you don't believe me."
            />
          </ul>
        </div>
      </div>
    </>
  );
};
