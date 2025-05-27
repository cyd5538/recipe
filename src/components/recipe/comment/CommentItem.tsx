import { useState } from "react";
import Image from "next/image";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import ReplyInput from "./ReplyInput";
import ReplyList from "./ReplyList";
import { Comment } from "@/types/type";
import Link from "next/link";

interface Props {
  comment: Comment;
  currentUserId?: string;
  onReplySubmit: (commentId: string, value: string) => void;
  onToggleLike: (commentId: string) => void;
  onDelete: (commentId: string) => void;
  onEdit: (commentId: string, newContent: string) => void;
}

const CommentItem: React.FC<Props> = ({
  comment,
  currentUserId,
  onReplySubmit,
  onToggleLike,
  onDelete,
  onEdit,
}) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(comment.content);

  const isOwner = currentUserId === comment.user_id;

  const handleEditSubmit = () => {
    if (editValue.trim() !== "") {
      onEdit(comment.id, editValue.trim());
      setIsEditing(false);
    }
  };

  return (
    <div className="p-3 border rounded-md bg-white dark:bg-zinc-800">
      <div className="flex gap-2 items-start">
        <Link href={`/users?id=${comment.user_id}`}>
          <div className="relative w-8 h-8 rounded-full overflow-hidden border">
            <Image
              src={comment.user.avatar_url ? comment.user.avatar_url :  "/avatar.webp"}
              alt="reply avatar"
              fill
              className="object-cover"
            />
          </div>
        </Link>
        <div className="flex-1">
          <div className="flex justify-between text-sm">
            <span className="font-semibold text-[12px]">{comment.user.nickname}</span>
            <span className="text-gray-400 text-xs">
              {new Date(comment.created_at).toLocaleString()}
            </span>
          </div>

          {isEditing ? (
            <div className="mt-1">
              <textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="w-full text-sm p-1 border rounded"
              />
              <div className="flex gap-2 mt-1 text-xs">
                <button onClick={handleEditSubmit} className="text-red-500">수정</button>
                <button onClick={() => setIsEditing(false)} className="text-gray-500">취소</button>
              </div>
            </div>
          ) : (
            <p className="text-sm mt-1">{comment.content}</p>
          )}

          <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
            <button onClick={() => onToggleLike(comment.id)} className="flex items-center gap-1 hover:text-red-500">
              {comment.likedByUser ? <AiFillHeart className="text-red-500" /> : <AiOutlineHeart />}
              {comment.likes}
            </button>
            <button onClick={() => setShowReplyBox(!showReplyBox)}>답글 작성</button>

            {isOwner && !isEditing && (
              <>
                <button onClick={() => setIsEditing(true)}>수정</button>
                <button onClick={() => onDelete(comment.id)}>삭제</button>
              </>
            )}
          </div>

          {showReplyBox && (
            <ReplyInput onSubmit={(text) => onReplySubmit(comment.id, text)} />
          )}
          <ReplyList replies={comment.replies} isOwner={isOwner} onDelete={onDelete} onEdit={onEdit}/>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
