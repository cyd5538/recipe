import CommentItem from "./CommentItem";
import { Comment } from "@/types/type";

interface Props {
  comments: Comment[];
  onReplySubmit: (commentId: string, content: string) => void;
  onToggleLike: (commentId: string) => void;
}

const RecipeCommentList: React.FC<Props> = ({
  comments,
  onReplySubmit,
  onToggleLike,
}) => {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onReplySubmit={onReplySubmit}
          onToggleLike={onToggleLike}
        />
      ))}
    </div>
  );
};

export default RecipeCommentList;
