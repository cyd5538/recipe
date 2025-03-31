import { useEffect, useState } from "react";
import { fetchUserById, fetchUserRecipes } from "@/lib/userService";
import { RecipeData, User } from "@/types/type";

export const useUserData = (userId: string | null) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [userRecipes, setUserRecipes] = useState<RecipeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const userResult = await fetchUserById(userId);
        const recipesResult = await fetchUserRecipes(userId);

        if (userResult.error) {
          setError(userResult.error);
        } else if (userResult.data) {
          setUserData(userResult.data);
        }

        if (recipesResult.error) {
          setError(recipesResult.error);
        } else if (recipesResult.data) {
          setUserRecipes(recipesResult.data);
        }
      } catch (err) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return { userData, userRecipes, loading, error };
};
