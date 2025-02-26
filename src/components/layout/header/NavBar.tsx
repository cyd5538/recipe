import React from "react";
import NavBarItem from "./NavBarItem";

const NavBar = () => {
  const navItems = [
    { href: "/", text: "홈" },
    { href: "/recipes", text: "모든 레시피" },
    { href: "/about", text: "소개" },
  ];

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
