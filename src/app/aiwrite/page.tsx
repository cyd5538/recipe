"use client";

import { motion } from "framer-motion"; // Heroicons 추천!
import { SparklesIcon } from "lucide-react";
import Header from "@/components/layout/header/Header";

export default function AIRecipeForm() {

  const exampleQuestions = [
    "초간단 오므라이스 만드는 법",
    "매콤한 닭볶음탕 레시피",
    "비오는날 먹기 좋은 국물요리 추천",
  ];


  return (
    <div className="min-h-screen flex flex-col items-center">
      <Header />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full p-8 bg-white dark:bg-zinc-800 rounded-xl shadow-lg space-y-6 mt-40"
      >
        <div className="text-center">
          <SparklesIcon className="h-12 w-12 text-red-500 mx-auto mb-2" />
          <h2 className="text-2xl font-bold">AI 요리사에게 질문하기</h2>
          <p className="text-red-600 dark:text-zinc-100 mt-2">원하는 요리 레시피를 알려드려요!</p>
        </div>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="예: 로제 파스타 레시피 알려줘"
            className="w-full border-2  rounded-md p-3 focus:outline-none focus:ring-2  focus:ring-red-500 dark:focus:ring-black transition"
          />

          <div className="flex flex-wrap gap-2">
            {exampleQuestions.map((ex, idx) => (
              <button
                key={idx}
                type="button"
                className="px-3 py-1 rounded-full bg-red-100 text-red-700 dark:bg-zinc-700 dark:text-gray-100 text-sm hover:bg-red-200 transition"
              >
                {ex}
              </button>
            ))}
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition disabled:opacity-50 dark:bg-zinc-700"
          >
           질문하기
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
