import React from 'react';
import RecipeImage from '../shared/RecipeImage';
import RecipeTitle from '../shared/RecipeTitle';
import RecipeTagList from '../shared/RecipeTagList';
import RecipeDetails from './RecipeDetailsl';

const RecipeCard = ({ recipe }) => {
  return (
    <div className='w-full border dark:bg-zinc-800 dark:text-white  border-black bg-white text-black h-full dark:border-[1px]  shadow-md rounded-md flex flex-col justify-start '>
      <RecipeImage src={recipe.image} alt={recipe.title} />
      <div className='p-2'>
        <RecipeTitle title={recipe.title} />
        <RecipeDetails
          description={recipe.description}
          category={recipe.category}
          difficulty={recipe.difficulty}
          cookingTime={recipe.cookingTime}
        />
        <RecipeTagList tags={recipe.tags} />
      </div>
    </div>
  );
};

export default RecipeCard;
