"use client";

import { motion } from "framer-motion";
import { SparklesIcon } from "lucide-react";
import Header from "@/components/layout/header/Header";
import { useAiRecipe } from "@/hooks/useAiRecipe";
import { redirect } from "next/navigation";
import Loading from "@/components/ui/loading";
import { useAuthStore } from "@/store/authStore";

export default function AIRecipeForm() {
  const { user, loading } = useAuthStore();

  const {
    question,
    setQuestion,
    result,
    isLoading,
    handleSubmit,
    exampleQuestions,
  } = useAiRecipe();

  if(loading) {
    return <Loading className="w-full h-screen flex justify-center items-center" />
  }

  if (!user) {
    redirect("/");
  }

  
  return (
    <div className="min-h-screen flex flex-col items-center">
      <Header />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full p-8 bg-white dark:bg-zinc-800 rounded-xl shadow-xl space-y-6 mt-40"
      >
        <div className="text-center">
          <SparklesIcon className="h-12 w-12 text-red-500 mx-auto mb-2" />
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">AI 요리사에게 질문하기</h2>
          <p className="text-zinc-600 dark:text-zinc-300 mt-2">원하는 요리 레시피를 알려드려요!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            type="text"
            placeholder="예: 로제 파스타 레시피 알려줘"
            className="w-full border border-zinc-300 dark:border-zinc-600 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          />

          <div className="flex flex-wrap gap-2">
            {exampleQuestions.map((ex, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setQuestion(ex)}
                className="px-3 py-1 rounded-full bg-red-100 text-red-700 dark:bg-zinc-700 dark:text-white text-sm hover:bg-red-200 transition"
              >
                {ex}
              </button>
            ))}
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition disabled:opacity-50"
          >
            {isLoading ? "요리 중..." : "질문하기"}
          </motion.button>
        </form>

        {result && (
          <div className="mt-4 p-4 border border-zinc-200 dark:border-zinc-600 rounded-md bg-zinc-50 dark:bg-zinc-700 text-sm whitespace-pre-wrap">
            {result}
          </div>
        )}
      </motion.div>
    </div>
  );
}
