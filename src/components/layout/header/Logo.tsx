import { CookingPot } from "lucide-react";
import React from "react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="relative">
        <CookingPot className="w-7 h-7 text-red-500 dark:text-red-400 group-hover:rotate-12 transition-transform duration-300" />
        <div className="absolute -inset-1 bg-red-500/10 dark:bg-red-400/10 rounded-full blur-sm group-hover:bg-red-500/20 dark:group-hover:bg-red-400/20 transition-colors" />
      </div>
      <span className="text-xl font-bold text-gray-900 dark:text-white tracking-wide">
        CookLog
      </span>
    </Link>
  );
};

export default Logo;
