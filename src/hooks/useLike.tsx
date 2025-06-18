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
        // 좋아요 취소
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
        // 좋아요 추가
        const { error } = await supabase
          .from("recipe_likes")
          .insert({ user_id: userId, recipe_id: recipeId });

        if (error) throw error;

        setLiked(true);
        setLikesCount((prev) => prev + 1);
        toast.success("좋아요 ❤️");

        // 레시피 작성자에게 알림 보내기
        const { data: recipe, error: recipeError } = await supabase
          .from("recipes")
          .select("user_id")
          .eq("id", recipeId)
          .single();

        if (recipeError) {
          console.error("레시피 정보 조회 실패:", recipeError.message);
        } else if (recipe.user_id !== userId) {
          const { error: notifyError } = await supabase
            .from("notifications")
            .insert({
              recipient_id: recipe.user_id,
              sender_id: userId,
              type: "like",
              entity_id: recipeId,
              is_read: false,
              message: null,
            });

          if (notifyError) {
            console.error("알림 전송 실패:", notifyError.message);
          }
        }
      }
    } catch (err:unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("좋아요 처리 중 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { liked, likesCount, loading, toggleLike };
};
