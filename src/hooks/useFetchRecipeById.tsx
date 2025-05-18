import { createClient } from "@/lib/client";
import { RecipeData } from "@/types/type";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const useFetchRecipeById = (id: string, userId?: string) => {
  const router = useRouter();
  const supabase = createClient();
  const [recipe, setRecipe] = useState<RecipeData | null>(null);
  const [authorRecipes, setAuthorRecipes] = useState<RecipeData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchRecipeById = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data: recipeData, error: recipeError } = await supabase
          .from("recipes_with_meta")
          .select("*")
          .eq("id", id)
          .single();

        if (recipeError || !recipeData) {
          router.replace("/");
          return;
        }

        let isFavorited = false;

        // 즐겨찾기 여부 확인 (로그인한 유저 있을 때)
        if (userId) {
          const { data: favoriteData, error: favoriteError } = await supabase
            .from("favorites")
            .select("id")
            .eq("recipe_id", id)
            .eq("user_id", userId)
            .maybeSingle();

          if (favoriteError) {
            console.error("즐겨찾기 여부 확인 실패", favoriteError.message);
          }

          isFavorited = !!favoriteData;
        }

        setRecipe({
          ...recipeData,
          is_favorited: isFavorited,
        });

        // 작성자의 다른 레시피 가져오기 
        const { data: others, error: othersError } = await supabase
          .from("recipes_with_meta")
          .select("*")
          .eq("user_id", recipeData.user_id)
          .neq("id", id)
          .order("created_at", { ascending: false }) // 최신순 정렬
          .limit(5); // 최대 5개만

        if (othersError) {
          console.error("작성자 다른 글 가져오기 실패:", othersError.message);
        } else {
          setAuthorRecipes(others);
        }

        // 조회수 증가 (작성자 본인 제외)
        if (recipeData.user_id !== userId) {
          const { error } = await supabase
            .from("recipes")
            .update({ views: recipeData.views + 1 })
            .eq("id", id);

          if (error) console.error("조회수 증가 실패:", error.message);
        }
      } catch (err) {
        console.error("레시피 불러오기 실패:", err);
        setError("예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeById();
  }, [id, userId]);

  return { recipe, authorRecipes, loading, error };
};
