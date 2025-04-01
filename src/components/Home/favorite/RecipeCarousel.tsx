"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/shared/carousel";
import { RecipeLocalStorage } from "@/types/type";
import RecipeCarouselItem from "./RecipeCarouselItem";

type RecipeCarouselProps = {
  recipes: RecipeLocalStorage[];
}

const RecipeCarousel = ({ recipes }: RecipeCarouselProps) => {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        최근 본 레시피가 없습니다.
      </div>
    );
  }
  
  return (
    <Carousel>
      <CarouselContent>
        {recipes.map((recipe, index) => (
          <CarouselItem key={index} className="basis-full">
            <RecipeCarouselItem 
              recipe={recipe} 
              priority={index < 2} 
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='border dark:bg-zinc-900 dark:text-white bg-white text-black left-[-20px]' />
      <CarouselNext className='border dark:bg-zinc-900 dark:text-white bg-white text-black right-[-20px]' />
    </Carousel>
  );
};

export default RecipeCarousel;