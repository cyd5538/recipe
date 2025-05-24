"use client";

import Header from "@/components/layout/header/Header";
import Loading from "@/components/ui/loading";
import AiRecipeCard from "@/components/airecipe/AiRecipeCard";
import AiWriteButton from "@/components/airecipe/AiWriteButton";
import { useAiRecipeList } from "@/hooks/useAiRecipeList";
import { RecipePagenation } from "@/components/Home/recipes/RecipePagenation";

const PAGE_SIZE = 12;

const AiRecipePage = () => {
  const {
    recipes,
    loading,
    error,
    page,
    total,
    goToPage,
  } = useAiRecipeList();

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
          <div>
            <h1 className="text-2xl font-bold">AI 레시피 목록</h1>
            <p className="text-gray-600 mt-1">총 {total}개의 레시피</p>
          </div>
          <AiWriteButton />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {recipes.map((recipe) => (
            <AiRecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
        
        <RecipePagenation
          page={page} 
          totalCount={total} 
          pageSize={PAGE_SIZE} 
          setPage={goToPage} 
        />
      </div>
    </>
  );
};

export default AiRecipePage;