// hooks/useAiRecipeById.ts
"use client";

import { useEffect, useState } from "react";
import { getAiRecipeById } from "@/lib/aiRecipeService";

export function useAiRecipeById(id: string | undefined) {
  const [recipe, setRecipe] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchRecipe = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await getAiRecipeById(id);
        setRecipe(result);
      } catch (err: any) {
        console.error(err);
        setError("레시피를 불러오지 못했어요.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  return { recipe, isLoading, error };
}
