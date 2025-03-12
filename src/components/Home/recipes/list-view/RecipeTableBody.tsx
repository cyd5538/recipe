import React from 'react';
import RecipeTableRow from './RecipeTableRow';
import { RecipeData } from '@/types/type';


interface Prop {
  recipes: RecipeData[]
}

const RecipeTableBody:React.FC<Prop> = ({ recipes }) => {
  
  return (
    <tbody>
      {recipes?.map((recipe, index) => (
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