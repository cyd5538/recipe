import React from 'react';

interface Prop {
  title: string
  maxLength: number
}

const RecipeTitle:React.FC<Prop> = ({ title, maxLength }) => {
  const truncatedTitle = title.length > maxLength 
    ? `${title.slice(0, maxLength)}...` 
    : title;
    
  return <h2 className='text-xl mb-4'>{truncatedTitle}</h2>;
};

export default RecipeTitle;