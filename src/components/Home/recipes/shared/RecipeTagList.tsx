import React from 'react';
import RecipeTag from './RecipeTag';

const RecipeTagList = ({ tags }) => {
  return (
    <div className='flex gap-2 font-medium flex-wrap'>
      {tags.map((tag, index) => (
        <RecipeTag key={index} text={tag} />
      ))}
    </div>
  );
};

export default RecipeTagList;