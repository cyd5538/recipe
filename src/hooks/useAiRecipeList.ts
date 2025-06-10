import { useState, useEffect } from "react";
import { AiRecipe } from "@/types/type";
import { aiRecipeService } from "@/lib/aiRecipeService";

export const useAiRecipeList = (initialPage: number = 1) => {
  const [recipes, setRecipes] = useState<AiRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchRecipes(page);
  }, [page]);

  const fetchRecipes = async (page: number) => {
    try {
      setLoading(true);
      const { data, totalPages, total } = await aiRecipeService.getRecipes(page);
      setRecipes(data);
      setTotalPages(totalPages);
      setTotal(total);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("레시피를 불러오는데 실패했습니다."));
      console.error("레시피 불러오기 실패 -->", err);
    } finally {
      setLoading(false);
    }
  };

  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return {
    recipes,
    loading,
    error,
    page,
    totalPages,
    total,
    goToPage,
    goToNextPage: () => goToPage(page + 1),
    goToPrevPage: () => goToPage(page - 1),
  };
};
