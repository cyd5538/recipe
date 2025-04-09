import { useState } from "react";
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  onSubmit: (value: string) => void;
}

const CommentInput: React.FC<Props> = ({ onSubmit }) => {
  const [input, setInput] = useState("");
  const { user } = useAuthStore();

  return (
    <div className="flex items-start gap-2 mb-6 p-3 rounded-md">
      <div className="flex flex-col justify-center items-center ">
        <div className="relative w-14 h-14 rounded-full overflow-hidden border">
          <Image
            src={user?.avatar_url || "/avatar.webp"}
            alt="reply avatar"
            fill
            className="object-cover"
          />
        </div>
        <span className="text-[12px] font-semibold">{user?.nickname}</span>
      </div>
      <div className="flex-1">
        <Textarea
          className="w-full text-sm border px-3 py-2 rounded-md resize-none bg-white dark:bg-zinc-900"
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="댓글을 입력하세요"
        />
        <div className="flex justify-end mt-2">
          <button
            className="text-xs px-3 py-1 rounded-md border border-black dark:border-zinc-800 disabled:opacity-70 bg-white dark:bg-zinc-950"
            onClick={() => {
              if (input.trim()) {
                onSubmit(input.trim());
                setInput("");
              }
            }}
            disabled={!input.trim()}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentInput;
