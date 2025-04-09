"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/client";
import { Comment, CommentLike } from "@/types/type";

export const useRecipeComments = (recipeId: string, userId?: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const supabase = createClient();

  const fetchComments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("comments")
      .select(`
        *,
        user:user_id(nickname, avatar_url),
        comment_likes(user_id)
      `)
      .eq("recipe_id", recipeId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("댓글 불러오기 오류:", error);
      setLoading(false);
      return;
    }

    const enriched = data.map((comment) => ({
      ...comment,
      likes: comment.comment_likes?.length || 0,
      likedByUser: comment.comment_likes?.some((like:CommentLike) => like.user_id === userId) || false,
    }));

    const rootComments = enriched.filter((c) => !c.parent_id);
    const replies = enriched.filter((c) => c.parent_id);

    const commentTree = rootComments.map((comment) => ({
      ...comment,
      replies: replies.filter((r) => r.parent_id === comment.id),
    }));

    setComments(commentTree);
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, [recipeId, userId]); 

  return {
    comments,
    setComments,
    loading,
    fetchComments,
  };
};
