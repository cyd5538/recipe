import React from 'react';
import RecipeImage from '../shared/RecipeImage';
import RecipeTitle from '../shared/RecipeTitle';
import RecipeTagList from '../shared/RecipeTagList';
import RecipeDetails from './RecipeDetailsl';
import { RecipeData } from '@/types/type';
import Link from 'next/link';
import RecipeCardStats from './RecipeCardStats';

interface Prop {
  recipe: RecipeData
}

const RecipeCard: React.FC<Prop> = ({ recipe }) => {

  return (
    <Link
      href={`/recipe?id=${recipe.id}`}
      className="relative w-full border cursor-pointer dark:bg-zinc-800 dark:text-white bg-white text-black h-full dark:border-[1px] shadow-md rounded-2xl flex flex-col justify-between"
    >
      <RecipeImage src={recipe.thumbnail_url as string} alt={recipe.title} />
      <div className="flex flex-col justify-between flex-1 p-2">
        <div>
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
          commentsCount={recipe.total_comments ?? 0}
          viewsCount={recipe.views ?? 0}
          likesCount={recipe.likes_count ?? 0}
        />
      </div>
    </Link>

  );
};

export default RecipeCard;
