import { Reply } from "@/types/type";
import Image from "next/image";

interface Props {
  replies: Reply[];
}

const ReplyList: React.FC<Props> = ({ replies }) => {
  if (replies.length === 0) return null;

  return (
    <div className="mt-3 space-y-2 pl-4  border-gray-200">
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
          <div>
            <div className="flex gap-2 text-sm items-center">
              <span className="font-semibold text-[12px]">{reply.user.nickname}</span>
              <span className="text-gray-400 text-xs">
                {new Date(reply.created_at).toLocaleTimeString()}
              </span>
            </div>
            <p className="text-sm">{reply.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReplyList;
