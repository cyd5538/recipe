"use client";

import { createClient } from "@/lib/client";
import { RecipeData, User } from "@/types/type";
import { useEffect, useState } from "react";

export const useFetchRecipeById = (id: string) => {
  const supabase = createClient();
  
  const [recipe, setRecipe] = useState<RecipeData | null>(null);
  const [user, setUser] = useState<User | null>(null); 
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipeById = async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // 레시피 데이터 
      const { data: recipeData, error: recipeError } = await supabase
        .from("recipes")
        .select("*")
        .eq("id", id)
        .single();
      
      if (recipeError) {
        console.error("Recipe fetch error:", recipeError.message);
        setError(recipeError.message);
        return;
      }
      
      // 태그 데이터 
      const { data: tagRelations, error: tagError } = await supabase
        .from("recipe_tags")
        .select("tag_id")
        .eq("recipe_id", id);

      if (tagError) {
        console.error("Tag fetch error:", tagError.message);
      }

      let tags: string[] = [];
      if (tagRelations && tagRelations.length > 0) {
        const tagIds = tagRelations.map((rel) => rel.tag_id);

        const { data: tagData, error: tagsError } = await supabase
          .from("tags")
          .select("name")
          .in("id", tagIds);

        if (tagsError) {
          console.error("Tags fetch error:", tagsError.message);
        } else {
          tags = tagData.map((tag) => tag.name);
        }
      }

      setRecipe({ ...recipeData, tags });

      // 레시피 작성자 정보
      if (recipeData.user_id) {
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("*")
          .eq("id", recipeData.user_id)
          .single();
        
        if (userError) {
          console.error(userError.message);
        } else {
          setUser(userData);
        }
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError("예상치 못한 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipeById();
  }, [id]);

  return { recipe, user, loading, error }; 
};
