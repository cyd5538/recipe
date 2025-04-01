"use client"

import Image from 'next/image';
import Link from "next/link";
import { RecipeLocalStorage } from "@/types/type";

type RecipeCarouselItemProps = {
  recipe: RecipeLocalStorage;
  priority: boolean;
}

const RecipeCarouselItem = ({ recipe, priority }: RecipeCarouselItemProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="relative w-full h-[200px] mb-2 overflow-hidden rounded-md">
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          className="object-cover"
          quality={75}
          priority={priority}
        />
      </div>
      <Link href={`recipe?id=${recipe.id}`}>
        <div className='text-center mt-2 cursor-pointer hover:underline truncate px-2'>
          {recipe.title}
        </div>
      </Link>
    </div>
  );
};

export default RecipeCarouselItem;
