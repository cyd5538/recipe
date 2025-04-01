"use client"

import { useEffect, useState } from "react";
import { RecipeLocalStorage } from "@/types/type";

export const useRecentRecipes = () => {
  const [recentRecipes, setRecentRecipes] = useState<RecipeLocalStorage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const storedRecipes = JSON.parse(localStorage.getItem("recentRecipes") || "[]");
      setRecentRecipes(storedRecipes);
    } catch (error) {
      console.error("알 수 없는 에러가 발생했습니다.");
      setRecentRecipes([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { recentRecipes, isLoading };
};