import { useRouter } from 'next/navigation';
import React from 'react';

interface Prop {
  text: string;
}

const RecipeTag: React.FC<Prop> = ({ text }) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();   
    router.push(`/search?id=${text}`);
  };

  return (
    <div 
      className='border px-4 py-1 dark:text-white dark:bg-zinc-900 border-gray-500 rounded-xl text-sm md:text-base font-light cursor-pointer hover:shadow-md transition-shadow'
      onClick={handleClick}
    >
      {text}
    </div>
  );
};

export default RecipeTag;
