"use client"

import { useRecentRecipes } from "@/hooks/useRecentRecipes";
import RecipeCarousel from "./RecipeCarousel";
import Loading from "@/components/ui/loading";

const RecentlyViewed = () => {
  const { recentRecipes, isLoading } = useRecentRecipes();

  return (
    <div className='mt-4 flex flex-col gap-4 border dark:bg-zinc-800 dark:text-white bg-white text-black p-6 rounded-xl shadow-md dark:border-[1px]'>
      <div className='flex justify-between items-center font-semibold'>
        <div>최근 본 레시피</div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-pulse"><Loading /></div>
        </div>
      ) : (
        <RecipeCarousel recipes={recentRecipes} />
      )}
    </div>
  );
};

export default RecentlyViewed;