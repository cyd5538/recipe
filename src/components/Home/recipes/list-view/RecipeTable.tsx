import React from 'react';
import RecipeTableHeader from './RecipeTableHeader';
import RecipeTableBody from './RecipeTableBody';
import { RecipeData } from '@/types/type';

interface Prop {
  recipes: RecipeData[]
}

const RecipeTable:React.FC<Prop> = ({ recipes }) => {
  return (
    <table className="min-w-full mt-4 rounded-md border dark:bg-zinc-800 dark:text-white bg-white text-black table-fixed">
      <RecipeTableHeader/>
      <RecipeTableBody recipes={recipes} />
    </table>
  );
};

export default RecipeTable;