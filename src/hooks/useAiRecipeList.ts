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
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const response = await aiRecipeService.getRecipes(page);
        setRecipes(response.data);
        setTotalPages(response.totalPages);
        setTotal(response.total);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("레시피를 불러오는데 실패했습니다."));
        console.error("레시피 불러오기 실패 -->", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [page]);

  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const goToNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const goToPrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
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
    goToNextPage,
    goToPrevPage,
  };
}; 