"use client";

import { toast } from "sonner";
import { createClient } from "@/lib/client";

export const useCommentActions = ({
  postId,
  userId,
  fetchComments,
}: {
  postId: string;
  userId?: string;
  fetchComments: () => void;
}) => {
  const supabase = createClient();

  const addComment = async (content: string, parentId: string | null = null) => {
    if (!userId) {
      toast.error("로그인 후 댓글을 작성할 수 있습니다.");
      return;
    }

    const { error } = await supabase.from("comments").insert([
      {
        recipe_id: postId,
        user_id: userId,
        parent_id: parentId,
        content,
      },
    ]);

    if (error) {
      toast.error("댓글 작성 실패");
      console.error(error);
      return;
    }

    toast.success(parentId ? "답글 작성 완료!" : "댓글 작성 완료!");
    fetchComments();
  };

  return { addComment };
};
