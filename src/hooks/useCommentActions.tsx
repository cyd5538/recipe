"use client";

import { toast } from "sonner";
import {
  insertComment,
  removeComment,
  updateComment,
} from "@/lib/comment";

export const useCommentActions = ({
  postId,
  userId,
  fetchComments,
}: {
  postId: string;
  userId?: string;
  fetchComments: () => void;
}) => {
  /** 댓글 추가 */
  const addComment = async (content: string, parentId: string | null = null) => {
    try {
      if (!userId) throw new Error("로그인 후 댓글을 작성할 수 있습니다.");
      await insertComment({ recipeId: postId, userId, content, parentId });
      toast.success(parentId ? "대댓글 작성 완료!" : "댓글 작성 완료!");
      fetchComments();
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("댓글 작성 실패");
      }
    }
  };

  /** 댓글 삭제 */
  const deleteComment = async (commentId: string) => {
    try {
      if (!userId) throw new Error("로그인 후 이용 가능합니다.");
      await removeComment({ commentId, userId });
      toast.success("댓글 삭제 완료!");
      fetchComments();
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("댓글 작성 실패");
      }
    }
  };

  /** 댓글 수정 */
  const editComment = async (commentId: string, newContent: string) => {
    try {
      if (!userId) throw new Error("로그인 후 이용 가능합니다.");
      await updateComment({ commentId, userId, newContent });
      toast.success("댓글 수정 완료!");
      fetchComments();
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("댓글 작성 실패");
      }
    }
  };

  return { addComment, deleteComment, editComment };
};
