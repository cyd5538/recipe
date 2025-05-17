import React from "react";
import { useRouter } from 'next/navigation';

interface TagItemProps {
  tag: string;
  count: number;
}

const TagItem: React.FC<TagItemProps> = ({ tag, count }) => {
  const router = useRouter();
  
  const handleSearchTag = () => {
    router.push(`/search?keyword=${encodeURIComponent(tag.trim())}`);
  };

  return (
    <div
      className="px-2 py-1 border rounded-md cursor-pointer dark:border-zinc-700 hover:bg-gray-100 shadow-md dark:hover:bg-zinc-900"
      onClick={handleSearchTag}
    >
      #{tag} ({count})
    </div>
  );
}

export default TagItem;
