"use client";

import React from "react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { usePathname, useSearchParams } from "next/navigation";
import { FiCopy, FiCheck } from "react-icons/fi";

const RecipeCopyButton: React.FC = () => {
  const { copied, copy } = useCopyToClipboard();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const handleCopy = () => {
    if (!id) return;

    const fullUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}${pathname}?id=${id}`
        : "";

    copy(fullUrl);
  };

  return (
    <div className="relative flex items-center gap-2">
      <button
        onClick={handleCopy}
        className="flex items-center gap-1 text-sm px-3 py-2 rounded-md border border-gray-500 dark:border-zinc-600 hover:bg-gray-100 dark:hover:bg-zinc-700 transition"
      >
        {copied ? (
          <>
            <FiCheck className="text-red-500" />
            <span className="text-red-500">복사됨</span>
          </>
        ) : (
          <>
            <FiCopy />
            <span>링크 복사</span>
          </>
        )}
      </button>
    </div>
  );
};

export default RecipeCopyButton;
