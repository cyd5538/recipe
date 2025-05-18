"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { RecipeData } from "@/types/type";

interface RecipeAuthorRecipesProps {
  nickname: string;
  recipes: RecipeData[];
}

const RecipeAuthorRecipes = ({ nickname, recipes }: RecipeAuthorRecipesProps) => {
  if (!recipes || recipes.length === 0) return null;

  return (
    <div className="w-full py-4">
      <h2 className="text-2xl font-semibold mb-4">🥘 {nickname}님의 최근 레시피</h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {recipes.map((recipe) => (
            <CarouselItem key={recipe.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <Link href={`/recipe?id=${recipe.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative w-full aspect-video">
                      <Image
                        src={recipe.thumbnail_url as string}
                        alt={recipe.title}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="p-4">
                    <div className="w-full">
                      <h3 className="font-semibold line-clamp-2">{recipe.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        조회수 {recipe.views} • 좋아요 {recipe.likes_count}
                      </p>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default RecipeAuthorRecipes; 