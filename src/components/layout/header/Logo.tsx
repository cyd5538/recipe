import { CookingPot } from "lucide-react";
import React from "react";
import Link from "next/link";

const Logo = () => {

  return (
    <Link href="/">
      <button className="flex item-center font-bold text-2xl tracking-wide">
        <span className="">C</span>
        <span className="">o</span>
        <span className="">o</span>
        <span className="">k</span>
        <span className="ml-1 ">L</span>
        <span className="">o</span>
        <span className="">g</span>
        <span className="ml-2 text-2xl mt-1">
          <CookingPot />
        </span>
      </button>
    </Link>
  );
};

export default Logo;
