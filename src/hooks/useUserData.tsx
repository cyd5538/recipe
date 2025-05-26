import { useEffect, useState } from "react";
import { fetchUserById, fetchUserRecipes, fetchUserCoin } from "@/lib/userService";
import { RecipeData, User, UserCoin } from "@/types/type";

interface UseUserDataResult {
  userData: User | null;
  userRecipes: RecipeData[];
  userCoin: UserCoin | null;
  loading: boolean;
  error: string | null;
}

export const useUserData = (
  userId: string | null,
  includeCoin: boolean = false
): UseUserDataResult => {
  const [userData, setUserData] = useState<User | null>(null);
  const [userRecipes, setUserRecipes] = useState<RecipeData[]>([]);
  const [userCoin, setUserCoin] = useState<UserCoin | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const userPromise = fetchUserById(userId);
        const recipePromise = fetchUserRecipes(userId);
        const coinPromise = includeCoin ? fetchUserCoin(userId) : null;

        const [userResult, recipeResult, coinResult] = await Promise.all([
          userPromise,
          recipePromise,
          includeCoin && coinPromise ? coinPromise : Promise.resolve({ data: null, error: null }),
        ]);

        if (userResult.error) {
          setError(userResult.error);
        } else if (userResult.data) {
          setUserData(userResult.data);
        }

        if (recipeResult.error) {
          setError(recipeResult.error);
        } else if (recipeResult.data) {
          setUserRecipes(recipeResult.data);
        }

        if (includeCoin && coinResult) {
          if (coinResult.error) {
            if (coinResult.error.message?.includes("JSON object requested")) {
              setError("사용자 코인 정보를 찾을 수 없습니다.");
            } else {
              setError(coinResult.error.message);
            }
          } else if (coinResult.data) {
            setUserCoin(coinResult.data);
          }
        }

      } catch (err) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, includeCoin]);

  return {
    userData,
    userRecipes,
    userCoin,
    loading,
    error,
  };
};
