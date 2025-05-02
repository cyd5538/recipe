"use client";

import Header from "@/components/layout/header/Header";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/client";
import Loading from "@/components/ui/loading";
import { AiRecipe } from "@/types/type";
import AiRecipeCard from "@/components/airecipe/AiRecipeCard";

const AiRecipePage = () => {
  const [recipes, setRecipes] = useState<AiRecipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("ai_recipes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("레시피 불러오기 실패:", error);
        return;
      }

      setRecipes(data || []);
      setLoading(false);
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <Loading className="w-full h-screen flex justify-center items-center" />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-2xl font-bold mb-6">AI 레시피 목록</h1>
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