import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface Props {
  onSubmit: (value: string) => void;
}

const ReplyInput: React.FC<Props> = ({ onSubmit }) => {
  const [reply, setReply] = useState<string>("");

  return (
    <div className="mt-2 ml-4 ">
      <Textarea
        className="w-full text-sm border px-3 py-2 rounded-md resize-none dark:bg-zinc-900"
        rows={2}
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        placeholder="답글을 입력하세요"
      />
      <div className="flex justify-end mt-2">
        <button
          className="text-xs px-3 py-1 rounded-md border border-black dark:border-zinc-800 disabled:opacity-70 bg-white dark:bg-zinc-950"
          onClick={() => {
            if (reply.trim()) {
              onSubmit(reply.trim());
              setReply("");
            }
          }}
          disabled={!reply.trim()}
        >
          등록
        </button>
      </div>
    </div>
  );
};

export default ReplyInput;
