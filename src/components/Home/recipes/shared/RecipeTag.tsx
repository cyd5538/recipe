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
      className='border px-[4px] py-[2px] dark:text-white dark:bg-zinc-800 dark:hover:bg-zinc-900 border-gray-500 rounded-xl text-sm font-light cursor-pointer hover:shadow-md transition-shadow'
      onClick={handleClick}
    >
      {text}
    </div>
  );
};

export default RecipeTag;
