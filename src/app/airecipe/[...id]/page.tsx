"use client";

import Header from "@/components/layout/header/Header";
import { useAiRecipeById } from "@/hooks/useAiRecipeById";
import { use } from "react";
import AiRecipeHeader from "@/components/airecipe/AiRecipeHeader";
import AiRecipeDescription from "@/components/airecipe/AiRecipeDescription";
import AiRecipeIngredients from "@/components/airecipe/AiRecipeIngredients";
import AiRecipeSteps from "@/components/airecipe/AiRecipeSteps";
import RecipeComment from "@/components/recipe/comment/RecipeComment";

interface PageProps {
  params: Promise<{
    id: string[];
  }>;
}

export default function RecipeDetail({ params }: PageProps) {
  const resolvedParams = use(params);
  const recipeId = resolvedParams.id?.[0];
  const { recipe, isLoading, error } = useAiRecipeById(recipeId);
  const recipeData = recipe as any;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-[60vh]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-[60vh]">
            <p className="text-red-500 text-xl">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {recipeData && (
          <>
            <AiRecipeHeader
              title={recipeData.title}
              content={recipeData.content}
              category={recipeData.category}
              difficulty={recipeData.difficulty}
              cookTime={recipeData.cook_time}
              materialPrice={recipeData.material_price}
              isAiGenerated={recipeData.is_ai_generated}
              tags={recipeData.tags}
              createdAt={recipeData.created_at}
            />
            
            <AiRecipeDescription 
              description={recipeData.description || recipeData.prompt} 
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <AiRecipeIngredients ingredients={recipeData.ingredients} />
              <AiRecipeSteps steps={recipeData.steps} />
            </div>

          </>
        )}
      </div>
    </div>
  );
}
