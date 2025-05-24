import { useState, useEffect } from "react";
import { createClient } from "@/lib/client";
import { AiRecipe } from "@/types/type";

export const useAiRecipeList = () => {
  const [recipes, setRecipes] = useState<AiRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("ai_recipes")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        setRecipes(data || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("레시피를 불러오는데 실패했습니다."));
        console.error("레시피 불러오기 실패 -->", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return { recipes, loading, error };
}; 