import CommentItem from "./CommentItem";
import { Comment } from "@/types/type";

interface Props {
  comments: Comment[];
  currentUserId?: string;
  onReplySubmit: (commentId: string, content: string) => void;
  onToggleLike: (commentId: string) => void;
  onDelete: (commentId: string) => void;
  onEdit: (commentId: string, content: string) => void;
}

const RecipeCommentList: React.FC<Props> = ({
  comments,
  currentUserId,
  onReplySubmit,
  onToggleLike,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          currentUserId={currentUserId}
          onReplySubmit={onReplySubmit}
          onToggleLike={onToggleLike}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default RecipeCommentList;
