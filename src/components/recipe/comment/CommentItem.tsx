import { useState } from "react";
import Image from "next/image";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import ReplyInput from "./ReplyInput";
import ReplyList from "./ReplyList";
import { Comment } from "@/types/type";

interface Props {
  comment: Comment;
  onReplySubmit: (commentId: string, value: string) => void;
  onToggleLike: (commentId: string) => void;
}

const CommentItem: React.FC<Props> = ({ comment, onReplySubmit, onToggleLike }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);

  return (
    <div className="p-3 border rounded-md bg-white dark:bg-zinc-800">
      <div className="flex gap-2 items-start">
        <div className="relative w-8 h-8 rounded-full overflow-hidden border">
          <Image
            src={comment.user.avatar_url || "/avatar.webp"}
            alt="reply avatar"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between text-sm">
            <span className="font-semibold text-[12px]">{comment.user.nickname}</span>
            <span className="text-gray-400 text-xs">
              {new Date(comment.created_at).toLocaleString()}
            </span>
          </div>
          <p className="text-sm mt-1">{comment.content}</p>
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
            <button onClick={() => onToggleLike(comment.id)} className="flex items-center gap-1 hover:text-red-500">
              {comment.likedByUser ? <AiFillHeart className="text-red-500" /> : <AiOutlineHeart />}
              {comment.likes}
            </button>
            <button onClick={() => setShowReplyBox(!showReplyBox)}>답글 작성</button>
          </div>
          {showReplyBox && (
            <ReplyInput onSubmit={(text) => onReplySubmit(comment.id, text)} />
          )}
          <ReplyList replies={comment.replies} />
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
