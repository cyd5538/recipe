import React from "react";
import NavBarItem from "./NavBarItem";
import { navItems } from "@/constants/navItems";

const NavBar = () => {

  return (
    <>
      <ul className="flex gap-2">
        {navItems.map((item, index) => (
          <NavBarItem key={index} href={item.href} text={item.text}/>
        ))}
      </ul>
    </>
  );
};

export default NavBar;
