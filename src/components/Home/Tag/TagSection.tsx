"use client";
import React, { useState } from "react";
import { usePopularTags } from "@/hooks/usePopularTags";
import TagItem from "./TagItem";

const TagSection = () => {
  const [visibleCount, setVisibleCount] = useState(10); 
  const { tags, loading } = usePopularTags();

  const visibleTags = tags.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount(visibleCount + 10); 
  };

  return (
    <div className="mt-4 flex flex-col gap-4 border dark:bg-zinc-800 dark:text-white bg-white text-black p-6 rounded-xl shadow-md dark:border-[1px] transition-all duration-300 ease-in-out">
      <div>인기 태그</div>
      <div className="flex gap-2 flex-wrap min-h-[40px]">
        {loading ? (
          <div>로딩 중...</div>
        ) : (
          visibleTags.map((tag) => <TagItem key={tag.tag} {...tag} />)
        )}
      </div>

      {!loading && tags.length > visibleCount && (
        <div className="w-full flex justify-end">
            <button
            onClick={handleShowMore}
            className="text-sm text-black dark-text-white hover:underline self-start mt-2"
            >
            더보기
            </button>
        </div>
      )}
    </div>
  );
};

export default TagSection;
