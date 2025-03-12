import React from 'react';
import RecipeTable from './RecipeTable';
import { RecipeData } from '@/types/type';

interface Prop {
  recipes: RecipeData[]
}

const RecipeListView:React.FC<Prop> = ({recipes}) => {
  return <RecipeTable recipes={recipes} />;
};

export default RecipeListView;
