import React from "react";

interface TagListProps {
  tags: string[];
}

const TagList: React.FC<TagListProps> = ({ tags }) => {
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
          {tag}
        </span>
      ))}
    </div>
  );
};

export default TagList;
