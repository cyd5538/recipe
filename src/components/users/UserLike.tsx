import { useLikedRecipes } from '@/hooks/useLikedRecipes';
import React from 'react'
import { motion } from "framer-motion";
import Loading from '../ui/loading';
import RecipeListCardView from '../Home/recipes/RecipeListCardView';

interface Prop {
  userId: string | null
}

const UserLike:React.FC<Prop> = ({ userId }) => {
  const { recipes, loading, error } = useLikedRecipes(userId);

  if (loading) return <div className="mt-36"><Loading /></div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <RecipeListCardView recipes={recipes} />
    </motion.div>
  )
}

export default UserLike