"use client";

import { useAuthStore } from "@/store/authStore";
import { useRecipeComments } from "@/hooks/useRecipeComments";
import { useCommentActions } from "@/hooks/useCommentActions";
import CommentInput from "./CommentInput";
import RecipeCommentList from "./RecipeCommentList";
import { useCommentLikeToggle } from "@/hooks/useCommentLikeToggle";

interface Props {
  postId: string;
}

const RecipeComment: React.FC<Props> = ({ postId }) => {
  const { user } = useAuthStore();
  const userId = user?.id;

  const {
    comments,
    setComments,
    fetchComments,
  } = useRecipeComments(postId, userId);

  const { addComment, deleteComment, editComment } = useCommentActions({ postId, userId, fetchComments });
  const { toggleLike } = useCommentLikeToggle(userId, setComments);

  return (
    <div className="my-10">
      <h2 className="text-2xl font-semibold mb-4">💬 댓글</h2>
      <CommentInput onSubmit={(content) => addComment(content)} />
      <RecipeCommentList
        comments={comments}
        currentUserId={userId}
        onReplySubmit={(commentId, content) => addComment(content, commentId)}
        onToggleLike={toggleLike}
        onDelete={deleteComment}
        onEdit={editComment}
      />
    </div>
  );
};

export default RecipeComment;
