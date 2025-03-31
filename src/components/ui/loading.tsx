import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Props {
  className?: string;
}

const Loading: React.FC<Props> = ({ className = "" }) => {
  return (
    <div
      className={`flex items-center justify-center inset-0 backdrop-blur-sm ${className}`}
    >
      <AiOutlineLoading3Quarters size={28} className="animate-spin transition-all delay-75 text-gray-600" />
    </div>
  );
};

export default Loading;
