import React from 'react';
import { useRouter } from 'next/navigation';

interface RecipeTagListProps {
  tags: string[];
}

const RecipeTagList: React.FC<RecipeTagListProps> = ({ tags }) => {
  const router = useRouter();

  if (!tags || tags.length === 0) return null;

  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/search?tag=${encodeURIComponent(tag)}`);
  };

  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag, index) => (
        <button
          key={index}
          onClick={(e) => handleTagClick(e, tag)}
          className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-xs hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <span className="font-bold">#</span>
          <span>{tag}</span>
        </button>
      ))}
    </div>
  );
};

export default RecipeTagList;