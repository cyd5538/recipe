"use client";

import { createClient } from "@/lib/client";
import { useFilterStore } from "@/store/filterStore";
import { RecipeData } from "@/types/type";
import { useEffect, useState } from "react";

export const useFetchRecipe = (page: number, pageSize: number) => {
  const supabase = createClient();
  const { category, time, difficulty, price } = useFilterStore();

  const [recipes, setRecipes] = useState<RecipeData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchRecipes = async () => {
    setLoading(true);
    setError(null);

    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;

    let query = supabase.from("recipes").select("*", { count: "exact" });

    if (category && category !== "all" && category !== "") {
      query = query.eq("category", category);
    }
    if (time && time !== "all" && time !== "") {
      query = query.eq("cook_time", time);
    }
    if (difficulty && difficulty !== "all" && difficulty !== "") {
      query = query.eq("difficulty", difficulty);
    }
    if (price && price !== "all" && price !== "") {
      query = query.eq("material_price", price);
    }

    const { data: recipeList, error, count } = await query.range(start, end);

    if (error) {
      console.error("recipe fetch error:", error.message);
      setError(error.message);
      setLoading(false);
      return;
    }

    const enrichedRecipes = await Promise.all(
      (recipeList || []).map(async (recipe) => {
        // 좋아요 수 가져오기
        const { count: likesCount } = await supabase
          .from("recipe_likes")
          .select("*", { count: "exact", head: true })
          .eq("recipe_id", recipe.id);

        // 태그 가져오기
        const { data: tagRelations } = await supabase
          .from("recipe_tags")
          .select("tag_id")
          .eq("recipe_id", recipe.id);

        let tags: string[] = [];
        if (tagRelations && tagRelations.length > 0) {
          const tagIds = tagRelations.map((rel) => rel.tag_id);
          const { data: tagData } = await supabase
            .from("tags")
            .select("name")
            .in("id", tagIds);
          tags = tagData?.map((tag) => tag.name) || [];
        }

        return {
          ...recipe,
          likesCount: likesCount || 0,
          tags,
        };
      })
    );

    setRecipes(enrichedRecipes);
    setTotalCount(count || 0);
    setLoading(false);
  };

  useEffect(() => {
    fetchRecipes();
  }, [category, time, difficulty, price, page]);

  return { recipes, loading, error, totalCount };
};
