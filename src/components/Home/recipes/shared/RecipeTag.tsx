import React from 'react';

const RecipeTag = ({ text, onClick }) => {
  return (
    <div 
      className='border px-4 py-1 dark:text-white dark:bg-zinc-900 border-gray-500 rounded-xl text-sm md:text-base font-light cursor-pointer hover:shadow-md transition-shadow'
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default RecipeTag;