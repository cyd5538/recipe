import React from 'react';
import RecipeDetails from './RecipeDetailsl';
import { RecipeData } from '@/types/type';
import Link from 'next/link';
import { motion } from 'framer-motion';
import RecipeCardStats from './RecipeCardStats';
import RecipeImage from './shared/RecipeImage';
import RecipeTitle from './shared/RecipeTitle';
import RecipeTagList from './shared/RecipeTagList';

interface Prop {
  recipe: RecipeData
}

const RecipeCard: React.FC<Prop> = ({ recipe }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="w-full"
    >
      <Link
        href={`/recipe?id=${recipe.id}`}
        className="relative w-full border cursor-pointer dark:bg-zinc-800 dark:text-white bg-white text-black h-full dark:border-[1px] shadow-lg rounded-2xl flex flex-col justify-between overflow-hidden group"
      >
        <div className="relative overflow-hidden">
          <RecipeImage 
            src={recipe.thumbnail_url as string} 
            alt={recipe.title}
            className="transition-transform duration-300 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
        </div>
        
        <div className="flex flex-col justify-between flex-1 p-5">
          <div className="space-y-3">
            <RecipeTitle title={recipe.title} maxLength={15} />
            <RecipeDetails
              description={recipe.content}
              category={recipe.category}
              difficulty={recipe.difficulty}
              cookingTime={recipe.cook_time}
            />
            <RecipeTagList tags={recipe.tags} />
          </div>
          
          <RecipeCardStats
            likesCount={recipe.likes_count ?? 0}
            viewsCount={recipe.views ?? 0}
            commentsCount={recipe.total_comments ?? 0}
          />
        </div>
      </Link>
    </motion.div>
  );
};

export default RecipeCard;
