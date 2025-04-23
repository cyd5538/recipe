"use client";

import { createClient } from "@/lib/client";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Heart icons
import { useAuthStore } from "@/store/authStore";

interface Props {
  recipeId: string;
  initialFavorited: boolean;
}

const RecipeFavoriteButton: React.FC<Props> = ({ recipeId, initialFavorited }) => {
  const supabase = createClient();
  const { user } = useAuthStore();
  const [isFavorited, setIsFavorited] = useState<boolean>(initialFavorited);
  const [loading, setLoading] = useState(false);

  const toggleFavorite = async () => {
    if (!user) return alert("로그인이 필요합니다.");

    setLoading(true);

    if (isFavorited) {
      // 즐겨찾기 삭제
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("recipe_id", recipeId)
        .eq("user_id", user.id);

      if (!error) setIsFavorited(false);
      else console.error("즐겨찾기 삭제 실패:", error.message);
    } else {
      // 즐겨찾기 추가
      const { error } = await supabase.from("favorites").insert({
        recipe_id: recipeId,
        user_id: user.id,
      });

      if (!error) setIsFavorited(true);
      else console.error("즐겨찾기 추가 실패:", error.message);
    }

    setLoading(false);
  };

  return (
    <button
      className="flex items-center gap-1 text-sm px-3 w-[130px] justify-center py-2 rounded-md border 
    border-gray-500 dark:border-zinc-600 hover:bg-gray-100 dark:hover:bg-zinc-700 transition"
      onClick={toggleFavorite}
      disabled={loading}
    >
      {isFavorited ? <FaHeart color="red"/> : <FaRegHeart color="red"/>}
      {isFavorited ? "즐겨찾기 취소" : "즐겨찾기"}
    </button>
  );
};

export default RecipeFavoriteButton;
