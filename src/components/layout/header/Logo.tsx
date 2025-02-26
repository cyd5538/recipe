import { CookingPot } from "lucide-react";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/">
      <button className="flex item-center font-bold xl:text-2xl md:text-xl text-base tracking-wide">
        <span className="text-red-500">C</span>
        <span className="text-red-500">o</span>
        <span className="text-red-500">o</span>
        <span className="text-red-500">k</span>
        <span className="ml-1 dark-text-white">L</span>
        <span className="dark-text-white">o</span>
        <span className="text-red -500dark-text-white">g</span>
        <span className="ml-2 text-2xl mt-1">
          <CookingPot color="#ef4444" />  
        </span> 
      </button>
    </Link>
  );
};

export default Logo;
