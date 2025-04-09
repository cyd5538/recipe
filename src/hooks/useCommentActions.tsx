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
      toast.error("댓글 작성 실패 중 에러가 발생했습니다.");
      console.error(error);
      return;
    }

    toast.success(parentId ? "대댓글 작성 완료!" : "댓글 작성 완료!");
    fetchComments();
  };

  const deleteComment = async (commentId: string) => {
    if (!userId) return toast.error("로그인 후 이용 가능합니다.");
  
    const confirmed = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmed) return; 
  
    const { data, error: fetchError } = await supabase
      .from("comments")
      .select("user_id")
      .eq("id", commentId)
      .single();
  
    if (fetchError || !data) {
      console.error(fetchError);
      return toast.error("댓글이 존재하지 않습니다.");
    }
  
    if (data.user_id !== userId) {
      return toast.error("본인 댓글만 삭제할 수 있습니다.");
    }
  
    const { error } = await supabase.from("comments").delete().eq("id", commentId);
  
    if (error) {
      console.error(error);
      return toast.error("댓글 삭제 중 에러가 발생했습니다.");
    }
  
    toast.success("댓글 삭제 완료!");
    fetchComments();
  };

  const editComment = async (commentId: string, newContent: string) => {
    if (!userId) return toast.error("로그인 후 이용 가능합니다.");

    const { data, error: fetchError } = await supabase
      .from("comments")
      .select("user_id")
      .eq("id", commentId)
      .single();

    if (fetchError || !data) {
      console.error(fetchError);
      return toast.error("댓글이 존재하지 않습니다.");
    }

    if (data.user_id !== userId) {
      return toast.error("본인 댓글만 수정할 수 있습니다.");
    }

    const { error } = await supabase
      .from("comments")
      .update({ content: newContent })
      .eq("id", commentId);

    if (error) {
      console.error(error);
      return toast.error("댓글 수정 중 에러가 발생했습니다.");
    }

    toast.success("댓글 수정 완료!");
    fetchComments();
  };

  return {
    addComment,
    deleteComment,
    editComment,
  };
};
