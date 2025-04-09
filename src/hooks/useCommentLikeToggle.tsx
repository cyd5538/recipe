"use client";

import { toast } from "sonner";
import { createClient } from "@/lib/client";
import { Comment } from "@/types/type";

export const useCommentLikeToggle = (
  userId: string | undefined,
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>
) => {
  const supabase = createClient();

  const toggleLike = async (commentId: string) => {
    if (!userId) return toast.error("로그인 후 이용 가능합니다.");

    const { data: existing, error: fetchError } = await supabase
      .from("comment_likes")
      .select("id")
      .eq("comment_id", commentId)
      .eq("user_id", userId)
      .maybeSingle();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error(fetchError);
      return toast.error("좋아요 상태 확인 실패");
    }

    try {
      if (existing) {
        await supabase.from("comment_likes").delete().eq("id", existing.id);
        setComments((prev) =>
          prev.map((c) =>
            c.id === commentId
              ? { ...c, likes: c.likes - 1, likedByUser: false }
              : c
          )
        );
      } else {
        await supabase.from("comment_likes").insert([{ comment_id: commentId, user_id: userId }]);
        setComments((prev) =>
          prev.map((c) =>
            c.id === commentId
              ? { ...c, likes: c.likes + 1, likedByUser: true }
              : c
          )
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("좋아요 처리 중 오류 발생");
    }
  };

  return { toggleLike };
};
