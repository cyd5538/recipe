import React from "react";

interface TagListProps {
  tags: string[];
  handleRemoveTag: (tagToRemove: string) => void;
}

const TagList: React.FC<TagListProps> = ({ tags,handleRemoveTag }) => {
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <span key={index} className="relative px-6 py-2 rounded-md border dark:bg-zinc-800 dark:text-white  border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
          {tag}
          <button className="absolute top-[-6px] right-[-6px] px-[6px] py-[2px] bg-black text-white hover:border rounded-full" onClick={() => handleRemoveTag(tag)}>
            ✕
          </button>
        </span>
      ))}
    </div>
  );
};

export default TagList;
