import { Reply } from "@/types/type";
import Image from "next/image";
import { useState } from "react";

interface Props {
  replies: Reply[];
  isOwner?: boolean;
  onDelete: (commentId: string) => void;
  onEdit: (commentId: string, newContent: string) => void;
}

const ReplyList: React.FC<Props> = ({ replies, isOwner, onDelete, onEdit }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<string>("");

  const handleEditClick = (replyId: string, currentContent: string) => {
    setEditingId(replyId);
    setEditContent(currentContent);
  };

  const handleSave = (replyId: string) => {
    if (editContent.trim() === "") return;
    onEdit(replyId, editContent);
    setEditingId(null);
    setEditContent("");
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditContent("");
  };

  if (replies.length === 0) return null;

  return (
    <div className="mt-3 space-y-2 pl-4 border-l border-gray-200">
      {replies.map((reply) => (
        <div key={reply.id} className="flex gap-2 text-sm">
          <div className="relative w-7 h-7 rounded-full overflow-hidden border">
            <Image
              src={reply.user.avatar_url || "/avatar.webp"}
              alt="reply avatar"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-sm items-center">
              <span className="font-semibold text-[12px]">{reply.user.nickname}</span>
              <span className="text-gray-400 text-xs">
                {new Date(reply.created_at).toLocaleTimeString()}
              </span>
            </div>

            {/* 수정 중일 때 인풋창 */}
            {editingId === reply.id ? (
              <div className="mt-1">
                <input
                  type="text"
                  className="w-full border px-2 py-1 text-sm rounded"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <div className="flex gap-2 mt-1 text-xs">
                  <button className="text-red-500" onClick={() => handleSave(reply.id)}>
                    수정
                  </button>
                  <button className="text-gray-400" onClick={handleCancel}>
                    취소
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-sm">{reply.content}</p>

                {isOwner && (
                  <div className="flex gap-2 mt-1 text-xs text-gray-400">
                    <button onClick={() => handleEditClick(reply.id, reply.content)}>
                      수정
                    </button>
                    <button onClick={() => onDelete(reply.id)}>삭제</button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReplyList;
