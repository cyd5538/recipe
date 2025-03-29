import React from 'react';
import RecipeImage from '../shared/RecipeImage';
import RecipeTitle from '../shared/RecipeTitle';
import RecipeTagList from '../shared/RecipeTagList';
import RecipeDetails from './RecipeDetailsl';
import { RecipeData } from '@/types/type';
import Link from 'next/link';

interface Prop {
  recipe: RecipeData
}

const RecipeCard:React.FC<Prop> = ({ recipe }) => {




  return (
    <Link href={`/recipe?id=${recipe.id as string}`} className='w-full border cursor-pointer dark:bg-zinc-800 dark:text-white  bg-white text-black h-full dark:border-[1px]  shadow-md rounded-2xl flex flex-col justify-start '>
      <RecipeImage src={recipe.thumbnail_url as string} alt={recipe.title} />
      <div className='p-2'>
        <RecipeTitle title={recipe.title} maxLength={15}/>
        <RecipeDetails
          description={recipe.content}
          category={recipe.category}
          difficulty={recipe.difficulty}
          cookingTime={recipe.cook_time}
        />
        <RecipeTagList tags={recipe.tags} />
      </div>
    </Link>
  );
};

export default RecipeCard;
