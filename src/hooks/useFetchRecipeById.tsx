"use client";

import { createClient } from "@/lib/client";
import { RecipeData, User } from "@/types/type";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const useFetchRecipeById = (id: string, userId?: string) => {
  const router = useRouter();
  const supabase = createClient();
  
  const [recipe, setRecipe] = useState<RecipeData | null>(null);
  const [user, setUser] = useState<User | null>(null); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; 

    const fetchRecipeById = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data: recipeData, error: recipeError } = await supabase
          .from("recipes")
          .select("*")
          .eq("id", id)
          .single();
        
        if (recipeError || !recipeData) {
          router.replace("/"); // 유효하지 않은 ID면 홈으로
          return;
        }

        // ✅ 태그 데이터 가져오기
        const { data: tagRelations, error: tagError } = await supabase
          .from("recipe_tags")
          .select("tag_id")
          .eq("recipe_id", id);

        if (tagError) console.error("Tag fetch error:", tagError.message);

        let tags: string[] = [];
        if (tagRelations && tagRelations.length > 0) {
          const tagIds = tagRelations.map((rel) => rel.tag_id);
          const { data: tagData, error: tagsError } = await supabase
            .from("tags")
            .select("name")
            .in("id", tagIds);
          if (tagsError) console.error("Tag fetch error:", tagsError.message);
          else tags = tagData.map((tag) => tag.name);
        }

        setRecipe({ ...recipeData, tags });

        // 좋아요 개수 가져오기
          const { count: likesCount } = await supabase
          .from("recipe_likes")
          .select("*", { count: "exact", head: true })
          .eq("recipe_id", id);

        setRecipe({
          ...recipeData,
          tags,
          likesCount: likesCount || 0,
        });
        
        // 작성자 정보 가져오기
        if (recipeData.user_id) {
          const { data: userData, error: userError } = await supabase
            .from("users")
            .select("*")
            .eq("id", recipeData.user_id)
            .single();
          
          if (userError) console.error(userError.message);
          else setUser(userData);
        }

        // 조회 수 증가
        // 본인 글에는 조회수 증가지 않는 조건
        if (recipeData.user_id !== userId) {
          const { error } = await supabase
            .from("recipes")
            .update({ views: recipeData.views + 1 }) 
            .eq("id", id);
        
          if (error) console.error("views fail error:", error.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError("예상치 못한 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeById();
  }, []); 

  return { recipe, user, loading, error }; 
};
