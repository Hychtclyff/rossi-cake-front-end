import GridItem from "@/components/GridItem";
import { categoryData } from "@/data/Banner";

export const CategoriesSection = () => {
  return (
    <div className="flex flex-col gap-6 justify-center items-center py-10">
      <h1 className="text-center font-bold text-4xl text-neutral-800 dark:text-neutral-100">
        Kategori Pilihan
      </h1>

      {/* Layout Grid yang Lebih Sederhana */}
      {/* Grid akan menjadi 1 kolom di mobile, dan layout mozaik di desktop */}
      <div className="w-full max-w-6xl mx-auto px-4">
        <ul className="grid grid-cols-1 md:grid-cols-11 md:grid-rows-2 gap-4 h-[35rem] md:h-[30rem]">
          {categoryData.map((item) => (
            <GridItem
              key={item.title}
              title={item.title}
              description={item.description}
              imageUrl={item.imageUrl}
              area={item.className}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
