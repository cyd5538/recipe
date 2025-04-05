"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface RecipeTagsProps {
  tags: string[] | undefined;
}

const RecipeTags: React.FC<RecipeTagsProps> = ({ tags }) => {
  const router = useRouter();

  const handleTagClick = (tag: string) => {
    router.push(`/search?id=${encodeURIComponent(tag)}`);
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-2">🏷 태그</h2>
      <div className="flex flex-wrap gap-2">
        {tags?.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className="px-4 py-2 rounded-xl border hover:bg-red-400 dark:hover:bg-zinc-800 hover:text-white transition-colors"
          > 
            #{tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecipeTags;
