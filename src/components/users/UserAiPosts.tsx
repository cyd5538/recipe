"use client";

import React from 'react';
import useUserAiRecipes from '@/hooks/useUserAiRecipes';
import { motion } from "framer-motion";
import AiRecipeCard from '../airecipe/AiRecipeCard';
import Loading from '../ui/loading';

interface UserAiPostsProps {
  userId: string | null;
}

const UserAiPosts: React.FC<UserAiPostsProps> = ({ userId }) => {
  const { data, loading, error } = useUserAiRecipes(userId);

  if (loading) return <div className="mt-36"><Loading /></div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!data || data.length === 0) return <div className="text-center py-8 text-gray-500">아직 Ai로 생성한 한 글이 없습니다.</div>;
  
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((recipe) => (
          <AiRecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </motion.div>
  );
};

export default UserAiPosts; 