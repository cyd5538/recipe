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

const Home = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { recipe, user, loading, error } = useFetchRecipeById(id as string);

  if (loading) return <Loading />;
  if (error || !id || !recipe || !user) return <div>{error || "레시피를 찾을 수 없습니다."}</div>;

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
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
