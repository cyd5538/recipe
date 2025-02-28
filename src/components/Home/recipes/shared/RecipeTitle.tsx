import React from 'react';

const RecipeTitle = ({ title, maxLength = 15 }) => {
  const truncatedTitle = title.length > maxLength 
    ? `${title.slice(0, maxLength)}...` 
    : title;
    
  return <h2 className='text-xl mb-4'>{truncatedTitle}</h2>;
};

export default RecipeTitle;