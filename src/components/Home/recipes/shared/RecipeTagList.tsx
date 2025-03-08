import React from 'react';
import RecipeTag from './RecipeTag';

interface Prop {
  tags: string[] | null
}

const RecipeTagList:React.FC<Prop> = ({ tags }) => {
  return (
    <div className='flex gap-2 font-medium flex-wrap'>
      {tags?.map((tag, index) => (
        <RecipeTag key={index} text={tag} />
      ))}
    </div>
  );
};

export default RecipeTagList;