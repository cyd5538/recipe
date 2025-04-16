import { useEffect, useState } from "react";
import { fetchLikedRecipes } from "@/lib/userService";
import { RecipeData } from "@/types/type";

export const useLikedRecipes = (userId: string | null) => {
  const [recipes, setRecipes] = useState<RecipeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchLikedRecipes(userId);
        if (result.error) {
          setError(result.error);
        } else if (result.data) {
          setRecipes(result.data);
        }
      } catch (err) {
        setError("좋아요한 레시피를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return { recipes, loading, error };
};
