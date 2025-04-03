"use client";

import Header from "@/components/layout/header/Header";
import Loading from "@/components/ui/loading";
import { useFetchRecipeById } from "@/hooks/useFetchRecipeById";
import { useSearchParams } from "next/navigation";
import RecipeHeader from "@/components/recipe/RecipeHeader";
import RecipeInfo from "@/components/recipe/RecipeInfo";
import RecipeIngredients from "@/components/recipe/RecipeIngredients";
import RecipeSteps from "@/components/recipe/RecipeSteps";
import RecipeTags from "@/components/recipe/RecipeTags";
import RecipeAuthor from "@/components/recipe/RecipeAuthor";
import RecipeContent from "@/components/recipe/RecipeContent";
import RecipeActionButtons from "@/components/recipe/RecipeActionButtons";
import { useLocalStorageArray } from "@/hooks/useLocalStorageArray";
import { useEffect } from "react";
import { RecipeLocalStorage } from "@/types/type";

const Home = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";
  const { recipe, user, loading, error } = useFetchRecipeById(id);
  const [ , addRecentRecipe] = useLocalStorageArray<RecipeLocalStorage>("recentRecipes");

  useEffect(() => {
    if (recipe && typeof recipe.thumbnail_url === "string") {
      addRecentRecipe({
        id: recipe.id,
        title: recipe.title,
        image: recipe.thumbnail_url
      });
    }
  }, [recipe]);
  
  if (loading) return <div className="h-screen w-full flex justify-center items-center"><Loading /></div>;
  if (error || !recipe || !user) return <div>{error || "레시피를 찾을 수 없습니다."}</div>;

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <RecipeActionButtons postId={recipe.id} userId={recipe.user_id}/>
        <RecipeHeader recipe={recipe} />
        <RecipeInfo recipe={recipe} />
        <RecipeIngredients ingredients={recipe.ingredients} />
        <RecipeContent content={recipe.content} /> 
        <RecipeSteps steps={recipe.steps} />
        <RecipeTags tags={recipe.tags} />
        <RecipeAuthor user={user} />
      </div>
    </>
  );
};
export default Home;
