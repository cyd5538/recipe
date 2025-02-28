import React from 'react';
import RecipeTableHeader from './RecipeTableHeader';
import RecipeTableBody from './RecipeTableBody';

const RecipeTable = ({ recipes }) => {
  return (
    <table className="min-w-full mt-4 rounded-md bg-white dark:bg-zinc-950 table-fixed">
      <RecipeTableHeader/>
      <RecipeTableBody recipes={recipes} />
    </table>
  );
};

export default RecipeTable;