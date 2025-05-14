"use client";

import { motion } from "framer-motion";
import { SparklesIcon } from "lucide-react";
import Header from "@/components/layout/header/Header";
import { useAiRecipe } from "@/hooks/useAiRecipe";
import { redirect, useRouter } from "next/navigation";
import Loading from "@/components/ui/loading";
import { useAuthStore } from "@/store/authStore";
import { useCoin } from "@/hooks/useCoin";
import { toast } from "sonner";
import { useState } from "react";
import RecipeCompleteModal from "@/components/airecipe/RecipeCompleteModal";
import CookingAnimation from "@/components/airecipe/CookingAnimation";
import CoinSection from "@/components/airecipe/CoinSection";
import QuestionForm from "@/components/airecipe/QuestionForm";

export default function AIRecipeForm() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuthStore();
  const { coin, loading: coinLoading, checkCoinBalance, deductCoin, refundCoin } = useCoin(user?.id || null);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [generatedRecipeId, setGeneratedRecipeId] = useState<string | null>(null);

  const {
    question,
    setQuestion,
    isLoading,
    handleSubmit: originalHandleSubmit,
    exampleQuestions,
  } = useAiRecipe();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!checkCoinBalance()) return;

    const deducted = await deductCoin();
    if (!deducted) return;

    toast.success("1코인이 차감되었습니다.");

    try {
      const recipeId = await originalHandleSubmit(e);
      if (recipeId) {
        setGeneratedRecipeId(recipeId);
        setShowCompleteModal(true);
      }
    } catch (error) {
      await refundCoin();
      toast.error("레시피 생성에 실패하였습니다.");
    }
  };

  const handleViewRecipe = () => {
    if (generatedRecipeId) {
      setShowCompleteModal(false);
      router.push(`/airecipe/${generatedRecipeId}`);
    }
  };

  const handleCloseModal = () => {
    setShowCompleteModal(false);
    setQuestion("");
  };

  if(authLoading || coinLoading) {
    return <Loading className="w-full h-screen flex justify-center items-center" />;
  }

  if (!user) {
    redirect("/");
  }

  return (
    <>
      <RecipeCompleteModal
        isOpen={showCompleteModal}
        onClose={handleCloseModal}
        onViewRecipe={handleViewRecipe}
      />
      
      <div className="min-h-screen flex flex-col items-center">
        <Header />
        {isLoading && <CookingAnimation isLoading={isLoading} variant="fullscreen" />}
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
            <CoinSection balance={coin?.balance || 0} />
          </div>

          <QuestionForm
            question={question}
            setQuestion={setQuestion}
            exampleQuestions={exampleQuestions}
            isLoading={isLoading}
            onSubmit={handleSubmit}
          />
        </motion.div>
      </div>
    </>
  );
}
