import { CookingPot } from "lucide-react";
import React from "react";
import Link from "next/link";

const Logo = () => {

  return (
    <Link href="/">
      <button className="flex item-center font-bold xl:text-2xl md:text-xl text-base tracking-wide">
        <span className="text-white">C</span>
        <span className="text-white">o</span>
        <span className="text-white">o</span>
        <span className="text-white">k</span>
        <span className="ml-1 text-white">L</span>
        <span className="text-white">o</span>
        <span className="text-white">g</span>
        <span className="ml-2 text-2xl mt-1">
          <CookingPot color="#fff" />
        </span>
      </button>
    </Link>
  );
};

export default Logo;
