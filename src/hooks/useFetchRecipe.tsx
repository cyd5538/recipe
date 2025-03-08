"use client";

import { createClient } from "@/lib/client";
import { useFilterStore } from "@/store/filterStore";
import { useEffect, useState } from "react";

export const useFetchRecipe = () => {
  const supabase = createClient();

  const { category, time, difficulty, price } = useFilterStore();

  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipes = async () => {
    setLoading(true);
    setError(null);

    let query = supabase.from("recipes").select("*");


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

    const { data, error } = await query;

    if (error) {
      console.error("recipe fetch error:", error.message);
      setError(error.message);
    } else {
      setRecipes(data || []);
    }

    setLoading(false);
  };

  // 필터 변경 시 데이터 가져오기
  useEffect(() => {
    fetchRecipes();
  }, [category, time, difficulty, price]);

  return { recipes, loading, error };
};
