import React from 'react';
import RecipeTitleSection from './RecipeTitleSection';
import RecipeImage from '../shared/RecipeImage';

const RecipeTableRow = ({ recipe, isEven }) => {
  return (
    <tr
      className={`md:m-2 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer ${isEven ? 'bg-gray-100 dark:bg-zinc-800' : 'bg-white dark:bg-transparent'
        }`}
    >
      <RecipeTitleSection title={recipe.title} tags={recipe.tags} />
      <td className="p-2 text-center">{recipe.category}</td>
      <td className="p-2 text-center">{recipe.cookingTime}</td>
      <td className="p-2 text-center">{recipe.difficulty}</td>
      <td className="p-2 hidden 1125px:table-cell text-center">
        <RecipeImage src={recipe.image} alt={recipe.title} />
      </td>
    </tr>
  );
};

export default RecipeTableRow;