import React from 'react';
import RecipeCard from './RecipeCard';
import { RecipeData } from '@/types/type';

  interface Prop {
    recipes: RecipeData[]
  }

const RecipeListCardView:React.FC<Prop> = ({recipes}) => {

  return (
    <div className='mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3'>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeListCardView;
