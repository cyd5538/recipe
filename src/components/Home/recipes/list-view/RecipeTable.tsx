import React from 'react';
import RecipeTableHeader from './RecipeTableHeader';
import RecipeTableBody from './RecipeTableBody';

const RecipeTable = ({ recipes }) => {
  return (
    <table className="min-w-full mt-4 rounded-md border dark:bg-zinc-800 dark:text-white  border-black bg-white text-black table-fixed">
      <RecipeTableHeader/>
      <RecipeTableBody recipes={recipes} />
    </table>
  );
};

export default RecipeTable;