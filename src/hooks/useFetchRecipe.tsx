"use client";

import { createClient } from "@/lib/client";
import { useFilterStore } from "@/store/filterStore";
import { RecipeData } from "@/types/type";
import { useEffect, useState } from "react";



export const useFetchRecipe = (
  page: number,
  pageSize: number
) => {
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

    let query = supabase
      .from("recipes_with_meta")
      .select("*", { count: "exact" });

    if (category && category !== "all") {
      query = query.eq("category", category);
    }
    if (time && time !== "all") {
      query = query.eq("cook_time", time);
    }
    if (difficulty && difficulty !== "all") {
      query = query.eq("difficulty", difficulty);
    }
    if (price && price !== "all") {
      query = query.eq("material_price", price);
    }

    const { data, error, count } = await query.range(start, end);

    if (error) {
      console.error("fetchRecipes error:", error);
      setError("레시피 데이터를 불러오는 중 오류가 발생했습니다.");
      setRecipes([]);
      setTotalCount(0);
    } else {
      setRecipes((data ?? []) as RecipeData[]);
      setTotalCount(count ?? 0);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchRecipes();
  }, [category, time, difficulty, price, page]);

  return { recipes, loading, error, totalCount };
};