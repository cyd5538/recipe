import React from 'react';
import RecipeImage from '../shared/RecipeImage';
import RecipeTitle from '../shared/RecipeTitle';
import RecipeTagList from '../shared/RecipeTagList';
import RecipeDetails from './RecipeDetailsl';

const RecipeCard = ({ recipe }) => {
  return (
    <div className='w-full h-full border border-gray-200 shadow-md rounded-md flex flex-col justify-start '>
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
