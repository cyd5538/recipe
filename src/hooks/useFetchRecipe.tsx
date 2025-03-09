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

    let query = supabase.from("recipes").select("*", { count: "exact" }); // 총 개수 가져옴

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

    const { data, error, count } = await query.range(start, end); // ✅ count 값도 가져옴

    if (error) {
      console.error("recipe fetch error:", error.message);
      setError(error.message);
    } else {
      setRecipes(data || []);
      setTotalCount(count || 0); // ✅ 전체 개수 저장
    }

    setLoading(false);
  };

  // 필터 & 페이지 변경 시 데이터 가져오기
  useEffect(() => {
    fetchRecipes();
  }, [category, time, difficulty, price, page]);

  return { recipes, loading, error, totalCount };
};
