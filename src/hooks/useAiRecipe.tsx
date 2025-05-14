"use client";

import { askAiRecipe, saveAiRecipe } from "@/lib/aiRecipeService";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";

export function useAiRecipe() {
  const { user } = useAuthStore();
  const [question, setQuestion] = useState<string>("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const exampleQuestions = [
    "초간단 오므라이스 만드는 법",
    "매콤한 닭볶음탕 레시피",
    "비오는날 먹기 좋은 국물요리 추천",
    "기름지고 눅눅한 면 요리"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setIsLoading(true);
    setResult("");

    try {
      const recipe = await askAiRecipe(question);
      setResult(recipe);
      const response = await saveAiRecipe(question, recipe, user?.id);
      return response.id; 
    } catch (error) {
      console.error(error);
      throw new Error("레시피를 가져오거나 저장하는 데 실패했어요. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    question,
    setQuestion,
    result,
    isLoading,
    handleSubmit,
    exampleQuestions,
  };
}