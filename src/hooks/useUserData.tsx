import { useEffect, useState } from "react";
import { fetchUserById, fetchUserRecipes, fetchUserCoin } from "@/lib/userService";
import { RecipeData, User, UserCoin } from "@/types/type";

export const useUserData = (userId: string | null) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [userRecipes, setUserRecipes] = useState<RecipeData[]>([]);
  const [userCoin, setUserCoin] = useState<UserCoin | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [userResult, recipesResult, coinResult] = await Promise.all([
          fetchUserById(userId),
          fetchUserRecipes(userId),
          fetchUserCoin(userId),
        ]);

        if (userResult.error) setError(userResult.error);
        else if (userResult.data) setUserData(userResult.data);

        if (recipesResult.error) setError(recipesResult.error);
        else if (recipesResult.data) setUserRecipes(recipesResult.data);

        if (coinResult.error) {
          if (coinResult.error.message.includes('JSON object requested, multiple (or no) rows returned')) {
            setError('사용자 코인 정보를 찾을 수 없습니다.');
          } else {
            setError(coinResult.error.message);
          }
        }
        else if (coinResult.data) setUserCoin(coinResult.data);

      } catch (err) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return { userData, userRecipes, userCoin, loading, error };
};
