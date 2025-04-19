import { useState } from "react";

export const useCopyToClipboard = () => {
  const [copied, setCopied] = useState(false);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); 
    } catch (err) {
      console.error("복사 에러", err);
      setCopied(false);
    }
  };

  return { copied, copy };
};
