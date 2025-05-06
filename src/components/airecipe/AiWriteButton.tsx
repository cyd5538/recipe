import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function AiWriteButton() {
  return (
    <Link
      href="/aiwrite"
      className="bg-purple-500 hover:bg-purple-600
        text-white px-4 py-2 rounded-md shadow-lg hover:shadow-xl 
        transition-all duration-300 transform 
        flex items-center gap-2 group text-sm
        dark:bg-purple-600 dark:hover:bg-purple-700"
    >
      <Sparkles className="w-4 h-4 group-hover:animate-pulse" />
      <span className="font-semibold">AI로 레시피 만들기</span>
    </Link>
  );
} 