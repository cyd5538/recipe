// hooks/useLike.ts
import { useEffect, useState } from "react";
import { createClient } from "@/lib/client";
import { toast } from "sonner";

interface UseLikeProps {
  recipeId: string;
  userId?: string;
  initialCount?: number;
}

interface UseLikeReturn {
  liked: boolean;
  likesCount: number;
  loading: boolean;
  toggleLike: () => Promise<void>;
}

export const useLike = ({
  recipeId,
  userId,
  initialCount = 0,
}: UseLikeProps): UseLikeReturn => {
  const supabase = createClient();

  const [liked, setLiked] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number>(initialCount);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!userId) return;

    const checkLiked = async () => {
      const { data, error } = await supabase
        .from("recipe_likes")
        .select("id")
        .eq("user_id", userId)
        .eq("recipe_id", recipeId)
        .limit(1)
        .maybeSingle(); 

      if (error) {
        console.error("좋아요 확인 오류:", error.message);
        return;
      }

      setLiked(!!data);
    };

    checkLiked();
  }, [userId, recipeId]);

  const toggleLike = async () => {
    if (!userId) {
      toast.warning("로그인이 필요합니다.");
      return;
    }

    setLoading(true);

    try {
      if (liked) {
        const { error } = await supabase
          .from("recipe_likes")
          .delete()
          .eq("user_id", userId)
          .eq("recipe_id", recipeId);

        if (error) throw error;

        setLiked(false);
        setLikesCount((prev) => prev - 1);
        toast.success("좋아요 취소 💔");
      } else {
        const { error } = await supabase
          .from("recipe_likes")
          .insert({ user_id: userId, recipe_id: recipeId });

        if (error) throw error;

        setLiked(true);
        setLikesCount((prev) => prev + 1);
        toast.success("좋아요 ❤️");
      }
    } catch (err: any) {
      toast.error("좋아요 처리 중 오류가 발생했습니다.");
      console.error("좋아요 에러:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return { liked, likesCount, loading, toggleLike };
};
