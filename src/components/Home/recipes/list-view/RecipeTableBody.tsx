import React from 'react';
import RecipeTableRow from './RecipeTableRow';

const RecipeTableBody = ({ recipes }) => {
  return (
    <tbody>
      {recipes.map((recipe, index) => (
        <RecipeTableRow 
          key={index} 
          recipe={recipe} 
          isEven={index % 2 === 0} 
        />
      ))}
    </tbody>
  );
};

export default RecipeTableBody;