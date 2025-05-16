import { useState, useEffect } from 'react';
import { getAiRecipesByUserId } from '@/lib/aiRecipeService'; 
import { AiRecipe } from '@/types/type';



const useUserAiRecipes = (userId: string | null) => {
  const [data, setData] = useState<AiRecipe[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    const fetchAiRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        const recipes = await getAiRecipesByUserId(userId);
        setData(recipes as AiRecipe[]); 
      } catch (err) {
        console.error("Failed to fetch AI recipes:", err);
        setError("레시피를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchAiRecipes();
  }, [userId]);

  return { data, loading, error };
};

export default useUserAiRecipes; 