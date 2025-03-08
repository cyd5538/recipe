import React from 'react';
import RecipeImage from '../shared/RecipeImage';
import RecipeTitle from '../shared/RecipeTitle';
import RecipeTagList from '../shared/RecipeTagList';
import RecipeDetails from './RecipeDetailsl';
import { RecipeData } from '@/types/type';

interface Prop {
  recipe: RecipeData
}

const RecipeCard:React.FC<Prop> = ({ recipe }) => {

  const getImageUrl = (thumbnailPath: string) => {
    const URL = `https://iokzxxixwfjvdwupivjn.supabase.co/storage/v1/object/public/recipe_thumbnails/`
    return `${URL}${thumbnailPath}`;
  };

  const imageUrl = getImageUrl(recipe.thumbnail_url as string);
  console.log(imageUrl  )
  return (
    <div className='w-full border dark:bg-zinc-800 dark:text-white  border-black bg-white text-black h-full dark:border-[1px]  shadow-md rounded-md flex flex-col justify-start '>
      <RecipeImage src={imageUrl} alt={recipe.title} />
      <div className='p-2'>
        <RecipeTitle title={recipe.title} />
        <RecipeDetails
          description={recipe.content}
          category={recipe.category}
          difficulty={recipe.difficulty}
          cookingTime={recipe.cook_time}
        />
        <RecipeTagList tags={recipe.tags} />
      </div>
    </div>
  );
};

export default RecipeCard;
