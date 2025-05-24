"use client";

import Header from "@/components/layout/header/Header";
import Loading from "@/components/ui/loading";
import { AiRecipe } from "@/types/type";
import AiRecipeCard from "@/components/airecipe/AiRecipeCard";
import AiWriteButton from "@/components/airecipe/AiWriteButton";
import { useAiRecipeList } from "@/hooks/useAiRecipeList";

const AiRecipePage = () => {
  const { recipes, loading, error } = useAiRecipeList();

  if (loading) {
    return (
      <>
        <Header />
        <Loading className="w-full h-screen flex justify-center items-center" />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <div className="text-red-500">에러가 발생했습니다: {error.message}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">AI 레시피 목록</h1>
          <AiWriteButton />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <AiRecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AiRecipePage;