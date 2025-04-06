"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { GrView } from "react-icons/gr";
import { useLike } from "@/hooks/useLike";

interface Props {
  recipeId: string;
  userId?: string;
  likesCount: number;
  viewsCount: number;
}

const RecipeStats = ({
  recipeId,
  userId,
  likesCount,
  viewsCount,
}: Props) => {
  const {
    liked,
    likesCount: currentLikes,
    loading,
    toggleLike,
  } = useLike({
    recipeId,
    userId,
    initialCount: likesCount,
  });

  return (
    <div className="flex justify-end gap-4 mb-4 text-gray-700 dark:text-white text-xl">

      <div className="flex items-center gap-1" title="조회수">
        <GrView className=" text-2xl" />
        <span>{viewsCount}</span>
      </div>

      <div className="flex items-center gap-1" title="좋아요">
        <button
          onClick={toggleLike}
          disabled={loading}
          aria-label={liked ? "좋아요 취소" : "좋아요"}
          className="text-red-400 hover:text-red-600 text-2xl transition-colors"
        >
          {liked ? <AiFillHeart /> : <AiOutlineHeart />}
        </button>
        <span>{currentLikes}</span>
      </div>
    </div>
  );
};

export default RecipeStats;
